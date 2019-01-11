<template>
    <div>
        <div class="container-horizontal">
            <div class="logo"> 
                <a href="login"><img src="@/assets/titlelogo.png"></a>
            </div>
            <div class="header-left">
                <div class = hamburger-menu> 
                    <a href='#' @click = "showOrHide()"><font-awesome-icon class = "hamburger-icon" icon="bars"  size="2x"/></a>
                </div> 
            </div>
        </div>
        
        <transition name="slide">
            <div class="sideBar" v-if="show">
                <ul>
                    <li><router-link to="/generateInstanceID">Generate Instance ID</router-link></li>
                    <li><router-link to="/leaderboard">Leaderboard</router-link></li>
                    <li><router-link to='/viewSubmissions'>Submissions</router-link></li>
                </ul>
            </div>
        </transition>

    </div>
</template>

<script>

export default{ 
    name: 'MainHeader',
    data() {
        return{
            show: false
        }
    },
    methods:{
        showOrHide(){
            if(this.show){
                this.show = false;
            } else{
                this.show = true;
            }
        }
    }
  
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

    .sideBar{
        position: absolute;
        background-color: white;
        width: 20%;
        border-right: 1px solid #e6e6e6;
        height: calc(100% - 65px);
        z-index: 1;
        position:fixed;
    }

    .slide-enter {
        transform: translate(-100%, 0);
    }
    .slide-leave-to {
        transform: translate(-100%, 0);
    }

    .slide-leave-active,
    .slide-enter-active {
         transition: 0.5s;
    }

    .sideBar a {
        text-decoration: none!important;
        font-size: 15px;
        color:#536479;
        font-family: 'Roboto Condensed', sans-serif;
    }

    .sideBar a:hover {
        background-color: #f5f5f5
    }

    .sideBar ul li{
        list-style-type: none;
        margin:5px;
        
        /*position: relative;*/
    }


    .container-horizontal{
        max-height: 65px;
        z-index:99;
        display: flex;
        background-color:#5a52c4;
    }

    .logo{
        /*min-height:50px;*/
        /*width:20%;*/
        overflow: hidden;
        /*background-color: #645cdd; */
         background-color: #645cdd;
        display: flex;
        align-items: center;
    }

    .logo img{
        position: relative;
        width: 90%;
        height: 90%
    }
    .header-left{
        min-width:80%;
        display: flex;
        align-items: center;
    }

    .hamburger-menu{
        margin: 30px;
        color: white;
    }

    .hamburger-menu a:hover, .hamburger-menu a{
        color:white
    }


</style>

