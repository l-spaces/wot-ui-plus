# wd-divider

## 组件概述

### 组件类型

其他组件

### 功能描述

wd-divider组件，用于divider相关功能。

### 适用场景

适用于divider相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| color | string | '' | 否 | 自定义颜色 |
| contentPosition | string | '' | 否 | 内容位置，可选值为 `left` `right` `center`
   默认值：`center` |
| dashed | boolean | false | 否 | 是否显示为虚线
   默认值：`false` |
| vertical | boolean | false | 否 | 是否为垂直分割线
   默认值：`false` |

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
  <wd-divider />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-divider custom-class="my-custom-class" />
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
  <wd-divider @click="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

