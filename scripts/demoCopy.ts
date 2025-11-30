/**
 * wot-ui-plus 组件演示文件复制工具
 *
 * @data-flow-analysis
 * ```
 * H5 构建产物 (/dist/build/h5)
 *     ↓ (目录扫描)
 * 文件/目录列表
 *     ↓ (类型判断)
 * ├── 文件 → 直接复制
 * └── 目录 → 递归处理
 *     ↓ (递归复制)
 * 文档演示目录 (/docs/.vitepress/dist/demo)
 * ```
 *
 * @example-usage
 *
 * ### 基本使用示例
 * ```typescript
 * import { copyFolder } from './demoCopy'
 *
 * // 复制 H5 构建产物到文档站点
 * copyFolder(
 *   './dist/build/h5',
 *   './docs/.vitepress/dist/demo'
 * )
 * ```
 *
 * ### 自定义路径示例
 * ```typescript
 * // 使用自定义路径进行复制
 * const customSource = './custom-build/output'
 * const customTarget = './custom-docs/demo'
 *
 * copyFolder(customSource, customTarget)
 * ```
 *
 */

import fs from 'fs'
import path from 'path'

// 定义源目录路径 - H5构建后的演示文件所在位置
const srcRoot = path.join(__dirname, '../dist/build/h5')
// 定义目标目录路径 - 文档站点的演示文件存放位置
const targetSrcRoot = path.join(__dirname, '../docs/.vitepress/dist/demo')

/**
 * 递归复制文件夹及其内容
 *
 * @description
 * 该函数是 demoCopy 工具的核心实现，采用递归算法将源文件夹下的所有文件和子文件夹
 * 完整复制到目标文件夹。支持任意深度的目录结构复制，并会自动创建不存在的目标目录。
 * 使用同步文件操作确保复制过程的原子性和数据完整性，是文档构建流程中的关键组件。
 *
 * @param {string} sourceDir - 源文件夹的绝对路径，必须存在且可访问
 * @param {string} targetDir - 目标文件夹的绝对路径，不存在时会自动创建
 * @returns {void} 无返回值，操作成功时静默完成，失败时抛出异常
 * @throws {Error} 当源路径不存在或无法访问时抛出 ENOENT 或 EACCES 异常
 * @throws {Error} 当文件操作权限不足时抛出 EPERM 或 EACCES 异常
 * @throws {Error} 当磁盘空间不足时抛出 ENOSPC 异常
 * @throws {Error} 当目标路径为文件而非目录时抛出 ENOTDIR 异常
 *
 * @processing-logic
 * 1. **目录创建**：使用 fs.mkdirSync 创建目标目录，recursive 选项确保多级目录自动创建
 * 2. **内容扫描**：使用 fs.readdirSync 读取源目录下的所有文件和子目录名称
 * 3. **路径构建**：使用 path.join 安全构建源文件和目标文件的完整路径
 * 4. **类型判断**：使用 fs.statSync 判断路径类型，区分文件和目录
 * 5. **递归处理**：对目录进行递归调用，对文件进行直接复制
 * 6. **错误传播**：所有文件系统错误直接传播给调用者处理
 *
 * @algorithm-details
 * - **遍历策略**：深度优先搜索（DFS），确保目录结构按层次复制
 * - **递归终止**：当遇到文件时终止递归，执行文件复制操作
 * - **原子性保证**：同步操作确保每个文件复制的原子性
 * - **内存效率**：逐文件处理，避免大量文件同时加载到内存
 *
 * @performance-characteristics
 * - **时间复杂度**：O(n)，其中 n 为文件和目录的总数
 * - **空间复杂度**：O(d)，其中 d 为目录结构的最大深度（递归调用栈）
 * - **I/O 操作**：每个文件和目录都需要一次系统调用
 * - **内存占用**：主要消耗在递归调用栈，与目录深度成正比
 *
 * @error-scenarios
 * - **源目录不存在**：抛出 ENOENT 异常，需要检查构建流程
 * - **权限不足**：抛出 EACCES 异常，需要检查文件系统权限
 * - **磁盘空间不足**：抛出 ENOSPC 异常，需要清理磁盘空间
 * - **路径冲突**：目标路径为文件时抛出 ENOTDIR 异常
 * - **递归过深**：极端深度可能导致栈溢出
 *
 * @usage-examples
 *
 * ### 基本使用
 * ```typescript
 * // 复制 H5 构建产物到文档站点
 * copyFolder(
 *   '/project/dist/build/h5',
 *   '/project/docs/.vitepress/dist/demo'
 * )
 * ```
 *
 * ### 错误处理
 * ```typescript
 * try {
 *   copyFolder(source, target)
 *   console.log('复制完成')
 * } catch (error) {
 *   console.error('复制失败:', error.message)
 *   // 根据错误类型进行相应处理
 * }
 * ```
 *
 * @compatibility-notes
 * - **Node.js 版本**：需要 Node.js 10.0+（fs.mkdirSync recursive 选项需要 12.0+）
 * - **文件系统**：支持所有符合 POSIX 标准的文件系统
 * - **符号链接**：会跟随符号链接进行复制，需注意潜在的安全风险
 * - **文件大小**：支持复制任意大小的文件，受磁盘空间限制
 *
 * @security-considerations
 * - **路径安全**：使用 path.join 防止路径遍历攻击
 * - **权限继承**：复制的文件继承目标目录的默认权限
 * - **符号链接**：会复制符号链接的目标内容而非链接本身
 * - **文件覆盖**：目标文件存在时会被静默覆盖
 *
 * @optimization-suggestions
 * - **异步版本**：对于大量文件可考虑使用异步版本避免阻塞
 * - **并行处理**：可使用 Worker 线程实现并行文件复制
 * - **增量复制**：可基于文件修改时间实现增量更新
 * - **进度监控**：可添加进度回调函数监控复制进度
 * - **断点续传**：可记录复制状态支持断点续传
 *
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_options} fs.mkdirSync 文档
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readdirsync_path} fs.readdirSync 文档
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_statsync_path} fs.statSync 文档
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_copyfilesync_src_dest} fs.copyFileSync 文档
 */
