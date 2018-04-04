# Plugins for Aurelia
The dream is to accumulate all the great plugins for Aurelia in [aurelia-contrib organisation](https://github.com/aurelia-contrib).
There are a lot of great plugins out there. But discoverability suffers.

Wouldn't it be nice to have a central place that had it all? So once found - there is instantly a lot more to find.
> Plugin authors can join the organisation and move plugins to the aurelia-contrib organisation. 
> Create an issue or ping @alexander-taran on gitter to request membership. We'll set you up!!


# Authentication
## OpenID Connect
[aurelia-open-id-connect](https://github.com/aurelia-contrib/aurelia-open-id-connect)  
hooks `oidc-client-js` into aurelia router. And allows you to not write a lot of boilerplate code.

# Binding
## Knockout
[aurelia-knockout](https://github.com/aurelia-contrib/aurelia-knockout)  
Adds support for Knockout binding syntax to make transition from Durandal and Knockout to Aurelia simpler.

# Utility

## Typed Observable
[aurelia-typed-observable-plugin](https://github.com/aurelia-contrib/aurelia-typed-observable-plugin) 
Want to have `age:number` in your view model bound to `<input value.bind="age"/>`?
Now you can. 
```
@bindable
age:number
```
