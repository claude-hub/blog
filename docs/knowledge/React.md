转自: [yck博客](https://yuchengkai.cn/docs/frontend/react.html)

# React

## 高阶函数

定义：**⾼阶组件是参数为组件，返回值为新组件的函数**。

### 合成事件机制

React中有⾃⼰的事件系统模式，通常被称为React合成事件。之所以采⽤ 这种⾃⼰定义的合成事件，⼀⽅⾯是为了抹平事件在不同平台体现出来的 差异性，这使得React开发者不需要⾃⼰再去关注浏览器事件兼容性问题， 另⼀⽅⾯是为了统⼀管理事件，提⾼性能，这主要体现在React内部实现事 件委托，并且记录当前事件发⽣的状态上。 事件委托，也就是我们通常提到的事件代理机制，这种机制不会把事件处 理函数直接绑定在真实的节点上，⽽是把所有的事件绑定到结构的最外 层，使⽤⼀个统⼀的事件监听和处理函数。当组件挂载或卸载时，只是在 这个统⼀的事件监听器上插⼊或删除⼀些对象；当事件放⽣时，⾸先被这 个统⼀的事件监听器处理，然后在映射表⾥找到真正的事件处理函数并调 ⽤。这样做简化了事件处理和回收机制，效率也有很⼤提升。 记录当前事件发⽣的状态，即记录事件执⾏的上下⽂，这便于React来处理 不同事件的优先级，达到谁优先级⾼先处理谁的⽬的，这⾥也就实现了 React的增量渲染思想，可以预防掉帧，同时达到⻚⾯更顺滑的⽬的，提升 ⽤户体验。

### 特点

- React 利用事件委托机制，将几乎所有事件的触发代理（delegate）在 document 节点上，事件对象(event)是合成对象(SyntheticEvent)，不是原生事件对象，但通过 nativeEvent 属性访问原生事件对象。
- 由于 React 的事件委托机制，React 组件对应的原生 DOM 节点上的事件触发时机总是在 React 组件上的事件之前。

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219104034.png)

## Virtual Dom

- 什么是Virtual Dom

  一个js对象，描述了真实的dom结构。真实DOM改变前先改变虚拟DOM，使用虚拟用同步修改真实DOM。虚拟DOM到真实DOM的同步，这个过程叫协调，diff。diff就是比较新旧的虚拟DOM对象。

- 为什么要用到虚拟DOM

  DOM操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能。相对于DOM对象，js对象处理起来更快， 而且更简单。通过diff算法对比新旧vdom之间的差异，可以批量的、最小化的执行dom操作，从而提高性能。

- 哪里用到虚拟DOM

  React中用JSX语法描述视图，通过babel-loader转译后它们变为React.createElement(...)形式，该 函数将生成vdom来描述真实dom。将来如果状态变化，vdom将作出相应变化，再通过diff算法对比新老vdom区 别从而做出最终dom操作。

## JSX

1. 什么是JSX 
   - 语法糖 
   - React 使用 JSX 来替代常规的 JavaScript。 
   - JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。

2. 为什么需要JSX 
   - 开发效率：使用 JSX 编写模板简单快速。 
   - 执行效率：JSX编译为 JavaScript 代码后进行了优化，执行更快。 
   - 类型安全：在编译过程中就能发现错误。 

3. 原理：babel-loader会预编译JSX为React.createElement(...) 

4. 与vue的异同： 
   - react中虚拟dom+jsx的设计一开始就有，vue则是演进过程中才出现的 
   - jsx本来就是js扩展，转义过程简单直接的多；
   - vue把template编译为render函数的过程需要复杂的编译 器转换字符串-ast-js函数字符串

## Diff - reconciliation协调

### 设计动力

​	在某一时间节点调用 React 的 render() 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 render() 方法会返回一棵不同的树。React 需要基于这两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步。 这个算法问题有一些通用的解决方案，即生成将一棵树转换成另一棵树的最小操作数。 然而，即使在最 前沿的算法中，该算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。 如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个 开销实在是太过高昂。

​	于是 React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法： 

