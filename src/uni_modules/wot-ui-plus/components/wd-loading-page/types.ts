import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

// 加载动画的模式，outline-圆形，ring-半圆形
export type LoadingType = 'outline' | 'ring'

export const loadingProps = {
  ...baseProps,

  /**
   * 提示内容
   */
  loadingText: makeStringProp('加载中'),
  /**
   * 自定义加载图标
   */
  image: makeStringProp(''),
  /**
   * outline-圆形，ring-半圆形
   */
  loadingMode: makeStringProp<LoadingType>('ring'),
  /**
   * 是否显示加载动画
   */
  loading: makeBooleanProp(false),
  /**
   * 背景颜色
   */
  bgColor: makeStringProp('#ffffff'),
  /**
   * 字体颜色
   */
  color: makeStringProp('#C8C8C8'),
  /**
   * 字体大小
   */
  fontSize: makeNumericProp(19),
  /**
   * 自定义加载图标大小
   */
  iconSize: makeNumericProp(28),
  /**
   * 加载动画颜色
   */
  loadingColor: makeStringProp('#C8C8C8'),
  /**
   * 加载动画层级
   */
  zIndex: makeNumericProp(10)
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
