# How to support Markdown preprocessing

When you build an Aurelia app as a live tutorial, it's convenient to use Markdown instead of html as template.

Why not to pair your `input-tutorial.js` with `input-tutorial.md`?

```
# Input value binding tutorial

This is how you use `value.bind` on `input` tag. `<input type="text" value.bind="value">`

<!-- this is raw html in markdown -->
<input type="text" value.bind="value">
<br>
live value: ${value}

```

Ok, how to support it?

1. bootstrap your Aurelia app by aurelia-cli with `requirejs` or `systemjs`.

> I don't have a solution for `webpack` yet since I don't use it. But you are welcome to update this doc with `webpack` config.

2. update `aurelia_project/aurelia.json` file's `markupProcessor` section to add `*.md` files.

```
"markupProcessor": {
  ...
  "source": "src/**/*.{html,md}"
},
```

3. `npm install --save-dev gulp-if gulp-insert gulp-marked lazypipe`

4. update `aurelia-Project/tasks/process-markup.js`. **Now, enjoy writing Markdown!**

```
import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';
import gulpif from 'gulp-if';
import marked from 'gulp-marked';
import insert from 'gulp-insert';
import lazypipe from 'lazypipe';

const isMarkdownFile = f => f.extname === '.md';

// process markdown in GitHub Flavored Markdown
// wrap the result in <template> tag
const processMarkdown = lazypipe()
  .pipe(marked, {gfm: true})
  .pipe(insert.wrap, '<template>', '</template>');

export default function processMarkup() {
  return gulp.src(project.markupProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    // add conditional markdown processing right after changedInPlace check
    .pipe(gulpif(isMarkdownFile, processMarkdown()))
    // your setup might have additional htmlmin setup
    // make sure markdown processing is above all html processing
    .pipe(build.bundle());
}
```

BTW, you can just literally write `<require from="./my-comp"></require>` in your md files.
