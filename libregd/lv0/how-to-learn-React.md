原文：[How to learn React.js](https://www.robinwieruch.de/learn-react-js/)

本文是基于原文的粗浅翻译和笔记，本篇文章只适合新手阅读了解。

# 前言
学 react.js 不可避免，但是新手需要有点大局观，免得走马观花，心猿意马，三心二意，鬼打墙。
所以这篇文章算内功心法，心灵鸡汤，没有一点点代码。

# 三天精通React

不要被标题这种话术蒙蔽了，虽然实际上确实有很多人之前从来没用过react，工作中突然被要求使用和学习，很短的时间内，他们确实掌握了react。

但对于新手来说，学习react必须脚踏实地，因为react和相关的生态技术迭代非常快，经常会有很多又新又酷的东西出来，看起来掌握了就吊炸天了。

但是！新的东西都是从最近本的react开始发源的，新手不要好高骛远，不要老是想搞时空跳跃，黑洞超车......

一点点的学，科学的学，你终究会成为大佬。

请保持一颗纯洁的新手之心，单纯学好react，不要老想着搭配什么神器一起学，比如下面这些：
## typescript + react ，NO
不要一起学，typescript当然是好的，但是：
1. 浏览器将ts转换为js运行，但是你react里必须全用typescript来写components 和controller
2. 新手连好多JavaScript写的代码都要边看边查半天
3. 99% 的 react教程没有用typescript教，你不觉得这很像高考外语随便你用什么语言去考试，打分要求是一样的，但你花了很大力气找资料很少的西班牙语， 既没人陪练，班上也没什么人可以一起解决问题......

## React + Redux ，NO
不要一起学，redux是一个很流行的状态管理库，很多人都拥有了，但是：
1. 在学习一个更高级的工具之前，先用好手上的工具。这就像划船，redux是更有流体力学设计的高级划船浆，但是自带的小木浆也能划船了。
2. react自带的 hook 管理是方方面面都满足了需求的，你划出这片海滩，甚至会发现，80%的船都还是用的自带的小木浆。
3. 如果redux确实更好，新手不用的原因只有一个：在出海之前学习流体力学对船手来说是一种资源浪费。

## React + Gatsby ，NO

不要一起学，gatsby很火也经常用来构建一些静态的网站，比如博客，真的是太爽了！

但是！爽的是用的过程，而不是学习如何去用的过程！

gatsby 意味着你得学 GraphQL + 海量的生态系统 + 怎么在服务器端渲染 react 这些连环套......

> Learn one thing at a time. it is only react
同一个时间就学一个东西，那就是react

# 学react之前的准备工作

学react之前得需要知道JavaScript的基础知识，我的建议是掌握：html+css+JavaScript+es6

## 学JavaScript要到什么程度？
很多人建议，还是得**有点基础**，于是给出了下面的列表：
- Functions are first-class citizens in JavaScript
- bind(), apply(), and call()
- scopes and closures
- this
- Object Methods
- Array Methods
- Prototypical Inheritance -> ES6 Class
- Callbacks and Promises
- Event Loop
- Event Bubbling
- Regular Expressions
- Error Handling
- JavaScript ES6 and beyond
- Hoisting, Memoization
- Declarative vs imperative programming
- Functional vs object-oriented programming

假的，新手菜鸡不需要掌握这么多，上来就喊你掌握造火箭的技术，你个仅仅只懂微积分的人不得崩溃吗？

实践是最好的老师，做符合你水平的项目，每个项目在一个项目的基础上多加一些需求，边学边查，然后你会发现上面那张列表你在实践中就用到了不少。

大部分JavaScript相关的内容你都能在react中边学边用，而且这是一个明白到底用在哪里起了什么作用的好时机。

同时，不要停留在已经熟练到可以掘地三尺的那一亩三分地，该在真实应用里撞墙的地方还是要撞，撞墙就是开荒。

- **建立真实的项目**
- **保持好奇心**
- **学习react的曲线是螺旋上升的，会暂时退步是正常的！**

## 学react之前要不要学个jQuery

jQuery 是 纯JavaScript到 framwork之间的过渡产物，但是这个产物现在还在很多程序里作用，以及它的很多原理是深深影响了react的。

但是，别学。
- 也许你工作中还是遇上了需要暂时学一下，抄一抄，现学工完是没问题的。
- 更好的办法是把同样的功能用react实现，毕竟练练react的机会不要白不要。

## 为什么要学习react？

选react是因为只听过react的名字，还是因为你清楚它能为你做什么，解决什么，因此选择了它？

这个问题不止react，套在别的框架工具生态系统等等问题上都是可以问上一问的。

因此学习react的过程，把vanilla JavaScript 和 react放在一起对比看是很有用的，准确的说法是用这种对比的办法写同一个应用，[这篇文章就是一个例子](./why_freamworks_matter.md)

以及后续你需要学习vue angular 等等别的，你都可以考虑对比同一个应用用不同的 生态/框架 / 工具  实现，有什么异同，这方便你了解特性，知道啥时候该用什么。

# 一步步学习react

官方文档不说了，该作为权威新华字典。

## docs

该查字典还是要查，虽然新手觉得很可怕，但是学习新东西不是这一次，当程序员是一辈子都在查一些没人写二手信息的官方文档。

对react docs要有点信心，因为人家开山立派就是正统，是来布道的。肯定是希望你学会的。

没有那么多虚头，比如二道贩子喊你买课。

至少作者学就是把官方文档作为自己的教程，只要它有个新手教程。

## projects

多构建真实的项目，如果没灵感就去github，v2ex，上关键词搜一下，看看别人的点子和练手项目。

要挑选适合自己的项目，作者玩angular的时候在 SoundCloud 听歌，在自身已经有一个框架的经验下，好奇了react，于是用react+redux 花了3个月做了个favesound-redux ，这是在已经有sound-redux（另一个大佬）的前提下。新手一上来就做这种等级的项目是不合适的。

- 感兴趣的
- 有一定挑战难度，但没有超出自身的

## do it

从教程和跟练里学习太舒服了.....但是这个过程就等于是别人给你把菜都切好了，工具都安排好了，水电费交过了，你去厨房还一步步指导你往下做。

这咋能不爽？

但是真实的场景里你要解决的问题很可能你找不到一个完美的跟练，知识点和技巧像星星一样散布在各种地方，必然是找得浑身大汗，灰头土脸，腰酸背痛的。

为了尽早习惯这种天天撞墙的生活，有些时候也得逃开教程。

早一点习惯被困住，早一点思考脱困之术，脱得多了才算职业玩家。

## 每天都要学react

天天练，每天都要学，每天都要有小总结。

## 公开进度

大佬以前也是新手，突然冒出一个大佬，没有看到一个菜鸡变成大佬得过程更让围观者信服且从中受益。

- 参加社区，回报社区
- 想别人求助，也努力去帮助别人

## road to react

跟完官方教程，有些东西是需要反复熟悉的。甚至说精通：

- Learn about React's JSX syntax
- Learn about React Components
- Learn about React Component Composition
- Learn about React Props
- Learn about React State

总结起来：制作组件，返回jax，组件嵌套安排，组件之间用参数传递数据，搞定交互和对应得状态变化。

这些基本就是react的全部，没必要学个没完没了。

# react 初学者启程

这部分内容感觉老生常谈，就是设置，环境，下载，vscode，插件这种新手包。

# LEARN ADVANCED REACT

原文是写文章链接，需要的时候再看。
# LEARN REACT ONLINE

搞技术的书，现在很多都是自己出版的电子书，所以更新起来其实非常快，至少比做个视频快吧.....

不是说看视频不行，但是不要迷失在看里面了，围绕内容去找学习内容。

唯一推荐的是freecampcode上的，这个大佬我很喜欢，很为我们第三世界的穷穷考虑。

# LEARN REACT ROADMAP

是时候学点生态工具和搭配的包和工具了








