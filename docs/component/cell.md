# wd-cell 单元格组件

## 组件概述

wd-cell 是一个用于展示结构化信息的单元格组件，常用于列表、表单等场景。该组件提供了丰富的配置选项，支持自定义标题、内容、图标、跳转链接等，具有良好的扩展性和易用性。


### 适用场景
- 列表项：如设置项、菜单列表、信息列表等
- 表单字段：如输入框、选择器、开关等表单控件的容器
- 跳转链接：如带箭头的跳转项，点击可跳转到其他页面
- 信息展示：如用户信息、订单信息、商品信息等
- 任何需要结构化展示信息的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| title | String | - | 否 | 左侧标题内容 |
| value | Number / String | '' | 否 | 右侧内容 |
| icon | String | - | 否 | 左侧图标类名 |
| icon-size | Number / String | - | 否 | 图标大小 |
| label | String | - | 否 | 标题下方的描述信息 |
| is-link | Boolean | false | 否 | 是否为跳转链接，显示右侧箭头 |
| to | String | - | 否 | 跳转地址，is-link 为 true 时有效 |
| replace | Boolean | false | 否 | 跳转时是否替换栈顶页面，is-link 为 true 时有效 |
| clickable | Boolean | false | 否 | 开启点击反馈，is-link 默认开启 |
| size | String | - | 否 | 设置单元格大小，可选值：large |
| border | Boolean | undefined | 否 | 是否展示边框线，默认继承父组件配置 |
| title-width | String | - | 否 | 设置左侧标题宽度 |
| center | Boolean | false | 否 | 是否垂直居中，默认顶部对齐 |
| required | Boolean | false | 否 | 是否必填，显示必填标记 |
| vertical | Boolean | false | 否 | 表单属性，上下结构，标题和内容垂直排列 |
| prop | String | - | 否 | 表单域 model 字段名，用于表单验证 |
| rules | Array | [] | 否 | 表单验证规则，结合 wd-form 组件使用 |
| custom-icon-class | String | '' | 否 | icon 使用 slot 时的自定义样式 |
| custom-label-class | String | '' | 否 | label 使用 slot 时的自定义样式 |
| custom-value-class | String | '' | 否 | value 使用 slot 时的自定义样式 |
| custom-title-class | String | '' | 否 | title 使用 slot 时的自定义样式 |
| value-align | String | right | 否 | value 文字对齐方式，可选值：left、right、center |
| ellipsis | Boolean | false | 否 | 是否超出隐藏，显示省略号 |
| use-title-slot | Boolean | true | 否 | 是否启用 title 插槽，用于解决插槽传递时 v-slot 和 v-if 冲突问题 |
| marker-side | String | before | 否 | 必填标记位置，可选值：before（标签前）、after（标签后） |
| custom-class | String | - | 否 | 根节点自定义类名，用于自定义整个单元格的样式 |
| custom-style | String / Object | - | 否 | 根节点自定义样式，用于自定义整个单元格的内联样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击单元格时触发 | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| - | - | - | - |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 右侧内容区域，用于放置自定义内容，不使用则显示 value 属性的值 |
| title | - | 左侧标题区域，用于自定义标题内容，优先级高于 title 属性 |
| label | - | 左侧描述信息区域，用于自定义描述内容，优先级高于 label 属性 |
| icon | - | 左侧图标区域，用于自定义图标，优先级高于 icon 属性 |
| right-icon | - | 右侧图标区域，用于自定义右侧图标，仅在 is-link 为 false 时显示 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <wd-cell title="基础单元格" value="右侧内容" />
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 带图标和描述的单元格
```vue
<template>
  <view class="container">
    <wd-cell 
      title="带图标和描述" 
      value="右侧内容" 
      icon="info" 
      label="这是描述信息"
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 带跳转链接的单元格
```vue
<template>
  <view class="container">
    <wd-cell 
      title="带跳转链接" 
      value="点击跳转" 
      is-link 
      to="/pages/detail/detail"
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 带点击事件的单元格
```vue
<template>
  <view class="container">
    <wd-cell 
      title="带点击事件" 
      value="点击触发事件" 
      clickable 
      @click="handleClick"
    />
  </view>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('点击了单元格')
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 垂直居中的单元格
```vue
<template>
  <view class="container">
    <wd-cell 
      title="垂直居中" 
      value="内容垂直居中" 
      center
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 自定义样式的单元格
```vue
<template>
  <view class="container">
    <wd-cell 
      title="自定义样式" 
      value="自定义颜色和字体大小" 
      custom-class="my-cell" 
      custom-title-class="my-title" 
      custom-value-class="my-value"
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}

.my-cell {
  /* 自定义单元格样式 */
  background-color: #f0f9ff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.my-title {
  /* 自定义标题样式 */
  color: #409eff;
  font-weight: bold;
}

.my-value {
  /* 自定义内容样式 */
  color: #67c23a;
  font-size: 32rpx;
}
</style>
```

### 上下结构的单元格
```vue
<template>
  <view class="container">
    <wd-cell 
      title="上下结构" 
      value="右侧内容" 
      label="这是描述信息" 
      vertical
    />
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 表单验证的单元格
```vue
<template>
  <view class="container">
    <wd-form @submit="handleSubmit">
      <wd-cell 
        title="姓名" 
        prop="name" 
        :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <wd-input v-model="form.name" placeholder="请输入姓名" />
      </wd-cell>
      <wd-button type="primary" block @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: ''
})

