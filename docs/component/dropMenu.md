# wd-drop-menu

## 组件概述

wd-drop-menu是一个下拉菜单组件，由`wd-drop-menu`（容器）和`wd-drop-menu-item`（菜单项）组成，用于实现多级菜单选择功能。该组件提供了灵活的配置选项，支持自定义展开方向、蒙层、动画效果等，能够适应各种复杂的业务场景。

### 功能描述
- 支持上下两个方向展开
- 支持自定义蒙层和点击蒙层关闭
- 支持动画过渡效果
- 支持自定义菜单项内容和样式
- 支持禁用状态
- 支持自定义图标和选中状态
- 支持选项数据动态加载

### 适用业务场景
- 商品分类筛选
- 数据排序选择
- 状态筛选
- 地区选择
- 任何需要下拉菜单选择的场景

## API参考

### Props

#### wd-drop-menu

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| zIndex | Number | 12 | 否 | 弹框层级 |
| direction | String | 'down' | 否 | 菜单展开方向，可选值为up或down |
| modal | Boolean | true | 否 | 是否展示蒙层 |
| closeOnClickModal | Boolean | true | 否 | 是否点击蒙层时关闭 |
| duration | Number | 200 | 否 | 菜单展开收起动画时间，单位ms |
| customClass | String | - | 否 | 自定义类名 |
| customStyle | Object | - | 否 | 自定义样式 |

#### wd-drop-menu-item

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | String / Number | - | 否 | 当前选中项对应选中的value |
| options | Array<Record<string, any>> | [] | 否 | 列表数据，对应数据结构 [{label: '标题', value: '0', tip: '提示文字'}] |
| disabled | Boolean | false | 否 | 禁用菜单 |
| iconName | String | 'check' | 否 | 选中的图标名称(可选名称在wd-icon组件中) |
| title | String | - | 否 | 菜单标题 |
| icon | String | 'arrow-down' | 否 | 菜单图标 |
| iconSize | Number | - | 否 | 菜单图标大小 |
| beforeToggle | Function | - | 否 | 自定义点击事件，接收(status, resolve)参数，resolve(true)允许打开/关闭，resolve(false)禁止打开/关闭 |
| valueKey | String | 'value' | 否 | 选项对象中，value对应的key |
| labelKey | String | 'label' | 否 | 选项对象中，展示的文本对应的key |
| tipKey | String | 'tip' | 否 | 选项对象中，选项说明对应的key |
| customPopupClass | String | '' | 否 | 自定义下拉菜单popup样式类 |
| customPopupStyle | String | '' | 否 | 自定义下拉菜单popup样式 |
| popupHeight | String | '' | 否 | 弹出层高度，设置后取该值 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离出来，用于解决各种fixed失效问题 |
| customTitle | String | '' | 否 | DropMenuItem左侧文字样式 |
| customIcon | String | '' | 否 | DropMenuItem右侧icon样式 |
| customClass | String | - | 否 | 自定义类名 |
| customStyle | Object | - | 否 | 自定义样式 |

### Events

#### wd-drop-menu-item

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | value: 选中的value值 |
| change | 选中值变化时触发 | event: { value: 选中的value值, selectedItem: 选中的选项对象 } |
| open | 菜单打开前触发 | - |
| opened | 菜单打开后触发 | - |
| close | 菜单关闭前触发 | - |
| closed | 菜单关闭后触发 | - |

### Methods

#### wd-drop-menu-item

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开菜单 |
| close | - | - | 关闭菜单 |
| toggle | - | - | 切换菜单开关状态 |
| getShowPop | - | Boolean | 获取菜单当前显示状态 |

### Slots

