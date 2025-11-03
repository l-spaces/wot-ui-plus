import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeNumericProp, makeStringProp } from '../common/props'

export const waterfallProps = {
  ...baseProps,

  // 瀑布流数据
  modelValue: makeArrayProp<[]>(),

  // 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
  // 单位ms
  addTime: makeNumericProp(200),

  // id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{id: 22, name: 'lisa'}
  idKey: makeStringProp('id'),

  // 瀑布流的列数，不可动态修改
  column: makeNumericProp(2)
}

export type waterfallProps = ExtractPropTypes<typeof waterfallProps>
