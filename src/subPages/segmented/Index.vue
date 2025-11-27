<template>
  <page-wraper>
    <demo-block title="基础使用">
      <wd-segmented :options="list" mode="box" :v-model="current1" @change="change1"></wd-segmented>
    </demo-block>
    <demo-block title="按钮模式">
      <wd-segmented :options="list" mode="button" barColor="#fff" :v-model="current2" @change="change2"></wd-segmented>
    </demo-block>
    <demo-block title="圆角模式">
      <wd-segmented :options="list" mode="box" shape="round" :v-model="current2" @change="change2"></wd-segmented>
      <br />
      <wd-segmented
        :options="list"
        mode="button"
        shape="round"
        barColor="#3c9cff"
        activeColor="#fff"
        :v-model="current2"
        @change="change2"
      ></wd-segmented>
    </demo-block>
    <demo-block title="更换主题">
      <wd-segmented :options="list" mode="box" :v-model="current3" activeColor="#f56c6c" @change="change3"></wd-segmented>

      <view style="margin-top: 10px">
        <wd-segmented :options="list" mode="button" :v-model="current3" activeColor="#fff" barColor="#f56c6c" @change="change3"></wd-segmented>
      </view>

      <view style="margin-top: 10px">
        <wd-segmented
          :options="list"
          mode="button"
          shape="round"
          :v-model="current3"
          activeColor="#fff"
          barColor="#f56c6c"
          @change="change3"
        ></wd-segmented>
      </view>
    </demo-block>
    <demo-block title="默认位置">
      <wd-segmented :options="list" mode="button" :v-model="current4" @change="change4"></wd-segmented>
    </demo-block>

    <demo-block title="禁用">
      <wd-segmented :options="list2" mode="button" :v-model="current4" @change="change4"></wd-segmented>
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-xuan-ran-fen-duan-qi-biao-qian')" transparent>
      <view class="section">
        <wd-segmented :options="list1" v-model="current5" height="80px" @change="handleChange">
          <template #label="{ option }">
            <view class="section-slot">
              <image style="border-radius: 50%; width: 32px; height: 32px" :src="(option as any).avatar" />
              <view class="name">
                {{ (option as any).value }}
              </view>
            </view>
          </template>
        </wd-segmented>
      </view>
    </demo-block>
  </page-wraper>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  // 引入国际化
  const { t } = useI18n()

  // 基础列表数据
  const list = ['未付款', '待评价', '已付款']

  // 带禁用状态的列表数据
  const list2 = [{ name: '未付款', disabled: true }, { name: '待评价' }, { name: '已付款' }]

  // 自定义渲染列表数据
  const list1 = computed(() => [
    {
      value: '张三',
      disabled: false,
      avatar: '../../static/img/a1.png'
    },
    {
      value: '李四',
      disabled: false,
      avatar: '../../static/img/a2.png'
    },
    {
      value: '王五',
      disabled: true,
      avatar: '../../static/img/a3.png'
    },
    {
      value: '赵六',
      disabled: false,
      avatar: '../../static/img/a4.png'
    }
  ])

  // 各分段器的当前选中索引
  const current1 = ref(0)
  const current2 = ref(0)
  const current3 = ref(0)
  const current4 = ref(1)
  const current5 = ref(t('han-mei-mei-0'))
  // 事件处理函数
  const change1 = (index: number, item: any) => {
    current1.value = index
    console.log('index', index, current1.value, item)
  }

  const change2 = (index: number) => {
    current2.value = index
    console.log('index', index)
  }

  const change3 = (index: number) => {
    current3.value = index
    console.log('index', index)
  }

  const change4 = (index: number) => {
    current4.value = index
    console.log('index', index)
  }

  const handleChange = (index: number) => {
    console.log('segmented change:', index)
  }
</script>

<style lang="scss">
  .section {
    width: 100%;
    padding: 0 24rpx;
    box-sizing: border-box;
    &-slot {
      padding: 4px;
    }
  }
</style>
