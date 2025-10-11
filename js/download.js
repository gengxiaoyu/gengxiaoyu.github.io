// 下载管理功能
class DownloadManager {
    constructor() {
        this.downloadHistory = this.loadDownloadHistory();
        this.setupDownloadTracking();
    }

    loadDownloadHistory() {
        const history = localStorage.getItem('downloadHistory');
        return history ? JSON.parse(history) : [];
    }

    saveDownloadHistory() {
        localStorage.setItem('downloadHistory', JSON.stringify(this.downloadHistory));
    }

    setupDownloadTracking() {
        // 监听所有下载链接的点击
        document.addEventListener('click', (e) => {
            const downloadLink = e.target.closest('a[download], .download-btn');
            if (downloadLink) {
                e.preventDefault();
                this.trackDownload(downloadLink);
            }
        });
    }

    trackDownload(element) {
        const toolId = element.dataset.toolId;
        const downloadUrl = element.href || element.dataset.downloadUrl;
        
        if (toolId && downloadUrl) {
            this.recordDownload(parseInt(toolId), downloadUrl);
            this.initiateDownload(downloadUrl);
        }
    }

    recordDownload(toolId, downloadUrl) {
        const downloadRecord = {
            toolId: toolId,
            url: downloadUrl,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        this.downloadHistory.unshift(downloadRecord);
        
        // 只保留最近100条记录
        if (this.downloadHistory.length > 100) {
            this.downloadHistory = this.downloadHistory.slice(0, 100);
        }

        this.saveDownloadHistory();
        this.updateDownloadStats(toolId);
    }

    updateDownloadStats(toolId) {
        // 更新工具数据的下载计数
        const toolElement = document.querySelector(`[data-tool-id="${toolId}"]`);
        if (toolElement) {
            const downloadCountElement = toolElement.querySelector('.download-count');
            if (downloadCountElement) {
                const currentCount = parseInt(downloadCountElement.textContent.match(/\d+/)[0]);
                downloadCountElement.textContent = `📥 ${this.formatNumber(currentCount + 1)} 下载`;
            }
        }
    }

    initiateDownload(url) {
        // 显示下载进度
        this.showDownloadProgress();
        
        // 创建隐藏的iframe进行下载
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        
        // 清理iframe
        setTimeout(() => {
            iframe.remove();
        }, 5000);
    }

    showDownloadProgress() {
        const progress = document.createElement('div');
        progress.className = 'global-download-progress';
        progress.innerHTML = `
            <div class="progress-overlay">
                <div class="progress-container">
                    <h3>下载中...</h3>
                    <div class="progress-bar">
                        <div class="progress-fill animated-progress"></div>
                    </div>
                    <p>请勿关闭页面</p>
                </div>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .global-download-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .progress-overlay {
                background: rgba(255, 255, 255, 0.1);
                padding: 2rem;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .progress-container h3 {
                color: #4ecdc4;
                margin-bottom: 1rem;
            }
            .progress-bar {
                width: 300px;
                height: 10px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 5px;
                overflow: hidden;
            }
            .animated-progress {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
                animation: progressAnimation 2s infinite;
            }
            @keyframes progressAnimation {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(progress);

        // 3秒后自动关闭
        setTimeout(() => {
            progress.remove();
            style.remove();
        }, 3000);
    }

    getDownloadStats() {
        const stats = {
            totalDownloads: this.downloadHistory.length,
            todayDownloads: this.downloadHistory.filter(record => {
                const today = new Date().toDateString();
                return new Date(record.timestamp).toDateString() === today;
            }).length,
            popularTools: this.getPopularTools()
        };
        return stats;
    }

    getPopularTools() {
        const toolCounts = {};
        this.downloadHistory.forEach(record => {
            toolCounts[record.toolId] = (toolCounts[record.toolId] || 0) + 1;
        });

        return Object.entries(toolCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([toolId, count]) => ({ toolId: parseInt(toolId), count }));
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    // 导出下载历史（管理员功能）
    exportDownloadHistory() {
        const dataStr = JSON.stringify(this.downloadHistory, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `download-history-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

// 初始化下载管理器
document.addEventListener('DOMContentLoaded', () => {
    window.downloadManager = new DownloadManager();
});

// 工具下载函数（供其他模块调用）
function downloadTool(toolId, downloadUrl) {
    if (window.downloadManager) {
        window.downloadManager.recordDownload(toolId, downloadUrl);
        window.downloadManager.initiateDownload(downloadUrl);
    }
}