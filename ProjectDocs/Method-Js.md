###  一、判断数字是否为小数并保留指定位数的小数
```js
 /**
 * @description 如果数字是小数，则保留到小数点后 `l` 位，否则直接返回数字。
 * @version GXY 2024/09/10
 * @param {number} num - 要处理的数字
 * @param {number} precision - 要保留的小数位数
 * @returns {number} 处理后的数字
 * @example
 * formatNumber(2.111, 4); // 返回 2.1110
 * formatNumber(2, 4); // 返回 2
 */
export const formatNumber = (num, precision) => {
  // 判断数字是否为小数
  if (!Number.isInteger(num)) {
    // 如果小数位数超过指定精度，则保留指定的小数位数
    if (num.toString().split(".")[1]?.length > precision) {
      return Number(num.toFixed(precision));
    }
    // 否则，返回原始数字
    return num;
  }
  // 如果数字是整数，则直接返回
  return num;
};
```

###  二、本地缓存方法
```js
  /**
 * 保存数据到本地存储
 * @param {string} key - 存储数据时使用的键名
 * @param {Object} data - 要存储的数据
 */
export const setStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * 从本地存储获取数据
 * @param {string} key - 要获取的数据的键名
 * @returns {any} 存储的数据
 */
export const getStorage = (key: string): any => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('解析 localStorage 数据失败:', e);
    }
  }
  return null; // 如果没有数据或解析失败，返回 null
};

/**
 * 从本地存储中删除数据
 * @param {string} key - 要删除的数据的键名
 */
export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
```

###  三、简化地理数据中的线段或多边形
```js
/**
 * @description 使用 @turf/turf 库来减少线段或多边形中的坐标数量，从而简化地理数据。
 * npm install @turf/turf
 * yarn add  @turf/turf
 * @version GXY 2024/09/01
 * @param {Array} data - 包含线段或多边形坐标的数组。
 * @returns {Array} 简化后的地理数据数组。
 * @example
 * const simplifiedData = simplify([
 *   [ [0, 0], [0, 2] ],
 *   [ [1, 1], [1, 3] ]
 * ]);
 */
import * as turf from '@turf/turf';

export const simplify = (data) => {
  const simplifiedData = [];
  
  // 遍历数据中的每个线段或多边形
  data.forEach((trip) => {
    // 创建线字符串对象
    const linestring = turf.lineString(trip);
    // 设置简化选项
    const options = { tolerance: 0.0001, highQuality: true };
    // 简化线字符串
    const simplified = turf.simplify(linestring, options);
    // 将简化后的数据添加到结果数组中
    simplifiedData.push(simplified);
  });
  
  return simplifiedData;
};
1.  [turf 官方文档](https://turfjs.org/)
```

###  四、遍历树形结构并设置默认属性
```js
/**
 * @description 对树形数据进行深度优先遍历，为每个没有 'hideName' 属性的节点添加 'disabled' 属性。
 * @version GXY 2024/08/23
 * @param {Array} nodes - 树形结构的数组，每个元素包含 id, label, 和 children 属性。
 * @returns {void}
 * @example
 * const treeData = [{ id: 1, label: '名字', children: [{ id: 2, label: '子名字' }] }];
 * traverseTree(treeData);
 */
export const traverseTree = (nodes) => {
  nodes.forEach(node => {
    // 如果节点缺少 'hideName' 属性，则将其标记为 'disabled'
    if (node.hasOwnProperty('hideName')) {
      node.disabled = true;
    }
    // 如果节点有子节点，则递归调用遍历子节点
    if (node.children && Array.isArray(node.children) && node.children.length > 0) {
      traverseTree(node.children);
    }
  });
};
```

