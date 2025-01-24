本项目只能用npm pnpm 会跟导致 electron 工具链异常
npm run start


1. 跑通纯前端逻辑 ✅
- [x] 工具链搭建
2. 跑通 nodejs 逻辑
- [ ] 加载sqlite
- [ ] 访问本地文件
3. 跑通 electron 逻辑
   - [x] 能加载出来页面
   - [ ] 能加载 nodejs 逻辑
   - [ ] 页面和 nodejs 逻辑能交互
   - [x] 能打包之后安装
4. 构建逻辑
   - [ ] 加载 cjs 模块 


遇到的问题
1. 导入本地cjs 模块
   1. 安装 @rollup/plugin-node-resolve 和 @rollup/plugin-alias 插件
   2. rollup 增加这两个插件的配置
   3. build.commonjsOptions 配置 include 模块路径和 node_modules 模块路径


参考的一些文档
1. [electron相关](https://docs.ffffee.com/electron/electron-mastering-3-popular-libraries.html)