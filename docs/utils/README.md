## 工具库

### 函数相关

 1. call()

    call(obj, ...args)

 2. apply()

    apply(obj, args)

 3. bind()

    bind(obj, ...args)

4. throttle() 节流

   在函数需要频繁触发时: 函数执行第一次后，只有大于设定的执行周期后才会执行第二次

   适合多次事件按时间做平均分配触发。

   场景

   - 窗口调整（resize）
   - 页面滚动（scroll）
   - DOM 元素的拖拽功能实现（mousemove）
   - 抢购疯狂点击（click）

   特点：特定时间内，只有第一次的触发有效

5. debounce() 防抖

   在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。

   场景

   - 搜索

### 数组相关

1. map()
2. reduce()
3. filter()
4. find()
5. findIndex()
6. every()
7. some()
8. unique() //数组去重
9. concat()
10. slice()
11. flatten() // 数组扁平化 => [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
12. chunk()  // 数组分片 => [1, 3, 5, 6, 7, 8] 调用chunk(arr, 4) ==> [[1, 3, 5, 6], [7,8]
13. difference() // difference([1,3,5,7], [5, 8]) ==> [1, 3, 7]
14. pull()
15. pullAll()
16. drop() // 过滤掉左边count个后剩余元素组成的数组
17. dropRight() // 过滤掉右边count个后剩余元素组成的数组