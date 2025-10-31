<template>
  <page-wraper>
    <view class="container">
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button type="primary" @click="clickLoading(0)">基本语法</wd-button>
      </demo-block>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button type="primary" @click="clickLoading(1)">自定义图片</wd-button>
      </demo-block>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button type="primary" @click="clickLoading(2)">自定义加载动画模式</wd-button>
      </demo-block>
      <demo-block :title="$t('jiBenYongFa')">
        <wd-button type="primary" @click="clickLoading(3)">自定义背景色</wd-button>
      </demo-block>
      <wd-loading-page :loading="show" v-bind="loadingPageData" />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const loadingPageData = ref({
  color: '',
  // 字体大小
  fontSize: 19,
  // 自定义提示内容
  loadingText: '',
  // 自定义图片
  image: '',
  // 自定义加载图标大小
  iconSize: 28,
  // 加载动画颜色
  loadingColor: '',
  // 自定义加载动画模式
  loadingMode: '',
  // 自定义背景色
  bgColor: '#ffffff'
})

const show = ref(false)
const clickLoading = (indexNum: number) => {
  loadingPageData.value = {
    color: '',
    fontSize: 19,
    loadingText: '',
    image: '',
    iconSize: 28,
    loadingColor: '',
    loadingMode: '',
    bgColor: '#ffffff'
  }
  if (indexNum == 0) {
    //自定义提示内容
    loadingPageData.value.loadingMode = 'semicircle'
    loadingPageData.value.loadingText = 'Hello Wot'
    loadingPageData.value.color = '#C8C8C8'
    loadingPageData.value.loadingColor = '#C8C8C8'
  } else if (indexNum == 1) {
    // 自定义图片
    loadingPageData.value.image = '../../static/icon/app.png'
    loadingPageData.value.loadingText = 'Wot UI'
    loadingPageData.value.iconSize = 40
    loadingPageData.value.color = '#C8C8C8'
    loadingPageData.value.loadingColor = '#C8C8C8'
  } else if (indexNum == 2) {
    // 自定义加载动画模式
    loadingPageData.value.loadingMode = 'ring'
    loadingPageData.value.loadingText = 'Wot UI'
    loadingPageData.value.color = '#C8C8C8'
    loadingPageData.value.loadingColor = '#C8C8C8'
  } else if (indexNum == 3) {
    // 自定义背景色
    loadingPageData.value.loadingMode = 'outline'
    loadingPageData.value.bgColor = 'rgba(0, 0, 0, 0.3)'
    loadingPageData.value.loadingText = 'Wot UI'
    loadingPageData.value.color = '#eee'
    loadingPageData.value.loadingColor = '#ddd'
  }
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 1000)
}
</script>
<style lang="scss" scoped></style>
