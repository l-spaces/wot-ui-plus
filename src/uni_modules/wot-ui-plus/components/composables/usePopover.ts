/**
 * Popover 组件定位管理组合式函数
 *
 * 本文件是 wot-ui-plus 组件库的核心组合式函数，专门用于处理 Popover 组件的定位逻辑。
 * 通过计算目标元素和弹出层的位置关系，实现精确的定位和箭头方向控制。
 *
 * 核心功能：
 * - 支持 12 种不同的定位方向（top、bottom、left、right 及其 start/end 变体）
 * - 动态计算弹出层和箭头的样式和类名
 * - 支持多种偏移量配置（数字、数组、对象）
 * - 响应式获取 DOM 元素尺寸信息
 *
 * 设计思路：
 * - 采用组合式 API 设计，便于在多个组件中复用
 * - 通过 Map 数据结构管理不同定位方向的样式配置
 * - 使用异步方式获取 DOM 尺寸，确保计算准确性
 * - 提供灵活的偏移量处理机制
 *
 * 主要对外接口：
 * - popStyle: 弹出层样式字符串
 * - arrowStyle: 箭头样式字符串
 * - arrowClass: 箭头类名字符串
 * - init(): 初始化函数
 * - control(): 定位控制函数
 *
 * 使用注意事项：
 * - 需要在组件挂载后调用 init 函数进行初始化
 * - control 函数应在位置变化时调用
 * - 依赖 getRect 工具函数获取 DOM 尺寸信息
 * - 需要确保目标元素和弹出层元素已正确渲染
 */

import { getCurrentInstance, ref } from 'vue'
import { getRect, isObj } from '../common/util'

/**
 * Popover 定位管理组合式函数
 *
 * @param visibleArrow - 是否显示箭头，默认为 true
 * @returns 返回包含样式、类名和控制方法的对象
 *
 * @example
 * ```typescript
 * const { popStyle, arrowStyle, init, control } = usePopover(true)
 *
 * // 在组件挂载后初始化
 * onMounted(() => {
 *   init('top-start', true, 'popover')
 * })
 *
 * // 当位置或偏移量变化时调用
 * control('top-start', [10, 20])
 * ```
 */
