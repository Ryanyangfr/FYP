// At the top of the webpage. 
// Includes: Logo, side menu button, the side menu, change password button and logout button
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
                    <div class="change-password-area">
                        <router-link to='/passwordChange'><button><i class="ti-lock"></i>Change Password</button></router-link>
                    </div>
                    <button @click='logout' class="logout-btn"><i class="ti-shift-right"></i>Logout</button>
                </div>
            </div>
        </div>
        
        <transition name="slide">
            <div class="sideBar" v-if="show">
                <ul>
                    <div class="ingame-header"><li>In-Game</li></div>
                    <li @click="showOrHide()"><router-link to="/generateInstanceID"><i class="ti-timer"></i>Start Trail</router-link></li>
                    <li @click="showOrHide()"><router-link to="/map"><i class="ti-map"></i>Live Monitoring</router-link></li>
                    <li @click="showOrHide()"><router-link to="/leaderboard"><i class="ti-cup"></i>Leaderboard</router-link></li>
                    <li @click="showOrHide()"><router-link to='/viewSubmissions'><i class="ti-gallery"></i>Submissions</router-link></li>

                    <div class="setup-header"><li>Setup</li></div>
                    <li @click="showOrHide()"><router-link to='/viewHotspots'><i class="ti-pin"></i>Location</router-link></li>
                    <li @click="showOrHide()"><router-link to='/viewNarrative'><i class="ti-book"></i>Narrative</router-link></li>
                    <li @click="showOrHide()"><router-link to='/mission'><i class="ti-flag"></i>Missions</router-link></li>
                    <li @click="showOrHide()"><router-link to='/trail'><i class="ti-map-alt"></i>Trail</router-link></li>
                    <li @click="showOrHide()"><router-link to='/summary'><i class="ti-file"></i>Summary Report</router-link></li>
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

        /*show or hide side bar. Once the user clicks on any item on the side navigation menu,
        the side bar would be hidden. */
        showOrHide(){
            if(this.$store.state.showSidebar){
                this.show= false;
            } else{
                this.show = true;
            }

            this.$store.commit('changeSideBarState')

        },
        
        // once the user clicks on logout button, the side menu status should close
        //reset side menu resets side menu back to close. .
        logout(){
            this.$session.destroy();
            this.$router.push("/");
            this.$store.commit('resetSideBar');
            this.show= false;
        }
    }, 

    mounted(){
        if (!this.$session.exists()) {
            this.$router.push('/')
        }

        // upon login in, show the side bar
        this.show = this.$store.state.showSidebar;
        
    }
  
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Poppins|PT+Sans");
    @import '../../assets/themify-icons.css';

    .dropdown-menu{
        z-index:5
    }

    .sideBar{
        position: absolute;
        background-color: white;
        width: 15%;
        height: calc(100% - 65px);
        z-index: 1;
        position:fixed;
        overflow-x: hidden;
        overflow-y: auto;
        box-shadow: 0 0 2px #e5e5e5;
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

    .setup-header{
        font-size: 14px;
        color: rgb(168, 174, 182);
        font-family: 'PT Sans', sans-serif;
        margin-top: 30px;
        margin-left: 25px;
        margin-right: 20px;
        pointer-events: none
    }

    .ingame-header{
        font-size: 13px;
        color: rgb(168, 174, 182);
        font-family: 'PT Sans', sans-serif;
        margin-top: 25px;
        margin-left: 25px;
        margin-right: 20px;
        pointer-events: none
    }

    .sideBar ul li{
        list-style-type: none;
        height: 45px;
        display: flex;
        text-align: left;
        align-content: center;
        width: 100%;
        vertical-align: middle;
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
        width:15%;
        overflow: hidden;
        background-color: #645cdd;
        display: flex;
        align-items: center;
    }

    .logout-area{
        display: flex; 
        flex-direction: row;       
        width: 300px;
        height: 100%;
        float: right;
        align-items: center;
    }

    .logout-btn{
        background: none;
        position: relative;
        display: inline-block;
        width: 40%;
        height: 100%;
        border: none;
        font-family: 'Poppins', sans-serif;
        background-color: #645cdd;
        color: white;
        cursor: pointer;
    }

    .change-password-area{
        height: 100%;
        width: 63%;
        position: relative;
        display: inline-block;
        background-color: #645cdd;
        font-family: 'Poppins', sans-serif;
    }

    .change-password-area button{
        border: none;
        background: none;
        cursor: pointer;
        color: white;
        width: 100%;
        height: 100%

    }

    .change-password-area i{
        padding-right: 5px

    }

    .change-password-btn a{
        text-decoration: none!important;
        color: white;
    }

    .logout-area button:hover{
        background-color: #4d44bf;
    }

    .logout-area i{
        margin-right: 15px;
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
    
    @media screen and (max-width: 1125px){
        .logo{
            width: 0
        }
        .header-right{
            min-width:100%
        }

        .sideBar{
            width: 20%
        }
    }

    @media screen and (max-width: 1000px){

        .sideBar{
            width: 30%
        }
    }

    @media screen and (max-width: 700px){
        .sideBar{
            width: 40%
        }
    }

    @media screen and (max-width: 600px){

        .sideBar{
            width: 50%
        }
    }
</style>

