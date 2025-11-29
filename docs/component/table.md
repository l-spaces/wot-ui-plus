# Table 表格

## 组件概述

Table 是一个功能强大的数据展示组件，用于以表格形式展示结构化数据。它支持固定表头、列排序、斑马纹、索引列、固定列等多种功能，适用于各种数据展示场景。

### 功能特点
- 支持固定表头和列
- 支持列排序功能
- 支持斑马纹样式
- 支持索引列
- 支持文本溢出省略
- 支持自定义空状态
- 支持自定义列宽和行高
- 支持边框显示控制
- 支持响应式设计，内容可横向滚动

### 适用场景
- 数据列表展示
- 报表统计
- 数据管理后台
- 订单列表
- 用户列表
- 商品列表

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| data | array | - | 是 | 显示的数据，数组中的每个对象代表一行数据 |
| border | boolean | true | 否 | 是否显示表格边框 |
| stripe | boolean | true | 否 | 是否显示斑马纹表格 |
| height | number/string | - | 否 | 表格的高度，超出高度会显示纵向滚动条 |
| rowHeight | number | 40 | 否 | 行高，单位为 px |
| showHeader | boolean | true | 否 | 是否显示表头 |
| ellipsis | boolean | true | 否 | 是否超出 2 行隐藏，显示省略号 |
| index | boolean/object | false | 否 | 是否显示索引列，可传入对象配置索引列属性 |
| fixedHeader | boolean | true | 否 | 是否固定表头 |
| emptyText | string | '暂无数据' | 否 | 空数据时显示的文本 |
| emptyHeight | number/string | 100 | 否 | 空数据区域高度，单位为 px |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| sort-method | 点击列排序按钮时触发 | column: TableColumn 对象，包含列信息和排序方向 |
| row-click | 点击表格行时触发 | { rowIndex: number }，rowIndex 为点击行的索引 |

### Methods

该组件未对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 默认插槽，用于放置 `wd-table-col` 子组件 |
| empty | - | 自定义空状态插槽，用于自定义无数据时的显示内容 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="200" />
    <wd-table-col prop="age" label="年龄" width="100" align="center" />
    <wd-table-col prop="gender" label="性别" width="100" align="center" />
    <wd-table-col prop="email" label="邮箱" width="300" />
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com' },
  { name: '李四', age: 30, gender: '女', email: 'lisi@example.com' },
  { name: '王五', age: 28, gender: '男', email: 'wangwu@example.com' },
  { name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com' }
])
</script>
```

### 带排序功能

```vue
<template>
  <wd-table :data="tableData" @sort-method="handleSort">
    <wd-table-col prop="name" label="姓名" width="200" />
    <wd-table-col prop="age" label="年龄" width="100" align="center" sortable />
    <wd-table-col prop="gender" label="性别" width="100" align="center" />
    <wd-table-col prop="email" label="邮箱" width="300" />
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com' },
  { name: '李四', age: 30, gender: '女', email: 'lisi@example.com' },
  { name: '王五', age: 28, gender: '男', email: 'wangwu@example.com' },
  { name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com' }
])

const handleSort = (column: any) => {
  console.log('排序字段:', column.prop, '排序方向:', column.sortDirection)
  // 根据排序字段和方向处理数据
}
</script>
```

### 带索引列

```vue
<template>
  <wd-table :data="tableData" :index="true">
    <wd-table-col prop="name" label="姓名" width="200" />
    <wd-table-col prop="age" label="年龄" width="100" align="center" />
    <wd-table-col prop="gender" label="性别" width="100" align="center" />
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, gender: '男' },
  { name: '李四', age: 30, gender: '女' },
  { name: '王五', age: 28, gender: '男' }
])
</script>
```

### 自定义列内容

```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="200" />
    <wd-table-col prop="status" label="状态" width="150" align="center">
      <template #value="{ row }">
        <wd-tag :type="row.status === 'active' ? 'success' : 'danger'">
          {{ row.status === 'active' ? '激活' : '禁用' }}
        </wd-tag>
      </template>
    </wd-table-col>
    <wd-table-col label="操作" width="200" align="center">
      <template #value="{ row }">
        <wd-button size="small" type="primary" @click="handleEdit(row)">编辑</wd-button>
        <wd-button size="small" type="danger" @click="handleDelete(row)">删除</wd-button>
      </template>
    </wd-table-col>
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', status: 'active' },
  { name: '李四', status: 'disabled' },
  { name: '王五', status: 'active' }
])

const handleEdit = (row: any) => {
  console.log('编辑:', row)
}

