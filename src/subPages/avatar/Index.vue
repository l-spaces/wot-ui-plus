<template>
  <page-wraper>
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

  import joy from '../../static/img/a2.png'

  const src1 = ref(joy)
  const src2 = ref(joy)
  const src3 = ref(joy)
  const src4 = ref(joy)
  const src5 = ref(joy)
  const src6 = ref(joy)
  const src7 = ref(joy)
  const src8 = ref(joy)
  const urls = ref([
    '../../static/img/a1.png',
    '../../static/img/a5.png',
    '../../static/img/a3.png',
    '../../static/img/a4.png',
    '../../static/img/a2.png',
    '../../static/img/a6.png',
    '../../static/img/a2.png'
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
