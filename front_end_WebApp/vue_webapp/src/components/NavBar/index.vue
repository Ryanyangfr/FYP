<template>
    <div class="horizontal-menu">
        <!-- <div class="route-name-area"> -->
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
                Current Trail ID: 
                <div v-if="this.$store.state.currentTrailID==='-'">{{this.trail_instance_id}}</div>
                <div v-else>{{this.$store.state.currentTrailID}}</div>
            </div>
        <!-- </div> -->
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
            seconds: 0
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
        timerCount(){
            // Get todays date and time
            let now = new Date().getTime();
            // console.log(start);
            // console.log(end);
            // Find the distance between now an the count down date
            // var distance = start - now;
            var passTime =  this.$store.state.instanceStartTime - now;
            // console.log(passTime)
            this.calcTime(passTime);
            if (this.seconds == 0) {
                alert("Trail has ended");
            }
        }
    },

    mounted() {
        axios.get('http://54.255.245.23:3000/getCurrentTrailInstanceID')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.trail_instance_id  = data[row]
            }
        })

        // this.end = new Date(this.start + 60*60*1000).getTime();
        // Update the count down every 1 second
        // this.timerCount(this.start,this.end);
        // console.log(this.start);
        // console.log(this.end);
        this.interval = setInterval(() => {
            // console.log(this.$store.state.instanceStartTime);
            this.timerCount();
        }, 1000);

        // console.log(this.interval)
    }
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto");

    .horizontal-menu{
        /*background-color: red;*/
        overflow: hidden;
        height: 50px;
        vertical-align: middle;
        padding: 5px;
        padding-left: 35px;
        padding-right: 35px;
    }

    .horizontal-menu .route-name-area {
        display: flex;
        float: left;
        font-size: 18px;
        padding-top: 5px;
        padding-bottom: 5px;
        color:black;
        font-family: 'Roboto', sans-serif;
        /* background-color: pink; */
        vertical-align: middle;
        /* width: 50% */
    }

    .trail-id-area{
        display:flex;
        float: right;
        font-weight: 500;
        font-size: 18px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 5px;
        color:black;
        font-family: 'Lato', sans-serif;
        /* background-color: pink; */
        vertical-align: middle;
    }

</style>

