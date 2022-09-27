原文链接：[why-frameworks-matter](https://www.robinwieruch.de/why-frameworks-matter/)

尝试做了一个中文版大概翻译或者说总结。

# 前言

来当程序员的人越来越多了，特别是 web 这一块。比起我们这些动不动有 10-30 年编程经验的人来说，现在的人想学习编程简直就是站在前人的肩膀上！

以前：学一些现在人听都没听过的工具/语言/方法/框架
现在：学完 JavaScript 直接蹦去学框架

这是理所当然的，现在的beginner 根本不必从jQuery学起。

但是也是差了一些岁月进程的折磨，所以本篇内容致力于告诉你框架到底解决了什么，以及为什么 web 开发最终走向了框架？而不是像什么文化传统 be like 原滋原味最古老的最有逼格, 只用 JavaScript！

因此为了展示这个区别，有两个项目，一个用 JavaScript 写的，一个用 react 写的，完全一样的内容，用老传统和新主义分别会有什么不同。

在网页输入关键词，按下按钮，会返回跟在 hackernews 上用同样关键词搜索出的是一样的内容。输入新的内容，再次按下按钮，会刷新产生对应的内容。

# Vanilla JavaScript

有两个页面，一个 html，一个 JavaScript，整个项目还没加 css，朴素自然。Js 部分写得非常好，函数编程典范，因此大量的注释代替了穿插在原文中的解释。

代码作者水平很高，因此写出来的代码可以一定程度上相信这已经是**在很懂的前提**下产出的**相对优秀的解法**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript</title>
  </head>
  <body>
    <div id="app">
      <h1>Search Hacker News with vanilla JavaScript</h1>
      <input id="searchInput" />
      <button id="searchButton">Search</button>
    </div>
  </body>
  <script src="hacknews.js"></script>
</html>
```
hacknews.js
```js
function addButtonEvent() {
  // 当按钮被点击，触发函数onSearch
  document.getElementById("searchButton").addEventListener("click", onSearch);
}

// onSearch func
function onSearch() {
  // 每次搜索先清空上次搜索生成的内容
  removeList();
  //   触发函数doSearch，dosearch要求一个值，string
  // getValueFromElementById 甚至都不是原生函数.....得自己写

  doSearch(getValueFromElementById("searchInput"))
    // do完还得运行appenlist往页面填充内容
    .then(appendList);
}
// doSearch func
var BASE_URL = "https://hn.algolia.com/api/v1/";

function doSearch(query) {
  // keyword 需要进行拼接，返回200条内容
  var url = BASE_URL + "search?query=" + query + "&hitsPerPage=200";
  // 返回的是一个函数，幸好这个函数连环套是原生自带的
  return fetch(url)
    .then(function (response) {
      // 如果不知道fetch的是什么，可以打开console看一看
      console.log(response);
      return response.json();
    })
    .then(function (result) {
      console.log(result.hits);
      // 返回一个数组
      return result.hits;
    });
}
// 获取dom节点的value值，这是一个自己编写的函数
function getValueFromElementById(id) {
  return document.getElementById(id).value;
}

// 追加元素
function appendList(list) {
  // 创造div节点
  var listNode = document.createElement("div");
  // 设置该节点的id = list
  listNode.setAttribute("id", "list");
  // 找到页面存在的id = app节点，往里面塞 list
  document.getElementById("app").appendChild(listNode);
  // forEach针对的是数组，list是传进来的参数，必须是数组。
  // append items to list
  // 对每一个元素执行的一个相同的函数 addpendItem
  list.forEach(appendItem(listNode));
}
//  appendItem 接受一个节点作为参数，
function appendItem(parentNode) {
  // 这里的item指代的就是list中的每一个元素，这个元素是个对象，有一些属性
  return function (item) {
    // 再一次制造一个节点
    var itemNode = document.createElement("div");
    // 再节点中也追加了元素，追加的是一个文本，内容来自item的title属性。
    itemNode.appendChild(document.createTextNode(item.title));
    //   传入的节点作为母节点加入 <div>{item.title}</div>的内容
    parentNode.appendChild(itemNode);
  };
}

//rmoveLIst
function removeList() {
  var listNode = document.getElementById("list");
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode
  // 如果这个节点存在
  if (listNode) {
    // listNode.parentNode 找到节点的上一个节点，也就是母节点
    // 妈妈.removeChild(listNode); 让妈妈删掉这个存在的孩子，删完显然孩子肯定没了....
    listNode.parentNode.removeChild(listNode);
  }
}

// 运行这个函数
addButtonEvent();
```

# 中场休息
如果让我提问：
1. 没有 形如``` func（element, "click"）{do()}```这样的办法吗？

    > element可以是div，可以是div.classname, 可以是div#idname，可以是 #choice li,这样的页面选择器，就像css的写法一样。
    > "click" 也可以是"mouseover"，"mouseout"，"mouseup"，"mousedown"，"resize" ..... 等等？
    > do() 是一个函数，可以编写对应的触发运行事件

这是很朴素的想法，毕竟```document.getElementById("searchButton").addEventListener("click", onSearch);``` 只解决了上述办法中的很小的一部分内容。
2. 生成一个嵌套的节点，或者说往一个存在的节点内添加内容，需要反复createNode，appendChild吗？就没有形如:
```js
···
const mother = <div id="list"></div>
const item = <div>{result.hits.title}</div>
func createNode(mother, item, reslut.hits.length) {...}
···
```
这样的函数可以一步到位生成制作生成的200条标题吗？

这是每一个懒惰的人灵魂会发出的疑问：**有没有更好更快的办法？有没有谁写一个现成的我拿过来套着用用？**

于是从JavaScript应用在web开发以来，大量的程序员在工作和学习中积累和分享各种自己的尝试，自己写好的函数/工具/功能给大家，国际互助精神非常炙热。

就像所有人都在往一个本来很简单的广场里搬运东西，制作东西，地方小了还知道盖楼和商量买地，厕所旁边不能卖披萨，所以还知道划分区域经营。随着地方越来越繁华，承载的功能越来越多，需要满足的需求也越来越多：晚上蚊子多还知道配备驱蚊水，人行道上还划分了盲道，厕所单间里甚至预备了卫生巾，提供了导游员帮助刚来的人......

这就是Vanilla JavaScript → react的变迁

#  REACT

并没有从头教学写一个react 准备工作的内容，而是直接用了CDN的方式引入框架。引用了两个react.js文件，都是16版本，文章写于2018年。所以也是有两个文件：

index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>React</title>
    <!-- react本体 -->
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <!-- react-Dom 将上面一个挂到index.html中的dom上 -->
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <!-- react写法和原生不一样，引用了bable来转为原生JavaScript -->
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
</head>
  <body>
      <!-- 需要一个带id的属性的节点用来操作 -->
    <div id="app" ></div>
    <!-- type说明需要babel来解析成js -->
    <script type="text/babel" src="react-hackernews.js"></script>
  </body>
</html>
```

react-hackernews.js

```JavaScript

const BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query) {
    const url = `${BASE_URL}search?query=${query}&hitsPerPage=200`;
    return fetch(url)
        .then(response => response.json())
        .then(result => result.hits);
}
// 创建一个组件App
class App extends React.Component {

    constructor() {

        // super() will call the constructor of its parent class. This is required when you need to access some variables from the parent class.
        // if you want know more : https://stackoverflow.com/questions/40433463/what-does-calling-super-in-a-react-constructor-do
        super();
        // Bind in Constructor (ES2015)
        // https://zh-hans.reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance

        // 注意 state是自己写的名字
        this.state = {
            input: '',
            list: [],
        };
        // 把操作绑定到函数上，注意等号左边的名字是自己取的。
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        // 阻止默认行为，比如刷新浏览器
        e.preventDefault();
        // 执行doSearch函数
        doSearch(this.state.input)
            // 执行后会返回一个数组，然后把这个数组更新到state的list变量上，这是一个赋值操作，两个都是数组。
            .then((hits) => this.setState({ list: hits }));
    }

    onChange(e) {
        // setState is own func from React,
        // 获取的是input框的输入值复制个input变量，这在this.state中已经规定好了。
        this.setState({ input: e.target.value });
    }

    render() {
        // 渲染的结果
        return (
            <div>
                <h1>Search Hacker News with React</h1>
                {/* 提交表单不会刷新页面，仅仅是触发了提交行为 */}
                {/* this 指代的是 class App */}
                <form type="submit" onSubmit={this.onSubmit}>
                    {/* 监控的是内容而不是整个dom节点  */}
                    <input type="text" onChange={this.onChange} value={this.state.input} />
                    <button type="text">Search</button>
                </form>

                {/* show the list of items */}
                {/* 将状态里存放的array，item 每一个都执行生成带key的div，内容是item（object）自己的title。 */}
                {/* input的内容必须‘更改+提交’ 同时满足，才会刷新这个节点 */}
                {this.state.list.map(item =>
                    <Item key={item.objectID} item={item} />
                )}
            </div>
        );
    }
}
//APP 以外 写了了一个Item组件，这个组件只需要传入一个对象{item}，且展示它的item.title
// 注意括号范围，这个组件和App 的关系
const Item = ({ item }) =>
<div>{item.title}</div>
// 把react提供组件塞到html的页面中
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
```

可以看到代码更好读，函数的来回嵌套更少，需要记忆的函数名称也短了很多。
形如在代码中map批量生成在Jquery中是很难做到的。以及将Item提出去作为一个组件加入另一个组件，这让代码整体的维护性大大提高。

# Vanilla JavaScript 和 React 最大的区别


**Vanilla JavaScript**: you describe with your code how to do something.

每一步都安排好了怎么做，因此体现出来就是函数的嵌套或者后接. 这样每个函数都处理一部分内容，得到了最后的成果。

这就像做菜，你要做红烧鱼，先买鱼，再杀鱼，清洗鱼，切鱼，烧油，放入葱姜蒜，放入鱼，炸至金黄，捞出备用，起锅烧油，放入花椒爆香，放入秘制辣椒烧至红亮，放入鱼，倒入事先备好的高汤，闷烧30mins。

**declarative programming with React**: describe with your code what you want to do. 

将组件的功能当作组件的prop来写，新增还是删除，十分容易，组件的嵌套也拆分开来，这样组件就像函数一样根据参数不同就可以达到不同的效果。

这就像你开餐饮服务了，你不会要求每一个人要会1000道菜，你会要求人员分为：择菜，洗菜，切菜（粗切工、精切工，雕工等不同类型）预处理菜，负责看火的，负责看炸锅的，负责杀动物的，负责清洗动物的，腌制动物，摆盘的，上菜的.....

对案例这样的例子，不见得react比Vanilla JavaScript好，如果你只是想吃一盘红烧鱼的话。

但当你想要承办一上午100桌婚宴客人（客人还分为，陌生人，普通朋友，vip贵宾，三种）不同等级的客人吃到的菜单是不一样的，以及你需要保证每一桌上菜时间不会相差太多（注意，不同菜工艺不同且花费时间不同），个别1-2桌还有加特别菜的时候。

react这样的思路就能发挥作用。

