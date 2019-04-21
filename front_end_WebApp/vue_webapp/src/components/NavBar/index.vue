//horizontal nav bar which shows the page name, the current/last trail ID and the countdown timer for the current trail
<template>
    <div class="horizontal-menu">
            <div class="route-name-area">
                {{$route.name}}
            </div>
            <div class="trail-id-area">
                Time Left: 
                <div v-if = "this.seconds >= 0">
                    {{this.hours}}:{{this.minutes}}:{{this.seconds}}
                </div>
                <div v-else>
                    00:00:00
                </div>
            </div>
            <div class="trail-id-area">
                 
                <div v-if="this.$store.state.currentTrailID==='-'">Current Trail ID: {{this.trail_instance_id}}</div>
                <div v-else>Current Trail ID: {{this.$store.state.currentTrailID}}</div>
            </div>

        <div class="black-blur-bg" v-if="trailEnded"> 
            <div class="trail-ended-popup">                
                <div class="trail-ended-message-area"><h5>Trail Has Ended!</h5></div>
                <div class="close-trail-ended">
                    <button class="close-trail-ended" @click="closeTrailEnded()">Okay</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'Navigation',
    data(){
        return{
            trail_instance_id:"-",
            start: "",
            end: "",
            interval: "",
            minutes: 0,
            hours: 0,
            seconds: 0,
            trailEnded: false
        }
    },

    computed: {
        currentTrailID(){
            return this.$store.state.currentTrailID;
        },
        instanceStartTime(){
            return this.$store.state.instanceStartTime;
        }
    },
    
    methods: {
        calcTime(dist){
            // Time calculations for days, hours, minutes and seconds
            this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
        },

        //count the time left for the trail
        timerCount(){
            // Get todays date and time
            let now = new Date().getTime();
            // Find the distance between now an the count down date
            // var distance = start - now;
            var passTime =  this.$store.state.instanceStartTime - now;
            this.calcTime(passTime);
            if (this.seconds == 0 && this.hours == 0 && this.minutes == 0) {
                this.trailEnded = true;
            }
        },

        //close the popup which indicates trail has ended by
        //changing trailEnded to false. 
        //remove the currenttrail from vuex store and the current number teams reset to 0 
        closeTrailEnded(){
            this.trailEnded = false;
            this.$store.commit('saveCurrentTrail', "");
            this.$store.commit('saveCurrentNumTeams', 0)
        }
    },

    //on page load, get the current trail ID from endpoint 
    //save that current ongoing trailID to vuex store. 
    //display time using timerCount() method to get timer
    mounted() {
        axios.get('//amazingtrail.ml/api/getCurrentTrailInstanceID')
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.trail_instance_id  = data[row]
                this.$store.commit('saveCurrentTrailID', this.trail_instance_id);
            }
        })

        this.interval = setInterval(() => {
            this.timerCount();
        }, 1000);

    }
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Lato|Permanent+Marker");
    @import '../../assets/themify-icons.css';
    
    .horizontal-menu{
        overflow: hidden;
        height: 50px;
        vertical-align: middle;
    }

    .horizontal-menu .route-name-area {
        display: flex;
        float: left;
        font-size: 18px;
        padding-top: 10px;
        padding-bottom: 10px;
        color:black;
        font-family: 'Roboto', sans-serif;
        vertical-align: middle;
        padding-left: 40px
    }

    .trail-id-area{
        display:flex;
        float: right;
        font-weight: 500;
        font-size: 17px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
        color:black;
        font-family: 'PT Sans', sans-serif;
        vertical-align: middle;
        margin-right: 25px;
    }

    .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 5;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .trail-ended-popup{
        min-width: 30%;
        min-height: 23%;
        background-color: white;
        opacity: 100%;
        z-index: 300;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 10px
    }

    .trail-ended-message-area{
        display: inline-block;
        margin: auto
    }

    .trail-ended-popup button{
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        display: flex;
        float: right;
        padding:8px 15px 8px 15px;
        margin-right: 25px;
        text-align: center;
        cursor: pointer;
        align-content: center;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
        width: 60px;
    }

    .close-trail-ended{
        display: inline-block
    }

</style>

