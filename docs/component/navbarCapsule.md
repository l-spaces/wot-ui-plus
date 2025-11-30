# wd-navbar-capsule 导航栏胶囊组件

## 组件概述

wd-navbar-capsule 是一个简洁的导航栏胶囊组件，包含返回和返回首页两个图标按钮，主要用于导航栏中提供快速返回和返回首页的功能。该组件设计简洁，易于集成，支持自定义样式和事件处理，是构建移动端应用导航栏的常用组件。

### 功能特点
- 包含返回和返回首页两个图标按钮
- 支持自定义样式和类名
- 提供明确的点击事件回调
- 设计简洁，易于集成
- 跨端兼容，适配多种平台

### 适用场景
- 应用导航栏中的胶囊按钮
- 页面顶部导航区域
- 需要快速返回和返回首页功能的场景
- 自定义导航栏的组成部分

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| back | 点击返回图标时触发 | 无 |
| back-home | 点击返回首页图标时触发 | 无 |

### Methods

该组件不对外暴露任何方法。

### Slots

该组件不提供任何插槽。

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <wd-navbar-capsule 
      @back="handleBack" 
      @back-home="handleBackHome" 
    />
  </view>
</template>

<script lang="ts" setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 返回首页
const handleBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
```

### 2. 在导航栏中使用

```vue
<template>
  <view>
    <wd-navbar 
      title="导航栏" 
    >
      <!-- 在导航栏左侧使用胶囊组件 -->
      <template #left>
        <wd-navbar-capsule 
          @back="handleBack" 
          @back-home="handleBackHome" 
        />
      </template>
    </wd-navbar>
  </view>
</template>

<script lang="ts" setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 返回首页
const handleBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
```

### 3. 自定义样式

```vue
<template>
  <view>
    <wd-navbar-capsule 
      @back="handleBack" 
      @back-home="handleBackHome" 
      custom-style="background-color: #4D80F0; padding: 10rpx; border-radius: 20rpx;" 
      custom-class="my-capsule" 
    />
  </view>
</template>

<script lang="ts" setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 返回首页
const handleBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.my-capsule {
  /* 自定义样式 */
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

/* 自定义图标颜色 */
.my-capsule :deep(.wd-navbar-capsule__icon) {
  color: #fff;
}
</style>
```

### 4. 与自定义导航栏结合使用

```vue
<template>
  <view>
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <!-- 左侧胶囊组件 -->
      <wd-navbar-capsule 
        @back="handleBack" 
        @back-home="handleBackHome" 
      />
      <!-- 中间标题 -->
      <view class="custom-navbar__title">自定义导航栏</view>
      <!-- 右侧操作按钮 -->
      <view class="custom-navbar__right">
        <wd-icon name="search" @click="handleSearch" />
      </view>
    </view>
    <!-- 页面内容 -->
    <view class="page-content">
      <text>这是页面内容</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 返回首页
const handleBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}

// 搜索按钮点击事件
const handleSearch = () => {
  console.log('点击了搜索按钮')
}
</script>

<style scoped>
.custom-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  height: 88rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.custom-navbar__title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.custom-navbar__right {
  display: flex;
  align-items: center;
}

.page-content {
  padding: 20rpx;
  height: 2000rpx;
  background-color: #f5f5f5;
}
</style>
```

### 5. 固定在顶部

```vue
<template>
  <view>
    <!-- 固定在顶部的导航栏 -->
    <view class="fixed-navbar">
      <wd-navbar-capsule 
        @back="handleBack" 
        @back-home="handleBackHome" 
      />
      <view class="fixed-navbar__title">固定导航栏</view>
    </view>
    <!-- 页面内容 -->
    <view class="page-content">
      <text>这是页面内容</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 返回首页
const handleBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 20rpx;
  height: 88rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  z-index: 999;
}

.fixed-navbar__title {
  margin-left: 20rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.page-content {
  padding: 128rpx 20rpx 20rpx;
  height: 2000rpx;
  background-color: #f5f5f5;
}
</style>
```

## 样式定制指南

### 1. 使用 customStyle 和 customClass

通过 `customStyle` 和 `customClass` 可以自定义组件的根节点样式：

```vue
<wd-navbar-capsule 
  custom-style="background-color: #4D80F0; padding: 10rpx; border-radius: 20rpx;" 
  custom-class="my-capsule" 
  @back="handleBack" 
  @back-home="handleBackHome" 
/>

<style>
.my-capsule {
  /* 自定义样式 */
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
```

### 2. 自定义图标样式

可以通过深度选择器自定义图标样式：

```vue
<wd-navbar-capsule 
  custom-class="my-capsule" 
  @back="handleBack" 
  @back-home="handleBackHome" 
/>

<style scoped>
.my-capsule {
  /* 自定义图标颜色 */
  :deep(.wd-navbar-capsule__icon) {
    color: #4D80F0;
    font-size: 32rpx;
    margin-right: 10rpx;
  }
}
</style>
```

### 3. 自定义点击反馈

可以通过覆盖组件内部样式自定义点击反馈效果：

```vue
<wd-navbar-capsule 
  custom-class="my-capsule" 
  @back="handleBack" 
  @back-home="handleBackHome" 
/>

<style scoped>
.my-capsule {
  /* 自定义图标点击反馈 */
  :deep(.wd-navbar-capsule__icon) {
    transition: all 0.2s ease;
  }
  
  :deep(.wd-navbar-capsule__icon:active) {
    transform: scale(0.9);
    opacity: 0.7;
  }
}
</style>
```

## 注意事项

### 1. 事件处理
- 组件提供了 `back` 和 `back-home` 两个事件，分别对应返回上一页和返回首页操作
- 需要在父组件中手动实现事件处理逻辑，如调用 `uni.navigateBack()` 或 `uni.switchTab()`

### 2. 样式定制
- 组件支持通过 `customStyle` 和 `customClass` 进行样式定制
- 可以通过深度选择器覆盖组件内部样式，如自定义图标颜色、大小等
- 建议使用组件提供的 CSS 类名进行样式覆盖，避免直接修改组件内部结构

### 3. 跨端兼容
- 组件在不同平台上的表现可能略有差异，建议在各平台上进行测试
- 在小程序平台上，图标大小和间距可能需要根据平台特性进行调整

### 4. 性能优化
- 组件结构简单，性能开销较小，无需特殊优化
- 建议避免在频繁渲染的场景中使用，如列表项中

### 5. 常见问题解决方案
- **问题**：图标大小不符合预期
  **解决方案**：通过深度选择器自定义图标大小

- **问题**：点击事件不触发
  **解决方案**：检查事件绑定是否正确，确保父组件中实现了事件处理函数

- **问题**：样式定制不生效
  **解决方案**：使用深度选择器（如 `:deep()`）覆盖组件内部样式
