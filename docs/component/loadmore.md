# wd-loadmore 加载更多组件

## 组件概述

wd-loadmore 是一个用于列表或长页面底部的加载状态指示器组件，用于在滚动加载更多数据时向用户提供清晰的状态反馈。该组件支持多种加载状态（加载中、加载失败、加载完成），并提供国际化支持和高度的自定义能力。

### 功能特点
- 支持三种加载状态：加载中、加载失败、加载完成
- 内置国际化支持，支持多语言切换
- 加载失败时可点击重新加载
- 支持自定义加载动画和文案
- 集成了 wd-loading、wd-divider 和 wd-icon 组件
- 支持自定义样式和类名

### 适用场景
- 列表滚动加载更多数据
- 长页面分段加载
- 分页数据加载状态显示
- 无限滚动列表
- 下拉刷新和上拉加载组合使用

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| state | string |  | 否 | 加载状态，可选值：'loading'（加载中）、'error'（加载失败）、'finished'（加载完成） |
| loadingText | string |  | 否 | 加载提示文案，默认使用国际化翻译 |
| finishedText | string |  | 否 | 全部加载完的提示文案，默认使用国际化翻译 |
| errorText | string |  | 否 | 加载失败的提示文案，默认使用国际化翻译 |
| loadingProps | object |  | 否 | 加载中 loading 组件的属性，参考 wd-loading 组件 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| reload | 加载失败状态下点击组件时触发 | 无 |

### Methods

该组件不对外暴露任何方法。

### Slots

该组件不提供任何插槽。

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <!-- 列表内容 -->
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    
    <!-- 加载更多组件 -->
    <wd-loadmore 
      :state="loadMoreState" 
      @reload="onReload" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 列表数据
const list = ref([
  { id: 1, content: '列表项 1' },
  { id: 2, content: '列表项 2' },
  // ... 更多列表项
])

// 加载状态
const loadMoreState = ref('loading') // 可选值：'loading' | 'error' | 'finished'

// 重新加载
const onReload = () => {
  loadMoreState.value = 'loading'
  // 执行重新加载逻辑
}
</script>

<style scoped>
.list-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}
</style>
```

### 2. 自定义文案

```vue
<template>
  <view>
    <!-- 列表内容 -->
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    
    <!-- 自定义文案 -->
    <wd-loadmore 
      :state="loadMoreState" 
      loading-text="正在加载中..." 
      finished-text="没有更多数据了" 
      error-text="加载失败" 
      @reload="onReload" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 列表数据
const list = ref([/* 列表数据 */])

// 加载状态
const loadMoreState = ref('loading')

// 重新加载
const onReload = () => {
  loadMoreState.value = 'loading'
  // 执行重新加载逻辑
}
</script>
```

### 3. 自定义加载动画

```vue
<template>
  <view>
    <!-- 列表内容 -->
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    
    <!-- 自定义加载动画 -->
    <wd-loadmore 
      :state="loadMoreState" 
      :loading-props="{
        type: 'outline',
        color: '#4D80F0',
        size: 24
      }" 
      @reload="onReload" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 列表数据
const list = ref([/* 列表数据 */])

// 加载状态
const loadMoreState = ref('loading')

// 重新加载
const onReload = () => {
  loadMoreState.value = 'loading'
  // 执行重新加载逻辑
}
</script>
```

### 4. 自定义样式

```vue
<template>
  <view>
    <!-- 列表内容 -->
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    
    <!-- 自定义样式 -->
    <wd-loadmore 
      :state="loadMoreState" 
      custom-style="padding: 30rpx 0;" 
      custom-class="my-loadmore" 
      @reload="onReload" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 列表数据
const list = ref([/* 列表数据 */])

// 加载状态
const loadMoreState = ref('loading')

// 重新加载
const onReload = () => {
  loadMoreState.value = 'loading'
  // 执行重新加载逻辑
}
</script>

