# wd-icon 图标

## 组件概述

图标组件是一个用于展示各种图标的通用组件，支持内置图标和自定义图标，提供了丰富的配置选项，如颜色、大小、圆角等。组件采用 Vue3 + TypeScript + UniApp 技术栈实现，具有轻量、易用、灵活等特点。


### 功能描述
- 支持内置图标库
- 支持自定义图标
- 支持图片图标
- 支持自定义颜色
- 支持自定义大小
- 支持圆角样式
- 支持加粗样式
- 支持点击事件
- 轻量级设计，性能开销小

### 适用场景
- 按钮图标
- 导航菜单图标
- 状态指示图标
- 信息提示图标
- 任何需要展示图标的场景

## 内置图标列表 {{ list.length }}个

<div class="icon-grid">
  <div class="icon-item" v-for="(icon, index) in list" :key="index" @click="copyToClipboard(icon)">
    <div class="icon"><i :class="['wd-icons', `wd-icon-${icon}`]"></i></div>
    <span class="label">{{ icon }}</span>
  </div>
</div>

## API 参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| name | string | - | 是 | 使用的图标名字，可以使用链接图片 |
| round | boolean | false | 否 | 是否显示圆角样式 |
| bold | boolean | false | 否 | 图标是否加粗 |
| color | string | - | 否 | 图标的颜色 |
| size | number/string | - | 否 | 图标的字体大小 |
| classPrefix | string | 'wd-icon' | 否 | 类名前缀，用于使用自定义图标 |
| customClass | string | - | 否 | 自定义类名，用于覆盖组件默认样式 |
| customStyle | string/object | - | 否 | 自定义样式，支持字符串和对象两种格式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击图标时 | 事件对象 |
| touch | 触摸图标时 | 事件对象 |

### Methods
组件未对外暴露任何方法。

### Slots
组件未定义任何插槽。

## 多场景使用示例

### 基础用法

```vue
<template>
  <view class="container">
    <wd-icon name="success" />
    <wd-icon name="warning" />
    <wd-icon name="error" />
    <wd-icon name="info" />
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

### 自定义颜色和大小

```vue
<template>
  <view class="container">
    <wd-icon name="success" color="#07c160" size="32" />
    <wd-icon name="warning" color="#ff976a" size="40" />
    <wd-icon name="error" color="#ee0a24" size="48" />
    <wd-icon name="info" color="#1989fa" size="56" />
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
}
</style>
```

### 图片图标

```vue
<template>
  <view class="container">
    <wd-icon 
      name="https://example.com/icon.png" 
      size="64" 
      round
    />
    <wd-icon 
      name="/static/images/logo.png" 
      size="64"
    />
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
}
</style>
```

### 点击事件

```vue
<template>
  <view class="container">
    <wd-icon 
      name="success" 
      size="40" 
      @click="onIconClick"
    />
    <wd-icon 
      name="warning" 
      size="40" 
      @touch="onIconTouch"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const onIconClick = (event: any) => {
  console.log('点击了成功图标', event)
  // 执行相应的业务逻辑
}

const onIconTouch = (event: any) => {
  console.log('触摸了警告图标', event)
  // 执行相应的业务逻辑
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
}
</style>
```

### 自定义样式和类名

```vue
<template>
  <view class="container">
    <wd-icon 
      name="success" 
      size="40" 
      custom-class="my-icon"
      :custom-style="{
        borderRadius: '50%',
        backgroundColor: '#e8f5e8',
        padding: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }"
    />
    <wd-icon 
      name="warning" 
      size="40" 
      bold
      custom-class="my-icon"
      :custom-style="{
        borderRadius: '50%',
        backgroundColor: '#fff3e0',
        padding: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }"
    />
  </view>
</template>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
}

/* 自定义类名样式 */
.my-icon {
  transition: all 0.2s ease;
}

.my-icon:active {
  transform: scale(0.95);
}
</style>
```

## 样式定制指南

### customClass 用法
```vue
<wd-icon name="success" custom-class="my-icon" />

<style>
.my-icon {
  /* 自定义样式 */
  color: #07c160;
  font-size: 32px;
}
</style>
```

### customStyle 用法
```vue
<wd-icon 
  name="success" 
  :custom-style="{
    color: #07c160,
    fontSize: '32px',
    margin: '0 10px'
  }"
