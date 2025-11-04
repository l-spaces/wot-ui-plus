/**
 * @file dayjs/index.js
 * @description Day.js 日期时间处理库核心实现文件
 *
 * 该文件提供了 Day.js 库的核心功能实现，为 wot-ui-plus 组件库提供完整的日期时间处理能力。
 * Day.js 是一个轻量级的日期时间处理库，API 设计与 Moment.js 类似，但体积更小（仅 2KB gzip），
 * 性能更优，非常适合移动端和前端应用。
 *
 * 核心功能特性：
 * 1. 轻量级设计：极小的体积，无外部依赖
 * 2. 链式调用：支持流畅的 API 链式调用风格
 * 3. 不可变数据：所有操作返回新的实例而非修改原实例
 * 4. 丰富的日期时间操作：支持解析、格式化、比较、修改等操作
 * 5. 完整的国际化支持：支持多语言环境下的日期时间显示
 * 6. 插件扩展机制：通过插件机制支持功能扩展
 *
 * 在 wot-ui-plus 组件库中的应用场景：
 * - 日期选择器（DatePicker）组件的日期处理
 * - 时间选择器（TimePicker）组件的时间处理
 * - 日历（Calendar）组件的日期计算
 * - 倒计时（CountDown）组件的时间计算
 * - 日期格式化显示
 * - 日期比较和验证
 *
 * 对外暴露的主要接口：
 * - dayjs()：主函数，创建或解析日期
 * - dayjs.extend()：加载插件
 * - dayjs.locale()：设置全局语言环境
 * - dayjs.isDayjs()：类型检查函数
 * - dayjs.unix()：从 Unix 时间戳创建日期
 */
/* eslint-disable */

/**
 * @description 导入内部常量定义
 *
 * 从 './constant' 模块导入所有常量，包括：
 * - 时间单位常量 (MS, S, MIN, H, D, DATE, M, Y)
 * - 毫秒换算常量 (MILLISECONDS_A_MINUTE, MILLISECONDS_A_HOUR 等)
 * - 正则表达式常量 (REGEX_PARSE, REGEX_FORMAT 等)
 * - 默认值常量 (INVALID_DATE_STRING, FORMAT_DEFAULT)
 */
import * as C from './constant'
// 导入默认英语语言环境
import en from './locale/en'
// 导入工具函数
import U from './utils'

// 全局语言环境代码，默认为英语
var L = 'en' // global locale

// 全局已加载的语言环境对象存储
var Ls = {} // global loaded locale

// 初始化默认语言环境
Ls[L] = en

// Day.js 对象标识，用于类型检查
var IS_DAYJS = '$isDayjsObject' // eslint-disable-next-line no-use-before-define

/**
 * @function isDayjs
 * @description 类型检查函数，用于判断一个值是否为 Dayjs 对象
 *
 * @param {any} d - 要检查的值
 * @returns {boolean} 如果值是 Dayjs 对象返回 true，否则返回 false
 *
 * @example
 * isDayjs(dayjs()) // true
 * isDayjs(new Date()) // false
 * isDayjs('2024-01-01') // false
 */
var isDayjs = function isDayjs(d) {
  // 两种判断方式：1) 检查是否为 Dayjs 构造函数的实例 2) 检查是否包含 IS_DAYJS 标识
  return d instanceof Dayjs || !!(d && d[IS_DAYJS])
}

/**
 * @function parseLocale
 * @description 解析语言环境配置，支持设置全局或局部语言环境
 *
 * @param {string|object} preset - 语言环境代码或语言环境对象
 * @param {object} [object] - 可选的语言环境定义对象
 * @param {boolean} [isLocal] - 是否为局部语言环境设置，默认为全局设置
 * @returns {string} 返回当前使用的语言环境代码
 *
 * @example
 * // 设置全局语言环境为中文
 * parseLocale('zh-cn')
 *
 * // 注册并设置语言环境
 * parseLocale('custom', customLocaleObject)
 *
 * // 设置局部语言环境
 * parseLocale('fr', null, true)
 */
var parseLocale = function parseLocale(preset, object, isLocal) {
  var l

  // 如果没有提供预设，返回当前全局语言环境
  if (!preset) return L

  // 处理字符串类型的语言环境代码
  if (typeof preset === 'string') {
    // 转换为小写以支持大小写不敏感匹配
    var presetLower = preset.toLowerCase()

    // 检查是否已加载该语言环境
    if (Ls[presetLower]) {
      l = presetLower
    }

    // 如果提供了语言环境对象，则注册它
    if (object) {
      Ls[presetLower] = object
      l = presetLower
    }

    // 处理带连字符的语言代码（如 zh-cn），尝试使用主语言代码（zh）
    var presetSplit = preset.split('-')
    if (!l && presetSplit.length > 1) {
      return parseLocale(presetSplit[0])
    }
  } else {
    // 处理语言环境对象
    var name = preset.name
    Ls[name] = preset
    l = name
  }

  // 如果不是局部设置，更新全局语言环境
  if (!isLocal && l) L = l
  // 返回解析后的语言环境代码或当前全局语言环境
  return l || (!isLocal && L)
}

