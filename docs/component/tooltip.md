# Tooltip 提示框

## 组件概述

wd-tooltip 是一个轻量级的提示框组件，用于在 UniApp 应用中为元素提供额外的信息或说明。它支持多种位置、自定义内容、箭头显示和动画效果，是构建交互友好界面的重要组件。

### 功能特点
- 支持 12 种不同的显示位置
- 支持自定义内容（文本或插槽）
- 支持显示/隐藏箭头
- 支持自定义偏移量
- 支持动画效果
- 支持手动控制显示/隐藏
- 支持关闭按钮
- 支持禁用状态
- 支持点击外部关闭

### 适用场景
- 为图标、按钮等元素提供额外说明
- 显示表单字段的验证提示
- 展示复杂信息的简短摘要
- 为数据可视化元素提供悬停提示

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| customArrow | string | '' | 否 | 自定义箭头内容 |
| customPop | string | '' | 否 | 自定义弹出内容 |
| visibleArrow | boolean | true | 否 | 是否显示Tooltip箭头 |
| content | string / array | - | 否 | 显示的内容，也可以通过`slot#content`传入 |
| placement | string | 'bottom' | 否 | Tooltip的出现位置，可选值：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |
| offset | number / array / object | 0 | 否 | 出现位置的偏移量，支持数字、数组或对象类型 |
| useContentSlot | boolean | false | 否 | 是否使用slot来传入content内容 |
| disabled | boolean | false | 否 | Tooltip是否可用 |
| showClose | boolean | false | 否 | 是否显示Tooltip内部的关闭按钮 |
| modelValue | boolean | false | 否 | Tooltip的状态是否可见，通过v-model绑定 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | Tooltip 可见性变化时触发 | value: boolean - 当前可见性状态 |
| change | Tooltip 可见性变化时触发 | { show: boolean } - 包含当前可见性状态的对象 |
| open | Tooltip 打开时触发 | - |
| close | Tooltip 关闭时触发 | - |
| menuclick | 菜单点击时触发 | - |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 触发 Tooltip 的目标元素 |
| content | - | 自定义 Tooltip 内容，需要设置 useContentSlot 为 true |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开 Tooltip |
| close | - | - | 关闭 Tooltip |

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-tooltip content="这是一个提示信息">
      <wd-button>悬停查看提示</wd-button>
    </wd-tooltip>
  </view>
</template>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
```

### 不同位置

```vue
<template>
  <view class="demo">
    <view class="row">
      <wd-tooltip content="顶部" placement="top">
        <wd-button>顶部</wd-button>
      </wd-tooltip>
      <wd-tooltip content="顶部开始" placement="top-start">
        <wd-button>顶部开始</wd-button>
      </wd-tooltip>
      <wd-tooltip content="顶部结束" placement="top-end">
        <wd-button>顶部结束</wd-button>
      </wd-tooltip>
    </view>
    <view class="row">
      <wd-tooltip content="左侧" placement="left">
        <wd-button>左侧</wd-button>
      </wd-tooltip>
      <wd-tooltip content="中间" placement="bottom">
        <wd-button>中间</wd-button>
      </wd-tooltip>
      <wd-tooltip content="右侧" placement="right">
        <wd-button>右侧</wd-button>
      </wd-tooltip>
    </view>
    <view class="row">
      <wd-tooltip content="底部开始" placement="bottom-start">
        <wd-button>底部开始</wd-button>
      </wd-tooltip>
      <wd-tooltip content="底部" placement="bottom">
        <wd-button>底部</wd-button>
      </wd-tooltip>
      <wd-tooltip content="底部结束" placement="bottom-end">
        <wd-button>底部结束</wd-button>
      </wd-tooltip>
    </view>
  </view>
</template>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

