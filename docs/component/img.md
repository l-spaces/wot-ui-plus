# wd-img 图片

## 组件概述

图片组件是一个用于展示图片的通用组件，支持多种填充模式、懒加载、预览功能等。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，具有轻量、易用、灵活等特点。

### 功能描述
- 支持多种填充模式
- 支持懒加载
- 支持图片预览
- 支持圆形图片
- 支持自定义宽高和圆角
- 支持加载中状态和错误状态的自定义插槽
- 支持长按识别小程序码（仅微信小程序）
- 轻量级设计，性能开销小

### 适用场景
- 商品图片展示
- 用户头像展示
- 文章配图
- 图片列表
- 任何需要展示图片的场景

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| src | string | - | 否 | 图片链接 |
| previewSrc | string | - | 否 | 预览图片链接，默认使用 src |
| round | boolean | false | 否 | 是否显示为圆形 |
| mode | string | 'scaleToFill' | 否 | 填充模式，可选值：'scaleToFill'、'aspectFit'、'aspectFill'、'widthFix'、'heightFix'、'top'、'bottom'、'center'、'left'、'right'、'top left'、'top right'、'bottom left'、'bottom right' |
| lazyLoad | boolean | false | 否 | 是否懒加载 |
| width | number/string | - | 否 | 宽度，默认单位为px |
| height | number/string | - | 否 | 高度，默认单位为px |
| radius | number/string | - | 否 | 圆角大小，默认单位为px |
| enablePreview | boolean | false | 否 | 是否允许预览 |
| showMenuByLongpress | boolean | false | 否 | 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效 |
| customImage | string | '' | 否 | 自定义图片类名 |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| error | 图片加载失败时 | 事件对象 |
| click | 点击图片时 | 事件对象 |
| load | 图片加载成功时 | 事件对象 |

### Methods
组件未对外暴露任何方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| loading | - | 加载中状态的自定义内容 |
| error | - | 加载失败状态的自定义内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-img 
      src="https://example.com/image.jpg" 
      width="200" 
      height="200"
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 不同填充模式

```vue
<template>
  <view class="container">
    <view class="mode-item">
      <text class="mode-label">scaleToFill</text>
      <wd-img 
        src="https://example.com/image.jpg" 
        width="150" 
        height="150"
        mode="scaleToFill"
      />
    </view>
    <view class="mode-item">
      <text class="mode-label">aspectFit</text>
      <wd-img 
        src="https://example.com/image.jpg" 
        width="150" 
        height="150"
        mode="aspectFit"
      />
    </view>
    <view class="mode-item">
      <text class="mode-label">aspectFill</text>
      <wd-img 
        src="https://example.com/image.jpg" 
        width="150" 
        height="150"
        mode="aspectFill"
      />
    </view>
    <view class="mode-item">
      <text class="mode-label">widthFix</text>
      <wd-img 
        src="https://example.com/image.jpg" 
        width="150"
        mode="widthFix"
      />
    </view>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
}

.mode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.mode-label {
  font-size: 14px;
  color: #666;
}
</style>
```

### 圆形图片和圆角图片

```vue
<template>
  <view class="container">
    <view class="img-item">
      <text class="img-label">圆形图片</text>
      <wd-img 
        src="https://example.com/avatar.jpg" 
        width="100" 
        height="100"
        round
      />
    </view>
    <view class="img-item">
      <text class="img-label">圆角图片</text>
      <wd-img 
        src="https://example.com/image.jpg" 
        width="150" 
        height="150"
        :radius="20"
      />
    </view>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 40px;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
}

.img-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.img-label {
  font-size: 14px;
  color: #666;
}
</style>
```

### 图片预览

```vue
<template>
  <view class="container">
    <wd-img 
      src="https://example.com/image.jpg" 
      width="200" 
      height="200"
      enable-preview
      preview-src="https://example.com/preview.jpg"
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 自定义加载和错误状态

```vue
<template>
  <view class="container">
    <wd-img 
      src="https://example.com/invalid-image.jpg" 
      width="200" 
      height="200"
    >
      <template #loading>
        <view class="loading-slot">
          <text class="loading-text">加载中...</text>
        </view>
      </template>
      <template #error>
        <view class="error-slot">
          <text class="error-text">加载失败</text>
        </view>
      </template>
    </wd-img>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.loading-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.loading-text {
  font-size: 14px;
  color: #999;
}

.error-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.error-text {
  font-size: 14px;
  color: #ee0a24;
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-img 
  src="https://example.com/image.jpg" 
  custom-class="my-img"
/>

<style>
.my-img {
  /* 自定义样式 */
  border: 2px solid #e5e5e5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### customStyle 用法
```vue
<wd-img 
  src="https://example.com/image.jpg" 
  :custom-style="{
    border: '2px solid #e5e5e5',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px'
  }"
/>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-img {
  /* 自定义宽度 */
  --img-width: auto;
  /* 自定义高度 */
  --img-height: auto;
  /* 自定义圆角 */
  --img-border-radius: 0;
}
```

## 注意事项

1. **性能优化**：
   - 对于大量图片场景，建议开启 `lazyLoad` 属性，减少初始加载时间
   - 合理设置图片尺寸，避免过大图片影响加载性能
   - 考虑使用图片压缩和 CDN 加速，提高图片加载速度

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致
   - `showMenuByLongpress` 属性仅在微信小程序平台有效
   - 懒加载功能在不同平台上的实现机制可能略有差异

3. **使用限制**：
   - `src` 属性是图片显示的必要条件，必须提供有效的图片地址
   - 预览功能需要 `enablePreview` 属性设置为 `true`
   - 圆形图片需要同时设置 `width` 和 `height` 属性，且值相等

4. **最佳实践**：
   - 为不同场景选择合适的 `mode` 属性，如头像使用 `aspectFill`，列表图片使用 `widthFix`
   - 为图片设置适当的 `width` 和 `height`，避免布局抖动
   - 结合 `loading` 和 `error` 插槽，提供良好的用户体验
   - 对于需要频繁更换的图片，建议使用动态绑定 `src` 属性

5. **常见问题**：
   - 问题：图片不显示
     解决方案：检查 `src` 属性是否正确，图片地址是否可访问
   - 问题：图片变形
     解决方案：选择合适的 `mode` 属性，或同时设置 `width` 和 `height`
   - 问题：预览功能不生效
     解决方案：检查 `enablePreview` 属性是否设置为 `true`
