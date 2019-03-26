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

                <tr class = "summary-data" v-for="summary in summaryList" :key="summary.date">
                    <td>{{summary.date}}</td>
                    <td>{{summary.trail_id}}</td>
                    <td>{{summary.participants}}</td>
                    <td><div v-for="(location,index) in summary.hotspots" :key="index">{{index+1}}. {{location}}</div></td>
                    <td><div v-for="(mission, index) in summary.missions" :key="index">{{index+1}}. {{mission}}</div></td>
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
            summaryList: [{date:"11/05/2019", trail_id:"175239", participants: 26, hotspots: ["ryan's house", "thian's house", "rydora's house"], missions: ["draw ryan face", "where is meow?"]}]
        }
    },
    components:{
        vSelect
    },

    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }
        
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
    
</style>




