# wd-status-tip 状态提示组件

## 组件概述

状态提示组件是一个用于展示各种状态提示的UI组件，通常用于网络错误、内容为空、搜索无结果等场景。它提供了多种内置图标，并支持自定义图片、文字和样式，帮助开发者快速构建友好的状态提示界面。

### 功能特点
- 提供多种内置状态图标（搜索、网络、内容、收藏、评论、光环、消息）
- 支持自定义图片URL
- 灵活的图片大小配置
- 支持自定义提示文案
- 提供插槽用于扩展功能
- 支持自定义样式

### 适用场景
- 网络错误状态提示
- 内容为空状态提示
- 搜索无结果提示
- 收藏为空提示
- 评论为空提示
- 消息为空提示
- 自定义状态提示

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| image | string | 'network' | 否 | 缺省图片类型，支持传入图片 URL。可选值: search, network, content, collect, comment, halo, message |
| imageSize | string \| number \| ImageSize | '' | 否 | 图片大小，默认单位为 `px` |
| tip | string | '' | 否 | 提示文案 |
| imageMode | string | 'aspectFill' | 否 | 图片裁剪、缩放的模式 |
| urlPrefix | string | './../../static/images/' | 否 | 图片路径前缀，指向图片所在目录，用于拼接图片 URL |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

该组件没有定义任何事件。

### Methods

该组件没有对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| image | - | 自定义图片内容 |
| bottom | - | 底部扩展内容，可用于添加按钮等 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础状态提示</text>
    <wd-status-tip 
      image="network" 
      tip="网络连接失败，请检查网络设置"
    />
  </view>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
}
</style>
```

### 不同状态类型

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">不同状态类型</text>
    
    <view class="demo-grid">
      <!-- 搜索无结果 -->
      <wd-status-tip 
        image="search" 
        tip="暂无搜索结果"
      />
      
      <!-- 内容为空 -->
      <wd-status-tip 
        image="content" 
        tip="暂无内容"
      />
      
      <!-- 收藏为空 -->
      <wd-status-tip 
        image="collect" 
        tip="暂无收藏内容"
      />
      
      <!-- 评论为空 -->
      <wd-status-tip 
        image="comment" 
        tip="暂无评论"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  text-align: center;
  display: block;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;
}

.demo-grid > view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 自定义图片大小

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义图片大小</text>
    
    <!-- 数字形式 -->
    <wd-status-tip 
      image="network" 
      tip="数字形式设置图片大小"
      :image-size="120"
    />
    
    <!-- 对象形式 -->
    <wd-status-tip 
      image="network" 
      tip="对象形式设置图片大小"
      :image-size="{ width: 150, height: 120 }"
    />
  </view>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.demo-container > view {
  margin-bottom: 40rpx;
}
</style>
```

### 自定义图片

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义图片</text>
    
    <!-- 自定义图片URL -->
    <wd-status-tip 
      image="https://example.com/custom-image.png" 
      tip="自定义图片URL"
      :image-size="100"
    />
    
    <!-- 使用插槽自定义图片 -->
    <wd-status-tip tip="使用插槽自定义图片">
      <template #image>
        <view class="custom-image">
          <wd-icon name="warning-circle" size="80" color="#ff9800"></wd-icon>
        </view>
      </template>
    </wd-status-tip>
  </view>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.demo-container > view {
  margin-bottom: 40rpx;
}

.custom-image {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}
</style>
```

### 带操作按钮

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">带操作按钮</text>
    
    <wd-status-tip 
      image="network" 
      tip="网络连接失败，请检查网络设置"
    >
      <template #bottom>
        <view class="status-tip-actions">
          <wd-button type="primary" size="small" @click="handleRefresh">刷新</wd-button>
          <wd-button type="default" size="small" @click="handleSettings">设置</wd-button>
        </view>
      </template>
    </wd-status-tip>
  </view>
</template>

<script setup lang="ts">
const handleRefresh = () => {
  console.log('刷新页面')
  // 这里可以添加刷新逻辑
}

const handleSettings = () => {
  console.log('打开设置')
  // 这里可以添加打开设置逻辑
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.status-tip-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 30rpx;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --status-tip-image-size | 120rpx | 图片大小 |
| --status-tip-image-margin-bottom | 20rpx | 图片底部间距 |
| --status-tip-text-color | #909399 | 文字颜色 |
| --status-tip-text-font-size | 28rpx | 文字大小 |
| --status-tip-text-line-height | 40rpx | 文字行高 |
| --status-tip-padding | 40rpx | 内边距 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式</text>
    
    <wd-status-tip 
      image="network" 
      tip="自定义样式状态提示"
      custom-class="custom-status-tip"
    />
  </view>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
}

/* 自定义状态提示样式 */
.custom-status-tip {
  --status-tip-image-size: 160rpx;
  --status-tip-image-margin-bottom: 30rpx;
  --status-tip-text-color: #606266;
  --status-tip-text-font-size: 32rpx;
  --status-tip-text-line-height: 48rpx;
  --status-tip-padding: 60rpx;
  
  background-color: #fafafa;
  border-radius: 16rpx;
  padding: var(--status-tip-padding);
}
</style>
```

## 注意事项

1. **图片路径配置**：默认图片路径为 `./../../static/images/`，建议将图片放到自己的服务器上，并通过 `urlPrefix` 属性配置图片路径前缀。

2. **图片类型**：内置支持的图片类型有 search, network, content, collect, comment, halo, message，其他值将被视为图片 URL。

3. **图片大小配置**：`imageSize` 属性支持多种类型：
   - 字符串：如 "100rpx"
   - 数字：如 100（默认单位为 px）
   - 对象：如 { width: 100, height: 80 }

4. **图片裁剪模式**：`imageMode` 属性支持所有 uni-app 图片组件的裁剪模式，默认值为 "aspectFill"。

5. **插槽使用**：通过 `image` 插槽可以完全自定义图片内容，通过 `bottom` 插槽可以添加操作按钮等扩展功能。

6. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

7. **性能优化**：组件结构简单，渲染性能优秀，适合在各种场景下使用。

## 常见问题

### Q: 内置图片不显示？
A: 请检查 `urlPrefix` 属性是否配置正确，或者尝试使用自定义图片 URL。

### Q: 图片大小设置不生效？
A: 请确保 `imageSize` 属性的类型正确，支持字符串、数字和对象三种类型。

### Q: 自定义样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。

### Q: 组件在某些平台上显示异常？
A: 组件已针对不同平台进行了适配，但如果遇到问题，可以尝试调整组件的样式，或者检查平台的兼容性。

### Q: 如何添加自定义操作按钮？
A: 可以通过 `bottom` 插槽添加自定义操作按钮，如刷新按钮、设置按钮等。
