# wd-sticky-box 吸顶容器组件

## 组件概述

吸顶容器组件是一个用于管理多个 `wd-sticky` 子组件的父容器，用于实现分组吸顶效果。它可以确保在滚动时，当前分组的吸顶元素固定在顶部，而其他分组的吸顶元素保持正常流布局。

### 功能特点
- 支持管理多个吸顶元素
- 实现分组吸顶效果
- 自动处理吸顶元素的层级关系
- 响应式设计，自动调整尺寸
- 平滑的吸顶切换效果
- 支持自定义样式

### 适用场景
- 分类列表吸顶
- 多区域内容吸顶
- 分组导航吸顶
- 复杂页面布局吸顶
- 长页面多模块吸顶

### 组件关系
`wd-sticky-box` 组件作为父容器，用于包裹 `wd-sticky` 子组件，管理它们的吸顶状态。当滚动页面时，`wd-sticky-box` 会根据子组件的位置，自动调整它们的吸顶状态，实现分组吸顶效果。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

该组件没有定义任何事件。

### Methods

该组件没有对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置 `wd-sticky` 子组件 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础分组吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky-box>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">分组1 - 吸顶标题</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组1内容，这里可以放置任意内容...</text>
            </view>
          </view>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">分组2 - 吸顶标题</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组2内容，这里可以放置任意内容...</text>
            </view>
          </view>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">分组3 - 吸顶标题</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组3内容，这里可以放置任意内容...</text>
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

### 自定义样式吸顶容器

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式吸顶容器</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky-box custom-class="custom-sticky-box">
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">自定义样式 - 分组1</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组1内容...</text>
            </view>
          </view>
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">自定义样式 - 分组2</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组2内容...</text>
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
  background-color: #07c160;
  color: #fff;
  padding: 20rpx;
  text-align: center;
  font-size: 28rpx;
  border-radius: 8rpx 8rpx 0 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.demo-section-content {
  height: 300rpx;
  padding: 20rpx;
  background-color: #fafafa;
  font-size: 24rpx;
  color: #666;
}

/* 自定义吸顶容器样式 */
.custom-sticky-box {
  background-color: #fff;
  border-radius: 8rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}
</style>
```

### 带吸顶距离的分组吸顶

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">带吸顶距离的分组吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky-box>
          <view class="demo-section">
            <wd-sticky offset-top="30">
              <view class="demo-sticky">吸顶距离30px - 分组1</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组1内容...</text>
            </view>
          </view>
          <view class="demo-section">
            <wd-sticky offset-top="30">
              <view class="demo-sticky">吸顶距离30px - 分组2</view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>分组2内容...</text>
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

### 复杂布局吸顶

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">复杂布局吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">
          <text>复杂布局示例</text>
        </view>
        <wd-sticky-box>
          <!-- 分组1 -->
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">
                <wd-icon name="calendar" size="32" color="#fff"></wd-icon>
                <text>日期分组</text>
              </view>
            </wd-sticky>
            <view class="demo-section-content">
              <view class="demo-item" v-for="i in 5" :key="i">
                <text>日期项目 {{ i }}</text>
              </view>
            </view>
          </view>
          <!-- 分组2 -->
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">
                <wd-icon name="location" size="32" color="#fff"></wd-icon>
                <text>地点分组</text>
              </view>
            </wd-sticky>
            <view class="demo-section-content">
              <view class="demo-item" v-for="i in 5" :key="i">
                <text>地点项目 {{ i }}</text>
              </view>
            </view>
          </view>
          <!-- 分组3 -->
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky">
                <wd-icon name="tag" size="32" color="#fff"></wd-icon>
                <text>标签分组</text>
              </view>
            </wd-sticky>
            <view class="demo-section-content">
              <view class="demo-item" v-for="i in 5" :key="i">
                <text>标签项目 {{ i }}</text>
              </view>
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
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.demo-section {
  margin-bottom: 20rpx;
}

.demo-sticky {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  background-color: #1989fa;
  color: #fff;
  padding: 20rpx;
  font-size: 28rpx;
}

.demo-section-content {
  padding: 20rpx;
  background-color: #fafafa;
}

.demo-item {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 10rpx;
  font-size: 24rpx;
  color: #666;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}
</style>
```

