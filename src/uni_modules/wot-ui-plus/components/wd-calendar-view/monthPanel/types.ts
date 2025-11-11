/**
 * 月面板类型定义模块
 * 功能：为日历组件的月面板提供类型支持，定义面板数据结构、属性配置和方法接口
 * 使用场景：日历组件的月视图渲染、日期选择交互、滚动定位等功能实现
 */

// Vue核心类型导入，用于定义组件实例和属性类型
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
// 从公共属性工具导入常用属性构造函数
import { makeBooleanProp, makeNumberProp, makeStringProp } from '../../common/props'
// 从日历共享类型导入格式化器、时间过滤器和日历类型定义
import type { CalendarFormatter, CalendarTimeFilter, CalendarType } from '../types'
// 导入dayjs日期处理库，用于日期计算和格式化
import dayjs from 'dayjs'

/**
 * 默认最小可选日期常量
 * 业务背景：设置月面板可选择的最早时间，防止用户选择过于久远的日期
 * 取值逻辑：当前日期的当天开始时间，向前推6个月
 * 类型：时间戳（毫秒）
 */
const defaultMinDate = dayjs().startOf('day').subtract(6, 'month').valueOf()

/**
 * 默认最大可选日期常量
 * 业务背景：设置月面板可选择的最晚时间，防止用户选择过于未来的日期
 * 取值逻辑：当前日期向后推6个月，并且是该月的最后一天结束时间
 * 类型：时间戳（毫秒）
 */
const defaultMaxDate = dayjs().add(6, 'month').endOf('day').valueOf()

/**
 * 月份信息接口
 * 设计思路：定义单个月份在滚动面板中的位置和尺寸信息
 * 使用场景：用于月面板的虚拟滚动优化，记录每个月份的高度和日期信息
 * @interface MonthInfo
 * @property {number} date - 月份对应的时间戳（月份第一天的时间戳）
 * @property {number} height - 月份在滚动面板中占据的高度（像素），用于虚拟列表计算位置
 */
export interface MonthInfo {
  /**
   * 月份对应的时间戳
   * 设计意图：使用时间戳唯一标识一个月，便于日期计算和比较
   * 业务意义：用于定位具体的月份数据，支持月面板的滚动和渲染
   */
  date: number
  /**
   * 月份在滚动面板中占据的高度
   * 设计意图：支持虚拟滚动技术，提高大量月份数据渲染时的性能
   * 业务意义：通过预计算每个月份的高度，实现精准的滚动定位和视口外数据懒加载
   */
  height: number
}

/**
 * 月面板属性配置对象
 * 设计思路：通过可配置的属性组合，支持多种月视图展示和交互需求
 * 组件架构：作为日历组件的核心子组件，负责月视图的具体渲染和交互逻辑
 */
