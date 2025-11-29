# wd-loading 加载指示器

## 组件概述

wd-loading 是一个轻量级的加载状态指示器组件，用于在数据加载、异步操作或页面切换过程中向用户提供视觉反馈，提升用户体验。该组件采用 SVG 实现，支持跨平台一致显示，具有体积小、渲染快、可高度定制等特点。

### 功能特点
- 支持两种视觉风格：环形进度条（ring）和轮廓旋转（outline）
- 支持自定义颜色、大小和样式
- 基于 SVG 实现，跨平台渲染一致
- 轻量级设计，性能优异
- 支持自定义样式和类名

### 适用场景
- 网络请求加载状态显示
- 页面初始化加载
- 表单提交等待状态
- 数据刷新或加载更多状态
- 模态框加载状态

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| type | string | ring | 否 | 加载指示器类型，可选值：'outline' | 'ring' |
| color | string | #4D80F0 | 否 | 加载指示器颜色，支持十六进制颜色值 |
| size | number / string |  | 否 | 加载指示器大小，支持数字或带单位的字符串 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

该组件不触发任何事件。

### Methods

该组件不对外暴露任何方法。

### Slots

该组件不提供任何插槽。

## 使用示例

### 1. 基础用法

```vue
<template>
  <!-- 基础加载指示器，使用默认配置 -->
  <wd-loading />
</template>

<script lang="ts" setup>
// 基础用法无需额外配置
</script>
```

### 2. 自定义颜色

```vue
<template>
  <!-- 自定义颜色为绿色 -->
  <wd-loading color="#07c160" />
  
  <!-- 自定义颜色为红色 -->
  <wd-loading color="#ee0a24" />
</template>

<script lang="ts" setup>
// 通过color属性可以自定义加载指示器的颜色
// 支持所有有效的十六进制颜色值
</script>
```

### 3. 自定义大小

```vue
<template>
  <!-- 使用数字设置大小，单位会自动转换为rpx -->
  <wd-loading size="40" />
  
  <!-- 使用字符串设置大小，支持各种CSS单位 -->
  <wd-loading size="60rpx" />
  <wd-loading size="30px" />
</template>

<script lang="ts" setup>
// size属性支持数字和字符串两种形式
// 数字形式会自动添加rpx单位
// 字符串形式可以指定任意CSS单位
</script>
```

### 4. 不同类型

```vue
<template>
  <!-- 使用ring类型（默认） -->
  <wd-loading type="ring" />
  
  <!-- 使用outline类型 -->
  <wd-loading type="outline" />
</template>

<script lang="ts" setup>
// type属性支持两种值：'ring'和'outline'
// 'ring'类型显示环形进度条样式
// 'outline'类型显示轮廓旋转样式
</script>
```

### 5. 样式定制

```vue
<template>
  <!-- 使用customStyle自定义内联样式 -->
  <wd-loading 
    customStyle="margin: 20rpx; transform: scale(1.5);" 
  />
  
  <!-- 使用customClass自定义样式类 -->
  <wd-loading customClass="my-loading" />
</template>

<script lang="ts" setup>
// 通过customStyle和customClass可以实现更复杂的样式定制
</script>

<style scoped>
.my-loading {
  /* 自定义样式类示例 */
  margin: 20rpx;
  opacity: 0.8;
}
</style>
```

## 样式定制指南

wd-loading 组件支持多种样式定制方式，以满足不同的设计需求：

### 1. 使用 customStyle 属性

通过 `customStyle` 属性可以直接设置内联样式，适用于简单的样式调整：

```vue
<wd-loading customStyle="margin: 20rpx; opacity: 0.8;" />
```

### 2. 使用 customClass 属性

通过 `customClass` 属性可以添加自定义样式类，适用于复杂的样式定制：

```vue
<wd-loading customClass="custom-loading" />

<style>
.custom-loading {
  margin: 20rpx;
  opacity: 0.8;
  /* 可以添加更多自定义样式 */
}
</style>
```

### 3. 直接覆盖组件样式

wd-loading 组件的根元素类名为 `wd-loading`，可以直接覆盖其样式：

```css
/* 全局样式覆盖 */
.wd-loading {
  /* 自定义样式 */
}

/* 特定页面样式覆盖 */
.page-index .wd-loading {
  /* 自定义样式 */
}
```

## 注意事项

### 1. 性能优化建议
- 避免在同一页面同时显示多个加载指示器，会分散用户注意力
- 对于长时间加载，建议配合文字提示使用，提升用户体验
- 加载完成后及时隐藏加载指示器，避免不必要的渲染

### 2. 平台兼容性
- 该组件基于 SVG 实现，确保在目标平台上支持 SVG 渲染
- 在小程序平台上，SVG 的某些高级特性可能受到限制

### 3. 最佳实践
- 根据场景选择合适的加载指示器类型：
  - 短期加载建议使用 `ring` 类型
  - 长期加载建议使用 `outline` 类型，配合文字提示
- 保持加载指示器颜色与整体设计风格一致
- 合理设置加载指示器大小，避免过大或过小

### 4. 常见问题
- **问题**：加载指示器不显示
  **解决方案**：检查组件是否正确引入，确保父容器有足够的空间显示

- **问题**：加载指示器样式不符合预期
  **解决方案**：使用 `customStyle` 或 `customClass` 进行样式调整，或检查是否有全局样式冲突

- **问题**：在某些平台上显示异常
  **解决方案**：检查平台对 SVG 的支持情况，尝试调整大小或类型
