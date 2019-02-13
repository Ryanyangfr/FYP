<template>
    <div class="AddTrail">
       <div class="card">
            <div class="card-title">
                <h5>Add New Trail</h5>
            </div>
            <form @submit.prevent="trailOnSubmitToAdd" class="add-trail-body">
                <div class="input-area">
                    <label for="add-trail-input">Title</label>
                    <input name="add-trail-input" type="text" placeholder="Title" v-model="title" required> 
                </div> 
                <div class="input-area">
                    <label for="add-trail-input">Duration</label>
                    <input name="add-trail-input" type="text" placeholder="Duration(in minutes)" v-model="duration" required> 
                </div> 

                <div v-for="(input, index) in details" :key="index" class="add-details-body">
                        <div class="droplist">
                            <label for="hotspots-droplist-input">Select Location</label>
                            <select placeholder="Select location" id="hotspots-droplist-input" v-model="input.hotspot">
                                <option v-for="hotspot in hotspotList" :key="hotspot">
                                    {{hotspot}}
                                </option> 
                            </select>  
                        </div>
                        <div class="droplist">
                            <label for="narratives-droplist-input">Select Narrative</label>
                            <select placeholder="Select mission type" id="narratives-droplist-input" v-model="input.narrative">
                                <option v-for="narrative in narratives" :key="narrative.narrative_id">
                                    {{narrative.narrative_title}}
                                </option> 
                            </select>  
                        </div>
                        <div class="droplist">
                            <label for="missions-droplist-input">Select Mission</label>
                            <select placeholder="Select mission type" id="missions-droplist-input" v-model="input.mission">
                                <option v-for="mission in missions" :key="mission.mission_ID">
                                    {{mission.mission_title}}
                                </option> 
                            </select>  
                        </div>
                        <div class="delete-trail-details-area">
                                <button type="button" class="delete-trail-details" @click="deleteRow(index)">Delete</button>
                        </div>
                        
                </div>
                <button class="add-new-details-btn" type="button" @click="addRow">ADD HOTSPOT, NARRATIVE AND MISSION</button>
                <div class="submit-btn-area">
                    <button class="cancel-btn" type="button"><router-link to='/trail'>Cancel</router-link></button>
                    <button class="submit-btn" type="submit">Create</button>
                </div>
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "addMission",
    data() {
        return{
            title: "",
            duration: "",
            details: [],
            updatedDetailsToAdd: [],
            missions: [],
            hotspotList: [],
            narratives: [],
            narrativeDict: {},
            missionDict: {}
        }  
    },

    methods: {
        addRow(){
            this.details.push({
                hotspot: "",
                mission: "",
                narrative: ""
            })
        },

        deleteRow(index){
            console.log(this.details)        
            this.$delete(this.details, index);
        },

        trailOnSubmitToAdd(){
            this.details.forEach(element => {
                let updatedNarrative = this.narrativeDict[element.narrative]
                let updatedMission = this.missionDict[element.mission]

                this.updatedDetailsToAdd.push({hotspot: element.hotspot, narrative: updatedNarrative, mission: updatedMission})
            });
            var postBody = {
                title: this.title,
                totalTime: this.duration,
                hotspotsAndMissions: this.updatedDetailsToAdd
            }
            console.log(postBody);
            axios.post('http://13.229.115.32:3000/trail/addTrail', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    alert("Trail Successfully Added")
                } else {
                    alert("Error Please Try Again")
                }
                this.$router.push({ path: this.redirect || '/trail' })
                // this.$router.go();
            })
        }
    },

    mounted(){
        axios.get('http://13.229.115.32:3000/mission/getAllMissions')
        .then(response =>{
            var data = response.data;
            console.log(data)
            for(var index in data){
               this.missions.push({mission_ID:data[index].mission, mission_title:data[index].title})
               this.missionDict[data[index].title] = data[index].mission;
            }

            console.log(this.missions)
        })

        axios.get('http://13.229.115.32:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.hotspotList.push(data[row].hotspot_name);
            }
        })

        axios.get('http://13.229.115.32:3000/narrative/getNarratives')
        .then(response => {
            let data = response.data;
            // console.log(data)
            for(var row in data){
                console.log(data[row])
                this.narratives.push({narrative_title: data[row].narrative_title, narrative_id: data[row].narrative_id})
                this.narrativeDict[data[row].narrative_title] = data[row].narrative_id;
            }
        })
    }       
        
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    /*card styling begins*/
    .AddTrail .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .AddTrail .card .card-title{
        display: flex;
        float: left;
        font-size: 20px;
        margin-bottom: 50px;
    }

    .AddTrail .card-title h5{
        display: flex;
        float: left;
    }

    .AddTrail form{
        min-width: inherit;
        /*background-color: blue*/
    }
    /*card styling ends*/

    /*add trail title and duration starts*/
    .AddTrail .input-area{
        float: left;
        display: flex;
        margin-left:18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
    }

    .input-area label{
         margin-right: 100px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        align-items: center;
        min-width: 12%
    }

    .AddTrail .input-area input{
        /*margin-left: 100px;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .AddTrail .input-area input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }
    /*add trail title and duration ends*/


    /*add narrative, hotspot and mission begins*/
    .add-details-body{
        display: flex;
        flex-direction: column;
        width:100%;
        border-top: 1px solid #CED4DA;
        padding-top: 25px;
    }

    .AddTrail .droplist{
        float: left;
        display: flex;
        margin-left:17px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
        /*background-color: red*/
    }

    .AddTrail .droplist label {
        margin-right: 100px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        align-items: center;
        min-width: 12%

    }

    .AddTrail .droplist select{
        height: 40px;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        font-size: 17px;
        min-width:75%;
        padding: 5px;
        font-family: 'Roboto', sans-serif;
        
    }

    .AddTrail .droplist select:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }
    /*add narrative, hotspot, mission ends*/

    .delete-trail-details-area{
        width: 100%;
        margin-bottom: 25px;
    }

    .delete-trail-details{
        display: flex;
        float: right;
        background: none;
        border: none;
        background-color: #F15E5E;
        border-radius: 4px;
        max-width: 100px;
        max-height: 50px;
        padding:8px 15px 8px 15px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
    }

    .add-new-details-btn{
        background: none;
        border: 1px solid #CED4DA;
        width:90%;
        padding-top: 8px;
        padding-bottom: 8px;
        font-family: 'Roboto', sans-serif;
        border-radius: 3px;
        font-size: 17px;
        margin-bottom: 25px;
        color: #536479;
        cursor: pointer;
        margin-left: 58px;
        margin-right: 58px;
    }

    .add-new-details-btn:hover{
        border:1px solid #6200EE;
        color:#6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .AddTrail .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .AddTrail .submit-btn{
        /*display: inline;*/
        float:right;
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 20px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

     .AddTrail .submit-btn:hover{
        background-color: #5a52c4;
     }

     .AddTrail .cancel-btn{
         float:right;
         background-color: #ACACAC;
         color: white;
         border:none;
         border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

    .AddTrail .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .AddTrail .cancel-btn a{
        text-decoration: none!important;
        color: white
    }

</style>
