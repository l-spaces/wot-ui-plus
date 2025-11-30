# wd-calendar 日历选择器

## 组件概述

wd-calendar 是一个功能强大的日历选择器组件，支持多种日期选择模式，包括单日期、多日期、日期范围、日期时间、周、月等。该组件基于 uni-app 开发，支持多端适配，提供了丰富的配置选项和灵活的自定义能力，适用于各种需要日期选择的场景。

### 设计理念
- **多样化选择模式**：支持 9 种不同的日期选择类型，满足各种业务需求
- **高度可定制**：提供丰富的配置选项，支持自定义样式、格式化、快捷选项等
- **良好的用户体验**：流畅的动画效果、清晰的视觉层次、直观的操作方式
- **多端适配**：基于 uni-app 开发，支持 iOS/Android App、H5、主流小程序
- **表单集成**：支持与表单组件配合使用，提供表单验证功能

### 适用场景
- 日期选择：如生日、预约日期、活动日期等
- 日期范围选择：如入住/退房日期、开始/结束时间等
- 多日期选择：如选择多个活动日期、行程安排等
- 日期时间选择：如会议时间、航班时间等
- 周选择：如周报统计、周计划安排等
- 月选择：如月度报表、月度计划等
- 任何需要日期或时间选择的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| model-value | Number / Array / null | - | 是 | 选中值，为 13 位时间戳或时间戳数组 |
| type | String | date | 否 | 日期类型，可选值：date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange |
| min-date | Number | 当前时间前12个月 | 否 | 最小日期，为 13 位时间戳 |
| max-date | Number | 当前时间后12个月 | 否 | 最大日期，为 13 位时间戳 |
| first-day-of-week | Number | 0 | 否 | 周起始天，0 表示周日，1 表示周一，以此类推 |
| formatter | Function | - | 否 | 日期格式化函数，用于自定义日期的显示格式 |
| max-range | Number | - | 否 | type 为范围选择时有效，最大日期范围 |
| range-prompt | String | - | 否 | type 为范围选择时有效，选择超出最大日期范围时的错误提示文案 |
| allow-same-day | Boolean | false | 否 | type 为范围选择时有效，是否允许选择同一天 |
| default-time | String / Array | - | 否 | 选中日期所使用的当日内具体时刻，如 '12:00:00' |
| time-filter | Function | - | 否 | type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据 |
| hide-second | Boolean | false | 否 | type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改 |
| label | String | - | 否 | 选择器左侧文案 |
| label-width | String | 33% | 否 | 设置左侧标题宽度 |
| disabled | Boolean | false | 否 | 是否禁用选择器 |
| readonly | Boolean | false | 否 | 是否只读，只读状态下不可点击选择 |
| placeholder | String | - | 否 | 选择器占位符 |
| title | String | - | 否 | 弹出层标题 |
| align-right | Boolean | false | 否 | 选择器的值靠右展示 |
| error | Boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| required | Boolean | false | 否 | 是否必填，必填时左侧会显示必填标记 |
| size | String | - | 否 | 设置选择器大小，可选值：large |
| center | Boolean | false | 否 | 是否垂直居中 |
| close-on-click-modal | Boolean | true | 否 | 点击遮罩是否关闭选择器 |
| z-index | Number | 15 | 否 | 弹框层级，用于控制显示顺序 |
| show-confirm | Boolean | true | 否 | 是否显示确定按钮 |
| confirm-text | String | - | 否 | 确定按钮文字 |
| display-format | Function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| inner-display-format | Function | - | 否 | 自定义范围选择类型的面板内部回显，返回一个字符串 |
| ellipsis | Boolean | false | 否 | 是否超出隐藏，超出时显示省略号 |
| show-type-switch | Boolean | false | 否 | 是否显示类型切换功能，支持在日期、周、月之间切换 |
| shortcuts | Array | [] | 否 | 快捷选项，为对象数组，其中对象的 text 必传 |
| on-shortcuts-click | Function | - | 否 | 快捷操作点击回调，返回选中的时间戳或时间戳数组 |
| safe-area-inset-bottom | Boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| before-confirm | Function | - | 否 | 确定前校验函数，接收 { value, resolve } 参数，通过 resolve 继续执行，resolve 接收 1 个 boolean 参数 |
| prop | String | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | Array | [] | 否 | 表单验证规则，结合 wd-form 组件使用 |
| custom-view-class | String | '' | 否 | 自定义视图类，用于自定义日历视图的样式 |
| custom-label-class | String | '' | 否 | label 外部自定义样式，用于自定义左侧标题的样式 |
| custom-value-class | String | '' | 否 | value 外部自定义样式，用于自定义右侧值的样式 |
| immediate-change | Boolean | false | 否 | 是否在手指松开时立即触发 picker-view 的 change 事件 |
| with-cell | Boolean | true | 否 | 是否使用内置单元格，默认为 true，使用内置单元格 |
| root-portal | Boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 |
| marker-side | String | before | 否 | 必填标记位置，可选值：before、after |
| clearable | Boolean | false | 否 | 是否显示清空按钮，用于快速清除选中值 |
| custom-class | String | - | 否 | 根节点自定义类名 |
| custom-style | String / Object | - | 否 | 根节点自定义样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| open | 打开选择器时触发 | - |
| change | 选择器值变化时触发 | { value: 选中值，为 13 位时间戳或时间戳数组 } |
| confirm | 点击确定按钮时触发 | { value: 选中值，为 13 位时间戳或时间戳数组, type: 当前选择类型 } |
| cancel | 关闭选择器时触发 | - |
| clear | 点击清空按钮时触发 | - |
| update:modelValue | 选择器值变化时触发，用于 v-model 双向绑定 | 选中值，为 13 位时间戳或时间戳数组 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | - | - | 打开选择器 |
| close | - | - | 关闭选择器 |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义选择器的触发区域，不使用则显示默认的单元格样式 |
| label | - | 自定义左侧标题内容，用于替换默认的 label 文本 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <wd-calendar v-model="date" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始值为当前时间的时间戳
const date = ref<number>(Date.now())
</script>
```

### 日期范围选择
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="dateRange" 
      type="daterange" 
      placeholder="请选择日期范围" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始值为时间戳数组
const dateRange = ref<number[]>([])
</script>
```

