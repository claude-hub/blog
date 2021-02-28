# CSS

## CSS实现省略号

[纯css实现多行文本省略号](https://www.jianshu.com/p/3bce7924a466)

单行文本

```css
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

多行文本

```css
div {
  display: -webkit-box;
  overflow: hidden;  
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

## 滚动条美化

```css
    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    ::-webkit-scrollbar-track {
        background: #f6f6f6;
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #747474;
    }
    ::-webkit-scrollbar-corner {
        background: #f6f6f6;
    }
```

1.::-webkit-scrollbar 滚动条整体部分
2.::-webkit-scrollbar-thumb 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
3.::-webkit-scrollbar-track 滚动条的轨道（里面装有Thumb）
4.::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
5.::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
6.::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
7.::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

## CSS水平居中+垂直居中+水平/垂直居中

[CSS水平居中+垂直居中+水平/垂直居中的方法总结](https://blog.csdn.net/weixin_37580235/article/details/82317240)

### 未知高度和宽度的元素

方案一：使用定位属性

设置父元素为相对定位，给子元素设置绝对定位，**left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);**

```css
<style>
    #father {
        width: 500px;
        height: 300px;
        background-color: skyblue;
        position: relative;
}
 
    #son {
        background-color: green;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
}
</style>
 
<div id="father">
    <div id="son">我是块级元素</div>
</div>
```

![](https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/2021/20210221232212.png)

方案二：使用flex布局实现

```css

<style>
    #father {
        width: 500px;
        height: 300px;
        background-color: skyblue;
        display: flex;
        justify-content: center;
        align-items: center;
}
 
    #son {
        background-color: green;
}
</style>
 
<div id="father">
    <div id="son">我是块级元素</div>
</div>
```

