import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../common/props'

export const videoPreviewProps = {
  ...baseProps
}

export type PreviewVideo = {
  url: string // 视频资源地址
  poster?: string // 视频封面
  title?: string // 视频标题
}

export type VideoPreviewProps = ExtractPropTypes<typeof videoPreviewProps>

export type VideoPreviewExpose = {
  // 打开弹框
  open: (video: PreviewVideo) => void
  // 关闭弹框
  close: () => void
}

export type VideoPreviewInstance = ComponentPublicInstance<VideoPreviewExpose, VideoPreviewProps>
