# wd-action-sheet 动作面板组件

## 组件概述

wd-action-sheet 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台动作面板组件，用于从底部弹出的菜单选择器，提供多种选项供用户选择。该组件支持自定义菜单选项、面板项、标题、取消按钮等，适用于各种需要用户进行选择操作的场景，如分享、删除、更多操作等。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customHeaderClass | string | '' | 否 | header 头部样式 |
| modelValue | boolean | false | 是 | 设置菜单显示隐藏 |
| actions | array | [] | 否 | 菜单选项，类型为 Action[] |
| panels | array | [] | 否 | 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 |
| title | string | - | 否 | 标题 |
| cancelText | string | - | 否 | 取消按钮文案 |
| closeOnClickAction | boolean | true | 否 | 点击选项后是否关闭菜单 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| duration | number | 200 | 否 | 弹框动画持续时间，单位ms |
| zIndex | number | 10 | 否 | 菜单层级 |
| lazyRender | boolean | true | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| customStyle | string | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 菜单显示隐藏状态变化时触发 | value: 菜单显示隐藏状态 |
| open | 菜单打开时触发 | - |
| opened | 菜单打开动画结束后触发 | - |
| close | 菜单关闭时触发 | - |
| closed | 菜单关闭动画结束后触发 | - |
| select | 选择菜单选项或面板项时触发 | item: 选中的项<br>index: 选中项的索引<br>rowIndex: 行索引（仅面板项为二维数组时有效）<br>colIndex: 列索引（仅面板项时有效） |
| click-modal | 点击遮罩层时触发 | - |
| cancel | 点击取消按钮时触发 | - |

### Methods

该组件无对外暴露的方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义内容，位于菜单选项和取消按钮之间 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-action-sheet">
    <wd-button type="primary" @click="showActionSheet">显示动作面板</wd-button>
    <wd-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="onCancel"
    ></wd-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
import type { Action } from '@/uni_modules/wot-ui-plus/components/wd-action-sheet/types'

const show = ref(false)

// 菜单选项
const actions = ref<Action[]>([
  { name: '选项一' },
  { name: '选项二', color: '#ff4d4f' },
  { name: '选项三', disabled: true },
  { name: '选项四', loading: true }
])

// 显示动作面板
function showActionSheet() {
  show.value = true
}

// 选择选项回调
function onSelect({ item, index }: { item: Action; index: number }) {
  console.log('选择了选项', item, index)
}

// 取消回调
function onCancel() {
  console.log('取消了操作')
}
</script>

<style scoped>
.demo-action-sheet {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}
</style>
```

### 带标题和取消按钮

```vue
<template>
  <view class="demo-action-sheet">
    <wd-button type="primary" @click="showActionSheet">显示动作面板</wd-button>
    <wd-action-sheet
      v-model="show"
      :actions="actions"
      title="请选择操作"
      cancel-text="取消"
      @select="onSelect"
      @cancel="onCancel"
    ></wd-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
import type { Action } from '@/uni_modules/wot-ui-plus/components/wd-action-sheet/types'

const show = ref(false)

// 菜单选项
const actions = ref<Action[]>([
  { name: '分享', subname: '分享到朋友圈' },
  { name: '收藏', color: '#ffc107' },
  { name: '删除', color: '#ff4d4f' }
])

// 显示动作面板
function showActionSheet() {
  show.value = true
}

// 选择选项回调
function onSelect({ item, index }: { item: Action; index: number }) {
  console.log('选择了选项', item, index)
}

// 取消回调
function onCancel() {
  console.log('取消了操作')
}
</script>

<style scoped>
.demo-action-sheet {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}
</style>
```

### 自定义面板项

```vue
<template>
  <view class="demo-action-sheet">
    <wd-button type="primary" @click="showActionSheet">显示动作面板</wd-button>
    <wd-action-sheet
      v-model="show"
      :panels="panels"
      title="选择功能"
      @select="onSelect"
    ></wd-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
import type { Panel } from '@/uni_modules/wot-ui-plus/components/wd-action-sheet/types'

