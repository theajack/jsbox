<!--
 * @Author: chenzhongsheng
 * @Date: 2025-01-23 01:25:38
 * @Description: Coding something
-->

新建 assets/cdn, 将 cdn/assets, cdn/xxx.ttf 放入其中

npm run build 之后

将 docs/envs,docs/main.min.css,docs/main.min.js 移入 assets中

执行 qiniu-upload中的脚本即可

----

重要：

该项目架构太老太旧，不好扩展，新功能比较难以添加

有待重构
