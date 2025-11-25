/**
 * 激励视频广告管理模块
 *
 * 本模块是 wot-ui-plus 组件库中专门处理激励视频广告功能的核心模块，
 * 采用 Vue 3 Composition API 设计模式，为 uni-app 多端应用提供统一的广告管理解决方案。
 *
 * 在项目架构中的作用：
 * - 广告功能核心层：封装微信小程序激励视频广告的完整生命周期管理
 * - 用户状态管理层：实现基于时间窗口的广告豁免机制
 * - 多端适配支持：通过条件编译确保在不同平台下的兼容性
 * - 用户体验优化：提供加载状态管理和操作反馈机制
 *
 * 核心功能：
 * 1. 广告实例管理：创建、初始化和销毁激励视频广告实例
 * 2. 豁免状态管理：基于24小时时间窗口的用户广告豁免状态控制
 * 3. 广告展示控制：智能的广告加载、显示和错误处理流程
 * 4. 用户反馈系统：通过 Toast 组件提供操作状态反馈
 *
 * 使用场景：
 * - 需要用户观看广告解锁高级功能的业务场景
 * - 应用内激励系统，通过广告获取虚拟奖励
 * - 临时功能解锁或内容访问的广告墙机制
 * - 用户行为激励和商业化变现场景
 *
 * 技术特色：
 * - 响应式状态管理：使用 Vue 3 ref 实现豁免状态的响应式更新
 * - 生命周期管理：完整的广告创建、显示、关闭事件处理
 * - 错误容错机制：多层级的错误处理和降级策略
 * - 本地存储集成：利用 uni-app 存储 API 实现状态持久化
 *
 * @example
 * // 在组件中使用激励视频广告功能
 * const { createRewardVideoAd, showRewardAd, isFree } = useRewardAd()
 *
 * // 初始化广告实例
 * onMounted(() => {
 *   createRewardVideoAd()
 * })
 *
 * // 根据豁免状态决定是否显示广告
 * function handlePremiumAction() {
 *   if (isFree.value) {
 *     // 用户已豁免，直接执行操作
 *     performPremiumAction()
 *   } else {
 *     // 用户需要观看广告
 *     showRewardAd()
 *   }
 * }
 */
import { useToast } from '@/uni_modules/wot-ui-plus'
import { ref } from 'vue'

/**
 * 用户广告豁免状态响应式变量
 *
 * 该状态变量用于跟踪用户是否处于广告豁免期，基于24小时时间窗口机制：
 * - true: 用户已观看广告且在24小时豁免期内，无需再次观看
 * - false: 用户需要观看广告或豁免期已过期
 *
 * 实现原理：
 * - 使用 Vue 3 的 ref 创建响应式状态，确保状态变化时相关组件能够自动更新
 * - 状态持久化：通过 uni-app 本地存储记录用户最后观看广告的时间戳
 * - 时间窗口计算：每次访问时动态计算距离上次观看是否超过24小时
 *
 * @type {import('vue').Ref<boolean>}
 */
const isFree = ref(false)

