/**
 * 路由模块
 * 负责页面路由切换和导航管理
 */

/**
 * 路由配置
 */
const routes = {
  home: {
    id: 'home',
    name: '首页',
    icon: '🏠',
    template: 'home-page'
  },
  resources: {
    id: 'resources',
    name: '资源库',
    icon: '📚',
    template: 'resources-page'
  },
  about: {
    id: 'about',
    name: '关于',
    icon: '👤',
    template: 'about-page'
  }
};

/**
 * 路由管理器类
 */
class Router {
  /**
   * 构造函数
   */
  constructor() {
    this.currentRoute = null;
    this.routes = routes;
    this.beforeHooks = [];
    this.afterHooks = [];

    // 初始化
    this._init();
  }

  /**
   * 初始化路由
   * @private
   */
  _init() {
    // 监听hash变化
    window.addEventListener('hashchange', () => this._handleHashChange());

    // 监听页面加载
    window.addEventListener('DOMContentLoaded', () => this._handleHashChange());

    // 绑定导航栏点击事件
    this._bindNavEvents();

    // 添加后置钩子来控制烟花模式
    this.afterEach((routeId) => {
      if (routeId === 'home') {
        document.body.classList.add('fireworks-mode');
      } else {
        document.body.classList.remove('fireworks-mode');
      }
    });

    // 初始化时检查当前路由
    const initialHash = window.location.hash.slice(1) || 'home';
    if (initialHash === 'home') {
      document.body.classList.add('fireworks-mode');
    }

    // 延迟更新导航栏状态，确保导航栏已经渲染完成
    setTimeout(() => {
      this._updateNavbar(initialHash);
    }, 100);
  }

  /**
   * 处理hash变化
   * @private
   */
  async _handleHashChange() {
    const hash = window.location.hash.slice(1) || 'home';

    if (hash === this.currentRoute) {
      return;
    }

    console.log(`[Router] Hash变化: ${hash}`);
    await this._navigateTo(hash);
  }

  /**
   * 导航到指定路由
   * @private
   * @param {string} routeId - 路由ID
   */
  async _navigateTo(routeId) {
    const route = this.routes[routeId];

    if (!route) {
      console.warn(`[Router] 路由不存在: ${routeId}`);
      return;
    }

    // 执行前置钩子
    for (const hook of this.beforeHooks) {
      await hook(routeId, this.currentRoute);
    }

    // 隐藏当前页面
    if (this.currentRoute) {
      this._hidePage(this.currentRoute);
    }

    // 显示新页面
    this._showPage(routeId);
    this.currentRoute = routeId;

    // 更新导航栏状态
    this._updateNavbar(routeId);

    // 更新页面标题
    this._updateTitle(route);

    // 执行后置钩子
    for (const hook of this.afterHooks) {
      await hook(routeId, this.currentRoute);
    }

    console.log(`[Router] 导航到: ${routeId}`);
  }

  /**
   * 导航到指定路由（公共方法）
   * @param {string} routeId - 路由ID
   */
  navigateTo(routeId) {
    this._navigateTo(routeId);
  }

  /**
   * 显示页面
   * @private
   * @param {string} routeId - 路由ID
   */
  _showPage(routeId) {
    const page = document.getElementById(routeId);
    if (page) {
      page.classList.remove('hidden');
      page.classList.add('visible');
      window.scrollTo(0, 0);
    }
  }

  /**
   * 隐藏页面
   * @private
   * @param {string} routeId - 路由ID
   */
  _hidePage(routeId) {
    const page = document.getElementById(routeId);
    if (page) {
      page.classList.remove('visible');
      page.classList.add('hidden');
    }
  }

  /**
   * 更新导航栏状态
   * @private
   * @param {string} routeId - 路由ID
   */
  _updateNavbar(routeId) {
    // 移除所有激活状态
    document.querySelectorAll('.navbar-link').forEach(link => {
      link.classList.remove('active');
    });

    // 添加当前激活状态
    const activeLink = document.querySelector(`.navbar-link[data-route="${routeId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }

    // 移动端：关闭菜单
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
      navbarNav.classList.remove('open');
    }

    const navbarToggle = document.querySelector('.navbar-toggle');
    if (navbarToggle) {
      navbarToggle.classList.remove('active');
    }

    // 重新绑定导航栏点击事件（因为导航栏是动态渲染的）
    this._bindNavEvents();
  }

  /**
   * 绑定导航栏点击事件
   * @private
   */
  _bindNavEvents() {
    const navbarNav = document.querySelector('.navbar-nav');
    if (!navbarNav) return;

    // 移除旧的事件监听器
    navbarNav.onclick = null;

    // 添加新的事件监听器
    navbarNav.addEventListener('click', (e) => {
      const link = e.target.closest('.navbar-link');
      if (link) {
        const routeId = link.dataset.route;
        if (routeId) {
          this.push(routeId);
        }
      }
    });
  }

  /**
   * 更新页面标题
   * @private
   * @param {Object} route - 路由对象
   */
  _updateTitle(route) {
    document.title = `${route.name} - CodeVault`;
  }

  /**
   * 添加前置钩子
   * @param {Function} hook - 钩子函数
   */
  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }

  /**
   * 添加后置钩子
   * @param {Function} hook - 钩子函数
   */
  afterEach(hook) {
    this.afterHooks.push(hook);
  }

  /**
   * 编程式导航
   * @param {string} routeId - 路由ID
   */
  push(routeId) {
    window.location.hash = routeId;
  }

  /**
   * 获取当前路由
   * @returns {string} 当前路由ID
   */
  getCurrentRoute() {
    return this.currentRoute?.id;
  }
}

// 创建单例实例
export const router = new Router();

export default router;
