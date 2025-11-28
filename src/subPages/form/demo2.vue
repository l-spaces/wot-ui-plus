<template>
  <page-wraper>
    <wd-form ref="form" :model="model" :reset-on-change="false">
      <wd-cell-group border>
        <wd-input
          label="歪比巴卜"
          label-width="100px"
          prop="name"
          clearable
          v-model="model.name"
          placeholder="请输入歪比巴卜"
          @blur="handleBlur('name')"
          :rules="[{ required: true, message: '请输入歪比巴卜' }]"
        />
        <wd-input
          label="玛卡巴卡单号"
          prop="phoneNumber"
          label-width="100px"
          clearable
          @blur="handleBlur('phoneNumber')"
          v-model="model.phoneNumber"
          placeholder="请填写玛卡巴卡单号"
          :rules="[{ required: true, message: '请填写玛卡巴卡单号' }]"
        />

        <wd-input
          label="玛卡巴卡id"
          prop="id"
          label-width="100px"
          clearable
          @blur="handleBlur('id')"
          v-model="model.id"
          placeholder="请填写玛卡巴卡id"
          :rules="[{ required: true, message: '请填写玛卡巴卡id' }]"
        />
      </wd-cell-group>
    </wd-form>

    <view class="footer">
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
      <wd-button type="primary" @click="handleValidate">校验单号和ID</wd-button>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
  import { useToast } from '@/uni_modules/wot-ui-plus'
  import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
  import { reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const model = reactive<{
    name: string
    phoneNumber: string
    id: string
  }>({
    name: '',
    phoneNumber: '',
    id: ''
  })

  const { success: showSuccess } = useToast()
  const form = ref<FormInstance>()

  function handleBlur(prop: string) {
    form.value!.validate(prop)
  }

  function handleValidate() {
    form
      .value!.validate(['phoneNumber', 'id'])
      .then(({ valid }) => {
        if (valid) {
          showSuccess(t('xiao-yan-tong-guo'))
        }
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }

  function handleSubmit() {
    form
      .value!.validate()
      .then(({ valid }) => {
        if (valid) {
          showSuccess(t('xiao-yan-tong-guo'))
        }
      })
      .catch((error) => {
        console.log(error, 'error')
      })
  }
</script>
<style lang="scss" scoped>
  .footer {
    padding: 12px;
    display: flex;
  }
</style>
