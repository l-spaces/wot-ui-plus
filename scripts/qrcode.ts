/**
 * 微信小程序码生成工具
 *
 * 本脚本用于为 UniApp 项目中的页面自动生成微信小程序码，并将生成的二维码图片保存到指定目录。
 * 主要功能包括：
 * - 从命令行参数获取微信小程序的 appID 和 appSecret
 * - 获取微信接口访问凭证 access_token
 * - 解析 pages.json 文件，提取所有页面路径
 * - 为每个页面生成对应的小程序码
 * - 支持失败重试机制，提高生成成功率
 *
 * 使用方式：
 * ```bash
 * ts-node scripts/qrcode.ts --APP_ID your_app_id --APP_SECRET your_app_secret
 * ```
 *
 * 注意事项：
 * - 运行脚本前请确保已安装依赖：axios 和 json5
 * - 需要有有效的微信小程序 appID 和 appSecret
 * - 生成的小程序码将保存在 docs/public/wxqrcode 目录下
 */
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import JSON5 from 'json5'

// 从命令行参数中获取微信小程序的 appID 和 appSecret
const appID = process.argv[process.argv.indexOf('--APP_ID') + 1]
const appSecret = process.argv[process.argv.indexOf('--APP_SECRET') + 1]

/**
 * 获取微信接口访问凭证 access_token
 *
 * @returns {Promise<string>} 返回获取到的 access_token
 * @throws {Error} 当获取 access_token 失败时抛出异常
 * @example
 * const token = await getAccessToken();
 * console.log(`获取到 access_token: ${token}`);
 */
async function getAccessToken(): Promise<string> {
  // 构建获取 access_token 的 URL
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`

  try {
    const response = await axios.get(url)
    return response.data.access_token
  } catch (error: any) {
    // 详细记录错误信息，包括响应数据或错误消息
    console.error(`获取 access_token 失败: ${error.response ? error.response.data : error.message}`)
    throw error
  }
}

// 定义 pages.json 文件的路径
const pagesJsonPath = path.join(__dirname, '../src/pages.json')
let pagesJson: any

// 读取并解析 pages.json 文件
try {
  const jsonData = fs.readFileSync(pagesJsonPath, 'utf8')
  // 使用 JSON5 解析，支持更多格式的 JSON 文件
  pagesJson = JSON5.parse(jsonData)
} catch (error: any) {
  console.error(`读取或解析 pages.json 失败: ${error.message}`)
  // 解析失败时直接退出程序
  process.exit(1)
}

// 提取主包中路径以 Index 结尾的页面
const pages = pagesJson.pages.filter((page: { path: string }) => page.path.endsWith('Index'))

// 提取分包中的所有页面
if (pagesJson.subPackages) {
  pagesJson.subPackages.forEach((subPackage: { root: string; pages: Record<string, any>[] }) => {
    subPackage.pages.forEach((page: Record<string, any>) => {
      // 组合成完整的页面路径
      pages.push({ path: `${subPackage.root}/${page.path}` })
    })
  })
}

/**
 * 将驼峰命名法转换为短横线命名法
 *
 * @param {string} str - 要转换的字符串
 * @returns {string} 转换后的短横线命名法字符串
 * @example
 * const kebabStr = camelToKebabCase('testCase'); // 返回 'test-case'
 */
function camelToKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 在小写字母和大写字母之间添加短横线
    .replace(/([A-Z])/g, '-$1') // 在大写字母前添加短横线
    .replace(/--+/g, '-') // 合并连续的短横线
    .replace(/^-|-$/g, '') // 移除开头和结尾的短横线
    .toLowerCase() // 转换为小写
}

/**
 * 清理微信二维码目录，删除已存在的文件
 *
 * @param {string} outputDir - 要清理的目录路径
 * @example
 * clearWxqrcodeDirectory('./output');
 */
function clearWxqrcodeDirectory(outputDir: string) {
  // 检查目录是否存在
  if (fs.existsSync(outputDir)) {
    // 递归删除目录及其内容
    fs.rmSync(outputDir, { recursive: true, force: true })
    console.log(`已删除目录: ${outputDir}`)
  }
}

/**
 * 生成单个页面的微信小程序码
 *
 * @param {string} accessToken - 微信接口访问凭证
 * @param {string} pagePath - 小程序页面路径
 * @param {number} [retries=3] - 失败重试次数，默认 3 次
 * @returns {Promise<void>}
 * @example
 * await generateMiniProgramCode('token123', 'pages/index/index', 5);
 */
async function generateMiniProgramCode(accessToken: string, pagePath: string, retries = 3): Promise<void> {
  // 微信生成小程序码的接口 URL
  const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}`
  // 请求参数：页面路径和二维码宽度
  const data = {
    path: pagePath,
    width: 430
  }

  // 实现重试机制
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // 发送 POST 请求生成小程序码，返回 arraybuffer 格式
      const response = await axios.post(url, data, {
        responseType: 'arraybuffer'
      })

      // 定义输出目录
      const outputDir = path.join(__dirname, '../docs/public/wxqrcode')
      // 如果目录不存在则创建
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // 从页面路径中提取组件名称
      const componentName = pagePath.split('/')[1]
      // 转换为短横线命名法作为文件名
      const formattedName = camelToKebabCase(componentName)

      // 构建完整的文件路径
      const fileName = path.join(outputDir, `${formattedName}.png`)
      // 写入文件
      fs.writeFileSync(fileName, response.data)
      console.log(`小程序码已生成并保存为 ${fileName}`)
      return
    } catch (error: any) {
      console.error(`生成小程序码失败: ${error.response ? error.response.data : error.message}`)
      // 如果不是最后一次尝试，则继续重试
      if (attempt < retries) {
        console.log(`重试 ${attempt}/${retries}...`)
      } else {
        console.error(`所有重试均失败，无法生成小程序码: ${pagePath}`)
      }
    }
  }
}

/**
 * 为所有页面生成小程序码
 *
 * @param {string} accessToken - 微信接口访问凭证
 * @returns {Promise<void>}
 * @example
 * await generateCodesForAllPages('token123');
 */
async function generateCodesForAllPages(accessToken: string) {
  // 遍历所有页面，逐个生成小程序码
  for (const page of pages) {
    await generateMiniProgramCode(accessToken, page.path)
  }
}

/**
 * 二维码生成主函数
 *
 * 协调整个二维码生成流程：清理目录、获取 access_token、生成所有页面的小程序码
 *
 * @returns {Promise<void>}
 */
async function genrateQRCodeImage() {
  // 定义输出目录
  const outputDir = path.join(__dirname, '../docs/public/wxqrcode')
  // 清理输出目录
  clearWxqrcodeDirectory(outputDir)

  try {
    // 获取 access_token
    const accessToken = await getAccessToken()
    // 为所有页面生成小程序码
    await generateCodesForAllPages(accessToken)
  } catch (error: any) {
    console.error('程序执行失败:', error.message)
  }
}

// 执行二维码生成主函数
genrateQRCodeImage()
