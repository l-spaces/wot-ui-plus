# wd-grid-item

## 组件概述

### 组件类型

布局组件

### 功能描述

wd-grid-item组件，用于grid-item相关功能。

### 适用场景

适用于grid-item相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| customText | string | '' | 否 | GridItem 下方文字样式 |
| customIcon | string | '' | 否 | GridItem 上方 icon 样式 |
| icon | string | '' | 否 | 图标名称，可选值见 wd-icon 组件 |
| iconSize | string | 26px | 否 | 图标大小 |
| text | string | '' | 否 | 文字 |
| url | string | '' | 否 | 点击后跳转的链接地址 |
| linkType | string | '' | 否 | 页面跳转方式, 参考微信小程序路由文档，可选值：navigateTo / switchTab / reLaunch |
| isDot | boolean | false | 否 | 是否显示图标右上角小红点 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| itemclick | 组件特定条件下触发 | event: Event |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | scope | 默认插槽 |

## 多场景使用示例代码

### 示例1：基础用法

```vue
<template>
  <wd-grid-item />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-grid-item custom-class="my-custom-class" />
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
  <wd-grid-item @itemclick="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

