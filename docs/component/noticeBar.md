# wd-notice-bar 通知栏组件

## 组件概述

wd-notice-bar 是一个用于显示系统通知或重要信息的组件，支持多种样式、滚动效果和交互方式。该组件设计灵活，可根据需求自定义内容、样式和行为，适用于各种需要向用户展示通知信息的场景。

### 功能特点
- 支持多种通知类型：warning、info、danger
- 支持水平和垂直滚动
- 支持自定义滚动速度和延迟
- 支持可关闭功能
- 支持换行显示
- 支持自定义图标和样式
- 支持点击事件和滚动事件
- 支持数组形式的多条通知轮播

### 适用场景
- 系统公告和通知
- 重要信息提示
- 活动推广和营销信息
- 错误提示和警告
- 状态更新和进度提示

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| text | string / array |  | 否 | 设置通知栏文案，支持字符串或数组形式 |
| type | string | warning | 否 | 设置通知栏类型，可选值为：'warning' | 'info' | 'danger' | '' |
| scrollable | boolean | true | 否 | 是否可滚动 |
| delay | number | 1 | 否 | 滚动延迟时间（秒） |
| speed | number | 50 | 否 | 滚动速度（px/s） |
| closable | boolean | false | 否 | 是否可关闭 |
| wrapable | boolean | false | 否 | 是否换行显示 |
| prefix | string |  | 否 | 设置左侧图标，使用 icon 章节中的图标名 |
| color | string |  | 否 | 文字、图标颜色 |
| backgroundColor | string |  | 否 | 背景颜色 |
| direction | string | horizontal | 否 | 滚动方向，可选值为：'horizontal'（水平）、'vertical'（垂直） |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| close | 点击关闭按钮时触发 | 无 |
| next | 滚动到下一条时触发 | index: 当前显示的通知索引 |
| click | 点击通知栏时触发 | { index: 当前索引, text: 当前通知文本 } |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| reset | 无 | void | 重置NoticeBar动画 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| prefix | - | 左侧图标插槽，替换默认图标 |
| suffix | - | 右侧插槽，替换默认关闭按钮 |
| default | - | 内容插槽，替换默认文本内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <!-- 基础通知栏 -->
    <wd-notice-bar text="这是一条基础的通知栏消息" />
  </view>
</template>

<script lang="ts" setup>
// 基础用法无需额外配置
</script>
```

### 2. 不同类型的通知栏

```vue
<template>
  <view>
    <!-- 警告类型通知栏 -->
    <wd-notice-bar text="这是一条警告类型的通知" type="warning" />
    
    <!-- 信息类型通知栏 -->
    <wd-notice-bar text="这是一条信息类型的通知" type="info" />
    
    <!-- 危险类型通知栏 -->
    <wd-notice-bar text="这是一条危险类型的通知" type="danger" />
  </view>
</template>

<script lang="ts" setup>
// 不同类型的通知栏，使用不同的颜色标识
</script>
```

### 3. 可关闭的通知栏

```vue
<template>
  <view>
    <!-- 可关闭的通知栏 -->
    <wd-notice-bar 
      text="这是一条可关闭的通知" 
      closable 
      @close="onClose" 
    />
  </view>
</template>

<script lang="ts" setup>
// 关闭通知栏事件
const onClose = () => {
  console.log('通知栏已关闭')
}
</script>
```

### 4. 垂直滚动的通知栏

```vue
<template>
  <view>
    <!-- 垂直滚动的通知栏 -->
    <wd-notice-bar 
      :text="noticeList" 
      direction="vertical" 
      speed="30" 
      @click="onClick" 
      @next="onNext" 
    />
  </view>
</template>

<script lang="ts" setup>
// 通知列表
const noticeList = [
  '第一条垂直滚动的通知',
  '第二条垂直滚动的通知',
  '第三条垂直滚动的通知'
]

// 点击通知栏事件
const onClick = (event: { index: number; text: string }) => {
  console.log('点击了通知', event)
}

