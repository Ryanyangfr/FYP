//A page to add new trail 
//enter a trail title, duration and select hotspots and narrative for each hotspot
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
                            <select placeholder="Select location" id="hotspots-droplist-input" v-model="input.hotspot" required>
                                <option v-for="hotspot in hotspotList" :key="hotspot">
                                    {{hotspot}}
                                </option> 
                            </select>  
                        </div>
                        <div class="droplist">
                            <label for="narratives-droplist-input">Select Narrative</label>
                            <select placeholder="Select mission type" id="narratives-droplist-input" v-model="input.narrative" required>
                                <option v-for="narrative in narratives" :key="narrative.narrative_id">
                                    {{narrative.narrative_title}}
                                </option> 
                            </select>  
                        </div>
                        <div class="droplist">
                            <label for="missions-droplist-input">Select Mission</label>
                            <select placeholder="Select mission type" id="missions-droplist-input" v-model="input.mission" required>
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
                    <router-link to='/trail'><button class="cancel-btn" type="button">Cancel</button></router-link>
                    <button class="submit-btn" type="submit">Create</button>
                </div>
            </form>
        </div>
        <div class="black-blur-bg" v-if="trailAddMessage.length > 0"> 
            <div class="add-message-popup">                
                <div class="add-message-area"><h6>{{trailAddMessage}}</h6></div>
                <div class="close-add-message">
                    <button @click="trailCloseAddMessage()">Close</button>
                </div>
            </div>
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
            missionDict: {},
            trailAddMessage: ""
        }  
    },

    methods: {
        //add new row of hotspot, for each hotspot, select it's mission and narrative 
        addRow(){
            this.details.push({
                hotspot: "",
                mission: "",
                narrative: ""
            })
        },

        //delete that particular row of hotspot along together with its narrative and mission
        deleteRow(index){      
            this.$delete(this.details, index);
        },

        //add the new trail to the db
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
            axios.post('//amazingtrail.ml/api/trail/addTrail', postBody)
            .then(response => {
                let data = response.data
                if (data.success === "true") {
                   this.trailAddMessage = "Trail Successfully Added"
                } else {
                    this.trailAddMessage = "Error Please Try Again"
                }
            })
        },

        //close add trail success message
        trailCloseAddMessage(){
            if( this.trailAddMessage === "Trail Successfully Added") {
                this.trailAddMessage = "";
                this.$router.push({ path: this.redirect || '/trail' })
            }
            this.trailAddMessage = "";
        },
    },

    mounted(){
        //get all missions created
        axios.get('//amazingtrail.ml/api/mission/getAllMissions')
        .then(response =>{
            var data = response.data;
            for(var index in data){
               this.missions.push({mission_ID:data[index].mission, mission_title:data[index].title})
               this.missionDict[data[index].title] = data[index].mission;
            }
        })

        //get all hotspots created
        axios.get('//amazingtrail.ml/api/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.hotspotList.push(data[row].hotspot_name);
            }
        })

        //get all narratives created
        axios.get('//amazingtrail.ml/api/narrative/getNarratives')
        .then(response => {
            let data = response.data;
            for(var row in data){
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
        height: inherit;
        align-items: center;
        min-width: 12%
    }

    .AddTrail .input-area input{
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


    .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 4;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .add-message-popup{
        min-width: 30%;
        min-height: 23%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 10px
    }

    .add-message-area{
        display: inline-block;
        margin: auto
    }

    .add-message-popup button{
        background: none;
        border: none;
        background-color: #F15E5E;
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
        width: 70px;
    }

    .close-add-message{
        display: inline-block
    }
</style>
