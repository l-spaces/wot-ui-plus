# wd-resize 尺寸监听组件

## 组件概述

wd-resize 是一个用于监听元素尺寸变化的组件，它通过独特的实现方式，可以检测到插槽内容的尺寸变化，并触发 resize 事件。组件基于 Vue 3 + TypeScript + UniApp 开发，支持跨平台使用。

### 功能特点

- 自动监听插槽内容的尺寸变化
- 支持高度和宽度的变化监听
- 触发 resize 事件，返回详细的尺寸信息
- 支持自定义样式和类名
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 监听动态内容的尺寸变化
- 自适应容器大小
- 响应式布局
- 图表、列表等动态内容的尺寸适配
- 任何需要实时获取元素尺寸的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customContainerClass | string | '' | 否 | 自定义容器类名 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| resize | 插槽内容尺寸变化时 | { bottom: 底部位置, top: 顶部位置, left: 左侧位置, right: 右侧位置, height: 高度, width: 宽度 } |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 需要监听尺寸变化的内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-resize @resize="onResize">
      <view class="dynamic-content" :style="{ height: contentHeight + 'px' }">
        <view class="content-item" v-for="i in count" :key="i">内容项 {{ i }}</view>
      </view>
    </wd-resize>
    <view class="button-group">
      <wd-button type="primary" size="small" @click="increase">增加内容</wd-button>
      <wd-button type="danger" size="small" @click="decrease">减少内容</wd-button>
    </view>
    <view class="size-info">
      当前尺寸：{{ size.width }}px × {{ size.height }}px
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(5)
const contentHeight = ref(200)
const size = ref({ width: 0, height: 0 })

const increase = () => {
  count.value++
  contentHeight.value += 40
}

const decrease = () => {
  if (count.value > 1) {
    count.value--
    contentHeight.value -= 40
  }
}

const onResize = (res) => {
  size.value = { width: res.width, height: res.height }
  console.log('尺寸变化：', res)
}
</script>

<style lang="scss">
.dynamic-content {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  
  .content-item {
    height: 40px;
    line-height: 40px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.size-info {
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 2. 监听图表尺寸变化

```vue
<template>
  <view class="demo">
    <wd-resize @resize="onChartResize">
      <view class="chart-container">
        <!-- 这里可以放置图表组件 -->
        <view class="chart-placeholder" :style="chartStyle">
          <text>图表区域</text>
        </view>
      </view>
    </wd-resize>
    <view class="size-info">
      图表尺寸：{{ chartSize.width }}px × {{ chartSize.height }}px
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const chartSize = ref({ width: 0, height: 0 })
const chartStyle = ref({})

const onChartResize = (res) => {
  chartSize.value = { width: res.width, height: res.height }
  // 根据新的尺寸更新图表
  updateChartSize(res.width, res.height)
}

const updateChartSize = (width, height) => {
  // 这里可以调用图表库的 resize 方法
  chartStyle.value = { 
    width: width + 'px', 
    height: height + 'px',
    backgroundColor: '#4D80F0',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px'
  }
}
</script>

<style lang="scss">
.chart-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.size-info {
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 3. 自定义样式

```vue
<template>
  <view class="demo">
    <wd-resize 
      @resize="onResize" 
      custom-class="my-resize"
      :custom-style="{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }"
      custom-container-class="my-container"
    >
      <view class="dynamic-content" :style="{ height: contentHeight + 'px' }">
        <view class="content-item" v-for="i in count" :key="i">内容项 {{ i }}</view>
      </view>
    </wd-resize>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(3)
const contentHeight = ref(120)

const onResize = (res) => {
  console.log('尺寸变化：', res)
}
</script>

<style lang="scss">
.my-resize {
  // 自定义 resize 组件样式
  margin: 20px;
}

.my-container {
  // 自定义容器样式
  border: 2px dashed #4D80F0;
}

.dynamic-content {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  
  .content-item {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    background-color: #f5f7fa;
    border-radius: 4px;
    text-align: center;
  }
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-resize 
      @resize="onResize"
      custom-class="custom-resize"
      :custom-style="{ border: '1px solid #e4e7ed', borderRadius: '4px' }"
    >
      <!-- 内容 -->
    </wd-resize>
  </view>
</template>

<style lang="scss">
.custom-resize {
  // 自定义类样式
  margin: 10px;
  padding: 10px;
  
  .wd-resize__container {
    // 自定义容器样式
    background-color: #fafafa;
  }
}
</style>
```

### 2. 自定义容器类名

```vue
<template>
  <view class="demo">
    <wd-resize 
      @resize="onResize"
      custom-container-class="my-custom-container"
    >
      <!-- 内容 -->
    </wd-resize>
  </view>
</template>

<style lang="scss">
.my-custom-container {
  // 自定义容器样式
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}
</style>
```

## 注意事项

1. **组件原理**：
   - 组件通过两个 scroll-view 来检测插槽内容的尺寸变化
   - 当插槽内容尺寸变化时，scroll-view 会触发 scroll 事件，组件通过监听该事件来获取新的尺寸

2. **使用场景**：
   - 适用于需要监听动态内容尺寸变化的场景
   - 不适用于静态内容或尺寸固定的内容

3. **性能考虑**：
   - 组件会在尺寸变化时触发 resize 事件，避免在事件处理函数中执行复杂的计算
   - 对于频繁变化的内容，建议使用防抖或节流来优化性能

4. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 在某些平台上，scroll-view 的 scroll 事件触发时机可能略有差异

5. **样式注意事项**：
   - 插槽内容需要脱离父容器文档流，防止父容器固宽固高导致插槽大小被限制
   - 可以通过 customContainerClass 来自定义容器样式

6. **尺寸获取时机**：
   - resize 事件会在组件挂载后立即触发一次，获取初始尺寸
   - 之后每当插槽内容尺寸变化时，都会触发 resize 事件

7. **返回值说明**：
   - resize 事件返回的对象包含 bottom、top、left、right、height、width 六个属性
   - 其中 height 和 width 是最常用的尺寸信息