const handleDelete = (row: any) => {
  console.log('删除:', row)
}
</script>
```

### 自定义空状态

```vue
<template>
  <wd-table :data="emptyData">
    <wd-table-col prop="name" label="姓名" width="200" />
    <wd-table-col prop="age" label="年龄" width="100" align="center" />
    <template #empty>
      <view class="custom-empty">
        <image src="https://cdn.example.com/empty.png" style="width: 100rpx; height: 100rpx; margin-bottom: 20rpx;" />
        <text style="color: #909399;">暂无数据，点击刷新</text>
        <wd-button type="primary" size="small" style="margin-top: 20rpx;" @click="refreshData">刷新</wd-button>
      </view>
    </template>
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emptyData = ref([])

const refreshData = () => {
  // 模拟刷新数据
  setTimeout(() => {
    emptyData.value = [
      { name: '张三', age: 25 },
      { name: '李四', age: 30 }
    ]
  }, 1000)
}
</script>

<style scoped>
.custom-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200rpx;
}
</style>
```

## 样式定制

### 自定义类名

```vue
<wd-table 
  :data="tableData" 
  custom-class="my-table" 
  custom-style="{ borderRadius: '8rpx', overflow: 'hidden' }"
>
  <!-- table columns -->
</wd-table>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --table-background-color | #ffffff | 表格背景色 |
| --table-border-color | #ebedf0 | 表格边框颜色 |
| --table-header-background-color | #fafafa | 表头背景色 |
| --table-header-text-color | #323233 | 表头文字颜色 |
| --table-body-text-color | #646566 | 表格内容文字颜色 |
| --table-stripe-background-color | #fafafa | 斑马纹背景色 |
| --table-cell-padding | 12rpx 16rpx | 单元格内边距 |
| --table-cell-font-size | 28rpx | 单元格字体大小 |
| --table-header-font-weight | 500 | 表头字体粗细 |
| --table-empty-text-color | #909399 | 空状态文字颜色 |
| --table-shadow-color | rgba(0, 0, 0, 0.1) | 固定列阴影颜色 |

## 注意事项

1. **父子组件关系**：
   - `wd-table` 必须与 `wd-table-col` 配合使用
   - `wd-table-col` 必须作为 `wd-table` 的直接子组件

2. **数据格式**：
   - `data` 属性必须是数组格式，每个元素是一个对象
   - 对象的属性名应与 `wd-table-col` 的 `prop` 属性对应

3. **性能优化**：
   - 对于大量数据（超过 100 行），建议启用 `fixedHeader` 以提高滚动性能
   - 可以通过 `height` 属性限制表格高度，避免一次性渲染过多行
   - 避免在表格列中放置过多复杂组件，影响渲染性能

4. **固定列注意事项**：
   - 固定列会增加渲染复杂度，建议只固定必要的列
   - 固定列的宽度应明确指定，避免自适应宽度

5. **排序功能**：
   - 排序功能需要配合 `sort-method` 事件使用，组件本身不处理数据排序
   - 可以通过 `sort-method` 事件获取排序字段和方向，然后自行处理数据排序

6. **自定义内容**：
   - 可以通过 `wd-table-col` 的 `value` 插槽自定义列内容
   - 自定义内容中可以访问行数据 `row` 和行索引 `index`

7. **空状态**：
   - 可以通过 `emptyText` 属性自定义空状态文本
   - 也可以通过 `empty` 插槽完全自定义空状态内容

### 状态流转
- 初始状态：根据 props 初始化表格状态
- 数据更新：监听 `data` 属性变化，重新渲染表格内容
- 滚动事件：同步表头和内容的滚动位置
- 排序事件：更新排序状态，触发 `sort-method` 事件
- 点击事件：处理行点击，触发 `row-click` 事件

## 与 wd-table-col 的关系

`wd-table` 组件与 `wd-table-col` 组件是紧密集成的关系：

1. **依赖关系**：`wd-table` 必须包含一个或多个 `wd-table-col` 子组件
2. **通信方式**：通过 Vue 的 provide/inject API 进行通信
3. **状态管理**：表格状态由 `wd-table` 统一管理，子组件根据状态更新自身样式
4. **布局计算**：`wd-table` 根据子组件的宽度计算表格总宽度
5. **事件处理**：子组件的事件通过父组件 `wd-table` 统一处理

## 常见问题

### Q: 为什么表格没有显示数据？
A: 请检查 `data` 属性是否为数组格式，以及 `wd-table-col` 的 `prop` 属性是否与数据对象的属性名匹配。

### Q: 如何自定义表格行高？
A: 可以通过 `rowHeight` 属性设置行高，单位为 px。

### Q: 如何实现表格数据的排序？
A: 可以通过 `wd-table-col` 的 `sortable` 属性启用排序，然后监听 `wd-table` 的 `sort-method` 事件，在事件处理函数中自行处理数据排序。

### Q: 如何固定某一列？
A: 可以通过 `wd-table-col` 的 `fixed` 属性固定列，设置为 `true` 即可。

### Q: 如何自定义表格的空状态？
A: 可以通过 `emptyText` 属性自定义空状态文本，或通过 `empty` 插槽完全自定义空状态内容。
