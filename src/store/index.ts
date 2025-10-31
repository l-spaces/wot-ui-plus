/**
 * @file index.ts
 * @description 全局状态管理模块
 * @description 该模块采用Vue3 Composition API风格实现状态管理，
 * @description 目前主要管理应用的深色模式状态，提供主题切换和持久化功能
 */

import { ref } from 'vue'

/**
 * 深色模式状态
 * @type {import('vue').Ref<boolean>}
 * @description 全局响应式状态，用于控制应用的深色/浅色主题切换
 */
const isDark = ref<boolean>(false)

/**
 * 设置深色模式状态
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
  process.env.NODE_ENV === 'development' && uni.setStorageSync('isDark', dark)
  // #endif

  // 条件编译：非H5平台（如小程序、App等）处理
  // #ifndef H5
  // 直接使用uni.setStorageSync存储状态
  uni.setStorageSync('isDark', dark)
  // #endif
}

/**
 * 深色模式管理Hook
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

  // 条件编译：H5平台初始化逻辑
  // #ifdef H5
  // 开发环境从本地存储读取，生产环境从vitepress主题设置读取
  process.env.NODE_ENV === 'development'
    ? setDark(Boolean(uni.getStorageSync('isDark')))
    : setDark(localStorage.getItem('vitepress-theme-appearance') === 'dark')
  // #endif

  // 条件编译：非H5平台初始化逻辑
  // #ifndef H5
  // 直接从本地存储读取主题设置
  setDark(Boolean(uni.getStorageSync('isDark')))
  // #endif

  // 返回响应式状态和更新方法
  return { isDark, setDark }
}
