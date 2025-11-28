<template>
  <page-wraper>
    <view>
      <demo-block title="基本使用" transparent>
        <wd-card title="《静夜思》">
          {{ value1 }}
          <template #footer>
            <wd-button size="small" plain>查看详情</wd-button>
          </template>
        </wd-card>
        <wd-divider dashed />
        <wd-card title="《静夜思》矩形卡片 type='rectangle'" type="rectangle">
          {{ value1 }}
          <template #footer>
            <wd-button size="small" plain>查看详情</wd-button>
          </template>
        </wd-card>

        <wd-divider dashed />

        <wd-card title="新订单">
          <view class="content">
            <image src="../../static/img/jd.png" alt="joy" style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>蜜滋兰(mizland)新西兰进口多花种…</view>
              <view>数量：1件</view>
              <view>金额：29.08</view>
              <view>买家昵称：Joy</view>
            </view>
          </view>
          <template #footer>
            <wd-button size="small" plain>查看详情</wd-button>
          </template>
        </wd-card>
      </demo-block>

      <demo-block title="去除footer" transparent>
        <wd-card title="头像" type="rectangle">
          <view>
            <wd-avatar src="./../../static/img/a1.png" />
            <text>你好，世界！</text>
          </view>
        </wd-card>

        <wd-divider dashed />

        <wd-card>
          <template #title>
            <view class="title">
              <view>2025-10-01服务到期</view>
              <view class="title-tip">
                <wd-icon name="attention" size="14px" custom-style="vertical-align: bottom" />
                您可以去电脑上使用该服务
              </view>
            </view>
          </template>

          <view style="height: 40px" class="content">
            <image
              src="../../static/img/jd.png"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">智云好客CRM短信_催评营销</view>
              <view class="custom-sub">高级版 - 快速吸粉</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">评价</wd-button>
              <wd-button size="small">立即使用</wd-button>
            </view>
          </template>
        </wd-card>
      </demo-block>

      <demo-block title="矩形卡片" transparent>
        <wd-card title="2025-10-01服务到期" type="rectangle">
          <view style="height: 40px" class="content">
            <image
              src="../../static/img/jd.png"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">智云好客CRM短信_催评营销</view>
              <view class="custom-sub">高级版 - 快速吸粉</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">评价</wd-button>
              <wd-button size="small">立即使用</wd-button>
            </view>
          </template>
        </wd-card>

        <wd-divider dashed />

        <wd-card type="rectangle">
          <template #title>
            <view class="title">
              <view>2025-10-01服务到期</view>
              <view class="title-tip">
                <wd-icon name="attention" size="14px" custom-style="vertical-align: bottom" />
                您可以去电脑上使用该服务
              </view>
            </view>
          </template>

          <view style="height: 40px" class="content">
            <image
              src="../../static/img/jd.png"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">智云好客CRM短信_催评营销</view>
              <view class="custom-sub">高级版 - 快速吸粉</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">评价</wd-button>
              <wd-button size="small">立即使用</wd-button>
            </view>
          </template>
        </wd-card>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'

  const value1 = ref('床前明月光，疑是地上霜。举头望明月，低头思故乡。')
</script>
<style lang="scss" scoped>
  .wot-theme-dark {
    .title-tip {
      color: rgba(232, 230, 227, 0.8);
    }

    .custom-main {
      color: $-dark-color;
    }

    .custom-sub {
      color: $-dark-color;
    }
  }

  .content,
  .title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .content {
    justify-content: flex-start;
  }

  .title {
    justify-content: space-between;
  }

  .title-tip {
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
  }

  .custom-main {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }

  .custom-sub {
    color: rgba(0, 0, 0, 0.25);
    font-size: 12px;
  }
</style>
