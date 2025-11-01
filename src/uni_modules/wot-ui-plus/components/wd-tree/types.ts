import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp, makeArrayProp, makeUnArrayProp, makeFunctionProp } from '../common/props'

export type TextType = 'default' | 'primary' | 'success' | 'warning' | 'error'

export const treeProps = {
  ...baseProps,

  // 数据
  data: makeArrayProp<Record<string, any>>(),
  // 选项名称映射的字段名
  keyField: makeStringProp('key'),
  // 展示值映射的字段名
  labelField: makeStringProp('label'),
  // 子级值映射的字段名
  childrenField: makeStringProp('children'),
  // 是否是叶子节点的字段名
  isLeafField: makeStringProp('isLeaf'),
  // 是否禁用的字段名
  disabledField: makeStringProp('disabled'),
  // 默认选中多选项
  defaultCheckedKeys: makeArrayProp<string>(),
  // 默认展开项
  defaultExpandedKeys: makeArrayProp<string>(),
  // 受控的选中多选项
  checkedKeys: makeUnArrayProp<string>(),
  // 受控的展开项
  expandedKeys: makeUnArrayProp<string>(),
  // 是否可选择
  checkable: makeBooleanProp(false),
  // 是否可选择
  selectable: makeBooleanProp(false),
  // 是否级联
  cascade: makeBooleanProp(false),
  // 是否允许点击节点展开/收缩
  expandOnClick: makeBooleanProp(false),
  // 是否允许点击节点勾选/取消勾选
  checkOnClick: makeBooleanProp(false),
  // 异步加载节点数据
  loadNode: makeFunctionProp(),
  // 是否允许勾选未加载的节点
  allowCheckingNotLoaded: makeBooleanProp(false),
  // 搜索过滤
  pattern: makeStringProp(''),
  // 是否显示搜索无关的节点
  showIrrelevantNodes: makeBooleanProp(true),
  // 外观
  indentWidth: makeNumericProp(24),
  // 是否显示展开/收缩按钮
  showSwitcher: makeBooleanProp(true),
  // 展开图标
  expandIcon: makeStringProp('caret-right'),
  // 收缩图标
  collapseIcon: makeStringProp('caret-down'),
  // loading的颜色
  loadingColor: makeStringProp(''),
  // checkebox选中颜色
  checkedColor: makeStringProp(''),
  // 是否可旋转展开/收缩按钮
  rotatableSwitcher: makeBooleanProp(false),
  // 高亮背景颜色
  highlightBgColor: makeStringProp('#f9ae3d'),
  // 选中背景颜色
  selectedBgColor: makeStringProp('#f3f4f6'),
  // 展开/收缩按钮大小
  switcherSize: makeNumericProp(14),
  // 展开/收缩按钮颜色
  switcherColor: makeStringProp('#909399')
}
