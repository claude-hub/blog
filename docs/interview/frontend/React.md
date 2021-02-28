# React

## React 项目中有哪些细节可以优化？实际开发中都做过哪些性能优化

[21 个 React 性能优化技巧](https://www.infoq.cn/article/KVE8xtRs-uPphptq5LUz)

### 父组件和子组件通常会重新渲染

1. 在同一组件或父组件中调用 setState 时。
2. 从父级收到的“props”的值发生变化。
3. 调用组件中的 forceUpdate。

### 1. React.PureComponent

 PureComponents 内容加了 shouldComponentUpdate，实现了浅比较

### 2. React.memo 

```javascript
// The following function takes "user" Object as input parameter in props

function CustomisedComponen(props) {
    return (
        <div>
            <b>User name: {props.user.name}</b>
            <b>User age: {props.user.age}</b>
            <b>User designation: {props.user.designation}</b>
        </div>
    )
}

function userComparator(previosProps, nextProps) {
    if(previosProps.user.name == nextProps.user.name ||
       previosProps.user.age == nextProps.user.age ||
       previosProps.user.designation == nextProps.user.designation) {
        return false
    } else {
        return true;
    }
}

var memoComponent = React.memo(CustomisedComponent, userComparator);
```

### 3. shouldComponentUpdate 

### 4. 懒加载组件, Suspense, lazy

 webpack 这样的打包器支持就支持代码拆分，它可以为应用创建多个包，并在运行时动态加载，减少初始包的大小。

Suspense 和 lazy。

```javascript
import React, { lazy, Suspense } from "react";

export default class CallingLazyComponents extends React.Component {
  render() {
    
    var ComponentToLazyLoad = null;
    
    if(this.props.name == "Mayank") { 
      ComponentToLazyLoad = lazy(() => import("./mayankComponent"));
    } else if(this.props.name == "Anshul") {
      ComponentToLazyLoad = lazy(() => import("./anshulComponent"));
    }
    return (
        <div>
            <h1>This is the Base User: {this.state.name}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ComponentToLazyLoad />
            </Suspense>
        </div>
    )
  }
}
```

1. 主包体积变小，消耗的网络传输时间更少。
2. 动态单独加载的包比较小，可以迅速加载完成。

### 5. 使用 React Fragments 避免额外标记

### 6. 不要使用内联函数定义

### 7. 避免 componentWillMount()中的异步请求

componentWillMount 是在渲染组件之前调用的。

### 8. 在 Constructor 的早期绑定函数

```javascript
import React from "react";

export default class DelayedBinding extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
  }
  
  handleButtonClick() {
    alert("Button Clicked: " + this.state.name)
  }
  
  render() {
    return (
      <>
        <input type="button" value="Click" onClick={this.handleButtonClick.bind(this)} />
      </>
    )
  }
}
```

在上面的代码中，我们在 render 函数的绑定期间将函数绑定到按钮上。

上面代码的问题在于，每次调用 render 函数时都会创建并使用绑定到当前上下文的新函数，但在每次渲染时使用已存在的函数效率更高。优化方案如下：

```javascript
import React from "react";

export default class DelayedBinding extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
  
  handleButtonClick() {
    alert("Button Clicked: " + this.state.name)
  }
  
  render() {
    return (
      <>
        <input type="button" value="Click" onClick={this.handleButtonClick} />
      </>
    )
  }
}
```

最好在构造函数调用期间使用绑定到当前上下文的函数覆盖 handleButtonClick 函数。

这将减少将函数绑定到当前上下文的开销，无需在每次渲染时重新创建函数，从而提高应用的性能。

### 9. 箭头函数与构造函数中的绑定

处理类时的标准做法就是使用箭头函数。使用箭头函数时会保留执行的上下文。

我们调用它时不需要将函数绑定到上下文。

```javascript
import React from "react";

export default class DelayedBinding extends React.Component {
  constructor() {
    this.state = {
      name: "Mayank"
    }
  }
  
  handleButtonClick = () => {
    alert("Button Clicked: " + this.state.name)
  }
  
  render() {
    return (
      <>
        <input type="button" value="Click" onClick={this.handleButtonClick} />
      </>
    )
  }
}
```

箭头函数好处多多，但也有缺点。

当我们添加箭头函数时，该函数被添加为对象实例，而不是类的原型属性。这意味着如果我们多次复用组件，那么在组件外创建的每个对象中都会有这些函数的多个实例。

每个组件都会有这些函数的一份实例，影响了可复用性。此外因为它是对象属性而不是原型属性，所以这些函数在继承链中不可用。

因此箭头函数确实有其缺点。实现这些函数的最佳方法是在构造函数中绑定函数，如上所述。

### 10. 避免使用内联样式属性

```javascript
import React from "react";

export default class InlineStyledComponents extends React.Component {
  render() {
    return (
      <>
        <b style={{"backgroundColor": "blue"}}>Welcome to Sample Page</b>
      </>
    )
  }
}
```

在上面创建的组件中，我们将内联样式附加到组件。添加的内联样式是 JavaScript 对象而不是样式标记。

样式 backgroundColor 需要转换为等效的 CSS 样式属性，然后才应用样式。这样就需要额外的脚本处理和 JS 执行工作。

更好的办法是将 CSS 文件导入组件。

### 11. 优化 React 中的条件渲染

### 12. 不要在 render 方法中导出数据

和其他生命周期事件不一样的是，我们的核心原则是将 render()函数作为纯函数。

#### 纯函数对 render 方法意味着什么？

纯函数意味着我们应该确保 setState 和查询原生 DOM 元素等任何可以修改应用状态的东西不会被调用。

该函数永远不该更新应用的状态。

更新组件状态的问题在于，当状态更新时会触发另一个 render 循环，后者在内部会再触发一个 render 循环，以此类推。

### 13. 为组件创建错误边界

#### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- [`static getDerivedStateFromError()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromerror)

  此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。

  `getDerivedStateFromError()` 会在`渲染`阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 `componentDidCatch()`。

- [`componentDidCatch()`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch)

  此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

  1. `error` —— 抛出的错误。
  2. `info` —— 带有 `componentStack` key 的对象，其中包含[有关组件引发错误的栈信息](https://zh-hans.reactjs.org/docs/error-boundaries.html#component-stack-traces)。

  `componentDidCatch()` 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：

### 14. 组件的不可变数据结构

### 15. 使用唯一键迭代

### 16. 事件节流和防抖

### 17. 使用 CDN

### 18. 用 CSS 动画代替 JavaScript 动画

### 19. 在 Web 服务器上启用 gzip 压缩

### 20. 使用 Web Workers 处理 CPU 密集任务

### 21. React 组件的服务端渲染

### 22. `render`里面尽量减少新建变量和`bind`函数，传递参数是尽量减少传递参数的数量

### 23. redux缓存数据

### 24. redux配合reselect，Immutable库使用



## React优化大佬总结：

1）对于正常的项目优化，一般都涉及到几个方面，**开发过程中**、**上线之后的首屏**、**运行过程的状态**

- 来聊聊上线之后的首屏及运行状态：
  - 首屏优化一般涉及到几个指标FP、FCP、FMP；要有一个良好的体验是尽可能的把FCP提前，需要做一些工程化的处理，去优化资源的加载
  - 方式及分包策略，资源的减少是最有效的加快首屏打开的方式；
  - 对于CSR的应用，FCP的过程一般是首先加载js与css资源，js在本地执行完成，然后加载数据回来，做内容初始化渲染，这中间就有几次的网络反复请求的过程；所以CSR可以考虑使用骨架屏及预渲染（部分结构预渲染）、suspence与lazy做懒加载动态组件的方式
  - 当然还有另外一种方式就是SSR的方式，SSR对于首屏的优化有一定的优势，但是这种瓶颈一般在Node服务端的处理，建议使用stream流的方式来处理，对于体验与node端的内存管理等，都有优势；
  - 不管对于CSR或者SSR，都建议配合使用Service worker，来控制资源的调配及骨架屏秒开的体验
  - react项目上线之后，首先需要保障的是可用性，所以可以通过React.Profiler分析组件的渲染次数及耗时的一些任务，但是Profile记录的是commit阶段的数据，所以对于react的调和阶段就需要结合performance API一起分析；
  - 由于React是父级props改变之后，所有与props不相关子组件在没有添加条件控制的情况之下，也会触发render渲染，这是没有必要的，可以结合React的PureComponent以及React.memo等做浅比较处理，这中间有涉及到不可变数据的处理，当然也可以结合使用ShouldComponentUpdate做深比较处理；
  - 所有的运行状态优化，都是减少不必要的render，React.useMemo与React.useCallback也是可以做很多优化的地方；
  - 在很多应用中，都会涉及到使用redux以及使用context，这两个都可能造成许多不必要的render，所以在使用的时候，也需要谨慎的处理一些数据；
  - 最后就是保证整个应用的可用性，为组件创建错误边界，可以使用componentDidCatch来处理；
- 实际项目中开发过程中还有很多其他的优化点：
  - 1.保证数据的不可变性
  - 2.使用唯一的键值迭代
  - 3.使用web worker做密集型的任务处理
  - 4.不在render中处理数据
  - 5.不必要的标签，使用React.Fragments

# react 最新版本解决了什么问题 加了哪些东西

 1）React 16.x的三大新特性 Time Slicing, Suspense，hooks

- Time Slicing（解决CPU速度问题）使得在执行任务的期间可以随时暂停，跑去干别的事情，这个特性使得react能在性能极其差的机器跑时，仍然保持有良好的性能
- Suspense （解决网络IO问题）和lazy配合，实现异步加载组件。 能暂停当前组件的渲染, 当完成某件事以后再继续渲染，解决从react出生到现在都存在的「异步副作用」的问题，而且解决得非的优雅，使用的是「异步但是同步的写法」，我个人认为，这是最好的解决异步问题的方式
- 此外，还提供了一个内置函数 componentDidCatch，当有错误发生时, 我们可以友好地展示 fallback 组件；可以捕捉到它的子元素（包括嵌套子元素）抛出的异常；可以复用错误组件。

2）React16.8

- 加入hooks，让React函数式组件更加灵活
- hooks之前，React存在很多问题
  - 在组件间复用状态逻辑很难
  - 复杂组件变得难以理解，高阶组件和函数组件的嵌套过深。
  - class组件的this指向问题
  - 难以记忆的生命周期
- hooks很好的解决了上述问题，hooks提供了很多方法
  - useState 返回有状态值，以及更新这个状态值的函数
  - useEffect 接受包含命令式，可能有副作用代码的函数。
  - useContext 接受上下文对象（从React.createContext返回的值）并返回当前上下文值，
  - useReducer useState的替代方案。接受类型为(state，action) => newState的reducer，并返回与dispatch方法配对的当前状态。
  - useCallback 返回一个回忆的memoized版本，该版本仅在其中一个输入发生更改时才会更改。纯函数的输入输出确定性
  - useMemo 纯的一个记忆函数
  - useRef 返回一个可变的ref对象，其.current属性被初始化为传递的参数，返回的 ref 对象在组件的整个生命周期内保持不变。
  - useImperativeMethods 自定义使用ref时公开给父组件的实例值
  - useMutationEffect 更新兄弟组件之前，它在React执行其DOM改变的同一阶段同步触发
  - useLayoutEffect DOM改变后同步触发。使用它来从DOM读取布局并同步重新渲染

3）React16.9

- 重命名 Unsafe 的生命周期方法。新的 UNSAFE_ 前缀将有助于在代码 review 和 debug 期间，使这些有问题的字样更突出
- 废弃 javascript: 形式的 URL。以 javascript: 开头的 URL 非常容易遭受攻击，造成安全漏洞。
- 废弃 “Factory” 组件。 工厂组件会导致 React 变大且变慢。
- act() 也支持异步函数，并且你可以在调用它时使用 await。
- 使用 <React.Profiler> 进行性能评估。 在较大的应用中追踪性能回归可能会很方便

4）React16.13.0

- 支持在渲染期间调用setState，但仅适用于同一组件
- 可检测冲突的样式规则并记录警告
- 废弃unstable_createPortal，使用createPortal
- 将组件堆栈添加到其开发警告中，使开发人员能够隔离bug并调试其程序，这可以清楚地说明问题所在，并更快地定位和修复错误。

# React 事件绑定原理 

React并不是将click事件绑在该div的真实DOM上，而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。
另外冒泡到 document 上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 event.stopPropagation 是无效的，而应该调用 event.preventDefault。

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210227173703.png)

## 整体流程

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210227174026.png)

