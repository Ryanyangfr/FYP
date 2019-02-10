<template>
    <div>
        <div class="container-horizontal">
            <div class="logo"> 
                <button><router-link to='/landing'><img src="@/assets/titlelogo.png"></router-link></button>
            </div>
            <div class="header-left">
                <div class = hamburger-menu> 
                    <button @click = "showOrHide()"><font-awesome-icon class = "hamburger-icon" icon="bars"  size="2x"/></button>
                </div>
                <div class = "logout-area">
                    <button @click='logout'>Logout<i class="ti-shift-right"></i></button>
                </div>
            </div>
        </div>
        
        <transition name="slide">
            <div class="sideBar" v-if="show">
                <ul>
                    <div class="setup-header"><li>Setup</li></div>
                    <li><router-link to='/addHotspot'>Location</router-link></li>
                    <li><router-link to='/viewNarrative'>Narrative</router-link></li>
                    <li><router-link to='/mission'>Missions</router-link></li>
                    <li><router-link to='/trail'>Trail</router-link></li>
                    <div class="ingame-header"><li>In-Game</li></div>
                    <li><router-link to="/generateInstanceID">Start Trail</router-link></li>
                    <li><router-link to="/map">Live Map</router-link></li>
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
        return {
            show: false,
        }
    },

    computed: {
        showSidebar(){
            return this.$store.state.showSidebar;
            console.log($store.state.showSidebar);
        }
    },        
    
    methods:{
        showOrHide(){
            if(this.$store.state.showSidebar){
                // this.$store.state.showSidebar = false;
                this.show= false;
                // this.$sidebar = '0px';
            } else{
                // this.$store.state.showSidebar = true;
                this.show = true;
                // this.$sidebar = '250px';
            }

            this.$store.commit('changeSideBarState')
            console.log(this.$store.state.showSidebar);

        },
        logout(){
            this.$session.destroy();
            this.$router.push("/");
            this.$store.commit('resetSideBar');
            this.show= false;
        }
    }
  
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Poppins");
    @import '../../assets/themify-icons.css';

    .sideBar{
        position: absolute;
        background-color: white;
        width: 18%;
        border-right: 1px solid #e6e6e6;
        height: calc(100% - 65px);
        z-index: 1;
        position:fixed;
        overflow: hidden;
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
        font-size: 16px;
        color:#536479;
        font-family: 'Roboto Condensed', sans-serif;
    }

    .sideBar a:hover {
        background-color: #f5f5f5
    }

    .sideBar ul{
        display: flex;
        flex-direction: column;
    }

    .sideBar .setup-header{
        margin-left: -20px;
        font-size: 18px;
        font-weight: 600
    }

    .sideBar .ingame-header{
        margin-top: 10px;
        margin-left: -20px;
        font-size: 18px;
        font-weight: 600
    }

    .sideBar ul li{
        list-style-type: none;
        margin-left: 30px;
        margin-top:25px;
        float: left;
        display: flex;
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
        width:18%;
        overflow: hidden;
        /*background-color: #645cdd; */
        background-color: #645cdd;
        display: flex;
        align-items: center;
    }

    .logout-area{
        display: flex;        
        width: 15%;
        height: 100%;
        align-items: center;
    }

    .logout-area button{
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        border: none;
        font-family: 'Poppins', sans-serif;
        background-color: #645cdd;
        color: white;
        cursor: pointer;
    }

    .logout-area button:hover{
        background-color: #4d44bf;
        /*border-left: 1px solid #443daa;
        border-bottom: 1px solid #443daa;*/
    }

    .logout-area i{
        margin-left: 15px;
    }

    .logo img{
        position: relative;
        width: 90%;
        height: 90%
    }

    .logo button{
        border:none;
        background:none;
        cursor: pointer;
    }

    .header-left{
        min-width:82%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .hamburger-menu{
        margin: 30px;
    }

    .hamburger-menu button{
        background:none;
        border: none;
        color: white;
        cursor: pointer;
    }
    
    

</style>

