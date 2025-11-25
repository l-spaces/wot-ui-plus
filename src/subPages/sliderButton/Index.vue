<template>
  <view class="wd-page">
    <demo-block title="基础用法">
      <view class="wd-demo-area">
        <wd-slider-button :text="'滑动解锁'" @success="onSliderSuccess" @reset="onSliderReset" />
      </view>
    </demo-block>

    <demo-block title="自定义样式">
      <view class="wd-demo-area">
        <wd-slider-button
          :text="sliderData.text"
          :successText="sliderData.successText"
          :bgColor="sliderData.bgColor"
          :railColor="sliderData.railColor"
          :height="45"
          textColor="#ffffff"
          :textBold="true"
          railIndex="10"
          threshold="150"
          autoReset
          @reset="onCustomSuccess"
        />
      </view>
    </demo-block>

    <demo-block title="禁用状态">
      <view class="wd-demo-area">
        <wd-slider-button :text="'已禁用'" :width="300" :height="50" :disabled="true" />
      </view>
    </demo-block>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  // 滑块数据接口定义
  interface SliderData {
    text: string
    successText: string
    bgColor: string
    railColor: string
  }

  // 响应式数据
  const sliderRef = ref(null)
  const sliderData = ref<SliderData>({
    text: '开始出发',
    successText: '开始出发',
    bgColor: 'rgb(230, 27, 47)',
    railColor: 'rgba(230, 27, 47, 0.85)'
  })

  // 基础用法 - 滑动成功
  const onSliderSuccess = () => {
    uni.showToast({
      title: '滑动验证成功！',
      icon: 'success'
    })
  }

  // 基础用法 - 重置
  const onSliderReset = () => {
    console.log('滑动按钮已重置')
  }

  // 自定义样式 - 滑动成功
  const onCustomSuccess = () => {
    sliderData.value = {
      text: '接到乘客',
      successText: '接到乘客',
      bgColor: 'rgb(47, 230, 117)',
      railColor: 'rgba(47, 230, 117, 0.85)'
    }
  }
</script>

<style lang="scss">
  .wd-demo-area {
    padding: 20px 0;
  }
</style>