export function usePopover(visibleArrow = true) {
  // Vue 实例代理，用于访问组件上下文
  const { proxy } = getCurrentInstance() as any

  // 响应式样式和类名变量
  const popStyle = ref<string>('') // 弹出层样式字符串
  const arrowStyle = ref<string>('') // 箭头样式字符串
  const showStyle = ref<string>('') // 显示样式字符串（预留）
  const arrowClass = ref<string>('') // 箭头类名字符串

  // 尺寸相关响应式变量
  const popWidth = ref<number>(0) // 弹出层宽度
  const popHeight = ref<number>(0) // 弹出层高度
  const left = ref<number>(0) // 目标元素左边界位置
  const bottom = ref<number>(0) // 目标元素底部位置
  const width = ref<number>(0) // 目标元素宽度
  const height = ref<number>(0) // 目标元素高度
  const top = ref<number>(0) // 目标元素顶部位置

  /**
   * 空操作函数，用于占位或默认回调
   */
  function noop() {}

  /**
   * 初始化 Popover 定位系统
   *
   * 该函数负责初始化箭头类名和获取目标元素及弹出层的尺寸信息。
   * 需要在组件挂载后调用，确保 DOM 元素已正确渲染。
   *
   * @param placement - 定位方向，支持 12 种定位变体
   * @param visibleArrow - 是否显示箭头
   * @param selector - 组件选择器前缀，用于生成 CSS 类名
   *
   * @example
   * ```typescript
   * // 在组件挂载后调用
   * onMounted(() => {
   *   init('top-start', true, 'popover')
   * })
   * ```
   */
  function init(
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end',
    visibleArrow: boolean,
    selector: string
  ) {
    // 初始化箭头类名 - 根据定位方向生成对应的 CSS 类名
    if (visibleArrow) {
      const arrowClassArr = [
        `wd-${selector}__arrow`, // 基础箭头类名
        placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end' ? `wd-${selector}__arrow-up` : '', // 底部定位：箭头向上
        placement === 'left' || placement === 'left-start' || placement === 'left-end' ? `wd-${selector}__arrow-right` : '', // 左侧定位：箭头向右
        placement === 'right' || placement === 'right-start' || placement === 'right-end' ? `wd-${selector}__arrow-left` : '', // 右侧定位：箭头向左
        placement === 'top' || placement === 'top-start' || placement === 'top-end' ? `wd-${selector}__arrow-down` : '' // 顶部定位：箭头向下
      ]
      arrowClass.value = arrowClassArr.join(' ')
    }

    // 获取目标元素尺寸信息 - 用于后续定位计算
    getRect('#target', false, proxy).then((rect) => {
      if (!rect) return
      left.value = rect.left as number // 目标元素左边界位置
      bottom.value = rect.bottom as number // 目标元素底部位置
      width.value = rect.width as number // 目标元素宽度
      height.value = rect.height as number // 目标元素高度
      top.value = rect.top as number // 目标元素顶部位置
    })

    // 获取弹出层尺寸信息 - 通过透明度方式在初始化时获取尺寸
    getRect('#pos', false, proxy).then((rect) => {
      if (!rect) return
      popWidth.value = rect.width as number // 弹出层宽度
      popHeight.value = rect.height as number // 弹出层高度
    })
  }

  /**
   * 控制 Popover 定位和样式
   *
   * 这是核心定位计算函数，根据目标元素位置、弹出层尺寸和定位方向，
   * 精确计算弹出层和箭头的样式。支持多种偏移量配置方式。
   *
   * @param placement - 定位方向，支持 12 种定位变体
   * @param offset - 偏移量配置，支持数字、数组或对象格式
   *
   * @example
   * ```typescript
   * // 数字偏移量
   * control('top-start', 10)
   *
   * // 数组偏移量 [x, y]
   * control('top-start', [10, 20])
   *
   * // 对象偏移量 {x: 10, y: 20}
   * control('top-start', {x: 10, y: 20})
   * ```
   */
  function control(
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end',
    offset: number | number[] | Record<'x' | 'y', number>
  ) {
    // 箭头尺寸计算 - 根据是否显示箭头决定尺寸
    const arrowSize = visibleArrow ? 9 : 0

    // 基础定位计算 - 计算不同方向的基准位置
    const verticalX = width.value / 2 // 上下定位：水平居中位置
    const verticalY = arrowSize + height.value + 5 // 上下定位：垂直偏移（包含箭头和间距）
    const horizontalX = width.value + arrowSize + 5 // 左右定位：水平偏移（包含箭头和间距）
    const horizontalY = height.value / 2 // 左右定位：垂直居中位置

    // 偏移量处理 - 支持多种格式的偏移量配置
    let offsetX = 0
    let offsetY = 0

    if (Array.isArray(offset)) {
      // 数组格式：[x, y] 或 [x]（y 使用 x 的值）
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset[0] // X 轴偏移，考虑边界保护
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + (offset[1] ? offset[1] : offset[0]) // Y 轴偏移
    } else if (isObj(offset)) {
      // 对象格式：{x: number, y: number}
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset.x
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset.y
    } else {
      // 数字格式：统一应用于 X 和 Y 轴
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset
    }

    // 定位配置映射 - 使用 Map 管理所有定位方向的样式规则
    const placements = new Map([
      // 顶部定位组
      ['top', [`left: ${verticalX}px; bottom: ${verticalY}px; transform: translateX(-50%);`, 'left: 50%;']], // 顶部居中
      [
        'top-start', // 顶部起始位置
        [
          `left: ${offsetX}px; bottom: ${verticalY}px;`, // 弹出层样式
          `left: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px;` // 箭头样式
        ]
      ],
      [
        'top-end', // 顶部结束位置
        [
          `right: ${offsetX}px; bottom: ${verticalY}px;`,
          `right: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px; transform: translateX(50%);`
        ]
      ],

      // 底部定位组
      ['bottom', [`left: ${verticalX}px; top: ${verticalY}px; transform: translateX(-50%);`, 'left: 50%;']], // 底部居中
      [
        'bottom-start', // 底部起始位置
        [`left: ${offsetX}px; top: ${verticalY}px;`, `left: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px;`]
      ],
      [
        'bottom-end', // 底部结束位置
        [
          `right: ${offsetX}px; top: ${verticalY}px;`,
          `right: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px; transform: translateX(50%);`
        ]
      ],

      // 左侧定位组
      ['left', [`right: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, 'top: 50%']], // 左侧居中
      [
        'left-start', // 左侧起始位置
        [
          `right: ${horizontalX}px; top: ${offsetY}px;`,
          `top: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px;`
        ]
      ],
      [
        'left-end', // 左侧结束位置
        [
          `right: ${horizontalX}px; bottom: ${offsetY}px;`,
          `bottom: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px; transform: translateY(50%);`
        ]
      ],

      // 右侧定位组
      ['right', [`left: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, 'top: 50%']], // 右侧居中
      [
        'right-start', // 右侧起始位置
        [
          `left: ${horizontalX}px; top: ${offsetY}px;`,
          `top: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px;`
        ]
      ],
      [
        'right-end', // 右侧结束位置
        [
          `left: ${horizontalX}px; bottom: ${offsetY}px;`,
          `bottom: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px; transform: translateY(50%);`
        ]
      ]
    ])

    // 应用计算得到的样式
    popStyle.value = placements.get(placement)![0] // 设置弹出层样式
    arrowStyle.value = placements.get(placement)![1] // 设置箭头样式
  }

  // 返回所有响应式变量和控制方法，供组件使用
  return {
    popStyle, // 弹出层样式字符串
    arrowStyle, // 箭头样式字符串
    showStyle, // 显示样式字符串（预留）
    arrowClass, // 箭头类名字符串
    init, // 初始化函数
    control, // 定位控制函数
    noop // 空操作函数
  }
}
