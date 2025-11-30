# CollapseItem 折叠面板项

## 组件概述

CollapseItem 是 Collapse 组件的子组件，用于定义单个可折叠面板的内容和行为。它支持自定义标题、内容、禁用状态和展开/折叠动画，适用于与 Collapse 组件配合使用，构建各种折叠面板效果。

### 适用场景

- 与 Collapse 组件配合使用，构建折叠面板
- 常见问题解答（FAQ）中的单个问题项
- 产品详情页的单个规格参数项
- 设置页面的单个选项分组
- 手风琴式内容展示中的单个面板

## API 参考

### Props

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| name | String | - | 是 | 折叠栏的标识符，用于唯一标识当前面板 |
| title | String | - | 否 | 折叠栏的标题，可通过 slot 传递自定义内容 |
| disabled | Boolean | false | 否 | 是否禁用当前折叠栏 |
| before-expend | Function | - | 否 | 打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise |
| custom-body-class | String | - | 否 | 自定义折叠栏内容容器样式类名 |
| custom-body-style | String | - | 否 | 自定义折叠栏内容容器样式 |
| custom-style | String | - | 否 | 自定义根节点样式 |
| custom-class | String | - | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| - | - | - | 该组件未定义任何事件 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| getExpanded | - | Boolean | 获取当前面板的展开状态 |
| updateExpand | - | Promise<void> | 更新当前面板的展开状态 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 折叠面板的内容插槽 |
| title | { expanded: Boolean, disabled: Boolean, isFirst: Boolean } | 折叠面板的标题插槽，可自定义标题内容和样式 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item title="标题一" name="1">
        <view class="content">内容一</view>
      </wd-collapse-item>
      <wd-collapse-item title="标题二" name="2">
        <view class="content">内容二</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
```

### 自定义标题

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item name="1">
        <template #title="{ expanded, disabled }">
          <view class="custom-title">
            <text class="title-text">自定义标题</text>
            <text class="title-status">{{ expanded ? '已展开' : '已收起' }}</text>
            <wd-icon name="down" :class="{ 'rotate': expanded }"></wd-icon>
          </view>
        </template>
        <view class="content">自定义标题的内容</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
}

.title-status {
  font-size: 14px;
  color: #909399;
  margin: 0 10px;
}

.rotate {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
</style>
```

### 禁用面板

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item title="可展开面板" name="1">
        <view class="content">内容一</view>
      </wd-collapse-item>
      <wd-collapse-item title="禁用面板" name="2" disabled>
        <view class="content">内容二</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>
```

### 自定义内容样式

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item 
        title="自定义内容样式" 
        name="1" 
        custom-body-class="my-content" 
        custom-body-style="background-color: #e8f5e8; border-radius: 8px;"
      >
        <view class="content">
          <text class="content-title">自定义内容</text>
          <text class="content-text">这是一段自定义样式的内容，背景色为浅绿色，带有圆角。</text>
        </view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.my-content {
  /* 自定义内容容器样式 */
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
  flex-direction: column;
}

.content-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #4d80f0;
}

.content-text {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}
</style>
```

### 展开前回调

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item 
        title="带展开前回调的面板" 
        name="1" 
        :before-expend="handleBeforeExpand"
      >
        <view class="content">需要验证后才能展开的内容</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])

// 展开前回调函数
const handleBeforeExpand = (name: string) => {
  console.log('准备展开面板:', name)
  // 这里可以进行验证逻辑，比如检查用户权限
  // 返回 false 可以阻止展开
  // return false
  
  // 支持返回 Promise
  return new Promise((resolve) => {
    // 模拟异步验证
    setTimeout(() => {
      console.log('验证通过，允许展开')
      resolve(true)
    }, 1000)
  })
}
</script>
```

## 样式定制

### 自定义根节点样式

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item 
        title="自定义根节点样式" 
        name="1" 
        custom-class="my-collapse-item" 
        custom-style="margin: 10px 0; border-radius: 8px; overflow: hidden;"
      >
        <view class="content">自定义根节点样式的内容</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<style scoped>
.my-collapse-item {
  /* 自定义根节点样式 */
  background-color: #f5f7fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义标题和内容样式

```vue
<template>
  <view class="collapse-item-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item 
        name="1" 
        custom-body-class="my-content" 
        custom-body-style="padding: 20px;"
      >
        <template #title>
          <view class="custom-title">
            <text class="title-text">自定义样式面板</text>
            <wd-icon name="down" class="title-icon"></wd-icon>
          </view>
        </template>
        <view class="content">
          <text class="content-text">这是一个完全自定义样式的折叠面板，包括标题和内容。</text>
        </view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #4d80f0;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.title-icon {
  color: white;
  font-size: 18px;
}

.my-content {
  background-color: #f0f9eb;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.content-text {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}
</style>
```

## 注意事项

### 1. 与 Collapse 组件配合使用

- CollapseItem 必须作为 Collapse 组件的直接子元素使用
- 每个 CollapseItem 必须设置唯一的 `name` 属性
- 面板的展开/折叠状态由父 Collapse 组件的 `model-value` 控制

### 2. 自定义标题

- 可以通过 `title` 属性设置简单的文本标题
- 对于复杂的标题，可以使用 `title` 插槽自定义
- `title` 插槽提供了 `expanded`、`disabled` 和 `isFirst` 作用域变量

### 3. 禁用状态

- 设置 `disabled` 为 `true` 可以禁用面板的展开/折叠功能
- 禁用状态下面板的标题会显示为灰色，无法点击
- 禁用状态下面板的内容不会展开

### 4. 展开前回调

- `before-expend` 回调函数在面板展开前触发
- 返回 `false` 可以阻止面板展开
- 支持返回 Promise，用于异步验证场景
- 异步验证失败时，面板不会展开

### 5. 性能优化

- 避免在面板内容中放置过于复杂的组件
- 对于大量面板的场景，建议使用 `v-for` 动态生成
- 可以使用 `v-if` 或 `v-show` 控制面板的显示/隐藏

### 6. 嵌套使用

- 支持嵌套使用 CollapseItem 组件
- 嵌套时注意 `name` 属性的唯一性
- 建议为嵌套面板设置独立的 `name` 命名规则

## 组件关系

CollapseItem 组件与 Collapse 组件配合使用：

- Collapse 作为容器组件，管理所有 CollapseItem 的展开/折叠状态
- CollapseItem 作为面板组件，展示单个可折叠面板
- 两者通过 provide/inject 进行通信
- CollapseItem 组件暴露 `getExpanded` 和 `updateExpand` 方法，用于获取和更新面板状态