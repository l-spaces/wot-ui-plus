# wd-root-portal 根节点渲染组件

## 组件概述

wd-root-portal 是一个用于将组件内容渲染到页面根节点的组件，它解决了在 UniApp 中 fixed 定位在某些场景下失效的问题。组件基于 Vue 3 + TypeScript + UniApp 开发，支持跨平台使用，并针对不同平台采用了不同的实现方式。

### 功能特点

- 支持将组件内容渲染到页面根节点
- 解决 fixed 定位在某些场景下失效的问题
- 跨平台兼容（H5、微信小程序、支付宝小程序、App Plus）
- 针对不同平台采用最优实现方案
- 简单易用，只需包裹需要渲染到根节点的内容

### 适用场景

- 全局弹窗、全局提示等需要渲染到根节点的组件
- 解决 fixed 定位在 scroll-view、swiper 等组件内失效的问题
- 确保组件不受父容器样式影响
- 实现全屏覆盖层、全局加载提示等

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 需要渲染到根节点的内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-root-portal>
      <view class="global-popup">
        <view class="popup-content">
          <view class="popup-title">全局弹窗</view>
          <view class="popup-text">这是一个渲染到根节点的全局弹窗</view>
          <wd-button type="primary" size="small" @click="show = false">关闭</wd-button>
        </view>
      </view>
    </wd-root-portal>
    <wd-button type="primary" @click="show = true">显示全局弹窗</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss">
.global-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;
  
  .popup-content {
    text-align: center;
    
    .popup-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .popup-text {
      font-size: 14px;
      color: #606266;
      margin-bottom: 20px;
    }
  }
}
</style>
```

### 2. 解决 fixed 定位问题

```vue
<template>
  <view class="demo">
    <scroll-view scroll-y style="height: 500px; border: 1px solid #e4e7ed;">
      <view class="scroll-content" v-for="i in 20" :key="i">
        滚动内容 {{ i }}
      </view>
      <wd-root-portal>
        <view class="fixed-button" @click="handleClick">
          固定按钮（渲染到根节点）
        </view>
      </wd-root-portal>
      <view class="fixed-button without-portal" @click="handleClick">
        固定按钮（未渲染到根节点）
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('点击了固定按钮')
}
</script>

<style lang="scss">
.scroll-content {
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
}

.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #4D80F0;
  color: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(77, 128, 240, 0.3);
}

.without-portal {
  background-color: #E6A23C;
}
</style>
```

### 3. 全局加载提示

```vue
<template>
  <view class="demo">
    <wd-root-portal>
      <view v-if="loading" class="global-loading">
        <view class="loading-content">
          <wd-loading type="spinner" size="36px" color="#4D80F0" />
          <view class="loading-text">加载中...</view>
        </view>
      </view>
    </wd-root-portal>
    <wd-button type="primary" @click="showLoading">显示加载提示</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const showLoading = () => {
  loading.value = true
  // 模拟加载过程
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<style lang="scss">
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .loading-text {
      margin-top: 10px;
      font-size: 14px;
      color: white;
    }
  }
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-root-portal custom-class="custom-portal" :custom-style="{ zIndex: 10000 }">
      <view class="portal-content">
        <!-- 内容 -->
      </view>
    </wd-root-portal>
  </view>
</template>

<style lang="scss">
.custom-portal {
  // 自定义类样式
  .portal-content {
    // 内容样式
  }
}
</style>
```

## 注意事项

1. **平台兼容性**：
   - 组件支持 H5、微信小程序、支付宝小程序和 App Plus 平台
   - 钉钉小程序不支持 root-portal 组件，会直接渲染在当前位置
   - 在不同平台上采用不同的实现方式，确保最佳兼容性

2. **实现原理**：
   - H5：使用 Vue 3 的 teleport 组件
   - 微信小程序/支付宝小程序：使用 root-portal 组件
   - App Plus：使用 renderjs 将元素移动到根节点

3. **使用场景**：
   - 适用于需要渲染到根节点的组件
   - 解决 fixed 定位在 scroll-view、swiper 等组件内失效的问题
   - 实现全局弹窗、全局提示等

4. **性能考虑**：
   - 避免频繁创建和销毁 wd-root-portal 组件
   - 对于需要频繁显示/隐藏的内容，建议使用 v-if 控制内部内容，而不是销毁整个组件

5. **样式注意事项**：
   - 渲染到根节点后，组件样式不再受父容器样式影响
   - 建议为根节点渲染的组件设置较高的 z-index，避免被其他元素遮挡

6. **事件处理**：
   - 组件内容的事件处理与普通组件相同
   - 但由于渲染位置变化，事件冒泡行为可能与预期不同

7. **生命周期**：
   - 组件的生命周期与普通组件相同
   - 但在 App Plus 平台上，由于使用了 renderjs，生命周期可能略有差异
