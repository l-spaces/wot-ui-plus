# 日期选择条组件（wd-date-strip）

## 组件概述

wd-date-strip 是一个日期选择条组件，用于在日历中选择日期，支持周模式和平铺模式两种展示方式。该组件提供了丰富的配置选项，可自定义日期范围、样式、高亮模式等，适用于各种需要日期选择的场景，如酒店预订、航班查询、活动报名等。

### 适用场景

- 酒店预订页面的入住/离店日期选择
- 航班/火车票查询页面的出发/到达日期选择
- 活动报名页面的活动日期选择
- 数据统计页面的日期范围选择
- 任何需要日期选择的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number | 0 | 否 | 选中的值，时间戳格式 |
| defaultDate | string / number | '' | 否 | 默认选中的日期，支持时间戳或日期字符串 |
| mode | string | 'week' | 否 | 切换模式：none 平铺展示所有日期，不展示切换按钮；week 按周方式切换 |
| minDate | number | 0 | 否 | 可选择的最小日期，时间戳格式 |
| maxDate | number | 0 | 否 | 可选择的最大日期，时间戳格式 |
| height | string | '55px' | 否 | 插件高度 |
| itemWidth | string | '50px' | 否 | 每格日期宽度 |
| itemRound | string | '6px' | 否 | 每格日期圆角 |
| activeBgColor | string | '#3c9cff' | 否 | 选中框背景色 |
| activeColor | string | '#ffffff' | 否 | 选中框文本色 |
| activeStyle | object | {} | 否 | 选中框样式，自定义选中状态的样式 |
| bgColor | string | '' | 否 | 横条背景色 |
| round | string | '' | 否 | 选中框圆角 |
| firstDayOfWeek | number | 0 | 否 | 第一天从星期几开始，默认 0 = 周日 |
| activeMode | string | 'both' | 否 | 高亮模式：'both' 同时高亮星期和日期，'date' 只高亮日期，'text' 只高亮文本 |
| formatter | function / null | null | 否 | 日期格式化函数，用于自定义日期项的展示内容 |
| monthNum | number / string | 1 | 否 | 最多展示月份数量，用于计算默认的最小和最大日期范围 |
| disabledFun | function / null | null | 否 | 禁止选择的日期函数，返回布尔值或数组 [disabled, bottomInfo] |
| disabledDate | array / string / null | null | 否 | 禁止选择的日期，支持数组或字符串格式 |
| disabledColor | string | '#c8c9cc' | 否 | 禁用日期的文字颜色 |
| showLunar | boolean | false | 否 | 是否显示农历 |
| padZero | boolean | false | 否 | 是否对小于10的数字补0 |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:value | 选中值变化时触发 | value: number - 选中的日期时间戳 |
| change | 选中日期变化时触发 | data: object - 包含选中日期的详细信息，包括 weekday（星期）、date（日期）、timestamp（时间戳）、lunar（农历信息） |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| setFormatter | formatter: (value: any) => any | 无 | 设置日期格式化函数，用于自定义日期项的展示内容。在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用 |

### Slots

该组件不提供任何插槽。

## 使用示例

### 基础用法

```vue
<template>
  <wd-date-strip v-model="selectedDate" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
</script>
```

### 自定义日期范围

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :minDate="minDate"
    :maxDate="maxDate"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const selectedDate = ref(Date.now())
const minDate = ref(dayjs().subtract(30, 'day').valueOf()) // 30天前
const maxDate = ref(dayjs().add(30, 'day').valueOf()) // 30天后
</script>
```

### 平铺模式

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    mode="none"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
</script>
```

### 自定义样式

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :activeBgColor="'#67c23a'"
    :activeColor="'#ffffff'"
    :itemWidth="'60px'"
    :itemRound="'10px'"
    :height="'60px'"
    :bgColor="'#f5f7fa'"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
</script>
```

### 显示农历

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :showLunar="true"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
</script>
```

### 自定义高亮模式

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    activeMode="date"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
</script>
```

### 使用格式化函数

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :formatter="formatter"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())

// 自定义格式化函数
const formatter = (item: any) => {
  // 为周末添加特殊标记
  if (item.weekday === '六' || item.weekday === '日') {
    item.bottomInfo = '休'
  }
  return item
}
</script>
```

