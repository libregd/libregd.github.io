原文：[Top 100 JavaScript Interview Questions and Answers for 2022](https://www.guru99.com/javascript-interview-questions-answers.html)

尝试做了一个中文版大概翻译或者说总结

# 前言

JavaScript简称JS， a high-level server-side programming language，大量被用于创建web app，这说明搞JavaScript就业机会还可以。

面试通关总要被问很多JavaScript 问题，初级经常被问基础问题，高级的则经常遭问跟自身项目经验有关的问题。这个清单涵盖的主要是初级到高级前端问题。

# 新手关

1. JavaScript是个啥？
>  client-side and server-side scripting language inserted into HTML pages and is understood by web browsers.+ an Object-based Programming language

是个能插在网页内从而被浏览器解析的脚本语言，也是一门面向对象的语言。

2. JavaScript和java啥区别？
> Java is a complete programming language. In contrast, JavaScript is a coded program that can be introduced to HTML pages. These two languages are not at all inter-dependent and are designed for different intent. Java is an object-oriented programming (OOPS) or structured programming languages like C++ or C, whereas JavaScript is a client-side scripting language.

java是个完整编程语言，和C++,C这种类似，可以叫典型的面向对象编程语言/结构化编程语言。JavaScript和它一毛钱关系都没有，就是名字长得像。

3. JavaScript的数据类型都有啥？
> number, string, boolean, object, undefined

array is a single object, an object is a structure of code that models a real-life object.

array也是个对象，对象这种办法就是编程语言里的建模思路，凡是声称自己面向对象语言的，都能找到这种建模办法。

4. isNaN function 有啥用？

> isNan function returns true if the argument is not a number; otherwise, it is false.

这个回答有点问题了，isNaN() 是验证参数是不是NaN值，是NaN就返回true，不然返回false。

- isNaN() 是一个比较老的办法，isNaN()的逻辑是你传什么就先通过```Number()```强制看能不能转成数字，然后看这个数字是不是算NaN。所以就会有很多莫名其妙的情况不那么符合直觉：[isNaN.()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN#examples)
- 最新的办法是Number.isNaN()，is a more robust version of the original, global isNaN(). 很多在isNaN()下会返回true的，这里都返回false：[Number.isNaN()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#examples)
    ``` JavaScript
    Number.isNaN('blabla') // false
    isNaN('sdfsdfsd') // true
    ```
- 验证一个NaN 是不是NaN，没用 === NaN，== NaN，的原因是，这两比的是Boolean，都是false咋比较，所以才搞出了isNaN()这个函数。
5. JavaScript快还是ASP script快？

> JavaScript is faster. JavaScript is a client-side language,, and thus it does not need the assistance of the webserver to execute. On the other hand, ASP is a server-side language and hence is always slower than JavaScript. Javascript now is also a server-side language (nodejs).

好老啊，怎么ASP都来了，ASP是比较上古时代的网页脚本语言了，微软出的和 .net framework 有关系

6. 什么是负无穷
> Negative Infinity is a number in JavaScript which can be derived by dividing negative number by zero.

```(-1/0) // -Infinity ```,负无穷，现在的js里有个常用变量```Number.NEGATIVE_INFINITY``` 来标识了。看这个名字就知道还有```POSITIVE_INFINITY```

7. 怎么让代码输出换行？
> Breaking within a string statement can be done by using a backslash, ‘\’ at the end of the first line.

这个也不咋对，```console.log("this is a \n big BANG ")``` 这个实现了换行，所以得是\n ， 怎么有点.....

8. 谁开发的JavaScript
> Netscape is the software company that developed JavaScript.

The first ever JavaScript was created by **Brendan Eich at Netscape**, and has since been updated to conform to ECMA-262 Edition 5 and later versions. This engine, code named SpiderMonkey, is implemented in C/C++.

这也问？越来越觉得作者有点神……

暂停