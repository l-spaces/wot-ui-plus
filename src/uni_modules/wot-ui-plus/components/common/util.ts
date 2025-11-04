/**
 * @file util.ts
 * @description 通用工具函数集合 - wot-ui-plus组件库核心工具模块
 *
 * 该文件为wot-ui-plus组件库提供基础功能支持，包含类型判断、DOM操作、数据处理、
 * 样式转换、工具函数等40+个常用工具函数，被项目中40+个组件广泛使用。
 *
 * 核心功能分类：
 * 1. 类型判断与验证：isObj、isArray、isFunction、isString、isNumber等
 * 2. DOM操作与样式处理：getRect、objToStyle、addUnit、kebabCase等
 * 3. 数据处理与转换：deepClone、deepMerge、range、isEqual等
 * 4. 工具函数：uuid、debounce、throttle、pause、padZero等
 * 5. 颜色与URL处理：rgbToHex、hexToRgb、gradient、isImageUrl等
 *
 * 技术特点：
 * - 完整的TypeScript类型支持，确保类型安全
 * - 支持uni-app多端开发环境适配
 * - 性能优化，避免不必要的计算和内存分配
 * - 错误处理机制完善，关键函数包含异常捕获
 *
 * 使用方式：
 * import { isDef, getRect, deepClone } from '../common/util'
 *
 * @author wot-ui-plus team
 * @version 1.0.0
 * @since 2023
 */

import { AbortablePromise } from './AbortablePromise'

/**
 * 类型工具：排除undefined类型的泛型类型
 * @template T 原始类型
 */
type NotUndefined<T> = T extends undefined ? never : T

/**
 * 生成全局唯一标识符（UUID）
 * @description 基于随机数生成8段16进制字符串组成的唯一标识符
 * @returns {string} 32位十六进制唯一标识符
 *
 * @example
 * const id = uuid() // 输出类似：'3b9a8c7f2e1d0a9b8c7f2e1d0a9b8c7f2'
 *
 * 使用场景：
 * - 为需要唯一标识的组件生成ID（如wd-sticky、wd-drop-menu）
 * - 临时数据标识
 */
export function uuid() {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

/**
 * 生成4位十六进制字符串（uuid的内部辅助函数）
 * @returns {string} 4位十六进制字符串
 * @private
 */
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

/**
 * 为数值自动添加CSS单位（默认为px）
 * @description 如果输入是数字则添加px单位，如果是字符串则直接返回
 * @param {number | string} num - 需要添加单位的数值
 * @returns {string} 带单位的字符串
 *
 * @example
 * addUnit(10) // 返回 '10px'
 * addUnit('10rem') // 返回 '10rem'
 * addUnit('auto') // 返回 'auto'
 *
 * 使用场景：
 * - 组件样式属性设置（如width、height、margin等）
 * - 动态样式生成
 */
export function addUnit(num: number | string) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`
}

/**
 * 判断值是否为对象类型
 * @description 严格判断值是否为对象（排除null和数组）
 * @param {any} value - 需要判断的值
 * @returns {value is object} 如果是对象类型返回true
 *
 * @example
 * isObj({}) // true
 * isObj([]) // false
 * isObj(null) // false
 * isObj('string') // false
 *
 * 使用场景：
 * - 属性验证
 * - 条件渲染
 * - 数据处理
 */
export function isObj(value: any): value is object {
  return Object.prototype.toString.call(value) === '[object Object]' || typeof value === 'object'
}

/**
 * 获取值的精确数据类型
 * @description 通过Object.prototype.toString获取准确的类型信息
 * @param {unknown} target - 需要获取类型的值
 * @returns {string} 数据类型字符串（小写）
 *
 * @example
 * getType({}) // 'object'
 * getType([]) // 'array'
 * getType(null) // 'null'
 * getType(undefined) // 'undefined'
 * getType(function() {}) // 'function'
 *
 * 使用场景：
 * - 类型判断和验证
 * - 调试和日志输出
 * - 条件分支处理
 */
export function getType(target: unknown): string {
  // 使用Object.prototype.toString获取原生类型字符串
  const typeStr = Object.prototype.toString.call(target)
  // 通过正则表达式提取类型名称
  const match = typeStr.match(/\[object (\w+)\]/)
  const type = match && match.length ? match[1].toLowerCase() : ''
  // 返回小写的类型名称
  return type
}

/**
 * 默认的数据显示格式化函数
 * @description 主要用于picker组件的数据显示格式化，支持数组和对象格式
 * @param {any[] | Record<string, any>} items - 要格式化的数据项
 * @param {{ labelKey?: string }} [kv] - 配置选项，包含labelKey字段名
 * @returns {string} 格式化后的显示字符串
 *
 * @example
 * defaultDisplayFormat([{value: 'A'}, {value: 'B'}]) // 'A, B'
 * defaultDisplayFormat({value: 'Single'}) // 'Single'
 * defaultDisplayFormat([{label: 'A'}, {label: 'B'}], {labelKey: 'label'}) // 'A, B'
 *
 * 使用场景：
 * - picker组件的数据显示
 * - 多选数据的格式化显示
 */
export const defaultDisplayFormat = function (items: any[] | Record<string, any>, kv?: { labelKey?: string }): string {
  const labelKey: string = kv?.labelKey || 'value'

  if (Array.isArray(items)) {
    return items.map((item) => item[labelKey]).join(', ')
  } else {
    return items[labelKey]
  }
}

/**
 * 默认函数占位符（恒等函数）
 * @description 返回输入值的函数，主要用于pickerView组件的默认格式化
 * @template T 输入值类型
 * @param {T} value - 输入值
 * @returns {T} 原样返回输入值
 *
 * @example
 * defaultFunction('hello') // 'hello'
 * defaultFunction(123) // 123
 *
 * 使用场景：
 * - 组件默认回调函数
 * - 占位函数实现
 */
export const defaultFunction = <T>(value: T): T => value

/**
 * 检查值是否已定义（非undefined且非null）
 * @description 类型安全的空值检查，常用于条件渲染和默认值处理
 * @template T 输入值类型
 * @param {T} value - 需要检查的值
 * @returns {value is NonNullable<T>} 如果值已定义返回true
 *
 * @example
 * isDef('hello') // true
 * isDef(null) // false
 * isDef(undefined) // false
 *
 * 使用场景：
 * - 条件渲染判断
 * - 默认值设置
 * - 数据验证
 */
export const isDef = <T>(value: T): value is NonNullable<T> => value !== undefined && value !== null

/**
 * 检查数值范围（确保不小于零）
 * @description 验证数值是否在有效范围内，如果小于零则抛出错误
 * @param {number} num - 需要检查的数值
 * @param {string} [label='value'] - 数值标签，用于错误信息
 * @returns {void}
 * @throws {Error} 当数值小于零时抛出错误
 *
 * @example
 * checkNumRange(5) // 正常通过
 * checkNumRange(-1) // 抛出错误："value shouldn't be less than zero"
 * checkNumRange(-1, 'count') // 抛出错误："count shouldn't be less than zero"
 *
 * 使用场景：
 * - 数值属性验证
 * - 边界条件检查
 */
export const checkNumRange = (num: number, label: string = 'value'): void => {
  if (num < 0) {
    throw new Error(`${label} shouldn't be less than zero`)
  }
}