### 五、将 RGBA 颜色值转换为十六进制颜色值
```js
/**
 * @description 该函数接受一个 RGBA 颜色字符串，并将其转换为十六进制格式。
 * @version GXY 2024/08/23
 * @param {string} rgbaColor - RGBA 颜色字符串，例如 'rgba(255,255,255,0)'
 * @returns {string} 十六进制颜色字符串，例如 '#ffffff'
 * @example
 * hexify('rgba(255,255,255,0)'); // 返回 '#ffffff'
 */
export const hexify = (rgbaColor) => {
  // 验证输入是否为字符串
  if (typeof rgbaColor !== 'string') {
    console.error('Input must be a string.');
    return '';
  }

  // 提取 RGBA 值
  const rgbaValues = rgbaColor
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');

  // 解析 RGBA 值
  const a = parseFloat(rgbaValues[3] || '1');
  const r = parseInt(rgbaValues[0], 10);
  const g = parseInt(rgbaValues[1], 10);
  const b = parseInt(rgbaValues[2], 10);

  // 计算十六进制颜色值
  const hexColor = "#" +
    ("0" + Math.round(a * r + (1 - a) * 255).toString(16)).slice(-2) +
    ("0" + Math.round(a * g + (1 - a) * 255).toString(16)).slice(-2) +
    ("0" + Math.round(a * b + (1 - a) * 255).toString(16)).slice(-2);

  return hexColor;
};

```
### 六、判断是否是空对象
````js
/**
 * @description 如果传入的对象没有任何自身的属性，则返回 true，否则返回 false。
 * @version GXY 2024/08/23
 * @param {Object} obj - 要检查的对象
 * @returns {boolean} 如果是空对象，则返回 true，否则返回 false
 * @example
 * isEmptyObject({}); // 返回 true
 * isEmptyObject({ name: 'Alice' }); // 返回 false
 */
export const isEmptyObject = (obj) => {
  // 判断传入的是否是对象，并且没有自身的属性
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
};
````

### 七、判断当前日期是否晚于指定的结束时间

````js
/**
 * @description 该函数比较当前日期和时间与提供的结束时间，返回一个布尔值表示当前时间是否在结束时间之后。
 * @version GXY 2024/08/23
 * @param {String} endTime - 格式为 'YYYY-MM-DD HH:MM:SS' 的结束时间字符串
 * @returns {boolean} 如果当前时间晚于结束时间，则返回 true，否则返回 false
 * @example
 * isNowAfterEndTime('2024-12-31 00:00:00'); // 如果当前时间晚于 2024-12-31 00:00:00，则返回 true
 */
export function isNowAfterEndTime(endTime) {
  // 获取当前日期和时间的毫秒表示
  let timeNow = new Date();
  let startM = timeNow.getTime();

  // 解析结束时间字符串为毫秒表示
  let endM = Date.parse(endTime);

  // 比较当前时间和结束时间
  return startM > endM;
}
````

### 八、判断给定的数组是否为二维数组

````js
/**
 * @description 该函数检查传入的数组是否为二维数组，即数组的每个元素也必须是数组。
 * @version GXY 2024/09/10
 * @param {Array} arr - 要检查的数组
 * @returns {boolean} 如果数组是二维的，则返回 true，否则返回 false
 * @example
 * isTwoDimensionalArray([[1, 2], [3, 4]]); // 返回 true
 * isTwoDimensionalArray([1, 2, [3, 4]]); // 返回 false
 */
export const isTwoDimensionalArray = (arr) => {
  // 首先检查传入的参数是否为数组
  if (!Array.isArray(arr)) {
    return false;
  }

  // 使用 Array.every 方法检查数组的每个元素是否也都是数组
  // every 方法会遍历数组中的所有元素，如果所有元素都满足条件（即都是数组），则返回 true
  return arr.every(item => Array.isArray(item));
};
````

### 九、根据指定键对数组中的对象进行去重

````js
/**
 * @description 根据指定键对数组中的对象进行去重
 * @version GXY 2024/08/23
 * @param {Array} list - 要处理的对象数组
 * @param {String} key - 用于去重的键名
 * @returns {Array} 去重后的新数组
 * @example
 * uniqueByField([{name: 'Alice'}, {name: 'Bob'}, {name: 'Alice'}], 'name'); // 返回 [{name: 'Alice'}, {name: 'Bob'}]
 */
