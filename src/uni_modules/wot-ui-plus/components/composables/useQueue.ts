/**
 * 组件队列管理组合式函数
 *
 * 本文件提供了一套完整的组件队列管理解决方案，基于Vue 3的依赖注入系统实现。
 * 该模块主要用于管理需要协同工作的组件集合，如模态框、弹出层、提示框等，实现统一的显示与隐藏控制。
 *
 * 核心功能：
 * 1. 维护组件实例队列，支持动态添加和移除组件
 * 2. 提供关闭其他组件的能力，实现组件间的互斥显示
 * 3. 提供批量关闭所有组件的功能，便于全局控制
 * 4. 通过依赖注入机制，实现组件队列功能的共享
 *
 * 设计思路：
 * - 使用Vue 3的ref创建响应式队列，确保组件状态同步
 * - 通过provide/inject模式实现跨组件通信，降低耦合度
 * - 基于组件唯一标识符(uid)进行精准的组件操作
 * - 要求队列中的组件暴露close方法，实现统一的关闭接口
 *
 * 主要对外接口：
 * - useQueue: 创建并提供组件队列管理功能的核心函数
 * - Queue: 定义队列管理器的数据结构和操作方法
 * - queueKey: 用于依赖注入的唯一标识符
 *
 * 使用注意事项：
 * 1. 队列中的组件必须通过expose暴露close方法，以便队列管理器能够关闭它们
 * 2. 组件必须具有唯一标识符(uid)，用于在队列中识别和操作
 * 3. 通常在父组件中调用useQueue，子组件通过inject获取队列功能
 * 4. 适用于需要控制多个相关组件显示状态的场景，如一次只显示一个弹窗
 * 5. 多端适配时，确保在不同平台上组件实例的结构一致性
 */

// 导入Vue核心API和类型
import {
  type Ref, // 响应式引用类型
  provide, // 提供依赖项
  ref // 创建响应式引用
} from 'vue'

/**
 * 用于依赖注入的队列键名
 *
 * 作为provide/inject机制的唯一标识符，确保子组件能够正确注入队列管理器
 */
export const queueKey = '__QUEUE_KEY__'

/**
 * 队列管理器接口定义
 *
 * 定义了组件队列管理器的数据结构和操作方法，用于类型安全的队列管理
 *
 * @interface Queue
 * @property {Ref<any[]>} queue - 组件实例队列的响应式引用
 * @property {Function} pushToQueue - 向队列添加组件实例的方法
 * @property {Function} removeFromQueue - 从队列移除组件实例的方法
 * @property {Function} closeOther - 关闭指定组件以外的其他组件的方法
 * @property {Function} closeOutside - 关闭队列中所有组件的方法
 */
export interface Queue {
  queue: Ref<any[]>
  pushToQueue: (comp: any) => void
  removeFromQueue: (comp: any) => void
  closeOther: (comp: any) => void
  closeOutside: () => void
}

/**
 * 创建和提供组件队列管理功能的组合式函数
 *
 * 该函数创建一个响应式的组件队列，并提供一系列方法来管理队列中的组件，
 * 同时通过依赖注入机制使这些功能在组件树中可用。
 *
 * @returns {Object} 返回可直接使用的队列操作方法
 * @returns {Object.closeOther} closeOther - 关闭指定组件以外的所有组件
 * @returns {Object.closeOutside} closeOutside - 关闭队列中的所有组件
 *
 * @example
 * // 在父组件中提供队列管理功能
 * setup() {
 *   const { closeOther, closeOutside } = useQueue()
 *
 *   // 可以直接使用返回的方法
 *   const handleCloseAll = () => {
 *     closeOutside()
 *   }
 *
 *   return { handleCloseAll }
 * }
 *
 * // 在子组件中注入队列管理功能
 * setup() {
 *   const queueManager = inject(queueKey) as Queue
 *   const instance = getCurrentInstance()
 *
 *   // 添加当前组件到队列
 *   onMounted(() => {
 *     queueManager.pushToQueue(instance)
 *   })
 *
 *   // 从队列中移除当前组件
 *   onUnmounted(() => {
 *     queueManager.removeFromQueue(instance)
 *   })
 *
 *   // 关闭其他组件
 *   const closeOthers = () => {
 *     queueManager.closeOther(instance)
 *   }
 *
 *   return { closeOthers }
 * }
 *
 * @throws 如果队列中的组件没有正确暴露close方法，调用closeOther或closeOutside可能会抛出错误
 * @throws 如果组件实例没有uid属性，removeFromQueue和closeOther方法可能无法正确工作
 */
export function useQueue() {
  // 创建响应式组件队列，初始为空数组
  const queue = ref<any[]>([])

  /**
   * 向队列中添加组件实例
   *
   * 将组件实例添加到响应式队列中，使其能够被队列管理器控制
   *
   * @param {any} comp - 要添加到队列的组件实例，必须包含$.uid属性和$.exposed.close方法
   * @returns {void}
   */
  function pushToQueue(comp: any) {
    queue.value.push(comp)
  }

  /**
   * 从队列中移除指定组件实例
   *
   * 根据组件的唯一标识符(uid)从队列中移除对应的组件实例
   *
   * @param {any} comp - 要从队列中移除的组件实例，必须包含$.uid属性
   * @returns {void}
   */
  function removeFromQueue(comp: any) {
    // 使用filter方法创建新数组，保留uid不等于传入组件uid的所有项
    // 这确保了只有指定的组件会被从队列中移除
    queue.value = queue.value.filter((item) => {
      return item.$.uid !== comp.$.uid
    })
  }

  /**
   * 关闭队列中除指定组件外的所有其他组件
   *
   * 遍历队列中的所有组件，关闭除指定组件外的所有其他组件
   * 常用于实现互斥显示的场景，如一次只显示一个弹出层
   *
   * @param {any} comp - 当前保持打开状态的组件实例，必须包含$.uid属性
   * @returns {void}
   */
  function closeOther(comp: any) {
    // 遍历队列中的所有组件
    queue.value.forEach((item) => {
      // 检查当前组件的uid是否与目标组件不同
      if (item.$.uid !== comp.$.uid) {
        // 调用组件暴露的close方法关闭组件
        item.$.exposed.close()
      }
    })
  }

  /**
   * 关闭队列中的所有组件
   *
   * 遍历队列中的所有组件，调用它们的close方法，实现批量关闭
   * 常用于全局控制，如页面切换时关闭所有弹窗
   *
   * @returns {void}
   */
  function closeOutside() {
    // 遍历队列中的所有组件
    queue.value.forEach((item) => {
      // 调用每个组件暴露的close方法
      item.$.exposed.close()
    })
  }

  // 通过provide提供队列管理功能，使子组件可以通过inject获取
  provide(queueKey, {
    queue, // 组件队列的响应式引用
    pushToQueue, // 添加组件到队列的方法
    removeFromQueue, // 从队列移除组件的方法
    closeOther, // 关闭其他组件的方法
    closeOutside // 关闭所有组件的方法
  })

  // 返回可直接使用的队列操作方法
  return {
    closeOther, // 关闭其他组件的方法
    closeOutside // 关闭所有组件的方法
  }
}
