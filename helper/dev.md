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