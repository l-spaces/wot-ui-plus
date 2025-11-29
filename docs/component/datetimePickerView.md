# wd-datetime-picker-view

## 组件概述

### 组件类型

表单组件

### 功能描述

wd-datetime-picker-view组件，用于datetime-picker-view相关功能。

### 适用场景

适用于datetime-picker-view相关场景。

### 设计理念

采用现代化设计，支持主题定制，跨平台兼容。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
|------|------|--------|--------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| modelValue | [string, number] | undefined | 是 | 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳 |
| loading | boolean | false | 否 | 加载中 |
| loadingColor | string | #4D80F0 | 否 | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 |
| columnsHeight | number | 217 | 否 | picker内部滚筒高 |
| itemHeight | number | 35 | 否 | picker item的高度 |
| valueKey | string | value | 否 | 选项的key |
| labelKey | string | label | 否 | 选项的label |
| type | string | '' | 否 | 选择器类型，可选值：date / year-month / time |
| filter | DatetimePickerViewFilter | undefined | 否 | 自定义过滤选项的函数，返回列的选项数组 |
| formatter | DatetimePickerViewFormatter | undefined | 否 | 自定义弹出层选项文案的格式化函数，返回一个字符串 |
| columnFormatter | DatetimePickerViewColumnFormatter | undefined | 否 | 自定义列的格式化函数 |
| minDate | number | new Date(new Date( | 否 | 最小日期 |
| maxDate | number | new Date(new Date( | 否 | 最大日期 |
| minHour | number | 0 | 否 | 最小小时，time类型时生效 |
| maxHour | number | 23 | 否 | 最大小时，time类型时生效 |
| minMinute | number | 0 | 否 | 最小分钟，time类型时生效 |
| maxMinute | number | 59 | 否 | 最大分钟，time类型时生效 |
| useSecond | boolean | false | 否 | 是否显示秒选择，仅在 time 和 datetime 类型下生效 |
| minSecond | number | 0 | 否 | 最小秒数，仅在 time 和 datetime 类型下生效 |
| maxSecond | number | 59 | 否 | 最大秒数，仅在 time 和 datetime 类型下生效 |

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
  <wd-datetime-picker-view />
</template>
```

### 示例2：自定义样式

```vue
<template>
  <wd-datetime-picker-view custom-class="my-custom-class" />
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
  <wd-datetime-picker-view @change="handleEvent" />
</template>

<script setup>
const handleEvent = () => {
  // 事件处理逻辑
}
</script>
```

## 注意事项

1. 请根据实际使用场景调整组件属性；2. 建议参考组件文档使用；3. 跨平台使用时请注意兼容性问题。

