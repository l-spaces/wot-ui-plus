# wd-checkbox-group 复选框组组件

## 组件概述

wd-checkbox-group 是一个用于管理多个复选框的组件，与 wd-checkbox 组件配合使用，实现组选功能。该组件提供了丰富的配置选项，支持自定义形状、颜色、大小、禁用状态、最小/最大选中数量等，满足各种业务场景的需求。

### 适用场景
- 多个选项的组选功能
- 表单中的多选字段
- 筛选条件的选择
- 权限管理中的角色选择
- 任何需要多选功能的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| model-value | Array | [] | 是 | 绑定值，数组类型，包含选中的复选框值 |
| cell | Boolean | false | 否 | 表单模式，用于表单场景 |
| shape | String | circle | 否 | 复选框形状，可选值：circle / square / button |
| checked-color | String | - | 否 | 选中时的颜色 |
| disabled | Boolean | false | 否 | 禁用状态，会影响所有子复选框 |
| min | Number | 0 | 否 | 最小选中的数量，默认值为 0 |
| max | Number | 0 | 否 | 最大选中的数量，0 为无限数量，默认为 0 |
| inline | Boolean | false | 否 | 同行展示，默认为垂直排列 |
| size | String | - | 否 | 设置大小，可选值：large |
| custom-class | String | - | 否 | 根节点自定义类名，用于自定义整个复选框组的样式 |
| custom-style | String / Object | - | 否 | 根节点自定义样式，用于自定义整个复选框组的内联样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 选中状态变化时触发 | { value: 选中的值数组 } |
| update:modelValue | 选中状态变化时触发，用于 v-model 双向绑定 | 选中的值数组 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 放置 wd-checkbox 组件，用于组织相关的复选框 |

## 使用示例

### 基础用法
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

### 不同形状的复选框组
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList1" shape="circle">
      <wd-checkbox value="option1">圆形选项1</wd-checkbox>
      <wd-checkbox value="option2">圆形选项2</wd-checkbox>
      <wd-checkbox value="option3">圆形选项3</wd-checkbox>
    </wd-checkbox-group>
    
    <wd-checkbox-group v-model="checkedList2" shape="square" style="margin-top: 20rpx;">
      <wd-checkbox value="option1">方形选项1</wd-checkbox>
      <wd-checkbox value="option2">方形选项2</wd-checkbox>
      <wd-checkbox value="option3">方形选项3</wd-checkbox>
    </wd-checkbox-group>
    
    <wd-checkbox-group v-model="checkedList3" shape="button" style="margin-top: 20rpx;">
      <wd-checkbox value="option1">按钮选项1</wd-checkbox>
      <wd-checkbox value="option2">按钮选项2</wd-checkbox>
      <wd-checkbox value="option3">按钮选项3</wd-checkbox>
    </wd-checkbox-group>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList1 = ref<string[]>([])
const checkedList2 = ref<string[]>([])
const checkedList3 = ref<string[]>([])
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 内联展示的复选框组
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList" inline>
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

### 限制选中数量的复选框组
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList" :min="1" :max="2">
      <wd-checkbox value="option1">选项1</wd-checkbox>
      <wd-checkbox value="option2">选项2</wd-checkbox>
      <wd-checkbox value="option3">选项3</wd-checkbox>
      <wd-checkbox value="option4">选项4</wd-checkbox>
    </wd-checkbox-group>
    <view class="value">选中值：{{ checkedList }}</view>
    <view class="tip">限制：最少选中1个，最多选中2个</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref<string[]>(['option1'])
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

.tip {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #909399;
}
</style>
```

### 禁用状态的复选框组
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList" disabled>
      <wd-checkbox value="option1">选项1</wd-checkbox>
      <wd-checkbox value="option2">选项2</wd-checkbox>
      <wd-checkbox value="option3">选项3</wd-checkbox>
    </wd-checkbox-group>
    <view class="value">选中值：{{ checkedList }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref<string[]>(['option1'])
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

### 自定义颜色的复选框组
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList" checked-color="#409eff">
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

### 大尺寸的复选框组
```vue
<template>
  <view class="container">
    <wd-checkbox-group v-model="checkedList" size="large">
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

