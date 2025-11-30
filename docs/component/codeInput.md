# CodeInput 验证码输入框

## 组件概述

CodeInput 是一个用于验证码输入的 UI 组件，提供了美观、易用的验证码输入体验。它支持多种显示模式、自定义样式和自动完成功能，适用于手机验证码、邮箱验证码、支付密码等场景。

### 适用场景

- 手机验证码输入
- 邮箱验证码输入
- 支付密码输入
- 身份验证码输入
- 各种需要固定长度验证码的场景

## API 参考

### Props

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| type | String | number | 否 | 输入框类型 |
| confirm-type | String | done | 否 | 设置右下角按钮的文字，有效值：send|search|next|go|done |
| confirm-hold | Boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起，H5无效 |
| adjust-position | Boolean | true | 否 | 键盘弹起时，是否自动上推页面 |
| maxlength | Number | 6 | 否 | 最大输入长度 |
| dot | Boolean | false | 否 | 是否用圆点填充 |
| mode | String | box | 否 | 显示模式，可选值：box（盒子模式）、line（底部横线模式） |
| hairline | Boolean | false | 否 | 是否细边框 |
| space | String / Number | 10 | 否 | 字符间的距离 |
| model-value | String / Number | '' | 否 | 预置值 |
| focus | Boolean | false | 否 | 是否自动获取焦点 |
| bold | Boolean | false | 否 | 字体是否加粗 |
| color | String | #606266 | 否 | 字体颜色 |
| font-size | String / Number | 18 | 否 | 字体大小 |
| size | String / Number | 35 | 否 | 输入框的大小，宽等于高 |
| disabled-keyboard | Boolean | false | 否 | 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true |
| border-color | String | #e4e7ed | 否 | 边框和线条颜色 |
| disabled-dot | Boolean | true | 否 | 是否禁止输入"."符号 |
| bg-color | String | '' | 否 | 背景颜色 |
| round | String / Number | 4 | 否 | 设置圆角值 |
| custom-style | String | - | 否 | 自定义根节点样式 |
| custom-class | String | - | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 输入内容变化时触发 | value: String - 当前输入的值 |
| finish | 输入长度达到 maxlength 时触发 | value: String - 完整的输入值 |
| update:modelValue | 绑定值变化时触发 | value: String - 新的绑定值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| - | - | - | 该组件未对外暴露任何方法 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| - | - | 该组件未提供任何插槽 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input v-model="code" @finish="handleFinish" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')

// 处理输入完成事件
const handleFinish = (value: string) => {
  console.log('输入完成:', value)
  // 这里可以调用验证验证码的API
}
</script>
```

### 圆点模式

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      dot 
      @finish="handleFinish"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')

const handleFinish = (value: string) => {
  console.log('输入完成:', value)
}
</script>
```

### 横线模式

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      mode="line" 
      @finish="handleFinish"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')

const handleFinish = (value: string) => {
  console.log('输入完成:', value)
}
</script>
```

### 自定义样式

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      :size="50" 
      :font-size="24" 
      color="#4d80f0" 
      border-color="#4d80f0" 
      :space="20" 
      :round="8" 
      bold 
      @finish="handleFinish"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')

const handleFinish = (value: string) => {
  console.log('输入完成:', value)
}
</script>
```

### 4位验证码

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      :maxlength="4" 
      @finish="handleFinish"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')

const handleFinish = (value: string) => {
  console.log('输入完成:', value)
}
</script>
```

### 自动获取焦点

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      focus 
      @finish="handleFinish"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref('')

const handleFinish = (value: string) => {
  console.log('输入完成:', value)
}
</script>
```

## 样式定制

### 自定义根节点样式

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      custom-class="my-code-input" 
      custom-style="margin-top: 20px;" 
      @finish="handleFinish"
    />
  </view>
</template>

<style scoped>
.my-code-input {
  /* 自定义根节点样式 */
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}
</style>
```

### 自定义输入框样式

```vue
<template>
  <view class="code-input-demo">
    <wd-code-input 
      v-model="code" 
      :size="40" 
      :font-size="20" 
      color="#67c23a" 
      border-color="#67c23a" 
      :round="4" 
      @finish="handleFinish"
    />
  </view>
</template>
```

## 注意事项

### 1. 输入类型

- 默认输入类型为 `number`，只允许输入数字
- 可以通过 `type` 属性修改输入类型
- 当设置 `disabled-dot` 为 `true` 时，会禁止输入 "." 符号

### 2. 显示模式

- 支持两种显示模式：`box`（盒子模式）和 `line`（底部横线模式）
- 盒子模式下，每个字符显示在独立的盒子中
- 横线模式下，每个字符下方显示一条横线

### 3. 自动获取焦点

- 设置 `focus` 为 `true` 可以自动获取焦点
- 自动获取焦点在某些平台可能存在兼容性问题
- 建议在需要时手动调用焦点相关 API

### 4. 自定义键盘

- 设置 `disabled-keyboard` 为 `true` 可以隐藏原生键盘
- 适用于需要使用自定义键盘的场景
- 隐藏原生键盘后，需要自己实现输入逻辑

### 5. 事件处理

- `change` 事件会在每次输入时触发
- `finish` 事件会在输入长度达到 `maxlength` 时触发
- 建议在 `finish` 事件中处理验证码验证逻辑

### 6. 性能优化

- 组件内部使用 `computed` 优化计算逻辑
- 避免频繁更新 `model-value`，可考虑使用防抖
- 对于大量验证码输入组件的场景，建议合理使用 `v-if` 和 `v-show`
