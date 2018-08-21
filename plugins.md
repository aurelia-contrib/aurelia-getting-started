# Plugins for Aurelia
The dream is to accumulate all the great plugins for Aurelia in [aurelia-contrib organisation](https://github.com/aurelia-contrib).
There are a lot of great plugins out there. But discoverability suffers.

Wouldn't it be nice to have a central place that had it all? So once found - there is instantly a lot more to find.
> Plugin authors can join the organisation and move plugins to the aurelia-contrib organisation.
> Create an issue or ping @alexander-taran on gitter to request membership. We'll set you up!!


# Authentication
## OpenID Connect
[aurelia-open-id-connect](https://github.com/aurelia-contrib/aurelia-open-id-connect)
hooks `oidc-client-js` into aurelia router. And allows you to not write a lot of boilerplate code.

# Binding
## Knockout
[aurelia-knockout](https://github.com/aurelia-contrib/aurelia-knockout)
Adds support for Knockout binding syntax to make transition from Durandal and Knockout to Aurelia simpler.

# Templating
## Dynamic Html
[aurelia-dynamic-html](https://github.com/aurelia-contrib/aurelia-dynamic-html)
Custom element that takes (server- or client side) generated html and compiles it into a fully functional Aurelia View ([live demo](https://aurelia-contrib.github.io/aurelia-dynamic-html/))

# Utility
## Router Metadata
[aurelia-router-metadata](https://github.com/aurelia-contrib/aurelia-router-metadata)

Extension to `aurelia-router` that adds eager loading capabilities for child routes, provides decorators `@routeConfig` and `@configureRouter` as an alternative to `configureRouter()`, and allows you to configure the `AppRouter` in your `main` file.

## Typed Observable
[aurelia-typed-observable-plugin](https://github.com/aurelia-contrib/aurelia-typed-observable-plugin)
Want to have `age:number` in your view model bound to `<input value.bind="age"/>`?
Now you can.
```
@bindable
age:number
```

## Getter Throttle
[aurelia-getter-throttle](https://github.com/aurelia-contrib/aurelia-getter-throttle)

Throttle getter to make Aurelia rendering efficient. This `getterThrottle` decorator works for both computedFrom and dirty-check properties, reduces the number of calls (Aurelia calls and your calls) to one for every rendering cycle.

## Combo
[aurelia-combo](https://github.com/aurelia-contrib/aurelia-combo)

An Aurelia plugin for easy keyboard combo short-cuts using [keymaster](https://github.com/madrobby/keymaster).
