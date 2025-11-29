# 幕帘组件（wd-curtain）

## 组件概述

wd-curtain 是一个幕帘组件，用于在页面中展示全屏或半屏的幕帘效果，支持自定义图片、关闭按钮位置、点击行为等。该组件基于 UniApp 开发，支持多平台使用，提供了丰富的配置选项，可自定义幕帘的外观和行为，适用于各种需要幕帘效果的场景。

### 适用场景

- 应用启动时的欢迎页
- 活动宣传页
- 广告展示
- 任何需要幕帘效果的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| value | boolean | false | 否 | 绑定值，展示/关闭幕帘（已废弃，请使用 modelValue） |
| modelValue | boolean | false | 否 | 绑定值，展示/关闭幕帘 |
| closePosition | string | 'inset' | 否 | 关闭按钮位置，可选值为 'inset'、'top'、'bottom'、'top-left'、'top-right'、'bottom-left'、'bottom-right' |
| src | string | - | 否 | 幕帘图片地址，必须使用网络地址 |
| to | string | - | 否 | 幕帘图片点击链接 |
| width | number | - | 否 | 幕帘图片宽度 |
| closeOnClickModal | boolean | false | 否 | 点击遮罩是否关闭 |
| hideWhenClose | boolean | true | 否 | 是否当关闭时将弹出层隐藏（display: none） |
| zIndex | number | 10 | 否 | 设置层级 |
| customCloseClass | string | '' | 否 | 自定义关闭按钮的类名 |
| customCloseStyle | string | '' | 否 | 自定义关闭按钮的样式 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| showMenuByLongpress | boolean | false | 否 | 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效 |
| closeOnClick | boolean | true | 否 | 点击图片是否关闭幕帘 |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| beforeenter | 进入动画开始前触发 | 无 |
| enter | 进入动画过程中触发 | 无 |
| afterenter | 进入动画结束后触发 | 无 |
| beforeleave | 离开动画开始前触发 | 无 |
| leave | 离开动画过程中触发 | 无 |
| afterleave | 离开动画结束后触发 | 无 |
| close | 幕帘关闭时触发 | 无 |
| closed | 幕帘完全关闭后触发 | 无 |
| click-modal | 点击遮罩时触发 | 无 |
| load | 图片加载成功时触发 | 无 |
| error | 图片加载失败时触发 | 无 |
| click | 点击图片时触发 | 无 |
| update:modelValue | 绑定值变化时触发 | value: boolean - 幕帘的显示状态 |

### Methods

该组件本身不对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| close | 无 | 自定义关闭按钮插槽，用于自定义幕帘的关闭按钮外观 |

## 使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 自定义关闭按钮位置

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      close-position="top-right"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 点击遮罩关闭

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      :close-on-click-modal="true"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 自定义关闭按钮

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
    >
      <template #close>
        <wd-button type="primary" size="small" round @click="showCurtain = false">关闭</wd-button>
      </template>
    </wd-curtain>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 点击图片跳转链接

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      to="/pages/detail/detail"
      :close-on-click="false"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

## 样式定制

### 通过 customStyle 自定义样式

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      custom-style="border-radius: 10px;"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 通过 customClass 自定义样式

```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">显示幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      custom-class="custom-curtain"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCurtain = ref(false)
</script>

<style scoped>
.custom-curtain {
  border-radius: 10px;
}

/* 自定义关闭按钮样式 */
.custom-curtain .wd-curtain__content-close {
  color: #f56c6c;
  font-size: 32px;
}
</style>
```

## 注意事项

1. **性能优化**：
   - 幕帘图片建议使用适当大小的图片，避免过大的图片影响页面加载性能
   - 当页面中有多个幕帘时，建议合理设置 zIndex 属性，避免层级冲突

2. **图片要求**：
   - 幕帘图片必须使用网络地址，不支持本地图片
   - 建议使用高质量的图片，以获得更好的视觉效果

3. **跨平台兼容性**：
   - 不同平台的图片加载机制可能存在差异，需注意测试
   - 不同平台的关闭按钮样式可能存在差异，需注意测试

4. **样式定制**：
   - 组件提供了丰富的样式属性，可直接通过 props 自定义组件外观
   - 也可通过 `customStyle` 和 `customClass` 进行更灵活的样式定制
   - 建议使用主题变量，确保组件样式与项目主题保持一致

5. **事件处理**：
   - 组件提供了丰富的事件，可根据需要监听相应的事件
   - 当 `closeOnClick` 为 `true` 时，点击图片会关闭幕帘
   - 当 `closeOnClickModal` 为 `true` 时，点击遮罩会关闭幕帘

6. **关闭按钮位置**：
   - 支持 7 种不同的关闭按钮位置，可根据需要选择合适的位置
   - 当 `closePosition` 为 `inset` 时，关闭按钮会内嵌在图片中

7. **根节点脱离**：
   - 当 `rootPortal` 为 `true` 时，幕帘会从页面中脱离出来，用于解决各种 fixed 失效问题
   - 该属性在不同平台的实现方式不同：H5 使用 teleport，APP 使用 renderjs，小程序使用 root-portal

8. **小程序码识别**：
   - 当 `showMenuByLongpress` 为 `true` 时，长按图片会显示识别小程序码菜单
   - 该属性仅在微信小程序平台有效

