#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

/**
 * 批量重命名文件脚本
 * 功能：
 * 1. 遍历指定目录下的所有文件
 * 2. 移除文件名开头的"wd-"前缀
 * 3. 将kebab-case格式转换为驼峰命名格式
 * 4. 保留文件原有扩展名
 * 5. 执行前显示重命名预览
 * 6. 包含错误处理机制
 */

// 配置参数
const SOURCE_DIR = 'd:\\IdeaSpace\\GitSpace\\wot-ui-plus\\doc\\components'
// eslint-disable-next-line no-control-regex
const ILLEGAL_CHARACTERS = /[<>:/\\|?*"\x00-\x1F]/g

/**
 * 将kebab-case格式转换为驼峰命名格式
 * @param str - kebab-case格式的字符串
 * @returns 驼峰命名格式的字符串
 */
function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
}

/**
 * 检查文件名是否包含非法字符
 * @param filename - 要检查的文件名
 * @returns 不包含非法字符的文件名
 */
function sanitizeFilename(filename: string): string {
  return filename.replace(ILLEGAL_CHARACTERS, '_')
}

/**
 * 转换文件名
 * @param {string} originalName - 原始文件名
 * @returns {string} 转换后的文件名
 */
function transformFilename(originalName) {
  // 分离文件名和扩展名
  const extname = path.extname(originalName)
  const basename = path.basename(originalName, extname)

  // 移除"wd-"前缀
  let transformed = basename.startsWith('wd-') ? basename.slice(3) : basename

  // 转换为驼峰命名
  transformed = kebabToCamelCase(transformed)

  // 添加扩展名
  transformed += extname

  // 清理非法字符
  return sanitizeFilename(transformed)
}

/**
 * 获取所有需要重命名的文件列表
 * @param {string} dir - 源目录路径
 * @returns {Array} 文件信息数组
 */
function getFilesToRename(dir) {
  const files = []

  try {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const oldPath = path.join(dir, item)
      const stats = fs.statSync(oldPath)

      // 只处理文件，不处理目录
      if (stats.isFile()) {
        const newName = transformFilename(item)
        const newPath = path.join(dir, newName)

        // 只有当文件名发生变化时才添加到列表中
        if (newName !== item) {
          files.push({ oldPath, oldName: item, newName, newPath })
        }
      }
    }
  } catch (error) {
    console.error('读取目录失败:', error.message || String(error))
    process.exit(1)
  }

  return files
}

/**
 * 显示重命名预览
 * @param files - 文件信息数组
 */
function showPreview(files: Array<{ oldName: string; newName: string }>): void {
  console.log('\n=== 重命名预览 ===')
  console.log('序号 | 原文件名 | 新文件名')
  console.log('--- | --- | ---')

  files.forEach((file, index) => {
    console.log(`${index + 1} | ${file.oldName} | ${file.newName}`)
  })

  console.log(`\n总计：${files.length} 个文件将被重命名`)
}

/**
 * 检查是否存在文件名冲突
 * @param {Array} files - 文件信息数组
 * @returns {boolean} 是否存在冲突
 */
function checkConflicts(files) {
  const newNames = files.map((file) => file.newName)
  const uniqueNames = new Set(newNames)

  if (newNames.length !== uniqueNames.size) {
    console.error('\n错误：存在文件名冲突，请检查转换规则！')

    // 找出冲突的文件名
    const nameCount = {}
    newNames.forEach((name) => {
      nameCount[name] = (nameCount[name] || 0) + 1
    })

    console.log('冲突的文件名：')
    Object.entries(nameCount)
      .filter(([_, count]) => count > 1)
      .forEach(([name, count]) => {
        console.log(`- ${name} (出现 ${count} 次)`)
      })

    return true
  }

  return false
}

/**
 * 执行实际的重命名操作
 * @param {Array} files - 文件信息数组
 */
function performRename(files) {
  let successCount = 0
  let errorCount = 0

  console.log('\n=== 开始执行重命名操作 ===')

  for (const file of files) {
    try {
      fs.renameSync(file.oldPath, file.newPath)
      console.log(`✓ 成功：${file.oldName} → ${file.newName}`)
      successCount++
    } catch (error) {
      console.error(`✗ 失败：${file.oldName} → ${file.newName}`)
      console.error(`  原因：${error.message || String(error)}`)
      errorCount++
    }
  }

  console.log('\n=== 重命名操作完成 ===')
  console.log(`成功：${successCount} 个文件`)
  console.log(`失败：${errorCount} 个文件`)
}

/**
 * 主函数
 */
function main() {
  console.log('批量重命名文件脚本启动...')

  // 获取需要重命名的文件列表
  const filesToRename = getFilesToRename(SOURCE_DIR)

  if (filesToRename.length === 0) {
    console.log('没有需要重命名的文件')
    return
  }

  // 显示预览
  showPreview(filesToRename)

  // 检查文件名冲突
  if (checkConflicts(filesToRename)) {
    console.log('\n由于存在文件名冲突，操作已取消')
    process.exit(1)
  }

  // 询问用户是否确认执行
  if (process.stdin.isTTY) {
    console.log('\n是否确认执行重命名操作？(y/n)')

    process.stdin.setEncoding('utf8')

    process.stdin.on('data', (chunk) => {
      const input = chunk.trim().toLowerCase()

      if (input === 'y' || input === 'yes') {
        performRename(filesToRename)
      } else if (input === 'n' || input === 'no') {
        console.log('操作已取消')
      } else {
        console.log('无效输入，请输入 y 或 n')
        return
      }

      process.stdin.end()
    })
  } else {
    // 非交互模式下直接执行
    console.log('\n非交互模式，直接执行重命名操作')
    performRename(filesToRename)
  }
}

// 执行主函数
main()
