# Swiper 轮播图

## 组件概述

Swiper 是一个功能强大的轮播组件，支持图片、视频等多种媒体类型，提供丰富的配置选项和交互效果，适用于首页轮播、商品展示、广告投放等多种场景。

### 功能特点
- 支持图片和视频轮播
- 支持水平和垂直方向切换
- 支持自动播放和循环播放
- 提供多种指示器样式和位置
- 支持自定义边距和显示数量
- 支持视频自动播放和静音控制
- 支持动态调整高度
- 提供丰富的事件回调

### 适用场景
- 首页轮播图展示
- 商品详情图片预览
- 广告位轮播
- 视频轮播展示
- 图片画廊

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| autoplay | boolean | true | 否 | 是否自动播放轮播图 |
| current | number | 0 | 否 | 当前轮播在哪一项（下标） |
| direction | string | 'horizontal' | 否 | 轮播滑动方向，可选值：'horizontal'（水平）或'vertical'（垂直） |
| displayMultipleItems | number | 1 | 否 | 同时显示的滑块数量 |
| duration | number | 300 | 否 | 滑动动画时长，单位为毫秒 |
| easingFunction | string | 'default' | 否 | 指定 swiper 切换缓动动画类型，可选值：'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' |
| height | number/string | '192' | 否 | 轮播的高度 |
| interval | number | 5000 | 否 | 轮播间隔时间，单位为毫秒 |
| list | array | [] | 否 | 图片列表，可以是一个图片对象数组或字符串数组 |
| loop | boolean | true | 否 | 是否循环播放轮播图 |
| videoLoop | boolean | true | 否 | 视频是否循环播放 |
| muted | boolean | true | 否 | 视频是否静音播放 |
| nextMargin | number/string | '0' | 否 | 后边距 |
| previousMargin | number/string | '0' | 否 | 前边距 |
| snapToEdge | boolean | false | 否 | 是否应用边距到第一个、最后一个元素 |
| indicator | boolean/object | true | 否 | 指示器全部配置，可以是布尔值或指示器配置对象 |
| indicatorPosition | string | 'bottom' | 否 | 指示器位置，可选值：'left' | 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'right' |
| imageMode | string | 'aspectFill' | 否 | 图片裁剪、缩放的模式 |
| valueKey | string | 'value' | 否 | 选项对象中，value 对应的 key |
| textKey | string | 'text' | 否 | 选项对象中，标题 text 对应的 key |
| autoplayVideo | boolean | true | 否 | 视频是否自动播放 |
| stopPreviousVideo | boolean | true | 否 | 切换轮播项时是否停止上一个视频的播放 |
| stopAutoplayWhenVideoPlay | boolean | false | 否 | 视频播放时是否停止自动轮播 |
| adjustHeight | string | 'highest' | 否 | 自动以指定滑块的高度为整个容器的高度，仅支付宝小程序支持，可选值：'first' | 'current' | 'highest' | 'none' |
| adjustVerticalHeight | boolean | false | 否 | vertical 为 true 时强制使 adjust-height 生效，仅支付宝小程序支持 |
| customClass | string | '' | 否 | 自定义类名，用于覆盖组件样式 |
| customStyle | object | {} | 否 | 自定义样式，直接应用到组件根元素 |
| customIndicatorClass | string | '' | 否 | 自定义指示器类名 |
| customImageClass | string | '' | 否 | 自定义图片类名 |
| customPrevImageClass | string | '' | 否 | 自定义上一个图片类名 |
| customNextImageClass | string | '' | 否 | 自定义下一个图片类名 |
| customItemClass | string | '' | 否 | 自定义swiper子项类名 |
| customPrevClass | string | '' | 否 | 自定义上一个子项类名 |
| customNextClass | string | '' | 否 | 自定义下一个子项类名 |
| customTextClass | string | '' | 否 | 自定义文字标题类名 |
| customTextStyle | string | '' | 否 | 自定义文字标题样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击轮播项时触发 | { index: number, item: any }，index 为点击项的索引，item 为点击项的内容 |
| change | 轮播滑块切换时触发 | { current: number, source: string }，current 为当前索引，source 为切换来源（'autoplay' | 'touch' | 'navigate'） |
| animationfinish | 滑块动画结束时触发 | { current: number, source: string }，current 为当前索引，source 为切换来源 |
| update:current | 当前轮播项变化时触发 | current: number，当前轮播项的索引 |

### Methods

该组件未对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | { item, index } | 默认插槽，用于自定义轮播项内容，item 为当前轮播项数据，index 为索引 |
| indicator | { current, total } | 自定义指示器插槽，current 为当前索引，total 为总数量 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-swiper :list="list" height="300" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  'https://cdn.webdurian.com/test/swiper/1.jpg',
  'https://cdn.webdurian.com/test/swiper/2.jpg',
  'https://cdn.webdurian.com/test/swiper/3.jpg'
])
</script>
```

### 自定义指示器

```vue
<template>
  <wd-swiper :list="list" height="300" :indicator="indicatorConfig" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  'https://cdn.webdurian.com/test/swiper/1.jpg',
  'https://cdn.webdurian.com/test/swiper/2.jpg',
  'https://cdn.webdurian.com/test/swiper/3.jpg'
])

