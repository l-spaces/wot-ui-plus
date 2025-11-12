import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp, makeStringProp } from '../common/props'

import dayjs from 'dayjs'

/**
 * 默认最小可选日期常量
 * 业务背景：设置日历组件可选择的最早时间，防止用户选择过于久远的日期
 * 取值逻辑：当前日期的当天开始时间，向前推6个月
 * 类型：时间戳（毫秒）
 */
export const defaultMinDate = dayjs().startOf('day').subtract(3, 'month').valueOf()

/**
 * 默认最大可选日期常量
 * 业务背景：设置日历组件可选择的最晚时间，防止用户选择过于未来的日期
 * 取值逻辑：当前日期向后推6个月，并且是该月的最后一天结束时间
 * 类型：时间戳（毫秒）
 */
export const defaultMaxDate = dayjs().add(3, 'month').endOf('day').valueOf()

/**
 * 日历选择类型枚举
 * 设计思路：提供多种日期选择模式，满足不同业务场景需求
 * 使用场景：
 * - 'date': 单选日期，适用于选择单个日期如生日、预约日期等
 * - 'dates': 多选日期，适用于选择多个不连续日期如排班、活动日等
 * - 'datetime': 单选日期时间，适用于需要精确到时分秒的时间点选择
 * - 'week': 单选周，适用于按周选择的场景如周报、周计划等
 * - 'month': 单选月，适用于按月选择的场景如月度报表、月度计划等
 * - 'daterange': 日期范围选择，适用于选择起止日期如请假、旅行日期等
 * - 'datetimerange': 日期时间范围选择，适用于需要精确时间范围的场景
 * - 'weekrange': 周范围选择，适用于选择连续的周区间
 * - 'monthrange': 月范围选择，适用于选择连续的月区间
 */
export type CalendarType = 'date' | 'dates' | 'datetime' | 'week' | 'month' | 'daterange' | 'datetimerange' | 'weekrange' | 'monthrange'

/**
 * 日历组件属性配置
 * 设计思路：通过可配置的属性组合，支持多种日历展示和交互需求
 * 组件架构：作为基础日历视图组件，支持月视图、年视图等多种展示模式
 */
