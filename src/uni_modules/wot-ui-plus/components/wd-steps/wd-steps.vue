<template>
  <view :class="`wd-steps ${customClass} ${vertical ? 'is-vertical' : ''}`" :style="customStyle">
    <slot />
  </view>
</template>
<script lang="ts">
  export default {
    name: 'wd-steps',
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared'
    }
  }
</script>
<script lang="ts" setup>
  import { useChildren } from '../composables/useChildren'
  import { STEPS_KEY, stepsProps } from './types'

  const props = defineProps(stepsProps)

  const { linkChildren } = useChildren(STEPS_KEY)

  linkChildren({ props })
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
