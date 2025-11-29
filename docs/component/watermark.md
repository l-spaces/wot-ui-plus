# wd-watermark 水印组件

## 组件概述

wd-watermark 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台水印组件，用于在页面或指定元素上添加文字或图片水印，保护内容版权和防止截图盗用。该组件支持自定义水印内容、颜色、大小、旋转角度、间距等配置，适用于各种需要添加水印的场景，如文档预览、图片展示、数据报表等。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| content | string | '' | 否 | 水印显示内容 |
| image | string | '' | 否 | 水印图片地址，支持网络图片和base64（钉钉小程序仅支持网络图片） |
| imageHeight | number | 100 | 否 | 水印图片高度，单位px |
| imageWidth | number | 100 | 否 | 水印图片宽度，单位px |
| gutterX | number | 0 | 否 | X轴间距，单位px |
| gutterY | number | 0 | 否 | Y轴间距，单位px |
| width | number | 100 | 否 | canvas画布宽度，单位px |
| height | number | 100 | 否 | canvas画布高度，单位px |
| fullScreen | boolean | true | 否 | 是否为全屏水印 |
| color | string | '#8c8c8c' | 否 | 水印字体颜色 |
| size | number | 14 | 否 | 水印字体大小，单位px |
| fontStyle | string | 'normal' | 否 | 水印字体样式（仅微信和h5支持），可能的值：normal、italic、oblique |
| fontWeight | string \| number | 'normal' | 否 | 水印字体的粗细（仅微信和h5支持） |
| fontFamily | string | 'PingFang SC' | 否 | 水印字体系列（仅微信和h5支持） |
| rotate | number | -25 | 否 | 水印旋转角度 |
| zIndex | number | 1100 | 否 | 自定义层级 |
| opacity | number | 0.5 | 否 | 自定义透明度，取值 0~1 |
| customStyle | string | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

该组件无自定义事件。

### Methods

该组件无对外暴露的方法。

### Slots

该组件无自定义插槽。

## 多场景使用示例

### 基础文字水印

```vue
<template>
  <view class="demo-watermark">
    <wd-watermark content="测试水印"></wd-watermark>
    <view class="demo-content">
      <text class="demo-title">基础文字水印示例</text>
      <text class="demo-desc">这是一个基础的文字水印示例，展示了如何在页面上添加简单的文字水印。</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-watermark {
  position: relative;
  height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.demo-content {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: block;
}

.demo-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}
</style>
```

### 自定义样式文字水印

```vue
<template>
  <view class="demo-watermark">
    <wd-watermark
      content="自定义水印"
      :color="'#409eff'"
      :size="20"
      :rotate="-15"
      :opacity="0.3"
      :fontWeight="'bold'"
      :fontStyle="'italic'"
      :fontFamily="'Arial'"
    ></wd-watermark>
    <view class="demo-content">
      <text class="demo-title">自定义样式文字水印示例</text>
      <text class="demo-desc">这是一个自定义样式的文字水印示例，展示了如何调整水印的颜色、大小、旋转角度、透明度、字体粗细和样式。</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-watermark {
  position: relative;
  height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.demo-content {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: block;
}

.demo-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}
</style>
```

### 图片水印

```vue
<template>
  <view class="demo-watermark">
    <wd-watermark
      :image="imageUrl"
      :imageWidth="80"
      :imageHeight="80"
      :rotate="0"
      :opacity="0.5"
    ></wd-watermark>
    <view class="demo-content">
      <text class="demo-title">图片水印示例</text>
      <text class="demo-desc">这是一个图片水印示例，展示了如何在页面上添加图片水印。</text>
      <image :src="imageUrl" mode="aspectFit" class="demo-image"></image>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 模拟图片地址
const imageUrl = ref('https://picsum.photos/200/200?random=1')
</script>

<style scoped>
.demo-watermark {
  position: relative;
  height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.demo-content {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: block;
}

.demo-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  display: block;
}

.demo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
```

### 局部水印

```vue
<template>
  <view class="demo-watermark">
    <text class="demo-title">局部水印示例</text>
    <text class="demo-desc">这是一个局部水印示例，展示了如何在指定元素上添加水印，而不是全屏水印。</text>
    <view class="demo-container">
      <wd-watermark
        content="局部水印"
        :fullScreen="false"
        :color="'#f56c6c'"
        :opacity="0.4"
      ></wd-watermark>
      <view class="demo-local-content">
        <text class="demo-local-title">局部内容区域</text>
        <text class="demo-local-desc">这是一个局部内容区域，只在该区域内显示水印，而不是全屏显示。</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-watermark {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: block;
}

.demo-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  display: block;
}

.demo-container {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 300px;
}

.demo-local-content {
  position: relative;
  z-index: 1;
}

.demo-local-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}

.demo-local-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}
</style>
```

### 动态更新水印

