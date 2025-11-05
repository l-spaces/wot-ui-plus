<!-- 导航栏标题后缀组件，用于显示当前版本号 -->
<script setup lang="ts">
import packageConfig from '../../../../package.json'

</script>

<template>
  <el-tag text style="vertical-align: middle;margin-left:8px;" size="small" effect="plain">{{ packageConfig.version }}</el-tag>
</template>
