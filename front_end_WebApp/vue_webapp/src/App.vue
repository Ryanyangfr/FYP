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
      <div v-bind:class="{main: this.$store.state.showSidebar}">
          <Navigation class="Navigate" v-if="['Login'].indexOf($route.name) == -1"></Navigation>
          <!--<SideBar class="SideBar" v-if="['Login'].indexOf($route.name) == -1"></SideBar> -->
      </div>
    </div>
    
      <div v-bind:class="{ main: this.$store.state.showSidebar }">
        <div class="main-margin-top" v-if="['Login'].indexOf($route.name) == -1"></div>
        <router-view/>
      </div>
  </div>
</template>

<script>
import Navigation from './components/NavBar/index'
import MainHeader from './components/MainHeader/index'
// import SideBar from './components/SideBar/index'
// import {Slide} from 'vue-burger-menu'

export default {
  name: 'App',
  computed: {
    showSidebar(){
      return this.$store.state.showSidebar;
      console.log(this.$store.state.showSidebar);

    }
  },   

  components: {
    'Navigation': Navigation,
    'MainHeader': MainHeader,
    // Slide
    // 'SideBar': SideBar
  },

 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top:126px;*/
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
  z-index:3;
}

.main-header-btm{
  margin: auto;
  height:100%
}

.Navigate{
  max-height: 45px;
  background-color: white;
  /* border-bottom: 2px solid #e6e6e6; */
  box-shadow: 0px 4px 3px -2px #e5e5e5;
  /* box-shadow: 0 0 2px #e6e6e6; */
}

a{
  text-decoration-line: none;
}

.main-margin-top{
  margin-top:126px;
}

.main{
  margin-left: 15%;
  z-index: 3;
  animation-duration: 0.5s;
  animation-direction: normal;
  animation-delay: 0s;
  transition: 0.5s ease-in-out;
}

/*@keyframes pushRight{
  0%{
    margin: 0px;
  }

  100%{
    margin-left: 268px;
  }

  
}*/

@media screen and (max-width: 900px){
        .main{
          margin-left: 0px
        }
    }

</style>
