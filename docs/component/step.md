# wd-step 步骤条组件

## 组件概述

步骤条组件是一个用于展示流程步骤的UI组件，通常用于引导用户完成多步骤操作，如注册流程、订单流程、支付流程等。它提供了水平和垂直两种布局方式，支持自定义图标、标题、描述和状态，帮助用户清晰地了解当前所处的流程位置和进度。

### 功能特点
- 支持水平和垂直两种布局方式
- 支持自定义图标、标题和描述
- 支持多种状态：已完成、进行中、出错
- 支持点状步骤条样式
- 支持自定义步骤间距
- 支持水平居中对齐
- 支持国际化

### 适用场景
- 注册流程引导
- 订单状态跟踪
- 支付流程引导
- 表单分步填写
- 任务进度展示
- 多步骤操作引导

### 组件关系
`wd-step` 组件需要配合 `wd-steps` 组件使用，`wd-steps` 作为父组件控制整体布局和当前激活步骤，`wd-step` 作为子组件表示单个步骤项。

## API 参考

### wd-steps（父组件）

#### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| active | number | 0 | 否 | 当前激活的步骤进度，以数字表示 |
| vertical | boolean | false | 否 | 是否为垂直方向的步骤条 |
| dot | boolean | false | 否 | 是否为点状步骤条样式 |
| space | string | 自动计算 | 否 | 步骤条之间的间距，默认为自动计算 |
| alignCenter | boolean | false | 否 | 是否将步骤条水平居中显示，只对横向步骤条有效 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### wd-step（子组件）

#### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| title | string |  | 否 | 步骤标题，如果没有则使用默认文案。当只有标题而没有描述时，标题的字号会小2号 |
| description | string |  | 否 | 步骤描述 |
| icon | string |  | 否 | 步骤图标 |
| status | string |  | 否 | 步骤状态，可选值为 'finished'（已完成）、'process'（进行中）、'error'（出错） |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

该组件没有定义任何事件。

### Methods

该组件没有对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| icon | - | 自定义步骤图标 |
| title | - | 自定义步骤标题 |
| description | - | 自定义步骤描述 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">基础步骤条</text>
    <wd-steps :active="activeStep">
      <wd-step title="步骤一" description="第一步描述" />
      <wd-step title="步骤二" description="第二步描述" />
      <wd-step title="步骤三" description="第三步描述" />
      <wd-step title="步骤四" description="第四步描述" />
    </wd-steps>
    
    <view class="demo-actions">
      <wd-button type="primary" @click="prevStep" :disabled="activeStep === 0">上一步</wd-button>
      <wd-button type="primary" @click="nextStep" :disabled="activeStep === 3">下一步</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活步骤
const activeStep = ref(0)

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  display: block;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  justify-content: center;
}
</style>
```

### 垂直步骤条

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">垂直步骤条</text>
    <wd-steps :active="activeStep" vertical>
      <wd-step title="步骤一" description="第一步描述" />
      <wd-step title="步骤二" description="第二步描述" />
      <wd-step title="步骤三" description="第三步描述" />
      <wd-step title="步骤四" description="第四步描述" />
    </wd-steps>
    
    <view class="demo-actions">
      <wd-button type="primary" @click="prevStep" :disabled="activeStep === 0">上一步</wd-button>
      <wd-button type="primary" @click="nextStep" :disabled="activeStep === 3">下一步</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活步骤
const activeStep = ref(1)

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  display: block;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  justify-content: center;
}
</style>
```

### 点状步骤条

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">点状步骤条</text>
    <wd-steps :active="activeStep" dot>
      <wd-step title="步骤一" description="第一步描述" />
      <wd-step title="步骤二" description="第二步描述" />
      <wd-step title="步骤三" description="第三步描述" />
      <wd-step title="步骤四" description="第四步描述" />
    </wd-steps>
    
    <view class="demo-actions">
      <wd-button type="primary" @click="prevStep" :disabled="activeStep === 0">上一步</wd-button>
      <wd-button type="primary" @click="nextStep" :disabled="activeStep === 3">下一步</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活步骤
const activeStep = ref(2)

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  display: block;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  justify-content: center;
}
</style>
```

### 自定义图标

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义图标步骤条</text>
    <wd-steps :active="activeStep">
      <wd-step title="步骤一" description="第一步描述">
        <template #icon>
          <wd-icon name="user" size="32" color="#1989fa"></wd-icon>
        </template>
      </wd-step>
      <wd-step title="步骤二" description="第二步描述">
        <template #icon>
          <wd-icon name="shop" size="32" color="#1989fa"></wd-icon>
        </template>
      </wd-step>
      <wd-step title="步骤三" description="第三步描述">
        <template #icon>
          <wd-icon name="cart" size="32" color="#1989fa"></wd-icon>
        </template>
      </wd-step>
      <wd-step title="步骤四" description="第四步描述">
        <template #icon>
          <wd-icon name="success" size="32" color="#1989fa"></wd-icon>
        </template>
      </wd-step>
    </wd-steps>
    
    <view class="demo-actions">
      <wd-button type="primary" @click="prevStep" :disabled="activeStep === 0">上一步</wd-button>
      <wd-button type="primary" @click="nextStep" :disabled="activeStep === 3">下一步</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活步骤
const activeStep = ref(1)

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  display: block;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  justify-content: center;
}
</style>
```

