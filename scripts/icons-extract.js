/**
 * @fileoverview 图标名称自动提取脚本
 * @description
 * 本文件是 wot-ui-plus 项目中的自动化构建脚本，用于从 CSS 文件中自动提取图标类名并生成文档。
 * 该脚本通过解析 iconfont.css 文件中的 CSS 选择器，提取所有以 wd-icon- 开头的图标名称，
 * 并将其转换为文档格式，确保图标文档与实际 CSS 定义保持同步。
 *
 */

const fs = require('fs')
const path = require('path')

// 简单的提取脚本
const cssContent = fs.readFileSync(path.join(__dirname, '../src/uni_modules/wot-ui-plus/components/wd-icon/iconfont.css'), 'utf8')
const lines = cssContent.split('\n')
const iconNames = []

lines.forEach((line) => {
  if (line.startsWith('.wd-icon-') && line.includes(':before')) {
    const start = '.wd-icon-'.length
    const end = line.indexOf(':before')
    if (end > start) {
      const iconName = line.substring(start, end)
      iconNames.push(`'${iconName}'`)
    }
  }
})

console.log('提取到的图标数量:', iconNames.length)
if (iconNames.length > 0) {
  const result = iconNames.join(', ')
  fs.writeFileSync(path.join(__dirname, '../src/uni_modules/wot-ui-plus/components/wd-icon/iocn.md'), result, 'utf8')
  console.log('已写入到iocn.md文件')
}
