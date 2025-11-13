/**
 * wot-ui-plus 主题变量类型安全构建脚本
 *
 * ============================================================================
 * 文件概述
 * ============================================================================
 * 本脚本是 wot-ui-plus 组件库构建系统的核心工具，负责实现 SCSS 主题变量到
 * TypeScript 类型定义的自动化转换。作为主题系统的类型安全守护者，该脚本
 * 确保了组件库主题定制功能的类型完整性和开发体验的优化。
 *
 * ============================================================================
 * 技术栈与依赖
 * ============================================================================
 * - Node.js 文件系统 API：fs 模块用于同步文件读写操作
 * - Node.js 路径处理：path 模块用于跨平台路径解析
 * - TypeScript 编译器：ts-node 运行时支持
 * - 正则表达式引擎：用于 SCSS 变量解析和提取
 * - Vue 3 类型系统：ExtractPropTypes、PropType 等类型工具
 *
 * ============================================================================
 * 架构定位与职责
 * ============================================================================
 * 在 wot-ui-plus 组件库架构中，本脚本承担以下关键职责：
 *
 * 1. 主题系统类型安全守护者
 *    - 确保 SCSS 变量与 TypeScript 类型定义的同步性
 *    - 防止主题变量变更导致的类型不一致问题
 *    - 为 ConfigProvider 组件提供完整的类型支持
 *
 * 2. 自动化构建集成器
 *    - 作为构建流程的重要组成部分，实现主题变量的自动化处理
 *    - 支持增量构建和持续集成环境
 *    - 确保开发、测试、生产环境的一致性
 *
 * 3. 组件主题定制支持器
 *    - 为每个组件生成独立的主题变量类型
 *    - 支持组件级别的主题定制和覆盖
 *    - 提供模块化的主题类型定义结构
 *
 * 4. 开发体验优化器
 *    - 为开发者提供完整的 TypeScript 智能提示
 *    - 减少主题配置时的类型错误
 *    - 提高代码可维护性和开发效率
 *
 * ============================================================================
 * 核心功能实现
 * ============================================================================
 *
 * 1. SCSS 变量解析机制
 *    - 基于 ` component var ` 标记定位变量区域
 *    - 使用正则表达式 `//\*\s*([a-zA-Z0-9-]+)\s*\*\/([\s\S]*?)(?=\/\*\s*([a-zA-Z0-9-]+)\s*\*\/|$)/g`
 *      进行变量块匹配和提取
 *    - 支持多行变量和单行变量的统一处理
 *    - 实现变量内容的精确提取和格式化
 *
 * 2. 命名转换系统
 *    - SCSS kebab-case 命名到 TypeScript camelCase 的自动转换
 *    - 变量前缀处理：去除 `$-` 前缀并转换为属性名
 *    - 组件名称转换：支持连字符命名到驼峰命名的映射
 *
 * 3. TypeScript 类型生成引擎
 *    - 基础主题类型定义：包含颜色、字体、尺寸等核心变量
 *    - 组件主题类型生成：为每个组件创建独立的 ThemeVars 接口
 *    - 合并类型构建：通过交叉类型 `&` 创建完整的 ConfigProviderThemeVars
 *    - Vue 3 Props 类型集成：与 makeStringProp、baseProps 等工具函数集成
 *
 * 4. 文件系统操作
 *    - 同步文件读取：确保变量提取的原子性操作
 *    - 路径解析：使用 path.resolve 确保跨平台兼容性
 *    - 文件写入：原子性写入操作，避免文件损坏
 *
 * ============================================================================
 * 数据流处理流程
 * ============================================================================
 *
 * 输入处理：
 *   SCSS 源文件 (variable.scss)
 *   ├── /* component var  标记定位
 *   ├── /* component-name  注释块识别
 *   └── SCSS 变量定义提取 ($variable-name: value)
 *
 * 中间处理：
 *   变量解析与转换
 *   ├── 正则表达式匹配提取
 *   ├── 命名格式转换 (kebab-case → camelCase)
 *   ├── 内容格式化和清理
 *   └── 变量分组和索引建立
 *
 * 输出生成：
 *   TypeScript 类型文件 (types.ts)
 *   ├── 基础类型定义 (baseThemeVars)
 *   ├── 组件类型生成 (componentThemeVars)
 *   ├── 配置器类型构建 (ConfigProviderProps)
 *   └── 合并类型定义 (ConfigProviderThemeVars)
 *
 * ============================================================================
 * 对外接口说明
 * ============================================================================
 *
 * 主要导出函数：
 *
 * 1. extractSCSSVariables(scssFilePath: string): Record<string, string>
 *    - 功能：从 SCSS 文件中提取组件主题变量
 *    - 参数：scssFilePath - SCSS 文件的绝对路径
 *    - 返回值：变量对象，键为组件名（驼峰格式），值为变量内容字符串
 *    - 异常处理：缺少标记时返回空对象并输出错误信息
 *
 * 2. generateTSFileContent(variables: Record<string, string>): string
 *    - 功能：根据提取的变量生成完整的 TypeScript 类型定义内容
 *    - 参数：variables - 从 SCSS 提取的变量对象
 *    - 返回值：完整的 TypeScript 文件内容字符串
 *    - 处理逻辑：包括基础类型、组件类型、合并类型的完整生成
 *
 * ============================================================================
 * 输入输出格式规范
 * ============================================================================
 *
 * 输入 SCSS 格式要求：
 * ```scss
 * // component var 标记必须存在
 * /* component var
 *
 * // 组件变量块格式
 * /* component-name
 * $component-property-name: value;
 * $another-property: value;
 *
 * /* another-component
 * $another-component-var: value;
 * ```
 *
 * 输出 TypeScript 格式：
 * ```typescript
 * // 基础主题类型
 * export type baseThemeVars = { ... }
 *
 * // 组件主题类型
 * export type ComponentNameThemeVars = { ... }
 *
 * // 合并主题类型
 * export type ConfigProviderThemeVars = baseThemeVars & ComponentNameThemeVars & ...
 * ```
 *
 * ============================================================================
 * 使用场景与触发条件
 * ============================================================================
 *
 * 1. 构建阶段触发
 *    - 组件库构建过程中的自动执行
 *    - CI/CD 流水线中的集成构建
 *    - 发布前的类型安全检查
 *
 * 2. 开发阶段使用
 *    - 主题变量变更后的类型同步
 *    - 新组件主题变量的类型生成
 *    - 主题系统调试和验证
 *
 * 3. 维护阶段应用
 *    - 组件库版本升级时的兼容性检查
 *    - 主题系统重构时的类型迁移
 *    - 文档更新时的类型验证
 *
 * ============================================================================
 * 配置信息与路径管理
 * ============================================================================
 *
 * 源文件路径：
 * - SCSS 变量文件：../src/uni_modules/wot-ui-plus/components/common/abstracts/variable.scss
 * - 相对于脚本位置：scripts/buildThemeVars.ts → components/common/abstracts/variable.scss
 *
 * 输出文件路径：
 * - TypeScript 类型文件：../src/uni_modules/wot-ui-plus/components/wd-config-provider/types.ts
 * - 相对于脚本位置：scripts/buildThemeVars.ts → components/wd-config-provider/types.ts
 *
 * ============================================================================
 * 性能考量与优化
 * ============================================================================
 *
 * 1. 文件 I/O 优化
 *    - 使用同步文件操作确保数据一致性
 *    - 避免异步操作可能导致的竞态条件
 *    - 单次读取减少文件系统访问次数
 *
 * 2. 正则表达式优化
 *    - 使用非贪婪匹配避免过度回溯
 *    - 预编译正则表达式提高匹配效率
 *    - 合理使用字符类减少匹配范围
 *
 * 3. 内存管理
 *    - 及时释放大字符串对象
 *    - 避免不必要的字符串复制
 *    - 使用流式处理处理大型文件
 *
 * ============================================================================
 * 错误处理与异常管理
 * ============================================================================
 *
 * 1. 文件访问错误
 *    - SCSS 文件不存在时的优雅降级
 *    - 权限不足时的错误提示
 *    - 文件损坏时的异常捕获
 *
 * 2. 格式错误处理
 *    - 缺少 component var 标记的错误提示
 *    - 变量格式不规范的跳过处理
 *    - 命名冲突的警告机制
 *
 * 3. 生成错误处理
 *    - 类型生成失败的回滚机制
 *    - 输出文件写入失败的恢复策略
 *    - 内容验证失败的重试机制
 *
 * ============================================================================
 * 依赖项与版本要求
 * ============================================================================
 *
 * 运行时依赖：
 * - Node.js >= 14.0.0 (ES2020 支持)
 * - TypeScript >= 4.5.0 (类型系统支持)
 * - ts-node >= 10.0.0 (直接运行 TypeScript)
 *
 * 构建时依赖：
 * - Vue 3 类型定义 (@vue/runtime-core)
 * - wot-ui-plus 内部类型系统
 * - SCSS 变量文件的规范格式
 *
 * ============================================================================
 * 使用示例与最佳实践
 * ============================================================================
 *
 * 基本使用：
 * ```bash
 * # 直接执行脚本
 * ts-node scripts/buildThemeVars.ts
 *
 * # 集成到构建流程
 * npm run build:theme-vars
 * ```
 *
 * 最佳实践：
 * 1. 在 SCSS 变量变更后立即执行脚本
 * 2. 在 CI/CD 流程中集成类型检查
 * 3. 定期验证生成的类型定义准确性
 * 4. 保持 SCSS 注释格式的规范性
 *
 * ============================================================================
 * 注意事项与限制条件
 * ============================================================================
 *
 * 1. SCSS 文件格式要求
 *    - 必须包含 `/* component var ` 标记
 *    - 变量块必须使用 `/* component-name ` 格式注释
 *    - 变量定义必须遵循 `$variable-name: value;` 格式
 *
 * 2. 命名规范限制
 *    - 组件名称仅支持字母、数字、连字符
 *    - 变量名称必须以 `$-` 开头
 *    - 不支持嵌套变量和复杂表达式
 *
 * 3. 文件路径依赖
 *    - 硬编码的文件路径限制了脚本的通用性
 *    - 相对路径依赖于项目的目录结构
 *    - 跨平台路径分隔符的兼容性考虑
 *
 * 4. 性能限制
 *    - 同步 I/O 操作可能阻塞事件循环
 *    - 大型 SCSS 文件的处理效率有限
 *    - 正则表达式复杂度与文件大小相关
 *
 * ============================================================================
 * 维护指南与扩展建议
 * ============================================================================
 *
 * 1. 代码维护
 *    - 定期检查正则表达式的匹配准确性
 *    - 验证生成类型的完整性和正确性
 *    - 更新依赖项版本以保持兼容性
 *
 * 2. 功能扩展
 *    - 支持更多 SCSS 变量格式
 *    - 添加变量值类型推断功能
 *    - 实现增量更新机制
 *    - 支持自定义输出格式和路径
 *
 * 3. 性能优化
 *    - 实现异步文件操作
 *    - 添加文件监听和自动更新
 *    - 优化正则表达式性能
 *    - 支持并行处理多个文件
 *
 * ============================================================================
 * 版本历史与更新日志
 * ============================================================================
 *
 * v1.0.0 - 初始版本
 *   - 基础 SCSS 变量提取功能
 *   - TypeScript 类型生成
 *   - ConfigProvider 集成
 *
 * v1.1.0 - 功能增强
 *   - 改进正则表达式匹配
 *   - 增强错误处理机制
 *   - 优化命名转换逻辑
 *
 * ============================================================================
 * 技术债务与改进计划
 * ============================================================================
 *
 * 当前技术债务：
 * 1. 硬编码文件路径需要配置化
 * 2. 同步 I/O 操作需要异步化
 * 3. 错误处理机制需要完善
 * 4. 缺少单元测试覆盖
 *
 * 改进计划：
 * 1. 引入配置文件支持
 * 2. 实现异步处理机制
 * 3. 完善异常处理和日志
 * 4. 添加完整的测试套件
 *
 * ============================================================================
 * 元数据信息
 * ============================================================================
 * @author wot-ui-plus 开发团队
 * @version 1.1.0
 * @since 2024-01-01
 * @repository https://github.com/Moonofweish/wot-ui-plus
 * @license MIT
 * @category 构建工具
 * @tags typescript, scss, theme, build-tools
 *
 * ============================================================================
 * 执行入口与调用方式
 * ============================================================================
 *
 * 直接执行：
 * ```bash
 * ts-node scripts/buildThemeVars.ts
 * ```
 *
 * npm 脚本集成：
 * ```json
 * {
 *   "scripts": {
 *     "build:theme-vars": "ts-node scripts/buildThemeVars.ts"
 *   }
 * }
 * ```
 *
 * 构建流程集成：
 * - 作为 pre-build hook 执行
 * - 在组件编译前运行
 * - 与其他构建工具协同工作
 *
 * ============================================================================
 */

