/**
 * Base64编码工具模块
 *
 * 提供字符串到Base64编码的转换功能，支持标准Base64编码和URL安全的Base64编码(RFC4648)。
 * 该模块特别处理了Unicode字符的编码问题，确保多语言字符串在编码转换过程中不会丢失信息。
 *
 * 主要应用场景：
 * - 文件内容编码（如图片转Base64字符串）
 * - URL参数传递二进制数据
 * - 数据序列化与传输
 * - 网络请求中的数据编码
 * - 多端开发环境下的统一编码实现
 */

/**
 * Base64字符集
 * 包含了标准Base64编码使用的64个字符，按索引顺序排列
 */
const _b64chars: string[] = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/']

/**
 * 转换为URL安全的Base64格式
 *
 * 将标准Base64编码中的'+'替换为'-'，'/'替换为'_'，并移除末尾的填充字符'='
 * 符合RFC4648标准的URL和文件名安全编码方案
 *
 * @param src 标准Base64编码字符串
 * @returns URL安全的Base64编码字符串
 */
const _mkUriSafe = (src: string): string => src.replace(/[+/]/g, (m0: string) => (m0 === '+' ? '-' : '_')).replace(/=+\$/m, '')

/**
 * 从Uint8Array转换为Base64编码字符串
 *
 * 核心编码实现，处理二进制数据到Base64的转换
 * 每3个字节转换为4个Base64字符，不足时使用'='填充
 *
 * @param src 包含二进制数据的Uint8Array
 * @param rfc4648 是否使用RFC4648标准（URL安全格式）
 * @returns Base64编码后的字符串
 */
const fromUint8Array = (src: Uint8Array, rfc4648 = false): string => {
  let b64 = ''

  // 每3个字节为一组进行处理
  for (let i = 0, l = src.length; i < l; i += 3) {
    // 获取当前3个字节，末尾不足时自动为undefined
    const [a0, a1, a2] = [src[i], src[i + 1], src[i + 2]]

    // 将3个字节合并为一个24位整数
    const ord = (a0 << 16) | (a1 << 8) | a2

    // 每6位一组，转换为对应的Base64字符
    // 右移18位，取高6位
    b64 += _b64chars[ord >>> 18]
    // 右移12位并与0x3F(63)掩码，取接下来的6位
    b64 += _b64chars[(ord >>> 12) & 63]
    // 如果第二个字节存在则转换，否则使用'='填充
    b64 += typeof a1 !== 'undefined' ? _b64chars[(ord >>> 6) & 63] : '='
    // 如果第三个字节存在则转换，否则使用'='填充
    b64 += typeof a2 !== 'undefined' ? _b64chars[ord & 63] : '='
  }

  // 根据是否需要URL安全格式返回结果
  return rfc4648 ? _mkUriSafe(b64) : b64
}

/**
 * 兼容各环境的btoa函数实现
 *
 * 优先使用环境中已有的btoa函数，如果不存在则使用自定义实现
 * 处理ASCII字符串到Base64的转换
 *
 * @param s 要编码的ASCII字符串
 * @returns Base64编码后的字符串
 * @throws {RangeError} 当字符串包含非ASCII字符时抛出错误
 */
const _btoa: (s: string) => string =
  typeof btoa === 'function'
    ? // 使用环境原生的btoa函数
      (s: string) => btoa(s)
    : // 自定义实现，适用于不支持btoa的环境
      (s: string) => {
        // 检查是否为ASCII字符串
        if (s.charCodeAt(0) > 255) {
          throw new RangeError('The string contains invalid characters.')
        }
        // 将字符串转换为Uint8Array后使用fromUint8Array函数编码
        return fromUint8Array(Uint8Array.from(s, (c: string) => c.charCodeAt(0)))
      }

/**
 * 将Unicode字符串转换为UTF-8编码的字符串
 *
 * 使用encodeURIComponent和unescape的组合处理Unicode字符
 * 这是为了解决原生btoa不支持非ASCII字符的问题
 *
 * @param src 要转换的Unicode字符串
 * @returns UTF-8编码的字符串
 */
const utob = (src: string): string => unescape(encodeURIComponent(src))

/**
 * 将字符串编码为Base64格式
 *
 * 主要的对外API函数，支持Unicode字符串的Base64编码
 *
 * @param src 要编码的字符串
 * @param rfc4648 是否使用RFC4648标准（URL安全格式）
 * @returns Base64编码后的字符串
 *
 * @example
 * // 标准Base64编码
 * encode('hello world') // 'aGVsbG8gd29ybGQ='
 *
 * @example
 * // URL安全的Base64编码
 * encode('hello world', true) // 'aGVsbG8gd29ybGQ'
 *
 * @example
 * // 支持Unicode字符
 * encode('你好，世界') // '5L2g5Liq77yM5LiA55So'
 */
export default function encode(src: string, rfc4648 = false): string {
  // 先将Unicode字符串转换为UTF-8编码，再进行Base64编码
  const b64 = _btoa(utob(src))
  // 根据需求返回标准或URL安全的Base64编码
  return rfc4648 ? _mkUriSafe(b64) : b64
}
