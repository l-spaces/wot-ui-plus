# wd-slider-button 滑动解锁组件

## 组件概述

滑动解锁组件是一种交互式控件，用于验证用户的真实操作，防止自动化脚本攻击。它通过拖动滑块到指定位置来完成验证，提供了直观的视觉反馈和流畅的动画效果。

### 功能特点
- 支持自定义按钮文字、尺寸、颜色和圆角
- 提供完整的拖拽事件回调
- 支持自动重置功能
- 支持自定义滑块和文字内容
- 提供成功、重置等状态反馈
- 支持禁用状态
- 适配移动端和桌面端

### 适用场景
- 用户登录验证
- 表单提交前验证
- 内容访问权限验证
- 防止恶意请求
- 人机交互验证

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| text | string | '滑动解锁' | 否 | 按钮文字 |
| width | string \| number | '' | 否 | 按钮宽度 |
| height | string \| number | 45 | 否 | 按钮高度 |
| round | string \| number | 100 | 否 | 圆角 |
| bgColor | string | '#e0e0e0' | 否 | 背景颜色 |
| railColor | string | '#4d80f0' | 否 | 滑道背景颜色 |
| railIndex | string \| number | '' | 否 | 滑道层级 |
| railRadius | string \| number | 100 | 否 | 轨道圆角 |
| textColor | string | '#c2c2c2' | 否 | 文字颜色 |
| fontSize | string \| number | 16 | 否 | 文字大小 |
| textBold | boolean | false | 否 | 文字是否加粗 |
| activeTextColor | string | '#ffffff' | 否 | 激活文字颜色 |
| disabled | boolean | false | 否 | 是否禁用 |
| successText | string | '验证成功' | 否 | 成功文字 |
| autoReset | boolean | false | 否 | 是否自动重置 |
| resetDelay | number | 300 | 否 | 重置延迟时间（毫秒） |
| threshold | string \| number | '' | 否 | 阈值 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 拖动滑块过程中触发 | `percent: number` - 当前拖动进度百分比（0-1） |
| success | 滑块拖动到指定位置时触发 | - |
| reset | 滑块重置时触发 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| init | - | - | 初始化组件，获取容器尺寸 |
| reset | - | - | 重置组件状态 |
| handleSuccess | - | - | 手动触发成功状态 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义按钮文字内容 |
| thumb | - | 自定义滑块内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础滑动解锁</text>
    <wd-slider-button 
      @success="onSuccess"
    />
    <text class="demo-result" v-if="successMsg">{{ successMsg }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 成功消息
const successMsg = ref('')

// 成功回调
const onSuccess = () => {
  successMsg.value = '验证成功！'
  setTimeout(() => {
    successMsg.value = ''
  }, 2000)
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-result {
  font-size: 24rpx;
  color: #07c160;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 自定义样式

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式滑动解锁</text>
    <wd-slider-button 
      text="向右滑动验证"
      success-text="验证通过"
      :height="60"
      bg-color="#f0f0f0"
      rail-color="#07c160"
      text-color="#666"
      active-text-color="#fff"
      @success="onSuccess"
    />
    <text class="demo-result" v-if="successMsg">{{ successMsg }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 成功消息
const successMsg = ref('')

// 成功回调
const onSuccess = () => {
  successMsg.value = '验证成功！'
  setTimeout(() => {
    successMsg.value = ''
  }, 2000)
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-result {
  font-size: 24rpx;
  color: #07c160;
  margin-top: 20rpx;
  display: block;
}
</style>
```

### 自动重置

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自动重置滑动解锁</text>
    <wd-slider-button 
      text="滑动解锁"
      success-text="解锁成功"
      :auto-reset="true"
      :reset-delay="1500"
      @success="onSuccess"
      @reset="onReset"
    />
    <text class="demo-result" v-if="successMsg">{{ successMsg }}</text>
    <text class="demo-result reset" v-if="resetMsg">{{ resetMsg }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 成功消息
const successMsg = ref('')
// 重置消息
const resetMsg = ref('')

// 成功回调
const onSuccess = () => {
  successMsg.value = '解锁成功！'
  resetMsg.value = ''
}

// 重置回调
const onReset = () => {
  resetMsg.value = '已重置，可以再次滑动'
  setTimeout(() => {
    successMsg.value = ''
    resetMsg.value = ''
  }, 1500)
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-result {
  font-size: 24rpx;
  color: #07c160;
  margin-top: 20rpx;
  display: block;
}

.demo-result.reset {
  color: #909399;
}
</style>
```

### 自定义滑块内容

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义滑块内容</text>
    <wd-slider-button 
      @success="onSuccess"
    >
      <template #thumb>
        <view class="custom-thumb">
          <wd-icon name="lock" :color="railColor" size="40"></wd-icon>
        </view>
      </template>
      <text class="custom-text">拖动解锁</text>
    </wd-slider-button>
    <text class="demo-result" v-if="successMsg">{{ successMsg }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 成功消息
const successMsg = ref('')
// 轨道颜色
const railColor = ref('#4d80f0')

// 成功回调
const onSuccess = () => {
  successMsg.value = '解锁成功！'
  railColor.value = '#07c160'
  setTimeout(() => {
    successMsg.value = ''
    railColor.value = '#4d80f0'
  }, 2000)
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-result {
  font-size: 24rpx;
  color: #07c160;
  margin-top: 20rpx;
  display: block;
}

.custom-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.custom-text {
  font-size: 24rpx;
  font-weight: bold;
}
</style>
```

### 禁用状态

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">禁用状态滑动解锁</text>
    <wd-slider-button 
      disabled
      text="已禁用，无法滑动"
    />
    <text class="demo-tip">禁用状态下，滑块无法拖动</text>
  </view>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-tip {
  font-size: 22rpx;
  color: #909399;
  margin-top: 10rpx;
  display: block;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --slider-button-height | 45rpx | 组件高度 |
| --slider-button-bg-color | #e0e0e0 | 背景颜色 |
| --slider-button-rail-color | #4d80f0 | 轨道颜色 |
| --slider-button-text-color | #c2c2c2 | 文字颜色 |
| --slider-button-active-text-color | #ffffff | 激活文字颜色 |
| --slider-button-font-size | 16rpx | 文字大小 |
| --slider-button-border-radius | 100rpx | 圆角大小 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式滑动解锁</text>
    <wd-slider-button 
      custom-class="custom-slider-button"
      @success="onSuccess"
    />
    <text class="demo-result" v-if="successMsg">{{ successMsg }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 成功消息
const successMsg = ref('')

// 成功回调
const onSuccess = () => {
  successMsg.value = '验证成功！'
  setTimeout(() => {
    successMsg.value = ''
  }, 2000)
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.demo-result {
  font-size: 24rpx;
  color: #07c160;
  margin-top: 20rpx;
  display: block;
}

/* 自定义滑块按钮样式 */
.custom-slider-button {
  --slider-button-height: 80rpx;
  --slider-button-bg-color: #f5f5f5;
  --slider-button-rail-color: #07c160;
  --slider-button-text-color: #666;
  --slider-button-active-text-color: #fff;
  --slider-button-font-size: 28rpx;
  --slider-button-border-radius: 40rpx;
}
</style>
```

## 注意事项

1. **组件尺寸**：组件会自动获取容器尺寸，确保父容器有明确的宽度，否则可能导致组件显示异常。

2. **触摸事件**：组件使用了触摸事件，在桌面端也支持鼠标拖动，但建议在移动端使用效果更佳。

3. **自动重置**：开启 `autoReset` 后，组件在验证成功后会自动重置，重置延迟时间可通过 `resetDelay` 调整。

4. **自定义滑块**：通过 `thumb` 插槽自定义滑块内容时，建议保持内容尺寸适中，避免影响拖动体验。

5. **阈值设置**：`threshold` 属性用于设置滑块需要拖动的距离，默认为组件宽度减去滑块宽度。

6. **禁用状态**：设置 `disabled` 为 `true` 后，组件将无法拖动，同时显示禁用样式。

7. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

8. **性能优化**：拖动过程中会频繁触发 `change` 事件，避免在事件处理函数中执行复杂的计算或操作。

## 常见问题

### Q: 组件显示异常，滑块无法拖动？
A: 请检查父容器是否有明确的宽度，组件需要获取容器尺寸才能正常工作。

### Q: 拖动滑块时没有触发 `change` 事件？
A: 请检查是否正确绑定了事件监听器，或者组件是否处于禁用状态。

### Q: 自定义滑块样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。

### Q: 组件在某些平台上显示异常？
A: 组件已针对不同平台进行了适配，但如果遇到问题，可以尝试调用 `init` 方法重新初始化，或者检查容器的样式设置。

### Q: 自动重置功能不生效？
A: 请确保 `autoReset` 属性设置为 `true`，并检查 `resetDelay` 是否设置合理。
