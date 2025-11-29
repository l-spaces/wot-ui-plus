# Swipe Action 滑动操作

## 组件概述

Swipe Action 是一个支持左右滑动显示操作按钮的列表项组件，常用于消息列表、订单列表等场景，允许用户通过滑动手势快速执行删除、收藏、置顶等操作。

### 功能特点
- 支持左滑和右滑两种方向
- 可配置禁用状态
- 提供关闭前的钩子函数，支持自定义确认逻辑
- 自动关闭其他已打开的滑动项
- 支持自定义样式和类名
- 兼容多端平台

### 适用场景
- 消息列表：左滑删除、右滑标记已读
- 订单列表：左滑取消订单、右滑查看详情
- 联系人列表：左滑删除、右滑编辑
- 任务列表：左滑完成、右滑删除

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | string | 'close' | 否 | 滑动按钮的状态，可选值为：'left'（左滑）、'close'（关闭状态）、'right'（右滑） |
| disabled | boolean | false | 否 | 是否禁用滑动操作 |
| beforeClose | function | - | 否 | 在关闭滑动按钮前调用的钩子函数，参数为 (reason, position)，reason 表示关闭原因（'click'、'swipe'、'value'），position 表示关闭前的位置 |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | - | 否 | 自定义样式，直接应用到组件根元素 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击组件时触发 | { value: position }，position 表示点击位置（'left'、'right'、'inside'） |
| update:modelValue | 滑动状态改变时触发 | value: 新的滑动状态（'left'、'close'、'right'） |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| close | reason: string, position?: string | void | 关闭滑动操作，reason 表示关闭原因，position 表示关闭前的位置 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 组件的主要内容区域，用于显示列表项的核心信息 |
| left | - | 左侧滑动操作按钮区域，左滑时显示 |
| right | - | 右侧滑动操作按钮区域，右滑时显示 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-swipe-action v-model="swipeState">
    <!-- 内容区域 -->
    <view class="swipe-content">
      这是一条可滑动的列表项
    </view>
    <!-- 左侧操作按钮 -->
    <template #left>
      <view class="swipe-button swipe-button--primary">置顶</view>
    </template>
    <!-- 右侧操作按钮 -->
    <template #right>
      <view class="swipe-button swipe-button--warning">收藏</view>
      <view class="swipe-button swipe-button--danger">删除</view>
    </template>
  </wd-swipe-action>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeState = ref('close')
</script>

<style scoped>
.swipe-content {
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.swipe-button {
  width: 120rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 28rpx;
}

.swipe-button--primary {
  background-color: #1989fa;
}

.swipe-button--warning {
  background-color: #e6a23c;
}

.swipe-button--danger {
  background-color: #f56c6c;
}
</style>
```

### 禁用状态

```vue
<template>
  <wd-swipe-action v-model="swipeState" disabled>
    <view class="swipe-content">
      这是一条禁用滑动的列表项
    </view>
    <template #right>
      <view class="swipe-button swipe-button--danger">删除</view>
    </template>
  </wd-swipe-action>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeState = ref('close')
</script>
```

### 关闭前确认

```vue
<template>
  <wd-swipe-action v-model="swipeState" :before-close="beforeClose">
    <view class="swipe-content">
      这是一条带确认的列表项
    </view>
    <template #right>
      <view class="swipe-button swipe-button--danger">删除</view>
    </template>
  </wd-swipe-action>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeState = ref('close')

const beforeClose = (reason: string, position: string) => {
  // 只有点击删除按钮时才显示确认
  if (reason === 'click' && position === 'right') {
    uni.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (!res.confirm) {
          // 如果取消，恢复到之前的状态
          swipeState.value = 'right'
        }
      }
    })
  }
}
</script>
```

### 程序化控制

```vue
<template>
  <view>
    <wd-button @click="openSwipe">打开滑动项</wd-button>
    <wd-button @click="closeSwipe">关闭滑动项</wd-button>
    
    <wd-swipe-action ref="swipeRef">
      <view class="swipe-content">
        这是一条可程序化控制的列表项
      </view>
      <template #right>
        <view class="swipe-button swipe-button--danger">删除</view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeRef = ref<any>(null)