export const monthPanelProps = {
  /**
   * 日期类型
   * 功能：指定月面板的选择模式
   * 类型：CalendarType枚举值
   * 默认值：'date'
   * 业务场景：根据业务需求选择合适的选择模式（单选、多选、范围等）
   * 与月视图交互：决定月视图中日期的选中状态样式和交互行为
   */
  type: makeStringProp<CalendarType>('date'),

  /**
   * 选中值
   * 功能：绑定组件的选中状态，支持单选、多选或范围选择
   * 类型：13位时间戳（单选）或时间戳数组（多选或范围选择）或null（未选择）
   * 默认值：null
   * 业务场景：根据不同的CalendarType，存储对应的选中数据
   * 与月视图交互：控制月视图中哪些日期应显示为选中状态
   */
  value: {
    type: [Number, Array, null] as PropType<number | (number | null)[] | null>,
    default: null
  },

  /**
   * 最小日期
   * 功能：限制月面板中可选日期的起始范围
   * 类型：13位时间戳
   * 默认值：当前日期往前6个月的当天开始时间
   * 业务场景：如设置只能选择未来日期进行预约
   * 与月视图交互：用于计算月视图中哪些日期应显示为禁用状态
   */
  minDate: makeNumberProp(defaultMinDate),

  /**
   * 最大日期
   * 功能：限制月面板中可选日期的结束范围
   * 类型：13位时间戳
   * 默认值：当前日期往后6个月的当月结束时间
   * 业务场景：如设置只能选择过去日期进行记录
   * 与月视图交互：用于计算月视图中哪些日期应显示为禁用状态
   */
  maxDate: makeNumberProp(defaultMaxDate),

  /**
   * 周起始天
   * 功能：定义月视图中每周的起始日期
   * 类型：数字，0表示周日，1-6表示周一至周六
   * 默认值：0（周日）
   * 业务场景：满足不同国家/地区的周起始习惯
   * 与月视图交互：影响月视图中日期的排列方式
   */
  firstDayOfWeek: makeNumberProp(0),

  /**
   * 日期格式化函数
   * 功能：自定义月视图中日期项的显示和样式
   * 类型：CalendarFormatter类型函数
   * 使用场景：添加特殊标记、自定义文本、控制禁用状态等个性化需求
   * 与月视图交互：允许用户完全自定义日期项的渲染内容
   */
  formatter: Function as PropType<CalendarFormatter>,

  /**
   * 最大日期范围
   * 功能：限制范围选择时的最大天数
   * 类型：数字
   * 使用场景：type为范围选择时有效，如限制请假天数不超过N天
   * 与月视图交互：在范围选择时进行业务规则校验
   */
  maxRange: Number,

  /**
   * 范围超出提示文案
   * 功能：当范围选择超出最大天数限制时显示的提示信息
   * 类型：字符串
   * 使用场景：type为范围选择时有效，提供用户友好的错误提示
   * 与月视图交互：在用户操作违反业务规则时显示提示
   */
  rangePrompt: String,

  /**
   * 允许选择同一天
   * 功能：设置在范围选择模式下是否允许起始日期和结束日期为同一天
   * 类型：布尔值
   * 默认值：false
   * 业务场景：某些业务场景可能不允许选择同一天作为范围
   * 与月视图交互：影响范围选择时的交互逻辑和验证规则
   */
  allowSameDay: makeBooleanProp(false),

  /**
   * 显示面板标题
   * 功能：控制是否在月面板中显示当前月份标题
   * 类型：布尔值
   * 默认值：false
   * 业务场景：根据UI设计需求决定是否显示月份标题
   * 与月视图交互：影响月视图的显示结构和信息密度
   */
  showPanelTitle: makeBooleanProp(false),

  /**
   * 默认时间
   * 功能：设置选中日期所使用的当日内具体时刻
   * 类型：二维数组，格式为[[时, 分, 秒], [时, 分, 秒]]，分别对应起始和结束时间
   * 业务场景：在datetime或datetimerange模式下预设具体时间
   * 与月视图交互：在选择日期后自动应用预设时间
   */
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },

  /**
   * 面板高度
   * 功能：设置月面板的可视区域高度
   * 类型：数字（像素）
   * 默认值：378
   * 业务场景：根据页面布局和设计需求调整面板大小
   * 与月视图交互：影响虚拟滚动的计算和渲染性能
   */
  panelHeight: makeNumberProp(378),

  /**
   * 时间过滤器
   * 功能：自定义过滤时间选择器的数据
   * 类型：CalendarTimeFilter类型函数
   * 使用场景：type为'datetime'或'datetimerange'时有效，用于自定义可选时间
   * 与月视图交互：在选择日期后，为时间选择器提供过滤后的数据
   */
  timeFilter: Function as PropType<CalendarTimeFilter>,

  /**
   * 隐藏秒数选择
   * 功能：设置在时间选择时是否不展示秒修改
   * 类型：布尔值
   * 默认值：false
   * 业务场景：某些业务场景可能不需要精确到秒的时间选择
   * 与月视图交互：影响时间选择器的显示结构
   */
  hideSecond: makeBooleanProp(false),

  /**
   * 立即触发变更
   * 功能：设置是否在手指松开时立即触发picker-view的change事件
   * 类型：布尔值
   * 默认值：false
   * 业务场景：优化滚动体验，避免滚动动画过程中频繁触发事件
   * 与月视图交互：影响日期选择的响应时机和用户体验
   * 版本支持：1.2.25版本起提供，仅微信小程序和支付宝小程序支持
   */
  immediateChange: makeBooleanProp(false),

  /**
   * 是否显示农历
   * 功能：控制是否在月面板中显示农历日期
   * 类型：布尔值
   * 默认值：false
   * 必要性：可选
   * 业务场景：根据用户需求选择是否显示农历日期，如中国用户可能需要查看农历日期
   * 与月视图关系：影响月面板中日期项的显示内容，增加了日期的可读性
   */
  showLunar: makeBooleanProp(false)
}

/**
 * 月面板属性类型
 * 设计思路：使用Vue的ExtractPropTypes工具从props对象中提取具体类型
 * 使用场景：在组件实现中提供强类型支持，便于TypeScript类型检查
 */
export type MonthPanelProps = ExtractPropTypes<typeof monthPanelProps>

/**
 * 月面板时间类型
 * 设计思路：定义范围选择时的时间点类型
 * 使用场景：在范围选择模式下，区分起始时间和结束时间
 * 与月视图交互：用于标识范围选择中的不同状态
 */
export type MonthPanelTimeType = 'start' | 'end' | ''

/**
 * 月面板暴露的方法接口
 * 设计思路：定义组件向外部暴露的公共方法
 * 使用场景：允许父组件调用子组件的方法，实现程序化控制
 */
export type MonthPanelExpose = {
  /**
   * 滚动到可视区域
   * 功能：使当前日期或者选中日期滚动到月面板的可视区域
   * 使用场景：初始化时定位到当前日期，或选中日期后自动滚动到对应位置
   * 与月视图交互：实现月视图的自动定位功能
   */
  scrollIntoView: () => void
}

/**
 * 月面板组件实例类型
 * 设计思路：结合Vue的ComponentPublicInstance，定义月面板组件的完整类型
 * 使用场景：在TypeScript环境中获取组件实例时提供完整的类型支持
 * 组件架构：连接月面板的属性类型和暴露方法，提供统一的类型定义
 */
export type MonthPanelInstance = ComponentPublicInstance<MonthPanelProps, MonthPanelExpose>
