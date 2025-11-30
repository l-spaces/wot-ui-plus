# wd-checkbox 复选框组件

## 组件概述

wd-checkbox 是一个用于实现多选功能的复选框组件，支持多种形状、颜色和大小的定制，可单独使用或与 wd-checkbox-group 组件配合使用实现组选功能。该组件提供了丰富的配置选项，满足各种业务场景的需求。

### 适用场景
- 单个选项的多选功能
- 多个选项的组选功能
- 表单中的多选字段
- 筛选条件的选择
- 任何需要多选功能的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| model-value | String / Number / Boolean | false | 是 | 复选框选中时的值，必填 |
| shape | String | circle | 否 | 复选框形状，可选值：circle / square / button |
| checked-color | String | - | 否 | 选中时的颜色 |
| disabled | Boolean / null | null | 否 | 禁用状态，null 表示继承父组件配置 |
| true-value | String / Number / Boolean | true | 否 | 选中值，在 checkbox-group 中使用无效，需同 false-value 一块使用 |
| false-value | String / Number / Boolean | false | 否 | 非选中时的值，在 checkbox-group 中使用无效，需同 true-value 一块使用 |
| indeterminate | Boolean | false | 否 | 半选中状态，用于表示部分选中 |
| size | String | - | 否 | 设置大小，可选值：large |
| max-width | String | - | 否 | 文字位置最大宽度 |
| custom-label-class | String | '' | 否 | 自定义标签样式类名 |
| custom-shape-class | String | '' | 否 | 自定义形状样式类名 |
| custom-class | String | - | 否 | 根节点自定义类名，用于自定义整个复选框的样式 |
| custom-style | String / Object | - | 否 | 根节点自定义样式，用于自定义整个复选框的内联样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 选中状态变化时触发 | { value: 新的选中值 } |
| update:modelValue | 选中状态变化时触发，用于 v-model 双向绑定 | 新的选中值 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| toggle | - | - | 切换当前选中状态，禁用状态下不生效 |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 放置复选框的标签文本 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked">基础复选框</wd-checkbox>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 不同形状的复选框
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked1" shape="circle">圆形复选框</wd-checkbox>
    <wd-checkbox v-model="checked2" shape="square">方形复选框</wd-checkbox>
    <wd-checkbox v-model="checked3" shape="button">按钮复选框</wd-checkbox>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 自定义颜色的复选框
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked" checked-color="#409eff">自定义颜色</wd-checkbox>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 禁用状态的复选框
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked1" disabled>禁用状态</wd-checkbox>
    <wd-checkbox v-model="checked2" disabled>禁用选中状态</wd-checkbox>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
</script>

