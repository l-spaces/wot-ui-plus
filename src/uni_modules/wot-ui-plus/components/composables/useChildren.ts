/**
 * @file useChildren.ts
 * @description 子组件管理组合式函数
 *
 * 本文件提供了一套完整的子组件管理解决方案，主要用于处理父子组件之间的通信和状态管理。
 * 通过 Vue 3 的组合式 API 实现，支持多端适配（小程序、H5、App等）。
 *
 * 核心功能：
 * 1. 扁平化虚拟节点树结构，便于遍历和操作
 * 2. 根据虚拟节点顺序对子组件实例进行排序
 * 3. 提供父子组件间的链接机制，支持动态添加和移除子组件
 *
 * 设计思路：
 * - 采用响应式系统管理子组件实例集合
 * - 通过 provide/inject 机制实现跨层级组件通信
 * - 支持泛型参数，提供类型安全的组件管理
 *
 * 主要对外接口：
 * - flattenVNodes: 扁平化虚拟节点树
 * - sortChildren: 根据虚拟节点顺序排序子组件
 * - useChildren: 创建子组件管理上下文
 *
 * 使用注意事项：
 * 1. 需要在 setup 函数或 <script setup> 中使用
 * 2. 父组件需要调用 linkChildren 来建立与子组件的连接
 * 3. 子组件需要通过相应的 inject 机制来获取父组件提供的方法
 * 4. 小程序环境下使用自定义的 isVNode 实现
 *
 * @author wot-ui-plus
 * @version 1.0.0
 * @since 2023
 */

import {
  provide,
  reactive,
  getCurrentInstance,
  type VNode,
  type InjectionKey,
  type VNodeNormalizedChildren,
  type ComponentPublicInstance,
  type ComponentInternalInstance
} from 'vue'

/**
 * 判断是否为虚拟节点 (VNode)
 *
 * 小程序端不支持从 vue 导出的 isVNode 方法，因此参考 uni-mp-vue 的实现
 * 自定义 isVNode 函数来兼容多端环境
 *
 * @param value - 需要判断的值
 * @returns 如果值是 VNode 则返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * const vnode = h('div')
 * console.log(isVNode(vnode)) // true
 * console.log(isVNode('text')) // false
 * ```
 */
function isVNode(value: any): value is VNode {
  return value ? value.__v_isVNode === true : false
}

/**
 * 扁平化虚拟节点树结构
 *
 * 将嵌套的虚拟节点树结构转换为扁平的数组结构，便于遍历和操作。
 * 递归遍历虚拟节点树，收集所有有效的 VNode 节点，包括组件子树和普通子节点。
 *
 * @param children - 虚拟节点子节点集合，可以是数组、VNode 或 null/undefined
 * @returns 扁平化后的 VNode 数组，包含所有层级的虚拟节点
 *
 * @example
 * ```typescript
 * const vnodes = h('div', [
 *   h('p', 'child1'),
 *   h('div', [h('span', 'nested')])
 * ])
 * const flattened = flattenVNodes(vnodes.children)
 * // 返回包含 div, p, div, span 四个 VNode 的数组
 * ```
 *
 * @throws 不会抛出异常，但会忽略非 VNode 类型的子节点
 */
export function flattenVNodes(children: VNodeNormalizedChildren) {
  const result: VNode[] = []

  /**
   * 递归遍历函数
   * @param children - 当前层级的子节点集合
   */
  const traverse = (children: VNodeNormalizedChildren) => {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (isVNode(child)) {
          // 将当前 VNode 添加到结果数组
          result.push(child)

          // 如果 VNode 有组件实例且包含子树，递归处理组件子树
          if (child.component?.subTree) {
            result.push(child.component.subTree)
            traverse(child.component.subTree.children)
          }

          // 如果 VNode 有普通子节点，递归处理子节点
          if (child.children) {
            traverse(child.children)
          }
        }
      })
    }
  }

  // 开始递归遍历
  traverse(children)

  return result
}

/**
 * 在 VNode 数组中查找指定 VNode 的索引位置
 *
 * 首先尝试直接使用 indexOf 查找，如果找不到则根据 VNode 的 type 和 key 进行匹配查找。
 * 这种双重查找机制确保了即使 VNode 引用不同但内容相同的情况下也能正确匹配。
 *
 * @param vnodes - VNode 数组
 * @param vnode - 需要查找的 VNode
 * @returns 如果找到则返回索引，否则返回 -1
 *
 * @example
 * ```typescript
 * const vnodes = [vnode1, vnode2, vnode3]
 * const index = findVNodeIndex(vnodes, vnode2) // 返回 1
 * ```
 */
const findVNodeIndex = (vnodes: VNode[], vnode: VNode) => {
  // 首先尝试直接查找 VNode 引用
  const index = vnodes.indexOf(vnode)
  if (index === -1) {
    // 如果直接查找失败，根据 type 和 key 进行深度匹配
    return vnodes.findIndex((item) => vnode.key !== undefined && vnode.key !== null && item.type === vnode.type && item.key === vnode.key)
  }
  return index
}

