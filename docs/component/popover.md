# wd-popover 弹出层组件

## 组件概述

wd-popover 是一个功能强大的弹出层组件，支持多种放置位置和显示模式，可用于展示提示信息、菜单选项或自定义内容。组件基于 Vue 3 + TypeScript + UniApp 开发，提供了丰富的配置选项和灵活的自定义能力，能够满足各种复杂的弹出层需求。

### 功能特点

- 支持 12 种不同的放置位置
- 提供普通模式和菜单模式两种显示方式
- 可自定义箭头样式和弹出层样式
- 支持内容插槽自定义
- 支持关闭按钮和自动关闭功能
- 支持通过 v-model 控制显示状态
- 提供打开和关闭的方法
- 支持点击外部关闭
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 展示提示信息
- 提供操作菜单
- 显示详细信息
- 实现下拉菜单
- 实现气泡提示
- 其他需要弹出层的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customArrow | string | '' | 否 | 自定义箭头样式类名 |
| customPop | string | '' | 否 | 自定义弹出层样式类名 |
| visibleArrow | boolean | true | 否 | 是否显示 popover 箭头 |
| content | string \| Array<Record<string, any>> | - | 否 | 显示的内容，也可以通过 slot#content 传入 |
| placement | 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end' | 'bottom' | 否 | 指定 popover 的放置位置 |
| offset | number | 0 | 否 | 偏移量 |
| useContentSlot | boolean | false | 否 | 是否使用内容插槽 |
| disabled | boolean | false | 否 | 是否禁用 popover |
| showClose | boolean | false | 否 | 是否显示关闭按钮 |
| modelValue | boolean | false | 否 | 控制 popover 的显示状态 |
| mode | 'menu' \| 'normal' | 'normal' | 否 | 当前显示的模式，决定内容的展现形式，可选值：normal（普通模式）/ menu（菜单模式） |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | popover 显示状态变化时 | 新的显示状态（boolean） |
| menuclick | 菜单模式下点击菜单项时 | { item: 点击的菜单项, index: 菜单项索引 } |
| change | popover 显示状态变化时 | { show: 新的显示状态 } |
| open | popover 打开时 | - |
| close | popover 关闭时 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | - | - | 打开 popover |
| close | - | - | 关闭 popover |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 触发 popover 显示的内容 |
| content | - | 自定义 popover 内容，需要设置 useContentSlot 为 true |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      content="这是一个简单的弹出层"
      placement="bottom"
    >
      <wd-button type="primary">点击显示弹出层</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>
```

### 2. 菜单模式

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      :content="menuList"
      mode="menu"
      placement="bottom-end"
      @menuclick="onMenuClick"
    >
      <wd-button type="primary">点击显示菜单</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)

const menuList = [
  { iconClass: 'edit', content: '编辑' },
  { iconClass: 'delete', content: '删除' },
  { iconClass: 'share', content: '分享' }
]

const onMenuClick = ({ item, index }) => {
  console.log('点击了菜单项：', item, index)
  // 处理菜单点击事件
}
</script>
```

### 3. 自定义内容插槽

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      use-content-slot
      placement="right"
      show-close
    >
      <wd-button type="primary">点击显示自定义内容</wd-button>
      <template #content>
        <view class="custom-content">
          <view class="custom-title">自定义标题</view>
          <view class="custom-text">这是自定义的弹出层内容，可以包含任何组件和样式。</view>
          <wd-button type="primary" size="small" @click="showPopover = false">确定</wd-button>
        </view>
      </template>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>

<style lang="scss">
.custom-content {
  padding: 16px;
  width: 200px;
  
  .custom-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .custom-text {
    font-size: 14px;
    color: #606266;
    margin-bottom: 16px;
  }
}
</style>
```

### 4. 不同放置位置

```vue
<template>
  <view class="demo">
    <view class="position-demo">
      <wd-popover
        v-model="showTop"
        content="顶部弹出"
        placement="top"
      >
        <wd-button type="primary">顶部</wd-button>
      </wd-popover>
      
      <wd-popover
        v-model="showBottom"
        content="底部弹出"
        placement="bottom"
      >
        <wd-button type="primary">底部</wd-button>
      </wd-popover>
      
      <wd-popover
        v-model="showLeft"
        content="左侧弹出"
        placement="left"
      >
        <wd-button type="primary">左侧</wd-button>
      </wd-popover>
      
      <wd-popover
        v-model="showRight"
        content="右侧弹出"
        placement="right"
      >
        <wd-button type="primary">右侧</wd-button>
      </wd-popover>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
