/**
 * 资源库模块
 * 负责资源展示、分类、搜索功能
 */

import { dataManager } from '../utils/data-manager.js';
import { debounce } from '../utils/helpers.js';
import { modal } from '../components/Modal.js';

/**
 * 资源库模块类
 */
class ResourcesModule {
  /**
   * 构造函数
   */
  constructor() {
    this.container = document.getElementById('resources');
    this.configData = null;
    this.resourcesData = null;
    this.allResources = [];
    this.currentCategory = 'all';
    this.currentSubCategory = null;
    this.searchQuery = '';
  }

  /**
   * 初始化
   */
  async init() {
    if (!this.container) {
      console.warn('[ResourcesModule] 容器不存在');
      return;
    }

    console.log('[ResourcesModule] 初始化资源库...');
    await this._loadData();
    
    // 默认选中第一个主分类
    const categoriesData = this.resourcesData?.categories || {};
    const categories = Object.values(categoriesData);
    if (categories.length > 0 && this.currentCategory === 'all') {
      this.currentCategory = categories[0].id;
    }
    
    this._renderCategories();
    this._renderSubCategories();
    this._renderResources();
    this._bindEvents();
  }

  /**
   * 加载数据
   * @private
   */
  async _loadData() {
    try {
      const data = await dataManager.loadBatchData([
        'config.json',
        'resources.json'
      ]);

      this.configData = data['config.json'];
      this.resourcesData = data['resources.json'];
      // 从 resourcesData.resources 获取资源数组
      this.allResources = this.resourcesData?.resources || [];
    } catch (error) {
      console.error('[ResourcesModule] 加载数据失败:', error);
    }
  }

  /**
   * 渲染分类导航
   * @private
   */
  _renderCategories() {
    // 使用 resourcesData 中的 categories
    const categoriesData = this.resourcesData?.categories || {};

    // 构建分类数组，不包含"全部"
    const categories = Object.values(categoriesData);

    const categoryNav = this.container.querySelector('.category-nav');
    if (!categoryNav) return;

    categoryNav.innerHTML = categories.map(cat => {
      const count = this._getCategoryCount(cat.id);

      return `
        <button class="category-item ${cat.id === this.currentCategory ? 'active' : ''}"
                data-category="${cat.id}">
          <span class="category-icon">${cat.icon}</span>
          <span class="category-name">${cat.name}</span>
          <span class="category-count">${count}</span>
        </button>
      `;
    }).join('');
  }

  /**
   * 渲染子分类导航
   * @private
   */
  _renderSubCategories() {
    // 渲染卡片集合上方的子分类
    const cardSubcategoryNav = this.container.querySelector('.card-subcategory-nav');
    if (cardSubcategoryNav) {
      if (!this.currentCategory || !this.resourcesData?.categories) {
        cardSubcategoryNav.innerHTML = '';
        return;
      }

      // 获取当前分类的子分类
      const categoryData = this.resourcesData.categories[this.currentCategory];
      const subcategories = categoryData?.subcategories || [];

      if (subcategories.length === 0) {
        cardSubcategoryNav.innerHTML = '';
        return;
      }

      // 默认选中第一个子分类
      if (!this.currentSubCategory) {
        this.currentSubCategory = subcategories[0].id;
      }

      // 在子分类前面添加主分类名字
      const mainCategoryName = categoryData?.name || '';
      
      cardSubcategoryNav.innerHTML = `
        <div class="subcategory-main-name">${mainCategoryName}</div>
        ${subcategories.map(sub => `
          <button class="card-subcategory-item ${sub.id === this.currentSubCategory ? 'active' : ''}"
                  data-subcategory="${sub.id}">
            <span class="subcategory-name">${sub.name}</span>
          </button>
        `).join('')}
      `;
    }
  }

  /**
   * 获取分类下的资源数量
   * @private
   * @param {string} categoryId - 分类ID
   * @returns {number} 资源数量
   */
  _getCategoryCount(categoryId) {
    return this.allResources.filter(res => res.category === categoryId).length;
  }

  /**
   * 渲染分类资源
   * @private
   */
  _renderCategoryResources() {
    const filteredResources = this._filterResources();
    const resourcesGrid = this.container.querySelector('.resources-grid');

    if (!resourcesGrid) return;

    if (filteredResources.length === 0) {
      this._renderEmptyState(resourcesGrid);
      return;
    }

    resourcesGrid.innerHTML = filteredResources
      .map((resource, index) => this._renderResourceCard(resource, index))
      .join('');

    // 绑定图片加载错误处理
    this._bindImageErrors();

    // 绑定卡片点击事件
    this._bindCardEvents();
  }