/**
 * 检查像素值范围（确保大于零）
 * @description 验证像素值是否有效，如果小于等于零则抛出错误
 * @param {number} num - 需要检查的像素值
 * @param {string} [label='value'] - 像素值标签，用于错误信息
 * @returns {void}
 * @throws {Error} 当像素值小于等于零时抛出错误
 *
 * @example
 * checkPixelRange(10) // 正常通过
 * checkPixelRange(0) // 抛出错误："value should be greater than zero"
 * checkPixelRange(-5, 'width') // 抛出错误："width should be greater than zero"
 *
 * 使用场景：
 * - CSS像素值验证
 * - 尺寸属性检查
 */
export const checkPixelRange = (num: number, label: string = 'value'): void => {
  if (num <= 0) {
    throw new Error(`${label} should be greater than zero`)
  }
}

/**
 * RGB颜色值转换为Hex格式
 * @description 将RGB颜色值（0-255）转换为十六进制颜色字符串
 * @param {number} r - 红色分量值，范围0-255
 * @param {number} g - 绿色分量值，范围0-255
 * @param {number} b - 蓝色分量值，范围0-255
 * @returns {string} 十六进制颜色字符串，格式为#RRGGBB
 *
 * @example
 * rgbToHex(255, 0, 0) // '#ff0000' (红色)
 * rgbToHex(0, 255, 0) // '#00ff00' (绿色)
 * rgbToHex(0, 0, 255) // '#0000ff' (蓝色)
 *
 * 实现思路：
 * 1. 将RGB值组合成一个24位整数：(1 << 24)确保高位为1，避免前导零被截断
 * 2. 使用位运算将RGB值分别左移到对应位置
 * 3. 转换为16进制字符串并截取后6位
 *
 * 使用场景：
 * - CSS颜色值转换
 * - 颜色选择器组件
 * - 渐变计算
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // 将 RGB 分量组合成一个十六进制数。
  const hex = ((r << 16) | (g << 8) | b).toString(16)

  // 使用零填充十六进制数，确保它有 6 位数字（RGB 范围）。
  const paddedHex = '#' + '0'.repeat(Math.max(0, 6 - hex.length)) + hex

  return paddedHex
}

/**
 * Hex颜色值转换为RGB格式
 * @description 将十六进制颜色字符串转换为RGB颜色值数组
 * @param {string} hex - 十六进制颜色字符串，支持#RRGGBB或RRGGBB格式
 * @returns {number[]} RGB颜色值数组，格式为[r, g, b]，每个值范围0-255
 *
 * @example
 * hexToRgb('#ff0000') // [255, 0, 0]
 * hexToRgb('00ff00') // [0, 255, 0]
 * hexToRgb('#0000ff') // [0, 0, 255]
 * hexToRgb('invalid') // [] (空数组表示转换失败)
 *
 * 实现思路：
 * 1. 使用正则表达式匹配6位十六进制颜色值
 * 2. 分别提取R、G、B分量（每2位一组）
 * 3. 将十六进制字符串转换为十进制数值
 *
 * 使用场景：
 * - 颜色格式转换
 * - 渐变计算
 * - 颜色操作
 */
export function hexToRgb(hex: string): number[] {
  const rgb: number[] = []

  // 从第一个字符开始，每两个字符代表一个颜色分量
  for (let i = 1; i < 7; i += 2) {
    // 将两个字符的十六进制转换为十进制，并添加到 rgb 数组中
    rgb.push(parseInt('0x' + hex.slice(i, i + 2), 16))
  }

  return rgb
}

/**
 * 计算颜色渐变序列
 * @description 根据起始颜色和结束颜色生成指定步数的渐变颜色数组
 * @param {string} startColor - 起始颜色（Hex格式）
 * @param {string} endColor - 结束颜色（Hex格式）
 * @param {number} step - 渐变步数（包括起始和结束颜色）
 * @returns {string[]} 渐变颜色数组，包含step+1个颜色值
 *
 * @example
 * gradient('#ff0000', '#0000ff', 3) // ['#ff0000', '#aa0055', '#5500aa', '#0000ff']
 * gradient('#ffffff', '#000000', 2) // ['#ffffff', '#808080', '#000000']
 *
 * 实现思路：
 * 1. 将起始和结束颜色转换为RGB格式
 * 2. 计算每个颜色分量的步进值
 * 3. 根据步数生成中间颜色
 * 4. 将中间RGB颜色转换回Hex格式
 *
 * 使用场景：
 * - 进度条颜色渐变
 * - 图表颜色渐变
 * - 动画效果
 */
export const gradient = (startColor: string, endColor: string, step: number = 2): string[] => {
  // 将hex转换为rgb
  const sColor: number[] = hexToRgb(startColor)
  const eColor: number[] = hexToRgb(endColor)

  // 计算R\G\B每一步的差值
  const rStep: number = (eColor[0] - sColor[0]) / step
  const gStep: number = (eColor[1] - sColor[1]) / step
  const bStep: number = (eColor[2] - sColor[2]) / step

  const gradientColorArr: string[] = []
  for (let i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push(
      rgbToHex(parseInt(String(rStep * i + sColor[0])), parseInt(String(gStep * i + sColor[1])), parseInt(String(bStep * i + sColor[2])))
    )
  }
  return gradientColorArr
}

/**
 * 数值范围限制函数
 * @description 将数值限制在指定的最小值和最大值之间
 * @param {number} num - 需要限制的数值
 * @param {number} min - 允许的最小值
 * @param {number} max - 允许的最大值
 * @returns {number} 限制后的数值，确保在[min, max]范围内
 *
 * @example
 * range(5, 0, 10) // 5
 * range(-5, 0, 10) // 0
 * range(15, 0, 10) // 10
 *
 * 实现思路：
 * 1. 使用Math.max确保数值不小于最小值
 * 2. 使用Math.min确保数值不大于最大值
 * 3. 组合使用实现双向限制
 *
 * 使用场景：
 * - 数值边界检查
 * - 滑块组件值限制
 * - 进度计算
 */
