# Tree 树形组件

## 组件概述

wd-tree 是一个用于展示层级结构数据的树形组件，支持节点展开/折叠、选择、勾选、搜索过滤等功能。它适用于展示分类数据、组织结构、文件系统等具有层级关系的数据，是构建复杂数据展示界面的重要组件。

### 功能特点
- 支持节点展开/折叠
- 支持节点选择和勾选
- 支持级联选择
- 支持异步加载节点数据
- 支持搜索过滤
- 支持自定义节点内容和展开/折叠图标
- 支持自定义样式
- 支持受控和非受控两种模式

### 适用场景
- 分类数据展示
- 组织结构图
- 文件系统浏览
- 权限管理
- 菜单导航

## API 参考

### Props

| 参数名 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| data | array | [] | 否 | 树形数据 |
| keyField | string | 'id' | 否 | 选项名称映射的字段名 |
| labelField | string | 'label' | 否 | 展示值映射的字段名 |
| childrenField | string | 'children' | 否 | 子级值映射的字段名 |
| isLeafField | string | 'isLeaf' | 否 | 是否是叶子节点的字段名 |
| disabledField | string | 'disabled' | 否 | 是否禁用的字段名 |
| defaultCheckedKeys | array | [] | 否 | 默认选中多选项 |
| defaultExpandedKeys | array | [] | 否 | 默认展开项 |
| checkedKeys | array | - | 否 | 受控的选中多选项 |
| expandedKeys | array | - | 否 | 受控的展开项 |
| checkable | boolean | false | 否 | 是否可选择 |
| selectable | boolean | false | 否 | 是否可选择 |
| cascade | boolean | false | 否 | 是否级联 |
| expandOnClick | boolean | false | 否 | 是否允许点击节点展开/收缩 |
| checkOnClick | boolean | false | 否 | 是否允许点击节点勾选/取消勾选 |
| loadNode | function | - | 否 | 异步加载节点数据 |
| allowCheckingNotLoaded | boolean | false | 否 | 是否允许勾选未加载的节点 |
| pattern | string | '' | 否 | 搜索过滤 |
| showIrrelevantNodes | boolean | true | 否 | 是否显示搜索无关的节点 |
| indentWidth | number / string | 24 | 否 | 缩进宽度 |
| showSwitcher | boolean | true | 否 | 是否显示展开/收缩按钮 |
| expandIcon | string | 'right-box-filled' | 否 | 展开图标 |
| collapseIcon | string | 'down-box-filled' | 否 | 收缩图标 |
| loadingColor | string | '' | 否 | loading的颜色 |
| checkedColor | string | '' | 否 | checkebox选中颜色 |
| rotatableSwitcher | boolean | false | 否 | 是否可旋转展开/收缩按钮 |
| highlightBgColor | string | '#f9ae3d' | 否 | 高亮背景颜色 |
| selectedBgColor | string | '#f3f4f6' | 否 | 选中背景颜色 |
| switcherSize | number / string | 14 | 否 | 展开/收缩按钮大小 |
| switcherColor | string | '#909399' | 否 | 展开/收缩按钮颜色 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击节点时触发 | - |
| checked | 选中状态变化时触发 | value: array - 当前选中的节点键值数组 |
| expanded | 展开状态变化时触发 | value: array - 当前展开的节点键值数组 |
| update:checked-keys | 选中状态变化时触发（受控模式） | value: array - 当前选中的节点键值数组 |
| update:expanded-keys | 展开状态变化时触发（受控模式） | value: array - 当前展开的节点键值数组 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| switcher | hide: boolean - 是否隐藏开关, loading: boolean - 是否正在加载, expanded: boolean - 是否已展开 | 自定义展开/收缩按钮 |
| content | node: object - 当前节点数据 | 自定义节点内容 |

### Methods

该组件未对外暴露任何方法。

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <wd-tree :data="treeData" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      {
        id: '1-1',
        label: '二级节点1-1',
        children: [
          { id: '1-1-1', label: '三级节点1-1-1' },
          { id: '1-1-2', label: '三级节点1-1-2' }
        ]
      },
      { id: '1-2', label: '二级节点1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点2',
    children: [
      { id: '2-1', label: '二级节点2-1' },
      { id: '2-2', label: '二级节点2-2' }
    ]
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}
</style>
```

### 可勾选树形

```vue
<template>
  <view class="demo">
    <wd-tree 
      :data="treeData" 
      checkable 
      :cascade="true"
      @checked="onChecked"
    />
    <view class="result">
      选中节点：{{ checkedKeys.join(', ') }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      {
        id: '1-1',
        label: '二级节点1-1',
        children: [
          { id: '1-1-1', label: '三级节点1-1-1' },
          { id: '1-1-2', label: '三级节点1-1-2' }
        ]
      },
      { id: '1-2', label: '二级节点1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点2',
    children: [
      { id: '2-1', label: '二级节点2-1' },
      { id: '2-2', label: '二级节点2-2' }
    ]
  }
])

const checkedKeys = ref<string[]>([])

const onChecked = (keys: string[]) => {
  checkedKeys.value = keys
}
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
```

### 异步加载节点

```vue
<template>
  <view class="demo">
    <wd-tree :data="treeData" :load-node="loadNode" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '异步加载节点1',
    isLeaf: false
  },
  {
    id: '2',
    label: '异步加载节点2',
    isLeaf: false
  }
])

