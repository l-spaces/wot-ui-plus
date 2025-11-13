/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2025-05-07 22:06:37
 * @LastEditors: weisheng
 * @Description: Vite 构建配置文件 - wot-ui-plus UniApp 跨端 UI 组件库
 * @FilePath: /wot-ui-plus/vite.config.ts
 *
 * 配置文件说明：
 * 本配置文件基于 Vite 5.x 构建，专为 wot-ui-plus UniApp 跨端 UI 组件库设计
 * 支持多端构建：H5、微信小程序、App 等平台
 * 集成组件自动导入、代码压缩等优化功能
 *
 * 主要功能模块：
 * 1. 基础构建配置：设置构建目标和基础路径
 * 2. 插件系统：集成 UniApp 插件和组件自动导入
 * 3. 平台差异化处理：针对 H5 平台的特殊优化
 * 4. 性能优化：关闭 sourcemap 以减小打包体积
 */

import { defineConfig } from 'vite'

// H5 平台专用插件 - 用于生成 gzip 压缩文件，减少网络传输大小
// #ifdef H5
import viteCompression from 'vite-plugin-compression'
// #endif

// UniApp 官方 Vite 插件，提供跨平台构建能力
import uni from '@dcloudio/vite-plugin-uni'
// 组件自动导入插件，自动识别和注册 wot-ui-plus 组件
import Components from '@uni-helper/vite-plugin-uni-components'

export default defineConfig({
  /**
   * 基础路径配置
   * 设置为 './' 确保在所有部署环境中都能正确加载资源
   * 适用于相对路径部署的场景，提高部署灵活性
   */
  base: './',

  /**
   * 插件配置
   * 按顺序加载插件，确保插件间的依赖关系正确
   */
  plugins: [
    /**
     * 组件自动导入插件
     * 功能：
     * - 自动扫描并注册 wot-ui-plus 组件
     * - 支持按需导入，减少打包体积
     * - 提供类型提示，提升开发体验
     */
    Components(),

    /**
     * UniApp 核心插件
     * 功能：
     * - 提供跨平台构建能力（H5、小程序、App）
     * - 处理平台差异和条件编译
     * - 集成 UniApp 生命周期和 API
     */
    uni(),

    // H5 平台专用插件 - 代码压缩优化
    /**
     * Gzip 压缩插件（仅 H5 平台）
     * 功能：
     * - 自动生成 .gz 压缩文件
     * - 减少网络传输大小，提升加载速度
     * - 支持浏览器自动解压，无需额外配置
     *
     * 注意：仅在 H5 环境下启用，小程序和 App 不需要此功能
     */
    // #ifdef H5
    viteCompression()
    // #endif
  ],

  /**
   * 构建配置
   * 控制打包输出的相关设置
   */
  build: {
    /**
     * 构建目标配置
     * 设置为 'es2015' 确保兼容性：
     * - 支持现代浏览器（Chrome 51+、Safari 10+）
     * - 兼容小程序基础库 2.0+
     * - 平衡新特性和兼容性需求
     */
    target: 'es2015',

    /**
     * 源码映射配置
     * 设置为 false 以优化生产环境：
     * - 关闭 sourcemap 文件生成
     * - 显著减小打包体积（可减少 30-50%）
     * - 提升生产环境加载性能
     *
     * 开发环境可通过环境变量单独控制
     */
    // 关闭生成 map 文件，可以达到缩小打包体积的目的
    sourcemap: false // 生产环境一定要关闭，不然打包的产物会很大
  }
})
