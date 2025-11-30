# wd-index-anchor

## 组件概述

### 功能描述
`wd-index-anchor` 组件是索引列表（Index Bar）系统的核心组成部分，用于标识和定位列表中的特定索引位置。该组件与 `wd-index-bar` 父组件协同工作，提供索引导航和吸顶定位功能。

**核心功能特性：**
- **索引标识**：通过 `index` 属性标识锚点的索引位置
- **吸顶定位**：支持在父组件启用吸顶功能时的自动定位
- **自定义内容**：通过默认插槽支持完全自定义的锚点显示内容
- **跨端适配**：针对不同平台（特别是钉钉小程序）进行差异化处理
- **主题支持**：内置深色主题适配，支持自定义样式覆盖

### 适用业务场景

**主要应用场景：**
1. **通讯录列表**：按字母顺序排列的联系人列表索引导航
2. **城市选择器**：按拼音首字母排序的城市列表索引
3. **商品分类**：按分类字母顺序排列的商品列表索引
4. **文档目录**：大型文档的章节索引导航
5. **数据字典**：按字母排序的数据字典索引

**设计理念：**
- **定位精准**：通过精确的位置计算实现索引导航的准确性
- **性能优化**：采用懒加载和位置缓存机制提升滚动性能
- **用户体验**：吸顶效果增强用户导航体验，避免视觉跳跃
- **扩展性强**：支持自定义内容和样式，满足多样化需求

### 组件架构定位

在 wot-ui-plus 组件库中，`wd-index-anchor` 属于**导航类组件**，与 `wd-index-bar` 形成父子组件关系。该组件主要负责：
- 提供索引位置的标识和定位
- 与父组件进行状态同步和数据交互
- 处理平台差异化的样式和布局

## 完整API参考

### Props 属性配置

| 属性名 | 类型 | 默认值 | 必填项 | 描述 |
|--------|------|--------|--------|------|
| `index` | `string \| number` | - | **是** | 索引标识值，用于标识锚点的位置，支持字符串或数字类型 |
| `customStyle` | `string` | `''` | 否 | 自定义根节点内联样式，支持CSS样式字符串 |
| `customClass` | `string` | `''` | 否 | 自定义根节点CSS类名，支持多个类名空格分隔 |

### Events 事件列表

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| *该组件未定义自定义事件* | - | - |

**事件说明：**
- 组件通过 `useParent` 钩子与父组件 `wd-index-bar` 进行状态同步
- 吸顶状态通过计算属性与父组件的 `anchorState.activeIndex` 关联

### Methods 方法列表

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| `top` (属性) | - | `number` | 锚点的顶部位置信息，通过 `defineExpose` 暴露给父组件使用 |

### Slots 插槽配置

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| `default` | 无 | 默认插槽，用于自定义索引锚点的显示内容，未提供插槽内容时默认显示 `index` 值 |

## 多场景使用示例代码

### 示例1：基础用法 - 通讯录索引

```vue
<template>
  <!-- 在 wd-index-bar 中使用 wd-index-anchor -->
  <wd-index-bar :sticky="true">
    <wd-index-anchor index="A">
      <text>A组联系人</text>
    </wd-index-anchor>
    
    <!-- 联系人列表项 -->
    <wd-cell-group>
      <wd-cell title="Alice" value="138****1234" />
      <wd-cell title="Amy" value="139****5678" />
    </wd-cell-group>

    <wd-index-anchor index="B">
      <text>B组联系人</text>
    </wd-index-anchor>
    
    <wd-cell-group>
      <wd-cell title="Bob" value="136****9012" />
      <wd-cell title="Bill" value="137****3456" />
    </wd-cell-group>
  </wd-index-bar>
</template>

<script setup lang="ts">
// 基础用法无需额外逻辑，组件会自动处理索引导航
</script>
```

### 示例2：高级用法 - 自定义样式和内容

