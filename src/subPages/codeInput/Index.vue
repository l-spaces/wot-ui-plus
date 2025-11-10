<template>
  <view class="wd-page">
    <demo-block title="基础使用">
      <wd-code-input v-model="value1" :maxlength="4" @change="change" @finish="finish"></wd-code-input>
    </demo-block>

    <demo-block title="横线模式">
      <wd-code-input v-model="value2" mode="line" :maxlength="4" :bold="true"></wd-code-input>
    </demo-block>

    <demo-block title="设置长度">
      <wd-code-input v-model="value3" :maxlength="6"></wd-code-input>
    </demo-block>

    <demo-block title="设置间距">
      <wd-code-input v-model="value4" mode="box" :space="0" :maxlength="4"></wd-code-input>
    </demo-block>

    <demo-block title="细边框">
      <wd-code-input v-model="value5" mode="box" :space="0" :maxlength="4" hairline></wd-code-input>
      <view style="margin-top: 10px">
        <wd-code-input v-model="value6" mode="line" :space="10" :maxlength="4" hairline></wd-code-input>
      </view>
    </demo-block>

    <demo-block title="调整颜色">
      <wd-code-input v-model="value7" mode="box" :space="0" :maxlength="4" hairline color="#f56c6c" borderColor="#f56c6c"></wd-code-input>

      <view style="margin-top: 10px">
        <wd-code-input v-model="value11" size="40" :maxlength="4" round="5" bgColor="#f3f3f3" borderColor="none"></wd-code-input>
      </view>

      <view style="margin-top: 10px">
        <wd-code-input v-model="value10" mode="line" size="30" :maxlength="4" hairline color="#3c9cff" borderColor="#3c9cff"></wd-code-input>
      </view>
    </demo-block>

    <demo-block title="点模式">
      <wd-code-input v-model="value8" mode="box" dot :space="0" :maxlength="4" hairline></wd-code-input>
    </demo-block>

    <demo-block title="预置内容">
      <wd-code-input v-model="value9" mode="box" :space="0" :maxlength="4" hairline fontSize="17"></wd-code-input>
    </demo-block>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')
const value8 = ref('')
const value9 = ref('123')
const value10 = ref('34')
const value11 = ref('')

onMounted(() => {
  console.log('组件挂载完成')
})

const change = (e: string) => {
  console.log('change', e)
}

const finish = (e: string) => {
  console.log('finish', e)
}
</script>

<style lang="scss" scoped></style>