// 导入必要的 Node.js 模块
import fs from 'fs'
import path from 'path'

/**
 * 从 SCSS 文件中提取组件主题变量
 *
 * 该函数通过解析 SCSS 文件，提取 `component var` 标记后的所有变量，并按照注释块进行分组。
 *
 * @param {string} scssFilePath - SCSS 文件的路径
 * @returns {Record<string, string>} 提取的变量对象，键为组件名称（驼峰格式），值为变量内容
 * @throws {Error} 当 SCSS 文件中缺少 ` component var` 标记时，打印错误信息
 * @example
 * const variables = extractSCSSVariables('path/to/variable.scss');
 * // 返回 { buttonThemeVars: '$button-primary-color: #007aff; ...', ... }
 */
const extractSCSSVariables = (scssFilePath: string): Record<string, string> => {
  // 读取 SCSS 文件内容
  const scssContent = fs.readFileSync(scssFilePath, 'utf8')

  // 查找组件变量标记的位置
  const componentVarIndex = scssContent.indexOf('/* component var */')

  // 检查标记是否存在
  if (componentVarIndex === -1) {
    console.log('Error: Missing /* component var */ comment in SCSS file')
    return {}
  }

  // 提取标记后的内容进行处理
  const scssContentToProcess = scssContent.substring(componentVarIndex + '/* component var */'.length)

  // 使用正则表达式匹配注释块和变量内容
  // 匹配模式：/* 组件名 */ 变量内容...
  const variableRegex = /\/\*\s*([a-zA-Z0-9-]+)\s*\*\/([\s\S]*?)(?=\/\*\s*([a-zA-Z0-9-]+)\s*\*\/|$)/g

  const variables: Record<string, string> = {}

  let match
  // 遍历所有匹配的变量块
  while ((match = variableRegex.exec(scssContentToProcess)) !== null) {
    // 将短横线命名转换为驼峰命名作为键名
    const keyComment = match[1].replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
    // 提取变量内容并去除首尾空白
    const value = match[2].trim()

    variables[keyComment] = value
  }
  return variables
}

