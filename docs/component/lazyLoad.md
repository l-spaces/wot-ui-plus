# 懒加载组件（wd-lazy-load）

## 组件概述

wd-lazy-load 是一个基于 Vue 3 + TypeScript + UniApp 开发的图片懒加载组件，用于优化图片加载性能，减少初始加载时间和网络请求。该组件支持图片占位符、加载失败处理、淡入淡出动画等功能，适用于各种需要大量图片展示的场景。

### 功能描述
- 图片懒加载，只有当图片进入可视区域时才会加载
- 支持自定义占位图片和错误占位图片
- 支持图片加载完成和加载失败事件
- 支持淡入淡出过渡动画
- 支持图片点击事件
- 支持自定义图片裁剪模式
- 支持自定义图片高度和圆角
- 支持调整懒加载触发阈值

### 适用业务场景
- 长列表图片展示
- 瀑布流图片布局
- 图片墙
- 电商商品列表
- 新闻资讯列表
- 其他需要大量图片展示的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| index | number / string | '' | 否 | 图片索引，用于事件回调中标识当前图片 |
| image | string | '' | 是 | 要显示的图片 URL |
| mode | string | 'widthFix' | 否 | 图片裁剪模式，可选值：aspectFit、aspectFill、widthFix、top、bottom、center、scaleToFill |
| loadingImg | string | 内置 base64 图片 | 否 | 占位图片路径，图片加载前显示 |
| errorImg | string | 内置 base64 图片 | 否 | 加载失败的错误占位图路径 |
| threshold | number / string | 100 | 否 | 图片进入可见区域前多少像素时开始加载图片，单位 rpx。负数为图片超出屏幕底部多少距离后触发懒加载，正数为图片顶部距离屏幕底部多少距离时触发（图片还没出现在屏幕上） |
| duration | number / string | 300 | 否 | 淡入淡出动画的过渡时间，单位毫秒 |
| effect | string | 'ease-in-out' | 否 | 过渡效果的速度曲线，可选值：linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n) |
| isEffect | boolean | true | 否 | 是否使用过渡效果 |
| round | number / string | 0 | 否 | 图片圆角值，单位 rpx |
| height | number / string | '200' | 否 | 图片高度，单位 rpx |
| customStyle | object | - | 否 | 自定义样式，用于覆盖组件默认样式 |
| customClass | string | - | 否 | 自定义类名，用于扩展组件样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击图片时触发 | index: 图片索引，用于标识当前点击的图片 |
| load | 图片加载完成时触发 | index: 图片索引，用于标识当前加载完成的图片 |
| error | 图片加载失败时触发 | index: 图片索引，用于标识当前加载失败的图片 |

### Methods

该组件没有对外暴露的方法。

### Slots

该组件没有可用的插槽。

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view class="demo">
    <text class="title">基础懒加载</text>
    <view class="image-list">
      <wd-lazy-load
        v-for="(item, index) in imageList"
        :key="index"
        :index="index"
        :image="item.url"
        :height="200"
        @click="handleClick"
        @load="handleLoad"
        @error="handleError"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([
  { url: 'https://example.com/image1.jpg' },
  { url: 'https://example.com/image2.jpg' },
  { url: 'https://example.com/image3.jpg' },
  { url: 'https://example.com/image4.jpg' },
  { url: 'https://example.com/image5.jpg' }
])

// 图片点击事件
const handleClick = (index: number) => {
  console.log('点击了图片', index)
}

// 图片加载完成事件
const handleLoad = (index: number) => {
  console.log('图片加载完成', index)
}

// 图片加载失败事件
const handleError = (index: number) => {
  console.log('图片加载失败', index)
}
</script>

