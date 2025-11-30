# wd-notify 通知组件

## 组件概述

wd-notify 是一个轻量级的通知组件，用于在页面顶部或底部显示简短的通知信息。该组件设计简洁，可根据需求自定义类型、样式、位置和时长，适用于各种需要向用户展示临时通知的场景。

### 功能特点
- 支持多种通知类型：primary、success、danger、warning
- 支持自定义颜色和背景
- 支持顶部和底部两种弹出位置
- 支持自定义显示时长
- 支持点击事件和关闭事件
- 支持根节点脱离，解决fixed定位失效问题
- 支持通过CSS变量定制主题
- 提供便捷的API调用方式

### 适用场景
- 操作结果提示（成功、失败、警告等）
- 系统通知和状态更新
- 表单验证结果提示
- 网络状态变化提示
- 临时消息展示

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| type | string | danger | 否 | 类型，可选值为 primary success danger warning |
| color | string |  | 否 | 字体颜色 |
| zIndex | number | 99 | 否 | 将组件的 z-index 层级设置为一个固定值 |
| visible | boolean | false | 否 | 是否显示 |
| message | string / number |  | 否 | 展示文案，支持通过\n换行 |
| selector | string |  | 否 | 指定唯一标识 |
| duration | number | 3000 | 否 | 展示时长(ms)，值为 0 时，notify 不会消失 |
| position | string | top | 否 | 弹出位置，可选值为 top bottom |
| safeHeight | number |  | 否 | 顶部安全高度 |
| background | string |  | 否 | 背景颜色 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击通知时触发 | event: MouseEvent |
| closed | 通知关闭时触发 | 无 |
| opened | 通知打开时触发 | 无 |
| update:visible | 通知显示状态变化时触发 | visible: boolean |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| showNotify | option: NotifyProps \| string | 无 | 显示通知，支持直接传入字符串作为message |
| closeNotify | 无 | 无 | 关闭通知 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义通知内容，替换默认的message文本 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <wd-button type="primary" @click="showNotify">显示通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

// 获取notify实例
const { showNotify } = useNotify()

// 显示通知
const showNotify = () => {
  showNotify('这是一条基础的通知信息')
}
</script>
```

### 2. 不同类型的通知

```vue
<template>
  <view>
    <wd-button type="primary" @click="showPrimary">主要通知</wd-button>
    <wd-button type="success" @click="showSuccess">成功通知</wd-button>
    <wd-button type="danger" @click="showDanger">危险通知</wd-button>
    <wd-button type="warning" @click="showWarning">警告通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

// 获取notify实例
const { showNotify } = useNotify()

// 显示主要通知
const showPrimary = () => {
  showNotify({
    type: 'primary',
    message: '这是一条主要通知'
  })
}

// 显示成功通知
const showSuccess = () => {
  showNotify({
    type: 'success',
    message: '操作成功'
  })
}

// 显示危险通知
const showDanger = () => {
  showNotify({
    type: 'danger',
    message: '操作失败，请重试'
  })
}

// 显示警告通知
const showWarning = () => {
  showNotify({
    type: 'warning',
    message: '请注意，这是一条警告信息'
  })
}
</script>
```

### 3. 自定义样式

```vue
<template>
  <view>
    <wd-button type="primary" @click="showCustomStyle">自定义样式</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

// 获取notify实例
const { showNotify } = useNotify()

// 显示自定义样式通知
const showCustomStyle = () => {
  showNotify({
    message: '这是一条自定义样式的通知',
    color: '#fff',
    background: '#4D80F0',
    duration: 5000
  })
}
</script>
```

### 4. 不同位置的通知

```vue
<template>
  <view>
    <wd-button type="primary" @click="showTop">顶部通知</wd-button>
    <wd-button type="primary" @click="showBottom">底部通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

// 获取notify实例
const { showNotify } = useNotify()

// 显示顶部通知
const showTop = () => {
  showNotify({
    message: '这是一条顶部通知',
    position: 'top'
  })
}

// 显示底部通知
const showBottom = () => {
  showNotify({
    message: '这是一条底部通知',
    position: 'bottom'
  })
}
</script>
```

### 5. 带点击事件的通知

```vue
<template>
  <view>
    <wd-button type="primary" @click="showClickable">带点击事件的通知</wd-button>
    <wd-notify @click="onNotifyClick" @closed="onNotifyClosed" />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

// 获取notify实例
const { showNotify } = useNotify()

// 显示带点击事件的通知
const showClickable = () => {
  showNotify({
    message: '点击通知查看详情',
    duration: 0 // 0表示不自动关闭
  })
}

// 通知点击事件
const onNotifyClick = (event: MouseEvent) => {
  console.log('点击了通知', event)
  // 执行点击后的操作
}

// 通知关闭事件
const onNotifyClosed = () => {
  console.log('通知已关闭')
}
</script>
```

## 样式定制指南

### 1. 通过Props定制

组件提供了多个Props用于自定义样式：

```vue
<wd-notify 
  type="success" 
  color="#fff" 
  background="#07c160" 
  message="自定义样式通知" 
/>
```

### 2. 通过CSS变量定制

组件支持通过CSS变量定制主题样式：

```vue
<template>
  <view class="custom-notify-container">
    <wd-button type="primary" @click="showNotify">自定义主题通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

const showNotify = () => {
  showNotify('这是一条自定义主题的通知')
}
</script>

<style scoped>
.custom-notify-container {
  /* 自定义通知主题变量 */
  --notify-padding: 16rpx 24rpx;
  --notify-font-size: 28rpx;
  --notify-danger-background: #ff4d4f;
  --notify-primary-background: #1890ff;
  --notify-success-background: #52c41a;
  --notify-warning-background: #faad14;
}
</style>
```

### 3. 自定义类名

可以通过自定义类名覆盖组件内部样式：

```vue
<template>
  <view>
    <wd-button type="primary" @click="showCustomClass">自定义类名通知</wd-button>
    <wd-notify ref="notifyRef" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const notifyRef = ref(null)
const { showNotify } = useNotify()

const showCustomClass = () => {
  showNotify({
    message: '自定义类名通知',
    // 注意：通过API调用时，无法直接传递customClass，需要通过其他方式实现
  })
}
</script>

<style>
/* 全局样式覆盖 */
.wd-notify {
  /* 自定义全局通知样式 */
  border-radius: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}
</style>
```

## 注意事项

### 1. 性能优化
- 避免频繁显示通知，影响用户体验
- 合理设置通知时长，避免通知长时间占用屏幕
- 当通知内容较长时，建议使用换行符\n进行换行

### 2. 事件处理
- 通知组件支持click、closed、opened等事件
- 可以通过Props或事件监听两种方式处理事件
- 自定义插槽中的点击事件需要注意事件冒泡

### 3. 跨端兼容
- 组件在不同平台上的表现可能略有差异，建议在各平台上进行测试
- 在小程序平台上，rootPortal属性可能需要特殊处理
- 安全高度(safeHeight)属性在不同设备上可能需要调整

### 4. 多实例管理
- 当页面中需要多个通知实例时，需要通过selector属性进行区分
- 每个实例拥有独立的状态和配置

### 5. 常见问题解决方案
- **问题**：通知显示位置不正确
  **解决方案**：检查position属性是否正确，调整safeHeight属性

- **问题**：通知无法关闭
  **解决方案**：检查duration属性是否为0，0表示不自动关闭

- **问题**：自定义样式不生效
  **解决方案**：检查样式优先级，尝试使用!important或更具体的选择器

- **问题**：通知被其他元素遮挡
  **解决方案**：调整zIndex属性，提高通知层级