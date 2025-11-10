<template>
  <view class="wd-code-input">
    <view class="wd-code-input__item" :style="[itemStyle(index)]" v-for="(item, index) in codeLength" :key="index">
      <view class="wd-code-input__item__dot" v-if="dot && codeArray.length > index"></view>
      <text
        v-else
        :style="{
          fontSize: addUnit(fontSize),
          fontWeight: bold ? 'bold' : 'normal',
          color: color
        }"
      >
        {{ codeArray[index] }}
      </text>
      <view class="wd-code-input__item__line" v-if="mode === 'line'" :style="[lineStyle]"></view>
      <view v-if="isFocus && codeArray.length === index" :style="{ backgroundColor: color }" class="wd-code-input__item__cursor"></view>
    </view>
    <input
      :disabled="disabledKeyboard"
      type="number"
      :focus="focus"
      :value="inputValue"
      :maxlength="maxlength"
      :adjustPosition="adjustPosition"
      class="wd-code-input__input"
      @input="inputHandler"
      :style="{
        height: addUnit(size)
      }"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-code-input',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { addUnit } from '../common/util'
import { codeInputProps } from './types'

// 类型定义
const props = defineProps(codeInputProps)
const emit = defineEmits<{
  change: [value: string]
  finish: [value: string]
  'update:modelValue': [value: string]
}>()

// 自定义getPx函数，用于获取像素数值
const getPx = (value: number | string): number => {
  return Number(value) || 0
}

// 响应式数据
const inputValue = ref<string>('')
const isFocus = ref<boolean>(props.focus)
let timer: number | null = null
const opacity = ref<number>(1)

// 计算属性
const codeLength = computed(() => {
  return new Array(Number(props.maxlength))
})

const itemStyle = computed(() => {
  return (index: number) => {
    const style: Record<string, string> = {
      width: addUnit(props.size),
      height: addUnit(props.size)
    }

    // 盒子模式下，需要额外进行处理
    if (props.mode === 'box') {
      // 设置盒子的边框，如果是细边框，则设置为0.5px宽度
      style.border = `${props.hairline ? 0.5 : 1}px solid ${props.borderColor}`
      // 如果盒子间距为0的话
      if (getPx(props.space) === 0) {
        // 给第一和最后一个盒子设置圆角
        if (index === 0) {
          style.borderTopLeftRadius = '3px'
          style.borderBottomLeftRadius = '3px'
        }
        if (index === codeLength.value.length - 1) {
          style.borderTopRightRadius = '3px'
          style.borderBottomRightRadius = '3px'
        }
        // 最后一个盒子的右边框需要保留
        if (index !== codeLength.value.length - 1) {
          style.borderRight = 'none'
        }
      }
    }

    if (index !== codeLength.value.length - 1) {
      // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
      style.marginRight = addUnit(props.space)
    } else {
      // 最后一个盒子的有边框需要保留
      style.marginRight = '0'
    }

    return style
  }
})

const codeArray = computed(() => {
  return String(inputValue.value).split('')
})

const lineStyle = computed(() => {
  const style: Record<string, string> = {}
  style.height = props.hairline ? '2px' : '4px'
  style.width = addUnit(props.size)
  // 线条模式下，背景色即为边框颜色
  style.backgroundColor = props.borderColor
  return style
})

// 监听器
watch(
  () => props.modelValue,
  (val) => {
    // 转为字符串，超出部分截掉
    inputValue.value = String(val).substring(0, Number(props.maxlength))
  },
  { immediate: true }
)

watch(isFocus, (val) => {
  // 可以在这里添加焦点变化时的逻辑
})

// 生命周期
onMounted(() => {
  // 组件挂载后的初始化逻辑
})

onBeforeUnmount(() => {
  // 清理定时器
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

// 方法定义
const inputHandler = (e: { detail: { value: string } }): void => {
  let value = e.detail.value
  inputValue.value = value

  // 是否允许输入"."符号
  if (props.disabledDot) {
    // 在下一个DOM更新周期移除点号
    setTimeout(() => {
      inputValue.value = inputValue.value.replace('.', '')
    }, 0)
  }

  // 未达到maxlength之前，发送change事件，达到后发送finish事件
  emit('change', value)

  // 修改通过v-model双向绑定的值
  emit('update:modelValue', value)

  // 达到用户指定输入长度时，发出完成事件
  if (String(value).length >= Number(props.maxlength)) {
    emit('finish', value)
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
