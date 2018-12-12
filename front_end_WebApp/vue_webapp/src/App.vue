<template>
  <div id="app">
    <img class="logo" src="./assets/Engaging_U.png">
    <br>
    <Navigation class="Navigate" v-if="['Login'].indexOf($route.name) == -1"></Navigation>
    <!-- <SideBar v-if="['Login'].indexOf($route.name) == -1"></SideBar> -->
    <router-view/>
    <Slide v-if="['Login'].indexOf($route.name) == -1">
      SideBar
        <router-link to="/generateInstanceID"><div id='sidebar'>Get Instance ID</div></router-link>
        <router-link to="/leaderboard"><div id='sidebar'>Leaderboard</div></router-link>
    </Slide>
  </div>
</template>

<script>
import Navigation from './components/NavBar/index'
import {Slide} from 'vue-burger-menu'
export default {
  name: 'App',
  components: {
    'Navigation': Navigation,
    Slide
  }
}
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
#sidebar{
  color: white;
}
.logo{
  position: absolute;
  width: auto;
  height: 70px;
  float: left;
  top: 8px;
  left: 180px
}
</style>
