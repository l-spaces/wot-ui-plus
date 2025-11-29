# wd-table-col

## 组件概述

### 组件类型

布局组件

### 功能描述

wd-table-col组件，用于table-col相关功能。

### 适用场景

适用于table-col相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| prop | string | '' | 是 | 列对应字段 |
| label | string | '' | 是 | 列对应字段标题 |
| width | unknown | undefined | 否 | 列宽度，单位px |
| sortable | boolean | false | 否 | 是否开启列排序 |
| fixed | boolean | false | 否 | 是否固定本列 |

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

## 多场景使用示例代码

### 示例1：基础用法

```vue
<template>
  <wd-table-col />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-table-col custom-class="my-custom-class" />
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
  <wd-table-col @click="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

