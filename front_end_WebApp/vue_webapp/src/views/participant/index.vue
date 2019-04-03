<template>
    <div>
        <!-- <form submit.prevent="getAllTeams">
            <input name="trailInstanceID" type="text" placeholder="Trail Instance ID" v-model="trailInstanceID">
            <button type="submit">Show Teams</button>
        </form> -->
        <!-- {{teams}} -->
        <!-- {{allTeams}} -->
        <div v-if="currTeamMember.length==0">
            <div v-for="(team, index) in teams" :key="index">
                Team
                {{index+1}}
                <v-select :options="team" v-model="currTeamMember" placeholder="Please select a member" style="width:300px;"></v-select>
            </div>
        </div>
        <div v-if="currTeamMember.length!=0">
            Current Team: 
            {{currTeamMember.value}}
            Member:
            {{currTeamMember.label}}
            <br><br>
            <h3>Switch Team</h3>
            <v-select :options="allTeams" v-model="newTeam" placeholder="Please select a new team" style="width:300px;"></v-select>
            <br>
            <button type="button" @click="switchTeam">Switch</button>
            <br>
            <button type="button" @click="deleteParticipant">Remove Participant</button>
            <button type="button" @click="back">Back</button>
        </div>
    </div>
</template>


<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
  name: "team",
  data() {
      return{
        teams: [],
        allTeams: [],
        currTeamMember: "",
        newTeam: 0
      }
  }, 
  components:{
      vSelect
  },
  methods : {
    back(){
        this.currTeamMember = "";
    },

    switchTeam(){
        var postBody = {
            "userID": this.currTeamMember.id,
            "newTeam": this.newTeam
        }
        axios.post('//13.228.173.165:3000/edit/switchTeams', postBody)
        .then(response => {
            let data = response.data;
            console.log(data);
            this.$router.go();
        });
    },
    deleteParticipant(){
        var postBody = {
            "userID": this.currTeamMember.id,
        }
        axios.post('//13.228.173.165:3000/delete/deleteParticipant', postBody)
        .then(response => {
            let data = response.data;
            console.log(data);
            this.$router.go();
        });
    }
  },
  mounted() {
    axios.get('//13.228.173.165:3000/team/getAllTeamsWithMembers')
        .then(response => {
            let data = response.data;
            console.log(data);
            for(let index in data){
              let temp = [];
              let row = data[index];
              console.log(row);
              for(let ind in row){
                let participant = row[ind];
                console.log("participants: ");
                console.log(participant);
                temp.push({label: participant.username, value: participant.team_id, id:participant.user_id});
              }
              this.allTeams.push(parseInt(index)+1);
              this.teams.push(temp)
            }
        })
  }
}
</script>