# CountDown 倒计时

## 组件概述

CountDown 是一个用于显示倒计时的组件，支持自定义格式、毫秒级精度和自动开始/暂停/重置功能。它可以用于各种需要倒计时的场景，如验证码倒计时、活动倒计时、秒杀倒计时等。

### 适用场景

- 手机验证码倒计时
- 活动开始/结束倒计时
- 秒杀活动倒计时
- 考试剩余时间显示
- 各种需要倒计时的场景

## API 参考

### Props

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| time | Number | - | 是 | 倒计时时长，单位毫秒 |
| millisecond | Boolean | false | 否 | 是否开启毫秒级精度 |
| format | String | HH:mm:ss | 否 | 时间格式化字符串，支持 DD: 天数, HH: 小时, mm: 分钟, ss: 秒, S: 毫秒(1位), SS: 毫秒(2位), SSS: 毫秒(3位) |
| auto-start | Boolean | true | 否 | 是否自动开始倒计时 |
| custom-style | String | - | 否 | 自定义根节点样式 |
| custom-class | String | - | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 倒计时变化时触发 | current: Object - 当前时间数据，包含 days, hours, minutes, seconds, milliseconds |
| finish | 倒计时结束时触发 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| start | - | - | 开始倒计时 |
| pause | - | - | 暂停倒计时 |
| reset | - | - | 重设倒计时，若 auto-start 为 true，重设后会自动开始倒计时 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | current: Object - 当前时间数据，包含 days, hours, minutes, seconds, milliseconds | 自定义倒计时内容，优先级高于默认文本显示 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down :time="30000" />
  </view>
</template>
```

### 自定义格式

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down :time="3600000" format="HH:mm:ss" />
  </view>
</template>
```

### 显示天数

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down :time="86400000" format="DD天HH小时mm分钟ss秒" />
  </view>
</template>
```

### 毫秒级精度

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down :time="10000" millisecond format="ss.SSS" />
  </view>
</template>
```

### 自定义内容

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down :time="30000" format="HH:mm:ss">
      <template #default="{ current }">
        <view class="custom-count-down">
          <view class="time-item">
            <text class="time-item__number">{{ current.hours }}</text>
            <text class="time-item__unit">时</text>
          </view>
          <text class="time-separator">:</text>
          <view class="time-item">
            <text class="time-item__number">{{ current.minutes }}</text>
            <text class="time-item__unit">分</text>
          </view>
          <text class="time-separator">:</text>
          <view class="time-item">
            <text class="time-item__number">{{ current.seconds }}</text>
            <text class="time-item__unit">秒</text>
          </view>
        </view>
      </template>
    </wd-count-down>
  </view>
</template>

<style scoped>
.custom-count-down {
  display: flex;
  align-items: center;
  font-size: 18px;
}

.time-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  background-color: #4d80f0;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}

.time-item__number {
  font-size: 24px;
  font-weight: bold;
}

.time-item__unit {
  font-size: 12px;
  margin-top: 2px;
}

.time-separator {
  font-size: 24px;
  font-weight: bold;
  color: #4d80f0;
}
</style>
```

### 手动控制

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down 
      ref="countDownRef" 
      :time="30000" 
      :auto-start="false" 
      @finish="handleFinish"
    />
    <view class="control-buttons">
      <wd-button type="primary" @click="start">开始</wd-button>
      <wd-button type="warning" @click="pause">暂停</wd-button>
      <wd-button type="success" @click="reset">重置</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const countDownRef = ref<any>(null)

// 开始倒计时
const start = () => {
  countDownRef.value.start()
}

// 暂停倒计时
const pause = () => {
  countDownRef.value.pause()
}

// 重置倒计时
const reset = () => {
  countDownRef.value.reset()
}

// 倒计时结束事件
const handleFinish = () => {
  console.log('倒计时结束')
}
</script>

<style scoped>
.control-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
```

### 动态更新时间

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down :time="time" />
    <wd-button type="primary" @click="updateTime">更新时间为60秒</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref(30000)

// 更新倒计时时间
const updateTime = () => {
  time.value = 60000
}
</script>
```

## 样式定制

### 自定义根节点样式

```vue
<template>
  <view class="count-down-demo">
    <wd-count-down 
      :time="30000" 
      custom-class="my-count-down" 
      custom-style="font-size: 24px; color: #ff6b6b; font-weight: bold;"
    />
  </view>
</template>

<style scoped>
.my-count-down {
  /* 自定义根节点样式 */
  padding: 10px;
  background-color: #fff5f5;
  border-radius: 8px;
  border: 1px solid #ffccc7;
}
</style>
```

## 注意事项

### 1. 时间单位

- `time` 属性的单位是毫秒
- 例如：1000 表示 1 秒，60000 表示 1 分钟，3600000 表示 1 小时

### 2. 自动开始

- 默认情况下，组件会自动开始倒计时
- 可以通过设置 `auto-start` 为 `false` 禁用自动开始
- 禁用自动开始后，需要手动调用 `start` 方法开始倒计时

### 3. 格式说明

- 支持的格式占位符：
  - `DD`：天数
  - `HH`：小时
  - `mm`：分钟
  - `ss`：秒
  - `S`：毫秒（1位）
  - `SS`：毫秒（2位）
  - `SSS`：毫秒（3位）
- 当格式中不包含 `DD` 时，天数会转换为小时
- 当格式中不包含 `HH` 时，小时会转换为分钟
- 当格式中不包含 `mm` 时，分钟会转换为秒
- 当格式中不包含 `ss` 时，秒会转换为毫秒

### 4. 事件触发

- `change` 事件在倒计时变化时触发，包含当前时间数据
- `finish` 事件在倒计时结束时触发
- 可以通过监听这些事件来实现自定义逻辑

### 5. 方法调用

- 可以通过 `ref` 获取组件实例，然后调用 `start`、`pause`、`reset` 方法
- `reset` 方法会重置倒计时，如果 `auto-start` 为 `true`，会自动开始

### 6. 性能优化

- 组件内部使用了高效的定时器实现
- 对于大量倒计时组件的场景，建议合理使用 `v-if` 或 `v-show`
- 避免在 `change` 事件中执行过于复杂的逻辑