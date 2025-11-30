# Tab 标签页

## 组件概述

Tab 是标签页组件的子组件，用于定义单个标签页的内容和配置。它必须与父组件 `wd-tabs` 配合使用，不能单独使用。Tab 组件支持懒加载、自定义标题、徽章等功能，适用于需要在多个内容区域之间切换的场景。

### 功能特点
- 与 `wd-tabs` 组件紧密集成，实现标签页切换功能
- 支持懒加载，仅在切换到该标签时才加载内容
- 支持自定义标题和徽章
- 支持禁用状态
- 支持动画过渡效果
- 支持粘性布局

### 适用场景
- 页面内容分类展示
- 表单分步填写
- 数据详情页切换
- 多标签页应用

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| name | number/string | - | 否 | 标签页的唯一标识符，用于 `v-model` 绑定 |
| title | string | - | 否 | 标签页的标题，显示在标签栏中 |
| disabled | boolean | false | 否 | 是否禁用该标签页，禁用后无法点击切换 |
| lazy | boolean | true | 否 | 是否懒加载，仅在切换到该标签时才加载内容 |
| badgeProps | object | - | 否 | 徽章属性，透传给 Badge 组件，用于在标签标题旁显示徽章 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

该组件不直接触发任何事件，事件由父组件 `wd-tabs` 统一管理。

### Methods

该组件未对外暴露任何方法，方法由父组件 `wd-tabs` 统一提供。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于定义标签页的内容 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-tabs v-model="activeName">
    <wd-tab title="标签一" name="tab1">
      <view class="tab-content">
        标签一内容
      </view>
    </wd-tab>
    <wd-tab title="标签二" name="tab2">
      <view class="tab-content">
        标签二内容
      </view>
    </wd-tab>
    <wd-tab title="标签三" name="tab3">
      <view class="tab-content">
        标签三内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('tab1')
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  min-height: 300rpx;
  background-color: #fff;
}
</style>
```

### 懒加载

```vue
<template>
  <wd-tabs v-model="activeIndex">
    <wd-tab title="立即加载" :lazy="false">
      <view class="tab-content">
        该标签内容会立即加载
      </view>
    </wd-tab>
    <wd-tab title="懒加载">
      <view class="tab-content">
        该标签内容会在首次切换到时加载
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref(0)
</script>
```

### 禁用标签

```vue
<template>
  <wd-tabs v-model="activeIndex">
    <wd-tab title="可点击标签">
      <view class="tab-content">
        可点击标签内容
      </view>
    </wd-tab>
    <wd-tab title="禁用标签" disabled>
      <view class="tab-content">
        禁用标签内容（无法直接访问）
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref(0)
</script>
```

### 带徽章的标签

```vue
<template>
  <wd-tabs v-model="activeIndex">
    <wd-tab title="消息" :badge-props="{ value: 5 }">
      <view class="tab-content">
        消息内容
      </view>
    </wd-tab>
    <wd-tab title="通知" :badge-props="{ dot: true }">
      <view class="tab-content">
        通知内容
      </view>
    </wd-tab>
    <wd-tab title="设置">
      <view class="tab-content">
        设置内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref(0)
</script>
```

### 带动画效果

```vue
<template>
  <wd-tabs v-model="activeIndex" animated>
    <wd-tab title="动画标签一">
      <view class="tab-content">
        动画标签一内容
      </view>
    </wd-tab>
    <wd-tab title="动画标签二">
      <view class="tab-content">
        动画标签二内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref(0)
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-tabs v-model="activeIndex">
  <wd-tab 
    title="自定义样式标签" 
    custom-class="my-tab" 
    :custom-style="{ backgroundColor: '#f0f0f0', borderRadius: '8rpx' }"
  >
    <view class="tab-content">
      自定义样式标签内容
    </view>
  </wd-tab>
</wd-tabs>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --tab-background-color | #ffffff | 标签背景色 |
| --tab-content-padding | 20rpx | 标签内容内边距 |
| --tab-inactive-opacity | 1 | 非激活标签透明度 |

## 注意事项

1. **父子组件关系**：
   - `wd-tab` 必须作为 `wd-tabs` 的直接子组件使用
   - 不要在 `wd-tab` 外部包裹其他组件，否则可能导致通信失败

2. **懒加载机制**：
   - 懒加载标签首次切换时会触发内容渲染
   - 一旦渲染完成，即使切换到其他标签，内容也会保持渲染状态
   - 可以通过设置 `lazy: false` 禁用懒加载

3. **name 属性**：
   - `name` 属性用于唯一标识标签页，建议使用字符串或数字类型
   - 避免使用相同的 `name` 值，否则会导致标签切换异常

4. **性能优化**：
   - 对于内容较多的标签页，建议启用懒加载
   - 避免在标签页中放置过多复杂组件，影响切换性能

5. **动画效果**：
   - 动画效果由父组件 `wd-tabs` 的 `animated` 属性控制
   - 启用动画可能会影响性能，特别是在内容复杂的情况下

6. **禁用状态**：
   - 禁用的标签页无法通过点击切换，但可以通过 `v-model` 强制切换
   - 禁用状态仅影响标签栏的点击行为，不影响标签内容的渲染


### 状态流转
- 初始状态：Tab 组件根据 `lazy` 属性决定是否渲染内容
- 父组件更新：`wd-tabs` 组件通过 provide 更新激活状态
- 子组件响应：Tab 组件根据激活状态更新自身显示状态
- 懒加载触发：首次激活时，懒加载的 Tab 组件渲染内容

## 与 wd-tabs 的关系

`wd-tab` 组件与 `wd-tabs` 组件是紧密集成的关系：

1. **依赖关系**：`wd-tab` 必须作为 `wd-tabs` 的子组件使用
2. **通信方式**：通过 Vue 的 provide/inject API 进行通信
3. **状态管理**：激活状态由 `wd-tabs` 统一管理
4. **事件处理**：点击事件由 `wd-tabs` 处理，然后通知对应的 `wd-tab` 组件
5. **样式继承**：部分样式由 `wd-tabs` 组件控制，如动画效果、颜色等

## 常见问题

### Q: 为什么 Tab 组件无法单独使用？
A: `wd-tab` 组件依赖父组件 `wd-tabs` 提供的上下文和状态管理，无法单独使用。

### Q: 如何自定义 Tab 标签栏的样式？
A: 标签栏的样式由父组件 `wd-tabs` 控制，可以通过 `wd-tabs` 的 props 和 CSS 变量进行自定义。

### Q: 懒加载的 Tab 组件内容为什么不更新？
A: 懒加载的 Tab 组件仅在首次激活时渲染内容，如果需要更新内容，可以使用 `key` 属性强制重新渲染。

### Q: 如何在 Tab 切换时执行特定逻辑？
A: 可以监听父组件 `wd-tabs` 的 `change` 事件，在事件处理函数中执行特定逻辑。

### Q: 为什么设置了 `name` 属性后，标签切换异常？
A: 请确保 `name` 属性的值是唯一的，并且与父组件 `wd-tabs` 的 `v-model` 值类型一致。
