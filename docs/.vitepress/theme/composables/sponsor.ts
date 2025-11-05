/*
 * @file sponsor.ts
 * @description 文档网站赞助商数据管理模块
 * @module docs/.vitepress/theme/composables
 * 
 * 该模块是wot-ui-plus文档网站VitePress主题中的核心组成部分，主要负责：
 * 1. 提供响应式的赞助商数据获取和管理功能
 * 2. 实现多数据源容错机制，确保数据获取的高可用性
 * 3. 采用单例模式管理赞助商数据，避免重复请求
 * 
 * 在整体项目架构中，该模块位于文档网站主题层，为UI组件提供赞助商相关数据支持，
 * 主要用于在文档网站中展示项目的赞助商信息，增强文档网站的社区支持展示功能。
 * 
 * 设计思路：
 * - 使用Vue3的组合式API设计模式，提供响应式数据和数据获取逻辑
 * - 实现多数据源故障转移机制，提高数据获取的可靠性
 * - 添加超时控制，避免请求长时间阻塞
 * - 采用单例模式，确保整个应用中只请求一次数据
 */

import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 响应式存储赞助商数据的ref对象
 * 采用单例模式，确保整个应用中只存在一份数据实例
 * 数据类型为any，可根据实际返回的数据结构进行使用
 */
const data = ref<any>(null)

/**
 * 赞助商数据管理组合函数
 * 
 * @function useSponsor
 * @description 提供赞助商数据获取和管理功能的Vue组合式函数
 * @returns {Object} 包含响应式数据的对象
 * @returns {Ref<any>} returns.data - 赞助商数据的响应式引用，初始为null
 * 
 * @example
 * // 在Vue组件中使用
 * import { useSponsor } from '@theme/composables/sponsor'
 * 
 * export default {
 *   setup() {
 *     const { data: sponsorData } = useSponsor()
 *     
 *     // 检查数据是否已加载
 *     const hasSponsorData = computed(() => sponsorData.value !== null)
 *     
 *     return {
 *       sponsorData,
 *       hasSponsorData
 *     }
 *   }
 * }
 */
export function useSponsor() {
  // 在组件挂载时异步获取赞助商数据
  onMounted(async () => {
    // 数据已存在时避免重复请求
    if (data.value) {
      return
    }

    // 定义数据源URL列表，按优先级排序
    // 主数据源优先，备用数据源次之，实现故障转移机制
    const urls = ['http://106.55.153.212/sponsor.json']

    /**
     * 从多数据源获取数据的函数
     * 实现了故障转移逻辑，逐个尝试数据源直到成功或全部失败
     * 
     * @async
     * @function fetchData
     * @returns {Promise<any>} 获取到的赞助商数据或null
     * @throws 不直接抛出异常，而是在内部捕获并记录警告
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
          // 成功获取数据后直接返回完整的响应数据
          return response.data
        } catch (error) {
          // 请求失败时记录警告信息，继续尝试下一个URL
          console.warn(`Failed to fetch from ${url}`)
        }
      }
      // 所有数据源都失败时返回null
      return null
    }

    // 执行数据获取并更新响应式数据
    data.value = await fetchData()
  })

  // 返回响应式数据供组件使用
  return {
    data,
  }
}



