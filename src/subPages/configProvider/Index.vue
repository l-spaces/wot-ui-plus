<template>
  <page-wraper show-dark-mode>
    <wd-message-box />
    <wd-toast />
    <wd-action-sheet v-model="showAction" :actions="actions" />

    <form @submit="formSubmit">
      <wd-cell-group custom-class="group" title="基础信息" border>
        <wd-input
          label="优惠券名称"
          label-width="100px"
          :maxlength="20"
          show-word-limit
          name="couponName"
          required
          suffix-icon="warn-bold"
          clearable
          v-model="couponName"
          placeholder="请输入优惠券名称"
          @change="handleCouponName"
          @clicksuffixicon="handleIconClick"
        />
        <wd-select-picker
          label="推广平台"
          label-width="100px"
          name="platform"
          v-model="platform"
          :columns="platformList"
          placeholder="请选择推广平台"
          @confirm="handlePlatform"
        />
        <wd-picker label="优惠方式" label-width="100px" name="promotion" align-right v-model="promotion" :columns="promotionlist" />
        <wd-cell title="券面额" required title-width="100px" custom-value-class="cell-left">
          <view style="text-align: left">
            <view class="inline-txt" style="margin-left: 0">满</view>
            <wd-input
              no-border
              custom-style="display: inline-block; width: 70px; vertical-align: middle"
              placeholder="请输入金额"
              v-model="threshold"
              name="threshold"
              @change="handleThreshold"
            />
            <view class="inline-txt">减</view>
            <wd-input
              no-border
              custom-style="display: inline-block; width: 70px; vertical-align: middle"
              placeholder="请输入金额"
              v-model="price"
              name="price"
              @change="handlePrice"
            />
          </view>
        </wd-cell>
      </wd-cell-group>
      <wd-cell-group custom-class="group" title="时间和地址" border>
        <wd-datetime-picker label="时间" label-width="100px" name="date" v-model="date" @confirm="handleDate" />
        <wd-col-picker
          label="地址"
          label-width="100px"
          name="address"
          v-model="address"
          :columns="area"
          :column-change="areaChange"
          @confirm="handleAddress"
        />
      </wd-cell-group>
      <wd-cell-group custom-class="group" title="其他信息" border>
        <wd-input
          label="活动细则"
          label-width="100px"
          v-model="content"
          :maxlength="300"
          show-word-limit
          placeholder="请输入活动细则信息"
          clearable
          name="content"
          @change="handleContent"
        />
        <wd-cell title="发货数量" center>
          <wd-input-number v-model="count" name="count" @change="handleCount" />
        </wd-cell>
        <wd-cell title="这里显示的是多文字标题包含非常的文字" title-width="240px" center>
          <wd-switch v-model="switchVal" name="switchVal" @change="handleSwitch" />
        </wd-cell>
        <wd-input
          label="卡号"
          label-width="100px"
          name="cardId"
          suffix-icon="camera"
          placeholder="请输入卡号"
          clearable
          v-model="cardId"
          @change="handleCardId"
        />
        <wd-input label="手机号" label-width="100px" name="phone" placeholder="请输入手机号" clearable v-model="phone" @change="handlePhone" />
      </wd-cell-group>
      <view class="tip">
        <wd-checkbox v-model="read" name="read" @change="handleRead" custom-label-class="label-class">
          已阅读并同意
          <text style="color: #4d80f0">《提交协议》</text>
        </wd-checkbox>
      </view>
      <view class="footer">
        <wd-button block round size="large">提交</wd-button>
      </view>
    </form>
  </page-wraper>
