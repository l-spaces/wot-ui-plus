<template>
  <view>
    <page-wraper>
      <view class="icon">
        <view style="position: sticky; top: 0; z-index: 2">
          <wd-search hide-cancel :placeholder="$t('cha-zhao-tu-biao')" light v-model="keyword" @search="handleSearch" @clear="handleClear" />
        </view>
        <view class="icon-list">
          <view v-for="(icon, index) in showIcons" :key="index" class="icon-item">
            <view>
              <wd-icon :name="icon" size="30px" custom-class="icon-item-class" @click="handleClick(icon)" />
            </view>
            <view class="icon-item-name" @click="handleClickName(icon)">{{ icon }}</view>
          </view>
          <wd-status-tip v-if="!showIcons.length" image="search" :tip="$t('dang-qian-wu-xiang-guan-tu-biao')" />
        </view>
      </view>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotify } from '@/uni_modules/wot-ui-plus'
import { useI18n } from 'vue-i18n'
const { showNotify } = useNotify()

const { t } = useI18n()
const keyword = ref<string>('')

const icons = ref<Array<string>>([
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',

  'arrow-circle-down',
  'arrow-circle-left',
  'arrow-circle-right',
  'arrow-circle-up',

  'arrow-circle-down-filled',
  'arrow-circle-left-filled',
  'arrow-circle-right-filled',
  'arrow-circle-up-filled',

  'double-down',
  'double-left',
  'double-right',
  'double-up',

  'double-down-circle',
  'double-left-circle',
  'double-right-circle',
  'double-up-circle',

  'double-down-circle-filled',
  'double-left-circle-filled',
  'double-right-circle-filled',
  'double-up-circle-filled',

  'circle-left-down',
  'circle-left-up',
  'circle-right-up',
  'circle-right-down',

  'circle-left-down-filled',
  'circle-left-up-filled',
  'circle-right-up-filled',
  'circle-right-down-filled',

  'down',
  'left',
  'right',
  'up',

  'down-c',
  'left-c',
  'right-c',
  'up-c',

  'down-c-filled',
  'left-c-filled',
  'right-c-filled',
  'up-c-filled',

  'down-box',
  'left-box',
  'right-box',
  'up-box',

  'down-box-filled',
  'left-box-filled',
  'right-box-filled',
  'up-box-filled',
  'expand',
  'expand-o',
  'shrink',
  'shrink-o',
  'screen-full',
  'screen-off',
  'collapse-text-input',
  'expand-text-input',

  'add',
  'add-box',
  'add-box-filled',
  'add-circle',
  'add-circle-filled',

  'minus',
  'minus-box',
  'minus-box-filled',
  'minus-circle',
  'minus-circle-filled',

  'close',
  'close-circle',
  'close-circle-filled',
  'harm',
  'harm-filled',
  'check',
  'check-circle',
  'check-circle-filled',
  'protect',
  'protect-filled',

  'sliding-horizontal-filled',
  'sliding-vertical-filled',
  'sort',
  'sort-filled',
  'sort-line',
  'switch',

  'edit',
  'edit-filled',
  'edit-box',
  'edit-box-filled',

  'more',
  'more-c',
  'more-c-filled',
  'more2',
  'more2-c',
  'more2-c-filled',

  'zoom-in',
  'zoom-in-filled',
  'zoom-out',
  'zoom-out-filled',

  'back',
  'back-filled',
  'share',
  'share-filled',
  'help',
  'help-filled',
  'lock',
  'lock-filled',
  'unlock',
  'unlock-filled',

  'tips',
  'tips-filled',
  'pin',
  'pin-filled',
  'preview-close',
  'preview-open',

  'setting',
  'setting-filled',
  'tool',
  'tool-filled',
  'refresh',
  'refresh-circle',
  'refresh-circle-filled',

  'remind',
  'remind-filled',
  'remind-disable',
  'remind-disable-filled',
  'search',
  'search-filled',
  'topic',
  'topic-filled',

  'backtop',
  'backtop-circle',
  'export',
  'upload-one',
  'go-on',
  'logout',
  'logout-o',
  'return',
  'delete',
  'delete-filled',
  'delete-box',
  'delete-box-filled',

  'doc-search',
  'doc-search-filled',
  'at-sign',
  'add-text',
  'click-tap',
  'cutting',
  'paperclip',
  'power',
  'tag',
  'tag-filled',
  'label',
  'label-filled',
  'bad',
  'bad-filled',
  'good',
  'good-filled',

  'emotion-happy',
  'emotion-happy-filled',
  'emotion-unhappy',
  'emotion-unhappy-filled',

  'like',
  'like-filled',
  'dislike',
  'dislike-filled',

  'soap-bubble',
  'soap-bubble-filled',
  'filter',
  'filter-filled',
  'leaves',
  'leaves-filled',
  'fire',
  'fire-filled',
  'bloom',
  'bloom-filled',
  'vip',
  'vip-filled',
  'success',
  'success-filled',
  'level',
  'level-filled',
  'lightning',
  'lightning-filled',
  'blossom',
  'blossom-filled',
  'comments',
  'comments-filled',
  'message-emoji',
  'message-emoji-filled',
  'brightness',
  'brightness-filled',
  'sleep',
  'sleep-filled',
  'star',
  'star-filled',
  'natural-mode',
  'natural-mode-filled',
  'bookmark',
  'bookmark-filled',
  'mark',
  'mark-filled',
  'caution',
  'caution-filled',
  'coupon',
  'coupon-filled',

  'copy',
  'copy-filled',
  'copyright',
  'copyright-filled',
  'bug',
  'bug-filled',
  'attention',
  'attention-filled',

  'avatar',
  'avatar-filled',
  'address-book',
  'address-book-filled',
  'people',
  'people-filled',
  'peoples',
  'peoples-filled',
  'me',
  'me-filled',
  'male',
  'male-filled',
  'female',
  'female-filled',
  'pic',
  'pic-filled',
  'picture',
  'picture-filled',
  'picture-album',
  'picture-album-filled',

  'mall-bag',
  'mall-bag-filled',
  'shopping',
  'shopping-filled',
  'calculator',
  'calculator-filled',
  'wallet',
  'wallet-filled',
  'bank-card',
  'bank-card-filled',
  'consume',
  'consume-filled',
  'finance',
  'finance-filled',
  'permissions',
  'permissions-filled',

  'bookshelf',
  'bookshelf-filled',
  'calendar-dot',
  'calendar-dot-filled',
  'notebook',
  'notebook-filled',
  'log',
  'log-filled',

  'alarm-clock',
  'alarm-clock-filled',
  'time',
  'time-filled',
  'phone-call',
  'phone-call-filled',
  'camera',
  'camera-filled',
  'voice',
  'voice-filled',
  'voice-off',

  'video',
  'video-box',
  'video-filled',

  'wifi',
  'wifi-close',
  'bluetooth',
  'bluetooth-close',
  'camera-camera',
  'camera-circle-filled',
  'flashlight',
  'flashlight-filled',
  'mail',
  'mail-filled',
  'monitor',
  'monitor-filled',
  'move',
  'move-filled',
  'movie',
  'movie-filled',
  'music',
  'music-filled',
  'volume-down',
  'volume-down-filled',
  'volume-mute',
  'volume-mute-filled',
  'volume-up',
  'volume-up-filled',
  'pause',
  'pause-circle',
  'pause-circle-filled',
  'play',
  'play-circle',
  'play-circle-filled',
  'gps',
  'gps-filled',
  'local',
  'local-filled',
  'id-card',
  'id-card-filled',

  'home',
  'home-filled',
  'city',
  'city-filled',
  'more-app',
  'more-app-filled',

  'chart-graph',
  'chart-histogram',
  'chart-line',
  'chart-pie',
  'chart-scatter',

  'dashboard',
  'dashboard-filled',
  'data',
  'data-screen',

  'pay-code',
  'pay-code-filled',

  'chart-radar',

  'seo-folder',
  'seo-folder-filled',

  'chart-timeline',

  'tree-diagram',
  'tree-diagram-filled',

  'system',
  'system-filled',
  'table',
  'table-filled',

  'workbench',
  'workbench-filled',

  'dimensional',
  'dimensional-filled',
  'face-recognition',
  'scanning',
  'fingerprint',
  'text-recognition',

  'list',
  'list-view',
  'send',
  'setting-config',
  'keyboard',
  'keywords-circle',

  'logo-android',
  'logo-android-o',
  'logo-baidu',
  'logo-baidu-o',
  'logo-browser-chrome',
  'logo-douyin',
  'logo-douyin-o',
  'logo-facebook',
  'logo-facebook-o',
  'logo-github',
  'logo-github-o',
  'logo-google',
  'logo-google-o',
  'logo-jinritoutiao',
  'logo-linkedin',
  'logo-linkedin-o',
  'logo-sina',
  'logo-sina-o',
  'logo-taobao',
  'logo-taobao-o',
  'logo-tw',
  'logo-tw-o',
  'logo-twitter-o',
  'logo-wechat',
  'logo-wechat-o',
  'logo-wechat-pay',
  'logo-wechat-pay-o',
  'logo-zhifubao',
  'logo-zhifubao-o',
  'logo-apple',
  'logo-apple-o',
  'logo-qq',
  'logo-qq-o',
  'logo-youtube',
  'logo-youtube-o',
  'logo-browser-safari',
  'logo-browser-safari-o',
  'weixin-app',
  'weixin-app-filled',
  'friends-circle',
  'friends-circle-filled',
  'en',
  'zh'
])

