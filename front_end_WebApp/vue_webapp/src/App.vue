<template>
  <div id="app">
    <div class="main-horizontal-wrapper">
      <div class="main-header-top">
        <MainHeader v-if="['Login'].indexOf($route.name) == -1"></MainHeader>
        <!--<Slide v-if="['Login'].indexOf($route.name) == -1">
            SideBar
            <router-link to="/generateInstanceID"><div id='sidebar'>Get Instance ID</div></router-link>
            <router-link to="/leaderboard"><div id='sidebar'>Leaderboard</div></router-link>
        </Slide>-->
      </div>
      <div class= "main" v-bind:style="'{margin-left: sidebar}'">
          <Navigation class="Navigate" v-if="['Login'].indexOf($route.name) == -1"></Navigation>
          <!--<SideBar class="SideBar" v-if="['Login'].indexOf($route.name) == -1"></SideBar> -->
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/NavBar/index'
import MainHeader from './components/MainHeader/index'
// import SideBar from './components/SideBar/index'
// import {Slide} from 'vue-burger-menu'

export default {
  name: 'App',
  components: {
    'Navigation': Navigation,
    'MainHeader': MainHeader,
    // Slide
    // 'SideBar': SideBar
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
  margin-top:126px;
}

body{
  background-color: #F2F5F7;
}

#sidebar{ 
  color: white;
}

.main-header-top{
  display: block;
  margin:auto;
}

.main-horizontal-wrapper .mainHeader,
.main-horizontal-wrapper .main-header-btm{
  padding-left: 0px;
  padding-right: 0px;

}

.main-horizontal-wrapper{
  min-height: 80px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index:999;
}

.main-header-btm{
  margin: auto;
  height:100%
}

.Navigate{
  max-height: 45px;
  background-color: white;
  border-bottom: 2px solid #e6e6e6;
}

a{
  text-decoration-line: none;
}

</style>
