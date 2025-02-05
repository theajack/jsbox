# 🚀 [JsBox](https://www.github.com/theajack/jsbox) JS online running environment

[English](https://github.com/theajack/jsbox#readme) | [Experience now](https://theajack.github.io/jsbox) | [Configuration experience address](https://theajack.github.io/jsbox?config=theajack.store)

This is a project for running and debugging js online, and it also supports multiple programming highlights

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox.png)

<details>
<summary>View more sample images</summary> ![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox1.png) ![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox2.png) ![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox3.png) ![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox4.png) ![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox5.png) </details> ## 0. Quickly insert your online demo

### 0.1 Configuration file

jsbox supports configuring a cdn file as the demo content through parameters, where the file content format is as follows

```js
window.jsboxCode = {
    libs: {
        // The cdn file of the third-party library to be introduced. A single library uses a string, and multiple libraries use an array
    },
    iifeMap: {}, // Mapping of global variables when using cdn
    codes: {
        // Your demo code
    },
    // Other configurations
    theme: 'dark', // The default is dark, and the optional values ​​are dark, light
}
```

You can also use the string form, and all other parameters use the default values

```js
window.jsboxConfig = ``; // Put your code here. The default language is javascript
```

Here is a simple [sample file](https://github.com/theajack/store/blob/main/jsbox.config.js)

In addition to using the cdn address, libs can also use the jsbox built-in library, The built-in library can be named. The JsBox built-in library list is as follows (older version, self-configuration is recommended)

```js
['jquery', 'vue', 'react', 'react-dom', 'angularjs', 'vuex', 'redux', 'loadsh', 'virtual-dom', 'node-html-parser', 'jest', 'mocha', 'moment', 'dayjs', 'underscore', 'axios', 'qrcode', 'backbone', 'js-xlsx', 'recast', 'cnchar', 'cnchar-poly', 'cnchar-order', 'cnchar-trad', 'cnchar-draw', 'cnchar-idiom', 'cnchar-xhy', 'cnchar-radical', 'cnchar-all', 'easy-icon', 'element-ui', 'element-ui-style']
```

#### libs details

libs is the CDN address for configuring third-party libraries. The following indicates that a third-party library named tc-store is defined, and the download address is https://cdn.jsdelivr.net/npm/tc-store

```json
"libs": {
    "tc-store": "https://cdn.jsdelivr.net/npm/tc-store"
},
```

#### iifeMap details

The libraries loaded through CDN are all in iife format. The object name mounted on windows needs to be specified through iifeMap. The import statements in the subsequent code will be read from this specified rule

The following configuration indicates that the introduction of tc-store will be used through window.TCStore at the bottom layer

```json
"iifeMap": {
    "tc-store": "TCStore"
},
```

```js
import {createStore} from "tc-store";
// will be converted to
const {createStore} = require("tc-srore"); // require ultimately references window.TCStore
```

#### codes configuration details

codes is a Json type, multiple demos can be configured, when there are multiple key-values, the list will be displayed on the left side of the jsbox, when there is only one, the list will be hidden.

```ts
"codes": {
    "Demo1": {
        code: string,
        dep?: string[], // current demo's dependency, value is the key configured in libs
        lang?: 'html'|'js', // default is js
        desc?: string, // current demo's description
        hideLog?: boolean, // whether to hide the debugging tool, default is false
        needUI?: boolean, // whether to display the UI, default is true when lang=html, otherwise default is false
    },
    // other demos
}
```

#### Automatically generate configuration files

Writing configuration files manually is a bit troublesome, you can use the jsbox-cmd tool to automatically generate, please refer to [jsbox-cmd](https://github.com/theajack/jsbox/tree/master/cmd)

### 0.1.1 Use with github repository (recommended)

Put your single file in your github repository, the demo url address is https://theajack.github.io/jsbox?github=user.rep.file

- The user parameter is your github account

- The rep parameter is your project name, which can be followed by @xxx to execute release, branch or commit. The latest release number is used by default. If there is no release number, the master branch is used.

- The file parameter is optional, indicating the relative address of the configuration file in the project. The default is jsbox.config.js

Here are some possible delay addresses

- https://theajack.github.io/jsbox?config=theajack.pure-v
- https://theajack.github.io/jsbox?config=theajack.pure-v@master
- https://theajack.github.io/jsbox?config=theajack.pure-v.helper/custom.code.js

#### 0.1.2 Use CDN address

Put your js code configuration file on a server and get its http address, such as http://xxx.com/config.js

The following is the online demo address you can use

https://theajack.github.io/jsbox?config=${decodeURIComponent('http://xxx.com/config.js')}

### 0.2 Use a hard-coded single link

#### 0.2.1. Open jsbox

Enter jsbox [workbench](https://theajack.github.io/jsbox)

#### 0.2.2. Select the environment and enter the demo code

##### 0.2.2.1. Pure js demo code example

Enter the demo code

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use1.png)

##### 0.2.2.2. Dependence on third-party libraries and DOM interaction

Select HTML language

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use2.png)

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use3.png)

