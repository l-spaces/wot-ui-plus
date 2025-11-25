<template>
  <view class="u-page">
    <demo-block title="基础用法">
      <wd-date-strip v-model="value1" @change="onChange" />
    </demo-block>

    <demo-block title="平铺模式">
      <wd-date-strip v-model="value3" mode="none" :min-date="minDate" :max-date="maxDate" />
    </demo-block>

    <demo-block title="圆形选中框">
      <wd-date-strip v-model="value5" active-mode="date" height="80px" item-width="45px" item-round="100px" />
    </demo-block>

    <demo-block title="文本高亮">
      <wd-date-strip v-model="value6" active-mode="text" />
    </demo-block>

    <demo-block title="显示农历">
      <wd-date-strip v-model="value11" :show-lunar="true" height="70px" />
    </demo-block>

    <demo-block title="小于10的日期补0显示">
      <wd-date-strip v-model="value12" :pad-zero="true" mode="none" />
    </demo-block>

    <demo-block title="自定义样式">
      <wd-date-strip v-model="value7" bg-color="#f5f5f5" active-bg-color="#ff6b35" active-color="#fff" round="10px" />
    </demo-block>

    <demo-block title="限制在最近7天">
      <wd-date-strip v-model="value9" :min-date="todayTime" :max-date="maxDateLimit" mode="none" />
    </demo-block>

    <demo-block title="禁用特定日期">
      <wd-date-strip v-model="value10" @change="onChange" :disabled-date="disabledDates" :disabled-fun="disabledFun" mode="none" />
    </demo-block>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import dayjs from 'dayjs'
  import type { Ref } from 'vue'

  type DisabledResult = [boolean, string] | boolean

  // 响应式数据定义
  const value1: Ref<number> = ref(dayjs().valueOf())
  const value3: Ref<number> = ref(dayjs().valueOf())
  const value5: Ref<number> = ref(dayjs().valueOf())
  const value6: Ref<number> = ref(dayjs().valueOf())
  const value7: Ref<number> = ref(dayjs().valueOf())
  const value9: Ref<number> = ref(dayjs().valueOf())
  const value10: Ref<number> = ref(dayjs().valueOf())
  const value11: Ref<number> = ref(dayjs().valueOf())
  const value12: Ref<number> = ref(dayjs().valueOf())
  const selectedDate: Ref<number> = ref(dayjs().valueOf())

  // 日期范围配置
  const minDate: Ref<number> = ref(dayjs('2025-6-1').valueOf())
  const maxDate: Ref<number> = ref(dayjs('2025-10-1').valueOf())
  const todayTime: Ref<number> = ref(dayjs().valueOf())
  const maxDateLimit: Ref<number> = ref(dayjs().add(6, 'day').valueOf())

  // 禁用日期配置
  const disabledDates: Ref<string[]> = ref(['2025-08-09', '2025-08-10', '2025-08-15'])

  /**
   * 禁用日期函数 - 判断特定日期是否应该被禁用
   * @param day 日期对象，包含日期相关信息
   * @returns 禁用结果，返回 [true, '禁用原因'] 或 false
   */
  const disabledFun = (day: { weekday: string }): DisabledResult => {
    if (day.weekday === '二') {
      return [true, '星期二']
    }
    return false
  }

  /**
   * 日期选择变化处理函数 - 处理日期选择事件
   * @param item 选中的日期项对象
   */
  const onChange = (item: any): void => {
    selectedDate.value = item.timestamp
    console.log('选中日期:', formatDate(item.timestamp))
  }

  /**
   * 日期格式化工具函数 - 将时间戳格式化为可读的日期字符串
   * @param timestamp 时间戳
   * @returns 格式化后的日期字符串，格式：YYYY-MM-DD 星期X
   */
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekday = weekdays[date.getDay()]
    return `${year}-${month}-${day} ${weekday}`
  }
</script>

<style lang="scss" scoped>
  .u-page {
    padding: 20rpx;
  }
</style>