const showIcons = ref<Array<string>>([])

onMounted(() => {
  showIcons.value = icons.value
})

function handleSearch() {
  showIcons.value = icons.value.filter((str) => str.includes(keyword.value))
}

function handleClear() {
  keyword.value = ''
  showIcons.value = icons.value
}

function handleClick(icon: string) {
  // #ifdef H5
  uni.setClipboardData({
    data: `<wd-icon name="${icon}" size="22px"></wd-icon>`,
    showToast: false,
    success: () => {
      showNotify({
        type: 'success',
        duration: 1500,
        message: t('fu-zhi-cheng-gong') + `<wd-icon name="${icon}" size="22px"></wd-icon>`
      })
    }
  })
  // #endif
}

function handleClickName(name: string) {
  // #ifdef H5
  uni.setClipboardData({
    data: `${name}`,
    showToast: false,
    success: () => {
      showNotify({
        type: 'success',
        duration: 1500,
        message: t('fu-zhi-cheng-gong') + `${name}`
      })
    }
  })
  // #endif
}
</script>
<style lang="scss" scoped>
$-light-color: #585656;

.wot-theme-dark {
  .icon-list {
    background: $-dark-background2;
    :deep(.icon-item-class) {
      color: $-dark-color;
    }
  }
  .icon-item-name {
    color: $-dark-color3;
  }
}

.icon {
  position: relative;
  height: 100vh;
  overflow: auto;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}

.icon-list {
  box-sizing: border-box;
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  background: #fff;
}
.icon-item {
  width: 25%;
  padding: 15px 0;
  text-align: center;
}

:deep(.icon-item-class) {
  color: $-light-color;
}

.icon-item-name {
  margin: 10px 0;
  color: $-light-color;
}
</style>
