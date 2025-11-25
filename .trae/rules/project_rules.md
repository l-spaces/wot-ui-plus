# wot-ui-plus TRAE 项目规则文档
wot-ui-plus 是一个基于 uni-app + Vue 3 + TypeScript 技术栈的跨平台UI组件库框架，旨在为开发者提供高质量、全端适配的UI组件解决方案。

## 一、项目核心定位与技术栈约束

### 1. 核心标识（强制不可修改）
- **项目名称**: wot-ui-plus（UniApp 跨端 UI 组件库）
- **组件前缀**: `wd-`（所有组件命名必须以 `wd-` 开头，采用 kebab-case 格式，如 `wd-button`、`wd-select`）
- **适配范围**: iOS/Android App（App Plus）、H5、主流小程序（微信/支付宝/百度/字节跳动）
- **核心目标**: 打造 **类型安全、跨端一致、高性能、易扩展、文档友好** 的 UniApp 专属 UI 组件库

### 2. 技术栈规范（禁止偏离）
| 技术维度       | 具体要求                                                                 |
|----------------|--------------------------------------------------------------------------|
| 框架核心       | Vue3 （强制使用 `<script setup>` 语法糖 + Composition API，禁止 Options API） |
| 类型系统       | TypeScript 5.0+（`tsconfig.json` 开启 `strict: true`，禁止无注释 `any` 类型） |
| 样式方案       | SCSS 预处理器 + 统一主题变量体系（支持外部覆盖）                          |
| 构建工具       | UniApp 原生构建 + 按需引入插件（`unplugin-vue-components` + `unplugin-auto-import`，组件注册前缀 `wd-`） |
| 类型依赖       | 基于 `@vue/runtime-core` + `@dcloudio/types`（UniApp 类型声明）            |
| 兼容版本       | iOS ≥ 13.0、Android ≥ 9.0、微信小程序基础库 ≥ 2.24.0、现代浏览器（Chrome ≥ 88、Safari ≥ 14） |

## 二、组件开发规范

### 1. 组件文件结构
```
wd-component/
├── wd-component.vue      # 组件主文件
├── types.ts              # 类型定义文件
├── index.ts              # 组件导出文件
├── README.md             # 组件说明文档
└── style/                # 样式目录
    ├── index.scss        # 主样式文件
    └── [platform].scss   # 平台特定样式（可选）
```

### 2. 组件命名规范
- **组件名**: 必须使用 `wd-` 前缀，采用 kebab-case 格式（如 `wd-button`）
- **组件类名**: CSS 类名使用 BEM 规范，如 `.wd-button__content`, `.wd-button--primary`
- **TypeScript 接口/类型**: 组件相关类型使用 PascalCase，如 `ButtonProps`, `ButtonType`

### 3. Vue 组件实现规范
- **强制使用 `<script setup lang="ts">`**: 所有组件必须使用 `<script setup>` 语法糖
- **组件属性定义**: 使用 `defineProps` 并配合 `ExtractPropTypes` 实现类型安全
- **事件定义**: 使用 `defineEmits` 明确定义事件类型
- **组件选项配置**: 必须设置 `addGlobalClass: true` 和 `styleIsolation: 'shared'` 以支持主题覆盖

```vue
<script lang="ts">
export default {
  name: 'wd-component',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
// 使用 defineProps 和 defineEmits
</script>
```

### 4. TypeScript 规范
- **禁止使用无注释的 `any` 类型**
- **类型定义集中管理**: 所有类型定义必须放在 `types.ts` 文件中
- **使用联合类型**: 对于有限的选项值，使用联合类型而非字符串类型
- **使用 `ExtractPropTypes`**: 从 props 对象提取类型信息

```typescript
// 正确示例
export type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'
export const buttonProps = {
  type: makeStringProp<ButtonType>('primary')
}
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
```

### 5. 样式规范
- **使用 SCSS 变量**: 颜色、字体大小等使用主题变量
- **平台差异化处理**: 使用 UniApp 条件编译（`#ifdef` / `#ifndef`）处理平台差异
- **避免硬编码样式**: 所有样式值应从主题变量或 props 中获取
- **响应式适配**: 使用 `rpx` 单位进行响应式布局

## 三、跨端适配要求

### 1. 平台覆盖优先级
1. **微信小程序**: 核心优先适配平台
2. **H5**: 确保浏览器兼容性
3. **App (iOS/Android)**: 处理原生平台特性
4. **其他小程序**: 支付宝、百度、字节跳动等