/**
 * @function dayjs
 * @description Day.js 主函数，用于创建或解析日期时间
 *
 * @param {*} [date] - 要解析的日期，可以是多种格式：
 *                    - null/undefined: 返回当前时间
 *                    - string: 日期字符串
 *                    - number: 时间戳
 *                    - Date: JavaScript Date 对象
 *                    - Dayjs: Dayjs 对象（将返回其克隆）
 * @param {object|string} [c] - 配置对象或格式字符串
 * @returns {Dayjs} 返回新的 Dayjs 实例
 *
 * @example
 * // 返回当前时间
 * dayjs()
 *
 * // 解析日期字符串
 * dayjs('2024-01-01')
 *
 * // 解析时间戳
 * dayjs(1641013200000)
 *
 * // 解析现有 Date 对象
 * dayjs(new Date())
 *
 * // 克隆现有 Dayjs 对象
 * dayjs(existingDayjsObject)
 */
var dayjs = function dayjs(date, c) {
  // 如果参数是 Dayjs 对象，则返回其克隆
  if (isDayjs(date)) {
    return date.clone()
  } // eslint-disable-next-line no-nested-ternary

  // 配置处理
  var cfg = typeof c === 'object' ? c : {}
  cfg.date = date
  cfg.args = arguments // eslint-disable-line prefer-rest-params

  // 创建并返回新的 Dayjs 实例
  return new Dayjs(cfg) // eslint-disable-line no-use-before-define
}

/**
 * @function wrapper
 * @description 创建新的Dayjs实例的工厂函数，确保不可变性
 *
 * @param {*} date - 输入值（Date对象、时间戳、日期字符串等）
 * @param {Dayjs} instance - 原始Dayjs实例，用于继承配置（如语言环境、UTC状态等）
 * @returns {Dayjs} 返回新创建的Dayjs实例
 *
 * @private
 *
 * @example
 * // 创建今天的日期实例
 * wrapper() // 相当于 dayjs()
 *
 * // 从另一个实例继承配置
 * wrapper('2024-01-01', dayjs().locale('zh-cn')) // 创建2024年1月1日的实例并继承中文语言环境
 */
var wrapper = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L, // 继承语言环境
    utc: instance.$u, // 继承 UTC 设置
    x: instance.$x, // 继承扩展属性
    $offset: instance.$offset // 继承时区偏移（待重构）
  })
}

/**
 * @namespace Utils
 * @description Day.js 内部工具函数集合，包含从 './utils' 导入的基础工具和添加的核心功能
 */
var Utils = U // 从 './utils' 导入基础工具函数

/**
 * @function Utils.l
 * @description 语言环境解析函数
 * @see parseLocale
 * @private
 */
Utils.l = parseLocale // 语言环境解析

/**
 * @function Utils.i
 * @description 类型检查函数，判断一个值是否为 Dayjs 对象
 * @see isDayjs
 * @private
 */
Utils.i = isDayjs // 类型检查

/**
 * @function Utils.w
 * @description 包装器函数，用于创建新的 Dayjs 实例
 * @see wrapper
 * @private
 */
Utils.w = wrapper // 实例包装器

/**
 * @function parseDate
 * @description 解析各种类型的输入为JavaScript原生Date对象
 *
 * @param {object} cfg - 配置对象，包含日期值和解析选项
 * @param {*} cfg.date - 要解析的日期值（可以是Date对象、时间戳、字符串等）
 * @param {boolean} cfg.utc - 是否使用UTC模式解析日期
 * @returns {Date} 解析后的JavaScript Date对象，如果无法解析则返回无效日期
 *
 * @private
 *
 * @note 内部使用了多种策略来处理不同类型的输入，支持UTC模式
 *
 * @example
 * parseDate({ date: null }) // 无效日期
 * parseDate({ date: undefined }) // 当前日期时间
 * parseDate({ date: new Date(2024, 0, 1) }) // 2024-01-01的Date对象
 * parseDate({ date: 1641013200000 }) // 对应时间戳的Date对象
 * parseDate({ date: '2024-01-01' }) // 2024-01-01的Date对象
 * parseDate({ date: '2024-01-01', utc: true }) // UTC模式解析2024-01-01
 */
var parseDate = function parseDate(cfg) {
  var date = cfg.date,
    utc = cfg.utc

  // null 被视为无效日期
  if (date === null) return new Date(NaN) // null is invalid

  // undefined 或空值返回当前日期
  if (Utils.u(date)) return new Date() // today

  // 已有 Date 对象则创建其副本
  if (date instanceof Date) return new Date(date)

  // 处理字符串格式（非 ISO 8601 带 Z 的格式）
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    var d = date.match(C.REGEX_PARSE)

    if (d) {
      // 月份需要减1（JavaScript Date 月份从0开始）
      var m = d[2] - 1 || 0
      // 处理毫秒部分
      var ms = (d[7] || '0').substring(0, 3)

      // UTC 模式
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms))
      }

      // 本地时间模式
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }

  // 其他情况直接传递给 Date 构造函数
  return new Date(date) // everything else
}

