# Transition 过渡动画

## 组件概述

wd-transition 是一个用于实现元素过渡动画的组件，基于 Vue 3 的 Transition API 封装，提供了丰富的预设动画效果和灵活的自定义选项。它可以轻松实现元素的进入和离开动画，是构建流畅用户体验的重要组件。

### 功能特点
- 支持 12 种预设动画效果
- 支持自定义动画持续时间
- 支持懒渲染，触发展示时才渲染内容
- 支持进入和离开动画的独立配置
- 支持自定义过渡类名
- 支持动画生命周期事件
- 支持触摸滚动阻止
- 支持动画结束后销毁元素

### 适用场景
- 模态框的显示和隐藏动画
- 下拉菜单的展开和收起动画
- 列表项的添加和删除动画
- 页面切换动画
- 任何需要平滑过渡效果的元素

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| show | boolean | false | 否 | 是否展示组件 |
| duration | number / boolean / object | 300 | 否 | 动画执行时间，支持数字、布尔值或对象类型 |
| lazyRender | boolean | false | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| name | string / array | 'fade' | 否 | 动画类型，可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in / zoom-out |
| destroy | boolean | true | 否 | 是否在动画结束时销毁子节点（display: none) |
| enterClass | string | '' | 否 | 进入过渡的开始状态 |
| enterActiveClass | string | '' | 否 | 进入过渡的激活状态 |
| enterToClass | string | '' | 否 | 进入过渡的结束状态 |
| leaveClass | string | '' | 否 | 离开过渡的开始状态 |
| leaveActiveClass | string | '' | 否 | 离开过渡的激活状态 |
| leaveToClass | string | '' | 否 | 离开过渡的结束状态 |
| disableTouchMove | boolean | false | 否 | 是否阻止触摸滚动 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击组件时触发 | - |
| before-enter | 进入过渡开始前触发 | - |
| enter | 进入过渡开始时触发 | - |
| after-enter | 进入过渡结束后触发 | - |
| before-leave | 离开过渡开始前触发 | - |
| leave | 离开过渡开始时触发 | - |
| after-leave | 离开过渡结束后触发 | - |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 过渡动画包裹的内容 |

### Methods

