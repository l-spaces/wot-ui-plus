# wd-col-picker

## 组件概述

wd-col-picker是一个多列选择器组件，基于uni-app + Vue 3 + TypeScript开发，用于处理需要从多级数据中选择的场景。该组件提供了完整的多列选择功能，包括动态加载下一列数据、自定义展示格式、表单验证等特性，能够适应各种复杂的业务场景。

### 适用业务场景
- 省市区三级联动选择
- 商品分类选择
- 时间选择（年/月/日）
- 任何需要多级选择的表单场景

### 设计理念
wd-col-picker组件采用了灵活的设计理念，将复杂的多列选择逻辑封装在内部，对外提供简单易用的API。组件支持多种配置选项，能够适应不同的业务需求，同时保持了良好的性能和用户体验。

### 组件定位
wd-col-picker组件在UI系统中属于表单组件，通常用于需要从多级数据中选择的表单场景，如地址选择、分类选择等。

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | Array<string \| number> | - | 是 | 选中项，双向绑定 |
| columns | Array<Record<string, any>[]> | [] | 否 | 选择器数据，二维数组 |
| label | String | - | 否 | 选择器左侧文案 |
| labelWidth | String | '33%' | 否 | 设置左侧标题宽度 |
| useLabelSlot | Boolean | false | 否 | 使用 label 插槽时设置该选项 |
| useDefaultSlot | Boolean | false | 否 | 使用默认插槽时设置该选项 |
| disabled | Boolean | false | 否 | 禁用 |
| readonly | Boolean | false | 否 | 只读 |
| placeholder | String | - | 否 | 选择器占位符 |
| title | String | - | 否 | 弹出层标题 |
| columnChange | Function | - | 否 | 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish |
| displayFormat | Function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| beforeConfirm | Function | - | 否 | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数 |
| alignRight | Boolean | false | 否 | 选择器的值靠右展示 |
| error | Boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| required | Boolean | false | 否 | 是否必填 |
| size | String | - | 否 | 设置选择器大小，可选值：large |
| valueKey | String | 'value' | 否 | 选项对象中，value 对应的 key |
| labelKey | String | 'label' | 否 | 选项对象中，展示的文本对应的 key |
| tipKey | String | 'tip' | 否 | 选项对象中，提示文案对应的 key |
| loadingColor | String | '#4D80F0' | 否 | loading 图标的颜色 |
| closeOnClickModal | Boolean | true | 否 | 点击遮罩是否关闭 |
| autoComplete | Boolean | false | 否 | 自动触发 column-change 事件来补全数据，当 columns 为空数组或者 columns 数组长度小于 value 数组长度时，会自动触发 column-change |
| zIndex | Number | 15 | 否 | 弹窗层级 |
| safeAreaInsetBottom | Boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| ellipsis | Boolean | false | 否 | 是否超出隐藏 |
| prop | String | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | Array<FormItemRule> | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| lineWidth | Number | - | 否 | 底部条宽度，单位像素 |
| lineHeight | Number | - | 否 | 底部条高度，单位像素 |
| customViewClass | String | '' | 否 | label 外部自定义样式 |
| customLabelClass | String | '' | 否 | value 外部自定义样式 |
| customValueClass | String | '' | 否 | value 外部自定义样式 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| markerSide | String | 'before' | 否 | 必填标记位置，可选值：before、after |
| customClass | String | - | 否 | 自定义类名 |
| customStyle | Object | - | 否 | 自定义样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| close | 选择器关闭时触发 | - |
| update:modelValue | 选中值变化时触发 | value: 选中的数组值 |
| confirm | 选择完成时触发 | { value: 选中的数组值, selectedItems: 选中的对象数组 } |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开选择器 |
| close | - | - | 关闭选择器 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义选择器内容，使用该插槽时会替换默认的cell组件 |
| label | - | 自定义左侧标签内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-col-picker
      v-model="selectedValue"
      :columns="columns"
      label="商品分类"
      placeholder="请选择商品分类"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref(['1', '1-1', '1-1-1'])

// 静态数据
const columns = [
  [
    { label: '分类1', value: '1' },
    { label: '分类2', value: '2' },
    { label: '分类3', value: '3' }
  ],
  [
    { label: '分类1-1', value: '1-1' },
    { label: '分类1-2', value: '1-2' }
  ],
  [
    { label: '分类1-1-1', value: '1-1-1' },
    { label: '分类1-1-2', value: '1-1-2' }
  ]
]

// 选择完成时触发
const onConfirm = (data: any) => {
  console.log('选择完成:', data)
}
</script>
```

### 动态加载下一列数据

```vue
<template>
  <view class="container">
    <wd-col-picker
      v-model="selectedValue"
      :columns="columns"
      label="省市区选择"
      placeholder="请选择省市区"
      @column-change="onColumnChange"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref(['110000', '110100', '110101'])

