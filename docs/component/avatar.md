# wd-avatar 头像组件

## 组件概述

wd-avatar 是一个基于 UniApp + Vue 3 + TypeScript 开发的跨平台头像组件，用于展示用户头像，支持多种展示形式，包括图片头像、文字头像、图标头像和小程序开放数据头像。该组件提供了丰富的配置选项，包括头像形状、尺寸、背景色、文字颜色等，适用于各种需要展示用户头像的场景，如用户中心、聊天列表、评论区等。

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| src | string | '' | 否 | 头像图片路径(不能为相对路径) |
| shape | string | 'circle' | 否 | 头像形状，circle-圆形，square-方形 |
| size | string \| number | 40 | 否 | 头像尺寸，单位px |
| mode | string | 'scaleToFill' | 否 | 裁剪模式，可选值见 ImageMode 类型定义 |
| text | string | '' | 否 | 显示的文字 |
| bgColor | string | '#c0c4cc' | 否 | 背景色 |
| color | string | '#ffffff' | 否 | 文字颜色 |
| fontSize | string \| number | 18 | 否 | 文字大小，单位px |
| icon | string | '' | 否 | 显示的图标 |
| mpAvatar | boolean | false | 否 | 显示小程序头像，只对百度，微信，QQ小程序有效 |
| randomBgColor | boolean | false | 否 | 是否使用随机背景色 |
| defaultUrl | string | '' | 否 | 加载失败的默认头像(组件有内置默认图片) |
| colorIndex | number | - | 否 | 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间 |
| name | string | '' | 否 | 组件标识符 |
| sexIcon | string | '' | 否 | 右上角性别角标，male-男，female-女 |
| sexBgColor | string | '' | 否 | 右上角性别图标的背景颜色 |
| showLevel | boolean | false | 否 | 是否显示等级图标 |
| levelBgColor | string | '' | 否 | 右下角等级图标背景颜色 |
| customStyle | string | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击头像时触发 | name: 组件标识符<br>event: 事件对象 |

### Methods

