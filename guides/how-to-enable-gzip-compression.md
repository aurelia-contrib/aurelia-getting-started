


# How to add gzip compression to ouput scripts for CLI project not based on webpack

You might want to enable on-the-fly compression of output files while running your local server in order to limit the download 
time of your bundles or just to be able to quickly evaluate the size reduction offered by compression.

In order to do this, you can augment the _run_ task with a new flag.

1. Add the _compression_ library to your dev dependencies with the following command : 
```
npm i --save-dev compression
```
or
```
yarn add compression -D
```
This will add a new dependency to your _package.json_ and download the module for you. 

2. Require this library in you _run_ task with the following line : 
```
var compress = require('compression');
```
You can now use the library in the task.

3. Create a new variable at the top of the script (after your compress import) defining the middlewares to be used by browserSync. The middlewares will either be the default ones or insert the output compression if requested by a configuration flag:
```
var middlewares = (CLIOptions.hasFlag('compress')) ? 
[historyApiFallback(), compress(), function(req, res, next) { res.setHeader('Access-Control-Allow-Origin', '*');  next(); }] :
[historyApiFallback(), function(req, res, next) { res.setHeader('Access-Control-Allow-Origin', '*');  next(); }];
```

4. In the _browserSync_ call's config, you have a _server.middleware_ property which you can set to the variable you created:
```
middleware: middlewares
```

The resulting output should look like this:

```
...
var compress = require('compression');

var middlewares = (CLIOptions.hasFlag('compress')) ? 
[historyApiFallback(), compress(), function(req, res, next) { res.setHeader('Access-Control-Allow-Origin', '*');  next(); }] :
[historyApiFallback(), function(req, res, next) { res.setHeader('Access-Control-Allow-Origin', '*');  next(); }];

let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      logLevel: 'silent',
      server: {
        baseDir: [project.platform.baseDir],
        middleware: middlewares
      }
      ...
```

Now when you pass **--compress** flag to the _run_ task it will insert output compression into browserSync's file serving.

Activate the compression by adding this flag when calling the task: **au run --compress**

Note that your bundles won't be compressed on the disk! They are compressed on the fly when they are sent to the client. You could compress the files on the disk also by using the compression library in the _build_ task instead of the _run_ task behind a _compress_ flag also and the flag would be available to the _run_ task as it makes use of the _build_.
