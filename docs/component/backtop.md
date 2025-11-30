# wd-backtop 返回顶部

## 组件概述

wd-backtop 是一个用于快速返回页面顶部的组件，当页面滚动到一定距离时自动显示，点击后平滑滚动到页面顶部。该组件适用于长页面内容，提供便捷的导航体验，提升用户体验。

### 适用场景
- 长列表页面，如商品列表、新闻列表、评论区等
- 内容丰富的详情页
- 任何需要快速返回顶部的长页面场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| scroll-top | Number | - | 是 | 页面滚动距离，用于判断是否显示返回顶部按钮 |
| top | Number | 300 | 否 | 距离顶部多少距离时显示返回顶部按钮，单位为px |
| duration | Number | 100 | 否 | 返回顶部滚动时间，单位为ms |
| z-index | Number | 10 | 否 | 组件层级，用于控制显示顺序 |
| icon-style | String | '' | 否 | 图标样式，用于自定义图标的样式 |
| shape | String | circle | 否 | 按钮形状，可选值：circle（圆形）、square（方形） |
| bottom | Number | 100 | 否 | 距离屏幕底部距离，单位为px |
| right | Number | 20 | 否 | 距离屏幕右边距离，单位为px |
| custom-class | String | - | 否 | 根节点自定义类名 |
| custom-style | String / Object | - | 否 | 根节点自定义样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义返回顶部按钮的内容，不使用则显示默认图标 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <!-- 长列表内容 -->
    <view v-for="item in 100" :key="item" class="list-item">{{ item }}</view>
    
    <!-- 返回顶部组件 -->
    <wd-backtop :scroll-top="scrollTop" />
  </view>
</template>

<script setup lang="ts">
import { ref, onPageScroll } from 'vue'

// 页面滚动距离
const scrollTop = ref(0)

// 监听页面滚动事件
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.list-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 1rpx solid #eee;
}
</style>
```

### 自定义显示位置
```vue
<template>
  <view class="container">
    <!-- 长列表内容 -->
    <view v-for="item in 100" :key="item" class="list-item">{{ item }}</view>
    
    <!-- 自定义位置的返回顶部组件 -->
    <wd-backtop 
      :scroll-top="scrollTop" 
      :bottom="50" 
      :right="50" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onPageScroll } from 'vue'

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>
```

### 自定义样式和形状
```vue
<template>
  <view class="container">
    <!-- 长列表内容 -->
    <view v-for="item in 100" :key="item" class="list-item">{{ item }}</view>
    
    <!-- 自定义样式和形状的返回顶部组件 -->
    <wd-backtop 
      :scroll-top="scrollTop" 
      shape="square" 
      icon-style="color: #409eff; font-size: 32rpx;" 
      :custom-style="{ backgroundColor: '#f0f9ff', border: '1rpx solid #e0f2fe' }" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onPageScroll } from 'vue'

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>
```

### 自定义滚动动画时长
```vue
<template>
  <view class="container">
    <!-- 长列表内容 -->
    <view v-for="item in 100" :key="item" class="list-item">{{ item }}</view>
    
    <!-- 自定义滚动动画时长的返回顶部组件 -->
    <wd-backtop 
      :scroll-top="scrollTop" 
      :duration="500" 
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onPageScroll } from 'vue'

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>
```

### 自定义内容
```vue
<template>
  <view class="container">
    <!-- 长列表内容 -->
    <view v-for="item in 100" :key="item" class="list-item">{{ item }}</view>
    
    <!-- 自定义内容的返回顶部组件 -->
    <wd-backtop :scroll-top="scrollTop">
      <view class="custom-backtop">
        <text class="backtop-text">回到顶部</text>
      </view>
    </wd-backtop>
  </view>
</template>

<script setup lang="ts">
import { ref, onPageScroll } from 'vue'

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>

<style scoped>
.custom-backtop {
  width: 160rpx;
  height: 60rpx;
  background-color: #409eff;
  color: #fff;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.1);
}
</style>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-backtop :scroll-top="scrollTop" custom-class="my-backtop" />
</template>

<style scoped>
.my-backtop {
  /* 自定义样式 */
  background-color: #f0f9ff;
  border: 1rpx solid #e0f2fe;
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-backtop 
    :scroll-top="scrollTop" 
    :custom-style="{ backgroundColor: '#f0f9ff', border: '1rpx solid #e0f2fe' }" 
  />
</template>
```

### 自定义图标样式
通过 `icon-style` 属性可以自定义图标的样式：

```vue
<template>
  <wd-backtop 
    :scroll-top="scrollTop" 
    icon-style="color: #409eff; font-size: 32rpx;" 
  />
</template>
```

## 注意事项

1. **scroll-top 属性**：
   - 该属性是必填项，用于判断是否显示返回顶部按钮
   - 需要通过页面滚动事件 `onPageScroll` 实时更新该属性值
   - 在不同平台上，滚动事件的触发频率和精度可能存在差异

2. **定位问题**：
   - 组件使用固定定位（fixed），通过 `bottom` 和 `right` 属性控制位置
   - 在某些特殊布局下，可能需要调整 `z-index` 属性确保组件正常显示

3. **性能优化**：
   - 建议对 `scroll-top` 的更新进行节流处理，减少不必要的计算和渲染
   - 当页面内容较少时，不建议使用该组件

4. **兼容性**：
   - 该组件基于 uni-app 的 `uni.pageScrollTo` API 实现，支持多端适配
   - 在某些平台上，滚动动画可能存在差异，建议进行充分测试

5. **自定义内容**：
   - 使用默认插槽自定义内容时，需要注意内容的尺寸和样式，确保良好的视觉效果
   - 自定义内容时，组件的默认样式（如背景色、边框、阴影等）仍然生效

## 组件依赖

- 依赖 `wd-transition` 组件，用于实现显示/隐藏的过渡效果
- 依赖 `wd-icon` 组件，用于显示默认的返回顶部图标
