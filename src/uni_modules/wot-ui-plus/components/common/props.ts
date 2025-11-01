/**
 * 通用Props定义工具模块
 *
 * 该模块提供了一系列工具函数，用于简化Vue组件中props的定义过程。
 * 它遵循类型安全的原则，为组件库中的所有组件提供标准化的props创建方式。
 *
 * 核心功能：
 * - 提供各种类型的props创建函数，包括字符串、数字、布尔值、数组等
 * - 支持泛型参数，确保类型安全
 * - 定义基础props集合，包含所有组件共用的属性
 * - 支持必需属性的定义
 *
 * 使用场景：
 * - 在组件定义中快速创建标准化的props配置
 * - 确保整个组件库中props定义的一致性
 * - 简化TypeScript类型与Vue props的映射
 */

import type { PropType } from 'vue'

/**
 * 未知类型的属性定义
 * 用于需要接受任意类型值的props
 */
export const unknownProp = null as unknown as PropType<unknown>

/**
 * 数值类型的属性定义
 * 同时支持Number和String两种类型的输入
 * 用于需要同时接受数字和数字字符串的场景，如宽度、高度等
 */
export const numericProp = [Number, String]

/**
 * 布尔真值属性定义
 * 类型为Boolean，默认值为true
 * 用于开关类属性，如visible、active等
 */
export const truthProp = {
  type: Boolean,
  default: true as const
}

/**
 * 创建必需的属性定义
 *
 * @param type 属性的类型
 * @returns 包含type和required的属性配置对象
 * @example
 * const props = {
 *   id: makeRequiredProp(String)
 * }
 */
export const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true as const
})

/**
 * 创建数组类型的属性定义
 *
 * @returns 类型为Array，默认值为空数组的属性配置对象
 * @example
 * const props = {
 *   items: makeArrayProp<Item>()
 * }
 */
export const makeArrayProp = <T>() => ({
  type: Array as PropType<T[]>,
  default: () => []
})

/**
 * 创建可选数组类型的属性定义
 *
 * @returns 类型为Array，默认值为undefined的属性配置对象
 * @example
 * const props = {
 *   items: makeUnArrayProp<Item>()
 * }
 */
export const makeUnArrayProp = <T>() => ({
  type: Array as PropType<T[]>,
  default: () => undefined
})

/**
 * 创建布尔类型的属性定义
 *
 * @param defaultVal 默认值
 * @returns 类型为Boolean，带有默认值的属性配置对象
 * @example
 * const props = {
 *   disabled: makeBooleanProp(false)
 * }
 */
export const makeBooleanProp = <T>(defaultVal: T) => ({
  type: Boolean,
  default: defaultVal
})

/**
 * 创建数字类型的属性定义
 *
 * @param defaultVal 默认值
 * @returns 类型为Number，带有默认值的属性配置对象
 * @example
 * const props = {
 *   size: makeNumberProp(16)
 * }
 */
export const makeNumberProp = <T>(defaultVal: T) => ({
  type: Number,
  default: defaultVal
})

/**
 * 创建数值类型的属性定义（同时支持Number和String）
 *
 * @param defaultVal 默认值
 * @returns 类型为[numericProp]，带有默认值的属性配置对象
 * @example
 * const props = {
 *   width: makeNumericProp('100%')
 * }
 */
export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal
})

/**
 * 创建字符串类型的属性定义
 *
 * @param defaultVal 默认值
 * @returns 类型为String，带有默认值的属性配置对象
 * @example
 * const props = {
 *   type: makeStringProp('primary')
 * }
 */
export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

/**
 * 创建函数类型的属性定义
 *
 * @returns 类型为Function，默认值为undefined的属性配置对象
 * @example
 * const props = {
 *   loadNode: makeFunctionProp()
 * }
 */
export const makeFunctionProp = <T>() => ({
  type: Function,
  default: () => null
})

/**
 * 基础属性集合
 * 包含所有组件共用的基础属性
 *
 * @property customStyle 自定义根节点样式
 * @property customClass 自定义根节点样式类
 */
export const baseProps = {
  /**
   * 自定义根节点样式
   * 可以是字符串形式的内联样式，如'margin: 10px; color: red;'
   */
  customStyle: makeStringProp(''),
  /**
   * 自定义根节点样式类
   * 可以是一个或多个CSS类名，如'custom-class1 custom-class2'
   */
  customClass: makeStringProp('')
}
