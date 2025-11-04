<template>
  <view class="wd-tree">
    <view class="wd-tree__nodes">
      <view v-for="(node, index) in visibleNodes" :key="index" class="wd-tree__nodes--wrapper" :style="[nodeWrapperStyle(node)]">
        <view class="wd-tree__switcher" v-if="showSwitcher" @tap.stop="onToggle(node)">
          <slot name="switcher" :hide="!(hasChildren(node) || (!!loadNode && !isLeaf(node)))" :loading="isLoading(node)" :expanded="isExpanded(node)">
            <wd-loading v-if="isLoading(node)" mode="semicircle" timingFunction="linear" :color="loadingColor" :size="12" />
            <wd-icon
              v-else-if="hasChildren(node) || (!!loadNode && isLeaf(node))"
              :name="isExpanded(node) ? collapseIcon : expandIcon"
              :size="switcherSize"
              :color="switcherColor"
            />
          </slot>
        </view>
        <wd-checkbox
          v-if="checkable"
          shape="square"
          :modelValue="isChecked(node)"
          :indeterminate="isIndeterminate(node)"
          :checkedColor="checkedColor"
          @change="handleCheck(node)"
        />
        <view class="wd-tree__content" :style="[contentStyle(node)]" @tap.stop="onToggle(node)">
          <slot name="content" :node="node">
            <text class="wd-tree__label" :style="[labelStyle(node)]">
              {{ node[labelField] }}
            </text>
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-tree',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, reactive, watch, type CSSProperties } from 'vue'
import { addUnit } from '../common/util'
import { treeProps } from './types'

// 定义节点类型接口
interface TreeNode {
  [id: string]: any
  __level?: number
  __matched?: boolean
}

// 声明Props和Emits
const props = defineProps(treeProps)
const emit = defineEmits(['click', 'checked', 'expanded', 'update:checked-keys', 'update:expanded-keys'])
// const emit = defineEmits<{
//   (e: 'click', event: MouseEvent): void
//   (e: 'checked', value: (string | number)[]): void
//   (e: 'expanded', value: (string | number)[]): void
//   (e: 'update:checked-keys', value: (string | number)[]): void
//   (e: 'update:expanded-keys', value: (string | number)[]): void
// }>()

// 响应式状态
// 内部选中节点键值数组
const innerCheckedKeys = ref<(string | number)[]>(props.defaultCheckedKeys ? [...props.defaultCheckedKeys] : [])
// 内部展开节点键值数组
const innerExpandedKeys = ref<(string | number)[]>(props.defaultExpandedKeys ? [...props.defaultExpandedKeys] : [])
// 当前选中的节点键值
const selectedKey = ref<string | number | null>(null)
// 节点加载状态映射表
const loadingMap = reactive<Record<string | number, boolean>>({})
// 节点索引映射
const nodeIndex = ref<Record<string | number, TreeNode>>(Object.create(null))
// 父节点索引映射
const parentIndex = ref<Record<string | number, string | number>>(Object.create(null))
// 搜索前展开的节点键值
const preSearchExpandedKeys = ref<(string | number)[] | null>(null)

// 方法定义
// 获取节点唯一标识
const keyOf = (node: TreeNode): string | number => node[props.keyField]

// 获取实际的展开节点键值数组
const getEffectiveExpandedKeys = (): (string | number)[] => (props.expandedKeys ? props.expandedKeys : innerExpandedKeys.value)

// 获取实际的选中节点键值数组
const getEffectiveCheckedKeys = (): (string | number)[] => (props.checkedKeys ? props.checkedKeys : innerCheckedKeys.value)

// 确保节点索引已构建
const ensureNodeIndexesBuilt = (): void => {
  if (!nodeIndex.value || !parentIndex.value) {
    buildNodeIndex()
  }
}

// 索引节点（构建节点索引和父节点索引）
const indexNodes = (startNodes: TreeNode[], parentKey: string | number | null): void => {
  const stack = Array.isArray(startNodes) ? startNodes.map((n) => ({ node: n, parentKey })) : []

  while (stack.length) {
    const { node: current, parentKey: currentParentKey } = stack.pop()!
    if (!current) continue

    const currentNodeKey = keyOf(current)
    if (currentNodeKey) {
      nodeIndex.value[currentNodeKey] = current
      if (currentParentKey) {
        parentIndex.value[currentNodeKey] = currentParentKey
      }
    }

    const children = current[props.childrenField] as TreeNode[]
    if (Array.isArray(children) && children.length) {
      for (let i = 0; i < children.length; i++) {
        stack.push({ node: children[i], parentKey: currentNodeKey })
      }
    }
  }
}

// 构建节点索引
const buildNodeIndex = (): void => {
  nodeIndex.value = Object.create(null)
  parentIndex.value = Object.create(null)
  indexNodes(props.data, null)
}

