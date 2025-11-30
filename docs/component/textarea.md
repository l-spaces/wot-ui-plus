# Textarea 文本域

## 组件概述

wd-textarea 是一个功能强大的多行文本输入组件，用于在 UniApp 应用中实现各种文本输入场景。它支持丰富的配置选项、表单验证、字数统计、自动增高、清空按钮等功能，是构建表单和文本输入界面的核心组件。

### 功能特点
- 支持双向数据绑定
- 提供丰富的配置选项，如禁用、只读、密码模式等
- 支持自动增高功能，根据内容自适应高度
- 提供清空按钮，支持自定义触发时机
- 支持字数统计和限制
- 支持表单验证集成
- 支持前缀图标和自定义标签
- 提供多种事件监听，如输入、聚焦、失焦等
- 支持键盘相关事件和配置

### 适用场景
- 表单中的多行文本输入，如备注、描述等
- 需要字数限制的文本输入，如评论、留言等
- 需要自动增高的文本输入，如聊天输入框
- 需要清空功能的文本输入
- 需要表单验证的文本输入

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| customTextareaContainerClass | string | '' | 否 | 自定义文本域容器class名称 |
| customTextareaClass | string | '' | 否 | 自定义文本域class名称 |
| customLabelClass | string | '' | 否 | 自定义标签class名称 |
| modelValue | string / number | '' | 否 | 绑定值 |
| placeholder | string | '请输入...' | 否 | 占位文本 |
| placeholderStyle | string | '' | 否 | 指定placeholder的样式 |
| placeholderClass | string | '' | 否 | 指定placeholder的样式类 |
| disabled | boolean | false | 否 | 禁用输入框 |
| maxlength | number | -1 | 否 | 最大输入长度，设置为-1表示不限制最大长度 |
| autoFocus | boolean | false | 否 | 自动聚焦并拉起键盘 |
| focus | boolean | false | 否 | 获取焦点 |
| autoHeight | boolean | false | 否 | 是否自动增高输入框高度，style.height属性在auto-height生效时不生效 |
| fixed | boolean | false | 否 | 如果textarea处于position:fixed区域，需要设置此属性为true |
| cursorSpacing | number | 0 | 否 | 指定光标与键盘的距离，取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为实际距离 |
| cursor | number | -1 | 否 | 指定focus时的光标位置 |
| confirmType | string | 'done' | 否 | 设置键盘右下角按钮的文字，可选值：'send'、'search'、'next'、'go'、'done' |
| confirmHold | boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| showConfirmBar | boolean | true | 否 | 是否显示键盘上方带有“完成”按钮那一栏 |
| selectionStart | number | -1 | 否 | 光标起始位置，自动聚集时有效，需与selection-end搭配使用 |
| selectionEnd | number | -1 | 否 | 光标结束位置，自动聚集时有效，需与selection-start搭配使用 |
| adjustPosition | boolean | true | 否 | 键盘弹起时是否自动上推页面 |
| disableDefaultPadding | boolean | false | 否 | 是否去掉iOS下的默认内边距 |
| holdKeyboard | boolean | false | 否 | focus状态下点击页面时是否不收起键盘 |
| showPassword | boolean | false | 否 | 显示为密码框 |
| clearable | boolean | false | 否 | 是否显示清空按钮 |
| readonly | boolean | false | 否 | 输入框只读状态 |
| prefixIcon | string | '' | 否 | 前置图标，icon组件中的图标类名 |
| showWordLimit | boolean | false | 否 | 是否显示字数限制，需要同时设置maxlength |
| label | string | '' | 否 | 设置左侧标题 |
| labelWidth | string | '' | 否 | 设置左侧标题宽度 |
| size | string | '' | 否 | 设置输入框大小 |
| error | boolean | false | 否 | 设置输入框错误状态（红色） |
| center | boolean | false | 否 | 当存在label属性时，设置标题和输入框垂直居中，默认为顶部居中 |
| noBorder | boolean | false | 否 | 非cell类型下是否隐藏下划线 |
| required | boolean | false | 否 | cell类型下必填样式 |
| prop | string | '' | 否 | 表单域model字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则 |
| clearTrigger | string | 'always' | 否 | 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示 |
| focusWhenClear | boolean | true | 否 | 是否在点击清除按钮时聚焦输入框 |
| ignoreCompositionEvent | boolean | true | 否 | 是否忽略组件内对文本合成系统事件的处理 |
| inputmode | string | 'text' | 否 | 它提供了用户在编辑元素或其内容时可能输入的数据类型的提示 |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before（标签前）、after（标签后） |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 输入值变化时触发 | value: string - 输入框的当前值 |
| input | 输入内容时触发 | detail: Object - 包含当前输入值和光标位置等信息 |
| focus | 输入框获得焦点时触发 | detail: Object - 包含当前光标位置等信息 |
| blur | 输入框失去焦点时触发 | detail: Object - 包含当前输入值和光标位置等信息 |
| confirm | 点击键盘右下角按钮时触发 | detail: Object - 包含当前输入值 |
| clear | 点击清空按钮时触发 | - |
| linechange | 输入框行数变化时触发 | detail: Object - 包含当前行数等信息 |
| keyboardheightchange | 键盘高度变化时触发 | detail: Object - 包含键盘高度等信息 |
| clickprefixicon | 点击前置图标时触发 | - |
| click | 点击组件时触发 | - |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| prefix | - | 前置内容插槽，用于在标签前插入自定义内容 |
| label | - | 标签内容插槽，用于自定义标签内容 |

