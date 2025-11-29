# wd-calendar-view

## 组件概述

### 功能描述
wd-calendar-view 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台日历视图组件，支持多种日期选择类型，包括单日期、多日期、日期范围、时间范围、周选择、月选择等，提供了丰富的配置选项和灵活的自定义能力。

### 适用业务场景
- 日历选择器的核心视图组件
- 事件日程展示
- 酒店/机票预订的日期选择
- 数据统计的时间范围筛选
- 周/月选择场景

### UI 系统定位
作为 UI 组件库中的核心日历视图组件，wd-calendar-view 提供了标准化的日历视图解决方案，被 wd-calendar 组件内部使用，也可单独使用构建自定义日历应用。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式，可以是字符串形式的内联样式 |
| customClass | string | '' | 否 | 自定义根节点样式类，可以是一个或多个 CSS 类名 |
| modelValue | number/array/null | - | 是 | 选中值，为 13 位时间戳或时间戳数组 |
| type | CalendarType | 'date' | 否 | 日期类型，可选值：date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange |
| minDate | number | 当前日期前12个月 | 否 | 最小日期，为 13 位时间戳 |
| maxDate | number | 当前日期后12个月 | 否 | 最大日期，为 13 位时间戳 |
| firstDayOfWeek | number | 1 | 否 | 周起始天，0 表示周日，1 表示周一 |
| formatter | function | - | 否 | 日期格式化函数，用于自定义日期项的显示和样式 |
| maxRange | number | - | 否 | type 为范围选择时有效，最大日期范围 |
| rangePrompt | string | - | 否 | type 为范围选择时有效，选择超出最大日期范围时的错误提示文案 |
| allowSameDay | boolean | false | 否 | type 为范围选择时有效，是否允许选择同一天 |
| showPanelTitle | boolean | true | 否 | 是否展示面板标题 |
| defaultTime | string/array | '00:00:00' | 否 | 选中日期的具体时刻，为字符串或字符串数组 |
| panelHeight | number | 378 | 否 | 可滚动面板的高度 |
| timeFilter | function | - | 否 | 时间选择器过滤器，用于过滤时间选择器的可选数据 |
| hideSecond | boolean | false | 否 | 是否隐藏秒修改，仅在 datetime 类型时有效 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发 picker-view 的 change 事件 |
| showLunar | boolean | true | 否 | 是否显示农历 |
| showMark | boolean | true | 否 | 是否显示月份背景 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 日期选择变化时触发 | value: 选中的日期值 |
| update:modelValue | 选中值变化时触发 | value: 选中的日期值 |
| pickstart | 开始选择日期时触发 | - |
| pickend | 结束选择日期时触发 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| scrollIntoView | - | - | 使当前日期或者选中日期滚动到可视区域 |

### Slots

该组件未定义任何插槽。

## 多场景使用示例

### 1. 基础用法

```vue
<template>
  <view class="container">
    <wd-calendar-view v-model="date" type="date" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const date = ref<number | null>(Date.now());
</script>
```

**设计考量**：
- 展示了日历视图组件的基础用法，选择单个日期
- 使用默认配置，展示当前日期
- 支持双向绑定 v-model

### 2. 日期范围选择

```vue
<template>
  <view class="container">
    <wd-calendar-view v-model="dateRange" type="daterange" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from '@/uni_modules/wot-ui-plus/dayjs';

const today = Date.now();
const tomorrow = dayjs().add(1, 'day').valueOf();
const dateRange = ref<number[]>([today, tomorrow]);
</script>
```

**设计考量**：
- 展示了日期范围选择功能
- 使用 type="daterange" 指定范围选择类型
- 初始值设置为今天和明天

### 3. 时间范围选择

```vue
<template>
  <view class="container">
    <wd-calendar-view v-model="timeRange" type="datetimerange" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from '@/uni_modules/wot-ui-plus/dayjs';

const now = Date.now();
const later = dayjs().add(2, 'hour').valueOf();
const timeRange = ref<number[]>([now, later]);
</script>
```

**设计考量**：
- 展示了时间范围选择功能
- 使用 type="datetimerange" 指定时间范围类型
- 初始值设置为当前时间和两小时后

### 4. 周选择

```vue
<template>
  <view class="container">
    <wd-calendar-view v-model="week" type="week" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const week = ref<number | null>(Date.now());
</script>
```

**设计考量**：
- 展示了周选择功能
- 使用 type="week" 指定周选择类型
- 显示当前周

### 5. 月选择

```vue
<template>
  <view class="container">
    <wd-calendar-view v-model="month" type="month" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const month = ref<number | null>(Date.now());
</script>
```

**设计考量**：
- 展示了月选择功能
- 使用 type="month" 指定月选择类型
- 显示当前月

## 样式定制指南

### 1. 使用 customStyle 和 customClass

```vue
<template>
  <view class="container">
    <wd-calendar-view
      v-model="date"
      type="date"
      custom-style="margin: 20rpx;"
      custom-class="my-calendar-view"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const date = ref<number | null>(Date.now());
</script>

<style scoped>
.my-calendar-view {
  background-color: #f5f5f5;
  border-radius: 8rpx;
  padding: 10rpx;
}
</style>
```

### 2. 自定义日期格式化

```vue
<template>
  <view class="container">
    <wd-calendar-view
      v-model="date"
      type="date"
      :formatter="formatter"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CalendarFormatter } from '@/uni_modules/wot-ui-plus/components/wd-calendar-view/types';

const date = ref<number | null>(Date.now());

const formatter: CalendarFormatter = (day) => {
  // 自定义日期格式化逻辑
  if (day.date === Date.now()) {
    day.topInfo = '今天';
    day.topColor = '#ff4d4f';
  }
  return day;
};
</script>
```

## 注意事项

### 1. 常见问题解决方案

- **问题**：日历视图不显示
  **解决方案**：检查组件是否正确引入，确保 modelValue 属性已设置

- **问题**：日期范围选择时无法选择同一天
  **解决方案**：设置 allowSameDay 属性为 true

- **问题**：自定义格式化函数不生效
  **解决方案**：确保 formatter 函数返回正确的 CalendarDayItem 对象

### 2. 性能优化建议

- 对于大量日期数据的场景，建议合理设置 minDate 和 maxDate，减少渲染的数据量
- 避免在 formatter 函数中执行复杂计算，影响渲染性能
- 对于频繁切换的场景，建议使用 v-show 而非 v-if 控制显示

### 3. 使用限制条件

- 组件必须在 UniApp 环境下使用
- modelValue 必须是 13 位时间戳或时间戳数组
- 自定义格式化函数必须返回 CalendarDayItem 类型
- 时间过滤器仅在 datetime 类型时有效

