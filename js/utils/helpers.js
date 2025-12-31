/**
 * 工具函数模块
 * 提供常用的辅助函数
 */

/**
 * 防抖函数 - 延迟执行函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 延迟时间(毫秒)
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait = 300) {
  let timeout = null;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数 - 限制函数执行频率
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制(毫秒)
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit = 300) {
  let inThrottle = false;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 深拷贝对象
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * 延迟执行
 * @param {number} ms - 延迟时间(毫秒)
 * @returns {Promise} Promise对象
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取URL中的hash值
 * @returns {string} hash值（不包含#）
 */
export function getHash() {
  return window.location.hash.slice(1) || 'home';
}

/**
 * 设置URL中的hash值
 * @param {string} hash - 新的hash值
 */
export function setHash(hash) {
  window.location.hash = hash;
}

/**
 * 本地存储操作
 */
export const storage = {
  /**
   * 设置存储
   * @param {string} key - 键
   * @param {any} value - 值
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  /**
   * 获取存储
   * @param {string} key - 键
   * @param {any} defaultValue - 默认值
   * @returns {any} 存储的值
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },

  /**
   * 删除存储
   * @param {string} key - 键
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  },

  /**
   * 清空所有存储
   */
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  }
};

/**
 * 元素淡入动画
 * @param {HTMLElement} element - DOM元素
 * @param {number} duration - 动画时长
 * @returns {Promise} 动画完成的Promise
 */
export function fadeIn(element, duration = 300) {
  return new Promise(resolve => {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ease`;

    // 强制重绘
    element.offsetHeight;

    element.style.opacity = '1';
    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * 元素淡出动画
 * @param {HTMLElement} element - DOM元素
 * @param {number} duration - 动画时长
 * @returns {Promise} 动画完成的Promise
 */
export function fadeOut(element, duration = 300) {
  return new Promise(resolve => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';

    setTimeout(() => {
      element.style.display = 'none';
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * 随机打乱数组
 * @param {Array} array - 原数组
 * @returns {Array} 打乱后的新数组
 */
export function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 生成随机ID
 * @param {number} length - ID长度
 * @returns {string} 随机ID
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
