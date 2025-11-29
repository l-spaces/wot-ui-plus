# wd-pagination 分页组件

## 组件概述

wd-pagination 是一个功能完整的分页组件，用于在列表或表格等场景中展示数据分页，并支持用户进行页码切换操作。该组件设计简洁，可根据需求自定义样式、显示方式和交互行为，适用于各种需要分页展示数据的场景。

### 功能特点
- 支持自定义总页数或通过总条数和每页条数自动计算总页数
- 支持显示/隐藏图标样式
- 支持显示总条数信息
- 支持自定义上一页/下一页文本
- 支持单页时隐藏分页控件
- 支持自定义样式和类名

### 适用场景
- 列表数据分页展示
- 表格数据分页
- 长列表加载更多
- 任何需要分页导航的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number |  | 是 | 当前页 |
| totalPage | number | 1 | 否 | 总页数，如果有total，则优先使用total计算页数 |
| showIcon | boolean | false | 否 | 是否展示分页为Icon图标 |
| showMessage | boolean | false | 否 | 是否展示总条数 |
| total | number | 0 | 否 | 总条数 |
| pageSize | number | 10 | 否 | 每页条数 |
| prevText | string |  | 否 | 上一页文本 |
| nextText | string |  | 否 | 下一页文本 |
| hideIfOnePage | boolean | true | 否 | 总页数只有一页时是否隐藏 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 页码改变时触发 | { value: 当前页码 } |
| update:modelValue | 页码改变时触发 | 当前页码 |

### Methods

该组件不对外暴露任何方法。

### Slots

该组件不提供任何插槽。

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <!-- 基础分页组件 -->
    <wd-pagination 
      v-model="currentPage" 
      :total="total" 
      :page-size="pageSize"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 当前页码
const currentPage = ref(1)
// 总条数
const total = ref(100)
// 每页条数
const pageSize = ref(10)
</script>
```

### 2. 自定义前后文本

```vue
<template>
  <view>
    <!-- 自定义前后文本的分页组件 -->
    <wd-pagination 
      v-model="currentPage" 
      :total="total" 
      :page-size="pageSize"
      prev-text="上一页"
      next-text="下一页"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
const total = ref(100)
const pageSize = ref(10)
</script>
```

### 3. 显示总条数

```vue
<template>
  <view>
    <!-- 显示总条数的分页组件 -->
    <wd-pagination 
      v-model="currentPage" 
      :total="total" 
      :page-size="pageSize"
      show-message
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
const total = ref(100)
const pageSize = ref(10)
</script>
```

### 4. 显示图标样式

```vue
<template>
  <view>
    <!-- 显示图标样式的分页组件 -->
    <wd-pagination 
      v-model="currentPage" 
      :total="total" 
      :page-size="pageSize"
      show-icon
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
const total = ref(100)
const pageSize = ref(10)
</script>
```

### 5. 自定义样式

```vue
<template>
  <view>
    <!-- 自定义样式的分页组件 -->
    <wd-pagination 
      v-model="currentPage" 
      :total="total" 
      :page-size="pageSize"
      custom-style="background-color: #f5f5f5; padding: 10rpx; border-radius: 8rpx;"
      custom-class="custom-pagination"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
const total = ref(100)
const pageSize = ref(10)
</script>

<style scoped>
.custom-pagination {
  /* 自定义分页组件样式 */
  :deep(.wd-pager__nav) {
    margin: 0 5rpx;
  }
  
  :deep(.wd-pager__size) {
    margin: 0 10rpx;
  }
}
</style>
```

## 样式定制指南

### 1. 使用 customStyle 和 customClass

组件支持通过 `customStyle` 和 `customClass` 属性进行样式定制：

```vue
<wd-pagination 
  v-model="currentPage" 
  :total="total" 
  custom-style="background-color: rgba(0, 0, 0, 0.05);" 
  custom-class="my-pagination"
/>

<style>
.my-pagination {
  /* 自定义样式 */
  border-radius: 8rpx;
  padding: 10rpx;
}
</style>
```

### 2. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-pagination 
  v-model="currentPage" 
  :total="total" 
  custom-class="custom-pagination"
/>

<style scoped>
.custom-pagination {
  /* 自定义页码样式 */
  :deep(.wd-pager__size) {
    color: #4D80F0;
    font-weight: 500;
  }
  
  /* 自定义按钮样式 */
  :deep(.wd-pager__nav) {
    border-radius: 4rpx;
  }
  
  /* 自定义激活状态样式 */
  :deep(.wd-pager__nav--active) {
    color: #4D80F0;
  }
  
  /* 自定义禁用状态样式 */
  :deep(.wd-pager__nav--disabled) {
    opacity: 0.5;
  }
}
</style>
```

## 注意事项

### 1. 总页数计算
- 组件优先使用 `total` 和 `pageSize` 计算总页数
- 如果提供了 `totalPage`，则优先使用 `totalPage` 作为总页数
- 总页数计算逻辑：`Math.ceil(total / pageSize)`

### 2. 单页隐藏
- 当 `hideIfOnePage` 为 `true` 且总页数为 1 时，组件会自动隐藏
- 可以设置 `hideIfOnePage` 为 `false` 强制显示

### 3. 事件处理
- 页码改变时会触发 `change` 事件，返回包含当前页码的对象
- 同时会触发 `update:modelValue` 事件，用于 v-model 双向绑定

### 4. 性能优化
- 组件内部使用了 watch 监听 total 和 totalPage 的变化，自动更新总页数
- 当总页数为 1 且 `hideIfOnePage` 为 `true` 时，组件不会渲染，减少 DOM 节点

### 5. 国际化支持
- 组件内置了国际化支持，默认使用中文
- 可以通过 `prevText` 和 `nextText` 自定义前后文本

### 6. 常见问题解决方案
- **问题**：总页数计算错误
  **解决方案**：检查 `total` 和 `pageSize` 是否正确设置，或直接设置 `totalPage`

- **问题**：页码不更新
  **解决方案**：确保使用 v-model 绑定当前页码，或监听 `update:modelValue` 事件手动更新

- **问题**：组件不显示
  **解决方案**：检查总页数是否为 1 且 `hideIfOnePage` 为 `true`，如果是则组件会自动隐藏
