/**
 * @description Day.js 工具函数集合
 *
 * 该文件提供了 Day.js 库核心实现所需的各种工具函数，主要用于字符串处理、日期计算、
 * 时区格式化等操作。这些工具函数被 Day.js 核心模块和插件模块广泛使用，是整个库的基础支持层。
 *
 * 在 wot-ui-plus 组件库中的作用：
 * - 为日期时间相关组件提供底层工具支持
 * - 确保日期计算的准确性和一致性
 * - 提供通用的字符串处理和数学计算功能
 *
 * 设计思路：
 * - 采用函数式编程思想，每个函数独立完成特定任务
 * - 使用短名称导出以减小包体积
 * - 保持函数实现高效简洁，适合移动端环境
 *
 * 主要对外暴露的接口：
 * - s: 字符串填充函数
 * - z: 时区格式化函数
 * - m: 月份差异计算函数
 * - a: 绝对值向下取整函数
 * - p: 时间单位标准化函数
 * - u: undefined值检查函数
 *
 * 注意事项：
 * - 这些工具函数主要为内部使用设计，一般不直接暴露给最终用户
 * - 函数命名采用短名称策略，使用时需参考文档理解功能
 */
/* eslint-disable */
import * as C from './constant'

/**
 * @description 字符串填充函数
 *
 * 在字符串左侧填充指定字符，使字符串达到指定长度
 *
 * @param {string|number} string - 要填充的原始字符串或数字
 * @param {number} length - 目标字符串长度
 * @param {string} pad - 用于填充的字符
 * @returns {string} 填充后的字符串
 *
 * @example
 * // 返回 '00123'
 * padStart(123, 5, '0');
 *
 * // 返回 'abc' (原字符串已达到或超过指定长度)
 * padStart('abc', 2, 'x');
 */
var padStart = function padStart(string, length, pad) {
  var s = String(string) // 确保输入被转换为字符串类型
  if (!s || s.length >= length) return string // 字符串为空或已达到目标长度时直接返回
  return '' + Array(length + 1 - s.length).join(pad) + string // 创建填充字符数组并连接
}

/**
 * @description 时区偏移格式化函数
 *
 * 将UTC偏移分钟数格式化为标准时区字符串（如 '+08:00'）
 *
 * @param {object} instance - Dayjs实例，必须包含utcOffset方法
 * @returns {string} 格式化的时区字符串，格式为 ±HH:mm
 *
 * @example
 * // 假设有一个表示北京时间的实例(UTC+8)
 * // 返回 '+08:00'
 * padZoneStr(dayjsInstance);
 *
 * @note 该函数基于UTC偏移量计算，负数分钟表示西半球时区
 */
var padZoneStr = function padZoneStr(instance) {
  var negMinutes = -instance.utcOffset() // 获取UTC偏移的相反数
  var minutes = Math.abs(negMinutes) // 计算绝对值分钟数
  var hourOffset = Math.floor(minutes / 60) // 提取小时部分
  var minuteOffset = minutes % 60 // 提取分钟部分
  // 根据偏移方向添加正负号，并使用padStart确保两位数字格式
  return '' + (negMinutes <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ':' + padStart(minuteOffset, 2, '0')
}

/**
 * @description 月份差异计算函数
 *
 * 计算两个日期之间的精确月份差异，支持小数月份
 * 该函数来自 moment.js，用于保持与 moment.js 库相同的计算结果
 *
 * @param {object} a - 起始日期的Dayjs实例
 * @param {object} b - 结束日期的Dayjs实例
 * @returns {number} 两个日期之间的月份差异（正数表示b在a之后，负数表示b在a之前）
 *
 * @example
 * // 计算2023-01-15到2023-03-20之间的月份差异
 * // 约返回 2.167 (2个月零5天)
 * monthDiff(dayjs('2023-01-15'), dayjs('2023-03-20'));
 *
 * @note 该算法处理了不同月份天数不同的复杂情况，提供精确计算
 */
var monthDiff = function monthDiff(a, b) {
  // 处理日期顺序，确保a的日期不小于b的日期
  if (a.date() < b.date()) return -monthDiff(b, a)

  // 计算整年整月的差异
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month())

  // 创建基准日期（从a开始加上整月差异）
  var anchor = a.clone().add(wholeMonthDiff, C.M)

  // 检查b是否在基准日期之前
  var c = b - anchor < 0

  // 根据比较结果创建第二个基准日期
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), C.M)

  // 计算精确的月份差异，包括天数部分
  // 使用 +(...) 将结果转换为数字，并处理可能的NaN情况
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0)
}

