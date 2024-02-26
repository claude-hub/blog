# JS 基础

[yck大佬的博客](https://yuchengkai.cn/)

## 类型

`null`，`undefined`，`boolean`，`number`，`string`，`symbol`

## Typeof

`typeof` 对于基本类型，除了 `null` 都可以显示正确的类型

```javascript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
```

> typeof null // 'object'

`typeof` 对于对象，除了函数都会显示 `object

```javascript
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

## 原型

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210218175143.png)

每个函数都有 `prototype` 属性，除了 `Function.prototype.bind()`，该属性指向原型。

每个对象都有 `__proto__` 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]`，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `_proto_`来访问。

对象可以通过 `__proto__` 来寻找不属于该对象的属性，`__proto__` 将对象连接起来组成了原型链。

### 原型

- 每个函数都有一个`prototype` 属性，它默认指向一个Object空对象

  ```javascript
  function Fun(){}
  console.log(Fun.prototype) // 默认指向一个Objec空对象
  ```

- 原型对象中有一个属性 `constructor`, 它指向函数对象

  ```javascript
  Fun.prototype.constructor === Fun
  ```

  ![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210220104500.jpg)

### 显式原型与隐式原型

- 每个函数都有一个 `prototype`, 即显示原型属性，默认指向一个空的Object对象

  ```javascript
  function Fun(){} // 内部语句：this.prototype = {}
  ```

- 每个实例对象都有一个 `__proto__`, 即隐式原型

  ```javascript
  var fun = new Fun() // 内部语句：this.__proto__ = Fun.prototype
  fun.__proto__
  ```

- 对象的隐式原型的值等于其对应构造函数的显示原型的值

  ```javascript
  Fun.prototype === fun.__proto__
  
  Fun.prototype.test = function() {}
  fn.test()
  ```

  ![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210220110208.jpg)

### 隐式原型链

访问一个对象的属性时

- 现在自身属性中查找，找到返回
- 没找到，再沿着 `__proto__` 这条链向上查找，找到返回
- 如果最终没找到返回 `undefiend`

作用：查找对象的属性(方法)

![image-20210220111425373](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210220111428.png)

图解：实例对象`o1.__proto__ === Object.prototype `  

Object中有个 `prototype` 属性，这个属性里面有个构造函数 `constructor` 指向原型对象
![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210220104500.jpg)

![image-20210220112015450](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210220112017.png)

- 函数的显式原型指向的空的Object实例对象 （Object除外）

  ```javascript
  Fn.prototype instanceof Object // true
  Object.prototype instanceof Object // fasle
  Function.prototype instanceof Object // true
  ```

- 所有的函数都是Function的实例 (包含Function)

  ```javascript
  Function.__proto__ === Function.prototype
  ```

- Object的原型对象是原型链的尽头

  ```javascript
  Object.prototype.__proto__ === null
  ```

## new

1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

对于实例对象来说，都是通过 `new` 产生的，无论是 `function Foo()` 还是 `let a = { b : 1 }` 。

对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论性能上还是可读性）。因为你使用 `new Object()` 的方式创建对象需要通过作用域链一层层找到 `Object`，但是你使用字面量的方式就没这个问题。

对于 `new` 来说，还需要注意下运算符优先级。

## instanceof

`instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

```javascript
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}
```

### 如何判断

表达式： a instanceof A

​	如果A函数的显式原型对象在a对象的隐式原型链上，返回true，否则返回false

Function是通过 new 自己产生的实例

### 案例

```javascript
function Foo(){}
var f1 = new Foo()
f1 instanceof Foo //true
f1 instanceof Object // true
```

![image-20210220115643158](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210220115644.png)

## this

只依赖于调用函数前的对象

```javascript
function foo() {
	console.log(this.a)
}
var a = 1
foo()

var obj = {
	a: 2,
	foo: foo
}
obj.foo()

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo()
c.a = 3
console.log(c.a)

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

## 执行上下文

当执行 JS 代码时，会产生三种执行上下文

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

## 闭包

闭包的定义很简单：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

## 继承

在 ES5 中，我们可以使用如下方式解决继承的问题

```javascript
function Super() {}
Super.prototype.getNumber = function() {
  return 1
}

function Sub() {}
let s = new Sub()
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
```

ES6

```javascript
class MyDate extends Date {
  test() {
    return this.getTime()
  }
}
let myDate = new MyDate()
myDate.test()
```

## call, apply, bind 区别

首先说下前两者的区别。

`call` 和 `apply` 都是为了解决改变 `this` 的指向。作用都是相同的，只是传参的方式不同。

除了第一个参数外，`call` 可以接收一个参数列表，`apply` 只接受一个参数数组。

## Promise 实现

Promise 是 ES6 新增的语法，解决了回调地狱的问题。

可以把 Promise 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject`，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。

