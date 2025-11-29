# wd-avatar-group 头像组

## 组件概述

wd-avatar-group 是一个用于展示多个头像的组件，支持头像重叠排列、最多显示数量限制、"查看更多"提示等功能。该组件适用于需要展示多个用户头像的场景，如群聊成员列表、评论区用户头像、团队成员展示等。

### 适用场景
- 群聊成员头像展示
- 评论区用户头像列表
- 团队成员头像墙
- 关注用户头像展示
- 任何需要展示多个用户头像的场景

## API 参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| urls | Array | [] | 是 | 头像图片组，支持字符串数组或对象数组 |
| max-count | String / Number | 5 | 否 | 最多展示的头像数量 |
| shape | String | circle | 否 | 头像形状，可选值：circle（圆形）、square（方形） |
| mode | String | scaleToFill | 否 | 图片裁剪模式，具体值参考 uni-app image 组件的 mode 属性 |
| show-more | Boolean | true | 否 | 超出 maxCount 时是否显示查看更多的提示 |
| size | String / Number | 40 | 否 | 头像大小，单位为 rpx |
| key-name | String | '' | 否 | 指定从数组的对象元素中读取哪个属性作为图片地址，如未指定则优先使用 item.url |
| gap | String / Number | 0.5 | 否 | 头像之间的遮挡比例，取值范围 0-1 |
| extra-value | String / Number | 0 | 否 | 需额外显示的值，用于自定义"查看更多"的数量 |
| custom-class | String | - | 否 | 根节点自定义类名 |
| custom-style | String / Object | - | 否 | 根节点自定义样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| show-more | 点击"查看更多"时触发 | - |

### Methods
无

### Slots
无

## 使用示例

### 基础用法
```vue
<template>
  <wd-avatar-group :urls="avatarUrls" />
</template>

<script setup lang="ts">
const avatarUrls = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg',
  'https://example.com/avatar5.jpg',
  'https://example.com/avatar6.jpg'
]
</script>
```

### 自定义最大显示数量
```vue
<template>
  <wd-avatar-group :urls="avatarUrls" :max-count="3" />
</template>

<script setup lang="ts">
const avatarUrls = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg'
]
</script>
```

### 自定义头像大小和形状
```vue
<template>
  <wd-avatar-group :urls="avatarUrls" :size="60" shape="square" />
</template>

<script setup lang="ts">
const avatarUrls = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg'
]
</script>
```

### 使用对象数组作为数据源
```vue
<template>
  <wd-avatar-group :urls="userList" key-name="avatar" />
</template>

<script setup lang="ts">
const userList = [
  { id: 1, name: '用户1', avatar: 'https://example.com/avatar1.jpg' },
  { id: 2, name: '用户2', avatar: 'https://example.com/avatar2.jpg' },
  { id: 3, name: '用户3', avatar: 'https://example.com/avatar3.jpg' }
]
</script>
```

### 自定义头像重叠比例
```vue
<template>
  <wd-avatar-group :urls="avatarUrls" :gap="0.3" />
</template>

<script setup lang="ts">
const avatarUrls = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg'
]
</script>
```

### 监听"查看更多"事件
```vue
<template>
  <wd-avatar-group :urls="avatarUrls" @show-more="handleShowMore" />
</template>

<script setup lang="ts">
import { showToast } from '@/uni_modules/wot-ui-plus/utils'

const avatarUrls = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg',
  'https://example.com/avatar5.jpg',
  'https://example.com/avatar6.jpg'
]

const handleShowMore = () => {
  showToast('点击了查看更多')
  // 这里可以实现查看所有头像的逻辑
}
</script>
```

## 样式定制

### 自定义类名
通过 `custom-class` 属性可以为组件根节点添加自定义类名，用于覆盖默认样式：

```vue
<template>
  <wd-avatar-group :urls="avatarUrls" custom-class="my-avatar-group" />
</template>

<style scoped>
.my-avatar-group {
  /* 自定义样式 */
}
</style>
```

### 自定义样式
通过 `custom-style` 属性可以直接为组件根节点添加内联样式：

```vue
<template>
  <wd-avatar-group :urls="avatarUrls" :custom-style="{ marginTop: '20rpx' }" />
</template>
```

## 注意事项

1. **数据格式支持**：
   - 支持字符串数组：`['url1', 'url2', 'url3']`
   - 支持对象数组：`[{ url: 'url1' }, { url: 'url2' }]` 或通过 `key-name` 指定属性名

2. **图片裁剪模式**：
   - `mode` 属性支持 uni-app image 组件的所有裁剪模式
   - 默认值为 `scaleToFill`，建议根据实际需求选择合适的裁剪模式

3. **头像重叠比例**：
   - `gap` 属性取值范围为 0-1
   - 值越大，头像重叠越多；值越小，头像间隔越大
   - 默认值为 0.5，可根据实际需求调整

4. **性能优化**：
   - 当头像数量较多时，建议合理设置 `max-count` 属性，避免渲染过多头像
   - 建议对头像图片进行适当压缩，提高加载速度

5. **兼容性**：
   - 该组件基于 uni-app 开发，支持多端适配
   - 在不同平台上，图片加载和渲染可能存在差异，建议进行充分测试

## 组件依赖

- 依赖 `wd-avatar` 组件，用于渲染单个头像
- 依赖 `wd-text` 组件，用于显示"查看更多"的数量文本

