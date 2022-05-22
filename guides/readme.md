# guides

A collection of small task-oriented guides

## Tooling

- [How to debug aurelia-cli](how-to-debug-cli.md) aurelia-cli is just a nodejs program. And it is right there in node_modules folder of your CLI-based project. You can debug it like your own. All you have to do is launch it with debugger attached.

- [Add gzip compression for CLI project in development](how-to-enable-gzip-compression.md) Want to have an idea how big your bundles are and don't want to `au build --env prod` all the time? Now you can just look in browser developer tools.

- (deprecated, aurelia-cli now has [plugin support built-in](https://aurelia.io/docs/plugins/write-new-plugin/)) [How to use aurelia-cli to develop plugin](how-to-use-cli-to-develop-plugin.md) This might surprise you, but aurelia-cli is all ready for the job to develop Aurelia plugin, with great benefit over current dev flow with [skeleton-plugin](https://github.com/aurelia/skeleton-plugin).

## Recipes

- [How to use markdown files as views](how-to-support-markdown-preprocessing.md) if you are writing documentation site. Or just have some markdown files that you want to enhance with Aurelia - you can. Learn how you can modify markupProcessing task of CLI based project to use .md files as views.

- [How to simplify module imports with relative paths (typescript)](how-to-simplify-your-import-paths-in-typescript.md) does your project have a lot of imports like this: `import {log} from './../../../../services/log';` learn how you can escape from that dot hell.

- [Show a spinner/loader only when loading is not instant](how-to-show-spinner-only-when-something-is-slow.md) are you using a spinner to inform the user that something is loading? Does it bother you that it flashes for some milliseconds when content is loaded fast? Here is how you can make it appear only if operation takes more than a threshold.

- [Mock API's with .json files](how-to-create-a-simple-aurelia-api-mock-service.md) how to serve up static json files instead of real API calls.

- [Using PUG and Stylus in the same Webpack project](how-to-add-pug-to-cli-with-webpack.md). Starting with aurelia-cli and webpack, make Pug and Stylus work together. The instructions should work with any other css preprocessor.
