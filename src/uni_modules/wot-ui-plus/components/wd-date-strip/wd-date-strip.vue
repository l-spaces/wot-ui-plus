<template>
  <view class="wd-date-strip" :style="[containerStyle]">
    <!-- 周模式 - swiper切换 -->
    <template v-if="mode === 'week'">
      <swiper class="wd-date-strip__swiper" :current="currentIndex" @change="onSwiperChange">
        <swiper-item v-for="(week, index) in weekList" :key="index">
          <view class="wd-date-strip__wrapper">
            <view v-for="(item, idx) in week" :key="idx" class="wd-date-strip__item">
              <view class="wd-date-strip__item-content" :style="[getItemStyle('week', item)]" @click="selectDate(item)">
                <view class="wd-date-strip__weekday">
                  {{ item.weekday }}
                </view>
                <view class="wd-date-strip__date" :style="[getItemStyle('date', item)]">
                  <text class="wd-date-strip__date-text">{{ item.date }}</text>
                  <text v-if="showLunar && item.bottomInfo" class="wd-date-strip__lunar" :style="[getItemStyle('lunar', item)]">
                    {{ item.bottomInfo }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </template>

    <!-- 平铺模式 - scroll-view -->
    <template v-else>
      <scroll-view class="wd-date-strip__scroll" scroll-x :scroll-into-view="scrollIntoView">
        <view class="wd-date-strip__scroll-wrapper">
          <view v-for="(item, index) in allDays" :key="index" :id="`item-${index}`" class="wd-date-strip__item">
            <view class="wd-date-strip__item-content" :style="[getItemStyle('week', item)]" @click="selectDate(item)">
              <text class="wd-date-strip__weekday" :style="[getItemStyle('weekday', item)]">
                {{ item.weekday }}
              </text>
              <view class="wd-date-strip__date" :style="[getItemStyle('date', item)]">
                <text class="wd-date-strip__date-text">{{ item.date }}</text>
                <text v-if="item.bottomInfo" class="wd-date-strip__lunar" :style="[getItemStyle('lunar', item)]">{{ item.bottomInfo }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </template>
  </view>
</template>

<script lang="ts">
  export default {
    name: 'wd-date-strip',
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  }
</script>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch, type CSSProperties } from 'vue'
  import { objToStyle } from '../common/util.js'
  import dayjs from '../../dayjs/index.js'
  import Calendar from '../common/calendar'
  import { dateStripProps } from './types.js'

  // 组件属性定义
  const props = defineProps(dateStripProps)

  // 组件事件定义
  const emit = defineEmits<{
    'update:value': [value: number]
    change: [
      data: {
        weekday: string
        date: string | number
        timestamp: number
        lunar?: any
      }
    ]
  }>()

  // 响应式状态
  const currentIndex = ref<number>(0)
  const weekList = ref<any[]>([])
  const allDays = ref<any[]>([])
  const scrollIntoView = ref<string>('')
  const innerSelected = ref<number | string>()
  const innerFormatter = ref<(value: any) => any>((value) => value)

  // 常量定义
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']

  /**
   * 工具函数：将样式字符串转换为CSSProperties对象
   * @param styleObj 样式对象
   * @returns CSSProperties对象
   */
  const convertStyleToObject = (styleObj: Record<string, any>): CSSProperties => {
    const styleStr = objToStyle(styleObj)
    if (!styleStr) return {}

    const style: CSSProperties = {}
    const styleDeclarations = styleStr.split(';').filter((decl) => decl.trim())

    styleDeclarations.forEach((declaration) => {
      const [property, value] = declaration.split(':').map((s) => s.trim())
      if (property && value) {
        // 将kebab-case转换为camelCase
        const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        ;(style as any)[camelCaseProperty] = value
      }
    })

    return style
  }

  /**
   * 工具函数：获取高亮样式配置
   * @param type 样式类型（'week'|'date'|'lunar'）
   * @returns 样式配置对象
   */
  const getActiveStyleConfig = (type: string) => {
    const { activeMode, activeBgColor, activeColor } = props

    switch (type) {
      case 'week':
        return {
          showBackground: activeMode === 'both',
          showText: activeMode === 'text',
          bgColor: activeMode === 'both' ? activeBgColor : '',
          textColor: activeMode === 'both' ? activeColor : activeMode === 'text' ? activeBgColor : ''
        }
      case 'date':
        return {
          showBackground: activeMode === 'date',
          showText: activeMode !== 'date',
          bgColor: activeMode === 'date' ? activeBgColor : '',
          textColor: activeMode === 'date' ? activeColor : activeMode === 'text' ? activeBgColor : activeColor
        }
      case 'lunar':
        return {
          showBackground: false,
          showText: true,
          bgColor: '',
          textColor: activeMode === 'text' ? activeBgColor : activeColor
        }
      default:
        return { showBackground: false, showText: false, bgColor: '', textColor: '' }
    }
  }

  // 计算属性：当前选中的值
  const currentValue = computed(() => {
    return props.modelValue || props.defaultDate
  })

  // 计算属性：容器样式
  const containerStyle = computed((): CSSProperties => {
    const style: CSSProperties = {}

    // 应用基础样式属性
    if (props.bgColor) {
      style.backgroundColor = props.bgColor
    }
    if (props.height) {
      style.height = props.height
    }
    if (props.round) {
      style.borderRadius = props.round
    }

    // 合并自定义样式
    if (props.customStyle) {
      const customStyles = convertStyleToObject(props.customStyle as unknown as Record<string, any>)
      Object.assign(style, customStyles)
    }

    return style
  })

  // 计算属性：获取日期项样式
  const getItemStyle = computed(() => {
    return (type: string, item: any): CSSProperties => {
      const style: CSSProperties = {}

      // 设置基础宽度（仅周模式）
      if (type === 'week') {
        style.width = props.itemWidth
      }

      // 处理禁用状态样式
      if (item.disabled) {
        style.color = props.disabledColor
        style.pointerEvents = 'none'
      }

      // 处理选中状态样式
      if (isSameDay(dayjs(innerSelected.value), dayjs(item.timestamp))) {
        style.borderRadius = props.itemRound

        const activeConfig = getActiveStyleConfig(type)

        // 应用背景色
        if (activeConfig.showBackground && activeConfig.bgColor) {
          style.backgroundColor = activeConfig.bgColor
        }

        // 应用文字颜色
        if (activeConfig.textColor) {
          style.color = activeConfig.textColor
        }

        // 合并自定义激活样式
        if (props.activeStyle && Object.keys(props.activeStyle).length > 0) {
          const activeStyles = convertStyleToObject(props.activeStyle as Record<string, any>)
          Object.assign(style, activeStyles)
        }
      }

      return style
    }
  })

  // 监听器：监听选中值变化
  watch(
    () => currentValue.value,
    (newVal) => {
      innerSelected.value = newVal
    },
    { immediate: true }
  )

  // 生命周期：组件挂载后初始化
  onMounted(() => {
    nextTick(() => {
      init()
    })
  })

  /**
   * 初始化组件
   */
  const init = () => {
    if (props.mode === 'week') {
      initWeekMode()
    } else {
      initScrollMode()
    }
  }

  /**
   * 获取日期范围
   * @returns 包含最小和最大日期的对象
   */
  const getDateRange = () => {
    const monthNum = parseInt(String(props.monthNum))
    const minDate = props.minDate ? dayjs(props.minDate) : dayjs().subtract(monthNum, 'month')
    const maxDate = props.maxDate ? dayjs(props.maxDate) : dayjs().add(monthNum, 'month')
    return { minDate, maxDate }
  }

  /**
   * 初始化周模式
   */
  const initWeekMode = () => {
    weekList.value = []
    const current = dayjs(currentValue.value)

    const currentWeekStart = getWeekStart(current)
    const { minDate, maxDate } = getDateRange()

    // 计算需要生成的周数
    const startWeek = getWeekStart(minDate)
    const endWeek = getWeekStart(maxDate)
    const totalWeeks = endWeek.diff(startWeek, 'week') + 1

    // 生成指定范围内的周数据
    for (let i = 0; i < totalWeeks; i++) {
      const weekStart = startWeek.add(i, 'week')
      const week = generateWeek(weekStart)
      weekList.value.push(week)
    }

    // 设置当前周的索引
    const currentWeekIndex = currentWeekStart.diff(startWeek, 'week')
    currentIndex.value = Math.max(0, currentWeekIndex + 1)
  }

  /**
   * 初始化滚动模式
   */
  const initScrollMode = () => {
    allDays.value = []
    const { minDate, maxDate } = getDateRange()

    let currentDate = minDate
    let index = 0
    let selectedIndex = -1

    while (currentDate.isBefore(maxDate) || currentDate.isSame(maxDate, 'day')) {
      const day = generateDay(currentDate)
      allDays.value.push(day)

      // 记录选中日期的索引
      if (isSameDay(currentDate, dayjs(currentValue.value))) {
        selectedIndex = index
      }

      currentDate = currentDate.add(1, 'day')
      index++
    }

    // 滚动到选中的日期
    if (selectedIndex >= 0) {
      nextTick(() => {
        scrollIntoView.value = `item-${selectedIndex}`
      })
    }
  }

  /**
   * 获取周的开始日期
   * @param date 日期对象
   * @returns 周开始日期
   */
  const getWeekStart = (date: dayjs.Dayjs) => {
    const day = date.day()
    const diff = (day - props.firstDayOfWeek + 7) % 7
    return date.subtract(diff, 'day')
  }

  /**
   * 生成一周的数据
   * @param weekStart 周开始日期
   * @returns 一周的日期数据数组
   */
  const generateWeek = (weekStart: dayjs.Dayjs) => {
    const week = []
    for (let i = 0; i < 7; i++) {
      const date = weekStart.add(i, 'day')
      week.push(generateDay(date))
    }
    return week
  }

  /**
   * 生成单天数据
   * @param date 日期对象
   * @returns 单天数据对象
   */
  const generateDay = (date: dayjs.Dayjs) => {
    const day = {
      date: props.padZero && date.date() < 10 ? `0${date.date()}` : date.date(),
      weekday: weekdays[date.day()],
      timestamp: date.valueOf(),
      disabled: false,
      bottomInfo: ''
    }

    // 计算农历信息
    if (props.showLunar) {
      const lunar = Calendar.solar2lunar(date.year(), date.month() + 1, date.date())
      day.bottomInfo = lunar.IDayCn
    }

    // 检查日期范围约束
    day.disabled = isDateOutOfRange(date)

    // 检查禁用日期
    if (!day.disabled) {
      day.disabled = isDateDisabled(date, day)
    }

    // 应用格式化函数
    const formatter = props.formatter || innerFormatter.value
    return formatter(day)
  }

  /**
   * 检查日期是否超出可选范围
   * @param date 日期对象
   * @returns 是否超出范围
   */
  const isDateOutOfRange = (date: dayjs.Dayjs): boolean => {
    if (props.minDate && date.isBefore(dayjs(props.minDate), 'day')) {
      return true
    }
    if (props.maxDate && date.isAfter(dayjs(props.maxDate), 'day')) {
      return true
    }
    return false
  }

  /**
   * 检查日期是否被禁用
   * @param date 日期对象
   * @param dayData 日期数据对象
   * @returns 是否被禁用
   */
  const isDateDisabled = (date: dayjs.Dayjs, dayData: any): boolean => {
    // 检查禁用日期列表
    if (props.disabledDate) {
      let disabledDates = props.disabledDate
      if (typeof disabledDates === 'string') {
        disabledDates = [disabledDates]
      }

      if (Array.isArray(disabledDates)) {
        const isDisabled = disabledDates.some((item) => isSameDay(dayjs(item as string | number | Date), date))
        if (isDisabled) return true
      }
    }

    // 检查禁用函数
    if (props.disabledFun && typeof props.disabledFun === 'function') {
      const result = props.disabledFun(dayData)
      if (Array.isArray(result)) {
        dayData.bottomInfo = result[1]
        return result[0]
      }
      return result
    }

    return false
  }

  /**
   * 判断是否是同一天
   * @param date1 第一个日期
   * @param date2 第二个日期
   * @returns 是否是同一天
   */
  const isSameDay = (date1: dayjs.Dayjs, date2: dayjs.Dayjs): boolean => {
    return date1.isSame(date2, 'day')
  }

  /**
   * 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
   * @param formatter 格式化函数
   */
  const setFormatter = (formatter: (value: any) => any) => {
    innerFormatter.value = formatter
  }

  /**
   * 选择日期
   * @param item 日期项数据
   */
  const selectDate = (item: any) => {
    if (item.disabled) return

    innerSelected.value = item.timestamp

    emit('update:value', item.timestamp)
    emit('change', {
      weekday: item.weekday,
      date: item.date,
      timestamp: item.timestamp,
      lunar: item.lunar
    })
  }

  /**
   * swiper切换事件处理
   * @param e 事件对象
   */
  const onSwiperChange = (e: any) => {
    currentIndex.value = e.detail.current
  }

  // 暴露方法给外部使用
  defineExpose({
    setFormatter
  })
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
