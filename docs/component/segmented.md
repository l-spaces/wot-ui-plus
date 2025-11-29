# wd-segmented 分段控制器

## 组件概述

分段控制器是一种常用的 UI 组件，用于在多个选项之间进行切换。`wd-segmented` 组件提供了两种模式：按钮模式（button）和盒子模式（box），支持自定义颜色、形状、大小等样式，适用于各种需要在多个选项间切换的场景。

### 功能特性
- 支持两种显示模式：按钮模式和盒子模式
- 支持自定义激活和未激活状态的颜色
- 支持自定义字体大小和粗细
- 支持两种形状：方形和圆形
- 支持自定义高度
- 支持禁用状态
- 支持振动反馈
- 支持自定义样式和类名
- 提供插槽用于自定义选项内容

### 适用场景
- 标签页切换
- 筛选条件切换
- 视图模式切换
- 功能模块切换
- 导航菜单

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| options | array | [] | 否 | 选项的数组，支持字符串数组或对象数组 |
| value | string/number | 0 | 否 | 初始化时默认选中的选项索引值 |
| activeColor | string | '#3c9cff' | 否 | 激活时的颜色 |
| inactiveColor | string | '#303133' | 否 | 未激活的颜色 |
| mode | string | 'button' | 否 | 模式选择，可选值为 'button'（按钮形式）或 'box'（分段模式） |
| fontSize | string/number | 12 | 否 | 字体大小 |
| bold | boolean | true | 否 | 激活选项的字体是否加粗 |
| bgColor | string | '#eeeeef' | 否 | 组件背景颜色，仅在 mode 为 'button' 时有效 |
| keyName | string | 'name' | 否 | 从选项对象中读取的键名，用于显示文本 |
| shape | string | 'square' | 否 | 选项的形状，可选值为 'square'（方形）或 'round'（圆形） |
| height | string/number | 35 | 否 | 选项的高度 |
| barColor | string | '' | 否 | 选项的边框颜色，仅在 mode 为 'button' 时有效 |
| disabled | boolean | false | 否 | 是否禁用选项 |
| disabledBgColor | string | '#c0c4cc' | 否 | 禁用选项的背景颜色 |
| disabledColor | string | '#c0c4cc' | 否 | 禁用选项的字体颜色 |
| vibrateShort | boolean | false | 否 | 切换选项时是否振动 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 点击选项时触发 | index: 选中选项的索引值<br>item: 选中选项的数据对象 |
| update:value | 选中值变化时触发 | value: 选中选项的索引值 |

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| label | option: 选项数据对象 | 自定义选项内容，用于替换默认的文本显示 |

### Methods

该组件没有对外暴露的方法。

## 使用示例

### 基础用法

```vue
<template>
  <wd-segmented
    :options="['选项1', '选项2', '选项3']"
    v-model="value"
    @change="onChange"
  ></wd-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

const onChange = (index: number, item: any) => {
  console.log('选中索引:', index, '选中项:', item)
}
</script>
```

### 盒子模式

```vue
<template>
  <wd-segmented
    :options="['选项1', '选项2', '选项3']"
    v-model="value"
    mode="box"
    shape="round"
  ></wd-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

### 自定义颜色

```vue
<template>
  <wd-segmented
    :options="['选项1', '选项2', '选项3']"
    v-model="value"
    active-color="#07c160"
    inactive-color="#606266"
    bg-color="#f5f7fa"
  ></wd-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

### 对象数组选项

```vue
<template>
  <wd-segmented
    :options="options"
    v-model="value"
    key-name="label"
  ></wd-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
</script>
```

### 自定义选项内容

```vue
<template>
  <wd-segmented
    :options="options"
    v-model="value"
  >
    <template #label="{ option }">
      <view class="custom-label">
        <text>{{ option.label }}</text>
        <text class="badge" v-if="option.badge">{{ option.badge }}</text>
      </view>
    </template>
  </wd-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

const options = ref([
  { label: '选项1', badge: 3 },
  { label: '选项2', badge: 5 },
  { label: '选项3' }
])
</script>

<style scoped>
.custom-label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  background-color: #ee0a24;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
}
</style>
```

### 禁用状态

```vue
<template>
  <wd-segmented
    :options="options"
    v-model="value"
    disabled
  ></wd-segmented>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)

const options = ref(['选项1', '选项2', '选项3'])
</script>
```

## 样式定制

### 自定义根节点样式

使用 `customStyle` 属性可以自定义组件根节点的样式：

```vue
<wd-segmented
  :options="['选项1', '选项2']"
  :custom-style="{ margin: '20px', borderRadius: '8px' }"
></wd-segmented>
```

### 自定义根节点类名

使用 `customClass` 属性可以自定义组件根节点的类名：

```vue
<wd-segmented
  :options="['选项1', '选项2']"
  custom-class="my-segmented"
></wd-segmented>

<style scoped>
:deep(.my-segmented) {
  margin: 20px;
  border-radius: 8px;
}
</style>
```

### 平台差异化样式

对于不同平台的样式差异，可以使用条件编译进行处理：

```vue
<wd-segmented
  :options="['选项1', '选项2']"
  :custom-style="platformStyle"
></wd-segmented>

<script setup lang="ts">
import { computed } from 'vue'

const platformStyle = computed(() => {
  //#ifdef H5
  return { margin: '20px' }
  //#endif
  //#ifdef MP-WEIXIN
  return { margin: '30rpx' }
  //#endif
  return {}
})
</script>
```

## 注意事项

1. **选项数组格式**：`options` 属性支持字符串数组和对象数组两种格式。当使用对象数组时，可以通过 `keyName` 属性指定显示的字段名。

2. **模式差异**：
   - `button` 模式下，组件有一个统一的背景色，选中项有一个滑块指示
   - `box` 模式下，每个选项是一个独立的盒子，选中项会改变背景色和文字颜色

3. **形状差异**：
   - `square` 形状下，组件和选项都是方形的
   - `round` 形状下，组件和选项都是圆形的

4. **禁用状态**：可以通过 `disabled` 属性禁用整个组件，也可以在选项对象中设置 `disabled: true` 来禁用单个选项。

5. **振动反馈**：`vibrateShort` 属性仅在支持振动的设备上有效，如手机端。

6. **响应式设计**：组件会自动适应父容器的宽度，每个选项的宽度会平均分配。

7. **窗口大小变化**：组件会监听窗口大小变化，自动更新选项的尺寸和滑块位置。

8. **性能优化**：组件使用了 `nextTick` 和 `getRect` 等方法确保 DOM 渲染完成后再进行尺寸计算，避免了不必要的渲染。
