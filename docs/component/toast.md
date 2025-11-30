# Toast 提示

## 组件概述

wd-toast 是一个轻量级的提示组件，用于在 UniApp 应用中显示各种类型的提示信息，如成功、错误、警告、加载中、信息等。它支持自定义位置、图标、动画效果和显示时长，是构建用户友好界面的重要组件。

### 功能特点
- 支持多种提示类型：success、error、warning、loading、info
- 支持自定义位置：top、middle-top、middle、bottom
- 支持自定义图标、大小和颜色
- 支持垂直和水平排列
- 支持遮罩层
- 提供便捷的方法调用（show、success、error、warning、info、loading、close）
- 支持自动关闭和手动关闭
- 支持回调函数（opened、closed）

### 适用场景
- 操作成功或失败的反馈提示
- 加载状态的提示
- 警告或信息提示
- 需要用户注意的临时信息展示

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| selector | string | '' | 否 | 选择器 |
| msg | string | '' | 否 | 提示信息 |
| direction | string | 'horizontal' | 否 | 排列方向，可选值：vertical（垂直）、horizontal（水平） |
| iconName | string | '' | 否 | 图标名称，可选值：success、error、warning、loading、info |
| iconSize | number | - | 否 | 图标大小 |
| loadingType | string | 'outline' | 否 | 加载类型，可选值：outline、ring |
| loadingColor | string | '#4D80F0' | 否 | 加载颜色 |
| loadingSize | number | - | 否 | 加载大小 |
| iconColor | string | '' | 否 | 图标颜色 |
| position | string | 'middle-top' | 否 | 位置，可选值：top、middle-top、middle、bottom |
| zIndex | number | 100 | 否 | 层级 |
| cover | boolean | false | 否 | 是否存在遮罩层 |
| iconClass | string | '' | 否 | 图标类名 |
| classPrefix | string | 'wd-icon' | 否 | 类名前缀，用于使用自定义图标 |
| opened | function | - | 否 | 完全展示后的回调函数 |
| closed | function | - | 否 | 完全关闭时的回调函数 |

### Events

该组件未定义任何自定义事件，而是通过回调函数（opened、closed）处理状态变化。

### Slots

该组件不支持任何插槽。

### Methods

通过 `useToast`  composable 可以获取以下方法：

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| show | options: ToastOptions \| string | - | 打开 Toast，可传入字符串或对象配置 |
| success | options: ToastOptions \| string | - | 显示成功提示 |
| error | options: ToastOptions \| string | - | 显示错误提示 |
| warning | options: ToastOptions \| string | - | 显示警告提示 |
| info | options: ToastOptions \| string | - | 显示信息提示 |
| loading | options: ToastOptions \| string | - | 显示加载提示 |
| close | - | - | 关闭 Toast |

#### ToastOptions 对象结构

| 属性名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| msg | string | '' | 提示信息 |
| duration | number | 2000 | 显示时长（毫秒），0 表示不自动关闭 |
| direction | string | 'horizontal' | 排列方向，可选值：vertical、horizontal |
| iconName | string | - | 图标类型，可选值：success、error、warning、loading、info |
| iconSize | number | - | 图标大小 |
| loadingType | string | 'outline' | 加载类型，可选值：outline、ring |
| loadingColor | string | '#4D80F0' | 加载颜色 |
| loadingSize | number | - | 加载大小 |
| iconColor | string | - | 图标颜色 |
| position | string | 'middle-top' | 位置，可选值：top、middle-top、middle、bottom |
| show | boolean | false | 是否显示 |
| zIndex | number | 100 | 层级 |
| cover | boolean | false | 是否存在遮罩层 |
| iconClass | string | '' | 图标类名 |
| classPrefix | string | 'wd-icon' | 类名前缀，用于使用自定义图标 |
| opened | function | - | 完全展示后的回调函数 |
| closed | function | - | 完全关闭时的回调函数 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-button @click="showToast">显示提示</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const { show } = useToast()

