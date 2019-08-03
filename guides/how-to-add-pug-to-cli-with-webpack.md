# Configuring support for PUG and Stylus using the Aurelia CLI with Webpack

The [Aurelia CLI](https://aurelia.io/docs/cli) (currently v1.0.2) [does not directly support](https://github.com/aurelia/skeleton-navigation/pull/769)
Pug templates. Here we show how to modify
`webpack.config.js` and organize a project with [pug](http://pugjs.org) and
[stylus](http://stylus-lang.com/) support.

The configuration adds:

- [pug](http://pugjs.org) support
- use of HTML and CSS preprocessors in the same project

## Configure

Create a new aurelia project using the Aurelia CLI. These are the options I used in this example.

- _Custom App_
- Bundler - _Webpack_
- HTTP Protocol - _either_
- What platform are you targeting? - _Web_
- Transpiler - _Your choice_
- HTML template setup - _None_
- CSS preprocessor - _Stylus is what I am using in this example_
- PostCSS processing - _Typical_
- Unit test runner - _Your choice_
- Configure integration testing - _Your choice_
- Default code editor - _Your choice_
- Features scaffolded into project? - _Minimum_

Within the project folder, add the following dependencies.
[pug](http://pugjs.org) is needed to process pug files, and
[pug-html-loader](https://www.npmjs.com/package/pug-html-loader) is needed to load pug files into [webpack](https://webpack.js.org/).

```bash
npm install -D pug pug-html-loader
```

## webpack.config.js

Within `webpack.config.js` there are several changes.

In the `module.rules` array you'll need to add a new pug rule:

```javascript
rules: [
  {
    test: /\.pug$/,
    exclude: ["/node_modules/"],
    use: [
      "html-loader",
      {
        loader: "pug-html-loader",
        options: {
          data: {
            metadata: { title, server, baseUrl }
          }
        }
      }
    ]
  }
];
```

Also in the `module.rules` array you will need to replace this html rule:

```js
      { test: /\.html$/i, loader: "html-loader" },
```

with this ([this addresses the problem of using both an HTML and CSS
preprocessor in the same
project](https://github.com/aurelia/webpack-plugin/issues/47)):

```js
      {
        test: /\.html$/i,
        loader: ["html-loader", "pug-html-loader"]
      },
```

Within the list of plugins you'll need to:

- configure webpack to load your `index.pug` file rather than the Aurelia CLI
  default `index.ejs` file
- tell Aurelia that your view files are _.pug_ or _.html_ files

```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.pug',
      inject: true
    })
    new AureliaPlugin( { viewsExtensions: ['.pug' ,'.html']} ),
 ]
```

Note that we have moved the metadata object with it's properties `title`,
`server`, and `baseUrl` to `rules` and omitted them here in the
`HtmlWebpackPlugin`.

## Converting Files

### app.pug

Replace `app.html` with `app.pug` and change it's contents from

```html
<template>
  <h1>${message}</h1>
</template>
```

to

```pug
template
  h1 ${message}
```

### index.pug

Create `index.pug` to replace `index.ejs` as shown here. Note that I've added a
few additional script `include` elements for illustrative purposes. These
`include` references are to files stored within your project.

```pug
doctype html
html
  head
    meta(charset='utf-8')
    title #{metadata.title}
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

### main.ts

We need a bit of [additional
config](https://github.com/aurelia/skeleton-navigation/issues/396#issuecomment-207823852)
so that views are associated with _pug_. Here we've added the method
`convertOriginToViewUrl` to `ViewLocator`.

```ts
import { Aurelia, ViewLocator } from "aurelia-framework";
import environment from "./environment";
import { PLATFORM } from "aurelia-pal";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName("resources/index"));

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  ViewLocator.prototype.convertOriginToViewUrl = function(origin) {
    let moduleId = origin.moduleId;
    let id =
      moduleId.endsWith(".js") || moduleId.endsWith(".ts")
        ? moduleId.substring(0, moduleId.length - 3)
        : moduleId;
    return id + ".pug";
  };

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
```

### One last bit

This isn't everything you need to know. You'll also need to declare
global components using `my-component.pug` rather than
`my-component.html` in cases where there is not an associated .js
file. You can read more about this in
[this blog post](http://jimpravetz.com/blog/2018/05/webpack-aurelia/), which I
may migrate to these how-to pages once it's more complete.
