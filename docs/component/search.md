# wd-search 搜索组件

## 组件概述

wd-search 是一个功能强大的搜索组件，用于提供搜索功能，支持多种自定义选项，能够满足各种复杂的搜索场景需求。组件基于 Vue 3 + TypeScript + UniApp 开发，支持跨平台使用。

### 功能特点

- 支持双向绑定输入内容
- 支持清除按钮
- 支持自定义占位文本
- 支持右侧取消按钮
- 支持亮色主题
- 支持禁用状态
- 支持最大长度限制
- 支持自动聚焦
- 支持多种事件回调
- 支持前后插槽自定义
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 搜索页面
- 商品搜索
- 内容搜索
- 筛选功能
- 任何需要搜索功能的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customInputClass | string | '' | 否 | 自定义输入框类名 |
| modelValue | string | '' | 否 | 输入框内容，双向绑定 |
| clearabled | boolean | true | 否 | 是否显示清除按钮 |
| useSuffixSlot | boolean | false | 否 | 是否使用输入框右侧插槽（已废弃，直接使用插槽即可） |
| placeholder | string | - | 否 | 搜索框占位文本 |
| cancelTxt | string | - | 否 | 搜索框右侧文本 |
| light | boolean | false | 否 | 搜索框亮色（白色） |
| hideCancel | boolean | false | 否 | 是否隐藏右侧文本 |
| disabled | boolean | false | 否 | 是否禁用搜索框 |
| maxlength | number | -1 | 否 | 原生属性，设置最大长度。-1 表示无限制 |
| placeholderLeft | boolean | false | 否 | placeholder 居左边 |
| focus | boolean | false | 否 | 是否自动聚焦 |
| focusWhenClear | boolean | false | 否 | 是否在点击清除按钮时聚焦输入框 |
| placeholderStyle | string | - | 否 | 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight |
| placeholderClass | string | '' | 否 | 原生属性，指定 placeholder 的样式类 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 输入内容变化时 | 输入框内容 |
| change | 输入内容变化时 | { value: 输入框内容 } |
| clear | 点击清除按钮时 | - |
| search | 点击键盘搜索按钮时 | { value: 输入框内容 } |
| focus | 输入框获得焦点时 | { value: 输入框内容 } |
| blur | 输入框失去焦点时 | { value: 输入框内容 } |
| cancel | 点击右侧取消按钮时 | { value: 输入框内容 } |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| prefix | - | 搜索框左侧插槽 |
| suffix | - | 搜索框右侧插槽，默认显示取消按钮 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-search v-model="searchValue" @search="onSearch" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')

const onSearch = ({ value }) => {
  console.log('搜索内容：', value)
  // 执行搜索逻辑
}
</script>
```

### 2. 自定义样式

```vue
<template>
  <view class="demo">
    <wd-search 
      v-model="searchValue" 
      placeholder="请输入搜索内容" 
      cancel-txt="搜索" 
      light 
      @search="onSearch"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')

const onSearch = ({ value }) => {
  console.log('搜索内容：', value)
  // 执行搜索逻辑
}
</script>
```

### 3. 禁用状态

```vue
<template>
  <view class="demo">
    <wd-search 
      v-model="searchValue" 
      disabled 
      placeholder="搜索框已禁用"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')
</script>
```

### 4. 自定义前后插槽

```vue
<template>
  <view class="demo">
    <wd-search v-model="searchValue" @search="onSearch">
      <template #prefix>
        <wd-icon name="scan" custom-class="search-prefix-icon" />
      </template>
      <template #suffix>
        <wd-button type="primary" size="small" @click="onSearch({ value: searchValue })">
          搜索
        </wd-button>
      </template>
    </wd-search>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')

const onSearch = ({ value }) => {
  console.log('搜索内容：', value)
  // 执行搜索逻辑
}
</script>

<style lang="scss">
.search-prefix-icon {
  margin-right: 5px;
  color: #909399;
}
</style>
```

### 5. 自动聚焦

```vue
<template>
  <view class="demo">
    <wd-search 
      v-model="searchValue" 
      focus 
      placeholder="自动聚焦搜索框"
      @search="onSearch"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')

const onSearch = ({ value }) => {
  console.log('搜索内容：', value)
  // 执行搜索逻辑
}
</script>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-search 
      v-model="searchValue" 
      custom-class="custom-search"
      :custom-style="{ borderRadius: '20px', backgroundColor: '#f5f7fa' }"
      @search="onSearch"
    />
  </view>
</template>

<style lang="scss">
.custom-search {
  // 自定义类样式
  .wd-search__input {
    // 自定义输入框样式
    font-size: 14px;
    color: #303133;
  }
  
  .wd-search__placeholder-txt {
    // 自定义占位符样式
    color: #909399;
  }
}
</style>
```

### 2. 自定义输入框类名

```vue
<template>
  <view class="demo">
    <wd-search 
      v-model="searchValue" 
      custom-input-class="my-input"
      @search="onSearch"
    />
  </view>
</template>

<style lang="scss">
.my-input {
  // 自定义输入框样式
  padding: 5px 0;
  font-size: 15px;
  color: #4D80F0;
}
</style>
```

## 注意事项

1. **双向绑定**：
   - 使用 v-model 进行双向绑定输入内容
   - 支持通过 modelValue 属性设置初始值

2. **清除按钮**：
   - 默认显示清除按钮，可通过 clearabled 属性控制
   - 点击清除按钮会清空输入内容并触发 clear 事件
   - focusWhenClear 属性可控制点击清除按钮时是否聚焦输入框

3. **自动聚焦**：
   - focus 属性用于控制是否自动聚焦
   - 在组件挂载后生效
   - 禁用状态下自动聚焦不生效

4. **事件处理**：
   - change 事件在输入内容变化时触发
   - search 事件在点击键盘搜索按钮时触发
   - focus 和 blur 事件分别在输入框获得和失去焦点时触发
   - cancel 事件在点击右侧取消按钮时触发

5. **插槽使用**：
   - prefix 插槽用于自定义搜索框左侧内容
   - suffix 插槽用于自定义搜索框右侧内容，默认显示取消按钮
   - useSuffixSlot 属性已废弃，直接使用插槽即可

6. **性能考虑**：
   - 避免在 input 事件中执行复杂的计算
   - 对于需要防抖的搜索，建议在父组件中实现防抖逻辑

7. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 但在某些平台上，input 事件的触发时机可能略有差异

8. **亮色主题**：
   - light 属性用于切换亮色主题（白色背景）
   - 适合在深色背景上使用
