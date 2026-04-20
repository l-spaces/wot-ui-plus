<template>
  <wd-toast></wd-toast>
  <wd-slider-button />
</template>

<script setup lang="ts">
  import { useToast } from '@/uni_modules/wot-ui-plus'

  const toast = useToast()

  function showToast() {
    toast.show('提示信息')
  }
</script>
