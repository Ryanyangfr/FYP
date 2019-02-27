<template>
    <div class="Leaderboard">
        <div class="card">
            <div class="card-title">
                <h5>Leaderboard</h5>
            </div>
                <form @submit.prevent="getData" class="search-bar">
                    <input type="text" placeholder="Enter Trail ID" v-model="trail_instance_id" required>
                    <button type="submit" class="search-btn"><i class="ti-search"></i></button> 
                </form>

                <table>
                    <tr class="leaderboard-table-header">
                        <td>Team</td>
                        <td>Points</td>
                        <td>Hotspots Completed</td>
                        <td>Timing</td>
                        <td>Actions</td>
                    </tr>

                    <tr class = "leaderboard-data" v-for="item in items" :key="item.team">
                        <td class="team-data">{{item.team}}</td>
                        <td class="points-data">{{item.points}}</td>
                        <td>{{item.hotspots_completed}}</td>
                        <td></td>
                        <td><button @click="editLeaderboard(item.team,item.points,item.hotspots_completed)"><i class="ti-pencil-alt"></i></button></td>
                    </tr>
                </table>
                

                <!-- <b-table :items="items"></b-table> -->
            <!-- <tr>
                <th>Team</th>
                <th>Hotspots Completed</th>
            </tr>
            <tr v-for="item in items" :key = item.team>
                <td>{{item.team}}</td>
                <td>{{item.hotspots_completed}}</td>
            </tr> -->
        <!-- </b-table> -->
        </div>

        <!--edit leaderboard begins-->
        <div class="black-blur-bg" v-if="showEdit"> 
            <div class="edit-leaderboard-form">
                <div class="edit-leaderboard-header">
                    <h5>Edit leaderboard</h5>
                    <button class="close-edit-leaderboard" @click="closeEdit()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="edit-leaderboard-body" @submit.prevent="onSubmitToEdit">
                    <div class="edit-leaderboard-input">
                        <input type="text" id="team-num-input" v-model="curr_team_num" readonly>
                        <label for="team-num-input">Team</label>
                    </div>
                    <div class="edit-leaderboard-input">
                        <input type="text" id="points-input" v-model="curr_points" required>
                        <label for="points-input">Points</label>
                    </div>
                    <div class="edit-leaderboard-input">
                        <input type="text-area" id="hotspots-input" v-model="curr_hotspots" readonly>
                        <label for="curr_hotspots">Hotspots</label>
                    </div>
                    <div class="edit-leaderboard-input">
                        <input type="text" id="timing-input" v-model="curr_timing" readonly>
                        <label for="curr_timing">Timing</label>
                    </div>
                    <div>
                        <button type="submit" class="edit-leaderboard-submit">Save</button>
                    </div>
                </form>
               
            </div>
        </div>
        <!--edit leaderboard ends-->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            items: [],
            trail_instance_id: '',
            showEdit: false,
        }
    },

    computed:{
        currentTrailID(){
            return this.$store.state.currentTrailID;
        }
    },

    methods: {
        getData() {
            const baseURI = '//54.255.245.23:3000/team/getAllTeamPoints?trail_instance_id=' + this.trail_instance_id;
            axios.get(baseURI)
            .then(response => {
                console.log(response);
                this.items = response.data;
            })
        }
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

         axios.get('http://54.255.245.23:3000/getCurrentTrailInstanceID')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.trail_instance_id  = data[row]
            }
        })
    //data received [
    //     {
    //         "team": 1,
    //         "points": 0,
    //         "hotspots_completed": 0
    //     },
    //     {
    //         "team": 2,
    //         "points": 0,
    //         "hotspots_completed": 0
    //     },
    //     {
    //         "team": 3,
    //         "points": 0,
    //         "hotspots_completed": 0
    //     }
    // ]

        const baseURI = '//54.255.245.23:3000/team/getAllTeamPoints';
        axios.get(baseURI)
        .then(response => {
            console.log(response);
            this.items = response.data;
        })
    }
}
</script>

<style scoped>
    label{
        font-family: 'lato', sans-serif
    }
    .card{
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

    .search-bar{
        display: flex;
        flex-direction: row;
        margin: 25px 35px 25px 35px;
        height:60px;
        align-self: center;
        transition: all 0.3s ease 0s;
        width: 95%;
    }

    .search-bar input{
        flex-grow: 2;
        background-color: white;
        border-left: 1px solid #ededed;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        border-right: 0;
        border-radius: 5px 0 0 5px;
        padding-left: 20px;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        /*background-color: #ffc107;*/
    }

    .search-btn{
        border:none;
        padding-right: 18px;
        background-color: white;
        /*color:#BAB1B3;*/
        font-size: 20px;
        border-right: 1px solid #ededed;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        border-radius: 0 5px 5px 0;
        border-left: 0;
        cursor: pointer;
    }

    .search-bar input:focus{
        outline: none !important;
        border-left:2px solid #645cdd;
        border-top:2px solid #645cdd;
        border-bottom:2px solid #645cdd;
        border-right: 0px;
       
    }

    .search-bar input:focus~ .search-btn{
        outline: none;
        border-right:2px solid #645cdd;
        border-top:2px solid #645cdd;
        border-bottom:2px solid #645cdd;
    }

    .card table{
        margin: 18px;
        font-size: 17px;
        font-family: "Roboto", sans-serif;
       
    }

    .card table td{
        text-align: center;
    }

    
    tr:nth-child(even) {
        background-color: #f2f2f2;
        border-top: 1px solid #DEE2E6;
        border-bottom: 1px solid #DEE2E6;
    }

    tr:nth-child(2){
        background-color: #FFA90B
    }

    tr:nth-child(3) {
       background-color: #F8FAFB
    }

    tr:nth-child(4) {
       background-color: #ED9D5D
    }

    .leaderboard-data td{
        text-overflow: ellipsis;
        max-height: 10px;
        padding: 15px;
    }

    .points-data, .team-data{
        font-size: 20px
    }

    .leaderboard-data button{
        background: none;
        border: none;
        cursor: pointer;
    }

    .leaderboard-data i{
        font-size: 20px;
        color: #536479
    }

     .leaderboard-data a{
        font-size: 20px;
        color: #536479
    }

    .leaderboard-table-header td{
        font-size: 15px;
        padding: 10px;
        min-height: 100px;
        font-weight: 600;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .leaderboard-title-header{
        min-width: 200px;
    }
</style>



