import type { CSSProperties, ExtractPropTypes, InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeRequiredProp, numericProp } from '../common/props'
import type { TableColumnProps } from '../wd-table-col/types'
import type { PropType } from 'vue'

export const tableProps = {
  ...baseProps,
  /**
   * 显示的数据
   */
  data: makeRequiredProp(Array<Record<string, any>>),
  /**
   * 是否带有边框
   */
  border: makeBooleanProp(true),
  /**
   * 是否为斑马纹 table
   */
  stripe: makeBooleanProp(true),
  /**
   * Table 的高度
   */
  height: numericProp,
  /**
   * 行高
   */
  rowHeight: makeNumericProp(40),
  /**
   * 是否显示表头
   */
  showHeader: makeBooleanProp(true),
  /**
   * 是否超出2行隐藏
   */
  ellipsis: makeBooleanProp(true),
  /**
   * 是否显示索引列
   */
  index: {
    type: [Object, Boolean] as PropType<boolean | Omit<Partial<TableColumnProps>, 'prop'>>,
    default: false
  },
  /**
   * 是否固定表头
   */
  fixedHeader: makeBooleanProp(true),
  /**
   * 空数据时显示的文本
   */
  emptyText: {
    type: String,
    default: () => '暂无数据'
  },
  /**
   * 空数据区域高度，单位为px
   */
  emptyHeight: {
    type: [String, Number],
    default: 100
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export type TableProvide = {
  props: Omit<TableProps, 'index' | 'customStyle' | 'customClass'>
  state: {
    scrollLeft: number
  }
  rowClick: (index: number) => void
  getIsLastFixed: (column: { fixed: boolean; prop: string }) => boolean
  getFixedStyle: (index: number, style: CSSProperties) => CSSProperties
}

export const TABLE_KEY: InjectionKey<TableProvide> = Symbol('wd-table')
