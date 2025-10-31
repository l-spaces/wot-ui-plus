/**
 * uni-app 环境下的 Vue 类型声明扩展文件
 *
 * 此文件主要用于：
 * 1. 扩展 Vue 的类型定义，使其能够正确识别和支持 uni-app 框架提供的 API 和生命周期
 * 2. 为组件实例添加国际化翻译方法 $t 的类型支持
 * 3. 确保在 TypeScript 环境下，uni-app 与 Vue 3 的结合使用能够获得完整的类型检查和自动补全
 */

// 禁用空接口的 ESLint 检查，因为此处需要扩展接口而不添加新属性
/* eslint-disable @typescript-eslint/no-empty-interface */

// 导出空对象，确保这是一个模块文件，而不是全局脚本
export {}

// 声明并扩展 Vue 模块的类型定义
declare module 'vue' {
  /**
   * uni-app 应用实例和页面实例的联合类型
   *
   * 这个类型将 App.AppInstance（uni-app 应用实例）和 Page.PageInstance（uni-app 页面实例）
   * 的属性和方法合并在一起，为 Vue 组件提供完整的 uni-app API 支持。
   * 包括生命周期钩子（onLoad, onShow, onHide 等）和各种 API 方法。
   */
  type Hooks = App.AppInstance & Page.PageInstance

  /**
   * 扩展 Vue 组件选项接口，使其能够支持 uni-app 的生命周期钩子
   *
   * 通过继承 Hooks 类型，Vue 组件可以在选项中定义 uni-app 特有的生命周期方法，
   * 如 onLoad、onShow、onHide、onReady 等，这些方法在不同平台（小程序、H5、App）
   * 中都能正确执行并获得类型支持。
   */
  interface ComponentCustomOptions extends Hooks {}

  /**
   * 扩展 Vue 组件实例属性接口，添加国际化翻译方法 $t
   *
   * 为组件实例（this）添加 $t 方法的类型定义，使开发人员能够在组件中直接使用
   * this.$t('key') 调用国际化翻译功能，同时获得完整的类型检查和自动补全。
   */
  export interface ComponentCustomProperties {
    /**
     * 国际化翻译方法
     *
     * @param key 翻译键名，可以是字符串或数字
     * @param args 可选的格式化参数，可以是单个对象、数组或多个独立参数
     * @returns 翻译后的文本字符串
     */
    $t(key: string | number, ...args: any[]): string
  }
}
