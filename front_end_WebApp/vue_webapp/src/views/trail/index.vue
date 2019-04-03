<template>
    <div class="Trail">
        <div class="card">
            <div class="card-title">
                <h5>Trail List</h5>
                <router-link to='/addTrail'><button class="create-trail-btn"><i class="ti-plus"></i>ADD NEW</button></router-link>
            </div>

            <!--table for trail begins-->
            <table>
                <tr class="trail-table-header">
                    <td class="trail-title-header">Trail Title</td>
                    <td>Trail Duration (Minutes)</td>
                    <td>Details</td>
                    <td>Actions</td>
                </tr>
                <tr class="trail-data" v-for="trail in trailsList" :key="trail.trail_ID">
                    <td>{{trail.trail_title}}</td>
                    <td>{{trail.trail_duration}}</td>
                    <td><button class="view-trail-btn" @click="saveSelectedTrail(trail.trail_ID)"><router-link to='/viewTrail'>View full details</router-link></button></td>
                    <td>
                        <button @click="saveSelectedTrail(trail.trail_ID)"><router-link to='/editTrail'><i class="ti-pencil-alt"></i></router-link></button>
                        <button @click="deleteTrail(trail.trail_ID,trail.trail_title)"><i class="ti-trash"></i></button>
                    </td>
                </tr>
            </table>
            <!--table for trail  ends-->
        </div>

        <!--delete trail popup begins-->
        <!--shows when user clicks on delete icon for trail. showDeleteTrail = true-->
        <div class="black-blur-bg" v-if="showDeleteTrail"> 
            <div class="delete-trail-popup">
                <div class="delete-trail-header">
                    <h5>Delete</h5>
                    <button class="close-delete-trail" @click="closeDeleteTrail()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                <form class="delete-trail-body" @submit="onSubmitToDeleteTrail">
                    <div><h6>Are you sure you want to delete "{{this.trailTitleToBeDeleted}}"?</h6></div>
                    <div><hr></div>
                    <div class="delete-trail-btm">
                        <button type="button" class="cancel-delete" @click="closeDeleteTrail()">Cancel</button>
                        <button type="submit" class="delete-trail-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>
        <!--delete trail popup ends-->
    
  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "team",
    data() {
        return{
            functionsAvailable: ["Add", "Edit", "Delete"],
            func: "Add",
            missionTypesAvailable: ["Quiz", "Wefie"],
            hotspotList: [],
            narrativeList: [],
            trailsList: [],
            title: "",
            duration: 0,
            numTeams: 0,
            missions: [],
            hotspots: [],
            hotspotsAndMissions: [{hotspot: "", mission: "", missionList:[],  missionType: "Quiz", narrative: ""}],
            trailID: 0,
            allTrailsInfoList: [],
            currTrailTitle: "",
            currTrailTotalTime: 0,
            currHotspotsAndMissions: [],
            editedCurrHotspotsAndMissionsForUpdating: [],

            //delete
            curr_trail_id: 0,
            trailTitleToBeDeleted: "",
            showDeleteTrail: false,
            trailCloseMessage: false
        }
    }, 

    components:{
        vSelect
    },

    computed:{
        selectedTrailID(){
                return this.$store.state.selectedTrailID;
                // console.log(this.$store.state.selectedQuiz);
        },
    },

    methods : {
        // store in vuex store begins
        saveSelectedTrail(trailID){
            this.$store.commit('saveSelectedTrailID', trailID);
        },

        //store in vuex store ends 

        addRow(){
            this.hotspotsAndMissions.push({
            hotspot: "",
            mission: "",
            missionType: this.missionTypesAvailable[0],
            missionList: [],
            narrative: ""
            })
        },
        deleteRow(index){
        this.$delete(this.hotspotsAndMissions, index);
        },
        fetchMissions(missionList, missionType){
            while (missionList.length > 0) {
                missionList.pop();
            }

            console.log('entered')
            console.log(missionType)
            // console.log(hotspot)
            axios.get('//54.255.245.23:3000/mission/getMission' + missionType)
            .then(response =>{
                var data = response.data;
                // console.log(data)
                for(var index in data){
                // console.log(index)
                missionList.push({label: data[index].title, value: data[index].mission});
                //   console.log(missionList);
                }
            });
            // console.log(missionList)
        },
        populateCurrentTrailInfo(){
            console.log('test')
            this.allTrailsInfoList.forEach((information) => {
                // console.log(this.trailID);
                console.log(information.id === this.trailID.value)
                if(information.id === this.trailID.value){
                    console.log(information);
                    this.currTrailTitle = information.information.title;
                    this.currTrailTotalTime = information.information.totalTime;
                    this.currHotspotsAndMissions = information.information.hotspotsAndMissions;
                }
            })
            // let information = this.allTrailsInfoList[this.trailID]
            // this.currTrailTitle = information.title;
            // this.currTrailTotalTime = information.totalTime;
            // this.currHotspotsAndMissions = information.hotspotsAndMissions;
        },
        trailOnSubmitToAdd(){
        // this.hotspotsAndMissions.forEach((row) => {
        //   this.hotspots.push(row.hotspot.label);
        //   this.missions.push(row.mission.value);
        // });
        var postBody = {
            title: this.title,
            totalTime: this.duration,
            numTeams: this.numTeams,
            hotspotsAndMissions: this.hotspotsAndMissions
        }
        console.log(postBody);
        axios.post('//54.255.245.23:3000/trail/addTrail', postBody)
        .then(response => {
            let data = response.data
            console.log(data)
            // this.$router.go();
        })
        },
        trailOnSubmitToEdit(){
        // this.hotspotsAndMissions.forEach((row) => {
        //   this.hotspots.push(row.hotspot.label);
        //   this.missions.push(row.mission.value);
        // });
        this.currHotspotsAndMissions.forEach((hotspotAndMission) => {
            let hotspot = hotspotAndMission.hotspot;
            let mission = hotspotAndMission.missionTitle;
            let narrative = hotspotAndMission.narrativeTitle;

            if (hotspot.label != undefined) {
                hotspot = hotspot.label;
            }

            if (mission.label != undefined) {
                mission = mission.value
            } else {
                mission = hotspotAndMission.mission;
            }

            if (narrative.label != undefined) {
                narrative = narrative.value;
            } else {
                narrative = hotspotAndMission.narrativeID;
            }

            this.editedCurrHotspotsAndMissionsForUpdating.push({hotspot: hotspot, narrative: narrative, mission: mission })
        })
            console.log(this.currTrailTitle);
            var postBody = {
                trailID: this.trailID.value,
                title: this.trailID.label,
                totalTime: this.currTrailTotalTime,
                hotspotsAndMissions: this.editedCurrHotspotsAndMissionsForUpdating
            }
            console.log(postBody);
            axios.post('//54.255.245.23:3000/trail/editTrail', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                // this.$router.go();
        })
        },

        deleteTrail(trail_id, trail_title){
            this.curr_trail_id = trail_id;
            this.trailTitleToBeDeleted = trail_title;

            if(this.showDeleteTrail){
                this.showDeleteTrail = false;
            } else{
                this.showDeleteTrail = true;
            }
        },

        closeDeleteTrail(){
            if(this.showDeleteTrail){
                this.showDeleteTrail = false;
            } else{
                this.showDeleteTrail = true;
            }
        },

        trailCloseDeleteMessage(){
            this.showDeleteTrail = false;
            this.trailCloseMessage = true;
            if( this.trailDeleteMessage === "Trail Successfully Deleted") {
                this.trailDeleteMessage = "";
                this.$router.go();
            }
            this.trailDeleteMessage = "";
        },

        onSubmitToDeleteTrail(){
            var postBody = {
                "trailID": this.curr_trail_id
            }
            
            axios.post('//54.255.245.23:3000/trail/deleteTrail', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.trailDeleteMessage ="Trail Successfully Deleted"
                    this.trailCloseDeleteMessage()
                    // this.$router.go();
                } else {
                    this.trailDeleteMessage = "Error Please Try Again";
                }
                // this.$router.go();
            })
        
            if(this.showDeleteTrail){
                this.showDeleteTrail = false;
            } else{
                this.showDeleteTrail = true;
            }
            
            // location.reload();
        },
    },

    mounted(){
    if (!this.$session.exists()) {
        console.log("check")
        this.$router.push('/')
    }

    axios.get('//54.255.245.23:3000/hotspot/getHotspots')
    .then(response => {
        let data = response.data;
        for(var row in data){
            console.log(data[row])
            this.hotspotList.push({label: data[row].hotspot_name, value: data[row].hotspot_name})
        }
    });

    axios.get('//54.255.245.23:3000/narrative/getNarratives')
    .then(response => {
        let data = response.data;
        for(var row in data){
            console.log(data[row])
            this.narrativeList.push({label: data[row].narrative_title, value: data[row].narrative_id})
            // this.narrative_dictionary[data[row].narrative_title] = data[row].narrative_id;
        }
        // console.log("dictionary: ");
        // console.log(this.narrative_dictionary);
    })

    axios.get('//54.255.245.23:3000/trail/getAllTrails')
    .then(response => {
        let data = response.data;
        for(var row in data){
            console.log(data[row]);
            this.trailsList.push({trail_title: data[row].title, trail_ID: data[row].trailID, trail_duration: data[row].totalTime});
            this.allTrailsInfoList.push({id: data[row].trailID, information: data[row]})
        }
    })

  }
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }
    .Trail .card{
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
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .create-trail-btn{
        background-color: #645cdd;;
        border: none;
        border-radius: 5px;
        color: white;
        font-size:15px;
        display: flex;
        float: right;
        padding:12px;
        margin-right: 12px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        align-items: center;
    }

    .create-trail-btn:hover{
        background-color: #6200EE;
    }

    .create-trail-btn i{
        font-size: 13px;
        margin-right: 5px;
        
    }

    .create-trail-btn a {
        text-decoration: none!important;
        font-size: 15px;
        color:white;
        font-family: 'Roboto Condensed', sans-serif;
    }

    .card table{
        margin: 18px;
        font-family: "Roboto", sans-serif;
       
    }

    .card table td{
        text-align: left;
        font-size: 17px;
    }

    
    tr:nth-child(even) {
        background-color: #f2f2f2;
        border-top: 1px solid #DEE2E6;
        border-bottom: 1px solid #DEE2E6;
    }

    .trail-data td{
        /*max-height: 10px;*/
        max-width: 700px;
        padding: 15px;
    }

    .trail-data a{
        text-decoration: none!important;
        font-size: 14px;
        font-family: "Roboto", sans-serif;
        /*color: #536479;*/
    }

    .trail-data button{
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
    }

    .view-trail-btn{
        background:none;
        border:none;
        cursor: pointer;
    }

    .trail-data i{
        font-size: 20px;
        color: #536479;
    }

    .trail-table-header td{
        font-size: 15px;
        padding: 10px;
        min-height: 100px;
        font-weight: 600;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .trail-title-header{
        min-width: 200px;
    }

    /*delete trail popup starts*/
    .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 2;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .delete-trail-popup{
        min-width: 30%;
        min-height: 33%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
    }
    
    .delete-trail-body{
        width:100%;
        height: 130px;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }

    .delete-trail-body h6{
        display: flex;
        float: left;
        height: 100%;
        width: 100%;
        font-size: 15px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .delete-trail-btm{
        margin-bottom: 10px;
        margin-top: 10px;
    
    }

    .cancel-delete{
        background: none;
        border: 1px solid #C6C4BC;
        border-radius: 4px;
        display: flex;
        float: left;
        padding:8px 15px 8px 15px;
        margin-left: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: #666666;
    }

    .delete-trail-btn{
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
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
    }

    .close-delete-trail{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .delete-trail-popup h5{
        display: flex;
        float: left;
    }

    .delete-trail-header{
        max-width: 100%;
        padding:18px;
    }

    /*deleted quiz popup ends*/

</style>