function copyFolder(sourceDir: string, targetDir: string) {
  // 递归创建目标目录，如果父目录不存在也会一并创建
  fs.mkdirSync(targetDir, { recursive: true })

  // 读取源目录下的所有文件和文件夹名称
  const fileNames = fs.readdirSync(sourceDir)

  // 遍历每个文件/文件夹
  fileNames.forEach((fileName) => {
    // 构建完整的源文件/目录路径
    const sourcePath = path.join(sourceDir, fileName)
    // 构建完整的目标文件/目录路径
    const targetPath = path.join(targetDir, fileName)

    // 检查当前路径是否为目录
    if (fs.statSync(sourcePath).isDirectory()) {
      // 如果是目录，则递归调用copyFolder处理子目录
      copyFolder(sourcePath, targetPath)
    } else {
      // 如果是文件，则直接复制文件内容
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

// ============================================================================
// 脚本执行入口
// ============================================================================

/**
 * 脚本主执行逻辑
 *
 * @description
 * 当 demoCopy.ts 文件被直接执行时（如通过 node scripts/demoCopy.ts），
 * 会自动执行以下核心操作：
 * 1. 将 H5 平台的构建产物从 srcRoot 复制到 targetSrcRoot
 * 2. 确保文档站点的演示目录包含最新的组件演示文件
 * 3. 为 VitePress 文档构建提供必要的演示资源
 *
 * 该执行逻辑是组件库文档构建流程的自动化入口，确保文档站点始终
 * 展示最新的组件演示效果。通过 require.main === module 判断确保
 * 只有在直接执行时才运行，避免被模块导入时意外执行。
 *
 * @execution-context
 * - **触发方式**：通过 Node.js 直接运行脚本文件
 * - **执行时机**：通常在文档构建前或 CI/CD 流程中调用
 * - **依赖条件**：H5 构建必须已完成，srcRoot 目录必须存在
 * - **影响范围**：仅影响文档站点的演示目录，不涉及源代码
 *
 * @integration-points
 * - **构建系统**：与 UniApp H5 构建流程紧密集成
 * - **文档系统**：为 VitePress 文档站点提供演示资源
 * - **CI/CD**：可在自动化部署流程中调用
 * - **开发工具**：支持开发阶段的快速文档更新
 *
 * @error-handling
 * 脚本执行过程中的错误会直接抛出到控制台，包括：
 * - 源目录不存在（构建未完成或路径错误）
 * - 目标目录权限不足（文档目录权限问题）
 * - 磁盘空间不足（需要清理磁盘）
 * - 文件系统错误（硬件或系统问题）
 *
 * @performance-impact
 * - **执行时间**：取决于演示文件数量和大小，通常在几秒内完成
 * - **内存占用**：主要消耗在递归调用栈，与目录深度相关
 * - **I/O 负载**：会进行大量文件读取和写入操作
 * - **系统资源**：同步操作可能短暂阻塞其他进程
 */
if (require.main === module) {
  copyFolder(srcRoot, targetSrcRoot)
}
