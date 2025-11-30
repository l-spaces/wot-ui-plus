# wd-slider 滑块组件

## 组件概述

滑块组件是一个用于在给定范围内选择数值的交互控件，支持单滑块和双滑块（范围选择）两种模式。它提供了丰富的配置选项，包括自定义颜色、步长、显示隐藏标签等，适用于各种需要用户进行数值选择的场景。

### 功能特点
- 支持单滑块和双滑块（范围选择）模式
- 可自定义激活和非激活状态的颜色
- 支持自定义步长值
- 可隐藏或显示最小值、最大值和当前值标签
- 支持禁用状态
- 提供完整的拖动事件回调
- 支持自定义样式和类名

### 适用场景
- 音量调节
- 亮度控制
- 价格范围选择
- 评分设置
- 进度条显示
- 筛选条件设置

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number \| number[] | 0 | 否 | 滑块的值，如果为数组，则为双向滑块 |
| min | number | 0 | 否 | 滑块的最小值 |
| max | number | 100 | 否 | 滑块的最大值 |
| step | number | 1 | 否 | 滑块的步进值 |
| disabled | boolean | false | 否 | 是否禁用滑块 |
| hideMinMax | boolean | false | 否 | 是否隐藏左右的最大最小值 |
| hideLabel | boolean | false | 否 | 是否隐藏当前滑块值 |
| inactiveColor | string | '#e5e5e5' | 否 | 进度条未激活的背景颜色 |
| activeColor | string | '' | 否 | 进度条激活的背景颜色 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| customMinClass | string | '' | 否 | 自定义最小值的样式类名 |
| customMaxClass | string | '' | 否 | 自定义最大值的样式类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| dragstart | 开始拖动滑块时触发 | `{ value: number \| number[] }` - 当前滑块的值 |
| dragmove | 拖动滑块过程中触发 | `{ value: number \| number[] }` - 当前滑块的值 |
| dragend | 结束拖动滑块时触发 | `{ value: number \| number[] }` - 当前滑块的值 |
| update:modelValue | 滑块值改变时触发 | `number \| number[]` - 新的滑块值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| initSlider | - | - | 初始化滑块宽度，用于动态调整滑块尺寸 |

### Slots

该组件没有提供任何插槽。

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础滑块</text>
    <wd-slider v-model="value" />
    <text class="demo-value">当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 滑块值
const value = ref(50)
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

.demo-value {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 双滑块模式

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">双滑块（范围选择）</text>
    <wd-slider v-model="rangeValue" />
    <text class="demo-value">当前范围: {{ rangeValue[0] }} - {{ rangeValue[1] }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 双滑块范围值
const rangeValue = ref([30, 70])
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

.demo-value {
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
    <text class="demo-title">自定义样式滑块</text>
    <wd-slider 
      v-model="value" 
      :active-color="'#1989fa'" 
      :inactive-color="'#e8f4ff'" 
      :step="5" 
      :hide-min-max="true"
    />
    <text class="demo-value">当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 滑块值
const value = ref(45)
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

.demo-value {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 禁用状态

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">禁用状态滑块</text>
    <wd-slider v-model="value" disabled />
    <text class="demo-value">当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 滑块值
const value = ref(50)
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

.demo-value {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 隐藏标签

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">隐藏标签滑块</text>
    <wd-slider v-model="value" :hide-label="true" />
    <text class="demo-value">当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 滑块值
const value = ref(50)
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

.demo-value {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --slider-height | 8rpx | 滑块轨道高度 |
| --slider-active-color | #1989fa | 滑块激活状态颜色 |
| --slider-inactive-color | #e5e5e5 | 滑块非激活状态颜色 |
| --slider-button-width | 32rpx | 滑块按钮宽度 |
| --slider-button-height | 32rpx | 滑块按钮高度 |
| --slider-button-border-radius | 50% | 滑块按钮圆角 |
| --slider-label-font-size | 20rpx | 滑块标签字体大小 |
| --slider-label-color | #606266 | 滑块标签颜色 |
| --slider-label-margin-top | 8rpx | 滑块标签与按钮的间距 |
| --slider-min-max-font-size | 20rpx | 滑块最小值和最大值字体大小 |
| --slider-min-max-color | #909399 | 滑块最小值和最大值颜色 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式滑块</text>
    <wd-slider 
      v-model="value" 
      custom-class="custom-slider"
    />
    <text class="demo-value">当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 滑块值
const value = ref(50)
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

.demo-value {
  font-size: 24rpx;
  color: #666;
  margin-top: 20rpx;
  display: block;
}

/* 自定义滑块样式 */
.custom-slider {
  --slider-height: 12rpx;
  --slider-active-color: #07c160;
  --slider-button-width: 40rpx;
  --slider-button-height: 40rpx;
}
</style>
```

## 注意事项

1. **双滑块模式**：当 `modelValue` 为数组时，组件自动切换为双滑块模式，数组长度必须为 2，且第一个值小于第二个值。

2. **步长设置**：步长值必须大于 0，否则会被重置为 1。

3. **值的范围**：组件会自动将值限制在 `min` 和 `max` 范围内，无需手动处理。

4. **初始化问题**：在某些情况下，滑块可能无法正确获取容器宽度，此时可以调用 `initSlider` 方法重新初始化。

5. **性能优化**：在拖动过程中，`dragmove` 事件会频繁触发，避免在该事件处理函数中执行复杂的计算或操作。

6. **跨平台兼容性**：组件已处理了不同平台的差异，特别是在钉钉小程序上使用了特殊的条件编译处理。

7. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

8. **自定义颜色**：当设置 `activeColor` 时，会覆盖默认的主题色。

## 组件生命周期

1. 组件挂载时，会自动调用 `initSlider` 方法初始化滑块宽度。
2. 当 `modelValue` 变化时，会自动更新滑块位置。
3. 拖动滑块时，会触发 `dragstart`、`dragmove` 和 `dragend` 事件。
4. 拖动结束后，会将最终值通过 `update:modelValue` 事件传递给父组件。

## 常见问题

### Q: 滑块无法拖动？
A: 请检查是否设置了 `disabled` 属性为 `true`，或者组件是否被其他元素遮挡。

### Q: 双滑块模式下，两个滑块重叠在一起？
A: 请确保 `modelValue` 数组中的两个值不相等，且第一个值小于第二个值。

### Q: 滑块值不随拖动变化？
A: 请检查是否正确使用了 `v-model` 绑定，或者是否在 `dragmove` 事件中手动处理了值的更新。

### Q: 滑块样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。

### Q: 在某些平台上，滑块显示异常？
A: 组件已针对不同平台进行了适配，但如果遇到问题，可以尝试调用 `initSlider` 方法重新初始化，或者检查容器的样式设置。