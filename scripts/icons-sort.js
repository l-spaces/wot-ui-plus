const fs = require('fs')
const path = require('path')

// 文件路径
const filePath = path.join(__dirname, '../src/uni_modules/wot-ui-plus/components/wd-icon/iocn.md')

// 自定义排序函数
function customSort(a, b) {
  // 提取第一个单词（连字符前的部分）
  const firstWordA = a.split('-')[0].toLowerCase()
  const firstWordB = b.split('-')[0].toLowerCase()

  // 首先按第一个单词排序
  if (firstWordA !== firstWordB) {
    return firstWordA.localeCompare(firstWordB)
  }

  // 如果第一个单词相同，则按整个字符串排序
  return a.localeCompare(b)
}

// 处理文件内容
function processFile() {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8')

    // 提取所有单引号内的字符串
    // 注意：这里使用正则表达式匹配所有单引号内的内容
    const singleQuotePattern = /'(.*?)'/g
    const matches = content.match(singleQuotePattern)

    if (!matches || matches.length === 0) {
      console.log('未找到单引号内的内容')
      return
    }

    // 提取不含引号的字符串内容
    const iconNames = matches.map((match) => match.slice(1, -1))
    console.log(`找到 ${iconNames.length} 个图标名称`)

    // 按自定义规则排序
    const sortedNames = [...iconNames].sort(customSort)

    // 创建一个映射，用于替换内容
    let result = content
    let currentIndex = 0

    // 替换所有单引号内的内容为排序后的内容
    result = result.replace(/'(.*?)'/g, () => `'${sortedNames[currentIndex++]}'`)

    // 将结果写回文件
    fs.writeFileSync(filePath, result, 'utf8')

    console.log('排序完成！文件已更新。')
    console.log('排序规则：')
    console.log('1. 首先按照连字符前的第一个单词部分进行排序')
    console.log('2. 当第一个单词相同时，再按照整个字符串首字母的字母顺序进行二次排序')
  } catch (error) {
    console.error('处理过程中出现错误：', error.message)
  }
}

// 执行处理
processFile()
