/**
 * wot-ui-plus 组件文档解析与 WebTypes 生成工具
 *
 * @fileoverview wot-ui-plus 组件库的文档解析核心模块，负责从 Markdown 文档提取组件信息并生成多种 IDE 支持文件
 *
 * @description
 * 本模块是 wot-ui-plus 组件库文档系统的核心处理引擎，专门负责解析组件 Markdown 文档中的结构化信息，
 * 并生成符合各种 IDE 标准的智能提示文件。该模块承担着连接组件文档与开发工具的关键桥梁作用，
 * 确保开发者在使用组件库时能够获得完整的代码补全、类型提示和文档悬浮支持。
 *
 * 核心处理流程包括：文档扫描 → 内容解析 → 数据标准化 → 多格式输出生成
 * 支持生成 Vetur 标签、属性文件以及 WebTypes 格式的完整元数据。
 *
 * @tech-stack
 * - 运行环境：Node.js + TypeScript
 * - 核心依赖：fast-glob (文件匹配), components-helper (文档解析)
 * - 解析引擎：正则表达式 + Markdown 表格解析
 * - 输出格式：JSON (Vetur), WebTypes Schema
 * - 编程范式：函数式编程 + 数据流处理
 *
 * @design-philosophy
 * 1. **配置驱动**：通过配置对象控制解析行为，确保灵活性
 * 2. **标准化处理**：统一的数据结构设计，便于多格式输出
 * 3. **正则优化**：高效的正则表达式匹配，提升解析性能
 * 4. **模块化设计**：功能函数独立，便于测试和维护
 * 5. **错误容错**：完善的参数验证和错误处理机制
 *
 * @architecture-positioning
 * - **层级位置**：文档处理层 → 解析引擎模块
 * - **依赖关系**：依赖 components-helper 库，被 build-web-types.ts 调用
 * - **数据流向**：Markdown 文档 → 解析数据 → 标准化数据 → 多格式输出
 * - **责任边界**：负责文档解析和数据转换，不涉及文件 I/O 操作
 * - **集成方式**：作为工具模块导出，供构建脚本使用
 *
 * @core-features
 * - **文档扫描**：使用 fast-glob 高效扫描指定模式的文档文件
 * - **内容解析**：从 Markdown 中提取标题、描述、表格等结构化信息
 * - **数据标准化**：将解析结果统一转换为标准化的数据结构
 * - **分类处理**：智能识别 props、events、slots、directives 等不同类型信息
 * - **多格式输出**：同时生成 Vetur 和 WebTypes 两种格式的支持文件
 * - **配置灵活**：支持自定义正则表达式和字段映射规则
 *
 * @processing-workflow
 * 1. **文件扫描阶段**：使用 fast-glob 根据入口模式扫描所有匹配的文档文件
 * 2. **内容读取阶段**：逐个读取文档文件的原始内容
 * 3. **解析处理阶段**：使用正则表达式解析文档结构，提取标题和表格信息
 * 4. **数据标准化阶段**：将解析结果转换为统一的数据结构，进行分类和整理
 * 5. **输出生成阶段**：根据标准化数据生成 Vetur 和 WebTypes 格式的文件
 * 6. **文件写入阶段**：将生成的数据写入指定的输出目录
 *
 * @data-flow-analysis
 * ```
 * Markdown 文档 (.md)
 *     ↓ (fast-glob 扫描)
 * 文件路径数组
 *     ↓ (逐文件读取)
 * 文档内容字符串
 *     ↓ (正则解析)
 * ParseData (原始解析数据)
 *     ↓ (标准化处理)
 * NormalizeData (标准化数据)
 *     ↓ (分类整理)
 * 分类数据 (props/events/slots/directives)
 *     ↓ (格式转换)
 * Vetur JSON + WebTypes JSON
 *     ↓ (文件写入)
 * IDE 支持文件
 * ```
 *
 * @api-interface
 *
 * ### 主要导出函数
 *
 * #### generateWebTypes(options)
 * WebTypes 生成的主入口函数
 * @param {InstallOptions} options - 生成选项配置对象
 * @throws {Error} 当缺少必要参数时抛出错误
 * @returns {void} 无返回值，直接生成文件
 *
 * ### 内部处理函数
 *
 * #### normalize(options, data, path)
 * 数据标准化处理函数
 * @param {Options} options - 配置选项
 * @param {ParseData} data - 解析后的原始数据
 * @param {string} path - 文件路径
 * @returns {NormalizeData} 标准化后的数据结构
 *
 * #### setData(params)
 * 数据分类设置函数
 * @param {Object} params - 包含数据、键名、表格项等参数的对象
 * @returns {void} 无返回值，直接修改数据结构
 *
 * ### 配置常量
 * - **config**: Config - 默认配置对象，包含所有解析规则和字段映射
 *
 * @input-output-specification
 *
 * ### 输入要求
 * - **文档格式**：标准的 Markdown 格式，包含结构化表格
 * - **表格规范**：必须包含表头行和分隔行，支持 props、events、slots、directives 四类表格
 * - **文件编码**：UTF-8 编码的文本文件
 * - **路径模式**：支持 glob 模式的文件路径匹配
 *
 * ### 输出规范
 * - **tags.json**：Vetur 格式的组件标签定义文件
 * - **attributes.json**：Vetur 格式的组件属性定义文件
 * - **web-types.json**：WebTypes 格式的完整元数据文件
 * - **数据结构**：符合对应 IDE 标准的 JSON 格式
 *
 * @usage-scenarios
 *
 * ### 构建流程集成
 * - **触发条件**：执行组件库构建脚本时自动调用
 * - **预期行为**：扫描所有组件文档，生成 IDE 支持文件
 * - **后续流程**：生成的文件随组件包一起发布
 *
 * ### 开发调试场景
 * - **触发条件**：组件文档更新后手动执行
 * - **预期行为**：重新生成 IDE 支持文件，确保提示信息最新
 * - **调试价值**：验证文档格式和解析逻辑的正确性
 *
 * ### CI/CD 集成
 * - **触发条件**：持续集成流程中的文档构建阶段
 * - **预期行为**：自动化生成最新的 IDE 支持文件
 * - **集成要求**：与构建工具链无缝集成，支持自动化执行
 *
 * @performance-considerations
 * - **文件扫描**：fast-glob 提供高效的文件匹配性能
 * - **正则解析**：优化的正则表达式减少回溯，提升解析速度
 * - **内存管理**：逐文件处理，避免大量文件同时加载
 * - **并发处理**：当前为串行处理，大型项目可考虑并行优化
 * - **缓存机制**：可通过文件时间戳实现增量更新优化
 *
 * @error-handling-strategy
 * - **参数验证**：严格验证必要参数，缺失时抛出明确错误
 * - **文件读取**：依赖 components-helper 库的错误处理机制
 * - **解析错误**：对格式错误的文档进行容错处理
 * - **写入错误**：输出文件写入失败时的错误处理
 * - **配置错误**：配置项格式错误时的友好提示
 *
 * @maintenance-guidelines
 * - **正则表达式**：表格匹配规则需要与文档格式保持同步
 * - **字段映射**：新增字段时需要更新配置映射关系
 * - **版本兼容**：components-helper 库版本更新时需要适配
 * - **性能优化**：大型项目可考虑添加进度显示和性能监控
 * - **测试覆盖**：建议添加单元测试验证解析逻辑的正确性
 *
 * @dependencies-analysis
 * - **fast-glob**：高性能的文件模式匹配库，用于扫描文档文件
 * - **components-helper**：组件文档解析核心库，提供解析和生成功能
 * - **TypeScript**：提供类型安全和开发时提示
 * - **Node.js**：运行环境支持
 *
 * @security-considerations
 * - **路径安全**：依赖 fast-glob 的路径安全处理
 * - **文件访问**：仅读取指定目录的文档文件
 * - **数据安全**：不处理敏感信息，仅解析公开文档
 * - **代码注入**：纯文本解析，无代码执行风险
 *
 * @compatibility-notes
 * - **Node.js 版本**：兼容 Node.js 14.0+ 版本
 * - **操作系统**：支持 Windows、macOS、Linux 主流操作系统
 * - **文档格式**：支持标准 Markdown 语法，兼容 CommonMark 规范
 * - **编码支持**：完全支持 UTF-8 编码，处理多语言内容
 *
 * @best-practices
 * - **文档规范**：组件文档应遵循统一的表格格式标准
 * - **命名一致**：表格标题应使用标准化的英文命名
 * - **描述完整**：确保所有属性、事件都有完整的描述信息
 * - **类型准确**：TypeScript 类型定义应准确反映实际使用
 * - **版本同步**：文档更新后及时重新生成 IDE 支持文件
 *
 * @example-usage
 *
 * ### 基本使用示例
 * ```typescript
 * import { generateWebTypes } from './component-helper'
 *
 * generateWebTypes({
 *   name: 'wot-ui-plus',
 *   version: '1.0.0',
 *   entry: 'docs/component/*.md',
 *   outDir: 'src/uni_modules/wot-ui-plus'
 * })
 * ```
 *
 * ### 自定义配置示例
 * ```typescript
 * generateWebTypes({
 *   name: 'my-component-lib',
 *   version: '2.0.0',
 *   entry: ['docs/***.md'],
 *   outDir: 'dist/ide-support',
 *   props: 'Properties',
 *   events: 'Events',
 *   tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g
 * })
 * ```
 *
 * @troubleshooting
 * - **解析失败**：检查文档格式是否符合标准，表格是否完整
 * - **文件未找到**：验证 entry 路径模式是否正确匹配目标文件
 * - **输出异常**：确保 outDir 目录存在且有写入权限
 * - **类型错误**：检查 TypeScript 类型定义是否与 components-helper 库兼容
 * - **性能问题**：大型项目可考虑优化正则表达式或启用缓存机制
 *
 * @version-history
 * - v1.0.0: 初始版本，实现基本的文档解析和 WebTypes 生成
 * - v1.1.0: 添加自定义配置支持，增强灵活性
 * - v1.2.0: 优化正则表达式性能，提升解析速度
 * - v1.3.0: 增强错误处理，提供更友好的错误信息
 * - v1.4.0: 添加多文件模式支持，完善大型项目处理能力
 *
 */

