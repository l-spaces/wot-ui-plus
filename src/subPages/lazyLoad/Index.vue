<template>
  <view class="wrap">
    <!-- <view class="item-warp">
      <view class="item" v-for="(item, index) in list" :key="index">
        <wd-lazy-load height="200" round="10" :image="item.src" :index="index" @statusChange="statusChange" @clickImg="clickImg" />
      </view>
    </view> -->
    <wd-row :gutter="12" wrap>
      <wd-col :span="12" v-for="(item, index) in list" :key="index">
        <view class="item">
          <wd-lazy-load threshold="-450" round="10" :image="item.src" :index="index" @statusChange="statusChange" @clickImg="clickImg" />
        </view>
      </wd-col>
    </wd-row>
    <wd-loadmore :state="status" @reload="getData"></wd-loadmore>
  </view>
</template>

<script setup lang="ts">
import wdLazyLoad from '@/uni_modules/wot-ui-plus/components/wd-lazy-load/wd-lazy-load.vue'
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'

const list = ref<any[]>([])
const status = ref('loading')
const data = ref([
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    // 这里会加载失败，显示错误的占位图
    src: 'error.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1SIYrLXXXXXaAXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB11yxeNVXXXXbwXFXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i3/TB1ndJiQFXXXXctaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i4/TB1BYGDLpXXXXbuXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB1_9GoMVXXXXXmaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB1cSZZNFXXXXaKaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    // 这里会加载失败，显示错误的占位图
    src: 'error.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i8/TB1RVS_QpXXXXXBXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i5/TB1xEJiLXXXXXcxaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1DSuHJVXXXXXmXXXXwu0bFXXX.png_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i5/TB1aMNyLpXXXXa2XXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i8/TB1JRHEQpXXXXXwXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1qKEuQpXXXXXYXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1TlOfQFXXXXX2XXXXwu0bFXXX.png_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1SKu.QpXXXXbDXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    // 这里会加载失败，显示错误的占位图
    src: 'error.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i8/TB1um5GQpXXXXbiaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1pxCTQpXXXXa2apXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1zksMNVXXXXaRapXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i4/TB1nbrcOXXXXXXEXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i4/TB1CI_NQpXXXXXaXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB18vTdQFXXXXXlXpXXwu0bFXXX.png_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1doDVQpXXXXcRaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB17LgBNFXXXXaSXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1fVJJQFXXXXcyXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i3/TB1wnBTKFXXXXcQXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1DX3hIpXXXXXIaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1SIYrLXXXXXaAXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB11yxeNVXXXXbwXFXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i3/TB1ndJiQFXXXXctaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i4/TB1BYGDLpXXXXbuXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB1_9GoMVXXXXXmaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB1cSZZNFXXXXaKaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    // 这里会加载失败，显示错误的占位图
    src: 'error.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i8/TB1RVS_QpXXXXXBXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i5/TB1xEJiLXXXXXcxaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1DSuHJVXXXXXmXXXXwu0bFXXX.png_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i5/TB1aMNyLpXXXXa2XXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i8/TB1JRHEQpXXXXXwXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1qKEuQpXXXXXYXXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1TlOfQFXXXXX2XXXXwu0bFXXX.png_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1SKu.QpXXXXbDXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB17gJ3OXXXXXcrXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i8/TB1um5GQpXXXXbiaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB1pxCTQpXXXXa2apXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i6/TB1zksMNVXXXXaRapXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i4/TB1nbrcOXXXXXXEXpXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i4/TB1CI_NQpXXXXXaXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i2/TB18vTdQFXXXXXlXpXXwu0bFXXX.png_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i7/TB1doDVQpXXXXcRaXXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    src: 'https://gtd.alicdn.com/sns_logo/i1/TB17LgBNFXXXXaSXVXXSutbFXXX.jpg_240x240xz.jpg'
  },
  {
    // 这里会加载失败，显示错误的占位图
    src: 'error.jpg'
  }
])

onLoad(() => {
  getData()
  // 模拟初始加载完成
  setTimeout(() => {
    status.value = 'finished'
  }, 1500)
})

// 页面滚动到底部时加载更多
onReachBottom(() => {
  status.value = 'loading'
  // 模拟数据加载延迟
  setTimeout(() => {
    getData()
    status.value = 'finished'
  }, 1000)
})

function statusChange(status: any) {
  console.log(status)
}

function clickImg(img: any) {
  console.log(img)
}

const getData = (): void => {
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * (data.value.length - 1))
    list.value.push({
      src: data.value[index].src
    })
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}
</style>