/**
 * @description 绝对值向下取整函数
 *
 * 对数字进行特殊的向下取整处理，对于负数使用Math.ceil，对于正数使用Math.floor
 * 确保取整结果的绝对值不大于原数的绝对值
 *
 * @param {number} n - 要处理的数字
 * @returns {number} 处理后的整数值
 *
 * @example
 * // 返回 3
 * absFloor(3.9);
 *
 * // 返回 -3
 * absFloor(-3.1);
 *
 * // 特别处理：确保-0等边缘情况返回0
 * absFloor(-0); // 返回 0
 */
var absFloor = function absFloor(n) {
  // 负数使用Math.ceil（向上取整）实际上等同于绝对值向下取整
  // 正数直接使用Math.floor向下取整
  // || 0 确保结果不会是 NaN 或 undefined
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n)
}

/**
 * @description 时间单位标准化函数
 *
 * 将各种表示时间单位的字符串或标识符标准化为Day.js内部使用的单位常量
 *
 * @param {string|undefined} u - 时间单位标识
 * @returns {string} 标准化后的时间单位
 *
 * @example
 * // 返回 'month'
 * prettyUnit('M');
 *
 * // 返回 'day'
 * prettyUnit('days'); // 自动移除复数s
 *
 * // 返回 ''
 * prettyUnit(undefined);
 *
 * @note 该函数支持短格式和长格式单位，自动处理复数形式
 */
var prettyUnit = function prettyUnit(u) {
  // 特殊单位映射表，将常用简写映射到常量定义
  var special = {
    M: C.M, // 月
    y: C.Y, // 年
    w: C.W, // 周
    d: C.D, // 日(星期)
    D: C.DATE, // 日(日期)
    h: C.H, // 小时
    m: C.MIN, // 分钟
    s: C.S, // 秒
    ms: C.MS, // 毫秒
    Q: C.Q // 季度
  }

  // 优先检查特殊映射，否则进行常规处理：转为小写并移除复数s后缀
  return (
    special[u] ||
    String(u || '')
      .toLowerCase()
      .replace(/s$/, '')
  )
}

/**
 * @description 检查值是否为undefined
 *
 * 严格比较值是否等于undefined，不进行类型转换
 *
 * @param {*} s - 要检查的值
 * @returns {boolean} 如果值严格等于undefined返回true，否则返回false
 *
 * @example
 * // 返回 true
 * isUndefined(undefined);
 *
 * // 返回 false
 * isUndefined(null);
 * isUndefined('');
 * isUndefined(0);
 *
 * @note 使用严格相等比较(===)确保准确判断
 */
var isUndefined = function isUndefined(s) {
  return s === undefined // 严格相等比较，避免类型转换导致的误判
}

/**
 * @description 工具函数集合导出对象
 *
 * 导出所有工具函数，使用短名称以减小包体积
 *
 * @property {Function} s - 字符串填充函数(padStart)
 * @property {Function} z - 时区格式化函数(padZoneStr)
 * @property {Function} m - 月份差异计算函数(monthDiff)
 * @property {Function} a - 绝对值向下取整函数(absFloor)
 * @property {Function} p - 时间单位标准化函数(prettyUnit)
 * @property {Function} u - undefined值检查函数(isUndefined)
 *
 * @note 短名称设计是为了优化包体积，使用时需注意对应关系
 */
export default {
  s: padStart, // string padding
  z: padZoneStr, // zone string formatting
  m: monthDiff, // month difference
  a: absFloor, // absolute floor
  p: prettyUnit, // pretty unit
  u: isUndefined // is undefined
}
