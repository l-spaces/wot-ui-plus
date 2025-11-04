/**
 * @file index.d.ts
 * @description dayjs 日期时间处理库类型声明文件
 *
 * 该文件提供了 dayjs 库的完整 TypeScript 类型定义，为 wot-ui-plus 组件库提供日期时间处理支持。
 * dayjs 是一个轻量级的日期时间处理库，提供了日期解析、格式化、比较、操作等丰富功能，
 * 设计理念与 Moment.js 类似但体积更小，性能更优，非常适合移动端应用。
 *
 * 核心功能：
 * 1. 日期时间解析与创建
 * 2. 日期时间格式化输出
 * 3. 日期时间比较与查询
 * 4. 日期时间计算与操作
 * 5. 国际化与本地化支持
 * 6. 插件扩展机制
 *
 * 在 wot-ui-plus 组件库中的应用场景：
 * - 日历组件 (Calendar)
 * - 倒计时组件 (CountDown)
 * - 时间选择器 (Picker)
 * - 日期相关格式化与验证
 *
 * 技术特点：
 * - 不可变数据模式：所有操作都返回新的 Dayjs 实例，不修改原实例
 * - 链式调用：支持方法链式调用，提高代码可读性和简洁性
 * - 轻量级设计：核心库体积小，支持按需加载插件
 * - 完整的国际化支持：支持多种语言环境的日期时间格式
 *
 * @author dayjs contributors
 * @version 1.0.0
 * @since 2024
 */

/* eslint-disable */
/// <reference path="./locale/index.d.ts" />

/**
 * 默认导出 dayjs 函数
 * 这是 dayjs 库的主要入口点，用于创建和操作日期对象
 */
export = dayjs

/**
 * dayjs 主函数重载定义 - 基本用法
 * @param {dayjs.ConfigType} [date] 可选的日期配置，支持多种格式
 * @returns {dayjs.Dayjs} 返回一个新的 Dayjs 实例
 * @example
 * // 创建当前日期
 * dayjs()
 * // 创建特定日期
 * dayjs('2024-01-01')
 * dayjs(new Date())
 * dayjs(1617654494000) // 时间戳
 */
declare function dayjs(date?: dayjs.ConfigType): dayjs.Dayjs

/**
 * dayjs 主函数重载定义 - 指定格式
 * @param {dayjs.ConfigType} [date] 可选的日期配置
 * @param {dayjs.OptionType} [format] 日期格式字符串或对象
 * @param {boolean} [strict=false] 是否启用严格解析模式
 * @returns {dayjs.Dayjs} 返回一个新的 Dayjs 实例
 * @example
 * // 指定日期格式解析
 * dayjs('01-01-2024', 'DD-MM-YYYY')
 * // 严格模式解析
 * dayjs('01-01-2024', 'DD-MM-YYYY', true)
 */
declare function dayjs(date?: dayjs.ConfigType, format?: dayjs.OptionType, strict?: boolean): dayjs.Dayjs

/**
 * dayjs 主函数重载定义 - 指定格式和语言环境
 * @param {dayjs.ConfigType} [date] 可选的日期配置
 * @param {dayjs.OptionType} [format] 日期格式字符串或对象
 * @param {string} [locale] 指定语言环境
 * @param {boolean} [strict=false] 是否启用严格解析模式
 * @returns {dayjs.Dayjs} 返回一个新的 Dayjs 实例
 * @example
 * // 指定格式和语言环境解析
 * dayjs('01-01-2024', 'DD-MM-YYYY', 'fr')
 */
