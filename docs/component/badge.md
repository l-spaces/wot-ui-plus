# wd-badge 徽标组件

## 组件概述

wd-badge 是一个用于显示徽标的组件，可以附加在任何元素上，用于展示未读消息数、状态提示等信息。该组件支持多种样式、类型和显示方式，适用于各种需要突出显示数量或状态的场景。

### 适用场景
- 未读消息数量显示
- 新功能提示
- 状态标记（如在线、离线、警告等）
- 数量统计展示
- 任何需要突出显示信息的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| model-value | Number / String | - | 否 | 显示值，支持数值和字符串类型 |
| show-zero | Boolean | false | 否 | 当数值为 0 时，是否展示徽标 |
| bg-color | String | - | 否 | 徽标背景颜色，用于自定义徽标的背景色 |
| max | Number | - | 否 | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 |
| is-dot | Boolean | false | 否 | 是否为红色点状标注，不显示具体数值 |
| hidden | Boolean | false | 否 | 是否隐藏徽标 |
| type | String | undefined | 否 | 徽标类型，可选值：primary / success / warning / danger / info |
| top | Number / String | - | 否 | 为正时，徽标向下偏移对应的像素 |
| right | Number / String | - | 否 | 为正时，徽标向左偏移对应的像素 |
| custom-class | String | - | 否 | 根节点自定义类名 |
| custom-style | String / Object | - | 否 | 根节点自定义样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| - | - | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 放置需要显示徽标的内容，徽标会自动附加到该内容上 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <!-- 基础数字徽标 -->
    <wd-badge :model-value="5">
      <wd-icon name="message" size="40rpx" />
    </wd-badge>
    
    <!-- 显示文本 -->
    <wd-badge model-value="new">
      <wd-icon name="bell" size="40rpx" />
    </wd-badge>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 40rpx;
  padding: 40rpx;
}
</style>
```

### 自定义最大值
```vue
<template>
  <view class="container">
    <!-- 超过最大值显示 "99+" -->
    <wd-badge :model-value="120" :max="99">
      <wd-icon name="message" size="40rpx" />
    </wd-badge>
  </view>
</template>

<style scoped>
.container {
  padding: 40rpx;
}
</style>
```

### 点状徽标
```vue
<template>
  <view class="container">
    <!-- 点状徽标 -->
    <wd-badge is-dot>
      <wd-icon name="message" size="40rpx" />
    </wd-badge>
    
    <!-- 自定义颜色的点状徽标 -->
    <wd-badge is-dot bg-color="#409eff">
      <wd-icon name="bell" size="40rpx" />
    </wd-badge>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 40rpx;
  padding: 40rpx;
}
</style>
```

### 不同类型的徽标
```vue
<template>
  <view class="container">
    <!-- 主要类型 -->
    <wd-badge :model-value="5" type="primary">
      <wd-icon name="message" size="40rpx" />
    </wd-badge>
    
    <!-- 成功类型 -->
    <wd-badge :model-value="10" type="success">
      <wd-icon name="bell" size="40rpx" />
    </wd-badge>
    
    <!-- 警告类型 -->
    <wd-badge :model-value="15" type="warning">
      <wd-icon name="cart" size="40rpx" />
    </wd-badge>
    
    <!-- 危险类型 -->
    <wd-badge :model-value="20" type="danger">
      <wd-icon name="user" size="40rpx" />
    </wd-badge>
    
    <!-- 信息类型 -->
    <wd-badge :model-value="25" type="info">
      <wd-icon name="setting" size="40rpx" />
    </wd-badge>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 40rpx;
  padding: 40rpx;
  flex-wrap: wrap;
}
</style>
```

### 自定义位置和样式
```vue
<template>
  <view class="container">
    <!-- 自定义位置的徽标 -->
    <wd-badge :model-value="5" :top="10" :right="10">
      <wd-icon name="message" size="40rpx" />
    </wd-badge>
    
    <!-- 自定义背景色和样式 -->
    <wd-badge :model-value="10" bg-color="#409eff" :custom-style="{ fontSize: '20rpx', padding: '0 10rpx' }">
      <wd-icon name="bell" size="40rpx" />
    </wd-badge>
    
    <!-- 显示 0 值 -->
    <wd-badge :model-value="0" show-zero>
      <wd-icon name="cart" size="40rpx" />
    </wd-badge>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 40rpx;
  padding: 40rpx;
}
</style>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-badge :model-value="5" custom-class="my-badge">
    <wd-icon name="message" size="40rpx" />
  </wd-badge>
</template>

<style scoped>
.my-badge {
  /* 自定义样式 */
}

.my-badge .wd-badge__content {
  /* 自定义徽标样式 */
  font-size: 20rpx;
  padding: 0 10rpx;
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-badge 
    :model-value="5" 
    :custom-style="{ margin: '10rpx' }" 
  >
    <wd-icon name="message" size="40rpx" />
  </wd-badge>
</template>
```

### 自定义背景色
通过 `bg-color` 属性可以自定义徽标的背景颜色：

```vue
<template>
  <wd-badge :model-value="5" bg-color="#409eff">
    <wd-icon name="message" size="40rpx" />
  </wd-badge>
</template>
```

### 自定义徽标位置
通过 `top` 和 `right` 属性可以调整徽标的位置：

```vue
<template>
  <wd-badge :model-value="5" :top="10" :right="10">
    <wd-icon name="message" size="40rpx" />
  </wd-badge>
</template>
```

## 注意事项

1. **数值显示规则**：
   - 当 `model-value` 为 0 时，默认不显示徽标，可通过 `show-zero` 属性设置显示
   - 当 `model-value` 超过 `max` 值时，显示 `{max}+`，要求 `model-value` 是 Number 类型
   - 当 `is-dot` 为 true 时，只显示点状徽标，不显示具体数值

2. **类型与样式**：
   - `type` 属性支持五种预设类型：primary、success、warning、danger、info
   - 当同时设置 `type` 和 `bg-color` 时，`bg-color` 优先级更高
   - 点状徽标的颜色受 `type` 或 `bg-color` 属性影响

3. **位置调整**：
   - `top` 属性为正时，徽标向下偏移对应的像素
   - `right` 属性为正时，徽标向左偏移对应的像素
   - 位置调整仅适用于徽标，不影响插槽内容

4. **性能优化**：
   - 当不需要显示徽标时，建议设置 `hidden` 属性为 true，减少不必要的渲染
   - 避免频繁更新徽标数值，建议使用防抖或节流处理

5. **兼容性**：
   - 该组件基于 uni-app 开发，支持多端适配
   - 在不同平台上，徽标的渲染效果可能存在差异，建议进行充分测试

6. **使用建议**：
   - 徽标内容应简洁明了，避免过长文本
   - 徽标颜色应与背景形成鲜明对比，确保可读性
   - 合理使用不同类型的徽标，保持视觉一致性