### 多日期选择
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="dates" 
      type="dates" 
      placeholder="请选择多个日期" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始值为时间戳数组
const dates = ref<number[]>([])
</script>
```

### 日期时间选择
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="datetime" 
      type="datetime" 
      placeholder="请选择日期时间" 
      hide-second
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始值为当前时间的时间戳
const datetime = ref<number>(Date.now())
</script>
```

### 周选择
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="week" 
      type="week" 
      placeholder="请选择周" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始值为当前时间的时间戳
const week = ref<number>(Date.now())
</script>
```

### 月选择
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="month" 
      type="month" 
      placeholder="请选择月" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始值为当前时间的时间戳
const month = ref<number>(Date.now())
</script>
```

### 自定义快捷选项
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="dateRange" 
      type="daterange" 
      :shortcuts="shortcuts" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from '@/uni_modules/wot-ui-plus/dayjs'

const dateRange = ref<number[]>([])

// 定义快捷选项
const shortcuts = [
  {
    text: '近7天',
    onClick: () => {
      const end = dayjs().endOf('day').valueOf()
      const start = dayjs().subtract(6, 'day').startOf('day').valueOf()
      return [start, end]
    }
  },
  {
    text: '近30天',
    onClick: () => {
      const end = dayjs().endOf('day').valueOf()
      const start = dayjs().subtract(29, 'day').startOf('day').valueOf()
      return [start, end]
    }
  },
  {
    text: '本月',
    onClick: () => {
      const end = dayjs().endOf('month').endOf('day').valueOf()
      const start = dayjs().startOf('month').startOf('day').valueOf()
      return [start, end]
    }
  },
  {
    text: '上月',
    onClick: () => {
      const end = dayjs().subtract(1, 'month').endOf('month').endOf('day').valueOf()
      const start = dayjs().subtract(1, 'month').startOf('month').startOf('day').valueOf()
      return [start, end]
    }
  }
]
</script>
```

### 自定义显示格式
```vue
<template>
  <view class="container">
    <wd-calendar 
      v-model="date" 
      :display-format="displayFormat" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from '@/uni_modules/wot-ui-plus/dayjs'

const date = ref<number>(Date.now())

// 自定义显示格式
const displayFormat = (value: number, type: string) => {
  return dayjs(value).format('YYYY年MM月DD日')
}
</script>
```

### 表单验证
```vue
<template>
  <view class="container">
    <wd-form @submit="handleSubmit">
      <wd-calendar 
        v-model="date" 
        label="预约日期" 
        prop="appointmentDate" 
        :rules="[{ required: true, message: '请选择预约日期' }]" 
      />
      <wd-button type="primary" block @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref<number>(0)

const handleSubmit = () => {
  console.log('提交成功，预约日期：', date.value)
}
</script>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-calendar v-model="date" custom-class="my-calendar" />
</template>

<style scoped>
.my-calendar {
  /* 自定义样式 */
  margin: 20rpx 0;
}

