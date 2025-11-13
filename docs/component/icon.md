#  Icon 图标

基于字体的图标集。

## 图标集  {{ list.length }}个

<div class="icon-grid">
  <div class="icon-item" v-for="(icon, index) in list" :key="index" @click="copyToClipboard(icon)">
    <div class="icon"><i :class="['wd-icons', `wd-icon-${icon}`]"></i></div>
    <span class="label">{{ icon }}</span>
  </div>
</div>

## 基本用法

通过 `name` 属性设置使用哪个图标。

```html
<wd-icon name="add-circle" />
```

## 图标颜色

设置 `color` 属性。

```html
<wd-icon name="add-circle" color="#0083ff" />
```

## 图标大小

设置 `size` 属性。

```html
<wd-icon name="add-circle" size="20px" />
```

## 自定义图标
如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。


``` css
/* 路径 src/iconfont/index.css */

@font-face {
  font-family: "fish";
  src: url('//at.alicdn.com/t/c/font_5060882_ylpj1gseivj.woff2?t=1762644472433') format('woff2'),
       url('//at.alicdn.com/t/c/font_5060882_ylpj1gseivj.woff?t=1762644472433') format('woff'),
       url('//at.alicdn.com/t/c/font_5060882_ylpj1gseivj.ttf?t=1762644472433') format('truetype');
}

.fish {
  font-family: "fish" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fish-kehuishouwu:before {
  content: "\e627";
}

```
```html
<!-- app.vue -->
 <style>
@import '@/iconfont/index.css';
</style>
```

```html
<!-- 通过 class-prefix 指定类名为 fish -->
<wd-icon class-prefix="fish" name="kehuishouwu" />
```

## Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| name | 图标名称或图片链接 |	string | - | - | - |
| color	| 图标的颜色 | string |	- |	inherit | - |
| size | 图标的字体大小 | string \| number | - | inherit | - |
| classPrefix | 类名前缀，用于使用自定义图标 | string | - | 'wd-icon' | 0.1.27 |
| custom-style | 根节点样式 | string | - | - | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|------|------|---------|
| click | 点击图标时触发 | event | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |


<style module>
  @import url('//at.alicdn.com/t/c/font_5061229_ipmsgxkkb5.css');
  
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
