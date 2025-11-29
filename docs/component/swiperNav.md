# wd-swiper-nav

## 组件概述

### 组件类型

导航组件

### 功能描述

wd-swiper-nav组件，用于swiper-nav相关功能。

### 适用场景

适用于swiper-nav相关场景。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

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

## 多场景使用示例代码

### 示例1：基础用法

```vue
<template>
  <wd-swiper-nav />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-swiper-nav custom-class="my-custom-class" />
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
  <wd-swiper-nav @change="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

