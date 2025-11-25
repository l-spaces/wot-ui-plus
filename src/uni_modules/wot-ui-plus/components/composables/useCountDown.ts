/**
 * @file useCountDown.ts
 * @description 倒计时管理组合式函数
 *
 * 本文件提供了一个高性能、可配置的倒计时管理解决方案，基于 Vue 3 的组合式 API 实现。
 * 支持毫秒级和秒级两种精度模式，具备完整的生命周期管理和事件回调机制。
 *
 * 核心功能：
 * 1. 支持毫秒级和秒级两种倒计时精度
 * 2. 提供开始、暂停、重置等完整控制方法
 * 3. 支持倒计时变化和结束时的回调函数
 * 4. 自动处理组件卸载时的资源清理
 * 5. 基于 requestAnimationFrame 实现高性能计时
 *
 * 设计思路：
 * - 采用响应式系统管理倒计时状态
 * - 使用 requestAnimationFrame 实现精确的时间控制
 * - 支持两种更新策略：毫秒级更新和秒级更新
 * - 提供完整的生命周期管理
 *
 * 主要对外接口：
 * - CurrentTime: 倒计时时间数据结构
 * - UseCountDownOptions: 倒计时配置项类型
 * - useCountDown: 核心倒计时管理函数
 *
 * 使用注意事项：
 * 1. 需要在 setup 函数或 <script setup> 中使用
 * 2. 组件卸载时会自动暂停倒计时
 * 3. 毫秒级模式会消耗更多性能，请根据需求选择
 * 4. 支持动态修改配置项，但需要重新调用 start 方法
 *
 * @author wot-ui-plus
 * @version 1.0.0
 * @since 2023
 */

import { ref, computed, onBeforeUnmount } from 'vue'
import { isDef } from '../common/util'
import { useRaf } from './useRaf'

/**
 * 倒计时时间的数据结构
 *
 * 将毫秒级的时间转换为更易读的天、时、分、秒格式
 * 便于在 UI 中显示和使用
 *
 * @property {number} days - 天数
 * @property {number} hours - 小时数 (0-23)
 * @property {number} total - 总毫秒数
 * @property {number} minutes - 分钟数 (0-59)
 * @property {number} seconds - 秒数 (0-59)
 * @property {number} milliseconds - 毫秒数 (0-999)
 */
export type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}

/**
 * 倒计时的配置项
 *
 * 用于初始化倒计时功能的参数配置
 *
 * @property {number} time - 倒计时总时间，单位为毫秒
 * @property {boolean} [millisecond] - 是否开启毫秒级倒计时，默认为 false
 * @property {(current: CurrentTime) => void} [onChange] - 倒计时每次变化时的回调函数
 * @property {() => void} [onFinish] - 倒计时结束时的回调函数
 */
export type UseCountDownOptions = {
  time: number // 倒计时总时间，单位为毫秒
  millisecond?: boolean // 是否开启毫秒级倒计时，默认为 false
  onChange?: (current: CurrentTime) => void // 倒计时每次变化时的回调函数
  onFinish?: () => void // 倒计时结束时的回调函数
}

/**
 * 时间单位常量定义
 *
 * 用于时间计算的常量，便于代码维护和理解
 *
 * @constant {number} SECOND - 1秒的毫秒数 (1000ms)
 * @constant {number} MINUTE - 1分钟的毫秒数 (60 * SECOND)
 * @constant {number} HOUR - 1小时的毫秒数 (60 * MINUTE)
 * @constant {number} DAY - 1天的毫秒数 (24 * HOUR)
 */
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * 将毫秒时间转换为倒计时数据结构
 *
 * 将总毫秒数分解为天、时、分、秒、毫秒的格式，便于在 UI 中显示
 * 使用数学取模和除法运算进行时间单位转换
 *
 * @param time - 总毫秒数
 * @returns 转换后的倒计时数据结构
 *
 * @example
 * ```typescript
 * const timeData = parseTime(93784000) // 1天2小时3分4秒
 * // 返回: { days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 0, total: 93784000 }
 * ```
 *
 * @throws 不会抛出异常，但会处理负数和 NaN 值
 */
