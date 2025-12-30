// 资源卡片渲染逻辑扩展
class ResourceCardRenderer {
    /**
     * 创建资源卡片HTML，使用网站ico作为图标
     * @param {Object} resource - 资源对象
     * @returns {string} - 资源卡片HTML
     */
    static createResourceCardHTML(resource) {
        // 获取网站ico图标URL
        const iconUrl = this.getFaviconUrl(resource);
        
        return `
            <div class="resource-card" data-resource-id="${resource.id}" data-category="${resource.category}">
                <div class="resource-header">
                    <div class="resource-icon">
                        ${iconUrl ? `<img src="${iconUrl}" alt="${resource.name} 图标" class="website-favicon" onerror="this.style.display='none'; this.nextSibling.style.display='inline';">` : ''}
                        <span class="default-icon" ${iconUrl ? 'style="display: none;"' : ''}>🔗</span>
                    </div>
                    <div class="resource-info">
                        <h3>${resource.name}</h3>
                        ${resource.version ? `<span class="resource-version">${resource.version}</span>` : ''}
                    </div>
                </div>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-tags">
                    ${resource.tags ? resource.tags.map(tag => `<span class="resource-tag">${tag}</span>`).join('') : ''}
                </div>
                <div class="resource-meta">
                    <span class="resource-platform">${resource.platform.join(', ')}</span>
                    <span class="resource-date">更新: ${resource.updateTime}</span>
                    ${resource.fileSize ? `<span class="file-size">${resource.fileSize}</span>` : ''}
                    ${resource.recommendation ? `<span class="recommendation">⭐ ${resource.recommendation}</span>` : ''}
                </div>
                <button class="view-details-btn" data-resource-id="${resource.id}">查看详情</button>
            </div>
        `;
    }

    /**
     * 创建资源详情HTML，使用网站ico作为图标
     * @param {Object} resource - 资源对象
     * @returns {string} - 资源详情HTML
     */
    static createResourceDetailHTML(resource) {
        // 获取网站ico图标URL
        const iconUrl = this.getFaviconUrl(resource);
        
        return `
            <div class="resource-detail-header">
                <div class="resource-detail-icon">
                    ${iconUrl ? `<img src="${iconUrl}" alt="${resource.name} 图标" class="website-favicon-large" onerror="this.style.display='none'; this.nextSibling.style.display='inline';">` : ''}
                    <span class="default-icon" ${iconUrl ? 'style="display: none;"' : ''}>🔗</span>
                </div>
                <div class="resource-detail-info">
                    <h2>${resource.name}</h2>
                    <div class="resource-detail-meta">
                        ${resource.version ? `<span>版本: ${resource.version}</span>` : ''}
                        ${resource.fileSize ? `<span>大小: ${resource.fileSize}</span>` : ''}
                        <span>平台: ${resource.platform.join(', ')}</span>
                        <span>更新: ${resource.updateTime}</span>
                        ${resource.recommendation ? `<span>推荐指数: ⭐ ${resource.recommendation}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="resource-detail-description">
                <h3>资源描述</h3>
                <p>${resource.description}</p>
            </div>
            
            ${resource.cloudLinks ? `
            <div class="resource-detail-links">
                <h3>资源链接</h3>
                ${resource.cloudLinks.map((link, index) => `
                    <div class="link-item">
                        <div class="link-platform">${this.getPlatformIcon(link.platform)}</div>
                        <div class="link-info">
                            <div class="link-title">${link.title || link.name || `${link.platform || '资源'} 链接`}</div>
                            <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url}</a>
                            ${link.password ? `<span class="link-password">提取码: ${link.password}</span>` : ''}
                        </div>
                        <button class="copy-link-btn" data-link="${link.url}" data-password="${link.password || ''}">复制</button>
                    </div>
                    `).join('')}
            </div>
            ` : ''}
            
            ${resource.tags ? `
            <div class="resource-detail-tags">
                <h3>标签</h3>
                <div class="resource-tags">
                    ${resource.tags.map(tag => `<span class="resource-tag">${tag}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            <button class="copy-all-btn" data-resource-id="${resource.id}">一键复制所有链接</button>
        `;
    }

    /**
     * 获取网站ico图标URL
     * @param {Object} resource - 资源对象
     * @returns {string|null} - ico图标URL
     */
    static getFaviconUrl(resource) {
        if (resource.cloudLinks && resource.cloudLinks.length > 0) {
            let url = resource.cloudLinks[0].url;
            try {
                // 确保URL包含协议
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                const parsedUrl = new URL(url);
                const hostname = parsedUrl.hostname;
                
                // 为特定网站添加例外处理
                if (hostname === 'juejin.cn') {
                    // 掘金使用特定路径的图标
                    return 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/icon/icon-juejin-a5c9443e503c5a292409.svg';
                } else if (hostname === 'element-plus.org') {
                    // Element Plus使用特定路径的图标
                    return 'https://element-plus.org/images/element-plus-logo.svg';
                } else if (hostname === 'github.com') {
                    // GitHub使用特定路径的图标
                    return 'https://github.githubassets.com/favicons/favicon.svg';
                } else if (hostname === 'npmjs.com') {
                    // npm使用特定路径的图标
                    return 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png';
                } else {
                    // 其他网站只使用自己的favicon.ico
                    return `https://${hostname}/favicon.ico`;
                }
            } catch (error) {
                console.error('解析URL失败:', error, 'URL:', url);
            }
        }
        return null;
    }

    /**
     * 获取平台图标
     * @param {string} platform - 平台名称
     * @returns {string} - 平台图标
     */
    static getPlatformIcon(platform) {
        const platformIcons = {
            baidu: '💾',
            aliyun: '☁️',
            quark: '⚡',
            google: '🔍',
            official: '🌐',
            github: '🐙'
        };
        return platformIcons[platform] || '📥';
    }
}

// 扩展ResourceLibraryApp类，使用新的资源卡片渲染逻辑
if (typeof ResourceLibraryApp !== 'undefined') {
    const originalCreateCard = ResourceLibraryApp.prototype.createResourceCardHTML;
    const originalCreateDetail = ResourceLibraryApp.prototype.createResourceDetailHTML;
    
    // 重写资源卡片渲染方法
    ResourceLibraryApp.prototype.createResourceCardHTML = function(resource) {
        return ResourceCardRenderer.createResourceCardHTML(resource);
    };
    
    // 重写资源详情渲染方法
    ResourceLibraryApp.prototype.createResourceDetailHTML = function(resource) {
        return ResourceCardRenderer.createResourceDetailHTML(resource);
    };
}

// 添加网站ico样式
const style = document.createElement('style');
style.textContent = `
    /* 网站ico图标样式 */
    .website-favicon {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        object-fit: contain;
    }
    
    .website-favicon-large {
        width: 64px;
        height: 64px;
        border-radius: 8px;
        object-fit: contain;
    }
    
    /* 调整资源卡片头部样式 */
    .resource-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
    }
    
    .resource-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background-color: #f5f5f5;
        border-radius: 8px;
    }
    
    /* 资源详情页图标样式 */
    .resource-detail-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 24px;
    }
    
    .resource-detail-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        background-color: #f5f5f5;
        border-radius: 12px;
    }
    
    /* 默认图标样式 */
    .default-icon {
        font-size: 24px;
        line-height: 1;
    }
    
    /* 资源版本样式 */
    .resource-version {
        font-size: 12px;
        color: #666;
        margin-left: 8px;
    }
`;
document.head.appendChild(style);