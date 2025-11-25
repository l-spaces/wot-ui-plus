/*
 * @file index.ts
 * @description VitePress主题配置与扩展文件
 * @module docs/.vitepress/theme
 * 
 * 该文件是wot-ui-plus文档网站VitePress主题的核心配置文件，主要负责：
 * 1. 导入并扩展默认的VitePress主题
 * 2. 注册自定义全局组件和第三方组件库
 * 3. 配置页面布局插槽，实现自定义页面结构
 * 4. 添加站点迁移检测功能
 * 5. 集成百度统计路由监听
 * 
 * 在整体项目架构中，该文件位于文档网站的主题层核心位置，作为VitePress主题系统的入口，
 * 控制整个文档网站的外观、组件注册和功能增强，为文档网站提供统一的UI和交互体验。
 * 
 * 设计思路：
 * - 采用组合式API设计模式，通过h函数创建虚拟DOM节点
 * - 利用VitePress的插槽系统自定义页面布局
 * - 实现站点迁移检测和用户友好的跳转提示
 * - 集成百度统计，实现页面访问分析
 * 
 * 主要对外暴露：
 * - 默认导出的主题配置对象，包含Layout组件和enhanceApp函数
 */

import { h } from 'vue'
import Theme from 'vitepress/theme'
// 导入自定义样式文件
import './styles/vars.css' // 变量样式
import './styles/custom.css' // 自定义样式
import './styles/scrollbar.scss' // 滚动条样式

// 导入自定义组件
import HomeFriendly from './components/HomeFriendly.vue' // 首页友好链接组件
import NavBarTitleAfter from './components/NavBarTitleAfter.vue' // 导航栏标题后组件
import CustomFooter from './components/CustomFooter.vue' // 自定义页脚组件
import SvgImage from './components/SvgImage.vue' // SVG图片组件
import HomeStar from './components/HomeStar.vue' // 首页Star组件
import ExternalLink from './components/ExternalLink.vue' // 外部链接组件
import WwAds from './components/WwAds.vue' // 广告组件
import SpecialSponsor from './components/SpecialSponsor.vue' // 特别赞助商组件
import Banner from './components/Banner.vue' // 横幅组件

// 导入第三方组件库
import ElementPlus, { ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css' // Element Plus默认样式
import 'element-plus/theme-chalk/dark/css-vars.css' // Element Plus暗色主题

// 声明百度统计全局变量类型
declare global {
  interface Window {
    _hmt: any[]
  }
}

/**
 * VitePress主题配置对象
 * 扩展了默认的VitePress主题，添加了自定义布局和功能增强
 */
export default {
  ...Theme, // 扩展默认主题
  
  /**
   * 自定义Layout组件
   * 通过VitePress的插槽系统自定义页面结构
   * 
   * @function Layout
   * @returns {VNode} 返回由Vue h函数创建的虚拟DOM节点
   * 
   * 插槽说明：
   * - layout-top: 页面顶部区域，用于显示横幅
   * - home-hero-info-after: 首页hero信息后区域，用于显示Star信息
   * - home-hero-after: 首页hero区域后，用于显示特别赞助商
   * - home-features-after: 首页特性区域后，用于显示友好链接
   * - layout-bottom: 页面底部区域，用于显示自定义页脚
   * - nav-bar-title-after: 导航栏标题后区域
   * - aside-outline-after: 侧边栏大纲后区域，用于显示广告
   */
  Layout() {
    return h(Theme.Layout, null, {
      // 通过插槽注入自定义组件
      'layout-top': () => h(Banner), // 页面顶部横幅
      'home-hero-info-after': () => h(HomeStar), // 首页Star信息
      'home-hero-after': () => h(SpecialSponsor), // 特别赞助商展示
      'home-features-after': () => h(HomeFriendly), // 首页友好链接
      'layout-bottom': () => h(CustomFooter), // 自定义页脚
      'nav-bar-title-after': () => h(NavBarTitleAfter), // 导航栏标题后内容
      'aside-outline-after': () => h(WwAds), // 侧边栏广告
    })
  },
  
  /**
   * 应用增强函数
   * 用于注册全局组件、添加插件和执行其他初始化逻辑
   * 
   * @function enhanceApp
   * @param {Object} context - VitePress提供的上下文对象
   * @param {App} context.app - Vue应用实例
   * @param {Router} context.router - VitePress路由器实例
   * 
   * 主要功能：
   * 1. 注册全局组件
   * 2. 使用Element Plus组件库
   * 3. 添加站点迁移检测
   * 4. 集成百度统计路由监听
   */
  enhanceApp({ app, router }: { app: any; router: any }) {
    // 注册自定义全局组件
    app.component('SvgImage', SvgImage)
    app.component('ExternalLink', ExternalLink)
    
    // 使用Element Plus组件库
    app.use(ElementPlus)
    
    // 站点迁移检测功能
    // if (typeof window !== 'undefined') {
    //   /**
    //    * 检查站点迁移状态
    //    * 当用户访问旧域名时，提示用户跳转到新域名
    //    * 
    //    * @async
    //    * @function checkSiteMigration
    //    * @returns {Promise<void>}
    //    */
    //   const checkSiteMigration = async () => {
    //     // 检测是否为旧域名
    //     if (window.location.hostname === 'wot-ui-plus.pages.dev') {
    //       try {
    //         // 使用Element Plus的MessageBox弹出确认对话框
    //         await ElMessageBox.confirm(
    //           '站点已迁移至新域名，为了获得更好的访问体验，建议您跳转到新站点。',
    //           '站点迁移通知',
    //           {
    //             confirmButtonText: '立即跳转',
    //             cancelButtonText: '稍后再说',
    //             type: 'warning',
    //             center: true
    //           }
    //         )
    //         // 用户点击确认后，保持当前路径跳转到新域名
    //         const newUrl = `https://wot-ui.cn${window.location.pathname}${window.location.search}${window.location.hash}`
    //         window.location.href = newUrl
    //       } catch {
    //         // 用户点击取消或关闭对话框，不做任何操作
    //       }
    //     }
    //   }
      
    //   // 页面加载完成后执行迁移检测
    //   if (document.readyState === 'loading') {
    //     document.addEventListener('DOMContentLoaded', checkSiteMigration)
    //   } else {
    //     checkSiteMigration()
    //   }
      
    //   /**
    //    * 百度统计页面访问跟踪函数
    //    * 调用百度统计的_trackPageview方法记录页面访问
    //    * 
    //    * @function trackPageView
    //    * @param {string} path - 要跟踪的页面路径
    //    */
    //   // const trackPageView = (path: string) => {
    //   //   if (window._hmt) {
    //   //     window._hmt.push(['_trackPageview', path])
    //   //   }
    //   // }
      
    //   // 监听路由变化，实现单页应用的页面访问统计
    //   router.onAfterRouteChanged = (to: string) => {
    //     // 延迟执行，确保页面已完全加载
    //     setTimeout(() => {
    //       //  trackPageView(to)
    //     }, 100)
    //   }
    // }
  },
}
