# Tour 引导

## 组件概述

wd-tour 是一个用于应用首次使用引导的组件，通过高亮目标元素并显示引导信息，帮助用户快速了解应用的核心功能和操作流程。它支持多步骤引导、自定义样式、灵活的位置调整和交互方式，是提升用户体验的重要工具。

### 功能特点
- 支持多步骤引导流程
- 自动高亮目标元素
- 智能调整引导框位置（上方或下方）
- 支持自定义引导内容和按钮
- 支持蒙版效果
- 支持键盘导航
- 支持点击蒙版切换步骤
- 支持自定义样式和动画
- 支持响应式设计

### 适用场景
- 应用首次使用引导
- 新功能上线引导
- 复杂操作流程引导
- 用户教育和培训

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| modelValue | boolean | false | 否 | 是否显示引导组件，使用 v-model 绑定 |
| steps | array | [] | 否 | 引导步骤列表，每个步骤包含 element（选择器）和 content（引导内容） |
| current | number | 0 | 否 | 引导框的当前步骤索引 |
| mask | boolean | true | 否 | 蒙版是否显示 |
| maskColor | string | 'rgba(0, 0, 0, 0.5)' | 否 | 蒙版颜色（支持 rgba 格式） |
| offset | number | 20 | 否 | 引导框与高亮元素之间的间距 |
| duration | number | 300 | 否 | 动画持续时间（毫秒） |
| borderRadius | number | 8 | 否 | 高亮区域的圆角大小 |
| padding | number | 8 | 否 | 高亮区域的内边距 |
| prevText | string | '上一步' | 否 | 上一步按钮文字 |
| nextText | string | '下一步' | 否 | 下一步按钮文字 |
| skipText | string | '跳过' | 否 | 跳过按钮文字 |
| finishText | string | '完成' | 否 | 完成按钮文字 |
| bottomSafetyOffset | number | 100 | 否 | 安全偏移量，用于滚动计算时确保元素周围有足够的空间 |
| topSafetyOffset | number | 0 | 否 | 顶部安全偏移量，用于滚动计算时确保元素周围有足够的空间 |
| customNav | boolean | false | 否 | 是否自定义顶部导航栏 |
| clickMaskNext | boolean | false | 否 | 点击蒙版是否可以下一步 |
| highlightStyle | object | {} | 否 | 高亮区域样式 |
| zIndex | number | 999998 | 否 | 引导框的层级 |
| showTourButtons | boolean | true | 否 | 是否显示引导按钮 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 引导组件显示状态变化时触发 | value: boolean - 当前显示状态 |
| update:current | 当前步骤变化时触发 | value: number - 当前步骤索引 |
| change | 当前步骤变化时触发 | value: number - 当前步骤索引 |
| prev | 点击上一步按钮时触发 | { oldCurrent: number, current: number, total: number, isUp: number } - 包含旧索引、当前索引、总步骤数和方向信息 |
| next | 点击下一步按钮时触发 | { oldCurrent: number, current: number, total: number, isUp: number } - 包含旧索引、当前索引、总步骤数和方向信息 |
| finish | 点击完成按钮时触发 | { current: number, total: number } - 包含当前索引和总步骤数 |
| skip | 点击跳过按钮时触发 | { current: number, total: number } - 包含当前索引和总步骤数 |
| error | 无法找到指定元素时触发 | { message: string, element: string } - 包含错误信息和目标元素选择器 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| highlight | elementInfo: object - 高亮元素信息 | 自定义高亮元素样式 |
| content | - | 自定义引导内容 |
| prev | - | 自定义上一步按钮 |
| skip | - | 自定义跳过按钮 |
| next | - | 自定义下一步按钮 |
| finish | - | 自定义完成按钮 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| handlePrev | - | - | 切换到上一步 |
| handleNext | - | - | 切换到下一步 |
| handleFinish | - | - | 完成引导流程 |
| handleSkip | - | - | 跳过引导流程 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">开始引导</wd-button>
    <view class="target" id="target1">目标元素1</view>
    <view class="target" id="target2">目标元素2</view>
    <view class="target" id="target3">目标元素3</view>
    
    <wd-tour v-model="showTour" :steps="steps" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#target1',
    content: '这是第一个目标元素的引导信息'
  },
  {
    element: '#target2',
    content: '这是第二个目标元素的引导信息'
  },
  {
    element: '#target3',
    content: '这是第三个目标元素的引导信息'
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.target {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}
</style>
```

### 自定义样式

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">自定义样式引导</wd-button>
    <view class="target" id="custom-target">自定义样式目标元素</view>
    
    <wd-tour 
      v-model="showTour" 
      :steps="steps" 
      :mask-color="'rgba(0, 0, 0, 0.3)'" 
      :border-radius="12" 
      :padding="12" 
      :offset="30"
      prev-text="上一步"
      next-text="下一步"
      finish-text="完成"
      skip-text="跳过"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#custom-target',
    content: '这是自定义样式的引导信息'
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.target {
  padding: 20px;
  background-color: #1989fa;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}
</style>
```

### 自定义内容和按钮

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">自定义内容引导</wd-button>
    <view class="target" id="custom-content-target">自定义内容目标元素</view>
    
    <wd-tour v-model="showTour" :steps="steps">
      <template #content>
        <view class="custom-content">
          <view class="title">自定义引导标题</view>
          <view class="desc">这是自定义的引导内容，可以包含更丰富的样式和结构</view>
        </view>
      </template>
      <template #prev>
        <view class="custom-btn prev-btn">上一步</view>
      </template>
      <template #next>
        <view class="custom-btn next-btn">下一步</view>
      </template>
      <template #finish>
        <view class="custom-btn finish-btn">完成</view>
      </template>
      <template #skip>
        <view class="custom-btn skip-btn">跳过</view>
      </template>
    </wd-tour>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#custom-content-target',
    content: ''
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.target {
  padding: 20px;
  background-color: #07c160;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}

.custom-content {
  padding: 20px;
  text-align: left;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.desc {
  font-size: 14px;
  color: #666;
}

.custom-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.prev-btn {
  background-color: #f5f5f5;
  color: #333;
}

.next-btn {
  background-color: #1989fa;
  color: white;
}

.finish-btn {
  background-color: #07c160;
  color: white;
}

.skip-btn {
  background-color: transparent;
  color: #666;
}
</style>
```

### 点击蒙版切换步骤

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">点击蒙版切换步骤</wd-button>
    <view class="target" id="mask-target1">目标元素1</view>
    <view class="target" id="mask-target2">目标元素2</view>
    <view class="target" id="mask-target3">目标元素3</view>
    
    <wd-tour 
      v-model="showTour" 
      :steps="steps" 
      :click-mask-next="true"
      :mask-color="'rgba(0, 0, 0, 0.6)'"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#mask-target1',
    content: '点击蒙版切换到下一步'
  },
  {
    element: '#mask-target2',
    content: '继续点击蒙版切换到下一步'
  },
  {
    element: '#mask-target3',
    content: '最后一步，点击蒙版完成引导'
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.target {
  padding: 20px;
  background-color: #ff976a;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}
</style>
```

### 无蒙版引导

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">无蒙版引导</wd-button>
    <view class="target" id="no-mask-target">无蒙版目标元素</view>
    
    <wd-tour 
      v-model="showTour" 
      :steps="steps" 
      :mask="false"
      :highlight-style="{ boxShadow: '0 0 0 2px #1989fa' }"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#no-mask-target',
    content: '这是无蒙版的引导信息'
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.target {
  padding: 20px;
  background-color: #646566;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 和 `customClass` 属性可以自定义 Tour 组件的根节点样式：

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">自定义根节点样式</wd-button>
    <view class="target" id="custom-root-target">自定义根节点样式目标</view>
    
    <wd-tour 
      v-model="showTour" 
      :steps="steps" 
      customClass="my-tour"
      customStyle="z-index: 999999;"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#custom-root-target',
    content: '这是自定义根节点样式的引导'
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.target {
  padding: 20px;
  background-color: #1989fa;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}

:deep(.my-tour) {
  /* 自定义样式 */
}
</style>
```

### 自定义高亮样式

使用 `highlightStyle` 属性可以自定义高亮区域的样式：

```vue
<template>
  <view class="demo">
    <wd-button @click="showTour = true">自定义高亮样式</wd-button>
    <view class="target" id="custom-highlight-target">自定义高亮样式目标</view>
    
    <wd-tour 
      v-model="showTour" 
      :steps="steps" 
      :highlight-style="{
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 0 0 100vh rgba(0, 0, 0, 0.4), 0 0 20px rgba(25, 137, 250, 0.5)'
      }"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)
const steps = ref([
  {
    element: '#custom-highlight-target',
    content: '这是自定义高亮样式的引导'
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.target {
  padding: 20px;
  background-color: #07c160;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
}
</style>
```

## 注意事项

1. **元素选择器**：
   - 确保 `steps` 中配置的 `element` 选择器能够准确匹配到目标元素
   - 建议使用唯一的 ID 选择器，避免选择器冲突
   - 如果无法找到目标元素，组件会触发 `error` 事件

2. **性能优化**：
   - 引导步骤不宜过多，建议控制在 3-5 步以内
   - 避免在引导过程中进行复杂的 DOM 操作
   - 引导完成后，组件会自动重置状态，无需手动清理

3. **位置调整**：
   - 组件会智能判断引导框的位置（上方或下方）
   - 可以通过 `offset` 属性调整引导框与目标元素的间距
   - 对于长页面，组件会自动滚动到目标元素位置

4. **自定义导航栏**：
   - 当使用自定义导航栏时，建议设置 `topSafetyOffset` 属性
   - 组件会自动适应不同平台的导航栏高度

5. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 某些平台可能存在滚动行为的细微差异
   - 建议在目标平台上进行充分测试

6. **事件处理**：
   - 可以通过监听 `change` 事件获取当前步骤变化
   - 可以通过监听 `finish` 和 `skip` 事件获取引导结束状态

7. **样式覆盖**：
   - 使用 `:deep()` 选择器可以覆盖组件内部样式
   - 建议优先使用组件提供的 props 进行样式定制
