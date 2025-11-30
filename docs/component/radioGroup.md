# wd-radio-group

## 组件概述

### 功能描述

wd-radio-group组件，用于radio-group相关功能。

### 适用场景

适用于radio-group相关场景。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| modelValue | string | '' | 否 | 会自动选中value对应的单选框 |
| shape | string | '' | 否 | 单选框形状，可选值为 dot / button / check，默认为 check |
| checkedColor | string | '' | 否 | 选中的颜色，默认为 #4D80F0 |
| disabled | boolean | false | 否 | 是否禁用，默认为 false |
| cell | boolean | false | 否 | 表单模式，默认为 false |
| size | string | '' | 否 | 设置大小，默认为空 |
| inline | boolean | false | 否 | 同行展示，默认为 false |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 组件特定条件下触发 | event: Event |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 默认插槽 |

## 多场景使用示例代码

### 示例1：基础用法

```vue
<template>
  <wd-radio-group />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-radio-group custom-class="my-custom-class" />
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
  <wd-radio-group @change="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

