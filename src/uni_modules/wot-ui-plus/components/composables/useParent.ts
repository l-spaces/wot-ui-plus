/**
 * 组件父子关系处理钩子
 * @description 提供通用的组件父子通信机制，允许子组件获取父组件实例及其状态
 * @module composables/useParent
 * @example
 * // 在子组件中使用
 * const { parent, index } = useParent(PARENT_COMPONENT_KEY)
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
 * @template T 父组件额外提供的数据类型
 * @interface ParentProvide
 * @property {Function} link - 将子组件实例添加到父组件的方法
 * @property {Function} unlink - 从父组件中移除子组件实例的方法
 * @property {ComponentPublicInstance[]} children - 父组件中注册的子组件公共实例列表
 * @property {ComponentInternalInstance[]} internalChildren - 父组件中注册的子组件内部实例列表
 * @extends T 继承父组件特定的数据类型
 */
type ParentProvide<T> = T & {
  link(child: ComponentInternalInstance): void
  unlink(child: ComponentInternalInstance): void
  children: ComponentPublicInstance[]
  internalChildren: ComponentInternalInstance[]
}

/**
 * 获取父组件实例和当前组件索引的组合式函数
 * @template T 父组件提供的数据类型
 * @param {InjectionKey<ParentProvide<T>>} key - 用于注入父组件实例的唯一键
 * @returns {Object} 包含父组件实例和当前组件索引的对象
 * @returns {ParentProvide<T> | null} returns.parent - 父组件实例，如果不存在则为null
 * @returns {import('vue').ComputedRef<number> | import('vue').Ref<number>} returns.index - 当前组件在父组件子组件列表中的索引位置
 *
 * @description 该函数实现了组件间的父子通信机制，主要功能包括：
 * 1. 通过Vue的依赖注入系统获取父组件实例
 * 2. 将当前组件实例注册到父组件中
 * 3. 自动处理组件卸载时的清理工作
 * 4. 提供当前组件在父组件子组件列表中的索引位置
 *
 * 在wot-ui-plus组件库中，此函数主要用于以下场景：
 * - 单元格组件(Cell)与单元格组组件(CellGroup)的联动
 * - 表单组件与表单项组件的状态同步
 * - 列表类组件中子项位置信息的获取
 * - 需要按照顺序处理子组件的场景(如分割线显示控制)
 */
export function useParent<T>(key: InjectionKey<ParentProvide<T>>) {
  // 通过注入键获取父组件提供的数据
  const parent = inject(key, null)

  // 如果存在父组件实例
  if (parent) {
    // 获取当前组件的内部实例，使用!断言非空，因为在组件内部调用时一定存在实例
    const instance = getCurrentInstance()!

    // 解构父组件提供的方法和数据
    const { link, unlink, internalChildren } = parent

    // 注册当前组件到父组件
    link(instance)

    // 注册组件卸载时的清理函数，从父组件中移除当前组件实例
    onUnmounted(() => unlink(instance))

    // 创建计算属性，用于动态获取当前组件在父组件子组件列表中的索引位置
    const index = computed(() => internalChildren.indexOf(instance))

    // 返回父组件实例和索引计算属性
    return {
      parent,
      index
    }
  }

  // 如果不存在父组件，返回默认值
  return {
    parent: null,
    index: ref(-1) // 使用-1表示不存在父组件时的默认索引
  }
}
