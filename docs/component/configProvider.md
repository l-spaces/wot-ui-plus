# 配置提供者组件（wd-config-provider）

## 组件概述

wd-config-provider 是一个配置提供者组件，用于全局配置组件库的主题和主题变量。该组件基于 UniApp 开发，支持多平台使用，提供了主题切换和自定义主题变量的功能，可用于统一管理组件库的样式，适用于各种需要主题配置的场景。

### 适用场景

- 需要统一管理组件库样式的应用
- 需要支持浅色/深色主题切换的应用
- 需要自定义组件库主题变量的应用
- 任何需要全局配置组件库样式的场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| theme | string | 'light' | 否 | 主题风格，设置为 'dark' 来开启深色模式，全局生效 |
| themeVars | object | {} | 否 | 自定义主题变量，用于覆盖组件库的默认主题变量 |
| customStyle | string | '' | 否 | 自定义根节点样式，如 'margin: 10px; color: red;' |
| customClass | string | '' | 否 | 自定义根节点样式类，如 'custom-class1 custom-class2' |

### Events

该组件本身不触发任何事件。

### Methods

该组件本身不对外暴露任何方法。

### Slots

| 插槽名 | 作用域变量 | 描述 |
| --- | --- | --- |
| default | 无 | 默认插槽，用于包裹需要应用主题配置的子组件 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-config-provider>
    <view class="app-container">
      <wd-button type="primary">主要按钮</wd-button>
      <wd-button type="success">成功按钮</wd-button>
      <wd-button type="warning">警告按钮</wd-button>
      <wd-button type="error">错误按钮</wd-button>
    </view>
  </wd-config-provider>
</template>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

### 深色主题

```vue
<template>
  <wd-config-provider theme="dark">
    <view class="app-container">
      <wd-button type="primary">主要按钮</wd-button>
      <wd-button type="success">成功按钮</wd-button>
      <wd-button type="warning">警告按钮</wd-button>
      <wd-button type="error">错误按钮</wd-button>
    </view>
  </wd-config-provider>
</template>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

### 自定义主题变量

```vue
<template>
  <wd-config-provider :themeVars="customThemeVars">
    <view class="app-container">
      <wd-button type="primary">主要按钮</wd-button>
      <wd-button type="success">成功按钮</wd-button>
      <wd-button type="warning">警告按钮</wd-button>
      <wd-button type="error">错误按钮</wd-button>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const customThemeVars = ref({
  colorTheme: '#67c23a', // 自定义主题色为绿色
  colorSuccess: '#f56c6c', // 自定义成功色为红色
  colorWarning: '#e6a23c', // 自定义警告色为黄色
  colorError: '#909399' // 自定义错误色为灰色
})
</script>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

### 主题切换

```vue
<template>
  <wd-config-provider :theme="currentTheme">
    <view class="app-container">
      <wd-button type="primary" @click="toggleTheme">切换主题</wd-button>
      <wd-button type="success">成功按钮</wd-button>
      <wd-button type="warning">警告按钮</wd-button>
      <wd-button type="error">错误按钮</wd-button>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentTheme = ref('light')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

### 嵌套使用

```vue
<template>
  <wd-config-provider theme="light">
    <view class="app-container">
      <wd-button type="primary">浅色主题按钮</wd-button>
      <wd-config-provider theme="dark">
        <wd-button type="primary">深色主题按钮</wd-button>
      </wd-config-provider>
    </view>
  </wd-config-provider>
</template>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

## 样式定制

### 通过 themeVars 自定义主题变量

```vue
<template>
  <wd-config-provider :themeVars="customThemeVars">
    <view class="app-container">
      <wd-button type="primary">自定义主题按钮</wd-button>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const customThemeVars = ref({
  // 自定义按钮相关主题变量
  buttonPrimaryBgColor: '#67c23a',
  buttonPrimaryColor: '#ffffff',
  buttonSuccessBgColor: '#f56c6c',
  buttonSuccessColor: '#ffffff',
  buttonWarningBgColor: '#e6a23c',
  buttonWarningColor: '#ffffff',
  buttonErrorBgColor: '#909399',
  buttonErrorColor: '#ffffff',
  // 自定义字体相关主题变量
  fsTitle: '18px',
  fsContent: '16px',
  fsSecondary: '14px',
  // 自定义颜色相关主题变量
  colorTheme: '#67c23a',
  colorSuccess: '#f56c6c',
  colorWarning: '#e6a23c',
  colorError: '#909399'
})
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
```

### 通过 customStyle 自定义根节点样式

```vue
<template>
  <wd-config-provider
    custom-style="margin: 20px; padding: 10px; background-color: #f5f7fa; border-radius: 10px;"
  >
    <view class="app-container">
      <wd-button type="primary">自定义根节点样式</wd-button>
    </view>
  </wd-config-provider>
</template>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
```

### 通过 customClass 自定义根节点样式类

```vue
<template>
  <wd-config-provider custom-class="custom-config-provider">
    <view class="app-container">
      <wd-button type="primary">自定义根节点样式类</wd-button>
    </view>
  </wd-config-provider>
</template>

<style scoped>
.custom-config-provider {
  margin: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 10px;
}

.app-container {
  padding: 20px;
}
</style>
```

## 注意事项

1. **全局生效**：配置的主题和主题变量对所有子组件生效，实现全局样式统一管理
2. **嵌套使用**：支持嵌套使用，内层配置会覆盖外层配置
3. **主题变量覆盖**：自定义的主题变量会覆盖组件库的默认主题变量
4. **CSS变量**：主题变量通过 CSS 变量实现，性能优秀
5. **深色主题**：设置 theme 为 'dark' 可开启深色模式，组件库会自动应用深色主题样式
6. **主题变量命名**：主题变量的命名遵循 kebab-case 格式，如 color-theme、button-primary-bg-color 等
7. **主题变量类型**：主题变量的值可以是颜色、字体大小、间距等 CSS 属性值
8. **性能优化**：主题切换使用 CSS 变量实现，性能优秀，不会导致页面重绘
9. **平台兼容性**：支持 iOS/Android App、H5、主流小程序等多平台使用
10. **组件嵌套**：建议将 wd-config-provider 包裹在应用的根组件中，实现全局主题配置

## 相关组件

该组件是一个配置提供者，与其他组件配合使用，用于统一管理组件库的样式。
