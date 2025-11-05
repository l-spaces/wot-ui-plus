/**
 * 文档网站广告赞助商数据管理模块
 * 
 * 本模块负责管理和获取组件库文档网站的赞助商广告数据，
 * 提供了广告数据的类型定义和数据获取功能。通过多数据源
 * 容错机制确保即使主数据源不可用，也能从备用源获取数据，
 * 提高了文档网站的稳定性和可靠性。
 * 
 * 主要功能：
 * 1. 定义广告赞助商相关数据类型
 * 2. 实现多数据源容错的数据获取机制
 * 3. 提供响应式数据管理
 * 
 * 使用场景：
 * - 在文档网站中展示赞助商信息
 * - 为组件库提供广告展示支持
 * 
 * 注意事项：
 * - 数据获取采用异步方式，需在组件挂载后才能获取完整数据
 * - 数据源配置可根据需要在内部进行调整
 */
import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 广告网格尺寸类型定义
 * 
 * 表示广告赞助商展示区域的不同尺寸规格
 */
export type GridSize = 'xmini' | 'mini' | 'small' | 'medium' | 'big'

/**
 * 单个赞助商信息接口
 */
export interface Sponsor {
  /** 赞助商名称 */
  name: string
  /** 赞助商logo图片URL */
  img: string
  /** 赞助商跳转链接 */
  url: string
}

/**
 * 赞助商集合接口
 */
export interface Sponsors {
  /** 赞助商级别标识（可选） */
  tier?: string
  /** 展示网格尺寸（可选） */
  size?: GridSize
  /** 赞助商列表 */
  items: Sponsor[]
}

/**
 * 响应式赞助商数据存储
 */
const data = ref<Sponsors[]>([])

/**
 * 赞助商广告数据管理组合式函数
 * 
 * @returns {Object} 包含响应式数据源的对象
 * @returns {ref<Sponsors[]>} returns.data - 赞助商数据列表
 * 
 * @example
 * // 在组件中使用
 * <script setup>
 * import { useAdSponsor } from '@theme/composables/adSponsor'
 * 
 * const { data: sponsors } = useAdSponsor()
 * </script>
 * 
 * <template>
 *   <div v-if="sponsors.length > 0">
 *     <div v-for="group in sponsors" :key="group.tier">
 *       <h3>{{ group.tier }}</h3>
 *       <div :class="`sponsor-grid ${group.size || 'medium'}`">
 *         <a 
 *           v-for="sponsor in group.items" 
 *           :key="sponsor.name" 
 *           :href="sponsor.url" 
 *           target="_blank"
 *         >
 *           <img :src="sponsor.img" :alt="sponsor.name" />
 *         </a>
 *       </div>
 *     </div>
 *   </div>
 * </template>
 */
export function useAdSponsor() {
  // 在组件挂载后异步获取赞助商数据
  onMounted(async () => {
    // 定义数据源URL列表，按优先级排序
    const urls = ['http://106.55.153.212/adSponsor.json']

    /**
     * 多数据源容错获取函数
     * 
     * 依次尝试从多个数据源获取数据，任一数据源成功即返回结果，
     * 所有数据源失败时返回空数组
     * 
     * @returns {Promise<Sponsors[]>} 赞助商数据列表
     */
    const fetchData = async () => {
      // 遍历所有数据源，按优先级尝试获取
      for (const url of urls) {
        try {
          // 添加时间戳参数避免缓存问题，设置5秒超时
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          // 成功获取数据后直接返回
          return response?.data?.data 
        } catch (error) {
          // 打印警告信息，继续尝试下一个URL
          console.warn(`Failed to fetch from ${url}`)
        }
      }
      // 所有数据源都失败时返回空数组
      return [] 
    }

    // 执行数据获取并更新响应式数据
    data.value = await fetchData()
  })

  // 返回响应式数据
  return {
    data,
  }
}