.my-calendar .wd-calendar__cell {
  /* 自定义单元格样式 */
  background-color: #f5f7fa;
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-calendar 
    v-model="date" 
    :custom-style="{ margin: '20rpx 0' }" 
  />
</template>
```

### 自定义标签和值样式
通过 `custom-label-class` 和 `custom-value-class` 属性可以分别自定义标签和值的样式：

```vue
<template>
  <wd-calendar 
    v-model="date" 
    label="预约日期" 
    custom-label-class="my-label" 
    custom-value-class="my-value" 
  />
</template>

<style scoped>
.my-label {
  /* 自定义标签样式 */
  color: #409eff;
  font-weight: bold;
}

.my-value {
  /* 自定义值样式 */
  color: #606266;
  font-size: 28rpx;
}
</style>
```

### 自定义视图样式
通过 `custom-view-class` 属性可以自定义日历视图的样式：

```vue
<template>
  <wd-calendar 
    v-model="date" 
    custom-view-class="my-view" 
  />
</template>

<style scoped>
.my-view {
  /* 自定义视图样式 */
  background-color: #f5f7fa;
}
</style>
```

## 注意事项

1. **数据格式**：
   - `model-value` 属性支持 Number（单日期）、Array（多日期或日期范围）和 null 类型
   - 所有日期值均为 13 位时间戳，建议使用 dayjs 库进行日期处理
   - 范围选择时，`model-value` 为长度为 2 的数组，分别表示开始时间和结束时间

2. **类型选择**：
   - 支持 9 种不同的日期类型，根据实际需求选择合适的类型
   - 范围选择类型（如 daterange、datetimerange 等）的 `model-value` 为数组类型
   - 多日期选择类型（dates）的 `model-value` 为数组类型

3. **快捷选项**：
   - `shortcuts` 属性支持自定义快捷选项，方便用户快速选择常用日期范围
   - 每个快捷选项对象必须包含 `text` 属性和 `onClick` 方法
   - `onClick` 方法返回选中的时间戳或时间戳数组

4. **性能优化**：
   - 避免频繁更新 `model-value`，建议使用防抖或节流处理
   - 合理设置 `min-date` 和 `max-date`，减少日历渲染的月份数量
   - 当 `type` 为 `dates` 且需要选择大量日期时，建议限制最大选择数量

5. **表单集成**：
   - 与表单组件配合使用时，需要设置 `prop` 属性和 `rules` 属性
   - `prop` 属性为表单域 model 字段名，用于表单验证
   - `rules` 属性为表单验证规则，支持多种验证方式

6. **兼容性**：
   - 该组件基于 uni-app 开发，支持多端适配
   - 在不同平台上，日期选择器的渲染效果和交互方式可能存在差异
   - 建议在各平台上进行充分测试，确保良好的用户体验

7. **自定义内容**：
   - 使用默认插槽自定义触发区域时，需要注意添加点击事件，调用 `open` 方法打开选择器
   - 自定义内容时，组件的默认样式（如禁用状态、只读状态等）仍然生效

8. **国际化**：
   - 组件内置了国际化支持，可通过修改语言包进行多语言适配
   - 语言包位于 `src/uni_modules/wot-ui-plus/locale/lang/` 目录下

## 组件依赖

- 依赖 `wd-action-sheet` 组件，用于实现选择器的弹出层效果
- 依赖 `wd-calendar-view` 组件，用于实现日历视图的核心功能
- 依赖 `wd-cell` 组件，用于实现内置单元格样式
- 依赖 `wd-button` 组件，用于实现确定按钮
- 依赖 `wd-icon` 组件，用于显示图标
- 依赖 `wd-tabs` 组件，用于实现类型切换功能


## 常见问题

1. **Q：如何设置默认选中值？**
   A：通过 `model-value` 属性设置默认选中值，支持时间戳或时间戳数组。

2. **Q：如何限制可选日期范围？**
   A：通过 `min-date` 和 `max-date` 属性设置最小和最大可选日期。

3. **Q：如何自定义日期显示格式？**
   A：通过 `display-format` 属性设置自定义显示格式函数。

4. **Q：如何添加快捷选项？**
   A：通过 `shortcuts` 属性设置快捷选项数组，每个选项包含 `text` 和 `onClick` 属性。

5. **Q：如何与表单验证配合使用？**
   A：设置 `prop` 属性和 `rules` 属性，与 `wd-form` 组件配合使用。

6. **Q：如何自定义选择器的样式？**
   A：通过 `custom-class`、`custom-style`、`custom-label-class`、`custom-value-class` 等属性进行样式定制。

7. **Q：如何关闭秒选择？**
   A：当 `type` 为 `datetime` 或 `datetimerange` 时，设置 `hide-second` 属性为 `true`。

8. **Q：如何修改周起始天？**
   A：通过 `first-day-of-week` 属性设置，0 表示周日，1 表示周一，以此类推。