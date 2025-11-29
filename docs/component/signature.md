# wd-signature 签名组件

## 组件概述

签名组件是一种常用的 UI 组件，用于在移动设备或网页上进行手写签名。`wd-signature` 组件提供了完整的签名功能，包括手写绘制、清除、撤销、恢复、确认等，支持自定义笔颜色、笔宽度、背景色等样式，适用于各种需要签名的场景。

### 功能特性
- 支持手写签名绘制
- 支持自定义笔颜色和宽度
- 支持压感模式（笔锋效果）
- 支持清除签名
- 支持撤销和恢复功能
- 支持历史记录
- 支持自定义背景色
- 支持导出图片
- 支持禁用状态
- 支持自定义按钮文本
- 支持自定义画布尺寸
- 支持禁用画布滚动

### 适用场景
- 电子合同签署
- 表单签名确认
- 手写签名验证
- 电子签名采集
- 移动应用签名功能

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| penColor | string | '#000' | 否 | 签名笔颜色 |
| lineWidth | number | 3 | 否 | 签名笔宽度 |
| clearText | string | - | 否 | 清空按钮的文本 |
| revokeText | string | - | 否 | 撤回按钮的文本 |
| restoreText | string | - | 否 | 恢复按钮的文本 |
| confirmText | string | - | 否 | 确认按钮的文本 |
| fileType | string | 'png' | 否 | 目标文件的类型 |
| quality | number | 1 | 否 | 目标文件的质量 |
| exportScale | number | 1 | 否 | 导出图片的缩放比例 |
| disabled | boolean | false | 否 | 是否禁用签名板 |
| height | number/string | - | 否 | 画布的高度 |
| width | number/string | - | 否 | 画布的宽度 |
| backgroundColor | string | - | 否 | 画板的背景色 |
| disableScroll | boolean | true | 否 | 是否禁用画布滚动 |
| enableHistory | boolean | false | 否 | 是否开启历史记录 |
| step | number | 1 | 否 | 撤回和恢复的步长 |
| undoText | string | - | 否 | 撤销按钮的文本（已废弃，建议使用 revokeText） |
| redoText | string | - | 否 | 恢复按钮的文本（已废弃，建议使用 restoreText） |
| pressure | boolean | false | 否 | 是否启用压感模式(笔锋) |
| minWidth | number | 2 | 否 | 压感模式下笔画最小宽度 |
| maxWidth | number | 6 | 否 | 压感模式下笔画最大宽度 |
| minSpeed | number | 1.5 | 否 | 最小速度阈值，影响压感模式下的笔画宽度变化 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| start | 开始签名时触发 | event: 触摸事件对象 |
| signing | 签名过程中触发 | event: 触摸事件对象 |
| end | 结束签名时触发 | event: 触摸事件对象 |
| confirm | 确认签名时触发 | result: 签名结果对象，包含 tempFilePath、success、width、height |
| clear | 清除签名时触发 | - |

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| footer | clear: 清除签名方法<br>confirm: 确认签名方法<br>current-step: 当前步骤<br>revoke: 撤回方法<br>restore: 恢复方法<br>can-undo: 是否可以撤销<br>can-redo: 是否可以恢复<br>history-list: 历史记录列表 | 自定义底部按钮区域 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| init | forceUpdate?: boolean | void | 初始化签名板，forceUpdate 为 true 时强制更新 |
| clear | - | void | 清除签名 |
| confirm | - | void | 确认签名并生成图片 |
| restore | - | void | 恢复上一步操作 |
| revoke | - | void | 撤销上一步操作 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-signature
    v-model="signature"
    @confirm="onConfirm"
    @clear="onClear"
  ></wd-signature>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signature = ref('')

const onConfirm = (result: any) => {
  console.log('签名结果:', result)
  if (result.success) {
    signature.value = result.tempFilePath
  }
}

const onClear = () => {
  console.log('清除签名')
  signature.value = ''
}
</script>
```

### 自定义样式

```vue
<template>
  <wd-signature
    v-model="signature"
    pen-color="#07c160"
    line-width="5"
    background-color="#f5f7fa"
    @confirm="onConfirm"
  ></wd-signature>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signature = ref('')

