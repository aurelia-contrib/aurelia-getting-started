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

With some adjustments to your `tsconfig.json` you do just that. You need to set the `baseUrl` and the `paths` you want to map, you can find out more about [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) in the Typescript docs.

T

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

### TODO
- How does this relate to the `path` section of `aurelia.json`?


## Importing Folders as Modules
Underneath an example of some imports from the folder `services`. This could feel like your doing some duplication, the path contains `log` and we import the `Log`.

```typescript
import { Log } from '../../services/log';
import { SignalrDispatcher } from '../../services/signalr-dispatcher';
```

But maybe you prefere

```typescript
import { Log, SignalrDispatcher } from '../../services/index';
```

This can be accomplished by creating an index.ts file, which serves as the entry point from which you're exporting the folder content.

```
export * from './log';
export * from './signalr-dispatcher';
```
