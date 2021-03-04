# 算法

## 回溯

1. 请用算法实现，从给定的无序、不重复的数组data中，取出n个数，使其相加和为sum。并给出算法的时间/空间复杂度。(不需要找到所有的解，找到一个解即可)

```javascript
function getResult(data, n, sum, temp = []) {
    if (temp.length === n) {
        const isExist = temp.reduce((accu, cur) => accu + cur, 0) === sum;
        if (isExist) return temp;
        return false;
    }
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
        const current = data.shift();
        temp.push(current);
        result = getResult(data, n, sum, temp);
        if (result) break;
        // 还原为原数组
        temp.pop();
        data.push(current);
    }
    return result;
}
const arr = [1, 5, 6, 2, 4, 7, 3];
console.log(getResult(arr, 3, 10, []));
```

## 深度优先遍历

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210228212553.webp)

```html
<div id='root'>
  <span>123
    <a href="#">
      sdsd
    </a>
    <div>sdsd<a>这是一个a标签</a></div>
  </span>
  <span>456
    <p>这是一个p标签</p>
  </span>
</div>
```

```javascript
function deepFirstSearch(node, nodeList) {
  if (node) {
    nodeList.push(node);
    const children = node.children;
    for (let i = 0; i < children.length; i++)
      //每次递归的时候将需要遍历的节点 和 节点所存储的数组传下去
      deepFirstSearch(children[i], nodeList);
  }
  return nodeList;
}
const root = document.getElementById('root');
const a =  deepFirstSearch(root, [])
console.log(a)
```

## 广度优先遍历

```javascript
// 用队列进行广度优先遍历
function breadthFirstSearch (node) {
    const queue = [];
    const nodeList = [];
    if (node !== null) {
        queue.push(node);
        while(queue.length > 0) {
            const item = queue.shift();
            nodeList.push(item);
            Array.from(item.children).forEach((child) => {
                queue.push(child);
            });
        }
    }
    return nodeList;
}
const b = breadthFirstSearch(root)
console.log(b)
```

## 数组偏平化

## 第一个不重复的字符

## 爬楼梯(字节)

## 实现Array.prototype.splice

## 



