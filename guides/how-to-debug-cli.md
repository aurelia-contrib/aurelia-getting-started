# How to debug Aurelia CLI using vscode

1. In debugger add new configuration.
2. Pick node / launch program
3. Modify command description to look like this:
```
{
    "type": "node",
    "request": "launch",
    "name": "Debug CLI",
    "program": "${workspaceRoot}/node_modules/aurelia-cli/bin/aurelia-cli.js",  // this is the cli executable
    "args": [
        "run",
        "--watch"
    ],
    
}
```    
4. Save launch.json that was opened or created with 1
5. You can go to the `/node_modules/aurelia-cli/bin/aurelia-cli.js` file and place breakpoints.
6. Pick your debug configuration in debugger and launch it. 
7. You are debugging CLI