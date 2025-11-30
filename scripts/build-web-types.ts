/**
 * WebTypes 元数据生成构建脚本
 *
 * @fileoverview wot-ui-plus 组件库的 IDE 智能提示支持文件生成工具
 *
 *
 * @api-interface
 * 该脚本主要通过命令行调用，无对外 API 接口：
 * ```bash
 * ts-node scripts/build-web-types.ts
 * ```
 *
 * @configuration
 * - 文档目录：docs/component/*.md
 * - 输出目录：src/uni_modules/wot-ui-plus/
 * - 组件前缀：wd-
 * - 文档站点：https://wot-ui-plus.cn/component/
 *
 * @usage-scenarios
 * - 构建流程：作为 npm run build 的一部分自动执行
 * - 开发调试：文档更新后手动执行以同步 IDE 支持
 * - CI/CD 集成：在持续集成中确保元数据的及时更新
 * - 包发布：确保 npm 包包含完整的 IDE 支持文件
 *
 *
 * @see
 * - WebTypes 规范：https://github.com/JetBrains/web-types
 * - components-helper 文档：https://github.com/codedigua/components-helper
 * - wot-ui-plus 组件库：https://wot-ui-plus.cn/
 *
 * @example
 * 执行脚本生成 WebTypes 文件：
 * ```bash
 * # 开发环境执行
 * ts-node scripts/build-web-types.ts
 *
 * # 构建过程中自动执行
 * npm run build:web-types
 * ```
 *
 * 生成的 WebTypes 文件结构示例：
 * ```json
 * {
 *   "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
 *   "name": "wot-ui-plus",
 *   "version": "1.0.0",
 *   "contributions": {
 *     "html": {
 *       "types-syntax": "typescript",
 *       "tags": [
 *         {
 *           "name": "wd-button",
 *           "description": "按钮组件",
 *           "doc-url": "https://wot-ui-plus.cn/component/button.html",
 *           "attributes": [
 *             {
 *               "name": "type",
 *               "description": "按钮类型",
 *               "value": {
 *                 "type": "string",
 *                 "kind": "expression"
 *               }
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */

// 导入必要的依赖
import { arrayToRegExp, getTypeSymbol, hyphenate, isCommonType, isUnionType } from 'components-helper'
import { version, name } from '../package.json'
import type { ReAttribute, ReComponentName, ReDocUrl, ReWebTypesSource, ReWebTypesType } from 'components-helper'
import path from 'path'
import { generateWebTypes } from './component-helper'
import os from 'os'

/**
 * 类型映射表
 *
 * 定义特定类型所属的模块，用于生成正确的导入路径
 */
const typeMap: any = {
  vue: ['Component', 'VNode', 'CSSProperties', 'StyleValue']
}

/**
 * 清理字符串内容
 *
 * 移除字符串中的 HTML 标签、非英文字符和数字，只保留字母、空格和短横线
 *
 * @param {string} str - 需要清理的字符串
 * @returns {string} 清理后的纯文本字符串
 * @example
 * const cleanStr = removeHtmlTagsAndNonEnglish('<h1>Button 按钮组件</h1>'); // 返回 'Button 按钮组件'
 */
const removeHtmlTagsAndNonEnglish = (str: string) => {
  return str
    .replace(/<\/?[^>]+(>|$)/g, '') // 移除 HTML 标签
    .replace(/[^\w\s-]/g, '') // 移除非单词字符、非空格、非短横线
    .replace(/\d+/g, '') // 移除数字
    .trim() // 移除首尾空格
}

/**
 * 转换组件标题为标准组件名称
 *
 * 将文档标题转换为 wot-ui-plus 组件库的标准组件名称格式 (wd-xxx)
 *
 * @param {string} title - 文档标题
 * @returns {string} 标准化的组件名称
 * @example
 * const componentName = reComponentName('Button 按钮'); // 返回 'wd-button'
 */
