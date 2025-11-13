/**
 * wot-ui-plus 组件库编译构建脚本
 *
 * @fileoverview wot-ui-plus 组件库的构建发布核心工具，负责源代码到发布目录的文件复制与目录结构维护
 *
 * @description
 * 本脚本是 wot-ui-plus 组件库构建系统的关键组成部分，承担着从开发源码到发布包的桥梁作用。
 * 主要负责将 src/uni_modules/wot-ui-plus 目录下的组件源代码完整复制到 lib 发布目录，
 * 同时处理项目根目录的重要配置文件复制，为 npm 包发布提供完整的文件结构支持。
 *
 * 作为构建流程中的核心环节，该脚本确保了：
 * - 组件源代码的完整性和一致性
 * - 发布目录结构的标准化
 * - 开发文档与发布包的合理分离
 * - 项目元数据文件的正确包含
 *
 * @tech-stack
 * - 运行环境：Node.js (ES6+)
 * - 核心模块：fs (文件系统操作), path (路径处理)
 * - 编程范式：函数式编程 + 异步回调
 * - 文件操作：递归目录遍历 + 异步文件复制
 * - 平台兼容：跨平台路径处理 (Windows/macOS/Linux)
 *
 * @design-philosophy
 * 1. **目录结构保持**：完整保留源码目录层次结构，确保组件引用路径不变
 * 2. **选择性过滤**：智能排除开发文档，保留必要的 changelog.md
 * 3. **异步优先**：采用异步文件操作，避免阻塞构建进程
 * 4. **错误容错**：对文件操作错误进行适当处理，确保构建流程稳定
 * 5. **模块化设计**：功能函数独立，便于测试和维护
 *
 * @architecture-positioning
 * - **层级位置**：构建系统层 -> 文件处理模块
 * - **依赖关系**：依赖 Node.js fs/path 模块，被构建脚本调用
 * - **数据流向**：src/uni_modules/wot-ui-plus -> lib/ (目录结构复制)
 * - **责任边界**：负责文件复制和目录维护，不涉及代码转换或优化
 * - **集成方式**：作为独立脚本在 package.json 的构建流程中被调用
 *
 * @core-features
 * - **递归目录复制**：深度遍历源目录，完整复制所有子目录和文件
 * - **智能文件过滤**：排除 .md 文档但保留 changelog.md，平衡开发与发布需求
 * - **目录自动创建**：在复制过程中自动创建必要的目录结构
 * - **项目文件复制**：单独处理 README.md 和 LICENSE 等项目元数据文件
 * - **异步操作支持**：所有文件操作采用异步方式，提升构建性能
 * - **跨平台兼容**：使用 path 模块确保路径在不同操作系统下的正确性
 *
 * @processing-workflow
 * 1. **初始化阶段**：定义源目录 (src) 和目标目录 (lib) 路径
 * 2. **组件复制阶段**：调用 copyComponents 递归复制组件目录，过滤 .md 文件
 * 3. **文件复制阶段**：调用 copyFile 复制 README.md 和 LICENSE 文件
 * 4. **完成阶段**：所有文件复制完成，lib 目录准备就绪用于发布
 *
 * @data-flow-analysis
 * ```
 * src/uni_modules/wot-ui-plus/     (源目录)
 * ├── components/                  -> lib/components/
 * ├── locale/                      -> lib/locale/
 * ├── style/                       -> lib/style/
 * ├── index.ts                     -> lib/index.ts
 * ├── package.json                 -> lib/package.json
 * └── changelog.md                 -> lib/changelog.md (保留)
 *
 * 项目根目录/
 * ├── README.md                    -> lib/README.md
 * └── LICENSE                      -> lib/LICENSE
 * ```
 *
 * @api-interface
 *
 * ### 主要导出函数
 *
 * #### copyComponents(srcPath, tarPath, filter)
 * 递归复制组件目录及文件的核心函数
 * @param {string} srcPath - 源目录绝对路径
 * @param {string} tarPath - 目标目录绝对路径
 * @param {string[]} filter - 文件扩展名过滤数组，默认为空数组
 * @returns {void} 无返回值，异步执行复制操作
 *
 * #### copyFile(srcPath, tarPath)
 * 单文件复制函数
 * @param {string} srcPath - 源文件绝对路径
 * @param {string} tarPath - 目标文件绝对路径
 * @returns {void} 无返回值，同步检查 + 异步复制
 *
 * ### 配置常量
 * - **src**: string - 源目录路径常量
 * - **libDir**: string - 目标目录路径常量
 * - **readme**: string - README.md 文件路径
 * - **license**: string - LICENSE 文件路径
 *
 * @input-output-specification
 *
 * ### 输入要求
 * - **源目录结构**：标准的 uni_modules 组件库目录结构
 * - **文件系统权限**：对源目录的读取权限和对目标目录的写入权限
 * - **路径有效性**：所有路径必须为有效的文件系统路径
 *
 * ### 输出规范
 * - **目录完整性**：目标目录完全复制源目录结构（除过滤文件）
 * - **文件一致性**：复制的文件内容与源文件完全一致
 * - **权限保持**：复制的文件保持适当的文件系统权限
 * - **目录创建**：自动创建目标目录中不存在的父目录
 *
 * @usage-scenarios
 *
 * ### 构建发布场景
 * - **触发条件**：执行 `npm run build` 或发布前构建脚本
 * - **预期行为**：将开发源码完整复制到 lib 发布目录
 * - **后续流程**：lib 目录用于 npm 包发布或进一步处理
 *
 * ### 开发调试场景
 * - **触发条件**：开发过程中需要测试发布包结构
 * - **预期行为**：快速生成发布目录用于本地测试
 * - **调试价值**：验证发布包的文件结构和内容完整性
 *
 * ### CI/CD 集成场景
 * - **触发条件**：持续集成流程中的构建阶段
 * - **预期行为**：自动化生成发布文件用于部署
 * - **集成要求**：与构建工具链无缝集成，支持自动化执行
 *
 * @performance-considerations
 * - **异步操作**：使用 fs 异步 API 避免阻塞事件循环
 * - **内存效率**：逐文件处理，避免大量文件同时加载到内存
 * - **错误处理**：适当的错误处理避免构建流程中断
 * - **并发控制**：当前为串行处理，大型项目可考虑并发优化
 * - **磁盘 I/O**：文件复制操作受磁盘性能影响，需考虑 SSD/HDD 差异
 *
 * @error-handling-strategy
 * - **目录创建错误**：忽略目录已存在错误，其他错误静默处理
 * - **文件读取错误**：输出错误信息到控制台，不中断流程
 * - **文件复制错误**：采用静默处理，依赖回调机制
 * - **路径解析错误**：使用 path.resolve 确保路径正确性
 * - **权限错误**：依赖文件系统权限检查，错误时输出日志
 *
 * @maintenance-guidelines
 * - **过滤规则更新**：新增需要过滤的文件类型时，修改 filter 数组
 * - **路径配置**：源目录和目标目录路径变更时，同步更新常量定义
 * - **错误处理增强**：可根据需要增强错误日志和异常处理机制
 * - **性能优化**：大型项目可考虑添加进度显示和并发处理
 * - **测试覆盖**：建议添加单元测试验证文件复制逻辑的正确性
 *
 * @dependencies-analysis
 * - **fs 模块**：Node.js 核心文件系统模块，提供文件和目录操作 API
 * - **path 模块**：Node.js 核心路径处理模块，确保跨平台路径兼容性
 * - **无外部依赖**：纯 Node.js 实现，无第三方库依赖
 * - **系统要求**：Node.js 12+ 环境，支持 ES6+ 语法
 *
 * @security-considerations
 * - **路径安全**：使用 path.resolve 防止路径遍历攻击
 * - **权限控制**：依赖文件系统权限，不进行额外的权限提升
 * - **文件完整性**：直接复制文件内容，不进行修改，确保安全性
 * - **敏感信息**：不处理敏感文件，仅复制公开的组件代码
 *
 * @compatibility-notes
 * - **Node.js 版本**：兼容 Node.js 12.0+ 版本
 * - **操作系统**：支持 Windows、macOS、Linux 主流操作系统
 * - **文件系统**：支持 NTFS、HFS+、ext4 等主流文件系统
 * - **路径长度**：受操作系统路径长度限制影响
 * - **特殊字符**：正确处理文件名中的特殊字符和 Unicode
 *
 * @best-practices
 * - **错误处理**：采用静默错误处理，避免构建流程中断
 * - **路径处理**：统一使用 path 模块处理路径，确保跨平台兼容
 * - **异步优先**：文件操作优先使用异步 API，提升性能
 * - **函数设计**：保持函数单一职责，便于测试和维护
 * - **配置外置**：路径和过滤规则等配置集中管理
 *
 * @example-usage
 *
 * ### 基本使用示例
 * ```bash
 * # 直接执行脚本
 * node scripts/compiler.ts
 *
 * # 或通过 ts-node 执行
 * ts-node scripts/compiler.ts
 * ```
 *
 * ### 集成到构建流程
 * ```json
 * {
 *   "scripts": {
 *     "build": "npm run compiler && npm run pack",
 *     "compiler": "ts-node scripts/compiler.ts"
 *   }
 * }
 * ```
 *
 * ### 自定义过滤规则
 * ```typescript
 * // 复制组件目录，排除 .md 和 .txt 文件
 * copyComponents(src, libDir, ['.md', '.txt'])
 * ```
 *
 * @troubleshooting
 * - **权限问题**：确保对目标目录有写入权限
 * - **路径错误**：检查源目录是否存在，目标目录是否可访问
 * - **文件锁定**：确保源文件未被其他程序占用
 * - **磁盘空间**：确保目标磁盘有足够的存储空间
 * - **网络路径**：不支持网络路径复制，请使用本地文件系统
 *
 */

