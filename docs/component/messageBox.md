# wd-message-box 消息弹窗组件

## 组件概述

wd-message-box 是一个功能丰富的模态对话框组件，用于在应用中显示重要的操作提示、请求用户确认或获取用户输入。该组件支持三种类型的对话框（alert、confirm、prompt），并提供了高度的自定义能力，包括自定义标题、内容、按钮文案和样式等。

### 功能特点
- 支持三种对话框类型：alert（警告）、confirm（确认）、prompt（输入）
- 支持自定义标题、内容、按钮文案和样式
- 支持点击蒙层关闭弹窗
- 支持输入框验证（正则表达式和自定义验证函数）
- 支持异步调用方式（Promise）
- 支持自定义按钮属性和样式
- 支持根节点脱离，解决fixed定位失效问题
- 内置国际化支持

### 适用场景
- 操作确认：如删除、提交等重要操作前的确认提示
- 信息展示：如系统通知、错误提示等
- 用户输入：如获取用户昵称、密码等信息
- 表单验证：如输入格式验证、必填项检查等
- 模态交互：需要中断用户当前操作的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| selector | string |  | 否 | 指定唯一标识，用于区分多个message-box实例 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种fixed失效问题（H5: teleport, APP: renderjs, 小程序: root-portal） |
| customStyle | string |  | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string |  | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

该组件不直接触发DOM事件，而是通过回调函数或Promise返回结果。

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| show | options: MessageOptions \| string | Promise<MessageResult> | 显示消息弹窗，支持直接传入字符串作为标题 |
| alert | options: MessageOptions \| string | Promise<MessageResult> | 显示警告弹窗，只有确认按钮 |
| confirm | options: MessageOptions \| string | Promise<MessageResult> | 显示确认弹窗，包含确认和取消按钮 |
| prompt | options: MessageOptions \| string | Promise<MessageResult> | 显示输入弹窗，包含输入框和确认/取消按钮 |
| close | 无 | void | 关闭当前消息弹窗 |

### MessageOptions

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| title | string |  | 否 | 标题 |
| showCancelButton | boolean | false | 否 | 是否展示取消按钮 |
| closeOnClickModal | boolean | true | 否 | 是否支持点击蒙层进行关闭，点击蒙层回调传入的action为'modal' |
| confirmButtonText | string |  | 否 | 确定按钮文案 |
| cancelButtonText | string |  | 否 | 取消按钮文案 |
| msg | string |  | 否 | 消息文案 |
| type | string | alert | 否 | 弹框类型，可选值：'alert' \| 'confirm' \| 'prompt' |
| inputType | string | text | 否 | 当type为prompt时，输入框类型 |
| inputSize | string |  | 否 | 设置输入框大小，可选值：large |
| inputValue | string \| number |  | 否 | 当type为prompt时，输入框初始值 |
| inputPlaceholder | string |  | 否 | 当type为prompt时，输入框placeholder |
| inputPattern | RegExp |  | 否 | 当type为prompt时，输入框正则校验，点击确定按钮时进行校验 |
| inputValidate | function |  | 否 | 当type为prompt时，输入框校验函数，点击确定按钮时进行校验 |
| inputError | string |  | 否 | 当type为prompt时，输入框检验不通过时的错误提示文案 |
| showErr | boolean | false | 否 | 是否展示错误信息 |
| zIndex | number | 99 | 否 | 弹窗层级 |
| lazyRender | boolean | true | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| beforeConfirm | function |  | 否 | 确认前钩子函数，用于自定义确认逻辑 |
| confirmButtonProps | object |  | 否 | 确认按钮属性，参考wd-button组件 |
| cancelButtonProps | object |  | 否 | 取消按钮属性，参考wd-button组件 |

### MessageResult

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| action | string | 操作类型，可选值：'confirm' \| 'cancel' \| 'modal' |
| value | string \| number | 当type为prompt时，用户输入的值 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义消息内容，替换默认的msg文本 |

## 使用示例

### 1. 基础用法（Alert）

```vue
<template>
  <view>
    <wd-button type="primary" @click="showAlert">显示Alert</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

// 获取message实例
const message = useMessage()

// 显示Alert弹窗
const showAlert = async () => {
  try {
    const result = await message.alert('这是一个警告弹窗')
    console.log('用户点击了确定', result)
  } catch (error) {
    console.log('弹窗被关闭', error)
  }
}
</script>
```

### 2. Confirm确认弹窗

```vue
<template>
  <view>
    <wd-button type="warning" @click="showConfirm">显示Confirm</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const message = useMessage()

// 显示Confirm弹窗
const showConfirm = async () => {
  try {
    const result = await message.confirm({
      title: '确认操作',
      msg: '确定要执行此操作吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
    console.log('用户点击了确定', result)
    // 执行确认后的操作
  } catch (error) {
    console.log('用户点击了取消或关闭', error)
    // 执行取消后的操作
  }
}
</script>
```

### 3. Prompt输入弹窗

```vue
<template>
  <view>
    <wd-button type="info" @click="showPrompt">显示Prompt</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const message = useMessage()

// 显示Prompt弹窗
const showPrompt = async () => {
  try {
    const result = await message.prompt({
      title: '请输入信息',
      msg: '请输入您的昵称',
      inputPlaceholder: '请输入昵称',
      inputValue: '',
      inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/,
      inputError: '昵称格式不正确，长度2-10个字符'
    })
    console.log('用户输入的值：', result.value)
    // 处理用户输入
  } catch (error) {
    console.log('用户取消输入', error)
  }
}
</script>
```