  /**
   * 渲染所有资源相关内容
   * @private
   */
  _renderResources() {
    // 只渲染分类资源
    this._renderCategoryResources();
  }

  /**
   * 绑定卡片事件
   * @private
   */
  _bindCardEvents() {
    const cards = this.container.querySelectorAll('.resource-card');
    cards.forEach(card => {
      const resourceId = card.dataset.resourceId;
      const resource = this.allResources.find(r => r.id === resourceId);

      if (resource) {
        // 点击卡片显示详情
        card.addEventListener('click', (e) => {
          // 如果点击的是链接，不处理
          if (e.target.closest('[data-link]')) {
            return;
          }
          
          // 根据links数组长度决定点击行为
          if (resource.links && resource.links.length === 1) {
            // links数组长度为1，直接跳转到链接
            window.open(resource.links[0].url, '_blank');
          } else {
            // links数组长度大于1或为空，显示弹窗
            modal.showResourceDetail(resource);
          }
        });

        // 添加cursor样式
        card.style.cursor = 'pointer';
      }
    });
  }

  /**
   * 绑定图片加载错误处理
   * @private
   */
  _bindImageErrors() {
    const images = this.container.querySelectorAll('.favicon-img');
    images.forEach(img => {
      // 获取原有的onerror处理函数
      const originalOnError = img.onerror;
      
      img.onerror = (e) => {
        try {
          // 先尝试原有的onerror处理（即切换到备选favicon服务）
          if (originalOnError) {
            originalOnError(e);
          }
          
          // 设置一个超时，检查图片是否仍然加载失败
          setTimeout(() => {
            if (!img.complete || img.naturalWidth === 0) {
              // 如果备选服务也失败，尝试使用本地favicon
              if (img.src !== 'favicon.png' && !img.src.endsWith('/favicon.png')) {
                img.src = 'favicon.png';
                
                // 再次检查本地favicon是否加载成功
                setTimeout(() => {
                  if (!img.complete || img.naturalWidth === 0) {
                    // 本地favicon也失败，才显示首字符
                    const parent = img.parentElement;
                    const fallback = img.dataset.fallback || '?';
                    parent.classList.remove('resource-card-icon-img');
                    parent.classList.add('resource-card-icon-text');
                    parent.textContent = fallback;
                    parent.style.background = 'rgba(78, 205, 196, 0.15)';
                    parent.style.color = 'var(--primary-color)';
                  }
                }, 300);
              } else {
                // 已经尝试过本地favicon，显示首字符
                const parent = img.parentElement;
                const fallback = img.dataset.fallback || '?';
                parent.classList.remove('resource-card-icon-img');
                parent.classList.add('resource-card-icon-text');
                parent.textContent = fallback;
                parent.style.background = 'rgba(78, 205, 196, 0.15)';
                parent.style.color = 'var(--primary-color)';
              }
            }
          }, 300);
        } catch (error) {
          // 最终兜底方案
          const parent = img.parentElement;
          const fallback = img.dataset.fallback || '?';
          parent.classList.remove('resource-card-icon-img');
          parent.classList.add('resource-card-icon-text');
          parent.textContent = fallback;
          parent.style.background = 'rgba(78, 205, 196, 0.15)';
          parent.style.color = 'var(--primary-color)';
        }
      };
    });
  }

  /**
   * 获取Favicon图标HTML
   * @private
   * @param {string} url - 资源链接
   * @param {string} name - 资源名称
   * @returns {string} 图标HTML
   */
  _getFaviconIcon(url, name) {
    const firstChar = name ? name.charAt(0).toUpperCase() : '?';

    // 如果不是有效URL，直接返回首字符
    if (!url || url === '#') {
      return `<div class="resource-card-icon resource-card-icon-text">${firstChar}</div>`;
    }

    try {
      // 解析URL获取域名
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      
      // 尝试直接从网站获取favicon
      const directFaviconUrl = `${urlObj.protocol}//${domain}/favicon.ico`;
      
      // 使用多个备选的favicon服务，最后添加本地favicon作为最终fallback
      const fallbackFaviconUrls = [
        // DuckDuckGo Favicon服务
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        // 微软Favicon服务
        `https://www.bing.com/favicon.ico?url=${encodeURIComponent(url)}`,
        // 本地favicon作为最终fallback
        'favicon.png'
      ];

      return `
        <div class="resource-card-icon resource-card-icon-img">
          <img 
            src="${directFaviconUrl}" 
            alt="Icon" 
            class="favicon-img" 
            data-fallback="${firstChar}"
            onerror="this.onerror=null;this.src='${fallbackFaviconUrls[0]}';"
          >
        </div>
      `;
    } catch (error) {
      // URL解析失败，使用本地favicon作为fallback
      return `
        <div class="resource-card-icon resource-card-icon-img">
          <img 
            src="favicon.png" 
            alt="Default Icon" 
            class="favicon-img"
          >
        </div>
      `;
    }
  }