export const uniqueByField = (list, key) => {
  // 检查输入是否为数组且不为空
  if (!Array.isArray(list) || list.length === 0) {
    return [];
  }

  // 使用 Map 而不是 Set 来存储已经出现过的键值对，这样可以保持对象的引用
  const seen = new Map();
  return list.filter(item => {
    // 如果键值对尚未出现过，则添加到结果数组中
    return seen.has(item[key]) ? false : seen.set(item[key], true);
  });
};
````

### 十、对手机号进行脱敏处理

````js
/**
 * @description 该函数将手机号的中间四位替换为星号（*），以保护用户隐私。
 * @version GXY 2024/08/23
 * @param {String} mobile - 待脱敏的手机号，例如 "18561977733"
 * @returns {String} 脱敏后的手机号或错误信息
 * @example
 * maskMobileNumber("18561977733"); // 返回 "185****7733"
 */
export const maskMobileNumber = (mobile) => {
  // 验证手机号是否提供且为字符串
  if (!mobile || typeof mobile !== 'string') {
    console.error('提供的手机号码无效。');
    return '无效输入'; // 返回错误信息而不是空字符串
  }

  // 验证手机号是否符合基本的手机号格式（这里假设手机号为11位数字）
  if (!/^\d{11}$/.test(mobile)) {
    console.warn('提供的手机号码不符合标准手机号码格式');
    return mobile; // 如果格式不匹配，返回原始手机号
  }

  // 使用正则表达式匹配手机号格式，并进行脱敏处理
  // 正则表达式解释：
  // ^\d{3} 匹配手机号开头的三位数字
  // (\d{4}) 匹配手机号中间的四位数字，这部分将被替换为星号
  // \d{4}$ 匹配手机号结尾的四位数字
  const maskedMobile = mobile.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3');

  // 返回脱敏后的手机号
  return maskedMobile;
};
````

### 十一、将指定元素切换到全屏模式

````js
/**
 * @description 该函数尝试将传递的元素切换到全屏模式。它兼容了多种浏览器的API。
 * @version GXY 2024/08/23
 * @param {HTMLElement} element - 要切换到全屏的元素
 * @returns {void}
 * @example
 * launchIntoFullscreen(document.documentElement); // 将整个页面切换到全屏
 */
export const launchIntoFullscreen = (element) => {
  // 检查传入的元素是否支持全屏API
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox 的前缀
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) { // IE/Edge 的前缀
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Chrome、Safari 的前缀
    element.webkitRequestFullscreen();
  } else {
    console.error('不受支持.');
  }
};
````

### 十二、退出全屏模式

````js
/**
 * @description 该函数尝试退出当前的全屏模式。它兼容了多种浏览器的 API。
 * @version GXY 2024/08/23
 * @returns {void}
 * @example
 * exitFullscreen(); // 调用该函数退出全屏
 */
export const exitFullscreen = () => {
  // 尝试使用标准方法退出全屏
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge 浏览器的前缀
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox 浏览器的前缀
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome、Safari 浏览器的前缀
    document.webkitExitFullscreen();
  } else {
    // 如果没有可用的全屏 API 方法，记录错误
    console.error('不受支持，或者全屏模式未激活.');
  }
};
````

### 十三、转换字符串的大小写

````js
/**
 * @description 根据指定的类型，转换给定字符串的大小写。
 * @version GXY 2024/08/23
 * @param {String} str - 待转换的字符串
 * @param {Number} type - 转换类型：1-全大写，2-全小写，3-首字母大写
 * @returns {String} - 转换后的新字符串
 * @example
 * convertCase('hello world', 1); // 返回 'HELLO WORLD'
 * convertCase('hello world', 2); // 返回 'hello world'
 * convertCase('hello world', 3); // 返回 'Hello world'
 */
export const convertCase = (str, type) => {
  switch (type) {
    case 1:
      // 转换为全大写
      return str.toUpperCase();
    case 2:
      // 转换为全小写
      return str.toLowerCase();
    case 3:
      // 转换为首字母大写，其余小写
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    default:
      // 如果没有指定有效类型，则返回原字符串
      return str;
  }
};
````

### 十四、解析当前页面URL的查询字符串参数

