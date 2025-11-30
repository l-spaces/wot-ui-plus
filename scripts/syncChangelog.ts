/**
 * CHANGELOG同步工具
 *
 * 本脚本是wot-ui-plus组件库文档同步系统的核心工具，负责将项目根目录的
 * 主CHANGELOG.md文件同步到组件库源码目录和文档网站目录，确保版本变更记录
 * 在项目的各个部分保持一致和同步。
 *
 */

import fs from 'fs'
import path from 'path'

/**
 * 同步配置接口定义
 *
 * @interface SyncConfig
 * @property {string} fromPath - 源文件路径
 * @property {Array<{path: string, createDir?: boolean}>} targets - 目标文件配置数组
 * @property {string} targets[].path - 目标文件路径
 * @property {boolean} [targets[].createDir] - 是否自动创建不存在的目标目录
 */
type SyncConfig = {
  fromPath: string
  targets: {
    path: string
    createDir?: boolean
  }[]
}

/**
 * 同步CHANGELOG内容到指定目标路径
 *
 * 该函数负责从源文件读取CHANGELOG内容，并同步到多个指定的目标路径。
 * 支持自动创建不存在的目标目录，以及提供完善的错误处理和日志输出。
 *
 * @param {SyncConfig} config - 同步配置对象
 * @returns {void}
 * @throws {Error} 当源文件不存在、没有文件读写权限或目标路径无效时可能抛出异常
 * @example
 * // 同步CHANGELOG到多个目标路径
 * syncChangelog({
 *   fromPath: './CHANGELOG.md',
 *   targets: [
 *     { path: './src/components/changelog.md' },
 *     { path: './docs/guide/changelog.md', createDir: true }
 *   ]
 * })
 */
const syncChangelog = (config: SyncConfig): void => {
  const { fromPath, targets } = config

  try {
    // 读取主CHANGELOG.md文件内容
    const content = fs.readFileSync(fromPath, 'utf-8')

    // 遍历所有目标位置进行同步
    targets.forEach((target) => {
      const { path: targetPath, createDir } = target
      const targetDir = path.dirname(targetPath)

      // 如果配置了创建目录且目录不存在，则递归创建目录结构
      if (createDir && !fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      // 将CHANGELOG内容写入目标文件
      fs.writeFileSync(targetPath, content)
    })

    console.log('Changelog 同步成功')
  } catch (error) {
    // 捕获并输出同步过程中的错误
    console.error('Changelog 同步失败:', error)
  }
}

// 获取当前工作目录
const cwd = process.cwd()

// 执行CHANGELOG同步操作
// 从项目根目录同步CHANGELOG.md到：
// 1. 组件库源码目录
// 2. 中文文档目录
// 3. 英文文档目录（自动创建不存在的目录）
syncChangelog({
  fromPath: path.resolve(cwd, 'CHANGELOG.md'),
  targets: [
    {
      path: path.resolve(cwd, 'src/uni_modules/wot-ui-plus/changelog.md')
    },
    {
      path: path.resolve(cwd, 'docs/guide/changelog.md')
    },
    {
      path: path.resolve(cwd, 'docs/en-US/guide/changelog.md'),
      createDir: true
    }
  ]
})