### 在微信小程序中使用格式化函数

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    ref="dateStripRef"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const selectedDate = ref(Date.now())
const dateStripRef = ref<ComponentPublicInstance>()

onMounted(() => {
  // 在微信小程序中，通过ref调用setFormatter方法
  dateStripRef.value?.setFormatter((item: any) => {
    // 为周末添加特殊标记
    if (item.weekday === '六' || item.weekday === '日') {
      item.bottomInfo = '休'
    }
    return item
  })
})
</script>
```

### 禁用特定日期

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :disabledDate="disabledDates"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const selectedDate = ref(Date.now())
// 禁用今天之后的所有日期
const disabledDates = ref([dayjs().add(1, 'day').valueOf()])
</script>
```

### 使用禁用函数

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :disabledFun="disabledFun"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const selectedDate = ref(Date.now())

// 自定义禁用函数
const disabledFun = (item: any) => {
  const date = dayjs(item.timestamp)
  // 禁用周末
  if (date.day() === 0 || date.day() === 6) {
    return [true, '休'] // 返回数组，第一个元素表示是否禁用，第二个元素表示底部显示的信息
  }
  return false
}
</script>
```

## 样式定制

### 通过 customStyle 自定义样式

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    custom-style="margin: 10px; padding: 5px; border-radius: 8px;"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
</script>
```

### 通过 customClass 自定义样式

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    custom-class="custom-date-strip"
  />
</template>

<style scoped>
.custom-date-strip {
  margin: 10px;
  padding: 5px;
  border-radius: 8px;
  background-color: #f5f7fa;
}
</style>
```

### 自定义选中样式

```vue
<template>
  <wd-date-strip
    v-model="selectedDate"
    :activeStyle="activeStyle"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedDate = ref(Date.now())
const activeStyle = ref({
  backgroundColor: '#67c23a',
  color: '#ffffff',
  fontWeight: 'bold',
  borderRadius: '10px'
})
</script>
```

## 注意事项

1. **性能优化**：
   - 当设置较大的日期范围时，建议使用周模式（mode="week"），以优化渲染性能
   - 避免频繁更新日期范围，尽量在初始化时设置好
   - 对于大量日期数据，建议使用分页或虚拟滚动优化

2. **日期格式**：
   - `modelValue` 和 `defaultDate` 支持时间戳或日期字符串格式
   - `minDate` 和 `maxDate` 仅支持时间戳格式
   - 建议使用 dayjs 处理日期，确保跨平台兼容性

3. **跨平台兼容性**：
   - 在微信小程序中，不支持将函数作为 props 参数，需通过 ref 调用 `setFormatter` 方法设置格式化函数
   - 不同平台的 swiper 和 scroll-view 组件可能存在差异，需注意测试

4. **样式定制**：
   - 组件提供了丰富的样式属性，可直接通过 props 自定义组件外观
   - 也可通过 `customStyle` 和 `customClass` 进行更灵活的样式定制
   - 建议使用主题变量，确保组件样式与项目主题保持一致

5. **事件监听**：
   - `update:value` 事件在选中值变化时触发，返回选中的日期时间戳
   - `change` 事件在选中日期变化时触发，返回包含选中日期详细信息的对象
   - 建议同时监听两个事件，以获取完整的选中日期信息

6. **方法调用**：
   - `setFormatter` 方法用于设置日期格式化函数，在微信小程序中需通过 ref 调用
   - 调用该方法后，组件会重新渲染日期列表

7. **禁用日期**：
   - 可通过 `disabledDate` 属性禁用特定日期，支持数组或字符串格式
   - 也可通过 `disabledFun` 函数自定义禁用逻辑，支持返回布尔值或数组
   - 禁用的日期会显示为灰色，不可点击

8. **农历显示**：
   - 设置 `showLunar` 为 `true` 可显示农历信息
   - 农历信息会显示在日期下方，字体大小较小
   - 支持自定义农历信息的样式

