const fs = require('fs')
const path = require('path')

// 文件路径
const mdFilePath = path.join(__dirname, '../src/uni_modules/wot-ui-plus/components/wd-icon/iocn.md')
const tsFilePath = path.join(__dirname, '../docs/component/icon.ts')

// 提取单引号字符串的函数
function extractQuotedStrings(content) {
  const regex = /'([^']+)'/g
  const matches = []
  let match
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1])
  }
  return matches
}

// 读取文件内容
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`读取文件失败: ${filePath}`, error.message)
    return ''
  }
}

// 主对比函数
function compareFiles() {
  console.log('开始对比文件...')

  // 读取文件内容
  const mdContent = readFileContent(mdFilePath)
  const tsContent = readFileContent(tsFilePath)

  // 提取单引号字符串
  const mdStrings = extractQuotedStrings(mdContent)
  const tsStrings = extractQuotedStrings(tsContent)

  console.log(`从 ${mdFilePath} 提取到 ${mdStrings.length} 个字符串`)
  console.log(`从 ${tsFilePath} 提取到 ${tsStrings.length} 个字符串`)

  // 创建集合用于快速查找
  const mdSet = new Set(mdStrings)
  const tsSet = new Set(tsStrings)

  // 找出仅在第一个文件中的字符串
  const onlyInMd = mdStrings.filter((str) => !tsSet.has(str))

  // 找出仅在第二个文件中的字符串
  const onlyInTs = tsStrings.filter((str) => !mdSet.has(str))

  // 输出对比结果
  console.log('\n========== 对比结果 ==========')

  if (onlyInMd.length > 0) {
    console.log(`\n仅存在于 iocn.md 的字符串 (${onlyInMd.length} 个):`)
    console.log(onlyInMd.sort().join(', '))
  } else {
    console.log('\n没有仅存在于 iocn.md 的字符串')
  }

  if (onlyInTs.length > 0) {
    console.log(`\n仅存在于 icon.ts 的字符串 (${onlyInTs.length} 个):`)
    console.log(onlyInTs.sort().join(', '))
  } else {
    console.log('\n没有仅存在于 icon.ts 的字符串')
  }

  // 检查两个文件是否完全相同
  const isIdentical = onlyInMd.length === 0 && onlyInTs.length === 0
  console.log(`\n两个文件的单引号字符串集合是否完全相同: ${isIdentical ? '是' : '否'}`)

  return {
    onlyInMd,
    onlyInTs,
    totalInMd: mdStrings.length,
    totalInTs: tsStrings.length,
    isIdentical
  }
}

// 执行对比
compareFiles()
