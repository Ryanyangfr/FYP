<template>
  <div>
    <v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>
    
    <form @submit.prevent="trailOnSubmitToAdd" v-if="func == functionsAvailable[0]">
        Trail Title:
        <input name="title" type="text" placeholder="title" v-model="title">
        <br>
        Trail Duration:
        <input name="duration" type="text" placeholder="duration" v-model="duration">
        <br>
        <!-- {{this.narrativeList}}
        {{this.hotspotsAndMissions}} -->
        Trail Hotspots:
         <ul>
            <li v-for="(input, index) in hotspotsAndMissions">
              Hotspot:
              <v-select :options="hotspotList" v-model="input.hotspot" placeholder="Please select a hotspot" style="width:200px;"></v-select>
              
              <br>
              Narrative:
              <v-select :options="narrativeList" v-model="input.narrative" placeholder="Please select a narrative" style="width:200px;"></v-select>
              <br>
              <!-- {{input.narrative }} -->
              Mission Type:
              <v-select :options="missionTypesAvailable" v-model="input.missionType" style="width:200px;"></v-select>
              <button type="button" @click="fetchMissions(input.hotspot, input.missionList, input.missionType)">Get Available Missions</button>
              <!-- {{input.missionList}} -->
              
              <div v-if="input.missionList.length > 0">
                Mission:
                <v-select :options="input.missionList" v-model="input.mission" placeholder="Select a mission" style="width:200px;"></v-select>
              </div>
              
              <button @click="deleteRow(index)">Delete</button>
            </li>
            <button type="button" @click="addRow">Add row</button>
            <button type="submit">submit</button>
        </ul>
    </form>
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
        title: "",
        duration: 0,
        numTeams: 0,
        missions: [],
        hotspots: [],
        hotspotsAndMissions: [{hotspot: "", mission: "", missionList:[],  missionType: "Quiz", narrative: ""}],
      }
  }, 
  components:{
      vSelect
  },
  methods : {
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
    fetchMissions(hotspot,missionList, missionType){
        console.log('entered')
        console.log(hotspot)
        axios.get('http://54.255.245.23:3000/mission/getMission' + missionType)
        .then(response =>{
            var data = response.data;
            // console.log(data)
            // missionList = [];
            for(var index in data){
              // console.log(index)
              missionList.push({label: data[index].title, value: data[index].mission});
              console.log(missionList);
            }
        })
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
      axios.post('http://54.255.245.23:3000/trail/addTrail', postBody)
      .then(response => {
          let data = response.data
          console.log(data)
          // this.$router.go();
      })
    }
  },
  mounted(){
    if (!this.$session.exists()) {
        console.log("check")
        this.$router.push('/')
    }

    axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
    .then(response => {
        let data = response.data;
        for(var row in data){
            console.log(data[row])
            this.hotspotList.push({label: data[row].hotspot_name, value: data[row].hotspot_name})
        }
    });

    axios.get('http://54.255.245.23:3000/narrative/getNarratives')
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

  }
}
</script>
