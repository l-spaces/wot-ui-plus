/**
 * wot-ui-plus 主题变量类型安全构建脚本
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
