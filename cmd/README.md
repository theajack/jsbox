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
jsbox gen ./your/dir <format>
```

format 为可选参数，默认为 false，true表示对生成的配置文件格式化

#### 代码使用

```js
const {initCodeMap} = require('jsbox-cmd');
initCodeMap({
    input: string,
    output?: string,
    configFile?: string,
    format?: boolean,
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