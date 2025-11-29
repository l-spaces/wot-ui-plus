# wd-grid 宫格

## 组件概述

宫格组件是一个用于创建网格布局的容器组件，它可以快速生成固定列数的网格布局，支持自定义列数、间距、边框样式等。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，通常与 wd-grid-item 子组件配合使用，用于展示图标、文字等内容。

### 功能描述
- 支持自定义列数
- 支持自定义格子间距
- 支持正方形格子
- 支持显示边框
- 支持自定义背景颜色
- 支持点击反馈
- 支持自定义 hover 样式
- 轻量级设计，性能开销小

### 适用场景
- 首页功能入口
- 分类导航
- 图标展示
- 数据统计卡片
- 任何需要网格布局的场景

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| clickable | boolean | false | 否 | 是否开启格子点击反馈 |
| square | boolean | false | 否 | 是否将格子固定为正方形 |
| column | number | - | 否 | 列数，必须大于0 |
| border | boolean | false | 否 | 是否显示边框 |
| bgColor | string | '' | 否 | 背景颜色 |
| gutter | number | - | 否 | 格子之间的间距，默认单位为px |
| hoverClass | string | - | 否 | 自定义内容区域hover-class |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
组件本身不直接触发事件，主要通过 provide/inject 机制与子组件通信。

### Methods
组件未对外暴露任何方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于放置 wd-grid-item 子组件 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-grid column="3">
      <wd-grid-item v-for="item in items" :key="item.id" :text="item.text">
        <template #icon>
          <text class="icon">{{ item.icon }}</text>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: '功能1', icon: '📱' },
  { id: 2, text: '功能2', icon: '📞' },
  { id: 3, text: '功能3', icon: '📧' },
  { id: 4, text: '功能4', icon: '📷' },
  { id: 5, text: '功能5', icon: '🎵' },
  { id: 6, text: '功能6', icon: '🎮' }
])
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.icon {
  font-size: 36px;
}
</style>
```

### 自定义列数和间距

```vue
<template>
  <view class="container">
    <wd-grid column="4" :gutter="10">
      <wd-grid-item v-for="item in items" :key="item.id" :text="item.text">
        <template #icon>
          <text class="icon">{{ item.icon }}</text>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: '功能1', icon: '📱' },
  { id: 2, text: '功能2', icon: '📞' },
  { id: 3, text: '功能3', icon: '📧' },
  { id: 4, text: '功能4', icon: '📷' },
  { id: 5, text: '功能5', icon: '🎵' },
  { id: 6, text: '功能6', icon: '🎮' },
  { id: 7, text: '功能7', icon: '📚' },
  { id: 8, text: '功能8', icon: '🗓️' }
])
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.icon {
  font-size: 32px;
}
</style>
```

### 正方形格子和边框

```vue
<template>
  <view class="container">
    <wd-grid column="3" square border>
      <wd-grid-item v-for="item in items" :key="item.id" :text="item.text">
        <template #icon>
          <text class="icon">{{ item.icon }}</text>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: '功能1', icon: '📱' },
  { id: 2, text: '功能2', icon: '📞' },
  { id: 3, text: '功能3', icon: '📧' },
  { id: 4, text: '功能4', icon: '📷' },
  { id: 5, text: '功能5', icon: '🎵' },
  { id: 6, text: '功能6', icon: '🎮' }
])
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.icon {
  font-size: 36px;
}
</style>
```

### 点击反馈和自定义背景

```vue
<template>
  <view class="container">
    <wd-grid column="3" clickable :bg-color="'#fff'">
      <wd-grid-item 
        v-for="item in items" 
        :key="item.id" 
        :text="item.text"
        @click="onItemClick(item)"
      >
        <template #icon>
          <text class="icon">{{ item.icon }}</text>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: '功能1', icon: '📱' },
  { id: 2, text: '功能2', icon: '📞' },
  { id: 3, text: '功能3', icon: '📧' },
  { id: 4, text: '功能4', icon: '📷' },
  { id: 5, text: '功能5', icon: '🎵' },
  { id: 6, text: '功能6', icon: '🎮' }
])

const onItemClick = (item: any) => {
  console.log('点击了', item.text)
  // 执行相应的业务逻辑
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.icon {
  font-size: 36px;
}
</style>
```

### 自定义样式和hover效果

```vue
<template>
  <view class="container">
    <wd-grid 
      column="3" 
      clickable 
      hover-class="grid-hover"
      :custom-style="{
        borderRadius: '12px',
        overflow: 'hidden'
      }"
    >
      <wd-grid-item 
        v-for="item in items" 
        :key="item.id" 
        :text="item.text"
        :custom-style="{
          borderRadius: '12px'
        }"
      >
        <template #icon>
          <text class="icon">{{ item.icon }}</text>
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: '功能1', icon: '📱' },
  { id: 2, text: '功能2', icon: '📞' },
  { id: 3, text: '功能3', icon: '📧' }
])
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.icon {
  font-size: 40px;
}

/* 自定义hover样式 */
.grid-hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
  transform: scale(0.98);
  transition: all 0.2s ease;
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-grid custom-class="my-grid" />

<style>
.my-grid {
  /* 自定义样式 */
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### customStyle 用法
```vue
<wd-grid 
  :custom-style="{
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }"
/>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-grid {
  /* 自定义间距 */
  --grid-gutter: 0px;
  /* 自定义背景颜色 */
  --grid-background-color: transparent;
  /* 自定义边框颜色 */
  --grid-border-color: #e5e5e5;
}

.wd-grid-item {
  /* 自定义格子宽度 */
  --grid-item-width: 33.3333%;
  /* 自定义格子高度 */
  --grid-item-height: auto;
  /* 自定义文字颜色 */
  --grid-item-text-color: #666;
  /* 自定义文字大小 */
  --grid-item-text-font-size: 12px;
}
```

## 注意事项

1. **性能优化**：
   - 组件本身非常轻量，性能开销小，可以放心使用
   - 对于大量数据的网格，建议合理设置列数，避免单行显示过多元素
   - 避免在循环中使用复杂的计算属性或方法，影响渲染性能

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致
   - 在小程序平台上，hover-class 属性的效果可能略有差异

3. **使用限制**：
   - 宫格组件必须与 wd-grid-item 子组件配合使用，否则无法实现完整的布局效果
   - column 属性必须大于 0，否则会输出错误信息
   - gutter 属性的单位默认为 px，不支持其他单位

4. **最佳实践**：
   - 为不同场景定义统一的网格布局规范，如 3 列、4 列等
   - 合理设置 gutter 属性，保持页面元素之间的呼吸感
   - 对于需要点击交互的网格，建议开启 clickable 属性，提供良好的用户反馈
   - 结合 wd-grid-item 的插槽功能，可以实现更复杂的网格内容

5. **常见问题**：
   - 问题：网格布局错乱
     解决方案：检查 column 属性是否设置正确，确保子组件数量与列数匹配
   - 问题：边框显示异常
     解决方案：确保 border 属性设置为 true，且子组件正确继承了父组件的配置
   - 问题：点击反馈不生效
     解决方案：检查 clickable 属性是否设置为 true，或自定义 hover-class 是否正确