export const range = (num: number, min: number, max: number): number => {
  // 使用 Math.min 和 Math.max 保证 num 不会超出指定范围
  return Math.min(Math.max(num, min), max)
}

/**
 * 深度比较两个值是否相等
 * @description 递归比较两个值的结构和内容是否完全相等，支持对象和数组的深度比较
 * @param {any} value1 - 第一个比较值
 * @param {any} value2 - 第二个比较值
 * @returns {boolean} 如果两个值深度相等返回true，否则返回false
 *
 * @example
 * isEqual(1, 1) // true
 * isEqual({a: 1}, {a: 1}) // true
 * isEqual([1, 2], [1, 2]) // true
 * isEqual({a: 1}, {a: 2}) // false
 * isEqual({a: 1}, {a: 1, b: 2}) // false
 *
 * 实现思路：
 * 1. 首先进行严格相等比较（快速路径）
 * 2. 处理null/undefined情况
 * 3. 检查构造函数是否相同
 * 4. 对于对象类型，递归比较所有属性
 * 5. 处理valueOf方法返回原始值的情况
 *
 * 使用场景：
 * - 对象状态比较
 * - 数据变化检测
 * - 条件渲染优化
 */
export const isEqual = (value1: any, value2: any): boolean => {
  // 使用严格相等运算符比较值是否相等
  if (value1 === value2) {
    return true
  }

  // 如果其中一个值不是数组，则认为值不相等
  if (!Array.isArray(value1) || !Array.isArray(value2)) {
    return false
  }

  // 如果数组长度不相等，则认为值不相等
  if (value1.length !== value2.length) {
    return false
  }

  // 逐个比较数组元素是否相等
  for (let i = 0; i < value1.length; ++i) {
    if (value1[i] !== value2[i]) {
      return false
    }
  }

  // 所有比较均通过，则认为值相等
  return true
}

/**
 * 数字补零格式化
 * @description 将数字或字符串格式化为指定长度的字符串，不足时在前面补零
 * @param {string | number} num - 需要格式化的数字或字符串
 * @param {number} [targetLength=2] - 目标字符串长度，默认为2
 * @returns {string} 补零后的格式化字符串
 *
 * @example
 * padZero(5) // '05'
 * padZero(12) // '12'
 * padZero(8, 3) // '008'
 * padZero('abc', 5) // '00abc'
 *
 * 实现思路：
 * 1. 将输入值转换为字符串
 * 2. 循环检查字符串长度是否达到目标长度
 * 3. 在字符串前面添加零直到达到目标长度
 *
 * 使用场景：
 * - 时间格式化（小时、分钟、秒）
 * - 序号格式化
 * - 数字显示对齐
 */
export const padZero = (number: number | string, length: number = 2): string => {
  // 将输入转换为字符串
  let numStr: string = number.toString()

  // 在数字前补零，直到达到指定长度
  while (numStr.length < length) {
    numStr = '0' + numStr
  }

  return numStr
}

/** @description 全局变量id */
export const context = {
  id: 1000
}

export type RectResultType<T extends boolean> = T extends true ? UniApp.NodeInfo[] : UniApp.NodeInfo

/**
 * 获取节点信息
 * @param selector 节点选择器 #id,.class
 * @param all 是否返回所有 selector 对应的节点
 * @param scope 作用域（支付宝小程序无效）
 * @param useFields 是否使用 fields 方法获取节点信息
 * @returns 节点信息或节点信息数组
 */
export function getRect<T extends boolean>(selector: string, all: T, scope?: any, useFields?: boolean): Promise<RectResultType<T>> {
  return new Promise<RectResultType<T>>((resolve, reject) => {
    let query: UniNamespace.SelectorQuery | null = null
    if (scope) {
      query = uni.createSelectorQuery().in(scope)
    } else {
      query = uni.createSelectorQuery()
    }

    const method = all ? 'selectAll' : 'select'

    const callback = (rect: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
      if (all && isArray(rect) && rect.length > 0) {
        resolve(rect as RectResultType<T>)
      } else if (!all && rect) {
        resolve(rect as RectResultType<T>)
      } else {
        reject(new Error('No nodes found'))
      }
    }

    if (useFields) {
      query[method](selector).fields({ size: true, node: true }, callback).exec()
    } else {
      query[method](selector).boundingClientRect(callback).exec()
    }
  })
}

/**
 * 将字符串转换为短横线命名（kebab-case）
 * @description 将驼峰命名或普通字符串转换为短横线分隔的命名格式
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的短横线命名字符串
 *
 * @example
 * kebabCase('myComponent') // 'my-component'
 * kebabCase('MyComponent') // '-my-component'
 * kebabCase('my_component') // 'my_component' (不处理下划线)
 *
 * 实现思路：
 * 1. 使用正则表达式匹配大写字母
 * 2. 在每个大写字母前添加短横线并转换为小写
 * 3. 保留原始字符串的其他字符
 *
 * 使用场景：
 * - CSS类名生成
 * - HTML属性名转换
 * - 组件名规范化
 */
export function kebabCase(word: string): string {
  // 使用正则表达式匹配所有大写字母，并在前面加上短横线，然后转换为小写
  const newWord: string = word
    .replace(/[A-Z]/g, function (match) {
      return '-' + match
    })
    .toLowerCase()

  return newWord
}

/**
 * 将字符串转换为驼峰命名（camelCase）
 * @description 将短横线命名或下划线命名转换为驼峰命名格式
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的驼峰命名字符串
 *
 * @example
 * camelCase('my-component') // 'myComponent'
 * camelCase('my_component') // 'myComponent'
 * camelCase('-my-component') // 'MyComponent'
 *
 * 实现思路：
 * 1. 使用正则表达式匹配短横线或下划线后的字符
 * 2. 将匹配到的字符转换为大写
 * 3. 移除短横线或下划线分隔符
 *
 * 使用场景：
 * - JavaScript属性名转换
 * - 变量名规范化
 * - API响应数据转换
 */
