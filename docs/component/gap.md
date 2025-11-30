# wd-gap 间距

## 组件概述

间距组件是一个用于在页面中创建固定间距的辅助组件，它可以快速设置元素之间的垂直间距，支持自定义高度和背景颜色，并提供底部安全区适配功能。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，具有轻量、易用、灵活等特点。

### 功能描述
- 支持自定义间距高度
- 支持自定义背景颜色
- 支持底部安全区适配
- 支持自定义样式和类名
- 轻量级设计，性能开销小

### 适用场景
- 页面元素之间的垂直间距
- 列表项之间的分隔
- 底部导航栏与内容区域的间距适配
- 任何需要固定垂直间距的场景


## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| height | number/string | 15 | 否 | 间距高度，支持数值和字符串形式，如 15、'15px'、'1rem' |
| bgColor | string | 'transparent' | 否 | 背景颜色，支持颜色名称、十六进制、RGB 等格式 |
| safeAreaBottom | boolean | false | 否 | 是否开启底部安全区适配，适配 iPhone X 等机型 |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
组件未定义任何事件。

### Methods
组件未对外暴露任何方法。

### Slots
组件未定义任何插槽。

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <view class="box">第一个盒子</view>
    <wd-gap />
    <view class="box">第二个盒子</view>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.box {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
</style>
```

### 自定义高度

```vue
<template>
  <view class="container">
    <view class="box">第一个盒子</view>
    <wd-gap height="30" />
    <view class="box">第二个盒子</view>
    <wd-gap height="50" />
    <view class="box">第三个盒子</view>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.box {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
</style>
```

### 自定义背景颜色

```vue
<template>
  <view class="container">
    <view class="box">第一个盒子</view>
    <wd-gap height="20" bg-color="#e5e5e5" />
    <view class="box">第二个盒子</view>
    <wd-gap height="20" bg-color="#ff6b6b" />
    <view class="box">第三个盒子</view>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.box {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
</style>
```

### 底部安全区适配

```vue
<template>
  <view class="container">
    <view class="content">页面内容区域</view>
    <wd-gap safe-area-bottom />
    <view class="footer">底部固定区域</view>
  </view>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

.footer {
  padding: 15px;
  background-color: #fff;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #e5e5e5;
}
</style>
```

### 结合自定义样式使用

```vue
<template>
  <view class="container">
    <view class="box">第一个盒子</view>
    <wd-gap 
      height="20" 
      custom-class="my-gap"
      :custom-style="{
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }"
    />
    <view class="box">第二个盒子</view>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
}

.box {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

/* 自定义类名样式 */
.my-gap {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-gap custom-class="my-gap" />

<style>
.my-gap {
  /* 自定义样式 */
  background-color: #e5e5e5;
  border-radius: 8px;
}
</style>
```

### customStyle 用法
```vue
<wd-gap 
  :custom-style="{
    backgroundColor: '#e5e5e5',
    borderRadius: '8px',
    margin: '10px 0'
  }"
/>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-gap {
  /* 自定义高度 */
  --gap-height: 15px;
  /* 自定义背景颜色 */
  --gap-background-color: transparent;
}
```

## 注意事项

1. **性能优化**：
   - 组件本身非常轻量，性能开销小，可以放心使用
   - 避免在大量循环中使用不同高度的 gap 组件，建议统一管理间距样式

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致
   - 底部安全区适配功能在支持安全距离的设备上生效，其他设备上会忽略此属性

3. **使用限制**：
   - 组件仅支持垂直方向的间距设置，不支持水平方向
   - 高度属性支持数值和字符串形式，但建议使用数值形式，以便组件内部进行单位转换

4. **最佳实践**：
   - 为不同场景定义统一的间距规范，如小间距(10px)、中间距(20px)、大间距(30px)等
   - 在页面布局中，合理使用 gap 组件可以使代码更加清晰，避免在多个元素上重复设置 margin 或 padding
   - 对于需要动态调整的间距，可以通过绑定 height 属性实现

5. **常见问题**：
   - 问题：底部安全区适配不生效
     解决方案：确保已设置 `safeAreaBottom: true`，并在支持安全距离的设备上测试
   - 问题：自定义高度不生效
     解决方案：检查 height 属性的格式是否正确，支持数值和字符串形式，如 15、'15px' 等