const handleSubmit = () => {
  console.log('提交成功，表单数据：', form.value)
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 自定义插槽的单元格
```vue
<template>
  <view class="container">
    <wd-cell title="自定义插槽">
      <template #icon>
        <wd-icon name="star" size="32rpx" color="#f56c6c" />
      </template>
      <template #title>
        <view class="custom-title">
          <text class="title-text">自定义标题</text>
          <wd-tag type="success" size="small">标签</wd-tag>
        </view>
      </template>
      <template #default>
        <view class="custom-value">
          <wd-switch v-model="switchValue" />
        </view>
      </template>
      <template #right-icon>
        <wd-icon name="more" size="32rpx" color="#909399" />
      </template>
    </wd-cell>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const switchValue = ref(false)
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.custom-value {
  display: flex;
  align-items: center;
}
</style>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-cell title="自定义类名" value="右侧内容" custom-class="my-cell" />
</template>

<style scoped>
.my-cell {
  /* 自定义样式 */
  background-color: #f5f7fa;
  border: 1rpx solid #e4e7ed;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-cell 
    title="自定义样式" 
    value="右侧内容" 
    :custom-style="{ backgroundColor: '#f0f9ff', borderRadius: '10rpx' }" 
  />
</template>
```

### 自定义标题、内容和图标样式
通过 `custom-title-class`、`custom-value-class`、`custom-icon-class` 和 `custom-label-class` 属性可以分别自定义标题、内容、图标和描述信息的样式：

```vue
<template>
  <wd-cell 
    title="自定义区域样式" 
    value="右侧内容" 
    icon="info" 
    label="描述信息" 
    custom-title-class="my-title" 
    custom-value-class="my-value" 
    custom-icon-class="my-icon" 
    custom-label-class="my-label"
  />
</template>

<style scoped>
.my-title {
  /* 自定义标题样式 */
  color: #409eff;
  font-weight: bold;
}

.my-value {
  /* 自定义内容样式 */
  color: #67c23a;
  font-size: 32rpx;
}

.my-icon {
  /* 自定义图标样式 */
  color: #f56c6c;
}

.my-label {
  /* 自定义描述信息样式 */
  color: #909399;
  font-size: 24rpx;
}
</style>
```

## 注意事项

1. **边框线处理**：
   - `border` 属性默认为 `undefined`，表示继承父组件的配置
   - 可以通过设置 `border` 属性为 `true` 或 `false` 来显式控制边框线的显示
   - 建议在父组件中统一设置边框线，避免单个单元格设置导致的样式不一致

2. **跳转链接**：
   - `is-link` 属性为 `true` 时，显示右侧箭头
   - `to` 属性用于设置跳转地址，支持相对路径和绝对路径
   - `replace` 属性用于控制跳转时是否替换栈顶页面

3. **点击反馈**：
   - `is-link` 为 `true` 时，默认开启点击反馈
   - 可以通过 `clickable` 属性开启或关闭点击反馈
   - 点击反馈会在点击时显示一个短暂的背景色变化

4. **表单集成**：
   - 与表单组件配合使用时，需要设置 `prop` 属性和 `rules` 属性
   - `prop` 属性为表单域 model 字段名，用于表单验证
   - `rules` 属性为表单验证规则，支持多种验证方式
   - 表单验证失败时，会在单元格下方显示错误信息

5. **插槽优先级**：
   - 插槽的优先级高于属性值
   - 当同时设置属性和插槽时，插槽的内容会覆盖属性的值
   - `use-title-slot` 属性用于控制是否启用 `title` 插槽，默认启用

6. **性能优化**：
   - 当单元格数量较多时，建议使用虚拟列表或分页加载，避免一次性渲染过多单元格
   - 避免在单元格中使用复杂的组件或大量的计算属性，影响渲染性能

7. **兼容性**：
   - 该组件基于 uni-app 开发，支持多端适配
   - 在不同平台上，单元格的渲染效果可能存在差异，建议进行充分测试

8. **响应式设计**：
   - 单元格组件默认支持响应式设计，会根据父容器的宽度自动调整
   - 可以通过自定义样式调整单元格在不同屏幕尺寸下的显示效果

## 常见问题

1. **Q：如何隐藏单元格的边框线？**
   A：通过设置 `border` 属性为 `false` 可以隐藏单元格的边框线。

2. **Q：如何调整左侧标题的宽度？**
   A：通过 `title-width` 属性可以设置左侧标题的宽度。

3. **Q：如何自定义右侧箭头的样式？**
   A：可以通过覆盖 `.wd-cell__arrow-right` 类的样式来自定义右侧箭头的样式。

4. **Q：如何实现带图标的跳转链接？**
   A：设置 `icon` 属性和 `is-link` 属性即可实现带图标的跳转链接。

5. **Q：如何在单元格中使用表单控件？**
   A：可以在单元格的默认插槽中放置表单控件，如输入框、选择器、开关等。

6. **Q：如何实现上下结构的单元格？**
   A：通过设置 `vertical` 属性为 `true` 可以实现上下结构的单元格。

7. **Q：如何自定义必填标记的位置？**
   A：通过 `marker-side` 属性可以设置必填标记的位置，可选值为 `before`（标签前）和 `after`（标签后）。

8. **Q：如何实现超出隐藏的效果？**
   A：通过设置 `ellipsis` 属性为 `true` 可以实现超出隐藏的效果，显示省略号。