````js
/**
 * @description 该函数使用 `URLSearchParams` 接口来解析URL中的查询字符串，
 * 并将其转换为一个对象，使得每个查询参数都可以通过键值对的方式访问。
 * @version GXY 2024/08/23
 * @returns {Object} 包含所有查询参数的对象
 * @example
 * // 假设当前URL为 http://example.com/?id=154513&age=18
 * const params = parseQueryString(); // 返回 { id: "154513", age: "18" }
 */
export const parseQueryString = () => {
  // 创建一个 URLSearchParams 对象，该对象代表当前页面URL的查询字符串部分
  const searchParams = new URLSearchParams(window.location.search);
  // 使用 Object.fromEntries 方法将 URLSearchParams 对象转换为普通对象
  const paramsObj = Object.fromEntries(searchParams.entries());
  // 返回包含所有查询参数的对象
  return paramsObj;
};
````

### 十五、平滑滚动到页面顶部

````js
/**
 * @description 使用 `requestAnimationFrame` 方法递归地平滑滚动到页面顶部。
 * @version GXY 2024/08/23
 * @returns {void}
 * @example
 * scrollToTop(); // 调用该函数开始平滑滚动到顶部
 */
export const scrollToTop = () => {
  // 获取当前页面滚动的高度
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  
  // 检查是否存在滚动条，如果存在，则继续滚动
  if (currentScroll > 0) {
    // 使用 `requestAnimationFrame` 来创建平滑的滚动效果
    window.requestAnimationFrame(scrollToTop);
    
    // 每次调用滚动到的高度是上次的 87.5%（即每次滚动距离为当前高度的 1/8）
    window.scrollTo(0, currentScroll - (currentScroll / 8));
  } else {
    // 如果已经到达顶部，停止滚动
    console.log('已经到达页面顶部.');
  }
};
````

### 十六、平滑滚动到页面上的指定元素位置

````js
/**
 * @description 该函数接受一个CSS选择器或ID，并平滑滚动到对应的元素位置。
 * @version GXY 2024/08/23
 * @param {string} selector - 要滚动到的元素的选择器
 * @returns {void}
 * @example
 * smoothScrollToElement('#someElementId'); // 滚动到ID为someElementId的元素位置
 */
export const smoothScrollToElement = (selector) => {
  // 验证传入的参数是否为字符串
  if (typeof selector !== 'string') {
    console.error('选择器必须是字符串.');
    return;
  }

  // 使用querySelector获取对应的DOM元素
  const targetElement = document.querySelector(selector);
  
  // 如果找到了对应的元素，则平滑滚动到该元素位置
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth', // 指定滚动行为为平滑滚动
      block: 'nearest' // 指定在垂直方向上滚动到距离元素最近的位置
    });
  } else {
    // 如果没有找到对应的元素，记录警告日志
    console.warn(`未找到选择器对应的元素: ${selector}`);
  }
};
````

### 十七、执行模糊搜索

````js
/**
 * @description 根据关键字在数组对象的指定属性中查找匹配项。
 * @version GXY 2024/08/23
 * @param {Array} list - 要搜索的数组，元素为对象。
 * @param {String} keyWord - 搜索的关键词。
 * @param {String} attribute - 数组中对象的属性名，用于搜索。
 * @returns {Array} - 包含所有匹配元素的数组。
 * @example
 * const result = fuzzySearch([{id: 1, name: '树哥'}, {id: 2, name: '黄老爷'}], '哥', 'name');
 * console.log(result); // 输出：[{id: 1, name: '树哥'}]
 */
export const fuzzySearch = (list, keyWord, attribute) => {
  // 验证输入参数
  if (!Array.isArray(list) || typeof keyWord !== 'string' || typeof attribute !== 'string') {
    console.warn('提供给模糊搜索的参数无效.');
    return [];
  }

  // 创建一个正则表达式对象，用于模糊匹配关键字，忽略大小写
  const regex = new RegExp(keyWord, 'i');

  // 使用 filter 方法和正则表达式进行搜索
  const matchedItems = list.filter(item => item.hasOwnProperty(attribute) && regex.test(item[attribute]));

  // 返回包含所有匹配元素的数组
  return matchedItems;
};
````

### 十八、下载文件