/**
 * @class Dayjs
 * @description Day.js 的核心类，提供日期时间的各种操作和计算功能
 *
 * 该类采用不可变设计模式，所有修改日期的操作都会返回新的实例，而不是修改原实例。
 * 实例内部存储日期的各个部分（年、月、日、时、分、秒、毫秒）以提高性能。
 *
 * @property {Date} $d - 内部 JavaScript Date 对象
 * @property {number} $y - 年份
 * @property {number} $M - 月份（0-11）
 * @property {number} $D - 日期（1-31）
 * @property {number} $W - 星期几（0-6，0 表示星期日）
 * @property {number} $H - 小时（0-23）
 * @property {number} $m - 分钟（0-59）
 * @property {number} $s - 秒（0-59）
 * @property {number} $ms - 毫秒（0-999）
 * @property {string} $L - 当前语言环境代码
 * @property {object} $x - 扩展属性存储对象
 * @property {boolean} $isDayjsObject - 标识属性，用于类型检查
 */
var Dayjs = /*#__PURE__*/ (function () {
  /**
   * @constructor
   * @description 创建新的 Dayjs 实例
   *
   * @param {object} cfg - 配置对象
   * @param {*} cfg.date - 日期值
   * @param {string} [cfg.locale] - 语言环境代码
   * @param {boolean} [cfg.utc] - 是否使用 UTC 模式
   * @param {object} [cfg.x] - 扩展属性
   *
   * @private
   */
  function Dayjs(cfg) {
    // 设置语言环境
    this.$L = parseLocale(cfg.locale, null, true)
    // 解析日期
    this.parse(cfg)
    // 初始化扩展属性
    this.$x = this.$x || cfg.x || {}
    // 设置类型标识
    this[IS_DAYJS] = true
  }

  var _proto = Dayjs.prototype

  /**
   * @function parse
   * @description 解析日期配置，创建内部 Date 对象
   *
   * @param {object} cfg - 日期配置对象
   * @returns {void}
   *
   * @private
   */
  _proto.parse = function parse(cfg) {
    // 解析日期字符串或值为 Date 对象
    this.$d = parseDate(cfg)
    // 初始化内部日期属性
    this.init()
  }

  /**
   * @function init
   * @description 初始化日期的各个部分到实例属性
   *
   * @returns {void}
   *
   * @private
   */
  _proto.init = function init() {
    var $d = this.$d
    // 缓存日期的各个部分以提高性能
    this.$y = $d.getFullYear() // 年份
    this.$M = $d.getMonth() // 月份（0-11）
    this.$D = $d.getDate() // 日期（1-31）
    this.$W = $d.getDay() // 星期几（0-6）
    this.$H = $d.getHours() // 小时（0-23）
    this.$m = $d.getMinutes() // 分钟（0-59）
    this.$s = $d.getSeconds() // 秒（0-59）
    this.$ms = $d.getMilliseconds() // 毫秒（0-999）
  } // eslint-disable-next-line class-methods-use-this

  /**
   * @function $utils
   * @description 获取工具函数集合（供插件使用）
   *
   * @returns {object} 工具函数对象
   *
   * @private
   */
  _proto.$utils = function $utils() {
    return Utils
  }

  /**
   * @function isValid
   * @description 检查日期是否有效
   *
   * @returns {boolean} 如果日期有效返回 true，否则返回 false
   *
   * @example
   * dayjs('2024-02-30').isValid() // false（2月没有30日）
   * dayjs('2024-01-01').isValid() // true
   */
  _proto.isValid = function isValid() {
    // 通过检查内部 Date 对象的字符串表示来判断是否为无效日期
    return !(this.$d.toString() === C.INVALID_DATE_STRING)
  }

  /**
   * @function isSame
   * @description 判断两个日期是否相同
   *
   * @param {*} that - 要比较的日期
   * @param {string} [units] - 比较的单位（year/month/day/hour/minute/second等）
   * @returns {boolean} 如果日期相同返回 true，否则返回 false
   *
   * @example
   * dayjs('2024-01-01').isSame('2024-01-01') // true
   * dayjs('2024-01-01 10:00').isSame('2024-01-01 12:00', 'day') // true
   */
  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that)
    // 检查当前日期的开始和结束是否包含比较日期
    return this.startOf(units) <= other && other <= this.endOf(units)
  }

  /**
   * @function isAfter
   * @description 判断当前日期是否在比较日期之后
   *
   * @param {*} that - 要比较的日期
   * @param {string} [units] - 比较的单位（year/month/day/hour/minute/second等）
   * @returns {boolean} 如果当前日期在比较日期之后返回 true，否则返回 false
   *
   * @example
   * dayjs('2024-01-02').isAfter('2024-01-01') // true
   * dayjs('2024-01-01 12:00').isAfter('2024-01-01 10:00', 'hour') // true
   */
  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units)
  }

  /**
   * @function isBefore
   * @description 判断当前日期是否在比较日期之前
   *
   * @param {*} that - 要比较的日期
   * @param {string} [units] - 比较的单位（year/month/day/hour/minute/second等）
   * @returns {boolean} 如果当前日期在比较日期之前返回 true，否则返回 false
   *
   * @example
   * dayjs('2024-01-01').isBefore('2024-01-02') // true
   * dayjs('2024-01-01 10:00').isBefore('2024-01-01 12:00', 'hour') // true
   */
  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that)
  }

  /**
   * @function $g
   * @description 内部 getter/setter 方法，根据参数决定是获取还是设置值
   *
   * @param {*} input - 要设置的值，如果为 undefined 或 null 则执行 get 操作
   * @param {string} get - 获取值的属性名
   * @param {string} set - 设置值的方法名
   * @returns {*} 如果是 get 操作返回属性值，如果是 set 操作返回新实例
   *
   * @private
   *
   * @example
   * // 内部使用示例：获取年份
   * this.$g(undefined, '$y', C.Y)
   * // 设置年份为2024
   * this.$g(2024, '$y', C.Y)
   */
  _proto.$g = function $g(input, get, set) {
    // 如果没有提供输入值或输入值为null，则执行get操作
    if (Utils.u(input)) return this[get]
    // 否则执行set操作并返回新的实例
    return this.set(set, input)
  }

  /**
   * @function unix
   * @description 获取 Unix 时间戳（秒）
   *
   * @returns {number} Unix 时间戳（从 1970-01-01 00:00:00 UTC 开始的秒数）
   *
   * @example
   * dayjs('2024-01-01').unix() // 返回对应的时间戳（秒）
   */
  _proto.unix = function unix() {
    // 将毫秒时间戳转换为秒时间戳并向下取整
    return Math.floor(this.valueOf() / 1000)
  }

  /**
   * @function valueOf
   * @description 获取日期的时间戳（毫秒）
   *
   * @returns {number} 从 1970-01-01 00:00:00 UTC 开始的毫秒数
   *
   * @example
   * dayjs('2024-01-01').valueOf() // 返回对应的时间戳（毫秒）
   *
   * @note 该方法被 JavaScript 引擎用于比较操作，例如 dayjs1 < dayjs2
   */
  _proto.valueOf = function valueOf() {
    // 返回内部 Date 对象的时间戳
    return this.$d.getTime()
  }

  /**
   * @function startOf
   * @description 设置日期到指定单位的开始时间
   *
   * @param {string} units - 时间单位（year/month/week/day/hour/minute/second等）
   * @param {boolean} [_startOf=true] - 是否为开始时间（用于 endOf 方法调用）
   * @returns {Dayjs} 返回新的 Dayjs 实例
   *
   * @example
   * dayjs('2024-01-15').startOf('month') // 返回 2024-01-01 00:00:00
   * dayjs('2024-01-15 12:30').startOf('day') // 返回 2024-01-15 00:00:00
   */
  _proto.startOf = function startOf(units, _startOf) {
    var _this = this

    // 确定是开始时间还是结束时间
    var isStartOf = !Utils.u(_startOf) ? _startOf : true
    // 标准化单位名称
    var unit = Utils.p(units)

    // 创建日期实例的工厂函数
    var instanceFactory = function instanceFactory(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this)
      return isStartOf ? ins : ins.endOf(C.D)
    }

    // 设置时间部分的工厂函数
    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0] // 开始时间：时、分、秒、毫秒都设为0
      var argumentEnd = [23, 59, 59, 999] // 结束时间：时、分、秒、毫秒设为最大值
      return Utils.w(_this.toDate()[method].apply(_this.toDate('s'), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this)
    }

    // 缓存常用属性
    var $W = this.$W,
      $M = this.$M,
      $D = this.$D
    // 确定是否使用 UTC 方法前缀
    var utcPad = 'set' + (this.$u ? 'UTC' : '')

    // 根据不同的单位执行不同的操作
    switch (unit) {
      case C.Y: // 年
        return isStartOf
          ? instanceFactory(1, 0) // 开始：1月1日
          : instanceFactory(31, 11) // 结束：12月31日

      case C.M: // 月
        return isStartOf
          ? instanceFactory(1, $M) // 开始：当月1日
          : instanceFactory(0, $M + 1) // 结束：下月1日的前一天

      case C.W: { // 周
        // 获取每周的起始日（默认为星期日）
        var weekStart = this.$locale().weekStart || 0
        // 计算当前日与周起始日的差距
        var gap = ($W < weekStart ? $W + 7 : $W) - weekStart
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M)
      }

      case C.D:
      case C.DATE: // 日
        return instanceFactorySet(utcPad + 'Hours', 0) // 设置时、分、秒、毫秒

      case C.H: // 小时
        return instanceFactorySet(utcPad + 'Minutes', 1) // 设置分、秒、毫秒

      case C.MIN: // 分钟
        return instanceFactorySet(utcPad + 'Seconds', 2) // 设置秒、毫秒

      case C.S: // 秒
        return instanceFactorySet(utcPad + 'Milliseconds', 3) // 设置毫秒

      default:
        return this.clone() // 未知单位返回克隆
    }
  }

  /**
   * @function endOf
   * @description 设置日期到指定单位的结束时间
   *
   * @param {string} arg - 时间单位（year/month/week/day/hour/minute/second等）
   * @returns {Dayjs} 返回新的 Dayjs 实例
   *
   * @example
   * dayjs('2024-01-01').endOf('month') // 返回 2024-01-31 23:59:59.999
   * dayjs('2024-01-15 12:30').endOf('day') // 返回 2024-01-15 23:59:59.999
   *
   * @note 内部通过调用 startOf 方法并传入 false 实现
   */
  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false)
  }

  /**
   * @function $set
   * @description 内部方法，设置日期的指定部分的值
   *
   * @param {string} units - 要设置的时间单位
   * @param {number} _int - 要设置的值
   * @returns {Dayjs} 返回修改后的 Dayjs 实例（注意：此方法会修改原实例）
   *
   * @private
   */
  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C

    // 标准化单位名称
    var unit = Utils.p(units)
    // 确定是否使用 UTC 方法前缀
    var utcPad = 'set' + (this.$u ? 'UTC' : '')
    // 映射单位到对应的 Date 对象方法
    var name = ((_C$D$C$DATE$C$M$C$Y$C = {}),
    (_C$D$C$DATE$C$M$C$Y$C[C.D] = utcPad + 'Date'),
    (_C$D$C$DATE$C$M$C$Y$C[C.DATE] = utcPad + 'Date'),
    (_C$D$C$DATE$C$M$C$Y$C[C.M] = utcPad + 'Month'),
    (_C$D$C$DATE$C$M$C$Y$C[C.Y] = utcPad + 'FullYear'),
    (_C$D$C$DATE$C$M$C$Y$C[C.H] = utcPad + 'Hours'),
    (_C$D$C$DATE$C$M$C$Y$C[C.MIN] = utcPad + 'Minutes'),
    (_C$D$C$DATE$C$M$C$Y$C[C.S] = utcPad + 'Seconds'),
    (_C$D$C$DATE$C$M$C$Y$C[C.MS] = utcPad + 'Milliseconds'),
    _C$D$C$DATE$C$M$C$Y$C)[unit]

    // 处理星期几的特殊情况
    var arg = unit === C.D ? this.$D + (_int - this.$W) : _int

    // 处理月份和年份的特殊情况（需要处理月末日期溢出）
    if (unit === C.M || unit === C.Y) {
      // 创建临时实例以安全地修改月份/年份
      var date = this.clone().set(C.DATE, 1) // 先设置为当月第一天
      date.$d[name](arg) // 修改月份或年份
      date.init() // 重新初始化内部属性
      // 调整日期，确保不会溢出（例如从3月31日切换到2月时）
      this.$d = date.set(C.DATE, Math.min(this.$D, date.daysInMonth())).$d
    } else if (name) {
      // 直接设置其他属性
      this.$d[name](arg)
    }

    // 重新初始化内部属性
    this.init()
    return this
  }

  /**
   * @function set
   * @description 设置日期的指定部分的值
   *
   * @param {string} string - 要设置的时间单位
   * @param {number} _int2 - 要设置的值
   * @returns {Dayjs} 返回新的 Dayjs 实例（不可变操作）
   *
   * @example
   * dayjs().set('year', 2024) // 设置年份为2024
   * dayjs().set('month', 0)   // 设置月份为1月
   * dayjs().set('date', 15)   // 设置日期为15日
   */
  _proto.set = function set(string, _int2) {
    // 先克隆，再修改，保持不可变性
    return this.clone().$set(string, _int2)
  }

  /**
   * @function get
   * @description 获取日期的指定部分的值
   *
   * @param {string} unit - 要获取的时间单位
   * @returns {number} 指定部分的值
   *
   * @example
   * dayjs().get('year')  // 获取当前年份
   * dayjs().get('month') // 获取当前月份（0-11）
   * dayjs().get('date')  // 获取当前日期
   */
  _proto.get = function get(unit) {
    // 标准化单位并调用对应的方法
    return this[Utils.p(unit)]()
  }

  /**
   * @function add
   * @description 为日期添加指定的时间量
   *
   * @param {number} number - 要添加的数量
   * @param {string} units - 要添加的时间单位
   * @returns {Dayjs} 返回新的 Dayjs 实例
   *
   * @example
   * dayjs().add(1, 'day')   // 添加1天
   * dayjs().add(2, 'month') // 添加2个月
   * dayjs().add(-1, 'year') // 减去1年
   */
  _proto.add = function add(number, units) {
    var _this2 = this,
      _C$MIN$C$H$C$S$unit

    // 确保是数字类型
    number = Number(number) // eslint-disable-line no-param-reassign

    // 标准化单位
    var unit = Utils.p(units)

    // 创建日期实例的工厂函数（用于日和周的操作）
    var instanceFactorySet = function instanceFactorySet(n) {
      var d = dayjs(_this2)
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2)
    }

    // 根据不同单位执行不同的添加逻辑
    if (unit === C.M) {
      // 月份操作
      return this.set(C.M, this.$M + number)
    }

    if (unit === C.Y) {
      // 年份操作
      return this.set(C.Y, this.$y + number)
    }

    if (unit === C.D) {
      // 日操作
      return instanceFactorySet(1)
    }

    if (unit === C.W) {
      // 周操作（7天）
      return instanceFactorySet(7)
    }

    // 其他时间单位（时、分、秒、毫秒）的操作
    var step =
      ((_C$MIN$C$H$C$S$unit = {}),
      (_C$MIN$C$H$C$S$unit[C.MIN] = C.MILLISECONDS_A_MINUTE),
      (_C$MIN$C$H$C$S$unit[C.H] = C.MILLISECONDS_A_HOUR),
      (_C$MIN$C$H$C$S$unit[C.S] = C.MILLISECONDS_A_SECOND),
      _C$MIN$C$H$C$S$unit)[unit] || 1 // 毫秒为单位的步长

    // 通过时间戳进行计算
    var nextTimeStamp = this.$d.getTime() + number * step
    return Utils.w(nextTimeStamp, this)
  }

  /**
   * @function subtract
   * @description 从日期中减去指定的时间量
   *
   * @param {number} number - 要减去的数量
   * @param {string} string - 要减去的时间单位
   * @returns {Dayjs} 返回新的 Dayjs 实例
   *
   * @example
   * dayjs().subtract(1, 'day')   // 减去1天
   * dayjs().subtract(2, 'month') // 减去2个月
   *
   * @note 内部通过调用 add 方法并传入负数实现
   */
  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string)
  }

  /**
   * @function format
   * @description 将日期格式化为指定的字符串格式
   *
   * @param {string} [formatStr] - 格式字符串，默认为 ISO8601 格式
   * @returns {string} 格式化后的日期字符串
   *
   * @example
   * dayjs().format('YYYY-MM-DD')        // 2024-01-15
   * dayjs().format('YYYY-MM-DD HH:mm:ss') // 2024-01-15 12:30:45
   * dayjs().format('dddd, MMMM D, YYYY') // Monday, January 15, 2024
   *
   * @note 支持的格式占位符：
   *   - 年: YY (两位数), YYYY (四位数)
   *   - 月: M (1-12), MM (01-12), MMM (英文缩写), MMMM (英文全称)
   *   - 日: D (1-31), DD (01-31)
   *   - 星期: d (0-6), dd (缩写), ddd (短全称), dddd (全称)
   *   - 时: H (0-23), HH (00-23), h (1-12), hh (01-12)
   *   - 分: m (0-59), mm (00-59)
   *   - 秒: s (0-59), ss (00-59)
   *   - 毫秒: SSS (000-999)
   *   - 上下午: a (am/pm), A (AM/PM)
   *   - 时区: Z (±HH:mm), ZZ (±HHmm)
   */
  _proto.format = function format(formatStr) {
    var _this3 = this

    // 获取当前语言环境配置
    var locale = this.$locale()
    // 检查日期是否有效
    if (!this.isValid()) return locale.invalidDate || C.INVALID_DATE_STRING
    // 使用指定格式或默认格式
    var str = formatStr || C.FORMAT_DEFAULT
    // 获取时区字符串
    var zoneStr = Utils.z(this)
    // 缓存常用属性
    var $H = this.$H,
      $m = this.$m,
      $M = this.$M
    // 获取语言环境中的星期和月份名称
    var weekdays = locale.weekdays,
      months = locale.months,
      meridiem = locale.meridiem

    // 获取短名称的辅助函数
    var getShort = function getShort(arr, index, full, length) {
      return (arr && (arr[index] || arr(_this3, str))) || full[index].slice(0, length)
    }

    // 获取12小时制小时数的辅助函数
    var get$H = function get$H(num) {
      return Utils.s($H % 12 || 12, num, '0')
    }

    // 上下午转换函数（使用语言环境提供的或默认实现）
    var meridiemFunc =
      meridiem ||
      function (hour, minute, isLowercase) {
        var m = hour < 12 ? 'AM' : 'PM'
        return isLowercase ? m.toLowerCase() : m
      }

    // 匹配格式占位符的函数
    var matches = function matches(match) {
      switch (match) {
        case 'YY':
          return String(_this3.$y).slice(-2) // 两位数年份

        case 'YYYY':
          return Utils.s(_this3.$y, 4, '0') // 四位数年份

        case 'M':
          return $M + 1 // 1-12的月份

        case 'MM':
          return Utils.s($M + 1, 2, '0') // 01-12的月份

        case 'MMM':
          return getShort(locale.monthsShort, $M, months, 3) // 月份缩写

        case 'MMMM':
          return getShort(months, $M) // 月份全称

        case 'D':
          return _this3.$D // 1-31的日期

        case 'DD':
          return Utils.s(_this3.$D, 2, '0') // 01-31的日期

        case 'd':
          return String(_this3.$W) // 0-6的星期

        case 'dd':
          return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2) // 星期最小缩写

        case 'ddd':
          return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3) // 星期短缩写

        case 'dddd':
          return weekdays[_this3.$W] // 星期全称

        case 'H':
          return String($H) // 0-23的小时

        case 'HH':
          return Utils.s($H, 2, '0') // 00-23的小时

        case 'h':
          return get$H(1) // 1-12的小时

        case 'hh':
          return get$H(2) // 01-12的小时

        case 'a':
          return meridiemFunc($H, $m, true) // 小写的上下午

        case 'A':
          return meridiemFunc($H, $m, false) // 大写的上下午

        case 'm':
          return String($m) // 0-59的分钟

        case 'mm':
          return Utils.s($m, 2, '0') // 00-59的分钟

        case 's':
          return String(_this3.$s) // 0-59的秒

        case 'ss':
          return Utils.s(_this3.$s, 2, '0') // 00-59的秒

        case 'SSS':
          return Utils.s(_this3.$ms, 3, '0') // 000-999的毫秒

        case 'Z':
          return zoneStr // ±HH:mm格式的时区
        // 'ZZ' logic below

        default:
          break
      }

      return null
    }

    // 替换格式字符串中的占位符
    return str.replace(C.REGEX_FORMAT, function (match, $1) {
      return $1 || matches(match) || zoneStr.replace(':', '') // 'ZZ' 格式特殊处理
    })
  }

  _proto.utcOffset = function utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15
  }

  _proto.diff = function diff(input, units, _float) {
    var _this4 = this

    var unit = Utils.p(units)
    var that = dayjs(input)
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * C.MILLISECONDS_A_MINUTE
    var diff = this - that

    var getMonth = function getMonth() {
      return Utils.m(_this4, that)
    }

    var result

    switch (unit) {
      case C.Y:
        result = getMonth() / 12
        break

      case C.M:
        result = getMonth()
        break

      case C.Q:
        result = getMonth() / 3
        break

      case C.W:
        result = (diff - zoneDelta) / C.MILLISECONDS_A_WEEK
        break

      case C.D:
        result = (diff - zoneDelta) / C.MILLISECONDS_A_DAY
        break

      case C.H:
        result = diff / C.MILLISECONDS_A_HOUR
        break

      case C.MIN:
        result = diff / C.MILLISECONDS_A_MINUTE
        break

      case C.S:
        result = diff / C.MILLISECONDS_A_SECOND
        break

      default:
        result = diff // milliseconds

        break
    }

    return _float ? result : Utils.a(result)
  }

  /**
   * @function daysInMonth
   * @description 获取当前月份的天数
   *
   * @returns {number} 当前月份的天数（28-31）
   *
   * @example
   * dayjs('2024-02').daysInMonth() // 29（闰年）
   * dayjs('2023-02').daysInMonth() // 28
   * dayjs('2024-04').daysInMonth() // 30
   */
  _proto.daysInMonth = function daysInMonth() {
    // 通过获取当月的最后一天来确定月份的天数
    return this.endOf(C.M).$D
  }

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L]
  }

  _proto.locale = function locale(preset, object) {
    if (!preset) return this.$L
    var that = this.clone()
    var nextLocaleName = parseLocale(preset, object, true)
    if (nextLocaleName) that.$L = nextLocaleName
    return that
  }

  _proto.clone = function clone() {
    return Utils.w(this.$d, this)
  }

  _proto.toDate = function toDate() {
    return new Date(this.valueOf())
  }

  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null
  }

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString()
  }

  _proto.toString = function toString() {
    return this.$d.toUTCString()
  }

  return Dayjs
})()

