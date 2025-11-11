/**
 * @description 滚动锁定管理组合式函数
 *
 * 本文件提供了一个基于Vue 3组合式API的页面滚动锁定解决方案，主要用于处理弹窗、抽屉等组件出现时需要禁止页面滚动的场景。
 * 通过引用计数机制实现多层级的滚动锁定管理，确保在多个组件同时请求锁定时，只有最后一个解锁操作才会真正恢复页面滚动。
 *
 * 核心功能：
 * 1. 提供页面滚动锁定和解锁功能
 * 2. 通过引用计数机制支持多层级组件的滚动锁定管理
 * 3. 自动监听锁定条件变化，响应式地应用锁定状态
 * 4. 提供完善的生命周期管理，确保组件卸载时自动解锁
 * 5. 支持Vue的keep-alive组件，在组件停用和激活时正确处理滚动状态
 *
 * 设计思路：
 * - 使用引用计数而非简单开关，支持多个组件共享锁定状态
 * - 响应式监听锁定条件变化，实现自动锁定/解锁
 * - 集成Vue生命周期钩子，确保内存安全和状态一致性
 * - 最小化DOM操作，仅在必要时修改body样式
 *
 * 主要对外接口：
 * - useLockScroll: 创建滚动锁定管理上下文
 * - lock: 锁定页面滚动的方法
 * - unlock: 解锁页面滚动的方法
 *
 * 使用注意事项：
 * 1. 仅适用于支持document对象的环境，在纯App端可能需要适配
 * 2. 依赖Vue 3的组合式API和响应式系统
 * 3. shouldLock回调函数应当是稳定的，避免频繁创建新函数实例导致重复触发watch
 * 4. 适用于需要临时禁止页面滚动的场景，如弹窗、抽屉、侧边栏等组件
 *
 * @author wot-ui-plus
 */
import { onBeforeUnmount, onDeactivated, ref, watch } from 'vue'

/**
 * 创建滚动锁定管理上下文
 *
 * 提供页面滚动锁定功能，支持多层级组件共享锁定状态，自动处理组件生命周期
 *
 * @param shouldLock - 判断是否应该锁定滚动的回调函数，返回true表示锁定，false表示解锁
 * @returns 包含锁定和解锁方法的对象
 *
 * @example
 * // 在组件中使用
 * const { lock, unlock } = useLockScroll(() => showModal.value)
 *
 * // 手动控制
 * function openModal() {
 *   lock()
 * }
 *
 * function closeModal() {
 *   unlock()
 * }
 *
 * @throws 无特定异常抛出，但依赖document对象存在
 */
export function useLockScroll(shouldLock: () => boolean) {
  // 滚动锁定计数器，用于支持多层级组件共享锁定状态
  const scrollLockCount = ref(0)

  /**
   * 锁定页面滚动
   *
   * 通过设置body的overflow样式为hidden实现滚动锁定，使用计数器记录锁定层级
   * 只有当计数器从0增加到1时，才会实际修改DOM样式
   *
   * @example
   * // 锁定页面滚动
   * lock()
   */
  const lock = () => {
    // 仅当计数器为0时才修改body样式，避免重复操作
    if (scrollLockCount.value === 0) {
      // 获取body元素并设置overflow为hidden，阻止页面滚动
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    }
    // 增加锁定计数
    scrollLockCount.value++
  }

  /**
   * 解锁页面滚动
   *
   * 减少锁定计数，当计数归零时恢复body的overflow样式，允许页面滚动
   * 包含安全检查，确保计数不会变为负数
   *
   * @example
   * // 解锁页面滚动
   * unlock()
   */
  const unlock = () => {
    // 安全检查，确保计数大于0
    if (scrollLockCount.value > 0) {
      // 减少锁定计数
      scrollLockCount.value--
      // 当计数归零时，恢复body原始overflow样式
      if (scrollLockCount.value === 0) {
        document.getElementsByTagName('body')[0].style.overflow = ''
      }
    }
  }

  /**
   * 清理函数
   *
   * 在组件卸载或停用时调用，确保滚动状态正确恢复
   * 检查当前是否应该锁定，如果是则执行解锁操作
   */
  const destroy = () => {
    // 只有在当前应该锁定的情况下才执行解锁
    shouldLock() && unlock()
  }

  // 监听shouldLock条件变化，自动应用锁定状态
  watch(shouldLock, (value) => {
    // 根据shouldLock返回值决定执行锁定还是解锁操作
    value ? lock() : unlock()
  })

  // 在组件停用（keep-alive缓存）时清理
  onDeactivated(destroy)
  // 在组件卸载前清理
  onBeforeUnmount(destroy)

  // 对外暴露锁定和解锁方法
  return {
    lock,
    unlock
  }
}

export default useLockScroll