const indicatorConfig = ref({
  type: 'dots', // 指示器类型：dots | lines | numbers
  indicatorPosition: 'bottom-right', // 指示器位置
  showControls: true // 是否显示左右控制按钮
})
</script>
```

### 视频轮播

```vue
<template>
  <wd-swiper :list="videoList" height="400" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const videoList = ref([
  {
    value: 'https://cdn.webdurian.com/test/video/1.mp4',
    type: 'video',
    poster: 'https://cdn.webdurian.com/test/swiper/1.jpg'
  },
  {
    value: 'https://cdn.webdurian.com/test/video/2.mp4',
    type: 'video',
    poster: 'https://cdn.webdurian.com/test/swiper/2.jpg'
  }
])
</script>
```

### 垂直轮播

```vue
<template>
  <wd-swiper 
    :list="list" 
    height="200" 
    direction="vertical" 
    :indicator-position="'right'" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  'https://cdn.webdurian.com/test/swiper/1.jpg',
  'https://cdn.webdurian.com/test/swiper/2.jpg',
  'https://cdn.webdurian.com/test/swiper/3.jpg'
])
</script>
```

### 自定义轮播项

```vue
<template>
  <wd-swiper :list="list" height="300">
    <template #default="{ item, index }">
      <view class="custom-swiper-item">
        <image :src="item" mode="aspectFill" style="width: 100%; height: 100%;" />
        <view class="swiper-text">
          第 {{ index + 1 }} 张图片
        </view>
      </view>
    </template>
    <template #indicator="{ current, total }">
      <view class="custom-indicator">
        {{ current + 1 }} / {{ total }}
      </view>
    </template>
  </wd-swiper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  'https://cdn.webdurian.com/test/swiper/1.jpg',
  'https://cdn.webdurian.com/test/swiper/2.jpg',
  'https://cdn.webdurian.com/test/swiper/3.jpg'
])
</script>

<style scoped>
.custom-swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 28rpx;
}

.custom-indicator {
  position: absolute;
  bottom: 20rpx;
  right: 20rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}
</style>
```

### 带边距的轮播

```vue
<template>
  <wd-swiper 
    :list="list" 
    height="200" 
    :previous-margin="'50rpx'" 
    :next-margin="'50rpx'" 
    :display-multiple-items="2" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  'https://cdn.webdurian.com/test/swiper/1.jpg',
  'https://cdn.webdurian.com/test/swiper/2.jpg',
  'https://cdn.webdurian.com/test/swiper/3.jpg',
  'https://cdn.webdurian.com/test/swiper/4.jpg'
])
</script>
```

## 样式定制

### 自定义类名

```vue
<wd-swiper 
  :list="list" 
  height="300" 
  custom-class="my-swiper" 
  custom-image-class="my-swiper-image" 
/>
```

### 自定义样式

```vue
<wd-swiper 
  :list="list" 
  height="300" 
  :custom-style="{ borderRadius: '10rpx', overflow: 'hidden' }" 
/>
```

### CSS 变量

组件支持以下 CSS 变量进行样式定制：

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| --swiper-background-color | #ffffff | 轮播背景色 |
| --swiper-indicator-dot-size | 8px | 指示器圆点大小 |
| --swiper-indicator-dot-color | rgba(255, 255, 255, 0.5) | 指示器圆点默认颜色 |
| --swiper-indicator-dot-active-color | #ffffff | 指示器圆点激活颜色 |
| --swiper-indicator-dot-spacing | 8px | 指示器圆点间距 |
| --swiper-text-color | #ffffff | 轮播文字颜色 |
| --swiper-text-font-size | 28rpx | 轮播文字字体大小 |
| --swiper-text-background-color | rgba(0, 0, 0, 0.3) | 轮播文字背景色 |

## 注意事项

1. **性能优化**：
   - 长列表轮播时，建议限制列表长度，避免过多 DOM 元素
   - 图片资源建议进行压缩和懒加载
   - 视频轮播时，建议设置 `stopPreviousVideo: true` 以节省资源

2. **视频处理**：
   - 视频自动播放需要满足浏览器/平台的自动播放策略
   - 建议为视频设置合适的封面图 `poster`
   - 视频播放时可通过 `stopAutoplayWhenVideoPlay` 停止自动轮播

3. **平台兼容性**：
   - 所有平台均支持基本功能
   - `adjustHeight` 和 `adjustVerticalHeight` 属性仅支持支付宝小程序
   - 视频自动播放在不同平台的表现可能略有差异

4. **指示器配置**：
   - 指示器类型支持 'dots'、'lines'、'numbers' 三种
   - 可通过 `indicatorPosition` 调整指示器位置
   - 可通过 `showControls` 显示左右控制按钮

5. **事件处理**：
   - `change` 事件在轮播切换过程中触发
   - `animationfinish` 事件在轮播动画结束后触发
   - 点击事件返回当前索引和项数据

6. **自定义内容**：
   - 使用默认插槽时，需注意保持轮播项的高度一致
   - 自定义指示器时，需自行处理样式和交互

### 状态流转
- 初始状态：`current = 0`，显示第一张轮播图
- 自动播放：`autoplay = true` 时，每隔 `interval` 毫秒自动切换到下一张
- 手动滑动：用户触摸滑动时，触发 `change` 事件，更新 `current` 值
- 视频播放：视频播放时，根据 `stopAutoplayWhenVideoPlay` 决定是否停止自动轮播

## 常见问题

### Q: 轮播图高度如何自适应？
A: 可以使用 `adjustHeight` 属性（仅支付宝小程序支持），或通过监听图片加载动态设置高度

### Q: 如何自定义指示器样式？
A: 可以使用 `indicator` 属性配置指示器，或通过 `indicator` 插槽完全自定义

### Q: 视频为什么无法自动播放？
A: 请检查是否满足平台自动播放策略，建议设置 `muted: true` 并确保视频有封面图

### Q: 如何实现轮播图点击跳转？
A: 可以监听 `click` 事件，在事件处理函数中执行跳转逻辑

### Q: 如何禁止自动播放？
A: 设置 `autoplay: false` 即可禁止自动播放