1. 两个不同类型的元素会产生出不同的树； 
2. 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定； 在实践中，我们发现以上假设在几乎所有实用的场景下都成立。

### 算法复杂度 

算法复杂度O(n) 

### diff 策略 

1. 同级比较，Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。 
2. 拥有不同类型的两个组件将会生成不同的树形结构。 例如：div->p, CompA->CompB  
3. 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定；

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219090657.png)

### diff过程 

比对两个虚拟dom时会有三种操作：删除、替换和更新 

vnode是现在的虚拟dom，newVnode是新虚拟dom。

- 删除：newVnode不存在时 

- 替换：vnode和newVnode类型不同或key不同时 

- 更新：有相同类型和key但vnode和newVnode不同时

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219091159.png)

## Fiber

在 V16 版本中引入了 Fiber 机制。这个机制一定程度上的影响了部分生命周期的调用，并且也引入了新的 2 个 API 来解决问题。

例子：搜索商品

​	input框里面的值更新的优先级比模糊查询出来的显示结果要高。如果先显示模糊查询的结果，然后input框的值还没有改变，这个时候就造成了卡顿现象。

在之前的版本中，如果你拥有一个很复杂的复合组件，然后改动了最上层组件的 `state`，那么调用栈可能会很长。

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219091451.png)

调用栈过长，再加上中间进行了复杂的操作，就可能导致长时间阻塞主线程，带来不好的用户体验。Fiber 就是为了解决该问题而生。

Fiber 本质上是一个虚拟的堆栈帧，新的调度器会按照优先级自由调度这些帧，从而将之前的同步渲染改成了异步渲染，在不影响体验的情况下去分段计算更新。

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219091528.png)

对于如何区别优先级，React 有自己的一套逻辑。对于动画这种实时性很高的东西，也就是 16 ms 必须渲染一次保证不卡顿的情况下，React 会每 16 ms（以内） 暂停一下更新，返回来继续渲染动画。

对于异步渲染，现在渲染有两个阶段：`reconciliation` 和 `commit` 。前者过程是可以打断的，后者不能暂停，会一直更新界面直到完成。

**Reconciliation** 阶段

- `componentWillMount`
- `componentWillReceiveProps`
- `shouldComponentUpdate`
- `componentWillUpdate`

**Commit** 阶段

- `componentDidMount`
- `componentDidUpdate`
- `componentWillUnmount`

因为 `reconciliation` 阶段是可以被打断的，所以 `reconciliation` 阶段会执行的生命周期函数就可能会出现调用多次的情况，从而引起 Bug。所以对于 `reconciliation` 阶段调用的几个函数，除了 `shouldComponentUpdate` 以外，其他都应该避免去使用，并且 V16 中也引入了新的 API 来解决这个问题。

`getDerivedStateFromProps` 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用

```js
class ExampleComponent extends React.Component {
  // Initialize state in constructor,
  // Or with a property initializer.
  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.someMirroredValue !== nextProps.someValue) {
      return {
        derivedData: computeDerivedState(nextProps),
        someMirroredValue: nextProps.someValue
      }
    }

    // Return null to indicate no change to state.
    return null
  }
}
```

`getSnapshotBeforeUpdate` 用于替换 `componentWillUpdate` ，该函数会在 `update` 后 DOM 更新前被调用，用于读取最新的 DOM 数据。

### 实现fiber

> window.requestIdleCallback(callback[, options])

window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主 事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先 进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 timeout ，则有可能为了在超时前执行 函数而打乱执行顺序。 你可以在空闲回调函数中调用 requestIdleCallback() ，以便在下一次通过事件循环之前调度另一个 回调。

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219093639.jpg)

### fiber好处

1. 为什么需要fiber 

   对于大型项目，组件树会很大，这个时候递归遍历的成本就会很高，会造成主线程被持续占用，结 果就是主线程上的布局、动画等周期性任务就无法立即得到处理，造成视觉上的卡顿，影响用户体验。

2. 任务分解的意义

   解决上面的问题 

3. 增量渲染（把渲染任务拆分成块，匀到多帧） 

