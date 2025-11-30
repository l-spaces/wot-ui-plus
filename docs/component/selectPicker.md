# wd-select-picker 选择器

## 组件概述

选择器组件是一种常用的 UI 组件，用于在多个选项之间进行选择。`wd-select-picker` 组件提供了单选和多选两种模式，支持自定义样式、搜索功能、加载状态等，适用于各种需要在多个选项间选择的场景。

### 功能特性
- 支持单选和多选两种模式
- 支持自定义左侧标签和标签宽度
- 支持禁用和只读状态
- 支持自定义占位符和弹出层标题
- 支持自定义选中颜色和大小
- 支持加载状态
- 支持搜索功能（本地搜索）
- 支持清空按钮
- 支持表单验证
- 支持自定义展示格式
- 支持确认前校验
- 支持底部安全距离设置
- 支持从页面中脱离（解决 fixed 失效问题）

### 适用场景
- 表单中的选择字段
- 筛选条件选择
- 多选项配置
- 分类选择
- 标签选择

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| label | string | - | 否 | 选择器左侧文案 |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| disabled | boolean | false | 否 | 禁用 |
| readonly | boolean | false | 否 | 只读 |
| placeholder | string | - | 否 | 选择器占位符 |
| title | string | - | 否 | 弹出层标题 |
| alignRight | boolean | false | 否 | 选择器的值靠右展示 |
| error | boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| required | boolean | false | 否 | 必填样式 |
| useLabelSlot | boolean | false | 否 | 使用 label 插槽时设置该选项（已废弃，可直接使用标签插槽） |
| useDefaultSlot | boolean | false | 否 | 使用默认插槽时设置该选项（已废弃，可直接使用默认插槽） |
| size | string | - | 否 | 设置选择器大小 |
| center | boolean | false | 否 | 是否垂直居中 |
| checkedColor | string | - | 否 | 选中的颜色（单/复选框） |
| min | number | 0 | 否 | 最小选中的数量（仅在复选框类型下生效，`type`类型为`checkbox`） |
| max | number | 0 | 否 | 最大选中的数量，0 为无限数量，默认为 0（仅在复选框类型下生效，`type`类型为`checkbox`） |
| selectSize | string | - | 否 | 设置 picker 内部的选项组尺寸大小 （单/复选框） |
| loading | boolean | false | 否 | 加载中 |
| loadingColor | string | '#4D80F0' | 否 | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| modelValue | string/number/boolean/array | - | 是 | 选中项，`type`类型为`checkbox`时，类型为 array；`type`为`radio` 时 ，类型为 number / boolean / string |
| columns | array | [] | 否 | 选择器数据，一维数组 |
| type | string | 'checkbox' | 否 | 单复选选择器类型，可选值为 'checkbox' 或 'radio' |
| valueKey | string | 'value' | 否 | 选项对象中，value 对应的 key |
| labelKey | string | 'label' | 否 | 选项对象中，展示的文本对应的 key |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| displayFormat | function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数 |
| zIndex | number | 15 | 否 | 弹窗层级 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| filterable | boolean | false | 否 | 可搜索（目前只支持本地搜索） |
| filterPlaceholder | string | - | 否 | 搜索框占位符 |
| ellipsis | boolean | false | 否 | 是否超出隐藏 |
| scrollIntoView | boolean | true | 否 | 重新打开是否滚动到选中项 |
| prop | string | - | 否 | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合`wd-form`组件使用 |
| customContentClass | string | '' | 否 | 自定义内容样式类 |
| customLabelClass | string | '' | 否 | 自定义标签样式类 |
| customValueClass | string | '' | 否 | 自定义值样式类 |
| showConfirm | boolean | true | 否 | 是否显示确认按钮（radio类型生效），默认值为：true |
| clearable | boolean | false | 否 | 显示清空按钮 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before、after |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| open | 打开选择器时触发 | - |
| change | 选择项变化时触发 | { value: 选中的值 } |
| confirm | 点击确认按钮时触发 | { value: 选中的值, selectedItems: 选中的项 } |
| cancel | 点击取消按钮或遮罩时触发 | - |
| clear | 点击清空按钮时触发 | - |
| update:modelValue | 选中值变化时触发 | 选中的值 |
| close | 选择器关闭时触发 | - |

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| default | - | 自定义选择器内容，替换默认的 cell 组件 |
| label | - | 自定义左侧标签内容 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开选择器弹框 |
| close | - | - | 关闭选择器弹框 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="选择器"
    placeholder="请选择"
    @change="onChange"
    @confirm="onConfirm"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const onChange = ({ value }: { value: string[] }) => {
  console.log('选择变化:', value)
}

const onConfirm = ({ value, selectedItems }: { value: string[], selectedItems: any[] }) => {
  console.log('确认选择:', value, selectedItems)
}
</script>
```

### 单选模式

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    type="radio"
    label="单选选择器"
    placeholder="请选择"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>('')

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
</script>
```

