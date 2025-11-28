import type { ExtractPropTypes } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'
import type { FormItemRule } from '../wd-form/types'

export const formItemProps = {
  ...baseProps,
  /** 表单域模型字段名 */
  prop: makeRequiredProp(String),
  /** 表单域校验规则 */
  rules: makeArrayProp<FormItemRule>(),
  /** 是否必填 */
  required: Boolean,
  /** 是否居中对齐 */
  center: makeBooleanProp(false),
  /** 标签文本 */
  label: String,
  /** 标签宽度 */
  labelWidth: makeStringProp('100px'),
  /** 是否显示为链接 */
  isLink: Boolean
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