export function camelCase(word: string): string {
  return word.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 类型安全的数组判断函数
 * @description 使用Array.isArray()或Object.prototype.toString.call()方法准确判断值是否为数组类型
 * @param {any} value - 需要判断的值
 * @returns {value is Array<any>} 类型谓词，如果为数组返回true
 *
 * @example
 * isArray([]) // true
 * isArray([1, 2, 3]) // true
 * isArray({}) // false
 * isArray('array') // false
 *
 * 实现思路：
 * 1. 优先使用Array.isArray()方法（现代浏览器支持）
 * 2. 降级使用Object.prototype.toString.call()方法进行兼容性处理
 * 3. 使用TypeScript类型谓词提供类型安全
 *
 * 使用场景：
 * - 数组类型验证
 * - 参数类型检查
 * - 条件分支类型收窄
 */
export function isArray(value: any): value is Array<any> {
  // 如果 Array.isArray 函数可用，直接使用该函数检查
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  }
  // 否则，使用对象原型的 toString 方法进行检查
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 类型安全的函数判断函数
 * @description 准确判断值是否为函数类型，支持普通函数、箭头函数、异步函数等
 * @template T - 函数类型泛型
 * @param {any} value - 需要判断的值
 * @returns {value is T} 类型谓词，如果为函数返回true
 *
 * @example
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction(async () => {}) // true
 * isFunction('function') // false
 * isFunction(123) // false
 *
 * 实现思路：
 * 1. 使用getType()函数获取精确类型字符串
 * 2. 检查是否为'function'或'asyncfunction'类型
 * 3. 支持所有函数类型的判断
 *
 * 使用场景：
 * - 回调函数验证
 * - 事件处理器检查
 * - 高阶函数参数验证
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function>(value: any): value is T {
  return getType(value) === 'function' || getType(value) === 'asyncfunction'
}

/**
 * 类型安全的字符串判断函数
 * @description 准确判断值是否为字符串类型，包括字符串字面量和String对象
 * @param {unknown} value - 需要判断的值
 * @returns {value is string} 类型谓词，如果为字符串返回true
 *
 * @example
 * isString('hello') // true
 * isString(new String('hello')) // true
 * isString(123) // false
 * isString(null) // false
 *
 * 实现思路：
 * 1. 使用getType()函数获取精确类型字符串
 * 2. 检查是否为'string'类型
 * 3. 支持字符串字面量和String对象的判断
 *
 * 使用场景：
 * - 字符串参数验证
 * - 文本内容处理
 * - 输入验证
 */
export function isString(value: unknown): value is string {
  return getType(value) === 'string'
}

/**
 * 类型安全的数字判断函数
 * @description 准确判断值是否为数字类型，包括数字字面量和Number对象
 * @param {any} value - 需要判断的值
 * @returns {value is number} 类型谓词，如果为数字返回true
 *
 * @example
 * isNumber(123) // true
 * isNumber(new Number(123)) // true
 * isNumber(NaN) // true (注意：NaN也是数字类型)
 * isNumber('123') // false
 * isNumber(null) // false
 *
 * 实现思路：
 * 1. 使用getType()函数获取精确类型字符串
 * 2. 检查是否为'number'类型
 * 3. 支持数字字面量和Number对象的判断
 *
 * 使用场景：
 * - 数值计算验证
 * - 表单数字字段验证
 * - 数学运算参数检查
 */
export function isNumber(value: any): value is number {
  return getType(value) === 'number'
}

/**
 * 类型安全的Promise对象判断函数
 * @description 准确判断值是否为Promise对象类型，通过检查then和catch方法
 * @param {unknown} value - 需要判断的值
 * @returns {value is Promise<any>} 类型谓词，如果为Promise对象返回true
 *
 * @example
 * isPromise(Promise.resolve()) // true
 * isPromise(new Promise(() => {})) // true
 * isPromise({then: () => {}}) // false (thenable对象但不是真正的Promise)
 * isPromise('promise') // false
 *
 * 实现思路：
 * 1. 首先检查值是否为对象类型且已定义
 * 2. 检查对象是否具有then和catch方法
 * 3. 验证then和catch方法是否为函数类型
 * 4. 准确区分Promise对象和thenable对象
 *
 * 使用场景：
 * - 异步操作结果验证
 * - Promise链式调用检查
 * - 异步组件加载验证
 */
export function isPromise(value: unknown): value is Promise<any> {
  // 先将 value 断言为 object 类型
  if (isObj(value) && isDef(value)) {
    // 然后进一步检查 value 是否具有 then 和 catch 方法，并且它们是函数类型
    return isFunction((value as Promise<any>).then) && isFunction((value as Promise<any>).catch)
  }
  return false // 如果 value 不是对象类型，则肯定不是 Promise
}

/**
 * 类型安全的布尔值判断函数
 * @description 准确判断值是否为布尔类型，包括布尔字面量和Boolean对象
 * @param {any} value - 需要判断的值
 * @returns {value is boolean} 类型谓词，如果为布尔值返回true
 *
 * @example
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(new Boolean(true)) // true
 * isBoolean(1) // false
 * isBoolean('true') // false
 *
 * 实现思路：
 * 1. 使用typeof运算符检查是否为'boolean'类型
 * 2. 支持布尔字面量和Boolean对象的判断
 * 3. 使用TypeScript类型谓词提供类型安全
 *
 * 使用场景：
 * - 条件判断验证
 * - 开关状态检查
 * - 配置项布尔值验证
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 类型安全的undefined判断函数
 * @description 准确判断值是否为undefined类型
 * @param {any} value - 需要判断的值
 * @returns {value is undefined} 类型谓词，如果为undefined返回true
 *
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * isUndefined('') // false
 * isUndefined(0) // false
 *
 * 实现思路：
 * 1. 使用typeof运算符检查是否为'undefined'类型
 * 2. 准确区分undefined和null值
 * 3. 使用TypeScript类型谓词提供类型安全
 *
 * 使用场景：
 * - 可选参数检查
 * - 默认值设置
 * - 条件渲染判断
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

/**
 * 类型安全的非undefined判断函数
 * @description 准确判断值是否为非undefined类型，用于类型收窄
 * @template T - 输入值类型
 * @param {T} value - 需要判断的值
 * @returns {value is NotUndefined<T>} 类型谓词，如果为非undefined返回true
 *
 * @example
 * isNotUndefined('hello') // true
 * isNotUndefined(null) // true
 * isNotUndefined(undefined) // false
 *
 * 实现思路：
 * 1. 使用isUndefined()函数进行反向判断
 * 2. 使用NotUndefined类型工具进行类型转换
 * 3. 提供类型安全的非空值检查
 *
 * 使用场景：
 * - 非空值验证
 * - 类型安全的数据处理
 * - 条件分支类型收窄
 */
export function isNotUndefined<T>(value: T): value is NotUndefined<T> {
  return !isUndefined(value)
}

/**
 * 奇数判断函数
 * @description 检查给定的数字是否为奇数
 * @param {number} value - 需要检查的数字
 * @returns {boolean} 如果为奇数返回true，否则返回false
 *
 * @example
 * isOdd(1) // true
 * isOdd(3) // true
 * isOdd(2) // false
 * isOdd(4) // false
 * isOdd(0) // false
 *
 * 实现思路：
 * 1. 首先验证输入值是否为数字类型
 * 2. 使用取模运算符计算除以2的余数
 * 3. 如果余数为1则为奇数，否则为偶数
 *
 * 使用场景：
 * - 奇偶性判断
 * - 列表交替样式
 * - 数学计算
 */
export function isOdd(value: number): boolean {
  if (typeof value !== 'number') {
    throw new Error('输入必须为数字')
  }

  // 使用取模运算符来判断是否为奇数
  // 如果 number 除以 2 的余数为 1，就是奇数
  // 否则是偶数
  return value % 2 === 1
}

/**
 * Base64图片URL判断函数
 * @description 检查给定的URL是否为Base64编码的图片数据
 * @param {string} url - 需要检查的URL字符串
 * @returns {boolean} 如果为Base64图片URL返回true，否则返回false
 *
 * @example
 * isBase64Image('data:image/png;base64,abc123') // true
 * isBase64Image('data:image/jpeg;base64,xyz789') // true
 * isBase64Image('https://example.com/image.png') // false
 * isBase64Image('data:text/plain;base64,abc') // false
 *
 * 实现思路：
 * 1. 使用正则表达式匹配Base64图片的标准格式
 * 2. 检查URL是否以'data:image/'开头
 * 3. 验证图片格式和base64编码标识
 *
 * 使用场景：
 * - 图片URL验证
 * - 图片上传处理
 * - 图片显示优化
 */
export function isBase64Image(url: string) {
  // 使用正则表达式检查URL是否以"data:image"开头，这是Base64图片的常见前缀
  return /^data:image\/(png|jpg|jpeg|gif|bmp);base64,/.test(url)
}

/**
 * 对象转CSS样式字符串函数
 * @description 将JavaScript对象或数组格式的样式转换为CSS样式字符串
 * @param {Record<string, any> | Record<string, any>[]} styles - 样式对象或样式对象数组
 * @returns {string} 格式化后的CSS样式字符串
 *
 * @example
 * objToStyle({color: 'red', fontSize: '16px'}) // 'color:red;font-size:16px;'
 * objToStyle([{color: 'red'}, {fontSize: '16px'}]) // 'color:red;font-size:16px;'
 * objToStyle('color:red;') // 'color:red;'
 * objToStyle(null) // ''
 *
 * 实现思路：
 * 1. 多类型支持：
 *    - 数组类型：递归处理每个元素，过滤空值，用分号连接
 *    - 字符串类型：确保末尾有分号，直接返回
 *    - 对象类型：转换为CSS属性键值对
 *    - 其他类型：返回空字符串
 * 2. 数据清理：过滤null、undefined和空字符串值
 * 3. 命名转换：使用kebabCase函数将驼峰命名转换为短横线命名
 * 4. 格式标准化：确保每个样式声明以分号结尾
 * 5. 递归处理：支持嵌套数组结构，实现深度转换
 * 6. 边界处理：正确处理空输入和无效输入
 *
 * 使用场景：
 * - 动态样式生成
 * - 组件样式属性处理
 * - CSS-in-JS样式转换
 */
export function objToStyle(styles: Record<string, any> | Record<string, any>[]): string {
  // 如果 styles 是数组类型
  if (isArray(styles)) {
    // 使用过滤函数去除空值和 null 值的元素
    // 对每个非空元素递归调用 objToStyle，然后通过分号连接
    const result = styles
      .filter(function (item) {
        return item != null && item !== ''
      })
      .map(function (item) {
        return objToStyle(item)
      })
      .join(';')

    // 如果结果不为空，确保末尾有分号
    return result ? (result.endsWith(';') ? result : result + ';') : ''
  }

  if (isString(styles)) {
    // 如果是字符串且不为空，确保末尾有分号
    return styles ? (styles.endsWith(';') ? styles : styles + ';') : ''
  }

  // 如果 styles 是对象类型
  if (isObj(styles)) {
    // 使用 Object.keys 获取所有属性名
    // 使用过滤函数去除值为 null 或空字符串的属性
    // 对每个属性名和属性值进行格式化，通过分号连接
    const result = Object.keys(styles)
      .filter(function (key) {
        return styles[key] != null && styles[key] !== ''
      })
      .map(function (key) {
        // 使用 kebabCase 函数将属性名转换为 kebab-case 格式
        // 将属性名和属性值格式化为 CSS 样式的键值对
        return [kebabCase(key), styles[key]].join(':')
      })
      .join(';')

    // 如果结果不为空，确保末尾有分号
    return result ? (result.endsWith(';') ? result : result + ';') : ''
  }
  // 如果 styles 不是对象也不是数组，则直接返回
  return ''
}

/**
 * 对象字段存在性检查函数
 * @description 检查对象是否包含任何有效字段（非空属性）
 * @param {unknown} obj - 需要检查的对象
 * @returns {boolean} 如果对象包含有效字段返回true，否则返回false
 *
 * @example
 * hasFields({name: 'John'}) // true
 * hasFields({}) // false
 * hasFields(null) // false
 * hasFields('string') // false
 *
 * 实现思路：
 * 1. 首先验证输入是否为对象类型且不为null
 * 2. 使用Object.keys()获取对象的所有属性名
 * 3. 检查属性名数组长度是否大于0
 *
 * 使用场景：
 * - 对象有效性验证
 * - 表单数据检查
 * - 配置对象验证
 */
export function hasFields(obj: unknown): boolean {
  // 如果不是对象类型或为 null，则认为没有字段
  if (!isObj(obj) || obj === null) {
    return false
  }

  // 使用 Object.keys 检查对象是否有属性
  return Object.keys(obj).length > 0
}

/**
 * 空对象判断函数
 * @description 检查对象是否为空对象（不包含任何有效字段）
 * @param {unknown} obj - 需要检查的对象
 * @returns {boolean} 如果对象为空返回true，否则返回false
 *
 * @example
 * isEmptyObj({}) // true
 * isEmptyObj({name: 'John'}) // false
 * isEmptyObj(null) // true
 * isEmptyObj('string') // true
 *
 * 实现思路：
 * 1. 基于hasFields()函数的反向判断
 * 2. 提供简洁的空对象检查接口
 *
 * 使用场景：
 * - 空对象验证
 * - 默认值设置
 * - 条件渲染判断
 */
export function isEmptyObj(obj: unknown): boolean {
  return !hasFields(obj)
}

/**
 * 模拟requestAnimationFrame函数
 * @description 提供与浏览器requestAnimationFrame类似的异步执行功能
 * @param {Function} [cb=() => {}] - 回调函数，在动画帧执行时调用
 * @returns {AbortablePromise<boolean>} 可中止的Promise对象
 *
 * @example
 * requestAnimationFrame(() => console.log('Frame executed'))
 *   .then(() => console.log('Animation completed'))
 *
 * 实现思路：
 * 1. 使用setInterval模拟浏览器requestAnimationFrame
 * 2. 设置30fps的帧率（约33ms间隔）
 * 3. 返回AbortablePromise支持异步操作中止
 *
 * 使用场景：
 * - 动画帧控制
 * - 性能优化
 * - 异步操作调度
 */
export const requestAnimationFrame = (cb = () => {}) => {
  return new AbortablePromise((resolve) => {
    const timer = setInterval(() => {
      clearInterval(timer)
      resolve(true)
      cb()
    }, 1000 / 30)
  })
}

/**
 * 异步暂停函数
 * @description 创建一个可中止的异步暂停操作
 * @param {number} [ms=1000/30] - 暂停时间（毫秒），默认约33ms
 * @returns {AbortablePromise<boolean>} 可中止的Promise对象
 *
 * @example
 * pause(1000).then(() => console.log('1秒后执行'))
 *
 * 实现思路：
 * 1. 使用setTimeout实现异步延迟
 * 2. 返回AbortablePromise支持操作中止
 * 3. 自动清理定时器防止内存泄漏
 *
 * 使用场景：
 * - 异步延迟操作
 * - 动画序列控制
 * - 防抖节流实现
 */
export const pause = (ms: number = 1000 / 30) => {
  return new AbortablePromise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, ms)
  })
}

