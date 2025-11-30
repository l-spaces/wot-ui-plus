# wd-card 卡片组件

## 组件概述

wd-card 是一个用于展示结构化信息的卡片组件，提供了标题、内容和底部三个区域的插槽，支持自定义样式和类型。该组件适用于需要将相关信息组织在一起展示的场景，如商品卡片、信息卡片、功能卡片等。

### 适用场景
- 商品展示卡片：展示商品图片、名称、价格等信息
- 信息卡片：展示用户信息、订单信息、通知信息等
- 功能卡片：展示功能入口、快捷操作等
- 数据统计卡片：展示统计数据、图表等
- 列表项卡片：在列表中展示结构化信息
- 任何需要将相关信息组织在一起展示的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| type | String | - | 否 | 卡片类型，可选值：rectangle（矩形卡片） |
| title | String | - | 否 | 卡片标题，用于设置卡片的默认标题 |
| custom-title-class | String | '' | 否 | 标题自定义样式，用于自定义标题区域的样式 |
| custom-content-class | String | '' | 否 | 内容自定义样式，用于自定义内容区域的样式 |
| custom-footer-class | String | '' | 否 | 底部自定义样式，用于自定义底部区域的样式 |
| custom-class | String | - | 否 | 根节点自定义类名，用于自定义整个卡片的样式 |
| custom-style | String / Object | - | 否 | 根节点自定义样式，用于自定义整个卡片的内联样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 卡片内容区域，用于放置卡片的主要内容 |
| title | - | 卡片标题区域，用于自定义卡片标题，优先级高于 title 属性 |
| footer | - | 卡片底部区域，用于放置卡片的底部内容，如操作按钮、链接等 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <wd-card title="基础卡片">
      <view class="card-content">
        这是一个基础卡片示例，包含标题和内容区域。
      </view>
    </wd-card>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}

.card-content {
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #606266;
}
</style>
```

### 矩形卡片
```vue
<template>
  <view class="container">
    <wd-card type="rectangle" title="矩形卡片">
      <view class="card-content">
        这是一个矩形卡片示例，没有圆角效果。
      </view>
    </wd-card>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}

.card-content {
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #606266;
}
</style>
```

### 带底部区域的卡片
```vue
<template>
  <view class="container">
    <wd-card title="带底部区域的卡片">
      <view class="card-content">
        这是一个带底部区域的卡片示例，底部包含操作按钮。
      </view>
      <template #footer>
        <view class="card-footer">
          <wd-button size="small" type="primary" @click="handleClick">操作按钮</wd-button>
        </view>
      </template>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('点击了操作按钮')
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.card-content {
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #606266;
}

.card-footer {
  padding: 20rpx 0 0 0;
  display: flex;
  justify-content: flex-end;
}
</style>
```

### 自定义标题的卡片
```vue
<template>
  <view class="container">
    <wd-card>
      <template #title>
        <view class="custom-title">
          <wd-icon name="info" size="32rpx" color="#409eff" />
          <text class="title-text">自定义标题卡片</text>
        </view>
      </template>
      <view class="card-content">
        这是一个自定义标题的卡片示例，标题包含图标和文本。
      </view>
    </wd-card>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.card-content {
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #606266;
}
</style>
```

### 自定义样式的卡片
```vue
<template>
  <view class="container">
    <wd-card 
      title="自定义样式卡片" 
      custom-class="my-card" 
      custom-title-class="my-title" 
      custom-content-class="my-content" 
      custom-footer-class="my-footer"
    >
      <view class="card-content">
        这是一个自定义样式的卡片示例，包含自定义的背景色、边框、阴影等。
      </view>
      <template #footer>
        <view class="card-footer">
          <wd-button size="small" type="success" @click="handleClick">成功按钮</wd-button>
          <wd-button size="small" type="warning" @click="handleClick">警告按钮</wd-button>
        </view>
      </template>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('点击了按钮')
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.my-card {
  /* 自定义卡片样式 */
  background-color: #f0f9ff;
  border: 1rpx solid #e0f2fe;
  box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.06);
}

.my-title {
  /* 自定义标题样式 */
  color: #36cfc9;
  font-weight: bold;
}

.my-content {
  /* 自定义内容样式 */
  color: #606266;
  font-size: 28rpx;
}

.my-footer {
  /* 自定义底部样式 */
  padding-top: 20rpx;
  border-top: 1rpx dashed #e0f2fe;
}

.card-content {
  padding: 20rpx 0;
}

.card-footer {
  display: flex;
  gap: 20rpx;
  justify-content: flex-end;
}
</style>
```

### 商品卡片示例
```vue
<template>
  <view class="container">
    <wd-card class="product-card">
      <view class="product-image">
        <image src="https://example.com/product.jpg" mode="aspectFill" />
      </view>
      <view class="product-info">
        <view class="product-title">商品名称</view>
        <view class="product-desc">这是一个商品的详细描述，包含商品的特点、规格等信息。</view>
        <view class="product-price">
          <text class="price">¥99.00</text>
          <wd-button type="primary" size="small" @click="handleBuy">立即购买</wd-button>
        </view>
      </view>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
