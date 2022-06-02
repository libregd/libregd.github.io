# Tutorial
[FCC-React tutorial](https://www.freecodecamp.org/learn/front-end-development-libraries)

# 背景
本篇文章是学习记录，要求主要有以下几个：
- 所有涉及概念的内容必须用自己的话语总结概括。
- 重在扩展新内容和加深认识，不是跟完就行了。

# 知识点
感觉fcc的知识属于一次只讲一个点，真的很好，教程典范。
## 从JSX 讨论为什么需要React这样的东西？

除了FCC的小挑战，对于这个章节可以考虑做的挑战有：[官方JSX知识点挑战](https://beta.reactjs.org/learn/your-first-component#challenges)

JSX是一种亲切可人的编写页面结构的办法
![](https://www.freecodecamp.org/news/content/images/2022/04/image-12.png)

上图是的对比是jsx 和react没有jsx之前应该怎么写，作为对比，如果用JavaScript original 会是[这个写法](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)


original JavaScript → JavaScript in framework →  typescript in framework 

互联网上你能搜到的大量内容都是jsx相关的，也就是处于上方链条中的中间部分。
- JSX必须包裹在一个节点内，节点内想怎么塞都行。
- JSX 内可以嵌套JavaScript使其生成内容

对此我写了一篇用React(框架)的必然性：[为什么需要用react？](./why-freamworks-matter.md)可以更深刻的感到react的好。

## props of components 
<details>
<summary>设置一个静态变量的默认值</summary>

```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};

const Camper = props => <p>{props.name}</p>;
  // defaultProps 是一个自带属性，用来设置一些默认值或者初始值的
Camper.defaultProps = {
  name: "CamperBot"
};
//对于属性值的键对值有类型要求，这么看，果然tsx要好很多..... 
Camper.propTypes = {
  name: PropTypes.string.isRequired
};
```

</details>

<details>
<summary>event绑定到component上</summary>

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Initial State'
    };
    // 因为erturn部分的jsx触发函数是这整个组件的一部分，需要绑定到组件上，这个组件是this
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // 触发这个函数的时候，设置变量
      this.setState({
        name:"React Rocks!"
      })
  }
  render() {
      // 这里重新赋值命名了一下
     const name =  this.state.name
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{name}</h1>
      </div>
    );
  }
};
```
</details>

<details>
<summary>在一个组件内通过不同event对同一个state进行操作</summary>

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
   // 事件的按钮都是组件的一部分，要操作的this的state，不绑不行
 this.increment = this.increment.bind(this);
  this.decrement = this.decrement.bind(this);
   this.reset = this.reset.bind(this);
    
  }
  
increment(){
    // 这个格式要强调，state是个对象，=> 后跟（） 里面再套个{}，{}再放个key，value
  this.setState(state =>  ({
   count:state.count+1
   }))
}
decrement(){
  this.setState(state => ({
   count:state.count-1
  }))
  }

reset(){
  this.setState(state => ({
   count:0
  }))
}

  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```
</details>

<details>
<summary>同步展示input的输入值</summary>

```jsx
 class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };

this.handleChange = this.handleChange.bind(this)

  }

handleChange(e){
  this.setState(state =>({
    input: e.target.value
  }))
}
  
  render() {
    return (
      <div>
        { /* input的value，onChange是常用自带props */}

           <input value = {this.state.input} onChange={this.handleChange} /> 
        { /* Change code above this line */}
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};
```
</details>

<details>
<summary>分步展示input的输入值</summary>

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
       
      input: event.target.value
    });
  }
  handleSubmit(event) {
    // 阻止事件的默认提交，比如回车。依靠btn来提交
    event.preventDefault()
 this.setState(state =>({
    //  输入的内容被target获取后，从input传到到submit
    submit: this.state.input
  }))
   
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value = {this.state.input} onChange={this.handleChange}/>
          <button type='submit'>Submit!</button>
        </form>
          <h1>{this.state.submit}</h1>
      </div>
    );
  }
}
```
</details>

<details>
<summary>从组件之间传递prop的办法，靠state</summary>
有点绕，啥时候用是个问题，感觉有点没必要，格式都差不多干嘛硬分两个组件

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }

  render() {
    
    return (
       <div>
{/*The Navbar component should receive the MyApp state property name as props.*/}
         <Navbar name={this.state.name} />

       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>

       <h1>Hello, my name is: {this.props.name}</h1>

    </div>
    );
  }
};
```
</details>

<details>
<summary>Pass a Callback as Props</summary>
这个callback比较好玩，等于做到了样式和控制分离。

