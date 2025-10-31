/**
 * @file useTranslate.ts
 * @description 国际化翻译组合式函数 - wot-ui-plus组件库国际化核心模块
 *
 * 项目架构作用：
 * - 为组件库提供统一的国际化翻译解决方案
 * - 支持组件级别的命名空间隔离
 * - 实现动态消息查找和格式化
 *
 * 核心功能：
 * - 基于组件名称自动生成翻译键前缀
 * - 支持消息查找路径的动态解析
 * - 提供函数式消息格式化（支持参数传递）
 * - 实现优雅降级机制（未找到翻译时返回原始键）
 *
 * 使用场景：
 * - 组件内部文本的国际化翻译
 * - 动态生成的消息内容
 * - 需要参数化的翻译文本
 * - 多语言环境下的组件开发
 *
 * 技术特色：
 * - 基于 Vue 3 Composition API 设计
 * - 支持 TypeScript 类型安全
 * - 与 uniapp 多端开发框架兼容
 * - 高性能的消息查找机制
 *
 * @example
 * // 在组件中使用翻译函数
 * import { useTranslate } from './composables/useTranslate'
 *
 * // 创建组件级别的翻译函数
 * const { translate } = useTranslate('button')
 *
 * // 使用翻译函数
 * const text = translate('loading') // 查找 'button.loading' 键
 * const formatted = translate('greeting', 'John') // 支持参数传递
 *
 * @see {@link ../locale/index.ts Locale 国际化模块}
 * @see {@link ../common/util.ts 工具函数模块}
 *
 * @author wot-design-uni 组件库团队
 * @version 1.0.0
 * @since 2023
 */

import { camelCase, getPropByPath, isDef, isFunction } from '../common/util'
import Locale from '../../locale'

/**
 * 创建国际化翻译函数
 * @description 基于组件名称生成具有命名空间隔离的翻译函数，支持动态消息查找和格式化
 *
 * 核心逻辑：
 * - 将组件名称转换为驼峰命名法作为翻译键前缀
 * - 创建闭包函数缓存前缀，避免重复计算
 * - 返回包含翻译函数的对象，便于组件使用
 *
 * @param {string} [name] - 组件名称（可选），用于生成翻译键前缀
 * @returns {Object} 包含翻译函数的对象
 * @returns {Function} returns.translate - 翻译函数，用于查找和格式化消息
 *
 * @example
 * // 创建无前缀的翻译函数（全局翻译）
 * const { translate } = useTranslate()
 * const text = translate('common.loading') // 查找 'common.loading' 键
 *
 * // 创建组件级别的翻译函数
 * const { translate } = useTranslate('button')
 * const text = translate('loading') // 查找 'button.loading' 键
 * const formatted = translate('greeting', 'John') // 支持参数传递
 *
 * // 在 Vue 组件中使用
 * export default {
 *   setup() {
 *     const { translate } = useTranslate('my-component')
 *     return { translate }
 *   }
 * }
 *
 * @see {@link ../common/util.ts#camelCase camelCase 工具函数}
 */
export const useTranslate = (name?: string) => {
  // 关键逻辑：基于组件名称生成翻译键前缀
  // 使用 camelCase 工具函数确保命名一致性，例如 'my-component' -> 'myComponent'
  // 如果未提供组件名称，则使用空前缀（全局翻译）
  const prefix = name ? camelCase(name) + '.' : ''

  /**
   * 翻译函数 - 核心消息查找和格式化逻辑
   * @description 根据翻译键查找对应的消息，支持函数式消息格式化
   *
   * 实现思路：
   * 1. 获取当前语言环境的全部消息对象
   * 2. 使用路径查找算法定位目标消息
   * 3. 根据消息类型进行不同处理：
   *    - 函数类型：执行函数并传递参数（支持动态格式化）
   *    - 已定义值：直接返回值（静态文本）
   *    - 未定义值：返回原始键（优雅降级）
   *
   * @param {string} key - 翻译键，用于在消息对象中查找对应翻译
   * @param {...unknown[]} args - 可变参数，用于函数式消息的格式化
   * @returns {string} 翻译后的消息文本或原始键（未找到时）
   *
   * @example
   * // 静态消息查找
   * translate('loading') // 返回 '加载中...'
   *
   * // 函数式消息格式化
   * translate('greeting', 'John') // 返回 '你好，John！'
   *
   * // 未找到翻译时的优雅降级
   * translate('unknown.key') // 返回 'unknown.key'
   *
   * @see {@link ../locale/index.ts#Locale.messages Locale.messages 方法}
   * @see {@link ../common/util.ts#getPropByPath getPropByPath 工具函数}
   */
  const translate = (key: string, ...args: unknown[]) => {
    // 关键逻辑：获取当前语言环境的全部消息对象
    // 支持动态语言切换，每次调用都获取最新的消息配置
    const currentMessages = Locale.messages()

    // 关键逻辑：使用路径查找算法定位目标消息
    // 组合前缀和键形成完整路径，例如 'button.loading'
    const message = getPropByPath(currentMessages, prefix + key)

    // 关键逻辑：根据消息类型进行智能处理
    // 优先处理函数类型消息（支持参数化），然后是静态消息，最后是优雅降级
    return isFunction(message) ? message(...args) : isDef(message) ? message : `${prefix}${key}`
  }

  // 返回包含翻译函数的对象，便于组件解构使用
  return { translate }
}
