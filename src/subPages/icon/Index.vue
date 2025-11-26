<template>
  <view>
    <page-wraper>
      <demo-block title="基础样式">
        <wd-icon name="leaves" round />
        <wd-icon name="leaves" round color="red" />
        <wd-icon name="leaves" color="red" />
        <wd-icon name="leaves" size="34px" />
        <wd-icon name="leaves" bold size="34px" />
      </demo-block>
      <demo-block title="图标列表">
        <view class="icon">
          <view style="position: sticky; top: 0; z-index: 2">
            <wd-search hide-cancel :placeholder="$t('cha-zhao-tu-biao')" light v-model="keyword" @search="handleSearch" @clear="handleClear" />
          </view>
          <view class="icon-list">
            <view v-for="(icon, index) in showIcons" :key="index" class="icon-item">
              <view>
                <wd-icon :name="icon" size="26px" custom-class="icon-item-class" @click="handleClick(icon)" />
              </view>
              <view class="icon-item-name" @click="handleClickName(icon)">{{ icon }}</view>
            </view>
            <wd-status-tip v-if="!showIcons.length" image="search" :tip="$t('dang-qian-wu-xiang-guan-tu-biao')" />
          </view>
        </view>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useNotify } from '@/uni_modules/wot-ui-plus'
  import { useI18n } from 'vue-i18n'
  import { list } from './Icon'
  const { showNotify } = useNotify()

  const { t } = useI18n()
  const keyword = ref<string>('')

  const icons = ref<Array<string>>(list)

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
      data: `<wd-icon name="${icon}" size="38.1333rpx"></wd-icon>`,
      showToast: false,
      success: () => {
        showNotify({
          type: 'success',
          duration: 1500,
          message: t('fu-zhi-cheng-gong') + `<wd-icon name="${icon}" size="38.1333rpx"></wd-icon>`
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
    padding: 26rpx;
    flex-wrap: wrap;
    background: #fff;
  }
  .icon-item {
    width: 25%;
    padding: 26rpx 0;
    text-align: center;
  }

  :deep(.icon-item-class) {
    color: $-dark-color4;
  }

  .icon-item-name {
    margin: 17.3333rpx 0;
    color: $-dark-color4;
  }
</style>
