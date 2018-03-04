# Configuring Plugins

When adding a plugin or feature a configuration parameter (shown here as `pluginConfiguration`) can also be passed which can can be used to set up application-wide defaults for the plugin.

```
import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('my-plugin', pluginConfiguration);

    aurelia.start().then(() => aurelia.setRoot());
}
```

While all plugins work in a similar manner, a real world example would be configuring the Dialog Plugin. The configuration parameter in this case is a type of `DialogConfiguration` and the above code would become:

```
import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = true; 
            config.settings.centerHorizontalOnly = false; 
            config.settings.startingZIndex = 5; 
            config.settings.keyboard = true;
        });

    aurelia.start().then(() => aurelia.setRoot());
}
```
