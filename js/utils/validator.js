/**
 * 数据验证工具
 * 验证JSON数据格式和完整性
 */

/**
 * 数据验证器类
 */
class DataValidator {
  /**
   * 构造函数
   */
  constructor() {
    this.errors = [];
  }

  /**
   * 验证单个资源
   * @param {Object} resource - 资源对象
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validateResource(resource) {
    const errors = [];

    // 必填字段验证
    const requiredFields = ['id', 'name', 'description', 'category'];
    requiredFields.forEach(field => {
      if (!resource[field]) {
        errors.push(`缺少必填字段: ${field}`);
      }
    });

    // ID格式验证
    if (resource.id && !/^res-[0-9]{3}$/.test(resource.id)) {
      errors.push(`ID格式错误: ${resource.id}，应为 res-XXX 格式`);
    }

    // 名称长度验证
    if (resource.name) {
      if (resource.name.length < 2) {
        errors.push('名称长度不能少于2个字符');
      }
      if (resource.name.length > 50) {
        errors.push('名称长度不能超过50个字符');
      }
    }

    // 描述长度验证
    if (resource.description) {
      if (resource.description.length < 10) {
        errors.push('描述长度不能少于10个字符');
      }
      if (resource.description.length > 200) {
        errors.push('描述长度不能超过200个字符');
      }
    }

    // 分类验证
    if (resource.category) {
      const validCategories = ['frontend', 'ai-tools', 'learning'];
      if (!validCategories.includes(resource.category)) {
        errors.push(`分类错误: ${resource.category}，应为 ${validCategories.join(', ')}`);
      }
    }

    // URL格式验证
    if (resource.links && Array.isArray(resource.links)) {
      resource.links.forEach((link, index) => {
        if (!link.url) {
          errors.push(`链接 ${index + 1} 缺少 URL 字段`);
        } else {
          try {
            new URL(link.url);
          } catch (e) {
            errors.push(`链接 ${index + 1} URL格式错误: ${link.url}`);
          }
        }
      });
    }

    // 评分范围验证
    if (resource.meta && typeof resource.meta.recommendation === 'number') {
      if (resource.meta.recommendation < 1 || resource.meta.recommendation > 5) {
        errors.push(`评分超出范围: ${resource.meta.recommendation}，应为 1-5`);
      }
    }

    // tags数量验证
    if (resource.tags && Array.isArray(resource.tags)) {
      if (resource.tags.length > 10) {
        errors.push('标签数量不能超过10个');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证资源列表
   * @param {Array} resources - 资源数组
   * @returns {Object} { valid: boolean, errors: Object }
   */
  validateResources(resources) {
    const errors = {};
    let valid = true;

    if (!Array.isArray(resources)) {
      return {
        valid: false,
        errors: { 'global': ['资源数据应为数组'] }
      };
    }

    resources.forEach((resource, index) => {
      const result = this.validateResource(resource);
      if (!result.valid) {
        valid = false;
        errors[`res-${index + 1}`] = result.errors;
      }
    });

    return { valid, errors };
  }

  /**
   * 验证配置文件
   * @param {Object} config - 配置对象
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validateConfig(config) {
    const errors = [];

    // 验证app配置
    if (!config.app) {
      errors.push('缺少 app 配置');
    } else {
      if (!config.app.name) errors.push('缺少 app.name');
      if (!config.app.version) errors.push('缺少 app.version');
    }

    // 验证theme配置
    if (!config.theme) {
      errors.push('缺少 theme 配置');
    } else {
      if (!config.theme.primaryColor) errors.push('缺少 theme.primaryColor');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证个人资料
   * @param {Object} profile - 个人资料对象
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validateProfile(profile) {
    const errors = [];

    if (!profile.basic) {
      errors.push('缺少 basic 配置');
    } else {
      if (!profile.basic.name) errors.push('缺少 basic.name');
      if (!profile.basic.title) errors.push('缺少 basic.title');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// 创建单例实例
export const validator = new DataValidator();

export default DataValidator;