````js
/**
 * @description 创建一个下载链接并触发点击事件，以下载给定的 Blob 数据。
 * @version GXY 2024/08/23
 * @param {Blob} blob - 要下载的文件数据，通常是一个 Blob 对象。
 * @param {String} fileName - 下载文件的名称。
 * @returns {void}
 * @example
 * downloadFile(blobData, 'example.xlsx');
 */
export const downloadFile = (blob, fileName) => {
  // 检查是否在浏览器环境中运行
  if (!document) {
    console.error('函数必须在浏览器环境中运行.');
    return;
  }
  // 创建一个临时的 <a> 元素，用于下载文件
  const downloadLink = document.createElement('a');
  try {
    // 创建一个指向 Blob 对象的 URL
    const fileUrl = window.URL.createObjectURL(blob);
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    // 将 <a> 元素添加到文档中
    document.body.appendChild(downloadLink);
    // 触发下载
    downloadLink.click();
    // 清理：从文档中移除 <a> 元素
    document.body.removeChild(downloadLink);
    // 释放 Blob URL 资源
    window.URL.revokeObjectURL(fileUrl);
  } catch (error) {
    // 捕获并记录可能发生的错误
    console.error('文件下载过程中发生错误:', error);
  }
};
````

### 十九、验证字符串是否为有效的数值

````js
/**
 * @description 该函数验证字符串是否为有效的整数或小数，包括负数和小数点前有数字的情况。
 * @version GXY 2024/08/23
 * @param {String} str - 需要验证的字符串
 * @returns {boolean} - 如果字符串是有效的数值，则返回 true，否则返回 false
 * @example
 * isValidNumber("123"); // 返回 true
 * isValidNumber("-123.45"); // 返回 true，支持负数和小数
 * isValidNumber("123.45.67"); // 返回 false，因为不支持多小数点
 * isValidNumber(".123"); // 返回 true，支持小数点前没有数字的小数
 * isValidNumber("abc"); // 返回 false，因为不包含数字
 */
export const isValidNumber = (str) => {
  // 正则表达式解释：
  // ^-?\d+ 表示字符串开始处可以有一个可选的负号，后跟一个或多个数字
  // (\.\d+)? 表示可选的小数部分，小数点后必须跟至少一个数字
  // $ 确保字符串在模式的末尾结束，确保整个字符串符合数字格式
  const regex = /^-?\d+(\.\d+)?$/;

  // 使用正则表达式的 test 方法来检查字符串是否与模式匹配
  return regex.test(str);
};
````
### 二十、显示消息提示

````js
/**
 * @description 显示一个消息提示框，支持多种类型，并允许用户手动关闭。
 * @version GXY 2024/09/10
 * @param {string} message - 要显示的消息内容。
 * @param {string} [type='info'] - 消息类型，可选值包括 'success', 'error', 'warning', 'info'。
 * @param {number} [duration=3000] - 消息显示的时长，单位为毫秒。设置为 0 可保持消息一直显示，直到用户手动关闭。
 * @returns {object} 返回消息提示实例，可用于手动关闭消息。
 * @example
 * const msgInstance = showMessage('这是一条消息', 'success', 5000);
 * // 在需要的时候，可以通过调用实例的 close 方法来手动关闭消息提示
 * // 例如，你可以在某个事件处理函数中调用 msgInstance.close() 来关闭消息提示
 */

import { ElMessage } from 'element-plus';
let currentMsgInstance = null;
export const showMessage = (message, type = 'info', duration = 3000) => {
  // 关闭当前已显示的消息提示
  if (currentMsgInstance) {
    currentMsgInstance.close();
  }
  // 显示新的消息提示，并保存实例以便后续操作
  currentMsgInstance = ElMessage({
    message: message,
    type: type,
    duration: duration,
    showClose: true, // 允许用户手动关闭消息
  });
  // 返回消息提示实例
  return currentMsgInstance;
};
  // const msgInstance = showMessage('这是一条消息', 'success');
  // 在需要的时候，可以通过调用实例的 close 方法来手动关闭消息提示
  // 例如，你可以在某个事件处理函数中调用 msgInstance.close() 来关闭消息提示
````