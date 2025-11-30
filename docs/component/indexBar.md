# wd-index-bar 索引栏

## 组件概述

索引栏组件是一个用于快速定位和滚动到指定区域的导航组件，通常与索引锚点组件（wd-index-anchor）配合使用。它在右侧显示索引列表，用户可以通过点击或滑动索引来快速跳转到对应区域，适用于联系人列表、城市选择等场景。

### 功能描述
- 支持点击索引快速定位到对应区域
- 支持滑动索引快速滚动到对应区域
- 支持索引吸顶功能
- 自动高亮当前激活的索引
- 支持自定义索引样式
- 支持跨端使用

### 适用场景
- 联系人列表
- 城市选择器
- 分类列表
- 长列表快速定位
- 任何需要快速导航的长页面

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| sticky | boolean | false | 否 | 索引是否吸顶 |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
组件本身不直接触发事件，主要通过 provide/inject 机制与子组件通信。

### Methods
组件未对外暴露任何方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于放置 wd-index-anchor 子组件 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-index-bar>
      <wd-index-anchor index="A">
        <view class="section">
          <text class="title">A</text>
          <view class="item" v-for="item in listA" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="B">
        <view class="section">
          <text class="title">B</text>
          <view class="item" v-for="item in listB" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="C">
        <view class="section">
          <text class="title">C</text>
          <view class="item" v-for="item in listC" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
    </wd-index-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const listA = ref(['A1', 'A2', 'A3', 'A4', 'A5'])