/**
 * 根据虚拟节点顺序对子组件实例进行排序
 *
 * 将内部组件实例和公共组件实例按照它们在虚拟 DOM 中的实际渲染顺序进行排序。
 * 这对于需要保持组件渲染顺序一致性的场景非常重要，如列表组件、表单组件等。
 *
 * @param parent - 父组件的内部实例
 * @param publicChildren - 公共组件实例数组（响应式）
 * @param internalChildren - 内部组件实例数组（响应式）
 *
 * @example
 * ```typescript
 * // 在父组件中调用
 * sortChildren(parentInstance, publicChildren, internalChildren)
 * ```
 *
 * @throws 如果 parent 为 null 或 undefined，会安全处理并返回空数组
 */
export function sortChildren(
  parent: ComponentInternalInstance,
  publicChildren: ComponentPublicInstance[],
  internalChildren: ComponentInternalInstance[]
) {
  // 获取父组件的虚拟节点子树并扁平化
  const vnodes = parent && parent.subTree && parent.subTree.children ? flattenVNodes(parent.subTree.children) : []

  // 根据 VNode 在 DOM 中的顺序对内部组件实例进行排序
  internalChildren.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode))

  // 从排序后的内部实例映射出对应的公共实例
  const orderedPublicChildren = internalChildren.map((item) => item.proxy!)

  // 根据排序后的公共实例顺序对原始公共实例数组进行排序
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a)
    const indexB = orderedPublicChildren.indexOf(b)
    return indexA - indexB
  })
}

/**
 * 创建子组件管理上下文
 *
 * 这是一个高阶组合式函数，用于在父组件中创建子组件管理上下文。
 * 通过 Vue 3 的 provide/inject 机制，实现父子组件间的动态链接和状态管理。
 *
 * 泛型参数说明：
 * - Child: 子组件的公共实例类型，默认为 ComponentPublicInstance
 * - ProvideValue: 通过 provide 提供的额外值的类型，默认为 never
 *
 * @param key - InjectionKey，用于标识提供的值的唯一键
 * @returns 返回包含子组件数组和链接方法的对象
 *
 * @example
 * ```typescript
 * // 在父组件中使用
 * const { children, linkChildren } = useChildren<MyChildComponent>(MY_CHILDREN_KEY)
 *
 * // 在 setup 中调用 linkChildren 建立连接
 * linkChildren({
 *   // 可选的额外配置值
 *   someConfig: 'value'
 * })
 *
 * // 在子组件中通过 inject 获取父组件提供的方法
 * const parentContext = inject(MY_CHILDREN_KEY)
 * parentContext?.link(childInstance)
 * ```
 *
 * @throws 如果 getCurrentInstance() 返回 null，会抛出错误
 */
export function useChildren<
  // eslint-disable-next-line
  Child extends ComponentPublicInstance = ComponentPublicInstance<{}, any>,
  ProvideValue = never
>(key: InjectionKey<ProvideValue>) {
  // 响应式存储公共子组件实例
  const publicChildren: Child[] = reactive([])
  // 响应式存储内部子组件实例
  const internalChildren: ComponentInternalInstance[] = reactive([])
  // 获取当前组件实例（父组件）
  const parent = getCurrentInstance()!

  /**
   * 链接子组件的方法
   *
   * 通过 provide 向子组件提供链接方法，建立父子组件间的通信桥梁。
   *
   * @param value - 可选的额外配置值，会合并到提供的对象中
   *
   * @example
   * ```typescript
   * linkChildren({
   *   maxCount: 10, // 限制子组件数量
   *   validate: (child) => true // 子组件验证函数
   * })
   * ```
   */
  const linkChildren = (value?: ProvideValue) => {
    /**
     * 链接单个子组件
     *
     * 将子组件添加到管理列表中，并保持正确的渲染顺序。
     *
     * @param child - 子组件的内部实例
     */
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        // 将子组件添加到内部实例列表
        internalChildren.push(child)
        // 将子组件的公共代理实例添加到公共实例列表
        publicChildren.push(child.proxy as Child)
        // 根据虚拟节点顺序对子组件进行排序
        sortChildren(parent, publicChildren, internalChildren)
      }
    }

    /**
     * 解除子组件链接
     *
     * 从管理列表中移除指定的子组件。
     *
     * @param child - 需要解除链接的子组件内部实例
     */
    const unlink = (child: ComponentInternalInstance) => {
      const index = internalChildren.indexOf(child)
      // 从公共实例列表中移除
      publicChildren.splice(index, 1)
      // 从内部实例列表中移除
      internalChildren.splice(index, 1)
    }

    // 通过 provide 向子组件提供链接方法和子组件列表
    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    )
  }

  return {
    children: publicChildren,
    linkChildren
  }
}