var proto = Dayjs.prototype
dayjs.prototype = proto

/**
 * @function year
 * @description 获取或设置年份
 *
 * @param {number} [year] - 可选，要设置的年份
 * @returns {number|Dayjs} 如果不传参数返回当前年份，否则返回修改后的新实例
 *
 * @example
 * dayjs().year()       // 获取当前年份
 * dayjs().year(2024)   // 设置年份为2024并返回新实例
 */
proto.year = function (input) {
  return this.$g(input, '$y', C.Y)
}

/**
 * @function month
 * @description 获取或设置月份（0-11）
 *
 * @param {number} [month] - 可选，要设置的月份（0-11）
 * @returns {number|Dayjs} 如果不传参数返回当前月份，否则返回修改后的新实例
 *
 * @example
 * dayjs().month()       // 获取当前月份（0-11）
 * dayjs().month(0)      // 设置为1月并返回新实例
 * dayjs().month(11)     // 设置为12月并返回新实例
 */
proto.month = function (input) {
  return this.$g(input, '$M', C.M)
}

/**
 * @function date
 * @description 获取或设置日期（1-31）
 *
 * @param {number} [date] - 可选，要设置的日期（1-31）
 * @returns {number|Dayjs} 如果不传参数返回当前日期，否则返回修改后的新实例
 *
 * @example
 * dayjs().date()        // 获取当前日期
 * dayjs().date(15)      // 设置为15日并返回新实例
 */