// 索引子树节点
const indexSubtree = (node: TreeNode): void => {
  if (!node) return
  const children = node[props.childrenField] as TreeNode[]
  if (!Array.isArray(children) || children.length === 0) return

  const parentKey = keyOf(node)
  indexNodes(children, parentKey)
}

// 根据搜索模式展开祖先节点
const expandAncestorsForPattern = (): void => {
  const p = (props.pattern || '').toLowerCase()
  if (!p) {
    if (preSearchExpandedKeys.value) {
      setExpandedKeys(preSearchExpandedKeys.value)
      preSearchExpandedKeys.value = null
    }
    return
  }

  ensureNodeIndexesBuilt()
  if (!preSearchExpandedKeys.value) {
    const current = getEffectiveExpandedKeys()
    preSearchExpandedKeys.value = Array.isArray(current) ? [...current] : []
  }

  const next = new Set(preSearchExpandedKeys.value || [])
  for (const nodeKey in nodeIndex.value) {
    const nodeRef = nodeIndex.value[nodeKey]
    const label = (nodeRef[props.labelField] + '').toLowerCase()

    if (label.includes(p)) {
      let parentKey = parentIndex.value[nodeKey] || null
      while (parentKey) {
        next.add(parentKey)
        parentKey = parentIndex.value[parentKey] || null
      }
    }
  }

  setExpandedKeys(Array.from(next))
}

// 获取节点的子节点
const childrenOf = (node: TreeNode): TreeNode[] => (node[props.childrenField] as TreeNode[]) || []

// 判断节点是否有子节点
const hasChildren = (node: TreeNode): boolean => {
  const children = childrenOf(node)
  return children.length > 0
}

// 判断节点是否为叶子节点
const isLeaf = (node: TreeNode): boolean => {
  const flag = node[props.isLeafField]
  return flag === true
}

// 判断节点是否已展开
const isExpanded = (node: TreeNode): boolean => {
  const nodeKey = keyOf(node)
  return new Set(getEffectiveExpandedKeys()).has(nodeKey)
}

// 判断节点是否已选中
const isChecked = (node: TreeNode): boolean => {
  const nodeKey = keyOf(node)
  return new Set(getEffectiveCheckedKeys()).has(nodeKey)
}

// 判断节点是否处于半选中状态
const isIndeterminate = (node: TreeNode): boolean => {
  if (!props.cascade) return false
  const children = childrenOf(node)
  if (children.length === 0) return false

  let checkedCount = 0
  let indeterminateCount = 0

  for (const child of children) {
    if (isChecked(child)) {
      checkedCount++
    } else if (isIndeterminate(child)) {
      indeterminateCount++
    }
  }

  return (checkedCount > 0 && checkedCount < children.length) || indeterminateCount > 0
}

// 判断节点是否被选中
const isSelected = (node: TreeNode): boolean => props.selectable && selectedKey.value === keyOf(node)

// 获取节点内容样式
const contentStyle = (node: TreeNode): Record<string, string> => {
  const style: Record<string, string> = {}
  if (isSelected(node) && props.selectedBgColor) {
    style.background = props.selectedBgColor
  }
  return style
}

// 获取节点标签样式
const labelStyle = (node: TreeNode): Record<string, string> => {
  const style: Record<string, string> = {}
  if (props.pattern && node.__matched && props.highlightBgColor) {
    style.backgroundColor = props.highlightBgColor
  }
  return style
}

// 获取节点包装器样式
const nodeWrapperStyle = (node: TreeNode): Record<string, string> => ({
  paddingLeft: addUnit((node.__level || 0) * Number(props.indentWidth))
})

// 处理节点点击切换展开/折叠
const onToggle = (node: TreeNode): void => {
  const nodeKey = keyOf(node)
  selectedKey.value = nodeKey

  if (!hasChildren(node) && (!props.loadNode || isLeaf(node))) return

  const expanded = isExpanded(node)
  const next = new Set(getEffectiveExpandedKeys())

  if (expanded) {
    next.delete(nodeKey)
  } else {
    next.add(nodeKey)
  }

  setExpandedKeys(Array.from(next))

  if (!expanded && props.loadNode && !hasChildren(node) && !isLeaf(node)) {
    setLoading(node, true)
    ensureNodeIndexesBuilt()

    const sourceNode = nodeIndex.value[nodeKey]
    Promise.resolve(props.loadNode(sourceNode)).finally(() => {
      indexSubtree(sourceNode)
      setLoading(node, false)
    })
  }
}

