# wd-drop-menu-item

## 组件概述

wd-drop-menu-item是下拉菜单的子组件，与`wd-drop-menu`配合使用，用于实现单个菜单项的下拉选择功能。该组件提供了灵活的配置选项，支持自定义内容、样式、图标等，能够适应各种复杂的业务场景。

### 功能描述
- 支持自定义菜单项内容和样式
- 支持禁用状态
- 支持自定义图标和选中状态
- 支持选项数据动态加载
- 支持自定义弹出层样式和高度
- 支持从页面中脱离，解决fixed失效问题

### 适用业务场景
- 商品分类筛选
- 数据排序选择
- 状态筛选
- 地区选择
- 任何需要下拉菜单选择的场景

## API参考

### Props

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
| popupHeight | String | '' | 否 | 弹出层高度，设置后取该值 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离出来，用于解决各种fixed失效问题 |
| customTitle | String | '' | 否 | DropMenuItem左侧文字样式 |
| customIcon | String | '' | 否 | DropMenuItem右侧icon样式 |
| customPopupClass | String | '' | 否 | 自定义下拉菜单popup样式类 |
| customPopupStyle | String | '' | 否 | 自定义下拉菜单popup样式 |
| customClass | String | - | 否 | 自定义类名 |
| customStyle | Object | - | 否 | 自定义样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| open | 菜单打开前触发 | - |
| opened | 菜单打开后触发 | - |
| close | 菜单关闭前触发 | - |
| closed | 菜单关闭后触发 | - |
| update:modelValue | 选中值变化时触发 | value: 选中的value值 |
| change | 选中值变化时触发 | event: { value: 选中的value值, selectedItem: 选中的选项对象 } |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开菜单 |
| close | - | - | 关闭菜单 |
| toggle | - | - | 切换菜单开关状态 |
| getShowPop | - | Boolean | 获取菜单当前显示状态 |