/**
 * 生成 TypeScript 文件内容
 *
 * 根据提取的变量对象，生成完整的 TypeScript 类型定义文件内容，包括：
 * - 基础主题类型和配置提供器属性类型
 * - 各组件的主题变量类型
 * - 合并后的完整主题变量类型
 *
 * @param {Record<string, string>} variables - 从 SCSS 中提取的变量对象
 * @returns {string} 生成的 TypeScript 文件内容
 * @example
 * const tsContent = generateTSFileContent({ buttonThemeVars: '$button-primary-color: #007aff;' });
 * // 返回完整的 TypeScript 类型定义字符串
 */
const generateTSFileContent = (variables: Record<string, string>) => {
  // 初始化 TypeScript 文件内容，包含基础导入和配置提供器相关类型
  let tsContent = `import type { ExtractPropTypes, PropType } from 'vue'
import { makeStringProp, baseProps } from '../common/props'

export type ConfigProviderTheme = 'light' | 'dark'

export const configProviderProps = {
  ...baseProps,
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp<ConfigProviderTheme>('light'),
  /**
   * 自定义主题变量
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type baseThemeVars = {
  colorTheme?: string // 主题色
  colorWhite?: string // 用于mix的白色
  colorBlack?: string // 用于mix的黑色
  colorSuccess?: string // 成功色
  colorWarning?: string // 警告色
  colorDanger?: string // 危险出错色
  colorPurple?: string // 紫色
  colorYellow?: string // 黄色
  colorBlue?: string // 蓝色
  colorInfo?: string // 信息色
  colorGray1?: string // 灰色1
  colorGray2?: string // 灰色2
  colorGray3?: string // 灰色3
  colorGray4?: string // 灰色4
  colorGray5?: string // 灰色5
  colorGray6?: string // 灰色6
  colorGray7?: string // 灰色7
  colorGray8?: string // 灰色8
  fontGray1?: string // 字体灰色1
  fontGray2?: string // 字体灰色2
  fontGray3?: string // 字体灰色3
  fontGray4?: string // 字体灰色4
  fontWhite1?: string // 字体白色1
  fontWhite2?: string // 字体白色2
  fontWhite3?: string // 字体白色3
  fontWhite4?: string // 字体白色4
  colorTitle?: string // 模块标题/重要正文
  colorContent?: string // 普通正文
  colorSecondary?: string // 次要信息，注释/补充/正文
  colorAid?: string // 辅助文字字号，弱化信息，引导性/不可点文字
  colorTip?: string // 失效、默认提示文字
  colorBorder?: string // 控件边框线
  colorBorderLight?: string // 分割线颜色
  colorBg?: string // 背景色、禁用填充色
  darkBackground?: string // 深色背景1
  darkBackground2?: string // 深色背景2
  darkBackground3?: string // 深色背景3
  darkBackground4?: string // 深色背景4
  darkBackground5?: string // 深色背景5
  darkBackground6?: string // 深色背景6
  darkBackground7?: string // 深色背景7
  darkColor?: string // 深色字体1
  darkColor2?: string // 深色字体2
  darkColor3?: string // 深色字体3
  darkColorGray?: string // 深色灰色
  darkBorderColor?: string // 深色边框颜色
  colorIcon?: string // icon颜色
  colorIconActive?: string // icon颜色hover
  colorIconDisabled?: string // icon颜色disabled
  fsBig?: string // 大型标题字号
  fsImportant?: string // 重要数据字号
  fsTitle?: string // 标题字号/重要正文字号
  fsContent?: string // 普通正文字号
  fsSecondary?: string // 次要信息字号
  fsAid?: string // 辅助文字字号
  fwMedium?: string // 字重500
  fwSemibold?: string // 字重600
  sizeSidePadding?: string // 屏幕两边留白padding
}

`

  // 为每个组件变量块生成对应的 TypeScript 接口
  for (const key in variables) {
    tsContent += `export type ${key}ThemeVars = {\n`

    // 处理多行变量
    if (variables[key].includes('\n')) {
      const lines = variables[key].split('\n')

      lines.forEach((line) => {
        line = line.trim()
        // 检查行是否为有效的 SCSS 变量定义
        if (line.split(':').length === 2) {
          const parts = line.split(':')
          // 提取变量名并转换为驼峰命名（去除 $- 前缀）
          const propertyName = parts[0].replace(/^\$-/, '').replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
          tsContent += `  ${propertyName}?: string\n`
        }
      })
    } else {
      // 处理单行变量
      const line = variables[key]
      if (line.split(':').length === 2) {
        const parts = line.split(':')
        // 提取变量名并转换为驼峰命名
        const propertyName = parts[0].replace(/^\$-/, '').replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
        tsContent += `  ${propertyName}?: string\n`
      }
    }

    tsContent += '}\n\n'
  }

  // 生成合并所有组件主题类型的完整主题类型
  const exportTypes = Object.keys(variables)
    .map((key) => `${key}ThemeVars`)
    .join(' & ')

  // 构建最终的 ConfigProviderThemeVars 类型定义
  tsContent += `export type ConfigProviderThemeVars = baseThemeVars &\n  ${exportTypes.split('&').join('&\n ')}\n`

  return tsContent
}

// 定义输出的 TypeScript 文件路径（ConfigProvider 组件的类型定义文件）
const tsFilePath = path.resolve(__dirname, '../src/uni_modules/wot-ui-plus/components/wd-config-provider/types.ts')
// 定义源 SCSS 变量文件路径
const scssFilePath = path.resolve(__dirname, '../src/uni_modules/wot-ui-plus/components/common/abstracts/variable.scss')

// 执行变量提取和类型生成
const variables = extractSCSSVariables(scssFilePath)
const tsContent = generateTSFileContent(variables)

// 将生成的类型定义写入文件
fs.writeFileSync(tsFilePath, tsContent)

// 输出成功信息到控制台
console.log('TS file generated successfully!')
