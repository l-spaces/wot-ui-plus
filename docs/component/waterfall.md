# wd-waterfall 瀑布流组件

## 组件概述

wd-waterfall 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台瀑布流组件，用于实现不规则高度元素的自适应排列，使页面布局更加美观和高效。该组件支持自定义列数、数据添加间隔时间、id 字段名等配置，适用于图片展示、商品列表、文章列表等需要不规则高度布局的场景。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | array | [] | 否 | 瀑布流数据 |
| addTime | number | 200 | 否 | 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好，单位ms |
| idKey | string | 'id' | 否 | id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{id: 22, name: 'lisa'} |
| column | number | 2 | 否 | 瀑布流的列数，不可动态修改 |
| customStyle | string | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 当数据列表变化时触发 | value: 新的数据列表 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| clear | - | - | 清空数据列表 |
| remove | id: string \| number | - | 清除某一条指定的数据 |
| modify | id: string \| number, key: string, value: any | - | 修改某条数据的某个属性 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | columnList: 当前列的数据列表<br>columnIndex: 当前列的索引 | 自定义瀑布流每列的内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-waterfall">
    <wd-waterfall :modelValue="list">
      <template #default="{ columnList, columnIndex }">
        <view v-for="(item, index) in columnList" :key="item.id" class="waterfall-item">
          <image :src="item.image" mode="aspectFill" class="waterfall-item__image"></image>
          <view class="waterfall-item__content">
            <text class="waterfall-item__title">{{ item.title }}</text>
            <text class="waterfall-item__desc">{{ item.desc }}</text>
          </view>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 模拟数据
