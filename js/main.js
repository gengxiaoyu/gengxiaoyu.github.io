// 工具箱应用主逻辑
class ToolboxApp {
    constructor() {
        this.tools = [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    async init() {
        await this.loadTools();
        this.setupEventListeners();
        this.renderTools();
        this.initParticles();
        this.initMouseEffects();
        this.initScrollEffects();
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
        return `
            <div class="no-results">
                <h3>未找到匹配的工具</h3>
                <p>请尝试其他搜索关键词或选择不同的分类</p>
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

    initMouseEffects() {
        // 创建鼠标跟随光点
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        let mouseTrail = [];
        const maxTrailLength = 5;

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // 更新主光点位置
            cursorGlow.style.left = this.mouseX - 10 + 'px';
            cursorGlow.style.top = this.mouseY - 10 + 'px';

            // 创建拖尾效果
            mouseTrail.push({ x: this.mouseX, y: this.mouseY });
            if (mouseTrail.length > maxTrailLength) {
                mouseTrail.shift();
            }

            // 更新拖尾光点
            mouseTrail.forEach((pos, index) => {
                let trailDot = document.getElementById(`trail-${index}`);
                if (!trailDot) {
                    trailDot = document.createElement('div');
                    trailDot.id = `trail-${index}`;
                    trailDot.className = 'cursor-glow trail';
                    document.body.appendChild(trailDot);
                }
                trailDot.style.left = pos.x - 20 + 'px';
                trailDot.style.top = pos.y - 20 + 'px';
                trailDot.style.opacity = (index + 1) / maxTrailLength * 0.3;
            });
        });

        // 鼠标悬停效果
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('tool-card') || e.target.classList.contains('download-btn')) {
                cursorGlow.style.transform = 'scale(1.5)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 107, 107, 0.8) 0%, transparent 70%)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('tool-card') || e.target.classList.contains('download-btn')) {
                cursorGlow.style.transform = 'scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(78, 205, 196, 0.8) 0%, transparent 70%)';
            }
        });
    }

    initScrollEffects() {
        // 滚动视差效果
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
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