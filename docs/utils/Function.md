## call

https://github.com/mqyqingfeng/Blog/issues/11

```javascript
Function.prototype.myCall = function (context) {
  // 当传入的对象undefined 或者null的时候 this指向全局对象
  // context = context || window;
  if (context === undefined || context === null) {
    context = globalThis; // ES11新增, globalThis指向全局对象
  }

  context.__fn = this; // this 即 f.myCall 的 f
  const args = [...arguments].slice(1);
  const result = context.__fn(...args);
  delete context.__fn;
  return result;
};
```

## apply

```javascript
Function.prototype.myApply = function (context) {
  if (context === undefined || context === null) {
    context = globalThis; // ES11新增, globalThis指向全局对象
  }
  context.__fn = this;
  let result;
  // 处理参数和 call 有区别, apply的第二个参数是一个数组。
  if (arguments[1]) {
    result = context.__fn(...arguments[1])
  } else {
    result = context.__fn()
  }
  return result;
};
```

## bind

```javascript
Function.prototype.myBind = function (context) {
  const _this = this; // this 即 f.myBind 的 f
  const args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.myApply(context, args.concat(...arguments));
  }
};
```

## throttle

```javascript
/**
 * 节流, 立即执行函数，在规定时间内，只会执行第一次。用于抢购等。
 * 第一次点击有效
 * @param {*} fn 将执行的函数
 * @param {*} time 节流规定的时间
 */
function throttle(fn, time) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      fn.apply(this, args);

      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}
```

## debounce

```javascript
/**
 * 防抖， 等待指定时间后再执行，用于关键字搜索等。
 * 最后一次触发事件有效
 * @param {*} fn 将执行的函数
 * @param {*} time 指定防抖持续时间
 */
function debounce(fn, time) {
  let timer = null

  return function (...args) {
    // 重新执行并停止上次执行（若上次还未执行则会被清除）
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null
      // this指向外层函数
      fn.apply(this, args)
    }, time)
  }
}
```

## 函数柯里化

```javascript
// 柯里化之前
function add(x, y) {
  return x + y;
}
add(1, 2) // 3
// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}
addX(2)(1) // 3
```

## 函数聚合

```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}


function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

compose(f1, f2, f3)("omg"); //f1(f2(f3("omg")));
```

