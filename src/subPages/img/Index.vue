<template>
  <view>
    <wd-img :width="100" :height="100" :src="joy" />
    <!-- 以组件位置为定位原点 -->
    <wd-img :width="100" :height="100" :src="img" custom-class="border" />
  </view>
</template>
<script lang="ts" setup>
import { joy } from '../../pages/images/joy'
import img from '../../pages/images/jd.png'
import type { ImageMode } from '@/uni_modules/wot-design-uni/components/wd-img/types'

const modes: ImageMode[] = [
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right',
  'left',
  'center',
  'bottom',
  'top',
  'heightFix',
  'widthFix',
  'scaleToFill',
  'aspectFit',
  'aspectFill'
]
</script>

<style lang="scss" scoped>
.col {
  display: inline-block;
  width: 33.333%;
  box-sizing: border-box;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
.center {
  text-align: center;
}
:deep(.border) {
  border: 1px solid red;
  margin: 0 10px;
}

.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}

.loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
