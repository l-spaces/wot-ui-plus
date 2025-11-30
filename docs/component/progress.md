# wd-progress 进度条组件

## 组件概述

wd-progress 是一个功能强大的进度条组件，用于展示任务的完成进度。组件基于 Vue 3 + TypeScript + UniApp 开发，支持多种颜色配置、动画效果和状态显示，能够满足各种复杂的进度展示需求。

### 功能特点

- 支持自定义进度值（0-100）
- 支持多种颜色配置方式（单一颜色、颜色数组、带百分比的颜色数组）
- 支持进度动画效果
- 支持隐藏进度文字
- 支持显示状态图标（成功、危险、警告）
- 支持自定义样式
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 文件上传/下载进度展示
- 任务完成进度展示
- 加载状态展示
- 评分展示
- 其他需要展示进度的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| percentage | number | 0 | 否 | 进度数值，最大值100 |
| hideText | boolean | false | 否 | 是否隐藏进度条上的文字 |
| color | string \| string[] \| ProgressColor[] | - | 否 | 进度条颜色 |
| duration | number | 30 | 否 | 进度增加1%所需毫秒数 |
| status | 'success' \| 'danger' \| 'warning' | - | 否 | 进度条状态 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

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
    <wd-progress :percentage="50" />
  </view>
</template>
```

### 2. 自定义颜色

```vue
<template>
  <view class="demo">
    <!-- 单一颜色 -->
    <wd-progress :percentage="50" color="#4D80F0" />
    
    <!-- 颜色数组 -->
    <wd-progress :percentage="70" :color="['#4D80F0', '#67C23A', '#E6A23C']" />
    
    <!-- 带百分比的颜色数组 -->
    <wd-progress 
      :percentage="80" 
      :color="[
        { color: '#4D80F0', percentage: 30 },
        { color: '#67C23A', percentage: 70 },
        { color: '#E6A23C', percentage: 100 }
      ]" 
    />
  </view>
</template>
```

### 3. 隐藏文字和自定义动画时长

```vue
<template>
  <view class="demo">
    <!-- 隐藏文字 -->
    <wd-progress :percentage="60" hide-text />
    
    <!-- 自定义动画时长 -->
    <wd-progress :percentage="80" :duration="100" />
  </view>
</template>
```

### 4. 状态展示

```vue
<template>
  <view class="demo">
    <!-- 成功状态 -->
    <wd-progress :percentage="100" status="success" hide-text />
    
    <!-- 危险状态 -->
    <wd-progress :percentage="30" status="danger" hide-text />
    
    <!-- 警告状态 -->
    <wd-progress :percentage="60" status="warning" hide-text />
  </view>
</template>
```

### 5. 动态更新进度

```vue
<template>
  <view class="demo">
    <wd-progress :percentage="percentage" />
    <view class="button-group">
      <wd-button type="primary" size="small" @click="increase">增加进度</wd-button>
      <wd-button type="danger" size="small" @click="decrease">减少进度</wd-button>
      <wd-button type="warning" size="small" @click="reset">重置</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(0)

const increase = () => {
  percentage.value = Math.min(percentage.value + 10, 100)
}

const decrease = () => {
  percentage.value = Math.max(percentage.value - 10, 0)
}

const reset = () => {
  percentage.value = 0
}
</script>

<style lang="scss">
.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-progress 
      :percentage="50" 
      custom-class="my-progress"
      :custom-style="{ height: '10px', borderRadius: '5px' }"
    />
  </view>
</template>

<style lang="scss">
.my-progress {
  // 自定义类样式
  .wd-progress__outer {
    background-color: #f5f7fa;
  }
  
  .wd-progress__inner {
    border-radius: 5px;
  }
  
  .wd-progress__label {
    color: #4D80F0;
    font-weight: bold;
  }
}
</style>
```

### 2. 自定义进度条高度和圆角

```vue
<template>
  <view class="demo">
    <wd-progress 
      :percentage="70" 
      :custom-style="{ 
        '--wd-progress-height': '8px',
        '--wd-progress-border-radius': '4px'
      }" 
    />
  </view>
</template>
```

### 3. 自定义文字样式

```vue
<template>
  <view class="demo">
    <wd-progress 
      :percentage="60" 
      custom-class="custom-text-progress"
    />
  </view>
</template>

<style lang="scss">
.custom-text-progress {
  .wd-progress__label {
    font-size: 14px;
    color: #67C23A;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
```

## 注意事项

1. **进度值范围**：
   - percentage 属性的取值范围是 0-100
   - 超出范围的值会被自动调整

2. **颜色配置**：
   - 支持三种颜色配置方式：单一颜色、颜色数组、带百分比的颜色数组
   - 带百分比的颜色数组会根据进度值自动切换颜色

3. **动画效果**：
   - 进度变化时会有平滑的动画效果
   - 可以通过 duration 属性调整动画速度

4. **状态图标**：
   - 当设置了 status 属性且 hideText 为 true 时，会显示对应的状态图标
   - 支持 success、danger 和 warning 三种状态

5. **性能优化**：
   - 避免频繁更新进度值，建议使用防抖或节流
   - 对于静态进度条，可以直接设置最终值

6. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 动画效果在某些平台上可能略有差异

7. **样式定制**：
   - 可以通过 customStyle 和 customClass 属性自定义样式
   - 也可以通过 CSS 变量进行样式定制

8. **文字显示**：
   - 默认情况下会显示进度百分比文字
   - 可以通过 hideText 属性隐藏文字
