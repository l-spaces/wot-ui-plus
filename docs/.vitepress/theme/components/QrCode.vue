<!-- 二维码显示组件，鼠标悬停时显示二维码图片 -->
<template>
  <div @mouseenter="showQRCode = true" @mouseleave="showQRCode = false">
    <el-tooltip
      placement="bottom"
       effect="light"
      :visible="showQRCode"
      :popper-options="{ modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] }"
    >
    </el-tooltip>
  </div> 
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElTooltip } from 'element-plus';

const showQRCode = ref(false);
</script>

<style scoped>

.qr-code {
  width: 130px; /* 设置二维码的宽度 */
  height: auto; /* 高度自适应 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}
</style>