Enter the demo code

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use4.png)

#### 0.2.3. Generate a demo link

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use5.png)

At this point, a link containing the demo code is copied to the clipboard, and you can reference it elsewhere.

In addition, you can also configure the theme color, third-party packages, font size and other settings through the menu bar, and these settings will also be saved to the connection when the link is generated

## 1. Operation manual

### 1.1. Function
1. Run and edit js, html, css code
2. Load the cdn file of the third-party library
3. Export the link, and others can directly use the code you edited by using the link
4. Export html file
5. Color theme, style aligned with vscode
6. Custom log type, custom font size

### 1.2. Shortcut keys and button description:

1. ctrl + : Enlarge the font
2. ctrl - : Reduce the font
3. ctrl m : Switch the theme
4. ctrl d : Clear the code
5. ctrl s : Temporarily save the code: After temporarily saving, the code will be saved, and refreshing the page or resetting the code will restore it to the saved state
6. ctrl e : Reset code: return to the initial state or temporary state
7. ctrl q: copy code
8. ctrl n: open the running environment selection
9. ctrl l: generate link: this link can restore the code currently being edited
10. ctrl e: clear log
11. ctrl enter: run code
12. ctrl h: switch whether the code wraps

### 1.3. search parameters:

1. theme=dark: turn on dark code editing mode, default is normal

2. code=xxx: set editor code, need to pass encodeURIComponent

3. lib=Array<link|name>: load third-party library, can be a url or [jsbox predefined library](https://github.com/theajack/jsbox/blob/master/cdn/resources.js), need to pass encodeURIComponent

If it is not a url and is not in the jsbox predefined library, jsbox will try to get it from the unpkg official website, but it is not guaranteed to be available

4. config=link: use a custom configuration file url

5. id=string: use the specified id to load the code block, need to be used with the config parameter

6. env: use [jsbox predefined runtime environment](https://github.com/theajack/jsbox/blob/master/cdn/env.js)

config > env > lib

### 1.4. config parameters

For details, see 0.3

### 1.5. hash parameter

1. #saved Fill the editor with saved code

2. #hello Enter the welcome page

### 1.6. Predefined methods

In jsbox, you can use the following methods

1. log(arg1,arg2,...): Print content

2. copy(string): Copy content to the clipboard

3. $run(): Rerun the code

4. $dom: [link-dom API](https://github.com/theajack/link-dom#readme)

5. $: shortcut for document.querySelector

6. $app: UI rendering container dom element

### 1.7 Notes

1. When using the config parameter, you can use config=user.repo@xxx, xxx can represent the branch or release version number, note that the default is to use the latest release version

2. After modifying jsbox, jsdelivr will have a cache and you need to access https://purge.jsdelivr.net/gh/{user}/{repo}/jsbox.code.js Refresh the cache

## 2. API access

### 2.1. How to use

JSBox is a universal online js runtime environment. You can customize your own js runtime environment by writing configuration files

#### 2.2. npm installation

```
npm install jsbox-util
```

```js
import JSBox from 'jsbox-util';
```

#### 2.3. cdn introduction

```html
<script src="https://cdn.jsdelivr.net/npm/jsbox-util/jsbox.min.js"></script>
```

#### 2.4. Use

##### 2.4.1 Jump to a new page to open JSBox
```ts
// Public configuration, Not required
JSBox.config({
    theme?: string;
    code?: string;
    lib?: Array<string>;
    id?: string;
    env?: string;
    lang?: string;
    run?: boolean;
    mes?: boolean;
    remind?: boolean;
    config?: string; // configuration file cdn address
})

JSBox.open(); // open jsbox using public or default configuration

JSBox.open({
... // open JSBox using temporary configuration
});

```

For available values ​​of theme, lib, env, lang, please refer to 3.3 Parameter Description

##### 2.4.2 Embed JSBox

Function under development......

##### 2.4.3 Parameter Description

1. theme: Enable dark code editing mode, default is light, optional dark

2. code: Set editor code, need to pass encodeURIComponent

3. lib: Load third-party libraries, which can be a url or [jsbox predefined library](https://github.com/theajack/jsbox/blob/master/src/npm/index.d.ts#L26), need to go through encodeURIComponent
If it is not a url and is not in the jsbox predefined library, jsbox will try to get it from the unpkg official website, but it is not guaranteed to be available
4. config: Use a custom configuration file url
5. id: Use the specified id to load the code block, which needs to be used with the config parameter
6. env: Use [jsbox predefined runtime environment](https://github.com/theajack/jsbox/blob/master/src/npm/index.d.ts#L58)
7. lang: Set the [development language](https://github.com/theajack/jsbox/blob/master/src/npm/index.d.ts#L66), with a lower priority than the language configured in env and config+id
8. run: When there is code, it will run automatically. If you don't want it to run automatically, please set run=false
9. remind: By default, when the code changes, leaving or refreshing the page will trigger a pop-up prompt. If you don't want a prompt, please set remind=false
10. mes: There will be a loading prompt when loading a third-party library. If you don't want a prompt, please set mes=false