</template>
<script setup lang="ts">
  import { useToast, useMessage } from '@/uni_modules/wot-ui-plus'
  import type { ColPickerColumnChangeOption } from '@/uni_modules/wot-ui-plus/components/wd-col-picker/types'
  import { ref } from 'vue'
  import { useColPickerData } from '@/hooks/useColPickerData'
  import { useI18n } from 'vue-i18n'
  import { type Action } from '@/uni_modules/wot-ui-plus/components/wd-action-sheet/types'
  const { colPickerData, findChildrenByCode } = useColPickerData()

  const { t } = useI18n()

  const showAction = ref<boolean>(false)
  const actions = ref<Action[]>([])

  const couponName = ref<string>('')
  const couponNameErr = ref<boolean>(false)
  const platform = ref<any>([])
  const platformList = ref<any>([
    {
      value: '1',
      label: t('jing-dong')
    },
    {
      value: '2',
      label: t('kai-pu-le')
    },
    {
      value: '3',
      label: t('shou-q')
    },
    {
      value: '4',
      label: t('wei-xin')
    },
    {
      value: '5',
      label: '店铺'
    },
    {
      value: '6',
      label: t('shi-yuan-jie')
    },
    {
      value: '7',
      label: t('jing-dong-ji-su-ban')
    }
  ])
  const promotion = ref<string>('1')
  const promotionlist = ref<any[]>([
    {
      value: '1',
      label: t('man-jian')
    },
    {
      value: '2',
      label: t('wu-men-jian')
    }
  ])
  const threshold = ref<string>('')
  const price = ref<string>('')
  const date = ref<number>(new Date().getTime())
  const address = ref<any[]>([])

  const count = ref<number>(1)

  const area = ref<any[]>([
    colPickerData.map((item) => {
      return {
        value: item.value,
        label: item.text
      }
    })
  ])
  const areaChange = ({ selectedItem, resolve, finish }: ColPickerColumnChangeOption) => {
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text
          }
        })
      )
    } else {
      finish()
    }
  }
  const content = ref<string>('')
  const coun = ref<number>(1)
  const read = ref<boolean>(false)
  const switchVal = ref<boolean>(true)
  const cardId = ref<string>('')
  const phone = ref<string>('')

  const toast = useToast()
  const messageBox = useMessage()

  function showActions() {
    showAction.value = true
    actions.value = [
      {
        name: t('xuanXiang_1-0')
      },
      {
        name: t('xuanXiang_2-0')
      },
      {
        name: t('xuanXiang_3-0'),
        subname: t('miaoShuXinXi-0')
      }
    ]
  }

  function handleCouponName({ value }: any) {
    console.log(value)

    couponNameErr.value = false
  }
  function handlePlatform({ value }: any) {
    console.log(value)
  }
  function handleThreshold({ value }: any) {
    console.log(value)
  }
  function handlePrice({ value }: any) {
    console.log(value)
  }
  function handleAddress({ value }: any) {
    console.log(value)
  }
  function handleContent({ value }: any) {
    console.log(value)
  }
  function handleCount({ value }: any) {
    console.log(value)
  }
  function handleSwitch({ value }: any) {
    console.log(value)
  }
  function handleRead({ value }: any) {
    read.value = value
  }
  function handleCardId({ value }: any) {
    console.log(value)
  }
  function handlePhone({ value }: any) {
    console.log(value)
  }
  function formSubmit(event: any) {
    console.log(event)

    if (!couponName.value) {
      toast.error(t('qing-tian-xie-you-hui-quan-ming-cheng'))
      return
    }
    messageBox.alert(t('ti-jiao-cheng-gong'))
  }
  function handleIconClick() {
    toast.info(t('you-hui-quan-ti-shi-xin-xi'))
  }
  function handleDate({ value }: any) {
    console.log(value)
  }
</script>
<style lang="scss" scoped>
  .wot-theme-dark {
    .inline-txt {
      color: $-dark-color;
    }
  }
  .custom-value {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    white-space: nowrap;
  }
  .inline-txt {
    display: inline-block;
    font-size: 14px;
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
    vertical-align: middle;
  }
  :deep(.group) {
    margin-top: 12px;
  }
  .tip {
    margin: 10px 15px 21px;
    color: #999;
    font-size: 12px;
  }
  .footer {
    padding: 0 25px 21px;
  }
  :deep(.label-class) {
    color: #999 !important;
    font-size: 12px !important;
  }
</style>