declare function dayjs(date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs

declare namespace dayjs {
  /**
   * 配置类型映射接口
   * 定义 dayjs 函数接受的不同类型的日期配置
   */
  interface ConfigTypeMap {
    default: string | number | Date | Dayjs | null | undefined
  }

  /**
   * 日期配置类型
   * 支持字符串、数字、Date 对象、Dayjs 对象、null 或 undefined
   * @typedef {ConfigTypeMap[keyof ConfigTypeMap]} ConfigType
   */
  export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]

  /**
   * 格式配置对象接口
   * 用于指定解析或格式化的语言环境、格式字符串和 UTC 模式
   */
  export interface FormatObject {
    /** 语言环境代码 */
    locale?: string
    /** 日期格式字符串 */
    format?: string
    /** 是否使用 UTC 时间 */
    utc?: boolean
  }

  /**
   * 选项类型
   * 支持格式配置对象、格式字符串或格式字符串数组
   * @typedef {FormatObject | string | string[]} OptionType
   */
  export type OptionType = FormatObject | string | string[]

  /**
   * 时间单位简写类型
   * @typedef {'d' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'} UnitTypeShort
   */
  export type UnitTypeShort = 'd' | 'D' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms'

  /**
   * 时间单位完整类型
   * @typedef {'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'} UnitTypeLong
   */
  export type UnitTypeLong = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | 'date'

  /**
   * 时间单位复数形式类型
   * @typedef {'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'dates'} UnitTypeLongPlural
   */
  export type UnitTypeLongPlural = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years' | 'dates'

  /**
   * 时间单位类型
   * 支持简写、完整和复数形式
   * @typedef {UnitTypeLong | UnitTypeLongPlural | UnitTypeShort} UnitType
   */
  export type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort

  /**
   * 操作单位类型
   * 在基础单位类型上增加周相关单位
   * @typedef {UnitType | "week" | "weeks" | 'w'} OpUnitType
   */
  export type OpUnitType = UnitType | 'week' | 'weeks' | 'w'

  /**
   * 查询单位类型
   * 在基础单位类型上增加季度相关单位
   * @typedef {UnitType | "quarter" | "quarters" | 'Q'} QUnitType
   */
  export type QUnitType = UnitType | 'quarter' | 'quarters' | 'Q'

  /**
   * 操作类型
   * 排除 'date' 和 'dates' 的操作单位类型，用于日期操作方法
   * @typedef {Exclude<OpUnitType, 'date' | 'dates'>} ManipulateType
   */
  export type ManipulateType = Exclude<OpUnitType, 'date' | 'dates'>
  /**
   * Dayjs 类定义
   * 核心日期时间处理类，提供丰富的日期操作方法
   * 所有方法均采用不可变模式，返回新的实例而不修改原实例
   */
  class Dayjs {
    /**
     * Dayjs 构造函数
     * @param {ConfigType} [config] 可选的日期配置
     */
    constructor(config?: ConfigType)

    /**
     * 创建 Dayjs 对象的副本
     * 由于所有 Day.js 对象都是不可变的，此方法在需要修改日期时特别有用
     *
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，包含相同的日期信息
     *
     * @example
     * // 创建当前日期的副本
     * const date = dayjs()
     * const copy = date.clone()
     *
     * // 传递 Dayjs 对象到构造函数也会创建副本
     * const anotherCopy = dayjs(date)
     */
    clone(): Dayjs

    /**
     * 检查日期对象是否有效
     * 判断当前 Dayjs 对象是否包含有效的日期信息
     *
     * @returns {boolean} 如果日期有效返回 true，否则返回 false
     *
     * @example
     * dayjs().isValid() // true
     * dayjs('invalid').isValid() // false
     */
    isValid(): boolean
    /**
     * 获取年份
     *
     * @returns {number} 返回年份数值，例如 2024
     *
     * @example
     * dayjs('2024-01-01').year() // 2024
     */
    year(): number

    /**
     * 设置年份
     *
     * @param {number} value 要设置的年份数值
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，年份已更新
     *
     * @example
     * const date = dayjs('2020-01-01')
     * date.year(2024) // 2024-01-01
     */
    year(value: number): Dayjs
    /**
     * 获取月份
     *
     * 注意：月份是从 0 开始索引的，所以 0 表示一月，11 表示十二月
     *
     * @returns {number} 返回月份数值，范围 0-11
     *
     * @example
     * dayjs('2024-01-01').month() // 0 (一月)
     * dayjs('2024-12-01').month() // 11 (十二月)
     */
    month(): number

    /**
     * 设置月份
     *
     * 注意：月份是从 0 开始索引的，所以 0 表示一月，11 表示十二月
     * 接受 0 到 11 之间的数字，如果超出范围，会自动进位到下一年
     *
     * @param {number} value 要设置的月份数值（0-11）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，月份已更新
     *
     * @example
     * const date = dayjs('2024-01-01')
     * date.month(5) // 2024-06-01 (六月)
     * date.month(13) // 2025-02-01 (超出范围，自动进位到下一年)
     */
    month(value: number): Dayjs
    /**
     * 获取月份中的日期
     *
     * @returns {number} 返回日期数值，范围 1-31
     *
     * @example
     * dayjs('2024-01-15').date() // 15
     */
    date(): number

    /**
     * 设置月份中的日期
     *
     * 接受 1 到 31 之间的数字，如果超出范围，会自动进位到下一个月
     *
     * @param {number} value 要设置的日期数值（1-31）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，日期已更新
     *
     * @example
     * const date = dayjs('2024-01-15')
     * date.date(20) // 2024-01-20
     * date.date(35) // 2024-02-04 (超出范围，自动进位到下一个月)
     */
    date(value: number): Dayjs
    /**
     * 获取星期几
     *
     * 返回 0（星期日）到 6（星期六）之间的数字
     *
     * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} 返回星期几的数值，0 表示星期日，6 表示星期六
     *
     * @example
     * // 假设 2024-01-15 是星期一
     * dayjs('2024-01-15').day() // 1 (星期一)
     */
    day(): 0 | 1 | 2 | 3 | 4 | 5 | 6

    /**
     * 设置星期几
     *
     * 接受 0（星期日）到 6（星期六）之间的数字，如果超出范围，会自动进位到下一周
     *
     * @param {number} value 要设置的星期几数值（0-6）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，星期几已更新
     *
     * @example
     * const date = dayjs('2024-01-15') // 星期一
     * date.day(0) // 2024-01-14 (星期日)
     * date.day(10) // 2024-01-22 (下周一，超出范围自动进位)
     */
    day(value: number): Dayjs
    /**
     * 获取小时数
     *
     * @returns {number} 返回小时数值，范围 0-23
     *
     * @example
     * dayjs('2024-01-01T14:30:00').hour() // 14
     */
    hour(): number

    /**
     * 设置小时数
     *
     * 接受 0 到 23 之间的数字，如果超出范围，会自动进位到下一天
     *
     * @param {number} value 要设置的小时数值（0-23）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，小时数已更新
     *
     * @example
     * const date = dayjs('2024-01-01T14:30:00')
     * date.hour(18) // 2024-01-01T18:30:00
     * date.hour(25) // 2024-01-02T01:30:00 (超出范围，自动进位到下一天)
     */
    hour(value: number): Dayjs
    /**
     * 获取分钟数
     *
     * @returns {number} 返回分钟数值，范围 0-59
     *
     * @example
     * dayjs('2024-01-01T14:30:00').minute() // 30
     */
    minute(): number

    /**
     * 设置分钟数
     *
     * 接受 0 到 59 之间的数字，如果超出范围，会自动进位到下一小时
     *
     * @param {number} value 要设置的分钟数值（0-59）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，分钟数已更新
     *
     * @example
     * const date = dayjs('2024-01-01T14:30:00')
     * date.minute(45) // 2024-01-01T14:45:00
     * date.minute(75) // 2024-01-01T15:15:00 (超出范围，自动进位到下一小时)
     */
    minute(value: number): Dayjs
    /**
     * 获取秒数
     *
     * @returns {number} 返回秒数数值，范围 0-59
     *
     * @example
     * dayjs('2024-01-01T14:30:45').second() // 45
     */
    second(): number

    /**
     * 设置秒数
     *
     * 接受 0 到 59 之间的数字，如果超出范围，会自动进位到下一分钟
     *
     * @param {number} value 要设置的秒数数值（0-59）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，秒数已更新
     *
     * @example
     * const date = dayjs('2024-01-01T14:30:00')
     * date.second(30) // 2024-01-01T14:30:30
     * date.second(70) // 2024-01-01T14:31:10 (超出范围，自动进位到下一分钟)
     */
    second(value: number): Dayjs
    /**
     * 获取毫秒数
     *
     * @returns {number} 返回毫秒数数值，范围 0-999
     *
     * @example
     * dayjs('2024-01-01T14:30:00.500').millisecond() // 500
     */
    millisecond(): number

    /**
     * 设置毫秒数
     *
     * 接受 0 到 999 之间的数字，如果超出范围，会自动进位到下一秒
     *
     * @param {number} value 要设置的毫秒数数值（0-999）
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，毫秒数已更新
     *
     * @example
     * const date = dayjs('2024-01-01T14:30:00.000')
     * date.millisecond(500) // 2024-01-01T14:30:00.500
     * date.millisecond(1200) // 2024-01-01T14:30:01.200 (超出范围，自动进位到下一秒)
     */
    millisecond(value: number): Dayjs
    /**
     * 通用设置方法
     * 接受单位和值作为参数，返回应用了变更的新实例
     *
     * 通常情况下：
     * dayjs().set(unit, value) 等同于 dayjs()[unit](value)
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {UnitType} unit 时间单位，如 'year'、'month'、'date' 等
     * @param {number} value 要设置的值
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，对应单位的值已更新
     *
     * @example
     * // 设置日期为每月1号
     * dayjs().set('date', 1)
     * // 设置月份为四月（索引为3）
     * dayjs().set('month', 3) // April
     * // 设置秒数为30
     * dayjs().set('second', 30)
     */
    set(unit: UnitType, value: number): Dayjs

    /**
     * 通用获取方法
     * 通过字符串指定单位，获取 Dayjs 对象的相应信息
     *
     * 通常情况下：
     * dayjs().get(unit) 等同于 dayjs()[unit]()
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {UnitType} unit 时间单位，如 'year'、'month'、'date' 等
     * @returns {number} 返回对应单位的数值
     *
     * @example
     * // 获取年份
     * dayjs().get('year')
     * // 获取月份（从0开始）
     * dayjs().get('month') // 0-11
     * // 获取日期
     * dayjs().get('date')
     */
    get(unit: UnitType): number
    /**
     * 增加指定时间量
     * 返回一个克隆的 Day.js 对象，并增加了指定的时间量
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {number} value 要增加的时间量
     * @param {ManipulateType} [unit] 时间单位，如 'day'、'month'、'year' 等
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，已增加指定时间量
     *
     * @example
     * // 增加7天
     * dayjs().add(7, 'day')
     * // 增加1个月
     * dayjs().add(1, 'month')
     * // 减少2年（使用负数）
     * dayjs().add(-2, 'year')
     */
    add(value: number, unit?: ManipulateType): Dayjs

    /**
     * 减少指定时间量
     * 返回一个克隆的 Day.js 对象，并减少了指定的时间量
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {number} value 要减少的时间量
     * @param {ManipulateType} [unit] 时间单位，如 'day'、'month'、'year' 等
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，已减少指定时间量
     *
     * @example
     * // 减少7年
     * dayjs().subtract(7, 'year')
     * // 减少3天
     * dayjs().subtract(3, 'day')
     */
    subtract(value: number, unit?: ManipulateType): Dayjs
    /**
     * 设置为指定时间单位的开始
     * 返回一个克隆的 Day.js 对象，并将其设置为指定时间单位的开始
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {OpUnitType} unit 时间单位，如 'year'、'month'、'day'、'week' 等
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，已设置为指定时间单位的开始
     *
     * @example
     * // 设置为本年第一天
     * dayjs().startOf('year') // 设置为 2024-01-01T00:00:00
     * // 设置为本月第一天
     * dayjs().startOf('month') // 设置为 2024-01-01T00:00:00
     * // 设置为本周开始（通常是星期日或星期一，取决于语言环境）
     * dayjs().startOf('week')
     */
    startOf(unit: OpUnitType): Dayjs

    /**
     * 设置为指定时间单位的结束
     * 返回一个克隆的 Day.js 对象，并将其设置为指定时间单位的结束
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {OpUnitType} unit 时间单位，如 'year'、'month'、'day'、'week' 等
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，已设置为指定时间单位的结束
     *
     * @example
     * // 设置为本月最后一天
     * dayjs().endOf('month') // 设置为 2024-01-31T23:59:59.999
     * // 设置为今天结束
     * dayjs().endOf('day') // 设置为当天的 23:59:59.999
     */
    endOf(unit: OpUnitType): Dayjs
    /**
     * 格式化日期为字符串
     * 根据传入的格式字符串将日期格式化为所需的字符串形式
     * 可以使用方括号 [] 来转义字符（例如 [MM] 会被当作普通文本 "MM" 处理）
     *
     * @param {string} [template] 格式字符串，默认为 ISO8601 格式
     * @returns {string} 格式化后的日期字符串
     *
     * @example
     * // 默认 ISO8601 格式
     * dayjs().format() // '2024-01-01T14:30:00+08:00'
     *
     * // 自定义格式，包含转义字符
     * dayjs('2024-01-25').format('[日期:] YYYY年MM月DD日') // '日期: 2024年01月25日'
     *
     * // 常用日期格式
     * dayjs('2024-01-25').format('DD/MM/YYYY') // '25/01/2024'
     * dayjs('2024-01-25').format('YYYY-MM-DD HH:mm:ss') // '2024-01-25 00:00:00'
     */
    format(template?: string): string
    /**
     * 计算两个日期之间的差值
     * 获取当前日期与指定日期之间的差值，可指定差值单位
     * 默认返回毫秒差值，可以通过指定单位参数获取其他时间单位的差值
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {ConfigType} [date] 要比较的目标日期，默认为当前时间
     * @param {QUnitType | OpUnitType} [unit] 差值的单位，默认为毫秒
     * @param {boolean} [float=false] 是否返回浮点数值
     * @returns {number} 两个日期之间的差值
     *
     * @example
     * // 计算两个日期的毫秒差值
     * const date1 = dayjs('2024-01-25')
     * const date2 = dayjs('2024-01-20')
     * date1.diff(date2) // 返回毫秒差值
     *
     * // 计算月份差值
     * date1.diff('2023-06-05', 'month') // 7
     *
     * // 返回浮点差值
     * date1.diff(date2, 'day', true) // 5.0
     */
    diff(date?: ConfigType, unit?: QUnitType | OpUnitType, float?: boolean): number
    /**
     * 获取 Unix 时间戳（毫秒）
     * 返回自 Unix 纪元（1970年1月1日 UTC）以来的毫秒数
     *
     * 注意：要获取以秒为单位的 Unix 时间戳，请使用 `unix()` 方法
     *
     * @returns {number} 自 Unix 纪元以来的毫秒数
     *
     * @example
     * // 获取时间戳（毫秒）
     * dayjs('2024-01-01').valueOf() // 1704067200000
     * // 使用一元加号操作符也可以获取相同结果
     * +dayjs('2024-01-01') // 1704067200000
     */
    valueOf(): number

    /**
     * 获取 Unix 时间戳（秒）
     * 返回自 Unix 纪元（1970年1月1日 UTC）以来的秒数
     * 该值会被向下取整到最近的秒，不包含毫秒部分
     *
     * @returns {number} 自 Unix 纪元以来的秒数
     *
     * @example
     * dayjs('2024-01-01').unix() // 1704067200
     */
    unix(): number
    /**
     * 获取当前月份的天数
     *
     * @returns {number} 当前月份的天数
     *
     * @example
     * dayjs('2024-01-25').daysInMonth() // 31 (一月有31天)
     * dayjs('2024-02-25').daysInMonth() // 29 (2024年是闰年，二月有29天)
     */
    daysInMonth(): number
    /**
     * 转换为原生 Date 对象
     * 获取从 Day.js 对象解析出来的原生 JavaScript Date 对象的副本
     *
     * @returns {Date} 原生 JavaScript Date 对象
     *
     * @example
     * const jsDate = dayjs('2024-01-25').toDate()
     * console.log(jsDate instanceof Date) // true
     */
    toDate(): Date

    /**
     * 序列化为 ISO 8601 字符串
     * 返回符合 ISO 8601 标准的日期字符串表示
     * 当使用 JSON.stringify() 时会自动调用此方法
     *
     * @returns {string} ISO 8601 格式的日期字符串
     *
     * @example
     * dayjs('2024-01-25').toJSON() // '2024-01-25T00:00:00.000Z'
     */
    toJSON(): string

    /**
     * 格式化为 ISO 8601 字符串
     * 返回符合 ISO 8601 标准的日期字符串表示
     *
     * @returns {string} ISO 8601 格式的日期字符串
     *
     * @example
     * dayjs('2024-01-25').toISOString() // '2024-01-25T00:00:00.000Z'
     */
    toISOString(): string

    /**
     * 转换为字符串表示
     * 返回日期的字符串表示形式
     *
     * @returns {string} 日期的字符串表示
     *
     * @example
     * dayjs('2024-01-25').toString() // 类似 'Wed, 25 Jan 2024 00:00:00 GMT'
     */
    toString(): string
    /**
     * 获取 UTC 偏移量（分钟）
     *
     * @returns {number} UTC 偏移量，以分钟为单位
     *
     * @example
     * // 在中国时区（UTC+8）
     * dayjs().utcOffset() // 480 (8小时 = 480分钟)
     */
    utcOffset(): number
    /**
     * 判断日期是否在另一个日期之前
     * 检查当前 Day.js 对象表示的日期是否在指定日期之前
     * 可以指定比较的粒度单位，默认为毫秒级比较
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {ConfigType} [date] 要比较的目标日期，默认为当前时间
     * @param {OpUnitType} [unit] 比较的粒度单位，默认为毫秒
     * @returns {boolean} 如果当前日期在目标日期之前返回 true，否则返回 false
     *
     * @example
     * // 毫秒级比较
     * dayjs('2024-01-01').isBefore(dayjs('2024-01-02')) // true
     *
     * // 按年比较（忽略月、日等）
     * dayjs('2023-12-31').isBefore('2024-01-01', 'year') // true
     */
    isBefore(date?: ConfigType, unit?: OpUnitType): boolean

    /**
     * 判断日期是否与另一个日期相同
     * 检查当前 Day.js 对象表示的日期是否与指定日期相同
     * 可以指定比较的粒度单位，默认为毫秒级比较
     *
     * @param {ConfigType} [date] 要比较的目标日期，默认为当前时间
     * @param {OpUnitType} [unit] 比较的粒度单位，默认为毫秒
     * @returns {boolean} 如果当前日期与目标日期相同返回 true，否则返回 false
     *
     * @example
     * // 完全相同
     * dayjs('2024-01-01').isSame(dayjs('2024-01-01')) // true
     *
     * // 按年比较（忽略月、日等）
     * dayjs('2024-06-01').isSame('2024-01-01', 'year') // true
     */
    isSame(date?: ConfigType, unit?: OpUnitType): boolean

    /**
     * 判断日期是否在另一个日期之后
     * 检查当前 Day.js 对象表示的日期是否在指定日期之后
     * 可以指定比较的粒度单位，默认为毫秒级比较
     * 单位不区分大小写，支持复数和简写形式
     *
     * @param {ConfigType} [date] 要比较的目标日期，默认为当前时间
     * @param {OpUnitType} [unit] 比较的粒度单位，默认为毫秒
     * @returns {boolean} 如果当前日期在目标日期之后返回 true，否则返回 false
     *
     * @example
     * // 毫秒级比较
     * dayjs('2024-01-02').isAfter(dayjs('2024-01-01')) // true
     *
     * // 按年比较（忽略月、日等）
     * dayjs('2024-01-01').isAfter('2023-12-31', 'year') // true
     */
    isAfter(date?: ConfigType, unit?: OpUnitType): boolean

    /**
     * 获取当前使用的语言环境
     *
     * @returns {string} 当前语言环境代码
     *
     * @example
     * dayjs().locale() // 默认为 'en'
     */
    locale(): string

    /**
     * 设置语言环境
     * 更改当前 Day.js 对象的语言环境设置
     *
     * @param {string | ILocale} preset 语言环境代码或语言环境对象
     * @param {Partial<ILocale>} [object] 可选的语言环境配置对象
     * @returns {Dayjs} 返回一个新的 Dayjs 实例，语言环境已更新
     *
     * @example
     * // 设置为中文环境
     * dayjs().locale('zh-cn')
     */
    locale(preset: string | ILocale, object?: Partial<ILocale>): Dayjs
  }

  /**
   * 插件函数类型定义
   * 插件是 dayjs 功能扩展的主要方式
   *
   * @template T 插件选项类型
   * @param {T} option 插件选项
   * @param {typeof Dayjs} c Dayjs 类引用
   * @param {typeof dayjs} d dayjs 函数引用
   */
  export type PluginFunc<T = unknown> = (option: T, c: typeof Dayjs, d: typeof dayjs) => void

  /**
   * 扩展 dayjs 功能
   * 用于加载插件，增强 dayjs 的功能
   *
   * @template T 插件选项类型
   * @param {PluginFunc<T>} plugin 插件函数
   * @param {T} [option] 可选的插件选项
   * @returns {Dayjs} 返回 dayjs 函数，支持链式调用
   *
   * @example
   * // 加载相对时间插件
   * dayjs.extend(relativeTime)
   *
   * // 加载带选项的插件
   * dayjs.extend(customParseFormat, { customParseFormat: true })
   */
  export function extend<T = unknown>(plugin: PluginFunc<T>, option?: T): Dayjs

  /**
   * 全局设置或获取语言环境
   *
   * @param {string | ILocale} [preset] 语言环境代码或语言环境对象
   * @param {Partial<ILocale>} [object] 可选的语言环境配置对象
   * @param {boolean} [isLocal] 是否为局部设置
   * @returns {string} 当前语言环境代码
   *
   * @example
   * // 获取当前全局语言环境
   * dayjs.locale() // 默认为 'en'
   *
   * // 设置全局语言环境为中文
   * dayjs.locale('zh-cn')
   */
  export function locale(preset?: string | ILocale, object?: Partial<ILocale>, isLocal?: boolean): string

  /**
   * 检查值是否为 Dayjs 对象
   * 类型保护函数，用于在 TypeScript 中进行类型判断
   *
   * @param {any} d 要检查的值
   * @returns {d is Dayjs} 如果值是 Dayjs 对象返回 true，否则返回 false
   *
   * @example
   * const date = dayjs()
   * const obj = {}
   * dayjs.isDayjs(date) // true
   * dayjs.isDayjs(obj) // false
   */
  export function isDayjs(d: any): d is Dayjs

  /**
   * 从 Unix 时间戳创建 Dayjs 对象
   *
   * @param {number} t Unix 时间戳（秒）
   * @returns {Dayjs} 新的 Dayjs 实例
   *
   * @example
   * dayjs.unix(1704067200) // 创建 2024-01-01 的日期对象
   */
  export function unix(t: number): Dayjs

  /**
   * 语言环境存储对象
   * 内部用于存储所有已加载的语言环境定义
   */
  const Ls: { [key: string]: ILocale }
}
