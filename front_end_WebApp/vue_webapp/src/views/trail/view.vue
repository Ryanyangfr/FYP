<template>
    <div class="ViewTrail">
       <div class="card">
            <div class="card-title">
                <h5>Trail Details</h5>
            </div>

            <div>
                <div class="view-trail-body">

                    <!--trail title begins-->
                    <div class="view-trail-input">
                        <label for="view-trail-title-input">Title</label>
                        <input name="view-trail-title-input" type="text" placeholder="Title" v-model="title" readonly> 
                    </div>
                    <!--trail title ends-->

                    <!--trail duration begins-->
                    <div class="view-trail-input">
                        <label for="view-trail-duration-input">Duration</label>
                        <input name="view-trail-duration-input" type="text" placeholder="Duration" v-model="duration" readonly> 
                    </div>
                    <!--trail duration ends-->

                    <!--more trail details begins: hotspot, narrative and mission -->
                    <div  class="view-hotspot-narrative-mission" v-for="details in hotspotsAndMissions" :key="details.hotspot"> 
                        <div class="view-hotspot-narrative-mission-body">
                            <div class="view-trail-input">
                                    <!--<div>{{details.hotspot}}</div>-->
                                <label>Hotspot</label>
                                <input name="view-trail-duration-input" type="text" v-model="details.hotspot" readonly>
                            </div>

                            
                            <div class="view-trail-input">
                                <label>Narrative</label>
                                <input name="view-trail-duration-input" type="text" v-model="details.narrativeTitle" readonly> 
                            </div>

                            <div class="view-trail-input">
                                <label>Mission</label>
                                <input name="view-trail-duration-input" type="text" v-model="details.missionTitle" readonly> 
                               
                            </div>
                        </div>
                    </div> 
                    <!--more trail details ends   -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "viewTrail",
    data() {
        return{
            title: "",
            duration: 0, 
            hotspotsAndMissions: [] //contains list of {hotspot, missionTitle, narrativeTitle}
        }  
    },

    computed: {
        selectedTrailID(){
            return this.$store.state.selectedTrailID;
            console.log(this.$store.state.selectedTrailID);
        },

    }, 

    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        axios.get('http://13.229.115.32:3000/trail/getAllTrails')
        .then(response =>{
            var data = response.data;
            console.log(data)
            for(var index in data){
                console.log('id: ' + data[index].trailID)
                console.log('store ID: ' + this.$store.state)
               if(data[index].trailID==this.$store.state.selectedTrailID){
                    this.title = data[index].title;
                    this.duration = data[index].totalTime;
                    //{hotspot, missionTitle, narrativeTitle}
                    this.hotspotsAndMissions = data[index].hotspotsAndMissions;
               }
            }
        })
        
    }           
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .ViewTrail .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .card .card-title{
        /*display: flex;*/
        /*float: left;*/
        font-size: 20px;
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .ViewTrail div{
        min-width: inherit;
        /*background-color: blue*/
    }

   .view-trail-input label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        /*align-items: center;*/
        min-width: 11%

    }

    .view-hotspot-narrative-mission {
        
        border-top: 1px solid #CED4DA;
    }

    .view-hotspot-narrative-mission-body{
        margin-top: 25px;
        display: flex;
        flex-direction: column
    }

    .view-hotspot-narrative-mission-body label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        min-width: 11%
    }

    .view-trail-input{
        float: left;
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .view-trail-input input{
        /*margin-left: 100px;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .view-trail-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }




</style>
