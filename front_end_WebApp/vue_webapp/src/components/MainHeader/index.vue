<template>
    <div>
        <div class="container-horizontal">
            <div class="logo"> 
                <button><router-link to='/landing'><img src="@/assets/titlelogo.png"></router-link></button>
            </div>
            <div class="header-right">
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
                    <li @click="showOrHide()"><router-link to='/viewHotspots'><i class="ti-pin"></i>Location</router-link></li>
                    <li @click="showOrHide()"><router-link to='/viewNarrative'><i class="ti-book"></i>Narrative</router-link></li>
                    <li @click="showOrHide()"><router-link to='/mission'><i class="ti-flag"></i>Missions</router-link></li>
                    <li @click="showOrHide()"><router-link to='/trail'><i class="ti-map-alt"></i>Trail</router-link></li>
                    <li @click="showOrHide()"><router-link to='/summary'><i class="ti-file"></i>Summary Report</router-link></li>
                    <div class="ingame-header"><li>In-Game</li></div>
                    <li @click="showOrHide()"><router-link to="/generateInstanceID"><i class="ti-timer"></i>Start Trail</router-link></li>
                    <li @click="showOrHide()"><router-link to="/map"><i class="ti-map"></i> Map</router-link></li>
                    <li @click="showOrHide()"><router-link to="/leaderboard"><i class="ti-cup"></i>Leaderboard</router-link></li>
                    <li @click="showOrHide()"><router-link to='/viewSubmissions'><i class="ti-gallery"></i>Submissions</router-link></li>
                
                </ul>
            </div>
        </transition>

    </div>
</template>

<script>
import VueScrollbar from 'vue2-scrollbar';

export default{ 
    name: 'MainHeader',

    data() {
        return {
            show: false,
        }
    },

    components: { VueScrollbar },

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
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Poppins|PT+Sans");
    @import '../../assets/themify-icons.css';

    .sideBar{
        position: absolute;
        background-color: white;
        width: 15%;
        /* border-right: 1px solid #e6e6e6; */
        min-height: calc(100% - 65px);
        z-index: 1;
        position:fixed;
        overflow-x: hidden;
        box-shadow: 0 0 2px #e5e5e5;
        padding-bottom: 10px
        /* background-color: pink */
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
        color:#3C4959;
        width: 100%;
        font-family: 'Roboto Condensed', sans-serif;
        margin-left: 25px;
        margin-right: 20px;
        padding-top: 12px
    }

    .sideBar li:hover{
        background-color: #f5f5f5
    }

    .sideBar ul{
        display: flex;
        flex-direction: column;
        padding-left: 0px;
    }

    .sideBar .setup-header{
        font-size: 14px;
        color: rgb(168, 174, 182);
        font-family: 'PT Sans', sans-serif;
        margin-top: 25px;
        margin-left: 25px;
        margin-right: 20px;
        pointer-events: none
    }

    .ingame-header{
        font-size: 13px;
        color: rgb(168, 174, 182);
        font-family: 'PT Sans', sans-serif;
        margin-top: 30px;
        margin-left: 25px;
        margin-right: 20px;
        pointer-events: none
    }

    .sideBar ul li{
        list-style-type: none;
        /* margin-left: 20px;
        margin-right: 10px; */
        /* margin-top:15px; */
        height: 45px;
        /* float: left; */
        display: flex;
        text-align: left;
        align-content: center;
        width: 100%;
        vertical-align: middle;
        /* background-color: pink */
        /*position: relative;*/
    }

    .sideBar ul li i{
        margin-right: 25px
    }

    .container-horizontal{
        max-height: 65px;
        z-index:99;
        display: flex;
        background-color:#5a52c4;
    }

    .logo{
        /*min-height:50px;*/
        width:15%;
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
        float: right;
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

    .header-right{
        min-width:85%;
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
    
    @media screen and (max-width: 900px){
        .logo{
            width: 0
        }
        .header-right{
            min-width:100%
        }

        .sideBar{
            width: 30%
        }
    }

</style>