const list = ref([
  { id: 1, title: '瀑布流示例1', desc: '这是一个瀑布流示例，展示了不规则高度元素的自适应排列', image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, title: '瀑布流示例2', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/400?random=2' },
  { id: 3, title: '瀑布流示例3', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/300?random=3' },
  { id: 4, title: '瀑布流示例4', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力，这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/250?random=4' },
  { id: 5, title: '瀑布流示例5', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/350?random=5' },
  { id: 6, title: '瀑布流示例6', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/280?random=6' }
])
</script>

<style scoped>
.demo-waterfall {
  padding: 20px;
}

.waterfall-item {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.waterfall-item__image {
  width: 100%;
}

.waterfall-item__content {
  padding: 12px;
}

.waterfall-item__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.waterfall-item__desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
```

### 自定义列数

```vue
<template>
  <view class="demo-waterfall">
    <wd-waterfall :modelValue="list" :column="3">
      <template #default="{ columnList, columnIndex }">
        <view v-for="(item, index) in columnList" :key="item.id" class="waterfall-item">
          <image :src="item.image" mode="aspectFill" class="waterfall-item__image"></image>
          <view class="waterfall-item__content">
            <text class="waterfall-item__title">{{ item.title }}</text>
            <text class="waterfall-item__desc">{{ item.desc }}</text>
          </view>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 模拟数据
const list = ref([
  { id: 1, title: '瀑布流示例1', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, title: '瀑布流示例2', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/400?random=2' },
  { id: 3, title: '瀑布流示例3', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/300?random=3' },
  { id: 4, title: '瀑布流示例4', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/250?random=4' },
  { id: 5, title: '瀑布流示例5', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/350?random=5' },
  { id: 6, title: '瀑布流示例6', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/280?random=6' },
  { id: 7, title: '瀑布流示例7', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/220?random=7' },
  { id: 8, title: '瀑布流示例8', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/380?random=8' },
  { id: 9, title: '瀑布流示例9', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/260?random=9' }
])
</script>

<style scoped>
.demo-waterfall {
  padding: 20px;
}

.waterfall-item {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.waterfall-item__image {
  width: 100%;
}

.waterfall-item__content {
  padding: 12px;
}

.waterfall-item__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.waterfall-item__desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
```

### 动态加载数据

```vue
<template>
  <view class="demo-waterfall">
    <wd-waterfall :modelValue="list" ref="waterfallRef">
      <template #default="{ columnList, columnIndex }">
        <view v-for="(item, index) in columnList" :key="item.id" class="waterfall-item">
          <image :src="item.image" mode="aspectFill" class="waterfall-item__image"></image>
          <view class="waterfall-item__content">
            <text class="waterfall-item__title">{{ item.title }}</text>
            <text class="waterfall-item__desc">{{ item.desc }}</text>
          </view>
        </view>
      </template>
    </wd-waterfall>
    <view class="load-more" @click="loadMore" v-if="!loading">加载更多</view>
    <view class="loading" v-else>加载中...</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'

// 模拟数据
const list = ref([
  { id: 1, title: '瀑布流示例1', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/200?random=1' },
  { id: 2, title: '瀑布流示例2', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/400?random=2' },
  { id: 3, title: '瀑布流示例3', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/300?random=3' },
  { id: 4, title: '瀑布流示例4', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/250?random=4' }
])

const loading = ref(false)
const waterfallRef = ref<any>(null)
let page = 1

// 加载更多数据
function loadMore() {
  loading.value = true
  
  // 模拟异步请求
  setTimeout(() => {
    // 生成新数据
    const newData = Array.from({ length: 4 }, (_, index) => {
      const id = list.value.length + index + 1
      return {
        id,
        title: `瀑布流示例${id}`,
        desc: Math.random() > 0.5 ? '这是一个瀑布流示例' : '这是一个较长的描述，用于测试瀑布流的高度自适应能力',
        image: `https://picsum.photos/300/${Math.floor(Math.random() * 200) + 200}?random=${id}`
      }
    })
    
    // 添加新数据到列表
    list.value = [...list.value, ...newData]
    page++
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.demo-waterfall {
  padding: 20px;
}

.waterfall-item {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.waterfall-item__image {
  width: 100%;
}

.waterfall-item__content {
  padding: 12px;
}

.waterfall-item__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.waterfall-item__desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.load-more {
  text-align: center;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-top: 20px;
  color: #409eff;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin-top: 20px;
  color: #909399;
}
</style>
```

### 使用组件方法

```vue
<template>
  <view class="demo-waterfall">
    <view class="btn-group">
      <wd-button type="primary" @click="clearList">清空列表</wd-button>
      <wd-button type="success" @click="removeItem">删除第一项</wd-button>
      <wd-button type="warning" @click="modifyItem">修改第一项</wd-button>
    </view>
    <wd-waterfall :modelValue="list" ref="waterfallRef">
      <template #default="{ columnList, columnIndex }">
        <view v-for="(item, index) in columnList" :key="item.id" class="waterfall-item">
          <image :src="item.image" mode="aspectFill" class="waterfall-item__image"></image>
          <view class="waterfall-item__content">
            <text class="waterfall-item__title">{{ item.title }}</text>
            <text class="waterfall-item__desc">{{ item.desc }}</text>
            <text class="waterfall-item__status">{{ item.status }}</text>
          </view>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'

// 模拟数据
const list = ref([
  { id: 1, title: '瀑布流示例1', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/200?random=1', status: '正常' },
  { id: 2, title: '瀑布流示例2', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/400?random=2', status: '正常' },
  { id: 3, title: '瀑布流示例3', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/300?random=3', status: '正常' },
  { id: 4, title: '瀑布流示例4', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/250?random=4', status: '正常' }
])

const waterfallRef = ref<any>(null)

// 清空列表
function clearList() {
  waterfallRef.value?.clear()
}

// 删除第一项
function removeItem() {
  if (list.value.length > 0) {
    waterfallRef.value?.remove(list.value[0].id)
  }
}

// 修改第一项
function modifyItem() {
  if (list.value.length > 0) {
    waterfallRef.value?.modify(list.value[0].id, 'status', '已修改')
  }
}
</script>

<style scoped>
.demo-waterfall {
  padding: 20px;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.waterfall-item {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.waterfall-item__image {
  width: 100%;
}

.waterfall-item__content {
  padding: 12px;
}

.waterfall-item__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.waterfall-item__desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 8px;
  display: block;
}

.waterfall-item__status {
  font-size: 12px;
  color: #f56c6c;
  display: block;
}
</style>
```

### 自定义数据添加间隔

```vue
<template>
  <view class="demo-waterfall">
    <wd-waterfall :modelValue="list" :addTime="500">
      <template #default="{ columnList, columnIndex }">
        <view v-for="(item, index) in columnList" :key="item.id" class="waterfall-item">
          <image :src="item.image" mode="aspectFill" class="waterfall-item__image"></image>
          <view class="waterfall-item__content">
            <text class="waterfall-item__title">{{ item.title }}</text>
            <text class="waterfall-item__desc">{{ item.desc }}</text>
          </view>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// 模拟数据
const list = ref([])

onMounted(() => {
  // 模拟异步加载数据
  setTimeout(() => {
    list.value = [
      { id: 1, title: '瀑布流示例1', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/200?random=1' },
      { id: 2, title: '瀑布流示例2', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/400?random=2' },
      { id: 3, title: '瀑布流示例3', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/300?random=3' },
      { id: 4, title: '瀑布流示例4', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/250?random=4' },
      { id: 5, title: '瀑布流示例5', desc: '这是一个瀑布流示例', image: 'https://picsum.photos/300/350?random=5' },
      { id: 6, title: '瀑布流示例6', desc: '这是一个较长的描述，用于测试瀑布流的高度自适应能力', image: 'https://picsum.photos/300/280?random=6' }
    ]
  }, 500)
})
</script>

<style scoped>
.demo-waterfall {
  padding: 20px;
}

.waterfall-item {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.waterfall-item__image {
  width: 100%;
}

.waterfall-item__content {
  padding: 12px;
}

.waterfall-item__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.waterfall-item__desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
```

## 样式定制指南

### 自定义整体样式

通过 `customStyle` 和 `customClass` 属性可以自定义组件的整体样式：

```vue
<template>
  <wd-waterfall 
    :modelValue="list" 
    customStyle="margin: 20px; padding: 10px; background-color: #f5f7fa; border-radius: 8px;" 
    customClass="custom-waterfall"
  >
    <!-- 插槽内容 -->
  </wd-waterfall>
</template>

<style>
.custom-waterfall {
  /* 自定义样式 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义列样式

通过 CSS 选择器可以自定义瀑布流列的样式：

```vue
<template>
  <wd-waterfall :modelValue="list">
    <!-- 插槽内容 -->
  </wd-waterfall>
</template>

<style>
/* 自定义列样式 */
.wd-waterfall--column {
  /* 自定义列间距 */
  margin-right: 10px;
}

/* 最后一列去除右边距 */
.wd-waterfall--column:last-child {
  margin-right: 0;
}
</style>
```

### 自定义项样式

通过自定义插槽内容，可以完全控制瀑布流每一项的样式：

```vue
<template>
  <wd-waterfall :modelValue="list">
    <template #default="{ columnList, columnIndex }">
      <view v-for="(item, index) in columnList" :key="item.id" class="custom-item">
        <!-- 自定义项内容 -->
      </view>
    </template>
  </wd-waterfall>
</template>

<style scoped>
.custom-item {
  /* 自定义项样式 */
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. **列数配置**：`column` 属性用于设置瀑布流的列数，不可动态修改，建议在组件初始化时确定。

2. **数据格式**：`modelValue` 属性接收一个数组，数组中的每个对象必须包含一个唯一的 `id` 字段（或通过 `idKey` 属性指定的字段名），用于数据的删除和修改操作。

3. **性能优化**：
   - 对于大量数据的场景，建议使用分页加载或虚拟滚动技术，避免一次性加载过多数据导致页面卡顿。
   - `addTime` 属性用于控制每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但对用户体验越不好，建议根据实际情况调整。

4. **图片加载**：建议使用图片懒加载技术，避免一次性加载过多图片导致页面卡顿和网络请求过多。

5. **多平台适配**：组件使用了 `uni.createSelectorQuery()` 来获取元素高度，在不同平台上可能存在差异，建议在实际使用中进行充分测试。

6. **动态数据更新**：当动态添加数据时，组件会自动将新数据分配到高度最短的列中，确保各列高度尽量均衡。

7. **方法调用**：组件暴露了 `clear`、`remove` 和 `modify` 三个方法，用于操作数据列表，建议通过 `ref` 引用组件实例后调用这些方法。

8. **插槽使用**：默认插槽提供了 `columnList` 和 `columnIndex` 两个作用域变量，用于自定义每列的内容，建议充分利用这些变量来实现复杂的布局需求。

## 常见问题解决方案

1. **列高度不均衡**：
   - 调整 `addTime` 属性，增加数据添加间隔时间，让组件有足够的时间计算列高度。
   - 确保图片等异步加载的元素在加载完成后能正确触发组件的高度计算。

2. **数据更新后布局异常**：
   - 确保数据更新时使用了正确的方式，避免直接修改原数组，建议使用 `concat` 或扩展运算符创建新数组。
   - 检查数据中的 `id` 字段是否唯一，避免重复的 `id` 导致数据操作异常。

3. **组件初始化时无内容**：
   - 检查 `modelValue` 属性是否正确传递了数据。
   - 确保数据格式正确，是一个包含 `id` 字段的对象数组。

4. **方法调用无效**：
   - 确保通过 `ref` 正确引用了组件实例。
   - 检查方法名是否正确，参数是否符合要求。

5. **多平台兼容性问题**：
   - 在不同平台上进行充分测试，特别是小程序和 H5 平台。
   - 对于平台差异，建议使用条件编译进行处理。

## 性能优化建议

1. **数据分页加载**：对于大量数据的场景，建议使用分页加载技术，每次只加载部分数据，避免一次性加载过多数据导致页面卡顿。

2. **图片懒加载**：使用图片懒加载技术，只有当图片进入视口时才加载，减少初始加载时间和网络请求。

3. **合理设置 addTime**：根据实际情况调整 `addTime` 属性，在保证布局均衡的前提下，尽量减少数据添加间隔时间，提高用户体验。

4. **避免频繁更新数据**：尽量避免频繁更新数据，建议将多次数据更新合并为一次，减少组件的重新计算和渲染次数。

5. **使用虚拟滚动**：对于超大量数据的场景，建议使用虚拟滚动技术，只渲染当前视口内的元素，大幅提高性能。

6. **优化元素高度计算**：确保元素高度能被正确计算，避免因异步加载等原因导致高度计算不准确。
