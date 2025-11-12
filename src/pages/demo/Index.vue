<template>
  <page-wraper>
    <demo-block :title="$t('dan-ge-ri-qi-xuan-ze')" :hor="0">
      <view style="margin: 0 15px 10px">
        <view style="margin-bottom: 10px; font-size: 13px">{{ $t('qie-huan-lei-xing') }}</view>
        <wd-radio-group v-model="type1" shape="button">
          <wd-radio value="date">单选</wd-radio>
          <wd-radio value="dates">多选</wd-radio>
          <wd-radio value="datetime">日期时间</wd-radio>
          <wd-radio value="week">单选周</wd-radio>
          <wd-radio value="month">单选月</wd-radio>
          <wd-radio value="daterange">日期范围</wd-radio>
          <wd-radio value="datetimerange">日期时间范围</wd-radio>
          <wd-radio value="weekrange">周范围</wd-radio>
          <wd-radio value="monthrange">月范围</wd-radio>
        </wd-radio-group>
      </view>
      <wd-calendar-view :type="type1" v-model="value1" :formatter="formatter" @change="handleChange1"></wd-calendar-view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { CalendarFormatter } from '@/uni_modules/wot-ui-plus/components/wd-calendar-view/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import dayjs from 'dayjs'

const type1 = ref<any>('weekrange')
const type2 = ref<any>('daterange')
const minDate = ref(Date.now())
const value1 = ref(dayjs('2025-10-12').valueOf())
const value2 = ref(null)
const value3 = ref([dayjs('2025-11-12').valueOf(), dayjs('2025-11-1').valueOf()])
const value4 = ref(Date.now())
const value5 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value6 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value7 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value8 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])

const timeFilter = ({ type, values }: any) => {
  if (type === 'minute') {
    // 只展示 0,10,20,30,40,50 分钟选项
    return values.filter((item: any) => {
      return item.value % 10 === 0
    })
  }

  return values
}

const formatter: CalendarFormatter = (day) => {
  const date = new Date(day.date)
  const now = new Date()

  const year = date.getFullYear()
  const month = date.getMonth()
  const da = date.getDate()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDa = now.getDate()

  if (year === nowYear && month === nowMonth && da === nowDa) {
    day.bottomInfo = '今天'
  }

  if (month === 10 && da === 18) {
    day.topInfo = '618'
  }

  if (month === 10 && da === 11) {
    day.topInfo = '10月11日'
    day.topColor = 'red'
  }

  if (month === 10 && da === 14) {
    day.bottomInfo = '春节'
    day.bottomColor = 'red'
  }

  if (day.type === 'start') {
    day.bottomInfo = '开始'
  }

  if (day.type === 'end') {
    day.bottomInfo = '结束'
  }

  if (day.type === 'same') {
    day.bottomInfo = '开始结束'
  }

  return day
}

function handleTypeChange2({ value }: any) {
  type2.value = value
}
function handleChange1({ value }: any) {
  console.log(value)
  if (type1.value === 'month') {
    if (Array.isArray(value)) {
      // 使用 dayjs 格式化数组中的日期
      console.log(value.map((v) => dayjs(v).format('YYYY-MM')))
    } else {
      console.log(dayjs(value).format('YYYY-MM'))
    }
  } else {
    if (Array.isArray(value)) {
      // 使用 dayjs 格式化数组中的日期
      console.log(value.map((v) => dayjs(v).format('YYYY-MM-DD HH:mm:ss')))
    } else {
      console.log(dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    }
  }
}
function handleChange2({ value }: any) {
  value2.value = value
}
function handleChange3({ value }: any) {
  value3.value = value
}
</script>
<style lang="scss" scoped></style>
