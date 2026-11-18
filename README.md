# 英语地图

给中文母语者的从零英语课。用中文讲解，用英文例句。课程包括发音、语法、词汇、长难句和学习资料。进度与测验成绩只保存在浏览器本地，没有账号，也没有统计。

站点地址：[https://zhousai-zs.github.io/english-atlas/](https://zhousai-zs.github.io/english-atlas/)

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm ci
npm run dev
```

开发服务器默认在 `http://127.0.0.1:4321/english-atlas/`。项目站点的 base 路径是 `/english-atlas/`，本地也要带上这段路径。

## 构建

```bash
npm run build
```

构建前会检查课文数量、正文和未完成标记。静态文件输出到 `dist/`。预览构建结果：

```bash
npm run preview
```

## 开启 GitHub Pages

1. 把 `main` 上的工作流文件合并进仓库。
2. 打开仓库的 **Settings → Pages**。
3. 在 **Build and deployment** 里，把 **Source** 选成 **GitHub Actions**。
4. 推送到 `main` 后，`.github/workflows/pages.yml` 会安装依赖、构建站点，并用官方的 Pages 动作发布。

发布完成后，站点在 [https://zhousai-zs.github.io/english-atlas/](https://zhousai-zs.github.io/english-atlas/)。

## 内容放在哪里

课文是 `src/content/` 里的 Markdown。语法、发音和长难句方法课用同一套结构：规则、形式、例句、易错点、小结和五道练习。改完运行 `npm run build` 即可。

## 许可

MIT，见 [LICENSE](LICENSE)。例句和讲解为原创，请勿把受版权保护的教材课文贴进来。
