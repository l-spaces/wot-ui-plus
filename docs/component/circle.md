# wd-circle 环形进度条组件

## 组件概述

wd-circle 是一个基于 Canvas 实现的环形进度条组件，支持自定义颜色、大小、进度、动画速度等属性，可用于展示进度、百分比等数据。该组件提供了丰富的配置选项，满足各种业务场景的需求。

### 适用场景
- 进度展示：如文件上传进度、任务完成进度等
- 百分比展示：如考试成绩、满意度评分等
- 数据可视化：如仪表盘、统计图表等
- 状态指示：如设备电量、信号强度等
- 任何需要展示环形进度的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| model-value | Number | 0 | 否 | 当前进度，取值范围为 0-100 |
| size | Number | 100 | 否 | 圆环直径，默认单位为 px |
| color | String / Object | #4d80f0 | 否 | 进度条颜色，传入对象格式可以定义渐变色 |
| layer-color | String | #EBEEF5 | 否 | 轨道颜色 |
| fill | String | - | 否 | 填充颜色 |
| speed | Number | 50 | 否 | 动画速度（单位为 rate/s） |
| text | String | - | 否 | 文字内容，显示在圆环中心 |
| stroke-width | Number | 10 | 否 | 进度条宽度，单位为 px |
| stroke-linecap | String | round | 否 | 进度条端点的形状，可选值：butt / round / square |
| clockwise | Boolean | true | 否 | 是否顺时针增加 |
| custom-class | String | - | 否 | 根节点自定义类名，用于自定义整个环形进度条的样式 |
| custom-style | String / Object | - | 否 | 根节点自定义样式，用于自定义整个环形进度条的内联样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义提示内容，当 text 属性为空时显示 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <wd-circle v-model="progress" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(50)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 自定义大小和颜色
```vue
<template>
  <view class="container">
    <wd-circle 
      v-model="progress" 
      :size="150" 
      color="#67c23a" 
      layer-color="#e6f7ff"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(75)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 带文字的环形进度条
```vue
<template>
  <view class="container">
    <wd-circle 
      v-model="progress" 
      text="75%" 
      :stroke-width="15"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(75)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 渐变色环形进度条
```vue
<template>
  <view class="container">
    <wd-circle 
      v-model="progress" 
      :color="gradientColor" 
      :stroke-width="12"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(80)

// 渐变色配置
const gradientColor = ref({
  '0%': '#4d80f0',
  '100%': '#67c23a'
})
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 自定义端点形状
```vue
<template>
  <view class="container">
    <wd-circle 
      v-model="progress" 
      stroke-linecap="butt" 
      :stroke-width="10"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(60)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 逆时针方向
```vue
<template>
  <view class="container">
    <wd-circle 
      v-model="progress" 
      :clockwise="false" 
      color="#f56c6c"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(45)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 自定义动画速度
```vue
<template>
  <view class="container">
    <wd-circle 
      v-model="progress" 
      :speed="100" 
      color="#e6a23c"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(90)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 自定义插槽内容
```vue
<template>
  <view class="container">
    <wd-circle v-model="progress" :stroke-width="8">
      <view class="custom-content">
        <text class="percent">{{ progress }}%</text>
        <text class="desc">完成度</text>
      </view>
    </wd-circle>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(70)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.percent {
  font-size: 36rpx;
  font-weight: bold;
  color: #303133;
}

.desc {
  font-size: 24rpx;
  color: #909399;
  margin-top: 8rpx;
}
</style>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-circle v-model="progress" custom-class="my-circle" />
</template>

<style scoped>
.my-circle {
  /* 自定义样式 */
  margin: 20rpx;
}

.my-circle .wd-circle__text {
  /* 自定义文字样式 */
  font-size: 32rpx;
  color: #409eff;
  font-weight: bold;
}
</style>
```

### 自定义内联样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-circle 
    v-model="progress" 
    :custom-style="{ margin: '20rpx', padding: '10rpx' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(50)
</script>
```

### 自定义渐变色
通过 `color` 属性传入对象格式可以定义渐变色：

```vue
<template>
  <wd-circle 
    v-model="progress" 
    :color="{ '0%': '#4d80f0', '100%': '#67c23a' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(80)
</script>
```

## 注意事项

1. **进度范围**：
   - `model-value` 属性的取值范围为 0-100
   - 当进度为 0 时，会渲染一个圆点
   - 当进度为 100 时，会渲染一个完整的圆环

2. **颜色配置**：
   - `color` 属性支持字符串和对象格式
   - 字符串格式用于设置单一颜色
   - 对象格式用于设置渐变色，键为百分比，值为颜色值
   - 渐变色的键需要按从小到大的顺序排列

3. **动画速度**：
   - `speed` 属性用于控制动画速度，单位为 rate/s
   - 当 `speed` 为 0 或大于 1000 时，不使用动画，直接渲染最终状态
   - 建议 `speed` 值在 10-200 之间，以获得良好的动画效果

4. **端点形状**：
   - `stroke-linecap` 属性用于设置进度条端点的形状
   - 支持三种形状：butt（平角）、round（圆角）、square（方角）
   - 默认形状为 round（圆角）

5. **性能优化**：
   - 当圆环数量较多时，建议适当降低 `speed` 值，减少动画渲染次数
   - 避免频繁更新 `model-value` 属性，建议使用防抖或节流处理
   - 在不需要动画效果时，可以将 `speed` 设置为 0，直接渲染最终状态

6. **多端适配**：
   - 该组件基于 Canvas 实现，在不同平台上的渲染效果可能存在差异
   - 建议在各平台上进行充分测试，确保良好的显示效果
   - 在小程序平台上，Canvas 的渲染性能可能不如 H5 和 App 平台

7. **自定义内容**：
   - 使用默认插槽自定义内容时，需要注意内容的尺寸和样式，确保良好的视觉效果
   - 自定义内容时，组件的默认文字样式（如 `wd-circle__text` 类）仍然生效

## 组件依赖

- 依赖 `canvas2dAdapter` 工具函数，用于适配微信小程序的 Canvas 2D API
- 依赖 `getSystemInfo` 工具函数，用于获取设备的像素比
- 依赖 `uuid` 工具函数，用于生成唯一的 Canvas ID

## 常见问题

1. **Q：如何实现渐变色效果？**
   A：可以通过 `color` 属性传入对象格式实现渐变色，例如：`:color="{ '0%': '#4d80f0', '100%': '#67c23a' }"`。

2. **Q：如何调整圆环的大小？**
   A：可以通过 `size` 属性调整圆环的直径，单位为 px。

3. **Q：如何调整进度条的宽度？**
   A：可以通过 `stroke-width` 属性调整进度条的宽度，单位为 px。

4. **Q：如何关闭动画效果？**
   A：可以将 `speed` 属性设置为 0，直接渲染最终状态。

5. **Q：如何自定义圆环中心的文字？**
   A：可以通过 `text` 属性设置文字内容，或者使用默认插槽自定义更复杂的内容。

6. **Q：如何实现逆时针方向的进度条？**
   A：可以将 `clockwise` 属性设置为 `false`。

7. **Q：如何自定义进度条的端点形状？**
   A：可以通过 `stroke-linecap` 属性设置端点形状，支持 butt、round、square 三种形状。

8. **Q：为什么在小程序上的渲染效果与 H5 不同？**
   A：不同平台的 Canvas API 存在差异，建议在各平台上进行充分测试，必要时针对特定平台进行样式调整。