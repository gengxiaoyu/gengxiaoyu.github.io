// 实用资料库应用主逻辑
class ResourceLibraryApp {
    constructor() {
        this.resources = [];
        this.config = null;
        this.currentCategory = 'all';
        this.currentSubcategory = 'all';
        this.searchQuery = '';
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    async init() {
        await Promise.all([
            this.loadConfig(),
            this.loadResources()
        ]);
        this.setupEventListeners();
        this.renderCategories();
        this.renderResources();
        this.initParticles();
        this.initMouseEffects();
        this.initScrollEffects();
        this.applyConfig();
    }

    async loadConfig() {
        try {
            // 直接加载配置文件
            const response = await fetch('data/config.json');
            this.config = await response.json();
        } catch (error) {
            console.error('加载配置数据失败:', error);
            this.config = this.getDefaultConfig();
        }
    }

    async loadResources() {
        try {
            // 直接加载资源文件
            const response = await fetch('data/resources.json');
            this.resources = await response.json();
        } catch (error) {
            console.error('加载资源数据失败，尝试加载旧工具数据:', error);
            try {
                const response = await fetch('data/tools.json');
                const tools = await response.json();
                this.resources = this.convertToolsToResources(tools);
            } catch (e) {
                console.error('加载资源数据失败:', e);
                this.resources = this.getSampleResources();
            }
        }
    }

    // 将旧工具数据转换为新资源格式
    convertToolsToResources(tools) {
        return tools.map(tool => {
            return {
                id: tool.id,
                name: tool.name,
                category: this.mapCategory(tool.category),
                subcategory: this.mapSubcategory(tool.category),
                description: tool.description,
                cloudLinks: [
                    {
                        platform: "baidu",
                        title: "百度网盘链接",
                        url: tool.downloadUrl,
                        password: ""
                    }
                ],
                updateTime: "2025-12-18",
                version: tool.version,
                fileSize: tool.fileSize,
                platform: ["Windows"],
                needRegistration: false,
                recommendation: 4,
                icon: tool.icon,
                tags: [tool.name.replace(/\s+/g, "").toLowerCase()]
            };
        });
    }

    // 映射旧类别到新类别
    mapCategory(oldCategory) {
        const categoryMap = {
            'development': 'software',
            'utility': 'software',
            'system': 'software',
            'gaming': 'software'
        };
        return categoryMap[oldCategory] || 'software';
    }

    // 映射旧类别到新子类别
    mapSubcategory(oldCategory) {
        const subcategoryMap = {
            'development': 'development',
            'utility': 'productivity',
            'system': 'system',
            'gaming': 'multimedia'
        };
        return subcategoryMap[oldCategory] || 'development';
    }

    getDefaultConfig() {
        return {
            app: {
                title: "实用资料库",
                description: "专业资源下载平台"
            },
            theme: {
                primaryColor: "#4ecdc4",
                secondaryColor: "#ff6b6b"
            },
            categories: [
                {
                    id: "all",
                    name: "全部资源",
                    icon: "📚",
                    description: "查看所有可用资源"
                },
                {
                    id: "software",
                    name: "软件工具",
                    icon: "💻",
                    description: "各类实用软件工具",
                    subcategories: [
                        { id: "development", name: "开发工具", icon: "🔧" },
                        { id: "design", name: "设计工具", icon: "🎨" },
                        { id: "productivity", name: "办公效率", icon: "📋" },
                        { id: "system", name: "系统工具", icon: "⚙️" },
                        { id: "multimedia", name: "多媒体", icon: "🎬" },
                        { id: "free-alternatives", name: "免费替代品", icon: "💰" }
                    ]
                }
            ],
            search: {
                placeholder: "搜索资源名称或描述...",
                noResultsMessage: "未找到匹配的资源",
                noResultsSubMessage: "请尝试其他搜索关键词或选择不同的分类"
            }
        };
    }

    applyConfig() {
        // 更新页面标题
        if (this.config.app && this.config.app.title) {
            document.title = this.config.app.title;
        }

        // 更新搜索框占位符
        const searchInput = document.querySelector('.search-input');
        if (searchInput && this.config.search && this.config.search.placeholder) {
            searchInput.placeholder = this.config.search.placeholder;
        }
    }

    getSampleResources() {
        return [
            {
                id: 1,
                name: "VS Code",
                category: "software",
                subcategory: "development",
                description: "微软推出的轻量级代码编辑器，支持插件扩展",
                cloudLinks: [
                    {
                        platform: "official",
                        title: "官方网站链接",
                        url: "https://code.visualstudio.com"
                    },
                    {
                        platform: "baidu",
                        title: "百度网盘链接",
                        url: "https://pan.baidu.com/s/1aBcDeFgHiJkLmNoPqRsTuVwXyZ",
                        password: "abcd"
                    }
                ],
                updateTime: "2025-12-10",
                version: "1.85.0",
                fileSize: "85.2 MB",
                platform: ["Windows", "macOS", "Linux"],
                needRegistration: false,
                recommendation: 5,
                icon: "💻",
                tags: ["IDE", "代码编辑器", "开发工具"]
            },
            {
                id: 2,
                name: "Figma",
                category: "software",
                subcategory: "design",
                description: "基于浏览器的UI/UX设计工具，支持实时协作",
                cloudLinks: [
                    {
                        platform: "official",
                        title: "官方网站链接",
                        url: "https://www.figma.com"
                    },
                    {
                        platform: "baidu",
                        title: "百度网盘链接",
                        url: "https://pan.baidu.com/s/1aBcDeFgHiJkLmNoPqRsTuVwXyZ",
                        password: "efgh"
                    }
                ],
                updateTime: "2025-12-08",
                version: "118.2.0",
                fileSize: "120.5 MB",
                platform: ["Windows", "macOS", "Web"],
                needRegistration: true,
                recommendation: 4.8,
                icon: "🎨",
                tags: ["UI设计", "UX设计", "协作工具"]
            }
        ];
    }

    setupEventListeners() {
        // 顶部导航菜单功能
        this.setupHeaderNavigation();

        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderResources();
        });

