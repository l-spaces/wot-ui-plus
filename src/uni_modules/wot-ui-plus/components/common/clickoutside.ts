/**
 * 点击外部区域关闭组件的管理模块
 *
 * 该模块提供了一个统一的队列管理机制，用于处理需要在点击外部区域时自动关闭的组件，
 * 例如弹窗、下拉菜单、滑动操作等。通过维护一个组件队列，实现了点击外部时关闭所有相关组件，
 * 以及点击一个组件时关闭其他组件的功能。
 *
 * 主要应用场景：
 * - 弹窗类组件（Popover、Tooltip、DropMenu等）
 * - 滑动操作组件（SwipeAction等）
 * - 浮动按钮组件（FAB等）
 *
 * 使用方式：
 * 通过useQueue hook提供给需要此功能的组件使用，组件在初始化时加入队列，销毁时移除队列。
 */

/**
 * 存储需要管理的组件实例队列
 * 每个组件实例需包含$.uid唯一标识和$.exposed.close()关闭方法
 */
let queue: any[] = []

/**
 * 将组件实例添加到管理队列中
 *
 * @param comp 组件实例对象，需包含$.uid唯一标识和$.exposed.close()关闭方法
 * @example
 * // 在组件mounted时调用
 * pushToQueue(this)
 */
export function pushToQueue(comp: any) {
  queue.push(comp)
}

/**
 * 从管理队列中移除指定组件实例
 *
 * @param comp 要移除的组件实例对象，需包含$.uid唯一标识
 * @example
 * // 在组件unmounted时调用
 * removeFromQueue(this)
 */
export function removeFromQueue(comp: any) {
  // 使用filter方法过滤掉指定组件，通过$.uid属性进行唯一识别
  queue = queue.filter((item) => {
    return item.$.uid !== comp.$.uid
  })
}

/**
 * 关闭队列中除指定组件外的所有其他组件
 *
 * @param comp 当前打开的组件实例，不会被关闭
 * @example
 * // 当一个新组件打开时，关闭其他已打开的组件
 * closeOther(this)
 */
export function closeOther(comp: any) {
  queue.forEach((item) => {
    // 跳过当前组件，关闭其他所有组件
    if (item.$.uid !== comp.$.uid) {
      // 调用组件暴露的close方法关闭组件
      item.$.exposed.close()
    }
  })
}

/**
 * 关闭队列中所有组件
 *
 * 通常在点击页面空白区域或根元素时调用，用于关闭所有已打开的弹窗类组件
 *
 * @example
 * // 在页面根元素的点击事件中调用
 * <view @click="closeOutside">
 *   <!-- 页面内容 -->
 * </view>
 */
export function closeOutside() {
  queue.forEach((item) => {
    // 调用每个组件暴露的close方法关闭组件
    item.$.exposed.close()
  })
}
