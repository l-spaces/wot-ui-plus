<template>
  <view>
    <page-wraper>
      <wd-toast />
      <view class="grid">
        <demo-block title="基本用法" transparent>
          <wd-grid clickable border :gutter="20" :column="3" bg-color="rgb(185 185 179)">
            <wd-grid-item icon="picture" text="文字1" isDot />
            <wd-grid-item icon="picture" text="文字2" />
            <wd-grid-item icon="picture" text="文字3" />
            <wd-grid-item icon="picture">
              <image
                src="https://ik.imagekit.io/anyup/uview-pro/grid/hot6.png"
                style="width: 44rpx; height: 44rpx; top: 0; right: 0; position: absolute"
                class="badge-icon"
              ></image>
              <wd-icon name="add" size="26" />
              <view style="margin-top: 4px">文字4</view>
            </wd-grid-item>
            <wd-grid-item icon="picture" text="文字5" />
            <wd-grid-item icon="picture" text="文字6" />
            <wd-grid-item icon="picture" text="文字7" />
            <wd-grid-item icon="picture" text="文字8" />
            <wd-grid-item icon="picture" text="文字9" />
          </wd-grid>
        </demo-block>
        <demo-block title="自定义列数" transparent>
          <wd-grid :column="3">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="自定义背景颜色">
          <wd-grid bg-color="rgba(0, 0, 0, 0.02)">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="显示border">
          <wd-grid :column="3" border>
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="内容插槽" transparent>
          <wd-grid>
            <wd-grid-item use-slot>
              <image class="img" :src="joy" />
            </wd-grid-item>
            <wd-grid-item use-slot>
              <image class="img" :src="joy" />
            </wd-grid-item>
            <wd-grid-item use-slot>
              <image class="img" :src="joy" />
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block title="图标插槽" transparent>
          <wd-grid>
            <wd-grid-item use-icon-slot text="文字" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
            <wd-grid-item use-icon-slot text="文字" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
            <wd-grid-item use-icon-slot text="文字" icon-size="36px">
              <template #icon>
                <image class="slot-img" :src="img" />
              </template>
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block title="文字插槽" transparent>
          <wd-grid>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">自定义文字插槽</view>
              </template>
            </wd-grid-item>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">自定义文字插槽</view>
              </template>
            </wd-grid-item>
            <wd-grid-item use-text-slot icon="picture">
              <template #text>
                <view class="text">自定义文字插槽</view>
              </template>
            </wd-grid-item>
          </wd-grid>
        </demo-block>
        <demo-block title="自定义样式" transparent>
          <wd-grid>
            <wd-grid-item custom-class="custom-item" icon="search" text="Wot UI Plus一个高颜值、轻量化的uni-app组件库。" />
            <wd-grid-item custom-class="custom-item" icon="setting" text="基于Vue3+TS开发，提供70+高质量组件，支持暗黑模式、国际化和自定义主题。" />
          </wd-grid>
        </demo-block>
        <demo-block title="正方形格子" transparent>
          <wd-grid square :column="4" :gutter="10">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="设定格间隙" transparent>
          <wd-grid :gutter="10" :column="4">
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
            <wd-grid-item icon="picture" text="文字" />
          </wd-grid>
        </demo-block>
        <demo-block title="页面导航" transparent>
          <wd-grid clickable>
            <wd-grid-item link-type="redirectTo" url="/pages/button/Index" @itemclick="click" icon="edit" text="Redirect to ..." />
            <wd-grid-item link-type="navigateTo" url="/pages/button/Index" @itemclick="click" icon="add" text="Navigate to ..." />
          </wd-grid>
        </demo-block>
        <demo-block title="提示信息" transparent>
          <wd-grid>
            <wd-grid-item is-dot icon="good" text="文字" />
            <wd-grid-item :value="100" :max="99" icon="message-emoji" text="文字" />
          </wd-grid>
        </demo-block>
      </view>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
  import { useToast } from '@/uni_modules/wot-ui-plus'
  import joy from '../../static/img/a2.png'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const img = ref<string>(joy)

  const toast = useToast()
  function click() {
    toast.show(t('cheng-gong-tiao-zhuan'))
  }
</script>
<style lang="scss" scoped>
  .wot-theme-dark {
    .grid {
      :deep(.custom-item) {
        color: #e2231a;
        background: $-dark-background2;
      }
    }
  }

  :deep(.custom-item) {
    height: 80px !important;
    color: #e2231a;
    text-align: left !important;
    padding: 0 10px;
    background: #fff;
  }
  .img {
    width: 100%;
    height: 90px;
    display: inline-block;
    background-size: cover;
    vertical-align: middle;
  }
  .slot-img {
    height: 36px;
    width: 36px;
    border-radius: 4px;
  }
  .text {
    color: #ffb300;
    margin-top: 8px;
  }
</style>