// 初始只加载省份数据
const columns = ref([
  [
    { label: '北京市', value: '110000' },
    { label: '上海市', value: '310000' },
    { label: '广东省', value: '440000' }
  ]
])

// 模拟省份对应的城市数据
const cityData = {
  '110000': [
    { label: '北京市', value: '110100' }
  ],
  '310000': [
    { label: '上海市', value: '310100' }
  ],
  '440000': [
    { label: '广州市', value: '440100' },
    { label: '深圳市', value: '440300' }
  ]
}

// 模拟城市对应的区县数据
const districtData = {
  '110100': [
    { label: '东城区', value: '110101' },
    { label: '西城区', value: '110102' }
  ],
  '310100': [
    { label: '黄浦区', value: '310101' },
    { label: '徐汇区', value: '310104' }
  ],
  '440100': [
    { label: '越秀区', value: '440104' },
    { label: '天河区', value: '440106' }
  ],
  '440300': [
    { label: '福田区', value: '440304' },
    { label: '南山区', value: '440305' }
  ]
}

// 列数据变化时触发
const onColumnChange = ({ selectedItem, index, resolve }: any) => {
  // 模拟异步请求
  setTimeout(() => {
    let nextColumn = []
    if (index === 0) {
      // 第一列选择后加载第二列数据（城市）
      nextColumn = cityData[selectedItem.value] || []
    } else if (index === 1) {
      // 第二列选择后加载第三列数据（区县）
      nextColumn = districtData[selectedItem.value] || []
    }
    // 通过resolve返回下一列数据
    resolve(nextColumn)
  }, 300)
}

// 选择完成时触发
const onConfirm = (data: any) => {
  console.log('选择完成:', data)
}
</script>
```

### 自定义展示格式

```vue
<template>
  <view class="container">
    <wd-col-picker
      v-model="selectedValue"
      :columns="columns"
      label="时间选择"
      placeholder="请选择时间"
      :display-format="formatDisplay"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref(['2023', '06', '15'])

// 生成年份数据
const generateYears = () => {
  const years = []
  const currentYear = new Date().getFullYear()
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    years.push({ label: `${i}年`, value: `${i}` })
  }
  return years
}

// 生成月份数据
const generateMonths = () => {
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push({ label: `${i}月`, value: `${i.toString().padStart(2, '0')}` })
  }
  return months
}

// 生成日期数据
const generateDays = () => {
  const days = []
  for (let i = 1; i <= 31; i++) {
    days.push({ label: `${i}日`, value: `${i.toString().padStart(2, '0')}` })
  }
  return days
}

// 时间选择数据
const columns = [
  generateYears(),
  generateMonths(),
  generateDays()
]

// 自定义展示格式
const formatDisplay = (selectedItems: any[]) => {
  if (selectedItems.length < 3) return ''
  return `${selectedItems[0].label}${selectedItems[1].label}${selectedItems[2].label}`
}

// 选择完成时触发
const onConfirm = (data: any) => {
  console.log('选择完成:', data)
}
</script>
```

### 使用默认插槽自定义内容

```vue
<template>
  <view class="container">
    <wd-col-picker
      v-model="selectedValue"
      :columns="columns"
      use-default-slot
      @confirm="onConfirm"
      ref="pickerRef"
    >
      <view class="custom-picker">
        <view class="custom-picker__label">自定义选择器</view>
        <view class="custom-picker__content">
          <text v-if="!selectedValue.length" class="placeholder">请选择</text>
          <text v-else>{{ selectedValue.join(' > ') }}</text>
        </view>
        <wd-icon name="right" custom-class="custom-picker__arrow" />
      </view>
    </wd-col-picker>
    <wd-button type="primary" @click="openPicker">打开选择器</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref([])

// 选择器实例
const pickerRef = ref()

// 选择器数据
const columns = [
  [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' }
  ],
  [
    { label: '子选项1-1', value: '1-1' },
    { label: '子选项1-2', value: '1-2' }
  ]
]

// 打开选择器
const openPicker = () => {
  pickerRef.value.open()
}

// 选择完成时触发
const onConfirm = (data: any) => {
  console.log('选择完成:', data)
}
</script>

