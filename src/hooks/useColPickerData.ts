/**
 * 该文件是一个 Vue3 Composition API 风格的 Hook，封装了 @vant/area-data 库的数据，为项目中的 ColPicker 组件提供中国省市区级联选择功能。
 * 主要包含两个核心部分：
 * 1. 省市区级联数据 colPickerData
 * 2. 根据区域代码查找子区域的方法 findChildrenByCode
 * 在项目中主要用于地址选择、区域筛选等需要级联数据的场景，特别是与 wd-col-picker 组件配合使用。
 */

/**
 * @file useColPickerData.ts
 * @description 省市区选择器数据处理Hook
 * @description 该Hook封装了@vant/area-data库的数据，为ColPicker组件提供中国省市区级联选择功能
 * @description 主要用于地址选择、区域筛选等需要级联数据的场景
 */

import { useCascaderAreaData } from '@vant/area-data'

/**
 * 级联选项数据结构
 * @interface CascaderOption
 * @property {string} text - 选项显示文本，如省份名称、城市名称
 * @property {string} value - 选项值，对应区域代码
 * @property {CascaderOption[]} [children] - 子选项数组，实现多级级联
 */
export type CascaderOption = {
  text: string
  value: string
  children?: CascaderOption[]
}

/**
 * 省市区级联数据Hook
 * @function useColPickerData
 * @description 提供中国省市区级联数据及相关数据处理方法
 * @description 该Hook主要用于wd-col-picker组件的地址选择功能
 * @returns {Object} 返回省市区数据及查找方法
 * @returns {CascaderOption[]} return.colPickerData - 中国省市区级联数据
 * @returns {Function} return.findChildrenByCode - 根据区域代码查找子区域数据的方法
 */
export function useColPickerData() {
  // 从@vant/area-data库获取中国省市区级联数据
  // 数据结构为嵌套数组，包含省-市-区三级数据
  const colPickerData: CascaderOption[] = useCascaderAreaData()

  /**
   * 根据区域代码递归查找对应的子区域数据
   * @function findChildrenByCode
   * @param {CascaderOption[]} data - 待查询的级联数据
   * @param {string} [code] - 区域代码，不传则返回所有顶级数据（省份数据）
   * @returns {CascaderOption[] | null} 找到的子区域数据，如果未找到或没有子数据则返回null
   * @description 主要用于在用户选择上级区域后，动态加载下一级区域数据
   */
  function findChildrenByCode(data: CascaderOption[], code?: string): CascaderOption[] | null {
    // 如果未提供code，则返回传入的完整数据
    if (!code) {
      return data
    }

    // 遍历当前层级数据
    for (const item of data) {
      // 找到匹配的区域代码
      if (item.value === code) {
        // 返回该区域的子区域数据，如果没有子区域则返回null
        return item.children || null
      }

      // 如果当前项有子区域，则递归搜索
      if (item.children) {
        const childrenResult = findChildrenByCode(item.children, code)
        if (childrenResult) {
          return childrenResult
        }
      }
    }

    // 未找到匹配的区域代码
    return null
  }

  // 返回数据和方法供组件使用
  return { colPickerData, findChildrenByCode }
}
