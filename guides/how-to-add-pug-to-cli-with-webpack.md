# Configuring Pug and Stylus with Webpack 4 and the Aurelia CLI

The [Aurelia CLI](https://aurelia.io/docs/cli) (currently v1.0.2) [does not
directly support](https://github.com/aurelia/skeleton-navigation/pull/769) Pug
templates. Here we show how to modify `webpack.config.js` and organize a project
with [pug](http://pugjs.org) and [stylus](http://stylus-lang.com/) support. This
example should help with any html or css preprocessor.

The configuration:

- adds [pug](http://pugjs.org) support
- shows use of HTML and CSS preprocessors in the same project

## Configure

Create a new aurelia project using the Aurelia CLI. These are the options used
in this example.

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

Within `webpack.config.js` there are rules and plugin initialization changes.

### Rules

In the `module.rules` array you should modify the `.css` and `.styl` rules to
test for `pug` as well as `html` files.

```js
rules: [
  {
    test: /\.css$/i,
    issuer: [{ not: [{ test: /\.(html|pug)$/i }] }],  // <-- modify
    use: extractCss
      ? [ { loader: MiniCssExtractPlugin.loader }, 'css-loader' ]
      : ['style-loader', ...cssRules]
  },
  {
    test: /\.css$/i,
    issuer: [{ test: /\.(html|pug)$/i }],             // <-- modify
    use: cssRules
  },
  {
    test: /\.styl$/i,
    use: extractCss
      ? [ { loader: MiniCssExtractPlugin.loader }, ...cssRules, 'stylus-loader' ]
      : ['style-loader', ...cssRules, 'stylus-loader'],
    issuer: /\.[tj]s$/i
  },
  {
    test: /\.styl$/i,
    use: ['css-loader', 'stylus-loader'],
    issuer: /\.(html|pug)$/i                          // <-- modify
  },
```

Also add `pug-html-loader` to the front of the `.html` loaders list.

```js
  {
    test: /\.html$/i,
    loader: ["html-loader", "pug-html-loader"]
  },
```

And of course add this new `.pug` rule.

```javascript
  {
    test: /\.pug$/,
    exclude: ["/node_modules/"],
    use: [
      "html-loader",
      'aurelia-webpack-plugin/html-requires-loader',
      {
        loader: "pug-html-loader",
        options: {
          data: {
            metadata: { title, server, baseUrl }
          }
        }
      }
    ]
  },
  // ...
```

Note above how we are passing variables to the pug pages using `options`. These
are just variables available within the `webpack.config.js` file.

### Plugins

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
    // ...
```

Note that we have moved the metadata object with it's properties `title`,
`server`, and `baseUrl` to `rules` and omitted them here in the
`HtmlWebpackPlugin`.

## Converting Files

Replace `app.html`

```html
<template>
  <h1>${message}</h1>
</template>
```

with `app.pug`

```pug
template
  require(from='app.styl')
  h1 ${message}
  p #{metadata.title}
  p #{metadata.server}
```

and create `app.styl`

```css
body {
  color: green;
}
```

Replace `index.ejs` with `index.pug`. Note that we've added a
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

In `main.ts` we need a bit of [additional
config](https://aurelia.io/docs/fundamentals/app-configuration-and-startup#customizing-conventions)
to associate views with _pug_. Here we've added the method
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

### Global Resources

Aurelia requires that you [declare your project's global
components](https://aurelia.io/docs/fundamentals/app-configuration-and-startup#making-resources-global).
In cases where there are no associated .js files, you will need to declare your
component using a `.pug` extension rather than `.html` extension.
