/**
 * 国际化配置文件
 *
 * 本文件是 wot-ui-plus 组件库的国际化核心配置文件，负责：
 * 1. 创建和管理 Vue I18n 实例
 * 2. 加载中英文语言包资源
 * 3. 提供统一的国际化消息翻译功能
 * 4. 支持本地存储的语言设置持久化
 * 5. 扩展 t 函数以支持多种参数格式
 *
 * 在项目架构中的作用：
 * - 作为组件库的国际化基础设施
 * - 为所有组件提供统一的文本翻译能力
 * - 支持多语言切换和本地化存储
 * - 简化国际化 API 的使用复杂度
 *
 * 使用场景：
 * 1. 组件内部文本的国际化翻译
 * 2. 用户界面语言切换功能
 * 3. 多语言应用开发支持
 * 4. 测试和演示环境的多语言展示
 *
 * 示例：
 * ```typescript
 * import i18n from '@/locale/index'
 * const { t } = i18n.global
 * console.log(t('button-title')) // 输出：按钮 或 Button
 * ```
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'
import Locale from '../uni_modules/wot-ui-plus/locale'
import WotEnUS from '../uni_modules/wot-ui-plus/locale/lang/en-US'

/**
 * 添加组件库英文语言包到国际化系统
 *
 * 功能描述：
 * 将 wot-ui-plus 组件库的英文语言包注册到全局国际化系统中，
 * 确保组件库的文本内容能够正确显示英文翻译
 */
Locale.add({ 'en-US': WotEnUS })

/**
 * 语言包消息映射配置
 *
 * 实现思路：
 * 1. 将导入的语言包 JSON 文件映射到对应的语言标识符
 * 2. 支持扩展更多语言包时只需添加新的映射项
 * 3. 为 Vue I18n 提供完整的消息数据结构
 */
const messages = {
  'zh-CN': {
    ...zhCN
  },
  'en-US': {
    ...enUS
  }
}

/**
 * 创建 Vue I18n 国际化实例
 *
 * 关键特性：
 * 1. 使用 modern 模式（legacy: false）支持 Vue 3 Composition API
 * 2. 动态设置当前语言基于用户偏好
 * 3. 集成中英文语言包资源
 * 4. 提供完整的国际化功能支持
 *
 * 配置说明：
 * - locale: 从本地存储获取当前语言设置，默认使用中文
 * - fallbackLocale: 设置回退语言为中文
 * - messages: 包含所有支持的语言包
 * - legacy: false 启用 Vue 3 现代模式
 */
const i18n = createI18n({
  locale: uni.getStorageSync('currentLang') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  legacy: false
})

/**
 * 配置组件库使用当前国际化实例
 *
 * 功能描述：
 * 将创建好的 i18n 实例应用到 wot-ui-plus 组件库中，
 * 确保组件库能够使用统一的国际化配置
 */
Locale.use(i18n.global.locale.value)

/**
 * 设置 uni-app 全局语言环境
 *
 * 功能描述：
 * 将当前选择的语言设置同步到 uni-app 框架的全局语言环境中，
 * 确保框架级别的国际化功能与组件库保持一致
 */
uni.setLocale(i18n.global.locale.value)

/**
 * 扩展 t 函数以支持多种参数格式和模板插值
 *
 * 功能扩展：
 * 1. 支持对象参数场景：t(key, {key1: value1, key2: value2})
 * 2. 支持数组参数场景：t(key, [arg1, arg2])
 * 3. 支持可变参数场景：t(key, arg1, arg2, ...)
 * 4. 支持模板字符串插值功能：{0}, {1} 等占位符替换
 *
 * 实现思路：
 * 1. 保存原始 t 函数引用
 * 2. 根据参数类型和数量进行智能路由处理
 * 3. 提供模板插值功能增强翻译灵活性
 */
const originalT = i18n.global.t
i18n.global.t = ((key: string | number, ...args: any[]) => {
  /**
   * 替换字符串中的占位符
   * @param template 模板字符串，如 "Hello {0}, welcome to {1}"
   * @param values 要替换的值数组
   * @returns 替换后的字符串
   */
  function interpolateTemplate(template: string, values: any[]): string {
    return template.replace(/{(\d+)}/g, (_, index) => values[index] ?? '')
  }

  // 处理对象参数场景: t(key, {key1: value1, key2: value2})
  if (args.length === 1 && typeof args[0] === 'object' && !Array.isArray(args[0])) {
    const result = originalT(key, ...args)
    return result
  }

  // 处理数组参数场景: t(key, [arg1, arg2])
  if (args.length === 1 && Array.isArray(args[0])) {
    const result = originalT(key, args[0])
    return interpolateTemplate(result, args[0])
  }

  // 处理可变参数场景: t(key, arg1, arg2, ...)
  if (args.length > 1 && args.every((arg) => typeof arg !== 'object')) {
    return interpolateTemplate(originalT(key, args), args)
  }

  // 处理默认场景: t(key) 或 t(key, defaultMessage) 或 t(key, plural) 等
  const result = originalT(key, ...args)

  return result
}) as typeof i18n.global.t

/**
 * 导出配置完成的 i18n 实例
 *
 * 该实例已包含：
 * 1. 中英文语言包支持
 * 2. 基于本地存储的语言设置
 * 3. 扩展的 t 函数 API
 * 4. Vue 3 Composition API 兼容性
 * 5. 组件库国际化集成
 * 6. uni-app 框架语言同步
 */
export default i18n
