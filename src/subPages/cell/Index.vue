<template>
  <page-wraper>
    <wd-toast />
    <demo-block title="基本用法" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </demo-block>

    <demo-block title="图标" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" icon="setting" />
        <wd-cell title="标题文字" value="内容">
          <template #icon>
            <view class="cell-icon"></view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </demo-block>

    <demo-block title="分组标题" transparent>
      <wd-cell-group title="交易管理" value="内容">
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="黄鹤断矶头，故人今在否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。" value="内容"></wd-cell>
      </wd-cell-group>
    </demo-block>

    <demo-block title="大尺寸" transparent>
      <wd-cell-group>
        <wd-cell size="large" title="标题文字" value="内容" />
        <wd-cell size="large" title="标题文字" value="内容" icon="setting" is-link />
        <wd-cell size="large" title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </demo-block>

    <demo-block title="展示边框线" transparent>
      <wd-cell-group title="交易管理" border>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell :border="false" title="标题文字" label="这一个cell不想要边框" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容"></wd-cell>
      </wd-cell-group>
    </demo-block>

    <demo-block title="点击事件" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" clickable @click="showToast" />
      </wd-cell-group>
    </demo-block>

    <demo-block title="页面跳转" transparent>
      <wd-cell-group>
        <wd-cell title="帮助与反馈" is-link to="/pages/index/Index" />
        <wd-cell title="设置" value="内容" is-link to="/pages/button/Index" replace></wd-cell>
      </wd-cell-group>
    </demo-block>

    <demo-block title="垂直居中" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" center />
        <wd-cell title="标题文字" label="描述信息" value="内容" center />
      </wd-cell-group>
    </demo-block>

    <demo-block title="表单属性" transparent>
      <wd-cell-group border>
        <wd-cell title="必填" required>
          <wd-rate v-model="rate" icon="dong" active-icon="dong" @change="handleRateChange" />
        </wd-cell>
        <wd-cell title="必填星号在右" required marker-side="after">
          <wd-rate v-model="rate1" icon="dong" active-icon="dong" @change="handleRateChange" />
        </wd-cell>
        <wd-cell title="上下结构" vertical required marker-side="after">
          <wd-slider v-model="slider" @change="handleSliderChange" />
        </wd-cell>
      </wd-cell-group>
    </demo-block>

    <demo-block title="设置宽度" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" label="这里是文字描述这里是文字描述这里是文字描述" title-width="200px" value="内容" />
      </wd-cell-group>
    </demo-block>

    <demo-block title="省略号显示" transparent>
      <wd-cell-group>
        <wd-cell title="正常显示" value="这是一段很长的文字内容，通常情况下会完整显示" />
        <wd-cell title="省略号显示" value="这是一段很长的文字内容，当启用ellipsis属性时，超出部分将显示省略号" ellipsis />
        <wd-cell title="左对齐省略" value="这是一段很长的文字内容，左对齐并启用省略号功能" value-align="left" ellipsis />
      </wd-cell-group>
    </demo-block>

    <demo-block title="自定义slot" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" center>
          <wd-button custom-class="custom-value" size="small" plain>按钮</wd-button>
        </wd-cell>
        <wd-cell title="标题文字" center>
          <view class="custom-value" style="height: 32px">
            <wd-switch v-model="switchValue" @change="handleSwitchChange" />
          </view>
        </wd-cell>
        <wd-cell title="标题文字" is-link to="/pages/index/index">
          <view class="custom-text">订购</view>
        </wd-cell>
        <wd-cell>
          <template #title>
            <view>
              <view style="display: inline-block">标题文字</view>
              <view class="end-time">30天后到期</view>
            </view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
  import { useToast } from '@/uni_modules/wot-ui-plus'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const rate = ref(0)
  const rate1 = ref(0)
  const rate2 = ref(0)
  const slider = ref(0)
  const switchValue = ref('')

  function handleRateChange({ value }: any) {
    console.log(value)
  }
  function handleSliderChange({ value }: any) {
    console.log(value)
  }
  function handleSwitchChange({ value }: any) {
    console.log(value)
  }
  const toast = useToast()

  function showToast() {
    toast.show(t('dian-ji'))
  }
</script>
<style lang="scss" scoped>
  .cell-icon {
    display: block;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    margin: 4px 4px 4px 0;
    background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
    background-size: cover;
  }
  .custom-value {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    white-space: nowrap;
  }
  .custom-text {
    color: #f0883a;
  }
  .end-time {
    display: inline-block;
    margin-left: 8px;
    border: 1px solid #faa21e;
    padding: 0 4px;
    font-size: 10px;
    color: #faa21e;
  }
</style>