```vue
<template>
  <wd-index-bar :sticky="true">
    <wd-index-anchor 
      index="热门" 
      custom-class="hot-anchor"
      custom-style="background: linear-gradient(135deg, #ff6b6b, #ff9e7d);"
    >
      <view class="custom-content">
        <wd-icon name="fire" size="16" color="#fff" />
        <text class="anchor-text">热门城市</text>
      </view>
    </wd-index-anchor>
    
    <wd-cell-group>
      <wd-cell title="北京" />
      <wd-cell title="上海" />
      <wd-cell title="广州" />
      <wd-cell title="深圳" />
    </wd-cell-group>

    <wd-index-anchor index="A" custom-class="normal-anchor">
      <text class="anchor-text">A</text>
    </wd-index-anchor>
    
    <wd-cell-group>
      <wd-cell title="安庆" />
      <wd-cell title="安阳" />
    </wd-cell-group>
  </wd-index-bar>
</template>

<script setup lang="ts">
// 高级用法示例，展示自定义样式和内容的能力
</script>

<style scoped>
.custom-content {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.anchor-text {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.hot-anchor {
  border-radius: 8rpx;
  margin: 10rpx;
}

.normal-anchor {
  background-color: #f0f2f5;
  border-radius: 6rpx;
  margin: 8rpx;
}
</style>
```

### 示例3：动态生成索引锚点

```vue
<template>
  <wd-index-bar :sticky="true" @change="handleIndexChange">
    <wd-index-anchor 
      v-for="section in citySections" 
      :key="section.index"
      :index="section.index"
    >
      <text>{{ section.title }}</text>
    </wd-index-anchor>
    
    <!-- 动态生成城市列表 -->
    <template v-for="section in citySections" :key="`group-${section.index}`">
      <wd-cell-group>
        <wd-cell 
          v-for="city in section.cities" 
          :key="city.id"
          :title="city.name" 
          :value="city.code"
          @click="handleCitySelect(city)"
        />
      </wd-cell-group>
    </template>
  </wd-index-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface City {
  id: number
  name: string
  code: string
}

interface CitySection {
  index: string
  title: string
  cities: City[]
}

// 模拟城市数据
const citySections = ref<CitySection[]>([
  {
    index: '热门',
    title: '热门城市',
    cities: [
      { id: 1, name: '北京', code: '010' },
      { id: 2, name: '上海', code: '021' },
      { id: 3, name: '广州', code: '020' }
    ]
  },
  {
    index: 'A',
    title: 'A',
    cities: [
      { id: 4, name: '安庆', code: '0556' },
      { id: 5, name: '安阳', code: '0372' }
    ]
  },
  {
    index: 'B',
    title: 'B',
    cities: [
      { id: 6, name: '北京', code: '010' },
      { id: 7, name: '保定', code: '0312' }
    ]
  }
])

const handleIndexChange = (index: string | number) => {
  console.log('当前激活索引:', index)
  // 可以在这里处理索引变化逻辑，如统计、动画等
}

const handleCitySelect = (city: City) => {
  console.log('选择城市:', city)
  // 处理城市选择逻辑
}
</script>
```

### 示例4：特殊场景 - 多级索引