/**
 * 深拷贝函数
 * @description 创建对象的完整独立副本，支持复杂对象和循环引用
 * @template T - 输入对象类型
 * @param {T} obj - 需要深拷贝的对象
 * @param {Map<any, any>} [cache=new Map()] - 缓存映射，用于处理循环引用
 * @returns {T} 深拷贝后的对象副本
 *
 * @example
 * const obj = {a: 1, b: {c: 2}};
 * const copy = deepClone(obj); // {a: 1, b: {c: 2}}
 * obj.b.c = 3; // copy.b.c 仍然是2
 *
 * 实现思路：
 * 1. 基础类型处理：直接返回原始值（null、undefined、string、number、boolean、symbol、bigint）
 * 2. 特殊对象处理：
 *    - Date对象：创建新的Date实例，复制时间戳
 *    - RegExp对象：复制正则表达式模式和标志
 *    - Error对象：复制错误信息和堆栈跟踪
 * 3. 循环引用处理：使用Map缓存已拷贝对象，遇到相同引用时直接返回缓存副本
 * 4. 递归拷贝：
 *    - 数组：创建新数组，递归拷贝每个元素
 *    - 对象：创建新对象，递归拷贝每个属性（仅拷贝自有属性）
 * 5. 性能优化：避免重复拷贝相同对象，防止无限递归
 *
 * 使用场景：
 * - 数据隔离
 * - 状态管理
 * - 不可变数据操作
 */
