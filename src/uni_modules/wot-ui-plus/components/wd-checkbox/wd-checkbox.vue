<template>
  <view
    :class="`wd-checkbox ${innerCell ? 'is-cell-box' : ''} ${innerShape === 'button' ? 'is-button-box' : ''} ${isChecked ? 'is-checked' : ''} ${
      props.indeterminate ? 'is-indeterminate' : ''
    } ${isFirst ? 'is-first-child' : ''} ${isLast ? 'is-last-child' : ''} ${innerInline ? 'is-inline' : ''} ${
      innerShape === 'button' ? 'is-button' : ''
    } ${innerDisabled ? 'is-disabled' : ''} ${innerSize ? 'is-' + innerSize : ''} ${customClass}`"
    :style="customStyle"
    @click="toggle"
  >
    <!--shape为button时，移除wd-checkbox__shape，只保留wd-checkbox__label-->
    <view
      v-if="innerShape !== 'button'"
      :class="`wd-checkbox__shape ${innerShape === 'square' ? 'is-square' : ''} ${customShapeClass}`"
      :style="isChecked && !innerDisabled && innerCheckedColor ? 'color :' + innerCheckedColor : ''"
    >
      <wd-icon custom-class="wd-checkbox__check" :name="elIcon" />
    </view>
    <!--shape为button时只保留wd-checkbox__label-->
    <view
      :class="`wd-checkbox__label ${customLabelClass}`"
      :style="isChecked && innerShape === 'button' && !innerDisabled && innerCheckedColor ? 'color:' + innerCheckedColor : ''"
    >
      <!--button选中时展示的icon-->
      <wd-icon v-if="innerShape === 'button' && isChecked" custom-class="wd-checkbox__btn-check" name="check-bold" />
      <!--文案-->
      <view class="wd-checkbox__txt" :style="maxWidth ? 'max-width:' + maxWidth : ''">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-checkbox',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
// 导入组件和工具函数
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, getCurrentInstance, onBeforeMount, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { CHECKBOX_GROUP_KEY } from '../wd-checkbox-group/types'
import { getPropByPath, isDef } from '../common/util'
import { checkboxProps, type CheckboxExpose } from './types'

// 定义组件属性和事件
const props = defineProps(checkboxProps)
const emit = defineEmits(['change', 'update:modelValue'])

// 暴露方法给父组件调用
defineExpose<CheckboxExpose>({
  toggle
})

// 获取父组件(checkbox-group)实例和当前组件在父组件中的索引
const { parent: checkboxGroup, index } = useParent(CHECKBOX_GROUP_KEY)

// 计算当前复选框是否被选中
const isChecked = computed(() => {
  if (checkboxGroup) {
    // 当在checkbox-group中使用时，检查modelValue是否在父组件的选中数组中
    return checkboxGroup.props.modelValue.indexOf(props.modelValue) > -1
  } else {
    // 单独使用时，直接比较modelValue和trueValue
    return props.modelValue === props.trueValue
  }
})

// 计算中间状态（部分选中）
const elIcon = computed(() => {
  console.log(props.indeterminate)
  if (props.indeterminate) {
    return 'minus'
  } else {
    return 'check'
  }
})

// 判断是否是父组件中的第一个子项
const isFirst = computed(() => {
  return index.value === 0
})

// 判断是否是父组件中的最后一个子项
const isLast = computed(() => {
  const children = isDef(checkboxGroup) ? checkboxGroup.children : []
  return index.value === children.length - 1
})

// 获取当前组件实例
const { proxy } = getCurrentInstance() as any

// 监听modelValue变化，在组内使用时检查值是否冲突
watch(
  () => props.modelValue,
  () => {
    if (checkboxGroup) {
      checkName()
    }
  }
)

// 监听shape属性变化，验证其值是否有效
watch(
  () => props.shape,
  (newValue) => {
    const type = ['circle', 'square', 'button']
    if (isDef(newValue) && type.indexOf(newValue) === -1) {
      console.error(`shape must be one of ${type.toString()}`)
    }
  }
)

// 计算最终的形状样式（优先使用自己的，其次是组的，最后是默认值）
const innerShape = computed(() => {
  return props.shape || getPropByPath(checkboxGroup, 'props.shape') || 'circle'
})

// 计算最终的选中颜色
const innerCheckedColor = computed(() => {
  return props.checkedColor || getPropByPath(checkboxGroup, 'props.checkedColor')
})

// 计算最终的禁用状态
const innerDisabled = computed(() => {
  if (!checkboxGroup) {
    return props.disabled
  }
  const { max, min, modelValue, disabled } = checkboxGroup.props
  // 满足以下任一条件则禁用：
  // 1. 已达到最大选中数量且当前未选中
  // 2. 已达到最小选中数量且当前已选中
  // 3. 自身设置了disabled为true
  // 4. 组设置了disabled且自身未明确设置disabled
  if (
    (max && modelValue.length >= max && !isChecked.value) ||
    (min && modelValue.length <= min && isChecked.value) ||
    props.disabled === true ||
    (disabled && props.disabled === null)
  ) {
    return true
  }

  return props.disabled
})

// 计算是否为内联样式（从父组件继承）
const innerInline = computed(() => {
  return getPropByPath(checkboxGroup, 'props.inline') || false
})

// 计算是否为单元格样式（从父组件继承）
const innerCell = computed(() => {
  return getPropByPath(checkboxGroup, 'props.cell') || false
})

// 计算最终的尺寸
const innerSize = computed(() => {
  return props.size || getPropByPath(checkboxGroup, 'props.size')
})

// 组件挂载前的检查
onBeforeMount(() => {
  if (props.modelValue === null) {
    // eslint-disable-next-line quotes
    console.error("checkbox's value must be set")
  }
})

/**
 * 检查checkbox绑定的值是否与其他checkbox冲突
 */
function checkName() {
  checkboxGroup &&
    checkboxGroup.children &&
    checkboxGroup.children.forEach((child: any) => {
      // 比较其他checkbox的modelValue是否与当前相同
      if (child.$.uid !== proxy.$.uid && child.modelValue === props.modelValue) {
        console.error(`The checkbox's bound value: ${props.modelValue} has been used`)
      }
    })
}

/**
 * 处理checkbox点击事件，切换选中状态
 */
function toggle() {
  // 禁用状态下不处理点击
  if (innerDisabled.value) return

  // 在checkbox-group中使用时的处理逻辑
  if (checkboxGroup) {
    // 触发change事件
    emit('change', {
      value: !isChecked.value
    })
    // 调用父组件的方法更新选中状态
    checkboxGroup.changeSelectState(props.modelValue)
  } else {
    // 单独使用时的处理逻辑
    // 切换值：如果当前是trueValue则切换为falseValue，反之亦然
    const newVal = props.modelValue === props.trueValue ? props.falseValue : props.trueValue
    // 更新modelValue并触发change事件
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
