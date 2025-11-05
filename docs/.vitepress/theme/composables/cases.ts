/**
 * 文档网站案例展示数据管理模块
 * 
 * 本模块负责管理和获取组件库文档网站的案例展示数据，
 * 提供了案例数据的类型定义和数据获取功能。通过多数据源
 * 容错机制确保即使主数据源不可用，也能从备用源获取数据，
 * 提高了文档网站的稳定性和可靠性。
 * 
 * 主要功能：
 * 1. 定义案例展示相关数据类型
 * 2. 实现多数据源容错的数据获取机制
 * 3. 提供响应式数据管理
 * 4. 处理案例图片URL的自动拼接，确保正确显示
 * 
 * 使用场景：
 * - 在文档网站中展示组件库的实际应用案例
 * - 为用户提供参考示例，展示组件库的使用效果
 * 
 * 注意事项：
 * - 数据获取采用异步方式，需在组件挂载后才能获取完整数据
 * - 数据源配置可根据需要在内部进行调整
 * - 图片URL会自动与数据源域名拼接，确保正确访问
 */
import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 案例展示数据接口
 */
export type CaseData = {
  /** 案例名称 */
  name: string
  /** 案例预览图片路径 */
  image: string
  /** 案例描述（可选） */
  description?: string
}

/**
 * 响应式案例数据存储
 */
const data = ref<CaseData[]>([])

/**
 * 案例展示数据管理组合式函数
 * 
 * @returns {Object} 包含响应式数据源的对象
 * @returns {ref<CaseData[]>} returns.data - 案例数据列表
 * 
 * @example
 * // 在组件中使用
 * <script setup>
 * import { useCaseData } from '@theme/composables/cases'
 * 
 * const { data: cases } = useCaseData()
 * </script>
 * 
 * <template>
 *   <div v-if="cases.length > 0" class="cases-grid">
 *     <div 
 *       v-for="caseItem in cases" 
 *       :key="caseItem.name" 
 *       class="case-card"
 *     >
 *       <img :src="caseItem.image" :alt="caseItem.name" class="case-image" />
 *       <h3 class="case-name">{{ caseItem.name }}</h3>
 *       <p v-if="caseItem.description" class="case-description">{{ caseItem.description }}</p>
 *     </div>
 *   </div>
 * </template>
 */
export function useCaseData() {
  // 在组件挂载后异步获取案例数据
  onMounted(async () => {
    // 定义数据源URL列表，按优先级排序
    const urls = ['http://106.55.153.212/cases.json']

    /**
     * 多数据源容错获取函数
     * 
     * 依次尝试从多个数据源获取数据，任一数据源成功即返回结果，
     * 并处理图片URL的自动拼接，所有数据源失败时返回空数组
     * 
     * @returns {Promise<CaseData[]>} 处理后的案例数据列表
     */
    const fetchData = async () => {
      // 遍历所有数据源，按优先级尝试获取
      for (const url of urls) {
        try {
          // 定义API路径
          const path = '/cases.json'
          // 添加时间戳参数避免缓存问题，设置5秒超时
          const response = await axios.get(url + path + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          // 确保数据格式正确
          const rawData: CaseData[] = response.data && response.data.data ? response.data.data : []
          // 处理返回的数据，主要是拼接图片URL
          return rawData.map(item => {
            return {
              name: item.name,
              image: item.image ? url + item.image : '', // 拼接图片完整URL
              description: item.description
            }
          })
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