### 自定义样式

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="自定义样式"
    label-width="100px"
    align-right
    checked-color="#07c160"
    :custom-style="{ margin: '20px' }"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
</script>
```

### 带搜索功能

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="带搜索功能"
    filterable
    filter-placeholder="请输入搜索关键词"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' },
  { label: '选项5', value: '5' }
])
</script>
```

### 带清空按钮

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="带清空按钮"
    clearable
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
</script>
```

### 自定义展示格式

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="自定义展示格式"
    :display-format="displayFormat"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const displayFormat = (value: string[], columns: any[]) => {
  if (value.length === 0) {
    return '请选择'
  }
  return `已选择 ${value.length} 项：${value.join(', ')}`
}
</script>
```

### 确认前校验

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="确认前校验"
    :before-confirm="beforeConfirm"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const beforeConfirm = (value: string[], resolve: (isPass: boolean) => void) => {
  if (value.length === 0) {
    uni.showToast({
      title: '请至少选择一项',
      icon: 'none'
    })
    resolve(false)
  } else {
    resolve(true)
  }
}
</script>
```

### 加载状态

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="加载状态"
    :loading="loading"
    loading-color="#07c160"
  ></wd-select-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])
const loading = ref(true)

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

// 模拟加载完成
setTimeout(() => {
  loading.value = false
}, 2000)
</script>
```

### 表单验证

```vue
<template>
  <wd-form @submit="onSubmit" ref="formRef">
    <wd-select-picker
      v-model="value"
      :columns="columns"
      label="表单验证"
      placeholder="请选择"
      prop="select"
      :rules="[{ required: true, message: '请选择选项', trigger: 'change' }]"
    ></wd-select-picker>
    <wd-button type="primary" block @click="onSubmit">提交</wd-button>
  </wd-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref<any>(null)
const value = ref<string[]>([])

const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const onSubmit = () => {
  formRef.value.validate().then(() => {
    console.log('验证通过')
  }).catch((error: any) => {
    console.log('验证失败:', error)
  })
}
</script>
```

## 样式定制

### 自定义根节点样式

使用 `customStyle` 属性可以自定义组件根节点的样式：

```vue
<wd-select-picker
  :columns="columns"
  v-model="value"
  :custom-style="{ margin: '20px', borderRadius: '8px' }"
></wd-select-picker>
```

### 自定义根节点类名

使用 `customClass` 属性可以自定义组件根节点的类名：

```vue
<wd-select-picker
  :columns="columns"
  v-model="value"
  custom-class="my-select-picker"
></wd-select-picker>

<style scoped>
:deep(.my-select-picker) {
  margin: 20px;
  border-radius: 8px;
}
</style>
```

### 自定义标签和值样式

使用 `customLabelClass` 和 `customValueClass` 属性可以自定义标签和值的样式：

```vue
<wd-select-picker
  :columns="columns"
  v-model="value"
  label="自定义样式"
  custom-label-class="my-label"
  custom-value-class="my-value"
></wd-select-picker>

<style scoped>
:deep(.my-label) {
  color: #07c160;
  font-weight: bold;
}

:deep(.my-value) {
  color: #606266;
  font-size: 14px;
}
</style>
```

## 注意事项

1. **选项数据格式**：`columns` 属性支持对象数组格式，每个对象必须包含 `label` 和 `value` 属性（可通过 `labelKey` 和 `valueKey` 自定义）。

2. **模式差异**：
   - `checkbox` 模式下，`modelValue` 为数组类型，支持多选
   - `radio` 模式下，`modelValue` 为字符串、数字或布尔值类型，支持单选

3. **搜索功能**：目前仅支持本地搜索，搜索时会高亮匹配的文本。

4. **加载状态**：设置 `loading` 为 `true` 时，选择器会显示加载动画，此时点击确认按钮会直接关闭选择器。

5. **确认前校验**：`beforeConfirm` 函数接收两个参数：当前选中值和一个回调函数，通过调用回调函数并传入 `true` 或 `false` 来决定是否继续执行确认操作。

6. **表单验证**：结合 `wd-form` 组件使用时，需要设置 `prop` 和 `rules` 属性。

7. **清空按钮**：设置 `clearable` 为 `true` 时，会显示清空按钮，点击后会触发 `clear` 事件并清空选中值。

8. **底部安全距离**：在 iPhone X 等机型上，建议设置 `safeAreaInsetBottom` 为 `true`，以避免弹出层内容被底部安全区域遮挡。

9. **从页面中脱离**：当遇到 fixed 定位失效问题时，可以设置 `rootPortal` 为 `true`，将弹出层从页面中脱离出来。

10. **废弃属性**：`useLabelSlot` 和 `useDefaultSlot` 属性已废弃，可直接使用插槽，无需配置这两个属性。
