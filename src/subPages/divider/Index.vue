<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-divider></wd-divider>
      <wd-divider :hairline="false"></wd-divider>
    </demo-block>

    <demo-block title="展示文本" transparent>
      <wd-divider>展示文本</wd-divider>
    </demo-block>

    <demo-block title="自定义渲染内容" transparent>
      <wd-divider>
        <wd-icon name="down" size="20" />
      </wd-divider>
    </demo-block>

    <demo-block title="内容位置" transparent>
      <wd-divider>中间</wd-divider>
      <wd-divider content-position="left">左侧</wd-divider>
      <wd-divider content-position="right">右侧</wd-divider>
    </demo-block>

    <demo-block title="虚线" transparent>
      <wd-divider dashed></wd-divider>
      <wd-divider dashed>虚线分割</wd-divider>
    </demo-block>

    <demo-block title="自定义颜色" transparent>
      <wd-divider color="#4D80F0">自定义颜色</wd-divider>
    </demo-block>

    <demo-block title="垂直分割线" transparent>
      <view class="content">
        <text>文本</text>
        <wd-divider vertical />
        <text>文本</text>
        <wd-divider vertical dashed />
        <text>文本</text>
        <wd-divider vertical :hairline="false" />
        <text>文本</text>
        <wd-divider vertical color="#1989fa" />
        <text>文本</text>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  .content {
    padding: 12rpx 15px;
  }
</style>
