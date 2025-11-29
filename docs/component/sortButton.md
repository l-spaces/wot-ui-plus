# wd-sort-button 排序按钮组件

## 组件概述

排序按钮组件是一个用于实现列表排序功能的交互控件，支持升序、降序和重置三种状态切换。它提供了丰富的配置选项，包括自定义标题、箭头样式、排序顺序和下划线样式等，适用于各种需要排序功能的列表场景。

### 功能特点
- 支持升序、降序和重置三种状态切换
- 可自定义按钮标题和箭头样式
- 支持优先切换为降序或升序
- 可配置是否允许手动重置
- 支持自定义下划线样式
- 提供完整的事件回调
- 适配各种列表排序场景

### 适用场景
- 表格数据排序
- 列表数据筛选
- 商品列表排序
- 搜索结果排序
- 数据报表排序

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number | 0 | 否 | 选中的箭头方向，1表示升序，0表示重置状态，-1表示降序 |
| title | string | '' | 否 | 排序按钮展示的文案 |
| filled | boolean | false | 否 | 是否展示填充箭头 |
| allowReset | boolean | false | 否 | 当展示双箭头时，是否允许手动重置按钮 |
| descFirst | boolean | false | 否 | 是否优先切换为降序，如果不开启则默认优先切换为升序 |
| line | boolean | true | 否 | 是否展示下划线，当只有一个排序按钮时，通常不展示下划线 |
| lineColor | string | undefined | 否 | 自定义下划线颜色 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 排序状态改变时触发 | `value: number` - 新的排序状态（1: 升序, 0: 重置, -1: 降序） |
| change | 排序状态改变时触发 | `{ value: number }` - 包含新排序状态的对象 |

### Methods

该组件没有对外暴露任何方法。

### Slots

