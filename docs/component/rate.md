# wd-rate 评分组件

## 组件概述

wd-rate 是一个功能强大的评分组件，用于展示和收集用户评分。组件基于 Vue 3 + TypeScript + UniApp 开发，支持多种自定义选项，能够满足各种复杂的评分场景需求。

### 功能特点

- 支持自定义评分数量
- 支持半星评分
- 支持自定义图标大小和间距
- 支持自定义选中和未选中的图标颜色
- 支持分段颜色（用于不同评分范围显示不同颜色）
- 支持只读和禁用状态
- 支持清空功能
- 支持触摸滑动评分
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 商品评分展示和收集
- 服务评分
- 评价系统
- 任何需要展示或收集评分的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| num | number | 5 | 否 | 评分最大值 |
| modelValue | string \| number \| null | null | 否 | 当前分数，使用v-model进行双向绑定 |
| readonly | boolean | false | 否 | 是否只读 |
| size | string | '16px' | 否 | 图标大小 |
| space | string | '4px' | 否 | 图标间距 |
| color | string | '#E8E8E8' | 否 | 未选中的图标颜色 |
| activeColor | string \| Array<string> | 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)' | 否 | 选中的图标颜色，支持传颜色数组（用于分段颜色） |
| icon | string | 'star-filled' | 否 | 未选中的图标类名 |
| activeIcon | string | 'star-filled' | 否 | 选中的图标类名 |
| disabled | boolean | false | 否 | 是否禁用 |
| disabledColor | string | 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)' | 否 | 禁用的图标颜色 |
| allowHalf | boolean | false | 否 | 是否允许半选 |
| clearable | boolean | false | 否 | 当 clearable 属性设置为 true，再次点击相同的值时，可以将值重置为 0 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 评分值变化时 | 新的评分值 |
| change | 评分值变化时 | { value: 新的评分值 } |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| - | - | - |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-rate v-model="value" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(3)
</script>
```

### 2. 半星评分

```vue
<template>
  <view class="demo">
    <wd-rate v-model="value" :allow-half="true" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(3.5)
</script>
```

### 3. 自定义样式

```vue
<template>
  <view class="demo">
    <wd-rate 
      v-model="value" 
      :num="10" 
      :size="'24px'" 
      :space="'8px'" 
      color="#E8E8E8" 
      active-color="#FF6B6B" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(8)
</script>
```

### 4. 分段颜色

```vue
<template>
  <view class="demo">
    <wd-rate 
      v-model="value" 
      :active-color="['#FF6B6B', '#4D80F0']" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(4)
</script>
```

### 5. 只读和禁用状态

```vue
<template>
  <view class="demo">
    <!-- 只读状态 -->
    <wd-rate v-model="value1" :readonly="true" />
    
    <!-- 禁用状态 -->
    <wd-rate v-model="value2" :disabled="true" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(3)
const value2 = ref(3)
</script>
```

### 6. 清空功能

```vue
<template>
  <view class="demo">
    <wd-rate v-model="value" :clearable="true" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 7. 触摸滑动评分

```vue
<template>
  <view class="demo">
    <wd-rate v-model="value" :allow-half="true" />
    <view class="rate-value">当前评分：{{ value }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<style lang="scss">
.rate-value {
  margin-top: 10px;
  font-size: 14px;
  color: #303133;
  text-align: center;
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-rate 
      v-model="value" 
      custom-class="my-rate"
      :custom-style="{ backgroundColor: '#f5f7fa', padding: '20px', borderRadius: '8px' }"
    />
  </view>
</template>

<style lang="scss">
.my-rate {
  // 自定义类样式
  .wd-rate__item {
    // 自定义评分项样式
  }
  
  .wd-rate__item-star {
    // 自定义图标样式
  }
}
</style>
```

### 2. 自定义图标

```vue
<template>
  <view class="demo">
    <wd-rate 
      v-model="value" 
      icon="heart" 
      active-icon="heart-filled" 
      active-color="#FF6B6B" 
    />
  </view>
</template>
```

### 3. 自定义大小和间距

```vue
<template>
  <view class="demo">
    <wd-rate 
      v-model="value" 
      :size="'32px'" 
      :space="'12px'" 
    />
  </view>
</template>
```

## 注意事项

1. **值类型**：
   - modelValue 属性支持 string、number 和 null 类型
   - 建议使用 number 类型，以获得最佳的性能和兼容性

2. **半星评分**：
   - 启用 allowHalf 属性后，支持半星评分
   - 点击评分项的左侧为半星，右侧为整星
   - 触摸滑动时也支持半星评分

3. **分段颜色**：
   - 当 activeColor 为数组时，支持分段颜色
   - 评分低于 60% 时使用第一个颜色，否则使用第二个颜色
   - 目前只支持两个分段颜色

4. **清空功能**：
   - 启用 clearable 属性后，再次点击相同的最小值时，可以将值重置为 0
   - 整星模式下最小值为 1，半星模式下最小值为 0.5

5. **触摸滑动评分**：
   - 支持触摸滑动评分，滑动时实时更新评分值
   - 仅在非只读和非禁用状态下可用

6. **性能优化**：
   - 避免频繁更新评分值，建议使用防抖或节流
   - 对于静态评分，建议设置 readonly 为 true

7. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 触摸滑动功能在某些平台上可能略有差异

8. **自定义样式**：
   - 可以通过 customClass 和 customStyle 属性自定义样式
   - 也可以通过 CSS 变量进行样式定制
   - 建议使用自定义类名进行样式覆盖，避免直接修改组件内部样式