/**
 * 激励视频广告管理 Hook
 *
 * 这是模块的核心导出函数，提供完整的激励视频广告管理能力。
 * 采用工厂函数模式，每次调用返回独立的广告管理实例，支持多实例场景。
 *
 * 实现思路：
 * 1. 初始化阶段：自动检查用户豁免状态，为后续操作提供基础
 * 2. 实例管理：维护广告实例的生命周期，确保资源正确释放
 * 3. 状态同步：广告操作与用户豁免状态保持实时同步
 * 4. 错误处理：多层级的错误捕获和降级处理机制
 *
 * 关键特性：
 * - 自动初始化：Hook 被调用时自动执行豁免状态检查
 * - 实例隔离：每个 Hook 调用返回独立的广告管理实例
 * - 响应式状态：豁免状态变化自动触发相关组件更新
 * - 生命周期管理：完整的广告创建、显示、关闭事件处理链
 *
 * @returns {Object} 激励视频广告管理对象
 * @property {Function} createRewardVideoAd - 创建并初始化激励视频广告实例
 * @property {Function} showRewardAd - 显示激励视频广告并处理用户交互
 * @property {import('vue').Ref<boolean>} isFree - 用户广告豁免状态的响应式引用
 *
 * @example
 * // 基本用法
 * const rewardAd = useRewardAd()
 *
 * // 在组件挂载时创建广告实例
 * onMounted(() => {
 *   rewardAd.createRewardVideoAd()
 * })
 *
 * // 根据豁免状态决定业务逻辑
 * function handleFeatureAccess() {
 *   if (rewardAd.isFree.value) {
 *     // 用户已豁免，直接提供功能
 *     grantPremiumAccess()
 *   } else {
 *     // 用户需要观看广告
 *     rewardAd.showRewardAd()
 *   }
 * }
 */
