# 完成清单

- [ ] node.js 的基础知识梳理
- [ ] [一个完整的基于 Node.js 的 web 应用](https://www.nodebeginner.org/index-zh-cn.html#a-full-blown-web-application-with-nodejs)
- [ ] [上手 Express 框架开发](https://tuture.co/2019/11/26/cd5b993/)
- [ ] [从零到部署：用 Vue 和 Express 实现迷你全栈电商应用](https://tuture.co/2019/10/17/0b662ce/)
- [ ] [从零开始用 Express + MongoDB 搭建图片分享社区](https://tuture.co/2019/10/16/a0531f0/)

# nodejs 基础知识梳理

1. 什么是 node ？

node 之前首先有个要点是，JavaScript 到底在和什么打交道？

JavaScript 大家都很熟了，浏览器里用得很多，多是用来操作页面元素，也就是所谓的 document 对象。

在写`document.getElementById()` 的时候，已经明示了很多。

而在有一些代码里，`window.innerHeight`这种 method 又暗示我们还有另外一种对象，叫 broswer 对象。

这些都还是在浏览器里使用，被`<script></script>`标签包起来。

那么就会有新问题，能不能不开浏览器，也能在终端里`console.log()` 一条呢？

至于为什么会有这种新问题，大抵是：

- js 的语言遵循一个规范 ECMAScript，[JavaScript 与 ECMAScript 的关系](http://javascript.ruanyifeng.com/introduction/history.html#toc1), 随着 js，es 的发展，js，es 能做的事情越来越多，因此会有大佬寄希望于它们能在服务器端有用武之地。
- 前端程序员对于跳出浏览器这件事跃跃欲试，而 nodejs 基于 v8（Google chrome 的 js 引擎）加工成可以在任何操作系统中（也就是支持命令行）运行 js。

所以，**nodejs 是为了让 js 独立运行而开发出来的解析器**。

2. nodejs 能干什么？

nodejs 的很多课程目录有以下内容：

- 进程管理
- 文件 I/O
- url 处理
- path 优化
- 字符串转换
- 模块化
- npm 使用

是不是有点 python，php，这种很典型的“后端语言”的味儿了？

nodejs 的作者 答：我想实现高性能的 web 服务器，所以事件机制和异步 IO 很重要，那么这种语言就最好自己没有 IO（因为得我来写），还得有不错的事件机制。

最好人多，这样用的人也多，反馈快，还能抓壮丁干活，于是挑中了 JS。

随着 node 的发展，现在都 version 16 了，现在的 node 包含的语言部分是 ECMAS+V8，也就是说没有 BOM，DOM 这些**网页里**的全局对象概念。（全局可以理解成专属哪里都能用，比如`alert()`）

3. nodejs 安装运行怎么做？
   跟着官网安装运行走就行了，总之和 python 安完差不多，命令行敲`node`直接进入交互式，敲`node xxx.js`就能运行 xxx.js。

但是怎么实现的？毕竟不是浏览器啊！

time.js

```js
console.log("Hello World!");
```

命令行执行：

```BASH
node time.js
```

在浏览器运行 console.log 调用了 BOM，实际上执行的是 `window.console.log('Hello World!')`

而这里，Node 首先创建一个新的进程，然后向标准输出打印了指定的字符串， 实际上执行的是 `process.stdout.write('Hello World!\n')`

可以看到，node 的专属全局对象，process 登场了。在披了和浏览器同一个马甲`console.log`的掩盖之下。

因此针对 node 的对象，重点需要学习：

- node 专属的对象，比如 process，**dirname、**filename 等.
- 浏览器和 node 共有对象，但是其实实现方式不一样，比如 console, setTimeout， setInterval 等。
- 浏览器和 node 共有对象，且属于 ECMAS，如 Date、String、Promise 等。

等这个字到底有多少东西？ 4. node 的全局对象有哪些？
进入交互模式（REPL）后输入完以下内容按 tab

```BASH
> global.
```

会出现 node 的所有全局变量，真的是让人觉得很多，看到了老朋友比如 Number，Boolean，但也有之后要重点学习的 Buffer 等。

```BASH
global.__proto__             global.hasOwnProperty        global.isPrototypeOf
global.propertyIsEnumerable  global.toLocaleString        global.toString
global.valueOf

global.constructor

global.AbortController       global.AbortSignal           global.AggregateError
global.Array                 global.ArrayBuffer           global.Atomics
global.BigInt                global.BigInt64Array         global.BigUint64Array
global.Boolean               global.Buffer                global.DataView
global.Date                  global.Error                 global.EvalError
global.Event                 global.EventTarget           global.FinalizationRegistry
global.Float32Array          global.Float64Array          global.Function
global.Infinity              global.Int16Array            global.Int32Array
global.Int8Array             global.Intl                  global.JSON
global.Map                   global.Math                  global.MessageChannel
global.MessageEvent          global.MessagePort           global.NaN
global.Number                global.Object                global.Promise
global.Proxy                 global.RangeError            global.ReferenceError
global.Reflect               global.RegExp                global.Set
global.SharedArrayBuffer     global.String                global.Symbol
global.SyntaxError           global.TextDecoder           global.TextEncoder
global.TypeError             global.URIError              global.URL
global.URLSearchParams       global.Uint16Array           global.Uint32Array
global.Uint8Array            global.Uint8ClampedArray     global.WeakMap
global.WeakRef               global.WeakSet               global.WebAssembly
global._                     global._error                global.assert
global.async_hooks           global.atob                  global.btoa
global.buffer                global.child_process         global.clearImmediate
global.clearInterval         global.clearTimeout          global.cluster
global.console               global.constants             global.crypto
global.decodeURI             global.decodeURIComponent    global.dgram
global.diagnostics_channel   global.dns                   global.domain
global.encodeURI             global.encodeURIComponent    global.escape
global.eval                  global.events                global.fs
global.global                global.globalThis            global.http
global.http2                 global.https                 global.inspector
global.isFinite              global.isNaN                 global.module
global.net                   global.os                    global.parseFloat
global.parseInt              global.path                  global.perf_hooks
global.performance           global.process               global.punycode
global.querystring           global.queueMicrotask        global.readline
global.repl                  global.require               global.setImmediate
global.setInterval           global.setTimeout            global.stream
global.string_decoder        global.sys                   global.timers
global.tls                   global.trace_events          global.tty
global.undefined             global.unescape              global.url
global.util                  global.v8                    global.vm
global.wasi                  global.worker_threads        global.zlib
```

这种观感，就像 linux 下的 man 一样。

同理，如果输入一个 node 的全局对象，加一个. ， 然后 tab，就会罗列出该对象的所有 method。

```BASH
> process.
```

会得到：

```BASH
process.__proto__                            process.hasOwnProperty
process.isPrototypeOf                        process.propertyIsEnumerable
process.toLocaleString                       process.toString
process.valueOf

process.addListener                          process.emit
process.eventNames                           process.getMaxListeners
process.listenerCount                        process.listeners
process.off                                  process.on
process.once                                 process.prependListener
process.prependOnceListener                  process.rawListeners
process.removeAllListeners                   process.removeListener
process.setMaxListeners

process.constructor

process._debugEnd                            process._debugProcess
process._events                              process._eventsCount
process._exiting                             process._fatalException
process._getActiveHandles                    process._getActiveRequests
process._kill                                process._linkedBinding
process._maxListeners                        process._preload_modules
process._rawDebug                            process._startProfilerIdleNotifier
process._stopProfilerIdleNotifier            process._tickCallback
process.abort                                process.allowedNodeEnvironmentFlags
process.arch                                 process.argv
process.argv0                                process.assert
process.binding                              process.chdir
process.config                               process.cpuUsage
process.cwd                                  process.debugPort
process.dlopen                               process.domain
process.emitWarning                          process.env
process.execArgv                             process.execPath
process.exit                                 process.features
process.hasUncaughtExceptionCaptureCallback  process.hrtime
process.kill                                 process.memoryUsage
process.moduleLoadList                       process.nextTick
process.openStdin                            process.pid
process.platform                             process.ppid
process.reallyExit                           process.release
process.report                               process.resourceUsage
process.setSourceMapsEnabled                 process.setUncaughtExceptionCaptureCallback
process.stderr                               process.stdin
process.stdout                               process.title
process.umask                                process.uptime
process.version                              process.versions
```

但是这些我们一般都是开网页看，命令行某种程度上是个丑东西。

所以：[官方的 api 文档](http://nodejs.cn/api-v16/process.html#process)就把上面两步有的内容全部给文档列出来，还带用例，生怕你学不会看不懂。

5.
