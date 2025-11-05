<!-- 首页GitHub数据展示组件，显示Star数量和NPM下载量等信息 -->

<script setup lang="ts"></script>

<template>
  <p class="home-star">
    <a href="https://github.com/Moonofweisheng/wot-ui-plus">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Moonofweisheng/wot-ui-plus?logo=github&color=%234d80f0&link=https%3A%2F%2Fgithub.com%2FMoonofweisheng%2Fwot-ui-plus&style=flat-square">
 </a>


<!-- <a href="https://github.com/Moonofweisheng/wot-ui-plus">
  <img alt="GitHub" src="https://img.shields.io/codecov/c/github/Moonofweisheng/wot-ui-plus?style=flat-square">
 </a> -->

<a href="https://www.npmjs.com/package/wot-ui-plus">
  <img alt="npm" src="https://img.shields.io/npm/dm/wot-ui-plus?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwot-ui-plus&style=flat-square">
</a>

 <a href="https://www.npmjs.com/package/wot-ui-plus">
  <img alt="npm" src="https://img.shields.io/npm/v/wot-ui-plus?logo=npm&color=%234d80f0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwot-ui-plus&style=flat-square">
</a>
  </p>
</template>

<style>
.home-star{
  display: flex;
  align-items: center;
  padding-top: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
