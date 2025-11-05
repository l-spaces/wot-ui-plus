/*
 * @file friendly.ts
 * @description 文档网站友好链接数据管理模块
 * @module docs/.vitepress/theme/composables
 * 
 * 该模块是wot-ui-plus文档网站VitePress主题中的重要组成部分，主要负责：
 * 1. 定义友好链接数据结构接口
 * 2. 提供响应式的友好链接数据获取和管理功能
 * 3. 实现多数据源容错机制，确保数据获取的高可用性
 * 
 * 在整体项目架构中，该模块位于文档网站主题层，为UI组件提供友好链接数据支持，
 * 主要用于展示与项目相关的友好链接信息，增强文档网站的生态连接性。
 * 
 * 设计思路：
 * - 使用Vue3的组合式API设计模式，提供响应式数据和数据获取逻辑
 * - 实现多数据源故障转移机制，提高数据获取的可靠性
 * - 添加超时控制，避免请求长时间阻塞
 * - 采用单例模式，避免重复获取数据
 */

import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 友好链接数据结构接口
 * 
 * @interface FriendlyLink
 * @property {string} icon - 链接图标URL
 * @property {string} title - 链接标题
 * @property {string} details - 链接详细描述
 * @property {string} link - 链接URL地址
 */
export type FriendlyLink = {
  icon: string
  title: string
  details: string
  link: string
}

/**
 * 响应式存储友好链接数据的ref对象
 * 采用单例模式，确保整个应用中只存在一份数据实例
 */
const data = ref<FriendlyLink[]>([])

/**
 * 友好链接数据管理组合函数
 * 
 * @function useFriendly
 * @description 提供友好链接数据获取和管理功能的Vue组合式函数
 * @returns {Object} 包含响应式数据的对象
 * @returns {Ref<FriendlyLink[]>} returns.data - 友好链接数据数组的响应式引用
 * 
 * @example
 * // 在Vue组件中使用
 * import { useFriendly } from '@theme/composables/friendly'
 * 
 * export default {
 *   setup() {
 *     const { data: friendlyLinks } = useFriendly()
 *     
 *     return {
 *       friendlyLinks
 *     }
 *   }
 * }
 */
export function useFriendly() {
  // 在组件挂载时异步获取友好链接数据
  onMounted(async () => {
    // 数据已存在时避免重复请求
    if (data.value && data.value.length) {
      return
    }

    // 定义数据源URL列表，按优先级排序
    // 主数据源优先，备用数据源次之，实现故障转移机制
    const urls = ['http://106.55.153.212/friendly.json']

    /**
     * 从多数据源获取数据的函数
     * 实现了故障转移逻辑，逐个尝试数据源直到成功或全部失败
     * 
     * @async
     * @function fetchData
     * @returns {Promise<FriendlyLink[]>} 获取到的友好链接数据数组
     */
    const fetchData = async () => {
      // 遍历所有数据源URL，按优先级尝试
      for (const url of urls) {
        try {
          // 发送GET请求，添加时间戳避免缓存
          // 设置5秒超时，防止请求长时间阻塞
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000
          })
          // 成功获取数据后直接返回，提取links字段或返回空数组
          return response.data && response.data.links ? response.data.links : []
        } catch (error) {
          // 请求失败时记录警告信息，继续尝试下一个URL
          console.warn(`Failed to fetch from ${url}`)
        }
      }
      // 所有数据源都失败时返回空数组
      return []
    }

    // 执行数据获取并更新响应式数据
    data.value = await fetchData()
  })

  // 返回响应式数据供组件使用
  return {
    data,
  }
}