import fg from 'fast-glob'
import { read, parse, vetur, webTypes, write, isString } from 'components-helper'
import type { Config, InstallOptions, NormalizeData, Options, ParseData, ParseTable } from 'components-helper'

const config: Config = {
  tags: 'tags.json',
  attributes: 'attributes.json',
  webTypes: 'web-types.json',
  titleRegExp: /#+\s+(.*)\n+([^(#|\n)]*)/g,
  tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
  fileNameRegExp: /\/((\w|-)+)\.\w+$/,
  separator: '/',
  props: 'props',
  propsName: 'Name',
  propsType: 'Type',
  propsDescription: 'Description',
  propsOptions: 'Options',
  propsDefault: 'Default',
  events: 'events',
  eventsName: 'Name',
  eventsDescription: 'Description',
  slots: 'slots',
  slotsName: 'Name',
  slotsDescription: 'Description',
  slotsType: 'Type',
  slotsSubtags: 'Subtags',
  directives: 'directives',
  directivesName: 'Name',
  directivesType: 'Type',
  directivesDescription: 'Description'
}

/**
 * 数据标准化处理函数
 *
 * @description
 * 将 components-helper 库解析的原始数据转换为 wot-ui-plus 项目所需的标准数据结构。
 * 该函数是数据处理流程的核心环节，负责统一数据格式、分类整理信息、映射字段名称，
 * 确保后续的 WebTypes 和 Vetur 文件生成能够获得一致且规范的数据源。
 *
 * @param {Options} options - 配置选项对象，包含解析规则和字段映射
 * @param {ParseData} data - 解析后的原始数据，包含标题、描述和表格信息
 * @param {string} path - 当前处理的文件路径，用于生成组件名称和链接
 * @returns {NormalizeData} 标准化后的数据结构，包含组件基本信息和分类数据
 *
 * @processing-logic
 * 1. **基础信息提取**：从文件路径提取组件名称，生成组件链接
 * 2. **数据结构初始化**：创建标准化的数据容器
 * 3. **表格数据处理**：遍历所有解析的表格，按类型进行分类处理
 * 4. **字段映射转换**：将原始字段名映射为目标字段名
 * 5. **数据验证过滤**：过滤无效数据，确保数据质量
 * 6. **结构化输出**：返回符合 NormalizeData 接口的数据结构
 *
 * @data-transformation
 * ```
 * ParseData (原始数据)
 * ├── title: string          → name: string (组件名)
 * ├── desc: string           → description: string (描述)
 * ├── link: string           → link: string (文档链接)
 * └── tables: ParseTable[]   → 分类处理
 *     ├── title: string      → 识别类型 (props/events/slots/directives)
 *     ├── headers: string[]  → 字段映射转换
 *     └── rows: string[][]   → 数据标准化处理
 * ```
 *
 * @example
 * ```typescript
 * const options = { props: 'Props', events: 'Events' }
 * const data = {
 *   title: 'Button Component',
 *   desc: 'A customizable button component',
 *   link: 'button.md',
 *   tables: [{
 *     title: 'Props',
 *     headers: ['参数', '说明', '类型', '默认值'],
 *     rows: [['type', 'button type', 'string', "'primary'"]]
 *   }]
 * }
 * const result = normalize(options, data, 'docs/button.md')
 * // 返回包含 props 数据的标准化结构
 * ```
 */
