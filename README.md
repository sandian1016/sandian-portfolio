# Sandian Design Portfolio

Sandian Design 的个人 UI/UX 作品集网站，使用 React、TypeScript、Vite 与 Tailwind CSS 构建。

## 本地运行

需要安装 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

浏览器访问：<http://127.0.0.1:4173/>

## 构建

```bash
npm run build
```

构建产物会生成在 `dist/` 目录中。

## 在另一台电脑继续开发

```bash
git clone https://github.com/Sandian1016/sandian-portfolio.git
cd sandian-portfolio
npm install
npm run dev
```

本机环境变量、令牌、日志与构建产物不会提交到仓库。如后续增加环境变量，请只提交不含真实密钥的 `.env.example`。
