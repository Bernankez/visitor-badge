# Visitor Badge

![visitor badge](https://badge.keke.cc/api/github.com/example)

⬆️ 一个简单的访客记录

---
## 动机

GitHub上已经有很多Visitor Badge了，大部分的样式是一个黑色的Badge，我不喜欢，所以写了一个自己想要的样式。如果你也有类似的需求，欢迎你fork并部署一份自己的Visitor Badge。

## 使用

链接格式为
```
https://example.com/api/namespace/key
```

其中`namespace` 和`key` 为自定义部分，`example.com`为你的域名。`namespace` + `key`共同标志一个唯一的Badge。有15秒的缓存，即15秒内的重复访问不会重复计数。

<details>
  <summary>namespace最好设置为你当前使用环境的域名，key可以任意设置。</summary>
  实际上namespace会根据跳转Request Header的referer字段判断，如果当前请求没有referer的话，namespace随便设什么都可以。如果有referer字段的话，则必须按照下面例子设置（即referer的hostname匹配）。这一部分的代码在<a href="./src/api/index.ts">index.ts</a>中。
</details>

比如：
> www.abc.com -> https://example.com/api/abc.com/key
>
> abc.com -> https://example.com/api/abc.com/key
>
> sub.abc.com -> https://example.com/api/sub.abc.com/key


## 部署

> **Note**: 部署之前你需要先准备一个自己的云数据库。我目前用的是[Mongodb Atlas](https://www.mongodb.com/atlas)，你也可以选择其他的，比如[Railway](https://railway.app/)。

### 部署到Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBernankez%2Fvisitor-badge&env=MONGODB_HOST,MONGODB_PORT,MONGODB_DATABASE,MONGODB_USER,MONGODB_PASSWORD,MONGODB_SRV&project-name=visitor-badge&repository-name=visitor-badge&demo-title=Visitor%20Badge&demo-description=An%20example%20Visitor%20Badge&demo-url=https%3A%2F%2Fbadge.keke.cc%2Fapi%2Fvercel.com%2Fexample&demo-image=https%3A%2F%2Fbadge.keke.cc%2Fapi%2Fvercel.com%2Fexample)

点击按钮即可部署

![deploy on vercel](https://user-images.githubusercontent.com/23058788/236779723-0be6308f-a8f0-465d-b23a-e5cdccd905b5.png)

以上环境变量参考[.env.example](.env.example)中的定义。

## 本地开发

### 环境

Node v18及以上

如果你已经安装了pnpm，可以略过这两步

1. `corepack enable`
2. `corepack prepare pnpm@latest --activate`

### 安装依赖

```sh
pnpm install
```

根目录下添加.env文件（参考[.env.example](.env.example)中的定义）

### 启动开发环境

```sh
pnpm dev
```

### 打包

会在commit时自动执行打包命令，你也可以手动运行`pnpm build`打包。

### 文件说明

很大概率你需要改动这些文件以适应自己的需求。

[api/index.ts](./src/api.index.ts) 包含路由，namespace + key的合法性验证。

[assets](./src/assets) svg头像。

[database](./src/database) 数据库部分。

[utils/avatar.ts](./src/utils/avatar.ts) svg头像渲染字符串。

[utils/cache.ts](./src/utils/cache.ts) 缓存时间设置。

[utils/renderSVG.ts](./src/utils/renderSVG.ts) 渲染Badge。

[utils/load-config](./src/utils/load-config) .env文件处理。

## 参考文档

[Deploy Node API (Express Typescript) on Vercel](https://dev.to/tirthpatel/deploy-node-ts-express-typescript-on-vercel-284h)

[How to deploy a Node/Express App to Vercel](https://dev.to/andrewbaisden/how-to-deploy-a-node-express-app-to-vercel-2aa)

## License

[MIT](LICENSE) License © [科科Cole](https://github.com/Bernankez)