```vue
<template>
  <wd-index-bar :sticky="true">
    <!-- 一级索引：省份 -->
    <wd-index-anchor index="省份" custom-class="province-anchor">
      <text class="level-text">省份分类</text>
    </wd-index-anchor>
    
    <wd-cell-group>
      <wd-cell title="北京市" @click="expandCity('北京')" />
      <wd-cell title="上海市" @click="expandCity('上海')" />
    </wd-cell-group>

    <!-- 二级索引：城市（动态显示） -->
    <template v-if="expandedProvince">
      <wd-index-anchor 
        :index="expandedProvince" 
        custom-class="city-anchor"
      >
        <text class="level-text">{{ expandedProvince }} - 城市列表</text>
      </wd-index-anchor>
      
      <wd-cell-group>
        <wd-cell 
          v-for="district in getDistricts(expandedProvince)" 
          :key="district"
          :title="district" 
        />
      </wd-cell-group>
    </template>
  </wd-index-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expandedProvince = ref<string>('')

const expandCity = (province: string) => {
  expandedProvince.value = expandedProvince.value === province ? '' : province
}

const getDistricts = (province: string) => {
  // 模拟区县数据
  const districts: Record<string, string[]> = {
    '北京': ['东城区', '西城区', '朝阳区', '海淀区'],
    '上海': ['黄浦区', '徐汇区', '长宁区', '静安区']
  }
  return districts[province] || []
}
</script>

<style scoped>
.province-anchor {
  background-color: #e6f7ff;
  border-left: 4rpx solid #1890ff;
}

.city-anchor {
  background-color: #f6ffed;
  border-left: 4rpx solid #52c41a;
}

.level-text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
</style>
```

### 示例5：企业通讯录集成

```vue
<template>
  <view class="enterprise-contact">
    <wd-navbar title="企业通讯录" />
    
    <wd-index-bar :sticky="true">
      <!-- 企业部门索引 -->
      <wd-index-anchor index="部门" custom-class="department-anchor">
        <view class="department-header">
          <wd-icon name="users" size="16" />
          <text>部门组织</text>
        </view>
      </wd-index-anchor>
      
      <wd-cell-group>
        <wd-cell 
          v-for="dept in departments" 
          :key="dept.id"
          :title="dept.name" 
          :value="`${dept.memberCount}人`"
          @click="viewDepartment(dept)"
        />
      </wd-cell-group>

      <!-- 员工索引 -->
      <wd-index-anchor 
        v-for="letter in employeeLetters" 
        :key="letter"
        :index="letter"
      >
        <text>{{ letter }}</text>
      </wd-index-anchor>
      
      <wd-cell-group>
        <wd-cell 
          v-for="employee in employees" 
          :key="employee.id"
          :title="employee.name" 
          :value="employee.position"
          :label="employee.department"
          @click="contactEmployee(employee)"
        >
          <template #icon>
            <wd-avatar :src="employee.avatar" size="small" />
          </template>
        </wd-cell>
      </wd-cell-group>
    </wd-index-bar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Department {
  id: number
  name: string
  memberCount: number
}

interface Employee {
  id: number
  name: string
  position: string
  department: string
  avatar: string
}

const departments = ref<Department[]>([
  { id: 1, name: '技术部', memberCount: 25 },
  { id: 2, name: '产品部', memberCount: 15 },
  { id: 3, name: '设计部', memberCount: 8 }
])

const employees = ref<Employee[]>([
  { id: 1, name: '张三', position: '前端工程师', department: '技术部', avatar: '' },
  { id: 2, name: '李四', position: '产品经理', department: '产品部', avatar: '' }
])

const employeeLetters = ref<string[]>(['A', 'B', 'C', 'L', 'Z'])

const viewDepartment = (dept: Department) => {
  console.log('查看部门:', dept)
  // 跳转到部门详情页面
}

const contactEmployee = (employee: Employee) => {
  console.log('联系员工:', employee)
  // 打开员工详情或发起聊天
}
</script>

<style scoped>
.enterprise-contact {
  height: 100vh;
  background-color: #f5f5f5;
}

.department-anchor {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.department-header {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
</style>
```

## 样式定制指南

### 内置样式变量

组件使用以下主题变量，支持通过主题配置进行全局定制：

```scss
// 浅色主题
.wd-index-anchor {
  background-color: $-color-gray-2;  // 背景色
  color: $-color-title;             // 文字颜色
  font-size: 14px;                  // 字体大小
  padding: 10px;                    // 内边距
}

// 深色主题适配
.wot-theme-dark .wd-index-anchor {
  background-color: $-color-gray-8;  // 深色背景
  color: $-color-white;             // 深色文字
}
```

### 自定义样式方案

