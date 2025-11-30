# wd-skeleton 骨架屏

## 组件概述

骨架屏组件是一种常用的 UI 组件，用于在内容加载过程中显示占位符，提升用户体验。`wd-skeleton` 组件提供了多种主题样式、动画效果和自定义配置，适用于各种需要加载状态的场景。

### 功能特性
- 支持多种主题样式（文本、头像、段落、图片）
- 支持自定义行列布局
- 支持两种动画效果（渐变、闪烁）
- 支持自定义尺寸、宽度、高度、间距等
- 支持自定义背景色和边框半径
- 支持条件显示（根据 loading 状态切换骨架屏和实际内容）

### 适用场景
- 列表数据加载
- 详情页内容加载
- 表单数据加载
- 图片加载占位
- 卡片内容加载

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| theme | string | 'text' | 否 | 骨架图风格，可选值：'text'、'avatar'、'paragraph'、'image' |
| rowCol | array | - | 否 | 用于设置行列数量、宽度高度、间距等。支持数字、对象或对象数组 |
| loading | boolean | true | 否 | 是否为加载状态，如果是则显示骨架图，如果不是则显示加载完成的内容 |
| animation | string | '' | 否 | 动画效果，可选值：'gradient'（渐变加载动画）、'flashed'（闪烁加载动画），值为空则表示没有动画 |
| customClass | string/array/object | '' | 否 | 自定义根节点样式类 |
| customStyle | object | {} | 否 | 自定义根节点样式 |

### Events

该组件不触发任何事件。

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| default | - | 加载完成后显示的内容 |

### Methods

该组件没有对外暴露的方法。

## 使用示例

### 基础用法

```vue
<template>
  <wd-skeleton :loading="loading">
    <view class="content">
      <view class="title">这是标题</view>
      <view class="text">这是内容文本，加载完成后显示。</view>
    </view>
  </wd-skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)

// 模拟数据加载
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<style scoped>
.content {
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
  color: #606266;
}
</style>
```

### 不同主题

```vue
<template>
  <view class="skeleton-container">
    <view class="skeleton-item">
      <text class="skeleton-title">文本主题</text>
      <wd-skeleton theme="text" :loading="loading"></wd-skeleton>
    </view>
    <view class="skeleton-item">
      <text class="skeleton-title">头像主题</text>
      <wd-skeleton theme="avatar" :loading="loading"></wd-skeleton>
    </view>
    <view class="skeleton-item">
      <text class="skeleton-title">段落主题</text>
      <wd-skeleton theme="paragraph" :loading="loading"></wd-skeleton>
    </view>
    <view class="skeleton-item">
      <text class="skeleton-title">图片主题</text>
      <wd-skeleton theme="image" :loading="loading"></wd-skeleton>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.skeleton-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.skeleton-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
```

### 自定义行列布局

```vue
<template>
  <wd-skeleton :row-col="rowCol" :loading="loading">
    <view class="content">
      <view class="title">自定义行列布局</view>
      <view class="text">加载完成后显示的内容。</view>
    </view>
  </wd-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

// 自定义行列布局
const rowCol = ref([
  // 第一行：1列圆形
  { type: 'circle', size: '60px', marginBottom: '10px' },
  // 第二行：1列文本
  1,
  // 第三行：2列文本，分别设置宽度和间距
  [
    { width: '30%', height: '16px', marginRight: '10px' },
    { width: '60%', height: '16px' }
  ],
  // 第四行：1列文本，设置宽度
  { width: '70%' }
])
</script>

<style scoped>
.content {
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
  color: #606266;
}
</style>
```

### 动画效果

```vue
<template>
  <view class="skeleton-container">
    <view class="skeleton-item">
      <text class="skeleton-title">渐变动画</text>
      <wd-skeleton theme="paragraph" animation="gradient" :loading="loading"></wd-skeleton>
    </view>
    <view class="skeleton-item">
      <text class="skeleton-title">闪烁动画</text>
      <wd-skeleton theme="paragraph" animation="flashed" :loading="loading"></wd-skeleton>
    </view>
    <view class="skeleton-item">
      <text class="skeleton-title">无动画</text>
      <wd-skeleton theme="paragraph" animation="" :loading="loading"></wd-skeleton>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.skeleton-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.skeleton-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
```

### 自定义样式

```vue
<template>
  <wd-skeleton
    theme="paragraph"
    :loading="loading"
    :custom-style="{ backgroundColor: '#f5f7fa', padding: '20px', borderRadius: '8px' }"
    custom-class="my-skeleton"
  >
    <view class="content">
      <view class="title">自定义样式</view>
      <view class="text">加载完成后显示的内容。</view>
    </view>
  </wd-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>
.content {
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
  color: #606266;
}

:deep(.my-skeleton .wd-skeleton__col) {
  background-color: #e4e7ed;
  border-radius: 4px;
}
</style>
```

## 样式定制

### 自定义根节点样式

使用 `customStyle` 属性可以自定义组件根节点的样式：

```vue
<wd-skeleton
  theme="paragraph"
  :loading="loading"
  :custom-style="{ backgroundColor: '#f5f7fa', padding: '20px', borderRadius: '8px' }"
>
  <!-- 内容 -->
</wd-skeleton>
```

### 自定义根节点类名

使用 `customClass` 属性可以自定义组件根节点的类名：

```vue
<wd-skeleton
  theme="paragraph"
  :loading="loading"
  custom-class="my-skeleton"
>
  <!-- 内容 -->
</wd-skeleton>

<style scoped>
:deep(.my-skeleton) {
  background-color: '#f5f7fa';
  padding: '20px';
  borderRadius: '8px';
}

:deep(.my-skeleton .wd-skeleton__col) {
  background-color: '#e4e7ed';
  border-radius: '4px';
}
</style>
```

## 注意事项

1. **主题配置**：组件提供了4种预设主题（text、avatar、paragraph、image），可以根据需求选择合适的主题。

2. **行列配置**：`rowCol` 属性支持多种配置方式：
   - 数字：表示一行一列
   - 对象：表示一行一列，并可以设置宽度、高度、类型等
   - 对象数组：表示一行多列，每列可以单独设置样式

3. **动画效果**：支持两种动画效果（gradient、flashed），可以根据设计需求选择合适的动画。

4. **加载状态**：通过 `loading` 属性控制骨架屏的显示和隐藏，当 `loading` 为 `false` 时，显示插槽内容。

5. **性能优化**：骨架屏组件本身性能开销较小，但建议在数据加载完成后及时将 `loading` 设置为 `false`，避免不必要的渲染。

6. **自定义样式**：可以通过 `customStyle` 和 `customClass` 属性自定义组件样式，也可以通过深度选择器 `:deep()` 覆盖组件内部样式。

7. **响应式设计**：骨架屏组件会自动适应父容器的宽度，可以根据需要设置固定宽度或百分比宽度。
