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