const onConfirm = (result: any) => {
  console.log('签名结果:', result)
  if (result.success) {
    signature.value = result.tempFilePath
  }
}
</script>
```

### 启用历史记录

```vue
<template>
  <wd-signature
    v-model="signature"
    :enable-history="true"
    :step="2"
    @confirm="onConfirm"
  ></wd-signature>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signature = ref('')

const onConfirm = (result: any) => {
  console.log('签名结果:', result)
  if (result.success) {
    signature.value = result.tempFilePath
  }
}
</script>
```

### 启用压感模式

```vue
<template>
  <wd-signature
    v-model="signature"
    :pressure="true"
    :min-width="2"
    :max-width="8"
    :min-speed="1.5"
    @confirm="onConfirm"
  ></wd-signature>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signature = ref('')

const onConfirm = (result: any) => {
  console.log('签名结果:', result)
  if (result.success) {
    signature.value = result.tempFilePath
  }
}
</script>
```

### 自定义底部按钮

```vue
<template>
  <wd-signature
    v-model="signature"
    @confirm="onConfirm"
    @clear="onClear"
  >
    <template #footer="{ clear, confirm, revoke, restore, canUndo, canRedo }">
      <view class="custom-footer">
        <wd-button size="small" plain @click="revoke" :disabled="!canUndo">
          撤销
        </wd-button>
        <wd-button size="small" plain @click="restore" :disabled="!canRedo">
          恢复
        </wd-button>
        <wd-button size="small" plain @click="clear">
          清除
        </wd-button>
        <wd-button size="small" @click="confirm">
          确认
        </wd-button>
      </view>
    </template>
  </wd-signature>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signature = ref('')

const onConfirm = (result: any) => {
  console.log('签名结果:', result)
  if (result.success) {
    signature.value = result.tempFilePath
  }
}

const onClear = () => {
  console.log('清除签名')
  signature.value = ''
}
</script>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}
</style>
```

### 控制画布尺寸

```vue
<template>
  <wd-signature
    v-model="signature"
    :width="300"
    :height="200"
    @confirm="onConfirm"
  ></wd-signature>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signature = ref('')

const onConfirm = (result: any) => {
  console.log('签名结果:', result)
  if (result.success) {
    signature.value = result.tempFilePath
  }
}
</script>
```

## 样式定制

### 自定义根节点样式

使用 `customStyle` 属性可以自定义组件根节点的样式：

```vue
<wd-signature
  v-model="signature"
  :custom-style="{ margin: '20px', borderRadius: '8px' }"
  @confirm="onConfirm"
></wd-signature>
```

### 自定义根节点类名

使用 `customClass` 属性可以自定义组件根节点的类名：

```vue
<wd-signature
  v-model="signature"
  custom-class="my-signature"
  @confirm="onConfirm"
></wd-signature>

<style scoped>
:deep(.my-signature) {
  margin: 20px;
  border-radius: 8px;
}
</style>
```

## 注意事项

1. **Canvas 兼容性**：组件使用 Canvas 实现签名功能，需要确保目标平台支持 Canvas。

2. **图片导出**：确认签名后，组件会生成临时图片文件，需要根据平台差异处理图片路径。

3. **压感模式**：压感模式依赖设备支持，部分设备可能无法实现理想的压感效果。

4. **历史记录**：开启历史记录会增加内存占用，建议根据实际需求决定是否开启。

5. **性能优化**：在移动设备上，建议合理设置画布尺寸，避免过大的画布影响性能。

6. **禁用状态**：设置 `disabled` 为 `true` 时，签名板不可用，无法进行签名操作。

7. **滚动禁用**：默认禁用画布滚动，避免签名时页面滚动，可通过 `disableScroll` 属性关闭。

8. **按钮文本**：可以通过 `clearText`、`revokeText`、`restoreText`、`confirmText` 属性自定义按钮文本。
