<template>
  <wd-config-provider :theme="theme" :theme-vars="isRed ? themeVars : {}">
    <view class="page-wraper" @click="closeOutside">
      <wd-cell :title="$t('qie-huan-an-hei')" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isDark" />
      </wd-cell>
      <wd-cell :title="$t('qie-huan-zhu-ti-se')" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isRed" />
      </wd-cell>
      <slot />
      <!-- #ifdef MP-WEIXIN -->
      <!-- 横幅广告和格子广告可以共存，但插屏广告展示时，不显示横幅广告和格子广告 -->
      <template v-if="useWxAd && !showWxAd3 && !isFree">
        <ad-custom v-if="showWxAd" unit-id="adunit-06191d6d3d1ddfc4"></ad-custom>
        <ad-custom
          v-if="showWxAd2"
          style="width: 120rpx; height: auto; position: fixed; right: 12rpx; top: 160rpx; z-index: 999"
          unit-id="adunit-95aad07aafad3619"
        ></ad-custom>
      </template>
      <!-- #endif -->

      <wd-gap height="0" v-if="safeAreaInsetBottom" safe-area-bottom></wd-gap>
    </view>
    <wd-notify />
    <wd-toast />
    <!-- #ifdef MP-WEIXIN -->
    <wd-fab v-model:active="fabActive" draggable type="error" :gap="{ bottom: 58 }" direction="left" v-if="enableRewardFab">
      <wd-button type="error" round @click="goToReward">
        <view style="display: flex; align-items: center">
          <wd-icon name="thumb-up" size="22px"></wd-icon>
          <text>{{ $t('kan-shi-pin-mian-guang-gao') }}</text>
        </view>
      </wd-button>
    </wd-fab>
    <!-- #endif -->
  </wd-config-provider>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
// 导入Vue相关的响应式API和生命周期钩子
import { computed, ref, onMounted, nextTick } from 'vue'
// 导入UI组件库相关的API和类型
import { setNotifyDefaultOptions, useQueue, type ConfigProviderThemeVars } from '@/uni_modules/wot-ui-plus'
// 导入状态管理相关的hooks
import { useDark } from '../../store'
import { useRewardAd } from '@/store/useRewardAd'

/**
 * 组件属性接口定义
 */
interface Props {
  // 是否显示深色模式切换选项
  showDarkMode?: boolean
  // 是否开启底部安全区域适配
  safeAreaInsetBottom?: boolean
  // 是否使用微信广告
  useWxAd?: boolean
  // 是否显示奖励广告悬浮按钮
  useRewardFab?: boolean
}

/**
 * 组件属性定义及默认值设置
 */
const props = withDefaults(defineProps<Props>(), {
  showDarkMode: false,
  safeAreaInsetBottom: true,
  // 开发环境默认不显示广告，生产环境默认显示广告
  useWxAd: process.env.NODE_ENV === 'development' ? false : true,
  useRewardFab: false
})

/**
 * 计算属性：是否启用奖励广告悬浮按钮
 * 仅在生产环境且props.useRewardFab为true时启用
 */
const enableRewardFab = computed(() => {
  return props.useRewardFab && (process.env.NODE_ENV === 'development' ? false : true)
})

/**
 * 从奖励广告状态管理中解构出是否免费用户的状态
 */
const { isFree } = useRewardAd()

/**
 * 从全局状态管理中获取深色模式状态
 */
const darkMode = useDark()

/**
 * 从队列管理中获取关闭外部点击的方法
 */
const { closeOutside } = useQueue()

/**
 * 本地深色模式切换状态
 */
const isDark = ref<boolean>(false)

/**
 * 主题颜色是否为红色的状态
 */
const isRed = ref<boolean>(false)

// #ifdef MP-WEIXIN
/**
 * 悬浮按钮激活状态（仅在微信小程序环境有效）
 */
const fabActive = ref<boolean>(false)

/**
 * 横幅广告显示状态（仅在微信小程序环境有效）
 * 使用随机数控制显示概率，约50%概率显示
 */
const showWxAd = ref<boolean>(Math.random() > 0.5)

/**
 * 格子广告显示状态（仅在微信小程序环境有效）
 * 使用随机数控制显示概率，约67%概率显示
 */
const showWxAd2 = ref<boolean>(Math.random() > 0.33)

/**
 * 插屏广告显示状态（仅在微信小程序环境有效）
 * 使用随机数控制显示概率，约33%概率显示
 */
const showWxAd3 = ref<boolean>(Math.random() > 0.66)

/**
 * 插屏广告实例引用（仅在微信小程序环境有效）
 */
let interstitialAd: UniApp.InterstitialAdContext | null = null
// #endif

/**
 * 主题变量配置
 * 用于设置红色主题的配置
 */
const themeVars: ConfigProviderThemeVars = {
  colorTheme: 'red'
}

/**
 * 计算属性：当前应用的主题
 * 当全局深色模式或本地深色模式任一为true时，使用dark主题，否则使用light主题
 */
const theme = computed(() => {
  return darkMode.isDark.value || isDark.value ? 'dark' : 'light'
})

/**
 * 前往奖励广告页面的方法
 * 点击后关闭悬浮按钮并跳转到奖励广告页面
 */
function goToReward() {
  // 关闭悬浮按钮
  fabActive.value = false
  // 跳转到奖励广告页面
  uni.navigateTo({
    url: '/subPages/wxRewardAd/Index'
  })
}

/**
 * 组件挂载后的初始化方法
 * 设置通知默认选项、初始化广告等
 */
onMounted(() => {
  // 设置通知组件的默认回调选项
  setNotifyDefaultOptions({
    onClick: (event) => console.log('onClick', event), // 通知点击时的回调
    onClosed: () => console.log('onClosed'), // 通知关闭时的回调
    onOpened: () => console.log('onOpened') // 通知打开时的回调
  })

  // #ifdef MP-WEIXIN
  // 微信小程序环境下的广告初始化逻辑
  // 当支持创建插屏广告、需要显示插屏广告、允许使用微信广告且非免费用户时创建广告
  if (uni.createInterstitialAd && showWxAd3.value && props.useWxAd && !isFree.value) {
    // 创建插屏广告实例
    interstitialAd = uni.createInterstitialAd({ adUnitId: 'adunit-fc8522e2b1185c89' })
    // 在下一个DOM更新周期后显示广告
    nextTick(() => {
      // 安全检查，确保广告实例存在后再调用显示方法
      interstitialAd && interstitialAd.show()
    })
  }

  // 当启用奖励广告悬浮按钮时，延迟500ms后激活悬浮按钮
  if (enableRewardFab.value) {
    const timer = setTimeout(() => {
      // 清理定时器避免内存泄漏
      clearTimeout(timer)
      // 激活悬浮按钮
      fabActive.value = true
    }, 500)
  }
  // #endif
})
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .page-wraper {
    background: #000;
  }
}
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
}
</style>
