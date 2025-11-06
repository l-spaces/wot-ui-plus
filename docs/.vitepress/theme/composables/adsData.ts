/**
 * 广告数据管理模块
 *
 * 本模块是wot-ui-plus文档网站的广告数据加载和管理核心，提供了一个Vue组合式函数
 * 用于从多个备用数据源获取广告配置信息，并支持数据源故障转移机制，确保广告系统的高可用性。
 *
 * 核心功能：
 * - 定义广告数据类型接口
 * - 实现多数据源优先级加载策略
 * - 支持请求超时控制
 * - 提供错误捕获和故障转移机制
 * - 返回响应式的广告数据状态
 *
 * 设计思路：
 * - 使用Vue3组合式API设计模式
 * - 采用数据源列表按优先级排序的方式
 * - 实现自动故障转移，当主要数据源失败时尝试备用数据源
 * - 使用响应式引用存储广告数据
 * - 组件挂载时自动加载数据
 *
 * 使用场景：
 * - 文档网站广告位数据获取
 * - 需要高可用性的数据加载场景
 * - 多区域部署的数据备份需求
 *
 * 注意事项：
 * - 数据源URL列表需要按优先级正确排序
 * - 超时时间设置需要根据网络情况合理调整
 * - 依赖axios进行HTTP请求
 * - 请确保跨域访问权限配置正确
 */

import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 广告数据类型定义
 *
 * @interface AdData
 * @property {string} image - 广告图片URL，必需字段
 * @property {string} [title] - 广告标题，可选字段
 * @property {string} [link] - 广告链接地址，可选字段
 */
export type AdData = {
  image: string
  title?: string
  link?: string
}

// 创建响应式引用，用于存储从服务器获取的广告数据数组
const data = ref<AdData[]>([
  {
    image: 'https://sponsor.wot-ui.cn/assets/ads/wot-gitee.png',
    link: 'https://gitee.com/activity/2025opensource?ident=IEVXGS'
  }
])

export function useAds() {
  // 组件挂载时执行广告数据获取
  // onMounted(async () => {
  //   // 定义数据源URL列表，按优先级排序（第一个为主要数据源，后续为备用数据源）
  //   const urls = ['http://106.55.153.212/adsData.json']

  //   // 定义数据获取函数，实现多数据源故障转移逻辑
  //   const fetchData = async () => {
  //     // 遍历数据源URL列表，按优先级依次尝试获取数据
  //     for (const url of urls) {
  //       try {
  //         // 发送HTTP GET请求，添加时间戳参数避免缓存，设置5秒超时
  //         const response = await axios.get(url + '?t=' + Date.now(), {
  //           timeout: 5000 // 设置5秒超时，防止请求阻塞
  //         })
  //         // 成功获取数据后直接返回，验证响应数据结构并提取ads字段
  //         return response.data && response.data.ads ? response.data.ads : []
  //       } catch (error) {
  //         // 记录警告信息，但不中断循环
  //         console.warn(`Failed to fetch from ${url}`)
  //         // 继续尝试下一个URL，实现故障转移
  //       }
  //     }
  //     // 所有数据源都失败时返回空数组，确保组件可以正常渲染
  //     return []
  //   }

  //   // 执行数据获取并更新响应式状态
  //   data.value = await fetchData()
  // })

  // 返回响应式数据，供组件使用
  return {
    data
  }
}
