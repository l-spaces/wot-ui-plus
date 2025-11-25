/**
 * @file useTouch.ts
 * @description 触摸事件处理组合式函数 - wot-ui-plus组件库触摸交互核心模块
 *
 * 项目架构作用：
 * - 为组件库提供统一的触摸事件处理解决方案
 * - 封装触摸交互的核心逻辑，包括方向判断、位移计算等
 * - 支持移动端触摸手势的识别和处理
 *
 * 核心功能：
 * - 触摸开始事件处理：记录初始触摸位置，重置状态变量
 * - 触摸移动事件处理：计算位移距离和方向判断
 * - 方向识别：自动判断水平或垂直滑动方向
 * - 位移跟踪：实时跟踪X轴和Y轴的位移变化
 *
 * 使用场景：
 * - 滑动组件（如Tabs、Swiper）的触摸交互
 * - 键盘按键的触摸反馈效果
 * - 拖拽组件的触摸事件处理
 * - 需要识别滑动方向的移动端交互
 *
 * 技术特色：
 * - 基于 Vue 3 Composition API 设计
 * - 响应式状态管理，支持实时状态更新
 * - 高性能的触摸事件处理算法
 * - 与 uniapp 多端开发框架兼容
 *
 * @example
 * // 在组件中使用触摸处理函数
 * import { useTouch } from './composables/useTouch'
 *
 * // 创建触摸处理实例
 * const touch = useTouch()
 *
 * // 绑定触摸事件到DOM元素
 * <div
 *   @touchstart="touch.touchStart"
 *   @touchmove="touch.touchMove"
 *   @touchend="handleTouchEnd"
 * >
 *   <!-- 内容 -->
 * </div>
 *
 * // 根据方向进行不同处理
 * function handleTouchEnd() {
 *   if (touch.direction.value === 'horizontal') {
 *     // 处理水平滑动
 *   } else if (touch.direction.value === 'vertical') {
 *     // 处理垂直滑动
 *   }
 * }
 *
 * @see {@link ../wd-tabs/wd-tabs.vue Tabs组件使用示例}
 * @see {@link ../wd-keyboard/key/index.vue 键盘按键使用示例}
 * @see {@link ../tests/composables/useTouch.test.ts 单元测试示例}
 *
 * @author wot-ui-plus 组件库团队
 * @version 1.0.0
 * @since 2023
 */

import { ref } from 'vue'

/**
 * 触摸事件处理组合式函数
 * 提供触摸交互的核心功能，包括方向判断、位移计算等
 *
 * @returns {Object} 触摸处理对象，包含状态变量和处理函数
 * @returns {import('vue').Ref<string>} direction - 滑动方向：'horizontal'（水平）、'vertical'（垂直）或空字符串
 * @returns {import('vue').Ref<number>} deltaX - X轴位移距离（有符号，表示方向）
 * @returns {import('vue').Ref<number>} deltaY - Y轴位移距离（有符号，表示方向）
 * @returns {import('vue').Ref<number>} offsetX - X轴绝对位移距离（无符号）
 * @returns {import('vue').Ref<number>} offsetY - Y轴绝对位移距离（无符号）
 * @returns {import('vue').Ref<number>} startX - 触摸开始时的X坐标
 * @returns {import('vue').Ref<number>} startY - 触摸开始时的Y坐标
 * @returns {Function} touchStart - 触摸开始事件处理函数
 * @returns {Function} touchMove - 触摸移动事件处理函数
 *
 * @example
 * // 基本使用
 * const touch = useTouch()
 *
 * // 在组件模板中绑定事件
 * <div
 *   @touchstart="touch.touchStart"
 *   @touchmove="touch.touchMove"
 * >
 *   可触摸区域
 * </div>
 *
 * // 监听方向变化
 * watch(touch.direction, (newDirection) => {
 *   if (newDirection === 'horizontal') {
 *     console.log('检测到水平滑动')
 *   }
 * })
 *
 * @description 该函数实现了触摸事件的核心处理逻辑，主要功能包括：
 * 1. 触摸开始事件处理：记录初始触摸位置，重置所有状态变量
 * 2. 触摸移动事件处理：实时计算位移距离和判断滑动方向
 * 3. 方向自动识别：基于位移距离自动判断水平或垂直滑动
 * 4. 位移精确跟踪：提供有符号位移（方向信息）和无符号位移（距离信息）
 */
