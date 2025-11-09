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