// 滚动到下一条事件
const onNext = (index: number) => {
  console.log('滚动到下一条，当前索引：', index)
}
</script>
```

### 5. 自定义样式的通知栏

```vue
<template>
  <view>
    <!-- 自定义样式的通知栏 -->
    <wd-notice-bar 
      text="这是一条自定义样式的通知" 
      prefix="volume-up" 
      color="#4D80F0" 
      background-color="#E8F3FF" 
      custom-style="border-radius: 8rpx; margin: 20rpx 0;" 
    >
      <!-- 自定义内容插槽 -->
      <template #default>
        <text class="custom-text">自定义通知内容</text>
      </template>
      <!-- 自定义右侧插槽 -->
      <template #suffix>
        <wd-button size="mini" type="primary" @click.stop="onButtonClick">查看详情</wd-button>
      </template>
    </wd-notice-bar>
  </view>
</template>

<script lang="ts" setup>
// 按钮点击事件
const onButtonClick = () => {
  console.log('点击了查看详情按钮')
}
</script>

<style scoped>
.custom-text {
  font-weight: 500;
}
</style>
```

## 样式定制指南

### 1. 使用内置类型样式

组件提供了三种内置类型样式，可通过 `type` 属性直接使用：

```vue
<wd-notice-bar text="警告类型" type="warning" />
<wd-notice-bar text="信息类型" type="info" />
<wd-notice-bar text="危险类型" type="danger" />
```

### 2. 自定义颜色和背景

通过 `color` 和 `backgroundColor` 属性可以自定义通知栏的颜色和背景：

```vue
<wd-notice-bar 
  text="自定义颜色" 
  color="#4D80F0" 
  background-color="#E8F3FF" 
/>
```

### 3. 使用 customStyle 和 customClass

通过 `customStyle` 和 `customClass` 可以实现更复杂的样式定制：

```vue
<wd-notice-bar 
  text="自定义样式" 
  custom-style="border-radius: 8rpx; padding: 15rpx;" 
  custom-class="my-notice-bar" 
/>

<style>
.my-notice-bar {
  /* 自定义样式 */
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
```

### 4. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-notice-bar 
  text="覆盖内部样式" 
  custom-class="my-notice-bar" 
/>

<style scoped>
.my-notice-bar {
  /* 自定义图标样式 */
  :deep(.wd-notice-bar__prefix) {
    color: #4D80F0;
    font-size: 28rpx;
  }
  
  /* 自定义文本样式 */
  :deep(.wd-notice-bar__content) {
    font-size: 28rpx;
    line-height: 40rpx;
  }
}
</style>
```

## 注意事项

### 1. 滚动配置
- 水平滚动时，只有当内容宽度超过容器宽度时才会滚动
- 垂直滚动时，需要传入数组形式的文本，组件会自动轮播
- 可以通过 `speed` 和 `delay` 属性调整滚动速度和延迟

### 2. 性能优化
- 避免在通知栏中放置过于复杂的内容，影响滚动性能
- 对于大量通知，建议合理控制数组长度，避免内存占用过高
- 在页面隐藏或组件失活时，组件会自动停止滚动，激活时恢复滚动

### 3. 事件处理
- 点击事件会返回当前通知的索引和文本内容
- 滚动到下一条时会触发 `next` 事件，返回当前索引
- 自定义插槽中的点击事件需要使用 `@click.stop` 阻止事件冒泡

### 4. 样式兼容
- 在不同平台上，滚动效果可能略有差异，建议在各平台上进行测试
- 自定义样式时，建议使用组件提供的 CSS 类名，避免直接修改组件内部结构

### 5. 常见问题解决方案
- **问题**：通知栏不滚动
  **解决方案**：检查 `scrollable` 属性是否为 true，确保内容宽度超过容器宽度

- **问题**：垂直滚动时只显示一条
  **解决方案**：确保传入的是数组形式的文本，且数组长度大于1

- **问题**：自定义样式不生效
  **解决方案**：使用深度选择器（如 `:deep()`）覆盖组件内部样式

- **问题**：点击事件不触发
  **解决方案**：检查事件绑定是否正确，确保没有阻止事件冒泡
