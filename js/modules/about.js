/**
 * 关于页面模块
 * 负责个人介绍、技能展示
 */

import { dataManager } from '../utils/data-manager.js';

/**
 * 关于页面模块类
 */
class AboutModule {
  /**
   * 构造函数
   */
  constructor() {
    this.container = document.getElementById('about');
    this.profileData = null;
    this.skillsData = null;
    this.socialData = null;
  }

  /**
   * 初始化
   */
  async init() {
    if (!this.container) {
      console.warn('[AboutModule] 容器不存在');
      return;
    }

    console.log('[AboutModule] 初始化关于页面...');
    await this._loadData();
    this._renderProfile();
    this._renderSkills();
    this._renderContactLinks();
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
      console.error('[AboutModule] 加载数据失败:', error);
    }
  }

  /**
   * 渲染个人资料
   * @private
   */
  _renderProfile() {
    if (!this.profileData) return;

    const basic = this.profileData.basic;
    const contact = this.profileData.contact;

    // 头像
    const avatar = this.container.querySelector('.profile-avatar');
    if (avatar) {
      avatar.src = basic.avatar;
      avatar.alt = basic.name;
    }

    // 姓名
    const name = this.container.querySelector('.profile-name');
    if (name) {
      name.textContent = basic.name;
    }

    // 头衔
    const title = this.container.querySelector('.profile-title');
    if (title) {
      title.textContent = basic.title;
    }

    // 简介
    const bio = this.container.querySelector('.profile-bio');
    if (bio) {
      bio.textContent = basic.bio;
    }

    // 联系信息
    const location = this.container.querySelector('[data-contact="location"]');
    if (location) {
      location.textContent = contact.location;
    }

    const email = this.container.querySelector('[data-contact="email"]');
    if (email) {
      email.textContent = contact.email;
    }
  }

  /**
   * 渲染技能
   * @private
   */
  _renderSkills() {
    if (!this.skillsData) return;

    const categories = this.skillsData.categories || [];
    const skillsGrid = this.container.querySelector('.skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = categories.map(cat => `
      <div class="skill-card">
        <div class="skill-card-title">
          <span>${cat.name} ${cat.icon}</span>
        </div>
        <div class="skill-list">
          ${cat.skills.map(skill => `
            <div class="skill-item">
              <div class="skill-item-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
        ${this._renderTechTags(cat.skills)}
      </div>
    `).join('');
  }

  /**
   * 渲染技术栈标签
   * @private
   * @param {Array} skills - 技能列表
   * @returns {string} HTML字符串
   */
  _renderTechTags(skills) {
    return `
      <div class="tech-tags">
        ${skills.map(skill => `
          <span class="tech-tag">
            <i class="${skill.icon}"></i>
            ${skill.name}
          </span>
        `).join('')}
      </div>
    `;
  }

  /**
   * 渲染联系方式
   * @private
   */
  _renderContactLinks() {
    if (!this.socialData) return;

    const platforms = this.socialData.platforms.filter(p => p.show);
    const contactLinks = this.container.querySelector('.contact-links');
    if (!contactLinks) return;

    contactLinks.innerHTML = platforms.map(platform => `
      <a href="${platform.url}" target="_blank" rel="noopener noreferrer" class="contact-link">
        <i class="${platform.icon} contact-link-icon"></i>
        <span class="contact-link-label">${platform.name}</span>
        <span class="contact-link-value">${platform.description || ''}</span>
      </a>
    `).join('');
  }

  /**
   * 刷新页面
   */
  refresh() {
    this._renderProfile();
    this._renderSkills();
    this._renderContactLinks();
  }
}

// 创建单例实例
export const aboutModule = new AboutModule();

export default aboutModule;