<style scoped>
.container {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 半选中状态的复选框
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked" indeterminate>半选中状态</wd-checkbox>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 自定义值的复选框
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked" true-value="yes" false-value="no">自定义值</wd-checkbox>
    <view class="value">当前值：{{ checked }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref('no')
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.value {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #606266;
}
</style>
```

### 与复选框组配合使用
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList">
      <wd-checkbox value="option1">选项1</wd-checkbox>
      <wd-checkbox value="option2">选项2</wd-checkbox>
      <wd-checkbox value="option3">选项3</wd-checkbox>
    </wd-checkbox-group>
    <view class="value">选中值：{{ checkedList }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref<string[]>([])
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.value {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #606266;
}
</style>
```

### 大尺寸的复选框
```vue
<template>
  <view class="container">
    <wd-checkbox v-model="checked" size="large">大尺寸复选框</wd-checkbox>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-checkbox v-model="checked" custom-class="my-checkbox">自定义样式</wd-checkbox>
</template>

<style scoped>
.my-checkbox {
  /* 自定义样式 */
  margin: 20rpx 0;
}

.my-checkbox .wd-checkbox__label {
  /* 自定义标签样式 */
  font-size: 32rpx;
  color: #409eff;
}
</style>
```

### 自定义形状和标签样式
通过 `custom-shape-class` 和 `custom-label-class` 属性可以分别自定义形状和标签的样式：

```vue
<template>
  <wd-checkbox 
    v-model="checked" 
    custom-shape-class="my-shape" 
    custom-label-class="my-label"
  >
    自定义形状和标签样式
  </wd-checkbox>
</template>

<style scoped>
.my-shape {
  /* 自定义形状样式 */
  width: 32rpx;
  height: 32rpx;
}

.my-label {
  /* 自定义标签样式 */
  font-size: 32rpx;
  color: #67c23a;
}
</style>
```

### 自定义内联样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-checkbox 
    v-model="checked" 
    :custom-style="{ margin: '20rpx 0', fontSize: '32rpx' }"
  >
    自定义内联样式
  </wd-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 注意事项

1. **值的类型**：
   - `model-value` 支持字符串、数字和布尔值类型
   - 当与 `wd-checkbox-group` 配合使用时，`model-value` 作为选项的值，而不是选中状态
   - 单独使用时，`model-value` 表示选中状态

2. **形状选项**：
   - 支持三种形状：circle（圆形）、square（方形）、button（按钮）
   - 默认形状为 circle（圆形）
   - 形状为 button 时，样式会有所不同，显示为按钮样式

3. **禁用状态**：
   - `disabled` 属性默认为 null，表示继承父组件的配置
   - 当在 `wd-checkbox-group` 中使用时，会继承组的禁用状态
   - 当 `disabled` 为 true 时，复选框不可点击

4. **半选中状态**：
   - `indeterminate` 属性用于表示半选中状态
   - 半选中状态通常用于表示部分子选项被选中
   - 半选中状态下，复选框显示为横线图标

5. **自定义值**：
   - `true-value` 和 `false-value` 用于自定义选中和非选中时的值
   - 这两个属性在 `wd-checkbox-group` 中使用无效
   - 建议同时设置这两个属性，确保值的一致性

6. **与复选框组配合使用**：
   - 与 `wd-checkbox-group` 配合使用时，`model-value` 作为选项的值
   - 组组件会管理所有子复选框的选中状态
   - 组组件提供了更多的配置选项，如最大选中数量、最小选中数量等

7. **表单集成**：
   - 可以与表单组件配合使用，通过 `rules` 属性设置验证规则
   - 与 `wd-form` 组件配合使用时，需要设置 `prop` 属性

8. **性能优化**：
   - 当复选框数量较多时，建议使用虚拟列表或分页加载
   - 避免在复选框中使用复杂的组件或大量的计算属性

## 组件依赖

- 依赖 `wd-icon` 组件，用于显示选中状态的图标
- 依赖 `useParent` 组合式函数，用于获取父组件实例
- 与 `wd-checkbox-group` 组件配合使用，实现组选功能

## 常见问题

1. **Q：如何实现全选/取消全选功能？**
   A：可以通过 `wd-checkbox-group` 组件的 `modelValue` 属性实现全选/取消全选功能，将所有选项的值设置到 `modelValue` 数组中即可实现全选，清空数组即可实现取消全选。

2. **Q：如何限制最多选中数量？**
   A：可以使用 `wd-checkbox-group` 组件的 `max` 属性限制最多选中数量。

3. **Q：如何实现半选中状态？**
   A：可以设置 `indeterminate` 属性为 `true` 实现半选中状态，通常用于表示部分子选项被选中。

4. **Q：如何自定义复选框的大小？**
   A：可以通过 `size` 属性设置为 `large` 实现大尺寸，或者通过自定义样式调整复选框的大小。

5. **Q：如何在表单中使用复选框？**
   A：可以与 `wd-form` 组件配合使用，设置 `prop` 属性和 `rules` 属性实现表单验证。

6. **Q：如何禁用部分复选框？**
   A：可以在需要禁用的复选框上设置 `disabled` 属性为 `true`。

7. **Q：如何获取选中的值？**
   A：单独使用时，可以直接通过 `v-model` 绑定的值获取选中状态；与组配合使用时，可以通过组的 `v-model` 绑定的数组获取选中的值。

8. **Q：如何自定义复选框的图标？**
   A：目前不支持直接自定义图标，但可以通过自定义样式覆盖默认图标的样式。