const showToast = () => {
  show('这是一条提示信息')
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
```

### 不同类型的提示

```vue
<template>
  <view class="demo">
    <wd-button @click="showSuccess">成功提示</wd-button>
    <wd-button @click="showError">错误提示</wd-button>
    <wd-button @click="showWarning">警告提示</wd-button>
    <wd-button @click="showInfo">信息提示</wd-button>
    <wd-button @click="showLoading">加载提示</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const { success, error, warning, info, loading, close } = useToast()

const showSuccess = () => {
  success('操作成功')
}

const showError = () => {
  error('操作失败')
}

const showWarning = () => {
  warning('警告信息')
}

const showInfo = () => {
  info('提示信息')
}

const showLoading = () => {
  loading('加载中')
  // 模拟加载完成
  setTimeout(() => {
    close()
  }, 2000)
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 自定义位置和时长

```vue
<template>
  <view class="demo">
    <wd-button @click="showTop">顶部提示</wd-button>
    <wd-button @click="showMiddle">中间提示</wd-button>
    <wd-button @click="showBottom">底部提示</wd-button>
    <wd-button @click="showLong">长时间提示</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const { show } = useToast()

const showTop = () => {
  show({
    msg: '顶部提示',
    position: 'top'
  })
}

const showMiddle = () => {
  show({
    msg: '中间提示',
    position: 'middle'
  })
}

const showBottom = () => {
  show({
    msg: '底部提示',
    position: 'bottom'
  })
}

const showLong = () => {
  show({
    msg: '长时间提示',
    duration: 5000
  })
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 垂直排列和遮罩层

```vue
<template>
  <view class="demo">
    <wd-button @click="showVertical">垂直排列</wd-button>
    <wd-button @click="showWithCover">带遮罩层</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const { success, loading, close } = useToast()

const showVertical = () => {
  success({
    msg: '垂直排列的成功提示',
    direction: 'vertical'
  })
}

const showWithCover = () => {
  loading({
    msg: '加载中...',
    cover: true
  })
  // 模拟加载完成
  setTimeout(() => {
    close()
  }, 2000)
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 回调函数

```vue
<template>
  <view class="demo">
    <wd-button @click="showWithCallback">带回调函数</wd-button>
    <view class="result">{{ callbackResult }}</view>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const { show } = useToast()
const callbackResult = ref('')

const showWithCallback = () => {
  callbackResult.value = '提示即将显示'
  show({
    msg: '带回调函数的提示',
    opened: () => {
      callbackResult.value = '提示已显示'
    },
    closed: () => {
      callbackResult.value = '提示已关闭'
    }
  })
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 和 `customClass` 属性可以自定义 Toast 的样式：

```vue
<template>
  <view class="demo">
    <wd-button @click="showCustomStyle">自定义样式</wd-button>
    <wd-toast customClass="my-toast" />
  </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const { success } = useToast()

const showCustomStyle = () => {
  success({
    msg: '自定义样式提示',
    customStyle: 'background-color: #1989fa; color: white; border-radius: 8px; padding: 15px;'
  })
}
</script>

<style scoped>
.demo {
  padding: 20px;
  display: flex;
  justify-content: center;
}

:deep(.my-toast) {
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

### CSS 变量

组件支持通过 CSS 变量进行样式定制，以下是常用的 CSS 变量：

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| --toast-background-color | 背景颜色 | rgba(0, 0, 0, 0.7) |
| --toast-text-color | 文字颜色 | #ffffff |
| --toast-font-size | 文字大小 | 32rpx |
| --toast-line-height | 行高 | 48rpx |
| --toast-padding | 内边距 | 24rpx 32rpx |
| --toast-border-radius | 圆角 | 8rpx |
| --toast-icon-size | 图标大小 | 64rpx |
| --toast-vertical-gap | 垂直排列时的图标与文字间距 | 16rpx |
| --toast-horizontal-gap | 水平排列时的图标与文字间距 | 16rpx |

## 注意事项

1. **使用方式**：
   - wd-toast 组件支持两种使用方式：组件化使用和 composable API 调用
   - 推荐使用 composable API 调用，更加灵活方便
   - 组件化使用时，需要在页面中添加 `<wd-toast />` 标签

2. **加载提示**：
   - 调用 `loading` 方法时，默认 `duration` 为 0，表示不会自动关闭，需要手动调用 `close` 方法关闭
   - 加载提示默认带有遮罩层

3. **回调函数**：
   - `opened` 回调在 Toast 完全显示后触发
   - `closed` 回调在 Toast 完全关闭后触发

4. **遮罩层**：
   - 设置 `cover: true` 时，Toast 会显示遮罩层，防止用户点击其他区域
   - 遮罩层默认是透明的，不会影响用户查看页面内容

5. **位置设置**：
   - `top`：距离顶部 50rpx
   - `middle-top`：距离顶部 30% 高度
   - `middle`：居中显示
   - `bottom`：距离底部 50rpx

6. **性能优化**：
   - 避免频繁调用 Toast，会影响用户体验
   - 对于长时间运行的操作，建议使用加载提示
   - 对于短暂的操作反馈，建议使用较短的显示时长
