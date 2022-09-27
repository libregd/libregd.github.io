# 弹幕机是什么？

也叫弹幕姬，danmuji，通常是针对视频弹幕网站的弹幕进行抓取后显示在别**非官方**地方的**工具**。

# 现存方案

现在市面上已经有百花齐放的弹幕姬，多是使用 bilbili 网站的直播 api，配合监听，loading 到本地的 UI 上。
1. [xfgryujk/blivechat](https://github.com/xfgryujk/blivechat):star 819. fork 113, 用于OBS的仿YouTube风格的bilibili直播评论栏,vue,python 都得运行，或者就是docker了。
1. [Tsuk1ko/bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat),star 814,fork 66, 无后端的仿 YouTube Live Chat 风格的简易 Bilibili 弹幕姬，vue+JavaScript，真是爽啊。
1. [3Shain/Comen](https://github.com/3Shain/Comen):star 798， fork 78。直播用弹幕栏【原bilichat】,Comen是一个主要用于在网络直播中向观众展示当前直播间实时评论流的工具,bilibili,youtube,acfun，obs都行，看来有一些通用性，有分支bilichat存在，代码全是ts的，用了angular。
1. [copyliu/bililive_dm](https://github.com/copyliu/bililive_dm/):star 729，fork 129，[自己有官网](https://www.danmuji.org/)，混的可以，获得过官方钦定。C#写的，有插件生态，仅支持 win7/8/10, .NET Framework 4 开发 SDK 指定。
1. [iwxyi/Bilibili-MagicalDanmaku](https://github.com/iwxyi/Bilibili-MagicalDanmaku)：star 360，fork 63，C++写的，号称 “弹幕姬+答谢姬+回复姬+点歌姬+各种小骚操作，目前唯一可编程机器人”，大比例 c++写的，环境需要 visual c++ runtime。
1. [BanqiJane/Bilibili_Danmuji](https://github.com/BanqiJane/Bilibili_Danmuji): star 251,fork39, 75%比例的 java 写的，支持 mac/win,号称“Bilibili 直播弹幕姬(使用 websocket 协议)，java 版 B 站弹幕姬，基于 springboot。”
1. [lyyyuna/bilibili_danmu](https://github.com/lyyyuna/bilibili_danmu) : star 218， fork 44， python 版本，[作者还写了实现思路](https://www.lyyyuna.com/2016/03/14/bilibili-danmu01/)
1. [Beats0/bilive-danmaku](https://github.com/Beats0/bilive-danmaku):star 54， fork 0，支持 win 和 mac,大量 ts 和 js 写的，开发只需要 yarn，
1. [BanqiJane/BiliLiveChat](https://github.com/BanqiJane/BiliLiveChat):star 23, fork 9, JQuery,JavaScript 就实现了
1. [7sDream/danmacu](https://github.com/7sDream/danmacu):star 23, fork 1,自用 Bilibili 弹幕姬 for macOS,python 写的。 
1. [Sothis-baka/danmuji](https://github.com/Sothis-baka/danmuji):star 1,fork 1, 使用了react与electron生成web端和desktop端的app,纯纯练手项目，bug好多的样子？
1. [xiaobai2017666/danmuji](https://github.com/xiaobai2017666/danmuji): star 4, fork 1, 自称“穷人的实时弹幕工具”，vue + javascript, 看起来完成度还行？但是上次更新是2019年7月份了。
1. [huihui486/bilibili-danmuji](https://github.com/huihui486/bilibili-danmuji):star 4， fork 2， 应用python+websocket和pyqt5的bilibili直播弹幕，基本全python写的。
1. [yungsun09/bilibili_danmuji-python](https://github.com/yungsun09/bilibili_danmuji-python):star 3, fork 1, 需要环境python3.7和aiohttp，打开main.py即可运行， 3个文件就搞定有点东西.....

# 对比环节
- 首先是砍掉 .net 开发环境的，学习跨度太大，那就是c，c#，c++，这一卦的得砍了。
- 然后是砍掉，java 开发的，因为我跟java不熟，属于完全不知道这啥的地步，除了知道在全国都挺好找工作的，兼容性max。
- 然后是砍掉，python，因为忘得差不多了，虽然我学过。

因此对比环境，能考虑得就是：JavaScript，typescript，vue，react，考虑到技术栈，会偏react一点。

|名称|[Tsuk1ko/bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat)|[3Shain/Comen](https://github.com/3Shain/Comen)|[Beats0/bilive-danmaku](https://github.com/Beats0/bilive-danmaku)|[BanqiJane/BiliLiveChat](https://github.com/BanqiJane/BiliLiveChat)|[Sothis-baka/danmuji](https://github.com/Sothis-baka/danmuji)|[xiaobai2017666/danmuji](https://github.com/xiaobai2017666/danmuji)|
|---|---|---|---|---|---|---|
|实现原理|仿 YouTube Live Chat |鼓励扩展新平台|没看出来借鉴得啥|JQ还能干这个？|看package.json好少，基本就是原生搞的|没看出来|
|生产环境可用性|yarn就行|npm+nx，前后端都得有|yarn |有种不感相信的可行性|npm|npm|
|功能|比较简单|花样多，主要是多平台|面板功能和官方很像|简单|简单|最有产品思维的一个
|兼容性|没后端，直接web用|主要是给懂开箱的人用的|electron跨平台|index.html 打开就行|electron|electron|
|性能|[感觉还可以](https://blc.lolicon.app/)|理论上应该还行，毕竟分了前后端|[看着不错](https://www.bilibili.com/video/av328551804)|[看着有点慢](https://banqijane.github.io/BiliLiveChat/)|[看着还行](https://www.bilibili.com/video/BV1Xq4y1S7co/)| 看着还可以|
|可维护性|vue3 + JavaScript|Angular 8+Nestjs+ typescript|electron+react+typescript|jQeury|electron+react+JavaScript|electron+vue+JavaScript|
|缺陷以及隐患|些许简陋|活跃开发中|请求太多会被ban|对jQuery属于又怕又爱，典型的太好用导致烂大街需要不停的筛选教程。|有些bug| 作者不会再更新的样子|
|其他| vue我又忘得差不多了|要学的有点多|有点兴趣，electron听起来很诱人|好奇|electron+1|electron+1，vue+1|


# 大佬说

要在obs里用，就考虑下面三：
- [Tsuk1ko/bilibili-live-chat](https://github.com/Tsuk1ko/bilibili-live-chat)： 应该最合适
- [BanqiJane/BiliLiveChat](https://github.com/BanqiJane/BiliLiveChat)：能用
- [3Shain/Comen](https://github.com/3Shain/Comen)：以后可以参考

# 下一步做

- vue 复健

