/**
 * @file index.ts
 * @description 国际化（i18n）核心模块 - wot-ui-plus组件库多语言支持系统
 *
 * 该模块为wot-ui-plus组件库提供完整的国际化支持，允许组件在不同语言环境下展示
 * 对应的文本内容。通过响应式设计，支持运行时动态切换语言，并提供了灵活的语言包
 * 扩展机制。
 *
 * 核心功能：
 * 1. 语言环境管理与切换
 * 2. 多语言消息存储与检索
 * 3. 语言包动态扩展与合并
 * 4. 当前语言状态响应式访问
 *
 * 技术设计：
 * - 采用Vue 3响应式API（ref/reactive）实现状态管理
 * - 使用深度合并算法实现语言包的增量更新
 * - 提供统一的接口设计，简化外部组件调用
 *
 * 主要使用场景：
 * - 组件库内部组件文本的国际化展示
 * - 支持开发者自定义语言包或扩展现有语言包
 * - 应用程序运行时动态切换界面语言
 *
 * 使用示例：
 * ```typescript
 * // 切换语言
 * import Locale from '@/uni_modules/wot-ui-plus/locale'
 *
 * // 切换为英文
 * Locale.use('en-US')
 *
 * // 添加新的语言包
 * Locale.add({
 *   'jp-JP': {
 *     calendar: {
 *       placeholder: '選択してください',
 *       // 其他翻译...
 *     }
 *   }
 * })
 * ```
 *
 */
import { reactive, ref } from 'vue'
import zhCN from './lang/zh-CN'
import { deepAssign } from '../components/common/util'

/**
 * 语言消息类型定义
 * @typedef {Record<string, any>} Message 单个语言环境下的消息对象
 */
type Message = Record<string, any>

/**
 * 多语言消息集合类型定义
 * @typedef {Record<string, Message>} Messages 包含多个语言环境的消息集合
 */
type Messages = Record<string, Message>

/**
 * 当前语言环境响应式引用
 * @type {import('vue').Ref<string>}
 * @private
 */
const lang = ref<string>('zh-CN')

/**
 * 多语言消息存储对象
 * @type {import('vue').Reactive<Messages>}
 * @private
 */
const messages = reactive<Messages>({
  'zh-CN': zhCN
})

/**
 * 国际化核心对象
 * 提供语言环境管理、消息获取和语言包扩展功能
 */
export const Locale = {
  /**
   * 获取当前语言环境下的消息对象
   *
   * @returns {Message} 当前语言环境的消息对象
   *
   * @example
   * const messages = Locale.messages()
   * const calendarTitle = messages.calendar.title // 获取日历组件标题
   */
  messages(): Message {
    return messages[lang.value]
  },

  /**
   * 切换语言环境
   *
   * @param {string} newLang 新的语言环境代码，如'en-US'、'zh-CN'
   * @param {Message} [newMessage] 可选的新语言消息对象，用于在切换的同时添加语言包
   *
   * @example
   * // 切换到英文
   * Locale.use('en-US')
   *
   * // 切换到自定义语言并同时添加语言包
   * Locale.use('custom-lang', {
   *   button: {
   *     confirm: '确认',
   *     cancel: '取消'
   *   }
   * })
   */
  use(newLang: string, newMessage?: Message) {
    // 更新当前语言环境
    lang.value = newLang

    // 如果提供了新消息对象，则添加到消息存储中
    if (newMessage) {
      this.add({ [newLang]: newMessage })
    }
  },

  /**
   * 添加或扩展语言包
   *
   * @param {Messages} [newMessages={}] 新的多语言消息集合，格式为 { 语言代码: 消息对象 }
   *
   * @example
   * // 添加新语言包
   * Locale.add({
   *   'fr-FR': {
   *     button: {
   *       confirm: 'Confirmer',
   *       cancel: 'Annuler'
   *     },
   *     // 其他组件翻译...
   *   },
   *   // 可同时添加多个语言包
   *   'de-DE': {
   *     // 德语翻译...
   *   }
   * })
   *
   * // 扩展现有语言包
   * Locale.add({
   *   'zh-CN': {
   *     // 扩展或覆盖现有翻译
   *     custom: {
   *       label: '自定义标签'
   *     }
   *   }
   * })
   */
  add(newMessages: Messages = {}) {
    // 使用深度合并算法，避免覆盖现有消息对象中未修改的部分
    deepAssign(messages, newMessages)
  }
}

/**
 * 获取当前语言环境的响应式引用
 * 可用于需要响应语言变化的场景，如在组件内部监听语言变化
 *
 * @returns {import('vue').Ref<string>} 当前语言环境的响应式引用
 *
 * @example
 * import { useCurrentLang } from '@/uni_modules/wot-ui-plus/locale'
 *
 * // 在组件中使用
 * const currentLang = useCurrentLang()
 *
 * // 监听语言变化
 * import { watch } from 'vue'
 * watch(currentLang, (newLang) => {
 *   console.log('语言已切换为:', newLang)
 * })
 */
export const useCurrentLang = () => lang

/**
 * @module 国际化模块默认导出
 * 导出Locale对象作为默认模块，便于直接导入使用
 */
export default Locale
