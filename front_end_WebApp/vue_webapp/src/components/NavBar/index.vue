<template>
    <div class="horizontal-menu">
        <!-- <div class="route-name-area"> -->
            <div class="route-name-area">
                {{$route.name}}
            </div>
            <div class="trail-id-area">
                Current Trail ID: {{this.trail_instance_id}}
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
            trail_instance_id:"-"
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
        color:black;
        font-family: 'Lato', sans-serif;
        /* background-color: pink; */
        vertical-align: middle;
    }

</style>

