<template>
  <view class="wd-waterfall">
    <view v-for="(columnList, columnIndex) in columns" :key="columnIndex" :id="`wd-column-${columnIndex}`" class="wd-waterfall--column">
      <slot :columnList="columnList" :columnIndex="columnIndex"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-waterfall',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { waterfallProps } from './types'

const props = defineProps(waterfallProps)

// 定义组件抛出的事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
}>()

// 响应式数据
const columns = ref<any[][]>([])
const tempList = ref<any[]>([])

// 计算属性
const flowList = computed(() => props.modelValue)

const copyFlowList = computed(() => {
  return cloneData(flowList.value)
})

// 监听数据变化
watch(
  copyFlowList,
  (nVal, oVal) => {
    // 取差值，即这一次数组变化新增的部分
    const startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
    // 拼接上原有数据
    tempList.value = tempList.value.concat(cloneData(nVal.slice(startIndex)))
    splitData()
  },
  { deep: true }
)

// 生命周期钩子
onMounted(() => {
  initColumns()
  tempList.value = cloneData(copyFlowList.value)

  nextTick(() => {
    // 短暂延迟确保DOM已更新
    setTimeout(() => {
      splitData()
    }, 10)
  })
})

// 方法定义
function initColumns() {
  const columnCount = parseInt(props.column as unknown as string)
  columns.value = []
  for (let i = 0; i < columnCount; i++) {
    columns.value.push([])
  }
}

async function splitData() {
  if (!tempList.value.length) {
    return
  }

  if (!columns.value.length) {
    return
  }

  // 获取所有列的高度
  const columnHeights: number[] = []
  for (let i = 0; i < columns.value.length; i++) {
    try {
      const rect = await getElementRect(`#wd-column-${i}`)
      columnHeights.push(rect ? rect.height : 0)
    } catch (error) {
      columnHeights.push(0)
    }
  }

  // 找到最短的列
  let minHeight = Math.min(...columnHeights)
  let minIndex = columnHeights.indexOf(minHeight)

  // 如果所有列高度相同，使用轮询分配
  if (columnHeights.every((height) => height === minHeight)) {
    minIndex = getShortestColumnIndex()
  }

  const item = tempList.value[0]
  // 解决多次快速上拉后，可能数据会乱的问题
  if (!item) {
    return
  }

  // 将数据添加到最短的列
  columns.value[minIndex].push(item)

  // 移除临时列表的第一项
  tempList.value.splice(0, 1)

  // 如果临时数组还有数据，继续循环
  if (tempList.value.length) {
    setTimeout(() => {
      splitData()
    }, props.addTime as number)
  }
}

function getShortestColumnIndex() {
  const minLength = Math.min(...columns.value.map((col) => col.length))
  return columns.value.findIndex((col) => col.length === minLength)
}

function cloneData(data: any) {
  return JSON.parse(JSON.stringify(data))
}

// 获取元素位置信息
function getElementRect(selector: string): Promise<{ height: number } | null> {
  return new Promise((resolve) => {
    // 适配不同环境的元素查询方法
    if (typeof uni !== 'undefined') {
      uni
        .createSelectorQuery()
        .select(selector)
        .boundingClientRect((data) => {
          resolve(data as { height: number } | null)
        })
        .exec()
    } else if (typeof document !== 'undefined') {
      const element = document.querySelector(selector)
      if (element) {
        const rect = element.getBoundingClientRect()
        resolve({ height: rect.height })
      } else {
        resolve(null)
      }
    } else {
      resolve(null)
    }
  })
}

// 清空数据列表
function clear() {
  columns.value = columns.value.map(() => [])
  emit('update:modelValue', [])
  tempList.value = []
}

// 清除某一条指定的数据
function remove(id: string | number) {
  let index = -1
  let columnIndex = -1

  // 在所有列中查找要删除的数据
  for (let i = 0; i < columns.value.length; i++) {
    index = columns.value[i].findIndex((val) => val[props.idKey] == id)
    if (index !== -1) {
      columnIndex = i
      break
    }
  }

  // 如果找到了，删除对应的数据
  if (index !== -1 && columnIndex !== -1) {
    columns.value[columnIndex].splice(index, 1)
  }

  // 同时清除父组件的数据中的对应id的条目
  const flowIndex = flowList.value.findIndex((val) => (val as any)[props.idKey] == id)
  if (flowIndex !== -1) {
    const newList = [...flowList.value]
    newList.splice(flowIndex, 1)
    emit('update:modelValue', newList)
  }
}

// 修改某条数据的某个属性
function modify(id: string | number, key: string, value: any) {
  let index = -1
  let columnIndex = -1

  // 在所有列中查找要修改的数据
  for (let i = 0; i < columns.value.length; i++) {
    index = columns.value[i].findIndex((val) => val[props.idKey] == id)
    if (index !== -1) {
      columnIndex = i
      break
    }
  }

  // 如果找到了，修改对应的数据
  if (index !== -1 && columnIndex !== -1) {
    columns.value[columnIndex][index][key] = value
  }

  // 修改父组件的数据中的对应id的条目
  const flowIndex = flowList.value.findIndex((val) => (val as any)[props.idKey] == id)
  if (flowIndex !== -1) {
    // 复制一份数据进行修改，避免直接修改原数组
    const newList = cloneData(flowList.value)
    newList[flowIndex][key] = value
    emit('update:modelValue', newList)
  }
}

// 暴露方法给组件外部使用
defineExpose({
  clear,
  remove,
  modify
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
