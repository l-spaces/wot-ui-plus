# wd-cell-group 单元格分组组件

## 组件概述

wd-cell-group 是一个用于对单元格进行分组管理的组件，通常与 wd-cell 组件配合使用。该组件提供了分组标题、右侧内容、边框线等配置选项，用于将相关的单元格组织在一起，形成清晰的视觉层次结构。

### 适用场景
- 表单分组：将相关的表单字段组织在一起
- 列表分组：将相关的列表项组织在一起
- 设置项分组：将相关的设置项组织在一起
- 信息展示分组：将相关的信息项组织在一起
- 任何需要对单元格进行分组管理的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| title | String | - | 否 | 分组标题，显示在左侧 |
| value | String | - | 否 | 分组右侧内容，显示在右侧 |
| use-slot | Boolean | false | 否 | 是否启用插槽，用于自定义分组标题和右侧内容 |
| border | Boolean | false | 否 | 是否展示边框线，默认不显示 |
| custom-class | String | - | 否 | 根节点自定义类名，用于自定义整个分组的样式 |
| custom-style | String / Object | - | 否 | 根节点自定义样式，用于自定义整个分组的内联样式 |

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
| default | - | 放置 wd-cell 组件，用于组织相关的单元格 |
| title | - | 自定义分组标题，优先级高于 title 属性 |
| value | - | 自定义分组右侧内容，优先级高于 value 属性 |

## 使用示例

### 基础用法
```vue
<template>
  <view class="container">
    <wd-cell-group title="基础分组">
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 带右侧内容的分组
```vue
<template>
  <view class="container">
    <wd-cell-group title="带右侧内容" value="更多" />
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 带边框线的分组
```vue
<template>
  <view class="container">
    <wd-cell-group title="带边框线" border>
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 自定义插槽的分组
```vue
<template>
  <view class="container">
    <wd-cell-group use-slot>
      <template #title>
        <view class="custom-title">
          <wd-icon name="star" size="32rpx" color="#f56c6c" />
          <text class="title-text">自定义标题</text>
        </view>
      </template>
      <template #value>
        <wd-button size="small" type="primary">按钮</wd-button>
      </template>
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

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
</style>
```

### 嵌套分组
```vue
<template>
  <view class="container">
    <wd-cell-group title="嵌套分组">
      <wd-cell title="外层单元格1" value="内容1" />
      <wd-cell title="外层单元格2" value="内容2" />
      <wd-cell-group title="内层分组" style="margin: 20rpx 0;">
        <wd-cell title="内层单元格1" value="内容1" />
        <wd-cell title="内层单元格2" value="内容2" />
      </wd-cell-group>
      <wd-cell title="外层单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 表单分组
```vue
<template>
  <view class="container">
    <wd-form @submit="handleSubmit">
      <wd-cell-group title="基本信息">
        <wd-cell title="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名' }]">
          <wd-input v-model="form.name" placeholder="请输入姓名" />
        </wd-cell>
        <wd-cell title="性别" prop="gender" :rules="[{ required: true, message: '请选择性别' }]">
          <wd-radio-group v-model="form.gender">
            <wd-radio label="男">男</wd-radio>
            <wd-radio label="女">女</wd-radio>
          </wd-radio-group>
        </wd-cell>
      </wd-cell-group>
      <wd-cell-group title="联系方式">
        <wd-cell title="手机号" prop="phone" :rules="[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]">
          <wd-input v-model="form.phone" placeholder="请输入手机号" type="number" />
        </wd-cell>
        <wd-cell title="邮箱" prop="email" :rules="[{ type: 'email', message: '请输入正确的邮箱地址' }]">
          <wd-input v-model="form.email" placeholder="请输入邮箱" type="email" />
        </wd-cell>
      </wd-cell-group>
      <wd-button type="primary" block @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  gender: '',
  phone: '',
  email: ''
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

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-cell-group title="自定义类名" custom-class="my-cell-group">
    <wd-cell title="单元格1" value="内容1" />
    <wd-cell title="单元格2" value="内容2" />
  </wd-cell-group>
</template>

<style scoped>
.my-cell-group {
  /* 自定义样式 */
  background-color: #f0f9ff;
  border-radius: 10rpx;
  padding: 20rpx;
}

.my-cell-group .wd-cell-group__title {
  /* 自定义标题样式 */
  color: #409eff;
  font-weight: bold;
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-cell-group 
    title="自定义样式" 
    :custom-style="{ backgroundColor: '#f5f7fa', borderRadius: '10rpx', padding: '20rpx' }"
  >
    <wd-cell title="单元格1" value="内容1" />
    <wd-cell title="单元格2" value="内容2" />
  </wd-cell-group>
</template>
```

## 注意事项

1. **边框线处理**：
   - `border` 属性默认为 `false`，表示不显示边框线
   - 可以通过设置 `border` 属性为 `true` 来显示边框线
   - 单元格组件会继承分组组件的 `border` 属性配置

2. **插槽优先级**：
   - 插槽的优先级高于属性值
   - 当同时设置属性和插槽时，插槽的内容会覆盖属性的值
   - `useSlot` 属性用于控制是否启用插槽，默认不启用

3. **嵌套使用**：
   - 支持嵌套使用，即一个分组组件内部可以包含另一个分组组件
   - 嵌套使用时，建议为内层分组添加适当的间距，避免样式冲突

4. **表单集成**：
   - 可以与表单组件配合使用，将相关的表单字段组织在一起
   - 分组组件本身不提供表单验证功能，表单验证需要通过 `wd-form` 和 `wd-cell` 组件配合实现

5. **性能优化**：
   - 当分组内的单元格数量较多时，建议使用虚拟列表或分页加载，避免一次性渲染过多单元格
   - 避免在分组内使用复杂的组件或大量的计算属性，影响渲染性能

6. **兼容性**：
   - 该组件基于 uni-app 开发，支持多端适配
   - 在不同平台上，分组的渲染效果可能存在差异，建议进行充分测试

7. **响应式设计**：
   - 分组组件默认支持响应式设计，会根据父容器的宽度自动调整
   - 可以通过自定义样式调整分组在不同屏幕尺寸下的显示效果

## 组件依赖

- 依赖 `useChildren` 组合式函数，用于管理子组件
- 与 `wd-cell` 组件配合使用，实现单元格的分组管理

## 常见问题

1. **Q：如何隐藏分组的标题？**
   A：不设置 `title` 属性且不使用 `title` 插槽即可隐藏分组的标题。

2. **Q：如何调整分组的内边距和外边距？**
   A：通过 `custom-class` 或 `custom-style` 属性可以调整分组的内边距和外边距。

3. **Q：如何实现分组的点击事件？**
   A：可以在分组组件上添加 `@click` 事件，或者在分组的标题区域添加点击事件。

4. **Q：如何自定义分组标题的样式？**
   A：通过 `custom-class` 属性添加自定义类名，然后在样式中覆盖 `.wd-cell-group__title` 类的样式。

5. **Q：如何让分组内的单元格不显示边框线？**
   A：可以在分组组件上设置 `border` 属性为 `false`，或者在单元格组件上设置 `border` 属性为 `false`。

6. **Q：如何实现分组的展开/折叠功能？**
   A：可以结合 `wd-collapse` 组件或自定义状态管理实现分组的展开/折叠功能。

7. **Q：如何在分组标题中添加图标？**
   A：可以使用 `title` 插槽，在插槽中添加图标和文本。

8. **Q：如何实现分组的横向排列？**
   A：可以通过自定义样式调整分组的布局，将分组内的单元格设置为横向排列。