该组件无对外暴露的方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义头像内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="demo-avatar">
    <wd-avatar src="https://picsum.photos/200/200?random=1"></wd-avatar>
    <wd-avatar src="https://picsum.photos/200/200?random=2" shape="square"></wd-avatar>
    <wd-avatar text="张三"></wd-avatar>
    <wd-avatar icon="user"></wd-avatar>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-avatar {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

### 自定义尺寸和颜色

```vue
<template>
  <view class="demo-avatar">
    <wd-avatar src="https://picsum.photos/200/200?random=1" :size="60"></wd-avatar>
    <wd-avatar text="李四" :size="80" bg-color="#409eff" color="#ffffff"></wd-avatar>
    <wd-avatar icon="user" :size="100" bg-color="#67c23a" color="#ffffff"></wd-avatar>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-avatar {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

### 随机背景色

```vue
<template>
  <view class="demo-avatar">
    <wd-avatar text="王五" random-bg-color></wd-avatar>
    <wd-avatar text="赵六" random-bg-color :color-index="5"></wd-avatar>
    <wd-avatar text="孙七" random-bg-color :color-index="10"></wd-avatar>
    <wd-avatar text="周八" random-bg-color :color-index="15"></wd-avatar>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-avatar {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

### 带性别角标和等级图标

```vue
<template>
  <view class="demo-avatar">
    <wd-avatar src="https://picsum.photos/200/200?random=1" sex-icon="male"></wd-avatar>
    <wd-avatar src="https://picsum.photos/200/200?random=2" sex-icon="female"></wd-avatar>
    <wd-avatar src="https://picsum.photos/200/200?random=3" show-level></wd-avatar>
    <wd-avatar src="https://picsum.photos/200/200?random=4" sex-icon="male" show-level></wd-avatar>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-avatar {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

### 小程序开放数据头像

```vue
<template>
  <view class="demo-avatar">
    <wd-avatar mp-avatar></wd-avatar>
    <wd-avatar mp-avatar :size="60"></wd-avatar>
    <wd-avatar mp-avatar shape="square"></wd-avatar>
  </view>
</template>

<script lang="ts" setup>
// 无需额外引入
</script>

<style scoped>
.demo-avatar {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

## 样式定制指南

### 自定义整体样式

通过 `customStyle` 和 `customClass` 属性可以自定义组件的整体样式：

```vue
<template>
  <wd-avatar
    src="https://picsum.photos/200/200?random=1"
    customStyle="margin: 10px; border: 2px solid #409eff;"
    customClass="custom-avatar"
  ></wd-avatar>
</template>

<style>
.custom-avatar {
  /* 自定义样式 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义背景色和文字颜色

通过 `bgColor` 和 `color` 属性可以自定义背景色和文字颜色：

```vue
<template>
  <wd-avatar
    text="自定义颜色"
    bg-color="#409eff"
    color="#ffffff"
  ></wd-avatar>
</template>
```

### 自定义性别角标和等级图标样式

通过 `sexBgColor` 和 `levelBgColor` 属性可以自定义性别角标和等级图标的背景颜色：

```vue
<template>
  <wd-avatar
    src="https://picsum.photos/200/200?random=1"
    sex-icon="male"
    sex-bg-color="#409eff"
    show-level
    level-bg-color="#67c23a"
  ></wd-avatar>
</template>
```

## 注意事项

1. **头像图片路径**：
   - `src` 属性必须使用绝对路径或网络图片地址，不能使用相对路径
   - 支持 base64 格式的图片
   - 图片加载失败时，会显示默认头像或 base64 占位图

2. **头像展示优先级**：
   - 小程序开放数据头像（`mpAvatar` 为 `true` 时）
   - 图标头像（`icon` 属性有值时）
   - 文字头像（`text` 属性有值时）
   - 图片头像（`src` 属性有值时）
   - 默认头像（以上属性都没有值时）

3. **小程序开放数据头像**：
   - 仅支持微信、QQ、百度小程序
   - 需要用户授权才能获取头像
   - 其他平台会忽略该属性

4. **随机背景色**：
   - 设置 `randomBgColor` 为 `true` 时，会从内置的 20 种颜色中随机选择一种
   - 可以通过 `colorIndex` 属性指定具体的颜色索引，取值范围为 0-19

5. **头像形状**：
   - 支持圆形（circle）和方形（square）两种形状
   - 圆形头像会自动设置 `border-radius: 50%`
   - 方形头像会自动设置 `border-radius: 4px`

6. **裁剪模式**：
   - 支持多种裁剪模式，与 UniApp 的 `image` 组件的 `mode` 属性一致
   - 建议根据实际需求选择合适的裁剪模式

7. **性能优化**：
   - 建议使用适当大小的图片，避免过大的图片影响性能
   - 对于频繁更新的头像，建议使用缓存机制
   - 避免在循环中频繁创建头像组件

8. **事件处理**：
   - 点击事件会传递组件标识符 `name` 和事件对象 `event`
   - 可以通过 `name` 属性区分不同的头像组件

## 常见问题解决方案

1. **头像不显示**：
   - 检查 `src` 属性是否使用了正确的路径
   - 检查图片是否可以正常访问
   - 检查是否设置了 `mpAvatar` 属性，但不在支持的小程序平台

2. **图片加载失败**：
   - 检查图片地址是否正确
   - 检查网络连接是否正常
   - 组件会自动处理加载失败情况，显示默认头像

3. **头像形状不符合预期**：
   - 检查 `shape` 属性是否设置正确
   - 检查是否有自定义样式覆盖了默认样式

4. **随机背景色不生效**：
   - 检查 `randomBgColor` 属性是否设置为 `true`
   - 检查 `colorIndex` 属性是否在 0-19 范围内

5. **小程序开放数据头像不显示**：
   - 检查是否在支持的小程序平台（微信、QQ、百度）
   - 检查用户是否授权获取头像
   - 检查小程序基础库版本是否支持

## 性能优化建议

1. **合理设置头像尺寸**：
   - 根据实际需求设置合适的头像尺寸
   - 避免使用过大的尺寸，影响页面加载性能

2. **优化图片资源**：
   - 使用适当大小的图片，避免过大的图片文件
   - 对于网络图片，建议使用 CDN 加速
   - 考虑使用 WebP 等高效图片格式

3. **使用缓存机制**：
   - 对于频繁使用的头像，建议使用缓存机制
   - 避免重复加载相同的图片资源

4. **避免频繁更新**：
   - 避免频繁修改头像的属性，如 `src`、`text` 等
   - 建议在数据稳定后再更新头像

5. **合理使用随机背景色**：
   - 随机背景色功能会增加计算开销
   - 对于大量头像的场景，建议预先计算好背景色