/>
```

### CSS 变量
组件支持通过 CSS 变量自定义样式，常用变量如下：

```css
.wd-icon {
  /* 自定义颜色 */
  --icon-color: #333;
  /* 自定义字体大小 */
  --icon-font-size: 20px;
  /* 自定义圆角 */
  --icon-border-radius: 0;
}
```

## 注意事项

1. **性能优化**：
   - 组件本身非常轻量，性能开销小，可以放心使用
   - 对于大量图标场景，建议合理使用缓存，避免重复加载
   - 图片图标建议使用适当大小，避免过大图片影响加载性能

2. **跨端兼容**：
   - 组件在不同平台上的表现基本一致
   - 图片图标在不同平台上的加载机制可能略有差异，建议使用相对路径或完整的网络地址

3. **使用限制**：
   - name 属性是必填项，必须提供有效的图标名称或图片地址
   - 自定义图标需要确保 classPrefix 和图标名称的正确性
   - 图片图标需要确保图片地址可访问

4. **最佳实践**：
   - 为不同场景定义统一的图标规范，如大小、颜色等
   - 优先使用内置图标，减少网络请求
   - 对于需要频繁更换的图标，建议使用动态绑定 name 属性
   - 结合 CSS 变量可以实现主题切换功能

5. **常见问题**：
   - 问题：图标不显示
     解决方案：检查 name 属性是否正确，自定义图标是否正确引入了字体文件
   - 问题：图片图标显示异常
     解决方案：检查图片地址是否可访问，图片格式是否支持
   - 问题：图标颜色不生效
     解决方案：检查 color 属性是否正确设置，是否被其他样式覆盖


<style>
  @import url('//at.alicdn.com/t/c/font_5061229_kjf22xhppo.css');
  
  /* 网格容器：控制整体布局（8列等宽分布） */
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
  }

  /* 单个图标项：垂直排列图标和文字 */
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 5px 1px 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 100px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.15s ease;
  }
  
  /* 点击时的反馈效果 */
  .icon-item:active {
    transform: scale(0.95);
  }
  
  .icon {
    margin-bottom: 5px;
  }

  /* 图标样式 */
  .wd-icons {
    font-size: 30px;
    transition: transform 0.3s ease;
  }

  /* 鼠标移入图标项时的效果 */
  .icon-item:hover {
    background-color: #f0f0f0;
    border-color: #333;
  }

  /* 鼠标移入图标项时，图标放大 */
  .icon-item:hover .icon {
    transform: scale(1.5);
    color: #1457e9ff;
  }

  /* 文字样式 */
  .label {
    font-size: 10px;
    color: #666;
    margin-top: 8px;
    transition: color 0.3s ease;
    line-height: 15px;
  }

  /* 鼠标移入时文字变色 */
  .icon-item:hover .label {
    color: #1457e9ff;
  }
  
  /* 提示消息样式 */
  .icon-toast {
    position: fixed;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* 显示提示消息 */
  .icon-toast.show {
    opacity: 1;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .icon-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>

<script setup>
import { list } from './icon'

// 复制文本到剪贴板函数
async function copyToClipboard(text) {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // 降级方案：使用传统的 execCommand 方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.cssText = 'position:fixed;left:-999999px;top:-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!success) throw new Error('复制失败');
    }
    showToast(`已复制: ${text}`);
  } catch (err) {
    console.error('复制失败:', err);
    showToast('复制失败，请手动复制', true);
  }
}

// 显示提示消息函数
function showToast(message, isError = false) {
  // 移除已存在的toast
  const existingToast = document.querySelector('.icon-toast');
  if (existingToast) document.body.removeChild(existingToast);
  
  // 创建新的toast
  const toast = document.createElement('div');
  toast.className = 'icon-toast';
  toast.textContent = message;
  toast.style.backgroundColor = isError ? '#ff4d4f' : '#000000ff';
  document.body.appendChild(toast);
  
  // 显示动画
  setTimeout(() => toast.classList.add('show'), 10);
  
  // 自动隐藏
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(toast)) document.body.removeChild(toast);
    }, 300);
  }, 1500);
}
</script>