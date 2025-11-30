# wd-sticky 吸顶组件

## 组件概述

吸顶组件是一个用于创建滚动时固定在顶部的元素的UI组件，支持自定义吸顶距离和层级。它可以独立使用，也可以作为 `wd-sticky-box` 组件的子组件，用于实现更复杂的吸顶布局。

### 功能特点
- 支持自定义吸顶距离
- 支持自定义层级
- 自动适应不同平台
- 支持与 `wd-sticky-box` 组件配合使用
- 响应式设计，自动调整尺寸
- 平滑的吸顶效果

### 适用场景
- 导航栏吸顶
- 分类标题吸顶
- 工具栏吸顶
- 搜索框吸顶
- 多元素分组吸顶（配合 `wd-sticky-box`）

### 组件关系
`wd-sticky` 组件可以独立使用，也可以作为 `wd-sticky-box` 组件的子组件。当作为子组件使用时，`wd-sticky-box` 会管理多个 `wd-sticky` 组件的吸顶状态，实现分组吸顶效果。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| zIndex | number | 1 | 否 | 吸顶元素的层级 |
| offsetTop | number | 0 | 否 | 吸顶距离，即元素距离顶部的距离 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

该组件没有定义任何事件。

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| setPosition | boxLeaved: boolean, position: string, top: number | - | 设置吸顶元素的位置，通常由父组件 `wd-sticky-box` 调用 |
| stickyState | - | object | 暴露吸顶元素的当前状态，包括 position, boxLeaved, top, height, width, state |
| offsetTop | - | number | 暴露 offsetTop 属性值 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置需要吸顶的内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky offset-top="50">
          <view class="demo-sticky">吸顶元素 - 距离顶部50px</view>
        </wd-sticky>
        <view class="demo-long-content">
          <text>长内容区域，用于测试吸顶效果...</text>
        </view>
      </view>
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
  margin-bottom: 20rpx;
  display: block;
}

.demo-content {
  height: 500rpx;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
}

.demo-scroll {
  height: 100%;
  overflow-y: scroll;
}

.demo-header {
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
}

.demo-sticky {
  background-color: #1989fa;
  color: #fff;
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
}

.demo-long-content {
  height: 1000rpx;
  padding: 20rpx;
  font-size: 24rpx;
  color: #666;
}
</style>
```

### 自定义层级

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义层级吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky offset-top="0" :z-index="100">
          <view class="demo-sticky demo-sticky--top">吸顶元素 - 层级100</view>
        </wd-sticky>
        <view style="height: 100rpx;"></view>
        <wd-sticky offset-top="50" :z-index="50">
          <view class="demo-sticky demo-sticky--bottom">吸顶元素 - 层级50</view>
        </wd-sticky>
        <view class="demo-long-content">
          <text>长内容区域，用于测试吸顶效果...</text>
        </view>
      </view>
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
  margin-bottom: 20rpx;
  display: block;
}

.demo-content {
  height: 500rpx;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
}

.demo-scroll {
  height: 100%;
  overflow-y: scroll;
}

.demo-header {
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
}

.demo-sticky {
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
  color: #fff;
}

.demo-sticky--top {
  background-color: #1989fa;
}

.demo-sticky--bottom {
  background-color: #07c160;
}

.demo-long-content {
  height: 1000rpx;
  padding: 20rpx;
  font-size: 24rpx;
  color: #666;
}
</style>
```

### 配合 wd-sticky-box 使用

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">分组吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky-box>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">分组1 - 吸顶标题</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组1内容...</text>
            </view>
          </view>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">分组2 - 吸顶标题</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组2内容...</text>
            </view>
          </view>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">分组3 - 吸顶标题</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组3内容...</text>
            </view>
          </view>
        </wd-sticky-box>
      </view>
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
  margin-bottom: 20rpx;
  display: block;
}

.demo-content {
  height: 500rpx;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
}

.demo-scroll {
  height: 100%;
  overflow-y: scroll;
}

.demo-header {
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
}

.demo-section {
  margin-bottom: 20rpx;
}

.demo-sticky {
  background-color: #1989fa;
  color: #fff;
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
}

