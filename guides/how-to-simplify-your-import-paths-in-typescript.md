# How to simplify your import paths in Typescript

## Path mapping
When your project starts to grow it's not unusual to end up with paths like this. This make it difficult to refactor and slow to add new imports.

```typescript
import {log} from './../../../../services/log';
```

When you'd really rather just do this

```typescript
import {log} from 'services/log';
```

With some adjustments to your `tsconfig.json` you can do just that. You need to set the `baseUrl` and the `paths` you want to map, you can find out more about [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) in the Typescript docs.

tsconfig.json
```json 
{ 
  ...
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "*":["*"],
      "services/*": ["src/services/*"],
      "attributes/*": ["src/resources/attributes/*"],
      "valueConverters/*": ["src/resources/value-converters/*"]
    }
  }
  ...
}
```

It's a common convention to add '@' to paths (presumably so you can differentiate between your internal modules) so you could you'd end up with this.

tsconfig.json
```json 
{ 
  ...
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "*":["*"],
      "@services/*": ["src/services/*"],
      "@attributes/*": ["src/resources/attributes/*"],
      "@valueConverters/*": ["src/resources/value-converters/*"]
    }
  }
  ...
}
```

and you imports like this


```typescript
import {log} from '@services/log';
```

### Give Webpack a helping hand
You need a little more config to get this working with webpack (3+). If you're using [ts-loader](https://github.com/TypeStrong/ts-loader) you're going to need to use [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) and you'll end up adding it to your webpack config like this.

```
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...
  resolve: {
    plugins: [new TsconfigPathsPlugin({ /*configFile: "./path/to/tsconfig.json" */ })]
  }
  ...
}
```

If you're using [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader/issues) then at the time of writing you might struggle but the config is almost identical.

### TODO
- How does this relate to the `path` section of `aurelia.json`?


## Importing Folders as Modules (Barrel)
Underneath an example of some imports from the folder `services`. This could feel like your doing some duplication, the path contains `log` and we import the `Log`.

```typescript
import { Log } from '../../services/log';
import { SignalrDispatcher } from '../../services/signalr-dispatcher';
```

But maybe you prefer

```typescript
import { Log, SignalrDispatcher } from '../../services/index';
```

This can be accomplished by creating an index.ts file, which serves as the entry point from which you're exporting the folder content.

```
export * from './log';
export * from './signalr-dispatcher';
```

More info about this topic can be found [here](https://github.com/basarat/typescript-book/blob/master/docs/tips/barrel.md)
