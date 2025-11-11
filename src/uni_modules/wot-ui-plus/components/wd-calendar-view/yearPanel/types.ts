import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { makeBooleanProp, makeRequiredProp } from '../../common/props'
import type { CalendarFormatter, CalendarType } from '../types'

/**
 * 年份信息接口
 * 设计思路：定义年视图中每个年份的数据结构
 * 用途：在年面板组件中用于表示单个年份的数据模型
 * 在虚拟滚动或列表渲染中的作用：
 * - 作为可滚动年视图列表中的基本数据单元
 * - 支持年面板的高效渲染和滚动定位
 */
export interface YearInfo {
  /**
   * 年份对应的时间戳
   * 功能：唯一标识年份，用于日期计算和比较
   * 类型：数字（13位时间戳，通常表示该年的1月1日00:00:00）
   * 业务意义：用于确定年份位置和进行时间相关的逻辑处理
   */
  date: number
  /**
   * 年份项的渲染高度
   * 功能：定义每个年份项在滚动容器中的高度
   * 类型：数字（像素值）
   * 在虚拟滚动中的作用：用于计算滚动偏移量和可视区域内的年份项
   * 优化目的：提高长列表滚动性能，实现高效的虚拟列表渲染
   */
  height: number
}

/**
 * 年面板组件属性配置
 * 设计思路：定义年面板组件的可配置属性，支持年份选择的各种需求
 * 组件作用：提供年份视图的选择界面，作为日历组件的年份选择面板
 * 与月视图的关系：年面板通常用于快速定位到特定年份，再通过月视图进行精确日期选择
 */
export const yearPanelProps = {
  /**
   * 日期类型
   * 功能：指定年面板支持的选择模式
   * 类型：CalendarType枚举值
   * 必要性：必填
   * 业务场景：根据不同的选择类型（如date、daterange等），控制年面板的选择行为和显示样式
   */
  type: makeRequiredProp(String as PropType<CalendarType>),
  /**
   * 选中值
   * 功能：绑定组件的选中状态，支持双向绑定
   * 类型：13位时间戳（单选）或时间戳数组（多选或范围选择）或null
   * 必要性：必填
   * 业务场景：根据不同的CalendarType，存储和显示对应的选中年份
   */
  value: makeRequiredProp([Number, Array] as PropType<number | (number | null)[] | null>),
  /**
   * 最小日期
   * 功能：限制可选年份的起始范围
   * 类型：13位时间戳
   * 必要性：必填
   * 业务场景：设置只能选择某个起始年份之后的年份
   */
  minDate: makeRequiredProp(Number),
  /**
   * 最大日期
   * 功能：限制可选年份的结束范围
   * 类型：13位时间戳
   * 必要性：必填
   * 业务场景：设置只能选择某个结束年份之前的年份
   */
  maxDate: makeRequiredProp(Number),
  /**
   * 日期格式化函数
   * 功能：自定义年份项的显示和样式
   * 类型：CalendarFormatter类型函数
   * 使用场景：添加特殊标记、自定义文本、控制禁用状态等个性化需求
   * 扩展能力：允许开发者根据业务需求定制年份的显示效果
   */
  formatter: Function as PropType<CalendarFormatter>,
  /**
   * 最大日期范围
   * 功能：限制范围选择时的最大年份跨度
   * 类型：数字
   * 使用场景：type为范围选择时有效，如限制选择不超过N年的范围
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
   * 业务场景：在年份选择时，允许选择单个日期作为开始和结束
   */
  allowSameDay: makeBooleanProp(false),
  /**
   * 是否展示面板标题
   * 功能：控制是否显示当前滚动年份对应的标题
   * 类型：布尔值
   * 默认值：false（年面板默认不显示面板标题，与月面板不同）
   * 交互体验：可根据UI设计需求控制标题显示
   */
  showPanelTitle: makeBooleanProp(false),
  /**
   * 默认时间
   * 功能：为选中的年份设置默认的时分秒
   * 类型：数组，包含多个时间数组
   * 数据结构：Array<Array<number>>，用于存储小时、分钟、秒等时间信息
   * 业务场景：当从年视图切换到日视图时，使用预设的时间值
   */
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },
  /**
   * 可滚动面板的高度
   * 功能：设置年面板滚动区域的高度
   * 类型：数字（像素值）
   * 必要性：必填
   * 样式设计：适配不同尺寸的设备和UI需求
   * 在虚拟滚动中的作用：与每个年份项的height属性一起，用于计算可视区域和滚动位置
   */
  panelHeight: makeRequiredProp(Number)
}

/**
 * 年面板组件属性类型
 * 设计思路：自动提取yearPanelProps的类型定义
 * 使用场景：在TypeScript项目中提供完整的类型推断支持
 * 类型安全：确保组件属性的类型检查和IDE智能提示
 */
export type YearPanelProps = ExtractPropTypes<typeof yearPanelProps>

/**
 * 年面板组件暴露的方法
 * 设计思路：定义组件对外提供的API接口
 * 使用场景：父组件通过ref调用年面板组件的方法
 */
export type YearPanelExpose = {
  /**
   * 滚动到可视区域
   * 功能：将当前年份或选中年份滚动到视图可见区域
   * 使用场景：
   * - 打开年面板后自动定位到当前年份
   * - 从其他视图切换过来时定位到之前选择的年份
   * - 初始化时定位到默认选中的年份
   */
  scrollIntoView: () => void
}

/**
 * 年面板组件实例类型
 * 设计思路：组合组件的属性和暴露方法类型
 * 使用场景：在TypeScript项目中正确引用年面板组件实例
 * 类型安全：确保通过ref访问组件实例时的类型正确性
 */
export type YearPanelInstance = ComponentPublicInstance<YearPanelExpose, YearPanelProps>
