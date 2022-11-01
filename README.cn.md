# 🚀 JSBOX-UTIL JS在线运行环境 

JSBOX-UTIL by [theajack](https://www.github.com/theajack)

[English](https://github.com/theajack/jsbox#readme) | [立即体验](https://shiyix.cn/jsbox) | [vue开发环境](https://shiyix.cn/jsbox?env=vue) | [react开发环境](https://shiyix.cn/jsbox?env=react) <!-- | [操作手册]() -->

这是一个在线运行调试js的项目, 当然也支持多种编程高亮

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox.png)

<details>
    <summary>查看更多示例图</summary>

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox1.png)

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox2.png)

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox3.png)

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox4.png)

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/jsbox5.png)

</details>

## 0. 快速插入您的在线演示

### 0.1 使用单文件

jsbox支持通过参数配置一个cdn文件，支持配合github仓库使用

其中单文件是一个js文件，其内容格式如下

```js
window.jsboxCode = ``; // 此处放您的代码 语言默认为javascript
```

或使用json配置

```js
window.jsboxCode = {
    lib: '', // 需要引入的第三方库的cdn 文件单个库使用字符串，多个使用数组 也可以使用jsbox内置库, 内置库使用name即可
    code: ``,
    lang: 'javascript', // 默认为 javascript 可选值为 javascript, html, ... 详见jsbox lang type
    theme: 'dark', // 默认为 dark， 可选值为 dark，light
    wrapCode: true, // 是否使用函数包裹js代码，产生闭包，默认为false
    needUI: true, // 是否使用ui显示区域 默认值为false
    useDefaultUI: true, // 是否使用默认ui 默认为false
    hideLog: false, // 是否隐藏log 默认为false
}
```

JsBox 内置库list

```js
['jquery', 'vue', 'react', 'react-dom', 'angularjs', 'vuex', 'redux', 'loadsh', 'virtual-dom', 'node-html-parser', 'jest', 'mocha', 'moment', 'dayjs', 'underscore', 'axios', 'qrcode', 'backbone', 'js-xlsx', 'recast', 'cnchar', 'cnchar-poly', 'cnchar-order', 'cnchar-trad', 'cnchar-draw', 'cnchar-idiom', 'cnchar-xhy', 'cnchar-radical', 'cnchar-all', 'easy-icon', 'element-ui', 'element-ui-style']
```

#### 0.1.1 配合github仓库使用（推荐）

将您的单文件放在您的github仓库中，默认为 jsbox.code.js 文件

则生成的url为 https://shiyix.cn/jsbox?github=user.rep.file

user 参数为您的github账号

rep 参数为您的项目名称，后面可以带 @xxx 来执行 release、branch或commit，默认使用最新的 release号，如果没有则使用master分支

file 参数可选，表示配置文件在项目中的相对地址，默认为 jsbox.code.js

则以下是您可以使用的在线演示地址

https://shiyix.cn/jsbox?github=theajack.pure-v

或 https://shiyix.cn/jsbox?github=theajack.pure-v@master

或 https://shiyix.cn/jsbox?github=theajack.pure-v.helper/custom.code.js
   
#### 0.1.2 使用cdn地址

将您的js code 配置文件放在部署在某个服务器上，拿到他的http地址，如 http://xxx.com/config.js

则以下是您可以使用的在线演示地址

https://shiyix.cn/jsbox?codeSrc=${decodeURIComponent('http://xxx.com/config.js')}

### 0.2 使用硬编码的单链接

#### 0.2.1. 打开jsbox

进入 jsbox [工作台](https://shiyix.cn/jsbox)

#### 0.2.2. 选择环境，输入演示代码

##### 0.2.2.1. 纯js演示代码实例

输入演示代码

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use1.png)

##### 0.2.2.2. 依赖第三方库以及dom交互

选择html语言

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use2.png)

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use3.png)

输入演示代码

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use4.png)

#### 0.2.3. 生成演示链接