<style scoped>
.custom-picker {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.custom-picker__label {
  font-size: 28rpx;
  color: #333;
  margin-right: 20rpx;
}

.custom-picker__content {
  flex: 1;
  font-size: 28rpx;
  color: #666;
}

.placeholder {
  color: #999;
}

.custom-picker__arrow {
  font-size: 24rpx;
  color: #999;
}
</style>
```

### 表单验证场景

```vue
<template>
  <view class="container">
    <wd-form @submit="onSubmit" ref="formRef">
      <wd-col-picker
        v-model="formData.address"
        :columns="columns"
        label="收货地址"
        placeholder="请选择省市区"
        prop="address"
        :rules="[{ required: true, message: '请选择收货地址' }]"
        @column-change="onColumnChange"
      />
      <view class="form-actions">
        <wd-button type="primary" form-type="submit">提交</wd-button>
        <wd-button type="default" @click="onReset">重置</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 表单实例
const formRef = ref()

// 表单数据
const formData = ref({
  address: []
})

// 初始只加载省份数据
const columns = ref([
  [
    { label: '北京市', value: '110000' },
    { label: '上海市', value: '310000' },
    { label: '广东省', value: '440000' }
  ]
])

// 模拟省份对应的城市数据
const cityData = {
  '110000': [
    { label: '北京市', value: '110100' }
  ],
  '310000': [
    { label: '上海市', value: '310100' }
  ],
  '440000': [
    { label: '广州市', value: '440100' },
    { label: '深圳市', value: '440300' }
  ]
}

// 模拟城市对应的区县数据
const districtData = {
  '110100': [
    { label: '东城区', value: '110101' },
    { label: '西城区', value: '110102' }
  ],
  '310100': [
    { label: '黄浦区', value: '310101' },
    { label: '徐汇区', value: '310104' }
  ],
  '440100': [
    { label: '越秀区', value: '440104' },
    { label: '天河区', value: '440106' }
  ],
  '440300': [
    { label: '福田区', value: '440304' },
    { label: '南山区', value: '440305' }
  ]
}

// 列数据变化时触发
const onColumnChange = ({ selectedItem, index, resolve }: any) => {
  setTimeout(() => {
    let nextColumn = []
    if (index === 0) {
      nextColumn = cityData[selectedItem.value] || []
    } else if (index === 1) {
      nextColumn = districtData[selectedItem.value] || []
    }
    resolve(nextColumn)
  }, 300)
}

// 提交表单
const onSubmit = () => {
  console.log('表单提交:', formData.value)
}

// 重置表单
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}
</style>
```

## 样式定制指南

### 使用customClass定制样式

```vue
<template>
  <view class="container">
    <wd-col-picker
      v-model="selectedValue"
      :columns="columns"
      label="商品分类"
      custom-class="my-col-picker"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref(['1', '1-1'])

// 选择器数据
const columns = [
  [
    { label: '分类1', value: '1' },
    { label: '分类2', value: '2' }
  ],
  [
    { label: '子分类1-1', value: '1-1' },
    { label: '子分类1-2', value: '1-2' }
  ]
]

// 选择完成时触发
const onConfirm = (data: any) => {
  console.log('选择完成:', data)
}
</script>

<style scoped>
.my-col-picker {
  /* 自定义选择器样式 */
  background-color: #f5f7fa;
  border-radius: 12rpx;
  padding: 0 20rpx;
}

/* 自定义箭头颜色 */
.my-col-picker .wd-col-picker__arrow {
  color: #1989fa;
}
</style>
```

### 使用customStyle定制样式

```vue
<template>
  <view class="container">
    <wd-col-picker
      v-model="selectedValue"
      :columns="columns"
      label="颜色选择"
      :custom-style="customStyle"
      @confirm="onConfirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 选中值
const selectedValue = ref(['red'])

// 自定义样式
const customStyle = {
  fontSize: '32rpx',
  color: '#333',
  padding: '20rpx 0'
}

// 选择器数据
const columns = [
  [
    { label: '红色', value: 'red' },
    { label: '蓝色', value: 'blue' },
    { label: '绿色', value: 'green' },
    { label: '黄色', value: 'yellow' }
  ]
]

// 选择完成时触发
const onConfirm = (data: any) => {
  console.log('选择完成:', data)
}
</script>
```

## 注意事项

1. **数据格式要求**：columns属性必须是二维数组，每一列数据是一个对象数组，每个对象必须包含value和label属性（或通过valueKey和labelKey指定）。

2. **动态加载数据**：当需要动态加载下一列数据时，必须在columnChange事件中通过resolve函数返回下一列数据，否则下一列将无法显示。

3. **表单验证**：结合wd-form组件使用时，必须设置prop属性和rules属性才能进行表单验证。

4. **自定义插槽**：使用default插槽时，需要设置use-default-slot属性，否则插槽内容不会显示。

5. **性能优化**：当数据量较大时，建议使用虚拟滚动或分页加载，避免一次性渲染大量数据影响性能。

6. **底部安全距离**：在iPhone X等机型上，建议设置safeAreaInsetBottom为true，以适配底部安全距离。

7. **fixed失效问题**：当组件在fixed定位的元素内部使用时，可能会出现弹窗位置不正确的问题，此时可以设置rootPortal为true，将弹窗从页面中脱离出来。

8. **事件触发顺序**：组件的事件触发顺序为：columnChange → confirm → update:modelValue → close。

9. **自动补全数据**：当设置autoComplete为true时，组件会自动触发columnChange事件来补全数据，适用于编辑场景下需要根据已有值加载完整数据的情况。

10. **国际化支持**：组件支持国际化，默认文本可以通过语言包进行配置。