proto.date = function (input) {
  return this.$g(input, '$D', C.DATE)
}

/**
 * @function day
 * @description 获取或设置星期几（0-6，0代表星期日）
 *
 * @param {number} [day] - 可选，要设置的星期几（0-6）
 * @returns {number|Dayjs} 如果不传参数返回当前星期几，否则返回修改后的新实例
 *
 * @example
 * dayjs().day()         // 获取当前星期几（0-6）
 * dayjs().day(1)        // 设置为星期一并返回新实例
 */
proto.day = function (input) {
  return this.$g(input, '$W', C.D)
}

/**
 * @function hour
 * @description 获取或设置小时（0-23）
 *
 * @param {number} [hour] - 可选，要设置的小时（0-23）
 * @returns {number|Dayjs} 如果不传参数返回当前小时，否则返回修改后的新实例
 *
 * @example
 * dayjs().hour()        // 获取当前小时
 * dayjs().hour(12)      // 设置为12点并返回新实例
 */
proto.hour = function (input) {
  return this.$g(input, '$H', C.H)
}

/**
 * @function minute
 * @description 获取或设置分钟（0-59）
 *
 * @param {number} [minute] - 可选，要设置的分钟（0-59）
 * @returns {number|Dayjs} 如果不传参数返回当前分钟，否则返回修改后的新实例
 *
 * @example
 * dayjs().minute()      // 获取当前分钟
 * dayjs().minute(30)    // 设置为30分并返回新实例
 */