const listB = ref(['B1', 'B2', 'B3', 'B4', 'B5', 'B6'])
const listC = ref(['C1', 'C2', 'C3', 'C4'])
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.section {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.item {
  padding: 15px 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  color: #666;
}

.item:last-child {
  border-bottom: none;
}
</style>
```

### 吸顶索引

```vue
<template>
  <view class="container">
    <wd-index-bar sticky>
      <wd-index-anchor index="A">
        <view class="section">
          <text class="title">A</text>
          <view class="item" v-for="item in listA" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="B">
        <view class="section">
          <text class="title">B</text>
          <view class="item" v-for="item in listB" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="C">
        <view class="section">
          <text class="title">C</text>
          <view class="item" v-for="item in listC" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
    </wd-index-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const listA = ref(['A1', 'A2', 'A3', 'A4', 'A5'])
const listB = ref(['B1', 'B2', 'B3', 'B4', 'B5', 'B6'])
const listC = ref(['C1', 'C2', 'C3', 'C4'])
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.section {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.item {
  padding: 15px 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  color: #666;
}

.item:last-child {
  border-bottom: none;
}
</style>
```

### 自定义索引样式

```vue
<template>
  <view class="container">
    <wd-index-bar custom-class="my-index-bar">
      <wd-index-anchor index="1">
        <view class="section">
          <text class="title">第一组</text>
          <view class="item" v-for="item in list1" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="2">
        <view class="section">
          <text class="title">第二组</text>
          <view class="item" v-for="item in list2" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="3">
        <view class="section">
          <text class="title">第三组</text>
          <view class="item" v-for="item in list3" :key="item">{{ item }}</view>
        </view>
      </wd-index-anchor>
    </wd-index-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list1 = ref(['1-1', '1-2', '1-3', '1-4', '1-5'])
const list2 = ref(['2-1', '2-2', '2-3', '2-4', '2-5'])
const list3 = ref(['3-1', '3-2', '3-3', '3-4'])
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.section {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.item {
  padding: 15px 0;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  color: #666;
}

.item:last-child {
  border-bottom: none;
}

/* 自定义索引栏样式 */
.my-index-bar .wd-index-bar__sidebar {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 10px 0;
  margin-right: 5px;
}

.my-index-bar .wd-index-bar__index {
  font-size: 14px;
  color: #666;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
}

.my-index-bar .wd-index-bar__index.is-active {
  color: #1989fa;
  font-weight: bold;
  background-color: rgba(25, 137, 250, 0.1);
  border-radius: 50%;
}
</style>
```

### 城市选择器

```vue
<template>
  <view class="container">
    <view class="header">
      <text class="title">选择城市</text>
    </view>
    <wd-index-bar>
      <wd-index-anchor index="热">
        <view class="section">
          <text class="title">热门城市</text>
          <view class="city-list">
            <view class="city-item" v-for="city in hotCities" :key="city">{{ city }}</view>
          </view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="A">
        <view class="section">
          <text class="title">A</text>
          <view class="city-item" v-for="city in citiesA" :key="city">{{ city }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="B">
        <view class="section">
          <text class="title">B</text>
          <view class="city-item" v-for="city in citiesB" :key="city">{{ city }}</view>
        </view>
      </wd-index-anchor>
      <wd-index-anchor index="C">
        <view class="section">
          <text class="title">C</text>
          <view class="city-item" v-for="city in citiesC" :key="city">{{ city }}</view>
        </view>
      </wd-index-anchor>
    </wd-index-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const hotCities = ref(['北京', '上海', '广州', '深圳', '杭州'])
const citiesA = ref(['安庆', '安阳', '鞍山', '安顺'])
const citiesB = ref(['北京', '保定', '包头', '宝鸡', '本溪'])
const citiesC = ref(['成都', '重庆', '长沙', '长春', '常州'])
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 10;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.section {
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 10px;
}

.section .title {
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
}

.city-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.city-item {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.city-list .city-item {
  width: calc(33.33% - 7px);
  text-align: center;
  margin-bottom: 10px;
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-index-bar custom-class="my-index-bar">
  <!-- 内容 -->
</wd-index-bar>

<style>
.my-index-bar {
  /* 自定义样式 */
  background-color: #f5f5f5;
}

/* 自定义侧边栏样式 */
.my-index-bar .wd-index-bar__sidebar {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 10px 0;
}

/* 自定义索引样式 */
.my-index-bar .wd-index-bar__index {
  font-size: 14px;
  color: #666;
}

/* 自定义激活索引样式 */
.my-index-bar .wd-index-bar__index.is-active {
  color: #1989fa;
  font-weight: bold;
  background-color: rgba(25, 137, 250, 0.1);
  border-radius: 50%;
}
</style>
```

### customStyle 用法
```vue
<wd-index-bar 
  :custom-style="{
    backgroundColor: '#f5f5f5',
    margin: '10px'
  }"
>
  <!-- 内容 -->
</wd-index-bar>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-index-bar {
  /* 自定义侧边栏背景颜色 */
  --index-bar-sidebar-background-color: transparent;
  /* 自定义索引文字颜色 */
  --index-bar-index-color: #666;
  /* 自定义激活索引文字颜色 */
  --index-bar-index-active-color: #1989fa;
  /* 自定义索引宽度 */
  --index-bar-index-width: 24px;
  /* 自定义索引高度 */
  --index-bar-index-height: 24px;
  /* 自定义索引字体大小 */
  --index-bar-index-font-size: 12px;
}
```

## 注意事项

1. **性能优化**：
   - 对于大量数据的列表，建议合理使用分页或虚拟列表，避免一次性渲染过多内容
   - 索引锚点的内容应尽量简洁，避免复杂的嵌套结构
   - 避免在滚动事件中执行复杂计算，影响滚动流畅度

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致，但在小程序平台上，触摸事件的处理可能略有差异
   - H5 平台上，建议使用现代浏览器以获得最佳体验

3. **使用限制**：
   - 索引栏组件必须与 wd-index-anchor 子组件配合使用，否则无法实现完整的索引功能
   - 每个 wd-index-anchor 组件必须设置唯一的 index 属性
   - 索引栏组件的高度应设置为固定值或占满父容器，以确保滚动功能正常

4. **最佳实践**：
   - 合理设置索引值，建议使用字母、数字或简短的中文作为索引
   - 对于长列表，建议使用 sticky 属性，提高用户体验
   - 结合 CSS 变量自定义样式，保持与整体设计风格一致
   - 对于需要动态加载数据的场景，建议在数据加载完成后再渲染索引栏组件

5. **常见问题**：
   - 问题：索引点击后无法滚动到对应位置
     解决方案：检查索引锚点的 index 属性是否唯一，内容区是否设置了正确的高度
   - 问题：索引高亮状态不正确
     解决方案：检查滚动事件是否正常触发，索引锚点的位置计算是否准确
   - 问题：触摸滑动索引不流畅
     解决方案：减少触摸事件中的计算量，优化滚动性能
