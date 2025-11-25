/**
 * @fileoverview uni-app 条件编译 Vite 插件
 * @description
 * 本文件是 wot-ui-plus 项目中的核心构建工具插件，实现了 uni-app 条件编译语法的 Vite 插件版本。
 * 该插件在构建时处理多平台差异化代码，是实现"一套代码，多端运行"的核心技术支撑。
 *
 * 技术栈：TypeScript + Vite Plugin API + 正则表达式处理
 *
 * 核心设计思路：
 * 1. 构建时代码转换：在 Vite 构建过程中识别并处理条件编译语法，根据目标平台保留或移除相应代码块
 * 2. 多文件类型支持：统一处理 Vue、JavaScript/TypeScript、CSS/SCSS 等不同文件类型的条件编译
 * 3. 正则表达式引擎：使用精确的正则表达式匹配各种条件编译语法格式
 * 4. 平台匹配算法：实现灵活的平台条件匹配，支持完全匹配、部分匹配和逻辑表达式
 * 5. 测试环境适配：为单元测试和集成测试提供特殊的条件编译处理机制
 *
 * 主要功能：
 * - 处理 HTML 注释形式条件编译：使用 HTML 注释包裹的条件块
 * - 处理 JS 注释形式条件编译：使用单行或多行注释包裹的条件块
 * - 处理 CSS 注释形式条件编译：使用 CSS 注释包裹的条件块
 * - 处理 Vue 编译后条件编译：处理 Vue 编译生成的注释节点
 * - 支持逻辑表达式：逻辑与、逻辑或、逻辑非等操作符
 * - 支持平台匹配：H5、MP-WEIXIN、APP-PLUS 等平台标识
 *
 * 主要对外接口：
 * - 插件函数：vitePluginUniConditionalCompile(options: ConditionalCompileOptions): Plugin
 * - 配置选项：ConditionalCompileOptions 接口
 *   - include: FilterPattern - 包含的文件类型（默认：.vue, .js, .ts, .css, .scss）
 *   - exclude: FilterPattern - 排除的文件类型
 *   - platform: string - 目标平台（默认：'h5'）
 *   - isTest: boolean - 是否测试环境（自动检测 NODE_ENV 和 VITEST）
 *
 * 使用场景：
 * - 多端应用开发：一套代码适配 H5、微信小程序、App 等多个平台
 * - 组件库构建：为 wot-ui-plus 组件库提供跨端适配能力
 * - CI/CD 流程：在自动化构建中生成不同平台的构建产物
 * - 开发环境调试：本地开发时根据目标平台实时处理条件编译
 * - 单元测试：为测试环境提供特殊的条件编译处理
 *
 * 使用注意事项：
 * 1. 条件编译语法必须严格遵循 uni-app 规范，否则可能无法正确识别
 * 2. 插件在构建时处理，运行时无法动态改变平台条件
 * 3. 正则表达式匹配可能受代码格式影响，建议保持标准格式
 * 4. 测试环境下的特殊处理主要用于单元测试，生产构建时需明确指定平台
 * 5. 错误处理采用容错机制，构建出错时返回原始代码避免阻塞流程
 * 6. 平台匹配支持大小写不敏感，但建议使用标准的平台标识符
 * 7. 复杂的逻辑表达式可能影响构建性能，建议保持简洁
 * 8. 条件注释是 uniapp 特有语法，插件会正确处理这些注释，不会被误删
 *
 * 性能优化：
 * - 使用 createFilter 进行文件过滤，避免处理无关文件
 * - 正则表达式预编译，减少重复编译开销
 * - 错误容错机制，避免单个文件错误影响整体构建
 * - 条件判断优化，优先处理简单条件再处理复杂表达式
 *
 */

import { createFilter, type FilterPattern } from '@rollup/pluginutils'
import type { Plugin, TransformResult } from 'vite'

interface ConditionalCompileOptions {
  include?: FilterPattern
  exclude?: FilterPattern
  platform?: string
  /**
   * 是否在测试环境中
   * 在测试环境中，我们可能需要特殊处理一些条件编译代码
   */
  isTest?: boolean
}

/**
 * uni-app条件编译插件
 * 用于处理uni-app的条件编译代码
 */