  /**
   * 渲染资源卡片
   * @private
   * @param {Object} resource - 资源对象
   * @param {number} index - 索引
   * @returns {string} HTML字符串
   */
  _renderResourceCard(resource, index) {
    // 获取第一个链接用于图标和点击跳转
    const link = resource.links?.[0];
    const linkUrl = link?.url || '#';

    // 获取图标：尝试使用网站favicon，失败则使用首字符
    const iconHtml = this._getFaviconIcon(linkUrl, resource.name);

    return `
      <div class="resource-card animate-enter" style="animation-delay: ${Math.min(index * 0.05, 0.5)}s" data-resource-id="${resource.id}">
        ${iconHtml}
        <div class="resource-card-content">
          <h3 class="resource-card-name" title="${resource.name}">${resource.name}</h3>
          <p class="resource-card-description" title="${resource.description}">${resource.description}</p>
        </div>
      </div>
    `;
  }

  /**
   * 渲染星级评分
   * @private
   * @param {number} rating - 评分
   * @returns {string} 星级HTML
   */
  _renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }
    return stars;
  }

  /**
   * 渲染空状态
   * @private
   * @param {HTMLElement} container - 容器元素
   */
  _renderEmptyState(container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">未找到匹配的资源</div>
        <div class="empty-desc">请尝试其他搜索关键词或选择不同的分类</div>
      </div>
    `;
  }

  /**
   * 过滤资源
   * @private
   * @returns {Array} 过滤后的资源列表
   */
  _filterResources() {
    let filtered = [...this.allResources];

    // 按搜索关键词过滤 - 搜索时忽略分类限制，搜索全部内容
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(res =>
        res.name.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        (res.tags || []).some(tag => tag.toLowerCase().includes(query))
      );
    } else {
      // 没有搜索关键词时，才按分类过滤
      if (this.currentCategory !== 'all') {
        filtered = filtered.filter(res => res.category === this.currentCategory);
      }

      // 按子分类过滤
      if (this.currentSubCategory) {
        filtered = filtered.filter(res => res.subcategory === this.currentSubCategory);
      }
    }

    return filtered;
  }

  /**
   * 绑定事件
   * @private
   */
  _bindEvents() {
    // 分类点击事件
    const categoryNav = this.container.querySelector('.category-nav');
    if (categoryNav) {
      categoryNav.addEventListener('click', (e) => {
        const categoryItem = e.target.closest('.category-item');
        if (categoryItem) {
          this._handleCategoryChange(categoryItem.dataset.category);
        }
      });
    }

    // 卡片集合上方的子分类点击事件
    const cardSubcategoryNav = this.container.querySelector('.card-subcategory-nav');
    if (cardSubcategoryNav) {
      cardSubcategoryNav.addEventListener('click', (e) => {
        const subcategoryItem = e.target.closest('.card-subcategory-item');
        if (subcategoryItem) {
          this._handleSubCategoryChange(subcategoryItem.dataset.subcategory);
        }
      });
    }

    // 搜索输入事件
    const searchInput = this.container.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        this._handleSearch(e.target.value);
      }, 300));
    }
  }

  /**
   * 处理分类变化
   * @private
   * @param {string} categoryId - 分类ID
   */
  _handleCategoryChange(categoryId) {
    this.currentCategory = categoryId;
    this.currentSubCategory = null;
    this._renderCategories();
    this._renderSubCategories();
    
    this._renderResources();
  }

  /**
   * 处理子分类变化
   * @private
   * @param {string} subCategoryId - 子分类ID
   */
  _handleSubCategoryChange(subCategoryId) {
    this.currentSubCategory = subCategoryId;
    this._renderSubCategories();
    this._renderResources();
  }

  /**
   * 处理搜索
   * @private
   * @param {string} query - 搜索关键词
   */
  _handleSearch(query) {
    this.searchQuery = query;
    this._renderResources();
  }

  /**
   * 刷新资源列表
   */
  refresh() {
    this._renderResources();
  }
}

// 创建单例实例
export const resourcesModule = new ResourcesModule();

export default resourcesModule;