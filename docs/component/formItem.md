# wd-form-item

## 组件概述

### 组件类型

其他组件

### 功能描述

wd-form-item组件，用于form-item相关功能。

### 适用场景

适用于form-item相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| prop | string | '' | 是 | 表单域模型字段名 |
| rules | array | [] | 否 | 表单域校验规则 |
| required | boolean | false | 否 | 是否必填 |
| center | boolean | false | 否 | 是否居中对齐 |
| label | string | '' | 否 | 标签文本 |
| labelWidth | string | 100px | 否 | 标签宽度 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|

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
  <wd-form-item />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-form-item custom-class="my-custom-class" />
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
  <wd-form-item @click="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

