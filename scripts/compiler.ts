/**
 * 组件库编译构建脚本
 *
 * 本脚本是wot-ui-plus组件库构建系统的重要组成部分，主要负责将源代码目录中的组件复制到lib目录
 * 用于组件库的打包和发布流程。
 *
 * 核心功能：
 * - 递归复制组件目录结构及文件到输出目录
 * - 排除指定类型的文件（如.md文档）
 * - 复制项目配置文件（README.md和LICENSE）到输出目录
 *
 * 设计思路：
 * - 使用Node.js的fs模块实现文件操作
 * - 采用递归方式处理多层目录结构
 * - 提供灵活的文件过滤机制
 *
 * 使用场景：
 * - 组件库构建过程中，将源代码组件复制到发布目录
 * - 在npm打包前准备发布文件
 *
 * 注意事项：
 * - 本脚本执行时会自动创建目标目录
 * - 错误处理采用简单的日志输出方式
 * - 所有文件复制操作均为异步执行
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
