/**
 * 激励视频广告管理模块
 * 用于在 uni-app 中管理微信小程序环境下的激励视频广告功能
 * 提供广告创建、显示及用户广告豁免状态管理
 */
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

/**
 * 用户广告豁免状态
 * true: 用户已观看广告，可豁免24小时
 * false: 用户需要观看广告
 */
const isFree = ref(false)

/**
 * 激励视频广告管理Hook
 * 提供激励视频广告的创建、显示及豁免状态管理功能
 *
 * @returns {
 *   createRewardVideoAd: () => void, // 创建激励视频广告
 *   showRewardAd: () => void,        // 显示激励视频广告
 *   isFree: Ref<boolean>             // 用户是否豁免广告的响应式状态
 * }
 */
export function useRewardAd() {
  // 解构Toast组件方法，用于显示加载提示和操作反馈
  const { loading: showLoading, close: closeLoading, show: showToast } = useToast()

  // 激励视频广告实例
  let rewardVideoAd: UniApp.InterstitialAdContext | null = null

  // 初始化时检查用户是否可以豁免广告
  isFreeAd()

  /**
   * 检查用户是否可以豁免广告
   * 通过检查本地存储中的时间戳，判断距离上次观看广告是否超过24小时
   * 超过24小时则需要重新观看，否则可以豁免
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
   * 创建激励视频广告
   * 初始化微信小程序激励视频广告实例，设置广告ID和相关事件监听
   * 监听广告加载成功、加载失败和关闭事件
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

      // 广告关闭事件回调
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
   * 显示激励视频广告
   * 先显示加载提示，尝试直接显示广告
   * 如果广告显示失败，尝试先加载再显示
   * 无论成功失败，最终都会关闭加载提示
   */
  function showRewardAd() {
    // 显示加载提示
    showLoading({ msg: '正在加载激励视频...' })

    // 检查广告实例是否存在
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

  // 导出功能方法和状态
  return { createRewardVideoAd, showRewardAd, isFree }
}