const reComponentName: ReComponentName = (title: string) => {
  // 清理标题，转换为短横线命名，并添加 wd- 前缀
  return `wd-${hyphenate(removeHtmlTagsAndNonEnglish(title)).replace(/[ ]+/g, '-')}`
}

/**
 * 生成组件文档的 URL
 *
 * 根据文件名和标题生成组件文档的在线访问链接
 *
 * @param {string} fileName - 文件名
 * @param {string} header - 文档标题（可选）
 * @returns {string} 完整的文档 URL
 * @example
 * const docUrl = reDocUrl('button', 'Attributes'); // 返回 'https://wot-ui-plus.cn/component/button.html#attributes'
 */
const reDocUrl: ReDocUrl = (fileName, header) => {
  const docs = 'https://wot-ui-plus.cn/component/'
  // 清理标题并转换为 URL 片段格式
  const _header = header ? removeHtmlTagsAndNonEnglish(header).replace(/\s+/g, '-').toLowerCase() : ''

  // 构建完整的 URL，包含可选的锚点
  return `${docs}${fileName}.html${_header ? '#' : ''}${_header}`
}

/**
 * 生成 WebTypes 源信息
 *
 * 为组件生成 TypeScript 类型引用信息
 *
 * @param {string} title - 组件标题
 * @returns {{ symbol: string }} 包含类型符号的对象
 * @example
 * const sourceInfo = reWebTypesSource('Button 按钮'); // 返回 { symbol: 'WdButton' }
 */
const reWebTypesSource: ReWebTypesSource = (title) => {
  // 生成 PascalCase 格式的类型符号
  const symbol = `Wd${removeHtmlTagsAndNonEnglish(title)
    .replace(/-/g, ' ')
    .replace(/^\w|\s+\w/g, (item: string) => {
      return item.trim().toUpperCase() // 首字母大写
    })}`
  return { symbol }
}

/**
 * 获取纯净的属性值
 *
 * 移除字符串中的反引号、星号和首尾的单双引号
 *
 * @param {string} value - 需要清理的值
 * @returns {string} 清理后的纯净值
 * @example
 * const pureValue = getPureValue('`string`'); // 返回 'string'
 */
