# wd-navbar 导航栏组件

## 组件概述

wd-navbar 是一个用于页面顶部导航的组件，提供了标题、左侧按钮、右侧按钮等常见导航元素，支持自定义样式和交互。该组件适配不同平台，支持固定定位、安全区域适配等特性，是构建移动端应用导航栏的核心组件。

### 功能特点
- 支持自定义标题、左侧按钮、右侧按钮
- 支持左侧箭头显示
- 支持固定到顶部
- 支持占位元素生成
- 支持安全区域适配
- 支持自定义边框显示
- 支持禁用左侧/右侧按钮
- 提供丰富的插槽，支持完全自定义

### 适用场景
- 页面顶部导航栏
- 应用标题栏
- 带返回按钮的页面导航
- 需要自定义导航栏的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| title | string |  | 否 | 标题文字 |
| leftText | string |  | 否 | 左侧文案 |
| rightText | string |  | 否 | 右侧文案 |
| leftArrow | boolean | false | 否 | 是否显示左侧箭头 |
| bordered | boolean | true | 否 | 是否显示下边框 |
| fixed | boolean | false | 否 | 是否固定到顶部 |
| placeholder | boolean | false | 否 | 固定在顶部时，是否在标签位置生成一个等高的占位元素 |
| zIndex | number | 500 | 否 | 导航栏 z-index |
| safeAreaInsetTop | boolean | false | 否 | 是否开启顶部安全区适配 |
| leftDisabled | boolean | false | 否 | 是否禁用左侧按钮，禁用时透明度降低，且无法点击 |
| rightDisabled | boolean | false | 否 | 是否禁用右侧按钮，禁用时透明度降低，且无法点击 |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click-left | 点击左侧按钮时触发 | 无 |
| click-right | 点击右侧按钮时触发 | 无 |

### Methods

该组件不对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| left | - | 左侧自定义内容，替换默认的左侧按钮 |
| title | - | 标题自定义内容，替换默认的标题文字 |
| right | - | 右侧自定义内容，替换默认的右侧按钮 |
| capsule | - | 胶囊区域自定义内容，优先级高于左侧按钮 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view>
    <wd-navbar title="基础导航栏" left-arrow @click-left="onClickLeft" />
  </view>
</template>

<script lang="ts" setup>
// 左侧按钮点击事件
const onClickLeft = () => {
  console.log('点击了左侧按钮')
  // 通常用于返回上一页
  uni.navigateBack()
}
</script>
```

### 2. 带右侧按钮的导航栏

```vue
<template>
  <view>
    <wd-navbar 
      title="带右侧按钮" 
      left-arrow 
      right-text="右侧" 
      @click-left="onClickLeft" 
      @click-right="onClickRight" 
    />
  </view>
</template>

<script lang="ts" setup>
// 左侧按钮点击事件
const onClickLeft = () => {
  uni.navigateBack()
}

// 右侧按钮点击事件
const onClickRight = () => {
  console.log('点击了右侧按钮')
  // 执行右侧按钮操作
}
</script>
```

### 3. 固定到顶部

```vue
<template>
  <view>
    <wd-navbar 
      title="固定导航栏" 
      left-arrow 
      fixed 
      placeholder 
      @click-left="onClickLeft" 
    />
    <!-- 页面内容 -->
    <view class="page-content">
      <text>这是页面内容</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 左侧按钮点击事件
const onClickLeft = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.page-content {
  padding: 20rpx;
  height: 2000rpx; /* 模拟长页面 */
  background-color: #f5f5f5;
}
</style>
```

### 4. 自定义内容

```vue
<template>
  <view>
    <wd-navbar 
      left-arrow 
      @click-left="onClickLeft" 
      @click-right="onClickRight" 
    >
      <!-- 自定义标题 -->
      <template #title>
        <view class="custom-title">
          <wd-icon name="home" size="24" color="#4D80F0" />
          <text class="title-text">自定义标题</text>
        </view>
      </template>
      <!-- 自定义右侧内容 -->
      <template #right>
        <view class="custom-right">
          <wd-icon name="search" size="24" color="#666" />
          <wd-icon name="more" size="24" color="#666" style="margin-left: 20rpx;" />
        </view>
      </template>
    </wd-navbar>
  </view>