![jsbox](https://cdn.jsdelivr.net/gh/theajack/jsbox/cdn/images/use5.png)


至此，一条含有演示代码的链接复制到了剪切板，你可以在其他地方引用。

除此之外你还可以通过菜单栏配置主题色，第三方包，字体大小等设置，这些设置也会在生成链接的时候被保存到连接中

### 0.3 接入工作区

当您有大量实例代码需要接入是可以使用这个配置文件

config参数应该指向一个在线的js文件，该文件需要在window对象上定义以下json数据

```js
window.jsbox_config = {
    libs: {
        'loadsh': 'xxx', // 字符串方式
        'jquery': {
            url: 'xxx', // 必须
            type: 'script', // 非必须 声明是js还是css，如果未声明会从url中解析
            version: 'xxx', // 非必须 声明版本
        },
        'cnchar': 'jsbox.cnchar', // 如果要使用jsbox预定的库，请使用jsbox.xxx
    },
    codes: { // 
        'helloWorld': 'console.log("Hello world")', // 字符串方式 默认使用上面定义的所有依赖
        'testLoadsh': {
            code: '_.cloneDeep({a:1})', // 必须 代码
            dep: ['loadsh', 'jsbox.cnchar'], // 非必需 定义依赖，从当前文件中查找，如果不填会加载当前文件中的所有libs, 如果要使用jsbox预定义的库，请使用jsbox.xxx
        },
    }
}
```

则以下是您可以使用的在线演示地址

https://shiyix.cn/jsbox?config={url}&id=helloWorld}

您也可以使用 搭配github仓库使用 config配置文件，默认为 jsbox.config.js 文件，其他规则可以参考 0.1.1

以下为两个例子

https://shiyix.cn/jsbox?githubConfig={user}.{rep}

或 https://shiyix.cn/jsbox?githubConfig={user}.{rep}.{file}

##### 说明

1. libs: 依赖的cdn地址，非必需
2. codes: codes用于存储一些代码，codes中的键值既对应search参数中的id值，jsbox会加载对应的代码，如果id值为空，jsbox会加载第一个键值对应的代码，若codes为string类型，jsbox会忽略id值

## 1. API 接入

### 0. 如何使用

JSBox 是一个通用的 在线js运行环境，您可以通过编写配置文件定制属于自己的js运行环境

#### 1. npm 安装 

```
npm install jsbox-util
```

```js
import JSBox from 'jsbox-util';
```

#### 2. cdn引入

```html
<script src="https://cdn.jsdelivr.net/npm/jsbox-util/jsbox.min.js"></script>
```

#### 3. 使用

##### 3.1 跳转到新页面打开JSBox
```ts
// 公共配置, 非必须
JSBox.config({
    theme?: string;
    code?: string;
    lib?: Array<string>;
    config?: string;
    githubConfig?: string;
    id?: string;
    env?: string;
    lang?: string;
    run?: boolean;
    mes?: boolean;
    remind?: boolean;
    codeSrc?: string;
    github?: string;
})

JSBox.open(); // 使用公共配置或默认配置打开jsbox

JSBox.open({
    ... // 使用临时配置打开JSBox
});

```

theme, lib, env, lang 可用值请参考3.3参数说明

##### 3.2 内嵌JSBox

功能开发中......

##### 3.3 参数说明

1. theme: 开启dark代码编辑模式，默认为light, 可选dark
2. code: 设置编辑器代码，需要经过 encodeURIComponent
3. lib: 加载第三方库，可以是一个url或者[jsbox预定义的库](https://github.com/theajack/jsbox/blob/master/src/npm/index.d.ts#L26)，需要经过 encodeURIComponent
    如果不是url，且不在jsbox预定义库中，jsbox会尝试从unpkg官网获取，但不保证可用
4. config: 使用自定义的配置文件url
5. id: 使用指定的id加载代码块，需要与config参数一起使用
6. env: 使用[jsbox预定义的运行环境](https://github.com/theajack/jsbox/blob/master/src/npm/index.d.ts#L58)
7. lang: 设置[开发语言](https://github.com/theajack/jsbox/blob/master/src/npm/index.d.ts#L66)，优先级低于 env 和 config+id 中配置的语言
8. run: 当有code时，会自动运行，如不希望自动运行，请设置 run=false
9. remind: 默认当代码改变时离开或刷新页面 会触发弹窗提示，如不希望提示，请设置 remind=false
10. mes: 加载第三方库时会有加载提示，如不希望提示，请设置 mes=false

## 2. 操作手册

### 2.1. 功能
1. 运行和编辑js、html、css代码
2. 加载第三方库的cdn文件
3. 导出链接，其他人使用链接可以直接使用您编辑的代码
4. 导出html文件
5. 颜色主题，风格与vscode对齐
6. 自定义log类型，自定义字体大小

### 2.2. 快捷按键与按钮说明：

1. ctrl + : 放大字体
2. ctrl - : 缩小字体
3. ctrl m : 切换主题
4. ctrl d : 清空代码
5. ctrl d : 清空代码
6. ctrl s : 暂存代码：暂存之后代码会被保存起来，刷新页面或重置代码都会还原到保存的状态
7. ctrl e : 重置代码：回到初始态或暂存状态
8. ctrl q : 复制代码
9. ctrl n : 打开运行环境选择
10. ctrl l : 生成链接：该链接打开可以还原当前正在编辑的代码
11. ctrl e : 清空log
12. ctrl enter : 运行代码

### 2.3. search参数：

1. theme=dark: 开启dark代码编辑模式，默认为normal
2. code=xxx: 设置编辑器代码，需要经过 encodeURIComponent
3. lib=Array<link|name>: 加载第三方库，可以是一个url或者[jsbox预定义的库](https://github.com/theajack/jsbox/blob/master/cdn/resources.js)，需要经过 encodeURIComponent
    如果不是url，且不在jsbox预定义库中，jsbox会尝试从unpkg官网获取，但不保证可用
4. config=link: 使用自定义的配置文件url
5. id=string: 使用指定的id加载代码块，需要与config参数一起使用
6. env: 使用[jsbox预定义的运行环境](https://github.com/theajack/jsbox/blob/master/cdn/env.js)
   
config > env > lib

### 2.4. config参数

详情见 0.3


### 2.5. hash参数

1. #saved 使用暂存代码填充编辑器
2. #hello 进入欢迎页


### 2.6. 预定义方法

在jsbox中，您可以使用以下方法

1. log(arg1,arg2,...); 打印内容
2. copy(string); 复制内容到剪切板

### 2.7 注意事项

1. 使用 github 参数时，可以使用 github=user.repo@xxx，xxx可以表示分支或者release版本号，注意默认是使用最新的release版本好
2. 修改jsbox之后，jsdelivr会有缓存，需要访问 https://purge.jsdelivr.net/gh/{user}/{repo}/jsbox.code.js 刷新一下缓存