const getPureValue = (value: string) => {
  return value
    .replace(/[`*]/g, '') // 移除反引号和星号
    .replace(/^['"]|['"]$/g, '') // 移除首尾的单双引号
    .trim() // 移除首尾空格
}

/**
 * 处理 WebTypes 类型定义
 *
 * 根据原始类型字符串，生成适当的 WebTypes 类型表示
 *
 * @param {string} type - 原始类型字符串
 * @returns {string | { name: string, source: { symbol: string, module: string } }} 处理后的类型表示
 * @example
 * const typeDef = reWebTypesType('string'); // 返回 'string'
 * const typeDef2 = reWebTypesType('Component'); // 返回 { name: 'Component', source: { symbol: 'Component', module: 'vue' } }
 */
const reWebTypesType: ReWebTypesType = (type) => {
  // 获取纯净的类型值
  const _type = getPureValue(type)

  // 检查是否为公共类型（如 string, number 等）
  const isPublicType = isCommonType(_type)
  // 检查是否为数字
  const isNumber = /^\d+$/.test(_type)
  // 获取类型符号
  const symbol = getTypeSymbol(_type)
  // 检查是否为联合类型
  const isUnion = isUnionType(symbol)
  // 查找类型所属的模块
  const module = findModule(symbol)

  // 根据类型特性返回适当的表示
  return isPublicType || isNumber || !symbol || isUnion ? _type : { name: _type, source: { symbol, module } }
}

/**
 * 查找类型所属的模块
 *
 * 在类型映射表中查找给定类型所属的模块
 *
 * @param {string} type - 类型名称
 * @returns {string | undefined} 模块名称或 undefined
 * @example
 * const module = findModule('Component'); // 返回 'vue'
 */
const findModule = (type: string) => {
  for (const key in typeMap) {
    // 为每个模块的类型创建正则表达式
    const regExp = arrayToRegExp(typeMap[key])
    // 测试类型是否匹配当前模块
    if (regExp.test(getTypeSymbol(type))) {
      return key
    }
  }
  return undefined
}

/**
 * 驼峰命名转短横线命名
 *
 * 将驼峰命名法的字符串转换为短横线连接的命名法
 *
 * @param {string} str - 驼峰命名的字符串
 * @returns {string} 短横线命名的字符串
 * @example
 * const kebabStr = toKebabCase('testCase'); // 返回 'test-case'
 */
const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 在小写字母和大写字母之间添加短横线
    .toLowerCase() // 转换为小写
}

/**
 * 处理组件属性定义
 *
 * 根据属性名称、键名和表格标题，生成标准化的属性表示
 *
 * @param {string} value - 属性值
 * @param {string} key - 属性键名
 * @param {any} row - 属性所在行的数据
 * @param {string} title - 表格标题
 * @returns {string | undefined} 处理后的属性表示
 * @example
 * const attr = reAttribute('disabled', '参数', {}, 'Attributes'); // 返回 'disabled'
 * const attr2 = reAttribute('v-model:value', '参数', {}, 'Attributes'); // 返回 'v-model:value'
 */
const reAttribute: ReAttribute = (value, key, row, title) => {
  // 仅处理属性表格
  if (title.includes('Attributes')) {
    if (key === '参数') {
      // 处理 v-model:xxx 双向绑定
      if (value.includes('v-model:')) {
        const part = value.split(/[\s/|]/).find((part) => part.startsWith('v-model:'))
        if (part) {
          const suffix = toKebabCase(part.split(':')[1].split(/[\s\W]/)[0])
          return `v-model:${suffix}`
        }
      } else if (value.includes('v-model')) {
        // 处理基本的 v-model
        return 'v-model'
      }
      // 处理普通属性
      return toKebabCase(value.replace(/[^\w\s-]/g, ''))
    } else if (key === '可选值' || key === '默认值') {
      // 处理可选值和默认值
      const pureValue = getPureValue(value)

      // 处理空值情况
      if (['', '-', '—'].includes(pureValue)) {
        return undefined
      } else {
        return pureValue
      }
    }
  }
  // 非属性表格的内容保持不变
  return value
}

// 定义文档目录路径
let entry = path.resolve(__dirname, '../docs/component/*.md')

// 处理 Windows 平台的路径分隔符
if (os.platform() === 'win32') {
  entry = entry.replace(/\\/g, '/')
}

// 调用 generateWebTypes 生成 WebTypes 文件
generateWebTypes({
  name, // 组件库名称
  version, // 组件库版本
  entry, // 文档入口路径
  outDir: path.resolve(__dirname, '../src/uni_modules/wot-ui-plus'), // 输出目录
  reComponentName, // 组件名称转换函数
  reDocUrl, // 文档 URL 生成函数
  reWebTypesSource, // 类型源信息生成函数
  reWebTypesType, // 类型处理函数
  reAttribute, // 属性处理函数
  events: 'Events', // 事件表格标题
  eventsName: '事件名称', // 事件名称列标题
  eventsDescription: '说明', // 事件描述列标题
  slots: 'Slots', // 插槽表格标题
  slotsName: '名称', // 插槽名称列标题
  slotsDescription: '说明', // 插槽描述列标题
  props: 'Attributes', // 属性表格标题
  propsName: '参数', // 属性名称列标题
  propsDescription: '说明', // 属性描述列标题
  propsType: '类型', // 属性类型列标题
  propsOptions: '可选值', // 属性可选值列标题
  propsDefault: '默认值', // 属性默认值列标题
  // 匹配组件文档中表格的正则表达式
  tableRegExp: /#+\s+(.*\s*Attributes|.*\s*Events|.*\s*Slots|.*\s*Directives)\s*\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g
})
