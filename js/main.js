// 主应用程序逻辑
class ToolboxApp {
    constructor() {
        this.tools = [];
        this.filteredTools = [];
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        await this.loadToolsData();
        this.renderTools();
        this.setupEventListeners();
        this.setupScrollAnimations();
    }

    async loadToolsData() {
        try {
            const response = await fetch('data/tools.json');
            this.tools = await response.json();
            this.filteredTools = [...this.tools];
        } catch (error) {
            console.error('加载工具数据失败:', error);
            this.tools = this.getSampleTools();
            this.filteredTools = [...this.tools];
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
                downloadCount: 12500,
                rating: 4.8,
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
                downloadCount: 89300,
                rating: 4.7,
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
                downloadCount: 45600,
                rating: 4.5,
                icon: "🧹"
            }
        ];
    }

    renderTools() {
        const container = document.getElementById('tools-container');
        container.innerHTML = '';

        this.filteredTools.forEach(tool => {
            const toolCard = this.createToolCard(tool);
            container.appendChild(toolCard);
        });

        this.updateDownloadStats();
    }

    createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card scroll-reveal';
        card.innerHTML = `
            <div class="tool-header">
                <div class="tool-icon">${tool.icon}</div>
                <div class="tool-info">
                    <h3 class="tool-name">${tool.name}</h3>
                    <span class="tool-version">v${tool.version}</span>
                </div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-stats">
                <span class="download-count">📥 ${this.formatNumber(tool.downloadCount)} 下载</span>
                <span class="tool-rating">⭐ ${tool.rating}</span>
            </div>
            <div class="tool-meta">
                <span class="file-size">📦 ${tool.fileSize}</span>
                <span class="tool-category">${this.getCategoryName(tool.category)}</span>
            </div>
            <button class="download-btn" data-tool-id="${tool.id}">
                立即下载
            </button>
        `;

        // 添加动画延迟
        setTimeout(() => card.classList.add('visible'), 100);

        return card;
    }

    getCategoryName(category) {
        const categories = {
            'utility': '实用软件',
            'system': '系统工具',
            'development': '开发工具',
            'gaming': '游戏工具'
        };
        return categories[category] || '其他';
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    setupEventListeners() {
        // 分类筛选
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);
            });
        });

        // 搜索功能
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', (e) => {
            this.searchTools(e.target.value);
        });

        searchBtn.addEventListener('click', () => {
            this.searchTools(searchInput.value);
        });

        // 下载按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('download-btn')) {
                const toolId = parseInt(e.target.dataset.toolId);
                this.downloadTool(toolId);
            }
        });

        // 导航平滑滚动
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    filterByCategory(category) {
        this.currentCategory = category;
        if (category === 'all') {
            this.filteredTools = [...this.tools];
        } else {
            this.filteredTools = this.tools.filter(tool => tool.category === category);
        }
        this.renderTools();
    }

    searchTools(query) {
        if (query.trim() === '') {
            this.filteredTools = [...this.tools];
        } else {
            this.filteredTools = this.tools.filter(tool =>
                tool.name.toLowerCase().includes(query.toLowerCase()) ||
                tool.description.toLowerCase().includes(query.toLowerCase())
            );
        }
        this.renderTools();
    }

    downloadTool(toolId) {
        const tool = this.tools.find(t => t.id === toolId);
        if (tool) {
            // 模拟下载过程
            this.showDownloadProgress(tool);
            
            // 更新下载计数
            tool.downloadCount++;
            this.updateDownloadStats();
            
            // 实际下载（如果文件存在）
            setTimeout(() => {
                window.open(tool.downloadUrl, '_blank');
            }, 1000);
        }
    }

    showDownloadProgress(tool) {
        const progress = document.createElement('div');
        progress.className = 'download-progress';
        progress.innerHTML = `
            <div class="progress-content">
                <span>正在下载 ${tool.name}...</span>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(progress);
        
        setTimeout(() => {
            progress.remove();
        }, 2000);
    }

    updateDownloadStats() {
        const totalDownloads = this.tools.reduce((sum, tool) => sum + tool.downloadCount, 0);
        document.querySelector('.stat-number').textContent = this.formatNumber(totalDownloads);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ToolboxApp();
});