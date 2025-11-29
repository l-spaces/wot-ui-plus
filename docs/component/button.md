# wd-button 按钮组件

## 组件概述

wd-button 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台按钮组件，用于触发用户交互操作。该组件支持多种按钮类型、尺寸、样式和开放能力，适用于各种需要用户点击操作的场景，如表单提交、页面跳转、功能触发等。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| plain | boolean | false | 否 | 幽灵按钮 |
| round | boolean | true | 否 | 圆角按钮 |
| disabled | boolean | false | 否 | 禁用按钮 |
| hairline | boolean | false | 否 | 是否细边框 |
| block | boolean | false | 否 | 块状按钮 |
| type | string | 'primary' | 否 | 按钮类型，可选值：primary / success / info / warning / error / text / icon |
| size | string | 'medium' | 否 | 按钮尺寸，可选值：small / medium / large |
| icon | string | - | 否 | 图标类名 |
| classPrefix | string | 'wd-icon' | 否 | 类名前缀，用于使用自定义图标，用法参考Icon组件 |
| loading | boolean | false | 否 | 加载中按钮 |
| loadingColor | string | - | 否 | 加载图标颜色 |
| openType | string | - | 否 | 开放能力 |
| hoverStopPropagation | boolean | - | 否 | 指定是否阻止本节点的祖先节点出现点击态 |
| lang | string | - | 否 | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 |
| sessionFrom | string | - | 否 | 会话来源，open-type="contact"时有效 |
| sendMessageTitle | string | - | 否 | 会话内消息卡片标题，open-type="contact"时有效 |
| sendMessagePath | string | - | 否 | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 |
| sendMessageImg | string | - | 否 | 会话内消息卡片图片，open-type="contact"时有效 |
| appParameter | string | - | 否 | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 |
| showMessageCard | boolean | - | 否 | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 |
| buttonId | string | - | 否 | 按钮的唯一标识，可用于设置隐私同意授权按钮的id |
| scope | string | - | 否 | 支付宝小程序，当 open-type 为 getAuthorize 时有效。可选值：'phoneNumber' | 'userInfo' |
| customStyle | string | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击按钮时触发 | event: 事件对象 |
| getuserinfo | 获取用户信息时触发，open-type="getUserInfo"时有效 | detail: 用户信息 |
| contact | 联系客服时触发，open-type="contact"时有效 | detail: 客服信息 |
| getphonenumber | 获取手机号时触发，open-type="getPhoneNumber"时有效 | detail: 手机号信息 |
| getrealtimephonenumber | 获取实时手机号时触发，open-type="getRealtimePhoneNumber"时有效 | detail: 实时手机号信息 |
| error | 发生错误时触发 | detail: 错误信息 |
| launchapp | 打开 APP 时触发，open-type="launchApp"时有效 | detail: 打开 APP 结果 |
| opensetting | 打开设置页时触发，open-type="openSetting"时有效 | detail: 设置信息 |
| chooseavatar | 选择头像时触发，open-type="chooseAvatar"时有效 | detail: 头像信息 |
| agreeprivacyauthorization | 同意隐私授权时触发，open-type="agreePrivacyAuthorization"时有效 | detail: 授权信息 |

### Methods

该组件无对外暴露的方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义按钮内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-button">
    <wd-button type="primary" @click="handleClick">主要按钮</wd-button>
    <wd-button type="success" @click="handleClick">成功按钮</wd-button>
    <wd-button type="info" @click="handleClick">信息按钮</wd-button>
    <wd-button type="warning" @click="handleClick">警告按钮</wd-button>
    <wd-button type="error" @click="handleClick">错误按钮</wd-button>
    <wd-button type="default" @click="handleClick">默认按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 点击事件处理
function handleClick(event: any) {
  console.log('按钮被点击', event)
}
</script>

