# [TCon](https://git.code.oa.com/tackchen/tcon)
### 基于 try catch 捕获所有异常的移动端调试工具
----

[线上体验](https://www.theajack.com/tcon)

----
#### 1. 效果图
#### 2. Why TCon
#### 3. 基本用法
#### 4. webpack loader
#### 5. 编写一个tcon插件
----

# 1.效果图

tcon 功能
![导图](https://www.theajack.com/tcon/images/TCon.png)

----

![tcon1](https://www.theajack.com/tcon/images/tcon1.png)

----

![tcon2](https://www.theajack.com/tcon/images/tcon2.png)

----

![tcon3](https://www.theajack.com/tcon/images/tcon3.png)

----

![tcon4](https://www.theajack.com/tcon/images/tcon4.png)

----

![tcon5](https://www.theajack.com/tcon/images/t5.png)

----

![tcon6](https://www.theajack.com/tcon/images/t6.png)

----

![tcon7](https://www.theajack.com/tcon/images/t7.png)

----

![tcon8](https://www.theajack.com/tcon/images/t8.png)

----

![tcon9](https://www.theajack.com/tcon/images/t9.png)

----



----
# 2.Why TCon
#### 2.1 捕获所有异常
tcon 是一个移动端web调试工具, tcon使用 try catch 语句来包裹所有可执行的代码，其目标是捕获web应用程序上发生的**所有的异常**
这是它与现有的web移动端调试工具的主要区别，也是tcon的优势

现有移动端调试工具几乎都是对 window.onerror 事件进行监听来捕获异常，并且劫持 console上的方法来实现打印
然而 window.onerror 只能监听到一些初始化时执行的代码异常，对于大多数异常不能监听到

比如下面的代码会触发一个 Uncaught TypeError
```js
function f(){
	var json = {};
	json.a.a.a=1;
}
f()
```
这个异常并不会被 window.onerror 捕获，这也就会导致现有的工具在发生这种故障时无能为力

**而tcon可以很好地解决这个问题**

#### 2.2 便捷地输入并运行js代码
移动端输入一些 js 代码可以说是非常费时间的一件事情，敲打关键字，中英文、符号、数字之间的切换都是不胜其烦

tcon 提供了 js 里常用的关键字和符号，并对 编辑器进行了优化，让您在输入时体验到高效和便捷

tcon 同时兼容 pc 键盘输入 ，支持代码高亮提示和自动补全

shift + enter 可以快捷运行代码

#### 2.3 简洁的插件系统
tcon 提供了独立的插件系统，并且把 log 功能作为一个插件推出而不是集成在tcon中

使用者可以动态选择加载想要使用的插件，如果觉得功能不够用，您也可以来开发一个自己的插件

tcon提供了一些公有的 api 方便您更高效的开发插件

#### 2.4 使用简单、体积小巧
您可使用 npm 或者直接引入 script 来使用tcon，没有api调用操作，十分简单

基础js库和log插件加起来只有 24kb 的大小，这其中还包含了大部分的css样式代码

使用webpack loader 或 tconCode.js由于会引入抽象语法树，所以体积会有比较大

但是这可以通过灵活的加载策略和配置选择在生产环境中禁用掉，并不会影响线上用户体验

#### 2.5 灵活的加载策略
可以使用 npm 安装加载，也可以通过直接引入script标签加载

可以通过url参数来控制是否加载

# 3.基本用法

1.安装tcon主模块
```
tnpm install @tencent/tcon
```

或 script 标签引入

```html
<script src="https://www.theajack.com/tcon/tcon/tcon.1.0.9.min.js"></script>
```


2.安装tcon-log插件
```
tnpm install @tencent/tcon-log
```

或 script 标签引入

```html
<script src="https://www.theajack.com/tcon/plugin/log/tcon-log.1.0.9.min.js"></script>
```


如果 通过 script 标签引入 可引入

```html
<script src="https://www.theajack.com/tcon/loadTcon.js"></script>
```
该js会自动加载最新版本，并自动初始化

3.使用
```js
import tcon from '@tencent/tcon';
//import tcon 主模块之后会生成一个 window.TCon 对象，这主要是提供给通过script标签引入方式使用的，这里可以忽略
import '@tencent/tcon-log';

tcon.init(); // 默认开启tcon调试

// init 配置参数都是可选的, 以下值都是缺省值
tcon.init({
	byUrlParam: false, // 设置为true 表示将根据url参数决定是否开启调试，如果参数中有tcon=1或true，则开启调试, 开启一次以后 浏览器会记录下状态，除非 使用url参数tcon=0，否则会一直存在
	view: 'full', // 可选值为 full, small
    panelState:'hide', // 可选值为 hide, half, open
    mainState:'hide', // 可选值为 hide, open
    theme:'light', // 可选值为 light, small
    activeTabs:[], // 可选值为 [0,1,2,3,4,5] 分别表示 ['值','系统','关键字','符号','键盘','输入']
    code:'', // 编辑器中的代码
    keyMode:false // 可选值为 false, true
}); 

// 
```

若是使用 script 标签引入 tcon
请使用 window.TCon 对象

4.其他方法

```js
tcon.text.insert('str'); // 向代码编辑器中插入代码
tcon.text.value('str'); // 设置代码编辑器的代码
tcon.text.value(); // 获取代码编辑器中的代码
tcon.use(Plugin); // 引入一个插件，下面的插件章节会具体讲解
```


# 4.webpack loader

### 4.1 使用
tcon-loader 会将您指定的需要调试的js代码中的适当语句使用try catch包裹，
如果没有使用tcon-loader，则无法监听到 uncatch error，只能劫持 console方法和window.onerror 事件

安装tcon-loader
```
tnpm install @tencent/tcon-loader --save-dev
```
在您项目地webpack配置中加入 loader:'@tencent/tcon-loader'
```js
...
{
	test: /\.js$/,
	loader: '@tencent/tcon-loader',
	include: [
		path.resolve(__dirname, '您的需要调试的开发目录，一般为src')
	],
	exclude: /node_modules/
}
...
```

注：

1.若是某些文件您不希望使用loader处理，请在js文件顶部加上 ```/* tcon-disable */```

2.请指定include目录，并指定 exclude: /node_modules/ 否则构建时间可能会很长

3.如有使用babel-loader，建议在babel-loader之前加上 tcon-loader

4.建议只在开发和测试环境使用，在打包发布生产环境时，建议移除 tcon-loader，因为这会生成很多的try catch语句，可能会引起性能问题

### 4.2 配置参数
使用 options 参数可以为tcon-loader指定一些自定义配置，以满足不同的性能和精度需求。

```js
...
{
	test: /\.js$/,
	loader: '@tencent/tcon-loader',
	options:{
		Return:false,
		Declaration:false,
		traverse:false
	}
	include: [
		path.resolve(__dirname, '您的需要调试的开发目录，一般为src')
	],
	exclude: /node_modules/
}
...
```

其中配置参数信息如下：

| 属性   | 类型   |  默认值  |  描述  |
| :----:   | :----:  | :----:  |  :----:  |
| traverse |Boolean|true|当匹配到某个语句并用try catch包裹之后，是否继续对AST继续向下遍历|
| Expression |Boolean|true|是否匹配 表达式 语句|
| Return |Boolean|false|是否匹配 return 语句|
| Throw |Boolean|false|是否匹配 throw 语句|
| Declaration |Boolean|false|是否匹配 变量声明语句 语句|
| context |Boolean|false|try catch接获异常之后是否打印上下文环境|
| trace |Boolean|false|使用console.trace()打印调用栈|

### 4.3 tconCode.js

若是没有使用 webpack，您可以使用 tconCode.js 来编译您的代码 

script 标签引入：


```html
<script src="https://www.theajack.com/tcon/tconCode/tconCode.1.0.9.min.js"></script>
```

引入 tconCode之前您需要先引如入 tcon.js 

```html
<script src="https://www.theajack.com/tcon/tcon/tcon.1.0.9.min.js"></script>
```

然后 您可以使用

```js
TCon.code('window.alert(1)')
/*
	返回值：
	"try {
		window.alert(1)
	} catch (error) {
		window.TCon.f(error);
	}"
*/
```


# 5.编写一个tcon插件

如果您希望tcon有更加酷炫的功能，欢迎您帮助贡献插件

一个典型的插件模板是这样的：
```js
export default class{
    constructor(){
        this.title = 'MyPlugin'; // 必须有的一个属性，会被显示到tab上
    }
    mounted(){
		// 插件被渲染到panel之后会触发
    }
    onShow(){
        // 插件显示时被调用
    }
    onHide(){
        // 插件隐藏式被调用
    }
    onPageResize(size){
		// 插件容器大小改变时被调用 
		// size={width,height}
    }
}
```

你可以载插件中直接引用这句代码加载插件 ```if(window.TCon){window.TCon.use(MyPlugin);}```
这句代码并不会马上被执行，而是会等待 tcon init执行完成之后才回家在插件

您也可以通过引入插件之后 通过 tcon.use(MyPlugin) 来加载插件，如

```js
import tcon from '@tencent/tcon';
import MyPlugin from 'MyPlugin';
tcon.init();
tcon.use(MyPlugin);
```

注：
1.mounted钩子会在插件被渲染到panel之后会触发，此时已经将以下几个属性注入到了插件上了：

| 属性        | 类型   |  描述  |
| :----:   | :----:  | :----:  |
| tab |DOM元素|组件的tab，通过点击这个tab可以切换到这个组件|
| page |DOM元素|渲染UI的容器|
| index |Number|当前组件处在组件列表中的位置|
| tool |Object|tcon工具方法库|

其中 tool 有如下几个方法：

| 属性        | 参数   |  备注  |  返回值  |
| :----:   | :----:  | :----:  | :----:  |
| create |tag,class,text,click|创建一个dom元素，参数分别表示标签，类，文本，点击事件，除了tag，其他都是可选，如果没有，请传入一个空字符串|dom元素|
| attr | dom,name,value | 给一个dom设置属性,参数分别表示元素，属性名，属性值|dom元素|
| append | dom,(dom or Array)] | 给一个dom添加孩子节点，可以是dom或者dom 数组 |dom元素|
| addStyle | css,[id] | 添加一个全局样式，css为css代码，id为要给style设置的id值，可选|style元素|
| hasClass | dom,name | 判断dom元素是否还有某类名 | Boolean |
| addClass | dom,name or Array | 给dom元素添加类 | dom元素 |
| rmClass | dom,name or Array | 给dom元素删除类 | dom元素 |
| replaceClass | dom or Array,name1,name2 | 用name2来替换name1类 | dom or Array |
| active | dom,... | 给dom元素添加一个 tc-active 类 | - |
| inactive | dom,... | 给dom元素移除一个 tc-active 类 | - |

tool 这个工具只是为了开发插件时更方便的对DOM操作，并不是必须的

----end----