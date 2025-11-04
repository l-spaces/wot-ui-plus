<!--
 * @Author: weisheng
 * @Date: 2024-10-12 13:07:08
 * @LastEditTime: 2025-10-31 13:47:04
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-ui-plus/src/App.vue
 * 记得注释
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide, onThemeChange } from '@dcloudio/uni-app'
import { useDark } from './store'
import { useI18nSync } from './hooks/useI18nSync'
import { useIframeMessage } from './hooks/useIframeMessage'
import { getSystemInfo } from './uni_modules/wot-design-uni/components/common/util'

/**
 * 深色模式状态管理实例
 *
 * @description 从全局状态管理模块获取深色模式相关的响应式状态和方法
 * @returns {Object} 包含isDark响应式状态和setDark方法的对象
 */
const darkMode = useDark()

/**
 * 国际化设置方法
 *
 * @description 从国际化同步hook中解构出setLocale方法
 * @param {string} locale - 语言代码，如'zh-CN'、'en-US'等
 * @returns {string} 设置成功的语言代码
 */
const { setLocale } = useI18nSync() // 禁用内置的iframe消息监听，使用专门的hook处理

/**
 * 初始化iframe消息处理
 *
 * @description 配置iframe消息监听，处理从父窗口传来的语言和主题变更通知
 * @param {Object} options - 消息处理配置选项
 * @param {Function} options.onLocaleChange - 语言变更回调函数
 * @param {Function} options.onThemeChange - 主题变更回调函数
 */
useIframeMessage({
  /**
   * 语言变更处理函数
   *
   * @param {string} locale - 新的语言代码
   * @description 当接收到语言变更消息时，更新应用语言设置
   */
  onLocaleChange: (locale) => {
    setLocale(locale)
  },

  /**
   * 主题变更处理函数
   *
   * @param {boolean} isDark - 是否启用深色主题
   * @description 当接收到主题变更消息时，更新应用的深色模式状态
   */
  onThemeChange: (isDark) => {
    darkMode.setDark(isDark)
  }
})

/**
 * 系统主题变更监听
 *
 * @param {Object} option - 主题变更参数
 * @param {string} option.theme - 新的主题类型，'dark'表示深色主题
 * @description 监听系统主题变化，自动同步到应用主题设置
 */
onThemeChange((option) => {
  darkMode.setDark(option.theme === 'dark')
})

/**
 * 应用启动时执行
 *
 * @description 应用初始化时获取系统信息，设置初始主题状态
 * 关键逻辑：通过uni.getSystemInfoSync()获取系统主题信息，设置初始深色模式状态
 */
onLaunch(() => {
  // 获取系统信息
  const systemInfo = getSystemInfo()
  // 根据系统主题设置深色模式
  darkMode.setDark(systemInfo.theme === 'dark')
})

/**
 * 应用显示时执行
 *
 * @description 当应用从后台切换到前台时触发
 * 功能：在控制台输出日志，用于调试和监控
 */
onShow(() => {
  console.log('App Show')
})

/**
 * 应用隐藏时执行
 *
 * @description 当应用从前台切换到后台时触发
 * 功能：在控制台输出日志，用于调试和监控
 */
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import './iconfont/index.css';

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

page {
  margin: 0;
  padding: 0;
  font-family: San Francisco, Rotobo, arial, PingFang SC, Noto SansCJK, Microsoft Yahei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  background: #f8f9fa;
}
</style>
