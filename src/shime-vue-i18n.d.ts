/**
 * Vue I18n 类型声明扩展文件
 * 用于增强 vue-i18n 在 TypeScript 环境下的类型支持
 * 提供更精确的类型定义，确保国际化功能在开发过程中获得完整的类型提示
 */

// 从 vue-i18n 导入必要的类型
import { Composer, ComponentCustomProperties } from 'vue-i18n'

/**
 * 扩展 vue-i18n 模块的类型定义
 * 通过声明合并，为 Composer 接口添加或修改方法签名
 * 确保 t 函数在 TypeScript 中获得正确的类型支持
 */
declare module 'vue-i18n' {
  /**
   * 扩展 Composer 接口
   * Composer 是 vue-i18n 中处理国际化的核心接口
   * 此扩展确保 t 函数可以接受字符串或数字作为键，并支持任意数量的参数
   */
  export declare interface Composer {
    /**
     * 翻译函数，用于获取指定键的国际化文本
     *
     * @param key 翻译键名，可以是字符串或数字
     * @param args 可选的格式化参数，用于动态替换翻译文本中的占位符
     * @returns 翻译后的文本字符串
     */
    t(key: string | number, ...args: any[]): string
  }
}