.row {
  display: flex;
  gap: 20px;
}
</style>
```

### 自定义内容和偏移量

```vue
<template>
  <view class="demo">
    <wd-tooltip 
      content="自定义偏移量" 
      :offset="20"
    >
      <wd-button>偏移20px</wd-button>
    </wd-tooltip>
    <wd-tooltip 
      content="数组偏移" 
      :offset="[10, 15]"
    >
      <wd-button>数组偏移</wd-button>
    </wd-tooltip>
    <wd-tooltip 
      content="对象偏移" 
      :offset="{ x: 5, y: 20 }"
    >
      <wd-button>对象偏移</wd-button>
    </wd-tooltip>
    <wd-tooltip 
      use-content-slot
    >
      <wd-button>自定义内容</wd-button>
      <template #content>
        <view class="custom-content">
          <view class="title">自定义提示</view>
          <view class="desc">这是一个自定义内容的提示框</view>
        </view>
      </template>
    </wd-tooltip>
  </view>
</template>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.custom-content {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
}

.desc {
  font-size: 14px;
  color: #666;
}
</style>
```

### 手动控制和关闭按钮

```vue
<template>
  <view class="demo">
    <wd-tooltip 
      v-model="visible" 
      content="手动控制提示" 
      show-close
    >
      <wd-button>手动控制</wd-button>
    </wd-tooltip>
    <view class="controls">
      <wd-button @click="visible = true">打开</wd-button>
      <wd-button @click="visible = false">关闭</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
```

### 禁用状态和无箭头

```vue
<template>
  <view class="demo">
    <wd-tooltip 
      content="禁用状态" 
      disabled
    >
      <wd-button>禁用状态</wd-button>
    </wd-tooltip>
    <wd-tooltip 
      content="无箭头" 
      :visible-arrow="false"
    >
      <wd-button>无箭头</wd-button>
    </wd-tooltip>
  </view>
</template>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 和 `customClass` 属性可以自定义 Tooltip 的样式：

```vue
<template>
  <view class="demo">
    <wd-tooltip 
      content="自定义样式" 
      customClass="my-tooltip"
      customStyle="background-color: #1989fa; color: white; border-radius: 8px; padding: 10px;"
    >
      <wd-button>自定义样式</wd-button>
    </wd-tooltip>
  </view>
</template>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  justify-content: center;
}

:deep(.my-tooltip) {
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

### CSS 变量

组件支持通过 CSS 变量进行样式定制，以下是常用的 CSS 变量：

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| --tooltip-background-color | 背景颜色 | rgba(0, 0, 0, 0.7) |
| --tooltip-text-color | 文字颜色 | #ffffff |
| --tooltip-font-size | 文字大小 | 28rpx |
| --tooltip-line-height | 行高 | 40rpx |
| --tooltip-padding | 内边距 | 16rpx 24rpx |
| --tooltip-border-radius | 圆角 | 8rpx |
| --tooltip-arrow-size | 箭头大小 | 16rpx |
| --tooltip-arrow-color | 箭头颜色 | rgba(0, 0, 0, 0.7) |

## 注意事项

1. **内容类型**：
   - `content` 属性支持字符串和数组类型
   - 当需要更复杂的内容时，建议使用 `content` 插槽

2. **位置设置**：
   - 支持 12 种不同的位置，包括上下左右以及各方向的起始和结束位置
   - 组件会自动调整位置以确保提示框在可视区域内

3. **偏移量**：
   - `offset` 属性支持数字、数组和对象三种类型
   - 数字类型：同时设置 x 和 y 方向的偏移量
   - 数组类型：[x, y] 分别设置 x 和 y 方向的偏移量
   - 对象类型：{ x: number, y: number } 分别设置 x 和 y 方向的偏移量

4. **手动控制**：
   - 可以通过 `v-model` 双向绑定控制 Tooltip 的显示和隐藏
   - 也可以通过调用 `open()` 和 `close()` 方法手动控制

5. **性能优化**：
   - 避免在大量元素上同时使用 Tooltip
   - 对于频繁更新的内容，建议使用 `content` 属性而不是插槽

6. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 动画效果可能在不同平台上有细微差异

7. **点击外部关闭**：
   - 组件默认支持点击外部关闭 Tooltip
   - 可以通过 `disabled` 属性禁用此功能
