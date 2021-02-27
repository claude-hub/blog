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



