<template>
  <div id="app">
    <div class="main-horizontal-wrapper">
      <div class="main-header-top">
        <MainHeader v-if="['Login'].indexOf($route.name) == -1"></MainHeader>
      </div>
      <div v-bind:class="{main: this.$store.state.showSidebar}">
          <Navigation class="Navigate" v-if="['Login'].indexOf($route.name) == -1"></Navigation>
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

export default {
  name: 'App',
  computed: {

    //show the side menu on login
    showSidebar(){
      return this.$store.state.showSidebar;

    }
  },   

  components: {
    'Navigation': Navigation,
    'MainHeader': MainHeader,
  },

}
</script>

<style>

    ::-webkit-scrollbar {
        width: 8px;
        background-color: #F5F5F5;

    }

    ::-webkit-scrollbar-thumb{
        background-color: #d2d5d8;
    }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  background-color: #F2F5F7!important;
}

#sidebar{ 
  color: white;
}

.main-header-top{
  display: block;
  margin:auto;
}

.main-horizontal-wrapper .mainHeader{
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

.Navigate{
  max-height: 45px;
  background-color: white;
  box-shadow: 0px 4px 3px -2px #e5e5e5;
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

@media screen and (max-width: 1125px){
        .main{
          margin-left: 0px
        }
    }

</style>
