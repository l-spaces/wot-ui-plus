# wd-floating-panel 悬浮面板

## 组件概述

悬浮面板是一个可拖拽调整高度的面板组件，支持自定义锚点位置，常用于地图、图片预览等场景下的辅助信息展示。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，具有跨端兼容性好、交互流畅、配置灵活等特点。

### 功能描述
- 支持拖拽调整面板高度
- 可配置多个锚点位置，面板会自动吸附到最近的锚点
- 支持底部安全距离设置，适配 iPhone X 等机型
- 支持自定义动画时长
- 支持内容区拖拽控制
- 提供高度变化事件，方便业务逻辑处理

### 适用场景
- 地图应用中的信息面板
- 图片/视频预览时的操作面板
- 筛选条件面板
- 底部弹出的菜单或表单
- 任何需要可调整高度的悬浮面板场景

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| height | number | 0 | 否 | 面板的初始显示高度 |
| anchors | number[] | [100, windowHeight * 0.6] | 否 | 自定义锚点数组，面板会自动吸附到最近的锚点 |
| safeAreaInsetBottom | boolean | false | 否 | 是否显示底部安全距离，适配 iPhone X 等机型 |
| showScrollbar | boolean | true | 否 | 是否显示滚动条 |
| duration | number/string | 300 | 否 | 动画时长，单位毫秒 |
| contentDraggable | boolean | true | 否 | 是否允许内容区容器拖拽 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:height | 面板高度变化时 | 新的高度值（number） |
| height-change | 面板高度变化结束时 | { height: number } - 包含新高度的对象 |

### Methods
组件未对外暴露任何方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 面板内容区域，用于放置自定义内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-floating-panel :height="200">
      <view class="content">
        <text class="title">基础悬浮面板</text>
        <text class="desc">拖拽顶部横条可以调整面板高度</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
</style>
```

### 自定义锚点

```vue
<template>
  <view class="container">
    <wd-floating-panel :height="300" :anchors="[100, 300, 500]">
      <view class="content">
        <text class="title">自定义锚点面板</text>
        <text class="desc">面板会自动吸附到 100px、300px 或 500px 高度</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
</style>
```

### 底部安全距离适配

```vue
<template>
  <view class="container">
    <wd-floating-panel :height="200" safe-area-inset-bottom>
      <view class="content">
        <text class="title">底部安全距离适配</text>
        <text class="desc">面板底部会自动适配 iPhone X 等机型的安全距离</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
</style>
```

### 禁用内容区拖拽

```vue
<template>
  <view class="container">
    <wd-floating-panel :height="200" :content-draggable="false">
      <scroll-view scroll-y style="height: 100%;">
        <view class="content">
          <text class="title">禁用内容区拖拽</text>
          <text class="desc">只有顶部横条可以拖拽调整高度，内容区可以自由滚动</text>
          <view class="long-content" v-for="item in 20" :key="item">
            内容项 {{ item }}
          </view>
        </view>
      </scroll-view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}

.long-content {
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
}
</style>
```

### 监听高度变化

```vue
<template>
  <view class="container">
    <wd-floating-panel 
      :height="200" 
      @height-change="onHeightChange"
      v-model:height="currentHeight"
    >
      <view class="content">
        <text class="title">监听高度变化</text>
        <text class="desc">当前面板高度：{{ currentHeight }}px</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentHeight = ref(200)

const onHeightChange = (e: { height: number }) => {
  console.log('面板高度变化：', e.height)
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-floating-panel custom-class="my-floating-panel">
  <!-- 内容 -->
</wd-floating-panel>

<style>
.my-floating-panel {
  /* 自定义样式 */
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px 20px 0 0;
}
</style>
```

### customStyle 用法
```vue
<wd-floating-panel 
  :custom-style="{
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px 20px 0 0'
  }"
>
  <!-- 内容 -->
</wd-floating-panel>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-floating-panel {
  /* 自定义背景色 */
  --floating-panel-background-color: #ffffff;
  /* 自定义边框圆角 */
  --floating-panel-border-radius: 16px 16px 0 0;
  /* 自定义头部高度 */
  --floating-panel-header-height: 40px;
  /* 自定义拖拽条颜色 */
  --floating-panel-header-bar-background-color: #e5e5e5;
  /* 自定义拖拽条宽度 */
  --floating-panel-header-bar-width: 40px;
  /* 自定义拖拽条高度 */
  --floating-panel-header-bar-height: 4px;
}
```

## 注意事项

1. **性能优化**：
   - 避免在面板内容中放置过多复杂组件，影响拖拽流畅度
   - 对于长列表内容，建议使用 `scroll-view` 组件包裹，并设置固定高度

2. **跨端兼容**：
   - 在小程序平台上，触摸事件的处理可能略有差异，组件已做兼容处理
   - H5 平台上，建议使用现代浏览器以获得最佳体验

3. **使用限制**：
   - 锚点数组至少需要包含两个值，否则会使用默认值
   - 面板高度不会超过屏幕高度
   - 内容区拖拽功能在某些特殊场景下可能会与内部滚动组件冲突，可通过设置 `contentDraggable: false` 禁用

4. **最佳实践**：
   - 根据实际业务场景合理设置锚点位置，提升用户体验
   - 对于需要频繁调整高度的场景，建议减少锚点数量，提高吸附效率
   - 结合 `v-model:height` 双向绑定，可以更方便地控制面板高度

5. **常见问题**：
   - 问题：面板拖拽不流畅
     解决方案：检查内容区是否包含复杂组件或大量数据，尝试简化内容或禁用内容区拖拽
   - 问题：面板高度无法达到预期值
     解决方案：检查锚点设置是否合理，确保最大锚点值不超过屏幕高度
   - 问题：底部安全距离不生效
     解决方案：确保已设置 `safeAreaInsetBottom: true`，并在支持安全距离的设备上测试

## 组件源码

- 组件主文件：`src/uni_modules/wot-ui-plus/components/wd-floating-panel/wd-floating-panel.vue`
- 类型定义：`src/uni_modules/wot-ui-plus/components/wd-floating-panel/type.ts`
- 样式文件：`src/uni_modules/wot-ui-plus/components/wd-floating-panel/index.scss`
