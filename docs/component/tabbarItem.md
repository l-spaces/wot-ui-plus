# Tabbar Item 标签栏项

## 组件概述

Tabbar Item 是标签栏组件的子组件，用于定义单个标签项的内容和配置。它必须与父组件 `wd-tabbar` 配合使用，用于显示标签的标题、图标和徽章等信息，是构建底部导航栏的核心元素。

### 功能特点
- 支持自定义标题和图标
- 支持徽章显示（数字徽章和点状徽章）
- 支持自定义图标和标题插槽
- 自动继承父组件的样式配置
- 支持激活状态的样式变化

### 适用场景
- 应用底部导航栏的单个标签项
- 功能模块切换的标签按钮
- 需要显示徽章提示的标签项
- 自定义图标和样式的标签项

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| title | string | - | 否 | 标签项的标题 |
| name | number/string | - | 否 | 标签项的唯一标识符，用于 `v-model` 绑定，未设置时使用索引值 |
| icon | string | - | 否 | 标签项的图标名称，使用内置图标库 |
| value | number/string/null | null | 否 | 徽章显示值，支持数字和字符串 |
| isDot | boolean | undefined | 否 | 是否显示点状徽章，优先级高于 `value` |
| max | number | 99 | 否 | 徽章最大值，超过该值显示为 `${max}+` |
| badgeProps | object | - | 否 | 徽章属性，透传给 Badge 组件，用于自定义徽章样式和行为 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

该组件不直接触发任何事件，点击事件由父组件 `wd-tabbar` 统一处理。

### Methods

该组件未对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| icon | { active: boolean } | 自定义图标插槽，active 表示当前标签是否激活 |
| default | - | 默认插槽，用于自定义标签项的整体内容 |

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

### 带徽章的标签项

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home-o" />
    <wd-tabbar-item title="消息" icon="message-o" :badge-props="{ value: 5 }" />
    <wd-tabbar-item title="通知" icon="bell-o" :badge-props="{ dot: true }" />
    <wd-tabbar-item title="我的" icon="user-o" :badge-props="{ value: 999, max: 99 }" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 自定义图标

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" name="home">
      <template #icon="{ active }">
        <image 
          :src="active ? homeActiveIcon : homeIcon" 
          style="width: 40rpx; height: 40rpx;" 
        />
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item title="分类" name="category">
      <template #icon="{ active }">
        <image 
          :src="active ? categoryActiveIcon : categoryIcon" 
          style="width: 40rpx; height: 40rpx;" 
        />
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

### 自定义标签项样式

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item 
      title="首页" 
      icon="home-o" 
      custom-class="my-tabbar-item" 
      custom-style="{ padding: '10rpx 0' }"
    />
    <wd-tabbar-item 
      title="分类" 
      icon="category-o" 
      custom-class="my-tabbar-item" 
    />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>
.my-tabbar-item {
  --tabbar-item-icon-size: 44rpx;
  --tabbar-item-font-size: 22rpx;
}
</style>
```

### 无图标标签项

```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" />
    <wd-tabbar-item title="分类" />
    <wd-tabbar-item title="购物车" />
    <wd-tabbar-item title="我的" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-tabbar-item 
  title="首页" 
  icon="home-o" 
  custom-class="my-tabbar-item" 
/>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --tabbar-item-font-size | 20rpx | 标签文字大小 |
| --tabbar-item-icon-size | 40rpx | 标签图标大小 |
| --tabbar-item-margin-bottom | 8rpx | 图标与文字之间的间距 |
| --tabbar-item-active-color | inherit | 激活状态颜色，继承自父组件 |
| --tabbar-item-inactive-color | inherit | 非激活状态颜色，继承自父组件 |
| --tabbar-item-background-color | transparent | 标签项背景色 |
| --tabbar-item-padding | 0 | 标签项内边距 |
| --tabbar-item-min-height | 100rpx | 标签项最小高度 |

## 注意事项

1. **父子组件关系**：
   - `wd-tabbar-item` 必须作为 `wd-tabbar` 的直接子组件使用
   - 不要在 `wd-tabbar-item` 外部包裹其他组件，否则可能导致通信失败

2. **name 属性**：
   - `name` 属性用于唯一标识标签项，建议使用字符串或数字类型
   - 未设置 `name` 时，会使用组件在父组件中的索引作为默认值
   - 避免使用相同的 `name` 值，否则会导致标签切换异常

3. **图标配置**：
   - 可以使用 `icon` 属性设置内置图标
   - 也可以使用 `icon` 插槽自定义图标内容
   - 自定义图标时，建议保持图标大小一致，以确保视觉效果

4. **徽章配置**：
   - 徽章属性可以通过 `value`、`isDot`、`max` 直接设置
   - 也可以通过 `badgeProps` 对象进行更详细的配置
   - `isDot` 属性优先级高于 `value` 属性

5. **样式继承**：
   - 激活和非激活颜色默认继承自父组件 `wd-tabbar` 的配置
   - 可以通过自定义样式覆盖继承的颜色

6. **性能优化**：
   - 避免在标签项中放置过多复杂组件
   - 对于自定义图标，建议使用适当大小的图片，避免过大影响加载性能

### 状态流转
- 初始状态：根据父组件的 `modelValue` 和自身 `name` 计算激活状态
- 父组件更新：`wd-tabbar` 组件通过 provide 更新激活状态
- 子组件响应：Tabbar Item 组件根据新的激活状态更新自身样式
- 点击事件：点击标签项时，通知父组件切换激活状态

## 与 wd-tabbar 的关系

`wd-tabbar-item` 组件与 `wd-tabbar` 组件是紧密集成的关系：

1. **依赖关系**：`wd-tabbar-item` 必须作为 `wd-tabbar` 的子组件使用
2. **通信方式**：通过 Vue 的 provide/inject API 进行通信
3. **状态管理**：激活状态由 `wd-tabbar` 统一管理
4. **事件处理**：点击事件由 `wd-tabbar-item` 触发，通过父组件 `wd-tabbar` 统一处理
5. **样式继承**：颜色、字体大小等样式配置从父组件继承

## 常见问题

### Q: 为什么标签项没有显示？
A: 请确保 `wd-tabbar-item` 是 `wd-tabbar` 的直接子组件，并且父组件已经正确配置。

### Q: 如何自定义标签项的激活颜色？
A: 可以通过父组件 `wd-tabbar` 的 `activeColor` 属性设置，或者通过 CSS 变量 `--tabbar-item-active-color` 单独设置。

### Q: 徽章为什么没有显示？
A: 请检查 `value` 或 `isDot` 属性是否正确设置，并且 `value` 值不为 0 或空字符串。

### Q: 如何自定义徽章的样式？
A: 可以通过 `badgeProps` 属性配置徽章的样式，例如颜色、大小等。

### Q: 为什么点击标签项没有反应？
A: 请检查父组件 `wd-tabbar` 是否正确绑定了 `v-model`，以及标签项的 `name` 属性是否正确设置。
