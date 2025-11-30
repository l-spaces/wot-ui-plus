# wd-row 行布局组件

## 组件概述

wd-row 是一个行布局组件，用于创建行布局，通常与 wd-col 组件配合使用，实现灵活的栅格布局。组件基于 Vue 3 + TypeScript + UniApp 开发，支持跨平台使用。

### 功能特点

- 支持设置列间距
- 支持自动换行
- 与 wd-col 组件配合使用，实现栅格布局
- 支持自定义样式和类名
- 跨平台兼容（H5、小程序、App）

### 适用场景

- 表单布局
- 卡片布局
- 列表布局
- 响应式布局
- 任何需要行布局的场景

## API 参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| gutter | number | 0 | 否 | 列元素之间的间距（单位为px） |
| wrap | boolean | false | 否 | 是否自动换行 |
| customStyle | string \| object | - | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots

| 插槽名 | 作用域变量 | 使用场景说明 |
|--------|------------|--------------|
| default | - | 放置 wd-col 组件或其他内容 |

## 使用示例

### 1. 基础用法

```vue
<template>
  <view class="demo">
    <wd-row>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style lang="scss">
.col-content {
  height: 100px;
  background-color: #4D80F0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
</style>
```

### 2. 设置列间距

```vue
<template>
  <view class="demo">
    <wd-row :gutter="20">
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
    </wd-row>
  </view>
</template>
```

### 3. 自动换行

```vue
<template>
  <view class="demo">
    <wd-row :gutter="20" :wrap="true">
      <wd-col :span="12">
        <view class="col-content">12</view>
      </wd-col>
      <wd-col :span="12">
        <view class="col-content">12</view>
      </wd-col>
      <wd-col :span="12">
        <view class="col-content">12</view>
      </wd-col>
      <wd-col :span="12">
        <view class="col-content">12</view>
      </wd-col>
    </wd-row>
  </view>
</template>
```

### 4. 复杂布局

```vue
<template>
  <view class="demo">
    <wd-row :gutter="20">
      <wd-col :span="24">
        <view class="col-content">24</view>
      </wd-col>
    </wd-row>
    <wd-row :gutter="20" :wrap="true">
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="16">
        <view class="col-content">16</view>
      </wd-col>
    </wd-row>
    <wd-row :gutter="20">
      <wd-col :span="6">
        <view class="col-content">6</view>
      </wd-col>
      <wd-col :span="6">
        <view class="col-content">6</view>
      </wd-col>
      <wd-col :span="6">
        <view class="col-content">6</view>
      </wd-col>
      <wd-col :span="6">
        <view class="col-content">6</view>
      </wd-col>
    </wd-row>
  </view>
</template>
```

## 样式定制指南

### 1. 使用 customClass 和 customStyle

```vue
<template>
  <view class="demo">
    <wd-row 
      custom-class="custom-row" 
      :custom-style="{ backgroundColor: '#f5f7fa', padding: '20px', borderRadius: '8px' }"
    >
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="col-content">8</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style lang="scss">
.custom-row {
  // 自定义类样式
  margin-bottom: 20px;
}
</style>
```

## 注意事项

1. **组件关系**：
   - wd-row 组件通常与 wd-col 组件配合使用
   - wd-row 作为容器，wd-col 作为子元素

2. **栅格系统**：
   - 基于 24 栅格系统，每个 wd-col 的 span 属性总和不应超过 24
   - 支持响应式布局，可通过不同屏幕尺寸设置不同的 span 值

3. **列间距**：
   - gutter 属性用于设置列之间的间距
   - gutter 属性值必须大于或等于 0
   - 间距会均匀分布在列的左右两侧

4. **自动换行**：
   - wrap 属性用于控制是否自动换行
   - 当 wrap 为 false 时，超出 24 栅格的列会被压缩在同一行
   - 当 wrap 为 true 时，超出 24 栅格的列会自动换行

5. **性能考虑**：
   - 避免嵌套过深的栅格布局
   - 对于固定布局，建议直接使用 CSS 布局，避免使用栅格系统

6. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 但在某些平台上，flex 布局的表现可能略有差异
