<template>
  <page-wraper>
    <wd-form ref="form" :model="model" errorType="toast">
      <wd-cell-group border>
        <wd-input
          label="歪比巴卜"
          label-width="100px"
          prop="value1"
          clearable
          v-model="model.value1"
          placeholder="请输入歪比巴卜"
          :rules="[{ required: true, message: '请输入歪比巴卜' }]"
        />
        <wd-input
          label="沙卡拉卡"
          label-width="100px"
          prop="value2"
          show-password
          clearable
          v-model="model.value2"
          placeholder="请输入沙卡拉卡"
          :rules="[{ required: true, message: '请输入沙卡拉卡' }]"
        />
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>
  </page-wraper>
</template>
<script lang="ts" setup>
  import { useToast } from '@/uni_modules/wot-ui-plus'
  import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
  import { reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const { success: showSuccess } = useToast()
  const model = reactive<{
    value1: string
    value2: string
  }>({
    value1: '',
    value2: ''
  })

  const form = ref<FormInstance>()

  function handleSubmit() {
    form
      .value!.validate()
      .then(({ valid, errors }) => {
        if (valid) {
          showSuccess({
            msg: t('xiao-yan-tong-guo')
          })
        }
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }
</script>