        searchBtn.addEventListener('click', () => {
            this.renderResources();
        });

        // 资源卡片和详情按钮事件委托
        document.addEventListener('click', (e) => {
            // 查看详情按钮
            if (e.target.classList.contains('view-details-btn') || e.target.closest('.resource-card')) {
                const resourceId = e.target.dataset.resourceId || e.target.closest('.resource-card').dataset.resourceId;
                this.showResourceDetail(resourceId);
            }
            
            // 关闭弹窗按钮
            if (e.target.classList.contains('close-btn')) {
                this.hideResourceDetail();
            }
            
            // 复制链接按钮
            if (e.target.classList.contains('copy-link-btn')) {
                const link = e.target.dataset.link;
                const password = e.target.dataset.password;
                this.copyToClipboard(link, password);
            }
            
            // 一键复制所有链接按钮
            if (e.target.classList.contains('copy-all-btn')) {
                this.copyAllLinks();
            }
            
            // 子分类筛选按钮（支持点击内部元素）
            const subcategoryFilterItem = e.target.closest('.subcategory-filter-item');
            if (subcategoryFilterItem) {
                const categoryId = subcategoryFilterItem.dataset.category;
                const subcategoryId = subcategoryFilterItem.dataset.subcategory;
                this.handleSubcategoryFilterClick(categoryId, subcategoryId);
            }
            
            // 分类项点击（支持点击内部元素）
            const categoryItem = e.target.closest('.category-item');
            if (categoryItem) {
                const categoryId = categoryItem.dataset.category;
                this.handleCategoryClick(categoryId);
            }
        });
        
