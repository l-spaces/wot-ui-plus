/**
 * 年视图类型定义模块
 * 功能说明：定义日历组件中年视图相关的类型和属性配置
 * 使用场景：为wd-calendar-view组件的年视图展示提供类型支持
 * 组件架构：作为日历视图的子组件，负责年份选择和展示功能
 */

/**
 * Vue核心类型导入
 * PropType：用于定义组件props的类型，支持复杂类型和泛型参数
 * ExtractPropTypes：用于从组件props配置中提取类型定义，自动生成类型接口
 */
import type { ExtractPropTypes, PropType } from 'vue'

/**
 * 通用属性构造函数导入
 * makeBooleanProp：创建布尔类型的props配置
 * makeRequiredProp：创建必填类型的props配置
 */
import { makeBooleanProp, makeRequiredProp } from '../../common/props'

/**
 * 共享类型导入
 * CalendarFormatter：日历格式化函数类型，用于自定义日期显示
 * CalendarType：日历选择类型枚举，定义不同的选择模式
 */
import type { CalendarFormatter, CalendarType } from '../types'

/**
 * 年视图组件属性配置
 * 设计思路：通过可配置的属性组合，支持年视图的多种展示和交互需求
 * 组件定位：作为日历组件的子视图，提供年份级别的选择功能
 */
export const yearProps = {
  /**
   * 日历选择类型
   * 功能：指定年视图的选择模式
   * 类型：CalendarType枚举值
   * 必要性：必填
   * 业务场景：根据不同的选择类型，年视图的展示和交互行为会有所不同
   * 与月视图关系：共享相同的类型定义，确保整体日历组件行为一致
   */
  type: makeRequiredProp(String as PropType<CalendarType>),

  /**
   * 当前展示日期
   * 功能：指定年视图当前显示的年份
   * 类型：13位时间戳
   * 必要性：必填
   * 业务场景：控制年视图初始化时显示的年份范围
   * 与月视图关系：从父组件传递的日期中提取年份信息
   */
  date: makeRequiredProp(Number),

  /**
   * 选中值
   * 功能：绑定组件的选中状态，支持双向绑定
   * 类型：数字（单选）或数组（多选/范围选择）或null（未选择）
   * 必要性：必填
   * 业务场景：存储用户在年视图中选择的日期数据
   * 与月视图交互：当在年视图中选择年份后，会传递给月视图显示具体月份
   */
  value: makeRequiredProp([Number, Array] as PropType<number | (number | null)[] | null>),

  /**
   * 最小可选日期
   * 功能：限制年视图中可选择的最早年份
   * 类型：13位时间戳
   * 必要性：必填
   * 业务场景：控制用户只能选择在有效范围内的年份
   * 与月视图关系：共享相同的日期范围限制
   */
  minDate: makeRequiredProp(Number),

  /**
   * 最大可选日期
   * 功能：限制年视图中可选择的最晚年份
   * 类型：13位时间戳
   * 必要性：必填
   * 业务场景：控制用户只能选择在有效范围内的年份
   * 与月视图关系：共享相同的日期范围限制
   */
  maxDate: makeRequiredProp(Number),

  /**
   * 日期格式化函数
   * 功能：自定义年视图中日期的显示和样式
   * 类型：CalendarFormatter函数
   * 必要性：可选
   * 业务场景：添加特殊标记、自定义文本、控制禁用状态等
   * 与月视图交互：可以通过formatter函数影响月视图中日期的显示
   */
  formatter: Function as PropType<CalendarFormatter>,

  /**
   * 最大日期范围
   * 功能：限制范围选择时的最大年限
   * 类型：数字
   * 必要性：可选
   * 业务场景：当type为范围选择时，控制可选择的最大年份跨度
   * 与月视图关系：在范围选择时与月视图共同遵守此限制
   */
  maxRange: Number,

  /**
   * 范围超出提示文案
   * 功能：当选择超出最大日期范围时的错误提示
   * 类型：字符串
   * 必要性：可选
   * 业务场景：提供用户友好的错误反馈
   * 与月视图关系：与月视图共享相同的提示文案
   */
  rangePrompt: String,

  /**
   * 是否允许选择同一天
   * 功能：控制范围选择时是否允许起止日期相同
   * 类型：布尔值
   * 默认值：false
   * 必要性：可选
   * 业务场景：如是否允许选择同一天作为范围的开始和结束
   * 与月视图关系：与月视图共享相同的配置
   */
  allowSameDay: makeBooleanProp(false),

  /**
   * 默认时间设置
   * 功能：为选中的日期设置默认的时分秒
   * 类型：二维数组，每个子数组包含[时,分,秒]三个数值
   * 必要性：可选
   * 业务场景：当需要精确到时间的选择时，提供默认时间设置
   * 与月视图交互：影响月视图中时间选择器的默认值
   */
  defaultTime: {
    type: [Array] as PropType<Array<number[]>>
  },

  /**
   * 是否显示标题
   * 功能：控制年视图是否显示标题栏
   * 类型：布尔值
   * 默认值：true
   * 必要性：可选
   * 业务场景：根据UI需求决定是否显示标题
   * 与月视图关系：独立的显示控制，与月视图的标题显示无关
   */
  showTitle: makeBooleanProp(true)
}

/**
 * 年视图组件属性类型
 * 设计思路：自动提取yearProps的类型定义
 * 使用场景：在TypeScript项目中提供完整的类型推断支持
 * 技术实现：使用Vue的ExtractPropTypes工具自动生成类型定义
 * 维护性：与yearProps对象保持同步，避免手动维护类型定义
 */
export type YearProps = ExtractPropTypes<typeof yearProps>
