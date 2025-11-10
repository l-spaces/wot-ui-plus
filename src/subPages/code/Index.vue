<template>
  <view class="wd-page">
    <demo-block title="基础功能">
      <wd-code ref="wCode" @change="codeChange" seconds="20" change-text="XS获取" @start="disabled1 = true" @end="disabled1 = false" />
      <wd-button @tap="getCode" type="success" :disabled="disabled1">{{ tips }}</wd-button>
    </demo-block>

    <demo-block title="保持倒计时">
      <wd-code ref="wCode1" @change="codeChange1" keep-running change-text="倒计时XS" @start="disabled2 = true" @end="disabled2 = false" />
      <wd-button type="primary" @tap="getCode1" :disabled="disabled2">{{ tips1 }}</wd-button>
    </demo-block>

    <demo-block title="文本样式">
      <wd-code ref="wCode2" @change="codeChange2" keep-running start-text="点我获取验证码"></wd-code>
      <text @tap="getCode2" :text="tips2" class="u-page__code-text">{{ tips2 }}</text>
    </demo-block>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 定义组件引用类型
interface WCodeInstance {
  canGetCode: boolean
  start: () => void
}

// 响应式数据定义
const tips = ref<string>('')
const tips1 = ref<string>('')
const tips2 = ref<string>('')
const disabled1 = ref<boolean>(false)
const disabled2 = ref<boolean>(false)

// 组件引用
const wCode = ref<WCodeInstance | null>(null)
const wCode1 = ref<WCodeInstance | null>(null)
const wCode2 = ref<WCodeInstance | null>(null)

// 生命周期钩子
onMounted(() => {
  // Vue 3 中不需要特别处理组件引用，直接通过 ref 获取即可
})

// 事件处理函数
const codeChange = (text: string): void => {
  tips.value = text
}

const codeChange1 = (text: string): void => {
  tips1.value = text
}

const codeChange2 = (text: string): void => {
  tips2.value = text
}

const getCode = (): void => {
  if (wCode.value?.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码'
    })
    setTimeout(() => {
      uni.hideLoading()
      // 这里此提示会被start()方法中的提示覆盖
      uni.showToast({
        title: '验证码已发送'
      })
      // 通知验证码组件内部开始倒计时
      wCode.value?.start()
    }, 2000)
  } else {
    uni.showToast({
      title: '倒计时结束后再发送'
    })
  }
}

const getCode1 = (): void => {
  if (wCode1.value?.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码'
    })
    setTimeout(() => {
      uni.hideLoading()
      // 这里此提示会被start()方法中的提示覆盖
      uni.showToast({
        title: '验证码已发送'
      })
      // 通知验证码组件内部开始倒计时
      wCode1.value?.start()
    }, 2000)
  } else {
    uni.showToast({
      title: '倒计时结束后再发送'
    })
  }
}

const getCode2 = (): void => {
  if (wCode2.value?.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码'
    })
    setTimeout(() => {
      uni.hideLoading()
      // 这里此提示会被start()方法中的提示覆盖
      uni.showToast({
        title: '验证码已发送'
      })
      // 通知验证码组件内部开始倒计时
      wCode2.value?.start()
    }, 2000)
  } else {
    uni.showToast({
      title: '倒计时结束后再发送'
    })
  }
}
</script>

<style lang="scss" scoped>
.wd-page {
  &__code-text {
    color: #007aff;
    font-size: 15px;
  }
}
</style>
