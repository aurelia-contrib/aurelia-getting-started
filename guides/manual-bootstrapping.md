## manual bootstrapping with aurelia

Maybe you're not a big fan of all the magic of `aurelia-bootstrapper` or you just want to understand a little more about aurelia.

after some experimentation this is how you can initialize manually

[`main.ts`](https://github.com/obedm503/bundler-friendly-aurelia/blob/a000af19eb21f087d2a8703171aa6f0531a0fb4c/src/main.ts)
[`bootstrapper.ts`](https://github.com/obedm503/bundler-friendly-aurelia/blob/a000af19eb21f087d2a8703171aa6f0531a0fb4c/src/bootstrapper.ts)

[then point your bundler `main.ts` instead of `aurelia-bootstrapper`](https://github.com/obedm503/bundler-friendly-aurelia/blob/a000af19eb21f087d2a8703171aa6f0531a0fb4c/webpack.config.js). if you have any suggestions just let me know on the [repo](https://github.com/obedm503/bundler-friendly-aurelia).

manual boostrapping is just one of the things the repo aims to make more explicit about aurelia. follow the greater discussion on [discourse](https://discourse.aurelia.io/t/discussion-bundler-friendly-aurelia/959)