### 4. 自定义按钮样式

```vue
<template>
  <view>
    <wd-button type="success" @click="showCustomButton">自定义按钮样式</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const message = useMessage()

// 自定义按钮样式
const showCustomButton = async () => {
  try {
    const result = await message.confirm({
      title: '自定义按钮',
      msg: '这是一个带有自定义按钮样式的弹窗',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      confirmButtonProps: {
        type: 'success',
        size: 'large'
      },
      cancelButtonProps: {
        type: 'default',
        size: 'large'
      }
    })
    console.log('操作结果：', result)
  } catch (error) {
    console.log('操作取消：', error)
  }
}
</script>
```

### 5. 自定义内容（使用插槽）

```vue
<template>
  <view>
    <wd-button type="primary" @click="showCustomContent">自定义内容</wd-button>
    <wd-message-box ref="messageBoxRef">
      <!-- 自定义内容插槽 -->
      <view class="custom-content">
        <wd-icon name="warning-circle" size="48" color="#ff9800" />
        <text class="custom-title">自定义内容标题</text>
        <text class="custom-desc">这是一段自定义的消息内容，可以包含任意组件和样式</text>
        <view class="custom-actions">
          <wd-button size="small" type="default" @click="closeMessageBox">取消</wd-button>
          <wd-button size="small" type="primary" @click="confirmMessageBox">确定</wd-button>
        </view>
      </view>
    </wd-message-box>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const messageBoxRef = ref(null)
const message = useMessage()

// 显示自定义内容弹窗
const showCustomContent = () => {
  message.show({
    title: '自定义内容',
    showCancelButton: false
  })
}

// 关闭弹窗
const closeMessageBox = () => {
  message.close()
}

// 确认操作
const confirmMessageBox = () => {
  message.close()
  console.log('用户点击了自定义确定按钮')
}
</script>

<style scoped>
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  gap: 20rpx;
}

.custom-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.custom-desc {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  line-height: 44rpx;
}

.custom-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用 customStyle 和 customClass

通过 `customStyle` 和 `customClass` 可以自定义组件的根节点样式：

```vue
<wd-message-box 
  custom-style="border-radius: 10px;" 
  custom-class="my-message-box" 
/>

<style>
.my-message-box {
  /* 自定义样式 */
  background-color: #f5f5f5;
  /* 可以添加更多自定义样式 */
}
</style>
```

### 2. 自定义按钮样式

通过 `confirmButtonProps` 和 `cancelButtonProps` 可以自定义按钮样式：

```vue
message.confirm({
  title: '自定义按钮',
  confirmButtonProps: {
    type: 'success',
    size: 'large',
    customClass: 'my-confirm-button'
  },
  cancelButtonProps: {
    type: 'default',
    size: 'large',
    customClass: 'my-cancel-button'
  }
})

<style>
.my-confirm-button {
  /* 自定义确认按钮样式 */
  border-radius: 8px;
}

.my-cancel-button {
  /* 自定义取消按钮样式 */
  border-radius: 8px;
}
</style>
```

### 3. 覆盖组件内部样式

可以通过深度选择器覆盖组件内部样式：

```vue
<wd-message-box custom-class="my-message-box" />

<style scoped>
.my-message-box {
  /* 自定义标题样式 */
  :deep(.wd-message-box__title) {
    color: #4D80F0;
    font-size: 36rpx;
  }
  
  /* 自定义内容样式 */
  :deep(.wd-message-box__content) {
    color: #666;
    font-size: 28rpx;
  }
  
  /* 自定义按钮容器样式 */
  :deep(.wd-message-box__actions) {
    margin-top: 30rpx;
  }
}
</style>
```

## 注意事项

### 1. 异步调用方式
- 组件支持Promise异步调用方式，建议使用async/await语法，代码更简洁易读
- 当用户点击确定按钮时，Promise会resolve返回结果
- 当用户点击取消按钮或关闭弹窗时，Promise会reject返回结果

### 2. 输入验证
- 支持两种验证方式：正则表达式（inputPattern）和自定义验证函数（inputValidate）
- 验证失败时会显示错误提示，可通过inputError自定义错误信息
- 只有点击确定按钮时才会触发验证

### 3. 多实例管理
- 当页面中需要多个message-box实例时，需要通过selector属性进行区分
- 每个实例拥有独立的状态和配置

### 4. 性能优化
- 组件默认开启懒渲染（lazyRender: true），只有在显示时才会渲染内容
- 建议在不需要时及时关闭弹窗，释放资源
- 避免在弹窗中放置过于复杂的组件或大量数据，影响性能

### 5. 常见问题解决方案
- **问题**：弹窗无法显示
  **解决方案**：确保已在模板中添加了wd-message-box组件，且useMessage()调用正确

- **问题**：点击蒙层无法关闭弹窗
  **解决方案**：检查closeOnClickModal属性是否设置为true

- **问题**：输入验证不生效
  **解决方案**：确保inputPattern或inputValidate属性设置正确，且type为prompt

- **问题**：自定义样式不生效
  **解决方案**：检查样式是否被其他样式覆盖，可使用!important或更具体的选择器

### 6. 使用限制
- 组件基于wd-popup实现，继承了其所有特性和限制
- 在小程序平台上，部分高级样式可能受到限制
- 建议不要在弹窗中嵌套其他模态组件，可能导致交互冲突