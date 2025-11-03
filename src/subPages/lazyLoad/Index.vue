<template>
  <view class="wrap">
    <view class="item-warp">
      <view class="item" v-for="(item, index) in list" :key="index">
        <wd-lazy-load
          height="200"
          round="10"
          :image="item.src"
          :index="index"
          @statusChange="handleStatusChange"
          @clickImg="handleImageClick"
        ></wd-lazy-load>
      </view>
    </view>
    <wd-loadmore :state="status" @reload="loadMoreData"></wd-loadmore>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 定义数据类型接口
interface ImageItem {
  src: string
}

// 使用与wd-loadmore组件types.ts中定义一致的状态类型
type LoadMoreState = 'loading' | 'error' | 'finished'

// 响应式数据
const list = ref<ImageItem[]>([])
const status = ref<LoadMoreState>('loading')

// 预设图片数据
const imageData: ImageItem[] = [
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'error.jpg' }, // 加载失败的图片
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1SIYrLXXXXXaAXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB11yxeNVXXXXbwXFXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i3/TB1ndJiQFXXXXctaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i4/TB1BYGDLpXXXXbuXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB1_9GoMVXXXXXmaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB1cSZZNFXXXXaKaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'error.jpg' }, // 加载失败的图片
  { src: 'https://gtd.alicdn.com/sns_logo/i8/TB1RVS_QpXXXXXBXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i5/TB1xEJiLXXXXXcxaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1DSuHJVXXXXXmXXXXwu0bFXXX.png_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i5/TB1aMNyLpXXXXa2XXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i8/TB1JRHEQpXXXXXwXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1qKEuQpXXXXXYXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1TlOfQFXXXXX2XXXXwu0bFXXX.png_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1SKu.QpXXXXbDXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'error.jpg' }, // 加载失败的图片
  { src: 'https://gtd.alicdn.com/sns_logo/i8/TB1um5GQpXXXXbiaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1pxCTQpXXXXa2apXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1zksMNVXXXXaRapXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i4/TB1nbrcOXXXXXXEXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i4/TB1CI_NQpXXXXXaXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB18vTdQFXXXXXlXpXXwu0bFXXX.png_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1doDVQpXXXXcRaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB17LgBNFXXXXaSXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1fVJJQFXXXXcyXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i3/TB1wnBTKFXXXXcQXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1DX3hIpXXXXXIaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1SIYrLXXXXXaAXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB11yxeNVXXXXbwXFXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i3/TB1ndJiQFXXXXctaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i4/TB1BYGDLpXXXXbuXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB1_9GoMVXXXXXmaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB1cSZZNFXXXXaKaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'error.jpg' }, // 加载失败的图片
  { src: 'https://gtd.alicdn.com/sns_logo/i8/TB1RVS_QpXXXXXBXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i5/TB1xEJiLXXXXXcxaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1DSuHJVXXXXXmXXXXwu0bFXXX.png_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i5/TB1aMNyLpXXXXa2XXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i8/TB1JRHEQpXXXXXwXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1qKEuQpXXXXXYXXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1TlOfQFXXXXX2XXXXwu0bFXXX.png_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1SKu.QpXXXXbDXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB17gJ3OXXXXXcrXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i8/TB1um5GQpXXXXbiaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1pxCTQpXXXXa2apXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1zksMNVXXXXaRapXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i4/TB1nbrcOXXXXXXEXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i4/TB1CI_NQpXXXXXaXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i2/TB18vTdQFXXXXXlXpXXwu0bFXXX.png_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1doDVQpXXXXcRaXXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB17LgBNFXXXXaSXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'error.jpg' } // 加载失败的图片
]

// 生成随机数的辅助函数
const getRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * max)
}

// 处理图片状态变化
const handleStatusChange = (status: any): void => {
  // 可在此添加状态变化的处理逻辑
  console.log('图片状态变化:', status)
}

// 处理图片点击
const handleImageClick = (img: any): void => {
  // 可在此添加图片点击的处理逻辑
  console.log('图片被点击:', img)
}

// 加载更多数据
const loadMoreData = (): void => {
  // 防止重复加载
  if (status.value === 'finished') return

  status.value = 'loading'

  // 模拟网络请求延迟
  setTimeout(() => {
    const newItems: ImageItem[] = []

    // 生成10个随机图片项
    for (let i = 0; i < 10; i++) {
      const randomIndex = getRandomIndex(imageData.length)
      newItems.push({
        src: imageData[randomIndex].src
      })
    }

    // 添加新数据到列表
    list.value.push(...newItems)

    // 恢复加载状态
    status.value = 'error'
  }, 1500)
}

// 生命周期钩子：组件挂载时初始化数据
onMounted(() => {
  loadMoreData()
})

// 为UniApp框架添加页面滚动到底部的生命周期处理
// 注意：在Vue 3 setup中，需要通过uni API来处理页面级生命周期
uni.addInterceptor('onReachBottom', {
  success: () => {
    loadMoreData()
  }
})
</script>

<style lang="scss" scoped>
.wrap {
  padding: 15px;
}

.item-warp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item-warp .item {
  width: 48%;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