export function useTouch() {
  const direction = ref<string>('')
  const deltaX = ref<number>(0)
  const deltaY = ref<number>(0)
  const offsetX = ref<number>(0)
  const offsetY = ref<number>(0)
  const startX = ref<number>(0)
  const startY = ref<number>(0)

  /**
   * 触摸开始事件处理函数
   * 记录触摸起始位置并重置所有状态变量，为后续触摸移动计算做准备
   *
   * @param {TouchEvent} event - 触摸事件对象
   * @param {TouchList} event.touches - 触摸点列表
   *
   * @example
   * // 在组件模板中使用
   * <div @touchstart="touch.touchStart">
   *   可触摸区域
   * </div>
   *
   * // 或者手动调用
   * element.addEventListener('touchstart', touch.touchStart)
   *
   * @description 该函数执行以下操作：
   * 1. 获取第一个触摸点的坐标信息
   * 2. 重置滑动方向为初始状态（空字符串）
   * 3. 重置所有位移相关变量为0
   * 4. 记录触摸起始位置，用于后续位移计算
   */
  function touchStart(event: any) {
    // 获取第一个触摸点的坐标信息
    const touch = event.touches[0]

    // 重置滑动方向状态
    direction.value = ''

    // 重置有符号位移变量（包含方向信息）
    deltaX.value = 0
    deltaY.value = 0

    // 重置无符号位移变量（绝对距离）
    offsetX.value = 0
    offsetY.value = 0

    // 记录触摸起始位置，用于后续位移计算
    startX.value = touch.clientX
    startY.value = touch.clientY
  }

  /**
   * 触摸移动事件处理函数
   * 计算触摸点的位移距离并自动判断滑动方向
   *
   * @param {TouchEvent} event - 触摸事件对象
   * @param {TouchList} event.touches - 触摸点列表
   *
   * @example
   * // 在组件模板中使用
   * <div @touchmove="touch.touchMove">
   *   可触摸区域
   * </div>
   *
   * // 或者手动调用
   * element.addEventListener('touchmove', touch.touchMove)
   *
   * @description 该函数执行以下操作：
   * 1. 获取当前触摸点坐标
   * 2. 计算相对于起始位置的位移距离（有符号）
   * 3. 计算绝对位移距离（无符号）
   * 4. 基于位移距离自动判断滑动方向（水平/垂直）
   *
   * 方向判断逻辑：
   * - 水平滑动：X轴位移绝对值 > Y轴位移绝对值
   * - 垂直滑动：X轴位移绝对值 < Y轴位移绝对值
   * - 相等时：保持空字符串（未确定方向）
   */
  function touchMove(event: any) {
    // 获取当前触摸点坐标
    const touch = event.touches[0]

    // 计算有符号位移距离（包含方向信息）
    // deltaX > 0 表示向右滑动，deltaX < 0 表示向左滑动
    // deltaY > 0 表示向下滑动，deltaY < 0 表示向上滑动
    deltaX.value = touch.clientX - startX.value
    deltaY.value = touch.clientY - startY.value

    // 计算绝对位移距离（无符号，用于方向判断）
    offsetX.value = Math.abs(deltaX.value)
    offsetY.value = Math.abs(deltaY.value)

    // 自动判断滑动方向
    // 水平滑动：X轴位移绝对值大于Y轴位移绝对值
    // 垂直滑动：X轴位移绝对值小于Y轴位移绝对值
    // 相等时保持空字符串（未确定方向）
    direction.value = offsetX.value > offsetY.value ? 'horizontal' : offsetX.value < offsetY.value ? 'vertical' : ''
  }

  return {
    touchStart,
    touchMove,
    direction,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    startX,
    startY
  }
}