4. 更新时能够暂停，终止，复用渲染任务 

5. 给不同类型的更新赋予优先级 

6. 并发方面新的基础能力 

7. 更流畅

## HOOK

### 什么是Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特 性。

1. Hooks是什么？为了拥抱正能量函数式 
2. Hooks带来的变革，让函数组件有了状态和其他的React特性，可以替代class

### Hook解决了什么问题

Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正 在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问 题似曾相识。

- 在组件之间复用状态逻辑很难
- 复杂组件变得难以理解
- 难以理解的 class

### Hook API 

基础 Hook 

- useState 
- useEffect 
- useContext 

额外的 Hook 

- useReducer 
- useCallback 
- useMemo 
- useRef 
- useImperativeHandle 
- useLayoutEffect



## 生命周期

```javascript
class ExampleComponent extends React.Component {
  // 用于初始化 state
  constructor() {}
  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  static getDerivedStateFromProps(nextProps, prevState) {}
  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  // 用于获得最新的 DOM 数据
  getSnapshotBeforeUpdate() {}
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  // 组件销毁后调用
  componentDidUnMount() {}
  // 组件更新后调用
  componentDidUpdate() {}
  // 渲染组件函数
  render() {}
  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
}
```

16.4之后废弃以下什么周期

- componentWillMount
- componentWillReceiveProps 
- componentWillUpdate 

引⼊两个新的⽣命周期函数： 

- static getDerivedStateFromProps  => 替换 componentWillReceiveProps 
- getSnapshotBeforeUpdate => 替换 componentWillUpdate 

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219104908.png)



## setState

`setState` 在 React 中是经常使用的一个 API，但是它存在一些问题，可能会导致犯错，核心原因就是因为这个 API 是异步的。

首先 `setState` 的调用并不会马上引起 `state` 的改变，并且如果你一次调用了多个 `setState` ，那么结果可能并不如你期待的一样。

```js
handle() {
  // 初始化 `count` 为 0
  console.log(this.state.count) // -> 0
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // -> 0
}
```

第一，两次的打印都为 0，因为 `setState` 是个异步 API，只有同步代码运行完毕才会执行。`setState` 异步的原因我认为在于，`setState` 可能会导致 DOM 的重绘，如果调用一次就马上去进行重绘，那么调用多次就会造成不必要的性能损失。设计成异步的话，就可以将多次调用放入一个队列中，在恰当的时候统一进行更新过程。

第二，虽然调用了三次 `setState` ，但是 `count` 的值还是为 1。因为多次调用会合并为一次，只有当更新结束后 `state` 才会改变，三次调用等同于如下代码

```js
Object.assign(
  {},
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
  { count: this.state.count + 1 }
)
```

当然你也可以通过以下方式来实现调用三次 `setState` 使得 `count` 为 3

```js
handle() {
  this.setState((prevState) => ({ count: prevState.count + 1 }))
  this.setState((prevState) => ({ count: prevState.count + 1 }))
  this.setState((prevState) => ({ count: prevState.count + 1 }))
}
```

如果你想在每次调用 `setState` 后获得正确的 `state` ，可以通过如下代码实现

```js
handle() {
    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
        console.log(this.state)
    })
}
```

```javascript
// 批量
this.setState({ counter: this.state.counter + 1 });
this.setState({ counter: this.state.counter + 2 });
console.log("counter", this.state);
//回调
this.setState({ counter: this.state.counter + 1 },()=>{});
this.setState(nextState => {
console.log("next", nextState);
});
// 异步
this.setState({ counter: this.state.counter + 1 });
console.log("counter", this.state);//0
// 不异步
setTimeout(()=>{
setState({foo: 'bar'})
},1000)
// 原生事件
dom.addEventListener('click',()=>{
setState({foo: 'bar'})
})
```

### 为什么 React 不同步地更新 this.state

在开始重新渲染之前，React 会有意地进行“等待”，直到所有在组件的事件处理函数内调用的 setState() 完成之后。这样可以通过避免不必要的重新渲染来提升性能。

### 为什么setState是异步的

这里的异步指的是多个state会合成到一起进行批量更新。