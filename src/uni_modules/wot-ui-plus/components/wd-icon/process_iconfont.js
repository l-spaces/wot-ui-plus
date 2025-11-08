const fs = require('fs')
const path = require('path')

// 读取文件路径
const inputFilePath = path.join(__dirname, 'iconfont.md')
const outputFilePath = path.join(__dirname, 'iocn.md')

try {
  // 读取文件内容
  const content = fs.readFileSync(inputFilePath, 'utf8')
  const lines = content.split('\n')

  let cssContent = ''
  let iconNames = []

  // 处理每一行
  lines.forEach((line) => {
    // 跳过空行
    if (!line.trim()) return

    // 提取'- '后面的内容
    if (line.startsWith('-')) {
      const mainContent = line.substring(1).trim()

      // 提取&#x和;之间的内容
      const unicodeMatch = mainContent.match(/&#x([^;]+);/)
      if (unicodeMatch) {
        const unicode = unicodeMatch[1]

        // 提取;后的内容
        const iconClassMatch = mainContent.match(/;([^;]+)$/)
        if (iconClassMatch) {
          const iconClass = iconClassMatch[1]

          // 提取&#x前的内容
          const iconName = mainContent.split('&#x')[0].trim()

          // 生成CSS格式
          cssContent += `.${iconClass}:before { \n   content: '\\${unicode}'; \n }\n\n`

          // 添加到图标名称数组
          iconNames.push(`'${iconName}'`)
        }
      }
    }
  })

  // 生成最终内容
  const finalContent = cssContent + iconNames.join(', ')

  // 写入文件
  fs.writeFileSync(outputFilePath, finalContent, 'utf8')

  console.log(`处理完成！结果已写入：${outputFilePath}`)
  console.log(`共处理 ${iconNames.length} 个图标`)
} catch (error) {
  console.error('处理过程中出现错误：', error.message)
}
