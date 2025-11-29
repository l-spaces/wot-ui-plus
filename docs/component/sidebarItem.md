# wd-sidebar-item 侧边栏选项

## 组件概述

侧边栏选项组件是侧边栏组件的子组件，用于展示单个导航项。`wd-sidebar-item` 组件支持自定义标题、图标、徽标等，适用于配合 `wd-sidebar` 组件实现侧边导航功能。

### 功能特性
- 支持自定义标题
- 支持图标显示
- 支持徽标显示（数字徽标和点状徽标）
- 支持禁用状态
- 支持自定义样式
- 支持自定义图标插槽

### 适用场景
- 后台管理系统的侧边导航项
- 移动端应用的侧边菜单项
- 多标签页切换项
- 分类导航项

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| label | string | - | 是 | 当前选项标题 |
| value | number/string | - | 是 | 当前选项的值，唯一标识 |
| badge | string/number/null | null | 否 | 徽标显示值 |
| badgeProps | object | - | 否 | 徽标属性，透传给 Badge 组件 |
| icon | string | - | 否 | 图标名称 |
| isDot | boolean | undefined | 否 | 是否点状徽标 |
| max | number | 99 | 否 | 徽标最大值 |
| disabled | boolean | false | 否 | 是否禁用 |

### Events

该组件不直接触发事件，而是通过父组件 `wd-sidebar` 触发事件。

### Slots

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

### 带徽标的侧边栏选项

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

### 带图标的侧边栏选项

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

### 自定义徽标属性

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item 
      :label="'选项1'" 
      :value="1" 
      :badge="5" 
      :badge-props="{ color: '#07c160', size: 'small' }"
    ></wd-sidebar-item>
    <wd-sidebar-item 
      :label="'选项2'" 
      :value="2" 
      :badge="100" 
      :badge-props="{ color: '#ee0a24', max: 50 }"
    ></wd-sidebar-item>
  </wd-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>
```

## 样式定制

### 自定义根节点样式

使用 `customStyle` 属性可以自定义组件根节点的样式：

```vue
<wd-sidebar v-model="active">
  <wd-sidebar-item 
    :label="'选项1'" 
    :value="1"
    :custom-style="{ backgroundColor: '#f5f7fa', borderRadius: '8px' }"
  ></wd-sidebar-item>
  <wd-sidebar-item :label="'选项2'" :value="2"></wd-sidebar-item>
</wd-sidebar>
```

### 自定义根节点类名

使用 `customClass` 属性可以自定义组件根节点的类名：

```vue
<wd-sidebar v-model="active">
  <wd-sidebar-item 
    :label="'选项1'" 
    :value="1"
    custom-class="my-sidebar-item"
  ></wd-sidebar-item>
  <wd-sidebar-item :label="'选项2'" :value="2"></wd-sidebar-item>
</wd-sidebar>

<style scoped>
:deep(.my-sidebar-item) {
  background-color: '#f5f7fa';
  border-radius: '8px';
}
</style>
```

## 注意事项

1. **父子组件关系**：`wd-sidebar-item` 必须作为 `wd-sidebar` 的直接子组件使用。

2. **唯一标识**：每个 `wd-sidebar-item` 必须设置唯一的 `value` 属性。

3. **徽标最大值**：徽标默认最大值为 99，超过则显示 "99+"，可通过 `max` 属性自定义。

4. **禁用状态**：设置 `disabled` 为 `true` 时，点击事件不会触发。

5. **图标优先级**：当同时传入 `icon` 属性和 `icon` 插槽时，优先使用插槽内容。

6. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，可以直接覆盖组件内部样式。

7. **徽标属性**：`badgeProps` 属性可以传递所有 `wd-badge` 组件支持的属性。
