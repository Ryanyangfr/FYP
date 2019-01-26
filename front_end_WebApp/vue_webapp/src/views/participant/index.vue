<template>
    <div>
        <!-- <form submit.prevent="getAllTeams">
            <input name="trailInstanceID" type="text" placeholder="Trail Instance ID" v-model="trailInstanceID">
            <button type="submit">Show Teams</button>
        </form> -->
        
        <table>

        </table>
        <!-- {{teams}} -->
        <div v-for="team in teams" :key="team">
          <div v-for="member in team" :key="member">
           {{member}}
          </div>
        </div>
    </div>
</template>


<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
  name: "hotspot",
  data() {
      return{
        teams: []
      }
  }, 
  components:{
      vSelect
  },
  methods : {
  },
  mounted() {
    axios.get('http://54.255.245.23:3000/team/getAllTeamsWithMembers')
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
                temp.push(participant.username);
              }
              this.teams.push(temp)
            }
        })
  }
}
</script>