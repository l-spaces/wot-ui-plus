/**
 * 组件演示文件复制工具
 *
 * 本脚本是wot-ui-plus组件库文档构建系统的重要组成部分，主要负责将构建后的H5演示文件
 * 复制到VitePress文档站点的演示目录中，用于在文档中展示组件的实际运行效果。
 *
 * 核心功能：
 * - 递归复制整个目录结构及其文件
 * - 自动创建目标目录（包括多级目录）
 * - 支持同步方式处理文件复制操作
 *
 * 设计思路：
 * - 使用Node.js的fs模块实现同步文件操作，确保复制操作的完整性
 * - 采用递归方式处理复杂的目录结构
 * - 一次性复制所有组件演示文件，为文档站点提供实时预览功能
 *
 * 使用场景：
 * - 文档站点构建前，准备组件演示资源
 * - 组件库开发过程中，更新文档中的演示示例
 * - 版本发布前，确保文档站点包含最新的组件演示
 *
 * 注意事项：
 * - 本脚本使用同步文件操作，对于大量文件可能会阻塞事件循环
 * - 执行前确保源目录存在，否则会抛出异常
 * - 目标目录会被自动创建，无需手动准备
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
 * 该函数通过递归方式将源文件夹下的所有文件和子文件夹完整复制到目标文件夹，
 * 支持多级目录结构的复制，并会自动创建不存在的目标目录。
 *
 * @param {string} sourceDir - 源文件夹路径
 * @param {string} targetDir - 目标文件夹路径
 * @returns {void}
 * @throws {Error} 当源路径不存在或无法访问时抛出异常
 * @throws {Error} 当文件操作权限不足时抛出异常
 *
 * @example
 * // 复制组件演示目录到文档站点
 * copyFolder('./dist/build/h5', './docs/.vitepress/dist/demo')
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

// 执行文件夹复制操作，将H5构建产物复制到文档演示目录
copyFolder(srcRoot, targetSrcRoot)