### 2. 条件编译规范
```vue
<!-- #ifdef MP-WEIXIN -->
微信小程序特有代码
<!-- #endif -->

<!-- #ifdef H5 -->
H5特有代码
<!-- #endif -->

<!-- #ifdef APP-PLUS -->
App特有代码
<!-- #endif -->
```

### 3. 平台差异化处理
- **DOM API**: 避免直接使用 `document` / `window`，使用 `uni.createSelectorQuery()`
- **样式兼容性**: 注意不同平台的样式差异，如小程序的 `rpx` vs H5 的 `rem`
- **组件生命周期**: 注意平台间生命周期的差异
- **事件机制**: 小程序和 H5 的事件处理有差异，需统一处理

## 四、开发流程与最佳实践

### 1. 组件开发流程
1. **需求分析**: 明确组件功能、属性、事件和跨端要求
2. **设计先行**: 确定组件 API 设计和类型定义
3. **核心实现**: 开发组件主体功能，确保类型安全
4. **跨端适配**: 使用条件编译处理平台差异
5. **测试验证**: 在各平台进行测试，确保功能一致
6. **文档编写**: 完善组件文档和示例

### 2. 性能优化要求
- **按需加载**: 支持组件按需引入
- **避免不必要的渲染**: 使用 `computed`、`shallowRef` 等优化性能
- **小程序特殊优化**: 注意小程序的性能限制，避免频繁更新数据
- **图片优化**: 使用 `wd-img` 组件处理图片加载和优化

### 3. 代码质量要求
- **代码风格**: 遵循项目 ESLint 和 Prettier 配置
- **注释规范**: 组件、函数、类型定义必须有清晰注释
- **测试覆盖率**: 核心功能必须有单元测试
- **避免使用废弃 API**: 使用 UniApp 和 Vue3 的最新 API

## 五、TRAE 交互规则

### 1. 需求澄清优先级（必问核心信息）
1. **组件核心功能**: 明确组件的主要功能和使用场景
2. **跨端适配优先级**: 确定需要优先适配的平台
3. **设计规范**: 确认组件的样式要求，对齐主题体系
4. **扩展需求**: 了解是否需要支持自定义模板、事件回调等
5. **性能约束**: 确认是否有特殊的性能要求

### 2. 回答结构要求
TRAE 在回答组件开发相关问题时，必须包含以下结构：

```markdown
### 一、核心实现思路
1. Vue3+TS+UniApp 适配：（具体实现方案）
2. 跨端核心方案：（跨端兼容处理）
3. 组件前缀规范：（明确使用 `wd-` 前缀）

### 二、完整代码实现
#### 1. 组件主文件
（包含模板、脚本和基础样式）

#### 2. 类型定义
（Props、Emit、接口定义）

### 三、多端适配说明
（平台差异点和解决方案）

### 四、使用示例
（基础用法和扩展用法）

### 五、注意事项
（类型约束、性能优化、平台限制等）
```

## 六、项目特有配置与工具

### 1. 主题配置
- 主题变量位于 `src/theme.json`
- 支持运行时主题切换和编译时主题定制
- 组件样式必须使用主题变量，禁止硬编码颜色值

### 2. 国际化支持
- 使用 `Locale` 组件实现多语言支持
- 组件文本必须支持国际化配置
- 语言包位于 `src/uni_modules/wot-ui-plus/locale/lang/`

### 3. 构建命令
```bash
# 开发命令
pnpm run dev:h5        # H5 开发
pnpm run dev:mp-weixin # 微信小程序开发
pnpm run dev:app       # App 开发

# 构建命令
pnpm run build:h5      # H5 构建
pnpm run build:mp-weixin # 微信小程序构建
pnpm run build:app     # App 构建
```

## 七、禁止项

1. **禁止修改组件前缀**: 所有组件必须使用 `wd-` 前缀
2. **禁止使用 Options API**: 必须使用 Composition API 和 `<script setup>`
3. **禁止无类型定义**: 所有 props 和 emit 必须有明确的 TypeScript 类型
4. **禁止使用废弃 API**: 避免使用已标记为废弃的 UniApp 或 Vue API
5. **禁止硬编码样式**: 颜色、尺寸等必须使用主题变量
6. **禁止忽略跨端兼容性**: 所有代码必须考虑多平台适配

## 八、版本控制与发布

### 1. 版本规范
- 遵循语义化版本规范（Semantic Versioning）
- 版本号格式：`x.y.z`（主版本.次版本.修订版本）

### 2. 提交规范
- 遵循 Angular 提交规范
- 提交信息格式：`type(scope): subject`
- 类型包括：`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

本规则文档适用于 wot-ui-plus 组件库的开发过程，TRAE 在参与项目开发时必须严格遵守以上规范，确保代码质量和项目一致性。