        // 点击弹窗外部关闭弹窗
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('resource-modal');
            if (modal && e.target === modal) {
                this.hideResourceDetail();
            }
        });
    }
    
    // 设置顶部导航事件监听
    setupHeaderNavigation() {
        // 移动端菜单按钮
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const headerNav = document.querySelector('.header-nav');
        
        if (mobileMenuBtn && headerNav) {
            // 菜单按钮点击事件
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                headerNav.classList.toggle('active');
            });
            
            // 点击菜单外部关闭菜单
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !headerNav.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    headerNav.classList.remove('active');
                }
            });
        }
    }

    // 渲染主分类（去掉子分类）
    renderCategories() {
        const categoryList = document.querySelector('.category-list');
        if (!categoryList || !this.config.categories) return;

        categoryList.innerHTML = '';
        
        this.config.categories.forEach(category => {
            // 创建主分类项
            const categoryItem = document.createElement('li');
            categoryItem.className = 'category-item';
            categoryItem.dataset.category = category.id;
            categoryItem.innerHTML = `
                <span class="category-icon">${category.icon}</span>
                <span class="category-name">${category.name}</span>
            `;
            
            // 添加点击事件
            categoryItem.addEventListener('click', () => {
                this.handleCategoryClick(category.id);
            });
            
            categoryList.appendChild(categoryItem);
        });
        
        // 默认激活"全部资源"分类
        const allCategory = categoryList.querySelector('[data-category="all"]');
        if (allCategory) {
            allCategory.classList.add('active');
        }
    }
    
    // 处理主分类点击
    handleCategoryClick(categoryId) {
        this.currentCategory = categoryId;
        this.currentSubcategory = 'all';
        
        // 更新分类激活状态
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedCategory = document.querySelector(`[data-category="${categoryId}"]`);
        if (clickedCategory) {
            clickedCategory.classList.add('active');
        }
        
        // 渲染子分类筛选栏
        this.renderSubcategoryFilter(categoryId);
        
        this.renderResources();
    }
    
    // 处理子分类点击
    handleSubcategoryClick(categoryId, subcategoryId) {
        this.currentCategory = categoryId;
        this.currentSubcategory = subcategoryId;
        
        // 更新分类激活状态
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedCategory = document.querySelector(`[data-category="${categoryId}"]`);
        if (clickedCategory) {
            clickedCategory.classList.add('active');
        }
        
        // 渲染子分类筛选栏
        this.renderSubcategoryFilter(categoryId);
        
        // 更新子分类筛选激活状态
        const subcategoryFilterItems = document.querySelectorAll('.subcategory-filter-item');
        subcategoryFilterItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedSubcategoryFilter = document.querySelector(`[data-subcategory="${subcategoryId}"]`);
        if (clickedSubcategoryFilter) {
            clickedSubcategoryFilter.classList.add('active');
        }
        
        this.renderResources();
    }
    
    // 渲染子分类筛选栏
    renderSubcategoryFilter(categoryId) {
        const container = document.getElementById('subcategory-filter-container');
        if (!container) return;
        
        // 清空容器
        container.innerHTML = '';
        
        // 如果是"全部资源"，不显示子分类筛选
        if (categoryId === 'all') {
            return;
        }
        
        // 找到当前分类
        const category = this.config.categories.find(cat => cat.id === categoryId);
        if (!category || !category.subcategories || category.subcategories.length === 0) {
            return;
        }
        
        // 添加"全部子分类"选项
        const allSubcategoryItem = document.createElement('div');
        allSubcategoryItem.className = 'subcategory-filter-item';
        allSubcategoryItem.dataset.category = categoryId;
        allSubcategoryItem.dataset.subcategory = 'all';
        allSubcategoryItem.textContent = '全部子分类';
        
        // 设置激活状态
        if (this.currentSubcategory === 'all') {
            allSubcategoryItem.classList.add('active');
        }
        
        container.appendChild(allSubcategoryItem);
        
        // 添加各个子分类选项
        category.subcategories.forEach(subcategory => {
            const subcategoryItem = document.createElement('div');
            subcategoryItem.className = 'subcategory-filter-item';
            subcategoryItem.dataset.category = categoryId;
            subcategoryItem.dataset.subcategory = subcategory.id;
            subcategoryItem.innerHTML = `
                <span class="subcategory-icon">${subcategory.icon}</span>
                <span class="subcategory-name">${subcategory.name}</span>
            `;
            
            // 设置激活状态
            if (this.currentSubcategory === subcategory.id) {
                subcategoryItem.classList.add('active');
            }
            
            container.appendChild(subcategoryItem);
        });
    }
    
    // 处理子分类筛选点击
    handleSubcategoryFilterClick(categoryId, subcategoryId) {
        this.currentCategory = categoryId;
        this.currentSubcategory = subcategoryId;
        
        // 更新子分类筛选激活状态
        const subcategoryFilterItems = document.querySelectorAll('.subcategory-filter-item');
        subcategoryFilterItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedItem = document.querySelector(`[data-subcategory="${subcategoryId}"]`);
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
        
        this.renderResources();
    }

    renderResources() {
        const container = document.getElementById('resources-container') || document.getElementById('tools-container');
        if (!container) return;

        const filteredResources = this.filterResources();
        
        if (filteredResources.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }

        container.innerHTML = filteredResources.map(resource => this.createResourceCardHTML(resource)).join('');
    }

    filterResources() {
        let filtered = this.resources.filter(resource => {
            const matchesCategory = this.currentCategory === 'all' || resource.category === this.currentCategory;
            const matchesSubcategory = this.currentSubcategory === 'all' || resource.subcategory === this.currentSubcategory;
            const matchesSearch = !this.searchQuery || 
                resource.name.toLowerCase().includes(this.searchQuery) ||
                resource.description.toLowerCase().includes(this.searchQuery) ||
                (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)));
            
            return matchesCategory && matchesSubcategory && matchesSearch;
        });
        
        // 默认按最新更新排序
        filtered = filtered.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
        
        return filtered;
    }

    createResourceCardHTML(resource) {
        return `
            <div class="resource-card" data-resource-id="${resource.id}" data-category="${resource.category}">
                <div class="resource-header">
                    <div class="resource-icon">${resource.icon}</div>
                    <div class="resource-info">
                        <h3>${resource.name}</h3>
                        <span class="resource-version">${resource.version}</span>
                    </div>
                </div>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-tags">
                    ${resource.tags ? resource.tags.map(tag => `<span class="resource-tag">${tag}</span>`).join('') : ''}
                </div>
                <div class="resource-meta">
                    <span class="resource-platform">${resource.platform.join(', ')}</span>
                    <span class="resource-date">更新: ${resource.updateTime}</span>
                    <span class="file-size">${resource.fileSize}</span>
                    ${resource.recommendation ? `<span class="recommendation">⭐ ${resource.recommendation}</span>` : ''}
                </div>
                <button class="view-details-btn" data-resource-id="${resource.id}">查看详情</button>
            </div>
        `;
    }

    getNoResultsHTML() {
        // 使用配置中的无结果消息，或默认值
        const noResultsMessage = this.config?.search?.noResultsMessage || "未找到匹配的资源";
        const noResultsSubMessage = this.config?.search?.noResultsSubMessage || "请尝试其他搜索关键词或选择不同的分类";
        
        return `
            <div class="no-results">
                <h3>${noResultsMessage}</h3>
                <p>${noResultsSubMessage}</p>
            </div>
        `;
    }
    
    // 显示资源详情弹窗
    showResourceDetail(resourceId) {
        const resource = this.resources.find(r => r.id == resourceId);
        if (!resource) return;
        
        const modal = document.getElementById('resource-modal');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalBody) return;
        
        // 生成资源详情HTML
        const detailHTML = this.createResourceDetailHTML(resource);
        modalBody.innerHTML = detailHTML;
        
        // 显示弹窗
        modal.classList.add('active');
    }
    
    // 隐藏资源详情弹窗
    hideResourceDetail() {
        const modal = document.getElementById('resource-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    // 创建资源详情HTML
    createResourceDetailHTML(resource) {
        return `
            <div class="resource-detail-header">
                <div class="resource-detail-icon">${resource.icon}</div>
                <div class="resource-detail-info">
                    <h2>${resource.name}</h2>
                    <div class="resource-detail-meta">
                        <span>版本: ${resource.version}</span>
                        <span>大小: ${resource.fileSize}</span>
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
                ${resource.cloudLinks.map((link, index) => {
                    const platformIcon = this.getPlatformIcon(link.platform);
                    return `
                    <div class="link-item">
                        <div class="link-platform">${platformIcon}</div>
                        <div class="link-info">
                            <div class="link-title">${link.title || link.name || `${link.platform || '资源'} 链接`}</div>
                            <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.url}</a>
                            ${link.password ? `<span class="link-password">提取码: ${link.password}</span>` : ''}
                        </div>
                        <button class="copy-link-btn" data-link="${link.url}" data-password="${link.password || ''}">复制</button>
                    </div>
                    `;
                }).join('')}
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
    
    // 获取平台图标
    getPlatformIcon(platform) {
        const icons = {
            'baidu': '💾',
            'aliyun': '☁️',
            'quark': '⚡',
            'google': '🔍'
        };
        return icons[platform] || '📥';
    }
    
    // 复制到剪贴板
    copyToClipboard(link, password) {
        let text = link;
        if (password) {
            text += `\n提取码: ${password}`;
        }
        
        navigator.clipboard.writeText(text).then(() => {
            this.showCopySuccess();
        }).catch(err => {
            console.error('复制失败:', err);
        });
    }
    
    // 一键复制所有链接
    copyAllLinks() {
        const modal = document.getElementById('resource-modal');
        if (!modal) return;
        
        const links = [];
        const linkItems = modal.querySelectorAll('.link-item');
        
        linkItems.forEach(item => {
            const link = item.querySelector('a').href;
            const password = item.querySelector('.link-password');
            let text = link;
            if (password) {
                text += `\n提取码: ${password.textContent.replace('提取码: ', '')}`;
            }
            links.push(text);
        });
        
        if (links.length > 0) {
            navigator.clipboard.writeText(links.join('\n\n')).then(() => {
                this.showCopySuccess();
            }).catch(err => {
                console.error('复制失败:', err);
            });
        }
    }
    
    // 显示复制成功提示
    showCopySuccess() {
        // 创建提示元素
        let successElement = document.querySelector('.copy-success');
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'copy-success';
            document.body.appendChild(successElement);
        }
        
        successElement.textContent = '复制成功！';
        successElement.classList.add('active');
        
        // 3秒后隐藏
        setTimeout(() => {
            successElement.classList.remove('active');
        }, 3000);
    }

    initParticles() {
        // 背景粒子层
        if (typeof Particles !== 'undefined') {
            Particles.init({
                selector: '#particles-js',
                color: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
                connectParticles: true,
                maxParticles: 80,
                sizeVariations: 3,
                speed: 0.5,
                minDistance: 100
            });

            // 内容区域粒子层
            Particles.init({
                selector: '#particles-content',
                color: ['#4ecdc4', '#45b7d1', '#96ceb4'],
                connectParticles: false,
                maxParticles: 50,
                sizeVariations: 2,
                speed: 0.3,
                minDistance: 150
            });

            // 前景粒子层
            Particles.init({
                selector: '#particles-foreground',
                color: ['#ffffff', '#ff6b6b', '#4ecdc4'],
                connectParticles: false,
                maxParticles: 30,
                sizeVariations: 4,
                speed: 0.8,
                minDistance: 200
            });
        }
    }

    // 节流函数，限制事件触发频率
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    initMouseEffects() {
        // 创建主光标元素
        const mainCursor = document.createElement('div');
        mainCursor.className = 'custom-cursor';
        document.body.appendChild(mainCursor);
        
        // 减少拖尾数量以提高性能
        const trailLength = 1;
        const trailDots = [];
        
        // 存储鼠标位置
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        // 仅存储最近的位置用于拖尾
        let lastMouseX = mouseX;
        let lastMouseY = mouseY;
        
        // 创建拖尾元素
        for (let i = 0; i < trailLength; i++) {
            const trailDot = document.createElement('div');
            trailDot.className = 'cursor-trail';
            trailDot.style.opacity = (1 - (i * 0.5));
            trailDot.style.left = (mouseX - 10) + 'px';
            trailDot.style.top = (mouseY - 10) + 'px';
            document.body.appendChild(trailDot);
            trailDots.push(trailDot);
        }
        
        // 优化鼠标移动事件 - 直接更新DOM位置，减少中间变量
        document.addEventListener('mousemove', (e) => {
            // 直接更新主光标位置，避免在animate函数中再次访问
            mainCursor.style.left = (e.clientX - 15) + 'px';
            mainCursor.style.top = (e.clientY - 15) + 'px';
            
            // 更新拖尾位置 - 平滑过渡
            trailDots.forEach((dot, index) => {
                // 使用简单的线性插值，减少计算量
                const targetX = lastMouseX - 10;
                const targetY = lastMouseY - 10;
                dot.style.left = targetX + 'px';
                dot.style.top = targetY + 'px';
            });
            
            // 更新上一次的位置
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        });
        
        // 简化悬停效果
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.resource-card') || e.target.classList.contains('view-details-btn')) {
                mainCursor.classList.add('hovering');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget || (!e.relatedTarget.closest('.resource-card') && !e.relatedTarget.classList.contains('view-details-btn'))) {
                mainCursor.classList.remove('hovering');
            }
        });
    }

    initScrollEffects() {
        // 滚动视差效果
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // 顶部导航滚动效果
            const header = document.querySelector('.top-header');
            if (header) {
                if (scrolled > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // 标题视差效果
            const parallax = document.querySelector('.header-content h1');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }

            // 资源卡片渐入效果
            const resourceCards = document.querySelectorAll('.resource-card, .tool-card');
            resourceCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = cardTop < window.innerHeight - 100;
                
                if (cardVisible) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transitionDelay = `${index * 0.1}s`;
                } else {
                    card.style.opacity = '0.7';
                    card.style.transform = 'translateY(20px)';
                }
            });
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ResourceLibraryApp();
});