const openSwipe = () => {
  // 通过修改 v-model 打开
  // swipeState.value = 'right'
}

const closeSwipe = () => {
  // 通过调用组件方法关闭
  swipeRef.value?.close()
}
</script>
```

### 列表中使用

```vue
<template>
  <view>
    <wd-swipe-action 
      v-for="item in list" 
      :key="item.id" 
      v-model="item.swipeState"
      :before-close="(reason, position) => beforeClose(item, reason, position)"
    >
      <view class="swipe-content">
        {{ item.content }}
      </view>
      <template #left>
        <view class="swipe-button swipe-button--primary">置顶</view>
      </template>
      <template #right>
        <view class="swipe-button swipe-button--warning">收藏</view>
        <view class="swipe-button swipe-button--danger">删除</view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface ListItem {
  id: number
  content: string
  swipeState: string
}

const list = ref<ListItem[]>([
  { id: 1, content: '列表项 1', swipeState: 'close' },
  { id: 2, content: '列表项 2', swipeState: 'close' },
  { id: 3, content: '列表项 3', swipeState: 'close' }
])

const beforeClose = (item: ListItem, reason: string, position: string) => {
  if (reason === 'click' && position === 'right') {
    uni.showModal({
      title: '确认删除',
      content: `确定要删除"${item.content}"吗？`,
      success: (res) => {
        if (res.confirm) {
          // 确认删除，从列表中移除
          list.value = list.value.filter(i => i.id !== item.id)
        } else {
          // 取消删除，恢复滑动状态
          item.swipeState = 'right'
        }
      }
    })
  }
}
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-swipe-action custom-class="my-swipe-action">
  <!-- 内容 -->
</wd-swipe-action>
```

### 自定义样式

```vue
<wd-swipe-action :custom-style="{ backgroundColor: '#f0f0f0', borderRadius: '10rpx' }">
  <!-- 内容 -->
</wd-swipe-action>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --swipe-action-background-color | #ffffff | 组件背景色 |
| --swipe-action-transition-duration | 0.6s | 滑动动画时长 |
| --swipe-action-transition-timing-function | cubic-bezier(0.18, 0.89, 0.32, 1) | 滑动动画缓动函数 |

## 注意事项

1. **性能优化**：在长列表中使用时，建议配合虚拟列表或按需渲染，避免同时渲染大量滑动项
2. **事件处理**：滑动组件会阻止横向滑动事件的冒泡，避免影响父组件的滑动
3. **平台兼容性**：
   - 所有平台均支持基本功能
   - 触摸事件在不同平台的表现可能略有差异
4. **嵌套使用**：不建议在滑动组件内部嵌套其他滑动组件，可能导致事件冲突
5. **样式隔离**：组件使用 `styleIsolation: 'shared'`，支持外部样式覆盖
6. **自动关闭**：当打开一个滑动项时，其他已打开的滑动项会自动关闭
7. **触摸反馈**：滑动过程中会有平滑的动画效果，提升用户体验

### 状态流转
- `close` → 左滑 → `left`
- `close` → 右滑 → `right`
- `left` → 右滑/点击 → `close`
- `right` → 左滑/点击 → `close`

## 常见问题

### Q: 滑动时页面跟着滚动怎么办？
A: 组件内部已处理横向滑动时阻止纵向滚动，确保滑动流畅性

### Q: 如何自定义滑动速度？
A: 可以通过修改 CSS 变量 `--swipe-action-transition-duration` 来调整滑动动画时长

### Q: 为什么点击滑动项内容区域不会关闭？
A: 只有当滑动项处于打开状态时，点击内容区域才会关闭

### Q: 如何在关闭前执行异步操作？
A: 可以在 `beforeClose` 钩子中执行异步操作，但需要注意手动恢复状态
