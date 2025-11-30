# Tabbar 标签栏

## 组件概述

Tabbar 是一个底部导航组件，用于在应用的不同页面或功能模块之间进行切换。它通常包含多个标签项，每个标签项可以显示图标、文字和徽章，支持自定义样式和交互效果。

### 功能特点
- 支持固定在底部或自定义位置
- 支持多种形状样式（默认/圆角）
- 支持自定义激活和非激活颜色
- 支持底部安全距离适配（iPhone X 系列机型）
- 支持徽章显示
- 支持固定时的占位元素
- 支持自定义层级

### 适用场景
- 应用底部导航栏
- 功能模块切换
- 多页面应用的主要导航
- 移动端应用的标准导航组件

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number/string | 0 | 否 | 选中标签的索引值或者名称 |
| fixed | boolean | false | 否 | 是否固定在底部 |
| bordered | boolean | true | 否 | 是否显示顶部边框 |
| safeAreaInsetBottom | boolean | false | 否 | 是否设置底部安全距离（iPhone X 类型的机型） |
| shape | string | 'default' | 否 | 标签栏的形状，可选值：'default' | 'round' |
| activeColor | string | - | 否 | 激活标签的颜色 |
| inactiveColor | string | - | 否 | 未激活标签的颜色 |
| placeholder | boolean | false | 否 | 固定在底部时，是否在标签位置生成一个等高的占位元素 |
| zIndex | number | 99 | 否 | 自定义组件的层级 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 标签切换时触发 | { value: number/string }，value 为选中标签的索引值或者名称 |
| update:modelValue | 标签切换时触发 | value: number/string，选中标签的索引值或者名称，用于双向绑定 |

### Methods

该组件未对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于放置 `wd-tabbar-item` 子组件 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home-o" />
    <wd-tabbar-item title="分类" icon="category-o" />
    <wd-tabbar-item title="购物车" icon="cart-o" />
    <wd-tabbar-item title="我的" icon="user-o" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 固定在底部

```vue
<template>
  <wd-tabbar v-model="active" fixed>
    <wd-tabbar-item title="首页" icon="home-o" />
    <wd-tabbar-item title="分类" icon="category-o" />
    <wd-tabbar-item title="购物车" icon="cart-o" />
    <wd-tabbar-item title="我的" icon="user-o" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 带徽章的标签

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home-o" />
    <wd-tabbar-item title="分类" icon="category-o" />
    <wd-tabbar-item title="购物车" icon="cart-o" :badge-props="{ value: 5 }" />
    <wd-tabbar-item title="我的" icon="user-o" :badge-props="{ dot: true }" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 自定义颜色

```vue
<template>
  <wd-tabbar 
    v-model="active" 
    active-color="#1989fa" 
    inactive-color="#646566" 
  >
    <wd-tabbar-item title="首页" icon="home-o" />
    <wd-tabbar-item title="分类" icon="category-o" />
    <wd-tabbar-item title="购物车" icon="cart-o" />
    <wd-tabbar-item title="我的" icon="user-o" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 圆角形状

