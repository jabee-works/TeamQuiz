<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ul class="tab-menu-base">
        <!-- `router.js` で定義したルーティングルールとの紐付けを行っている -->
        <li><router-link to="/">Home</router-link></li>
        <!-- *** -->
        <!-- 省略 -->
        <!-- *** -->
        <li><router-link to="/routing">Rounting Test</router-link></li>
      </ul>
  </div>
</template>

<script>
// import Input from './components/Input.vue'

// export default {
//   name: 'app',
//   components: {
//     Input
//   }
// }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
