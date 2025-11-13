<!--
/**
 * @fileoverview 条件编译测试组件
 * @description 
 * 本文件是 wot-ui-plus 项目中用于测试和验证 uni-app 条件编译功能的 Vue 组件。
 * 该组件位于 vite-plugins 目录下，主要用于验证 vite 插件对条件编译语法的正确处理。
 * 
 * 技术栈：Vue 3 + uni-app 条件编译 + TypeScript
 * 
 * 核心功能：
 * 1. 验证 uni-app 条件编译语法在模板、脚本、样式中的正确性
 * 2. 测试多端（H5、微信小程序、App）差异化渲染能力
 * 3. 为 vite 插件开发提供功能验证用例
 * 4. 作为条件编译使用方法的参考示例
 * 
 * 支持的平台条件编译：
 * - #ifdef H5：仅在 H5 平台生效
 * - #ifdef MP-WEIXIN：仅在微信小程序平台生效  
 * - #ifdef APP-PLUS：仅在 App 平台生效
 * - #ifndef MP-WEIXIN：在非微信小程序平台生效
 * - #ifndef APP-PLUS：在非 App 平台生效
 * - #ifdef MP-WEIXIN || H5：在微信小程序或 H5 平台生效
 * 
 * 主要对外接口：
 * - 组件名称：ConditionalTest
 * - 数据属性：platform（平台标识）、commonData（通用数据）
 * - 方法：h5Method（H5特有）、wxMethod（微信小程序特有）、commonMethod（通用）
 * 
 * 使用场景：
 * - vite 插件开发时的功能测试
 * - 多端兼容性验证
 * - 条件编译语法学习参考
 * - CI/CD 流程中的构建验证
 * 
 * 使用注意事项：
 * 1. 条件编译注释不能被删除或修改，这是 uni-app 的核心语法
 * 2. 不同平台的条件块会根据构建目标进行包含或排除
 * 3. ESLint 规则需要针对条件编译进行特殊配置（如 no-dupe-keys）
 * 4. 开发时需要在对应平台环境下测试才能看到正确效果
 * 5. 该组件主要用于测试，不建议在生产环境中直接使用
 * 
 * @creator wot-ui-plus
 */
-->
<template>
  <view class="conditional-test">
    <!-- #ifdef H5 -->
    <view class="h5-component">H5专属组件</view>
    <!-- #endif -->

    <!-- #ifndef MP-WEIXIN -->
    <view class="common-component">非微信小程序组件</view>
    <!-- #endif -->

    <!-- 始终显示的内容 -->
    <view class="always-show">始终显示的内容</view>

    <!-- #ifdef MP-WEIXIN || H5 -->
    <view class="weixin-or-h5">微信小程序或H5平台显示</view>
    <!-- #endif -->

    <!-- #ifndef APP-PLUS -->
    <view class="not-app">非APP平台显示</view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  name: 'ConditionalTest',
  data() {
    return {
      // #ifdef H5
      platform: 'H5平台',
      // #endif

      // #ifdef MP-WEIXIN
      // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
      platform: '微信小程序平台',
      // #endif

      // #ifdef APP-PLUS
      // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
      platform: 'APP平台',
      // #endif

      // 通用数据
      commonData: '通用数据'
    }
  },
  methods: {
    // #ifdef H5
    h5Method() {
      console.log('H5平台特有方法')
      return 'H5平台特有方法'
    },
    // #endif

    // #ifdef MP-WEIXIN
    wxMethod() {
      console.log('微信小程序平台特有方法')
      return '微信小程序平台特有方法'
    },
    // #endif

    // 通用方法
    commonMethod() {
      console.log('通用方法')
      return '通用方法'
    }
  },
  mounted() {
    // #ifdef H5
    console.log('H5平台特有生命周期')
    // #endif

    // #ifdef MP-WEIXIN
    console.log('微信小程序平台特有生命周期')
    // #endif

    console.log('通用生命周期')
  }
}
</script>

<style>
/* 通用样式 */
.conditional-test {
  padding: 20px;
}

.always-show {
  color: blue;
  font-size: 16px;
}

/* #ifdef H5 */
.h5-component {
  color: green;
  font-size: 18px;
}
/* #endif */

/* #ifdef MP-WEIXIN */
.mp-style {
  color: red;
  font-size: 18px;
}
/* #endif */

/* #ifndef APP-PLUS */
.not-app {
  color: purple;
  font-size: 16px;
}
/* #endif */
</style>
