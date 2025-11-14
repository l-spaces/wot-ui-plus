/**
 * @fileoverview Demo构建产物复制脚本 - 用于将H5构建产物复制到文档站点
 * @description 该脚本在VitePress文档构建流程中负责将UniApp H5平台的构建产物复制到文档站点的demo目录
 *              实现组件库文档与实际demo的集成展示，确保文档中的demo能够正常运行
 *
 * 核心功能：
 * - 递归复制H5构建产物到文档站点
 * - 保持目录结构和文件完整性
 * - 支持文档构建流程的自动化集成
 *
 * 设计思路：
 * - 使用Node.js原生fs模块进行文件系统操作
 * - 采用递归算法处理嵌套目录结构
 * - 通过path模块确保跨平台路径兼容性
 * - 集成到VitePress构建流程中实现自动化
 *
 * 架构定位：
 * - 构建工具链中的后处理脚本
 * - 文档站点构建流程的关键环节
 * - 连接开发构建与文档展示的桥梁
 *
 */

import fs from 'fs'
import path from 'path'

// 源目录：UniApp H5平台构建产物输出目录
const srcRoot = path.join(__dirname, '../dist/build/h5')

// 目标目录：VitePress文档站点的demo资源目录
const targetSrcRoot = path.join(__dirname, '../docs/.vitepress/dist/demo')

function copyFolder(sourceDir: string, targetDir: string) {
  // 创建目标目录，recursive: true 确保父目录自动创建
  fs.mkdirSync(targetDir, { recursive: true })

  // 获取源目录下的所有文件和子目录名称
  const fileNames = fs.readdirSync(sourceDir)

  // 遍历处理每个文件/目录
  fileNames.forEach((fileName) => {
    // 构建源文件/目录的完整路径
    const sourcePath = path.join(sourceDir, fileName)
    // 构建目标文件/目录的完整路径
    const targetPath = path.join(targetDir, fileName)

    // 判断当前路径是否为目录
    if (fs.statSync(sourcePath).isDirectory()) {
      // 递归复制子目录
      copyFolder(sourcePath, targetPath)
    } else {
      // 直接复制文件
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

/**
 * 执行demo复制操作
 * @description 脚本入口点，执行从H5构建产物到文档站点的完整复制流程
 *              该操作在package.json的build:docs脚本中被自动调用
 *
 * 执行时机：
 * - 在UniApp H5构建完成后
 * - 在VitePress文档构建过程中
 * - 确保demo资源在文档站点发布前就位
 *
 * 数据流向：
 * ../dist/build/h5 -> ../docs/.vitepress/dist/demo
 *
 * 使用场景：
 * - 文档站点构建流程
 * - CI/CD自动化部署
 * - 本地开发预览
 */
copyFolder(srcRoot, targetSrcRoot)
