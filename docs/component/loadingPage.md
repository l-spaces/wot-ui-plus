# wd-loading-page 页面加载组件

## 组件概述

wd-loading-page 是一个全屏加载状态组件，用于在页面初始化、数据加载或异步操作过程中向用户提供完整的视觉反馈。该组件覆盖整个页面，防止用户在加载过程中进行其他操作，同时显示加载动画和提示文字，提升用户体验。

### 功能特点
- 全屏覆盖，防止用户误操作
- 支持自定义加载动画类型（环形/半圆形）
- 支持自定义加载图标、颜色、大小和文字
- 支持自定义背景色和层级
- 提供默认插槽，可完全自定义加载内容
- 基于 wd-transition 实现平滑的显示/隐藏过渡效果

### 适用场景
- 页面首次加载数据时的全屏加载状态
- 页面切换时的过渡加载效果
- 大型表单提交时的加载状态
- 网络请求时间较长时的用户反馈
- 需要完全阻塞用户操作的加载场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| text | string | 加载中 | 否 | 提示内容 |
| image | string |  | 否 | 自定义加载图标，优先级高于内置加载动画 |
| type | string | ring | 否 | 加载动画类型，可选值：'outline'（圆形）、'ring'（半圆形） |
| loading | boolean | false | 否 | 是否显示加载动画 |
| bgColor | string | #ffffff | 否 | 背景颜色 |
| color | string | #C8C8C8 | 否 | 字体颜色 |
| fontSize | number / string | 19 | 否 | 字体大小 |
| iconSize | number / string | 28 | 否 | 加载图标/动画大小 |
| loadingColor | string | #C8C8C8 | 否 | 加载动画颜色 |
| zIndex | number / string | 10 | 否 | 加载动画层级 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

该组件不触发任何事件。

### Methods

该组件不对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义加载提示内容，替换默认的文字提示 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <!-- 点击按钮显示加载页 -->
    <wd-button type="primary" @click="showLoading">显示加载页</wd-button>
    
    <!-- 基础加载页，使用默认配置 -->
    <wd-loading-page :loading="loading" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制加载页显示状态
const loading = ref(false)

// 显示加载页
const showLoading = () => {
  loading.value = true
  // 模拟加载过程，3秒后隐藏
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
```

### 2. 自定义提示文字

```vue
<template>
  <view>
    <wd-button type="primary" @click="showLoading">显示自定义文字加载页</wd-button>
    
    <!-- 自定义提示文字 -->
    <wd-loading-page 
      :loading="loading" 
      text="数据加载中，请稍候..." 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const showLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
```

### 3. 自定义加载动画类型和颜色

```vue
<template>
  <view>
    <wd-button type="primary" @click="showLoading">显示自定义动画加载页</wd-button>
    
    <!-- 自定义加载动画类型和颜色 -->
    <wd-loading-page 
      :loading="loading" 
      type="outline" 
      loading-color="#4D80F0" 
      color="#4D80F0" 
      text="正在加载数据..." 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const showLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
```

### 4. 使用自定义图标

```vue
<template>
  <view>
    <wd-button type="primary" @click="showLoading">显示自定义图标加载页</wd-button>
    
    <!-- 使用自定义图标 -->
    <wd-loading-page 
      :loading="loading" 
      image="/static/loading.png" 
      icon-size="60" 
      text="加载中..." 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const showLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
```

### 5. 完全自定义加载内容

```vue
<template>
  <view>
    <wd-button type="primary" @click="showLoading">显示自定义内容加载页</wd-button>
    
    <!-- 使用默认插槽完全自定义加载内容 -->
    <wd-loading-page :loading="loading" bg-color="#f5f5f5">
      <view class="custom-loading-content">
        <!-- 自定义加载动画 -->
        <wd-loading type="ring" size="40" color="#4D80F0" />
        <!-- 自定义文字和样式 -->
        <text class="custom-loading-text">正在加载中，请稍候...</text>
        <!-- 可以添加更多自定义内容 -->
        <view class="custom-loading-footer">这是一个自定义的加载页</view>
      </view>
    </wd-loading-page>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const showLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

<style scoped>
.custom-loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
}

.custom-loading-text {
  font-size: 28rpx;
  color: #4D80F0;
  font-weight: 500;
}

.custom-loading-footer {
  font-size: 24rpx;
  color: #999999;
  margin-top: 10rpx;
}
</style>
```

## 样式定制指南

wd-loading-page 组件支持多种样式定制方式，以满足不同的设计需求：

### 1. 使用 Props 进行样式定制

通过组件提供的 props 可以方便地定制加载页的各种样式：

```vue
<wd-loading-page 
  :loading="loading" 
  bg-color="#f0f0f0" 
  color="#333333" 
  font-size="20" 
  loading-color="#4D80F0" 
  icon-size="40" 
  z-index="100" 
/>
```

### 2. 使用 customStyle 和 customClass

通过 `customStyle` 和 `customClass` 可以实现更复杂的样式定制：

```vue
<wd-loading-page 
  :loading="loading" 
  custom-style="border-radius: 10px;" 
  custom-class="my-loading-page" 
/>

<style>
.my-loading-page {
  /* 自定义样式 */
  opacity: 0.9;
  /* 可以添加更多自定义样式 */
}
</style>
```

### 3. 使用默认插槽完全自定义

通过默认插槽可以完全自定义加载内容，实现更复杂的设计：

```vue
<wd-loading-page :loading="loading">
  <!-- 完全自定义的加载内容 -->
  <view class="custom-loading">
    <!-- 自定义加载动画 -->
    <view class="custom-spinner"></view>
    <!-- 自定义文字 -->
    <text class="custom-text">加载中...</text>
  </view>
</wd-loading-page>

<style scoped>
.custom-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.custom-spinner {
  /* 自定义加载动画样式 */
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid #f3f3f3;
  border-top: 4rpx solid #4D80F0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.custom-text {
  /* 自定义文字样式 */
  font-size: 28rpx;
  color: #4D80F0;
}
</style>
```

## 注意事项

### 1. 性能优化建议
- 仅在必要时使用全屏加载页，避免过度使用影响用户体验
- 对于加载时间较短的场景，建议使用局部加载指示器（如 wd-loading）
- 确保在数据加载完成后及时隐藏加载页
- 避免在加载页中使用过于复杂的动画或大量图片，影响性能

### 2. 最佳实践
- 根据加载时间长短选择合适的加载方式：
  - 短时间加载（< 1秒）：不建议使用全屏加载页
  - 中等时间加载（1-3秒）：可以使用全屏加载页
  - 长时间加载（> 3秒）：建议使用全屏加载页，并提供取消按钮
- 保持加载页设计与整体应用风格一致
- 提供清晰的加载状态提示，避免用户困惑

### 3. 常见问题解决方案
- **问题**：加载页显示时无法覆盖某些元素
  **解决方案**：调整 `zIndex` 属性，确保加载页的层级高于其他元素

- **问题**：加载页显示/隐藏时没有过渡效果
  **解决方案**：确保已正确引入 wd-transition 组件，或检查 transition 相关配置

- **问题**：自定义图标显示异常
  **解决方案**：检查图标路径是否正确，确保图标资源存在

### 4. 使用限制条件
- 该组件基于 fixed 定位实现全屏覆盖，在某些特殊布局下可能会出现问题
- 在小程序平台上，自定义图标路径需要遵循小程序的资源引用规则
- 过度使用全屏加载页可能会影响用户体验，建议谨慎使用
