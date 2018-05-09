# Configuring Pug with Webpack 4 and the Aurelia CLI

date: 2018-05-07 16:00

The [Aurelia CLI](https://aurelia.io/docs/cli) (currently v0.33.1) [does not yet support](https://github.com/aurelia/skeleton-navigation/pull/769) [pug](http://pugjs.org) templates.
This post shows how to setup pug once you've installed a new webpack4-based Aurelia project.


## Configure

[pug](http://pugjs.org) is needed to process pug files, and
[pug-loader](https://github.com/pugjs/pug-loader) is needed to load pug files into [webpack](https://webpack.js.org/).

```bash
yarn add -D pug-loader
yarn add -D pug
```

## webpack.config.js

Within the webpack.config.js `module.rules` array you'll need to add the following rule:

```javascript
  rules: [
    { test: /\.pug$/, loader: 'pug-loader', options: { pretty: true } }
    ]
```

And within the list of plugins you'll need to
- configure webpack to load your index.pug file rather than the Aurelia CLI default index.ejs file
- tell Aurelia that your view files are .pug files


```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
      inject: true,
      metadata: {
        // available in index.pug under locals
        title, server, baseUrl
      }
    })
    new AureliaPlugin( { viewsExtensions: '.pug' } ),
 ]
```


## index.pug

Converting the default index.ejs to index.pug requires access to the metadata variables added above.
In pug these are attached to `locals`.
Pug _evals_ anything within ``#{`` and `}``, so you can see what variables are available by using `Object.keys(locals)`.
It works out that our metadata is actually attached to `locals.htmlWebpackPlugin.options.metadata`.

```pug
doctype html
keys #{Object.keys(locals.htmlWebpackPlugin.options.metadata)}
```

The resultant index.pug is here. Note that I've added a few additional script includes.

```pug
- var metadata = locals.htmlWebpackPlugin.options.metadata
doctype html
html
  head
    meta(charset='utf-8')
    title #{locals.htmlWebpackPlugin.options.metadata.title}
    meta(name='viewport' content='width=device-width, initial-scale=1')
    base(href=metadata.baseUrl)
    script
      include javascripts/fontawesome-config.js
    script
      include javascripts/google-tag-manager.js
    script(defer src='https://use.fontawesome.com/releases/v5.0.2/js/all.js')
    script
      include javascripts/intercom.js

    // imported CSS are concatenated and added automatically

  body(aurelia-app='main')
    // Webpack Dev Server reload
    if (metadata.server)
      script(src='/webpack-dev-server.js')
```

### main.js

A bit of [additional config](https://github.com/aurelia/skeleton-navigation/issues/396#issuecomment-207823852) to associate views with pug.

```
var Promise = require('bluebird') // Promise polyfill for IE11;
import {bootstrap} from 'aurelia-bootstrapper-webpack';
import {ViewLocator} from 'aurelia-framework';
```

```
bootstrap(function(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  ViewLocator.prototype.convertOriginToViewUrl = function (origin) {
    let moduleId = origin.moduleId;
    let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;
    return id + '.pug';
  }

  aurelia.start().then(() => aurelia.setRoot('app', document.body));
})
```

### One last bit

This isn't everything you need to know. You'll also need to declare
global components using `my-component.pug` rather than
`my-component.html` in cases where there is not an associated .js
file.  You can read more about this in
[this blog post](http://jimpravetz.com/blog/2018/05/webpack-aurelia/), which I
may migrate to these how-to pages once it's more complete.