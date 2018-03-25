# How to show spinner only when something is slow

First make sure upgrade all your packages, you need running with `aurelia-templating-resources` latest version `1.6.0` or above.

The latest version contains an important bug fix for debounce.

Yes, debounce. It's so obvious once pointed out, isn't it?

```html
<my-spinner if.bind="router.isNavigating & debounce"></my-spinner>
```

```html
<loading-indicator
  loading.bind="router.isNavigating || api.isRequesting & debounce:500"
></loading-indicator>
```

> Note: debounce, does not only remove spikes, delay appearance of spinner, but also delay disappearance of spinner. Too big delay is probably not what you want.

The take away is, throttle and debounce are mathematical functions that can manipulate time. It is a stereotype to only use them on input and event.