### Methods

该组件未对外暴露任何方法。

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-textarea v-model="value" placeholder="请输入内容" />
    <view class="result">输入内容：{{ value }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  padding: 20px;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

### 自动增高

```vue
<template>
  <view class="demo">
    <wd-textarea 
      v-model="value" 
      placeholder="请输入内容" 
      auto-height 
      :maxlength="100" 
      show-word-limit
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  padding: 20px;
}
</style>
```

### 带标签和前缀图标

```vue
<template>
  <view class="demo">
    <wd-textarea 
      v-model="value" 
      placeholder="请输入备注" 
      label="备注" 
      label-width="80px" 
      prefix-icon="info-circle"
      @clickprefixicon="handleClickPrefix"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const handleClickPrefix = () => {
  console.log('点击了前缀图标')
}
</script>

<style scoped>
.demo {
  padding: 20px;
}
</style>
```

### 带清空按钮和字数限制

```vue
<template>
  <view class="demo">
    <wd-textarea 
      v-model="value" 
      placeholder="请输入评论" 
      clearable 
      :maxlength="50" 
      show-word-limit
      clear-trigger="focus"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.demo {
  padding: 20px;
}
</style>
```

### 禁用和只读

```vue
<template>
  <view class="demo">
    <wd-textarea 
      v-model="disabledValue" 
      placeholder="禁用状态" 
      disabled
    />
    <wd-textarea 
      v-model="readonlyValue" 
      placeholder="只读状态" 
      readonly
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref('禁用内容')
const readonlyValue = ref('只读内容')
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 属性可以直接设置组件的内联样式：

```vue
<wd-textarea 
  v-model="value" 
  placeholder="请输入内容" 
  customStyle="margin: 10px; border: 1px solid #ddd; border-radius: 4px;"
/>
```

### 自定义类名

使用 `customClass`、`customTextareaContainerClass`、`customTextareaClass` 和 `customLabelClass` 属性可以为组件的不同部分添加自定义的 CSS 类：

```vue
<template>
  <wd-textarea 
    v-model="value" 
    placeholder="请输入内容" 
    label="自定义样式" 
    customClass="my-textarea" 
    customTextareaClass="my-textarea-inner" 
    customLabelClass="my-textarea-label"
  />
</template>

<style scoped>
:deep(.my-textarea) {
  background-color: #f9f9f9;
}

:deep(.my-textarea-label) {
  color: #1989fa;
  font-weight: bold;
}

:deep(.my-textarea-inner) {
  font-size: 16px;
  line-height: 1.5;
}
</style>
```

### CSS 变量

组件支持通过 CSS 变量进行样式定制，以下是常用的 CSS 变量：

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| --textarea-background-color | 文本域背景色 | #ffffff |
| --textarea-text-color | 文本域文字颜色 | #323233 |
| --textarea-placeholder-color | 占位符文字颜色 | #969799 |
| --textarea-border-color | 边框颜色 | #ebedf0 |
| --textarea-font-size | 字体大小 | 32rpx |
| --textarea-line-height | 行高 | 48rpx |
| --textarea-padding | 内边距 | 20rpx |
| --textarea-label-color | 标签文字颜色 | #323233 |
| --textarea-label-font-size | 标签字体大小 | 32rpx |
| --textarea-error-color | 错误状态颜色 | #ee0a24 |

## 注意事项

1. **自动增高**：
   - 当 `autoHeight` 为 `true` 时，`style.height` 属性将不生效
   - 自动增高功能在不同平台上的表现可能有所差异

2. **字数限制**：
   - `showWordLimit` 属性需要配合 `maxlength` 属性使用才会生效
   - 当输入内容超过 `maxlength` 时，会自动截断

3. **清空按钮**：
   - `clearable` 属性控制是否显示清空按钮
   - `clearTrigger` 属性控制清空按钮的显示时机
   - `focusWhenClear` 属性控制点击清空按钮后是否聚焦输入框

4. **表单验证**：
   - 当与 `wd-form` 组件配合使用时，需要设置 `prop` 属性
   - 表单验证规则可以通过 `rules` 属性设置，也可以在 `wd-form` 组件中统一设置

5. **键盘配置**：
   - `confirmType` 属性控制键盘右下角按钮的文字
   - `confirmHold` 属性控制点击确认按钮后是否保持键盘不收起
   - `adjustPosition` 属性控制键盘弹起时是否自动上推页面

6. **跨平台兼容**：
   - 组件在不同平台上的表现可能有所差异，特别是在键盘处理和自动增高方面
   - 建议在目标平台上进行充分测试

7. **性能优化**：
   - 对于大量文本输入，建议设置合理的 `maxlength` 限制
   - 避免在频繁输入的场景下使用复杂的计算属性或监听器
