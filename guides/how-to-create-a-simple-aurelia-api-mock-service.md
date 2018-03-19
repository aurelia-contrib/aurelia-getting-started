# How to create a simple aurelia api mock service

1. Add the [aurelia-configuration](https://www.npmjs.com/package/aurelia-configuration) component to the aurelia project
2. Configure aurelia-configuration plugin to support stages individual configurations
```
.plugin('aurelia-configuration', config => {
        config.setEnvironments({
            development: ['localhost', 'dev.local', '127.0.0.1'],
            staging: ['staging.myproject.de', 'test.staging.myproject.de'],
            production: ['myproject.de']
        });
        config.setDirectory('config'); 
        config.setConfig('config.json'); 
    })
```
3. Create central configuration file including a section for api routes
```

{
  "name": "MyProject",
  "api": {
      "key": "somekey",
      "endpoint": "http://www.google.com/"
  },
  "development": {
    "myproject-api": {
          "key": "developmentonlykey938109283091",
          "endpoint": "localhost:9001/api/v1",
        "api-headers": {
        "Content-Type": "application/json"
      },
      "routes": {
        "users": {
          "postUserRegister" : "/users/register.json",
          "getUserIndex": "/users/users.json",
          "getUser": "/users/get-user.json",
          "getUserAddress": "/addresses/get-address.json"
        }
      }
    }
  },
  "production": {
    "myproject-api": {
          "key": "developmentonlykey938109283091",
          "endpoint": "http://localhost:80/api/v1",
        "api-headers": {
        "Content-Type": "application/json"
      },
      "routes": {
        "users" : {
          "get-user-index": "/users/",
          "get-user": "/users/{user-id}",
          "get-user-address": "/users/{user-id}/address"
        }
      }
    }
  },
```
4. Create folder structure with json-response-object files:
```
* api
    * v1
        * users
            * user.json
```
5. Add json-response-object-files:
```
{
    "user": {
        "firstname": "Max",
        "lastname": "Mustermann
    }
}
```
6. Setup Aurelia-Fetch-Requests in services or view-models using the routes configured in central config file:
```
export class UserService{
  readonly configRoutesPath : string = 'myproject-api.routes.users';
  private baseApiUrl : string;
  private apiRoutes;

  constructor(
      private HttpClient: HttpClient,
      private config: AureliaConfiguration
  ){
      this.baseApiUrl= this.config.get('myproject-api.endpoint');
      this.apiRoutes = this.config.get('myproject-api.routes.users');
  }

/**
   * Requests the user index from API
   */
  public getUsers() : User[]{
      let users : User[] = [];
      this.HttpClient.fetch(this.baseApiUrl + this.apiRoutes.users.getUserIndex, { 
          headers: this.config.get('myproject-api.api-headers'), 
          method: "GET"
       })
      .then(response => { 
          return response.json()})
      .then(data => {
          console.log(data);
          users = data.users;
          return users;
      }).catch(err=>{
          console.log("Error on requesting User Index");
          throw "Something went wrong on requesting the API for getting users, " + err;
      });

      return users;
  }
```
