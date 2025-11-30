# wd-form 表单

## 组件概述

表单组件是用于收集、验证和提交用户输入数据的核心组件，它提供了完整的表单验证机制和灵活的配置选项。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，支持跨平台使用，具有良好的扩展性和易用性。

### 功能描述

- 支持表单数据双向绑定
- 提供多种验证规则（必填、正则表达式、自定义验证函数）
- 支持异步验证
- 支持多种错误提示方式（toast、message、none）
- 支持部分字段验证
- 支持表单验证重置
- 与表单项组件（wd-form-item）配合使用，实现完整的表单功能

### 适用场景

- 用户注册/登录表单
- 数据录入表单
- 信息编辑表单
- 搜索筛选表单
- 任何需要收集和验证用户输入的场景

## API 参考

### Props

| 名称          | 类型          | 默认值    | 必填 | 描述                                                                               |
| ------------- | ------------- | --------- | ---- | ---------------------------------------------------------------------------------- |
| model         | Object        | -         | 是   | 表单数据对象，用于双向绑定表单数据                                                 |
| rules         | Object        | {}        | 否   | 表单验证规则，定义各字段的验证条件                                                 |
| resetOnChange | boolean       | true      | 否   | 是否在输入时重置表单校验信息                                                       |
| errorType     | string        | 'message' | 否   | 错误提示类型，可选值：'toast'（弹窗提示）、'message'（内联提示）、'none'（不提示） |
| customClass   | string        | -         | 否   | 自定义类名，用于覆盖组件默认样式                                                   |
| customStyle   | string/object | -         | 否   | 自定义样式，支持字符串和对象两种格式                                               |

### Events

组件本身不直接触发事件，主要通过 provide/inject 机制与子组件通信。

### Methods

| 方法名   | 参数                           | 返回值                                              | 功能说明                                                   |
| -------- | ------------------------------ | --------------------------------------------------- | ---------------------------------------------------------- |
| validate | prop?: string \| Array<string> | Promise<{ valid: boolean; errors: ErrorMessage[] }> | 表单校验，可指定校验字段或字段数组，返回校验结果和错误信息 |
| reset    | -                              | void                                                | 重置表单项的验证提示                                       |

### Slots

| 插槽名  | 作用域变量 | 使用说明                                                  |
| ------- | ---------- | --------------------------------------------------------- |
| default | -          | 默认插槽，用于放置表单项组件（如 wd-input、wd-select 等） |

## 多场景使用示例

### 基础表单验证

```vue
<template>
  <view class="container">
    <wd-form :model="formData" :rules="rules" ref="formRef">
      <wd-form-item prop="name" label="姓名">
        <wd-input v-model="formData.name" placeholder="请输入姓名" />
      </wd-form-item>
      <wd-form-item prop="email" label="邮箱">
        <wd-input v-model="formData.email" placeholder="请输入邮箱" />
      </wd-form-item>
      <wd-form-item prop="phone" label="手机号">
        <wd-input v-model="formData.phone" placeholder="请输入手机号" />
      </wd-form-item>
      <view class="form-actions">
        <wd-button type="default" @click="resetForm">重置</wd-button>
        <wd-button type="primary" @click="submitForm">提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormInstance } from '../uni_modules/wot-ui-plus/components/wd-form/types'

  const formRef = ref<FormInstance | null>(null)
  const formData = ref({
    name: '',
    email: '',
    phone: ''
  })

  const rules = {
    name: [{ required: true, message: '请输入姓名' }],
    email: [
      { required: true, message: '请输入邮箱' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式' }
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
    ]
  }

  const submitForm = async () => {
    if (formRef.value) {
      const { valid, errors } = await formRef.value.validate()
      if (valid) {
        console.log('表单验证通过', formData.value)
        // 执行提交逻辑
      } else {
        console.log('表单验证失败', errors)
      }
    }
  }

  const resetForm = () => {
    formData.value = {
      name: '',
      email: '',
      phone: ''
    }
    formRef.value?.reset()
  }
</script>

<style scoped>
  .container {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
</style>
```

### 自定义验证规则

