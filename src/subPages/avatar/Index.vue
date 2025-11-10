<template>
  <page-wraper showDarkMode>
    <demo-block title="基础演示">
      <view class="avatar-row">
        <view class="wd-avatar-item">
          <wd-avatar :src="src1" sexIcon="male"></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar :src="src2" sexIcon="female"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="头像形状">
      <view class="avatar-row">
        <view class="wd-avatar-item">
          <wd-avatar :src="src3" shape="circle" showLevel size="40" sexIcon="male" @click="click"></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar :src="src4" shape="square" showLevel size="60" sexIcon="female"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="头像尺寸">
      <view class="avatar-row">
        <view class="wd-avatar-item">
          <wd-avatar :src="src5" size="30"></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar :src="src6" size="40"></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar :src="src7" size="50"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="图标头像">
      <view class="avatar-row">
        <view class="wd-avatar-item">
          <wd-avatar icon="logo-douyin-o" fontSize="22"></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar icon="logo-wechat" shape="square" fontSize="22"></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="文字头像(自动背景色)">
      <view class="avatar-row">
        <view class="wd-avatar-item">
          <wd-avatar text="A" fontSize="20" randomBgColor :colorIndex="0"></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar text="赵" fontSize="18" randomBgColor></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar text="钱" fontSize="18" randomBgColor></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar text="孙" fontSize="18" randomBgColor></wd-avatar>
        </view>
        <view class="wd-avatar-item">
          <wd-avatar text="李" fontSize="18" randomBgColor></wd-avatar>
        </view>
      </view>
    </demo-block>

    <demo-block title="图片加载失败(显示默认头像)">
      <wd-avatar :src="src8"></wd-avatar>
    </demo-block>
    <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU -->
    <demo-block title="小程序开放能力">
      <view class="avatar-row">
        <view class="wd-avatar-item">
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

const src1 = ref('http://106.55.153.212:88/a1.png')
const src2 = ref('http://106.55.153.212:88/a2.png')
const src3 = ref('http://106.55.153.212:88/a3.png')
const src4 = ref('http://106.55.153.212:88/a4.png')
const src5 = ref('http://106.55.153.212:88/a5.png')
const src6 = ref('http://106.55.153.212:88/a6.png')
const src7 = ref('http://106.55.153.212:88/a7.png')
const src8 = ref('http://106.55.153.212:88/noExist.png')
const urls = ref([
  'http://106.55.153.212:88/a1.png',
  'http://106.55.153.212:88/a2.png',
  'http://106.55.153.212:88/a3.png',
  'http://106.55.153.212:88/a4.png',
  'http://106.55.153.212:88/a7.png',
  'http://106.55.153.212:88/a6.png',
  'http://106.55.153.212:88/a5.png'
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

.wd-avatar-item {
  margin-right: 30px;
}
</style>
