# MVVM

MVVM框架的三要素：**数据响应式**、**模板引擎**及其**渲染**

数据响应式：监听数据变化并在视图中更新 

- Object.defineProperty() 
- Proxy 

模版引擎：提供描述视图的模版语法 

- 插值：{{}} 
- 指令：v-bind，v-on，v-model，v-for，v-if 

渲染：如何将模板转换为html 

- 模板 => vdom => dom

## 数据响应式原理

数据变更能够响应在视图中，就是数据响应式。vue2中利⽤ Object.defineProperty() 实现变更检测。

```javascript
const obj = {}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}:${val}`);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`set ${key}:${newVal}`);
        val = newVal
      }
    }
  })
}
defineReactive(obj, 'foo', 'foo')
obj.foo
obj.foo = 'foooooooooooo'
```

### 问题

- 需要递归遍历所有需要监听的对象

  Vue3采用Proxy，解决这个问题

- `defineProperty()` 不⽀持数组

  - Vue中采用了重写数组的所有方法

## 原理分析

1. new Vue() ⾸先执⾏初始化，对data执⾏响应化处理，这个过程发⽣在Observer中。
2. 同时对模板执⾏编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发⽣在 Compile中 
3. 同时定义⼀个更新函数和Watcher，将来对应数据变化时Watcher会调⽤更新函数
4. 由于data的某个key在⼀个视图中可能出现多次，所以每个key都需要⼀个管家Dep来管理多个 Watcher 
5. 将来data中数据⼀旦发⽣变化，会⾸先找到对应的Dep，通知所有Watcher执⾏更新函数

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219120029.png)

涉及类型：

- 框架构造函数 Observer：执⾏数据响应化（分辨数据是对象还是数组） 
- Compile：编译模板，初始化视图，收集依赖（更新函数、watcher创建） 
- Watcher：执⾏更新函数（更新dom） 
- Dep：管理多个Watcher，批量更新

### Compile

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219120725.png)

编译模板中vue模板特殊语法，初始化视图、更新视图

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219120743.jpg)



### 依赖收集

视图中会⽤到data中某key，这称为依赖。

同⼀个key可能出现多次，每次都需要收集出来⽤⼀个 Watcher来维护它们，此过程称为依赖收集。 

多个Watcher需要⼀个Dep来管理，需要更新时由Dep统⼀通知。

看下⾯案例，理出思路：

```javascript
new Vue({
  template: `<div>
  <p>{{name1}}</p>
  <p>{{name2}}</p>
  <p>{{name1}}</p>
  <div>`,
  data: {
    name1: 'name1',
    name2: 'name2'
  }
});
```

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219122940.jpg)

## 实现思路

1. defineReactive时为每⼀个key创建⼀个Dep实例
2. 初始化视图时读取某个key，例如name1，创建⼀个watcher1 
3. 由于触发name1的getter⽅法，便将watcher1添加到name1对应的Dep中
4. 当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219120029.png)

## 总结

Vue1.0

- 粒度精细。不需要虚拟dom
- watcher太多了

Vue2.0

- 粒度折中，每个组件一个watcher
- 每个组件内部值发生了变化，就知道谁变了
- 可以重新渲染一次获取最新的vdom
- diff oldVnode newVnode

# VUE

## 生命周期

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219115407.png)