#### 1. 使用 customClass 定制样式类

```vue
<wd-index-anchor index="A" custom-class="my-anchor-style">
  A组内容
</wd-index-anchor>

<style>
.my-anchor-style {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8rpx;
  margin: 10rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.my-anchor-style.is-sticky {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}
</style>
```

#### 2. 使用 customStyle 内联样式

```vue
<wd-index-anchor 
  index="热门"
  custom-style="
    background: #ff6b6b;
    color: white;
    font-weight: 600;
    border-left: 4px solid #ff4757;
  "
>
  热门推荐
</wd-index-anchor>
```

#### 3. 平台差异化样式处理

```vue
<template>
  <!-- 钉钉小程序特殊处理 -->
  <!-- #ifdef MP-DINGTALK -->
  <view class="dingtalk-wrapper">
    <wd-index-anchor index="A" custom-class="dingtalk-anchor">
      A
    </wd-index-anchor>
  </view>
  <!-- #endif -->
  
  <!-- 其他平台 -->
  <!-- #ifndef MP-DINGTALK -->
  <wd-index-anchor index="A" custom-class="normal-anchor">
    A
  </wd-index-anchor>
  <!-- #endif -->
</template>

<style>
.dingtalk-anchor {
  /* 钉钉小程序特殊样式 */
  background-color: #f0f2f5;
  border: 1rpx solid #d9d9d9;
}

.normal-anchor {
  /* 其他平台通用样式 */
  background-color: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
}
</style>
```

### 样式覆盖最佳实践

1. **使用CSS变量**：优先通过主题变量进行全局样式定制
2. **层级控制**：合理使用 `!important` 确保样式优先级
3. **响应式适配**：使用 `rpx` 单位确保多端显示一致性
4. **性能优化**：避免过度复杂的CSS选择器

## 注意事项

### 常见问题解决方案

#### 1. 索引锚点不显示或位置错误

**问题原因：**
- 未正确嵌套在 `wd-index-bar` 组件内
- 索引值重复或格式不正确
- 组件未正确挂载导致位置计算失败

**解决方案：**
```vue
<!-- 正确用法 -->
<wd-index-bar>
  <wd-index-anchor index="A">A</wd-index-anchor>
  <!-- 内容区域 -->
</wd-index-bar>

<!-- 错误用法 -->
<wd-index-anchor index="A">A</wd-index-anchor> <!-- 缺少父组件 -->
```

#### 2. 吸顶效果不生效

**问题原因：**
- 父组件未启用 `sticky` 属性
- 平台兼容性问题（某些小程序平台限制）
- CSS样式冲突

**解决方案：**
```vue
<wd-index-bar :sticky="true"> <!-- 确保启用吸顶 -->
  <wd-index-anchor index="A">A</wd-index-anchor>
</wd-index-bar>
```

#### 3. 自定义内容显示异常

**问题原因：**
- 插槽内容样式冲突
- 平台特定的布局限制
- 组件层级问题

**解决方案：**
```vue
<wd-index-anchor index="A">
  <!-- 使用内联样式确保样式优先级 -->
  <view style="display: flex; align-items: center; gap: 8rpx;">
    <wd-icon name="star" />
    <text>A组</text>
  </view>
</wd-index-anchor>
```

### 性能优化建议

1. **避免频繁更新**：索引锚点数量较多时，避免频繁的数据更新
2. **合理分页**：超长列表建议使用虚拟滚动或分页加载
3. **缓存位置信息**：对于静态内容，可以缓存位置计算结果
4. **减少DOM操作**：使用CSS动画替代JavaScript动画

#### 技术限制

1. **必须嵌套使用**：必须作为 `wd-index-bar` 的子组件使用
2. **索引值唯一性**：同一 `wd-index-bar` 内的索引值必须唯一
3. **位置计算依赖**：依赖 `getRect` API，需要确保组件正确挂载
4. **样式隔离**：注意小程序平台的样式隔离机制
