<!--
 * @Author: weisheng
 * @Date: 2025-03-31 11:23:58
 * @LastEditTime: 2025-04-02 20:34:07
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-ui-plus/src/pages/loadmore/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view class="container">
      <view v-for="index in num" :key="index" class="list-item">
        <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
        <view class="right">{{ $t('zhe-shi-yi-tiao-ce-shi-index') + index + 1 }}</view>
      </view>
      <wd-loadmore :state="state" @reload="loadmore" />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

const state = ref<any>('loading')
const num = ref<number>(0)
const max = ref<number>(60)

/**
 * 监听页面滚动到底部事件
 * 当列表数量达到45条时，模拟加载失败，将状态置为错误
 * 若当前数量小于最大限制，则继续加载下一页数据
 * 当数量达到最大限制时，标记为已加载全部，状态置为完成
 */
onReachBottom(() => {
  // 当列表数量达到45条时，模拟加载失败，将状态置为错误
  if (num.value === 45) {
    state.value = 'error'
  } else if (num.value < max.value) {
    // 若当前数量小于最大限制，则继续加载下一页数据
    loadmore()
  } else if (num.value === max.value) {
    // 当数量达到最大限制时，标记为已加载全部，状态置为完成
    state.value = 'finished'
  }
})

onLoad(() => {
  loadmore()
})

function loadmore() {
  setTimeout(() => {
    num.value = num.value + 15
    state.value = 'loading'
  }, 1500)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .list-item {
    background: $-dark-background2;
    color: $-dark-color;
  }
  .list-item:after {
    background: $-dark-border-color;
  }
}

.list-item {
  position: relative;
  display: flex;
  padding: 10px 15px;
  background: #fff;
  color: #464646;
}

.list-item:after {
  position: absolute;
  display: block;
  content: '';
  height: 1px;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #eee;
  transform: scaleY(0.5);
}
image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: 15px;
}
.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>
