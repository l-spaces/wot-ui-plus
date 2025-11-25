/**
 * @file index.ts
 * @description 全局状态管理模块
 * @description 该模块采用Vue3 Composition API风格实现状态管理，
 * @description 目前主要管理应用的深色模式状态，提供主题切换和持久化功能
 *
 * 全局状态管理模块 - wot-ui-plus 组件库主题状态管理
 *
 * 本文件是 wot-ui-plus 组件库的全局状态管理核心模块，负责：
 * 1. 管理应用深色/浅色主题模式的全局状态
 * 2. 提供主题状态的持久化存储和恢复功能
 * 3. 支持多端适配（H5、小程序、App等）的条件编译
 * 4. 实现基于 Vue 3 Composition API 的响应式状态管理
 *
 * 在项目架构中的作用：
 * - 作为组件库主题管理的核心枢纽
 * - 提供统一的主题状态管理接口
 * - 确保主题设置在多端环境下的正确性
 * - 支持开发和生产环境的不同配置策略
 *
 * 使用场景：
 * 1. 组件内部根据主题状态调整样式
 * 2. 用户手动切换深色/浅色主题
 * 3. 应用启动时自动恢复用户主题偏好
 * 4. 多端应用的主题一致性维护
 *
 * 技术特色：
 * - 采用 Vue 3 Composition API 现代编程范式
 * - 支持 uni-app 多端条件编译
 * - 实现状态持久化存储机制
 * - 提供类型安全的 TypeScript 支持
 *
 * 示例：
 * ```typescript
 * import { useDark } from '@/store'
 *
 * const { isDark, setDark } = useDark()
 * // 切换主题
 * setDark(!isDark.value)
 * ```
 */

import { ref } from 'vue'

/**
 * 深色模式状态响应式引用
 *
 * 功能描述：
 * 全局响应式状态变量，用于控制应用的主题模式（深色/浅色）
 *
 * 实现思路：
 * 1. 使用 Vue 3 的 ref 创建响应式布尔值
 * 2. 初始值为 false（默认浅色主题）
 * 3. 通过响应式系统实现状态变化的自动更新
 *
 * 关键特性：
 * - 响应式：状态变化自动触发依赖更新
 * - 类型安全：明确的 boolean 类型定义
 * - 全局共享：所有组件可访问同一状态实例
 *
 * @type {import('vue').Ref<boolean>}
 * @description 全局响应式状态，用于控制应用的深色/浅色主题切换
 */
const isDark = ref<boolean>(false)

/**
 * 设置深色模式状态
 *
 * 功能描述：
 * 更新深色模式状态并进行持久化存储，确保主题设置在多端环境下正确保存
 *
 * 实现思路：
 * 1. 更新响应式状态 isDark 的值
 * 2. 根据运行平台和环境进行条件编译存储
 * 3. H5 开发环境特殊处理，避免与生产环境冲突
 * 4. 非 H5 平台统一使用 uni.setStorageSync 存储
 *
 * 关键逻辑：
 * - 条件编译确保多端兼容性
 * - 开发/生产环境差异化处理
 * - 状态持久化保证用户体验连续性
 *
 * @function setDark
 * @param {boolean} dark - 是否启用深色模式
 * @description 更新深色模式状态并进行持久化存储
 * @description 在H5环境的开发模式和非H5环境下使用uni.setStorageSync存储
 * @description 状态持久化确保应用重启后仍能保持用户的主题偏好
 */
function setDark(dark: boolean) {
  // 更新响应式状态
  isDark.value = dark

  // 条件编译：H5平台特定处理
  // #ifdef H5
  // 开发环境使用uni.setStorageSync
  // 实现思路：H5开发环境避免与VitePress生产环境存储冲突
  // 仅在开发环境下使用uni存储，生产环境使用VitePress自有存储机制
  process.env.NODE_ENV === 'development' && uni.setStorageSync('isDark', dark)
  // #endif

  // 条件编译：非H5平台（如小程序、App等）处理
  // #ifndef H5
  // 直接使用uni.setStorageSync存储状态
  // 实现思路：小程序和App平台统一使用uni-app存储API
  // 确保主题设置在不同非H5平台上的持久化一致性
  uni.setStorageSync('isDark', dark)
  // #endif
}

/**
 * 深色模式管理Hook
 *
 * 功能描述：
 * 提供深色模式的初始化和管理功能，支持多端适配的主题状态管理
 *
 * 实现思路：
 * 1. 根据运行平台进行条件编译初始化
 * 2. H5平台区分开发和生产环境的不同初始化策略
 * 3. 非H5平台统一从本地存储读取主题设置
 * 4. 返回响应式状态和更新方法的组合对象
 *
 * 关键特性：
 * - 多端适配：支持H5、小程序、App等平台
 * - 环境感知：自动识别开发和生产环境
 * - 状态恢复：应用启动时自动恢复用户偏好
 * - 类型安全：完整的TypeScript类型定义
 *
 * @function useDark
 * @returns {Object} 返回深色模式相关状态和方法
 * @returns {import('vue').Ref<boolean>} return.isDark - 深色模式状态
 * @returns {Function} return.setDark - 设置深色模式的方法
 * @description 提供深色模式的初始化和管理功能
 * @description 在组件中通过该Hook获取和控制应用主题
 * @description 支持多端适配，在不同平台上正确初始化主题状态
 */
export function useDark() {
  // 初始化深色模式状态
  // 实现思路：根据运行平台和环境进行智能初始化

  // 条件编译：H5平台初始化逻辑
  // #ifdef H5
  // 开发环境从本地存储读取，生产环境从vitepress主题设置读取
  // 关键逻辑：H5平台区分开发和生产环境的初始化策略
  // - 开发环境：使用uni-app存储确保演示一致性
  // - 生产环境：集成VitePress主题系统实现无缝切换
  process.env.NODE_ENV === 'development'
    ? setDark(Boolean(uni.getStorageSync('isDark')))
    : setDark(localStorage.getItem('vitepress-theme-appearance') === 'dark')
  // #endif

  // 条件编译：非H5平台初始化逻辑
  // #ifndef H5
  // 直接从本地存储读取主题设置
  // 实现思路：小程序和App平台统一使用uni-app存储机制
  // 确保主题状态在非H5平台上的正确初始化和一致性
  setDark(Boolean(uni.getStorageSync('isDark')))
  // #endif

  // 返回响应式状态和更新方法
  // 实现思路：提供完整的主题管理接口，便于组件使用
  return { isDark, setDark }
}
