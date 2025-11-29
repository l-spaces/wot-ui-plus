# 键盘组件（wd-keyboard）

## 组件概述

wd-keyboard 是一个功能丰富、高度可定制的虚拟键盘组件，基于 Vue 3 + TypeScript + UniApp 开发，支持多平台适配。该组件提供了多种键盘模式，包括默认数字键盘、自定义键盘和车牌键盘，适用于各种需要安全输入或特殊格式输入的场景。

### 功能描述
- 支持多种键盘模式（默认、自定义、车牌）
- 可配置的键盘布局和按键样式
- 支持随机按键顺序，增强安全性
- 支持最大长度限制
- 支持自定义标题和按钮文本
- 支持自动切换车牌键盘语言
- 支持点击外部关闭键盘
- 支持自定义样式和类名

### 适用业务场景
- 密码输入（如支付密码、登录密码）
- 验证码输入
- 金额输入
- 车牌号码输入
- 其他需要特殊键盘输入的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| visible | boolean | false | 否 | 是否可见 |
| modelValue | string | '' | 否 | 绑定的值 |
| title | string | - | 否 | 标题 |
| mode | string | 'default' | 否 | 键盘模式，可选值：default（默认数字键盘）、custom（自定义键盘）、car（车牌键盘） |
| zIndex | number | 100 | 否 | 层级 |
| maxlength | number | Infinity | 否 | 最大长度 |
| showDeleteKey | boolean | true | 否 | 是否显示删除键 |
| randomKeyOrder | boolean | false | 否 | 是否随机键盘按键顺序 |
| closeText | string | - | 否 | 确认按钮文本 |
| deleteText | string | - | 否 | 删除按钮文本 |
| closeButtonLoading | boolean | false | 否 | 关闭按钮是否显示加载状态 |
| modal | boolean | false | 否 | 是否显示蒙层 |
| hideOnClickOutside | boolean | true | 否 | 是否在点击外部时收起键盘 |
| lockScroll | boolean | true | 否 | 是否锁定滚动 |
| safeAreaInsetBottom | boolean | true | 否 | 是否在底部安全区域内 |
| extraKey | string / array | - | 否 | 额外按键，在 default 模式下为单个按键，在 custom 模式下可以为多个按键 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| carLang | string | - | 否 | 车牌键盘语言模式，当 mode=car 时生效，可选值：zh（中文）、en（英文） |
| autoSwitchLang | boolean | false | 否 | 是否自动切换车牌键盘语言，当 mode=car 且 carLang 是非受控状态时生效 |
| customStyle | object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:visible | 键盘可见性变化时触发 | visible: boolean（键盘是否可见） |
| input | 按键输入时触发 | text: string（输入的文本） |
| update:modelValue | 绑定值变化时触发 | value: string（新的绑定值） |
| delete | 删除按键触发时触发 | - |
| close | 键盘关闭时触发 | - |
| update:carLang | 车牌键盘语言变化时触发 | lang: string（新的语言） |

### Methods

该组件没有对外暴露的方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| title | - | 自定义标题内容，替换默认的标题文本 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view class="demo">
    <text>输入值：{{ value }}</text>
    <wd-button type="primary" @click="visible = true">显示键盘</wd-button>
    <wd-keyboard
      v-model:visible="visible"
      v-model="value"
      title="默认键盘"
      close-text="确认"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')
</script>
```

### 安全键盘（随机按键顺序）

```vue
<template>
  <view class="demo">
    <text>密码：{{ value }}</text>
    <wd-button type="primary" @click="visible = true">显示安全键盘</wd-button>
    <wd-keyboard
      v-model:visible="visible"
      v-model="value"
      title="安全键盘"
      random-key-order
      maxlength="6"
      close-text="确认"
      delete-text="删除"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')
</script>
```

### 自定义键盘

```vue
<template>
  <view class="demo">
    <text>输入值：{{ value }}</text>
    <wd-button type="primary" @click="visible = true">显示自定义键盘</wd-button>
    <wd-keyboard
      v-model:visible="visible"
      v-model="value"
      title="自定义键盘"
      mode="custom"
      :extra-key="['.', '确认']"
      close-text="关闭"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')
</script>
```

### 车牌键盘

```vue
<template>
  <view class="demo">
    <text>车牌号码：{{ value }}</text>
    <wd-button type="primary" @click="visible = true">显示车牌键盘</wd-button>
    <wd-keyboard
      v-model:visible="visible"
      v-model="value"
      title="车牌键盘"
      mode="car"
      auto-switch-lang
      maxlength="7"
      delete-text="删除"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')
</script>
```

## 样式定制指南

### customStyle 和 customClass

wd-keyboard 组件支持通过 `customStyle` 和 `customClass` 进行样式定制。

```vue
<template>
  <wd-keyboard
    v-model:visible="visible"
    v-model="value"
    title="自定义样式键盘"
    :custom-style="{ backgroundColor: '#f5f5f5', borderRadius: '10px 10px 0 0' }"
    custom-class="custom-keyboard"
  />
</template>

<style scoped>
.custom-keyboard {
  /* 自定义类名样式 */
  border: 1px solid #e4e7ed;
}

/* 可以通过深度选择器修改键盘内部样式 */
:deep(.wd-keyboard__title) {
  color: #303133;
  font-size: 16px;
}

:deep(.wd-key) {
  background-color: #ffffff;
  color: #303133;
  border: 1px solid #e4e7ed;
}
</style>
```

## 注意事项

1. **键盘模式选择**：
   - `default` 模式：适合普通数字输入场景
   - `custom` 模式：适合需要自定义额外按键的场景
   - `car` 模式：专门用于车牌号码输入

2. **随机按键顺序**：
   - 开启 `random-key-order` 属性可以增强安全性，适合密码输入场景
   - 但会降低用户输入效率，不建议在普通输入场景中使用

3. **车牌键盘自动切换语言**：
   - 开启 `autoSwitchLang` 属性后，输入第一位（省份）后会自动切换到英文
   - 清空输入值后会自动切换回中文

4. **性能优化建议**：
   - 避免频繁切换键盘可见性
   - 合理设置 `maxlength` 属性，避免输入过长内容
   - 在不需要时关闭 `random-key-order` 属性

5. **使用限制**：
   - 组件依赖于 UniApp 环境，无法在纯 Vue 项目中直接使用
   - 部分功能（如 `root-portal`）可能在不同平台上表现不同，需要测试验证

6. **事件处理**：
   - 建议使用 `v-model` 双向绑定来处理输入值，而不是直接监听 `input` 事件
   - 可以通过监听 `close` 事件来处理键盘关闭后的逻辑
