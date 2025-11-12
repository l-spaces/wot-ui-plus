<template>
  <view>
    <wd-toast selector="wd-month" />
    <view class="month">
      <view class="wd-month">
        <!-- 日历列表标题 -->
        <view class="wd-month__title" v-if="showTitle">{{ monthTitle(date) }}</view>
        <view class="wd-month__days">
          <view v-if="showMark" class="wd-month__back">
            <text class="wd-month__back__text">{{ monthBack(date) }}</text>
          </view>
          <view
            v-for="(item, index) in days"
            :key="index"
            :class="`wd-month__day ${item.disabled ? 'is-disabled' : ''} ${item.isLastRow ? 'is-last-row' : ''} ${
              item.type ? dayTypeClass(item.type) : ''
            }`"
            :style="index === 0 ? firstDayStyle : ''"
            @click="handleDateClick(index)"
          >
            <view class="wd-month__day-container">
              <!-- 日期顶部信息 -->
              <view class="wd-month__day-top" :style="{ color: item.topColor }">{{ item.topInfo }}</view>
              <!-- 日期文本 -->
              <view class="wd-month__day-text">
                {{ item.text }}
              </view>
              <!-- 日期底部信息 -->
              <view class="wd-month__day-bottom" :style="{ color: item.bottomColor }">{{ item.bottomInfo }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdToast from '../../wd-toast/wd-toast.vue'
import { computed, ref, watch, type CSSProperties } from 'vue'
import dayjs from 'dayjs'
import Calendar from '../../common/calendar.js'

import {
  compareDate,
  getDateByDefaultTime,
  getDayByOffset,
  getDayOffset,
  getItemClass,
  sortTimeStampsAsc,
  getNextDay,
  getPrevDay,
  getWeekRange
} from '../utils'
import { useToast } from '../../wd-toast'
import { deepClone, isArray, isFunction, objToStyle } from '../../common/util'
import { useTranslate } from '../../composables/useTranslate'
import type { CalendarDayItem, CalendarDayType } from '../types'
import { monthProps } from './types'

const props = defineProps(monthProps)
const emit = defineEmits(['change'])

const { translate } = useTranslate('calendar-view')

const days = ref<Array<CalendarDayItem>>([])

const toast = useToast('wd-month')

/**
 * 计算当月第一天在日历网格中的偏移量
 * 用于确定日历第一行需要从哪一列开始显示
 * @returns {number} 返回偏移的列数（0-6），表示距离第一列的偏移量
 */
const offset = computed(() => {
  // 处理firstDayOfWeek超过7的情况
  const firstDayOfWeek = props.firstDayOfWeek >= 7 ? props.firstDayOfWeek % 7 : props.firstDayOfWeek
  // 计算当月第一天相对于设定的每周第一天的偏移量
  const offset = (7 + dayjs(props.date).day() - firstDayOfWeek) % 7
  return offset
})

/**
 * 根据日期类型生成对应的CSS类名
 * @returns {Function} 返回一个函数，该函数接收日期类型，返回对应的CSS类名
 */
const dayTypeClass = computed(() => {
  return (monthType: CalendarDayType) => {
    // 调用工具函数获取对应的CSS类名
    return getItemClass(monthType, props.value, props.type)
  }
})

/**
 * 格式化月份标题
 * @returns {Function} 返回一个函数，该函数接收日期时间戳，返回格式化后的月份标题（YYYY-MM格式）
 */
const monthTitle = computed(() => {
  return (date: number) => {
    // 格式化日期为'年-月'格式
    return dayjs(date).format('YYYY-MM')
  }
})

/**
 * 格式化显示月份（仅显示月份）
 * @returns {Function} 返回一个函数，该函数接收日期时间戳，返回格式化后的月份（MM格式）
 */
const monthBack = computed(() => {
  return (date: number) => {
    // 仅格式化日期的月份部分
    return dayjs(date).format('MM')
  }
})

/**
 * 计算日历第一行第一个日期的样式
 * 主要用于设置margin-left，实现正确的偏移布局
 * @returns {string} 返回格式化后的样式字符串
 */
const firstDayStyle = computed(() => {
  const dayStyle: CSSProperties = {}
  // 根据偏移量计算margin-left百分比，确保第一行正确对齐
  dayStyle.marginLeft = `${(100 / 7) * offset.value}%`
  // 调用工具函数将样式对象转换为内联样式字符串
  return objToStyle(dayStyle)
})

/**
 * 判断指定日期是否在月历的最后一行
 * @param {number} date - 要判断的日期时间戳
 * @returns {boolean} 如果是最后一行则返回true，否则返回false
 * @description
 * 该函数通过计算当前日期在月历中的行号，并与月历总页数比较，判断日期是否在最后一行
 * 用于样式渲染，例如为最后一行的日期添加特殊样式
 */
const isLastRow = (date: number) => {
  // 获取当前日期是当月的第几天（1-31）
  const currentDay = dayjs(date).date()
  // 获取当月总天数
  const daysInMonth = dayjs(date).daysInMonth()
  // 计算月历中总共需要显示的格子数（包括偏移量+当月天数）
  const totalDaysShown = offset.value + daysInMonth
  // 计算月历总行数（每行7天，向上取整）
  const totalRows = Math.ceil(totalDaysShown / 7)
  // 计算当前日期所在的行号（从1开始计数），并与总行数比较
  return Math.ceil((offset.value + currentDay) / 7) === totalRows
}
watch(
  [() => props.type, () => props.date, () => props.value, () => props.minDate, () => props.maxDate, () => props.formatter],
  () => {
    setDays()
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 生成月历的日期数据列表
 * @description
 * 该函数是日历组件的核心函数之一，负责生成整个月历视图需要显示的日期数据
 * 主要处理流程：
 * 1. 获取当前显示月份的年份和月份
 * 2. 计算当月的总天数
 * 3. 处理周选择模式下的值转换
 * 4. 遍历当月的每一天，生成日期对象
 * 5. 确定每个日期的类型（当前日期、选中日期等）
 * 6. 如果启用农历显示，添加农历日期信息
 * 7. 将生成的日期列表赋值给响应式变量days
 */
function setDays() {
  // 创建日期列表数组
  const dayList: Array<CalendarDayItem> = []
  // 获取当前显示月份的年份
  const year = dayjs(props.date).year()
  // 获取当前显示月份（0-11）
  const month = dayjs(props.date).month()
  // 获取当月的总天数
  const totalDay = dayjs(props.date).daysInMonth()
  // 处理选中值，周选择模式需要特殊处理
  let value = props.value
  if ((props.type === 'week' || props.type === 'weekrange') && value) {
    value = getWeekValue()
  }
  // 遍历当月的每一天
  for (let day = 1; day <= totalDay; day++) {
    // 生成日期时间戳
    const date = dayjs(new Date(year, month, day)).valueOf()
    // 获取日期类型（如选中、当前日期等）
    let type: CalendarDayType = getDayType(date, value as number | number[] | null)
    // 如果不是特殊类型且是今天，则标记为当前日期
    if (!type && compareDate(date, Date.now()) === 0) {
      type = 'current'
    }
    // 格式化日期对象
    const dayObj = getFormatterDate(date, day, type)
    // 如果启用农历显示且没有自定义底部信息，则添加农历日期
    if (!dayObj.bottomInfo && props.showLunar) {
      const lunar = getLunar(year, month + 1, day)
      dayObj.bottomInfo = lunar
    }
    // 将日期对象添加到列表中
    dayList.push(dayObj)
  }
  // 更新响应式日期列表
  days.value = dayList
}
/**
 * 根据选择模式调用相应的日期类型判断函数
 * @param {number} date - 要判断类型的日期时间戳
 * @param {number | number[] | null} value - 当前选中的值
 * @returns {CalendarDayType} 返回日期类型，如'disabled'、'selected'、'start'、'end'等
 * @description
 * 该函数作为调度器，根据当前的选择模式调用不同的类型判断函数
 * 支持的选择模式包括：
 * - date/datetime: 单选日期/时间模式
 * - dates: 多选日期模式
 * - daterange/datetimerange: 日期范围/时间范围模式
 * - week/weekrange: 周选择/周范围模式
 * 默认情况下使用单选日期模式的判断逻辑
 */
function getDayType(date: number, value: number | number[] | null): CalendarDayType {
  switch (props.type) {
    case 'date':
    case 'datetime':
      return getDateType(date)
    case 'dates':
      return getDatesType(date)
    case 'daterange':
    case 'datetimerange':
      return getDatetimeType(date, value)
    case 'week':
      return getWeektimeType(date, value)
    case 'weekrange':
      return getWeektimeType(date, value)
    default:
      return getDateType(date)
  }
}
/**
 * 判断单选日期/时间模式下的日期类型
 * @param {number} date - 要判断的日期时间戳
 * @returns {CalendarDayType} 如果日期被选中返回'selected'，否则返回空字符串
 * @description
 * 该函数用于判断在单选日期(date)或单选时间(datetime)模式下，指定日期是否被选中
 * 实现逻辑是通过比较传入日期与组件当前选中值的日期部分是否相同
 */
function getDateType(date: number): CalendarDayType {
  // 如果组件有选中值，且传入日期与选中值的日期部分相同，则返回'selected'
  if (props.value && compareDate(date, props.value as number) === 0) {
    return 'selected'
  }
  // 否则返回空字符串（普通日期）
  return ''
}
/**
 * 获取指定日期的农历信息
 * @param {number} year - 年份
 * @param {number} month - 月份（1-12）
 * @param {number} day - 日（1-31）
 * @returns {string} 返回农历信息，可能是节日名称或农历日期
 * @description
 * 该函数按照以下优先级返回日期的农历信息：
 * 1. 如果是阳历节日，返回阳历节日名称
 * 2. 如果是农历节日，返回农历节日名称
 * 3. 如果是农历月初（初一），返回农历月份名称
 * 4. 其他情况返回农历日名称
 */
function getLunar(year: string | number, month: string | number, day: string | number) {
  const lunar = Calendar.solar2lunar(year, month, day)
  // 优先展示阳历节日，其次农历节日，再月初，最后普通农历日
  return lunar.festival || lunar.lunarFestival || (lunar.lDay === 1 ? lunar.IMonthCn : lunar.IDayCn)
}
/**
 * 判断多选日期模式下的日期类型
 * @param {number} date - 要判断的日期时间戳
 * @returns {CalendarDayType} 根据日期在选中序列中的位置返回不同类型：
 * - 'multiple-middle': 连续选中的中间日期
 * - 'end': 连续选中的结束日期
 * - 'start': 连续选中的开始日期
 * - 'multiple-selected': 单个选中的日期
 * - 空字符串: 未选中的日期
 * @description
 * 该函数用于判断在多选日期(dates)模式下，指定日期的具体类型
 * 通过检查前后日期的选中状态，识别连续选中区域的开始、中间和结束位置
 * 这使得UI可以为不同位置的选中日期应用不同的样式
 */
function getDatesType(date: number): CalendarDayType {
  const { value } = props
  let type: CalendarDayType = ''

  if (!isArray(value)) return type
  const isSelected = (day: number) => {
    return value.some((item) => compareDate(day, item) === 0)
  }

  if (isSelected(date)) {
    const prevDay = getPrevDay(date)
    const nextDay = getNextDay(date)
    const prevSelected = isSelected(prevDay)
    const nextSelected = isSelected(nextDay)
    if (prevSelected && nextSelected) {
      type = 'multiple-middle'
    } else if (prevSelected) {
      type = 'end'
    } else if (nextSelected) {
      type = 'start'
    } else {
      type = 'multiple-selected'
    }
  }

  return type
}
/**
 * 判断日期范围/时间范围模式下的日期类型
 * @param {number} date - 要判断的日期时间戳
 * @param {number | number[] | null} value - 当前选中的值，可能是单个日期或日期范围数组
 * @returns {CalendarDayType} 根据日期在范围内的位置返回不同类型：
 * - 'same': 允许同一天且开始和结束日期相同时的日期
 * - 'start': 范围的开始日期
 * - 'end': 范围的结束日期
 * - 'middle': 范围中间的日期
 * - 空字符串: 不在范围内的日期
 * @description
 * 该函数用于判断在日期范围(daterange)或时间范围(datetimerange)模式下，指定日期的类型
 * 通过比较日期与范围的开始和结束时间，确定日期在范围内的位置
 * 特别处理了allowSameDay属性为true时，开始和结束日期相同的情况
 */
function getDatetimeType(date: number, value: number | number[] | null) {
  const [startDate, endDate] = isArray(value) ? sortTimeStampsAsc(value) : []
  if (startDate && compareDate(date, startDate) === 0) {
    if (props.allowSameDay && endDate && compareDate(startDate, endDate) === 0) {
      return 'same'
    }
    return 'start'
  } else if (endDate && compareDate(date, endDate) === 0) {
    return 'end'
  } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
    return 'middle'
  } else {
    return ''
  }
}
/**
 * 判断周选择/周范围模式下的日期类型
 * @param {number} date - 要判断的日期时间戳
 * @param {number | number[] | null} value - 当前选中的值，可能是单个周的开始日期或周范围数组
 * @returns {CalendarDayType} 根据日期在周范围内的位置返回不同类型：
 * - 'start': 周范围的开始日期
 * - 'end': 周范围的结束日期
 * - 'middle': 周范围内的中间日期
 * - 空字符串: 不在周范围内的日期
 * @description
 * 该函数用于判断在周选择(week)或周范围(weekrange)模式下，指定日期的类型
 * 通过比较日期与选中周的开始和结束日期，确定日期在周范围内的位置
 * 支持单选周和周范围两种模式
 */
function getWeektimeType(date: number, value: number | number[] | null) {
  // 从选中值中解构获取开始和结束日期
  const [startDate, endDate] = isArray(value) ? value : []

  // 判断日期是否为范围的开始日期
  if (startDate && compareDate(date, startDate) === 0) {
    return 'start'
  }
  // 判断日期是否为范围的结束日期
  else if (endDate && compareDate(date, endDate) === 0) {
    return 'end'
  }
  // 判断日期是否在范围中间
  else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
    return 'middle'
  }
  // 不在范围内的日期返回空字符串
  else {
    return ''
  }
}
/**
 * 获取周选择或周范围选择模式下的值
 * @returns {Array<number>|Array} 返回周范围的开始和结束时间戳数组
 * @description
 * 该函数用于处理周选择相关模式下的值获取：
 * 1. 对于单选周模式(week)：返回选中周的开始和结束时间戳
 * 2. 对于周范围模式(weekrange)：
 *    - 如果有开始和结束日期：返回开始周的开始时间戳和结束周的结束时间戳
 *    - 如果只有开始日期：返回开始周的开始和结束时间戳
 *    - 如果没有选中日期：返回空数组
 */
function getWeekValue() {
  // 处理单选周模式
  if (props.type === 'week') {
    return getWeekRange(props.value as number, props.firstDayOfWeek)
  } else {
    // 检查是否为数组类型
    if (!isArray(props.value)) {
      console.error('weekrange 模式下,value 必须是数组类型')
      return []
    }
    // 处理周范围模式，解构获取开始和结束日期
    const [startDate, endDate] = sortTimeStampsAsc(props.value)

    // 如果有开始日期
    if (startDate) {
      // 获取开始日期所在周的范围
      const firstWeekRange = getWeekRange(startDate, props.firstDayOfWeek)

      // 如果有结束日期
      if (endDate) {
        // 获取结束日期所在周的范围
        const endWeekRange = getWeekRange(endDate, props.firstDayOfWeek)
        // 返回开始周的开始和结束周的结束时间戳
        return [firstWeekRange[0], endWeekRange[1]]
      } else {
        // 只有开始日期时，返回开始周的完整范围
        return firstWeekRange
      }
    }

    // 没有选中日期时返回空数组
    return []
  }
}
/**
 * 处理日期点击事件
 * @param {number} index - 点击的日期在days数组中的索引
 * @description
 * 该函数是日期点击事件的处理入口，执行以下操作：
 * 1. 获取点击的日期对象
 * 2. 根据不同的选择模式调用相应的处理函数
 * 支持的选择模式包括：
 * - date/datetime: 单选日期/时间模式
 * - dates: 多选日期模式
 * - daterange/datetimerange: 日期范围/时间范围模式
 * - week/weekrange: 周选择/周范围模式
 */
function handleDateClick(index: number) {
  // 获取点击的日期对象
  const dateInfo = days.value[index]
  // 根据选择模式调用对应的处理函数
  switch (props.type) {
    case 'date':
    case 'datetime':
      handleDateChange(dateInfo)
      break
    case 'dates':
      handleDatesChange(dateInfo)
      break
    case 'daterange':
    case 'datetimerange':
      handleDateRangeChange(dateInfo)
      break
    case 'week':
      handleWeekChange(dateInfo)
      break
    case 'weekrange':
      handleWeekRangeChange(dateInfo)
      break
    default:
      handleDateChange(dateInfo)
  }
}
/**
 * 处理日期时间戳，应用默认时间并进行范围限制
 * @param {number} date - 原始日期时间戳
 * @param {boolean} [isEnd=false] - 是否为范围的结束日期
 * @returns {number} 处理后的日期时间戳
 * @description
 * 该函数用于处理日期时间戳，执行以下操作：
 * 1. 如果设置了默认时间(defaultTime)，则根据isEnd参数应用相应的默认时间
 *    - isEnd为true时：应用defaultTime数组的第二个元素（结束时间）
 *    - isEnd为false时：应用defaultTime数组的第一个元素（开始时间）
 * 2. 检查处理后的日期是否小于最小日期(minDate)，如果是则返回最小日期
 * 3. 检查处理后的日期是否大于最大日期(maxDate)，如果是则返回最大日期
 * 4. 否则返回处理后的日期时间戳
 */
function getDate(date: number, isEnd: boolean = false) {
  // 如果设置了默认时间，则根据isEnd参数应用相应的默认时间
  date = props.defaultTime && props.defaultTime.length > 0 ? getDateByDefaultTime(date, isEnd ? props.defaultTime[1] : props.defaultTime[0]) : date

  // 检查日期是否小于最小日期，如果是则返回最小日期
  if (date < props.minDate) return props.minDate

  // 检查日期是否大于最大日期，如果是则返回最大日期
  if (date > props.maxDate) return props.maxDate

  // 返回处理后的日期时间戳
  return date
}

/**
 * 处理单选日期/时间模式下的日期选择
 * @param {CalendarDayItem} date - 要选择的日期对象
 * @description
 * 该函数用于处理在单选日期(date)或单选时间(datetime)模式下的日期选择逻辑：
 * 1. 检查日期是否被禁用，如果禁用则不执行后续操作
 * 2. 检查日期是否已被选中，如果未选中则触发change事件
 * 3. 触发change事件时，会对日期进行范围限制和默认时间处理
 */
function handleDateChange(date: CalendarDayItem) {
  // 如果日期被禁用，则不执行任何操作
  if (date.disabled) return

  // 如果日期未被选中，则触发change事件
  if (date.type !== 'selected') {
    emit('change', {
      // 处理日期（应用默认时间和范围限制）
      value: getDate(date.date),
      type: 'start'
    })
  }
}
/**
 * 处理多选日期模式下的日期选择
 * @param {CalendarDayItem} date - 要选择/取消选择的日期对象
 * @returns {void}
 * @description
 * 该函数用于处理在多选日期(dates)模式下的日期选择逻辑：
 * 1. 检查日期是否被禁用，如果禁用则不执行后续操作
 * 2. 获取当前已选中的日期数组并创建深拷贝，避免直接修改props
 * 3. 查找当前点击的日期是否已在选中列表中
 * 4. 使用三元运算符处理选择逻辑：
 *    - 如果不在选中列表中：添加日期到数组（应用默认时间和范围限制）
 *    - 如果已在选中列表中：使用filter方法移除该日期
 * 5. 触发change事件，返回更新后的选中日期数组
 */
function handleDatesChange(date: CalendarDayItem) {
  // 如果日期被禁用，则不执行任何操作
  if (date.disabled) return
  // 获取当前已选中的日期数组并创建深拷贝
  const currentValue = deepClone(isArray(props.value) ? props.value : [])
  // 查找当前点击的日期是否已在选中列表中
  const dateIndex = currentValue.findIndex((item) => item && compareDate(item, date.date) === 0)
  // 如果不在选中列表中则添加，否则移除
  const value = dateIndex === -1 ? [...currentValue, getDate(date.date)] : currentValue.filter((_, index) => index !== dateIndex)
  // 触发change事件，返回更新后的选中日期数组
  emit('change', { value: sortTimeStampsAsc(value) })
}

/**
 * 处理日期范围/时间范围模式下的日期选择
 * @param {CalendarDayItem} date - 要选择的日期对象
 * @returns {void}
 * @description
 * 该函数用于处理在日期范围(daterange)或时间范围(datetimerange)模式下的范围选择逻辑：
 * 1. 检查日期是否被禁用，如果禁用则不执行后续操作
 * 2. 初始化返回值和类型变量
 * 3. 获取当前已选中的日期范围并创建深拷贝
 * 4. 比较当前点击日期与开始日期的关系
 * 5. 处理禁止选择同一天的逻辑（如果allowSameDay为false）
 * 6. 根据当前选择状态和点击的日期位置执行不同的逻辑：
 *    - 已选择开始日期且未选择结束日期，且点击日期在开始日期之后：
 *      * 检查是否超过最大范围限制(maxRange)，如果超过则自动调整到最大范围并显示提示
 *      * 否则将点击日期设为结束日期
 *    - 时间范围模式且已完成范围选择：
 *      * 点击开始日期：设置类型为'start'
 *      * 点击结束日期：设置类型为'end'
 *      * 点击其他日期：重置选择，将点击日期设为新的开始日期
 *    - 其他情况：将点击日期设为新的开始日期
 * 7. 触发change事件，返回更新后的日期范围和选择类型
 */
function handleDateRangeChange(date: CalendarDayItem) {
  // 如果日期被禁用，则不执行任何操作
  if (date.disabled) return

  // 初始化返回值和类型变量
  let value: (number | null)[] = []
  let type: CalendarDayType = ''
  // 获取当前已选中的日期范围并创建深拷贝
  const [startDate, endDate] = deepClone(isArray(props.value) ? props.value : [])
  // 比较当前点击日期与开始日期的关系
  const compare = compareDate(date.date, startDate || 0)

  // 禁止选择同个日期（如果未开启allowSameDay选项）
  if (!props.allowSameDay && compare === 0 && (props.type === 'daterange' || props.type === 'datetimerange') && !endDate) {
    return
  }

  // 已选择开始日期且未选择结束日期，且点击日期在开始日期之后
  if (startDate && !endDate && compare > -1) {
    // 检查是否超过最大范围限制
    if (props.maxRange && getDayOffset(date.date, startDate) > props.maxRange) {
      // 如果超过最大范围，自动调整到最大范围的最后一天
      const maxEndDate = getDayByOffset(startDate, props.maxRange - 1)
      value = [startDate, getDate(maxEndDate, true)]
      // 显示超出范围提示
      toast.show({
        msg: props.rangePrompt || translate('rangePrompt', props.maxRange)
      })
    } else {
      // 未超过最大范围，将点击日期设为结束日期
      value = [startDate, getDate(date.date, true)]
    }
  }
  // 时间范围模式且已完成范围选择
  else if (props.type === 'datetimerange' && startDate && endDate) {
    // 重新点击开始日期
    if (compare === 0) {
      type = 'start'
      value = props.value as number[]
    }
    // 重新点击结束日期
    else if (compareDate(date.date, endDate) === 0) {
      type = 'end'
      value = props.value as number[]
    }
    // 点击其他日期，重置选择
    else {
      value = [getDate(date.date), null]
    }
  }
  // 其他情况，将点击日期设为新的开始日期
  else {
    value = [getDate(date.date), null]
  }

  // 触发change事件，返回更新后的日期范围和选择类型
  emit('change', {
    value: sortTimeStampsAsc(value),
    type: type || (value[1] ? 'end' : 'start')
  })
}
/**
 * 处理周选择模式下的日期选择
 * @param {CalendarDayItem} date - 点击的日期对象
 * @returns {void}
 * @description
 * 该函数用于处理在周选择(week)模式下的选择逻辑：
 * 1. 获取点击日期所在周的第一天（根据firstDayOfWeek设置）
 * 2. 检查周的第一天是否被禁用，如果禁用则不可选中
 * 3. 触发change事件，返回周的第一天时间戳（加一天，可能是为了显示目的）
 */
function handleWeekChange(date: CalendarDayItem) {
  // 获取点击日期所在周的第一天（根据firstDayOfWeek设置）
  const [weekStart] = getWeekRange(date.date, props.firstDayOfWeek)

  // 周的第一天如果是禁用状态，则不可选中
  if (getFormatterDate(weekStart, dayjs(weekStart).date()).disabled) return

  // 触发change事件，返回周的第一天时间戳（加一天）
  emit('change', {
    value: getDate(weekStart) + 24 * 60 * 60 * 1000
  })
}
/**
 * 处理周范围选择模式下的日期选择
 * @param {CalendarDayItem} date - 点击的日期对象
 * @returns {void}
 * @description
 * 该函数用于处理在周范围(weekrange)模式下的范围选择逻辑：
 * 1. 获取点击日期所在周的第一天（根据firstDayOfWeek设置）
 * 2. 检查周的第一天是否被禁用，如果禁用则不可选中
 * 3. 初始化返回值数组
 * 4. 获取当前已选中的日期范围并创建深拷贝
 * 5. 获取开始日期所在周的第一天（如果存在）
 * 6. 比较点击周的第一天与开始周的第一天
 * 7. 根据当前选择状态和周的位置执行不同的逻辑：
 *    - 已选择开始周且未选择结束周，且点击周在开始周之后或相同：
 *      * 检查是否允许选择相同周（allowSameDay），如果不允许且点击的是相同周，则不执行操作
 *      * 设置返回值为[开始周第一天加一天, 点击周第一天加一天]
 *    - 其他情况：将点击周设为新的开始周，清空结束周
 * 8. 触发change事件，返回更新后的周范围和选择类型（'end'或'start'）
 */
function handleWeekRangeChange(date: CalendarDayItem) {
  // 获取点击日期所在周的第一天（根据firstDayOfWeek设置）
  const [weekStartDate] = getWeekRange(date.date, props.firstDayOfWeek)

  // 周的第一天如果是禁用状态，则不可选中
  if (getFormatterDate(weekStartDate, dayjs(weekStartDate).date()).disabled) return

  // 初始化返回值数组
  let value: (number | null)[] = []
  // 获取当前已选中的日期范围并创建深拷贝
  const [startDate, endDate] = deepClone(isArray(props.value) ? props.value : [])
  // 获取开始日期所在周的第一天（如果存在）
  const [startWeekStartDate] = startDate ? getWeekRange(startDate, props.firstDayOfWeek) : []
  // 比较点击周的第一天与开始周的第一天
  const compare = compareDate(weekStartDate, startWeekStartDate)

  // 已选择开始周且未选择结束周，且点击周在开始周之后或相同
  if (startDate && !endDate && compare > -1) {
    // 检查是否允许选择相同周（allowSameDay），如果不允许且点击的是相同周，则不执行操作
    if (!props.allowSameDay && compare === 0) return

    // 设置返回值为[开始周第一天加一天, 点击周第一天加一天]
    value = [getDate(startWeekStartDate) + 24 * 60 * 60 * 1000, getDate(weekStartDate) + 24 * 60 * 60 * 1000]
  } else {
    // 其他情况：将点击周设为新的开始周，清空结束周
    value = [getDate(weekStartDate) + 24 * 60 * 60 * 1000, null]
  }

  // 触发change事件，返回更新后的周范围
  emit('change', {
    value
  })
}
/**
 * 格式化日期对象，生成日历中的日期项
 * @param {number} date - 日期时间戳
 * @param {string|number} day - 日期文本（如1-31）
 * @param {CalendarDayType} [type] - 日期类型（可选）
 * @returns {CalendarDayItem} 格式化后的日期对象
 * @description
 * 该函数用于生成日历中显示的日期对象，包含以下步骤：
 * 1. 创建基础日期对象，包含日期时间戳、文本、默认颜色等信息
 * 2. 判断日期是否禁用（通过与最小日期和最大日期比较）
 * 3. 判断日期是否在最后一行（用于样式处理）
 * 4. 如果提供了自定义formatter函数，则应用该函数对日期对象进行自定义处理
 * 5. 如果formatter不是函数类型，则输出错误提示
 * 6. 返回格式化后的日期对象
 */
function getFormatterDate(date: number, day: string | number, type?: CalendarDayType) {
  // 创建基础日期对象
  let dayObj: CalendarDayItem = {
    date: date, // 日期时间戳
    text: day, // 日期文本（如1-31）
    topInfo: '', // 顶部信息（如农历）
    topColor: '#4d80f0', // 顶部信息颜色
    bottomInfo: '', // 底部信息
    bottomColor: '', // 底部信息颜色
    type, // 日期类型
    // 判断日期是否禁用（早于最小日期或晚于最大日期）
    disabled: compareDate(date, props.minDate) === -1 || compareDate(date, props.maxDate) === 1,
    // 判断日期是否在最后一行
    isLastRow: isLastRow(date)
  }
  // 如果提供了自定义formatter函数
  if (props.formatter) {
    // 检查formatter是否为函数类型
    if (isFunction(props.formatter)) {
      // 应用自定义formatter函数处理日期对象
      dayObj = props.formatter(dayObj)
    } else {
      // 如果formatter不是函数类型，输出错误提示
      console.error('(wd-calendar-view): the `formatter` prop of wd-calendar-view should be a function')
    }
  }
  // 返回格式化后的日期对象
  return dayObj
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
