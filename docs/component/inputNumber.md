# wd-input-number 数字输入框

## 组件概述

数字输入框组件是一个用于精确输入数值的UI组件，提供了便捷的加减按钮操作和直接输入功能。它支持自定义数值范围、步进值、精度，以及各种状态控制，适用于需要精确数值输入的场景，如商品数量选择、价格调整、评分设置等。

### 设计理念
- **便捷操作**：通过加减按钮和直接输入两种方式，满足不同场景下的数值调整需求
- **精确控制**：支持设置最小值、最大值、步进值和精度，确保输入数值的准确性
- **灵活配置**：提供丰富的属性配置，支持禁用状态、输入框隐藏、长按加减等功能
- **良好的用户体验**：实时反馈数值变化，提供输入前验证和格式化显示
- **跨平台兼容**：基于UniApp开发，支持多端适配

### 适用场景
- 商品数量选择
- 价格调整
- 评分设置
- 年龄、身高、体重等数值输入
- 各种需要精确数值控制的表单场景

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| modelValue | number / string | - | 是 | 绑定值 |
| min | number | 1 | 否 | 最小值 |
| max | number | Number.MAX_SAFE_INTEGER | 否 | 最大值 |
| step | number | 1 | 否 | 步进值 |
| stepStrictly | boolean | false | 否 | 是否严格按照步进值递增或递减 |
| precision | number / string | 0 | 否 | 数值精度 |
| disabled | boolean | false | 否 | 是否禁用组件 |
| disableInput | boolean | false | 否 | 是否禁用输入框 |
| disableMinus | boolean | false | 否 | 是否禁用减号按钮 |
| disablePlus | boolean | false | 否 | 是否禁用加号按钮 |
| withoutInput | boolean | false | 否 | 是否不显示输入框 |
| inputWidth | number / string | 36 | 否 | 输入框宽度 |
| allowNull | boolean | false | 否 | 是否允许为空 |
| placeholder | string | '' | 否 | 输入框占位符 |
| adjustPosition | boolean | true | 否 | 键盘弹起时，是否自动上推页面 |
| beforeChange | function | - | 否 | 输入框值变化前的回调函数，返回布尔值或Promise<boolean>，用于控制是否允许值的变化 |
| longPress | boolean | false | 否 | 是否开启长按加减手势 |
| immediateChange | boolean | true | 否 | 是否立即响应输入变化，false时仅在失焦和按钮点击时更新 |
| updateOnInit | boolean | true | 否 | 是否在初始化时更新v-model为修正后的值 |
| inputType | 'number' / 'digit' | 'digit' | 否 | 输入框类型 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 数值变化时 | value: number / string - 新的数值 |
| change | 数值变化时 | { value: number / string } - 包含新数值的对象 |
| focus | 输入框获得焦点时 | event.detail - 事件详情 |
| blur | 输入框失去焦点时 | { value: string / number } - 包含当前值的对象 |

### Methods

该组件没有对外暴露的方法。

### Slots

该组件没有定义任何插槽。

## 使用示例

### 基础用法

```vue
<template>
  <wd-input-number v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 自定义数值范围和步进值

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :min="0" 
    :max="100" 
    :step="5" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

### 带小数精度的数值输入

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :min="0" 
    :max="10" 
    :step="0.1" 
    :precision="1" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

### 禁用状态和部分功能禁用

```vue
<template>
  <view>
    <!-- 完全禁用 -->
    <wd-input-number v-model="value1" :disabled="true" />
    
    <!-- 禁用减号按钮 -->
    <wd-input-number v-model="value2" :disable-minus="true" />
    
    <!-- 禁用加号按钮 -->
    <wd-input-number v-model="value3" :disable-plus="true" />
    
    <!-- 禁用输入框，仅允许按钮操作 -->
    <wd-input-number v-model="value4" :disable-input="true" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(5)
const value2 = ref(1)
const value3 = ref(5)
const value4 = ref(3)
</script>
```

### 隐藏输入框，仅显示加减按钮

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :without-input="true" 
    :min="1" 
    :max="10" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 开启长按加减手势

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :long-press="true" 
    :min="1" 
    :max="100" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 输入前验证

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :before-change="beforeChange" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)

const beforeChange = (newValue: number | string) => {
  // 示例：不允许输入5
  if (newValue === 5) {
    uni.showToast({
      title: '不允许输入5',
      icon: 'none'
    })
    return false
  }
  return true
}
</script>
```

## 样式定制

### 自定义类名

```vue
<template>
  <wd-input-number 
    v-model="value" 
    custom-class="my-input-number" 
  />
</template>

<style scoped>
.my-input-number {
  /* 自定义样式 */
  font-size: 16px;
}
</style>
```

### 自定义样式对象

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :custom-style="{ fontSize: '16px', color: '#ff6b35' }" 
  />
</template>
```

### CSS变量

组件支持通过CSS变量进行样式定制，以下是可用的CSS变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --wd-input-number-height | 组件高度 | 36px |
| --wd-input-number-font-size | 字体大小 | 14px |
| --wd-input-number-text-color | 文本颜色 | #333 |
| --wd-input-number-background-color | 背景颜色 | #fff |
| --wd-input-number-border-color | 边框颜色 | #e5e5e5 |
| --wd-input-number-action-color | 加减按钮颜色 | #666 |
| --wd-input-number-action-disabled-color | 禁用状态下加减按钮颜色 | #c8c9cc |
| --wd-input-number-disabled-text-color | 禁用状态下文本颜色 | #c8c9cc |

## 注意事项

1. **数值格式化**：组件会根据设置的精度自动格式化显示数值，例如设置precision为2时，数值1会显示为1.00

2. **输入验证**：组件会自动处理输入值，确保其在指定的范围内，并符合步进值和精度要求

3. **空值处理**：当设置allowNull为true时，组件允许输入空值，否则会自动填充最小值

4. **beforeChange回调**：该回调函数可以阻止数值的变化，支持同步返回布尔值或异步返回Promise<boolean>

5. **immediateChange属性**：设置为false时，仅在失焦和按钮点击时更新v-model，输入过程中不会实时更新

6. **updateOnInit属性**：设置为true时，组件初始化时会自动修正v-model为符合规则的值，否则保持原始值

7. **longPress属性**：开启长按加减手势后，按住加减按钮会持续调整数值

8. **inputType属性**：
   - number：数字输入，支持小数
   - digit：整数输入，仅支持整数

9. **跨平台兼容性**：组件在不同平台上的表现可能略有差异，特别是在输入框的样式和行为上

10. **性能优化**：对于频繁的数值变化，建议合理设置immediateChange属性，避免不必要的更新

## 常见问题

### Q: 为什么设置了min为0，但初始值显示为1？
A: 请检查是否设置了modelValue的初始值，如果未设置或设置为undefined，组件会使用min属性的值作为初始值。

### Q: 为什么输入的数值没有实时更新？
A: 请检查immediateChange属性是否设置为false，该属性控制是否立即响应输入变化。

### Q: 为什么长按加减按钮没有持续调整数值？
A: 请检查longPress属性是否设置为true，该属性控制是否开启长按加减手势。

### Q: 为什么输入框显示的数值与v-model绑定的值不一致？
A: 组件会根据设置的精度格式化显示数值，但v-model绑定的值始终是原始数值，这是正常现象。

### Q: 如何禁止输入负数？
A: 可以通过设置min属性为0来禁止输入负数。