export const calendarViewProps = {
  ...baseProps,
  /**
   * 选中值
   * 功能：绑定组件的选中状态，支持双向绑定
   * 类型：13位时间戳（单选）或时间戳数组（多选或范围选择）或null（未选择）
   * 必要性：必填
   * 业务场景：根据不同的CalendarType，存储对应的选中数据
   */
  modelValue: makeRequiredProp([Number, Array, null] as PropType<number | number[] | null>),
  /**
   * 日期类型
   * 功能：指定日历的选择模式
   * 类型：CalendarType枚举值
   * 默认值：'date'
   * 业务场景：根据业务需求选择合适的选择模式
   */
  type: makeStringProp<CalendarType>('date'),
  /**
   * 最小日期
   * 功能：限制可选日期的起始范围
   * 类型：13位时间戳
   * 默认值：当前日期往前6个月的当天开始时间
   * 业务场景：如设置只能选择未来日期进行预约
   */
  minDate: makeNumberProp(defaultMinDate),
  /**
   * 最大日期
   * 功能：限制可选日期的结束范围
   * 类型：13位时间戳
   * 默认值：当前日期往后6个月的当月结束时间
   * 业务场景：如设置只能选择过去日期进行记录
   */
  maxDate: makeNumberProp(defaultMaxDate),
  /**
   * 周起始天
   * 功能：定义日历每周的起始日期
   * 类型：数字，0表示周日，1-6表示周一至周六
   * 默认值：0（周日）
   * 业务场景：满足不同国家/地区的周起始习惯
   */
  firstDayOfWeek: makeNumberProp(0),
  /**
   * 日期格式化函数
   * 功能：自定义日期项的显示和样式
   * 类型：CalendarFormatter类型函数
   * 使用场景：添加特殊标记、自定义文本、控制禁用状态等个性化需求
   */
  formatter: Function as PropType<CalendarFormatter>,
  /**
   * 最大日期范围
   * 功能：限制范围选择时的最大天数
   * 类型：数字
   * 使用场景：type为范围选择时有效，如限制请假天数不超过N天
   */
  maxRange: Number,
  /**
   * 范围超出提示文案
   * 功能：当选择超出最大日期范围时的错误提示
   * 类型：字符串
   * 使用场景：type为范围选择时提供用户友好的错误提示
   */
  rangePrompt: String,
  /**
   * 是否允许选择同一天
   * 功能：控制范围选择时是否允许起止日期相同
   * 类型：布尔值
   * 默认值：false
   * 业务场景：如请假是否允许请0.5天（起止时间不同但日期相同）
   */
  allowSameDay: makeBooleanProp(false),
  /**
   * 是否展示面板标题
   * 功能：控制是否显示当前滚动日期对应的月份标题
   * 类型：布尔值
   * 默认值：true
   * 交互体验：帮助用户了解当前查看的日期范围
   */
  showPanelTitle: makeBooleanProp(true),
  /**
   * 选中日期的具体时刻
   * 功能：为选中的日期设置默认的时分秒
   * 类型：字符串（单选）或字符串数组（范围选择的起止时间）
   * 默认值：'00:00:00'
   * 业务场景：如默认预约时间为上午9点
   */
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>,
    default: '00:00:00'
  },
  /**
   * 可滚动面板的高度
   * 功能：设置日历滚动区域的高度
   * 类型：数字
   * 默认值：378
   * 样式设计：适配不同尺寸的设备和UI需求
   */
  panelHeight: makeNumberProp(378),
  /**
   * 时间选择器过滤器
   * 功能：过滤时间选择器的可选数据
   * 类型：CalendarTimeFilter类型函数
   * 使用场景：type为'datetime'或'datetimerange'时，自定义小时/分钟/秒的可选值
   */
  timeFilter: Function as PropType<CalendarTimeFilter>,
  /**
   * 是否隐藏秒修改
   * 功能：控制时间选择器是否显示秒选择
   * 类型：布尔值
   * 默认值：false
   * 业务场景：当不需要精确到秒的时间选择时，简化界面
   */
  hideSecond: makeBooleanProp(false),
  /**
   * 是否立即触发change事件
   * 功能：控制picker-view的change事件触发时机
   * 类型：布尔值
   * 默认值：false
   * 交互逻辑：若为true，在手指松开时立即触发；否则在滚动动画结束后触发
   * 平台兼容性：仅微信小程序和支付宝小程序支持
   */
  immediateChange: makeBooleanProp(false),
  /**
   * 是否显示农历
   * 功能：控制是否在日期项中显示农历日期
   * 类型：布尔值
   * 默认值：false
   * 业务场景：如需要展示中国传统的日期表示方式
   */
  showLunar: makeBooleanProp(true),
  /**
   * 是否显示月份背景
   * 功能：控制是否在日期项中显示特殊标记（月份背景）
   * 类型：布尔值
   * 默认值：true
   * 业务场景：如需要突出显示月份背景
   */
  showMark: makeBooleanProp(true)
}

/**
 * 日历视图组件属性类型
 * 设计思路：自动提取calendarViewProps的类型定义
 * 使用场景：在TypeScript项目中提供完整的类型推断支持
 */
export type CalendarViewProps = ExtractPropTypes<typeof calendarViewProps>

/**
 * 日历日期项的状态类型
 * 设计思路：定义日期项在不同选择状态下的类型标识
 * 使用场景：控制日期项的样式和交互行为
 * 状态说明：
 * - '': 普通日期
 * - 'start': 范围选择的开始日期
 * - 'middle': 范围选择的中间日期
 * - 'end': 范围选择的结束日期
 * - 'selected': 单选日期
 * - 'same': 范围选择的开始和结束为同一天
 * - 'current': 当前日期
 * - 'multiple-middle': 多选日期的中间日期
 * - 'multiple-selected': 多选日期的选中状态
 */
export type CalendarDayType = '' | 'start' | 'middle' | 'end' | 'selected' | 'same' | 'current' | 'multiple-middle' | 'multiple-selected'

/**
 * 日历日期项数据结构
 * 设计思路：定义日历中每个日期项的完整数据模型
 * 使用场景：存储和渲染日历中的每个日期单元
 * 在月视图中的作用：
 * - 作为月视图网格中每个单元格的数据基础
 * - 支持日期的自定义渲染（顶部信息、底部信息）
 * - 控制日期的选中状态和禁用状态
 */