### 表单模式的复选框组
```vue
<template>
  <view class="container">
    <wd-form @submit="handleSubmit">
      <wd-checkbox-group v-model="checkedList" cell>
        <wd-checkbox value="option1">选项1</wd-checkbox>
        <wd-checkbox value="option2">选项2</wd-checkbox>
        <wd-checkbox value="option3">选项3</wd-checkbox>
      </wd-checkbox-group>
      <wd-button type="primary" block @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref<string[]>([])

const handleSubmit = () => {
  console.log('提交成功，选中值：', checkedList.value)
}
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
  <wd-checkbox-group v-model="checkedList" custom-class="my-checkbox-group">
    <wd-checkbox value="option1">选项1</wd-checkbox>
    <wd-checkbox value="option2">选项2</wd-checkbox>
    <wd-checkbox value="option3">选项3</wd-checkbox>
  </wd-checkbox-group>
</template>

<style scoped>
.my-checkbox-group {
  /* 自定义样式 */
  padding: 20rpx;
  background-color: #f0f9ff;
  border-radius: 10rpx;
}

.my-checkbox-group .wd-checkbox {
  /* 自定义复选框样式 */
  margin: 10rpx 0;
}
</style>
```

### 自定义内联样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-checkbox-group 
    v-model="checkedList" 
    :custom-style="{ padding: '20rpx', backgroundColor: '#f5f7fa', borderRadius: '10rpx' }"
  >
    <wd-checkbox value="option1">选项1</wd-checkbox>
    <wd-checkbox value="option2">选项2</wd-checkbox>
    <wd-checkbox value="option3">选项3</wd-checkbox>
  </wd-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref<string[]>([])
</script>
```

## 注意事项

1. **绑定值类型**：
   - `model-value` 必须是数组类型，包含选中的复选框值
   - 数组中的值类型可以是字符串、数字或布尔值
   - 数组中不允许有重复的值

2. **形状选项**：
   - 支持三种形状：circle（圆形）、square（方形）、button（按钮）
   - 默认形状为 circle（圆形）
   - 形状设置会影响所有子复选框

3. **禁用状态**：
   - `disabled` 属性默认为 false，表示不禁用
   - 当 `disabled` 为 true 时，所有子复选框都会被禁用
   - 子复选框可以通过设置自己的 `disabled` 属性来覆盖组的禁用状态

4. **选中数量限制**：
   - `min` 属性用于设置最小选中数量，默认值为 0
   - `max` 属性用于设置最大选中数量，0 表示无限数量，默认值为 0
   - 当选中数量超出限制时，会在控制台输出错误信息
   - 当 `max` 为 0 时，不限制最大选中数量

5. **内联展示**：
   - `inline` 属性用于设置是否内联展示，默认为 false（垂直排列）
   - 当 `inline` 为 true 时，复选框会水平排列
   - 内联展示时，建议合理设置复选框的宽度，避免换行问题

6. **表单模式**：
   - `cell` 属性用于设置表单模式，默认为 false
   - 表单模式下，复选框组会使用表单样式，适应表单场景

7. **性能优化**：
   - 当复选框数量较多时，建议使用虚拟列表或分页加载
   - 避免在复选框组中使用复杂的组件或大量的计算属性

8. **与子复选框的关系**：
   - 复选框组通过 `model-value` 管理所有子复选框的选中状态
   - 子复选框的 `model-value` 作为选项的值，而不是选中状态
   - 子复选框会继承组的形状、颜色、大小等属性

## 组件依赖

- 依赖 `useChildren` 组合式函数，用于管理子组件
- 与 `wd-checkbox` 组件配合使用，实现组选功能

## 常见问题

1. **Q：如何实现全选/取消全选功能？**
   A：可以通过直接修改 `model-value` 数组实现全选/取消全选功能，将所有选项的值设置到数组中即可实现全选，清空数组即可实现取消全选。

2. **Q：如何获取选中的值？**
   A：可以通过 `v-model` 绑定的数组获取选中的值。

3. **Q：如何限制最多选中数量？**
   A：可以使用 `max` 属性限制最多选中数量，0 表示无限数量。

4. **Q：如何设置最小选中数量？**
   A：可以使用 `min` 属性设置最小选中数量，默认值为 0。

5. **Q：如何禁用部分复选框？**
   A：可以在需要禁用的子复选框上设置 `disabled` 属性为 `true`，覆盖组的禁用状态。

6. **Q：如何自定义复选框的样式？**
   A：可以通过 `custom-class` 或 `custom-style` 属性自定义复选框组的样式，也可以在子复选框上使用自定义样式属性。

7. **Q：如何实现水平排列的复选框组？**
   A：可以通过设置 `inline` 属性为 `true` 实现水平排列的复选框组。

8. **Q：如何在表单中使用复选框组？**
   A：可以与 `wd-form` 组件配合使用，通过 `rules` 属性设置验证规则，实现表单验证功能。