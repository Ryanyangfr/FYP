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
              {{input.missionType}}
              <button type="button" @click="fetchMissions(input.missionList, input.missionType)">Get Available Missions</button>
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
    <!-- {{allTrailsInfoList}} -->
    <form @submit.prevent="trailOnSubmitToEdit" v-if="func == functionsAvailable[1]">
        <v-select :options="trailsList" v-model="trailID" placeholder="Please select a trail" style="width:200px;"></v-select>
        <button type="button" @click="populateCurrentTrailInfo">Edit Trail</button>
        <!-- {{trailID}} -->
        <div v-if="trailID != undefined">
            <!-- {{allTrailsInfoList}} -->
            <!-- {{currTrailTitle}} -->
            <!-- {{currHotspotsAndMissions}} -->
            Trail Title:
            <input name="title" type="text" v-model="currTrailTitle">
            {{currTrailTitle}}
            <br>
            Trail Duration:
            <input name="duration" type="text" v-model="currTrailTotalTime">
            <!-- {{currHotspotsAndMissions}} -->
            <ul>
                <li v-for="(input, index) in currHotspotsAndMissions">
                {{input}}
                Hotspot:
                <v-select :options="hotspotList" v-model="input.hotspot" style="width:200px;"></v-select>
                
                <br>
                Narrative:
                <v-select :options="narrativeList" v-model="input.narrativeTitle" style="width:200px;"></v-select>
                <br>
                <!-- {{input.narrative }} -->
                Mission Type:
                <v-select :options="missionTypesAvailable" v-model="input.missionType" style="width:200px;"></v-select>
                <button type="button" @click="fetchMissions(input.missionList, input.missionType)">Get Available Missions</button>
                <!-- {{input.missionList}} -->
                
                <div v-if="input.missionList.length > 0">
                    Mission:
                    <v-select :options="input.missionList" v-model="input.missionTitle" placeholder="Select a mission" style="width:200px;"></v-select>
                </div>
                <button type="submit">submit</button>

                </li>
            </ul>
        </div>
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
        editedCurrHotspotsAndMissionsForUpdating: []
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
    fetchMissions(missionList, missionType){
        while (missionList.length > 0) {
            missionList.pop();
        }

        console.log('entered')
        console.log(missionType)
        // console.log(hotspot)
        axios.get('http://54.255.245.23:3000/mission/getMission' + missionType)
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
      axios.post('http://54.255.245.23:3000/trail/addTrail', postBody)
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
        axios.post('http://54.255.245.23:3000/trail/editTrail', postBody)
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

    axios.get('http://54.255.245.23:3000/trail/getAllTrails')
    .then(response => {
        let data = response.data;
        for(var row in data){
            console.log(data[row]);
            this.trailsList.push({label: data[row].title, value: data[row].trailID});
            this.allTrailsInfoList.push({id: data[row].trailID, information: data[row]})
        }
    })

  }
}
</script>
