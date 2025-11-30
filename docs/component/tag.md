# Tag 标签

## 组件概述

Tag 是一个用于标记和分类的 UI 组件，常用于展示状态、分类、标签等信息。它支持多种样式类型、自定义颜色、图标、可关闭等功能，适用于各种需要标签展示的场景。

### 功能特点
- 支持多种标签类型（默认、主要、成功、警告、危险）
- 支持自定义图标和图标插槽
- 支持可关闭标签（仅圆角类型）
- 支持幽灵类型标签
- 支持动态新增标签
- 支持自定义颜色和背景色
- 支持圆角和标记类型
- 支持自定义样式和类名

### 适用场景
- 状态标签：如订单状态、审核状态等
- 分类标签：如商品分类、文章标签等
- 筛选标签：如搜索筛选、条件筛选等
- 标签管理：如动态添加、删除标签等
- 标记提示：如重要标记、新功能标记等

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| useIconSlot | boolean | false | 否 | 是否使用图标插槽，开启后可以自定义图标内容 |
| type | string | 'default' | 否 | 标签类型，可选值：'default' / 'primary' / 'success' / 'warning' / 'danger' |
| icon | string | '' | 否 | 左侧图标名称，使用内置图标库 |
| closable | boolean | false | 否 | 是否可关闭（仅对圆角类型支持） |
| plain | boolean | false | 否 | 是否为幽灵类型标签 |
| dynamic | boolean | false | 否 | 是否为动态标签，支持新增标签功能 |
| color | string | '' | 否 | 标签文字颜色 |
| bgColor | string | '' | 否 | 标签背景色和边框色 |
| round | boolean | false | 否 | 是否为圆角类型标签 |
| mark | boolean | false | 否 | 是否为标记类型标签 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击标签时触发 | event: Event 对象 |
| close | 点击关闭按钮时触发 | event: Event 对象 |
| confirm | 动态标签输入确认时触发 | { value: string }，value 为输入的标签内容 |

### Methods

该组件未对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于标签文字内容 |
| icon | - | 图标插槽，用于自定义图标内容，需要设置 useIconSlot 为 true |
| add | - | 动态标签的添加按钮插槽，用于自定义添加按钮内容 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <wd-tag>默认标签</wd-tag>
    <wd-tag type="primary">主要标签</wd-tag>
    <wd-tag type="success">成功标签</wd-tag>
    <wd-tag type="warning">警告标签</wd-tag>
    <wd-tag type="danger">危险标签</wd-tag>
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 带图标标签

```vue
<template>
  <view class="demo-container">
    <wd-tag icon="home-o">首页</wd-tag>
    <wd-tag icon="user-o" type="primary">用户</wd-tag>
    <wd-tag icon="cart-o" type="success">购物车</wd-tag>
    <wd-tag icon="star-o" type="warning">收藏</wd-tag>
    <wd-tag icon="setting-o" type="danger">设置</wd-tag>
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 可关闭标签

```vue
<template>
  <view class="demo-container">
    <wd-tag v-for="tag in tags" :key="tag" :closable="true" :round="true" @close="handleClose(tag)">
      {{ tag }}
    </wd-tag>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref(['标签一', '标签二', '标签三', '标签四'])

const handleClose = (tag: string) => {
  tags.value = tags.value.filter(item => item !== tag)
  console.log('关闭标签:', tag)
}
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 幽灵标签

```vue
<template>
  <view class="demo-container">
    <wd-tag plain>默认幽灵标签</wd-tag>
    <wd-tag plain type="primary">主要幽灵标签</wd-tag>
    <wd-tag plain type="success">成功幽灵标签</wd-tag>
    <wd-tag plain type="warning">警告幽灵标签</wd-tag>
    <wd-tag plain type="danger">危险幽灵标签</wd-tag>
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
}
</style>
```

### 动态标签

```vue
<template>
  <view class="demo-container">
    <wd-tag v-for="tag in tags" :key="tag" :closable="true" :round="true" @close="handleClose(tag)">
      {{ tag }}
    </wd-tag>
    <wd-tag dynamic @confirm="handleConfirm"></wd-tag>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref(['标签一', '标签二', '标签三'])

const handleClose = (tag: string) => {
  tags.value = tags.value.filter(item => item !== tag)
}

const handleConfirm = ({ value }: { value: string }) => {
  if (value && !tags.value.includes(value)) {
    tags.value.push(value)
  }
}
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 自定义颜色

```vue
<template>
  <view class="demo-container">
    <wd-tag :color="'#ffffff'" :bg-color="'#1989fa'">自定义颜色</wd-tag>
    <wd-tag :color="'#ffffff'" :bg-color="'#52c41a'">自定义颜色</wd-tag>
    <wd-tag :color="'#ffffff'" :bg-color="'#faad14'">自定义颜色</wd-tag>
    <wd-tag :color="'#ffffff'" :bg-color="'#f5222d'">自定义颜色</wd-tag>
    <wd-tag :color="'#646566'" :bg-color="'#e8e8e8'">自定义颜色</wd-tag>
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 标记类型