#### wd-drop-menu-item

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义菜单项内容，当options为空时显示 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="sortValue"
        :options="sortOptions"
        title="排序"
      />
      <wd-drop-menu-item
        v-model="filterValue"
        :options="filterOptions"
        title="筛选"
      />
    </wd-drop-menu>
    <view class="content">
      <text>当前排序：{{ sortValue }}</text>
      <text>当前筛选：{{ filterValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 排序选项
const sortValue = ref('1')
const sortOptions = [
  { label: '综合排序', value: '0' },
  { label: '销量从高到低', value: '1' },
  { label: '价格从低到高', value: '2' },
  { label: '价格从高到低', value: '3' }
]

// 筛选选项
const filterValue = ref('0')
const filterOptions = [
  { label: '全部', value: '0' },
  { label: '新品', value: '1' },
  { label: '热销', value: '2' },
  { label: '促销', value: '3' }
]
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.content {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}

.content text {
  display: block;
  margin-bottom: 10rpx;
}
</style>
```

### 自定义展开方向和样式

```vue
<template>
  <view class="container">
    <wd-drop-menu direction="up" :modal="false" :duration="300">
      <wd-drop-menu-item
        v-model="directionValue"
        :options="directionOptions"
        title="方向"
        custom-class="my-menu-item"
        :custom-style="{ color: '#1989fa' }"
      />
      <wd-drop-menu-item
        v-model="styleValue"
        :options="styleOptions"
        title="样式"
        icon="arrow-up"
        icon-size="24"
      />
    </wd-drop-menu>
    <view class="content">
      <text>当前方向：{{ directionValue }}</text>
      <text>当前样式：{{ styleValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 方向选项
const directionValue = ref('down')
const directionOptions = [
  { label: '向下展开', value: 'down' },
  { label: '向上展开', value: 'up' }
]

// 样式选项
const styleValue = ref('default')
const styleOptions = [
  { label: '默认样式', value: 'default' },
  { label: '自定义样式', value: 'custom' }
]
</script>

<style scoped>
.container {
  padding: 20rpx;
  height: 500rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.content {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}

.content text {
  display: block;
  margin-bottom: 10rpx;
}

/* 自定义菜单项样式 */
:deep(.my-menu-item) {
  font-weight: bold;
}
</style>
```

### 禁用状态和自定义图标

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="disabledValue"
        :options="disabledOptions"
        title="禁用示例"
        :disabled="true"
      />
      <wd-drop-menu-item
        v-model="iconValue"
        :options="iconOptions"
        title="自定义图标"
        icon-name="success"
        icon="more"
      />
    </wd-drop-menu>
    <view class="content">
      <text>禁用示例：{{ disabledValue }}</text>
      <text>自定义图标：{{ iconValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 禁用选项
const disabledValue = ref('0')
const disabledOptions = [
  { label: '选项1', value: '0' },
  { label: '选项2', value: '1' },
  { label: '选项3', value: '2' }
]

// 自定义图标选项
const iconValue = ref('0')
const iconOptions = [
  { label: '成功', value: '0' },
  { label: '警告', value: '1' },
  { label: '错误', value: '2' }
]
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.content {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}

.content text {
  display: block;
  margin-bottom: 10rpx;
}
</style>
```

### 自定义菜单项内容

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="customValue"
        title="自定义内容"
      >
        <view class="custom-content">
          <view
            v-for="item in customOptions"
            :key="item.value"
            @click="handleCustomSelect(item.value)"
            :class="`custom-item ${customValue === item.value ? 'is-active' : ''}`"
          >
            <view class="custom-item__icon" :style="{ backgroundColor: item.color }"></view>
            <text class="custom-item__text">{{ item.label }}</text>
            <wd-icon
              v-if="customValue === item.value"
              name="check"
              custom-class="custom-item__check"
            />
          </view>
        </view>
      </wd-drop-menu-item>
    </wd-drop-menu>
    <view class="content">
      <text>当前选中：{{ customValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 自定义选项
const customValue = ref('0')
const customOptions = [
  { label: '红色', value: '0', color: '#f56c6c' },
  { label: '蓝色', value: '1', color: '#409eff' },
  { label: '绿色', value: '2', color: '#67c23a' },
  { label: '黄色', value: '3', color: '#e6a23c' },
  { label: '紫色', value: '4', color: '#909399' }
]

// 处理自定义选择
const handleCustomSelect = (value: string) => {
  customValue.value = value
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.content {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}

/* 自定义内容样式 */
.custom-content {
  padding: 20rpx;
}

.custom-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid #ebedf0;
}

.custom-item:last-child {
  border-bottom: none;
}

.custom-item__icon {
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.custom-item__text {
  flex: 1;
  font-size: 28rpx;
}

.custom-item__check {
  color: #1989fa;
}

.custom-item.is-active {
  color: #1989fa;
}
</style>
```

### 使用beforeToggle钩子

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="beforeValue"
        :options="beforeOptions"
        title="带钩子"
        :before-toggle="handleBeforeToggle"
      />
    </wd-drop-menu>
    <view class="content">
      <text>当前选中：{{ beforeValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/uni_modules/wot-ui-plus' 

// 带钩子选项
const beforeValue = ref('0')
const beforeOptions = [
  { label: '选项1', value: '0' },
  { label: '选项2', value: '1' },
  { label: '选项3', value: '2' }
]

// 处理beforeToggle钩子
const handleBeforeToggle = ({ status, resolve }: any) => {
  // 模拟异步验证
  setTimeout(() => {
    if (status) {
      // 打开菜单前的验证
      showToast('正在打开菜单...')
      resolve(true) // 允许打开
    } else {
      // 关闭菜单前的验证
      showToast('正在关闭菜单...')
      resolve(true) // 允许关闭
    }
  }, 500)
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.content {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}
</style>
```

## 样式定制指南

### 使用customClass定制样式

```vue
<template>
  <view class="container">
    <wd-drop-menu custom-class="my-drop-menu">
      <wd-drop-menu-item
        v-model="value1"
        :options="options1"
        title="菜单1"
        custom-class="my-menu-item"
      />
      <wd-drop-menu-item
        v-model="value2"
        :options="options2"
        title="菜单2"
        custom-class="my-menu-item"
      />
    </wd-drop-menu>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('0')
const options1 = [{ label: '选项1', value: '0' }, { label: '选项2', value: '1' }]

const value2 = ref('0')
const options2 = [{ label: '选项A', value: '0' }, { label: '选项B', value: '1' }]
</script>

<style scoped>
.container {
  padding: 20rpx;
}

/* 自定义下拉菜单容器样式 */
:deep(.my-drop-menu) {
  background-color: #f0f9ff;
  border-radius: 8rpx;
  padding: 10rpx;
}

/* 自定义菜单项样式 */
:deep(.my-menu-item) {
  color: #1989fa;
  font-weight: bold;
}

/* 自定义选中状态 */
:deep(.my-menu-item.is-active) {
  color: #096dd9;
}
</style>
```

### 使用customStyle定制样式

```vue
<template>
  <view class="container">
    <wd-drop-menu :custom-style="{ backgroundColor: '#fffbe6', border: '1px solid #ffeaa7' }">
      <wd-drop-menu-item
        v-model="value"
        :options="options"
        title="警告样式"
        :custom-style="{ color: '#e6a23c', fontSize: '28rpx' }"
      />
    </wd-drop-menu>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('0')
const options = [
  { label: '警告选项1', value: '0' },
  { label: '警告选项2', value: '1' },
  { label: '警告选项3', value: '2' }
]
</script>

<style scoped>
.container {
  padding: 20rpx;
}
</style>
```

### 自定义弹出层样式

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="value"
        :options="options"
        title="自定义弹出层"
        custom-popup-class="my-popup"
        custom-popup-style="background-color: #fafafa; border-radius: 12rpx;"
        popup-height="400rpx"
      />
    </wd-drop-menu>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('0')
const options = Array.from({ length: 10 }, (_, i) => ({
  label: `选项${i + 1}`,
  value: `${i}`
}))
</script>

<style scoped>
.container {
  padding: 20rpx;
}

/* 自定义弹出层样式 */
:deep(.my-popup) {
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

/* 自定义选项样式 */
:deep(.my-popup .wd-drop-item__option) {
  padding: 24rpx 32rpx;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.my-popup .wd-drop-item__option:last-child) {
  border-bottom: none;
}

/* 自定义选中样式 */
:deep(.my-popup .wd-drop-item__option.is-active) {
  background-color: #ecf5ff;
  color: #1989fa;
}
</style>
```

## 注意事项

1. **组件结构**：`wd-drop-menu` 必须作为 `wd-drop-menu-item` 的父组件使用，不支持单独使用。

2. **数据格式**：`options` 属性必须是对象数组，每个对象必须包含 `label` 和 `value` 属性（或通过 `labelKey` 和 `valueKey` 指定）。

3. **方向设置**：`direction` 属性只支持 `up` 和 `down` 两个值，其他值会被忽略并输出警告。

4. **禁用状态**：设置 `disabled` 为 `true` 时，菜单项将无法点击和展开。

5. **beforeToggle 钩子**：使用 `beforeToggle` 钩子时，必须调用 `resolve` 函数来允许或禁止菜单的打开/关闭，否则菜单将无法正常操作。

6. **自定义内容**：当 `options` 为空时，可以使用默认插槽自定义菜单项内容，此时需要手动处理选中逻辑。

7. **性能优化**：当选项数据量较大时，建议限制 `popupHeight` 并使用虚拟滚动，避免一次性渲染大量数据影响性能。

8. **底部安全距离**：在 iPhone X 等机型上，建议使用 `rootPortal` 属性来解决 fixed 定位失效问题。

9. **事件触发**：`change` 事件会在选中值变化时触发，包含选中的 value 和选项对象。

10. **样式隔离**：使用 `customClass` 定制样式时，需要使用 `:deep()` 或 `/deep/` 穿透样式隔离，才能生效。