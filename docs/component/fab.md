# 悬浮操作按钮组件（wd-fab）

## 组件概述

wd-fab 是一个悬浮操作按钮组件，用于在页面中展示可展开的悬浮按钮，支持多种位置、方向和样式配置。该组件基于 UniApp 开发，支持多平台使用，提供了丰富的配置选项，可自定义按钮大小、位置、方向、样式等，适用于各种需要悬浮操作按钮的场景。

### 适用场景

- 页面中的主要操作入口
- 聊天应用中的发送消息按钮
- 图片浏览应用中的分享按钮
- 任何需要悬浮操作按钮的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| active | boolean | false | 否 | 是否激活 |
| type | string | 'primary' | 否 | 类型，可选值为 'default'、'primary'、'info'、'success'、'warning'、'error' |
| size | number | 50 | 否 | 悬浮按钮大小，单位为像素 |
| position | string | 'right-bottom' | 否 | 悬浮按钮位置，可选值为 'left-top'、'right-top'、'left-bottom'、'right-bottom'、'left-center'、'right-center'、'top-center'、'bottom-center' |
| direction | string | 'top' | 否 | 悬浮按钮菜单弹出方向，可选值为 'top'、'right'、'bottom'、'left' |
| disabled | boolean | false | 否 | 是否禁用 |
| inactiveIcon | string | 'add' | 否 | 悬浮按钮未展开时的图标 |
| activeIcon | string | 'close' | 否 | 悬浮按钮展开时的图标 |
| zIndex | number | 99 | 否 | 自定义悬浮按钮层级 |
| draggable | boolean | false | 否 | 是否可拖动 |
| gap | object | {} | 否 | 自定义悬浮按钮菜单与按钮之间的间距，单位为像素 |
| expandable | boolean | true | 否 | 用于控制点击时是否展开菜单 |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:active | 激活状态变化时触发 | value: boolean - 激活状态 |
| click | 点击悬浮按钮时触发（仅当 expandable 为 false 时触发） | 无 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | 无 | 无 | 展开菜单 |
| close | 无 | 无 | 收起菜单 |

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| default | 无 | 默认插槽，用于放置悬浮按钮的菜单内容 |
| trigger | 无 | 自定义触发器插槽，用于自定义悬浮按钮的外观 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-fab>
    <wd-button type="primary" size="small" round custom-class="wd-fab__item">
      <wd-icon name="edit" />
    </wd-button>
    <wd-button type="success" size="small" round custom-class="wd-fab__item">
      <wd-icon name="share" />
    </wd-button>
    <wd-button type="warning" size="small" round custom-class="wd-fab__item">
      <wd-icon name="delete" />
    </wd-button>
  </wd-fab>
</template>
```

### 自定义位置和方向

```vue
<template>
  <wd-fab
    position="left-bottom"
    direction="right"
    type="success"
  >
    <wd-button type="success" size="small" round custom-class="wd-fab__item">
      <wd-icon name="edit" />
    </wd-button>
    <wd-button type="success" size="small" round custom-class="wd-fab__item">
      <wd-icon name="share" />
    </wd-button>
  </wd-fab>
</template>
```

### 可拖动

```vue
<template>
  <wd-fab
    draggable
    type="info"
  >
    <wd-button type="info" size="small" round custom-class="wd-fab__item">
      <wd-icon name="edit" />
    </wd-button>
    <wd-button type="info" size="small" round custom-class="wd-fab__item">
      <wd-icon name="share" />
    </wd-button>
  </wd-fab>
</template>
```

### 自定义触发器

```vue
<template>
  <wd-fab>
    <template #trigger>
      <view class="custom-trigger">
        <wd-icon name="add" size="24" color="#fff" />
      </view>
    </template>
    <wd-button type="primary" size="small" round custom-class="wd-fab__item">
      <wd-icon name="edit" />
    </wd-button>
    <wd-button type="success" size="small" round custom-class="wd-fab__item">
      <wd-icon name="share" />
    </wd-button>
  </wd-fab>
</template>

<style scoped>
.custom-trigger {
  width: 50px;
  height: 50px;
  background-color: #3c9cff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 非展开模式

```vue
<template>
  <wd-fab
    :expandable="false"
    @click="handleClick"
    type="warning"
  />
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('点击了悬浮按钮')
}
</script>
```

## 样式定制

### 通过 customStyle 自定义样式

```vue
<template>
  <wd-fab
    custom-style="box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);"
    type="error"
  >
    <wd-button type="error" size="small" round custom-class="wd-fab__item">
      <wd-icon name="edit" />
    </wd-button>
    <wd-button type="error" size="small" round custom-class="wd-fab__item">
      <wd-icon name="share" />
    </wd-button>
  </wd-fab>
</template>
```

### 通过 customClass 自定义样式

```vue
<template>
  <wd-fab
    custom-class="custom-fab"
    type="primary"
  >
    <wd-button type="primary" size="small" round custom-class="wd-fab__item">
      <wd-icon name="edit" />
    </wd-button>
    <wd-button type="primary" size="small" round custom-class="wd-fab__item">
      <wd-icon name="share" />
    </wd-button>
  </wd-fab>
</template>

<style scoped>
.custom-fab {
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
}

/* 自定义菜单项样式 */
.custom-fab .wd-fab__item {
  margin: 8px 0;
}
</style>
```

## 注意事项

1. **性能优化**：
   - 当页面中有多个悬浮按钮时，建议合理设置 zIndex 属性，避免层级冲突
   - 避免在悬浮按钮中放置过多的菜单项，影响页面性能

2. **布局注意事项**：
   - 当设置 draggable 为 true 时，用户可拖动按钮调整位置
   - 拖动结束后，按钮会自动吸附到屏幕左侧或右侧

3. **跨平台兼容性**：
   - 不同平台的触摸事件处理可能存在差异，需注意测试
   - 不同平台的阴影效果可能存在差异，需注意测试

4. **样式定制**：
   - 组件提供了丰富的样式属性，可直接通过 props 自定义组件外观
   - 也可通过 `customStyle` 和 `customClass` 进行更灵活的样式定制
   - 建议使用主题变量，确保组件样式与项目主题保持一致

5. **事件处理**：
   - 当 `expandable` 为 `true` 时，点击按钮会切换激活状态，触发 `update:active` 事件
   - 当 `expandable` 为 `false` 时，点击按钮会触发 `click` 事件

6. **方法调用**：
   - `open` 方法用于展开菜单
   - `close` 方法用于收起菜单
   - 方法调用需通过 ref 获取组件实例，调用组件的方法

7. **自定义触发器**：
   - 当使用 `trigger` 插槽自定义触发器时，需确保触发器的尺寸与 `size` 属性设置的尺寸一致
   - 自定义触发器时，需自行处理点击事件

8. **菜单项样式**：
   - 建议为菜单项添加 `wd-fab__item` 类名，以获得更好的样式效果
   - 可通过自定义样式调整菜单项的间距、大小等


