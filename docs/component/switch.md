# Switch 开关

## 组件概述

Switch 是一个用于在两种状态之间切换的 UI 组件，常用于开关控制、功能启用/禁用等场景。它提供了丰富的自定义选项，包括颜色、大小、状态值等，支持双向绑定和切换前的确认机制。

### 功能特点
- 支持布尔值、字符串和数字类型的绑定值
- 可自定义激活和非激活状态的颜色
- 支持禁用状态
- 提供切换前的钩子函数，支持异步确认
- 可自定义开关大小和圆点颜色
- 支持双向数据绑定
- 兼容多端平台

### 适用场景
- 功能开关控制
- 权限设置
- 偏好配置
- 状态切换
- 表单元素

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | boolean/string/number | false | 是 | 绑定值，必须在 activeValue 和 inactiveValue 范围内 |
| disabled | boolean | false | 否 | 是否禁用开关 |
| activeValue | boolean/string/number | true | 否 | 激活状态的值 |
| inactiveValue | boolean/string/number | false | 否 | 非激活状态的值 |
| activeColor | string | - | 否 | 激活状态的背景颜色 |
| inactiveColor | string | - | 否 | 非激活状态的背景颜色 |
| circleColor | string | - | 否 | 开关圆点的颜色 |
| size | number/string | - | 否 | 开关的大小 |
| beforeChange | function | - | 否 | 切换前的钩子函数，返回一个对象，包含 value 和 resolve 函数，调用 resolve(true) 允许切换，resolve(false) 阻止切换 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 开关状态改变时触发 | { value: any }，value 为新的开关值 |
| update:modelValue | 开关状态改变时触发 | value: any，新的开关值，用于双向绑定 |

### Methods

该组件未对外暴露任何方法。

### Slots

该组件不包含任何插槽。

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text>基础开关</text>
    <wd-switch v-model="switchValue" />
    <text>当前值：{{ switchValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(false)
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 自定义颜色

```vue
<template>
  <view class="demo-container">
    <text>自定义颜色</text>
    <wd-switch 
      v-model="switchValue" 
      active-color="#1989fa" 
      inactive-color="#e4e7ed" 
      circle-color="#fff" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>
```

### 禁用状态

```vue
<template>
  <view class="demo-container">
    <text>禁用状态</text>
    <wd-switch v-model="switchValue1" disabled />
    <wd-switch v-model="switchValue2" disabled />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue1 = ref(false)
const switchValue2 = ref(true)
</script>
```

### 自定义值

```vue
<template>
  <view class="demo-container">
    <text>自定义值</text>
    <wd-switch 
      v-model="switchValue" 
      active-value="on" 
      inactive-value="off" 
    />
    <text>当前值：{{ switchValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref('on')
</script>
```

### 切换前确认

```vue
<template>
  <view class="demo-container">
    <text>切换前确认</text>
    <wd-switch 
      v-model="switchValue" 
      :before-change="beforeChange" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(false)

const beforeChange = ({ value, resolve }: { value: any, resolve: (pass: boolean) => void }) => {
  uni.showModal({
    title: '确认切换',
    content: `确定要切换到${value ? '开启' : '关闭'}状态吗？`,
    success: (res) => {
      resolve(res.confirm)
    }
  })
}
</script>
```

### 自定义大小

```vue
<template>
  <view class="demo-container">
    <text>自定义大小</text>
    <wd-switch v-model="switchValue1" size="40" />
    <wd-switch v-model="switchValue2" size="60" />
    <wd-switch v-model="switchValue3" size="80" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue1 = ref(false)
const switchValue2 = ref(true)
const switchValue3 = ref(false)
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-switch v-model="switchValue" custom-class="my-switch" />
```

### 自定义样式

```vue
<wd-switch 
  v-model="switchValue" 
  :custom-style="{ borderRadius: '20rpx', border: '2rpx solid #ddd' }" 
/>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --switch-active-color | #1989fa | 激活状态背景色 |
| --switch-inactive-color | #e4e7ed | 非激活状态背景色 |
| --switch-circle-color | #ffffff | 开关圆点颜色 |
| --switch-disabled-opacity | 0.5 | 禁用状态透明度 |
| --switch-transition-duration | 0.3s | 切换动画时长 |
| --switch-height | 32rpx | 开关高度 |
| --switch-width | 56rpx | 开关宽度 |
| --switch-circle-size | 28rpx | 开关圆点大小 |

## 注意事项

1. **绑定值范围**：
   - `modelValue` 必须在 `activeValue` 和 `inactiveValue` 范围内
   - 如果初始值不在范围内，组件会自动将其重置为 `inactiveValue`

2. **类型一致性**：
   - 建议保持 `modelValue`、`activeValue` 和 `inactiveValue` 的类型一致
   - 混合使用不同类型可能导致意外行为

3. **beforeChange 钩子**：
   - 使用 `beforeChange` 钩子时，必须调用 `resolve` 函数，否则开关状态不会改变
   - 可以在 `beforeChange` 中执行异步操作，如 API 请求、弹窗确认等

4. **性能优化**：
   - 避免在 `beforeChange` 中执行复杂的同步操作，以免影响切换流畅度
   - 对于大量开关的场景，建议使用 `v-for` 时添加唯一的 `key`

5. **平台兼容性**：
   - 所有平台均支持基本功能
   - 样式在不同平台可能存在细微差异

6. **样式覆盖**：
   - 组件使用 `styleIsolation: 'shared'`，支持外部样式覆盖
   - 可以通过 CSS 变量或自定义类名修改样式

### 状态流转
- 初始状态：根据 `modelValue` 决定开关状态
- 点击事件：触发 `switchValue` 函数
- 状态检查：检查是否禁用，是否在 `beforeChange` 钩子中被阻止
- 状态更新：更新 `modelValue`，触发 `change` 和 `update:modelValue` 事件
- 样式更新：根据新状态更新开关样式

## 常见问题

### Q: 为什么初始值没有生效？
A: 请确保初始值在 `activeValue` 和 `inactiveValue` 范围内，否则组件会自动重置为 `inactiveValue`

### Q: 如何自定义开关的形状？
A: 可以通过 CSS 变量 `--switch-border-radius` 调整开关的圆角，实现不同形状

### Q: 为什么 `beforeChange` 钩子没有生效？
A: 请确保 `beforeChange` 是一个函数，并且在函数内部调用了 `resolve` 函数

### Q: 如何实现开关的垂直排列？
A: 可以通过自定义样式或 CSS 变量调整开关的宽高比，实现垂直排列

### Q: 开关在禁用状态下为什么还有点击效果？
A: 禁用状态下，组件会阻止状态切换，但点击事件仍会触发，这是正常行为