<style scoped>
.my-loadmore {
  /* 自定义样式 */
  background-color: #f5f5f5;
  
  /* 自定义文字颜色 */
  .wd-loadmore__text {
    color: #666;
  }
  
  /* 自定义重试文字颜色 */
  .wd-loadmore__text.is-light {
    color: #4D80F0;
  }
}
</style>
```

### 5. 与滚动组件结合使用

```vue
<template>
  <view>
    <!-- 滚动容器 -->
    <scroll-view 
      scroll-y 
      :style="{ height: '600rpx' }" 
      @scrolltolower="onScrollToLower" 
    >
      <!-- 列表内容 -->
      <view v-for="item in list" :key="item.id" class="list-item">
        {{ item.content }}
      </view>
      
      <!-- 加载更多组件 -->
      <wd-loadmore 
        :state="loadMoreState" 
        @reload="onReload" 
      />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 列表数据
const list = ref([/* 初始列表数据 */])

// 加载状态
const loadMoreState = ref('')

// 滚动到底部触发
const onScrollToLower = () => {
  // 避免重复加载
  if (loadMoreState.value === 'loading' || loadMoreState.value === 'finished') {
    return
  }
  
  // 设置加载状态
  loadMoreState.value = 'loading'
  
  // 模拟加载数据
  setTimeout(() => {
    // 假设加载了新数据
    const newData = [/* 新数据 */]
    
    if (newData.length > 0) {
      // 添加新数据
      list.value.push(...newData)
      // 恢复默认状态
      loadMoreState.value = ''
    } else {
      // 没有更多数据
      loadMoreState.value = 'finished'
    }
  }, 1000)
}

// 重新加载
const onReload = () => {
  loadMoreState.value = 'loading'
  // 执行重新加载逻辑
}
</script>
```

## 样式定制指南

### 1. 使用 customStyle 和 customClass

通过 `customStyle` 和 `customClass` 可以自定义组件的根节点样式：

```vue
<wd-loadmore 
  :state="loadMoreState" 
  custom-style="padding: 20rpx;" 
  custom-class="my-loadmore" 
/>

<style>
.my-loadmore {
  /* 自定义样式 */
  background-color: #f0f0f0;
  /* 可以添加更多自定义样式 */
}
</style>
```

### 2. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-loadmore :state="loadMoreState" custom-class="my-loadmore" />

<style scoped>
.my-loadmore {
  /* 自定义文字颜色 */
  .wd-loadmore__text {
    color: #4D80F0;
    font-size: 28rpx;
  }
  
  /* 自定义重试文字样式 */
  .wd-loadmore__text.is-light {
    color: #07c160;
    text-decoration: underline;
  }
  
  /* 自定义刷新图标样式 */
  .wd-loadmore__refresh {
    color: #4D80F0;
    margin-left: 10rpx;
  }
  
  /* 自定义加载动画样式 */
  .wd-loadmore__loading {
    margin-right: 10rpx;
  }
}
</style>
```

### 3. 自定义加载动画

通过 `loadingProps` 属性可以自定义内置的加载动画：

```vue
<wd-loadmore 
  :state="loadMoreState" 
  :loading-props="{
    type: 'outline',
    color: '#4D80F0',
    size: 30
  }" 
/>
```

## 注意事项

### 1. 状态管理
- 确保正确管理 `state` 属性，避免状态不一致导致的显示问题
- 加载完成后应将 `state` 设置为 'finished'，避免重复触发加载
- 加载失败时应将 `state` 设置为 'error'，允许用户点击重试

### 2. 性能优化
- 避免在滚动过程中频繁更新 `state` 属性，影响性能
- 建议在数据加载完成后再更新 `state` 属性
- 对于大量数据的列表，建议结合虚拟列表使用，提升性能

### 3. 国际化支持
- 组件内置了国际化支持，默认使用中文
- 可以通过自定义文案覆盖默认的国际化翻译
- 支持通过 `useTranslate` 钩子函数扩展其他语言

### 4. 常见问题解决方案
- **问题**：加载更多组件不显示
  **解决方案**：检查 `state` 属性是否正确设置，确保组件处于可见区域

- **问题**：点击重试没有触发 reload 事件
  **解决方案**：确保 `state` 属性为 'error'，只有在加载失败状态下才会触发 reload 事件

- **问题**：自定义加载动画不生效
  **解决方案**：检查 `loadingProps` 属性是否正确设置，参考 wd-loading 组件的 API

### 5. 使用限制
- 该组件主要用于列表底部的加载状态显示，不建议用于其他场景
- 组件的点击重试功能仅在 `state` 为 'error' 时生效
- 自定义加载动画时，建议使用合适的大小，避免影响整体布局