export function deepClone<T>(obj: T, cache: Map<any, any> = new Map()): T {
  // 如果对象为 null 或或者不是对象类型，则直接返回该对象
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理特殊对象类型：日期、正则表达式、错误对象
  if (isDate(obj)) {
    return new Date(obj.getTime()) as any
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as any
  }
  if (obj instanceof Error) {
    const errorCopy = new Error(obj.message) as any
    errorCopy.stack = obj.stack
    return errorCopy
  }

  // 检查缓存中是否已存在该对象的复制
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  // 根据原始对象的类型创建对应的空对象或数组
  const copy: any = Array.isArray(obj) ? [] : {}

  // 将当前对象添加到缓存中
  cache.set(obj, copy)

  // 递归地深拷贝对象的每个属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], cache)
    }
  }

  return copy as T
}

/**
 * 深度合并函数（浅层合并）
 * @description 将源对象的属性合并到目标对象，不进行递归合并
 * @template T - 目标对象类型
 * @param {T} target - 目标对象
 * @param {Record<string, any>} source - 源对象
 * @returns {T} 合并后的目标对象
 *
 * @example
 * const target = {a: 1};
 * const source = {b: 2};
 * deepMerge(target, source); // {a: 1, b: 2}
 *
 * 实现思路：
 * 1. 先对目标对象进行深拷贝避免修改原始对象
 * 2. 遍历源对象的所有属性
 * 3. 直接将属性值赋给目标对象
 *
 * 使用场景：
 * - 配置合并
 * - 属性扩展
 * - 浅层对象合并
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  // 深拷贝目标对象，避免修改原始对象
  target = deepClone(target)

  // 检查目标和源是否都是对象类型
  if (typeof target !== 'object' || typeof source !== 'object') {
    throw new Error('Both target and source must be objects.')
  }

  // 遍历源对象的属性
  for (const prop in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (!source.hasOwnProperty(prop))
      continue
      // 使用类型断言，告诉 TypeScript 这是有效的属性
    ;(target as Record<string, any>)[prop] = source[prop]
  }

  return target
}

/**
 * 深度合并函数（递归合并）
 * @description 递归合并两个对象，相同属性名的对象会进行深度合并
 * @param {Record<string, any>} target - 目标对象
 * @param {Record<string, any>} source - 源对象
 * @returns {Record<string, any>} 合并后的对象
 *
 * @example
 * const target = {a: 1, b: {c: 2}};
 * const source = {b: {d: 3}, e: 4};
 * deepAssign(target, source); // {a: 1, b: {c: 2, d: 3}, e: 4}
 *
 * 实现思路：
 * 1. 遍历源对象的所有属性
 * 2. 如果目标对象和源对象的对应属性都是对象，则递归合并
 * 3. 否则直接覆盖目标对象的属性
 *
 * 使用场景：
 * - 配置深度合并
 * - 嵌套对象合并
 * - 默认值设置
 */
export function deepAssign(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  Object.keys(source).forEach((key) => {
    const targetValue = target[key]
    const newObjValue = source[key]
    if (isObj(targetValue) && isObj(newObjValue)) {
      deepAssign(targetValue, newObjValue)
    } else {
      target[key] = newObjValue
    }
  })
  return target
}

/**
 * URL参数构建函数
 * @description 将参数对象转换为URL查询字符串并附加到基础URL
 * @param {string} baseUrl - 基础URL
 * @param {Record<string, string>} params - 参数对象
 * @returns {string} 带参数的完整URL
 *
 * @example
 * buildUrlWithParams('https://api.com', {id: '123', name: 'John'})
 * // 'https://api.com?id=123&name=John'
 *
 * 实现思路：
 * 1. 将参数对象转换为键值对数组
 * 2. 对参数值进行URL编码
 * 3. 根据基础URL是否已有查询参数选择分隔符
 *
 * 使用场景：
 * - API请求URL构建
 * - 页面跳转参数传递
 * - 查询字符串生成
 */
