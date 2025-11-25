<template>
  <view class="wd-slider-button" :id="sliderButtonId" :style="rootStyle">
    <view class="wd-slider-button__rail" :style="railStyle">
      <view
        class="wd-slider-button__thumb"
        :style="thumbStyle"
        @touchstart.stop.prevent="onThumbStart"
        @touchmove.stop.prevent="onThumbMove"
        @touchend.stop.prevent="onThumbEnd"
        @touchcancel.stop.prevent="onThumbEnd"
      >
        <slot name="thumb">
          <view class="wd-slider-button__thumb--inner" :style="thumbInnerStyle">
            <wd-icon name="double-right" :color="railColor" size="40"></wd-icon>
          </view>
        </slot>
      </view>
    </view>
    <slot>
      <text class="wd-slider-button__text" :style="textStyle">
        {{ displayText }}
      </text>
    </slot>
  </view>
</template>

<script lang="ts">
  export default {
    name: 'wd-slider-button',
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared'
    }
  }
</script>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, type CSSProperties } from 'vue'
  import { addUnit, getRect, uuid } from '../common/util'
  import { sliderButtonProps } from './types'

  // 组件属性定义
  const props = defineProps(sliderButtonProps)

  // 事件定义
  const emit = defineEmits<{
    change: [percent: number]
    success: []
    reset: []
  }>()

  // 响应式状态
  const sliderButtonId = ref(`slider-button-${uuid()}`)
  const success = ref(false)
  const useTransition = ref(false)
  const thumbX = ref(0)
  const areaWidth = ref(0)
  const areaLeft = ref(0)
  const isDragging = ref(false)
  const dragOffsetX = ref(0)

  // 计算属性：根节点样式
  const rootStyle = computed(() => {
    return [
      {
        width: addUnit(props.width),
        height: addUnit(props.height),
        borderRadius: addUnit(props.round),
        backgroundColor: props.bgColor
      },
      props.customStyle
    ] as CSSProperties[]
  })

  // 计算属性：轨道样式
  const railStyle = computed(() => {
    const thumbW = getPxValue(props.height)
    const rawWidth = thumbX.value + thumbW
    const width = Math.max(thumbW, Math.min(areaWidth.value, rawWidth))

    return {
      zIndex: props.railIndex || 1,
      width: addUnit(width),
      backgroundColor: props.railColor,
      borderRadius: addUnit(props.railRadius),
      transition: useTransition.value ? 'none' : 'width 0.3s ease-out'
    } as CSSProperties
  })

  // 计算属性：滑块样式
  const thumbStyle = computed(() => {
    return {
      width: addUnit(props.height),
      height: addUnit(props.height)
    } as CSSProperties
  })

  // 计算属性：滑块内部样式
  const thumbInnerStyle = computed(() => {
    const size = getPxValue(props.height) - 8
    return {
      width: addUnit(size),
      height: addUnit(size)
    } as CSSProperties
  })

  // 计算属性：文本样式
  const textStyle = computed(() => {
    return {
      fontWeight: props.textBold ? 'bold' : 'normal',
      fontSize: addUnit(props.fontSize),
      color: success.value ? props.activeTextColor : props.textColor
    } as CSSProperties
  })

  // 计算属性：显示文本
  const displayText = computed(() => {
    return success.value ? props.successText : props.text
  })

  // 计算属性：阈值X坐标
  const thresholdX = computed(() => {
    if (props.threshold) {
      const thresholdValue = getPxValue(props.threshold)
      return thresholdValue > 0 ? thresholdValue : 0
    }
    const thumbW = getPxValue(props.height)
    const max = areaWidth.value - thumbW
    return max > 0 ? max : 0
  })

  // 工具函数：获取像素值
  const getPxValue = (value: string | number): number => {
    if (typeof value === 'number') {
      return value
    }
    const num = parseFloat(value)
    return isNaN(num) ? 0 : num
  }

  // 初始化组件
  const init = async () => {
    try {
      const rect = await getRect(`#${sliderButtonId.value}`, false)
      if (rect && typeof rect.width === 'number' && rect.width > 0) {
        areaWidth.value = rect.width
        areaLeft.value = rect.left || 0
      }

      // 确保thumbX不超过阈值
      if (thumbX.value > thresholdX.value) {
        thumbX.value = thresholdX.value
      }
    } catch (error) {
      console.warn('wd-slider-button: 初始化失败', error)
    }
  }

  // 触摸开始事件处理
  const onThumbStart = (event: TouchEvent) => {
    if (props.disabled || success.value) return

    useTransition.value = true
    isDragging.value = true

    // 记录按下时的指尖相对当前滑块左侧的偏移，避免跳动
    const touch = event.touches[0]
    const offset = touch.clientX - (areaLeft.value + thumbX.value)
    const thumbW = getPxValue(props.height)
    dragOffsetX.value = Math.min(thumbW, Math.max(0, offset))
  }

  // 触摸移动事件处理
  const onThumbMove = (event: TouchEvent) => {
    if (!isDragging.value || props.disabled || success.value) return

    const touch = event.touches[0]
    let nextX = touch.clientX - areaLeft.value - dragOffsetX.value
    const thumbW = getPxValue(props.height)
    const maxX = Math.max(0, areaWidth.value - thumbW)

    // 限制移动范围
    nextX = Math.min(maxX, Math.max(0, nextX))
    thumbX.value = nextX

    // 计算进度百分比
    const percent = thresholdX.value === 0 ? 0 : Math.min(1, thumbX.value / thresholdX.value)
    emit('change', percent)
  }

  // 触摸结束事件处理
  const onThumbEnd = () => {
    if (!isDragging.value) return

    isDragging.value = false
    useTransition.value = false

    if (success.value) return

    if (thumbX.value < thresholdX.value) {
      reset()
    } else {
      handleSuccess()
    }
  }

  // 处理成功状态
  const handleSuccess = () => {
    if (success.value) return

    success.value = true
    thumbX.value = areaWidth.value
    emit('success')

    // 自动重置
    if (props.autoReset) {
      setTimeout(() => {
        useTransition.value = true
        reset()
      }, props.resetDelay)
    }
  }

  // 重置组件状态
  const reset = () => {
    success.value = false
    thumbX.value = 0
    emit('reset')
  }

  // 组件挂载后初始化
  onMounted(() => {
    nextTick(() => {
      init()
    })
  })

  // 暴露方法给父组件
  defineExpose({
    init,
    reset,
    handleSuccess
  })
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
