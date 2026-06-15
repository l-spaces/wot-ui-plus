<template>
  <page-wraper>
    <demo-block title="基本用法（适用于按钮加载状态和页面轻提示）">
      <view class="flex">
        <wd-loading custom-class="loading" />
      </view>
    </demo-block>

    <demo-block title="outline 类型（适用于通用模块加载）">
      <view class="flex">
        <wd-loading type="outline" custom-class="loading" />
      </view>
    </demo-block>

    <demo-block :title="$t('spinner-lie-xing')">
      <view class="flex">
        <wd-loading type="spinner" custom-class="loading" />
      </view>
    </demo-block>

    <demo-block :title="$t('xiu-gai-yan-se')">
      <view class="flex">
        <wd-loading custom-class="loading" color="#fa34aa" />
        <wd-loading custom-class="loading" type="spinner" color="#fa34aa" />
      </view>
    </demo-block>

    <demo-block title="修改指示器大小">
      <view class="flex">
        <wd-loading custom-class="loading" :size="20" />
        <wd-loading custom-class="loading" :size="30" />
        <wd-loading custom-class="loading" size="50px" />
      </view>
      <view class="flex my-4">
        <wd-loading type="spinner" custom-class="loading" :size="20" />
        <wd-loading type="spinner" custom-class="loading" :size="30" />
        <wd-loading type="spinner" custom-class="loading" size="50px" />
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  .flex {
    display: flex;
    align-items: center;
  }
  .my-4 {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  :deep(.loading) {
    margin-right: 20px;
  }
</style>
