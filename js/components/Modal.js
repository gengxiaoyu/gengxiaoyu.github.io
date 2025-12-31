/**
 * 弹窗组件
 * 用于显示资源详情
 */

/**
 * 弹窗管理器类
 */
class Modal {
  /**
   * 构造函数
   */
  constructor() {
    this.modal = null;
    this.overlay = null;
    this.isOpen = false;
    this.closeOnEscape = this._handleEscape.bind(this);
  }

  /**
   * 初始化弹窗
   * @private
   */
  _init() {
    if (this.modal) return;

    // 创建遮罩层
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    this.overlay.addEventListener('click', () => this.close());

    // 创建弹窗容器
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.overlay.appendChild(this.modal);
    document.body.appendChild(this.overlay);
  }

  /**
   * 显示资源详情弹窗
   * @param {Object} resource - 资源对象
   */
  showResourceDetail(resource) {
    this._init();
    this._renderResourceDetail(resource);
    this.open();
  }

  /**
   * 渲染资源详情
   * @private
   * @param {Object} resource - 资源对象
   */
  _renderResourceDetail(resource) {
    const meta = resource.meta || {};
    const updateTime = meta.updateTime || '未知';
    const version = meta.version || '最新版';
    const recommendation = meta.recommendation || 0;

    // 生成星级评分HTML
    const stars = this._renderStars(recommendation);

    // 生成标签HTML
    const tags = (resource.tags || []).map(tag =>
      `<span class="detail-tag">${tag}</span>`
    ).join('');

    // 生成链接HTML
    const links = (resource.links || []).map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="detail-link">
        <i class="fas fa-external-link-alt"></i>
        <span>${link.name || '访问'}</span>
      </a>
    `).join('');

    // 生成平台HTML
    const platforms = (resource.platform || []).map(platform =>
      `<span class="detail-platform">${platform}</span>`
    ).join('');

    this.modal.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon">${this._getFavicon(resource.links?.[0]?.url, resource.name)}</div>
        <div class="modal-title-group">
          <h2 class="modal-title">${resource.name}</h2>
          <div class="modal-meta">
            <span class="modal-version">${version}</span>
            <span class="modal-rating">
              ${stars}
              <span class="rating-value">${recommendation}</span>
            </span>
          </div>
        </div>
        <button class="modal-close" aria-label="关闭">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="modal-section">
          <h3 class="modal-section-title">简介</h3>
          <p class="modal-description">${resource.description}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-section-title">平台</h3>
          <div class="modal-platforms">${platforms}</div>
        </div>

        <div class="modal-section">
          <h3 class="modal-section-title">标签</h3>
          <div class="modal-tags">${tags}</div>
        </div>

        <div class="modal-section">
          <h3 class="modal-section-title">链接</h3>
          <div class="modal-links">${links}</div>
        </div>

        <div class="modal-section">
          <h3 class="modal-section-title">信息</h3>
          <div class="modal-info">
            <div class="info-item">
              <i class="far fa-clock info-icon"></i>
              <span>更新时间: ${updateTime}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // 绑定关闭按钮
    const closeBtn = this.modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
  }

  /**
   * 获取Favicon
   * @private
   * @param {string} url - URL地址
   * @param {string} name - 名称
   * @returns {string} HTML
   */
  _getFavicon(url, name) {
    const firstChar = name ? name.charAt(0).toUpperCase() : '?';
    return `<div class="modal-icon-fallback">${firstChar}</div>`;
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
   * 打开弹窗
   */
  open() {
    if (this.isOpen) return;

    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.closeOnEscape);
    this.isOpen = true;
  }

  /**
   * 关闭弹窗
   */
  close() {
    if (!this.isOpen) return;

    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.closeOnEscape);
    this.isOpen = false;
  }

  /**
   * 处理ESC键关闭
   * @private
   * @param {KeyboardEvent} e - 键盘事件
   */
  _handleEscape(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  /**
   * 销毁弹窗
   */
  destroy() {
    this.close();
    if (this.overlay) {
      document.body.removeChild(this.overlay);
      this.overlay = null;
      this.modal = null;
    }
  }
}

// 创建单例实例
export const modal = new Modal();

export default modal;
