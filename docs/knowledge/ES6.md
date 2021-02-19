# ES6 大全

转自: [ES6入门文档](http://caibaojian.com/es6/)
## let

- 不存在变量提升
- 暂时性死区，只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
- 不允许重复声明

## const

- `const`声明一个只读的常量。一旦声明，常量的值就不能改变。

- `const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

- `const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

## 块级作用域

## ...运算符

```javascript
const obj = {
    name: 'claude',
    age: 22
}
const a = {...obj};
```

## 变量的解构赋值

```javascript
var obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

var { p: [x, { y }] } = obj;
```

## 字符串的扩展

### includes(), endsWith()

**includes()**：返回布尔值，表示是否找到了参数字符串。

### startsWith()

**startsWith()**：返回布尔值，表示参数字符串是否在源字符串的头部。

### endsWith()

**endsWith()**：返回布尔值，表示参数字符串是否在源字符串的尾部。

### padStart()，padEnd()

ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart`用于头部补全，`padEnd`用于尾部补全。

### repeat()

`repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

### 模板字符串

```javascript
const str = `${name}`
```

## 数组的扩展

### Array.from()

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）

### Array.of()

`Array.of`方法用于将一组值，转换为数组。

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。

```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

上面代码中，`Array`方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于2个时，`Array()`才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。	

### find() 和 findIndex()

### entries()，keys()和values()

## 函数的扩展

### 箭头函数

> ()=>{}

箭头函数有几个使用注意点。

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

- 不可以使用`yield`命令，因此箭头函数不能用作Generator函数。

## 对象的扩展

### Object.is()

ES5比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致

### Object.assign()

`Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```javascript
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

`Object.assign`方法实行的是**浅拷贝**，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

### 属性的遍历

- for...in

- Object.keys(obj)

- Object.getOwnPropertyNames(obj)

  `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。

- Object.getOwnPropertySymbols(obj)

  `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有Symbol属性。

- Reflect.ownKeys(obj)

  `Reflect.ownKeys`返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

## Symbol

​	ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

## Set和Map数据结构

### Set

​	ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成Set数据结构。

```javascript
var s = new Set();

[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

### WeakSet

WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

- WeakSet的成员只能是对象，而不能是其他类型的值。

- WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

```javascript
var a = [[1,2], [3,4]];
var ws = new WeakSet(a);
```

上面代码中，`a`是一个数组，它有两个成员，也都是数组。将`a`作为WeakSet构造函数的参数，`a` 的成员会自动成为WeakSet的成员。

注意，是`a` 数组的成员成为WeakSet的成员，而不是`a`数组本身。这意味着，数组的成员只能是对象。

```javascript
var b = [3, 4];
var ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```

上面代码中，数组`b`的成员不是对象，加入WeaKSet就会报错。

WeakSet结构有以下三个方法。

- **WeakSet.prototype.add(value)**：向WeakSet实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除WeakSet实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在WeakSet实例之中。

### Map

```javascript
var m = new Map();
var o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

### WeakMap

`WeakMap`结构与`Map`结构基本类似，唯一的区别是它只接受对象作为键名（`null`除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。

```javascript
var map = new WeakMap()
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
```

上面代码中，如果将`1`和`Symbol`作为WeakMap的键名，都会报错。

`WeakMap`的设计目的在于，键名是对象的弱引用（垃圾回收机制不将该引用考虑在内），所以其所对应的对象可能会被自动回收。当对象被回收后，`WeakMap`自动移除对应的键值对。典型应用是，一个对应DOM元素的`WeakMap`结构，当某个DOM元素被清除，其所对应的`WeakMap`记录就会自动被移除。基本上，`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于防止内存泄漏。

下面是`WeakMap`结构的一个例子，可以看到用法上与`Map`几乎一样。

```javascript
var wm = new WeakMap();
var element = document.querySelector(".element");

wm.set(element, "Original");
wm.get(element) // "Original"

element.parentNode.removeChild(element);
element = null;
wm.get(element) // undefined
```

上面代码中，变量`wm`是一个`WeakMap`实例，我们将一个`DOM`节点`element`作为键名，然后销毁这个节点，`element`对应的键就自动消失了，再引用这个键名就返回`undefined`。

WeakMap与Map在API上的区别主要是两个，一是没有遍历操作（即没有`key()`、`values()`和`entries()`方法），也没有`size`属性；二是无法清空，即不支持`clear`方法。这与`WeakMap`的键不被计入引用、被垃圾回收机制忽略有关。因此，`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

前文说过，WeakMap应用的典型场合就是DOM节点作为键名。下面是一个例子。

```javascript
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

上面代码中，`myElement`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是`myElement`。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

```javascript
let _counter = new WeakMap();
let _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

let c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```

上面代码中，Countdown类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

## Proxy 和 Reflect

### Proxy

​	Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

​	Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

### Reflect

`Reflect`对象与`Proxy`对象一样，也是ES6为了操作对象而提供的新API。`Reflect`对象的设计目的有这样几个。

- 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。

- 修改某些Object方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

  ```javascript
  // 老写法
  try {
    Object.defineProperty(target, property, attributes);
    // success
  } catch (e) {
    // failure
  }
  
  // 新写法
  if (Reflect.defineProperty(target, property, attributes)) {
    // success
  } else {
    // failure
  }
  ```

-  让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

  ```javascript
  // 老写法
  'assign' in Object // true
  
  // 新写法
  Reflect.has(Object, 'assign') // true
  ```

- `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

  ```javascript
  Proxy(target, {
    set: function(target, name, value, receiver) {
      var success = Reflect.set(target,name, value, receiver);
      if (success) {
        log('property ' + name + ' on ' + target + ' set to ' + value);
      }
      return success;
    }
  });
  ```

  上面代码中，`Proxy`方法拦截`target`对象的属性赋值行为。它采用`Reflect.set`方法将值赋值给对象的属性，然后再部署额外的功能。

## Iterator

它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

## Generator 函数

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

### Promise

 ```javascript
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
 ```

## 异步操作和async函数

ES7提供了`async`函数，使得异步操作变得更加方便。`async`函数是什么？一句话，`async`函数就是Generator函数的语法糖。

## Class

```javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

## Decorator - 修饰器

​	修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个[提案](https://github.com/wycats/javascript-decorators)，目前Babel转码器已经支持。

​	修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。

## module

import export

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。