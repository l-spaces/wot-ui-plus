<template>
  <view class="wd-avatar" :class="[`wd-avatar--${shape}`]" :style="avatarStyle" @tap="clickHandler">
    <slot>
      <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU  -->
      <open-data v-if="mpAvatar && allowMp" type="userAvatarUrl" :style="imageSizeStyle" />
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN && MP-QQ && MP-BAIDU  -->
      <template v-if="mpAvatar && allowMp"></template>
      <!-- #endif -->
      <wd-icon v-else-if="icon" :name="icon" :size="fontSize" :color="color" />
      <wd-text v-else-if="text" :text="text" :size="fontSize" :color="color" customStyle="justify-content: center" />
      <image
        v-else
        class="wd-avatar__image"
        :class="[`wd-avatar__image--${shape}`]"
        :src="avatarUrl || defaultUrl"
        :mode="mode"
        @error="errorHandler"
        :style="imageSizeStyle"
      />
      <view v-if="sexIcon" class="wd-avatar__sex" :class="['wd-avatar__sex--' + sexIcon]" :style="uSexStyle">
        <wd-icon :name="sexIcon" :size="addUnit(Number(size) / 3)" />
      </view>
      <view v-if="showLevel" class="wd-avatar__level" :style="uLevelStyle">
        <wd-icon name="heart-filled" :size="addUnit(Number(size) / 3)" />
      </view>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-avatar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { addUnit, objToStyle } from '../common/util'
import { avatarProps } from './types'

// 定义属性
const props = defineProps(avatarProps)

const base64Avatar =
  'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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'

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

/**
 * 性别图标的自定义样式
 */
const uSexStyle = computed(() => {
  let style: Record<string, string> = {}
  if (props.sexBgColor) style.backgroundColor = props.sexBgColor
  return style
})

/**
 * 等级图标的自定义样式
 */
const uLevelStyle = computed(() => {
  let style: Record<string, string> = {}
  if (props.levelBgColor) style.backgroundColor = props.levelBgColor
  return style
})

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
  avatarUrl.value = props.defaultUrl || base64Avatar
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
onLoad(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
