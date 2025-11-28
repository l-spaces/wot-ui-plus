<template>
  <view
    class="wd-subsection"
    ref="wd-subsection"
    :class="[`wd-subsection--${mode}`, `wd-subsection--${mode}__${shape}`]"
    :style="[customStyle, wrapperStyle]"
  >
    <!-- 滑块元素 -->
    <view
      class="wd-subsection__bar"
      ref="wd-subsection__bar"
      :style="[barStyle]"
      :class="[
        mode === 'button' && `wd-subsection--button__${shape}__bar`,
        innerValue === 0 && mode === 'box' && `wd-subsection__bar--first--${shape}`,
        innerValue > 0 && innerValue < options.length - 1 && mode === 'box' && `wd-subsection__bar--center`,
        innerValue === options.length - 1 && mode === 'box' && `wd-subsection__bar--last--${shape}`
      ]"
    ></view>

    <!-- 选项列表 -->
    <view
      class="wd-subsection__item"
      :class="[
        `wd-subsection__item--${index}`,
        index < options.length - 1 && 'wd-subsection__item--no-border-right',
        index === 0 && `wd-subsection__item--first--${shape}`,
        index === options.length - 1 && `wd-subsection__item--last--${shape}`
      ]"
      :ref="`wd-subsection__item--${index}`"
      :style="[createItemStyle(item)]"
      @tap="clickHandler(index, item)"
      v-for="(item, index) in options"
      :key="index"
    >
      <view class="wd-subsection__item__text" :style="[createTextStyle(index, item)]">
        <slot name="label" v-if="$slots.label" :option="isObj(item) ? item : { value: item }"></slot>
        <template v-else>
          <text>{{ getText(item) }}</text>
        </template>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  export default {
    name: 'wd-segmented',
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  }
</script>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onBeforeUnmount, watch, ref, type CSSProperties, getCurrentInstance } from 'vue'
  import { addUnit, isObj, getRect, uuid } from '../common/util'
  import { segmentedProps } from './types'

  const props = defineProps(segmentedProps)

  // 定义事件
  const emit = defineEmits(['change', 'update:value'])

  // 组件尺寸
  const itemRect = ref({
    width: 0,
    height: 0
  })

  // 当前激活的索引
  const innerValue = ref(Number(props.value))

  const $item = '.wd-subsection__item'

  const { proxy } = getCurrentInstance() as any

  // 监听list变化，重新初始化
  watch(
    () => props.options,
    () => {
      init()
    }
  )

  // 监听value变化，同步到innerValue
  watch(
    () => props.value,
    (newVal) => {
      if (Number(newVal) !== innerValue.value) {
        innerValue.value = Number(newVal)
      }
      if (props.vibrateShort) {
        uni.vibrateShort({})
      }
    },
    { immediate: true }
  )

  // 容器样式
  const wrapperStyle = computed(() => {
    const style: CSSProperties = {}
    // button模式时，设置背景色
    if (props.mode === 'button') {
      style.backgroundColor = props.disabled ? props.disabledBgColor : props.bgColor
    }
    style.height = addUnit(props.height)
    return style
  })

  // 滑块的样式
  const barStyle = computed(() => {
    const style: CSSProperties = {
      width: addUnit(itemRect.value.width),
      height: addUnit(itemRect.value.height),
      // 通过translateX移动滑块，其移动的距离为索引*item的宽度
      transform: `translateX(${innerValue.value * itemRect.value.width}px)`
    }
    if (props.mode === 'box') {
      // 在subsection模式下，需要动态设置滑块的圆角，因为移动滑块使用的是translateX，无法通过父元素设置overflow: hidden隐藏滑块的直角
      style.backgroundColor = props.disabled ? props.disabledBgColor : props.activeColor
    }

    if (props.mode === 'button' && props.barColor) {
      style.backgroundColor = props.disabled ? props.disabledBgColor : props.barColor
    }

    return style
  })

  // 分段器item的样式生成器
  const createItemStyle = (item: any) => {
    const style: CSSProperties = {}
    if (props.mode === 'box') {
      // 设置border的样式
      const isItemDisabled = typeof item === 'object' && item.disabled
      style.borderColor = props.disabled || isItemDisabled ? props.disabledColor : props.activeColor
      style.borderWidth = '1px'
      style.borderStyle = 'solid'
    }
    return style
  }

  // 分段器文字样式生成器
  const createTextStyle = (index: number, item: any) => {
    const style: CSSProperties = {
      fontWeight: props.bold && innerValue.value === index ? 'bold' : 'normal',
      fontSize: addUnit(props.fontSize)
    }

    let isDisabled = props.disabled
    let inactiveColor = props.inactiveColor
    let activeColor = props.activeColor
    let disabledColor = props.disabledColor

    if (typeof item === 'object') {
      if (item.disabled) {
        isDisabled = true
      }
      if (item.inactiveColor) {
        inactiveColor = item.inactiveColor
      }
      if (item.activeColor) {
        activeColor = item.activeColor
      }
      if (item.disabledColor) {
        disabledColor = item.disabledColor
      }
    }

    // box模式下，激活时默认为白色的文字
    if (props.mode === 'box') {
      if (isDisabled) {
        style.color = disabledColor
      } else {
        style.color = innerValue.value === index ? '#fff' : inactiveColor
      }
    } else {
      // button模式下，激活时文字颜色默认为activeColor
      if (isDisabled) {
        style.color = disabledColor
      } else {
        style.color = innerValue.value === index ? activeColor : inactiveColor
      }
    }
    return style
  }

  // 初始化组件
  const init = () => {
    // 使用nextTick确保DOM已渲染
    nextTick(() => {
      updateItemRect()
    })
  }

  // 窗口大小变化处理
  const windowResize = () => {
    init()
  }

  // 更新分段器项的尺寸信息
  const updateItemRect = () => {
    getRect($item, false, proxy).then((size) => {
      itemRect.value = {
        width: size.width as number,
        height: size.height as number
      }
    })
  }

  // 判断展示文本
  const getText = (item: any) => {
    return typeof item === 'object' ? item[props.keyName] : item
  }

  // 点击事件处理
  const clickHandler = (index: number, item: any) => {
    if (props.disabled || (typeof item === 'object' && item.disabled)) {
      return
    }
    innerValue.value = index
    emit('change', index, item)
    emit('update:value', index)
  }

  // 组件挂载后初始化
  onMounted(() => {
    init()
    //#ifndef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-HARMONY
    uni.onWindowResize(windowResize)
    //#endif
  })

  // 组件卸载前清理
  onBeforeUnmount(() => {
    //#ifndef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-HARMONY
    uni.offWindowResize(windowResize)
    //#endif
  })
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