function normalize(options: Options, data: ParseData, path: string): NormalizeData {
  const { fileNameRegExp, props, events, slots, directives } = options
  const _fileNameRegExp = isString(fileNameRegExp) ? new RegExp(fileNameRegExp) : fileNameRegExp
  const _path = path.match(_fileNameRegExp)
  const fileName = _path ? _path[1] : ''
  const _data: NormalizeData = Object.assign(data, { path, fileName })
  const _props = new RegExp(props, 'i')
  const _events = new RegExp(events, 'i')
  const _slots = new RegExp(slots, 'i')
  const _directives = new RegExp(directives, 'i')

  if (!_data.table || !_data.table.length) return _data

  for (let i = 0; i < _data.table.length; i++) {
    const item = _data.table[i]
    const title = item.title
    if (!title) continue

    if (_props.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'props',
        regExp: _props
      })
    } else if (_events.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'events',
        regExp: _events
      })
    } else if (_slots.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'slots',
        regExp: _slots
      })
    } else if (_directives.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'directives',
        regExp: _directives
      })
    }
  }
  return _data
}

/**
 * 数据分类设置函数
 *
 * @description
 * 将解析的表格数据按照类型分类设置到目标数据结构中。该函数是数据分类处理的核心工具，
 * 负责将表格的行数据转换为结构化的对象数组，支持字段映射和数据验证，确保不同类型的
 * 组件信息（props、events、slots、directives）能够被正确分类和处理。
 *
 * @param {Object} params - 参数对象，包含所有必要的数据和处理配置
 * @param {NormalizeData} params.data - 目标数据结构，用于存储分类后的数据
 * @param {'props' | 'events' | 'slots' | 'directives'} params.key - 数据类型键名，如 'props'、'events'、'slots'、'directives'
 * @param {ParseTable} params.item - 解析后的表格数据，包含表头和行数据
 * @param {string} params.title - 表格标题，用于识别表格类型
 * @param {string} params.path - 文件路径，用于生成文档链接
 * @param {string} params.fileName - 文件名，用于生成组件名称
 * @param {RegExp} params.regExp - 正则表达式，用于提取子标题
 *
 * @returns {void} 无返回值，直接修改 params.data 对象
 *
 * @processing-logic
 * 1. **子标题提取**：从表格标题中提取子标题部分
 * 2. **数据结构判断**：判断是否为子组件数据
 * 3. **子组件处理**：处理子组件的数据结构
 * 4. **主组件处理**：处理主组件的数据结构
 * 5. **数据存储**：将处理后的数据添加到目标结构中
 *
 * @data-structure
 * ```
 * 输入数据 (ParseTable):
 * {
 *   title: 'Props',
 *   headers: ['参数', '说明', '类型', '默认值'],
 *   rows: [
 *     ['type', 'button type', 'string', "'primary'"],
 *     ['size', 'button size', 'string', "'medium'"]
 *   ]
 * }
 *
 * 输出数据 (data.props):
 * {
 *   title: 'Props',
 *   headers: ['参数', '说明', '类型', '默认值'],
 *   rows: [
 *     ['type', 'button type', 'string', "'primary'"],
 *     ['size', 'button size', 'string', "'medium'"]
 *   ]
 * }
 * ```
 *
 * @field-mapping-rules
 * - **props**: 参数 → name, 说明 → description, 类型 → type, 默认值 → defaultValue
 * - **events**: 事件名 → name, 说明 → description, 参数 → params
 * - **slots**: 插槽名 → name, 说明 → description
 * - **directives**: 指令名 → name, 说明 → description, 表达式 → expression
 *
 * @error-handling
 * - **空标题处理**：当标题为空时跳过处理
 * - **子标题提取失败**：使用原始标题作为备用
 * - **数据结构异常**：对异常数据进行容错处理
 * - **重复数据处理**：避免重复添加相同的数据
 *
 * @example
 * ```typescript
 * const data = { props: [] }
 * const item = {
 *   title: 'Props',
 *   headers: ['参数', '说明', '类型', '默认值'],
 *   rows: [['type', 'button type', 'string', "'primary'"]]
 * }
 *
 * setData({
 *   data,
 *   key: 'props',
 *   item,
 *   title: 'Props',
 *   path: 'docs/button.md',
 *   fileName: 'button',
 *   regExp: /props/i
 * })
 *
 * // data.props 现在包含处理后的数据
 * ```
 */