<style scoped>
.demo {
  padding: 20rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.image-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 自定义占位图和错误图

```vue
<template>
  <view class="demo">
    <text class="title">自定义占位图和错误图</text>
    <view class="image-list">
      <wd-lazy-load
        v-for="(item, index) in imageList"
        :key="index"
        :index="index"
        :image="item.url"
        :height="200"
        :loading-img="loadingImg"
        :error-img="errorImg"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([
  { url: 'https://example.com/image1.jpg' },
  { url: 'https://example.com/image2.jpg' },
  { url: 'https://example.com/image3.jpg' },
  { url: 'https://example.com/image4.jpg' },
  { url: 'https://example.com/image5.jpg' }
])

// 自定义占位图
const loadingImg = ref('https://example.com/loading.png')

// 自定义错误图
const errorImg = ref('https://example.com/error.png')
</script>
```

### 调整懒加载阈值和动画效果

```vue
<template>
  <view class="demo">
    <text class="title">调整懒加载阈值和动画效果</text>
    <view class="image-list">
      <wd-lazy-load
        v-for="(item, index) in imageList"
        :key="index"
        :index="index"
        :image="item.url"
        :height="200"
        :threshold="200"
        :duration="500"
        :effect="'ease-in'"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([
  { url: 'https://example.com/image1.jpg' },
  { url: 'https://example.com/image2.jpg' },
  { url: 'https://example.com/image3.jpg' },
  { url: 'https://example.com/image4.jpg' },
  { url: 'https://example.com/image5.jpg' }
])
</script>
```

### 自定义图片样式

```vue
<template>
  <view class="demo">
    <text class="title">自定义图片样式</text>
    <view class="image-list">
      <wd-lazy-load
        v-for="(item, index) in imageList"
        :key="index"
        :index="index"
        :image="item.url"
        :height="150"
        :round="10"
        :mode="'aspectFill'"
        custom-class="custom-image"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([
  { url: 'https://example.com/image1.jpg' },
  { url: 'https://example.com/image2.jpg' },
  { url: 'https://example.com/image3.jpg' },
  { url: 'https://example.com/image4.jpg' },
  { url: 'https://example.com/image5.jpg' }
])
</script>

<style scoped>
.custom-image {
  border: 2rpx solid #e4e7ed;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
```

## 样式定制指南

### customStyle 和 customClass

wd-lazy-load 组件支持通过 `customStyle` 和 `customClass` 进行样式定制。

```vue
<template>
  <wd-lazy-load
    :image="imageUrl"
    :height="200"
    :custom-style="{ borderRadius: '10rpx', border: '2rpx solid #e4e7ed' }"
    custom-class="custom-lazy-load"
  />
</template>

<style scoped>
.custom-lazy-load {
  /* 自定义类名样式 */
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

/* 可以通过深度选择器修改组件内部样式 */
:deep(.wd-lazy-item) {
  /* 修改图片样式 */
  transition: opacity 0.5s ease;
}
</style>
```

## 注意事项

1. **图片路径要求**：
   - `image` 属性必须是有效的图片 URL，否则会显示错误占位图
   - 建议使用绝对路径或完整的相对路径，避免使用相对路径导致的加载失败

2. **懒加载触发机制**：
   - 组件使用 Intersection Observer API 实现懒加载
   - `threshold` 属性控制懒加载触发的提前量，单位为 rpx
   - 负数表示图片超出屏幕底部多少距离后触发懒加载
   - 正数表示图片顶部距离屏幕底部多少距离时触发懒加载

3. **动画效果**：
   - 开启 `isEffect` 属性可以启用淡入淡出动画
   - 可以通过 `duration` 和 `effect` 属性调整动画效果
   - 关闭动画效果可以提高性能，建议在低端设备上关闭

4. **性能优化建议**：
   - 合理设置 `threshold` 属性，避免过早或过晚加载图片
   - 对于长列表，建议结合虚拟滚动使用，进一步优化性能
   - 合理设置图片尺寸，避免加载过大的图片
   - 考虑使用图片压缩和 CDN 加速

5. **使用限制**：
   - 组件依赖于 UniApp 环境，无法在纯 Vue 项目中直接使用
   - 部分功能（如 Intersection Observer）可能在不同平台上表现不同，需要测试验证
   - 组件不支持嵌套使用

6. **事件处理**：
   - `click` 事件会返回图片的索引，可以用于标识当前点击的图片
   - `load` 事件在图片加载完成时触发
   - `error` 事件在图片加载失败时触发

7. **占位图和错误图**：
   - 组件内置了默认的占位图和错误图（base64 格式）
   - 可以通过 `loadingImg` 和 `errorImg` 属性自定义占位图和错误图
   - 建议使用体积较小的图片作为占位图，避免影响初始加载性能