```jsx
import React from "react";
class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }
    render() {
        return (
            <div>
                {/* hange 这个名字是从GetInput的定义里来的，并不是随便什么名字都可以，但是召唤的函数是this里的 */}
                {/*GetInput要两个参数，hange和words，但是words没写也能过 */}
                <GetInput hange={this.handleChange}  />
            {/* 如果写了的话，是这个样子 */}
                    {/* <GetInput hange={this.handleChange} words={this.state.inputValue} /> */}
                {/* show这个props-name也是，来自RenderInput里，必须一致，但是{}内的内容是根据MyApp的写法来的 */}
                <RenderInput show={this.state.inputValue} />
                { /* Change code above this line */}
            </div>
        );
    }
};

class GetInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>Get Input:</h3>
                <input
                    value={this.props.words}
                    onChange={this.props.hange} />
            </div>
        );
    }
};

class RenderInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3>Input Render:</h3>
                <p>{this.props.show}</p>
            </div>
        );
    }
};

export default MyApp
```

</details>

<details>
<summary>Add Inline Styles in React</summary>

```jsx
// 看来如果不是css分离，写成对象赋值是不错的做法。但是也有遗憾的地方，很多比例单位没法搞，比如rem，rm，这个只认px的样子
const styles = {
  color: 'purple',
  fontSize: '40',
  border: "2px solid purple",
};


class Colorful extends React.Component {

  render() {

    return (
      <div style={styles}>Style Me!</div>
    );

  }
};
```

</details>

<details>
<summary>三元运算符根据条件展示不同的内容</summary>
这个蛮实用的，内容还可以是组件，这个是在渲染 的时候在判断展示什么

```jsx


class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line
       this.state = {
      userAge: '',
      input: ''
    }
    // Change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    //这里是P段落比button要合理。
    const tips1 = <p>You May Enter</p>;
    const tips2 = <p>You Shall Not Pass</p>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/* 没有输入就还是保持原样，年纪大于等于18就提示可以，小于18不行 */}
        {
          
          this.state.userAge === ''
            ? buttonOne
            : this.state.userAge >= 18
              ? tips1
              : tips2
          }
       
      </div>
    );
  }
}
```

</details>

<details>
<summary>根据组件的一些状态/值，来修改style </summary>
根据组件状态有条件地更改内联 CSS，从案例来看作为提醒不错的，如果再搭配一个值判断，也可以显示出一些提醒文本。


```jsx
import React from "react";
class GateKeeper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: ''
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
      this.setState({ input: event.target.value })
    }
    render() {
      let inputStyle = {
        border: '1px solid black'
      };
  
        if(this.state.input.length > 15){
          inputStyle.border = '3px solid red'
        }

      return (
        <div>
          <h3>Don't Type Too Much:</h3>
          <input
            type="text"
            style={inputStyle}
            value={this.state.input}
            onChange={this.handleChange} />
        </div>
      );
    }
  };
  export default GateKeeper
```

</details>


<details>
<summary>map()基础应用，给批量条加上keyid </summary>

```JSX
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      toDoList:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    // 这些就是基础知识了感觉
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    // 这个还是比较好的习惯，把map抽出来，这样下面整体会好看，key是个习惯变量，加多了就习惯了，还是要习惯加
    const items = this.state.toDoList.map((x,index)=><li key={index}>{x}</li>); 
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```

</details>


<details>
<summary>使用 Array.Filter() 动态过滤数组 </summary>

```JSX
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    };
  }
  render() {
    const usersOnline = this.state.users.filter(user => user.online);
    const renderOnline = usersOnline.map((x,index) => <li key={index}>{x.username}</li>); 
    return (
      <div>
        <h1>Current Online Users:</h1>
        <ul>{renderOnline}</ul>
      </div>
    );
  }
}
```
</details>

## redux等
这个感觉unState-next是更好的也许，所以这部分跳过。

# FCC实战
并不打算按着fcc的要求做，也就是提交项目，但是人家实现的效果是不错的。发散一下做做看是不错的。
[Project lists](https://www.freecodecamp.org/learn/front-end-development-libraries/#front-end-development-libraries-projects)

## 构建一个随机引语生成器
- [参考]( https://codepen.io/freeCodeCamp/full/qRZeGZ )

- [X] 实现按btn就出现新的一条内容和作者
- [ ] 实现推特转发？
- [ ] 颜色算主题，有个黑白切换就行。
- [API](https://github.com/lukePeavey/quotable#get-random-quote)
- [实现地址](https://libregd.github.io/profilo/practices)
## 构建一个 Markdown 文件预览器

- [参考](https://codepen.io/freeCodeCamp/full/GrZVVO)

- [X] 无需自己实现markdown的解析[MARKED](https://cdnjs.com/libraries/marked)
- [ ] CSS 美化完整
- [ ] syntax highlight
- 用的另一个[react-markdown](https://github.com/remarkjs/react-markdown#plugins)
- [实现地址](https://libregd.github.io/profilo/practices)
- 语法高亮：[react-syntax-highlighter](https://github.com/remarkjs/react-markdown)


## 

