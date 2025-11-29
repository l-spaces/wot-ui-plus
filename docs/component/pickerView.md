# wd-picker-view

## 组件概述

### 组件类型

表单组件

### 功能描述

wd-picker-view组件，用于picker-view相关功能。

### 适用场景

适用于picker-view相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| loading | boolean | false | 否 | 加载状态 |
| loadingColor | string | #4D80F0 | 否 | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 |
| columnsHeight | number | 217 | 否 | picker内部滚筒高 |
| itemHeight | number | 35 | 否 | picker item的高度 |
| valueKey | string | value | 否 | 选项对象中，value对应的 key |
| labelKey | string | label | 否 | 选项对象中，展示的文本对应的 key |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。 |
| modelValue | 
      string | number | boolean | Array<number | undefined | 否 | 选中项，如果为多列选择器，则其类型应为数组 |
| default | unknown | undefined | 否 |  |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 组件特定条件下触发 | event: Event |
| pickstart | 组件特定条件下触发 | event: Event |
| pickend | 组件特定条件下触发 | event: Event |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|

## 多场景使用示例代码

### 示例1：基础用法

```vue
<template>
  <wd-picker-view />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-picker-view custom-class="my-custom-class" />
</template>

<style scoped>
.my-custom-class {
  /* 自定义样式 */
}
</style>
```

### 示例3：事件监听

```vue
<template>
  <wd-picker-view @change="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