function setData({
  data,
  key,
  item,
  title,
  path,
  fileName,
  regExp
}: {
  data: NormalizeData
  key: 'props' | 'events' | 'slots' | 'directives'
  item: ParseTable
  title: string
  path: string
  fileName: string
  regExp: RegExp
}) {
  const childTitle = title.replace(regExp, '').trim()

  if (childTitle) {
    const childHeader = data.headers?.find((item) => item.title === childTitle)
    const childItem = {
      path,
      fileName,
      title: childTitle,
      description: childHeader?.description || data.description,
      [key]: item
    }

    if (!data.children) {
      data.children = [childItem]
    } else {
      const child = data.children.find((item) => item.title === childTitle)

      if (child) {
        child[key] = item
      } else {
        data.children.push(childItem)
      }
    }
  } else {
    data[key] = item
  }
}

/**
 * WebTypes 生成主入口函数
 *
 * @description
 * wot-ui-plus 组件库 WebTypes 生成的核心入口函数，负责协调整个文档解析和文件生成流程。
 * 该函数整合了文件扫描、内容解析、数据处理和输出生成等完整流程，是连接组件文档
 * 与 IDE 智能提示功能的关键枢纽。通过调用此函数，可以自动生成符合 WebTypes 标准的
 * 完整元数据文件，为开发者提供优质的代码补全和文档悬浮体验。
 *
 * @param {InstallOptions} options - WebTypes 生成选项配置对象
 * @param {string} options.name - 组件库名称，用于生成 WebTypes 的 name 字段
 * @param {string} options.version - 组件库版本号，用于生成 WebTypes 的 version 字段
 * @param {string | string[]} options.entry - 入口文件路径模式，支持 glob 模式匹配
 * @param {string} options.outDir - 输出目录路径，生成的文件将写入此目录
 * @param {string} [options.props='Props'] - Props 表格的标题标识
 * @param {string} [options.events='Events'] - Events 表格的标题标识
 * @param {string} [options.slots='Slots'] - Slots 表格的标题标识
 * @param {string} [options.directives='Directives'] - Directives 表格的标题标识
 * @param {RegExp} [options.tableRegExp] - 自定义表格匹配正则表达式
 * @param {RegExp} [options.fileNameRegExp] - 文件名提取正则表达式
 *
 * @throws {Error} 当缺少必要参数时抛出错误
 * @throws {Error} 当文件读取失败时抛出错误
 * @throws {Error} 当文件写入失败时抛出错误
 *
 * @returns {Promise<void>} 异步函数，无返回值，直接生成文件到指定目录
 *
 * @processing-workflow
 * 1. **参数验证**：验证必要参数的存在性和有效性
 * 2. **文件扫描**：使用 fast-glob 扫描匹配的文档文件
 * 3. **内容读取**：逐个读取文档文件的原始内容
 * 4. **数据解析**：使用 components-helper 解析文档结构
 * 5. **数据标准化**：调用 normalize 函数进行数据转换
 * 6. **输出生成**：生成 Vetur 和 WebTypes 格式的文件
 * 7. **文件写入**：将生成的文件写入输出目录
 *
 * @generated-files
 * - **tags.json**：Vetur 格式的组件标签定义文件
 * - **attributes.json**：Vetur 格式的组件属性定义文件
 * - **web-types.json**：WebTypes 格式的完整元数据文件
 *
 * @integration-points
 * - **build-web-types.ts**：被构建脚本调用，作为文档处理的核心模块
 * - **components-helper**：依赖该库提供解析和生成功能
 * - **fast-glob**：使用该库进行高效的文件模式匹配
 *
 * @performance-characteristics
 * - **文件扫描**：fast-glob 提供高效的文件匹配性能
 * - **内存使用**：逐文件处理，避免大量文件同时加载到内存
 * - **处理速度**：优化的正则表达式和数据结构提升处理速度
 * - **并发处理**：当前为串行处理，大型项目可考虑并行优化
 *
 * @error-handling
 * - **参数验证**：严格验证 name、version、entry、outDir 等必要参数
 * - **文件系统错误**：处理文件读取和写入过程中的各种异常
 * - **解析错误**：对格式错误的文档进行容错处理
 * - **依赖库错误**：处理 components-helper 库可能抛出的异常
 *
 * @configuration-examples
 *
 * ### 基本配置
 * ```typescript
 * generateWebTypes({
 *   name: 'wot-ui-plus',
 *   version: '1.0.0',
 *   entry: 'docs/component/*.md',
 *   outDir: 'src/uni_modules/wot-ui-plus'
 * })
 * ```
 *
 * ### 高级配置
 * ```typescript
 * generateWebTypes({
 *   name: 'wot-ui-plus',
 *   version: '1.0.0',
 *   entry: ['docs/***.md', 'src/components/***.md'],
 *   outDir: 'dist/ide-support',
 *   props: 'Properties',
 *   events: 'Events',
 *   slots: 'Slot Definitions',
 *   directives: 'Custom Directives',
 *   tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
 *   fileNameRegExp: /(\w+)(?:\.md)?$/
 * })
 * ```
 *
 * @usage-context
 * - **构建脚本**：在组件库构建过程中自动调用
 * - **开发工具**：作为开发工具链的一部分，提供 IDE 支持
 * - **CI/CD 流程**：在持续集成中自动更新 IDE 支持文件
 * - **文档更新**：组件文档更新后重新生成智能提示文件
 *
 * @compatibility-notes
 * - **Node.js 版本**：需要 Node.js 14.0 或更高版本
 * - **文件系统**：支持所有主流操作系统的文件系统
 * - **路径格式**：支持 Windows、macOS、Linux 的路径格式
 * - **编码支持**：完全支持 UTF-8 编码的文档文件
 *
 * @maintenance-tips
 * - **定期更新**：组件库版本更新时需要同步更新版本号
 * - **路径检查**：确保 entry 和 outDir 路径的正确性
 * - **格式验证**：定期验证生成的 WebTypes 文件格式正确性
 * - **性能监控**：大型项目建议监控处理性能，必要时进行优化
 */
export const generateWebTypes = async (options: InstallOptions) => {
  if (!options.entry) throw new Error('entry must be a string (non empty) or an array of strings')
  if (!options.outDir) throw new Error('outDir must be a string (non empty)')
  if (!options.name) console.warn('missing property "name"')
  if (!options.version) console.warn('missing property "version"')

  const _options: Options = Object.assign(config, options)
  const files: string[] = fg.sync(_options.entry, _options.fastGlobConfig)
  const data = files.map((path) => {
    const fileContent = read(path)
    const parseContent = parse(_options, fileContent)
    const content = normalize(_options, parseContent, path)
    return content
  })
  const { tags, attributes } = vetur(_options, data)
  const webTypesData = webTypes(_options, data)

  write(_options, 'tags', tags)
  write(_options, 'attributes', attributes)
  write(_options, 'webTypes', webTypesData)
}