proto.minute = function (input) {
  return this.$g(input, '$m', C.MIN)
}

/**
 * @function second
 * @description 获取或设置秒（0-59）
 *
 * @param {number} [second] - 可选，要设置的秒（0-59）
 * @returns {number|Dayjs} 如果不传参数返回当前秒，否则返回修改后的新实例
 *
 * @example
 * dayjs().second()      // 获取当前秒
 * dayjs().second(45)    // 设置为45秒并返回新实例
 */
proto.second = function (input) {
  return this.$g(input, '$s', C.S)
}

/**
 * @function millisecond
 * @description 获取或设置毫秒（0-999）
 *
 * @param {number} [millisecond] - 可选，要设置的毫秒（0-999）
 * @returns {number|Dayjs} 如果不传参数返回当前毫秒，否则返回修改后的新实例
 *
 * @example
 * dayjs().millisecond() // 获取当前毫秒
 * dayjs().millisecond(500) // 设置为500毫秒并返回新实例
 */
proto.millisecond = function (input) {
  return this.$g(input, '$ms', C.MS)
}

/**
 * @function dayjs.extend
 * @description 扩展Day.js功能的插件机制
 *
 * @param {Function} plugin - 插件函数，接收dayjs作为参数
 * @param {*} [option] - 插件配置选项，传递给插件函数
 * @returns {Function} 返回dayjs函数，支持链式调用
 *
 * @example
 * // 创建并使用一个简单插件
 * const myPlugin = (dayjs, option, Dayjs) => {
 *   Dayjs.prototype.myFunction = () => 'Hello!';
 * };
 * dayjs.extend(myPlugin);
 * dayjs().myFunction(); // 'Hello!'
 *
 * @note 插件只会被安装一次，通过$i标记防止重复安装
 */