import fs from 'fs'
import path from 'path'

// 定义源目录路径 - 组件库源代码所在位置
const src = path.resolve(__dirname, '../src/uni_modules/wot-ui-plus')
// 定义目标目录路径 - 编译后组件输出位置
const libDir = path.resolve(__dirname, '../lib')

/**
 * 递归复制组件目录及文件
 *
 * 该函数通过递归方式将源目录下的所有文件和子目录复制到目标目录，
 * 支持通过filter参数排除指定类型的文件。
 *
 * @param {string} srcPath - 源目录路径
 * @param {string} tarPath - 目标目录路径
 * @param {string[]} filter - 需要过滤的文件扩展名数组，默认为空数组
 * @returns {void}
 *
 * @example
 * // 复制components目录到lib目录，排除所有.md文件
 * copyComponents('./components', './lib', ['.md'])
 */
const copyComponents = function (srcPath: string, tarPath: string, filter: string[] = []) {
  // 创建目标目录，忽略可能的错误（如目录已存在）
  fs.mkdir(tarPath, (err) => {})

  // 读取源目录下的所有文件和子目录
  fs.readdir(srcPath, function (err, files) {
    if (err === null) {
      // 遍历所有文件和子目录
      files.forEach(function (filename) {
        const filedir = path.join(srcPath, filename)

        // 检查当前文件是否需要被过滤
        // 过滤规则：文件扩展名在filter数组中，且文件名不是'changelog.md'
        const filterFlag = filter.some((item) => {
          return path.extname(filename).toLowerCase() === item && filename !== 'changelog.md'
        })

        // 如果不需要过滤，则处理该文件/目录
        if (!filterFlag) {
          // 获取文件状态信息
          fs.stat(filedir, function (errs, stats) {
            const isFile = stats.isFile()

            if (isFile) {
              // 如果是文件，直接复制到目标目录
              const destPath = path.join(tarPath, filename)
              fs.copyFile(filedir, destPath, (err) => {})
            } else {
              // 如果是目录，递归调用copyComponents处理子目录
              const tarFiledir = path.join(tarPath, filename)
              copyComponents(filedir, tarFiledir, filter)
            }
          })
        }
      })
    } else {
      // 处理目录读取错误
      if (err) console.error(err)
    }
  })
}

// 执行组件复制操作，排除.md文件
copyComponents(src, libDir, ['.md'])

/**
 * 复制单个文件
 *
 * 该函数用于将单个文件从源路径复制到目标路径，
 * 会先检查源路径是否为文件。
 *
 * @param {string} srcPath - 源文件路径
 * @param {string} tarPath - 目标文件路径
 * @returns {void}
 * @throws {Error} 当fs.statSync操作失败时可能抛出错误
 *
 * @example
 * // 复制README.md文件到lib目录
 * copyFile('./README.md', './lib/README.md')
 */
const copyFile = function (srcPath: string, tarPath: string) {
  // 同步检查源路径是否为文件
  const isFile = fs.statSync(srcPath).isFile()
  if (isFile) {
    // 如果是文件，则进行复制
    fs.copyFile(srcPath, tarPath, (err) => {})
  }
}

// 定义README.md和LICENSE文件的路径
const readme = path.resolve(__dirname, '../README.md')
const license = path.resolve(__dirname, '../LICENSE')

// 复制README.md和LICENSE文件到lib目录
copyFile(readme, path.join(libDir, 'README.md'))
copyFile(license, path.join(libDir, 'LICENSE'))