```vue
<template>
  <view class="demo-watermark">
    <view class="demo-controls">
      <text class="demo-label">水印内容：</text>
      <input v-model="watermarkContent" class="demo-input" placeholder="请输入水印内容" />
      <wd-button type="primary" @click="updateWatermark" style="margin-top: 10px;">更新水印</wd-button>
    </view>
    <wd-watermark :content="watermarkContent" :color="watermarkColor" :size="watermarkSize"></wd-watermark>
    <view class="demo-content">
      <text class="demo-title">动态更新水印示例</text>
      <text class="demo-desc">这是一个动态更新水印的示例，展示了如何通过修改props来实时更新水印内容。</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'

// 水印配置
const watermarkContent = ref('初始水印')
const watermarkColor = ref('#409eff')
const watermarkSize = ref(16)

// 更新水印
function updateWatermark() {
  // 随机更新水印颜色
  const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
  watermarkColor.value = colors[Math.floor(Math.random() * colors.length)]
  // 随机更新水印大小
  watermarkSize.value = Math.floor(Math.random() * 10) + 14
}
</script>

<style scoped>
.demo-watermark {
  position: relative;
  height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.demo-controls {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.demo-label {
  font-size: 16px;
  margin-right: 10px;
}

.demo-input {
  width: 100%;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
  margin-top: 10px;
  box-sizing: border-box;
}

.demo-content {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  display: block;
}

.demo-desc {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}
</style>
```

## 样式定制指南

### 自定义整体样式

通过 `customStyle` 和 `customClass` 属性可以自定义组件的整体样式：

```vue
<template>
  <wd-watermark 
    content="自定义样式水印"
    customStyle="margin: 20px; padding: 10px; background-color: #f5f7fa; border-radius: 8px;" 
    customClass="custom-watermark"
  ></wd-watermark>
</template>

<style>
.custom-watermark {
  /* 自定义样式 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义水印样式

通过组件的 props 可以自定义水印的各种样式，如颜色、大小、旋转角度、透明度等：

```vue
<template>
  <wd-watermark
    content="自定义水印样式"
    :color="'#409eff'"
    :size="24"
    :rotate="-10"
    :opacity="0.5"
    :fontWeight="'bold'"
    :fontStyle="'italic'"
  ></wd-watermark>
</template>
```

### 自定义水印间距

通过 `gutterX` 和 `gutterY` 属性可以自定义水印之间的间距：

```vue
<template>
  <wd-watermark
    content="自定义间距水印"
    :gutterX="50"
    :gutterY="50"
  ></wd-watermark>
</template>
```

## 注意事项

1. **水印类型选择**：
   - 同时设置 `content` 和 `image` 属性时，优先显示图片水印
   - 只设置 `content` 属性时，显示文字水印
   - 只设置 `image` 属性时，显示图片水印

2. **图片水印注意事项**：
   - 支持网络图片和 base64 格式
   - 钉钉小程序仅支持网络图片
   - 建议使用适当大小的图片，避免过大的图片影响性能

3. **全屏水印与局部水印**：
   - 设置 `fullScreen` 为 `true` 时，水印会覆盖整个屏幕
   - 设置 `fullScreen` 为 `false` 时，水印只会在父元素内显示
   - 局部水印需要确保父元素设置了 `position: relative` 或其他定位属性

4. **性能优化**：
   - 组件会根据设备支持情况自动选择使用离屏 Canvas 或普通 Canvas
   - H5 平台会使用 `document.createElement` 创建 Canvas，不会显示 Canvas 标签
   - 水印生成后会隐藏 Canvas 元素，只显示生成的水印图片

5. **动态更新水印**：
   - 修改任何 props 都会触发水印重新生成
   - 建议避免频繁更新水印配置，以免影响性能

6. **多平台适配**：
   - 组件使用了条件编译处理不同平台的差异
   - 不同平台的 Canvas API 可能存在差异，组件已做了兼容处理
   - 建议在不同平台上进行充分测试

7. **层级问题**：
   - 水印的默认层级为 1100
   - 可以通过 `zIndex` 属性自定义层级
   - 确保水印层级高于内容层级，避免被内容遮挡

8. **透明度设置**：
   - `opacity` 属性取值范围为 0~1
   - 建议设置适当的透明度，既要起到水印作用，又不要影响内容的可读性

## 常见问题解决方案

1. **水印不显示**：
   - 检查 `content` 或 `image` 属性是否正确设置
   - 检查父元素是否设置了合适的定位属性
   - 检查水印层级是否被其他元素遮挡

2. **水印显示异常**：
   - 检查 Canvas 是否被正确创建
   - 检查图片地址是否可访问
   - 检查浏览器是否支持 Canvas API

3. **水印性能问题**：
   - 避免使用过大的图片水印
   - 避免频繁更新水印配置
   - 适当调整水印的大小和间距

4. **多平台兼容性问题**：
   - 在不同平台上进行充分测试
   - 注意不同平台 Canvas API 的差异
   - 对于平台差异，建议使用条件编译进行处理

5. **水印清晰度问题**：
   - 组件已考虑了设备像素比，会根据像素比调整 Canvas 大小
   - 建议使用适当的字体大小和图片分辨率

## 性能优化建议

1. **合理设置水印参数**：
   - 避免使用过大的字体或图片
   - 适当调整水印的间距，减少水印数量
   - 避免设置过高的透明度，影响性能

2. **减少水印更新频率**：
   - 避免频繁修改水印配置
   - 建议在初始化时设置好水印参数，减少后续更新

3. **使用离屏 Canvas**：
   - 组件会自动检测是否支持离屏 Canvas
   - 离屏 Canvas 可以提高性能，避免频繁重绘

4. **优化图片加载**：
   - 图片水印建议使用适当大小的图片
   - 可以考虑使用 WebP 格式的图片，减小图片体积
   - 对于网络图片，可以考虑使用 CDN 加速

5. **避免过度使用水印**：
   - 只在必要的场景下使用水印
   - 避免在性能敏感的页面过度使用水印