dayjs.extend = function (plugin, option) {
  // 检查插件是否已经安装（使用$i标记）
  if (!plugin.$i) {
    // 调用插件函数并传入选项、Dayjs构造函数和dayjs函数
    plugin(option, Dayjs, dayjs)
    // 标记插件已安装
    plugin.$i = true
  }

  // 返回dayjs函数以支持链式调用
  return dayjs
}

/**
 * @function dayjs.locale
 * @description 管理全局语言环境设置
 *
 * @param {string} [name] - 可选，语言环境名称
 * @param {object} [localeObject] - 可选，语言环境配置对象
 * @returns {string|object} 根据参数不同返回语言环境名称或配置对象
 *
 * @example
 * // 获取当前全局语言环境名称
 * dayjs.locale() // 'en'
 *
 * // 设置全局语言环境
 * dayjs.locale('zh-cn')
 *
 * // 注册新的语言环境
 * dayjs.locale('my-lang', { ... })
 */
dayjs.locale = parseLocale

/**
 * @property {Function} dayjs.isDayjs
 * @description 静态方法，检查一个对象是否是Dayjs实例
 *
 * @param {*} obj - 要检查的对象
 * @returns {boolean} 如果是Dayjs实例返回true，否则返回false
 *
 * @example
 * dayjs.isDayjs(dayjs()) // true
 * dayjs.isDayjs(new Date()) // false
 */
dayjs.isDayjs = isDayjs

/**
 * @function dayjs.unix
 * @description 从Unix时间戳（秒）创建dayjs实例
 *
 * @param {number} timestamp - Unix时间戳（从1970-01-01 00:00:00 UTC开始的秒数）
 * @returns {Dayjs} 返回新的Dayjs实例
 *
 * @example
 * dayjs.unix(1641013200) // 创建对应时间的Dayjs实例
 */
dayjs.unix = function (timestamp) {
  return dayjs(timestamp * 1e3)
}

/**
 * @property {Object} dayjs.en
 * @description 静态属性，默认英语语言环境配置
 */
dayjs.en = Ls[L]

/**
 * @property {Object} dayjs.Ls
 * @description 静态属性，存储所有已加载的语言环境
 */
dayjs.Ls = Ls

/**
 * @property {Object} dayjs.p
 * @description 静态属性，插件存储对象
 */
dayjs.p = {}

// 导出dayjs函数作为默认模块
export default dayjs