该组件未对外暴露任何方法。

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-button @click="show = !show">切换显示</wd-button>
    <wd-transition :show="show" name="fade">
      <view class="content">这是一个带有淡入淡出动画的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content {
  width: 200px;
  height: 100px;
  background-color: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
```

### 不同动画类型

```vue
<template>
  <view class="demo">
    <view class="buttons">
      <wd-button @click="changeAnimation('fade')">淡入淡出</wd-button>
      <wd-button @click="changeAnimation('slide-up')">向上滑入</wd-button>
      <wd-button @click="changeAnimation('slide-down')">向下滑入</wd-button>
      <wd-button @click="changeAnimation('slide-left')">向左滑入</wd-button>
      <wd-button @click="changeAnimation('slide-right')">向右滑入</wd-button>
      <wd-button @click="changeAnimation('zoom-in')">放大进入</wd-button>
      <wd-button @click="changeAnimation('zoom-out')">缩小进入</wd-button>
    </view>
    <wd-transition :show="show" :name="animationName">
      <view class="content">{{ animationName }}</view>
    </wd-transition>
    <wd-button @click="show = !show">切换显示</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const animationName = ref('fade')

const changeAnimation = (name: string) => {
  animationName.value = name
  show.value = false
  // 延迟触发，确保动画重新执行
  setTimeout(() => {
    show.value = true
  }, 100)
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.content {
  width: 200px;
  height: 100px;
  background-color: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
```

### 自定义动画时长

```vue
<template>
  <view class="demo">
    <wd-button @click="show = !show">切换显示</wd-button>
    <wd-transition :show="show" name="slide-up" :duration="1000">
      <view class="content">这是一个1秒动画时长的内容</view>
    </wd-transition>
    <wd-transition :show="show" name="slide-down" :duration="{ enter: 500, leave: 1500 }">
      <view class="content">进入500ms，离开1500ms</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content {
  width: 200px;
  height: 100px;
  background-color: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
```

### 懒渲染和生命周期事件

```vue
<template>
  <view class="demo">
    <wd-button @click="show = !show">切换显示</wd-button>
    <view class="events">
      <view v-for="(event, index) in events" :key="index" class="event-item">
        {{ event }}
      </view>
    </view>
    <wd-transition 
      :show="show" 
      name="fade-up" 
      lazy-render 
      @before-enter="onBeforeEnter" 
      @enter="onEnter" 
      @after-enter="onAfterEnter" 
      @before-leave="onBeforeLeave" 
      @leave="onLeave" 
      @after-leave="onAfterLeave"
    >
      <view class="content">这是一个带有懒渲染和生命周期事件的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const events = ref<string[]>([])

const addEvent = (event: string) => {
  events.value.push(`${new Date().toLocaleTimeString()}: ${event}`)
  // 只保留最近10条事件
  if (events.value.length > 10) {
    events.value.shift()
  }
}

const onBeforeEnter = () => addEvent('before-enter')
const onEnter = () => addEvent('enter')
const onAfterEnter = () => addEvent('after-enter')
const onBeforeLeave = () => addEvent('before-leave')
const onLeave = () => addEvent('leave')
const onAfterLeave = () => addEvent('after-leave')
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content {
  width: 200px;
  height: 100px;
  background-color: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.events {
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  padding: 10px;
}

.event-item {
  padding: 5px 0;
  font-size: 14px;
  color: #646566;
  border-bottom: 1px solid #f0f0f0;
}

.event-item:last-child {
  border-bottom: none;
}
</style>
```

### 自定义过渡类名

```vue
<template>
  <view class="demo">
    <wd-button @click="show = !show">切换显示</wd-button>
    <wd-transition 
      :show="show" 
      enter-class="custom-enter" 
      enter-active-class="custom-enter-active" 
      enter-to-class="custom-enter-to" 
      leave-class="custom-leave" 
      leave-active-class="custom-leave-active" 
      leave-to-class="custom-leave-to"
    >
      <view class="content">这是一个带有自定义过渡类名的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content {
  width: 200px;
  height: 100px;
  background-color: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* 自定义进入动画 */
:deep(.custom-enter) {
  opacity: 0;
  transform: scale(0.5) rotate(-180deg);
}

:deep(.custom-enter-active) {
  transition: all 0.5s ease;
}

:deep(.custom-enter-to) {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* 自定义离开动画 */
:deep(.custom-leave) {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

:deep(.custom-leave-active) {
  transition: all 0.5s ease;
}

:deep(.custom-leave-to) {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 和 `customClass` 属性可以自定义 Transition 组件的根节点样式：

```vue
<template>
  <view class="demo">
    <wd-button @click="show = !show">切换显示</wd-button>
    <wd-transition 
      :show="show" 
      name="fade" 
      customClass="my-transition"
      customStyle="border-radius: 12px; overflow: hidden;"
    >
      <view class="content">这是一个带有自定义样式的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.content {
  width: 200px;
  height: 100px;
  background-color: #1989fa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.my-transition) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

### 预设动画类型

组件支持以下预设动画类型：

| 动画名称 | 描述 |
| --- | --- |
| fade | 淡入淡出 |
| fade-up | 向上淡入 |
| fade-down | 向下淡入 |
| fade-left | 向左淡入 |
| fade-right | 向右淡入 |
| slide-up | 向上滑入 |
| slide-down | 向下滑入 |
| slide-left | 向左滑入 |
| slide-right | 向右滑入 |
| zoom-in | 放大进入 |
| zoom-out | 缩小进入 |

## 注意事项

1. **动画类型**：
   - 支持单个动画类型，也支持数组形式的多个动画类型
   - 当使用数组形式时，会同时应用多个动画效果

2. **动画时长**：
   - 支持数字类型，表示统一的进入和离开时长
   - 支持对象类型，可以分别设置进入和离开时长：`{ enter: 300, leave: 500 }`
   - 支持布尔值 `false`，表示不设置动画时长，使用 CSS 中定义的时长

3. **懒渲染**：
   - 当 `lazyRender` 为 `true` 时，只有在组件显示时才会渲染内容
   - 适用于内容较大或复杂的场景，可以提高初始渲染性能

4. **销毁元素**：
   - 当 `destroy` 为 `true` 时，动画结束后会设置 `display: none`
   - 当 `destroy` 为 `false` 时，动画结束后元素仍然保持 `display: block`，只是透明度为 0

5. **生命周期事件**：
   - 提供了完整的动画生命周期事件，可以在不同阶段执行自定义逻辑
   - 事件触发顺序：before-enter → enter → after-enter（进入动画）；before-leave → leave → after-leave（离开动画）

6. **触摸滚动**：
   - 当 `disableTouchMove` 为 `true` 时，会阻止组件内部的触摸滚动
   - 适用于模态框等需要阻止背景滚动的场景

7. **性能优化**：
   - 对于频繁切换显示/隐藏的组件，建议使用 `lazyRender` 优化初始渲染性能
   - 避免在动画过程中进行复杂的 DOM 操作
   - 对于复杂的自定义动画，建议使用 CSS 动画而非 JavaScript 动画

8. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 某些平台可能存在动画效果的细微差异
   - 建议在目标平台上进行充分测试
