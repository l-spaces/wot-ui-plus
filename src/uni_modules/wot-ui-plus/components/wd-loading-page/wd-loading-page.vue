<template>
  <wd-transition :show="loading" :style="{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: bgColor }">
    <view class="wd-loading-page">
      <view class="wd-loading-page__warpper">
        <view>
          <image v-if="image" :src="image" mode="widthFit" :style="{ width: addUnit(iconSize), height: addUnit(iconSize) }" />
          <wd-loading v-else :type="type" :size="iconSize" :color="loadingColor" />
        </view>
        <slot>
          <text :style="{ fontSize: addUnit(fontSize), color: color }">{{ text }}</text>
        </slot>
      </view>
    </view>
  </wd-transition>
</template>
<script lang="ts">
  export default {
    name: 'wd-loading-page',
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  }
</script>

<script lang="ts" setup>
  import wdTransition from '../wd-transition/wd-transition.vue'
  import wdLoading from '../wd-loading/wd-loading.vue'
  import { loadingPageProps } from './types'
  import { addUnit } from '../common/util'

  const props = defineProps(loadingPageProps)
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
