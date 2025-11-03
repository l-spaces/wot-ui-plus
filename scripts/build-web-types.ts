/**
 * WebTypes 生成工具
 *
 * 本脚本用于从组件文档生成 WebTypes 格式的元数据文件，为 IDE 提供组件智能提示和文档支持。
 * WebTypes 是一种用于描述 Web 组件的元数据格式，支持在编辑器中提供组件的自动补全、属性提示等功能。
 *
 * 主要功能：
 * - 从 Markdown 文档中提取组件信息（属性、事件、插槽等）
 * - 转换组件名称、属性名等为标准化格式
 * - 生成符合 WebTypes 规范的元数据文件
 * - 支持自定义文档解析规则和输出格式
 *
 * 使用场景：
 * - 在组件库开发过程中自动生成编辑器支持文件
 * - 为开发者提供更好的代码补全和文档提示体验
 * - 保证组件文档与实际使用方式的一致性
 *
 * 使用方式：
 * ```bash
 * ts-node scripts/build-web-types.ts
 * ```
 *
 * 注意事项：
 * - 需要确保 docs/component/ 目录下有正确格式的组件文档
 * - 生成的 WebTypes 文件将保存在 src/uni_modules/wot-ui-plus 目录下
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
 * const docUrl = reDocUrl('button', 'Attributes'); // 返回 'https://wot-ui.cn/component/button.html#attributes'
 */
const reDocUrl: ReDocUrl = (fileName, header) => {
  const docs = 'https://wot-ui.cn/component/'
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