```vue
<template>
  <view class="demo-container">
    <wd-tag mark>默认标记</wd-tag>
    <wd-tag mark type="primary">主要标记</wd-tag>
    <wd-tag mark type="success">成功标记</wd-tag>
    <wd-tag mark type="warning">警告标记</wd-tag>
    <wd-tag mark type="danger">危险标记</wd-tag>
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

## 样式定制

### 自定义类名

```vue
<wd-tag 
  type="primary" 
  custom-class="my-tag" 
  custom-style="{ borderRadius: '4rpx', padding: '8rpx 16rpx' }"
>
  自定义样式标签
</wd-tag>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --tag-padding | 0 16rpx | 标签内边距 |
| --tag-font-size | 24rpx | 标签字体大小 |
| --tag-height | 40rpx | 标签高度 |
| --tag-border-radius | 4rpx | 标签边框半径 |
| --tag-line-height | 40rpx | 标签行高 |
| --tag-default-color | #646566 | 默认标签文字颜色 |
| --tag-default-background-color | #f0f2f5 | 默认标签背景色 |
| --tag-primary-color | #ffffff | 主要标签文字颜色 |
| --tag-primary-background-color | #1989fa | 主要标签背景色 |
| --tag-success-color | #ffffff | 成功标签文字颜色 |
| --tag-success-background-color | #52c41a | 成功标签背景色 |
| --tag-warning-color | #ffffff | 警告标签文字颜色 |
| --tag-warning-background-color | #faad14 | 警告标签背景色 |
| --tag-danger-color | #ffffff | 危险标签文字颜色 |
| --tag-danger-background-color | #f5222d | 危险标签背景色 |
| --tag-icon-margin-right | 8rpx | 图标与文字之间的间距 |
| --tag-close-size | 20rpx | 关闭按钮大小 |
| --tag-close-color | #c0c4cc | 关闭按钮颜色 |
| --tag-close-hover-color | #909399 | 关闭按钮悬停颜色 |
| --tag-mark-border-radius | 0 8rpx 8rpx 0 | 标记类型标签的边框半径 |

## 注意事项

1. **可关闭标签**：
   - 可关闭标签仅支持圆角类型（`round: true`）
   - 点击关闭按钮会触发 `close` 事件，需要手动处理标签的删除逻辑

2. **动态标签**：
   - 动态标签支持点击添加新标签，输入完成后按回车确认
   - 确认后会触发 `confirm` 事件，返回输入的标签内容
   - 可以通过 `add` 插槽自定义添加按钮的内容

3. **图标使用**：
   - 可以通过 `icon` 属性使用内置图标
   - 也可以通过 `icon` 插槽自定义图标内容，需要设置 `useIconSlot: true`

4. **样式优先级**：
   - 自定义颜色（`color` 和 `bgColor`）优先级高于类型颜色
   - 幽灵类型（`plain`）会改变标签的样式表现

5. **性能优化**：
   - 避免在标签中放置过多复杂内容
   - 对于大量标签的场景，建议使用虚拟列表或分页加载

6. **平台兼容性**：
   - 所有平台均支持基本功能
   - 样式在不同平台可能存在细微差异


### 状态流转
- 初始状态：根据属性渲染标签样式
- 点击事件：触发 `click` 事件
- 关闭事件：触发 `close` 事件
- 动态标签点击：切换到输入状态
- 动态标签输入：触发 `confirm` 事件，添加新标签

## 常见问题

### Q: 如何自定义标签的大小？
A: 可以通过 CSS 变量 `--tag-height` 和 `--tag-font-size` 调整标签的大小，或者使用 `customStyle` 属性直接设置样式。

### Q: 为什么可关闭标签不显示关闭按钮？
A: 可关闭标签仅支持圆角类型，需要设置 `round: true` 才能显示关闭按钮。

### Q: 如何自定义动态标签的添加按钮？
A: 可以使用 `add` 插槽自定义添加按钮的内容。

### Q: 如何实现标签的拖拽排序？
A: 可以结合第三方拖拽库（如 sortablejs）实现标签的拖拽排序功能。

### Q: 如何处理大量标签的场景？
A: 对于大量标签的场景，建议使用虚拟列表或分页加载，避免一次性渲染过多标签影响性能。
