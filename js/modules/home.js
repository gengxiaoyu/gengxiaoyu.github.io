/**
 * 首页模块
 * 负责首页Hero区域和个人资料展示
 */

import { dataManager } from '../utils/data-manager.js';
import { storage } from '../utils/helpers.js';

/**
 * 首页模块类
 */
class HomeModule {
  /**
   * 构造函数
   */
  constructor() {
    this.container = document.getElementById('home');
    this.profileData = null;
    this.skillsData = null;
    this.socialData = null;
    this.typingTimer = null;
    this.typingIndex = 0;
  }

  /**
   * 初始化
   */
  async init() {
    if (!this.container) {
      console.warn('[HomeModule] 容器不存在');
      return;
    }

    console.log('[HomeModule] 初始化首页...');
    await this._loadData();
    this._renderProfile();
    this._renderSocialLinks();
    this._renderResourceStats();
    this._startTypingEffect();
  }

  /**
   * 加载数据
   * @private
   */
  async _loadData() {
    try {
      const data = await dataManager.loadBatchData([
        'profile.json',
        'skills.json',
        'social.json'
      ]);

      this.profileData = data['profile.json'];
      this.skillsData = data['skills.json'];
      this.socialData = data['social.json'];
    } catch (error) {
      console.error('[HomeModule] 加载数据失败:', error);
    }
  }

  /**
   * 渲染个人资料
   * @private
   */
  _renderProfile() {
    if (!this.profileData) return;

    const basic = this.profileData.basic;

    // 更新头像
    const avatar = this.container.querySelector('.hero-avatar');
    if (avatar) {
      avatar.src = basic.avatar;
      avatar.alt = basic.name;
    }

    // 更新名称
    const name = this.container.querySelector('.hero-name');
    if (name) {
      name.textContent = basic.name;
    }

    // 更新副标题
    const title = this.container.querySelector('.hero-title');
    if (title) {
      title.textContent = basic.title;
    }

    // 更新简介
    const bio = this.container.querySelector('.hero-bio');
    if (bio) {
      bio.textContent = basic.bio;
    }

    // 设置打字文本
    const typedText = this.profileData.hero?.typedText || [
      'Full-Stack Developer',
      'Open Source Enthusiast'
    ];
    const typingElement = this.container.querySelector('.typing-text');
    if (typingElement) {
      typingElement.dataset.texts = JSON.stringify(typedText);
    }
  }

  /**
   * 渲染社交链接
   * @private
   */
  _renderSocialLinks() {
    if (!this.socialData) return;

    const socialLinksContainer = this.container.querySelector('.social-links');
    if (!socialLinksContainer) return;

    // 获取显示的平台
    const platforms = this.socialData.platforms.filter(p => p.show);
    const socialLinks = this.profileData?.social || {};

    socialLinksContainer.innerHTML = platforms.map(platform => ({
      name: platform.name,
      url: platform.url,
      icon: platform.icon
    })).map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${link.name}">
        <i class="${link.icon}"></i>
      </a>
    `).join('');
  }

  /**
   * 渲染资源统计
   * @private
   */
  async _renderResourceStats() {
    try {
      const resourcesData = await dataManager.loadData('resources.json');
      const total = resourcesData?.total || 0;
      const lastUpdated = resourcesData?.lastUpdated || '未知';

      // 更新资源数量
      const resourceCountElement = this.container.querySelector('.resource-count');
      if (resourceCountElement) {
        resourceCountElement.textContent = `${total}+`;
      }

      // 更新最后更新时间
      const lastUpdatedElement = this.container.querySelector('.last-updated');
      if (lastUpdatedElement) {
        lastUpdatedElement.textContent = `最后更新: ${lastUpdated}`;
      }
    } catch (error) {
      console.error('[HomeModule] 加载资源统计失败:', error);
    }
  }

  /**
   * 开始打字机效果
   * @private
   */
  _startTypingEffect() {
    const typingElement = this.container.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = JSON.parse(typingElement.dataset.texts || '[]');
    if (texts.length === 0) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = this.profileData.hero?.typingSpeed || 80;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingElement.textContent = currentText.substring(0, charIndex);

      let typeSpeed = typingSpeed;
      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // 停留时间
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      this.typingTimer = setTimeout(type, typeSpeed);
    };

    type();
  }

  /**
   * 销毁
   */
  destroy() {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
  }
}

// 创建单例实例
export const homeModule = new HomeModule();

export default homeModule;