function parseTime(time: number): CurrentTime {
  // 计算天数：总毫秒数除以一天的毫秒数
  const days = Math.floor(time / DAY)
  // 计算小时数：剩余毫秒数除以一小时的毫秒数
  const hours = Math.floor((time % DAY) / HOUR)
  // 计算分钟数：剩余毫秒数除以一分钟的毫秒数
  const minutes = Math.floor((time % HOUR) / MINUTE)
  // 计算秒数：剩余毫秒数除以一秒的毫秒数
  const seconds = Math.floor((time % MINUTE) / SECOND)
  // 计算毫秒数：直接取模得到剩余毫秒
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

/**
 * 判断两个时间是否在同一秒内
 *
 * 通过比较两个时间戳的秒数部分来判断是否属于同一秒
 * 用于优化秒级倒计时的更新频率，避免不必要的重渲染
 *
 * @param time1 - 第一个时间戳（毫秒）
 * @param time2 - 第二个时间戳（毫秒）
 * @returns 如果两个时间在同一秒内返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * isSameSecond(1000, 1500) // true (都是第1秒)
 * isSameSecond(1000, 2000) // false (第1秒和第2秒)
 * ```
 */
function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

/**
 * 创建倒计时管理上下文
 *
 * 这是一个高性能的倒计时管理组合式函数，基于 Vue 3 的响应式系统和 requestAnimationFrame 实现。
 * 支持毫秒级和秒级两种精度模式，提供完整的生命周期管理和事件回调机制。
 *
 * 核心特性：
 * - 高性能：使用 requestAnimationFrame 实现精确的时间控制
 * - 可配置：支持毫秒级和秒级两种更新模式
 * - 安全：自动处理组件卸载时的资源清理
 * - 灵活：提供开始、暂停、重置等完整控制方法
 *
 * @param options - 倒计时配置选项
 * @returns 返回包含控制方法和当前状态的对象
 *
 * @example
 * ```typescript
 * // 在组件中使用
 * const { start, pause, reset, current } = useCountDown({
 *   time: 60000, // 60秒倒计时
 *   millisecond: false, // 秒级精度
 *   onChange: (time) => console.log('剩余时间:', time),
 *   onFinish: () => console.log('倒计时结束')
 * })
 *
 * // 开始倒计时
 * start()
 *
 * // 在模板中使用
 * <div>{{ current.days }}天{{ current.hours }}时{{ current.minutes }}分{{ current.seconds }}秒</div>
 * ```
 *
 * @throws 如果 options.time 不是有效数字，可能会在计算时产生异常
 */
export function useCountDown(options: UseCountDownOptions) {
  // 内部状态变量 - 结束时间戳
  let endTime: number
  // 内部状态变量 - 是否正在计时中
  let counting: boolean

  // 使用 requestAnimationFrame 包装器
  const { start: startRaf, cancel: cancelRaf } = useRaf(tick)

  // 响应式剩余时间（毫秒）
  const remain = ref(options.time)
  // 计算属性：将剩余时间转换为结构化数据
  const current = computed(() => parseTime(remain.value))

  /**
   * 暂停倒计时
   *
   * 停止计时器并取消 requestAnimationFrame 循环
   * 不会重置剩余时间，可以随时重新开始
   *
   * @example
   * ```typescript
   * pause() // 暂停倒计时
   * start() // 可以重新开始
   * ```
   */
  const pause = () => {
    counting = false
    cancelRaf()
  }

  /**
   * 获取当前剩余时间
   *
   * 根据结束时间和当前时间计算实际剩余时间
   * 确保返回的时间不会小于0
   *
   * @returns 当前剩余时间（毫秒）
   */
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

  /**
   * 设置剩余时间并触发相关回调
   *
   * 更新剩余时间，触发 onChange 回调，检查是否结束
   *
   * @param value - 新的剩余时间（毫秒）
   */
  const setRemain = (value: number) => {
    remain.value = value
    // 如果配置了 onChange 回调，则触发
    isDef(options.onChange) && options.onChange(current.value)
    // 如果倒计时结束，暂停并触发 onFinish 回调
    if (value === 0) {
      pause()
      isDef(options.onFinish) && options.onFinish()
    }
  }

  /**
   * 毫秒级更新策略
   *
   * 每帧都更新剩余时间，实现毫秒级精度
   * 性能消耗较大，适用于需要高精度的场景
   */
  const microTick = () => {
    if (counting) {
      // 更新剩余时间
      setRemain(getCurrentRemain())
      // 如果还有剩余时间，继续下一帧
      if (remain.value > 0) {
        startRaf()
      }
    }
  }

  /**
   * 秒级更新策略
   *
   * 只在秒数变化时更新剩余时间，优化性能
   * 适用于大多数不需要毫秒级精度的场景
   */
  const macroTick = () => {
    if (counting) {
      const remainRemain = getCurrentRemain()
      // 只有当秒数变化或倒计时结束时才更新
      if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
        setRemain(remainRemain)
      }

      // 如果还有剩余时间，继续下一帧
      if (remain.value > 0) {
        startRaf()
      }
    }
  }

  /**
   * 根据配置选择更新策略
   *
   * 根据 millisecond 配置决定使用毫秒级还是秒级更新
   */
  function tick() {
    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }

  /**
   * 开始倒计时
   *
   * 设置结束时间，启动计时器
   * 如果已经在计时中，则不会重复启动
   *
   * @example
   * ```typescript
   * start() // 开始倒计时
   * ```
   */
  const start = () => {
    if (!counting) {
      // 计算结束时间戳
      endTime = Date.now() + remain.value
      counting = true
      // 启动 requestAnimationFrame 循环
      startRaf()
    }
  }

  /**
   * 重置倒计时
   *
   * 暂停当前计时并重置剩余时间为指定值
   *
   * @param totalTime - 新的总时间（毫秒），默认为初始配置的时间
   * @example
   * ```typescript
   * reset() // 重置为初始时间
   * reset(30000) // 重置为30秒
   * ```
   */
  const reset = (totalTime: number = options.time) => {
    pause()
    remain.value = totalTime
  }

  // 组件卸载时自动暂停倒计时，防止内存泄漏
  onBeforeUnmount(pause)

  return {
    start,
    pause,
    reset,
    current
  }
}
