<template>
    <div class="SummaryReport">
        <div class="card">
            <div class="card-title">
                <h5>Summary Report of All Trails</h5>
            </div>
            <table>
                <tr class="summary-table-header">
                    <td>Date</td>
                    <td class="summary-trailid-header">Trail ID</td>
                    <td>Number of participants</td>
                    <td>Hotspots Completed</td>
                    <td>Missions Completed</td>                 
                </tr>

                <tr class = "summary-data" v-for="summary in summaryList" :key="summary.trail_id">
                    <td>{{summary.date}}</td>
                    <td>{{summary.trail_id}}</td>
                    <td>{{summary.participants}}</td>
                    <td><div v-for="(location,index) in summary.hotspots" :key="index">{{index+1}}. {{location}}</div></td>
                    <td><router-link to='/viewTrailMissions'><button class="view-missions-btn" @click="goToMission(summary.trail_id)">View Missions</button></router-link></td>
                </tr>
                
            </table>
        </div>
    </div>
        
        
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "summaryReport",
    data() {
        return{
            summaryList: []
        }
    },
    components:{
        vSelect
    },

    computed: {
        selectedMissionTrailID(){
            return this.$store.state.selectedMissionTrailID;
        },
    },

    methods:{
        goToMission(trailID){
            this.$store.commit('saveMissionTrailID', trailID);
        }
    },

    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }
        
        axios.get('//13.229.115.32:3000/summary/getSummaryReport')
        .then(response => {
            let data = response.data
            console.log('response: ');
            console.log(response);
            let hotspots = []
            let currTrailInstance = data[0].trailInstanceID;
            let currDate = data[0].date;
            let currParticipant = data[0].participants;
            data.forEach((row) => {
                let trailInstance = row.trailInstanceID;
                if (trailInstance === currTrailInstance) {
                    hotspots.push(row.hotspot);
                } else {
                    this.summaryList.push({date: currDate, trail_id: currTrailInstance, participants: currParticipant, hotspots})
                    hotspots = [];
                    currTrailInstance = row.trailInstanceID;
                    currDate = row.date;
                    currParticipant = row.participants;
                }
            });
            this.summaryList.push({date: currDate, trail_id: currTrailInstance, participants: currParticipant, hotspots})
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
    .SummaryReport .card{
        padding: 18px;
        margin: 18px;
        min-height: 500px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .SummaryReport .card .card-title{
        /*display: flex;*/
        /*float: left;*/
        font-size: 20px;
        margin: 18px 18px 18px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .card table{
        margin: 0px 18px 18px 18px;
        font-size: 17px;
        font-family: "Roboto", sans-serif;
       
    }

    .card table td{
        text-align: left;
    }

    .summary-data td{
        text-overflow: ellipsis;
        max-height: 10px;
        padding: 15px;
        border-bottom: 1px solid #DEE2E6;
    }

    .summary-table-header td{
        font-size: 16px;
        padding: 10px;
        min-height: 100px;
        font-weight: 500;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .summary-trailid-header{
        min-width: 200px;
    }

    .view-missions-btn{
        cursor: pointer;
        background-color: #645cdd;;
        border: none;
        border-radius: 5px;
        color: white;
        font-size:15px;
        padding:12px;
        text-align: center;
        cursor: pointer;
        min-width: 60px;
        align-self: center
    }

    .view-missions-btn:hover{
        background-color: #6200EE;
    }
    
</style>




