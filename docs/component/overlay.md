# wd-overlay 遮罩层组件

## 组件概述

wd-overlay 是一个轻量级的遮罩层组件，用于覆盖在页面或元素之上，提供视觉隔离和交互控制。该组件设计灵活，可根据需求自定义显示/隐藏动画、锁定滚动、层级等属性，适用于各种需要遮罩效果的场景。

### 功能特点
- 支持显示/隐藏动画效果
- 支持自定义动画时长
- 支持锁定页面滚动
- 支持自定义层级
- 支持点击事件回调
- 支持自定义样式和类名
- 支持插槽内容自定义
- 跨端兼容，适配多种平台

### 适用场景
- 模态框和弹窗的背景遮罩
- 下拉菜单和弹出层的背景遮罩
- 加载状态的全屏遮罩
- 引导页和新手教程的遮罩
- 防止用户误操作的遮罩

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| show | boolean | false | 否 | 是否展示遮罩层 |
| duration | number / object / boolean | 300 | 否 | 动画时长，单位毫秒，支持传入对象分别设置进入和离开动画时长，如 { enter: 300, leave: 500 } |
| lockScroll | boolean | true | 否 | 是否锁定滚动 |
| zIndex | number | 10 | 否 | 层级 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'background-color: rgba(0, 0, 0, 0.5);' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-overlay' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击遮罩层时触发 | 无 |

### Methods

该组件不对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 遮罩层内容，可自定义显示内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <wd-button type="primary" @click="showOverlay">显示遮罩层</wd-button>
    
    <!-- 基础遮罩层 -->
    <wd-overlay :show="show" @click="hideOverlay" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制遮罩层显示状态
const show = ref(false)

// 显示遮罩层
const showOverlay = () => {
  show.value = true
}

// 隐藏遮罩层
const hideOverlay = () => {
  show.value = false
}
</script>
```

### 2. 自定义样式

```vue
<template>
  <view>
    <wd-button type="primary" @click="showOverlay">显示自定义遮罩层</wd-button>
    
    <!-- 自定义样式的遮罩层 -->
    <wd-overlay 
      :show="show" 
      @click="hideOverlay"
      custom-style="background-color: rgba(0, 0, 0, 0.3);"
      custom-class="custom-overlay"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制遮罩层显示状态
const show = ref(false)

// 显示遮罩层
const showOverlay = () => {
  show.value = true
}

// 隐藏遮罩层
const hideOverlay = () => {
  show.value = false
}
</script>

