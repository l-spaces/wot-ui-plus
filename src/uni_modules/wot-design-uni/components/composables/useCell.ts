/**
 * 单元格组件逻辑钩子
 * @description 提供单元格组件(Cell)与单元格组组件(CellGroup)之间的父子关系处理
 * @example 在wd-input、wd-cell等组件中使用，用于获取父组件配置并决定是否显示底部边框
 */

// 导入Vue的computed函数，用于创建响应式计算属性
import { computed } from 'vue'
// 导入useParent组合式函数，用于获取父组件实例和索引信息
import { useParent } from './useParent'
// 导入CELL_GROUP_KEY注入键，用于识别CellGroup父组件
import { CELL_GROUP_KEY } from '../wd-cell-group/types'

/**
 * 单元格组件逻辑处理函数
 * @returns {Object} 包含border计算属性的对象
 */
export function useCell() {
  /**
   * 使用useParent获取父组件CellGroup实例和当前组件在子组件列表中的索引
   * - parent: 父组件CellGroup的实例，若不存在则为null
   * - index: 当前单元格在CellGroup子组件列表中的索引位置
   */
  const { parent: cellGroup, index } = useParent(CELL_GROUP_KEY)

  /**
   * 计算是否显示底部边框
   * @returns {boolean} 返回是否显示底部边框
   * @description 仅当满足以下所有条件时才显示底部边框：
   * 1. 存在父组件CellGroup实例
   * 2. 父组件CellGroup开启了边框显示(border=true)
   * 3. 当前单元格不是第一个子组件(index > 0)
   * 这种设计实现了单元格组中相邻单元格之间的分隔线，同时避免重复显示
   */
  const border = computed(() => {
    return cellGroup && cellGroup.props.border && index.value
  })

  // 返回计算属性供组件使用
  return { border }
}