const show = ref(false)

// 自定义面板项
const panels = ref<Panel[]>([
  { iconUrl: 'https://picsum.photos/60/60?random=1', title: '功能一' },
  { iconUrl: 'https://picsum.photos/60/60?random=2', title: '功能二' },
  { iconUrl: 'https://picsum.photos/60/60?random=3', title: '功能三' },
  { iconUrl: 'https://picsum.photos/60/60?random=4', title: '功能四' }
])

// 显示动作面板
function showActionSheet() {
  show.value = true
}

// 选择选项回调
function onSelect({ item, index }: { item: Panel; index: number }) {
  console.log('选择了面板项', item, index)
}
</script>

<style scoped>
.demo-action-sheet {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}
</style>
```

### 多行面板项

```vue
<template>
  <view class="demo-action-sheet">
    <wd-button type="primary" @click="showActionSheet">显示动作面板</wd-button>
    <wd-action-sheet
      v-model="show"
      :panels="panels"
      title="选择功能"
      @select="onSelect"
    ></wd-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
import type { Panel } from '@/uni_modules/wot-ui-plus/components/wd-action-sheet/types'

const show = ref(false)

// 多行面板项
const panels = ref<Panel[][]>([
  [
    { iconUrl: 'https://picsum.photos/60/60?random=1', title: '功能一' },
    { iconUrl: 'https://picsum.photos/60/60?random=2', title: '功能二' },
    { iconUrl: 'https://picsum.photos/60/60?random=3', title: '功能三' }
  ],
  [
    { iconUrl: 'https://picsum.photos/60/60?random=4', title: '功能四' },
    { iconUrl: 'https://picsum.photos/60/60?random=5', title: '功能五' },
    { iconUrl: 'https://picsum.photos/60/60?random=6', title: '功能六' }
  ]
])

// 显示动作面板
function showActionSheet() {
  show.value = true
}

// 选择选项回调
function onSelect({ item, rowIndex, colIndex }: { item: Panel; rowIndex: number; colIndex: number }) {
  console.log('选择了面板项', item, rowIndex, colIndex)
}
</script>

<style scoped>
.demo-action-sheet {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}
</style>
```

### 自定义内容

```vue
<template>
  <view class="demo-action-sheet">
    <wd-button type="primary" @click="showActionSheet">显示动作面板</wd-button>
    <wd-action-sheet
      v-model="show"
      title="自定义内容"
      cancel-text="取消"
      @cancel="onCancel"
    >
      <view class="custom-content">
        <text class="custom-title">这是自定义内容</text>
        <text class="custom-desc">可以在这里添加任何自定义的内容，如表单、图片等</text>
        <wd-button type="primary" @click="onCustomAction" style="margin-top: 20px;">自定义操作</wd-button>
      </view>
    </wd-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'

const show = ref(false)

// 显示动作面板
function showActionSheet() {
  show.value = true
}

// 自定义操作
function onCustomAction() {
  console.log('执行了自定义操作')
  show.value = false
}

// 取消回调
function onCancel() {
  console.log('取消了操作')
}
</script>

<style scoped>
.demo-action-sheet {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.custom-content {
  padding: 20px;
  text-align: center;
}

.custom-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}

.custom-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: block;
}
</style>
```

## 样式定制指南

### 自定义整体样式

通过 `customStyle` 和 `customClass` 属性可以自定义组件的整体样式：

```vue
<template>
  <wd-action-sheet
    v-model="show"
    :actions="actions"
    customStyle="margin: 0 20px; border-radius: 20px;"
    customClass="custom-action-sheet"
  ></wd-action-sheet>
</template>

<style>
.custom-action-sheet {
  /* 自定义样式 */
  background-color: #f5f7fa;
}
</style>
```

### 自定义头部样式

通过 `customHeaderClass` 属性可以自定义头部样式：

```vue
<template>
  <wd-action-sheet
    v-model="show"
    :actions="actions"
    title="自定义头部"
    customHeaderClass="custom-header"
  ></wd-action-sheet>
