<template>
  <div id="app">
    <div class="menu">
      <router-link to="/home">主页</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="source">
      <a href="https://github.com/sudh-17/vue-antd-todomvc/tree/master" target="_blank">源码地址</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
.menu {
  position: absolute;
  top: 8px;
  left: 19px;
  font-size: 25px;
  font-weight: bold;
}
.source {
  position: absolute;
  left: 17px;
  top: 100px;
  font-size: 24px;
}
</style>
