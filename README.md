# 🔧 炫酷工具箱网站

一个现代化的工具下载平台，提供各种实用软件、系统工具和开发工具的下载服务。

## ✨ 特性

- 🎨 **炫酷界面设计** - 赛博朋克风格，动态粒子背景
- 📱 **完全响应式** - 适配所有设备尺寸
- 🔍 **智能搜索** - 快速找到所需工具
- 📊 **下载统计** - 实时显示下载排行
- 🚀 **高性能** - 纯前端实现，加载迅速

## 🗂️ 项目结构

```
gengxiaoyu.github.io/
├── index.html              # 主页面
├── css/                   # 样式文件
│   ├── main.css           # 主样式
│   ├── animations.css     # 动画效果
│   ├── particles.css      # 粒子背景
│   └── responsive.css     # 响应式设计
├── js/                    # JavaScript文件
│   ├── main.js            # 主逻辑
│   ├── particles.js       # 粒子系统
│   └── download.js        # 下载管理
├── data/                  # 数据文件
│   └── tools.json         # 工具数据
├── downloads/             # 下载文件目录
│   ├── utility/           # 实用软件
│   ├── system/           # 系统工具
│   ├── development/      # 开发工具
│   └── gaming/           # 游戏工具
└── images/               # 图片资源
```

## 🚀 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/gengxiaoyu/gengxiaoyu.github.io.git
   ```

2. **添加工具文件**
   - 将安装包文件放入对应的 `downloads/` 子目录
   - 在 `data/tools.json` 中添加工具信息

3. **本地测试**
   - 使用任何HTTP服务器（如Python的 `python -m http.server`）
   - 或直接在浏览器中打开 `index.html`

4. **部署到GitHub Pages**
   - 推送到GitHub仓库
   - 在仓库设置中启用GitHub Pages

## 📋 工具数据格式

在 `data/tools.json` 中添加工具信息：

```json
{
  "id": 1,
  "name": "工具名称",
  "category": "工具分类",
  "version": "版本号",
  "description": "工具描述",
  "downloadUrl": "下载链接",
  "fileSize": "文件大小",
  "downloadCount": 下载次数,
  "rating": 评分,
  "icon": "图标表情",
  "features": ["功能1", "功能2"],
  "requirements": "系统要求"
}
```

## 🎨 自定义样式

- **主题颜色**: 修改CSS变量中的渐变色值
- **动画效果**: 调整 `animations.css` 中的关键帧
- **粒子效果**: 配置 `particles.js` 中的参数

## 📱 响应式断点

- **桌面端**: > 1200px
- **平板端**: 768px - 1200px  
- **手机端**: < 768px

## 🔧 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: CSS Grid, Flexbox, CSS变量
- **动画**: CSS动画, Web动画API
- **数据**: JSON文件管理

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- 邮箱: contact@toolbox.com
- GitHub: [gengxiaoyu](https://github.com/gengxiaoyu)

---
## 运行方式
- python -m http.server 8000
⭐ 如果这个项目对您有帮助，请给它一个星标！

https://16map.com/
https://www.packpack.cn/