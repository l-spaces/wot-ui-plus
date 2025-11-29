# wd-popup 弹出层组件

## 组件概述

wd-popup 是一个功能强大的弹出层组件，支持多种弹出位置和动画效果，可用于展示模态框、侧边栏、底部弹窗等。组件基于 Vue 3 + TypeScript + UniApp 开发，提供了丰富的配置选项和灵活的自定义能力，能够满足各种复杂的弹出层需求。

### 功能特点

- 支持 5 种弹出位置（居中、顶部、底部、左侧、右侧）
- 提供多种动画效果（淡入淡出、滑动、缩放等）
- 支持点击遮罩关闭
- 支持自定义遮罩样式和弹出层样式
- 支持底部安全区域适配
- 支持懒渲染
- 支持锁定滚动
- 支持从页面中脱离出来（解决 fixed 定位问题）
- 提供完整的过渡动画事件
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 模态对话框
- 底部操作菜单
- 侧边栏导航
- 顶部通知栏
- 全屏加载提示
- 图片预览
- 其他需要弹出层的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| transition | string | - | 否 | 动画类型，参见 wd-transition 组件的 name，可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in |
| closable | boolean | false | 否 | 是否显示关闭按钮 |
| position | 'center' \| 'top' \| 'right' \| 'bottom' \| 'left' | 'center' | 否 | 弹出框的位置 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| duration | number \| boolean | 300 | 否 | 动画持续时间 |
| modal | boolean | true | 否 | 是否显示遮罩 |
| zIndex | number | 10 | 否 | 设置层级 |
| hideWhenClose | boolean | true | 否 | 是否当关闭时将弹出层隐藏（display: none) |
| modalStyle | string | '' | 否 | 遮罩样式 |
| safeAreaInsetBottom | boolean | false | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| modelValue | boolean | false | 否 | 弹出层是否显示 |
| lazyRender | boolean | true | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| lockScroll | boolean | true | 否 | 是否锁定滚动 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 弹出层显示状态变化时 | 新的显示状态（boolean） |
| before-enter | 进入前触发 | - |
| enter | 进入中触发 | - |
| after-enter | 进入后触发 | - |
| before-leave | 离开前触发 | - |
| leave | 离开中触发 | - |
| after-leave | 离开后触发 | - |
| click-modal | 点击遮罩时触发 | - |
| close | 关闭弹出层时触发 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| close | - | - | 关闭弹出层 |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 弹出层内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示弹出层</wd-button>
    
    <wd-popup v-model="show" position="center">
      <view class="popup-content">
        <view class="popup-title">弹出层标题</view>
        <view class="popup-text">这是一个简单的弹出层内容</view>
        <wd-button type="primary" size="small" @click="show = false">确定</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss">
