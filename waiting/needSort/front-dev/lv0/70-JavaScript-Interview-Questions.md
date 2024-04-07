原文：[70 JavaScript Interview Questions](https://dev.to/macmacky/70-javascript-interview-questions-5gfi)

已经有一版的翻译：[70个JavaScript面试问题](https://www.html.cn/interview/15926.html)

本文不算翻译，算自己尝试解答的内容较多。2020年的文章，算比较新也不太新。
# 正文

**1. What's the difference between ```undefined``` and ```null```?.**

```typeof``` 这两，一个是undefined ，一个是object，具体了解不同的话→[MDN 有写](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null#difference_between_null_and_undefined)

-  7 primitive data types ：string, number, bigint, boolean, undefined, symbol, and null.

**2. What does the && operator do?**

从左到右的验证boolean值，都为真则返回最后一个变量的值，有假的运行到假的即刻返回false，后面出的不管。但是这些logical operator 混在一起用的时候要小心执行顺序，具体就现查。→[Logical_AND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#operator_precedence)

**3. What does the || operator do?**

从左到右验证boolean，哪个先为真返回哪一个变量的值，只要这个变量不是boolean。全假的返回false。要注意的是，每个确定的时候就还是要走转Boolean 这一套。→ [Logical_OR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)
 
```let careful = [null,NaN,0,"".'',``,undefined]```

上面这些在boolean里都算false


**4. Is using the + or unary plus operator the fastest way in converting a string to a number**
据说是的，→ [Expressions and operators by category](https://developer.mozilla.org/en-US/docs/web/javascript/reference/operators#Unary_plus) 
```js
console.log(+null, typeof +null) // 0 'number'
console.log(+"", typeof +"") // 0 'number'
console.log(+"3s4s", typeof +"ssdfsd") // NaN 'number'
console.log(+undefined, typeof +undefined) //NaN 'number'
console.log(+NaN, typeof +NaN) // NaN 'number', NaN本来就是nuber
``` 

感觉这个方法随着typescript的铺开就少用。

**5. What is the DOM?**
DOM stands for Document Object Model is an interface (API) for HTML and XML documents. → [Document_Object_Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

DOM是一整套描述HTML/XML文件结构的数据模型，对开发者来说，体现为interface，接口。

是接口就意味着不只有JavaScript用，但一般来说，DOM是主要提供给JavaScript操作。

``` HTML
<form>
  <input type="input" onclick="alert('click event occurred')">
</form> 
```
上面这段纯html也会触发alert，而onclick，是放在html中执行的，和JavaScript没啥关系。
``` JS
<form>
  <input type="input" id="myCheck" onClick="myFunction()">
</form> 
<script>
function myFunction() {
    document.getElementById("myCheck").click(alert('click event occurred'));
}
</script>
```
上面这个实现了和用纯html一样能实现的效果，而且点击一次，弹窗出现了两次。一次是html中的innput被onclick，出发了click的内容。一次是从JavaScript的角度，获取了input这个元素，要求点击后弹窗。
在 [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) 中，可以看到[DOM iterfaces](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model#dom_interfaces)。需要说明的是，DOM是属于Web APIs。

专门把DOM提溜出来，就是因为JavaScript有大量操作页面元素的内容，这个页面元素，体现出来就是html的tag tree。

**6. What is Event Propagation?**



