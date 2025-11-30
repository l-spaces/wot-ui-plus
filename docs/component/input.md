# wd-input 输入框

## 组件概述

输入框组件是一个用于收集用户输入的核心表单组件，支持多种输入类型、表单验证、清除按钮、前缀/后缀图标等功能。组件基于 UniApp 的原生 input 组件扩展，提供了丰富的配置选项和良好的用户体验，适用于各种表单场景。

### 功能描述
- 支持多种输入类型（text、number、digit、idcard、password 等）
- 支持表单验证，可结合 wd-form 组件使用
- 支持清除按钮，可自定义显示时机
- 支持前缀和后缀图标
- 支持密码显示/隐藏切换
- 支持字数统计
- 支持自定义样式和类名
- 支持多种边框样式（边框、下划线、无边框）
- 支持必填项标记
- 支持错误状态显示

### 适用场景
- 用户登录/注册表单
- 搜索框
- 数据录入表单
- 密码输入
- 任何需要收集用户输入的场景

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| placeholder | string | - | 否 | 占位文本 |
| placeholderStyle | string | - | 否 | 原生属性，指定 placeholder 的样式，目前仅支持 color, font-size 和 font-weight |
| placeholderClass | string | '' | 否 | 原生属性，指定 placeholder 的样式类 |
| cursorSpacing | number | 0 | 否 | 原生属性，指定光标与键盘的距离 |
| cursor | number | -1 | 否 | 原生属性，指定 focus 时的光标位置 |
| selectionStart | number | -1 | 否 | 原生属性，光标起始位置，自动聚集时有效，需与 selection-end 搭配使用 |
| selectionEnd | number | -1 | 否 | 原生属性，光标结束位置，自动聚集时有效，需与 selection-start 搭配使用 |
| adjustPosition | boolean | true | 否 | 原生属性，键盘弹起时，是否自动上推页面 |
| holdKeyboard | boolean | false | 否 | focus 时，点击页面的时候不收起键盘 |
| confirmType | string | 'done' | 否 | 设置键盘右下角按钮的文字，仅在 type='text' 时生效，可选值：done / go / next / search / send |
| confirmHold | boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| focus | boolean | false | 否 | 原生属性，获取焦点 |
| type | string | 'text' | 否 | 类型，可选值：text / number / digit / idcard / safe-password / nickname / tel |
| maxlength | number | -1 | 否 | 原生属性，最大长度 |
| disabled | boolean | false | 否 | 原生属性，禁用 |
| alwaysEmbed | boolean | false | 否 | 微信小程序原生属性，强制 input 处于同层状态 |
| alignRight | boolean | false | 否 | 输入框的值靠右展示 |
| modelValue | string/number | '' | 否 | 绑定值 |
| showPassword | boolean | false | 否 | 显示为密码框 |
| clearable | boolean | false | 否 | 显示清空按钮 |
| readonly | boolean | false | 否 | 只读 |
| prefixIcon | string | - | 否 | 前置图标，icon 组件中的图标类名 |
| suffixIcon | string | - | 否 | 后置图标，icon 组件中的图标类名 |
| showWordLimit | boolean | false | 否 | 显示字数限制，需要同时设置 maxlength |
| label | string | - | 否 | 设置左侧标题 |
| labelWidth | string | '' | 否 | 设置左侧标题宽度 |
| size | string | - | 否 | 设置输入框大小，可选值：large |
| error | boolean | false | 否 | 设置输入框错误状态，错误状态时为红色 |
| center | boolean | false | 否 | 当有 label 属性时，设置标题和输入框垂直居中，默认为顶部居中 |
| noBorder | boolean | false | 否 | 非 cell 类型下是否隐藏下划线 |
| required | boolean | false | 否 | 是否必填 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合 wd-form 组件使用 |
| clearTrigger | string | 'always' | 否 | 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示 |
| focusWhenClear | boolean | true | 否 | 是否在点击清除按钮时聚焦输入框 |
| ignoreCompositionEvent | boolean | true | 否 | 是否忽略组件内对文本合成系统事件的处理 |
| inputmode | string | 'text' | 否 | 它提供了用户在编辑元素或其内容时可能输入的数据类型的提示 |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before（标签前）、after（标签后） |
| inputBorder | string | 'underline' | 否 | 边框类型，可选值：border（边框）、underline（下划线）、none（无边框） |
| customInputClass | string | '' | 否 | 自定义输入框类名 |
| customLabelClass | string | '' | 否 | 自定义标签类名 |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 输入值变化时 | 新的输入值 |
| clear | 点击清除按钮时 | - |
| blur | 输入框失去焦点时 | { value: string } - 包含当前输入值的对象 |
| focus | 输入框获得焦点时 | 事件对象 |
| input | 输入框内容变化时 | 事件对象 |
| keyboardheightchange | 键盘高度变化时 | 事件对象 |
| confirm | 点击键盘确认按钮时 | 事件对象 |
| clicksuffixicon | 点击后缀图标时 | - |
| clickprefixicon | 点击前缀图标时 | - |
| click | 点击输入框时 | 事件对象 |