</script>

<style lang="scss">
.position-demo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
</style>
```

### 5. 自定义样式

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      content="自定义样式的弹出层"
      placement="bottom"
      custom-arrow="custom-arrow"
      custom-pop="custom-pop"
      :custom-style="{ borderRadius: '8px' }"
    >
      <wd-button type="primary">点击显示自定义样式</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>

<style lang="scss">
.custom-arrow {
  /* 自定义箭头样式 */
  background-color: #4D80F0;
}

.custom-pop {
  /* 自定义弹出层样式 */
  background-color: #4D80F0;
  color: white;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      content="自定义样式"
      custom-class="custom-popper"
      :custom-style="{ backgroundColor: '#f5f7fa', border: '1px solid #e4e7ed' }"
    >
      <wd-button type="primary">点击显示</wd-button>
    </wd-popover>
  </view>
</template>

<style lang="scss">
.custom-popper {
  // 自定义类样式
  .wd-popover__inner {
    font-size: 14px;
    color: #303133;
  }
}
</style>
```

### 2. 自定义箭头和弹出层

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      content="自定义箭头和弹出层"
      custom-arrow="my-arrow"
      custom-pop="my-pop"
    >
      <wd-button type="primary">点击显示</wd-button>
    </wd-popover>
  </view>
</template>

<style lang="scss">
.my-arrow {
  // 自定义箭头样式
  width: 10px;
  height: 10px;
  background-color: #4D80F0;
  transform: rotate(45deg);
}

.my-pop {
  // 自定义弹出层样式
  background-color: #4D80F0;
  color: white;
  border-radius: 8px;
  padding: 12px;
}
</style>
```

### 3. 自定义菜单样式

```vue
<template>
  <view class="demo">
    <wd-popover
      v-model="showPopover"
      :content="menuList"
      mode="menu"
      custom-pop="custom-menu"
    >
      <wd-button type="primary">点击显示菜单</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)

const menuList = [
  { iconClass: 'edit', content: '编辑' },
  { iconClass: 'delete', content: '删除' }
]
</script>

<style lang="scss">
.custom-menu {
  // 自定义菜单样式
  .wd-popover__menu-inner {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    &:active {
      background-color: #f5f7fa;
    }
  }
  
  .wd-popover__icon {
    margin-right: 8px;
    color: #4D80F0;
  }
}
</style>
```

## 注意事项

1. **内容类型要求**：
   - 普通模式下，content 属性必须是字符串类型
   - 菜单模式下，content 属性必须是对象数组类型

2. **放置位置**：
   - 支持 12 种不同的放置位置
   - 组件会自动调整位置，确保在可视区域内显示

3. **性能优化**：
   - 避免在弹出层中放置过多复杂内容
   - 频繁显示/隐藏的弹出层，建议使用 v-if 而非 v-show

4. **跨平台兼容**：
   - 组件在不同平台上的表现可能略有差异
   - 特别是在定位和动画效果方面

5. **关闭机制**：
   - 点击外部区域会自动关闭弹出层
   - 可以通过 showClose 属性显示关闭按钮
   - 支持通过 close 方法手动关闭

6. **插槽使用**：
   - 使用内容插槽时，需要设置 useContentSlot 为 true
   - 插槽内容的样式需要自行管理

7. **箭头显示**：
   - 可以通过 visibleArrow 属性控制箭头的显示
   - 箭头样式可以通过 customArrow 属性自定义

8. **菜单模式**：
   - 菜单模式下，content 数组中的每个对象可以包含 iconClass 和 content 属性
   - iconClass 用于显示图标，content 用于显示文本
