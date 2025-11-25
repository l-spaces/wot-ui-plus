<template>
  <page-wraper show-dark-mode>
    <demo-block title="主色调">
      <view class="color-box">
        <view class="color-item" style="background: #2979ff" @click="handleClick('#2979ff')">
          <text class="color-title">Primary</text>
          <text class="color-value">#2979ff</text>
        </view>
        <view class="color-item" style="background: #2b85e4" @click="handleClick('#2b85e4')">
          <text class="color-title">Dark</text>
          <text class="color-value">#2b85e4</text>
        </view>
        <view class="color-item" style="background: #a0cfff" @click="handleClick('#a0cfff')">
          <text class="color-title">Disabled</text>
          <text class="color-value">#a0cfff</text>
        </view>
        <view class="color-item" style="background: #ecf5ff; color: #909399" @click="handleClick('#ecf5ff')">
          <text class="color-title">Light</text>
          <text class="color-value">#ecf5ff</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="成功色">
      <view class="color-box">
        <view class="color-item" style="background: #19be6b" @click="handleClick('#19be6b')">
          <text class="color-title">Success</text>
          <text class="color-value">#19be6b</text>
        </view>
        <view class="color-item" style="background: #18b566" @click="handleClick('#18b566')">
          <text class="color-title">Dark</text>
          <text class="color-value">#18b566</text>
        </view>
        <view class="color-item" style="background: #71d5a1" @click="handleClick('#71d5a1')">
          <text class="color-title">Disabled</text>
          <text class="color-value">#71d5a1</text>
        </view>
        <view class="color-item" style="background: #dbf1e1; color: #909399" @click="handleClick('#dbf1e1')">
          <text class="color-title">Light</text>
          <text class="color-value">#dbf1e1</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="警告色">
      <view class="color-box">
        <view class="color-item" style="background: #ff9900" @click="handleClick('#ff9900')">
          <text class="color-title">Warning</text>
          <text class="color-value">#ff9900</text>
        </view>
        <view class="color-item" style="background: #f29100" @click="handleClick('#f29100')">
          <text class="color-title">Dark</text>
          <text class="color-value">#f29100</text>
        </view>
        <view class="color-item" style="background: #fcbd71" @click="handleClick('#fcbd71')">
          <text class="color-title">Disabled</text>
          <text class="color-value">#fcbd71</text>
        </view>
        <view class="color-item" style="background: #fdf6ec; color: #909399" @click="handleClick('#fdf6ec')">
          <text class="color-title">Light</text>
          <text class="color-value">#fdf6ec</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="危险出错色">
      <view class="color-box">
        <view class="color-item" style="background: #fa3534" @click="handleClick('#fa3534')">
          <text class="color-title">Error</text>
          <text class="color-value">#fa3534</text>
        </view>
        <view class="color-item" style="background: #dd6161" @click="handleClick('#dd6161')">
          <text class="color-title">Dark</text>
          <text class="color-value">#dd6161</text>
        </view>
        <view class="color-item" style="background: #fab6b6" @click="handleClick('#fab6b6')">
          <text class="color-title">Disabled</text>
          <text class="color-value">#fab6b6</text>
        </view>
        <view class="color-item" style="background: #fef0f0; color: #909399" @click="handleClick('#fef0f0')">
          <text class="color-title">Light</text>
          <text class="color-value">#fef0f0</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="信息色">
      <view class="color-box">
        <view class="color-item" style="background: #909399" @click="handleClick('#909399')">
          <text class="color-title">Info</text>
          <text class="color-value">#909399</text>
        </view>
        <view class="color-item" style="background: #82848a" @click="handleClick('#82848a')">
          <text class="color-title">Dark</text>
          <text class="color-value">#82848a</text>
        </view>
        <view class="color-item" style="background: #c8c9cc" @click="handleClick('#c8c9cc')">
          <text class="color-title">Disabled</text>
          <text class="color-value">#c8c9cc</text>
        </view>
        <view class="color-item" style="background: #f4f4f5; color: #909399" @click="handleClick('#f4f4f5')">
          <text class="color-title">Light</text>
          <text class="color-value">#f4f4f5</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="文字颜色">
      <view class="color-box">
        <view class="color-item" style="background: #000000" @click="handleClick('#000000')">
          <text class="color-title">主要文字</text>
          <text class="color-value">#000000</text>
        </view>
        <view class="color-item" style="background: #262626" @click="handleClick('#262626')">
          <text class="color-title">常规文字</text>
          <text class="color-value">#262626</text>
        </view>
        <view class="color-item" style="background: #595959" @click="handleClick('#595959')">
          <text class="color-title">次要文字</text>
          <text class="color-value">#595959</text>
        </view>
        <view class="color-item" style="background: #8c8c8c" @click="handleClick('#8c8c8c')">
          <text class="color-title">占位文字</text>
          <text class="color-value">#8c8c8c</text>
        </view>
        <view class="color-item" style="background: #c0c4cc" @click="handleClick('#c0c4cc')">
          <text class="color-title">禁用文字</text>
          <text class="color-value">#c0c4cc</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="边框颜色">
      <view class="color-box">
        <view class="color-item" style="background: #dcdfe6; color: #909399" @click="handleClick('#dcdfe6')">
          <text class="color-title">一级边框</text>
          <text class="color-value">#dcdfe6</text>
        </view>
        <view class="color-item" style="background: #e4e7ed; color: #909399" @click="handleClick('#e4e7ed')">
          <text class="color-title">二级边框</text>
          <text class="color-value">#e4e7ed</text>
        </view>
        <view class="color-item" style="background: #ebeef5; color: #909399" @click="handleClick('#ebeef5')">
          <text class="color-title">三级边框</text>
          <text class="color-value">#ebeef5</text>
        </view>
        <view class="color-item" style="background: #f2f6fc; color: #909399" @click="handleClick('#f2f6fc')">
          <text class="color-title">四级边框</text>
          <text class="color-value">#f2f6fc</text>
        </view>
      </view>
    </demo-block>

    <demo-block title="背景颜色">
      <view class="color-box">
        <view class="color-item" style="background: #f2f3f5; color: #909399" @click="handleClick('#f2f3f5')">
          <text class="color-title">背景颜色</text>
          <text class="color-value">#f2f3f5</text>
        </view>
        <view class="color-item" style="background: Transparent; color: #909399" @click="handleClick('Transparent')">
          <text class="color-title">背景颜色</text>
          <text class="color-value">Transparent</text>
        </view>
      </view>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useToast } from '@/uni_modules/wot-ui-plus'
  const toast = useToast()

  function handleClick(name: string) {
    // #ifdef H5
    uni.setClipboardData({
      data: `${name}`,
      showToast: false,
      success: () => {
        toast.show({
          position: 'bottom',
          msg: `${name}`
        })
      }
    })

    // #endif
  }

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  .color-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    text-align: center;

    .color-item {
      display: flex;
      flex: 1;
      margin: 0 4px;
      flex-direction: column;
      border-radius: 5px;
      padding: 5px 0;
    }

    .color-title {
      font-size: 11px;
    }

    .color-value {
      font-size: 10px;
    }
  }
</style>
