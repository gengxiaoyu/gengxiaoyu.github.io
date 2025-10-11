<!--
 * @Author: huojiyanzui 18561977738@163.com
 * @Date: 2025-10-11 16:16:02
 * @LastEditors: huojiyanzui 18561977738@163.com
 * @LastEditTime: 2025-10-11 16:16:09
 * @FilePath: \gengxiaoyu.github.io\downloads\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 下载文件目录说明

此目录用于存放工具箱网站提供的各种工具安装包。

## 目录结构
```
downloads/
├── utility/          # 实用软件
├── system/           # 系统工具  
├── development/      # 开发工具
└── gaming/           # 游戏工具
```

## 文件命名规范
- 使用英文名称，避免特殊字符
- 格式：`工具名-setup.exe` 或 `工具名-portable.zip`
- 版本信息在 tools.json 中管理

## 注意事项
1. 确保文件大小正确配置在 tools.json 中
2. 定期清理过时版本文件
3. 保持文件完整性检查
4. 注意版权和许可证要求

## 添加新工具步骤
1. 将安装包文件放入对应分类目录
2. 在 `data/tools.json` 中添加工具信息
3. 更新下载链接路径
4. 测试下载功能