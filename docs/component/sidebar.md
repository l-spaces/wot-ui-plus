# wd-sidebar 侧边栏

## 组件概述

侧边栏组件是一种常用的 UI 组件，用于在页面左侧或右侧提供导航选项。`wd-sidebar` 组件提供了一个容器，用于放置 `wd-sidebar-item` 子组件，支持单选、自定义样式、徽标等功能，适用于各种需要侧边导航的场景。

### 功能特性
- 支持单选模式
- 支持自定义样式
- 支持徽标显示
- 支持图标显示
- 支持禁用状态
- 支持切换前校验
- 支持自定义图标插槽

### 适用场景
- 后台管理系统的侧边导航
- 移动端应用的侧边菜单
- 多标签页切换
- 分类导航

## API 参考

### Props

#### wd-sidebar

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| modelValue | number/string | 0 | 否 | 当前导航项的索引 |
| beforeChange | function | - | 否 | 切换前的钩子函数，返回 false 可阻止切换 |

#### wd-sidebar-item

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| label | string | - | 是 | 当前选项标题 |
| value | number/string | - | 是 | 当前选项的值，唯一标识 |
| badge | string/number/null | null | 否 | 徽标显示值 |
| badgeProps | object | - | 否 | 徽标属性，透传给 Badge 组件 |
| icon | string | - | 否 | 图标名称 |
| isDot | boolean | false | 否 | 是否点状徽标 |
| max | number | 99 | 否 | 徽标最大值 |
| disabled | boolean | false | 否 | 是否禁用 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | 选中的值 |
| change | 选中值变化时触发 | { value: 选中的值, label: 选中项的标题 } |

### Slots

#### wd-sidebar

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| default | - | 用于放置 wd-sidebar-item 子组件 |

#### wd-sidebar-item

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| icon | - | 自定义图标插槽 |

### Methods

该组件没有对外暴露的方法。

## 使用示例

### 基础用法

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item :label="'选项1'" :value="1"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项2'" :value="2"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项3'" :value="3"></wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>
```

### 带徽标的侧边栏

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item :label="'选项1'" :value="1" :badge="5"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项2'" :value="2" :badge="100"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项3'" :value="3" :is-dot="true"></wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>
```

### 带图标的侧边栏

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item :label="'首页'" :value="1" icon="home"></wd-sidebar-item>
    <wd-sidebar-item :label="'分类'" :value="2" icon="category"></wd-sidebar-item>
    <wd-sidebar-item :label="'购物车'" :value="3" icon="cart"></wd-sidebar-item>
    <wd-sidebar-item :label="'我的'" :value="4" icon="user"></wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>
```

### 自定义图标

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item :label="'首页'" :value="1">
      <template #icon>
        <view class="custom-icon">🏠</view>
      </template>
    </wd-sidebar-item>
    <wd-sidebar-item :label="'分类'" :value="2">
      <template #icon>
        <view class="custom-icon">📚</view>
      </template>
    </wd-sidebar-item>
    <wd-sidebar-item :label="'购物车'" :value="3">
      <template #icon>
        <view class="custom-icon">🛒</view>
      </template>
    </wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.custom-icon {
  font-size: 20px;
  margin-right: 10px;
}
</style>
```

### 禁用状态

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item :label="'选项1'" :value="1"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项2'" :value="2" disabled></wd-sidebar-item>
    <wd-sidebar-item :label="'选项3'" :value="3"></wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>
```

### 切换前校验

```vue
<template>
  <wd-sidebar v-model="active" :before-change="beforeChange">
    <wd-sidebar-item :label="'选项1'" :value="1"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项2'" :value="2"></wd-sidebar-item>
    <wd-sidebar-item :label="'选项3'" :value="3"></wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)

const beforeChange = (option: { value: number | string, resolve: (pass: boolean) => void }) => {
  // 模拟异步校验
  uni.showModal({
    title: '提示',
    content: `确定要切换到选项${option.value}吗？`,
    success: (res) => {
      option.resolve(res.confirm)
    }
  })
}
</script>
```

## 样式定制

### 自定义根节点样式

使用 `customStyle` 属性可以自定义组件根节点的样式：

```vue
<wd-sidebar
  v-model="active"
  :custom-style="{ backgroundColor: '#f5f7fa', borderRadius: '8px' }"
>
  <wd-sidebar-item :label="'选项1'" :value="1"></wd-sidebar-item>
  <wd-sidebar-item :label="'选项2'" :value="2"></wd-sidebar-item>
</wd-sidebar>
```

### 自定义根节点类名

使用 `customClass` 属性可以自定义组件根节点的类名：

```vue
<wd-sidebar
  v-model="active"
  custom-class="my-sidebar"
>
  <wd-sidebar-item :label="'选项1'" :value="1"></wd-sidebar-item>
  <wd-sidebar-item :label="'选项2'" :value="2"></wd-sidebar-item>
</wd-sidebar>

<style scoped>
:deep(.my-sidebar) {
  background-color: '#f5f7fa';
  border-radius: '8px';
}
</style>
```

### 自定义侧边栏项样式

使用 `customStyle` 和 `customClass` 属性可以自定义侧边栏项的样式：

```vue
<wd-sidebar v-model="active">
  <wd-sidebar-item
    :label="'选项1'"
    :value="1"
    :custom-style="{ color: '#3c9cff', fontSize: '16px' }"
  ></wd-sidebar-item>
  <wd-sidebar-item
    :label="'选项2'"
    :value="2"
    custom-class="my-sidebar-item"
  ></wd-sidebar-item>
</wd-sidebar>

<style scoped>
:deep(.my-sidebar-item) {
  color: '#606266';
  fontSize: '14px';
}
</style>
```

## 注意事项

1. **父子组件关系**：`wd-sidebar-item` 必须作为 `wd-sidebar` 的直接子组件使用。

2. **唯一标识**：每个 `wd-sidebar-item` 必须设置唯一的 `value` 属性。

3. **徽标最大值**：徽标默认最大值为 99，超过则显示 "99+"，可通过 `max` 属性自定义。

4. **禁用状态**：设置 `disabled` 为 `true` 时，点击事件不会触发。

5. **切换前校验**：`beforeChange` 函数接收一个对象参数，包含 `value` 和 `resolve` 两个属性，通过调用 `resolve(true)` 或 `resolve(false)` 来决定是否允许切换。

6. **图标优先级**：当同时传入 `icon` 属性和 `icon` 插槽时，优先使用插槽内容。

7. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，可以直接覆盖组件内部样式。
