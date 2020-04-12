# JSBOX-UTIL JS在线运行环境 

JSBOX-UTIL by [theajack](https://www.github.com/theajack)

[立即体验](https://theajack.gitee.io/jsbox) | [操作手册]()

这是一个在线运行调试js的项目 

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
<script src="https://cdn.jsdelivr.net/gh/theajack/jsbox/dist/jsbox.latest.min.js"></script>
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
    id?: string;
    env?: string;
})

JSBox.open(); // 使用公共配置或默认配置打开jsbox

JSBox.open({
    ... // 使用临时配置打开JSBox
});

```

##### 3.2 内嵌JSBox

功能开发中......

##### 3.3 参数说明

1. theme: 开启dark代码编辑模式，默认为normal
2. code: 设置编辑器代码，需要经过 encodeURIComponent
3. lib: 加载第三方库，可以是一个url或者[jsbox预定义的库](https://github.com/theajack/jsbox/blob/master/cdn/resources.js)，需要经过 encodeURIComponent
    如果不是url，且不在jsbox预定义库中，jsbox会尝试从unpkg官网获取，但不保证可用
4. config: 使用自定义的配置文件url
5. id: 使用指定的id加载代码块，需要与config参数一起使用
6. env: 使用[jsbox预定义的运行环境](https://github.com/theajack/jsbox/blob/master/cdn/env.js)
7. run: 当有code时，会自动运行，如不希望自动运行，请设置 run=false
8. remind: 默认当代码改变时离开或刷新页面 会触发弹窗提示，如不希望提示，请设置 remind=false
9. mes: 加载第三方库时会有加载提示，如不希望提示，请设置 mes=false


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

config参数应该指向一个js文件，该文件需要在window对象上定义以下json数据

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


##### 说明
1. libs: 依赖的cdn地址，非必需
2. codes: codes用于存储一些代码，codes中的键值既对应search参数中的id值，jsbox会加载对应的代码，如果id值为空，jsbox会加载第一个键值对应的代码，若codes为string类型，jsbox会忽略id值


### 2.5. hash参数
1. #saved 使用暂存代码填充编辑器
2. #hello 进入欢迎页


### 2.6. 预定义方法

在jsbox中，您可以使用以下方法
1. log(arg1,arg2,...); 打印内容
2. copy(string); 复制内容到剪切板
