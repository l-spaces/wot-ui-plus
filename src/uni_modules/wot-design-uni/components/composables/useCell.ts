/**
 * 单元格组件逻辑钩子 在wd-input、wd-cell等组件中使用，用于获取父组件配置并决定是否显示底部边框
 * @file useCell.ts
 * @description 提供单元格组件(Cell)与单元格组组件(CellGroup)之间的父子关系处理逻辑
 * @module composables/useCell
 *
 * 核心功能：
 * - 通过Vue依赖注入系统获取CellGroup父组件实例
 * - 计算当前单元格在父组件中的索引位置
 * - 根据父组件配置和位置信息决定是否显示底部边框
 *
 * 在wot-ui-plus组件库中的具体作用：
 * 1. 实现单元格组件与单元格组组件的联动机制
 * 2. 提供统一的边框显示控制逻辑
 * 3. 支持表单类组件的视觉一致性
 * 4. 为wd-input、wd-cell等组件提供基础功能支持
 *
 * 使用场景：
 * - 单元格组件(Cell)内部使用，用于获取父组件配置
 * - 表单组件中需要显示分隔线的场景
 * - 列表类组件中需要按位置控制样式的场景
 *
 * @example
 * // 在单元格组件中使用
 * import { useCell } from '@/uni_modules/wot-design-uni/components/composables/useCell'
 *
 * const { border } = useCell()
 * // border为true时显示底部边框，false时不显示
 *
 * @version 1.0.0
 * @author wot-design-uni
 */

// 导入Vue的computed函数，用于创建响应式计算属性
import { computed } from 'vue'
// 导入useParent组合式函数，用于获取父组件实例和索引信息
import { useParent } from './useParent'
// 导入CELL_GROUP_KEY注入键，用于识别CellGroup父组件
import { CELL_GROUP_KEY } from '../wd-cell-group/types'

/**
 * 单元格组件逻辑处理函数
 * @function useCell
 * @description 单元格组件的核心逻辑钩子，用于处理与父组件CellGroup的交互
 *
 * 实现思路：
 * 1. 依赖注入：通过CELL_GROUP_KEY注入键获取父组件CellGroup实例
 * 2. 组件注册：自动将当前组件实例注册到父组件的子组件列表中
 * 3. 索引计算：动态计算当前组件在父组件子组件列表中的位置
 * 4. 边框逻辑：基于父组件配置和组件位置决定是否显示底部边框
 *
 * 关键特性：
 * - 响应式：border属性为计算属性，随父组件状态变化自动更新
 * - 自动清理：组件卸载时自动从父组件中移除，避免内存泄漏
 * - 容错处理：无父组件时返回默认值，确保组件独立使用时的稳定性
 *
 * @returns {Object} 包含border计算属性的对象
 * @returns {import('vue').ComputedRef<boolean>} border - 是否显示底部边框的计算属性
 *
 * @example
 * // 在组件setup函数中使用
 * export default defineComponent({
 *   name: 'WdCell',
 *   setup() {
 *     const { border } = useCell()
 *
 *     return {
 *       border
 *     }
 *   }
 * })
 */
export function useCell() {
  /**
   * 使用useParent获取父组件CellGroup实例和当前组件在子组件列表中的索引
   * @description 通过Vue的依赖注入系统获取父组件信息
   *
   * 实现细节：
   * - 使用CELL_GROUP_KEY作为注入标识符
   * - 自动处理组件生命周期（注册和卸载）
   * - 提供响应式的索引位置信息
   *
   * @type {Object}
   * @property {CelllGroupProvide | null} cellGroup - 父组件CellGroup的实例，若不存在则为null
   * @property {import('vue').ComputedRef<number>} index - 当前单元格在CellGroup子组件列表中的索引位置
   */
  const { parent: cellGroup, index } = useParent(CELL_GROUP_KEY)

  /**
   * 计算是否显示底部边框
   * @description 基于父组件配置和当前组件位置决定边框显示逻辑
   *
   * 显示条件（需同时满足）：
   * 1. 存在父组件CellGroup实例（cellGroup不为null）
   * 2. 父组件CellGroup开启了边框显示（cellGroup.props.border为true）
   * 3. 当前单元格不是第一个子组件（index.value > 0）
   *
   * 设计原理：
   * - 避免重复显示：第一个单元格不显示顶部边框，最后一个单元格不显示底部边框
   * - 视觉一致性：确保相邻单元格之间有适当的分隔线
   * - 配置灵活性：支持在CellGroup级别统一控制边框显示
   *
   * @returns {boolean} 返回是否显示底部边框
   *
   * @example
   * // 当满足以下条件时显示边框：
   * // - 存在CellGroup父组件
   * // - CellGroup的border属性为true
   * // - 当前单元格不是第一个子项
   */
  const border = computed(() => {
    return cellGroup && cellGroup.props.border && index.value
  })

  /**
   * 返回计算属性供组件使用
   * @description 提供border计算属性给调用组件
   *
   * 使用方式：
   * - 在模板中直接使用：:class="{ 'is-border': border }"
   * - 在逻辑中判断：if (border.value) { ... }
   *
   * @returns {Object} 包含border计算属性的对象
   */
  return { border }
}
