<template>
  <view>
    <page-wraper>
      <demo-block title="基本用法">
        <wd-button @click="showToast">toast</wd-button>
        <wd-button @click="showLongToast">长文案</wd-button>
      </demo-block>
      <demo-block title="类型toast">
        <wd-button @click="showSuccessToast">成功toast</wd-button>
        <wd-button @click="showErrorToast">错误toast</wd-button>
        <wd-button @click="showWarnToast">警告toast</wd-button>
        <wd-button @click="showNormalToast">常规toast</wd-button>
      </demo-block>
      <demo-block title="使用图标">
        <wd-button @click="showInnerIconToast">内部图标</wd-button>
        <wd-button @click="showCustomIconToast">自定义图标</wd-button>
      </demo-block>
      <demo-block title="提示位置">
        <wd-button @click="showTopToast">顶部toast</wd-button>
        <wd-button @click="showMiddletoast">居中toast</wd-button>
        <wd-button @click="showBottomToast">底部toast</wd-button>
      </demo-block>
      <demo-block title="Loading">
        <wd-button @click="showLoadingToast">Loading加载</wd-button>
        <wd-button @click="showLoadingToast2">ring类型loading</wd-button>
        <wd-button @click="showLoadingToast3">纵向布局loading</wd-button>
      </demo-block>
      <demo-block title="排版方向">
        <wd-button @click="showHorizonToast">横向排版</wd-button>
        <wd-button @click="showVerticalToast">纵向排版</wd-button>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
  import { useToast } from '@/uni_modules/wot-ui-plus'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const toast = useToast()

  function showToast() {
    toast.show(t('ti-shi-xin-xi'))
  }
  function showSuccessToast() {
    toast.success(t('cao-zuo-cheng-gong'))
  }
  function showErrorToast() {
    toast.error(t('cuo-wu-ti-shi-cuo-wu-ti-shi'))
  }
  function showWarnToast() {
    toast.warning(t('ti-shi-xin-xi'))
  }
  function showNormalToast() {
    toast.info(t('chang-gui-ti-shi-chang-gui-ti-shi'))
  }
  function showTopToast() {
    toast.show({
      position: 'top',
      iconClass: 'star',
      msg: t('ti-shi-xin-xi'),
      closed() {
        console.log(232)
      },
      opened() {
        console.log(2323232)
      }
    })
  }

  function showMiddletoast() {
    toast.show({
      position: 'middle',
      iconClass: 'star',
      msg: t('ti-shi-xin-xi'),
      closed() {
        console.log(232)
      },
      opened() {
        console.log(2323232)
      }
    })
  }

  function showBottomToast() {
    toast.show({
      position: 'bottom',
      msg: t('ti-shi-xin-xi')
    })
  }
  function showLoadingToast() {
    toast.loading('3s后调用close关闭')
    setTimeout(() => {
      toast.close()
    }, 3000)
  }
  function showLoadingToast2() {
    toast.loading({
      msg: '3s后调用close关闭',
      loadingType: 'ring',
      loadingColor: '#fff'
    })
    setTimeout(() => {
      toast.close()
    }, 3000)
  }

  function showLoadingToast3() {
    toast.loading({
      msg: '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。',
      direction: 'vertical'
    })
    setTimeout(() => {
      toast.close()
    }, 3000)
  }
  function showLongToast() {
    toast.show(
      t(
        'zhe-shi-yi-duan-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-hen-chang-de-wen-an'
      )
    )
  }

  function showInnerIconToast() {
    toast.show({
      iconClass: 'star',
      msg: t('shi-yong-zu-jian-ku-nei-bu-tu-biao')
    })
  }

  function showCustomIconToast() {
    toast.show({
      iconClass: 'kehuishouwu',
      classPrefix: 'fish',
      msg: t('shi-yong-zi-ding-yi-tu-biao')
    })
  }

  function showHorizonToast() {
    toast.success(t('heng-xiang-pai-ban-0'))
  }

  function showVerticalToast() {
    toast.success({
      msg: '芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。',
      direction: 'vertical'
    })
  }
</script>
<style lang="scss" scoped>
  :deep(button) {
    margin: 0 10px 10px 0;
  }
</style>
