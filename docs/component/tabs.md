# Tabs 标签页

## 组件概述

Tabs 是一个用于在不同内容区域之间切换的导航组件，支持多种配置选项和交互方式。它通常由标签栏和内容区域组成，用户可以通过点击标签或滑动手势切换不同的内容。

### 功能特点
- 支持粘性布局，标签栏可固定在顶部
- 支持手势滑动切换标签
- 支持标签动画过渡效果
- 支持标签数量过多时的滚动导航
- 支持标签数量过多时的导航地图
- 支持自定义激活项样式
- 支持徽章显示
- 支持禁用特定标签
- 支持自动调整底部激活线宽度

### 适用场景
- 页面内容分类展示
- 表单分步填写
- 数据详情页切换
- 多标签页应用
- 移动端底部导航

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number/string | 0 | 否 | 绑定值，选中标签的索引或名称 |
| slidableNum | number | 6 | 否 | 标签数超过该阈值时可滑动 |
| mapNum | number | 10 | 否 | 标签数超过该阈值时显示导航地图 |
| mapTitle | string | - | 否 | 导航地图的标题 |
| sticky | boolean | false | 否 | 是否使用粘性布局，标签栏固定在顶部 |
| offsetTop | number | 0 | 否 | 粘性布局的吸顶位置，单位为 px |
| swipeable | boolean | false | 否 | 是否开启手势滑动切换标签 |
| autoLineWidth | boolean | false | 否 | 是否自动调整底部激活线宽度，设置了 lineWidth 后无效 |
| lineWidth | number/string | - | 否 | 底部激活线宽度，单位为 px |
| lineHeight | number/string | - | 否 | 底部激活线高度，单位为 px |
| color | string | - | 否 | 激活标签的颜色 |
| inactiveColor | string | - | 否 | 非激活标签的颜色 |
| animated | boolean | false | 否 | 是否开启切换标签内容时的过渡动画 |
| duration | number | 300 | 否 | 切换动画过渡时间，单位为 ms |
| slidable | string | 'auto' | 否 | 是否开启滚动导航，可选值：'auto' | 'always' |
| showScrollbar | boolean | false | 否 | 标签可滑动时是否显示滚动条 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 标签切换时触发 | { index: number, name: any }，index 为选中标签的索引，name 为选中标签的名称 |
| disabled | 点击禁用标签时触发 | { index: number, name: any }，index 为禁用标签的索引，name 为禁用标签的名称 |
| click | 点击标签时触发 | { index: number, name: any }，index 为点击标签的索引，name 为点击标签的名称 |
| update:modelValue | 标签切换时触发 | value: number/string，选中标签的索引或名称，用于双向绑定 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| setActive | value: number/string, init: boolean, setScroll: boolean | void | 设置激活标签，value 为激活值，init 表示是否初始化，setScroll 表示是否设置 scroll-view 滚动 |
| scrollIntoView | - | void | 使选中标签滚动到可视区域 |
| updateLineStyle | animation?: boolean | void | 更新激活项底部线样式，animation 表示是否开启动画，默认开启 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于放置 `wd-tab` 子组件 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-tabs v-model="active">
    <wd-tab title="标签一">
      <view class="tab-content">
        标签一内容
      </view>
    </wd-tab>
    <wd-tab title="标签二">
      <view class="tab-content">
        标签二内容
      </view>
    </wd-tab>
    <wd-tab title="标签三">
      <view class="tab-content">
        标签三内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  min-height: 300rpx;
  background-color: #fff;
}
</style>
```

### 粘性布局

```vue
<template>
  <view>
    <view style="height: 200rpx; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
      <text>顶部内容</text>
    </view>
    <wd-tabs v-model="active" sticky offset-top="50">
      <wd-tab title="粘性标签一">
        <view class="tab-content">
          粘性标签一内容
        </view>
      </wd-tab>
      <wd-tab title="粘性标签二">
        <view class="tab-content">
          粘性标签二内容
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 手势滑动

```vue
<template>
  <wd-tabs v-model="active" swipeable animated>
    <wd-tab title="滑动标签一">
      <view class="tab-content">
        滑动标签一内容
      </view>
    </wd-tab>
    <wd-tab title="滑动标签二">
      <view class="tab-content">
        滑动标签二内容
      </view>
    </wd-tab>
    <wd-tab title="滑动标签三">
      <view class="tab-content">
        滑动标签三内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 自定义激活样式

```vue
<template>
  <wd-tabs 
    v-model="active" 
    color="#1989fa" 
    inactive-color="#646566" 
    :line-width="80" 
    :line-height="4"
  >
    <wd-tab title="自定义样式标签一">
      <view class="tab-content">
        自定义样式标签一内容
      </view>
    </wd-tab>
    <wd-tab title="自定义样式标签二">
      <view class="tab-content">
        自定义样式标签二内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 带徽章的标签

