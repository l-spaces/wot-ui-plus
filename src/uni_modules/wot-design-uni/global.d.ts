declare module 'vue' {
  // Helper for Volar
  export interface GlobalComponents {
    WdIcon: typeof import('./components/wd-icon/wd-icon.vue')['default']
    WdImg: typeof import('./components/wd-img/wd-img.vue')['default']
  }
}

export {}
