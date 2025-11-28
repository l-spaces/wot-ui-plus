<template>
  <view class="page-message-box">
    <page-wraper>
      <wd-message-box></wd-message-box>
      <wd-message-box selector="wd-message-box-slot">
        <wd-rate v-model="rate" />
      </wd-message-box>
      <demo-block title="alert">
        <wd-button @click="alert">alert</wd-button>
      </demo-block>

      <demo-block title="显示标题">
        <wd-button @click="alertWithTitle">alert</wd-button>
      </demo-block>

      <demo-block title="confirm">
        <wd-button @click="confirm">confirm</wd-button>
      </demo-block>

      <demo-block title="prompt">
        <wd-button @click="prompt">prompt</wd-button>
      </demo-block>

      <demo-block title="当文案过长时，弹框的高度不再增加，而是将文案内容设置成滚动">
        <wd-button @click="alertWithLongChar">alert</wd-button>
      </demo-block>

      <demo-block title="使用wd-message-box组件，通过slot插入其他组件内容">
        <wd-button @click="withSlot">custom</wd-button>
      </demo-block>

      <demo-block title="使用beforeConfirm钩子，在弹框确认前，可以进行一些操作">
        <wd-button @click="beforeConfirm">beforeConfirm</wd-button>
      </demo-block>

      <demo-block title="通过button - props自定义按钮">
        <wd-button @click="withButtonProps">withButtonProps</wd-button>
      </demo-block>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
  import { useMessage, useToast } from '@/uni_modules/wot-ui-plus'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const rate = ref<number>(1)
  const value1 = ref<string>('')

  const toast = useToast()
  const message = useMessage()
  const message1 = useMessage('wd-message-box-slot')

  function alert() {
    message.alert(t('cao-zuo-cheng-gong'))
  }
  function alertWithTitle() {
    message.alert({
      msg: t('ti-shi-wen-an'),
      title: t('biaoTi-0')
    })
  }
  function confirm() {
    message
      .confirm({
        msg: t('shi-fou-shan-chu'),
        title: t('ti-shi')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function prompt() {
    message
      .prompt({
        title: t('qing-shu-ru-you-xiang'),
        inputValue: value1.value,
        inputPattern: /.+@.+\..+/i
      })
      .then((resp) => {
        console.log(resp)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function alertWithLongChar() {
    message.alert({
      msg: t('yi-shang-wen-zi-shi-shi-yi'),
      title: t('biaoTi-0')
    })
  }

  function beforeConfirm() {
    message
      .confirm({
        msg: t('shi-fou-shan-chu-0'),
        title: t('ti-shi-0'),
        beforeConfirm: ({ resolve }) => {
          toast.loading(t('shan-chu-zhong'))
          setTimeout(() => {
            toast.close()
            resolve(true)
            toast.success(t('shan-chu-cheng-gong'))
          }, 3000)
        }
      })
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  function withButtonProps() {
    message
      .confirm({
        msg: t('zi-ding-yi-an-niu-yang-shi'),
        title: t('ti-shi-1'),
        cancelButtonProps: {
          round: false,
          type: 'error',
          customClass: 'custom-shadow'
        },
        confirmButtonProps: {
          round: false,
          type: 'success',
          customClass: 'custom-shadow'
        }
      })
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  function withSlot() {
    message1
      .confirm({
        title: t('ping-fen')
      })
      .then(() => {
        message.alert(t('ni-de-ping-fen-wei-ratevalue-fen', [rate.value]))
      })
      .catch((error) => {
        console.log(error)
      })
  }
</script>
<style lang="scss" scoped>
  .page-message-box {
    :deep() {
      .custom-shadow {
        box-shadow:
          0 3px 1px -2px rgb(0 0 0 / 20%),
          0 2px 2px 0 rgb(0 0 0 / 14%),
          0 1px 5px 0 rgb(0 0 0 / 12%);
      }
    }
  }
</style>