```vue
<template>
  <wd-tabbar 
    v-model="active" 
    shape="round" 
    fixed 
    safe-area-inset-bottom 
    placeholder 
  >
    <wd-tabbar-item title="首页" icon="home-o" />
    <wd-tabbar-item title="分类" icon="category-o" />
    <wd-tabbar-item title="购物车" icon="cart-o" />
    <wd-tabbar-item title="我的" icon="user-o" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 自定义标签内容

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item name="home">
      <template #icon="{ active }">
        <image 
          :src="active ? homeActiveIcon : homeIcon" 
          style="width: 40rpx; height: 40rpx;" 
        />
      </template>
      <template #title>
        <text style="font-size: 24rpx;">首页</text>
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item name="category">
      <template #icon="{ active }">
        <image 
          :src="active ? categoryActiveIcon : categoryIcon" 
          style="width: 40rpx; height: 40rpx;" 
        />
      </template>
      <template #title>
        <text style="font-size: 24rpx;">分类</text>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref('home')
const homeIcon = 'https://cdn.example.com/home.png'
const homeActiveIcon = 'https://cdn.example.com/home-active.png'
const categoryIcon = 'https://cdn.example.com/category.png'
const categoryActiveIcon = 'https://cdn.example.com/category-active.png'
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-tabbar 
  v-model="active" 
  custom-class="my-tabbar" 
  custom-style="{ backgroundColor: '#fafafa' }"
>
  <!-- tabbar items -->
</wd-tabbar>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --tabbar-background-color | #ffffff | 标签栏背景色 |
| --tabbar-active-color | #1989fa | 激活标签颜色 |
| --tabbar-inactive-color | #646566 | 非激活标签颜色 |
| --tabbar-border-color | #ebedf0 | 标签栏边框颜色 |
| --tabbar-height | 100rpx | 标签栏高度 |
| --tabbar-item-font-size | 20rpx | 标签文字大小 |
| --tabbar-item-icon-size | 40rpx | 标签图标大小 |
| --tabbar-item-margin-bottom | 8rpx | 图标与文字之间的间距 |
| --tabbar-round-border-radius | 20rpx | 圆角形状的边框半径 |

## 注意事项

1. **父子组件关系**：
   - `wd-tabbar` 必须与 `wd-tabbar-item` 配合使用
   - `wd-tabbar-item` 必须作为 `wd-tabbar` 的直接子组件

2. **固定定位**：
   - 使用 `fixed` 属性时，建议同时设置 `safeAreaInsetBottom` 以适配 iPhone X 系列机型
   - 可以通过 `placeholder` 属性生成一个等高的占位元素，避免页面内容被遮挡

3. **性能优化**：
   - 避免在标签项中放置过多复杂组件
   - 对于自定义图标，建议使用适当大小的图片，避免过大影响加载性能

4. **样式覆盖**：
   - 组件使用 `styleIsolation: 'shared'`，支持外部样式覆盖
   - 可以通过 CSS 变量或自定义类名修改样式

5. **z-index 管理**：
   - 可以通过 `zIndex` 属性调整标签栏的层级
   - 确保标签栏的层级高于页面其他元素，避免被遮挡

6. **事件处理**：
   - 标签切换事件由 `wd-tabbar` 统一触发
   - 可以通过 `v-model` 实现双向绑定，也可以监听 `change` 事件处理切换逻辑

### 状态流转
- 初始状态：根据 `modelValue` 确定激活标签
- 标签点击：子组件 `wd-tabbar-item` 触发点击事件
- 状态更新：父组件 `wd-tabbar` 更新激活状态，触发 `change` 和 `update:modelValue` 事件
- 样式更新：所有子组件根据新的激活状态更新自身样式

## 与 wd-tabbar-item 的关系

`wd-tabbar` 组件与 `wd-tabbar-item` 组件是紧密集成的关系：

1. **依赖关系**：`wd-tabbar` 必须包含一个或多个 `wd-tabbar-item` 子组件
2. **通信方式**：通过 Vue 的 provide/inject API 进行通信
3. **状态管理**：激活状态由 `wd-tabbar` 统一管理，子组件根据激活状态更新样式
4. **事件处理**：子组件的点击事件通过父组件 `wd-tabbar` 统一触发
5. **样式继承**：子组件继承父组件的颜色、形状等样式配置

## 常见问题

### Q: 如何自定义标签项的图标？
A: 可以使用 `wd-tabbar-item` 的 `icon` 属性设置内置图标，或使用 `icon` 插槽自定义图标内容。

### Q: 如何在标签项上显示徽章？
A: 可以使用 `wd-tabbar-item` 的 `badge-props` 属性配置徽章，支持数字徽章和点状徽章。

### Q: 为什么标签栏固定在底部时，页面内容被遮挡？
A: 可以设置 `placeholder` 属性生成一个等高的占位元素，或在页面底部添加相应的 padding。

### Q: 如何适配 iPhone X 系列机型的底部安全区域？
A: 可以设置 `safeAreaInsetBottom` 属性，组件会自动添加底部安全距离。

### Q: 如何修改标签栏的高度？
A: 可以通过 CSS 变量 `--tabbar-height` 自定义标签栏的高度。
