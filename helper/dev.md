<!--
 * @Author: tackchen
 * @Date: 2022-07-08 08:59:27
 * @Description: Coding something
-->
开发完成后运行

```
npm run release -- vx.x.x
```

即可发布版本

如为覆盖上一次发布

运行

```
npm run release -- vx.x.x
```

单独发布文档

```
npm run release -- dx.x.x
```

### env & lib

如需修改 env 或者 lib 文件

请修改 public/lib 下的文件

然后执行 npm run build:env

然后提交到master即可

如需立即生效 需要清一下缓存

https://purge.jsdelivr.net/gh/theajack/jsbox/cdn/assets/js/lib/env.js

https://purge.jsdelivr.net/gh/theajack/jsbox/cdn/assets/js/lib/lib.js


## 发布

新建 assets/cdn, 将 cdn/assets, cdn/xxx.ttf 放入其中

npm run build 之后

将 docs/envs, docs/main.min.css, docs/main.min.js 移入 assets中

执行 qiniu-upload中的脚本即可

----

重要：

该项目架构太老太旧，不好扩展，新功能比较难以添加

有待重构


## 接入新版本monaco后流程

1. 开发完成后 npm run build
2. docs/envs 下所有文件 和 docs/main.min.css 和 docs/main.min.js 复制到 gh-pages分支下的lib 替换所有重名push即可

发布到CDN

1. 开发完成后 npm run build
2. docs/envs 下所有文件 和 docs/main.min.css 和 docs/main.min.js 复制到 public/new-cdn/lib 替换所有重名，然后将new-cdn部署到cdn即可