### 分类列表吸顶

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">分类列表吸顶</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">商品分类</view>
        <wd-sticky-box>
          <view class="demo-category" v-for="(category, index) in categories" :key="index">
            <wd-sticky>
              <view class="demo-sticky">{{ category.title }}</view>
            </wd-sticky>
            <view class="demo-category-content">
              <view class="demo-product" v-for="(product, pIndex) in category.products" :key="pIndex">
                <text>{{ product.name }}</text>
                <text class="demo-price">¥{{ product.price }}</text>
              </view>
            </view>
          </view>
        </wd-sticky-box>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟商品分类数据
const categories = ref([
  {
    title: '手机数码',
    products: [
      { name: '智能手机', price: 3999 },
      { name: '平板电脑', price: 2999 },
      { name: '笔记本电脑', price: 5999 },
      { name: '智能手表', price: 1299 }
    ]
  },
  {
    title: '家居家电',
    products: [
      { name: '智能电视', price: 4999 },
      { name: '冰箱', price: 3299 },
      { name: '洗衣机', price: 2499 },
      { name: '空调', price: 3599 }
    ]
  },
  {
    title: '服装鞋帽',
    products: [
      { name: 'T恤', price: 99 },
      { name: '牛仔裤', price: 199 },
      { name: '运动鞋', price: 399 },
      { name: '连衣裙', price: 299 }
    ]
  }
])
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
  height: 150rpx;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.demo-category {
  margin-bottom: 20rpx;
}

.demo-sticky {
  background-color: #1989fa;
  color: #fff;
  padding: 20rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.demo-category-content {
  padding: 20rpx;
  background-color: #fafafa;
}

.demo-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 10rpx;
  font-size: 24rpx;
  color: #666;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.demo-price {
  color: #f56c6c;
  font-weight: bold;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --sticky-box-background-color | #ffffff | 吸顶容器背景颜色 |
| --sticky-box-border-radius | 0 | 吸顶容器圆角 |
| --sticky-box-padding | 0 | 吸顶容器内边距 |
| --sticky-box-box-shadow | none | 吸顶容器阴影 |
| --sticky-box-z-index | 1 | 吸顶容器层级 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式吸顶容器</text>
    <view class="demo-content">
      <view class="demo-scroll">
        <view class="demo-header">滚动内容区域</view>
        <wd-sticky-box custom-class="custom-sticky-box-style">
          <view class="demo-section">
            <wd-sticky>
              <view class="demo-sticky-content">
                <text>自定义容器</text>
              </view>
            </wd-sticky>
            <view class="demo-section-content">
              <text>容器内容...</text>
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

.demo-sticky-content {
  padding: 20rpx;
  background-color: #1989fa;
  color: #fff;
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

/* 自定义吸顶容器样式 */
.custom-sticky-box-style {
  --sticky-box-background-color: #f0f9ff;
  --sticky-box-border-radius: 12rpx;
  --sticky-box-padding: 10rpx;
  --sticky-box-box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  --sticky-box-z-index: 10;
}
</style>
```

## 注意事项

1. **组件关系**：`wd-sticky-box` 组件必须作为 `wd-sticky` 组件的父容器使用，才能实现分组吸顶效果。

2. **子组件要求**：`wd-sticky-box` 组件的直接子元素应该是包含 `wd-sticky` 组件的容器，而不是 `wd-sticky` 组件本身。

3. **尺寸限制**：当 `wd-sticky-box` 的高度小于或等于 `wd-sticky` 组件的高度时，吸顶效果可能会受到影响。

4. **平台适配**：组件已针对不同平台进行了适配，包括 H5、APP-PLUS 等。

5. **性能优化**：使用 IntersectionObserver API 监听元素位置，性能优秀，不会造成页面卡顿。

6. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

7. **响应式设计**：组件使用 `wd-resize` 组件监听尺寸变化，自动调整吸顶容器的尺寸。

## 常见问题

### Q: 分组吸顶效果不生效？
A: 请确保 `wd-sticky` 组件是 `wd-sticky-box` 组件的间接子组件，并且中间的容器元素没有影响布局的样式。

### Q: 吸顶元素位置不正确？
A: 请检查 `wd-sticky` 组件的 `offsetTop` 属性是否设置正确，或者是否有其他元素影响了吸顶元素的位置。

### Q: 吸顶元素切换不流畅？
A: 这可能是由于吸顶元素的高度不一致导致的，建议保持所有 `wd-sticky` 组件的高度一致。

### Q: 自定义样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。

### Q: 组件在某些平台上显示异常？
A: 组件已针对不同平台进行了适配，但如果遇到问题，可以尝试调整组件的样式，或者检查平台的兼容性。
