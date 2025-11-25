<template>
  <view>abc</view>
</template>

<script lang="ts">
  export default {
    name: 'wd-abc',
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  }
</script>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, type CSSProperties } from 'vue'
  import { addUnit, objToStyle, getRect, uuid } from '../common/util'
  import { abcProps } from './types'

  // 定义属性
  const props = defineProps(abcProps)
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