该组件没有提供任何插槽。

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础排序按钮</text>
    <wd-sort-button 
      title="排序" 
      v-model="sortValue"
      @change="onChange"
    />
    <text class="demo-result">当前排序状态: {{ getSortText(sortValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 排序状态，0: 重置, 1: 升序, -1: 降序
const sortValue = ref(0)

// 排序状态改变回调
const onChange = (event: { value: number }) => {
  console.log('排序状态改变:', event.value)
}

// 获取排序状态文本
const getSortText = (value: number): string => {
  switch (value) {
    case 1:
      return '升序'
    case -1:
      return '降序'
    default:
      return '重置'
  }
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

.demo-result {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 优先降序

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">优先降序排序按钮</text>
    <wd-sort-button 
      title="价格" 
      v-model="sortValue"
      :desc-first="true"
      @change="onChange"
    />
    <text class="demo-result">当前排序状态: {{ getSortText(sortValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 排序状态，0: 重置, 1: 升序, -1: 降序
const sortValue = ref(0)

// 排序状态改变回调
const onChange = (event: { value: number }) => {
  console.log('排序状态改变:', event.value)
}

// 获取排序状态文本
const getSortText = (value: number): string => {
  switch (value) {
    case 1:
      return '升序'
    case -1:
      return '降序'
    default:
      return '重置'
  }
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

.demo-result {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 允许重置

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">允许重置排序按钮</text>
    <wd-sort-button 
      title="销量" 
      v-model="sortValue"
      :allow-reset="true"
      @change="onChange"
    />
    <text class="demo-result">当前排序状态: {{ getSortText(sortValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 排序状态，0: 重置, 1: 升序, -1: 降序
const sortValue = ref(0)

// 排序状态改变回调
const onChange = (event: { value: number }) => {
  console.log('排序状态改变:', event.value)
}

// 获取排序状态文本
const getSortText = (value: number): string => {
  switch (value) {
    case 1:
      return '升序'
    case -1:
      return '降序'
    default:
      return '重置'
  }
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

.demo-result {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 填充箭头

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">填充箭头排序按钮</text>
    <wd-sort-button 
      title="评分" 
      v-model="sortValue"
      :filled="true"
      @change="onChange"
    />
    <text class="demo-result">当前排序状态: {{ getSortText(sortValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 排序状态，0: 重置, 1: 升序, -1: 降序
const sortValue = ref(0)

// 排序状态改变回调
const onChange = (event: { value: number }) => {
  console.log('排序状态改变:', event.value)
}

// 获取排序状态文本
const getSortText = (value: number): string => {
  switch (value) {
    case 1:
      return '升序'
    case -1:
      return '降序'
    default:
      return '重置'
  }
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

.demo-result {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 自定义样式

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式排序按钮</text>
    <wd-sort-button 
      title="时间" 
      v-model="sortValue"
      :line="true"
      line-color="#07c160"
      custom-class="custom-sort-button"
      @change="onChange"
    />
    <text class="demo-result">当前排序状态: {{ getSortText(sortValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 排序状态，0: 重置, 1: 升序, -1: 降序
const sortValue = ref(0)

// 排序状态改变回调
const onChange = (event: { value: number }) => {
  console.log('排序状态改变:', event.value)
}

// 获取排序状态文本
const getSortText = (value: number): string => {
  switch (value) {
    case 1:
      return '升序'
    case -1:
      return '降序'
    default:
      return '重置'
  }
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

.demo-result {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}

/* 自定义排序按钮样式 */
.custom-sort-button {
  font-size: 28rpx;
  color: #333;
}

.custom-sort-button .wd-sort-button__icon-up,
.custom-sort-button .wd-sort-button__icon-down {
  font-size: 24rpx;
  margin-left: 8rpx;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --sort-button-line-color | #1989fa | 下划线颜色 |
| --sort-button-text-color | #303133 | 文字颜色 |
| --sort-button-active-color | #1989fa | 激活状态文字颜色 |
| --sort-button-font-size | 28rpx | 文字大小 |
| --sort-button-arrow-size | 20rpx | 箭头大小 |
| --sort-button-padding | 20rpx | 内边距 |
| --sort-button-line-height | 44rpx | 行高 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式排序按钮</text>
    <wd-sort-button 
      title="自定义" 
      v-model="sortValue"
      custom-class="custom-sort-button"
      @change="onChange"
    />
    <text class="demo-result">当前排序状态: {{ getSortText(sortValue) }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 排序状态，0: 重置, 1: 升序, -1: 降序
const sortValue = ref(0)

// 排序状态改变回调
const onChange = (event: { value: number }) => {
  console.log('排序状态改变:', event.value)
}

// 获取排序状态文本
const getSortText = (value: number): string => {
  switch (value) {
    case 1:
      return '升序'
    case -1:
      return '降序'
    default:
      return '重置'
  }
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

.demo-result {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}

/* 自定义排序按钮样式 */
.custom-sort-button {
  --sort-button-line-color: #ff6b6b;
  --sort-button-text-color: #666;
  --sort-button-active-color: #ff6b6b;
  --sort-button-font-size: 32rpx;
  --sort-button-arrow-size: 24rpx;
  --sort-button-padding: 24rpx;
  --sort-button-line-height: 52rpx;
}
</style>
```

## 注意事项

1. **排序状态**：组件的排序状态通过 `modelValue` 控制，取值为 -1（降序）、0（重置）、1（升序）。

2. **排序顺序**：通过 `descFirst` 属性可以配置排序的优先顺序，默认为优先升序。

3. **重置功能**：设置 `allowReset` 为 `true` 后，点击按钮可以在升序、降序和重置状态之间循环切换。

4. **下划线样式**：通过 `line` 属性可以控制是否显示下划线，通过 `lineColor` 属性可以自定义下划线颜色。

5. **箭头样式**：设置 `filled` 为 `true` 后，会显示填充样式的箭头。

6. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

7. **性能优化**：组件结构简单，渲染性能优秀，适合在列表中大量使用。

## 常见问题

### Q: 排序按钮点击没有反应？
A: 请检查是否正确绑定了 `v-model` 或 `@update:modelValue` 事件，或者组件是否被其他元素遮挡。

### Q: 排序状态没有正确更新？
A: 请确保 `v-model` 绑定的变量是响应式的，或者在 `change` 事件中手动更新了变量值。

### Q: 自定义样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。

### Q: 组件在某些平台上显示异常？
A: 组件已针对不同平台进行了适配，但如果遇到问题，可以尝试调整组件的样式，或者检查平台的兼容性。

### Q: 如何隐藏下划线？
A: 可以通过设置 `line` 属性为 `false` 来隐藏下划线。