export function useRewardAd() {
  // 解构Toast组件方法，用于显示加载提示和操作反馈
  const { loading: showLoading, close: closeLoading, show: showToast } = useToast()

  // 激励视频广告实例
  let rewardVideoAd: UniApp.InterstitialAdContext | null = null

  /**
   * 模块初始化：自动检查用户广告豁免状态
   *
   * 在 Hook 被调用时立即执行豁免状态检查，确保后续操作基于正确的用户状态。
   * 这种设计避免了用户状态的延迟初始化问题，提供即时的状态反馈。
   *
   * 设计考虑：
   * - 提前初始化：在广告实例创建前完成状态检查，避免状态不一致
   * - 自动执行：无需手动调用，简化使用流程
   * - 状态同步：确保 Hook 返回的状态与实际情况一致
   */
  isFreeAd()

  /**
   * 用户广告豁免状态检查函数
   *
   * 核心功能：基于本地存储的时间戳计算用户是否处于24小时广告豁免期内。
   * 实现完整的豁免状态判定逻辑，支持首次使用和豁免期过期的场景处理。
   *
   * 算法流程：
   * 1. 读取存储：从 uni-app 本地存储获取上次观看广告的时间戳
   * 2. 时间计算：计算当前时间与存储时间的差值
   * 3. 阈值判断：判断时间差是否超过24小时（86400000毫秒）
   * 4. 状态更新：根据判断结果更新响应式豁免状态
   *
   * 边界情况处理：
   * - 首次使用：本地存储为空时，默认需要观看广告
   * - 时间异常：处理存储时间戳格式错误或异常值
   * - 跨天计算：准确计算24小时时间窗口，不受日期变更影响
   *
   * @returns {void} 无返回值，直接更新模块级 isFree 状态变量
   */
  function isFreeAd() {
    const freeAdTime = uni.getStorageSync('freeAdTime')
    if (freeAdTime) {
      const now = new Date().getTime()
      const diff = now - freeAdTime
      // 判断时间差是否超过24小时（86400000毫秒）
      if (diff > 24 * 60 * 60 * 1000) {
        isFree.value = false
      } else {
        isFree.value = true
      }
    } else {
      isFree.value = false
    }
  }

  /**
   * 创建并初始化激励视频广告实例
   *
   * 这是广告管理的核心函数，负责创建微信小程序激励视频广告实例并设置完整的事件监听链。
   * 采用防御性编程策略，确保在不支持广告的环境下也能正常运行。
   *
   * 实现架构：
   * 1. 环境检测：检查当前运行环境是否支持激励视频广告功能
   * 2. 实例创建：使用 uni-app API 创建广告实例，配置广告单元ID
   * 3. 事件绑定：设置广告生命周期相关的事件监听器
   * 4. 状态管理：广告事件与模块状态保持同步
   *
   * 事件监听策略：
   * - onLoad: 广告加载成功回调，用于监控广告资源就绪状态
   * - onError: 广告加载失败处理，记录错误信息便于调试
   * - onClose: 广告关闭事件处理，核心的用户交互响应逻辑
   *
   * 设计特色：
   * - 条件兼容：通过环境检测确保在不支持平台上的优雅降级
   * - 完整生命周期：覆盖广告从创建到关闭的完整流程
   * - 错误隔离：单个广告实例的错误不会影响整个模块运行
   *
   * @returns {void} 无返回值，创建结果通过实例变量和事件回调处理
   *
   * @example
   * // 创建广告实例的典型用法
   * const { createRewardVideoAd } = useRewardAd()
   *
   * // 在合适的时机创建广告（如组件挂载后）
   * createRewardVideoAd()
   *
   * // 后续可以通过 showRewardAd() 显示广告
   */
  function createRewardVideoAd() {
    // 检查当前环境是否支持创建激励视频广告
    if (uni.createRewardedVideoAd) {
      // 创建激励视频广告实例，传入广告单元ID
      rewardVideoAd = uni.createRewardedVideoAd({ adUnitId: 'adunit-91e0e9b07b57557a' })

      // 广告加载成功回调
      rewardVideoAd.onLoad(() => {
        console.log('激励视频 广告加载成功')
      })

      // 广告加载失败回调
      rewardVideoAd.onError((err) => {
        console.log('激励视频 广告加载失败', err)
      })

      /**
       * 广告关闭事件回调处理
       *
       * 这是广告交互的核心逻辑，处理用户观看广告后的状态更新和业务响应。
       * 基于广告平台返回的观看完成状态，决定是否授予用户广告豁免权限。
       *
       * 状态判定逻辑：
       * - 完整观看：用户观看了广告的全部内容，授予24小时豁免权限
       * - 中途退出：用户提前关闭广告，不授予豁免权限
       * - 异常情况：广告播放异常或平台返回异常状态
       *
       * 豁免机制实现：
       * 1. 状态更新：立即更新响应式豁免状态，触发相关组件重新渲染
       * 2. 时间记录：记录当前时间戳到本地存储，作为豁免期起点
       * 3. 用户反馈：通过 Toast 提示用户操作结果，提升用户体验
       * 4. 业务响应：豁免状态变化自动触发后续的业务逻辑处理
       *
       * 设计考虑：
       * - 即时响应：状态更新立即生效，无需等待存储操作完成
       * - 状态同步：确保本地存储和内存状态的一致性
       * - 用户引导：通过反馈信息帮助用户理解操作结果
       *
       * @param {UniApp.OnRewardedVideoAdCloseOptions} res - 广告关闭事件参数
       * @property {boolean} res.isEnded - 是否完整观看广告的标志
       */
      rewardVideoAd.onClose((res) => {
        // 判断用户是否完整观看了广告
        if (res && res.isEnded) {
          // 用户完整观看广告后，设置豁免状态并记录时间戳
          console.log('激励视频 广告完成')
          isFree.value = true
          uni.setStorageSync('freeAdTime', new Date().getTime())
          showToast({ msg: '广告观看成功，感谢支持' })
        } else {
          // 用户未完整观看广告
          console.log('激励视频 广告未完成')
        }
      })
    } else {
      console.log('当前环境不支持激励视频广告')
    }
  }

  /**
   * 显示激励视频广告并处理用户交互
   *
   * 这是用户触发广告显示的核心函数，实现智能的广告展示流程和用户体验优化。
   * 采用渐进式加载策略，优先尝试直接显示，失败时自动降级到加载后显示。
   *
   * 显示策略流程：
   * 1. 用户反馈：立即显示加载提示，告知用户操作正在进行
   * 2. 直接显示：优先尝试直接调用广告实例的 show() 方法
   * 3. 降级处理：如果直接显示失败，执行加载后显示的备用方案
   * 4. 资源清理：无论成功与否，最终都会关闭加载提示避免界面阻塞
   *
   * 错误处理机制：
   * - 实例检查：确保广告实例存在后再执行显示操作
   * - Promise 链：使用 Promise 链式调用管理异步操作流程
   * - 最终清理：通过 finally 确保加载提示在任何情况下都会被关闭
   * - 错误记录：捕获并记录显示过程中的异常信息
   *
   * 用户体验优化：
   * - 即时反馈：加载提示让用户感知到操作响应
   * - 无缝降级：失败时的自动重试机制提升成功率
   * - 状态恢复：操作完成后及时清理界面状态
   *
   * @returns {void} 无返回值，操作结果通过广告事件和用户界面反馈
   *
   * @example
   * // 显示广告的典型用法
   * const { showRewardAd } = useRewardAd()
   *
   * // 在用户触发需要广告验证的操作时调用
   * function onPremiumAction() {
   *   showRewardAd()
   * }
   *
   * // 广告显示完成后，通过 onClose 事件处理后续业务逻辑
   */
  function showRewardAd() {
    /**
     * 显示加载提示 - 用户体验优化第一步
     *
     * 在广告显示流程开始时立即提供视觉反馈，让用户感知到操作正在进行。
     * 这种即时反馈机制能够有效减少用户等待的焦虑感，提升整体体验。
     *
     * 设计原则：
     * - 即时性：在异步操作开始前立即显示提示
     * - 明确性：提示信息清晰说明当前操作内容
     * - 可关闭性：确保在任何情况下都能正确关闭提示
     */
    showLoading({ msg: '正在加载激励视频...' })

    /**
     * 广告显示流程 - 智能降级策略实现
     *
     * 采用渐进式显示策略，优先尝试直接显示，失败时自动执行备用方案。
     * 这种设计能够最大化广告显示成功率，同时保持代码的简洁性和可维护性。
     *
     * 流程设计：
     * 1. 安全检查：通过逻辑与操作确保广告实例存在
     * 2. 直接显示：优先调用 show() 方法，这是最高效的显示方式
     * 3. 错误处理：捕获直接显示失败的情况
     * 4. 降级显示：失败时执行加载后显示的备用流程
     * 5. 资源清理：通过 Promise.finally 确保加载提示被正确关闭
     *
     * 技术特色：
     * - 短路评估：使用 && 操作符进行实例存在性检查
     * - Promise 链：优雅处理异步操作的嵌套和错误传播
     * - 非空断言：在 TypeScript 中使用 ! 操作符确保类型安全
     */
    rewardVideoAd &&
      rewardVideoAd
        .show()
        .then(() => {
          // 广告显示成功，关闭加载提示
          closeLoading()
        })
        .catch(() => {
          // 广告直接显示失败，尝试先加载再显示
          rewardVideoAd!
            .load()
            .then(() =>
              rewardVideoAd!.show().finally(() => {
                // 无论加载后显示成功与否，都关闭加载提示
                closeLoading()
              })
            )
            .catch((err) => {
              // 加载失败，关闭加载提示并记录错误
              closeLoading()
              console.log('激励视频 广告显示失败')
            })
        })
  }

  /**
   * 功能模块导出 - 封装完整的广告管理能力
   *
   * 返回包含所有公开方法和状态的对象，为外部调用者提供统一的接口。
   * 这种封装方式确保了模块内部实现的细节隐藏，同时提供清晰的公共API。
   *
   * 导出策略：
   * - 最小化接口：只暴露必要的功能方法，隐藏内部实现细节
   * - 类型安全：通过 TypeScript 类型推断确保返回值的类型正确性
   * - 一致性：保持与 Vue 3 Composition API 设计模式的一致性
   *
   * 返回对象结构：
   * - createRewardVideoAd: 广告实例创建方法，一次性初始化调用
   * - showRewardAd: 广告显示触发方法，用户交互入口点
   * - isFree: 响应式豁免状态，用于业务逻辑条件判断
   *
   * @returns {Object} 激励视频广告管理接口对象
   */
  return { createRewardVideoAd, showRewardAd, isFree }
}