## 事件注册

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210227173750.png)

- 组件装载 / 更新。
- 通过lastProps、nextProps判断是否新增、删除事件分别调用事件注册、卸载方法。
- 调用EventPluginHub的enqueuePutListener进行事件存储
- 获取document对象。
- 根据事件名称（如onClick、onCaptureClick）判断是进行冒泡还是捕获。
- 判断是否存在addEventListener方法，否则使用attachEvent（兼容IE）。
- 给document注册原生事件回调为dispatchEvent（统一的事件分发机制）。

## 事件存储

- EventPluginHub负责管理React合成事件的callback，它将callback存储在listenerBank中，另外还存储了负责合成事件的Plugin。
- EventPluginHub的putListener方法是向存储容器中增加一个listener。
- 获取绑定事件的元素的唯一标识key。
- 将callback根据事件类型，元素的唯一标识key存储在listenerBank中。
- listenerBank的结构是：listenerBank\[registrationName][key]。

```javascript
{
    onClick:{
        nodeid1:()=>{...}
        nodeid2:()=>{...}
    },
    onChange:{
        nodeid3:()=>{...}
        nodeid4:()=>{...}
    }
}
```

## 事件触发执行

- 触发document注册原生事件的回调dispatchEvent
- 获取到触发这个事件最深一级的元素
  这里的事件执行利用了React的批处理机制

代码示例

```
<div onClick={this.parentClick} ref={ref => this.parent = ref}>
      <div onClick={this.childClick} ref={ref => this.child = ref}>
          test
     </div>
</div>
```

- 首先会获取到this.child
- 遍历这个元素的所有父元素，依次对每一级元素进行处理。
- 构造合成事件。
- 将每一级的合成事件存储在eventQueue事件队列中。
- 遍历eventQueue。
- 通过isPropagationStopped判断当前事件是否执行了阻止冒泡方法。
- 如果阻止了冒泡，停止遍历，否则通过executeDispatch执行合成事件。
- 释放处理完成的事件。

## **合成事件**

- 调用EventPluginHub的extractEvents方法。
- 循环所有类型的EventPlugin（用来处理不同事件的工具方法）。
- 在每个EventPlugin中根据不同的事件类型，返回不同的事件池。
- 在事件池中取出合成事件，如果事件池是空的，那么创建一个新的。
- 根据元素nodeid(唯一标识key)和事件类型从listenerBink中取出回调函数
- 返回带有合成事件参数的回调函数