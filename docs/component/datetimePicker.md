# 日期时间选择器组件（wd-datetime-picker）

## 组件概述

wd-datetime-picker 是一个日期时间选择器组件，用于在表单中选择日期、时间或日期时间范围。该组件基于 UniApp 开发，支持多平台使用，提供了丰富的配置选项，可自定义日期范围、样式、格式化等，适用于各种需要日期时间选择的场景。

### 适用场景

- 表单中的日期时间选择
- 酒店预订页面的入住/离店日期选择
- 航班/火车票查询页面的出发/到达日期时间选择
- 活动报名页面的活动日期时间选择
- 数据统计页面的日期时间范围选择
- 任何需要日期时间选择的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| label | string | - | 否 | 选择器左侧文案 |
| placeholder | string | - | 否 | 选择器占位符 |
| disabled | boolean | false | 否 | 是否禁用 |
| readonly | boolean | false | 否 | 是否只读 |
| loading | boolean | false | 否 | 是否加载中 |
| loadingColor | string | '#4D80F0' | 否 | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 |
| title | string | - | 否 | 弹出层标题 |
| cancelButtonText | string | - | 否 | 取消按钮文案 |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| required | boolean | false | 否 | 是否必填 |
| size | string | - | 否 | 设置选择器大小，可选值：large |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| error | boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| alignRight | boolean | false | 否 | 选择器的值靠右展示 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| ellipsis | boolean | false | 否 | 是否超出隐藏 |
| columnsHeight | number | 217 | 否 | picker内部滚筒高 |
| valueKey | string | 'value' | 否 | 选项的key |
| labelKey | string | 'label' | 否 | 选项的label |
| modelValue | string / number / array | - | 是 | 选中项，当 type 为 time 时，类型为字符串；当 type 为 Array 时，类型为范围选择；否则为时间戳 |
| type | string | 'datetime' | 否 | 选择器类型，可选值为：date / year-month / time / datetime |
| minDate | number | 当前年份-10年 | 否 | 最小日期，时间戳格式 |
| maxDate | number | 当前年份+10年 | 否 | 最大日期，时间戳格式 |
| minHour | number | 0 | 否 | 最小小时，time类型时生效 |
| maxHour | number | 23 | 否 | 最大小时，time类型时生效 |
| minMinute | number | 0 | 否 | 最小分钟，time类型时生效 |
| maxMinute | number | 59 | 否 | 最大分钟，time类型时生效 |
| useSecond | boolean | false | 否 | 是否启用秒选择，仅在 time 和 datetime 类型下生效 |
| minSecond | number | 0 | 否 | 最小秒数，仅在 time 和 datetime 类型下生效 |
| maxSecond | number | 59 | 否 | 最大秒数，仅在 time 和 datetime 类型下生效 |
| filter | function | - | 否 | 自定义过滤选项的函数，返回列的选项数组 |
| formatter | function | - | 否 | 自定义弹出层选项文案的格式化函数，返回一个字符串 |
| displayFormat | function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 |
| displayFormatTabLabel | function | - | 否 | 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串 |
| defaultValue | string / number / array | - | 否 | 默认日期，类型保持与 value 一致，打开面板时面板自动选到默认日期 |
| zIndex | number | 15 | 否 | 弹窗层级 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| customCellClass | string | '' | 否 | picker cell 外部自定义样式 |
| customViewClass | string | '' | 否 | pickerView 外部自定义样式 |
| customLabelClass | string | '' | 否 | label 外部自定义样式 |
| customValueClass | string | '' | 否 | value 外部自定义样式 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| clearable | boolean | false | 否 | 显示清空按钮 |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before、after |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 选中值变化时触发 | value: 选中的值 |
| open | 打开选择器时触发 | 无 |
| toggle | 切换选择器面板时触发 | value: 当前面板的值 |
| cancel | 取消选择时触发 | 无 |
| confirm | 确认选择时触发 | value: 选中的值 |
| clear | 点击清空按钮时触发 | 无 |
| update:modelValue | 选中值变化时触发 | value: 选中的值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | 无 | 无 | 打开picker弹框 |
| close | 无 | 无 | 关闭picker弹框 |
| setLoading | loading: boolean | 无 | 设置加载状态 |

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| label | 无 | 自定义左侧标题内容 |
| default | 无 | 自定义选择器内容，用于完全自定义选择器的外观 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-datetime-picker v-model="datetime" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref(Date.now())
</script>
```

### 自定义选择类型

```vue
<template>
  <view class="demo-container">
    <wd-datetime-picker
      v-model="date"
      type="date"
      placeholder="选择日期"
    />
    <wd-datetime-picker
      v-model="time"
      type="time"
      placeholder="选择时间"
    />
    <wd-datetime-picker
      v-model="yearMonth"
      type="year-month"
      placeholder="选择年月"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref(Date.now())
const time = ref('12:00')
const yearMonth = ref(Date.now())
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
</style>
```

### 日期时间范围选择

```vue
<template>
  <wd-datetime-picker
    v-model="dateRange"
    type="datetime"
    placeholder="选择日期时间范围"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dateRange = ref([Date.now(), Date.now() + 86400000])
