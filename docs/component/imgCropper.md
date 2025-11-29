# wd-img-cropper 图片裁剪

## 组件概述

图片裁剪组件是一个用于对图片进行裁剪、旋转、缩放等操作的功能组件，支持多种裁剪比例、旋转角度和缩放级别。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，使用 Canvas 进行图片绘制和裁剪，具有良好的跨端兼容性和用户体验。

### 功能描述
- 支持多种裁剪比例设置
- 支持图片旋转操作
- 支持图片缩放操作
- 支持图片拖动调整位置
- 支持自定义裁剪框大小
- 支持导出不同质量和格式的图片
- 支持懒加载图片
- 支持自定义按钮文案
- 提供裁剪完成和取消事件

### 适用场景
- 用户头像裁剪
- 商品图片裁剪
- 证件照裁剪
- 图片编辑功能
- 任何需要对图片进行裁剪的场景

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | boolean | false | 否 | 控制图片裁剪组件的显示与隐藏 |
| cancelButtonText | string | - | 否 | 取消按钮文案 |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| disabledRotate | boolean | false | 否 | 是否禁用旋转功能 |
| fileType | string | 'png' | 否 | 目标文件的类型，支持 png、jpg 等 |
| quality | number | 1 | 否 | 生成的图片质量，取值范围 0-1 |
| exportScale | number | 2 | 否 | 设置导出图片尺寸的缩放比例 |
| imgSrc | string | '' | 否 | 图片源路径 |
| imgWidth | number/string | '' | 否 | 图片宽度，支持数值和字符串形式 |
| imgHeight | number/string | '' | 否 | 图片高度，支持数值和字符串形式 |
| maxScale | number | 3 | 否 | 图片最大缩放倍数 |
| aspectRatio | string | '1:1' | 否 | 裁剪框宽高比，格式为 width:height |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| imgloaded | 图片加载完成时 | 事件对象 |
| imgloaderror | 图片加载失败时 | 事件对象 |
| cancel | 点击取消按钮时 | - |
| confirm | 裁剪完成时 | { tempFilePath: string, width: number, height: number } - 包含裁剪后图片路径和尺寸的对象 |
| update:modelValue | 组件显示状态变化时 | 新的显示状态（boolean） |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| revertIsAnimation | animation: boolean | void | 控制是否使用动画效果 |
| resetImg | - | void | 初始化图片的大小、角度和位置 |
| setRoate | angle: number | void | 控制图片旋转角度 |

### Slots
组件未定义任何插槽。

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imgSrc"
      @confirm="onConfirm"
    />
    <image v-if="croppedImage" :src="croppedImage" style="width: 200px; height: 200px; margin-top: 20px;" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCropper = ref(false)
const imgSrc = ref('https://example.com/image.jpg')
const croppedImage = ref('')

const onConfirm = (res: { tempFilePath: string }) => {
  croppedImage.value = res.tempFilePath
  console.log('裁剪完成', res)
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 自定义裁剪比例

```vue
<template>
  <view class="container">
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imgSrc"
      aspect-ratio="4:3"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCropper = ref(false)
const imgSrc = ref('https://example.com/image.jpg')

const onConfirm = (res: { tempFilePath: string }) => {
  console.log('裁剪完成', res)
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 禁用旋转功能

```vue
<template>
  <view class="container">
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imgSrc"
      disabled-rotate
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCropper = ref(false)
const imgSrc = ref('https://example.com/image.jpg')

const onConfirm = (res: { tempFilePath: string }) => {
  console.log('裁剪完成', res)
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 自定义导出质量和格式

```vue
<template>
  <view class="container">
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imgSrc"
      file-type="jpg"
      quality="0.8"
      export-scale="3"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCropper = ref(false)
const imgSrc = ref('https://example.com/image.jpg')

const onConfirm = (res: { tempFilePath: string, width: number, height: number }) => {
  console.log('裁剪完成', res)
  console.log('图片尺寸:', res.width, 'x', res.height)
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

### 自定义按钮文案

```vue
<template>
  <view class="container">
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imgSrc"
      cancel-button-text="取消裁剪"
      confirm-button-text="完成裁剪"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCropper = ref(false)
const imgSrc = ref('https://example.com/image.jpg')

const onConfirm = (res: { tempFilePath: string }) => {
  console.log('裁剪完成', res)
}

const onCancel = () => {
  console.log('取消裁剪')
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-img-cropper 
  v-model="showCropper" 
  :img-src="imgSrc"
  custom-class="my-cropper"
/>

<style>
.my-cropper {
  /* 自定义样式 */
  background-color: rgba(0, 0, 0, 0.9);
}

/* 自定义裁剪框样式 */
.my-cropper .wd-img-cropper__cut--body {
  border: 2px solid #1989fa;
}
</style>
```

### customStyle 用法
```vue
<wd-img-cropper 
  v-model="showCropper" 
  :img-src="imgSrc"
  :custom-style="{
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  }"
/>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-img-cropper {
  /* 自定义背景颜色 */
  --cropper-background-color: rgba(0, 0, 0, 0.85);
  /* 自定义裁剪框边框颜色 */
  --cropper-border-color: #fff;
  /* 自定义裁剪框网格线颜色 */
  --cropper-grid-color: rgba(255, 255, 255, 0.5);
}
```

## 注意事项

1. **性能优化**：
   - 图片裁剪涉及大量计算，建议在性能较好的设备上使用
   - 合理设置 `exportScale` 属性，避免生成过大的图片
   - 对于大图，建议先进行压缩处理，再进行裁剪

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致
   - Canvas 相关 API 在不同平台上的实现可能略有差异
   - 部分功能（如长按识别小程序码）仅在特定平台有效

3. **使用限制**：
   - `imgSrc` 属性是图片裁剪的必要条件，必须提供有效的图片地址
   - 裁剪比例 `aspectRatio` 的格式必须为 `width:height`，如 `1:1`、`4:3` 等
   - 旋转角度必须是 90 度的倍数

4. **最佳实践**：
   - 为不同场景选择合适的裁剪比例，如头像使用 `1:1`，商品图片使用 `4:3`
   - 合理设置 `maxScale` 属性，避免过度缩放导致图片模糊
   - 结合 `quality` 属性，在图片质量和文件大小之间取得平衡
   - 提供清晰的用户指引，帮助用户完成裁剪操作

5. **常见问题**：
   - 问题：图片不显示
     解决方案：检查 `imgSrc` 属性是否正确，图片地址是否可访问
   - 问题：裁剪后图片模糊
     解决方案：增大 `exportScale` 属性值，提高导出图片的分辨率
   - 问题：旋转功能不生效
     解决方案：检查 `disabledRotate` 属性是否设置为 `false`
   - 问题：裁剪框比例不正确
     解决方案：检查 `aspectRatio` 属性的格式是否正确