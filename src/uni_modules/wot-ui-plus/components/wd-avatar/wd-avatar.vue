<template>
  <view class="wd-avatar" :class="[`wd-avatar--${shape}`]" :style="avatarStyle" @tap="clickHandler">
    <slot>
      <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU  -->
      <open-data v-if="mpAvatar && allowMp" type="userAvatarUrl" :style="imageSizeStyle" />
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN && MP-QQ && MP-BAIDU  -->
      <template v-if="mpAvatar && allowMp"></template>
      <!-- #endif -->
      <wd-icon v-else-if="icon" :name="icon" :size="fontSize" :color="color"></wd-icon>
      <wd-text v-else-if="text" :text="text" :size="fontSize" :color="color" customStyle="justify-content: center"></wd-text>
      <wd-img
        class="wd-avatar__image"
        v-else
        :class="[`wd-avatar__image--${shape}`]"
        :src="avatarUrl || defaultUrl"
        :mode="mode"
        @error="errorHandler"
        :style="imageSizeStyle"
      />
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { addUnit, objToStyle } from '../common/util'
import { avatarProps } from './types'

// 定义属性
const props = defineProps(avatarProps)

// 定义事件
const emit = defineEmits<{
  click: [name: string, event: any]
}>()

// 内部状态
const avatarUrl = ref<string>(props.src)
const allowMp = ref<boolean>(false)

// 颜色数组
const colors = [
  '#ffb34b',
  '#f2bba9',
  '#f7a196',
  '#f18080',
  '#88a867',
  '#bfbf39',
  '#89c152',
  '#94d554',
  '#f19ec2',
  '#afaae4',
  '#e1b0df',
  '#c38cc1',
  '#72dcdc',
  '#9acdcb',
  '#77b1cc',
  '#448aca',
  '#86cefa',
  '#98d1ee',
  '#73d1f1',
  '#80a7dc'
]

// 生成随机数的工具函数
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 处理样式对象转换
const addStyle = (style: string | Record<string, any> | undefined) => {
  if (!style) return {}
  if (typeof style === 'string') {
    // 假设objToStyle可以处理字符串样式
    return objToStyle(style as any)
  }
  return style
}

// 计算尺寸样式
const imageSizeStyle = computed(() => ({
  width: addUnit(props.size),
  height: addUnit(props.size)
}))

// 计算头像背景色
const backgroundColor = computed(() => {
  if (!props.text && !props.icon) return 'transparent'

  if (props.randomBgColor) {
    const index = props.colorIndex !== undefined ? props.colorIndex : random(0, 19)
    return colors[index]
  }

  return props.bgColor
})

// 计算头像整体样式
const avatarStyle = computed(() => [
  {
    backgroundColor: backgroundColor.value,
    width: addUnit(props.size),
    height: addUnit(props.size)
  },
  addStyle(props.customStyle)
])

// 初始化函数
const init = () => {
  // 目前只有这几个小程序平台具有open-data标签
  // #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU
  allowMp.value = true
  // #endif
}

// 图片加载失败处理
const errorHandler = () => {
  // 使用默认头像或者base64占位图
  avatarUrl.value = props.defaultUrl || ''
}

// 点击事件处理
const clickHandler = (e: any) => {
  emit('click', props.name, e)
}

// 监听src变化
watch(
  () => props.src,
  (newVal) => {
    avatarUrl.value = newVal
    // 如果没有传src，则主动触发error事件，用于显示默认的头像
    if (!newVal) {
      errorHandler()
    }
  },
  { immediate: true }
)

// 组件挂载时初始化
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
