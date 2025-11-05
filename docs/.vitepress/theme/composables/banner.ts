/**
 * 文档网站横幅广告数据管理模块
 * 
 * 本模块负责管理和获取组件库文档网站的横幅广告数据，
 * 提供了广告数据的类型定义和数据获取功能。通过多数据源
 * 容错机制确保即使主数据源不可用，也能从备用源获取数据，
 * 提高了文档网站的稳定性和可靠性。
 * 
 * 主要功能：
 * 1. 定义横幅广告相关数据类型
 * 2. 实现多数据源容错的数据获取机制
 * 3. 提供响应式数据管理
 * 
 * 使用场景：
 * - 在文档网站顶部或关键位置展示横幅广告
 * - 为组件库提供推广和营销支持
 * 
 * 注意事项：
 * - 数据获取采用异步方式，需在组件挂载后才能获取完整数据
 * - 数据源配置可根据需要在内部进行调整
 */
import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 横幅广告数据接口
 */
export type BannerData = {
  /** 广告动作标识，用于区分不同类型的广告行为 */
  action: string
  /** 广告标题文本 */
  title: string
  /** 广告跳转链接 */
  link: string
}

/**
 * 响应式横幅广告数据存储
 */
const data = ref<BannerData[]>([])

/**
 * 横幅广告数据管理组合式函数
 * 
 * @returns {Object} 包含响应式数据源的对象
 * @returns {ref<BannerData[]>} returns.data - 横幅广告数据列表
 * 
 * @example
 * // 在组件中使用
 * <script setup>
 * import { useBanner } from '@theme/composables/banner'
 * 
 * const { data: banners } = useBanner()
 * </script>
 * 
 * <template>
 *   <div v-if="banners.length > 0">
 *     <a 
 *       v-for="banner in banners" 
 *       :key="banner.action" 
 *       :href="banner.link" 
 *       target="_blank"
 *       class="banner-item"
 *     >
 *       {{ banner.title }}
 *     </a>
 *   </div>
 * </template>
 */
export function useBanner() {
  // 在组件挂载后异步获取横幅广告数据
  onMounted(async () => {
    // 定义数据源URL列表，按优先级排序
    const urls = ['http://106.55.153.212/banner.json']
    /**
     * 多数据源容错获取函数
     * 
     * 依次尝试从多个数据源获取数据，任一数据源成功即返回结果，
     * 所有数据源失败时返回空数组
     * 
     * @returns {Promise<BannerData[]>} 横幅广告数据列表
     */
    const fetchData = async () => {
      // 遍历所有数据源，按优先级尝试获取
      for (const url of urls) {
        try {
          // 添加时间戳参数避免缓存问题，设置5秒超时
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          // 成功获取数据后直接返回，确保数据格式正确
          return response.data && response.data.data ? response.data.data : []
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
    data
  }
}



