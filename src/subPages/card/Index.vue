<template>
  <page-wraper>
    <view>
      <demo-block :title="$t('ji-ben-shi-yong')" transparent>
        <wd-card title="《静夜思》">
          {{ value1 }}
          <template #footer>
            <wd-button size="small" plain>{{ $t('cha-kan-xiang-qing') }}</wd-button>
          </template>
        </wd-card>
        <wd-divider dashed />
        <wd-card title="《静夜思》矩形卡片 type='rectangle'" type="rectangle">
          {{ value1 }}
          <template #footer>
            <wd-button size="small" plain>{{ $t('cha-kan-xiang-qing') }}</wd-button>
          </template>
        </wd-card>

        <wd-divider dashed />

        <wd-card :title="$t('xin-ding-dan')">
          <view class="content">
            <image src="../../static/img/jd.png" alt="joy" style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
            <view>
              <view>{{ $t('mi-zi-lan-mizland-xin-xi-lan-jin-kou-duo-hua-zhong') }}</view>
              <view>{{ $t('shu-liang-1-jian') }}</view>
              <view>{{ $t('jine2908') }}</view>
              <view>{{ $t('mai-jia-ni-cheng-joy') }}</view>
            </view>
          </view>
          <template #footer>
            <wd-button size="small" plain>{{ $t('cha-kan-xiang-qing-0') }}</wd-button>
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
              <view>{{ $t('20200203-fu-wu-dao-qi') }}</view>
              <view class="title-tip">
                <wd-icon name="attention" size="14px" custom-style="vertical-align: bottom" />
                {{ $t('nin-ke-yi-qu-dian-nao-shang-shi-yong-gai-fu-wu') }}
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
              <view class="custom-main">{{ $t('zhi-yun-hao-ke-crm-duan-xin-cui-ping-ying-xiao') }}</view>
              <view class="custom-sub">{{ $t('gao-ji-ban-kuai-su-xi-fen-zhou-qi-yi-nian') }}</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">{{ $t('ping-jia') }}</wd-button>
              <wd-button size="small">{{ $t('li-ji-shi-yong') }}</wd-button>
            </view>
          </template>
        </wd-card>
      </demo-block>

      <demo-block :title="$t('ju-xing-ka-pian')" transparent>
        <wd-card :title="$t('20200203-fu-wu-dao-qi-0')" type="rectangle">
          <view style="height: 40px" class="content">
            <image
              src="../../static/img/jd.png"
              width="40"
              height="40"
              alt="joy"
              style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px"
            />
            <view>
              <view class="custom-main">{{ $t('zhi-yun-hao-ke-crm-duan-xin-cui-ping-ying-xiao') }}</view>
              <view class="custom-sub">{{ $t('gao-ji-ban-kuai-su-xi-fen-zhou-qi-yi-nian-0') }}</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">{{ $t('ping-jia-0') }}</wd-button>
              <wd-button size="small">{{ $t('li-ji-shi-yong') }}</wd-button>
            </view>
          </template>
        </wd-card>

        <wd-divider dashed />

        <wd-card type="rectangle">
          <template #title>
            <view class="title">
              <view>{{ $t('20200203-fu-wu-dao-qi-1') }}</view>
              <view class="title-tip">
                <wd-icon name="attention" size="14px" custom-style="vertical-align: bottom" />
                {{ $t('nin-ke-yi-qu-dian-nao-shang-shi-yong-gai-fu-wu') }}
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
              <view class="custom-main">{{ $t('zhi-yun-hao-ke-crm-duan-xin-cui-ping-ying-xiao') }}</view>
              <view class="custom-sub">{{ $t('gao-ji-ban-kuai-su-xi-fen-zhou-qi-yi-nian-1') }}</view>
            </view>
          </view>
          <template #footer>
            <view>
              <wd-button size="small" plain custom-style="margin-right: 8px">{{ $t('ping-jia-1') }}</wd-button>
              <wd-button size="small">{{ $t('li-ji-shi-yong') }}</wd-button>
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