.popup-content {
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
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
</style>
```

### 2. 底部弹出层

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示底部弹出层</wd-button>
    
    <wd-popup v-model="show" position="bottom" :safe-area-inset-bottom="true">
      <view class="bottom-popup">
        <view class="popup-item">选项一</view>
        <view class="popup-item">选项二</view>
        <view class="popup-item">选项三</view>
        <wd-button type="danger" block @click="show = false">取消</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss">
.bottom-popup {
  background-color: white;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  
  .popup-item {
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #e4e7ed;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .wd-button {
    margin-top: 20px;
  }
}
</style>
```

### 3. 侧边栏

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="showLeft = true">左侧弹出</wd-button>
    <wd-button type="primary" @click="showRight = true">右侧弹出</wd-button>
    
    <!-- 左侧侧边栏 -->
    <wd-popup v-model="showLeft" position="left" :closable="true">
      <view class="sidebar left-sidebar">
        <view class="sidebar-title">左侧侧边栏</view>
        <view class="sidebar-content">
          <view class="sidebar-item">菜单项一</view>
          <view class="sidebar-item">菜单项二</view>
          <view class="sidebar-item">菜单项三</view>
        </view>
      </view>
    </wd-popup>
    
    <!-- 右侧侧边栏 -->
    <wd-popup v-model="showRight" position="right" :closable="true">
      <view class="sidebar right-sidebar">
        <view class="sidebar-title">右侧侧边栏</view>
        <view class="sidebar-content">
          <view class="sidebar-item">菜单项一</view>
          <view class="sidebar-item">菜单项二</view>
          <view class="sidebar-item">菜单项三</view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showLeft = ref(false)
const showRight = ref(false)
</script>

<style lang="scss">
.sidebar {
  width: 250px;
  height: 100%;
  background-color: white;
  padding: 20px;
  
  .sidebar-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .sidebar-content {
    .sidebar-item {
      padding: 15px 0;
      font-size: 16px;
      border-bottom: 1px solid #e4e7ed;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
```

### 4. 自定义动画和遮罩

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示自定义弹出层</wd-button>
    
    <wd-popup 
      v-model="show" 
      position="center" 
      transition="zoom-in" 
      :modal-style="{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }"
      :closable="true"
    >
      <view class="custom-popup">
        <view class="popup-title">自定义弹出层</view>
        <view class="popup-text">这是一个使用了自定义动画和遮罩样式的弹出层</view>
        <wd-button type="primary" size="small" @click="show = false">确定</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss">
.custom-popup {
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
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
</style>
```

### 5. 顶部弹出通知

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示顶部通知</wd-button>
    
    <wd-popup v-model="show" position="top" :modal="false" :duration="200">
      <view class="top-notification">
        <wd-icon name="success-circle" color="#67C23A" />
        <text class="notification-text">操作成功</text>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss">
.top-notification {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  .notification-text {
    margin-left: 8px;
    font-size: 14px;
    color: #303133;
  }
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示</wd-button>
    
    <wd-popup 
      v-model="show" 
      custom-class="my-popup"
      :custom-style="{ backgroundColor: '#f5f7fa', border: '1px solid #e4e7ed' }"
    >
      <view class="popup-content">
        <view class="popup-title">自定义样式</view>
        <view class="popup-text">这是一个使用了自定义样式的弹出层</view>
        <wd-button type="primary" size="small" @click="show = false">确定</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss">
.my-popup {
  // 自定义类样式
  .wd-popup__close {
    color: #f56c6c;
    font-size: 20px;
  }
}
</style>
```

### 2. 自定义遮罩样式

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示</wd-button>
    
    <wd-popup 
      v-model="show" 
      :modal-style="{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)' }"
    >
      <view class="popup-content">
        <view class="popup-title">自定义遮罩</view>
        <view class="popup-text">这是一个使用了自定义遮罩样式的弹出层</view>
        <wd-button type="primary" size="small" @click="show = false">确定</wd-button>
      </view>
    </wd-popup>
  </view>
</template>
```

### 3. 自定义弹出层位置和尺寸

```vue
<template>
  <view class="demo">
    <wd-button type="primary" @click="show = true">点击显示</wd-button>
    
    <wd-popup v-model="show" position="center">
      <view class="custom-position-popup">
        <view class="popup-title">自定义位置和尺寸</view>
        <view class="popup-text">这是一个使用了自定义位置和尺寸的弹出层</view>
        <wd-button type="primary" size="small" @click="show = false">确定</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss">
.custom-position-popup {
  width: 80%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 16px;
  text-align: center;
  
  .popup-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .popup-text {
    font-size: 16px;
    color: #606266;
    margin-bottom: 25px;
  }
}
</style>
```

## 注意事项

1. **弹出位置**：
   - 支持 5 种弹出位置（居中、顶部、底部、左侧、右侧）
   - 不同位置对应不同的默认动画效果

2. **动画效果**：
   - 可以通过 transition 属性自定义动画类型
   - 支持多种预定义动画效果

3. **性能优化**：
   - 开启 lazyRender 属性可以实现懒渲染，提高初始加载性能
   - 频繁显示/隐藏的弹出层，建议使用 v-if 而非 v-show

4. **跨平台兼容**：
   - 组件在不同平台上的表现可能略有差异
   - 特别是在定位和动画效果方面

5. **关闭机制**：
   - 点击遮罩可以关闭弹出层（可通过 closeOnClickModal 属性控制）
   - 可以通过 closable 属性显示关闭按钮
   - 支持通过 close 方法手动关闭

6. **底部安全区域**：
   - 在 iPhone X 等机型上，建议设置 safeAreaInsetBottom 为 true
   - 确保弹出层内容不会被底部安全区域遮挡

7. **滚动锁定**：
   - 默认情况下会锁定背景滚动
   - 可以通过 lockScroll 属性控制

8. **rootPortal 属性**：
   - 用于解决 fixed 定位在某些场景下失效的问题
   - 在不同平台上有不同的实现方式

9. **过渡动画事件**：
   - 提供了完整的过渡动画事件，可以用于实现复杂的交互效果
   - 包括 before-enter、enter、after-enter、before-leave、leave 和 after-leave

10. **遮罩样式**：
    - 可以通过 modalStyle 属性自定义遮罩样式
    - 支持设置背景色、透明度等
