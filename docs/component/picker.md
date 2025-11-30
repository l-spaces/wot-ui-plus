# wd-picker 选择器组件

## 组件概述

wd-picker 是一个功能强大的跨平台选择器组件，支持单列选择、多列选择和联动选择，适用于日期选择、地区选择、分类选择等多种场景。组件基于 Vue 3 + TypeScript + UniApp 开发，提供了丰富的配置选项和灵活的自定义能力，能够满足各种复杂的选择需求。

### 功能特点

- 支持单列、多列和联动选择
- 提供丰富的自定义配置选项
- 支持自定义展示格式
- 支持加载状态和错误状态
- 支持表单验证
- 支持清除功能
- 支持底部安全区域适配
- 支持多种尺寸和对齐方式
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 日期/时间选择
- 地区选择
- 分类选择
- 性别选择
- 年龄选择
- 其他需要从预设选项中选择的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customLabelClass | string | '' | 否 | label 外部自定义样式 |
| customValueClass | string | '' | 否 | value 外部自定义样式 |
| customViewClass | string | '' | 否 | pickerView 外部自定义样式 |
| label | string | - | 否 | 选择器左侧文案 |
| placeholder | string | - | 否 | 选择器占位符 |
| disabled | boolean | false | 否 | 是否禁用 |
| readonly | boolean | false | 否 | 是否只读 |
| loading | boolean | false | 否 | 加载中 |
| loadingColor | string | '#4D80F0' | 否 | 加载中颜色 |
| title | string | - | 否 | 弹出层标题 |
| cancelButtonText | string | - | 否 | 取消按钮文案 |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| required | boolean | false | 否 | 是否必填 |
| size | string | - | 否 | 尺寸 |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| useDefaultSlot | boolean | false | 否 | 使用默认插槽（已废弃） |
| useLabelSlot | boolean | false | 否 | 使用标签插槽（已废弃） |
| error | boolean | false | 否 | 错误状态 |
| alignRight | boolean | false | 否 | 右对齐 |
| beforeConfirm | Function | - | 否 | 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 |
| closeOnClickModal | boolean | true | 否 | 点击蒙层关闭 |
| safeAreaInsetBottom | boolean | true | 否 | 底部安全区域内 |
| ellipsis | boolean | false | 否 | 文本溢出显示省略号 |
| columnsHeight | number | 217 | 否 | 选项总高度 |
| valueKey | string | 'value' | 否 | 选项值对应的键名 |
| labelKey | string | 'label' | 否 | 选项文本对应的键名 |
| modelValue | string \| number \| Array<string> \| Array<number> | '' | 否 | 选中项，如果为多列选择器，则其类型应为数组 |
| columns | Array<string \| number \| ColumnItem \| Array<string \| number \| ColumnItem>> | [] | 否 | 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器 |
| columnChange | Function | - | 否 | 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 setColumnData 方法修改其他列的数据源 |
| displayFormat | Function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| zIndex | number | 15 | 否 | 自定义层级 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | Array<FormItemRule> | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| clearable | boolean | false | 否 | 显示清空按钮 |
| markerSide | 'before' \| 'after' | 'before' | 否 | 必填标记位置，可选值：before、after |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| confirm | 点击确认按钮或通过 beforeConfirm 校验后 | { value: 选中值, selectedItems: 选中项对象 } |
| open | 打开选择器弹窗时 | - |
| cancel | 点击取消按钮或点击蒙层关闭弹窗时 | - |
| clear | 点击清空按钮时 | - |
| update:modelValue | 选择值发生变化时 | 选中值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | - | - | 打开选择器弹窗 |
| close | - | - | 关闭选择器弹窗 |
| setLoading | loading: boolean | - | 设置加载状态 |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 自定义选择器内容，不使用默认的 cell 样式 |
| label | - | 自定义选择器左侧标签内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="性别"
      :columns="columns"
      placeholder="请选择性别"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = ['男', '女', '保密']

const onConfirm = ({ value, selectedItems }) => {
  console.log('选择结果：', value, selectedItems)
}
</script>
```

### 2. 对象数组数据源

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="水果"
      :columns="columns"
      placeholder="请选择水果"
      value-key="id"
      label-key="name"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = [
  { id: '1', name: '苹果' },
  { id: '2', name: '香蕉' },
  { id: '3', name: '橙子' },
  { id: '4', name: '草莓' }
]
</script>
```