### Methods
组件未对外暴露任何方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| prefix | - | 输入框前缀内容，优先级高于 prefixIcon |
| suffix | - | 输入框后缀内容，优先级高于 suffixIcon |
| label | - | 输入框标签内容，优先级高于 label 属性 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-input 
      v-model="inputValue" 
      placeholder="请输入内容"
      @input="onInput"
    />
    <view class="result">
      <text>输入内容：{{ inputValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputValue = ref('')

const onInput = (event: any) => {
  console.log('输入内容变化', event.detail.value)
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
```

### 密码输入

```vue
<template>
  <view class="container">
    <wd-input 
      v-model="password" 
      placeholder="请输入密码"
      show-password
      type="password"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 带清除按钮

```vue
<template>
  <view class="container">
    <wd-input 
      v-model="inputValue" 
      placeholder="请输入内容"
      clearable
      clear-trigger="focus"
      @clear="onClear"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputValue = ref('')

const onClear = () => {
  console.log('清除输入内容')
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 带前缀和后缀图标

```vue
<template>
  <view class="container">
    <wd-input 
      v-model="searchText" 
      placeholder="请输入搜索内容"
      prefix-icon="search"
      suffix-icon="close"
      @clickprefixicon="onSearch"
      @clicksuffixicon="onClear"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchText = ref('')

const onSearch = () => {
  console.log('搜索', searchText.value)
}

const onClear = () => {
  searchText.value = ''
  console.log('清除搜索内容')
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 表单验证

```vue
<template>
  <view class="container">
    <wd-form :model="formData" :rules="rules" ref="formRef">
      <wd-form-item prop="name" label="姓名">
        <wd-input v-model="formData.name" placeholder="请输入姓名" />
      </wd-form-item>
      <wd-form-item prop="email" label="邮箱">
        <wd-input 
          v-model="formData.email" 
          placeholder="请输入邮箱"
          type="text"
        />
      </wd-form-item>
      <wd-button type="primary" @click="submitForm">提交</wd-button>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from '../uni_modules/wot-ui-plus/components/wd-form/types'

const formRef = ref<FormInstance | null>(null)
const formData = ref({
  name: '',
  email: ''
})

const rules = {
  name: [
    { required: true, message: '请输入姓名' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式' }
  ]
}

const submitForm = async () => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    if (valid) {
      console.log('表单验证通过', formData.value)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-input 
  v-model="inputValue" 
  placeholder="请输入内容"
  custom-class="my-input"
/>

<style>
.my-input {
  /* 自定义样式 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 自定义输入框样式 */
.my-input .wd-input__inner {
  font-size: 16px;
  color: #333;
}
</style>
```

### customStyle 用法
```vue
<wd-input 
  v-model="inputValue" 
  placeholder="请输入内容"
  :custom-style="{
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px 0'
  }"
/>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-input {
  /* 自定义背景颜色 */
  --input-background-color: #fff;
  /* 自定义边框颜色 */
  --input-border-color: #e5e5e5;
  /* 自定义输入文字颜色 */
  --input-color: #333;
  /* 自定义占位符颜色 */
  --input-placeholder-color: #999;
  /* 自定义字体大小 */
  --input-font-size: 14px;
  /* 自定义高度 */
  --input-height: 44px;
}
```

## 注意事项

1. **性能优化**：
   - 对于大量输入框的表单，建议合理使用 `v-model`，避免不必要的响应式更新
   - 对于需要实时验证的场景，建议使用防抖处理，减少验证次数
   - 避免在 `input` 事件中执行复杂计算，影响输入流畅度

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致，但部分原生属性可能存在差异
   - `alwaysEmbed` 属性仅在微信小程序平台有效
   - `inputmode` 属性在不同平台上的支持程度可能不同

3. **使用限制**：
   - `confirmType` 属性仅在 `type='text'` 时生效
   - 字数统计功能需要同时设置 `maxlength` 和 `showWordLimit` 属性
   - 表单验证功能需要结合 `wd-form` 组件使用

4. **最佳实践**：
   - 为不同类型的输入框设置合适的 `type` 属性，以获得更好的键盘体验
   - 为必填项添加 `required` 属性，并结合 `wd-form` 组件进行验证
   - 合理使用前缀和后缀图标，提高用户体验
   - 对于长文本输入，建议使用 `wd-textarea` 组件

5. **常见问题**：
   - 问题：输入框无法获取焦点
     解决方案：检查 `disabled` 和 `readonly` 属性是否设置为 `false`
   - 问题：清除按钮不显示
     解决方案：检查 `clearable` 属性是否设置为 `true`，以及输入框是否有内容
   - 问题：表单验证不生效
     解决方案：确保 `wd-input` 组件在 `wd-form` 组件内部，并且设置了正确的 `prop` 属性
