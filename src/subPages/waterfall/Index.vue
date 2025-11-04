<template>
  <page-wraper>
    <wd-waterfall v-model="flowList" :column="columns" ref="waterfallRef">
      <template #default="{ columnList }">
        <view class="demo-warter" v-for="(item, index) in columnList" :key="index">
          <wd-lazy-load threshold="-450" round="10" :image="item.image" :index="index" />
          <view class="demo-title">{{ item.title }}</view>
          <view class="demo-price">{{ item.price }}元</view>
          <view class="demo-tag">
            <view class="demo-tag-owner">自营</view>
            <view class="demo-tag-text">放心购</view>
          </view>
          <view class="demo-shop">{{ item.shop }}</view>
          <view class="wd-close">
            <wd-icon name="close" color="#fa3534" size="15" @click="handleRemove(item.id)"></wd-icon>
          </view>
        </view>
      </template>
    </wd-waterfall>
    <wd-loadmore :state="loadStatus" @reload="loadMoreData"></wd-loadmore>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'

// 定义数据类型
interface ItemData {
  id?: string
  price: number
  title: string
  shop: string
  image: string
}

type LoadMoreState = 'loading' | 'error' | 'finished'

// 响应式数据
const columns = ref<number>(2)
const loadStatus = ref<LoadMoreState>('loading')
const flowList = ref<ItemData[]>([])
const waterfallRef = ref<any>(null)

// 预设图片数据
const imageData = [
  {
    price: 35,
    title: '北国风光，千里冰封，万里雪飘',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic.chinaz.net/files/default/imgs/2024-12-20/697347db38cd20d4.jpg'
  },
  {
    price: 75,
    title: '望长城内外，惟余莽莽',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic1.chinaz.net/files/default/imgs/2024-12-21/8834261cfdc8553f_s.jpg'
  },
  {
    price: 385,
    title: '大河上下，顿失滔滔',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic.chinaz.net/files/default/imgs/2024-12-20/6c6a64861a36a034_s.jpg'
  },
  {
    price: 784,
    title: '欲与天公试比高',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic.chinaz.net/files/default/imgs/2024-12-20/4a2c4018bc42c4c7_s.jpg'
  },
  {
    price: 7891,
    title: '须晴日，看红装素裹，分外妖娆',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic.chinaz.net/files/default/imgs/2024-12-16/1fe12b0e5662eeb7_s.jpg'
  },
  {
    price: 2341,
    shop: '李白杜甫白居易旗舰店',
    title: '江山如此多娇，引无数英雄竞折腰',
    image: 'https://scpic3.chinaz.net/files/default/imgs/2024-12-17/107429f63d533b7c_s.jpg'
  },
  {
    price: 661,
    shop: '李白杜甫白居易旗舰店',
    title: '惜秦皇汉武，略输文采',
    image: 'https://scpic3.chinaz.net/files/default/imgs/2024-10-25/d917b43199b24fc1_s.jpg'
  },
  {
    price: 1654,
    title: '唐宗宋祖，稍逊风骚',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic3.chinaz.net/files/default/imgs/2024-11-22/b03192d842a1beea_s.jpg'
  },
  {
    price: 1678,
    title: '一代天骄，成吉思汗',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic3.chinaz.net/files/default/imgs/2024-11-17/4ba96a654e7cf8b1_s.jpg'
  },
  {
    price: 924,
    title: '只识弯弓射大雕',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic3.chinaz.net/files/default/imgs/2024-10-24/746095caea7c22fc_s.jpg'
  },
  {
    price: 8243,
    title: '俱往矣，数风流人物，还看今朝',
    shop: '李白杜甫白居易旗舰店',
    image: 'https://scpic1.chinaz.net/files/default/imgs/2024-10-31/e55effd975a79dc1_s.jpg'
  }
]

// 生成随机索引的辅助函数
const getRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * max)
}

// 加载更多数据
const loadMoreData = (): void => {
  for (let i = 0; i < 10; i++) {
    const index = getRandomIndex(imageData.length)
    // 深拷贝避免对象引用导致的数据混乱
    const item: ItemData = JSON.parse(JSON.stringify(imageData[index]))
    item.id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    flowList.value.push(item)
  }
}

// 移除指定索引的项
const handleRemove = (id: string): void => {
  waterfallRef.value?.remove(id)
}
// 页面加载时初始化数据
onLoad(() => {
  loadMoreData()
  // 模拟初始加载完成
  setTimeout(() => {
    loadStatus.value = 'finished'
  }, 1500)
})

// 页面滚动到底部时加载更多
onReachBottom(() => {
  loadStatus.value = 'loading'
  // 模拟数据加载延迟
  setTimeout(() => {
    loadMoreData()
    loadStatus.value = 'finished'
  }, 1000)
})
</script>

<style lang="scss" scoped>
.demo-warter {
  border-radius: 8px;
  margin: 5px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  .wd-close {
    position: absolute;
    top: 0px;
    right: 1px;
    opacity: 0;
  }
  /* #ifdef H5 */
  &:hover {
    .wd-close {
      opacity: 1;
    }
  }
  /* #endif */
}

.demo-image {
  width: 100%;
  height: 200rpx;
  border-radius: 4px;
}

.demo-title {
  font-size: 14px;
  margin-top: 5px;
  color: #303133;
  word-break: break-all;
}

.demo-tag {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.demo-tag-owner {
  background-color: #f56c6c;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 25px;
  font-size: 10px;
  line-height: 1;
}

.demo-tag-text {
  border: 1px solid #409eff;
  color: #409eff;
  margin-left: 10px;
  border-radius: 25px;
  line-height: 1;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  font-size: 10px;
}

.demo-price {
  font-size: 15px;
  color: #f56c6c;
  margin-top: 5px;
}

.demo-shop {
  font-size: 11px;
  color: #909399;
  margin-top: 5px;
}
</style>