### 错误状态

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">错误状态步骤条</text>
    <wd-steps :active="activeStep">
      <wd-step title="步骤一" description="第一步描述" />
      <wd-step title="步骤二" description="第二步描述" status="error" />
      <wd-step title="步骤三" description="第三步描述" />
      <wd-step title="步骤四" description="第四步描述" />
    </wd-steps>
    
    <view class="demo-actions">
      <wd-button type="primary" @click="prevStep" :disabled="activeStep === 0">上一步</wd-button>
      <wd-button type="primary" @click="nextStep" :disabled="activeStep === 3">下一步</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活步骤
const activeStep = ref(1)

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  display: block;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  justify-content: center;
}
</style>
```

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --step-line-color | #e0e0e0 | 步骤线颜色 |
| --step-finished-color | #1989fa | 已完成步骤颜色 |
| --step-process-color | #1989fa | 进行中步骤颜色 |
| --step-error-color | #f56c6c | 错误步骤颜色 |
| --step-wait-color | #c0c4cc | 等待步骤颜色 |
| --step-title-color | #303133 | 标题颜色 |
| --step-description-color | #909399 | 描述颜色 |
| --step-title-font-size | 28rpx | 标题字体大小 |
| --step-description-font-size | 24rpx | 描述字体大小 |
| --step-icon-size | 40rpx | 图标大小 |
| --step-line-height | 60rpx | 线高度 |

### 自定义样式示例

```vue
<template>
  <view class="demo-container">
    <text class="demo-title">自定义样式步骤条</text>
    <wd-steps :active="activeStep" custom-class="custom-steps">
      <wd-step title="步骤一" description="第一步描述" />
      <wd-step title="步骤二" description="第二步描述" />
      <wd-step title="步骤三" description="第三步描述" />
    </wd-steps>
    
    <view class="demo-actions">
      <wd-button type="primary" @click="prevStep" :disabled="activeStep === 0">上一步</wd-button>
      <wd-button type="primary" @click="nextStep" :disabled="activeStep === 2">下一步</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活步骤
const activeStep = ref(1)

// 上一步
const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}

// 下一步
const nextStep = () => {
  if (activeStep.value < 2) {
    activeStep.value++
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 40rpx;
  display: block;
}

.demo-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  justify-content: center;
}

/* 自定义步骤条样式 */
.custom-steps {
  --step-finished-color: #07c160;
  --step-process-color: #07c160;
  --step-title-color: #606266;
  --step-description-color: #909399;
  --step-title-font-size: 32rpx;
  --step-description-font-size: 26rpx;
  --step-icon-size: 48rpx;
  --step-line-height: 72rpx;
}
</style>
```

## 注意事项

1. **组件关系**：`wd-step` 组件必须作为 `wd-steps` 组件的子组件使用，否则无法正常工作。

2. **状态管理**：步骤的激活状态由父组件 `wd-steps` 的 `active` 属性控制，子组件 `wd-step` 的 `status` 属性可以覆盖单个步骤的状态。

3. **布局方式**：通过 `wd-steps` 的 `vertical` 属性可以切换水平和垂直布局，垂直布局下步骤条会垂直排列。

4. **点状样式**：通过 `wd-steps` 的 `dot` 属性可以切换到点状步骤条样式，适用于步骤数量较多的场景。

5. **自定义内容**：通过插槽可以自定义步骤的图标、标题和描述，提供更大的灵活性。

6. **国际化支持**：组件支持国际化，默认文案会根据当前语言环境自动切换。

7. **样式隔离**：组件使用了 `styleIsolation: 'shared'`，允许外部样式影响组件内部样式。

8. **性能优化**：组件结构简单，渲染性能优秀，适合在各种场景下使用。

## 常见问题

### Q: 步骤条显示异常？
A: 请确保 `wd-step` 组件是 `wd-steps` 组件的直接子组件，并且没有其他包裹元素。

### Q: 自定义图标不显示？
A: 请确保正确使用了 `icon` 插槽，或者 `icon` 属性的值是有效的图标名称。

### Q: 垂直布局不生效？
A: 请确保在 `wd-steps` 组件上设置了 `vertical` 属性，而不是在 `wd-step` 组件上。

### Q: 步骤状态不更新？
A: 请确保 `active` 属性是响应式的，或者通过 `status` 属性直接设置步骤状态。

### Q: 自定义样式不生效？
A: 请确保使用了正确的 CSS 变量名，或者通过 `customStyle` 属性直接设置样式。
