/**
 * wot-ui-plus 组件库主入口文件
 *
 * 该文件作为 wot-ui-plus 组件库的统一入口，导出核心功能模块和工具类，
 * 提供便捷的 API 访问方式，支持 Vue3 + TypeScript 开发环境，适配 uni-app 多端开发场景。
 *
 * 主要功能包括：
 * - 反馈类组件的函数式调用 API (Toast、Message、Notify)
 * - 工具函数和工具类 (CommonUtil、clickOut)
 * - 日期时间处理 (dayjs)
 * - 国际化支持 (locale)
 * - 组件主题配置类型定义 (ConfigProviderThemeVars)
 *
 * 组件库特点：
 * - 基于 Vue 3 Composition API 设计，支持函数式调用和组件式使用
 * - 完整的 TypeScript 类型支持，确保开发时的类型检查和自动补全
 * - 适配 uni-app 多端开发（H5、App、小程序等），提供一致的开发体验
 * - 提供函数式 API 和组件式两种使用方式，满足不同场景的需求
 */

/**
 * 轻提示组件的函数式调用 API
 * 用于显示简短的操作反馈提示，支持多种类型（成功、错误、警告、信息、加载）
 *
 * @example
 * import { useToast } from '@/uni_modules/wot-ui-plus'
 * const toast = useToast()
 * toast.show('提示信息') // 显示普通提示
 * toast.success('操作成功') // 显示成功提示
 * toast.error('操作失败') // 显示错误提示
 * toast.loading('加载中...') // 显示加载提示
 */
export { useToast } from './components/wd-toast'

/**
 * 消息对话框组件的函数式调用 API
 * 用于显示确认对话框、提示对话框和输入对话框
 *
 * @example
 * import { useMessage } from '@/uni_modules/wot-ui-plus'
 * const message = useMessage()
 *
 * // 显示确认对话框
 * message.confirm('确定要删除吗？')
 *   .then(() => console.log('用户确认删除'))
 *   .catch(() => console.log('用户取消操作'))
 *
 * // 显示提示对话框
 * message.alert('操作成功')
 *
 * // 显示输入对话框
 * message.prompt('请输入您的姓名')
 *   .then(input => console.log('用户输入:', input))
 */
export { useMessage } from './components/wd-message-box'

/**
 * 导出所有组合式函数
 * 包含组件库提供的所有 Composition API 函数集合
 */
export * from './components/composables'

/**
 * 顶部/底部通知组件及相关方法
 * 用于显示顶部或底部的通知消息，支持多种类型和自定义样式
 *
 * @example
 * import { useNotify, showNotify, closeNotify } from '@/uni_modules/wot-ui-plus'
 * const { showNotify, closeNotify } = useNotify()
 * showNotify('通知内容')
 * closeNotify() // 关闭通知
 */
export * from './components/wd-notify'

/**
 * 日期时间处理库，基于 dayjs 定制
 * 提供日期时间的解析、格式化、计算等功能
 *
 * @example
 * import { dayjs } from '@/uni_modules/wot-ui-plus'
 * const formattedDate = dayjs().format('YYYY-MM-DD') // 当前日期
 * const tomorrow = dayjs().add(1, 'day') // 明天
 */
export { default as dayjs } from './dayjs'

/**
 * 通用工具类，提供各种辅助方法
 * 包含常用的工具函数集合，如类型判断、DOM操作辅助等
 */
export * as CommonUtil from './components/common/util'

/**
 * 点击外部区域触发回调的工具函数
 * 用于实现点击元素外部触发特定操作的功能
 *
 * @example
 * import { clickOut } from '@/uni_modules/wot-ui-plus'
 * // 在组件中使用点击外部区域关闭弹窗等功能
 */
export * as clickOut from './components/common/clickoutside'

/**
 * 国际化处理模块，支持多语言切换
 * 提供应用程序的国际化功能，包括语言包管理和切换
 */
export * from './locale'

/**
 * 主题配置变量类型定义
 * 用于 TypeScript 项目中配置主题变量时提供类型提示
 *
 * @example
 * import type { ConfigProviderThemeVars } from '@/uni_modules/wot-ui-plus'
 *
 * const themeVars: ConfigProviderThemeVars = {
 *   buttonPrimaryColor: '#07c160'
 * }
 */
export type { ConfigProviderThemeVars } from './components/wd-config-provider/types'
