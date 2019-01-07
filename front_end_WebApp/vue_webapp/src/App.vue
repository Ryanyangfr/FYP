<template>
  <div id="app">
    <div class="main-horizontal-wrapper">
      <MainHeader class="mainHeader" v-if="['Login'].indexOf($route.name) == -1"></MainHeader>
      <div class= "main-header-btm">
          <Navigation class="Navigate" v-if="['Login'].indexOf($route.name) == -1"></Navigation>
          <!-- <SideBar v-if="['Login'].indexOf($route.name) == -1"></SideBar> -->
          <router-view/>
          <!--<Slide v-if="['Login'].indexOf($route.name) == -1">
            SideBar
            <router-link to="/generateInstanceID"><div id='sidebar'>Get Instance ID</div></router-link>
            <router-link to="/leaderboard"><div id='sidebar'>Leaderboard</div></router-link>
          </Slide>-->
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from './components/NavBar/index'
import MainHeader from './components/MainHeader/index'
import {Slide} from 'vue-burger-menu'

export default {
  name: 'App',
  components: {
    'Navigation': Navigation,
    Slide,
    'MainHeader': MainHeader
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
  /*background-color: #F2F5F7;*/
}
#sidebar{ 
  color: white;
}

.main-horizontal-wrapper .mainHeader,
.main-horizontal-wrapper .main-header-btm{
  padding-left: 0px;
  padding-right: 0px;

}

.main-horizontal-wrapper{
  min-height: 100vh;
}

.mainHeader{
    margin: 0px;
    max-height: 75px;
    overflow: hidden;
    background: #5a52c4;
    width:100%
}

.main-header-btm{
  margin: auto;
}

.Navigate{
  max-height: 50px;
  background-color: white;
  border-bottom: 2px solid #e6e6e6;
}

a{
  text-decoration-line: none;
}
</style>
