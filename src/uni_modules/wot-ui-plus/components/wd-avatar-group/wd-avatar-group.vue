<template>
  <view class="wd-avatar-group">
    <view class="wd-avatar-group__item" v-for="(item, index) in showUrls" :key="index" :style="itemStyle(index)">
      <wd-avatar :size="size" :shape="shape" :mode="mode" :src="getImageSource(item)" />
      <view
        class="wd-avatar-group__item__show-more"
        v-if="showMore && index === showUrls.length - 1 && (Number(urls.length) > Number(maxCount) || Number(extraValue) > 0)"
        @tap="clickHandler"
      >
        <wd-text
          color="#ffffff"
          :size="Number(size) * 0.4"
          :text="`+${extraValue || urls.length - showUrls.length}`"
          customStyle="justify-content: center"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-avatar-group',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { addUnit } from '../common/util'
import { avatarProps } from './types'

// 定义属性
const props = defineProps(avatarProps)

// 定义事件
const emit = defineEmits<{
  showMore: []
}>()

// 检查是否为对象的工具函数
const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

// 获取要显示的头像URL列表
const showUrls = computed(() => {
  return props.urls.slice(0, Number(props.maxCount))
})

// 计算每个头像项的样式
const itemStyle = (index: number) => {
  const gap = typeof props.gap === 'string' ? Number(props.gap) : props.gap
  return {
    marginLeft: index === 0 ? 0 : addUnit(-props.size * gap)
  }
}

// 获取图片源
const getImageSource = (item: any): string => {
  if (isObject(item)) {
    // 优先使用keyName指定的属性，如果不存在则使用item.url
    return props.keyName && item[props.keyName] ? String(item[props.keyName]) : item.url ? String(item.url) : ''
  }
  // 如果不是对象，直接返回字符串形式
  return String(item)
}

// 点击查看更多的处理函数
const clickHandler = () => {
  emit('showMore')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
