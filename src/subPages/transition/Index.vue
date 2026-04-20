<template>
  <view>
    <page-wraper>
      <demo-block title="Fade 动画">
        <wd-button @click="fade">淡入</wd-button>
        <wd-button @click="fadeUp">向上淡入</wd-button>
        <wd-button @click="fadeDown">向下淡入</wd-button>
        <wd-button @click="fadeLeft">向左淡入</wd-button>
        <wd-button @click="fadeRight">向右淡入</wd-button>
      </demo-block>
      <demo-block title="Slide 动画">
        <wd-button @click="slideUp">向上滑入</wd-button>
        <wd-button @click="slideDown">向下滑入</wd-button>
        <wd-button @click="slideLeft">向左滑入</wd-button>
        <wd-button @click="slideRight">向右滑入</wd-button>
      </demo-block>
      <demo-block title="Zoom 动画">
        <wd-button @click="zoomIn">放大</wd-button>
        <wd-button @click="zoomOut">缩小</wd-button>
      </demo-block>
      <demo-block title="自定义动画">
        <wd-button @click="custom">自定义</wd-button>
      </demo-block>

      <wd-transition :show="show" :name="name" custom-class="block" />

      <wd-transition
        :show="customShow"
        :duration="{ enter: 700, leave: 1000 }"
        enter-class="custom-enter"
        enter-active-class="custom-enter-active"
        enter-to-class="custom-enter-to"
        leave-class="custom-leave"
        leave-active-class="custom-leave-active"
        leave-to-class="custom-leave-to"
        custom-class="block"
      />
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
  import type { TransitionName } from '@/uni_modules/wot-ui-plus/components/wd-transition/types'
  import { ref } from 'vue'

  const show = ref<boolean>(false)
  const name = ref<TransitionName>()
  const customShow = ref<boolean>(false)
  function fade() {
    transition('fade')
  }
  function fadeUp() {
    transition('fade-up')
  }
  function fadeDown() {
    transition('fade-down')
  }
  function fadeLeft() {
    transition('fade-left')
  }
  function fadeRight() {
    transition('fade-right')
  }
  function slideUp() {
    transition('slide-up')
  }
  function slideDown() {
    transition('slide-down')
  }
  function slideLeft() {
    transition('slide-left')
  }
  function slideRight() {
    transition('slide-right')
  }
  function zoomIn() {
    transition('zoom-in')
  }
  function zoomOut() {
    transition('zoom-out')
  }
  function custom() {
    customShow.value = true
    setTimeout(() => {
      customShow.value = false
    }, 1200)
  }
  function transition(transition: TransitionName) {
    name.value = transition
    show.value = true
    setTimeout(() => {
      show.value = false
    }, 500)
  }
</script>
<style lang="scss" scoped>
  :deep(button) {
    margin: 0 10px 10px 0;
  }
  :deep(.block) {
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -50px 0 0 -50px;
    width: 100px;
    height: 100px;
    background: #0083ff;
  }

  :deep(.custom-enter-active),
  :deep(.custom-leave-active) {
    transition-property: background, transform;
  }
  :deep(.custom-enter) {
    transform: translate3d(-100px, -100px, 0) rotate(-180deg);
    background: #ff0000;
  }
  :deep(.custom-leave-to) {
    transform: translate3d(100px, 100px, 0) rotate(180deg);
    background: #ff0000;
  }
</style>
