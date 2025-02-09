<!--
 * @Author: chenzhongsheng
 * @Date: 2025-01-07 10:41:09
 * @Description: Coding something
-->
# jsbox-cmd

此工具为 [Jsbox](https://github.com/theajack/jsbox) 的命令行工具

作用是将demo的文件夹生成一个配置文件 来供jsbox 使用

Demo可以参考 [此处](https://github.com/theajack/store/tree/main/jsbox-demo)

```
npm install jsbox-cmd -g
```

### 1. gen

生成 jsboxConfig 的配置文件

```
jsbox gen ./your/dir --format --watch --output {outputPath} --config {configFilePath}
```

后面的参数都为可选参数

1. format: 是否对生成的配置文件格式化 
2. watch: 是否开启监听同步
3. output: 输出的文件路径
4. config: 基础配置文件路径

该功能会将目标目录下面的js、html文件作为内容生成配置文件

#### js demo

```js
// @needUI=false
// @hideLog=false
// @dep=xxx,xxx
// @desc=副标题
// @title=章节标题

console.log('Hello')
```

#### html demo

```html
<!-- @hideLog=false -->
<!-- 注释内容与js一致 -->

<div>Hello</div>
```

### markdown 文件

与js和html文件前缀名称相同即可

#### 代码使用

```js
const {initCodeMap} = require('jsbox-cmd');
initCodeMap({
    input: string,
    output?: string,
    configFile?: string,
    format?: boolean,
    watch?: boolean,
});
```

```js
const {generateCodeMap} = require('jsbox-cmd');
const config = generateCodeMap({}, inputPath);
```


### 2. open

```
jsbox open [type=value]
```

如：

```
jsbox open github=theajack.eveit
```

具体用法参考 [Jsbox](https://github.com/theajack/jsbox)


## -D 安装

```
npm install jsbox-cmd -D
```

package.json

```
    "scripts": {
        "gen": "npx jsbox-gen <path>"
    },
```