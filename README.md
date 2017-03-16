# 网易云音乐每日推荐歌曲自动转存歌单

### 准备
记录需要保存的歌单id，记录 cookies 里的 MUSIC_U 字段

### 安装依赖

```
npm i
```

### 启动

```
node index.js <id> <MUSIC_U>
# 例如: node index.js 1234567 abcdefg...
```

注：可以使用 windows 的计划任务，Linux 的 cron服务，或者 macOS 的 LaunchAgents 等来周期执行本脚本。
