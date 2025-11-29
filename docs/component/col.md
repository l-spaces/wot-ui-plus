# Col 列

## 组件概述

Col 是基于 24 列网格系统的列组件，用于与 Row 组件配合使用，构建灵活的响应式布局。它支持设置列宽、偏移量和间距，适用于各种复杂的页面布局场景。

### 适用场景

- 页面整体布局结构
- 表单布局设计
- 卡片网格展示
- 响应式导航栏
- 复杂数据展示表格
- 各种需要灵活布局的场景

## API 参考

### Props

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| span | Number | 24 | 否 | 列宽度，取值范围 0-24，默认为 24（占满整行） |
| offset | Number | 0 | 否 | 列偏移量，取值范围 0-24，默认为 0 |
| custom-style | String | - | 否 | 自定义根节点样式 |
| custom-class | String | - | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| - | - | - | 该组件未定义任何事件 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| - | - | - | 该组件未对外暴露任何方法 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 列内容插槽，用于放置列内的具体内容 |

## 使用示例

### 基础用法

```vue
<template>
  <view class="col-demo">
    <wd-row>
      <wd-col :span="8">
        <view class="demo-block">span: 8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="demo-block">span: 8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="demo-block">span: 8</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-block {
  height: 100px;
  background-color: #4d80f0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
</style>
```

### 设置列间距

```vue
<template>
  <view class="col-demo">
    <wd-row :gutter="20">
      <wd-col :span="8">
        <view class="demo-block">span: 8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="demo-block">span: 8</view>
      </wd-col>
      <wd-col :span="8">
        <view class="demo-block">span: 8</view>
      </wd-col>
    </wd-row>
  </view>
</template>
```

### 设置列偏移

```vue
<template>
  <view class="col-demo">
    <wd-row :gutter="20">
      <wd-col :span="6">
        <view class="demo-block">span: 6</view>
      </wd-col>
      <wd-col :span="6" :offset="6">
        <view class="demo-block">span: 6, offset: 6</view>
      </wd-col>
    </wd-row>
    <wd-row :gutter="20" style="margin-top: 20px;">
      <wd-col :span="6" :offset="12">
        <view class="demo-block">span: 6, offset: 12</view>
      </wd-col>
    </wd-row>
  </view>
</template>
```

### 不同列宽组合

```vue
<template>
  <view class="col-demo">
    <wd-row :gutter="10">
      <wd-col :span="12">
        <view class="demo-block">span: 12</view>
      </wd-col>
      <wd-col :span="6">
        <view class="demo-block">span: 6</view>
      </wd-col>
      <wd-col :span="6">
        <view class="demo-block">span: 6</view>
      </wd-col>
    </wd-row>
    <wd-row :gutter="10" style="margin-top: 10px;">
      <wd-col :span="4">
        <view class="demo-block">span: 4</view>
      </wd-col>
      <wd-col :span="4">
        <view class="demo-block">span: 4</view>
      </wd-col>
      <wd-col :span="4">
        <view class="demo-block">span: 4</view>
      </wd-col>
      <wd-col :span="4">
        <view class="demo-block">span: 4</view>
      </wd-col>
      <wd-col :span="4">
        <view class="demo-block">span: 4</view>
      </wd-col>
      <wd-col :span="4">
        <view class="demo-block">span: 4</view>
      </wd-col>
    </wd-row>
  </view>
</template>
```

### 嵌套布局

```vue
<template>
  <view class="col-demo">
    <wd-row :gutter="20">
      <wd-col :span="12">
        <view class="demo-block">
          <wd-row :gutter="10">
            <wd-col :span="12">
              <view class="demo-block nested">span: 12</view>
            </wd-col>
            <wd-col :span="12">
              <view class="demo-block nested">span: 12</view>
            </wd-col>
          </wd-row>
        </view>
      </wd-col>
      <wd-col :span="12">
        <view class="demo-block">span: 12</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-block {
  height: 100px;
  background-color: #4d80f0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
}

.demo-block.nested {
  height: 80px;
  background-color: #67c23a;
}
</style>
```

## 样式定制

### 自定义根节点样式

```vue
<template>
  <view class="col-demo">
    <wd-row :gutter="20">
      <wd-col 
        :span="8" 
        custom-class="my-col" 
        custom-style="background-color: #f0f9eb; border-radius: 8px;"
      >
        <view class="demo-block">自定义样式</view>
      </wd-col>
      <wd-col :span="8">
        <view class="demo-block">默认样式</view>
      </wd-col>
      <wd-col :span="8">
        <view class="demo-block">默认样式</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.my-col {
  /* 自定义根节点样式 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

### 1. 与 Row 组件配合使用

- Col 组件必须作为 Row 组件的直接子元素使用
- 列间距由 Row 组件的 `gutter` 属性控制
- 当 Row 组件设置 `wrap` 为 `true` 时，列会自动换行

### 2. 列宽和偏移量

- `span` 和 `offset` 属性的取值范围为 0-24
- 当 `span` 为 0 时，列会隐藏
- 同一行的 `span` 总和建议不超过 24，否则会自动换行

### 3. 间距计算

- 列间距通过 padding 实现，左右 padding 各为 `gutter / 2`
- 背景色会被裁剪到内容区域，不会延伸到 padding 区域
- 可以通过调整 `background-clip` 属性修改此行为

### 4. 响应式设计

- 目前组件本身不直接支持响应式断点
- 可以通过结合媒体查询或动态绑定 `span` 属性实现响应式布局

### 5. 嵌套布局

- 支持多层嵌套，内层 Row 组件会继承外层 Row 的 gutter 属性
- 嵌套时注意控制各层的 `span` 总和，避免布局错乱

## 组件关系

Col 组件与 Row 组件配合使用，共同构成 24 列网格布局系统：

- Row 组件作为容器，控制列间距和换行行为
- Col 组件作为列，控制宽度和偏移量
- Col 组件通过 `useParent` 钩子获取父 Row 组件的属性

