import { type ExtractPropTypes, type InjectionKey, type PropType } from 'vue'
import { baseProps, makeNumericProp } from '../common/props'

export type SidebarProvide = {
  props: Partial<SidebarProps>
  setChange: (value: number | string, label: string) => void
}

export const SIDEBAR_KEY: InjectionKey<SidebarProvide> = Symbol('wd-sidebar')

/**
 * Sidebar切换前的选项接口
 */
export type SidebarBeforeChangeOption = {
  // 目标值
  value: number | string
  resolve: (pass: boolean) => void
}

/**
 * Sidebar切换前的钩子函数类型
 * @param option 切换选项
 */
export type SidebarBeforeChange = (option: SidebarBeforeChangeOption) => void

export const sidebarProps = {
  ...baseProps,
  /**
   * 当前导航项的索引
   */
  modelValue: makeNumericProp(0),
  /**
   * 在改变前执行的函数
   */
  beforeChange: Function as PropType<SidebarBeforeChange>
}

export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
