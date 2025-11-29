# Collapse 折叠面板

## 组件概述

Collapse 是一个用于展示可折叠内容的组件，支持多种模式，包括普通模式、手风琴模式和查看更多模式。它允许用户通过点击标题展开或折叠内容，适用于需要展示大量内容但希望节省空间的场景。

### 适用场景

- 常见问题解答（FAQ）页面
- 产品详情页的规格参数
- 设置页面的选项分组
- 长列表内容的折叠展示
- 查看更多/收起功能
- 手风琴式内容展示

## API 参考

### Props

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| model-value | String / Array / Boolean | - | 否 | 绑定值，普通模式下为数组，手风琴模式下为字符串，查看更多模式下为布尔值 |
| accordion | Boolean | false | 否 | 是否为手风琴模式，手风琴模式下只能同时展开一个面板 |
| viewmore | Boolean | false | 否 | 是否为查看更多模式 |
| use-more-slot | Boolean | false | 否 | 查看更多模式下是否使用自定义展开按钮插槽 |
| line-num | Number | 2 | 否 | 查看更多模式下，收起时的显示行数 |
| custom-more-slot-class | String | - | 否 | 查看更多模式下的插槽外部自定义样式类 |
| custom-style | String | - | 否 | 自定义根节点样式 |
| custom-class | String | - | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 面板展开或折叠时触发 | { value: String / Array / Boolean } - 当前展开的面板标识符或查看更多状态 |
| update:modelValue | 绑定值变化时触发 | value: String / Array / Boolean - 新的绑定值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| toggleAll | options: Boolean / Object | - | 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换；options 可以是对象，包含 expanded 和 skipDisabled 属性 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 面板内容插槽，用于放置 CollapseItem 组件或查看更多模式下的内容 |
| more | - | 查看更多模式下的自定义展开/收起按钮插槽，需设置 useMoreSlot 为 true |

## 使用示例

### 基础用法

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item title="标题一" name="1">
        <view class="content">内容一</view>
      </wd-collapse-item>
      <wd-collapse-item title="标题二" name="2">
        <view class="content">内容二</view>
      </wd-collapse-item>
      <wd-collapse-item title="标题三" name="3">
        <view class="content">内容三</view>
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

### 手风琴模式

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse v-model="activeName" accordion>
      <wd-collapse-item title="标题一" name="1">
        <view class="content">内容一</view>
      </wd-collapse-item>
      <wd-collapse-item title="标题二" name="2">
        <view class="content">内容二</view>
      </wd-collapse-item>
      <wd-collapse-item title="标题三" name="3">
        <view class="content">内容三</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('1')
</script>
```

### 查看更多模式

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse v-model="showAll" viewmore>
      <view class="long-content">
        这是一段很长的内容，当设置了 viewmore 为 true 时，会自动折叠显示，只显示指定行数的内容。点击查看更多按钮可以展开全部内容，再次点击可以收起。
        这是一段很长的内容，当设置了 viewmore 为 true 时，会自动折叠显示，只显示指定行数的内容。点击查看更多按钮可以展开全部内容，再次点击可以收起。
        这是一段很长的内容，当设置了 viewmore 为 true 时，会自动折叠显示，只显示指定行数的内容。点击查看更多按钮可以展开全部内容，再次点击可以收起。
      </view>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAll = ref(false)
</script>

<style scoped>
.long-content {
  line-height: 1.6;
}
</style>
```

### 自定义标题

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item name="1">
        <template #title>
          <view class="custom-title">
            <text class="title-text">自定义标题</text>
            <text class="title-badge">NEW</text>
            <wd-icon name="down" class="title-icon"></wd-icon>
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
}

.title-text {
  font-size: 16px;
  font-weight: bold;
}

.title-badge {
  font-size: 12px;
  background-color: #ff6b6b;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
}

.title-icon {
  font-size: 16px;
  color: #909399;
}
</style>
```

### 禁用某些面板

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item title="可展开面板" name="1">
        <view class="content">内容一</view>
      </wd-collapse-item>
      <wd-collapse-item title="禁用面板" name="2" disabled>
        <view class="content">内容二</view>
      </wd-collapse-item>
      <wd-collapse-item title="可展开面板" name="3">
        <view class="content">内容三</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>
```

## 样式定制

### 自定义根节点样式

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse 
      v-model="activeNames" 
      custom-class="my-collapse" 
      custom-style="background-color: #f5f7fa; padding: 10px; border-radius: 8px;"
    >
      <wd-collapse-item title="标题一" name="1">
        <view class="content">内容一</view>
      </wd-collapse-item>
      <wd-collapse-item title="标题二" name="2">
        <view class="content">内容二</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<style scoped>
.my-collapse {
  /* 自定义根节点样式 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义查看更多按钮

```vue
<template>
  <view class="collapse-demo">
    <wd-collapse 
      v-model="showAll" 
      viewmore 
      use-more-slot 
      custom-more-slot-class="my-more-button"
    >
      <view class="long-content">
        这是一段很长的内容，当设置了 viewmore 为 true 时，会自动折叠显示，只显示指定行数的内容。
      </view>
      <template #more>
        <view class="custom-more">
          <text>{{ showAll ? '收起' : '查看更多' }}</text>
          <wd-icon name="down" :class="{ 'rotate': showAll }"></wd-icon>
        </view>
      </template>
    </wd-collapse>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAll = ref(false)
</script>

<style scoped>
.my-more-button {
  /* 自定义查看更多按钮样式 */
  margin-top: 10px;
}

.custom-more {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4d80f0;
  font-size: 14px;
}

.rotate {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
</style>
```

## 注意事项

### 1. 不同模式下的绑定值类型

- **普通模式**：`model-value` 为数组类型，存储所有展开面板的 name
- **手风琴模式**：`model-value` 为字符串类型，存储当前展开面板的 name
- **查看更多模式**：`model-value` 为布尔类型，表示是否展开全部内容

### 2. 手风琴模式

- 手风琴模式下，同一时间只能展开一个面板
- 当点击已展开的面板时，会自动收起
- 手风琴模式下，`model-value` 只能是字符串类型

### 3. 查看更多模式

- 查看更多模式下，内容会根据 `line-num` 属性设置的行数进行折叠
- 支持自定义展开/收起按钮，通过 `use-more-slot` 和 `more` 插槽实现
- 查看更多模式下，`model-value` 只能是布尔类型

### 4. 性能优化

- 对于大量面板的场景，建议使用 `v-for` 动态生成
- 可以使用 `v-if` 或 `v-show` 控制面板的显示/隐藏
- 避免在面板内容中放置过于复杂的组件，影响展开/折叠性能

### 5. 嵌套使用

- 支持嵌套使用 Collapse 组件
- 嵌套时注意 `model-value` 的作用域，避免冲突
- 建议为每个嵌套的 Collapse 组件设置独立的 `model-value`

## 组件关系

Collapse 组件与 CollapseItem 组件配合使用：

- Collapse 作为容器组件，管理所有 CollapseItem 的展开/折叠状态
- CollapseItem 作为面板组件，展示单个可折叠面板
- 两者通过 provide/inject 进行通信
- Collapse 组件暴露 `toggleAll` 方法，用于批量控制面板状态
