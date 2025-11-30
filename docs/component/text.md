# Text 文本

## 组件概述

wd-text 是一个功能强大的文本格式化组件，用于在 UniApp 应用中实现各种文本样式和格式处理。它支持多种文本类型、格式化模式、样式定制和交互功能，是构建丰富文本内容的基础组件。

### 功能特点
- 支持多种文本类型（primary、success、info、warning、error、default）
- 提供文本格式化功能，包括日期、电话号码、姓名、金额等
- 支持文本脱敏处理
- 支持文本装饰（下划线、中划线、上划线）
- 支持点击事件和拨打电话功能
- 支持多行文本显示和省略
- 支持前缀和后缀插槽
- 提供丰富的样式定制选项

### 适用场景
- 信息展示页面的文本内容
- 表单字段的文本显示
- 列表项中的文本内容
- 需要特殊格式化的文本（如日期、电话号码、金额）
- 需要脱敏处理的敏感信息
- 需要交互功能的文本（如可点击拨打电话）

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| type | string | default | 否 | 文本类型，可选值：primary、success、info、warning、error、default |
| text | string / number | '' | 否 | 文本内容 |
| size | string / number | '' | 否 | 字体大小，支持数字（默认单位 rpx）和字符串（如 '16px'） |
| mode | string | text | 否 | 文本处理模式，可选值：text（普通文本）、date（日期）、phone（手机号）、name（姓名）、price（金额） |
| decoration | string | none | 否 | 文字装饰，可选值：underline（下划线）、line-through（中划线）、overline（上划线）、none（无） |
| call | boolean | false | 否 | 当 mode 为 phone 时，点击文本是否拨打电话 |
| bold | boolean | false | 否 | 是否粗体显示 |
| format | boolean | false | 否 | 是否脱敏，当 mode 为 phone 和 name 时生效 |
| color | string | '' | 否 | 文本颜色，支持十六进制、RGB、RGBA 等格式 |
| prefix | string | '' | 否 | 文本前缀内容 |
| suffix | string | '' | 否 | 文本后缀内容 |
| lines | number | - | 否 | 文本显示的行数，超出此行数将显示省略号，最大值为 5 |
| lineHeight | string | '' | 否 | 文本行高，支持数字（默认单位 rpx）和字符串（如 '24px'） |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击文本时触发 | event: Event - 原生点击事件对象 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| prefix | - | 文本前缀插槽，用于在文本前插入自定义内容 |
| suffix | - | 文本后缀插槽，用于在文本后插入自定义内容 |
| default | - | 默认插槽，用于自定义文本内容 |

### Methods

该组件未对外暴露任何方法。

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-text text="普通文本" />
    <wd-text text="主要文本" type="primary" />
    <wd-text text="成功文本" type="success" />
    <wd-text text="警告文本" type="warning" />
    <wd-text text="错误文本" type="error" />
  </view>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>
```

### 文本格式化

```vue
<template>
  <view class="demo">
    <wd-text text="16255551234" mode="phone" />
    <wd-text text="16255551234" mode="phone" format />
    <wd-text text="张三" mode="name" />
    <wd-text text="张三" mode="name" format />
    <wd-text text="1609459200000" mode="date" />
    <wd-text text="123456.789" mode="price" />
  </view>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>
```

### 文本样式定制

```vue
<template>
  <view class="demo">
    <wd-text text="粗体文本" bold />
    <wd-text text="下划线文本" decoration="underline" />
    <wd-text text="中划线文本" decoration="line-through" />
    <wd-text text="上划线文本" decoration="overline" />
    <wd-text text="自定义颜色" color="#1989fa" />
    <wd-text text="自定义大小" size="24" />
    <wd-text text="自定义行高" lineHeight="32" />
  </view>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>
```

### 多行文本和省略

```vue
<template>
  <view class="demo">
    <wd-text text="这是一段很长的文本，用于测试多行文本显示效果。当设置了lines属性后，超出指定行数的文本将显示省略号。" lines="2" />
    <wd-text text="这是一段很长的文本，用于测试多行文本显示效果。当设置了lines属性后，超出指定行数的文本将显示省略号。" lines="3" />
  </view>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>
```

### 带前缀和后缀的文本

```vue
<template>
  <view class="demo">
    <wd-text text="100" prefix="¥" type="success" />
    <wd-text text="2023" suffix="年" />
    <wd-text text="123456" prefix="ID: " suffix=" (已验证)" />
    <!-- 使用插槽自定义前缀和后缀 -->
    <wd-text text="100">
      <template #prefix>
        <text style="color: #1989fa;">¥</text>
      </template>
      <template #suffix>
        <text style="color: #646566;">元</text>
      </template>
    </wd-text>
  </view>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 属性可以直接设置组件的内联样式：

```vue
<wd-text text="自定义样式" customStyle="color: #1989fa; font-size: 20px; margin: 10px;" />
```

### 自定义类名

使用 `customClass` 属性可以为组件添加自定义的 CSS 类：

```vue
<template>
  <wd-text text="自定义类名" customClass="my-text" />
</template>

<style scoped>
:deep(.my-text) {
  color: #1989fa;
  font-size: 20px;
  font-weight: bold;
}
</style>
```

### CSS 变量

组件支持通过 CSS 变量进行样式定制，以下是可用的 CSS 变量：

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| --text-color | 文本颜色 | #323233 |
| --text-size | 文本大小 | 32rpx |
| --text-line-height | 文本行高 | 48rpx |
| --text-primary-color | 主要文本颜色 | #1989fa |
| --text-success-color | 成功文本颜色 | #07c160 |
| --text-warning-color | 警告文本颜色 | #ff976a |
| --text-error-color | 错误文本颜色 | #ee0a24 |

## 注意事项

1. **文本格式化**：
   - 当 `mode` 为 `phone` 或 `name` 时，`format` 属性才会生效
   - 日期格式化使用 dayjs 库，确保传入的是有效的时间戳
   - 金额格式化会自动保留两位小数，并添加千分位分隔符

2. **多行文本**：
   - `lines` 属性的最大值为 5
   - 多行文本省略效果可能在不同平台上有细微差异

3. **拨打电话**：
   - 当 `mode` 为 `phone` 且 `call` 为 `true` 时，点击文本会触发拨打电话功能
   - 该功能在不同平台上的表现可能有所不同，部分平台可能需要用户授权

4. **性能优化**：
   - 避免在大量文本或频繁更新的场景下使用复杂的格式化功能
   - 对于静态文本，建议直接使用原生 text 组件以获得最佳性能

5. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致，但仍可能存在细微差异
   - 建议在目标平台上进行充分测试，特别是文本省略和格式化功能
