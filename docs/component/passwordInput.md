# wd-password-input 密码输入组件

## 组件概述

wd-password-input 是一个安全的密码输入组件，采用格子式设计，用于输入密码或验证码等敏感信息。该组件支持密码隐藏/显示切换、自定义长度、聚焦状态显示光标等功能，适用于各种需要密码输入的场景。

### 功能特点
- 格子式密码输入设计，提升安全性和用户体验
- 支持密码隐藏/显示切换
- 支持自定义密码长度
- 聚焦时显示光标，提升交互体验
- 支持输入框间距自定义
- 支持下方提示文字和错误提示
- 支持自定义样式和类名

### 适用场景
- 登录密码输入
- 支付密码输入
- 验证码输入
- 安全码输入
- 任何需要安全输入的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | string |  | 否 | 绑定的值 |
| mask | boolean | true | 否 | 是否隐藏密码内容 |
| info | string |  | 否 | 输入框下方文字提示 |
| errorInfo | string |  | 否 | 输入框下方错误提示 |
| gutter | number / string | 0 | 否 | 输入框格子之间的间距，如 20px 2em，默认单位为 px |
| length | number | 6 | 否 | 密码最大长度 |
| focused | boolean | true | 否 | 是否已聚焦，聚焦时会显示光标 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| focus | 点击输入区域时触发 | event: Event |

### Methods

该组件不对外暴露任何方法。

### Slots

该组件不提供任何插槽。

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <!-- 基础密码输入组件 -->
    <wd-password-input v-model="password" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 密码值
const password = ref('')
</script>
```

### 2. 自定义长度

```vue
<template>
  <view>
    <!-- 自定义长度为4位的密码输入组件 -->
    <wd-password-input v-model="password" :length="4" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 3. 显示密码

```vue
<template>
  <view>
    <!-- 显示密码的输入组件 -->
    <wd-password-input v-model="password" :mask="false" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 4. 带提示和错误信息

```vue
<template>
  <view>
    <!-- 带提示信息的密码输入组件 -->
    <wd-password-input v-model="password" info="请输入6位支付密码" />
    
    <!-- 带错误信息的密码输入组件 -->
    <wd-password-input v-model="password" error-info="密码错误，请重新输入" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 5. 自定义间距和样式

```vue
<template>
  <view>
    <!-- 自定义间距和样式的密码输入组件 -->
    <wd-password-input 
      v-model="password" 
      :gutter="10"
      custom-style="margin: 20rpx 0;"
      custom-class="custom-password-input"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>

<style scoped>
.custom-password-input {
  /* 自定义密码输入组件样式 */
  :deep(.wd-password-input__item) {
    border-radius: 8rpx;
    background-color: #f5f5f5;
  }
  
  :deep(.wd-password-input__mask) {
    background-color: #333;
  }
  
  :deep(.wd-password-input__cursor) {
    background-color: #4D80F0;
  }
}
</style>
```

## 样式定制指南

### 1. 使用 customStyle 和 customClass

组件支持通过 `customStyle` 和 `customClass` 属性进行样式定制：

```vue
<wd-password-input 
  v-model="password" 
  custom-style="background-color: rgba(0, 0, 0, 0.05);" 
  custom-class="my-password-input"
/>

<style>
.my-password-input {
  /* 自定义样式 */
  border-radius: 8rpx;
  padding: 10rpx;
}
</style>
```

### 2. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-password-input 
  v-model="password" 
  custom-class="custom-password-input"
/>

<style scoped>
.custom-password-input {
  /* 自定义密码格子样式 */
  :deep(.wd-password-input__item) {
    width: 80rpx;
    height: 80rpx;
    border-radius: 12rpx;
    border: 2rpx solid #eee;
  }
  
  /* 自定义密码点样式 */
  :deep(.wd-password-input__mask) {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
  }
  
  /* 自定义光标样式 */
  :deep(.wd-password-input__cursor) {
    width: 4rpx;
    height: 50rpx;
    animation: blink 1s infinite;
  }
  
  /* 自定义提示文字样式 */
  :deep(.wd-password-input__info) {
    color: #666;
    font-size: 24rpx;
  }
  
  /* 自定义错误提示样式 */
  :deep(.wd-password-input__info.is-error) {
    color: #ee0a24;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
```

## 注意事项

### 1. 数据绑定
- 组件使用 v-model 双向绑定密码值
- 密码值为字符串类型，长度不超过设定的 length 值

### 2. 聚焦处理
- 点击输入区域时会触发 focus 事件
- 聚焦状态下，当前输入位置会显示光标
- 可以通过 focused 属性控制是否显示光标

### 3. 密码显示/隐藏
- 通过 mask 属性控制密码是否隐藏
- 隐藏状态下显示圆点，显示状态下显示实际字符

### 4. 错误提示
- errorInfo 属性优先级高于 info 属性
- 当 errorInfo 存在时，会显示 errorInfo 内容，否则显示 info 内容
- 错误提示会显示红色文字

### 5. 跨端兼容
- 组件在不同平台上的表现可能略有差异，建议在各平台上进行测试
- 光标动画效果在某些平台上可能表现不同

### 6. 性能优化
- 组件结构简单，性能开销较小，无需特殊优化
- 建议在不需要时及时清空密码值，保护用户隐私

### 7. 常见问题解决方案
- **问题**：光标不显示
  **解决方案**：检查 focused 属性是否为 true

- **问题**：密码长度不正确
  **解决方案**：检查 length 属性是否正确设置，确保输入值长度不超过设定值

- **问题**：样式定制不生效
  **解决方案**：使用深度选择器（如 :deep()）覆盖组件内部样式