export type CalendarDayItem = {
  /**
   * 日期时间戳 (默认当前时间戳)
   * 功能：唯一标识日期，用于计算和比较
   * 类型：数字（13位时间戳）
   */
  date: number
  /**
   * 显示的日期文本 (默认日期的天数)
   * 功能：自定义日期的显示文本
   * 类型：数字或字符串
   * 默认值：日期的天数（如1, 2, 3...）
   */
  text?: number | string
  /**
   * 日期顶部显示的信息
   * 功能：在日期上方显示额外信息
   * 类型：字符串
   * 使用场景：显示假期、活动标记等
   */
  topInfo?: string
  /**
   * 日期顶部信息的颜色
   * 功能：自定义日期顶部信息的显示颜色
   * 类型：字符串（CSS颜色值）
   * 默认值：根据主题自动调整
   */
  topColor?: string
  /**
   * 日期底部显示的信息
   * 功能：在日期下方显示额外信息
   * 类型：字符串
   * 使用场景：显示农历、价格、状态等
   */
  bottomInfo?: string
  /**
   * 日期底部信息的颜色
   * 功能：自定义日期底部信息的显示颜色
   * 类型：字符串（CSS颜色值）
   * 默认值：根据主题自动调整
   */
  bottomColor?: string
  /**
   * 日期类型
   * 功能：控制日期的选中状态样式
   * 类型：CalendarDayType枚举值
   */
  type?: CalendarDayType
  /**
   * 是否禁用
   * 功能：控制日期是否可点击选择
   * 类型：布尔值
   * 默认值：false
   */
  disabled?: boolean
  /**
   * 是否为当前行的最后一列
   * 功能：帮助布局和样式计算
   * 类型：布尔值
   * 内部使用：用于判断是否需要添加特殊样式以处理行末日期
   */
  isLastRow?: boolean
}

/**
 * 日历格式化函数类型
 * 设计思路：提供自定义日期项的能力
 * 参数：日历日期项
 * 返回值：格式化后的日历日期项
 * 使用场景：个性化定制日历显示，如添加标记、修改样式等
 * 与月视图关系：为月视图中的每个日期项提供自定义处理逻辑
 */
export type CalendarFormatter = (day: CalendarDayItem) => CalendarDayItem

/**
 * 时间过滤器选项类型
 * 设计思路：定义时间过滤器支持的时间单位
 * 取值：'hour'(小时)、'minute'(分钟)、'second'(秒)
 */
export type CalendarTimeFilterOptionType = 'hour' | 'minute' | 'second'

/**
 * 时间过滤器选项结构
 * 设计思路：定义传递给时间过滤器函数的数据结构
 * 使用场景：datetime类型时，过滤时间选择器的可选值
 */
export type CalendarTimeFilterOption = {
  /**
   * 时间类型
   * 功能：标识当前过滤的是小时、分钟还是秒
   */
  type: CalendarTimeFilterOptionType
  /**
   * 原始时间值数组
   * 功能：提供需要过滤的原始数据
   */
  values: CalendarItem[]
}

/**
 * 时间过滤器函数类型
 * 设计思路：提供自定义时间选择器选项的能力
 * 参数：时间过滤器选项
 * 返回值：过滤后的时间选项数组
 * 使用场景：自定义时间选择器的可选值，如只允许工作时间选择
 */
export type CalendarTimeFilter = (option: CalendarTimeFilterOption) => CalendarItem[]

/**
 * 日历时间选择项
 * 设计思路：定义时间选择器中每个选项的数据结构
 * 使用场景：构建小时、分钟、秒的选择列表
 */
export type CalendarItem = {
  /**
   * 显示文本
   * 功能：在选择器中显示的文本
   */
  label: string
  /**
   * 值
   * 功能：选项的实际数值
   */
  value: number
  /**
   * 是否禁用
   * 功能：控制选项是否可选
   */
  disabled: boolean
}

/**
 * 日历视图组件暴露的方法
 * 设计思路：定义组件对外提供的API接口
 * 使用场景：父组件通过ref调用日历组件的方法
 */
export type CalendarViewExpose = {
  /**
   * 滚动到可视区域
   * 功能：将当前日期或选中日期滚动到视图可见区域
   * 使用场景：如打开日历后自动定位到当前日期或上次选择的日期
   */
  scrollIntoView: () => void
}

/**
 * 日历视图组件实例类型
 * 设计思路：组合组件的属性和暴露方法类型
 * 使用场景：在TypeScript项目中正确引用日历组件实例
 */
export type CalendarViewInstance = ComponentPublicInstance<CalendarViewExpose, CalendarViewProps>