### 3. 多列选择器

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="时间"
      :columns="columns"
      placeholder="请选择时间"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['', ''])

// 生成小时和分钟数据
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

const columns = [hours, minutes]
</script>
```

### 4. 联动选择器

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="地区"
      :columns="columns"
      :column-change="handleColumnChange"
      placeholder="请选择地区"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['', ''])

// 省份数据
const provinces = ['北京市', '上海市', '广东省']

// 城市数据，根据省份索引获取
const cities = {
  0: ['北京市'],
  1: ['上海市'],
  2: ['广州市', '深圳市', '东莞市', '佛山市']
}

const columns = ref([provinces, cities[0]])

const handleColumnChange = (pickerView, selectedItems, columnIndex, resolve) => {
  // 根据省份索引更新城市列表
  const provinceIndex = selectedItems[columnIndex]
  pickerView.setColumnData(1, cities[provinceIndex])
  resolve()
}
</script>
```

### 5. 自定义展示格式

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="时间"
      :columns="columns"
      :display-format="displayFormat"
      placeholder="请选择时间"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['', ''])

// 生成小时和分钟数据
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

const columns = [hours, minutes]

// 自定义展示格式，将 "12,30" 格式化为 "12:30"
const displayFormat = (items, { valueKey, labelKey }) => {
  if (Array.isArray(items)) {
    return items.map(item => item[labelKey]).join(':')
  }
  return items[labelKey]
}
</script>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="自定义样式"
      :columns="columns"
      custom-class="custom-picker"
      :custom-style="{ color: '#4D80F0', fontSize: '16px' }"
    />
  </view>
</template>

<style lang="scss">
.custom-picker {
  // 自定义类样式
  .wd-picker__cell {
    background-color: #f5f7fa;
  }
}
</style>
```

### 2. 自定义标签和值的样式

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="自定义标签和值样式"
      :columns="columns"
      custom-label-class="custom-label"
      custom-value-class="custom-value"
    />
  </view>
</template>

<style lang="scss">
.custom-label {
  color: #ff6b6b;
  font-weight: bold;
}

.custom-value {
  color: #4ecdc4;
  font-style: italic;
}
</style>
```

### 3. 自定义弹窗样式

```vue
<template>
  <view class="demo">
    <wd-picker
      v-model="value"
      label="自定义弹窗"
      :columns="columns"
      custom-view-class="custom-picker-view"
      title="自定义标题"
      cancel-button-text="取消"
      confirm-button-text="确定"
    />
  </view>
</template>

<style lang="scss">
.custom-picker-view {
  // 自定义 pickerView 样式
  background-color: #f0f2f5;
}
</style>
```

## 注意事项

1. **数据格式要求**：
   - 单列选择器：columns 可以是字符串数组或对象数组
   - 多列选择器：columns 必须是二维数组
   - 联动选择器：需要通过 columnChange 事件动态更新列数据

2. **值类型注意**：
   - 单列选择器：modelValue 类型为 string 或 number
   - 多列选择器：modelValue 类型必须为数组

3. **性能优化**：
   - 当 columns 数据量较大时，建议使用分页加载或虚拟滚动
   - 避免在 columnChange 事件中执行复杂的计算逻辑

4. **跨平台兼容**：
   - immediateChange 属性仅支持微信小程序和支付宝小程序
   - rootPortal 属性在不同平台有不同的实现方式，用于解决 fixed 定位问题

5. **表单验证**：
   - 结合 wd-form 组件使用时，需要设置 prop 属性
   - rules 属性用于配置表单验证规则

6. **废弃属性**：
   - useDefaultSlot 和 useLabelSlot 属性已废弃，直接使用插槽即可

7. **加载状态**：
   - 可以通过 loading 属性或 setLoading 方法设置加载状态
   - 加载状态下，确认按钮不可点击

8. **清空功能**：
   - 只有设置了 clearable 属性为 true 时，才会显示清空按钮
   - 清空按钮仅在有选中值时显示
