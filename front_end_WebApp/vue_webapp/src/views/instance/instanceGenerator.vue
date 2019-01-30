<template>
    <div class="instanceGenerator">
        Select Trail:
         <v-select :options="trailsList" v-model="trail" placeholder="Select a trail" style="width:200px;margin-left:1170px"/>
        <br>
        Enter Number Of Teams:
        <br>
        <input id="numTeams" v-model="numTeams" placeholder="Enter number of teams">


        <br>
        <br>
        <br>
        <div v-if="this.trail.length != 0 && this.numTeams > 0">
            <h1> GENERATE YOUR INSTANCE HERE </h1>

            <button v-on:click="toggleGenerate()">Generate Trail Instance</button>

            <br>
            <br>
            <br>
            <div v-if="generate_id">
                <h4>TRAIL ID:</h4>
                <h4><font size="30">{{instance_id}}</font></h4>
                <button type="button" @click="startTrail">Start Trail</button>
            </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
// import index from '../../components/NavBar/index'

export default {
    name: 'instanceGenerator',
    data () {
        return {
            instance_id: "",
            generate_id: false,
            trailsList: [],
            trail: "",
            numTeams: 0
        }
    },
    components:{
      vSelect
    },
    methods: {
        makeID(){
            var possible = '0123456789'
            var id = ''

            for(var i=0; i<6; i++){
                id += possible.charAt(Math.floor(Math.random()* possible.length))
            }
            this.instance_id = id
        },

        toggleGenerate(){
            this.generate_id = true
            this.makeID()

            let postBody = {
                trailID: this.trail.value,
                trailInstanceID: this.instance_id,
                numTeam: this.numTeams
            }
            axios.post('http://54.255.245.23:3000/trail/initializeTrail', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
            })
        },

        startTrail(){
            let postBody = {
                trailID: this.trail.value,
                trailInstanceID: this.instance_id
            }
            axios.post('http://54.255.245.23:3000/trail/startTrail', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
            })
        }
    },
    
    mounted(){
        console.log(this.$session.exists());
            if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        axios.get('http://54.255.245.23:3000/trail/getAllTrails')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row]);
                this.trailsList.push({label: data[row].title, value: data[row].trailID});
                // this.allTrailsInfoList.push({id: data[row].trailID, information: data[row]})
            }
        })

    }
}
</script>