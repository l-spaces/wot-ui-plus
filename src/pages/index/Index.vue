<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">
      <view>
        <view class="logo"></view>
        <view class="page__hd">
          <view class="page__title">
            <view class="inline">
              Wot UI Plus
              <text class="version">@{{ packageConfig.version }}</text>
            </view>
          </view>
          <view class="page__desc">Wot UI Plus 是一个基于Vue3+TS开发的uni-app组件库，提供88+高质量组件，支持暗黑模式、国际化和自定义主题。</view>
        </view>
      </view>
      <view class="page__bd">
        <wd-card v-for="(item, index) in list" :key="index" :title="item.name + '(' + item.pages.length + ')'" type="rectangle">
          <view :id="item.id" @click="kindToggle(item.id)">
            <wd-grid square clickable :gutter="10" :column="4" bg-color="rgba(0, 0, 0, 0.02)">
              <wd-grid-item v-for="(page, j) in item.pages" :key="j" :isDot="page.open">
                <template #icon>
                  <image class="kind-list__img" :src="`../../static/images/${page.icon}.png`" @click="handleClick(`/subPages/${page.id}/Index`)" />
                  <!-- <i :class="['kind-list__img', 'iconfont', 'docs-' + page.icon]"></i> -->
                </template>
                <template #text>
                  <wd-text class="kind-list__text" :text="page.id" />
                  <wd-text class="kind-list__text" color="#333333" :text="page.name" />
                </template>
              </wd-grid-item>
            </wd-grid>
          </view>
        </wd-card>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import packageConfig from '../../../package.json'
  import { list } from './Index'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const imgModules: any = import.meta.glob(['../images/*.png', '../images/example/*.png'], { eager: true })

  function handleClick(url: string) {
    uni.navigateTo({
      url
    })
  }

  // 创建一个状态来跟踪每个分类的打开状态
  const openState = ref<Record<string, boolean>>({})

  function kindToggle(id: string) {
    openState.value[id] = !openState.value[id]
  }
</script>

<style lang="scss" scoped>
  @import url('//at.alicdn.com/t/c/font_5070623_8a5d7bjm7un.css');
  .wot-theme-dark {
    .page__hd,
    .title {
      color: $-dark-color;
    }

    :deep(.wd-cell__label) {
      color: $-dark-color3 !important;
    }

    .kind-list__img {
      filter: invert(100%);
    }
  }

  .page__hd {
    padding: 40px 40px 30px;
    // margin-bottom: 30px;
    // background: $-dark-color;
  }

  .page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
    color: #0083ff;
  }

  .page__desc {
    margin-top: 20px;
    color: #000000;
    text-align: left;
    font-size: 12px;
  }

  .logo {
    position: absolute;
    width: 120px;
    height: 100px;
    left: 200px;
    background: url('../../static/img/wot-logo.svg') no-repeat;
    background-size: cover;
    vertical-align: middle;
    background-position: center;
    background-repeat: no-repeat;
  }

  .inline {
    display: inline-block;
    vertical-align: middle;
    background-image: linear-gradient(to bottom right, #ec4899 10%, #1e85ee);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .version {
    font-size: 14px;
  }

  .kind-list__img {
    width: 25px;
    height: 25px;
    font-size: 25px;
  }

  .kind-list__text {
    font-size: 12px;
    color: $-dark-color4;
  }
</style>