<style scoped>
.custom-overlay {
  /* 自定义遮罩层样式 */
  border-radius: 20rpx;
  margin: 20rpx;
}
</style>
```

### 3. 锁定滚动

```vue
<template>
  <view>
    <wd-button type="primary" @click="showOverlay">显示遮罩层（锁定滚动）</wd-button>
    
    <!-- 锁定滚动的遮罩层 -->
    <wd-overlay 
      :show="show" 
      @click="hideOverlay"
      lock-scroll
    />
    
    <!-- 长内容区域，用于测试滚动锁定效果 -->
    <view class="long-content">
      <text v-for="item in 50" :key="item" class="content-item">内容项 {{ item }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制遮罩层显示状态
const show = ref(false)

// 显示遮罩层
const showOverlay = () => {
  show.value = true
}

// 隐藏遮罩层
const hideOverlay = () => {
  show.value = false
}
</script>

<style scoped>
.long-content {
  padding: 20rpx;
  height: 2000rpx;
  background-color: #f5f5f5;
}

.content-item {
  display: block;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}
</style>
```

### 4. 自定义动画时长

```vue
<template>
  <view>
    <wd-button type="primary" @click="showOverlay">显示遮罩层（自定义动画）</wd-button>
    
    <!-- 自定义动画时长的遮罩层 -->
    <wd-overlay 
      :show="show" 
      @click="hideOverlay"
      :duration="{ enter: 500, leave: 1000 }" <!-- 进入动画500ms，离开动画1000ms -->
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制遮罩层显示状态
const show = ref(false)

// 显示遮罩层
const showOverlay = () => {
  show.value = true
}

// 隐藏遮罩层
const hideOverlay = () => {
  show.value = false
}
</script>
```

### 5. 带内容的遮罩层

```vue
<template>
  <view>
    <wd-button type="primary" @click="showOverlay">显示带内容的遮罩层</wd-button>
    
    <!-- 带内容的遮罩层 -->
    <wd-overlay :show="show" @click="handleOverlayClick">
      <view class="overlay-content">
        <view class="content-header">
          <text class="content-title">遮罩层内容</text>
          <wd-icon name="close" @click="hideOverlay" />
        </view>
        <view class="content-body">
          <text>这是遮罩层中的自定义内容</text>
          <text>可以包含任意组件和样式</text>
        </view>
        <view class="content-footer">
          <wd-button size="small" type="default" @click="hideOverlay">取消</wd-button>
          <wd-button size="small" type="primary" @click="confirmAction">确定</wd-button>
        </view>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制遮罩层显示状态
const show = ref(false)

// 显示遮罩层
const showOverlay = () => {
  show.value = true
}

// 隐藏遮罩层
const hideOverlay = () => {
  show.value = false
}

// 遮罩层点击事件
const handleOverlayClick = () => {
  console.log('点击了遮罩层背景')
  // 可以选择是否关闭遮罩层
  // hideOverlay()
}

// 确定操作
const confirmAction = () => {
  console.log('点击了确定按钮')
  hideOverlay()
}
</script>

<style scoped>
.overlay-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.content-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.content-body {
  margin-bottom: 30rpx;
}

.content-body text {
  display: block;
  margin-bottom: 10rpx;
  color: #666;
}

.content-footer {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 通过Props定制

组件提供了 `customStyle` 和 `customClass` 属性用于自定义样式：

```vue
<wd-overlay 
  :show="show" 
  custom-style="background-color: rgba(0, 0, 0, 0.5);" 
  custom-class="my-overlay" 
/>
```

### 2. 通过CSS变量定制

组件支持通过CSS变量定制主题样式：

```vue
<template>
  <view class="custom-overlay-container">
    <wd-overlay :show="show" />
  </view>
</template>

<style scoped>
.custom-overlay-container {
  /* 自定义遮罩层主题变量 */
  --overlay-background-color: rgba(0, 0, 0, 0.7);
}
</style>
```

### 3. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-overlay :show="show" custom-class="my-overlay" />

<style scoped>
.my-overlay {
  /* 覆盖遮罩层样式 */
  :deep(.wd-overlay) {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
```

## 注意事项

### 1. 滚动锁定
- 组件默认开启滚动锁定（lockScroll: true），显示时会阻止页面滚动
- 在H5平台上，使用了useLockScroll composable来实现滚动锁定
- 在其他平台上，通过disable-touch-move属性实现

### 2. 层级管理
- 可以通过zIndex属性调整遮罩层的层级
- 建议根据实际需求设置合适的层级，避免层级冲突
- 默认层级为10，可根据需要调整

### 3. 性能优化
- 遮罩层结构简单，性能开销较小，无需特殊优化
- 建议在不需要时及时隐藏遮罩层，释放资源
- 避免在遮罩层中放置过于复杂的内容，影响渲染性能

### 4. 事件处理
- 点击遮罩层会触发click事件
- 可以在click事件中处理关闭遮罩层或其他逻辑
- 自定义内容中的点击事件需要使用@click.stop阻止事件冒泡

### 5. 跨端兼容
- 组件在不同平台上的表现可能略有差异，建议在各平台上进行测试
- 在小程序平台上，滚动锁定的实现方式可能与H5不同
- 动画效果在不同平台上的表现可能略有差异

### 6. 常见问题解决方案
- **问题**：遮罩层无法覆盖某些元素
  **解决方案**：调整zIndex属性，确保遮罩层的层级高于其他元素

- **问题**：滚动锁定不生效
  **解决方案**：检查lockScroll属性是否为true，确保在正确的平台上使用

- **问题**：点击自定义内容时遮罩层关闭
  **解决方案**：在自定义内容的点击事件中使用@click.stop阻止事件冒泡

- **问题**：动画效果不符合预期
  **解决方案**：调整duration属性，或检查是否与其他动画冲突
