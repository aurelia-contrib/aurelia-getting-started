See the original thread @ https://discourse.aurelia.io/t/a-note-on-webpacks-tree-shaking-and-why-platform-modulename-is-necessary/946

I've seen this question pop up from time to time, so for those who are having problems with modules not being loaded or are generally curious why/how this works:

Webpack applies a technique called [tree-shaking](https://webpack.js.org/guides/tree-shaking/). In summary, it statically analyzes your project files looking for `import` statements in order to determine what needs to be included in the bundle.
It starts doing this at your bundle entry and recursively calls each imported module until every import is resolved. Any project file that is **not** imported anywhere, will **not** be included in the bundle.

### Before webpack

Aurelia has always had alternative means to reference modules outside of `import` statements. Examples:
-  RouterConfiguration `moduleId: "path-to-module"`
- `au.setRoot("path-to-app-module")`
- `au.use.plugin("plugin-name")`
- `au.use.feature("path-to-feature-module")`
- `au.use.globalResources("path-to-resource-module")`

Traditionally this has never posed any problems because with pure RequireJS, SystemJS, as well as aurelia-cli projects, you explicitly defined your bundles with paths and globbing patterns. Any files resolved from those were included in the bundles.

### With webpack

In webpack, you don't define your bundles anymore - rather, you define an entry point and that's it. It uses the static structure of ES2015 module syntax to automatically determine the contents of the bundle.

Consequently, the "aurelia way" of referencing modules are not recognized as imports and the files are never included.

As described in the [webpack plugin docs](https://github.com/aurelia/webpack-plugin/wiki/AureliaPlugin-options) there is an `includeAll` option you can pass the aurelia plugin (`new AureliaPlugin({ includeAll: "src" })`) which forces **all** files under `src` to be included in the bundle and the "old" way will then work again, but this is typically not desirable for production apps.

### Enter PLATFORM.moduleName

You can think of `PLATFORM.moduleName` as aurelia's version of `import`.

`PLATFORM.moduleName` in itself doesn't do anything interesting in terms of ensuring webpack imports the module.
However `aurelia-webpack-plugin` uses it to determine what files to include in the bundle, in much the same way webpack itself uses `import` statements for that.

In simple terms, the plugin goes through the raw javascript of each project file and looks for "PLATFORM.moduleName" as a magic string of sorts. It extracts the string from the call and gives that back to webpack in the form of a dependency. (additionally, as @jods4 pointed out, it disables optimizations which are not compatible with `aurelia-loader)`

As you might expect from a static analysis tool, this then won't work for any programmatically created strings. Which is a bit unfortunate for those (including me) who used to programmatically create some of these configurations to keep things clean, but makes perfect sense when you realize that this never worked for `import` either.

### And finally..

It's worth noting that once a module has been included via `PLATFORM.moduleName`, it doesn't need to be included again. This allows you, for example, to do something like this as a replacement for what used to be bundle configurations:

`src/main.ts`:

```ts
// ensure the includes files is resolvable via the entry point
import "./includes"; 
```

`src/includes.ts`

```ts
import { PLATFORM } from "aurelia-pal";

// declare all pages we need
PLATFORM.moduleName("pages/page1");
PLATFORM.moduleName("pages/page2");
PLATFORM.moduleName("components/component1");
PLATFORM.moduleName("components/component2");
```

Now, wherever you need the modules declared above, you don't need to use `PLATFORM.moduleName` anymore and you can even programmatically generate those route configs and such. They are already included in the bundle via `includes.ts` and don't need to be included again.

Whether this is a nice solution or not depends on the situation, but it's another tool in the toolbox which may come in handy.

As @jods4 pointed out, the modules listed above will then be a dependency of `includes.ts` and this will affect code splitting. Arguably it's simply a slightly-less-harmful variant of the `includeAll` option, but still not something you'd want to do in a large production app where you want every optimization.