```vue
<template>
  <view class="container">
    <wd-form :model="formData" :rules="rules" ref="formRef">
      <wd-form-item prop="password" label="密码">
        <wd-input v-model="formData.password" type="password" placeholder="请输入密码" />
      </wd-form-item>
      <wd-form-item prop="confirmPassword" label="确认密码">
        <wd-input v-model="formData.confirmPassword" type="password" placeholder="请再次输入密码" />
      </wd-form-item>
      <view class="form-actions">
        <wd-button type="primary" @click="submitForm">提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormInstance, FormItemRule } from '../uni_modules/wot-ui-plus/components/wd-form/types'

  const formRef = ref<FormInstance | null>(null)
  const formData = ref({
    password: '',
    confirmPassword: ''
  })

  // 自定义验证函数：验证密码是否一致
  const validatePassword = (value: string) => {
    if (value !== formData.value.password) {
      return Promise.reject('两次输入的密码不一致')
    }
    return Promise.resolve()
  }

  const rules = {
    password: [
      { required: true, message: '请输入密码' },
      { pattern: /^.{6,20}$/, message: '密码长度为6-20个字符' }
    ],
    confirmPassword: [{ required: true, message: '请确认密码' }, { validator: validatePassword, message: '两次输入的密码不一致' } as FormItemRule]
  }

  const submitForm = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate()
      if (valid) {
        console.log('表单验证通过', formData.value)
        // 执行提交逻辑
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .form-actions {
    margin-top: 20px;
  }
</style>
```

### 部分字段验证

```vue
<template>
  <view class="container">
    <wd-form :model="formData" :rules="rules" ref="formRef">
      <wd-form-item prop="username" label="用户名">
        <wd-input v-model="formData.username" placeholder="请输入用户名" />
      </wd-form-item>
      <wd-form-item prop="email" label="邮箱">
        <wd-input v-model="formData.email" placeholder="请输入邮箱" />
      </wd-form-item>
      <wd-form-item prop="phone" label="手机号">
        <wd-input v-model="formData.phone" placeholder="请输入手机号" />
      </wd-form-item>
      <view class="form-actions">
        <wd-button type="default" @click="validateUsername">验证用户名</wd-button>
        <wd-button type="default" @click="validateContact">验证联系方式</wd-button>
        <wd-button type="primary" @click="submitForm">提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormInstance } from '../uni_modules/wot-ui-plus/components/wd-form/types'

  const formRef = ref<FormInstance | null>(null)
  const formData = ref({
    username: '',
    email: '',
    phone: ''
  })

  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { pattern: /^[a-zA-Z0-9_]{4,16}$/, message: '用户名由4-16位字母、数字或下划线组成' }
    ],
    email: [
      { required: true, message: '请输入邮箱' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式' }
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
    ]
  }

  // 只验证用户名
  const validateUsername = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate('username')
      if (valid) {
        console.log('用户名验证通过')
      }
    }
  }

  // 验证联系方式（邮箱和手机号）
  const validateContact = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate(['email', 'phone'])
      if (valid) {
        console.log('联系方式验证通过')
      }
    }
  }

  // 验证所有字段
  const submitForm = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate()
      if (valid) {
        console.log('表单验证通过', formData.value)
        // 执行提交逻辑
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
</style>
```

### 切换错误提示类型

```vue
<template>
  <view class="container">
    <view class="error-type-selector">
      <text class="label">错误提示类型：</text>
      <wd-radio-group v-model="errorType">
        <wd-radio name="message">内联提示</wd-radio>
        <wd-radio name="toast">弹窗提示</wd-radio>
        <wd-radio name="none">不提示</wd-radio>
      </wd-radio-group>
    </view>
    <wd-form :model="formData" :rules="rules" ref="formRef" :error-type="errorType">
      <wd-form-item prop="name" label="姓名">
        <wd-input v-model="formData.name" placeholder="请输入姓名" />
      </wd-form-item>
      <wd-form-item prop="age" label="年龄">
        <wd-input v-model="formData.age" type="number" placeholder="请输入年龄" />
      </wd-form-item>
      <view class="form-actions">
        <wd-button type="primary" @click="submitForm">提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormInstance } from '../uni_modules/wot-ui-plus/components/wd-form/types'

  const formRef = ref<FormInstance | null>(null)
  const errorType = ref('message')
  const formData = ref({
    name: '',
    age: ''
  })

  const rules = {
    name: [{ required: true, message: '请输入姓名' }],
    age: [
      { required: true, message: '请输入年龄' },
      { pattern: /^\d+$/, message: '请输入有效的年龄' },
      {
        validator: (value: string) => {
          const age = parseInt(value)
          return age >= 1 && age <= 120
        },
        message: '年龄范围为1-120岁'
      }
    ]
  }

  const submitForm = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate()
      if (valid) {
        console.log('表单验证通过', formData.value)
        // 执行提交逻辑
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .error-type-selector {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
  }

  .label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .form-actions {
    margin-top: 20px;
  }
</style>
```