```vue
<template>
  <wd-tabs v-model="active">
    <wd-tab title="消息" :badge-props="{ value: 5 }">
      <view class="tab-content">
        消息内容
      </view>
    </wd-tab>
    <wd-tab title="通知" :badge-props="{ dot: true }">
      <view class="tab-content">
        通知内容
      </view>
    </wd-tab>
    <wd-tab title="设置">
      <view class="tab-content">
        设置内容
      </view>
    </wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-tabs 
  v-model="active" 
  custom-class="my-tabs" 
  custom-style="{ backgroundColor: '#fafafa' }"
>
  <!-- tab components -->
</wd-tabs>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --tabs-background-color | #ffffff | 标签栏背景色 |
| --tabs-active-color | #1989fa | 激活标签颜色 |
| --tabs-inactive-color | #646566 | 非激活标签颜色 |
| --tabs-nav-height | 88rpx | 标签栏高度 |
| --tabs-nav-item-padding | 0 32rpx | 标签项内边距 |
| --tabs-nav-item-font-size | 28rpx | 标签项字体大小 |
| --tabs-line-height | 4rpx | 激活项底部线高度 |
| --tabs-line-color | #1989fa | 激活项底部线颜色 |
| --tabs-line-transition | width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) | 激活项底部线过渡动画 |
| --tabs-map-background-color | #ffffff | 导航地图背景色 |
| --tabs-map-header-color | #909399 | 导航地图标题颜色 |
| --tabs-map-nav-btn-active-color | #1989fa | 导航地图激活按钮颜色 |
| --tabs-mask-background-color | rgba(0, 0, 0, 0.5) | 导航地图遮罩背景色 |

## 注意事项

1. **父子组件关系**：
   - `wd-tabs` 必须与 `wd-tab` 配合使用
   - `wd-tab` 必须作为 `wd-tabs` 的直接子组件

2. **性能优化**：
   - 避免在标签内容中放置过多复杂组件
   - 对于大量标签（超过 10 个），建议启用导航地图
   - 动画效果可能会影响性能，特别是在内容复杂的情况下

3. **粘性布局**：
   - 使用 `sticky` 属性时，建议设置合适的 `offsetTop` 值
   - 粘性布局在某些平台可能存在兼容性问题

4. **手势滑动**：
   - 手势滑动仅在支持触摸事件的设备上有效
   - 建议同时启用 `animated` 属性，以获得更好的用户体验

5. **导航地图**：
   - 导航地图在标签数量超过 `mapNum` 时显示
   - 可以通过 `mapTitle` 自定义导航地图标题

6. **样式覆盖**：
   - 组件使用 `styleIsolation: 'shared'`，支持外部样式覆盖
   - 可以通过 CSS 变量或自定义类名修改样式

7. **事件处理**：
   - `change` 事件在标签切换时触发
   - `click` 事件在点击标签时触发，无论标签是否禁用
   - `disabled` 事件在点击禁用标签时触发

### 状态流转
- 初始状态：根据 `modelValue` 确定激活标签
- 标签点击：更新激活状态，触发 `click` 和 `change` 事件
- 手势滑动：处理触摸事件，更新激活状态
- 滚动事件：同步滚动位置，更新激活线样式
- 导航地图：标签数量超过阈值时显示，点击标签后隐藏

## 与 wd-tab 的关系

`wd-tabs` 组件与 `wd-tab` 组件是紧密集成的关系：

1. **依赖关系**：`wd-tabs` 必须包含一个或多个 `wd-tab` 子组件
2. **通信方式**：通过 Vue 的 provide/inject API 进行通信
3. **状态管理**：激活状态由 `wd-tabs` 统一管理，子组件根据激活状态更新自身样式
4. **布局计算**：`wd-tabs` 根据子组件的标题和配置计算标签宽度
5. **事件处理**：子组件的点击事件通过父组件 `wd-tabs` 统一处理

## 常见问题

### Q: 为什么标签没有显示？
A: 请确保 `wd-tab` 是 `wd-tabs` 的直接子组件，并且 `wd-tab` 已经正确配置了 `title` 属性。

### Q: 如何自定义标签的激活样式？
A: 可以通过 `color`、`lineWidth`、`lineHeight` 等属性自定义激活样式，也可以通过 CSS 变量进行更详细的样式定制。

### Q: 如何实现标签的禁用状态？
A: 可以通过 `wd-tab` 的 `disabled` 属性禁用标签，禁用的标签无法点击，但仍会触发 `disabled` 事件。

### Q: 如何在标签上显示徽章？
A: 可以通过 `wd-tab` 的 `badgeProps` 属性配置徽章，支持数字徽章和点状徽章。

### Q: 为什么手势滑动没有效果？
A: 请确保已经设置了 `swipeable` 属性为 `true`，并且在支持触摸事件的设备上测试。
