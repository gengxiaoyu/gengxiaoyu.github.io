/**
 * 数据管理器
 * 负责加载、缓存、验证JSON数据
 */

class DataManager {
  /**
   * 构造函数
   */
  constructor() {
    this.cache = new Map();
    this.basePath = './data/';
    this.loading = new Map();
  }

  /**
   * 加载数据文件
   * @param {string} filename - 文件名
   * @param {boolean} useCache - 是否使用缓存
   * @returns {Promise<Object>} 数据对象
   */
  async loadData(filename, useCache = true) {
    const cacheKey = filename;

    // 检查缓存
    if (useCache && this.cache.has(cacheKey)) {
      console.log(`[DataManager] 从缓存加载: ${filename}`);
      return this.cache.get(cacheKey);
    }

    // 检查是否正在加载
    if (this.loading.has(cacheKey)) {
      console.log(`[DataManager] 等待加载: ${filename}`);
      return this.loading.get(cacheKey);
    }

    // 开始加载
    const loadPromise = this._fetchData(filename);
    this.loading.set(cacheKey, loadPromise);

    try {
      const data = await loadPromise;

      // 缓存数据
      if (useCache) {
        this.cache.set(cacheKey, data);
      }

      return data;
    } finally {
      this.loading.delete(cacheKey);
    }
  }

  /**
   * 内部获取数据方法
   * @private
   * @param {string} filename - 文件名
   * @returns {Promise<Object>} 数据对象
   */
  async _fetchData(filename) {
    try {
      const response = await fetch(`${this.basePath}${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${filename}`);
      }

      const data = await response.json();
      console.log(`[DataManager] 成功加载: ${filename}`);
      return data;
    } catch (error) {
      console.error(`[DataManager] 加载失败 (${filename}):`, error);
      throw error;
    }
  }

  /**
   * 批量加载数据
   * @param {Array<string>} filenames - 文件名数组
   * @returns {Promise<Object>} 数据对象映射
   */
  async loadBatchData(filenames) {
    const promises = filenames.map(filename => this.loadData(filename));
    const results = await Promise.allSettled(promises);
    const data = {};

    results.forEach((result, index) => {
      const filename = filenames[index];
      if (result.status === 'fulfilled') {
        data[filename] = result.value;
      } else {
        console.error(`[DataManager] 批量加载失败: ${filename}`, result.reason);
        data[filename] = null;
      }
    });

    return data;
  }

  /**
   * 清除缓存
   * @param {string} filename - 文件名，不传则清除所有缓存
   */
  clearCache(filename = null) {
    if (filename) {
      this.cache.delete(filename);
      console.log(`[DataManager] 清除缓存: ${filename}`);
    } else {
      this.cache.clear();
      console.log('[DataManager] 清除所有缓存');
    }
  }

  /**
   * 预加载数据
   * @param {Array<string>} filenames - 文件名数组
   * @returns {Promise<void>}
   */
  async preloadData(filenames) {
    console.log('[DataManager] 预加载数据...');
    await this.loadBatchData(filenames);
    console.log('[DataManager] 预加载完成');
  }
}

// 创建单例实例
export const dataManager = new DataManager();

export default DataManager;
