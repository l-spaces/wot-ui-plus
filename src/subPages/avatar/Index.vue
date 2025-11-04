<template>
  <page-wraper>
    <demo-block title="基础演示">
      <wd-avatar :src="src1"></wd-avatar>
    </demo-block>

    <demo-block title="头像形状">
      <view class="avatar-row">
        <view class="u-avatar-item">
          <wd-avatar :src="src2" shape="circle" @click="click"></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar :src="src3" shape="square"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="头像尺寸">
      <view class="avatar-row">
        <view class="u-avatar-item">
          <wd-avatar :src="src4" size="30"></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar :src="src5" size="40"></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar :src="src6" size="50"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="图标头像">
      <view class="avatar-row">
        <view class="u-avatar-item">
          <wd-avatar icon="apple" fontSize="22"></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar icon="ie" fontSize="22"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="文字头像(自动背景色)">
      <view class="avatar-row">
        <view class="u-avatar-item">
          <wd-avatar text="A" fontSize="20" randomBgColor :colorIndex="0"></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar text="赵" fontSize="18" randomBgColor></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar text="钱" fontSize="18" randomBgColor></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar text="孙" fontSize="18" randomBgColor></wd-avatar>
        </view>
        <view class="u-avatar-item">
          <wd-avatar text="李" fontSize="18" randomBgColor></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="图片加载失败(显示默认头像)">
      <wd-avatar :src="src7"></wd-avatar>
    </demo-block>
    <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU -->
    <demo-block title="小程序开放能力">
      <view class="avatar-row">
        <view class="u-avatar-item">
          <wd-avatar mpAvatar size="50"></wd-avatar>
        </view>
      </view>
    </demo-block>
    <!-- #endif -->

    <demo-block title="头像组">
      <wd-avatar-group :urls="urls" size="35" gap="0.4"></wd-avatar-group>
      <view style="margin-top: 20px">
        <wd-avatar-group :urls="urls" size="35" gap="0.6"></wd-avatar-group>
      </view>
    </demo-block>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const src1 = ref('https://cdn.uviewui.com/uview/album/1.jpg')
const src2 = ref('https://cdn.uviewui.com/uview/album/2.jpg')
const src3 = ref('https://cdn.uviewui.com/uview/album/3.jpg')
const src4 = ref('https://cdn.uviewui.com/uview/album/4.jpg')
const src5 = ref('https://cdn.uviewui.com/uview/album/5.jpg')
const src6 = ref('https://cdn.uviewui.com/uview/album/6.jpg')
const src7 = ref('https://cdn.uviewui.com/uview/album/noExist.jpg')
const urls = ref([
  'https://cdn.uviewui.com/uview/album/1.jpg',
  'https://cdn.uviewui.com/uview/album/2.jpg',
  'https://cdn.uviewui.com/uview/album/3.jpg',
  'https://cdn.uviewui.com/uview/album/4.jpg',
  'https://cdn.uviewui.com/uview/album/7.jpg',
  'https://cdn.uviewui.com/uview/album/6.jpg',
  'https://cdn.uviewui.com/uview/album/5.jpg'
])

function click(name: any) {
  console.log('click', name)
}
</script>

<style lang="scss" scoped>
.avatar-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.u-avatar-item {
  margin-right: 30px;
}
</style>