</script>
```

### 自定义日期范围

```vue
<template>
  <wd-datetime-picker
    v-model="datetime"
    :minDate="minDate"
    :maxDate="maxDate"
    placeholder="选择日期时间"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const datetime = ref(Date.now())
const minDate = ref(dayjs().subtract(30, 'day').valueOf()) // 30天前
const maxDate = ref(dayjs().add(30, 'day').valueOf()) // 30天后
</script>
```

### 自定义格式化

```vue
<template>
  <wd-datetime-picker
    v-model="datetime"
    :formatter="formatter"
    :displayFormat="displayFormat"
    placeholder="选择日期时间"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref(Date.now())

// 自定义弹出层选项文案格式化函数
const formatter = (type: string, value: string) => {
  switch (type) {
    case 'year':
      return `${value}年`
    case 'month':
      return `${value}月`
    case 'date':
      return `${value}日`
    case 'hour':
      return `${value}时`
    case 'minute':
      return `${value}分`
    case 'second':
      return `${value}秒`
    default:
      return value
  }
}

// 自定义展示文案格式化函数
const displayFormat = (items: any[]) => {
  return `${items[0].label}${items[1].label}${items[2].label} ${items[3].label}${items[4].label}`
}
</script>
```

### 表单集成

```vue
<template>
  <wd-form @submit="onSubmit" @failed="onFailed">
    <wd-datetime-picker
      v-model="form.datetime"
      label="日期时间"
      placeholder="请选择日期时间"
      prop="datetime"
      :rules="[{ required: true, message: '请选择日期时间' }]"
    />
    <view class="form-actions">
      <wd-button type="primary" native-type="submit">提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const form = ref({
  datetime: ''
})

const onSubmit = () => {
  console.log('表单提交成功', form.value)
}

const onFailed = () => {
  console.log('表单提交失败')
}
</script>

<style scoped>
.form-actions {
  padding: 20px;
  text-align: center;
}
</style>
```

### 使用清除按钮

```vue
<template>
  <wd-datetime-picker
    v-model="datetime"
    clearable
    placeholder="选择日期时间"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref(Date.now())
</script>
```

## 样式定制

### 通过 customStyle 自定义样式

```vue
<template>
  <wd-datetime-picker
    v-model="datetime"
    custom-style="margin: 10px; padding: 5px; border-radius: 8px;"
    placeholder="选择日期时间"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref(Date.now())
</script>
```

### 通过 customClass 自定义样式

```vue
<template>
  <wd-datetime-picker
    v-model="datetime"
    custom-class="custom-datetime-picker"
    placeholder="选择日期时间"
  />
</template>

<style scoped>
.custom-datetime-picker {
  margin: 10px;
  padding: 5px;
  border-radius: 8px;
  background-color: #f5f7fa;
}
</style>
```

### 自定义标签和值的样式

```vue
<template>
  <wd-datetime-picker
    v-model="datetime"
    label="日期时间"
    customLabelClass="custom-label"
    customValueClass="custom-value"
    placeholder="选择日期时间"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref(Date.now())
</script>

<style scoped>
.custom-label {
  color: #67c23a;
  font-weight: bold;
}

.custom-value {
  color: #f56c6c;
}
</style>
```

## 注意事项

1. **性能优化**：
   - 当设置较大的日期范围时，建议合理设置 minDate 和 maxDate，以优化渲染性能
   - 避免频繁更新日期范围，尽量在初始化时设置好

2. **日期格式**：
   - `modelValue` 支持时间戳、字符串（仅 time 类型）和数组（范围选择）三种格式
   - `minDate` 和 `maxDate` 仅支持时间戳格式
   - 建议使用 dayjs 处理日期，确保跨平台兼容性

3. **跨平台兼容性**：
   - 在微信小程序中，不支持将函数作为 props 参数，需通过其他方式实现自定义逻辑
   - 不同平台的 picker-view 组件可能存在差异，需注意测试

4. **样式定制**：
   - 组件提供了丰富的样式属性，可直接通过 props 自定义组件外观
   - 也可通过 `customStyle` 和 `customClass` 进行更灵活的样式定制
   - 建议使用主题变量，确保组件样式与项目主题保持一致

5. **事件监听**：
   - `change` 事件在选中值变化时触发，返回选中的值
   - `confirm` 事件在确认选择时触发，返回选中的值
   - `update:modelValue` 事件在选中值变化时触发，用于 v-model 双向绑定
   - 建议同时监听 `confirm` 和 `update:modelValue` 事件，以获取完整的选择信息

6. **方法调用**：
   - `open` 方法用于打开选择器弹框
   - `close` 方法用于关闭选择器弹框
   - `setLoading` 方法用于设置加载状态
   - 方法调用需通过 ref 获取组件实例后调用

7. **表单集成**：
   - 组件支持与 wd-form 组件集成，可进行表单验证
   - 集成时需设置 `prop` 属性和 `rules` 属性

8. **范围选择**：
   - 当 `modelValue` 为数组时，组件进入范围选择模式
   - 范围选择模式下，支持自定义展示 tab 标签文案

9. **清除按钮**：
   - 设置 `clearable` 为 `true` 可显示清除按钮
   - 点击清除按钮会触发 `clear` 事件

10. **国际化**：
    - 组件支持国际化，可通过 `translate` 函数自定义文案
    - 支持自定义占位符、取消按钮文案、确认按钮文案等