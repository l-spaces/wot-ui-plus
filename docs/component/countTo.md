# 数字滚动组件（wd-count-to）

## 组件概述

wd-count-to 是一个数字滚动动画组件，用于实现从起始值到结束值的平滑过渡动画效果。该组件支持自定义动画时长、缓动函数、数字格式等，可广泛应用于数据统计、倒计时、价格变化等场景，为用户提供生动直观的数据展示体验。

### 适用场景

- 数据统计页面的数字增长动画
- 倒计时功能（如活动倒计时、秒杀倒计时等）
- 价格变化动画（如商品价格调整、股票价格变动等）
- 进度展示（如任务完成进度、加载进度等）
- 任何需要数字平滑过渡效果的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| fontSize | number | 16 | 否 | 字体大小 |
| color | string | '' | 否 | 文本颜色 |
| type | string | 'default' | 否 | 主题类型，可选值：'default' / 'primary' / 'error' / 'warning' / 'success' |
| startVal | number | 0 | 否 | 起始值 |
| endVal | number | 2024 | 否 | 最终值 |
| duration | number | 3000 | 否 | 从起始值到结束值数字变动的时间，单位毫秒 |
| autoStart | boolean | true | 否 | 是否自动开始动画 |
| decimals | number | 0 | 否 | 保留的小数位数，必须大于等于 0 |
| decimal | string | '.' | 否 | 小数点符号 |
| separator | string | ',' | 否 | 三位数字的分隔符，用于千分位显示 |
| prefix | string | '' | 否 | 数字前缀，如货币符号 "¥" |
| suffix | string | '' | 否 | 数字后缀，如单位 "%" |
| useEasing | boolean | true | 否 | 是否使用缓动函数，开启后动画更流畅 |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| mounted | 组件挂载完成时触发 | 无 |
| finish | 数字滚动动画结束时触发 | 无 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| start | 无 | 无 | 开始数字滚动动画 |
| pause | 无 | 无 | 暂停数字滚动动画 |
| reset | 无 | 无 | 重置数字滚动动画，若 autoStart 为 true，重设后会自动开始动画 |

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| default | 无 | 默认插槽，用于自定义数字内容的显示方式 |
| prefix | 无 | 前缀插槽，用于自定义数字前缀的显示方式 |
| suffix | 无 | 后缀插槽，用于自定义数字后缀的显示方式 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-count-to :end-val="1000" />
</template>
```

### 自定义样式

```vue
<template>
  <wd-count-to
    :end-val="1000"
    :font-size="24"
    color="#1989fa"
    type="primary"
  />
</template>
```

### 带前缀后缀

```vue
<template>
  <wd-count-to
    :end-val="1234.56"
    :decimals="2"
    prefix="¥"
    suffix="元"
  />
</template>
```

### 自定义动画时长

```vue
<template>
  <wd-count-to
    :end-val="1000"
    :duration="5000"
  />
</template>
```

### 手动控制

```vue
<template>
  <view>
    <wd-count-to
      ref="countToRef"
      :end-val="1000"
      :auto-start="false"
    />
    <view class="btn-group">
      <wd-button @click="start">开始</wd-button>
      <wd-button @click="pause">暂停</wd-button>
      <wd-button @click="reset">重置</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CountToInstance } from '@/uni_modules/wot-ui-plus/components/wd-count-to/types'

const countToRef = ref<CountToInstance>()

const start = () => {
  countToRef.value?.start()
}

const pause = () => {
  countToRef.value?.pause()
}

const reset = () => {
  countToRef.value?.reset()
}
</script>
```

### 自定义数字格式

```vue
<template>
  <wd-count-to
    :end-val="1234567.89"
    :decimals="2"
    separator=","
    decimal="."
  />
</template>
```

### 使用插槽自定义内容

```vue
<template>
  <wd-count-to :end-val="100">
    <template #prefix>
      <view class="custom-prefix">当前值：</view>
    </template>
    <template #default>
      <view class="custom-number">{{ timeText }}</view>
    </template>
    <template #suffix>
      <view class="custom-suffix">%</view>
    </template>
  </wd-count-to>
</template>

<style scoped>
.custom-prefix {
  color: #909399;
  font-size: 14px;
}

.custom-number {
  color: #1989fa;
  font-size: 20px;
  font-weight: bold;
}

.custom-suffix {
  color: #909399;
  font-size: 14px;
}
</style>
```

## 样式定制

### 通过 customStyle 自定义样式

```vue
<template>
  <wd-count-to
    :end-val="1000"
    custom-style="margin: 10px; color: #67c23a; font-weight: bold;"
  />
</template>
```

### 通过 customClass 自定义样式

```vue
<template>
  <wd-count-to
    :end-val="1000"
    custom-class="custom-count-to"
  />
</template>

<style>
.custom-count-to {
  margin: 10px;
  color: #67c23a;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. **性能优化**：
   - 对于大量数字滚动场景，建议合理设置动画时长，避免过长的动画时间影响性能
   - 当需要频繁更新数字时，建议使用 `reset` 方法重置动画，而不是重新创建组件

2. **数据类型**：
   - `startVal` 和 `endVal` 必须为数字类型，否则会导致动画异常
   - `duration` 必须为正数，否则动画会立即完成

3. **跨平台兼容**：
   - 组件使用了 UniApp 的条件编译，确保在各平台上正常运行
   - 在小程序平台上，建议避免在同一页面使用过多的数字滚动组件，以免影响性能

4. **自定义插槽**：
   - 当使用自定义插槽时，默认的数字显示逻辑会被替换，需要自行处理数字的格式化和显示
   - 自定义插槽中的内容会继承组件的主题样式，可以通过 CSS 覆盖来自定义样式

5. **事件监听**：
   - `finish` 事件在动画完成后触发，可用于执行后续操作
   - `mounted` 事件在组件挂载完成后触发，可用于初始化数据或执行其他操作

6. **方法调用**：
   - 组件方法需要通过 `ref` 获取组件实例后调用
   - 调用 `reset` 方法后，组件会重置到初始状态，若 `autoStart` 为 `true`，会自动开始新的动画