### 禁用输入时重置校验

```vue
<template>
  <view class="container">
    <view class="reset-option">
      <wd-switch v-model="resetOnChange" />
      <text class="option-label">输入时重置校验信息</text>
    </view>
    <wd-form :model="formData" :rules="rules" ref="formRef" :reset-on-change="resetOnChange">
      <wd-form-item prop="name" label="姓名">
        <wd-input v-model="formData.name" placeholder="请输入姓名" />
      </wd-form-item>
      <view class="form-actions">
        <wd-button type="primary" @click="submitForm">提交</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { FormInstance } from '../uni_modules/wot-ui-plus/components/wd-form/types'

  const formRef = ref<FormInstance | null>(null)
  const resetOnChange = ref(false)
  const formData = ref({
    name: ''
  })

  const rules = {
    name: [{ required: true, message: '请输入姓名' }]
  }

  const submitForm = async () => {
    if (formRef.value) {
      const { valid } = await formRef.value.validate()
      if (valid) {
        console.log('表单验证通过', formData.value)
        // 执行提交逻辑
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }

  .reset-option {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
  }

  .option-label {
    font-size: 14px;
    color: #333;
  }

  .form-actions {
    margin-top: 20px;
  }
</style>
```

## 样式定制指南

### customClass 用法

```vue
<wd-form custom-class="my-form">
  <!-- 表单项 -->
</wd-form>

<style>
  .my-form {
    /* 自定义表单样式 */
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
</style>
```

### customStyle 用法

```vue
<wd-form
  :custom-style="{
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
  }"
>
  <!-- 表单项 -->
</wd-form>
```

### 与表单项组件配合样式定制

表单组件本身没有太多样式，主要通过与表单项组件（wd-form-item）配合使用来实现完整的表单样式。可以通过定制 wd-form-item 组件的样式来调整表单的整体外观。

## 注意事项

1. **表单验证规则**：
   - 每个验证规则必须包含 `required` 和 `message` 属性
   - 正则表达式验证需要使用 `pattern` 属性
   - 自定义验证函数需要使用 `validator` 属性，支持同步和异步验证

2. **异步验证**：
   - 自定义验证函数可以返回 Promise 对象，实现异步验证
   - 异步验证失败时，需要返回 Promise.reject() 并传递错误信息

3. **性能优化**：
   - 对于复杂表单，建议合理使用 `resetOnChange` 属性，避免频繁的验证计算
   - 对于大量数据的表单，建议使用 `validate` 方法的 `prop` 参数，只验证需要的字段

4. **跨端兼容**：
   - 组件在不同平台上的表现基本一致，但在小程序平台上，部分样式可能需要微调
   - H5 平台上，建议使用现代浏览器以获得最佳体验

5. **使用限制**：
   - 表单组件必须与表单项组件（wd-form-item）配合使用，否则无法实现完整的验证功能
   - 表单数据对象（model）必须是响应式的，建议使用 `ref` 或 `reactive` 创建
   - 验证规则（rules）中的字段名必须与表单数据对象中的属性名一一对应

6. **最佳实践**：
   - 合理组织表单结构，将相关字段分组，提高表单的可读性
   - 为每个字段提供清晰的错误提示信息，帮助用户快速修正错误
   - 对于复杂的表单验证逻辑，建议将验证函数单独提取，提高代码的可维护性
   - 表单提交前，建议先调用 `validate` 方法进行验证，确保数据的合法性
