import type { ComponentInternalInstance, InjectionKey } from 'vue'

export type stickyBoxProvide = {
  boxStyle: {
    height: number // 高度
    width: number // 宽度
  }
  observerForChild: (child: ComponentInternalInstance) => void // 监听子组件
}

export const STICKY_BOX_KEY: InjectionKey<stickyBoxProvide> = Symbol('wd-sticky-box')