</template>

<style>
.custom-header {
  /* 自定义头部样式 */
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
```

### 自定义选项样式

通过 `actions` 属性中的 `color` 属性可以自定义选项颜色：

```vue
<template>
  <wd-action-sheet
    v-model="show"
    :actions="actions"
  ></wd-action-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Action } from '@/uni_modules/wot-ui-plus/components/wd-action-sheet/types'

const show = ref(false)

const actions = ref<Action[]>([
  { name: '正常选项' },
  { name: '红色选项', color: '#ff4d4f' },
  { name: '蓝色选项', color: '#409eff' },
  { name: '绿色选项', color: '#67c23a' }
])
</script>
```

## 注意事项

1. **菜单选项与面板项**：
   - 同时设置 `actions` 和 `panels` 属性时，会同时显示菜单选项和面板项
   - 建议根据实际需求选择其中一种或两种结合使用

2. **面板项格式**：
   - `panels` 属性可以为一维数组或二维数组
   - 一维数组时，面板项会在一行显示
   - 二维数组时，面板项会多行显示，每行显示一个数组中的元素

3. **选项状态**：
   - 可以通过 `disabled` 属性禁用选项
   - 可以通过 `loading` 属性设置选项为加载中状态
   - 禁用或加载中的选项无法点击

4. **关闭方式**：
   - 点击选项后是否关闭菜单可以通过 `closeOnClickAction` 属性控制
   - 点击遮罩是否关闭菜单可以通过 `closeOnClickModal` 属性控制
   - 可以通过点击标题栏的关闭按钮关闭菜单
   - 可以通过点击取消按钮关闭菜单

5. **性能优化**：
   - 开启 `lazyRender` 属性可以实现弹层内容懒渲染，触发展示时才渲染内容
   - 开启 `rootPortal` 属性可以解决各种 fixed 失效问题

6. **多平台适配**：
   - 组件使用了条件编译处理不同平台的差异
   - 不同平台的表现可能存在细微差异，建议在不同平台上进行充分测试

7. **生命周期事件**：
   - 提供了完整的生命周期事件，包括 open、opened、close、closed 等
   - 可以利用这些事件进行扩展，如在菜单打开时加载数据，在菜单关闭时清理资源等

## 常见问题解决方案

1. **菜单无法显示**：
   - 检查 `modelValue` 属性是否正确设置
   - 检查 `actions` 或 `panels` 属性是否有值
   - 检查组件是否正确引入和注册

2. **选项点击无响应**：
   - 检查选项是否被禁用或处于加载中状态
   - 检查 `select` 事件是否正确绑定

3. **菜单无法关闭**：
   - 检查 `closeOnClickAction` 和 `closeOnClickModal` 属性是否设置为 `false`
   - 检查是否正确调用了关闭方法

4. **样式显示异常**：
   - 检查自定义样式是否正确
   - 检查是否与其他样式冲突
   - 尝试使用 `!important` 强制覆盖样式

5. **多平台兼容性问题**：
   - 在不同平台上进行充分测试
   - 注意不同平台的差异，使用条件编译进行处理

## 性能优化建议

1. **开启懒渲染**：
   - 对于内容较多的菜单，建议开启 `lazyRender` 属性，实现弹层内容懒渲染
   - 可以减少初始渲染时间，提高页面加载性能

2. **合理设置 z-index**：
   - 根据实际需求合理设置 `zIndex` 属性，避免层级冲突
   - 建议使用相对较小的层级值，避免影响其他组件

3. **避免频繁更新**：
   - 避免频繁修改 `actions` 或 `panels` 属性，以免影响性能
   - 建议在初始化时设置好菜单选项，减少后续更新

4. **使用 rootPortal**：
   - 在遇到 fixed 失效问题时，建议开启 `rootPortal` 属性
   - 可以解决各种 fixed 失效问题，提高组件的兼容性

5. **合理使用事件**：
   - 只监听需要的事件，避免不必要的事件监听
   - 在事件处理函数中避免执行复杂的操作，影响性能
