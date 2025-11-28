<template>
  <page-wraper>
    <view>
      <demo-block title="基本用法">
        <wd-notice-bar text="这是一条消息提示信息这是一条消息提示信息这是一条消息提示信息" prefix="warn-bold" />
      </demo-block>

      <demo-block title="类型修改">
        <wd-notice-bar
          type="danger"
          :text="
            $t(
              'dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi-dang-qian-wang-luo-bu-ke-yong-qing-jian-cha-ni-de-wang-luo-she-zhi'
            )
          "
          prefix="wifi-error"
          custom-class="space"
        />
        <wd-notice-bar
          type="info"
          :text="
            $t(
              'dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing-dian-ji-cha-kan-xin-xi-xiang-qing'
            )
          "
          prefix="check-outline"
        />
      </demo-block>

      <demo-block title="禁止滚动">
        <wd-notice-bar :scrollable="false" text="欲买桂花同载酒，终不似少年游…" prefix="warn-bold"></wd-notice-bar>
      </demo-block>

      <demo-block title="插槽">
        <wd-notice-bar :scrollable="false">
          <template #prefix>
            <wd-icon custom-class="prefix" name="attention">占位符</wd-icon>
          </template>
          通知被禁或时段内消息屏蔽可能造成消…
          <template #suffix>
            <div style="color: #4d80f0">查看</div>
          </template>
        </wd-notice-bar>
      </demo-block>

      <demo-block title="可关闭的">
        <wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息。" closable prefix="warn-bold" />
      </demo-block>

      <demo-block title="多行展示">
        <wd-notice-bar
          :text="
            $t(
              'zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi'
            )
          "
          wrapable
          :scrollable="false"
        />
      </demo-block>

      <demo-block title="自定义颜色">
        <wd-notice-bar
          text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
          prefix="check-outline"
          color="#34D19D"
          background-color="#f0f9eb"
        ></wd-notice-bar>
      </demo-block>

      <demo-block title="多文本轮播">
        <wd-notice-bar @click="handleClick" :text="textArray" prefix="check-outline" @next="onNext" />
      </demo-block>

      <demo-block title="垂直滚动">
        <wd-notice-bar @click="handleClick" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
        <wd-notice-bar @click="handleClick" prefix="warn-bold" direction="vertical" text="只有一条消息不会滚动" :delay="3" custom-class="space" />
      </demo-block>

      <demo-block title="重置播放动画">
        <wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />

        <wd-button @click="handleReset">重置播放动画</wd-button>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
  import { type NoticeBarInstance } from '@/uni_modules/wot-ui-plus/components/wd-notice-bar/types'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const notice = ref<NoticeBarInstance>()

  function handleReset() {
    notice.value?.reset()
  }

  const textArray = ref([
    t('huan-ying-shi-yong-wot-ui-plus'),
    t('gai-zu-jian-ku-ji-yu-uniapp-vue3-ts-gou-jian'),
    t('xiang-mu-di-zhi-httpsgithubcommoonofweishengwotdesignuni'),
    t('wo-men-de-mu-biao-shi-da-zao-zui-qiang-uniapp-zu-jian-ku'),
    t('cheng-zhi-yao-qing-da-jia-gong-tong-jian-she'),
    t(
      'zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi-zhe-shi-yi-tiao-xiao-xi-ti-shi-xin-xi'
    )
  ])

  const onNext = (index: number) => {
    console.log('展示下一条，index: ', index)
    console.log('文本是：' + textArray.value[index])
  }

  function handleClick(result: { text: string; index: number }) {
    console.log(result)
  }
</script>
<style lang="scss" scoped>
  :deep(.prefix) {
    font-size: 18px;
    padding-right: 4px;
    width: 18px;
    height: 18px;
  }

  :deep(.space) {
    margin-bottom: 10px;
  }
</style>
