<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">
      <view class="page__bd">
        <view class="additional-links">
          <view class="additional-links__title">更多信息</view>
          <wd-cell-group border>
            <wd-cell
              title="语言切换"
              title-width="200px"
              :label="'当前语言' + ': ' + (currentLang === 'zh-CN' ? '中文' : 'English')"
              is-link
              @click="showLanguageSwitch = true"
            ></wd-cell>
          </wd-cell-group>
        </view>
      </view>
      <wd-action-sheet v-model="showLanguageSwitch" :actions="languageActions" cancel-text="取消" title="语言切换" @select="handleLanguageSelect" />
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useI18nSync } from '../../hooks/useI18nSync'

  // 使用国际化钩子
  const { setLocale, currentLang } = useI18nSync()

  // 控制语言切换弹出层的显示
  const showLanguageSwitch = ref(false)

  // 语言切换选项
  const languageActions = computed(() => [
    {
      name: '中文 🇨🇳',
      color: currentLang.value === 'zh-CN' ? '#0083ff' : ''
    },
    {
      name: 'English 🇺🇸',
      color: currentLang.value === 'en-US' ? '#0083ff' : ''
    }
  ])

  // 处理语言选择
  const handleLanguageSelect = ({ index }: { index: number }) => {
    const locale = index === 0 ? 'zh-CN' : 'en-US'
    switchLanguage(locale)
  }

  // 切换语言
  const switchLanguage = (locale: string) => {
    setLocale(locale)
  }
</script>

<style lang="scss" scoped>
  .page__hd {
    padding: 15px 15px 0 20px;
  }

  .page__title {
    text-align: left;
    font-size: 24px;
    font-weight: 600;
  }

  .page__desc {
    margin-top: 20px;
    text-align: left;
    font-size: 14px;
  }

  .page__intro {
    margin-top: 10px;
    text-align: left;
    font-size: 14px;
  }

  .page__bd {
    padding: 0 15px 30px 20px;
    user-select: none;
    border-radius: 10px;
  }

  .core-team {
    margin-top: 20px;
  }

  .core-team__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .core-team__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .core-team__member {
    flex: 1 1 25%;
    max-width: 25%;
    box-sizing: border-box;
    margin-bottom: 10px;
    text-align: center;
    transition: transform 0.3s;
  }

  .core-team__member:hover {
    transform: scale(1.05);
  }

  .core-team__avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto;
    border: 2px solid #0083ff;
  }

  .core-team__name {
    margin-top: 5px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto;
  }

  // 移除了不再需要的language-switch相关样式

  .additional-links {
    margin-top: 20px;
  }

  .additional-links__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .additional-links__icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
</style>
