# JS 面试题

## 16进制的颜色转为rgb 

```javascript
/**  
* @param hex 例如:"#23ff45"
* @param opacity 透明度
* @returns {string}
*/ 
function hexToRgba(hex, opacity) { 
	return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
}
```

## 布尔运算

```javascript
var a = 0;
var b = [1];
console.log(a || b) // [1]

console.log(a && b) // 0
```

# 手写题

## 实现一个new操作符

`new`操作符做了这些事：

- 它创建了一个全新的对象。
- 它会被执行 `[[Prototype]]`（也就是 `__proto__`）链接。
- 它使 `this`指向新创建的对象。。
- 通过 `new`创建的每个对象将最终被 `[[Prototype]]`链接到这个函数的 `prototype`对象上。
- 如果函数没有返回对象类型 `Object`(包含 `Functoin,Array,Date,RegExg,Error`)，那么 `new`表达式中的函数调用将返回该对象引用。

![image-20210222230554050](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210222230754.png)

## 实现一个JSON.stringify

> `JSON.stringify(value[,replacer[,space]])`：
>
> - `Boolean|Number|String` 类型会自动转换成对应的原始值。
> - `undefined`、任意函数以及 `symbol`，会被忽略（出现在非数组对象的属性值中时），或者被转换成 `null`（出现在数组中时）。
> - 不可枚举的属性会被忽略
> - 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。

![image-20210222230657816](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210222230800.png)