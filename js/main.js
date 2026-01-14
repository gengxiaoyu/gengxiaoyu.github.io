/**
 * CodeVault - 主入口文件
 * 静态全栈开发者资源站
 */

import { dataManager } from './utils/data-manager.js';
import { router } from './modules/router.js';
import { homeModule } from './modules/home.js';
import { resourcesModule } from './modules/resources.js';
import { aboutModule } from './modules/about.js';

/**
 * 应用类
 */
class App {
  /**
   * 构造函数
   */
  constructor() {
    this.isInitialized = false;
  }

  /**
   * 初始化应用
   */
  async init() {
    if (this.isInitialized) {
      console.warn('[App] 应用已初始化');
      return;
    }

    console.log('[App] 初始化应用...');

    try {
      // 绑定全局事件
      this._bindEvents();

      // 初始化导航栏
      this._initNavbar();

      // 初始化各模块
      await this._initModules();

      // 预加载数据
      await dataManager.preloadData([
        'config.json',
        'profile.json',
        'skills.json',
        'social.json',
        'resources.json'
      ]);

      // 更新 HTML 中的硬编码值
      this._updateHtmlElements();

      this.isInitialized = true;
      console.log('[App] 应用初始化完成');
    } catch (error) {
      console.error('[App] 初始化失败:', error);
      this._showError(error);
    }
  }

  /**
   * 初始化各模块
   * @private
   */
  async _initModules() {
    // 根据当前路由初始化对应模块
    const currentRoute = router.getCurrentRoute() || 'home';

    // 初始化所有模块
    await Promise.all([
      homeModule.init(),
      resourcesModule.init(),
      aboutModule.init()
    ]);
  }

  /**
   * 绑定全局事件
   * @private
   */
  _bindEvents() {
    // 路由切换事件
    router.beforeEach((to, from) => {
      console.log(`[App] 路由切换: ${from} -> ${to}`);
    });

    router.afterEach((to, from) => {
      // 更新页面显示
      document.querySelectorAll('.page').forEach(page => {
        if (page.id === to) {
          page.classList.add('visible');
          page.classList.remove('hidden');
        } else {
          page.classList.remove('visible');
          page.classList.add('hidden');
        }
      });

      // 滚动到顶部
      window.scrollTo(0, 0);
    });

    // 滚动事件 - 导航栏效果
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const navbar = document.querySelector('.navbar');

      if (navbar) {
        if (scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      lastScrollY = scrollY;
    });
  }

  /**
   * 初始化导航栏
   * @private
   */
  _initNavbar() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');

