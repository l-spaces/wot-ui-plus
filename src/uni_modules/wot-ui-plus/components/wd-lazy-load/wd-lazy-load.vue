<template>
  <view class="wd-lazy-wrap" :style="containerStyle" :data-id="elementId">
    <image
      :style="imgStyle"
      class="wd-lazy-image"
      :class="{ error: isError }"
      :src="currentImageSrc"
      :mode="mode"
      @load="handleImageLoad"
      @error="handleImageError"
      @tap="handleImageClick"
    ></image>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { addUnit, uuid } from '../common/util'
import { lazyLoadProps } from './types'
// 使用全局的IntersectionObserver类型定义
// uni-app环境中使用全局类型，而不是从uni-app导入

// 定义组件属性
const props = defineProps(lazyLoadProps)

// 定义组件事件
const emit = defineEmits(['click', 'load', 'error'])

// 响应式状态
const isVisible = ref(false) // 图片是否可见
const isError = ref(false) // 图片是否加载错误
const opacity = ref(1) // 透明度
const elementId = ref(uuid()) // 唯一元素ID

// 观察者实例 - 使用any类型兼容uni-app环境中的IntersectionObserver实现
let observer: any = null

// 计算属性：获取阈值
const getThreshold = computed(() => {
  // 处理阈值，统一转换为正数并确保有效范围
  const threshold = Math.abs(Number(props.threshold) || 0)
  // 限制阈值范围，避免过大或过小的值影响性能
  return Math.max(0, Math.min(threshold, 1000))
})

// 计算属性：容器样式
const containerStyle = computed(() => {
  const transition = props.isEffect ? `opacity ${Number(props.duration) / 1000}s ${props.effect}` : 'none'
  return {
    opacity: Number(opacity.value),
    borderRadius: addUnit(props.round),
    transition
  }
})

// 计算属性：图片样式
const imgStyle = computed(() => {
  return {
    borderRadius: addUnit(props.round),
    height: addUnit(props.height)
  }
})

// 计算属性：当前显示的图片源
const currentImageSrc = computed(() => {
  if (isError.value) {
    return props.errorImg
  }
  return isVisible.value && props.image ? props.image : props.loadingImg
})

// 监听isVisible变化，处理过渡效果
watch(isVisible, (newVal) => {
  if (!props.isEffect || !newVal) return

  // 实现淡入效果：先透明，再显示
  opacity.value = 0
  setTimeout(() => {
    opacity.value = 1
  }, 30)
})

// 监听图片路径变化，重置状态
watch(
  () => props.image,
  (newImage) => {
    if (!newImage) {
      isError.value = true
    } else {
      isError.value = false
      // 如果图片已经可见，重新初始化观察者以处理新图片
      if (isVisible.value) {
        initObserver()
      }
    }
  }
)

// 处理图片加载完成
const handleImageLoad = () => {
  // 只有在加载实际图片且成功时才触发load事件
  if (isVisible.value && !isError.value && props.image) {
    emit('load', props.index)
  }
}

// 处理图片加载错误
const handleImageError = () => {
  isError.value = true
  emit('error', props.index)
}

// 处理图片点击
const handleImageClick = () => {
  emit('click', props.index)
}

// 初始化交叉观察器
const initObserver = () => {
  // 如果图片已经可见或出错，则不需要再创建观察器
  if (isVisible.value || isError.value) return

  // 清理已存在的观察者
  if (observer) {
    observer.disconnect()
    observer = null
  }

  try {
    // 优先使用原生API
    if (typeof uni.createIntersectionObserver === 'function') {
      // 优化观察器配置
      const options = {
        thresholds: [0.01], // 使用0.01而不是0，避免边界情况
        observeAll: false,
        initialRatio: 0
      }

      // 根据平台特性调整配置
      const platform = uni.getSystemInfoSync().platform
      if (platform === 'android' || platform === 'ios') {
        // 移动端设备可设置更低的阈值以提高性能
        options.thresholds = [0.001]
      }

      observer = uni.createIntersectionObserver(null, options)

      // 计算视口边距配置
      const viewportMargin = {
        top: getThreshold.value,
        bottom: getThreshold.value,
        left: 0,
        right: 0
      }

      // 配置观察器
      observer.relativeToViewport(viewportMargin).observe(`.wd-lazy-wrap[data-id="${elementId.value}"]`, (res: { intersectionRatio: number }) => {
        // 确保res对象存在且有正确的属性
        if (res && typeof res.intersectionRatio === 'number' && res.intersectionRatio > 0) {
          isVisible.value = true
          // 图片可见后，断开观察器以节省性能
          disconnectObserver()
        }
      })
    } else {
      // 降级处理：如果不支持IntersectionObserver，直接显示图片
      console.log('当前环境不支持IntersectionObserver，使用降级方案')
      fallbackToImmediateLoad()
    }
  } catch (error) {
    console.warn('创建交叉观察器失败:', error)
    // 出错时使用降级方案
    fallbackToImmediateLoad()
  }
}

// 断开观察器的辅助函数
const disconnectObserver = () => {
  if (observer) {
    try {
      observer.disconnect()
    } catch (e) {
      console.warn('断开观察器时出错:', e)
    } finally {
      observer = null
    }
  }
}

// 降级到立即加载的辅助函数
const fallbackToImmediateLoad = () => {
  // 使用setTimeout确保在下一个事件循环中执行，避免阻塞主线程
  setTimeout(() => {
    isVisible.value = true
  }, 0)
}

// 生命周期：组件挂载后初始化
onMounted(() => {
  // 监听页面滚动到底部事件，确保所有图片都能加载
  uni.$once('uOnReachBottom', () => {
    if (!isVisible.value) {
      isVisible.value = true
      disconnectObserver() // 使用统一的断开方法
    }
  })

  // 确保DOM已渲染完成后初始化观察器
  // 30ms的延迟足够让DOM更新，但不会造成明显延迟
  setTimeout(() => {
    // 只有在有实际图片需要加载时才初始化观察器
    if (props.image) {
      initObserver()
    } else {
      // 如果没有图片源，直接显示错误状态
      isError.value = true
    }
  }, 30)
})

// 生命周期：组件卸载前清理
onBeforeUnmount(() => {
  // 清理观察器，防止内存泄漏
  disconnectObserver()

  // 移除页面滚动事件监听，避免内存泄漏
  try {
    uni.$off('uOnReachBottom')
  } catch (e) {
    // 忽略移除不存在事件的错误
  }
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