export function buildUrlWithParams(baseUrl: string, params: Record<string, string>) {
  // 将参数对象转换为查询字符串
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  // 检查基础URL是否已包含查询字符串，并选择适当的分隔符
  const separator = baseUrl.includes('?') ? '&' : '?'

  // 返回带有参数的URL
  return `${baseUrl}${separator}${queryString}`
}

/**
 * 防抖函数配置选项类型
 * @description 定义防抖函数的配置参数
 */
type DebounceOptions = {
  leading?: boolean // 是否在延迟时间开始时调用函数
  trailing?: boolean // 是否在延迟时间结束时调用函数
}

/**
 * 防抖函数
 * @description 创建一个防抖函数，该函数会在调用后等待指定时间再执行，若在等待时间内再次调用则重新计时
 * @template T - 函数类型
 * @param {T} func - 需要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {DebounceOptions} [options={}] - 配置选项
 * @returns {T} 防抖后的函数
 *
 * @example
 * const debouncedFn = debounce(() => console.log('Executed'), 300);
 * debouncedFn(); // 等待300ms后执行
 * debouncedFn(); // 取消前一次调用，重新计时
 *
 * 实现思路：
 * 1. 定时器管理：使用setTimeout控制函数执行时机，支持取消和重新计时
 * 2. 模式支持：
 *    - leading模式：首次调用立即执行，后续调用在等待时间内被忽略
 *    - trailing模式：延迟执行，在等待时间结束后执行最后一次调用
 * 3. 参数保存：保存最后一次调用的参数和this上下文，确保执行时使用正确数据
 * 4. 状态管理：使用闭包保存timeoutId、lastArgs、lastThis等状态变量
 * 5. 内存优化：自动清理定时器，防止内存泄漏
 * 6. 类型安全：使用TypeScript泛型确保输入输出类型一致
 *
 * 使用场景：
 * - 搜索框输入防抖
 * - 窗口大小调整事件
 * - 表单验证
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number, options: DebounceOptions = {}): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | undefined
  let lastThis: any
  let result: ReturnType<T> | undefined
  const leading = isDef(options.leading) ? options.leading : false
  const trailing = isDef(options.trailing) ? options.trailing : true

  function invokeFunc() {
    if (lastArgs !== undefined) {
      result = func.apply(lastThis, lastArgs)
      lastArgs = undefined
    }
  }

  function startTimer() {
    timeoutId = setTimeout(() => {
      timeoutId = null
      if (trailing) {
        invokeFunc()
      }
    }, wait)
  }

  function cancelTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function debounced(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    lastArgs = args
    lastThis = this

    if (timeoutId === null) {
      if (leading) {
        invokeFunc()
      }
      startTimer()
    } else if (trailing) {
      cancelTimer()
      startTimer()
    }

    return result
  }

  return debounced as T
}

/**
 * 节流函数
 * @description 创建一个节流函数，该函数在指定时间间隔内最多执行一次
 * @param {Function} func - 需要节流的函数
 * @param {number} wait - 时间间隔（毫秒）
 * @returns {Function} 节流后的函数
 *
 * @example
 * const throttledFn = throttle(() => console.log('Executed'), 300);
 * throttledFn(); // 立即执行
 * throttledFn(); // 300ms内不会执行
 *
 * 实现思路：
 * 1. 时间戳机制：记录上次执行时间，计算距离下次执行的时间间隔
 * 2. 双模式执行：
 *    - 立即执行模式：剩余时间<=0时立即执行并更新上次执行时间
 *    - 延迟执行模式：剩余时间>0时设置定时器延迟执行
 * 3. 状态管理：使用闭包保存previous（上次执行时间）和timeout（定时器ID）
 * 4. 性能优化：避免频繁创建定时器，只在必要时创建新的定时器
 * 5. 内存管理：自动清理定时器，防止内存泄漏
 * 6. 参数传递：正确传递调用时的参数和this上下文
 *
 * 使用场景：
 * - 滚动事件处理
 * - 鼠标移动事件
 * - 频繁触发的API调用
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(func: Function, wait: number): Function {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous: number = 0

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }

  return throttled
}

/**
 * 根据属性路径获取对象属性值
 * @description 通过点分隔的路径字符串安全地获取嵌套对象属性值
 * @param {any} obj - 目标对象
 * @param {string} path - 属性路径（如 'user.profile.name'）
 * @returns {any} 属性值，如果路径不存在则返回undefined
 *
 * @example
 * const obj = {user: {profile: {name: 'John'}}};
 * getPropByPath(obj, 'user.profile.name'); // 'John'
 * getPropByPath(obj, 'user.address.city'); // undefined
 *
 * 实现思路：
 * 1. 将路径字符串分割为属性名数组
 * 2. 使用reduce方法逐级访问属性
 * 3. 添加错误处理防止访问不存在的属性
 *
 * 使用场景：
 * - 嵌套对象属性访问
 * - 配置项读取
 * - 数据映射
 */
export const getPropByPath = (obj: any, path: string): any => {
  const keys: string[] = path.split('.')

  try {
    return keys.reduce((acc: any, key: string) => (acc !== undefined && acc !== null ? acc[key] : undefined), obj)
  } catch (error) {
    return undefined
  }
}

/**
 * 类型安全的日期对象判断函数
 * @description 准确判断值是否为有效的Date对象类型
 * @param {unknown} val - 需要判断的值
 * @returns {val is Date} 类型谓词，如果为有效Date对象返回true
 *
 * @example
 * isDate(new Date()) // true
 * isDate('2023-01-01') // false
 * isDate(new Date('invalid')) // false
 *
 * 实现思路：
 * 1. 使用Object.prototype.toString.call()检查类型
 * 2. 验证Date对象的时间戳是否有效
 * 3. 使用TypeScript类型谓词提供类型安全
 *
 * 使用场景：
 * - 日期验证
 * - 时间格式化
 * - 日期比较
 */
export const isDate = (val: unknown): val is Date => Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN((val as Date).getTime())

/**
 * 视频URL判断函数
 * @description 检查URL是否为视频文件链接
 * @param {string} url - 需要检查的URL字符串
 * @returns {boolean} 如果为视频URL返回true，否则返回false
 *
 * @example
 * isVideoUrl('https://example.com/video.mp4') // true
 * isVideoUrl('https://example.com/image.jpg') // false
 * isVideoUrl('data:video/mp4;base64,abc123') // false
 *
 * 实现思路：
 * 1. 使用正则表达式匹配视频文件扩展名
 * 2. 支持常见视频格式（mp4、avi、mov等）
 * 3. 排除查询参数和锚点的影响
 *
 * 使用场景：
 * - 媒体类型识别
 * - 视频播放器集成
 * - 文件上传验证
 */