`then` 函数会返回一个 Promise 实例，并且该返回值是一个新的实例而不是之前的实例。因为 Promise 规范规定除了 `pending` 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 `then` 调用就失去意义了。

## Generator 实现

Generator 是 ES6 中新增的语法，和 Promise 一样，都可以用来异步编程

```javascript
// 使用 * 表示这是一个 Generator 函数
// 内部可以通过 yield 暂停代码
// 通过调用 next 恢复执行
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }
```

从以上代码可以发现，加上 `*` 的函数执行后拥有了 `next` 函数，也就是说函数执行后返回了一个对象。每次调用 `next` 函数可以继续执行被暂停的代码。以下是 Generator 函数的简单实现。

```javascript
// cb 也就是编译过的 test 函数
function generator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    };

    return {
      next: function() {
        var ret = cb(object);
        if (ret === undefined) return { value: undefined, done: true };
        return {
          value: ret,
          done: false
        };
      }
    };
  })();
}

// 如果你使用 babel 编译后可以发现 test 函数变成了这样
function test() {
  var a;
  return generator(function(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        // 可以发现通过 yield 将代码分割成几块
        // 每次执行 next 函数就执行一块代码
        // 并且表明下次需要执行哪块代码
        case 0:
          a = 1 + 2;
          _context.next = 4;
          return 2;
        case 4:
          _context.next = 6;
          return 3;
		// 执行完毕
        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}
```

##  async 和 await

一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`

可以把 `async` 看成将函数返回值使用 `Promise.resolve()` 包裹了下。

`await` 只能在 `async` 函数中使用

## Proxy

Proxy 是 ES6 中新增的功能，可以用来自定义对象中的操作

```javascript
let p = new Proxy(target, handler);
// `target` 代表需要添加代理的对象
// `handler` 用来自定义对象中的操作
```

## 闭包

### 什么是闭包

函数执行后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，即形成了闭包。

可以在内部函数访问到外部函数作用域。使用闭包，一可以读取函数中的变量，二可以将函数中的变量存储在内存中，保护变量不被污染。而正因闭包会把函数中的变量值存储在内存中，会对内存有消耗，所以不能滥用闭包，否则会影响网页性能，造成内存泄漏。当不需要使用闭包时，要及时释放内存，可将内层函数对象的变量赋值为null。

### 闭包原理

函数执行分成两个阶段(预编译阶段和执行阶段)。

- 在预编译阶段，如果发现内部函数使用了外部函数的变量，则会在内存中创建一个“闭包”对象并保存对应变量值，如果已存在“闭包”，则只需要增加对应属性值即可。
- 执行完后，函数执行上下文会被销毁，函数对“闭包”对象的引用也会被销毁，但其内部函数还持用该“闭包”的引用，所以内部函数可以继续使用“外部函数”中的变量

利用了函数作用域链的特性，一个函数内部定义的函数会将包含外部函数的活动对象添加到它的作用域链中，函数执行完毕，其执行作用域链销毁，但因内部函数的作用域链仍然在引用这个活动对象，所以其活动对象不会被销毁，直到内部函数被烧毁后才被销毁。

### 优点

1. 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期驻扎在内存中，可供之后使用
2. 避免变量污染全局
3. 把变量存到独立的作用域，作为私有成员存在

### 缺点

1. 对内存消耗有负面影响。因内部函数保存了对外部变量的引用，导致无法被垃圾回收，增大内存使用量，所以使用不当会导致内存泄漏
2. 对处理速度具有负面影响。闭包的层级决定了引用的外部变量在查找时经过的作用域链长度
3. 可能获取到意外的值(captured value)

### 应用场景

**应用场景一：** 典型应用是模块封装，在各模块规范出现之前，都是用这样的方式防止变量污染全局。

```
var Yideng = (function () {
    // 这样声明为模块私有变量，外界无法直接访问
    var foo = 0;

    function Yideng() {}
    Yideng.prototype.bar = function bar() {
        return foo;
    };
    return Yideng;
}());
```

**应用场景二：** 在循环中创建闭包，防止取到意外的值。

如下代码，无论哪个元素触发事件，都会弹出 3。因为函数执行后引用的 i 是同一个，而 i 在循环结束后就是 3

```
for (var i = 0; i < 3; i++) {
    document.getElementById('id' + i).onfocus = function() {
      alert(i);
    };
}
//可用闭包解决
function makeCallback(num) {
  return function() {
    alert(num);
  };
}
for (var i = 0; i < 3; i++) {
    document.getElementById('id' + i).onfocus = makeCallback(i);
}
```

## 箭头函数和普通函数的区别

1、箭头函数不能绑定arguments,取而代之的是rest的...解决

2、箭头函数是匿名函数，不能作为构造函数，不能使用new

3、箭头函数没有原型属性

4、箭头函数不能绑定this，会将离自己最近的一个普通函数的this作为自己的this

5、call、apply、bind都无法改变箭头函数中this的指向