### Slots

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
        v-model="selectedValue"
        :options="options"
        title="选择项"
      />
    </wd-drop-menu>
    <view class="content">
      <text>当前选中：{{ selectedValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('1')

// 选项数据
const options = [
  { label: '选项1', value: '0' },
  { label: '选项2', value: '1' },
  { label: '选项3', value: '2' },
  { label: '选项4', value: '3' }
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
</style>
```

### 自定义图标和样式

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="selectedValue"
        :options="options"
        title="自定义图标"
        icon-name="success"
        icon="arrow-up"
        icon-size="24"
        custom-class="my-menu-item"
        :custom-style="{ color: '#1989fa' }"
      />
    </wd-drop-menu>
    <view class="content">
      <text>当前选中：{{ selectedValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('1')

// 选项数据
const options = [
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

/* 自定义菜单项样式 */
:deep(.my-menu-item) {
  font-weight: bold;
}
</style>
```

### 禁用状态和提示文字

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="selectedValue1"
        :options="options1"
        title="禁用示例"
        :disabled="true"
      />
      <wd-drop-menu-item
        v-model="selectedValue2"
        :options="options2"
        title="带提示文字"
      />
    </wd-drop-menu>
    <view class="content">
      <text>禁用示例选中：{{ selectedValue1 }}</text>
      <text>带提示文字选中：{{ selectedValue2 }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 禁用示例选中值
const selectedValue1 = ref('0')
const options1 = [
  { label: '选项1', value: '0' },
  { label: '选项2', value: '1' }
]

// 带提示文字选中值
const selectedValue2 = ref('1')
const options2 = [
  { label: '选项A', value: '0', tip: '提示文字A' },
  { label: '选项B', value: '1', tip: '提示文字B' },
  { label: '选项C', value: '2', tip: '提示文字C' }
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

### 自定义弹出层样式和高度

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="selectedValue"
        :options="options"
        title="自定义弹出层"
        popup-height="300rpx"
        custom-popup-class="my-popup"
        custom-popup-style="background-color: #f0f9ff; border-radius: 12rpx;"
      />
    </wd-drop-menu>
    <view class="content">
      <text>当前选中：{{ selectedValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('0')

// 生成大量选项数据
const generateOptions = () => {
  const options = []
  for (let i = 0; i < 20; i++) {
    options.push({
      label: `选项${i + 1}`,
      value: `${i}`
    })
  }
  return options
}

const options = generateOptions()
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

/* 自定义弹出层样式 */
:deep(.my-popup) {
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

/* 自定义选项样式 */
:deep(.my-popup .wd-drop-item__option) {
  padding: 24rpx 32rpx;
  border-bottom: 1px solid #e6f7ff;
}

:deep(.my-popup .wd-drop-item__option:last-child) {
  border-bottom: none;
}

/* 自定义选中状态 */
:deep(.my-popup .wd-drop-item__option.is-active) {
  background-color: #ecf5ff;
  color: #1989fa;
}
</style>
```

### 自定义菜单项内容

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="selectedValue"
        title="自定义内容"
        ref="menuRef"
      >
        <view class="custom-content">
          <view
            v-for="item in customOptions"
            :key="item.value"
            @click="handleCustomSelect(item)"
            :class="`custom-item ${selectedValue === item.value ? 'is-active' : ''}`"
          >
            <view class="custom-item__icon" :style="{ backgroundColor: item.color }"></view>
            <view class="custom-item__info">
              <text class="custom-item__label">{{ item.label }}</text>
              <text class="custom-item__desc">{{ item.desc }}</text>
            </view>
            <wd-icon
              v-if="selectedValue === item.value"
              name="check"
              custom-class="custom-item__check"
            />
          </view>
        </view>
      </wd-drop-menu-item>
    </wd-drop-menu>
    <view class="content">
      <text>当前选中：{{ selectedValue }}</text>
    </view>
    <wd-button type="primary" @click="openMenu">手动打开菜单</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('0')

// 菜单实例
const menuRef = ref()

// 自定义选项数据
const customOptions = [
  { 
    label: '红色主题', 
    value: '0', 
    color: '#f56c6c',
    desc: '热情活力的红色主题'
  },
  { 
    label: '蓝色主题', 
    value: '1', 
    color: '#409eff',
    desc: '冷静专业的蓝色主题'
  },
  { 
    label: '绿色主题', 
    value: '2', 
    color: '#67c23a',
    desc: '清新自然的绿色主题'
  },
  { 
    label: '黄色主题', 
    value: '3', 
    color: '#e6a23c',
    desc: '温暖明亮的黄色主题'
  }
]

// 处理自定义选择
const handleCustomSelect = (item: any) => {
  selectedValue.value = item.value
  menuRef.value.close()
}

// 手动打开菜单
const openMenu = () => {
  menuRef.value.open()
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
  padding: 20rpx;
  border-bottom: 1px solid #ebedf0;
}

.custom-item:last-child {
  border-bottom: none;
}

.custom-item__icon {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.custom-item__info {
  flex: 1;
}

.custom-item__label {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.custom-item__desc {
  display: block;
  font-size: 24rpx;
  color: #909399;
}

.custom-item__check {
  color: #1989fa;
}

.custom-item.is-active {
  background-color: #ecf5ff;
  color: #1989fa;
  border-radius: 8rpx;
}
</style>
```

## 样式定制指南

### 使用customClass定制样式

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="selectedValue"
        :options="options"
        title="自定义样式"
        custom-class="my-menu-item"
        custom-title="my-title"
        custom-icon="my-icon"
      />
    </wd-drop-menu>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('0')

// 选项数据
const options = [
  { label: '选项1', value: '0' },
  { label: '选项2', value: '1' },
  { label: '选项3', value: '2' }
]
</script>

<style scoped>
.container {
  padding: 20rpx;
}

/* 自定义菜单项样式 */
:deep(.my-menu-item) {
  background-color: #f0f9ff;
  border-radius: 8rpx;
  margin: 10rpx 0;
}

/* 自定义标题样式 */
:deep(.my-title) {
  font-weight: bold;
  color: #1989fa;
}

/* 自定义图标样式 */
:deep(.my-icon) {
  font-size: 28rpx;
  color: #67c23a;
}
</style>
```

### 使用customStyle定制样式

```vue
<template>
  <view class="container">
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="selectedValue"
        :options="options"
        title="内联样式"
        :custom-style="{ 
          backgroundColor: '#fffbe6', 
          border: '1px solid #ffeaa7',
          borderRadius: '8rpx',
          padding: '10rpx'
        }"
      />
    </wd-drop-menu>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('0')

// 选项数据
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
        v-model="selectedValue"
        :options="options"
        title="自定义弹出层"
        custom-popup-class="my-popup"
        custom-popup-style="background-color: #fafafa; border-radius: 12rpx; box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);"
      />
    </wd-drop-menu>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref('0')

// 选项数据
const options = Array.from({ length: 5 }, (_, i) => ({
  label: `选项${i + 1}`,
  value: `${i}`
}))
</script>

<style scoped>
.container {
  padding: 20rpx;
}

/* 自定义弹出层选项样式 */
:deep(.my-popup .wd-drop-item__option) {
  padding: 24rpx 32rpx;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.my-popup .wd-drop-item__option:last-child) {
  border-bottom: none;
}

/* 自定义选中状态 */
:deep(.my-popup .wd-drop-item__option.is-active) {
  background-color: #ecf5ff;
  color: #1989fa;
}
</style>
```

## 注意事项

1. **组件依赖**：`wd-drop-menu-item` 必须作为 `wd-drop-menu` 的子组件使用，不支持单独使用。

2. **数据格式**：`options` 属性必须是对象数组，每个对象必须包含 `label` 和 `value` 属性（或通过 `labelKey` 和 `valueKey` 指定）。

3. **禁用状态**：设置 `disabled` 为 `true` 时，菜单项将无法点击和展开。

4. **beforeToggle 钩子**：使用 `beforeToggle` 钩子时，必须调用 `resolve` 函数来允许或禁止菜单的打开/关闭，否则菜单将无法正常操作。

5. **自定义内容**：当 `options` 为空时，可以使用默认插槽自定义菜单项内容，此时需要手动处理选中逻辑和关闭菜单。

6. **性能优化**：当选项数据量较大时，建议限制 `popupHeight` 并使用虚拟滚动，避免一次性渲染大量数据影响性能。

7. **底部安全距离**：在 iPhone X 等机型上，建议使用 `rootPortal` 属性来解决 fixed 定位失效问题。

8. **事件触发**：`change` 事件会在选中值变化时触发，包含选中的 value 和选项对象。

9. **样式隔离**：使用 `customClass` 定制样式时，需要使用 `:deep()` 或 `/deep/` 穿透样式隔离，才能生效。

10. **方法调用**：可以通过 ref 获取组件实例，调用 `open()`、`close()`、`toggle()` 等方法手动控制菜单的显示和隐藏。