export default function vitePluginUniConditionalCompile(options: ConditionalCompileOptions = {}): Plugin {
  const {
    include = [/\.vue$/, /\.js$/, /\.ts$/, /\.css$/, /\.scss$/],
    exclude = [],
    platform = 'h5',
    isTest = process.env.NODE_ENV === 'test' || process.env.VITEST
  } = options

  // 在测试环境中，我们需要处理所有文件，包括测试文件
  const filter = (id: string) => {
    // 如果是测试文件，直接返回true
    if (isTest && (id.includes('test.') || id.endsWith('.test.ts') || id.endsWith('.test.js'))) {
      return true
    }
    // 否则使用createFilter
    return createFilter(include, exclude)(id)
  }

  // 匹配条件编译注释的正则
  // 处理HTML注释形式的条件编译
  const htmlConditionalPattern = /<!--\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)\s*-->([\s\S]*?)<!--\s*#endif\s*-->/g

  // 处理Vue编译后的条件编译注释
  const vueCompiledConditionalPattern =
    /_createCommentVNode\(\s*["']#(ifdef|ifndef)\s+([\w|&!\-\s]+)["']\s*\)([\s\S]*?)_createCommentVNode\(\s*["']#endif["']\s*\)/g

  // 处理JS注释形式的条件编译 - 单行注释
  const jsConditionalPattern = /\/\/\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)[\r\n]([\s\S]*?)[\r\n]\s*\/\/\s*#endif/g

  // 处理多行JS注释形式的条件编译
  const jsMultilineConditionalPattern = /\/\*\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)\s*\*\/([\s\S]*?)\/\*\s*#endif\s*\*\//g

  // 处理CSS注释形式的条件编译
  const cssConditionalPattern = /\/\*\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)\s*\*\/([\s\S]*?)\/\*\s*#endif\s*\*\//g

  return {
    name: 'vite-plugin-uni-conditional-compile',

    transform(code: string, id: string): TransformResult | undefined {
      if (!filter(id)) return undefined
      let transformed = code
      try {
        // 处理HTML条件块
        transformed = transformed.replace(htmlConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理Vue编译后的条件编译注释
        transformed = transformed.replace(vueCompiledConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理JS单行注释条件块
        transformed = transformed.replace(jsConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理JS多行注释条件块
        transformed = transformed.replace(jsMultilineConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理CSS注释形式的条件编译
        if (id.endsWith('.css') || id.endsWith('.scss') || id.endsWith('.less') || id.includes('style')) {
          transformed = transformed.replace(cssConditionalPattern, (_match, type, envExp, content) => {
            return processCondition(type, envExp, content, platform, isTest as boolean)
          })
        }

        // 返回处理结果
        if (transformed !== code) {
          return {
            code: transformed,
            map: null // 可选生成 sourcemap
          }
        }

        // 如果代码没有变化，但是在测试环境中，我们仍然返回结果
        if (isTest && (id.includes('test.') || id.endsWith('.test.ts') || id.endsWith('.test.js'))) {
          return {
            code: transformed,
            map: null
          }
        }
      } catch (error) {
        console.error(`Error processing conditional compilation in file ${id}:`, error)
        // 在出错的情况下，返回原始代码，避免阻塞构建过程
        return {
          code,
          map: null
        }
      }

      return undefined
    }
  }
}

/**
 * 处理条件表达式
 * @param type 条件类型 ifdef 或 ifndef
 * @param envExp 环境表达式
 * @param content 条件块内容
 * @param platform 当前平台
 * @param isTest 是否在测试环境中
 * @returns 处理后的内容
 */
function processCondition(type: string, envExp: string, content: string, platform: string, isTest: boolean = false): string {
  // 在测试环境中，我们可能需要特殊处理一些条件
  if (isTest) {
    // 如果是测试环境，并且条件中包含测试相关的平台，则保留内容
    if (envExp.toUpperCase().includes('TEST') || envExp.toUpperCase().includes('VITEST')) {
      return content
    }
  }

  // 处理逻辑或表达式 (||)
  if (envExp.includes('||')) {
    const orParts = envExp.split(/\s*\|\|\s*/)
    const orResult = orParts.some((part) => evaluateCondition(part.trim(), platform))
    return (type === 'ifdef' && orResult) || (type === 'ifndef' && !orResult) ? content : ''
  }

  // 处理逻辑与表达式 (&&)
  if (envExp.includes('&&')) {
    const andParts = envExp.split(/\s*&&\s*/)
    const andResult = andParts.every((part) => evaluateCondition(part.trim(), platform))
    return (type === 'ifdef' && andResult) || (type === 'ifndef' && !andResult) ? content : ''
  }

  // 处理简单表达式
  const isMatch = evaluateCondition(envExp, platform)
  const shouldKeep = (type === 'ifdef' && isMatch) || (type === 'ifndef' && !isMatch)

  return shouldKeep ? content : ''
}

/**
 * 评估单个条件
 * @param condition 条件表达式
 * @param platform 当前平台
 * @returns 条件是否匹配
 */
function evaluateCondition(condition: string, platform: string): boolean {
  // 处理空条件
  if (!condition.trim()) {
    return false
  }

  const isNegate = condition.startsWith('!')
  const targetEnv = isNegate ? condition.slice(1).trim() : condition.trim()

  // 平台名称可能是大写或小写，需要进行不区分大小写的比较
  const currentPlatform = platform.toUpperCase()
  const targetPlatform = targetEnv.toUpperCase()

  // 检查平台是否匹配
  // 支持完全匹配和部分匹配
  let matched = false

  // 完全匹配
  if (targetPlatform === currentPlatform) {
    matched = true
  }

  // 特殊处理：如果条件是 MP-WEIXIN，而平台是 WEIXIN，也应该匹配
  // 或者条件是 WEIXIN，而平台是 MP-WEIXIN，也应该匹配
  if (targetPlatform.includes(currentPlatform) || currentPlatform.includes(targetPlatform)) {
    matched = true
  }

  // 如果是否定条件，则取反
  return isNegate ? !matched : matched
}