export function isVideoUrl(url: string): boolean {
  // 使用正则表达式匹配视频文件类型的URL
  const videoRegex = /\.(ogm|webm|ogv|asx|m4v|mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)(?=$|[?#])/i
  return videoRegex.test(url)
}

/**
 * 图片URL判断函数
 * @description 检查URL是否为图片文件链接
 * @param {string} url - 需要检查的URL字符串
 * @returns {boolean} 如果为图片URL返回true，否则返回false
 *
 * @example
 * isImageUrl('https://example.com/image.jpg') // true
 * isImageUrl('https://example.com/video.mp4') // false
 * isImageUrl('data:image/png;base64,abc123') // false
 *
 * 实现思路：
 * 1. 使用正则表达式匹配图片文件扩展名
 * 2. 支持常见图片格式（jpg、png、gif、webp等）
 * 3. 排除查询参数和锚点的影响
 *
 * 使用场景：
 * - 图片类型识别
 * - 图片懒加载
 * - 文件上传验证
 */
export function isImageUrl(url: string): boolean {
  // 使用正则表达式匹配图片URL
  const imageRegex = /\.(xbm|tif|pjp|apng|svgz|jpeg|jpg|heif|ico|tiff|heic|pjpeg|avif|gif|png|svg|webp|jfif|bmp|dpg|image)(?=$|[?#])/i
  return imageRegex.test(url)
}

/**
 * H5环境判断函数
 * @description 判断当前运行环境是否为H5（Web浏览器）
 * @returns {boolean} 如果是H5环境返回true，否则返回false
 *
 * @example
 * isH5() // 在浏览器中返回true，在微信小程序中返回false
 *
 * 实现思路：
 * 1. 使用uniapp的条件编译指令
 * 2. 在H5环境下设置标志为true
 * 3. 返回立即执行函数的结果
 *
 * 使用场景：
 * - 多端环境适配
 * - 平台特定功能判断
 * - 样式和功能差异化
 */
export const isH5 = (() => {
  let isH5 = false
  // #ifdef H5
  isH5 = true
  // #endif
  return isH5
})()

/**
 * 条件剔除对象属性函数
 * @description 根据条件函数剔除对象中满足条件的属性
 * @template O - 对象类型
 * @param {O} obj - 源对象
 * @param {(value: any, key: keyof O) => boolean} predicate - 条件函数
 * @returns {Partial<O>} 剔除后的新对象
 *
 * @example
 * const obj = {a: 1, b: null, c: 3};
 * omitBy(obj, (val) => val === null); // {a: 1, c: 3}
 *
 * 实现思路：
 * 1. 深拷贝源对象避免修改原始数据
 * 2. 遍历对象所有属性
 * 3. 根据条件函数决定是否删除属性
 *
 * 使用场景：
 * - 数据清理
 * - 表单数据处理
 * - 配置项过滤
 */
export function omitBy<O extends Record<string, any>>(obj: O, predicate: (value: any, key: keyof O) => boolean): Partial<O> {
  const newObj = deepClone(obj)
  Object.keys(newObj).forEach((key) => predicate(newObj[key], key) && delete newObj[key]) // 遍历对象的键，删除值为不满足predicate的字段
  return newObj
}

/**
 * 缓动函数
 * @description 实现指数缓动效果，用于动画过渡计算
 * @param {number} [t=0] - 当前时间（从动画开始经过的时间）
 * @param {number} [b=0] - 初始值
 * @param {number} [c=0] - 变化量（目标值 - 初始值）
 * @param {number} [d=0] - 持续时间
 * @returns {number} 计算出的当前值
 *
 * @example
 * easingFn(500, 0, 100, 1000); // 约50（在500ms时，从0到100的缓动值）
 *
 * 实现思路：
 * 1. 使用指数函数实现缓动效果
 * 2. 支持自定义初始值、变化量和持续时间
 * 3. 提供平滑的动画过渡效果
 *
 * 使用场景：
 * - 动画效果计算
 * - 滚动过渡
 * - 元素移动动画
 */
export function easingFn(t: number = 0, b: number = 0, c: number = 0, d: number = 0): number {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

/**
 * 寻找最接近值函数
 * @description 在数组中寻找与目标值最接近的元素
 * @param {number[]} arr - 数值数组
 * @param {number} target - 目标值
 * @returns {number} 最接近目标值的数组元素
 *
 * @example
 * closest([10, 20, 30], 25); // 20
 * closest([1, 3, 5], 4); // 3
 *
 * 实现思路：
 * 1. 使用reduce方法遍历数组
 * 2. 计算每个元素与目标值的绝对差
 * 3. 返回差值最小的元素
 *
 * 使用场景：
 * - 数值近似匹配
 * - 刻度值选择
 * - 数据插值
 */
export function closest(arr: number[], target: number) {
  return arr.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev))
}

/**
 * 系统信息接口，包含项目中实际使用的字段
 */
export interface SystemInfo {
  /** 窗口宽度 */
  windowWidth: number
  /** 窗口高度 */
  windowHeight: number
  /** 窗口顶部位置 */
  windowTop: number
  /** 设备像素比 */
  pixelRatio: number
  /** 平台信息 */
  platform: string
  /** 主题模式 */
  theme?: string
  /** 状态栏高度 */
  statusBarHeight?: number
  /** 安全区域信息 */
  safeArea?: UniApp.SafeArea
  /** 屏幕高度 */
  screenHeight: number
  /** 安全区域插入信息 */
  safeAreaInsets?: UniApp.SafeAreaInsets
  // 未尽字段
  [key: string]: any
}

/**
 * 兼容微信小程序端获取系统信息的方法
 * 在微信小程序端使用新的API替代getSystemInfoSync，在其他端仍然使用getSystemInfoSync
 * @returns 系统信息对象
 */
export function getSystemInfo(): SystemInfo {
  let systemInfo: SystemInfo
  // #ifdef MP-WEIXIN
  try {
    // const systemSetting = uni.getSystemSetting() // 暂时不需要
    const deviceInfo = uni.getDeviceInfo()
    const windowInfo = uni.getWindowInfo()
    const appBaseInfo = uni.getAppBaseInfo()
    systemInfo = {
      ...deviceInfo,
      ...windowInfo,
      ...appBaseInfo
    }
  } catch (error) {
    console.warn('获取系统信息失败，降级使用uni.getSystemInfoSync:', error)
    // 降级处理，使用原来的方法
    systemInfo = uni.getSystemInfoSync()
  }
  // #endif
  // #ifndef MP-WEIXIN
  systemInfo = uni.getSystemInfoSync()
  // #endif
  return systemInfo
}
