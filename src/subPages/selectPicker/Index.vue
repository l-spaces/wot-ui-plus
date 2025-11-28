<template>
  <page-wraper>
    <view>
      <wd-cell-group border>
        <wd-select-picker label="选择地址" v-model="value1" :columns="columns1" @confirm="handleConfirm1" />
        <wd-select-picker label="类型切换" type="radio" v-model="value2" :columns="columns1" @confirm="handleConfirm2" />
        <wd-select-picker label="禁用" disabled v-model="value3" :columns="columns1" @confirm="handleConfirm3" />
        <wd-select-picker label="只读" readonly v-model="value4" :columns="columns1" @confirm="handleConfirm4" />
        <wd-select-picker label="禁用选项" v-model="value5" :columns="columns2" @confirm="handleConfirm5" />
        <wd-select-picker label="loading" loading v-model="value6" :columns="columns1" @confirm="handleConfirm6" />
        <wd-select-picker label="选择器change" v-model="value6" :columns="columns1" @change="handleChange" @confirm="handleConfirm7" />
        <wd-select-picker label="展示格式化" v-model="value8" :columns="columns1" @confirm="handleConfirm8" :display-format="displayFormat" />
        <wd-select-picker label="before-confirm" v-model="value9" :columns="columns1" @confirm="handleConfirm9" :before-confirm="beforeConfirm" />
        <wd-select-picker label="标题" v-model="value10" title="多选" :columns="columns1" @confirm="handleConfirm10" />
        <wd-select-picker label="错误" error v-model="value11" :columns="columns1" @confirm="handleConfirm11" />
        <wd-select-picker clearable label="必填" required v-model="value12" :columns="columns1" @confirm="handleConfirm12" />
        <wd-select-picker label="必填星号在右" required v-model="value21" :columns="columns1" marker-side="after" @confirm="handleConfirm21" />
        <wd-select-picker label="可搜索" filterable v-model="value13" :columns="columns1" @confirm="handleConfirm13" />
        <wd-select-picker label="单选可搜索" filterable v-model="value18" type="radio" :columns="columns1" @confirm="handleConfirm13" />
        <wd-select-picker label="自动完成" type="radio" :show-confirm="false" v-model="value19" :columns="columns1" @confirm="handleConfirm2" />
        <wd-select-picker
          label="可清空"
          clearable
          type="radio"
          :show-confirm="false"
          v-model="value20"
          :columns="columns1"
          @confirm="handleConfirm2"
        />
      </wd-cell-group>
    </view>
    <demo-block title="label不传" transparent>
      <wd-select-picker v-model="value14" :columns="columns1" @confirm="handleConfirm14" />
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-select-picker label="大尺寸" v-model="value15" size="large" :columns="columns1" @confirm="handleConfirm15" />
    </demo-block>
    <demo-block title="值靠右展示" transparent>
      <wd-select-picker label="值靠右展示" align-right v-model="value16" :columns="columns1" @confirm="handleConfirm16" />
    </demo-block>
    <demo-block title="自定义选择器" transparent>
      <view style="margin-left: 15px">
        <view style="margin-bottom: 10px">当前选中项: {{ customShow }}</view>
        <wd-select-picker v-model="value17" use-default-slot :columns="columns1" @confirm="handleConfirm17" style="display: inline-block">
          <wd-button>唤起多选</wd-button>
        </wd-select-picker>
      </view>
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
  import { useToast } from '@/uni_modules/wot-ui-plus'
  import type { SelectPickerBeforeConfirm, SelectPickerDisplayFormat } from '@/uni_modules/wot-ui-plus/components/wd-select-picker/types'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const columns1 = ref<Record<string, any>[]>([
    {
      value: '101',
      label: t('nan-zhuang')
    },
    {
      value: '102',
      label: t('she-chi-pin')
    },
    {
      value: '103',
      label: t('nv-zhuang')
    },
    {
      value: '104',
      label: t('xie-xue')
    },
    {
      value: '105',
      label: t('nei-yi-pei-shi')
    },
    {
      value: '106',
      label: t('xiang-bao')
    },
    {
      value: '107',
      label: t('mei-zhuang-hu-fu')
    },
    {
      value: '108',
      label: t('ge-xing-qing-jie')
    },
    {
      value: '109',
      label: t('zhong-biao-zhu-bao')
    },
    {
      value: '110',
      label: t('shou-ji')
    },
    {
      value: '111',
      label: t('shu-ma')
    },
    {
      value: '112',
      label: t('dian-nao-ban-gong')
    }
  ])
  const columns2 = ref<Record<string, any>[]>([
    {
      value: '101',
      label: t('nan-zhuang-0'),
      disabled: true
    },
    {
      value: '102',
      label: t('she-chi-pin')
    },
    {
      value: '103',
      label: t('nv-zhuang-0')
    }
  ])
  const value1 = ref<string[]>(['101'])
  const value2 = ref<string>('101')
  const value3 = ref<string[]>(['102'])
  const value4 = ref<string[]>(['103'])
  const value5 = ref<string[]>([])
  const value6 = ref<string[]>([])
  const value7 = ref<string[]>([])
  const value8 = ref<string[]>([])
  const value9 = ref<string[]>([])
  const value10 = ref<string[]>([])
  const value11 = ref<string[]>([])
  const value12 = ref<string[]>(['103'])
  const value13 = ref<string[]>(['102'])
  const value14 = ref<string[]>([])
  const value15 = ref<string[]>(['101'])
  const value16 = ref<string[]>(['103'])
  const value17 = ref<string[]>(['102'])
  const value18 = ref<string>('102')
  const value19 = ref<string>('101')
  const value20 = ref<string>('101')
  const value21 = ref<string[]>(['102'])

  const customShow = ref<string>(t('she-chi-pin'))

  const toast = useToast()

  const displayFormat: SelectPickerDisplayFormat = (items, columns) => {
    let showValue = ''
    columns.forEach((column) => {
      ;(items as (string | number | boolean)[]).forEach((item, index) => {
        if (column.value === item) {
          showValue += `${item}: ${column.label} ${index + 1 < (items as (string | number | boolean)[]).length ? '--' : ''} `
        }
      })
    })
    return showValue
  }

  const beforeConfirm: SelectPickerBeforeConfirm = (value, resolve) => {
    if ((value as string[]).length > 0) {
      toast.error(t('zan-shi-wu-fa-xuan-ze-shang-pin'))
      resolve(false)
    } else {
      resolve(true)
    }
  }

  function handleChange({ value }: any) {
    toast.show(t('xuan-ze-le') + value)
  }
  function handleConfirm1({ value }: any) {
    console.log(value)
  }
  function handleConfirm2({ value }: any) {
    console.log(value)
  }
  function handleConfirm3({ value }: any) {
    console.log(value)
  }
  function handleConfirm4({ value }: any) {
    console.log(value)
  }
  function handleConfirm5({ value }: any) {
    console.log(value)
  }
  function handleConfirm6({ value }: any) {
    console.log(value)
  }
  function handleConfirm7({ value }: any) {
    console.log(value)
  }
  function handleConfirm8({ value }: any) {
    console.log(value)
  }
  function handleConfirm9({ value }: any) {
    console.log(value)
  }
  function handleConfirm10({ value }: any) {
    console.log(value)
  }
  function handleConfirm11({ value }: any) {
    console.log(value)
  }
  function handleConfirm12({ value }: any) {
    console.log(value)
  }
  function handleConfirm13({ value }: any) {
    console.log(value)
  }
  function handleConfirm14({ value }: any) {
    console.log(value)
  }
  function handleConfirm15({ value }: any) {
    console.log(value)
  }
  function handleConfirm16({ value }: any) {
    console.log(value)
  }
  function handleConfirm17({ value, selectedItems }: any) {
    console.log(value)
    customShow.value = selectedItems
      .map((item: any) => {
        return item.label
      })
      .join(', ')
  }
  function handleConfirm21({ value }: any) {
    console.log(value)
  }
</script>
<style lang="scss" scoped></style>