<style scoped>
.demo-button {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 不同尺寸

```vue
<template>
  <view class="demo-button">
    <wd-button type="primary" size="small">小尺寸按钮</wd-button>
    <wd-button type="primary" size="medium">中尺寸按钮</wd-button>
    <wd-button type="primary" size="large">大尺寸按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-button {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 不同样式

```vue
<template>
  <view class="demo-button">
    <wd-button type="primary" :plain="false">普通按钮</wd-button>
    <wd-button type="primary" :plain="true">幽灵按钮</wd-button>
    <wd-button type="primary" :round="true">圆角按钮</wd-button>
    <wd-button type="primary" :round="false">直角按钮</wd-button>
    <wd-button type="primary" :block="true">块状按钮</wd-button>
    <wd-button type="primary" :hairline="true">细边框按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-button {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 带图标按钮

```vue
<template>
  <view class="demo-button">
    <wd-button type="primary" icon="search">搜索按钮</wd-button>
    <wd-button type="success" icon="check">成功按钮</wd-button>
    <wd-button type="warning" icon="warning">警告按钮</wd-button>
    <wd-button type="error" icon="close">错误按钮</wd-button>
    <wd-button type="info" icon="info">信息按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-button {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

### 加载中状态

```vue
<template>
  <view class="demo-button">
    <wd-button type="primary" :loading="loading" @click="toggleLoading">
      {{ loading ? '加载中...' : '点击加载' }}
    </wd-button>
    <wd-button type="success" :loading="loading" loading-color="#fff" @click="toggleLoading">
      {{ loading ? '加载中...' : '点击加载' }}
    </wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 加载状态
const loading = ref(false)

// 切换加载状态
function toggleLoading() {
  loading.value = !loading.value
  // 模拟加载完成
  if (loading.value) {
    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.demo-button {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```

## 样式定制指南

### 自定义整体样式

通过 `customStyle` 和 `customClass` 属性可以自定义按钮的整体样式：

```vue
<template>
  <wd-button 
    type="primary" 
    customStyle="margin: 10px; padding: 15px; border-radius: 8px;" 
    customClass="custom-button"
  >
    自定义样式按钮
  </wd-button>
</template>

<style>
.custom-button {
  /* 自定义样式 */
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义按钮颜色

通过修改 CSS 变量可以自定义按钮的颜色：

```vue
<template>
  <wd-button type="primary" customClass="custom-color-button">自定义颜色按钮</wd-button>
</template>

<style>
.custom-color-button {
  /* 自定义主色调 */
  --wd-button-primary-color: #409eff;
  /* 自定义主色调背景色 */
  --wd-button-primary-background-color: #ecf5ff;
}
</style>
```

### 自定义图标按钮

通过 `icon` 属性可以添加图标，通过 `classPrefix` 属性可以使用自定义图标：

```vue
<template>
  <wd-button type="primary" icon="custom-icon" class-prefix="my-icon">自定义图标按钮</wd-button>
</template>

<style>
/* 自定义图标样式 */
.my-icon {
  /* 自定义图标字体 */
  font-family: 'my-icon-font';
}

.my-icon-custom-icon::before {
  content: '\e600';
}
</style>
```

## 注意事项

1. **按钮类型和尺寸**：
   - 支持多种按钮类型，包括 primary、success、info、warning、error、default、text、icon
   - 支持三种按钮尺寸，包括 small、medium、large
   - 不同类型和尺寸的按钮有不同的视觉表现，建议根据实际场景选择合适的类型和尺寸

2. **开放能力**：
   - 支持多种小程序开放能力，如获取用户信息、分享、联系客服等
   - 不同开放能力有不同的使用条件和限制，建议参考小程序官方文档
   - 开放能力仅在小程序环境下有效，H5 和 App 环境下会被忽略

3. **加载中状态**：
   - 设置 `loading` 为 `true` 时，按钮会显示加载动画
   - 加载中状态下，按钮会被禁用，无法点击
   - 可以通过 `loadingColor` 属性自定义加载图标颜色

4. **禁用状态**：
   - 设置 `disabled` 为 `true` 时，按钮会被禁用
   - 禁用状态下，按钮无法点击，视觉上会呈现禁用样式

5. **事件处理**：
   - 点击事件仅在按钮未禁用且未处于加载中状态时触发
   - 开放能力事件会传递详细的事件信息，建议根据实际需求处理

6. **多平台适配**：
   - 组件使用了条件编译处理不同平台的差异
   - 不同平台的表现可能存在细微差异，建议在不同平台上进行充分测试
   - 开放能力仅在小程序环境下有效，H5 和 App 环境下会被忽略

7. **性能优化**：
   - 避免频繁更新按钮状态，如 loading、disabled 等
   - 对于大量按钮的场景，建议使用按需渲染或虚拟列表
   - 合理使用自定义样式，避免过度复杂的样式计算

## 常见问题解决方案

1. **按钮点击无响应**：
   - 检查按钮是否被禁用或处于加载中状态
   - 检查点击事件是否正确绑定
   - 检查按钮是否被其他元素遮挡

2. **开放能力无效**：
   - 检查是否在小程序环境下使用
   - 检查开放能力是否需要特殊配置或权限
   - 检查开放能力参数是否正确设置

3. **样式显示异常**：
   - 检查自定义样式是否正确
   - 检查是否与其他样式冲突
   - 尝试使用 `!important` 强制覆盖样式

4. **图标不显示**：
   - 检查图标名称是否正确
   - 检查图标类名前缀是否正确设置
   - 检查图标字体是否正确引入

5. **多平台兼容性问题**：
   - 在不同平台上进行充分测试
   - 注意不同平台的差异，使用条件编译进行处理
   - 参考小程序官方文档，了解不同平台的限制和特性

## 性能优化建议

1. **合理使用按钮类型**：
   - 根据实际场景选择合适的按钮类型和尺寸
   - 避免不必要的样式定制，使用组件默认样式可以提高性能

2. **减少状态更新**：
   - 避免频繁修改按钮的 loading、disabled 等状态
   - 建议在初始化时设置好按钮状态，减少后续更新

3. **优化事件处理**：
   - 避免在点击事件中执行复杂的操作
   - 对于耗时操作，建议使用异步处理

4. **使用虚拟列表**：
   - 对于大量按钮的场景，建议使用虚拟列表或按需渲染
   - 可以减少 DOM 节点数量，提高页面渲染性能

5. **合理使用开放能力**：
   - 仅在必要时使用开放能力
   - 开放能力可能会影响页面性能，建议谨慎使用