const handleBuy = () => {
  console.log('点击了立即购买按钮')
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.product-card {
  padding: 0;
}

.product-image {
  width: 100%;
  height: 400rpx;
  overflow: hidden;
}

.product-image image {
  width: 100%;
  height: 100%;
}

.product-info {
  padding: 20rpx;
}

.product-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10rpx;
}

.product-desc {
  font-size: 26rpx;
  color: #606266;
  margin-bottom: 20rpx;
  line-height: 1.5;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 36rpx;
  font-weight: bold;
  color: #f56c6c;
}
</style>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-card v-model="date" custom-class="my-card" />
</template>

<style scoped>
.my-card {
  /* 自定义样式 */
  background-color: #f5f7fa;
  border: 1rpx solid #e4e7ed;
  box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.06);
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-card 
    title="自定义样式卡片" 
    :custom-style="{ backgroundColor: '#f0f9ff', border: '1rpx solid #e0f2fe' }" 
  >
    <view class="card-content">
      这是一个自定义样式的卡片示例。
    </view>
  </wd-card>
</template>
```

### 自定义标题、内容和底部样式
通过 `custom-title-class`、`custom-content-class` 和 `custom-footer-class` 属性可以分别自定义标题、内容和底部的样式：

```vue
<template>
  <wd-card 
    title="自定义区域样式卡片" 
    custom-title-class="my-title" 
    custom-content-class="my-content" 
    custom-footer-class="my-footer"
  >
    <view class="card-content">
      这是一个自定义区域样式的卡片示例。
    </view>
    <template #footer>
      <view class="card-footer">
        <wd-button size="small" type="primary">操作按钮</wd-button>
      </view>
    </template>
  </wd-card>
</template>

<style scoped>
.my-title {
  /* 自定义标题样式 */
  color: #409eff;
  font-weight: bold;
}

.my-content {
  /* 自定义内容样式 */
  color: #606266;
  font-size: 28rpx;
}

.my-footer {
  /* 自定义底部样式 */
  padding-top: 20rpx;
  border-top: 1rpx dashed #e4e7ed;
}

.card-content {
  padding: 20rpx 0;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
```

## 注意事项

1. **卡片类型**：
   - 目前支持的卡片类型只有 `rectangle`（矩形卡片）
   - 不指定类型时，默认显示带圆角的卡片

2. **插槽优先级**：
   - `title` 插槽的优先级高于 `title` 属性
   - 当同时设置 `title` 属性和 `title` 插槽时，`title` 插槽的内容会覆盖 `title` 属性的值

3. **样式定制**：
   - 建议通过 `custom-class` 属性添加自定义类名，而不是直接修改组件的默认样式
   - 自定义样式时，注意样式的优先级，避免样式冲突
   - 可以使用 CSS 变量来定制主题色、间距等

4. **性能优化**：
   - 当卡片数量较多时，建议使用虚拟列表或分页加载，避免一次性渲染过多卡片
   - 卡片内的图片建议设置合适的尺寸和模式，避免图片过大影响加载速度

5. **兼容性**：
   - 该组件基于 uni-app 开发，支持多端适配
   - 在不同平台上，卡片的渲染效果可能存在差异，建议进行充分测试

6. **内容结构**：
   - 卡片内容建议保持简洁明了，避免内容过多导致卡片过长
   - 合理使用标题、内容和底部区域，保持清晰的视觉层次

7. **响应式设计**：
   - 卡片组件默认支持响应式设计，会根据父容器的宽度自动调整
   - 可以通过自定义样式调整卡片在不同屏幕尺寸下的显示效果

## 常见问题

1. **Q：如何自定义卡片的背景色？**
   A：通过 `custom-class` 或 `custom-style` 属性可以自定义卡片的背景色。

2. **Q：如何添加卡片的阴影效果？**
   A：通过 `custom-class` 属性添加自定义类名，然后在样式中设置 `box-shadow` 属性。

3. **Q：如何隐藏卡片的标题区域？**
   A：不设置 `title` 属性且不使用 `title` 插槽即可隐藏标题区域。

4. **Q：如何调整卡片的内边距和外边距？**
   A：通过 `custom-class` 属性添加自定义类名，然后在样式中设置 `padding` 和 `margin` 属性。

5. **Q：如何在卡片中添加图片？**
   A：在卡片的内容区域添加 `image` 标签即可，建议设置合适的 `mode` 属性。

6. **Q：如何实现卡片的点击事件？**
   A：可以在卡片组件上添加 `@click` 事件，或者在卡片的内容区域添加点击事件。

7. **Q：如何实现卡片的hover效果？**
   A：通过 `custom-class` 属性添加自定义类名，然后在样式中设置 `:hover` 伪类。

8. **Q：如何实现卡片的圆角效果？**
   A：默认卡片已经有圆角效果，如果需要修改圆角大小，可以通过 `custom-class` 属性添加自定义类名，然后在样式中设置 `border-radius` 属性。