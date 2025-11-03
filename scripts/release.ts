/**
 * 组件库版本发布工具
 *
 * 本脚本是wot-ui-plus组件库发布系统的核心工具，提供交互式的版本发布流程，
 * 自动处理版本号更新、文档更新、代码构建、Git提交和标签创建等发布相关操作。
 *
 * 核心功能：
 * - 交互式版本类型选择（patch/minor/major）
 * - 自动更新package.json版本号
 * - 更新文档中的版本标识
 * - 执行构建、lint等发布前检查
 * - 自动Git提交和标签创建
 *
 * 设计思路：
 * - 使用inquirer提供友好的命令行交互界面
 * - 通过child_process执行系统命令
 * - 采用递归方式处理文档目录中的版本标识
 * - 集成完整的发布工作流，确保发布过程标准化
 *
 * 使用场景：
 * - 组件库的正式版本发布
 * - 维护版本号的一致性和文档同步
 * - 自动化发布流程，减少人工操作失误
 *
 * 注意事项：
 * - 执行前确保已完成所有代码提交，避免未提交的修改被包含
 * - 需要确保有足够的权限执行Git操作和npm发布
 * - 本脚本会直接修改文件并执行Git命令，请谨慎使用
 */

import inquirer from 'inquirer'
import { execSync } from 'child_process'
import { writeFileSync, readFileSync, readdirSync, statSync } from 'fs'
import path from 'path'

// 定义组件库源码目录路径
const src = path.resolve(__dirname, '../src/uni_modules/wot-ui-plus')
// 获取当前package.json中的版本号
const oldVersion = require('../package.json').version
// 定义文档中需要被替换的最低版本占位符
const LOWEST_VERSION = '$LOWEST_VERSION$'

/**
 * 更新文档中的最低版本标识
 *
 * 该函数递归遍历指定目录下的所有Markdown文件，将其中的最低版本占位符
 * 替换为指定的版本号，确保文档中引用的版本信息与实际发布版本一致。
 *
 * @param {string} dir - 要遍历的目录路径
 * @param {string} version - 新的版本号
 * @returns {void}
 * @throws {Error} 当文件读取或写入权限不足时可能抛出异常
 * @example
 * // 更新docs目录中的所有文档版本标识
 * handleLowestVersion('./docs', '1.2.3')
 */
const handleLowestVersion = (dir: string, version: string) => {
  // 读取目录中的所有文件和子目录
  const files = readdirSync(dir)

  // 遍历每个文件/目录
  for (const item of files) {
    const itemPath = path.resolve(dir, item)
    const stat = statSync(itemPath)

    if (stat.isFile()) {
      // 如果是文件，且为Markdown文件
      if (item.endsWith('.md')) {
        // 读取文件内容
        let content = readFileSync(itemPath, 'utf-8')

        // 检查并替换版本占位符
        if (content.includes(LOWEST_VERSION)) {
          content = content.replace(/\$LOWEST_VERSION\$/g, version)
          writeFileSync(itemPath, content)
        }
      }
    } else {
      // 如果是目录，递归调用handleLowestVersion
      handleLowestVersion(itemPath, version)
    }
  }
}

// 启动交互式命令行流程
inquirer
  .prompt([
    {
      type: 'list',
      name: 'version',
      message: '请选择发版类型（默认值：✨ minor)',
      choices: ['🐛 patch 小版本', '✨ minor 中版本', '🚀 major 大版本'],
      default: '✨ minor 中版本'
    },
    {
      type: 'list',
      name: 'release',
      message: '确认发布？',
      choices: ['Y', 'N'],
      default: 'Y'
    }
  ])
  .then((answers: any) => {
    // 检查用户是否确认发布
    if (!answers['release'] || answers['release'].toLowerCase() != 'y') {
      console.log('🚨 操作取消')
      return
    }

    // 根据用户选择的版本类型执行相应的版本更新命令
    switch (answers['version']) {
      case '🐛 patch 小版本':
        execSync('pnpm release-patch')
        break
      case '✨ minor 中版本':
        execSync('pnpm release-minor')
        break
      case '🚀 major 大版本':
        execSync('pnpm release-major')
        break
      default:
        execSync('pnpm release-minor')
        break
    }

    // 生成更新日志
    execSync('pnpm build:changelog')

    // 获取更新后的版本号
    const file = readFileSync(path.resolve(__dirname, '../package.json'))
    const packageJson = JSON.parse(file.toString())
    const newVersion = packageJson.version

    // 更新文档中的最低版本标识
    handleLowestVersion(path.resolve(__dirname, '../docs'), newVersion)

    console.log(`√ bumping version in package.json from ${oldVersion} to ${newVersion}`)

    // 更新组件库源码目录中的package.json版本号
    const tarfetPackageJson = require('../src/uni_modules/wot-ui-plus/package.json')
    tarfetPackageJson.version = newVersion
    writeFileSync(path.resolve(src, 'package.json'), JSON.stringify(tarfetPackageJson))

    // 执行发布前的构建和检查任务
    execSync('pnpm build:theme-vars') // 构建主题变量
    execSync('pnpm lint') // 代码质量检查

    // 执行Git操作
    execSync('git add -A ') // 添加所有更改
    execSync(`git commit -am "build: compile ${newVersion}"`)
    execSync(`git tag -a v${newVersion} -am "chore(release): ${newVersion}"`)

    console.log('√ committing changes')

    // 获取当前Git分支名称
    const branch = execSync('git branch --show-current').toString().replace(/\*/g, '').replace(/ /g, '')

    // 输出成功信息和后续步骤提示
    console.log('🎉 版本发布成功')
    const tip = 'Run `git push --follow-tags origin ' + branch + '` ' + 'to publish'
    console.log(tip.replace(/\n/g, ''))
  })
  .catch((error: any) => {
    // 错误处理
    if (error.isTtyError) {
      // 交互式提示无法在当前环境中渲染的错误
    } else {
      // 其他类型的错误
    }
  })
