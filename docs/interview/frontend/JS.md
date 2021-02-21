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