    if (navbarToggle && navbarNav) {
      navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarNav.classList.toggle('open');
      });

      // 点击链接后关闭菜单
      navbarNav.addEventListener('click', (e) => {
        if (e.target.closest('.navbar-link')) {
          navbarToggle.classList.remove('active');
          navbarNav.classList.remove('open');
        }
      });
    }
  }

  /**
   * 显示错误
   * @private
   * @param {Error} error - 错误对象
   */
  _showError(error) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error';
    errorContainer.innerHTML = `
      <div class="error-icon">❌</div>
      <h2 class="error-title">初始化失败</h2>
      <p class="error-message">${error.message}</p>
      <button class="btn btn-primary" onclick="location.reload()">重新加载</button>
    `;
    document.body.appendChild(errorContainer);
  }

  /**
   * 更新 HTML 中的硬编码值
   * @private
   */
  async _updateHtmlElements() {
    try {
      const config = await dataManager.loadData('config.json');
      const profile = await dataManager.loadData('profile.json');
      const resources = await dataManager.loadData('resources.json');
      if (!config) return;

      // 更新 SEO 元数据
      const seoTitle = document.querySelector('[data-seo="title"]');
      if (seoTitle && config.seo?.title) {
        seoTitle.textContent = config.seo.title;
      }

      const seoDescription = document.querySelector('[data-seo="description"]');
      if (seoDescription && config.seo?.description) {
        seoDescription.setAttribute('content', config.seo.description);
      }

      const seoKeywords = document.querySelector('[data-seo="keywords"]');
      if (seoKeywords && config.seo?.keywords) {
        seoKeywords.setAttribute('content', config.seo.keywords);
      }

      const seoAuthor = document.querySelector('[data-seo="author"]');
      if (seoAuthor && config.app?.author) {
        seoAuthor.setAttribute('content', config.app.author);
      }

      // 更新应用名称
      const appName = document.querySelector('[data-app="name"]');
      if (appName && config.app?.name) {
        appName.textContent = config.app.name;
      }

      // 更新副标题
      const subtitle = document.querySelector('[data-profile="subtitle"]');
      if (subtitle && profile?.basic?.subtitle) {
        subtitle.textContent = profile.basic.subtitle;
      }

      // 更新资源库副标题
      const resourcesSubtitle = document.querySelector('[data-resources="subtitle"]');
      if (resourcesSubtitle && resources?.total) {
        resourcesSubtitle.textContent = `${resources.total}+精选开发工具、框架与AI工具`;
      }

      // 更新资源分类数量
      const categoryCountElement = document.querySelector('[data-resources="category-count"]');
      if (categoryCountElement && resources?.categories) {
        const categoryCount = Object.keys(resources.categories).length;
        categoryCountElement.textContent = categoryCount;
      }

      // 更新导航栏
      const navContainer = document.querySelector('[data-navigation="container"]');
      if (navContainer && config.navigation) {
        navContainer.innerHTML = config.navigation.map(nav => `
          <a href="${nav.route}" class="navbar-link" data-route="${nav.id}">
            <span class="navbar-link-icon">${nav.icon}</span>
            <span>${nav.label}</span>
          </a>
        `).join('');
      }

      // 动态设置 CSS 变量
      this._updateCssVariables(config.theme);

      console.log('[App] HTML 元素已更新');
    } catch (error) {
      console.error('[App] 更新 HTML 元素失败:', error);
    }
  }

  /**
   * 动态设置 CSS 变量
   * @private
   * @param {Object} theme - 主题配置
   */
  _updateCssVariables(theme) {
    if (!theme) return;

    const root = document.documentElement;

    // 更新主色调
    if (theme.primaryColor) {
      root.style.setProperty('--primary-color', theme.primaryColor);
      root.style.setProperty('--primary-hover', this._adjustColor(theme.primaryColor, -10));
    }

    // 更新次色调
    if (theme.secondaryColor) {
      root.style.setProperty('--secondary-color', theme.secondaryColor);
    }

    // 更新强调色
    if (theme.accentColor) {
      root.style.setProperty('--accent-color', theme.accentColor);
      root.style.setProperty('--accent-hover', this._adjustColor(theme.accentColor, -10));
    }

    // 更新背景色
    if (theme.backgroundColor) {
      const colors = this._parseGradient(theme.backgroundColor);
      if (colors && colors.length >= 3) {
        root.style.setProperty('--bg-primary', colors[0]);
        root.style.setProperty('--bg-secondary', colors[1]);
        root.style.setProperty('--bg-tertiary', colors[2]);
      }
    }

    console.log('[App] CSS 变量已更新');
  }

  /**
   * 解析渐变色
   * @private
   * @param {string} gradient - 渐变色字符串
   * @returns {Array} 颜色数组
   */
  _parseGradient(gradient) {
    const colorRegex = /#[0-9a-fA-F]{6}/g;
    const colors = gradient.match(colorRegex);
    return colors || [];
  }

  /**
   * 调整颜色亮度
   * @private
   * @param {string} color - 颜色值
   * @param {number} amount - 调整量
   * @returns {string} 调整后的颜色
   */
  _adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  }
}

// 创建应用实例
const app = new App();

// DOM加载完成后初始化应用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// 导出应用实例（用于调试）
window.app = app;
