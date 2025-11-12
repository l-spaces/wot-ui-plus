// Type definitions for calendar.js (农历/公历互转)
// Project: https://github.com/jjonline/calendar.js

// 定义接口类型
interface FestivalItem {
  title: string
}

export interface SolarLunarResult {
  date: string // 公历日期（格式：y-m-d）
  lunarDate: string // 农历日期（格式：y-m-d）
  festival: string | null // 阳历节日
  lunarFestival: string | null // 农历节日
  lYear: number // 农历年
  lMonth: number // 农历月
  lDay: number // 农历日
  Animal: string // 生肖
  IMonthCn: string // 农历月中文名称（含闰月标识）
  IDayCn: string // 农历日中文名称
  cYear: number // 公历年
  cMonth: number // 公历月
  cDay: number // 公历日
  gzYear: string // 干支年
  gzMonth: string // 干支月
  gzDay: string // 干支日
  isToday: boolean // 是否为当天
  isLeap: boolean // 是否为闰月
  nWeek: number // 星期几（数字：1-7，1=周一）
  ncWeek: string // 星期几中文名称
  isTerm: boolean // 是否为节气
  Term: string | null // 节气名称
  astro: string // 星座
}

interface Calendar {
  // 农历数据表（1900-2100）
  lunarInfo: number[]
  // 公历每月天数（平年）
  solarMonth: number[]
  // 天干数组
  Gan: string[]
  // 地支数组
  Zhi: string[]
  // 生肖数组
  Animals: string[]
  // 阳历节日
  festival: Record<string, FestivalItem>
  // 农历节日
  lFestival: Record<string, FestivalItem>
  // 节气名称数组
  solarTerm: string[]
  // 节气日期信息
  sTermInfo: string[]
  // 中文数字辅助数组1
  nStr1: string[]
  // 中文数字辅助数组2
  nStr2: string[]
  // 中文数字辅助数组3
  nStr3: string[]
  // 获取阳历节日
  getFestival(): Record<string, FestivalItem>
  // 获取农历节日
  getLunarFestival(): Record<string, FestivalItem>
  // 设置阳历节日
  setFestival(param?: Record<string, FestivalItem>): void
  // 设置农历节日
  setLunarFestival(param?: Record<string, FestivalItem>): void
  // 返回农历年总天数
  lYearDays(y: number): number
  // 返回闰月月份（无闰月返回0）
  leapMonth(y: number): number
  // 返回闰月天数
  leapDays(y: number): number
  // 返回农历月天数
  monthDays(y: number, m: number): number
  // 返回公历月天数
  solarDays(y: number, m: number): number
  // 农历年转干支年
  toGanZhiYear(lYear: number): string
  // 根据月日获取星座
  toAstro(cMonth: number, cDay: number): string
  // 偏移转干支
  toGanZhi(offset: number): string
  // 获取节气日期
  getTerm(y: number, n: number): number
  // 数字月转中文月
  toChinaMonth(m: number): string | -1
  // 数字日转中文日
  toChinaDay(d: number): string
  // 获取生肖
  getAnimal(y: number): string
  // 公历转农历
  solar2lunar(yPara?: number | string, mPara?: number | string, dPara?: number | string): SolarLunarResult
  // 农历转公历
  lunar2solar(y: number | string, m: number | string, d: number | string, isLeapMonth?: boolean): SolarLunarResult
}

declare const calendar: Calendar
export default calendar
