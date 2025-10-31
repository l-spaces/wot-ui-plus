/**
 * @file useRaf.ts
 * @description 动画帧管理组合式函数 - wot-ui-plus组件库动画性能优化核心模块
 *
 * 项目架构作用：
 * - 为组件库提供统一的动画帧请求管理解决方案
 * - 实现多端环境下的动画帧兼容性处理
 * - 优化动画性能，避免不必要的重绘和重排
 *
 * 核心功能：
 * - 基于环境自动选择动画帧实现（H5使用requestAnimationFrame，非H5使用setTimeout）
 * - 提供动画帧的启动和取消管理
 * - 自动处理组件卸载时的资源清理
 * - 支持TypeScript类型安全的回调函数
 *
 * 使用场景：
 * - 组件动画效果的平滑渲染
 * - 需要高性能动画的交互场景
 * - 跨平台动画兼容性处理
 * - 避免动画帧泄漏的内存管理
 *
 * 技术特色：
 * - 基于 Vue 3 Composition API 设计
 * - 支持 TypeScript 类型安全
 * - 与 uniapp 多端开发框架兼容
 * - 高性能的动画帧调度机制
 *
 * @example
 * // 在组件中使用动画帧管理
 * import { useRaf } from './composables/useRaf'
 *
 * // 创建动画帧实例
 * const { start, cancel } = useRaf((time) => {
 *   // 动画逻辑，time为当前时间戳
 *   element.style.transform = `translateX(${time % 1000 / 10}px)`
 * })
 *
 * // 启动动画帧
 * start()
 *
 * // 取消动画帧（组件卸载时自动调用）
 * // cancel()
 *
 * @see {@link ../common/util.ts 工具函数模块}
 * @see {@link ./useCountDown.ts 倒计时组件（使用动画帧优化）}
 *
 * @author wot-design-uni 组件库团队
 * @version 1.0.0
 * @since 2023
 */

import { ref, onUnmounted } from 'vue'
import { isDef, isH5, isNumber } from '../common/util'

/**
 * 动画帧回调函数类型定义
 * @description 定义动画帧执行时的回调函数签名，接收当前时间戳参数
 *
 * @typedef {Function} RafCallback
 * @param {number} time - 当前时间戳（毫秒），用于动画计算
 * @returns {void}
 */
type RafCallback = (time: number) => void

/**
 * 动画帧管理组合式函数
 * @description 创建动画帧管理实例，提供跨平台的动画帧请求和取消功能
 *
 * 核心逻辑：
 * - 根据运行环境自动选择动画帧实现（H5使用requestAnimationFrame，非H5使用setTimeout）
 * - 管理动画帧请求的引用，支持手动取消和自动清理
 * - 在组件卸载时自动取消动画帧，避免内存泄漏
 *
 * @param {RafCallback} callback - 动画帧回调函数，接收当前时间戳参数
 * @returns {Object} 包含动画帧控制方法的对象
 * @returns {Function} returns.start - 启动动画帧请求
 * @returns {Function} returns.cancel - 取消动画帧请求
 *
 * @example
 * // 基本用法
 * const { start, cancel } = useRaf((time) => {
 *   console.log('动画帧执行时间:', time)
 *   // 执行动画逻辑
 * })
 *
 * // 在组件中使用
 * export default {
 *   setup() {
 *     const { start, cancel } = useRaf((time) => {
 *       // 组件动画逻辑
 *     })
 *
 *     onMounted(() => {
 *       start() // 组件挂载后启动动画
 *     })
 *
 *     return { start, cancel }
 *   }
 * }
 *
 * @see {@link ../common/util.ts#isH5 isH5 环境检测工具}
 * @see {@link ../common/util.ts#isNumber isNumber 类型检查工具}
 */
export function useRaf(callback: RafCallback) {
  const requestRef = ref<number | null | ReturnType<typeof setTimeout>>(null)

  /**
   * 启动动画帧请求
   * @description 根据运行环境启动相应的动画帧机制，H5环境使用requestAnimationFrame，非H5环境使用setTimeout模拟
   *
   * 实现步骤：
   * 1. 创建动画帧处理函数，包装用户回调函数
   * 2. 根据环境检测结果选择动画帧实现方式
   * 3. 保存动画帧请求引用，便于后续取消操作
   *
   * 关键逻辑：
   * - H5环境：使用浏览器原生requestAnimationFrame，提供60fps的流畅动画
   * - 非H5环境：使用setTimeout模拟30fps动画帧，确保跨平台兼容性
   * - 动画帧引用存储在requestRef中，支持后续取消操作
   *
   * @example
   * // 启动动画帧
   * const { start } = useRaf((time) => {
   *   console.log('动画执行时间:', time)
   * })
   * start() // 开始动画循环
   *
   * @see {@link ../common/util.ts#isH5 isH5 环境检测工具}
   */
  const start = () => {
    // 创建动画帧处理函数，包装用户回调
    const handle = (time: number) => {
      callback(time) // 执行用户定义的动画逻辑
    }

    // 关键逻辑：根据环境选择动画帧实现方式
    if (isH5) {
      // H5环境使用浏览器原生requestAnimationFrame，提供最佳性能
      requestRef.value = requestAnimationFrame(handle)
    } else {
      // 非H5环境使用setTimeout模拟30fps动画帧，确保跨平台兼容性
      requestRef.value = setTimeout(() => handle(Date.now()), 1000 / 30)
    }
  }

  /**
   * 取消动画帧请求
   * @description 根据当前动画帧类型取消相应的动画帧请求，支持多种动画帧实现
   *
   * 实现步骤：
   * 1. 检查当前动画帧请求是否存在
   * 2. 根据环境类型和请求类型选择取消方式
   * 3. 清理动画帧引用，避免内存泄漏
   *
   * 关键逻辑：
   * - H5环境：使用cancelAnimationFrame取消requestAnimationFrame
   * - 非H5环境：使用clearTimeout取消setTimeout
   * - 类型安全检查确保取消操作的安全性
   *
   * @example
   * // 取消动画帧
   * const { start, cancel } = useRaf((time) => {
   *   // 动画逻辑
   * })
   * start()
   * cancel() // 停止动画循环
   *
   * @see {@link ../common/util.ts#isNumber isNumber 类型检查工具}
   * @see {@link ../common/util.ts#isDef isDef 存在性检查工具}
   */
  const cancel = () => {
    // 关键逻辑：根据环境类型和请求类型选择取消方式
    if (isH5 && isNumber(requestRef.value)) {
      // H5环境：取消requestAnimationFrame请求
      cancelAnimationFrame(requestRef.value!)
    } else if (isDef(requestRef.value)) {
      // 非H5环境：取消setTimeout请求
      clearTimeout(requestRef.value)
    }
  }

  /**
   * 组件卸载时的自动清理
   * @description 使用Vue的onUnmounted生命周期钩子，在组件卸载时自动取消动画帧请求
   *
   * 关键逻辑：
   * - 确保组件卸载时自动清理动画帧资源
   * - 避免内存泄漏和意外的动画继续执行
   * - 与Vue组件生命周期完美集成
   *
   * @see {@link vue#onUnmounted Vue onUnmounted 生命周期钩子}
   */
  onUnmounted(() => {
    cancel() // 组件卸载时自动取消动画帧
  })

  // 返回动画帧控制方法，供外部使用
  return { start, cancel }
}
