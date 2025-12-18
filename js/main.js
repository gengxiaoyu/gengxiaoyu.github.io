// 工具箱应用主逻辑
class ToolboxApp {
    constructor() {
        this.tools = [];
        this.config = null;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    async init() {
        await Promise.all([
            this.loadConfig(),
            this.loadTools()
        ]);
        this.setupEventListeners();
        this.renderTools();
        this.initParticles();
        this.initMouseEffects();
        this.initScrollEffects();
        this.applyConfig();
    }

    async loadConfig() {
        try {
            const response = await fetch('data/config.json');
            this.config = await response.json();
        } catch (error) {
            console.error('加载配置数据失败:', error);
            this.config = this.getDefaultConfig();
        }
    }

    async loadTools() {
        try {
            const response = await fetch('data/tools.json');
            this.tools = await response.json();
        } catch (error) {
            console.error('加载工具数据失败:', error);
            this.tools = this.getSampleTools();
        }
    }

    getDefaultConfig() {
        return {
            app: {
                title: "炫酷工具箱",
                description: "专业工具下载平台"
            },
            theme: {
                primaryColor: "#4ecdc4",
                secondaryColor: "#ff6b6b"
            },
            search: {
                placeholder: "搜索工具名称或描述...",
                noResultsMessage: "未找到匹配的工具",
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

    getSampleTools() {
        return [
            {
                id: 1,
                name: "VS Code 编辑器",
                category: "development",
                version: "1.85.0",
                description: "轻量级强大的代码编辑器",
                downloadUrl: "downloads/development/vscode-setup.exe",
                fileSize: "85.2 MB",
                downloadCount: "12500",
                icon: "💻"
            },
            {
                id: 2,
                name: "Chrome 浏览器",
                category: "utility",
                version: "120.0.6099.109",
                description: "快速安全的网页浏览器",
                downloadUrl: "downloads/utility/chrome-setup.exe",
                fileSize: "72.1 MB",
                downloadCount: "89300",
                icon: "🌐"
            },
            {
                id: 3,
                name: "CCleaner 系统清理",
                category: "system",
                version: "6.15.0",
                description: "系统优化和清理工具",
                downloadUrl: "downloads/system/ccleaner-setup.exe",
                fileSize: "25.3 MB",
                downloadCount: "45600",
                icon: "🧹"
            },
            {
                id: 4,
                name: "Steam 游戏平台",
                category: "gaming",
                version: "2.10.91.91",
                description: "全球最大的游戏分发平台",
                downloadUrl: "downloads/gaming/steam-setup.exe",
                fileSize: "1.2 MB",
                downloadCount: "78900",
                icon: "🎮"
            }
        ];
    }

    setupEventListeners() {
        // 顶部导航菜单功能
        this.setupHeaderNavigation();
        
        // 分类导航
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.currentCategory = item.dataset.category;
                this.renderTools();
            });
        });

        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderTools();
        });

        searchBtn.addEventListener('click', () => {
            this.renderTools();
        });

        // 下载按钮事件委托
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('download-btn')) {
                this.handleDownload(e.target.dataset.toolId);
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

    renderTools() {
        const container = document.getElementById('tools-container');
        if (!container) return;

        const filteredTools = this.filterTools();
        
        if (filteredTools.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }

        container.innerHTML = filteredTools.map(tool => this.createToolCardHTML(tool)).join('');
    }

    filterTools() {
        return this.tools.filter(tool => {
            const matchesCategory = this.currentCategory === 'all' || tool.category === this.currentCategory;
            const matchesSearch = !this.searchQuery || 
                tool.name.toLowerCase().includes(this.searchQuery) ||
                tool.description.toLowerCase().includes(this.searchQuery);
            return matchesCategory && matchesSearch;
        });
    }

    createToolCardHTML(tool) {
        return `
            <div class="tool-card" data-category="${tool.category}">
                <div class="tool-header">
                    <div class="tool-icon">${tool.icon}</div>
                    <div class="tool-info">
                        <h3>${tool.name}</h3>
                        <span class="tool-version">${tool.version}</span>
                    </div>
                </div>
                <p class="tool-description">${tool.description}</p>
                <div class="tool-meta">
                    <span class="file-size">${tool.fileSize}</span>
                </div>
                <button class="download-btn" data-tool-id="${tool.id}">
                    下载 (${tool.downloadCount})
                </button>
            </div>
        `;
    }

    getNoResultsHTML() {
        // 使用配置中的无结果消息，或默认值
        const noResultsMessage = this.config?.search?.noResultsMessage || "未找到匹配的工具";
        const noResultsSubMessage = this.config?.search?.noResultsSubMessage || "请尝试其他搜索关键词或选择不同的分类";
        
        return `
            <div class="no-results">
                <h3>${noResultsMessage}</h3>
                <p>${noResultsSubMessage}</p>
            </div>
        `;
    }

    async handleDownload(toolId) {
        const tool = this.tools.find(t => t.id == toolId);
        if (!tool) return;

        this.showDownloadProgress(tool.name);
        
        try {
            await this.simulateDownload(tool);
            this.updateDownloadCount(toolId);
            this.hideDownloadProgress();
        } catch (error) {
            console.error('下载失败:', error);
            this.hideDownloadProgress();
        }
    }

    showDownloadProgress(toolName) {
        const progressHTML = `
            <div class="download-progress">
                <div class="progress-content">
                    <h3>正在下载 ${toolName}</h3>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <p>请稍候...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', progressHTML);
    }

    hideDownloadProgress() {
        const progress = document.querySelector('.download-progress');
        if (progress) progress.remove();
    }

    simulateDownload(tool) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 模拟实际下载
                const link = document.createElement('a');
                link.href = tool.downloadUrl;
                link.download = tool.name + '.exe';
                link.click();
                resolve();
            }, 2000);
        });
    }

    updateDownloadCount(toolId) {
        const tool = this.tools.find(t => t.id == toolId);
        if (tool) {
            tool.downloadCount = (parseInt(tool.downloadCount) + 1).toString();
            this.renderTools();
        }
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
            if (e.target.closest('.tool-card') || e.target.classList.contains('download-btn')) {
                mainCursor.classList.add('hovering');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget || (!e.relatedTarget.closest('.tool-card') && !e.relatedTarget.classList.contains('download-btn'))) {
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

            // 工具卡片渐入效果
            const toolCards = document.querySelectorAll('.tool-card');
            toolCards.forEach((card, index) => {
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
    new ToolboxApp();
});