

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

## 第1题：写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

```javascript
function mySetInterVal(fn, a, b) {
  let timer = null;
  let time = 0;
  const start = (timeout) => {
    timer = setTimeout(() => {
      if (time > -1) {
        fn();
        start(timeout + b);
        time++;
      }
    }, timeout)
  }
  start(a);
  const myClear = (timer) => {
    if (timer) {
      clearTimeout(timer)
      time = -1;
    }
  }
  return {
    timer,
    myClear
  };
}

// test
const { timer, myClear } = mySetInterVal(() => { console.log('run') }, 100, 200);
setTimeout(() => myClear(timer), 2000);
```

## 第2题：合并二维有序数组成一维有序数组，归并排序的思路

### 归并排序

```javascript
function mergeSort(arr) {
  const len = arr.length
  // 处理边界情况
  if(len <= 1) {
      return arr[0]
  }   
  // 计算分割点
  const mid = Math.floor(len / 2)    
  // 递归分割左子数组，然后合并为有序数组
  const leftArr = mergeSort(arr.slice(0, mid)) 
  // 递归分割右子数组，然后合并为有序数组
  const rightArr = mergeSort(arr.slice(mid,len))  
  // 合并左右两个有序数组
  arr = merge(leftArr, rightArr)  
  // 返回合并后的结果
  return arr
}

function merge(arr1, arr2) {
  console.log(arr1, arr2)
  var result = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] < arr2[0]) {
      result.push(arr1.shift());
    } else {
      result.push(arr2.shift());
    }
  }
  return result.concat(arr1).concat(arr2);
}
let arr = [[1,7,9],[4,5,6],[7,8,9],[1,2,3],[4,5,6]];
console.log(mergeSort(arr));
```

### 方法二，把每个一维数组取出来，然后比较后再push到最后去

```javascript
function mergeSort1(arr) {
  let lengthArr = arr.length;
  if (lengthArr === 0) {
    return [];
  }
  while (arr.length > 1) {
    let arrayItem1 = arr.shift();
    let arrayItem2 = arr.shift();
    // merge函数见上面方法一
    let mergeArr = merge(arrayItem1, arrayItem2);
    arr.push(mergeArr);
  }
  return arr[0];
}
```

### 最简单的方法 ES6

> [[1,2,4],[2,3,7],[3,5,7],[4,5,8]].flat().sort();

## 第 3 题：多种方式实现斐波那契数列

```javascript
// 普通递归，这种方式会出现重复计算。卡死
function fibonacci(n) {
  if (n == 1 || n == 2) {
      return 1
  };
  return fibonacci(n - 2) + fibonacci(n - 1);
}
console.log(fibonacci(20))
```

```javascript

// 改进递归 - 把前两位数字做成参数避免重复计算
function fibonacci1(n) {
  function fib(n, v1, v2) {
    if (n == 1)
      return v1;
    if (n == 2)
      return v2;
    else
      return fib(n - 1, v2, v1 + v2)
  }
  return fib(n, 1, 1)
}
console.log(fibonacci1(20))
```

## 第 4 题：字符串出现的不重复最长长度

[JavaScript三种解法：无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/zi-jie-leetcode3wu-zhong-fu-zi-fu-de-zui-chang-zi-/)

图解：

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210227114916.png)

```javascript
var lengthOfLongestSubstring = function (s) {
  let arr = [], max = 0
  for (let i = 0; i < s.length; i++) {
    let index = arr.indexOf(s[i])
    if (index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i))
    max = Math.max(arr.length, max)
  }
  return max
};

// map优化
var lengthOfLongestSubstring = function (s) {
  let map = new Map(), max = 0
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i)
    }
    max = Math.max(max, j - i + 1)
    map.set(s[j], j)
  }
  return max
};

console.log(lengthOfLongestSubstring("loddktdji"))
console.log(lengthOfLongestSubstring("dvdf"))
console.log(lengthOfLongestSubstring("adfafwefffdasdcx"))
```