</template>

<script lang="ts" setup>
// 左侧按钮点击事件
const onClickLeft = () => {
  uni.navigateBack()
}

// 右侧按钮点击事件
const onClickRight = () => {
  console.log('点击了右侧自定义内容')
}
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.custom-right {
  display: flex;
  align-items: center;
}
</style>
```

### 5. 安全区域适配

```vue
<template>
  <view>
    <wd-navbar 
      title="安全区域适配" 
      left-arrow 
      safe-area-inset-top 
      @click-left="onClickLeft" 
    />
  </view>
</template>

<script lang="ts" setup>
// 左侧按钮点击事件
const onClickLeft = () => {
  uni.navigateBack()
}
</script>
```

## 样式定制指南

### 1. 使用 customStyle 和 customClass

通过 `customStyle` 和 `customClass` 可以自定义组件的根节点样式：

```vue
<wd-navbar 
  title="自定义样式" 
  left-arrow 
  custom-style="background-color: #4D80F0; color: #fff;" 
  custom-class="my-navbar" 
  @click-left="onClickLeft" 
/>

<style>
.my-navbar {
  /* 自定义样式 */
  border-radius: 0 0 20rpx 20rpx;
}
</style>
```

### 2. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-navbar 
  title="覆盖内部样式" 
  left-arrow 
  custom-class="my-navbar" 
  @click-left="onClickLeft" 
/>

<style scoped>
.my-navbar {
  /* 自定义标题样式 */
  :deep(.wd-navbar__title) {
    color: #4D80F0;
    font-size: 36rpx;
    font-weight: 600;
  }
  
  /* 自定义左侧按钮样式 */
  :deep(.wd-navbar__left) {
    color: #4D80F0;
  }
  
  /* 自定义箭头样式 */
  :deep(.wd-navbar__arrow) {
    color: #4D80F0;
  }
}
</style>
```

### 3. 自定义按钮样式

```vue
<wd-navbar 
  title="自定义按钮" 
  left-arrow 
  right-text="保存" 
  @click-left="onClickLeft" 
  @click-right="onClickRight" 
>
  <template #right>
    <wd-button size="small" type="primary" @click.stop="onClickRight">保存</wd-button>
  </template>
</wd-navbar>
```

## 注意事项

### 1. 固定定位
- 当设置 `fixed: true` 时，导航栏会固定在页面顶部
- 建议同时设置 `placeholder: true`，生成一个等高的占位元素，避免页面内容上移
- 可以通过 `zIndex` 属性调整导航栏的层级

### 2. 安全区域适配
- 在刘海屏等设备上，建议开启 `safeAreaInsetTop: true`，适配顶部安全区域
- 开启后，导航栏会自动添加顶部内边距，避免内容被刘海遮挡

### 3. 事件处理
- 左侧和右侧按钮的点击事件分别通过 `click-left` 和 `click-right` 事件触发
- 当使用自定义插槽时，需要在插槽内容中手动处理点击事件
- 可以通过 `leftDisabled` 和 `rightDisabled` 属性禁用左侧/右侧按钮

### 4. 自定义内容
- 提供了 `left`、`title`、`right` 和 `capsule` 四个插槽，支持完全自定义导航栏内容
- `capsule` 插槽优先级高于左侧按钮，用于实现胶囊式导航
- 自定义内容时，建议保持导航栏高度一致，避免布局错乱

### 5. 常见问题解决方案
- **问题**：导航栏固定后，页面内容被遮挡
  **解决方案**：设置 `placeholder: true`，生成占位元素

- **问题**：在刘海屏设备上，导航栏内容被遮挡
  **解决方案**：开启 `safeAreaInsetTop: true`，适配顶部安全区域

- **问题**：自定义右侧内容后，点击事件不触发
  **解决方案**：在自定义内容中手动处理点击事件，或使用 `@click.stop` 阻止事件冒泡

### 6. 性能优化
- 避免在导航栏中放置过于复杂的组件或大量数据
- 合理使用条件渲染，减少不必要的DOM元素
- 固定导航栏时，建议开启 `placeholder`，避免页面重排