import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp } from '../common/props'

export const subsectionProps = {
  ...baseProps,

  // 选项的数组
  options: {
    type: Array,
    default: () => []
  },
  // 初始化时默认选中的选项索引值
  value: {
    type: [String, Number],
    default: 0
  },
  // 激活时的颜色
  activeColor: {
    type: String,
    default: '#3c9cff' // #3c9cff
  },
  // 未激活的颜色
  inactiveColor: {
    type: String,
    default: '#303133' // #
  },
  // 模式选择，mode=button为按钮形式，mode=box 时为分段模式
  mode: {
    type: String as PropType<'button' | 'box'>,
    default: 'button'
  },
  // 字体大小
  fontSize: {
    type: [String, Number],
    default: 12
  },
  // 激活选项的字体是否加粗
  bold: {
    type: Boolean,
    default: true
  },
  // 组件背景颜色，mode为button时有效
  bgColor: {
    type: String,
    default: '#eeeeef' // #
  },
  // 从list元素对象中读取的键名
  keyName: {
    type: String,
    default: 'name'
  },
  // 选项的形状，可选值为 square 和 round
  shape: {
    type: String as PropType<'square' | 'round'>,
    default: 'square'
  },
  // 选项的高度
  height: {
    type: [String, Number],
    default: 35
  },
  // 选项的边框颜色，mode为button时有效
  barColor: {
    type: String,
    default: ''
  },
  // 是否禁用选项
  disabled: {
    type: Boolean,
    default: false
  },
  // 禁用选项的背景颜色
  disabledBgColor: {
    type: String,
    default: '#c0c4cc' // #
  },
  // 禁用选项的字体颜色
  disabledColor: {
    type: String,
    default: '#c0c4cc' // #
  },
  /**
   * 切换选项时是否振动
   * 类型: boolean
   * 默认值: false
   */
  vibrateShort: makeBooleanProp(false)
}

export type SubsectionProps = ExtractPropTypes<typeof subsectionProps>
