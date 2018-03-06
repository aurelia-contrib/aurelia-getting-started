// config file for webpack 4
// which combines all of your app code and dependencies into a single output file

// source: https://github.com/jods4/aurelia-webpack-build/blob/master/demos/01-No_splits/webpack.config.js
// comments by: aurelia-contrib https://github.com/aurelia-contrib

// require is a nodejs function to load modules
// path is nodejs module needed for working with paths. https://nodejs.org/dist/latest-v8.x/docs/api/path.html
const path = require("path");  

// AureliaPlugin is a plugin for webpack which helps webpack with understanding Aurelias conventions
// It resolves modules referenced in views with <require> tag and with PLATFORM.moduleName() in your code
// so webpack can add them to output as used depenencies
const { AureliaPlugin } = require("aurelia-webpack-plugin");  

// webpack uses this export as it's config 
// if this file is called webpack.config.js webpack would pick it up automatically
// or you can run 'webpack --config custom.webpack.config.js'
module.exports = {

// webpack mode defines features of output like source maps and minification
  mode: "development",

// entry defines where your app starts. for a convention based aurelia app it starts with bootstrapper
// which will find aurelia-app attribute in the DOM and call configure function of the module defined by it
// for <body aurelia-app="main"> it will load main module and call its configure function passing Aurelia instance as a parameter
  entry: "aurelia-bootstrapper",

  output: {

// the target directory for all output files
// must be an absolute path (use the Node.js path module)
    path: path.resolve(__dirname, "dist"),

// the url to the output directory resolved relative to the HTML page
    publicPath: "/dist/",

// file name of the output bundle    
    filename: "bundle.js",    
  },

// options for resolving module requests
// (does not apply to resolving to loaders)
  resolve: {

// extensions that are used
    extensions: [".ts", ".js"],

// directories where to look for modules
    modules: ["src", "node_modules"]
  },

  module: {
// this define how process the modules
// test - is a regular expression for file names to test against 
// if it is a match the loaders will be applied in order right to left
// if you want to understand more hit the webpack docs @ https://webpack.js.org/
    rules: [
      { test: /\.less$/i, use: ["style-loader", "css-loader", "less-loader"] },
      { test: /\.ts$/i, use: "ts-loader" },
      { test: /\.html$/i, use: "html-loader" },
    ]
  },  

// Here we add AureliaPlugin to webpack pipeline and tell it to grab everything under src directory of our project
// detailed plugin options could be found here https://github.com/aurelia/webpack-plugin/wiki/AureliaPlugin-options

// Jods4:
// Basically includeAll replaces PLATFORM.moduleName annotations by assuming everything in the glob might be loaded by Aurelia.
// This works and it's nice for large codebases because they don't need to modify their code to use Webpack.
// Only use it as a starting point if you are migrating to webpack from other loader/bundler
// With this setting you can't do code splitting, you loose tree shaking, exports renaming, scope hoisting, etc.
// It's also good for small projects, experiments, demos, PoC.  
  
  plugins: [
    new AureliaPlugin({ includeAll: "src" }),
  ],
};
