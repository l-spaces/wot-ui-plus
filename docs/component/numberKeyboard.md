# wd-number-keyboard

## 组件概述

### 组件类型

其他组件

### 功能描述

wd-number-keyboard组件，用于number-keyboard相关功能。

### 适用场景

适用于number-keyboard相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| visible | boolean | false | 否 | 是否可见 |
| modelValue | string | '' | 否 | 绑定的值 |
| title | string | '' | 否 | 标题 |
| mode | string | '' | 否 | 键盘模式 |
| zIndex | number | 100 | 否 | 层级 |
| maxlength | number | Infinity | 否 | 最大长度 |
| showDeleteKey | boolean | true | 否 | 是否显示删除键 |
| randomKeyOrder | boolean | false | 否 | 是否随机键盘按键顺序 |
| closeText | string | '' | 否 | 确认按钮文本 |
| deleteText | string | '' | 否 | 删除按钮文本 |
| closeButtonLoading | boolean | false | 否 | 关闭按钮是否显示加载状态 |
| modal | boolean | false | 否 | 是否显示蒙层 |
| hideOnClickOutside | boolean | true | 否 | 是否在点击外部时收起键盘 |
| lockScroll | boolean | true | 否 | 是否锁定滚动 |
| safeAreaInsetBottom | boolean | true | 否 | 是否在底部安全区域内 |
| extraKey | string | Array<string | undefined | 否 | 额外按键 |
| H5 | unknown | undefined | 否 |  |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| input | 组件特定条件下触发 | event: Event |
| close | 组件特定条件下触发 | event: Event |
| delete | 组件特定条件下触发 | event: Event |

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
  <wd-number-keyboard />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-number-keyboard custom-class="my-custom-class" />
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
  <wd-number-keyboard @input="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

