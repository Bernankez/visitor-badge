# Visitor Badge

![test visitor badge](https://badge.keke.cc/api/github.com/example) ⬅️ 一个自用的访客数量统计

> **Note**: 由于我对Vercel部署不熟悉，以及SVG在打包时import的问题，这个项目目前开发体验并不好。等之后有时间我再看看怎么做到更好的DX。

目前设置的缓存是[15秒](./src/utils/cache.ts)，15秒内的重复访问不会计数。

### 部署

```sh
pnpm build
git checkout ./api/package.json
```