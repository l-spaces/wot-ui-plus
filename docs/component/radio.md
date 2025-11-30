# wd-radio 单选框组件

## 组件概述

wd-radio 是一个功能强大的单选框组件，用于在一组选项中选择一个值。它必须与 wd-radio-group 组件配合使用，提供了多种样式和配置选项，能够满足各种复杂的单选场景需求。组件基于 Vue 3 + TypeScript + UniApp 开发，支持跨平台使用。

### 功能特点

- 支持多种形状（dot、button、check）
- 支持自定义选中颜色
- 支持禁用状态
- 支持单元格模式
- 支持自定义大小
- 支持内联展示
- 支持自定义图标位置
- 支持表单验证
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 表单中的单选选择
- 设置页面中的选项选择
- 列表中的单选操作
- 任何需要从一组选项中选择一个值的场景

## API 参考

### wd-radio Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| value | string \| number \| boolean | - | 是 | 选中时的值 |
| shape | 'dot' \| 'button' \| 'check' | - | 否 | 单选框的形状，优先级高于 radio-group 的 shape 属性 |
| checkedColor | string | - | 否 | 选中的颜色，优先级高于 radio-group 的 checkedColor 属性 |
| disabled | boolean \| null | null | 否 | 是否禁用，优先级高于 radio-group 的 disabled 属性 |
| cell | boolean \| null | null | 否 | 是否为单元格模式，优先级高于 radio-group 的 cell 属性 |
| size | string | - | 否 | 大小，优先级高于 radio-group 的 size 属性 |
| inline | boolean \| null | null | 否 | 是否内联展示，优先级高于 radio-group 的 inline 属性 |
| maxWidth | string | - | 否 | 标签最大宽度 |
| iconPlacement | 'left' \| 'right' \| 'auto' | - | 否 | 图标位置，优先级高于 radio-group 的 iconPlacement 属性 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### wd-radio-group Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string \| number \| boolean | - | 否 | 会自动选中 value 对应的单选框 |
| shape | 'dot' \| 'button' \| 'check' | 'check' | 否 | 单选框形状 |
| checkedColor | string | - | 否 | 选中的颜色，默认为 #4D80F0 |
| disabled | boolean | false | 否 | 是否禁用 |
| cell | boolean | false | 否 | 表单模式 |
| size | string | '' | 否 | 设置大小 |
| inline | boolean | false | 否 | 同行展示 |
| iconPlacement | 'left' \| 'right' \| 'auto' | 'auto' | 否 | 图标位置 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 选中值变化时 | { value: 选中的值 } |
| update:modelValue | 选中值变化时 | 选中的值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 单选框的标签内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-radio-group v-model="value">
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
      <wd-radio value="3">选项三</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
</script>
```

### 2. 不同形状

```vue
<template>
  <view class="demo">
    <!-- check 形状 -->
    <wd-radio-group v-model="value1" shape="check">
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
    </wd-radio-group>
    
    <!-- dot 形状 -->
    <wd-radio-group v-model="value2" shape="dot">
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
    </wd-radio-group>
    
    <!-- button 形状 -->
    <wd-radio-group v-model="value3" shape="button">
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('1')
const value2 = ref('1')
const value3 = ref('1')
</script>
```

### 3. 内联展示

```vue
<template>
  <view class="demo">
    <wd-radio-group v-model="value" inline>
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
      <wd-radio value="3">选项三</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
</script>
```

### 4. 单元格模式

```vue
<template>
  <view class="demo">
    <wd-radio-group v-model="value" cell>
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
      <wd-radio value="3">选项三</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
</script>
```

### 5. 自定义样式

```vue
<template>
  <view class="demo">
    <wd-radio-group 
      v-model="value" 
      shape="button" 
      checked-color="#67C23A"
      custom-class="my-radio-group"
    >
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
      <wd-radio value="3">选项三</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
</script>

<style lang="scss">
.my-radio-group {
  // 自定义类样式
  .wd-radio {
    margin-right: 20px;
    
    &.is-checked {
      .wd-radio__label {
        font-weight: bold;
      }
    }
  }
}
</style>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-radio-group 
      v-model="value" 
      custom-class="my-radio-group"
      :custom-style="{ backgroundColor: '#f5f7fa', padding: '20px', borderRadius: '8px' }"
    >
      <wd-radio value="1" custom-class="my-radio">选项一</wd-radio>
      <wd-radio value="2" custom-class="my-radio">选项二</wd-radio>
    </wd-radio-group>
  </view>
</template>

<style lang="scss">
.my-radio-group {
  // 自定义组样式
}

.my-radio {
  // 自定义单选框样式
  margin-bottom: 10px;
  
  .wd-radio__label {
    font-size: 16px;
    color: #303133;
  }
  
  &.is-checked {
    .wd-radio__label {
      color: #4D80F0;
    }
  }
}
</style>
```

### 2. 自定义选中颜色

```vue
<template>
  <view class="demo">
    <wd-radio-group v-model="value" checked-color="#E6A23C">
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
    </wd-radio-group>
  </view>
</template>
```

### 3. 自定义按钮形状样式

```vue
<template>
  <view class="demo">
    <wd-radio-group v-model="value" shape="button" custom-class="custom-button-radio">
      <wd-radio value="1">选项一</wd-radio>
      <wd-radio value="2">选项二</wd-radio>
    </wd-radio-group>
  </view>
</template>

<style lang="scss">
.custom-button-radio {
  .wd-radio {
    margin-right: 10px;
    
    .wd-radio__label {
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid #dcdfe6;
    }
    
    &.is-checked {
      .wd-radio__label {
        border-color: #4D80F0;
        background-color: rgba(77, 128, 240, 0.1);
      }
    }
  }
}
</style>
```

## 注意事项

1. **组件关系**：
   - wd-radio 必须在 wd-radio-group 中使用
   - wd-radio-group 负责管理选中状态和事件触发

2. **值类型**：
   - modelValue 和 value 属性支持 string、number 和 boolean 类型
   - 确保两者类型一致，否则可能导致选中状态异常

3. **形状选项**：
   - 支持三种形状：dot、button、check
   - 不同形状的样式和交互有所不同

4. **禁用状态**：
   - 可以通过 wd-radio-group 的 disabled 属性禁用整个组
   - 也可以通过 wd-radio 的 disabled 属性禁用单个选项
   - 单个选项的 disabled 属性优先级高于组的 disabled 属性

5. **表单验证**：
   - 可以结合 wd-form 组件使用，实现表单验证
   - 需要设置 prop 属性和 rules 属性

6. **性能优化**：
   - 对于大量选项的场景，建议使用虚拟滚动
   - 避免在选项中放置过于复杂的内容

7. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 某些样式细节可能略有差异

8. **自定义样式**：
   - 可以通过 customClass 和 customStyle 属性自定义样式
   - 也可以通过 CSS 变量进行样式定制
   - 建议使用自定义类名进行样式覆盖，避免直接修改组件内部样式