.demo-section-content {
  height: 300rpx;
  padding: 20rpx;
  background-color: #fafafa;
  font-size: 24rpx;
  color: #666;
}
</style>
```

### 吸顶搜索框

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">吸顶搜索框</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">
          <text>页面标题</text>
        </view>
        <wd-sticky offset-top="0">
          <view class="demo-search-box">
            <wd-search 
              placeholder="请输入搜索内容" 
              shape="round"
              @search="handleSearch"
            />
          </view>
        </wd-sticky>
        <view class="demo-long-content">
          <text>长内容区域，用于测试吸顶搜索框效果...</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleSearch = (value: string) => {
  console.log('搜索内容:', value)
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-content {
  height: 500rpx;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
}

.demo-scroll {
  height: 100%;
  overflow-y: scroll;
}

.demo-header {
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.demo-search-box {
  padding: 10rpx 20rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.demo-long-content {
  height: 1000rpx;
  padding: 20rpx;
  font-size: 24rpx;
  color: #666;
}
</style>
```

### 自定义样式吸顶

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky offset-top="20" custom-class="custom-sticky">
          <view class="demo-sticky">自定义样式吸顶</view>
        </wd-sticky>
        <view class="demo-long-content">
          <text>长内容区域，用于测试自定义样式吸顶效果...</text>
        </view>
      </view>
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
  margin-bottom: 20rpx;
  display: block;
}

.demo-content {
  height: 500rpx;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
}

.demo-scroll {
  height: 100%;
  overflow-y: scroll;
}

.demo-header {
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
}

.demo-sticky {
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
  color: #fff;
}

/* 自定义吸顶样式 */
.custom-sticky {
  --sticky-background-color: #07c160;
  --sticky-border-radius: 0 0 20rpx 20rpx;
  --sticky-box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

.custom-sticky .demo-sticky {
  background-color: var(--sticky-background-color);
  border-radius: var(--sticky-border-radius);
  box-shadow: var(--sticky-box-shadow);
}

.demo-long-content {
  height: 1000rpx;
  padding: 20rpx;
  font-size: 24rpx;
  color: #666;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --sticky-background-color | #ffffff | 吸顶元素背景颜色 |
| --sticky-box-shadow | 0 2rpx 8rpx rgba(0, 0, 0, 0.1) | 吸顶元素阴影 |
| --sticky-border-radius | 0 | 吸顶元素圆角 |
| --sticky-padding | 0 | 吸顶元素内边距 |
| --sticky-z-index | 1 | 吸顶元素层级 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky offset-top="0" custom-class="custom-sticky-style">
          <view class="demo-sticky-content">
            <wd-icon name="home" size="32" color="#fff"></wd-icon>
            <text class="demo-sticky-text">自定义吸顶</text>
            <wd-icon name="search" size="32" color="#fff"></wd-icon>
          </view>
        </wd-sticky>
        <view class="demo-long-content">
          <text>长内容区域，用于测试自定义样式吸顶效果...</text>
        </view>
      </view>
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
  margin-bottom: 20rpx;
  display: block;
}

.demo-content {
  height: 500rpx;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
}

.demo-scroll {
  height: 100%;
  overflow-y: scroll;
}

.demo-header {
  height: 200rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
}

.demo-sticky-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background-color: #1989fa;
  color: #fff;
}

.demo-sticky-text {
  font-size: 28rpx;
  font-weight: bold;
}

/* 自定义吸顶样式 */
.custom-sticky-style {
  --sticky-box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
}

.demo-long-content {
  height: 1000rpx;
  padding: 20rpx;
  font-size: 24rpx;
  color: #666;
}
</style>
```

## 注意事项

1. **组件关系**：`wd-sticky` 组件可以独立使用，也可以作为 `wd-sticky-box` 组件的子组件使用。

2. **吸顶距离**：通过 `offsetTop` 属性可以设置元素距离顶部的吸顶距离，默认值为 0。

3. **层级设置**：通过 `zIndex` 属性可以设置吸顶元素的层级，确保在复杂布局中正确显示。

4. **平台适配**：组件已针对不同平台进行了适配，包括 H5、APP-PLUS 等。

5. **响应式设计**：组件使用 `wd-resize` 组件监听尺寸变化，自动调整吸顶元素的尺寸。

6. **性能优化**：使用 IntersectionObserver API 监听元素位置，性能优秀，不会造成页面卡顿。

7. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

## 常见问题

### Q: 吸顶效果不生效？
A: 请确保父容器有明确的高度和 `overflow: scroll` 属性，或者页面本身可以滚动。

### Q: 吸顶元素位置不正确？
A: 请检查 `offsetTop` 属性是否设置正确，或者是否有其他元素影响了吸顶元素的位置。

### Q: 吸顶元素层级不够？
A: 请调整 `zIndex` 属性，确保吸顶元素的层级高于其他元素。

### Q: 配合 `wd-sticky-box` 使用时效果异常？
A: 请确保 `wd-sticky` 组件是 `wd-sticky-box` 组件的直接子组件，并且没有其他包裹元素。

### Q: 自定义样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。