const loadNode = async (node: any) => {
  // 模拟异步加载
  return new Promise((resolve) => {
    setTimeout(() => {
      const children = []
      for (let i = 1; i <= 3; i++) {
        children.push({
          id: `${node.id}-${i}`,
          label: `${node.label}-${i}`,
          isLeaf: true
        })
      }
      node.children = children
      resolve(children)
    }, 1000)
  })
}
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}
</style>
```

### 搜索过滤

```vue
<template>
  <view class="demo">
    <wd-input 
      v-model="searchText" 
      placeholder="搜索节点" 
      clearable
      style="margin-bottom: 20px;"
    />
    <wd-tree 
      :data="treeData" 
      :pattern="searchText"
      :show-irrelevant-nodes="false"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      {
        id: '1-1',
        label: '二级节点1-1',
        children: [
          { id: '1-1-1', label: '三级节点1-1-1' },
          { id: '1-1-2', label: '三级节点1-1-2' }
        ]
      },
      { id: '1-2', label: '二级节点1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点2',
    children: [
      { id: '2-1', label: '二级节点2-1' },
      { id: '2-2', label: '二级节点2-2' }
    ]
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}
</style>
```

### 自定义节点内容

```vue
<template>
  <view class="demo">
    <wd-tree :data="treeData">
      <template #content="{ node }">
        <view class="custom-content">
          <wd-icon name="folder-filled" custom-class="node-icon" />
          <text class="node-label">{{ node.label }}</text>
          <wd-tag v-if="node.children && node.children.length > 0" type="primary" size="mini">
            {{ node.children.length }}个子节点
          </wd-tag>
        </view>
      </template>
      <template #switcher="{ hide, loading, expanded }">
        <view v-if="!hide" class="custom-switcher">
          <wd-loading v-if="loading" size="12" />
          <wd-icon 
            v-else 
            :name="expanded ? 'down-box-filled' : 'right-box-filled'" 
            size="16"
            color="#1989fa"
          />
        </view>
      </template>
    </wd-tree>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      {
        id: '1-1',
        label: '二级节点1-1',
        children: [
          { id: '1-1-1', label: '三级节点1-1-1' },
          { id: '1-1-2', label: '三级节点1-1-2' }
        ]
      },
      { id: '1-2', label: '二级节点1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点2',
    children: [
      { id: '2-1', label: '二级节点2-1' },
      { id: '2-2', label: '二级节点2-2' }
    ]
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}

.custom-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.node-icon {
  color: #1989fa;
}

.node-label {
  flex: 1;
}

.custom-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## 样式定制

### 自定义样式

使用 `customStyle` 和 `customClass` 属性可以自定义 Tree 组件的根节点样式：

```vue
<template>
  <view class="demo">
    <wd-tree 
      :data="treeData" 
      customClass="my-tree"
      customStyle="border: 1px solid #ebedf0; border-radius: 4px;"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      { id: '1-1', label: '二级节点1-1' },
      { id: '1-2', label: '二级节点1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点2',
    children: [
      { id: '2-1', label: '二级节点2-1' },
      { id: '2-2', label: '二级节点2-2' }
    ]
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}

:deep(.my-tree) {
  background-color: #fafafa;
}

:deep(.wd-tree__label) {
  color: #323233;
  font-size: 14px;
}

:deep(.wd-tree__content) {
  padding: 8px 0;
}
</style>
```

### 自定义缩进和图标

```vue
<template>
  <view class="demo">
    <wd-tree 
      :data="treeData" 
      :indent-width="30"
      expand-icon="arrow-right"
      collapse-icon="arrow-down"
      :switcher-size="18"
      switcher-color="#1989fa"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '一级节点1',
    children: [
      { id: '1-1', label: '二级节点1-1' },
      { id: '1-2', label: '二级节点1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点2',
    children: [
      { id: '2-1', label: '二级节点2-1' },
      { id: '2-2', label: '二级节点2-2' }
    ]
  }
])
</script>

<style scoped>
.demo {
  padding: 20px;
  height: 400px;
  overflow: auto;
}
</style>
```

## 注意事项

1. **数据结构**：
   - 树形数据必须包含唯一的 `id` 字段（或通过 `keyField` 指定其他字段）
   - 子节点必须放在 `children` 字段中（或通过 `childrenField` 指定其他字段）
   - 可以通过 `isLeafField` 指定叶子节点字段，用于优化异步加载

2. **受控与非受控**：
   - 使用 `defaultCheckedKeys` 和 `defaultExpandedKeys` 实现非受控模式
   - 使用 `checkedKeys` 和 `expandedKeys` 实现受控模式
   - 受控模式下，必须通过 `update:checked-keys` 和 `update:expanded-keys` 事件更新状态

3. **级联选择**：
   - 当 `cascade` 为 `true` 时，勾选父节点会自动勾选所有子节点，取消勾选父节点会自动取消勾选所有子节点
   - 当 `cascade` 为 `false` 时，父节点和子节点的勾选状态相互独立

4. **异步加载**：
   - 异步加载时，需要设置 `isLeafField` 字段为 `false`，表示该节点不是叶子节点
   - 加载完成后，需要将子节点数据赋值给节点的 `children` 字段

5. **搜索过滤**：
   - 搜索时，会自动展开匹配节点的所有祖先节点
   - 可以通过 `showIrrelevantNodes` 属性控制是否显示不匹配的节点

6. **性能优化**：
   - 对于大量数据，建议使用虚拟滚动（需要额外实现）
   - 合理设置 `indentWidth` 和 `switcherSize`，避免过大的布局计算
   - 对于不需要搜索功能的场景，建议不设置 `pattern` 属性

7. **跨平台兼容**：
   - 组件在不同平台上的表现基本一致
   - 某些平台可能存在滚动行为的细微差异
   - 建议在目标平台上进行充分测试
