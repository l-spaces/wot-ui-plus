/**
 * 组件父子关系处理组合式函数
 *
 * 本文件提供了一套完整的组件父子关系管理解决方案，基于Vue 3的依赖注入系统实现。
 * 通过类型安全的API设计，允许子组件无缝获取父组件实例及其提供的功能，同时自动处理组件生命周期事件。
 *
 * 核心功能：
 * 1. 提供类型安全的父组件实例获取机制
 * 2. 自动注册子组件到父组件的管理列表中
 * 3. 提供当前组件在父组件子组件列表中的索引位置
 * 4. 自动处理组件卸载时的清理工作，防止内存泄漏
 * 5. 支持泛型参数，提供灵活的类型扩展能力
 *
 * 设计思路：
 * - 利用Vue 3的依赖注入系统(inject/provide)实现组件间的解耦通信
 * - 通过类型系统确保API的类型安全和使用正确性
 * - 采用计算属性动态获取组件索引，确保索引始终反映最新状态
 * - 集成生命周期钩子，实现自动清理，避免内存泄漏
 *
 * 主要对外接口：
 * - useParent: 获取父组件实例和当前组件索引的核心函数
 * - ParentProvide: 定义父组件提供的数据结构和方法类型
 *
 * 使用注意事项：
 * 1. 必须在组件的setup函数或其他组合式函数中调用
 * 2. 父组件必须通过provide方法提供对应的InjectionKey
 * 3. 在非组件环境中调用getCurrentInstance可能返回null
 * 4. 适用于需要建立父子组件通信的场景，如表单组件、列表组件等
 * 5. 多端适配时，确保在不同平台上依赖注入机制正常工作
 *
 */

// 导入Vue核心API和类型
import {
  ref, // 创建响应式引用
  inject, // 注入依赖项
  computed, // 创建计算属性
  onUnmounted, // 组件卸载时的生命周期钩子
  type InjectionKey, // 依赖注入键类型
  getCurrentInstance, // 获取当前组件实例
  type ComponentPublicInstance, // 组件公共实例类型
  type ComponentInternalInstance // 组件内部实例类型
} from 'vue'

/**
 * 父组件提供的数据类型定义
 *
 * 定义了父组件通过provide提供给子组件的数据结构，包括组件注册方法和子组件列表
 *
 * @template T 父组件额外提供的数据类型，可以是任何类型的扩展数据
 * @property {Function} link - 将子组件实例添加到父组件的注册方法
 * @property {Function} unlink - 从父组件中移除子组件实例的注销方法
 * @property {ComponentPublicInstance[]} children - 父组件中注册的子组件公共实例列表
 * @property {ComponentInternalInstance[]} internalChildren - 父组件中注册的子组件内部实例列表
 */
type ParentProvide<T> = T & {
  // 注册子组件实例到父组件的方法
  link(child: ComponentInternalInstance): void
  // 从父组件中注销子组件实例的方法
  unlink(child: ComponentInternalInstance): void
  // 父组件管理的子组件公共实例列表
  children: ComponentPublicInstance[]
  // 父组件管理的子组件内部实例列表
  internalChildren: ComponentInternalInstance[]
}

/**
 * 获取父组件实例和当前组件索引的组合式函数
 *
 * 实现了子组件与父组件间的通信桥梁，自动处理组件注册和注销逻辑
 *
 * @template T 父组件提供的数据类型，用于类型安全的父组件实例访问
 * @param {InjectionKey<ParentProvide<T>>} key - 用于注入父组件实例的唯一键，必须与父组件provide的键匹配
 * @returns {Object} 返回一个包含父组件实例和索引的对象
 * @returns {Object.parent} parent - 父组件实例，如果不存在匹配的父组件则为null
 * @returns {Object.index} index - 当前组件在父组件子组件列表中的索引位置
 *
 * @example
 * // 在父组件中定义并提供注入键
 * const PARENT_KEY = Symbol() as InjectionKey<ParentProvide<{customProp: string}>>
 *
 * // 在父组件setup中提供数据
 * const parentProvides = {
 *   customProp: 'custom value',
 *   link: (child) => { 实现子组件注册逻辑 },
 *   unlink: (child) => { 实现子组件注销逻辑 },
 *   children: [],
 *   internalChildren: []
 * }
 * provide(PARENT_KEY, parentProvides)
 *
 * // 在子组件中使用
 * const { parent, index } = useParent(PARENT_KEY)
 *
 * // 使用父组件提供的功能
 * if (parent) {
 *   console.log(parent.customProp)
 *   console.log(`当前是第${index.value + 1}个子组件`)
 * }
 *
 * @throws 在非组件上下文中调用时，getCurrentInstance可能返回null，但函数内部已进行安全处理
 *
 * 在wot-ui-plus组件库中，此函数主要用于以下场景：
 * - 单元格组件(Cell)与单元格组组件(CellGroup)的联动
 * - 表单组件与表单项组件的状态同步
 * - 列表类组件中子项位置信息的获取
 * - 需要按照顺序处理子组件的场景(如分割线显示控制)
 */
export function useParent<T>(key: InjectionKey<ParentProvide<T>>) {
  // 通过注入键获取父组件提供的数据，默认值为null
  const parent = inject(key, null)

  // 核心逻辑：如果存在父组件实例，则进行组件注册和索引计算
  if (parent) {
    // 获取当前组件的内部实例，使用!断言非空，因为在组件内部调用时一定存在实例
    const instance = getCurrentInstance()!

    // 解构父组件提供的方法和数据，便于后续使用
    const { link, unlink, internalChildren } = parent

    // 关键步骤：将当前组件实例注册到父组件中
    link(instance)

    // 自动清理：注册组件卸载时的清理函数，从父组件中移除当前组件实例
    // 这确保了即使组件被销毁，父组件的子组件列表也能保持同步，防止内存泄漏
    onUnmounted(() => unlink(instance))

    // 动态计算索引：创建计算属性，用于动态获取当前组件在父组件子组件列表中的索引位置
    // 使用computed而非ref，确保索引值始终反映最新的组件列表状态
    const index = computed(() => internalChildren.indexOf(instance))

    // 返回父组件实例和索引计算属性
    return {
      parent,
      index
    }
  }

  // 边界情况处理：如果不存在父组件，返回默认值
  // 使用-1表示不存在父组件时的默认索引，便于子组件进行条件判断
  return {
    parent: null,
    index: ref(-1) // 使用响应式引用保持API一致性
  }
}