// 处理节点复选框点击事件
const handleCheck = (node: TreeNode): void => {
  if (node[props.disabledField]) return

  const nodeKey = keyOf(node)
  const current = new Set(getEffectiveCheckedKeys())
  const checked = current.has(nodeKey)

  if (checked) {
    current.delete(nodeKey)
  } else {
    current.add(nodeKey)
  }

  if (props.cascade) {
    // 影响后代节点
    const affectDescendants = (n: TreeNode, value: boolean) => {
      const descendantKey = keyOf(n)
      if (value) {
        current.add(descendantKey)
      } else {
        current.delete(descendantKey)
      }

      for (const childNode of childrenOf(n)) {
        affectDescendants(childNode, value)
      }
    }

    // 影响祖先节点
    const affectAncestors = (n: TreeNode) => {
      const parent = findParent(props.data, keyOf(n))
      if (!parent) return

      const parentKey = keyOf(parent)
      const siblings = childrenOf(parent)
      let allChecked = true
      let anyChecked = false

      for (const sibling of siblings) {
        const siblingKey = keyOf(sibling)
        if (current.has(siblingKey)) {
          anyChecked = true
        } else {
          allChecked = false
        }
      }

      if (allChecked) {
        current.add(parentKey)
      } else {
        current.delete(parentKey)
      }

      affectAncestors(parent)
    }

    affectDescendants(node, !checked)
    affectAncestors(node)
  }

  setCheckedKeys(Array.from(current))
}

// 获取节点的兄弟节点
const getSiblings = (node: TreeNode): TreeNode[] => {
  const nodeKey = keyOf(node)
  const res = findParentAndSiblings(props.data, null, nodeKey)
  return res?.siblings || []
}

// 查找节点的父节点和兄弟节点
const findParentAndSiblings = (
  nodes: TreeNode[],
  parent: TreeNode | null,
  targetKey: string | number
): { parent: TreeNode | null; siblings: TreeNode[] } | null => {
  if (!nodes) return null

  for (const n of nodes) {
    const nodeKey = keyOf(n)
    if (nodeKey === targetKey) {
      return {
        parent,
        siblings: parent ? ((parent[props.childrenField] as TreeNode[]) || []).filter((sibling) => keyOf(sibling) !== targetKey) : []
      }
    }

    const found = findParentAndSiblings(n[props.childrenField] as TreeNode[], n, targetKey)
    if (found) return found
  }

  return null
}

// 查找节点的父节点
const findParent = (nodes: TreeNode[], targetKey: string | number, parent: TreeNode | null = null): TreeNode | null => {
  if (!nodes) return null

  for (const n of nodes) {
    const nodeKey = keyOf(n)
    if (nodeKey === targetKey) {
      return parent
    }

    const found = findParent(n[props.childrenField] as TreeNode[], targetKey, n)
    if (found) return found
  }

  return null
}

// 判断节点是否有匹配搜索模式的后代
const hasDescendantMatch = (node: TreeNode): boolean => {
  if (!props.pattern) return false

  const stack = [...childrenOf(node)]
  while (stack.length) {
    const n = stack.pop()!
    if (!n) continue

    const label = (n[props.labelField] + '').toLowerCase()
    if (label.includes(props.pattern.toLowerCase())) return true

    stack.push(...childrenOf(n))
  }

  return false
}

// 设置节点加载状态
const setLoading = (node: TreeNode, value: boolean): void => {
  const key = keyOf(node)
  loadingMap[key] = value
}

// 判断节点是否正在加载
const isLoading = (node: TreeNode): boolean => {
  const key = keyOf(node)
  return !!loadingMap[key]
}

// 设置展开节点键值
const setExpandedKeys = (next: (string | number)[]): void => {
  if (props.expandedKeys) {
    emit('update:expanded-keys', next)
    emit('expanded', next)
  } else {
    innerExpandedKeys.value = next
    emit('expanded', next)
  }
}

// 设置选中节点键值
const setCheckedKeys = (next: (string | number)[]): void => {
  if (props.checkedKeys) {
    emit('update:checked-keys', next)
    emit('checked', next)
  } else {
    innerCheckedKeys.value = next
    emit('checked', next)
  }
}

// 计算属性：可见节点列表
const visibleNodes = computed<TreeNode[]>(() => {
  const result: TreeNode[] = []
  // 过滤节点
  const filter = (node: TreeNode): boolean => {
    if (!props.pattern) return true
    const label = (node[props.labelField] + '').toLowerCase()
    return label.includes(props.pattern.toLowerCase())
  }

  // 遍历树节点
  const traverse = (nodes: TreeNode[], level: number, parentMatched: boolean) => {
    if (!nodes || nodes.length === 0) return

    for (const n of nodes) {
      const matched = filter(n)
      const shouldShow = props.showIrrelevantNodes ? true : matched || parentMatched || hasDescendantMatch(n)

      if (shouldShow) {
        result.push({
          ...n,
          __level: level,
          __matched: matched
        })

        if (isExpanded(n)) {
          traverse(n[props.childrenField] as TreeNode[], level + 1, parentMatched || matched)
        }
      }
    }
  }

  traverse(props.data, 0, false)
  return result
})

// 监听器：监听数据变化，重建节点索引
watch(
  () => props.data,
  () => {
    buildNodeIndex()
  },
  { deep: true, immediate: true }
)

// 监听器：监听搜索模式变化，展开相关祖先节点
watch(
  () => props.pattern,
  () => {
    expandAncestorsForPattern()
  }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
