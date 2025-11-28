import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../common/props'

export const abcProps = {
  ...baseProps
}

export type AbcProps = ExtractPropTypes<typeof abcProps>
