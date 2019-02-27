<template>
    <div class="instanceGenerator">
        <div class="card">
            <div class="card-title"><h5>START TRAIL</h5></div>

            <div class="start-trail-body">
                <!--select trail dropdown area begins-->
                <div class="select-trail-area">
                    <label for="trails-droplist-input">Please select trail to begin</label>
                    <select placeholder="Select Trail" id="trails-droplist-input" v-model="trail">
                            <option v-for="trail in trailsList" :key="trail.value">
                                {{trail.label}}
                            </option> 
                    </select>
                </div>
                <!--select trail dropdown area ends-->

                <!--select number of teams area begins-->
                <div class="select-team-num-area" v-if="trail.length != 0">
                    <label for="select-team-num">Select number of teams</label>
                    <input name="select-team-num" id="select-team-num" type="text" placeholder="Select number of teams" v-model="numTeams"> 
                </div>
                <!--select number of teams area ends-->

                <!--generate trail instance id area begins-->
                <div class="generate-trail-instance-area" v-if="this.trail.length != 0 && this.numTeams > 0">
                    <div class="generate-id-btn-area">
                        <button class = "generate-id-btn" v-on:click="toggleGenerate()">GENERATE TRAIL ID</button>
                    </div>
                    <div v-if="generate_id">
                        <h4>TRAIL ID:</h4>
                        <h4>{{instance_id}}</h4>
                        <div class="start-trail-btn-area">
                            <button type="button" class="start-trail-btn" @click="startTrail">Start Trail</button>
                        </div>
                    </div>
                </div>
                <!--generate trail instance id area ends-->
                
            </div>
        </div>







        <!--Select Trail:
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
        </div>-->
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
            numTeams: 0,
            trailMap: {},
            trailTimeMap: {}
        }
    },
    components:{
      vSelect
    },

    computed:{
        currentTrailID(){
            return this.$store.state.currentTrailID;
        },

        instanceStartTime(){
            return this.$store.state.instanceStartTime;
        }
    },

    methods: {
        makeID(){
            var possible = '0123456789'
            var id = ''

            for(var i=0; i<6; i++){
                id += possible.charAt(Math.floor(Math.random()* possible.length))
            }
            this.instance_id = id
            this.$store.commit('saveCurrentTrailID', this.instance_id);
        },

        toggleGenerate(){
            this.generate_id = true
            this.makeID()

            let postBody = {
                trailID: this.trailMap[this.trail],
                trailInstanceID: this.instance_id,
                numTeams: this.numTeams
            }
            console.log(postBody)
            axios.post('http://54.255.245.23:3000/trail/initializeTrail', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
            })
        },

        startTrail(){
            let postBody = {
                trailID: this.trailMap[this.trail],
                trailInstanceID: this.instance_id
            }
            axios.post('http://54.255.245.23:3000/trail/startTrail', postBody)
            .then(response => {
                let data = response.data;
                console.log(data);
            })
            
            this.$store.commit('saveInstanceStartTime', new Date().getTime() + parseInt(this.trailTimeMap[this.trail])*60*1000);
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
                this.trailMap[data[row].title] = data[row].trailID;
                this.trailTimeMap[data[row].title] = data[row].totalTime;
                // this.allTrailsInfoList.push({id: data[row].trailID, information: data[row]})
            }
        })

    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins|Gochi+Hand");
    .instanceGenerator .card{
        padding: 20px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .instanceGenerator .card .card-title{
        /*display: flex;*/
        /*float: left;*/
        font-size: 20px;
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .start-trail-body{
        width:100%;
        display: flex;
        flex-direction: column
    }

    .select-trail-area, .select-team-num-area{
        float: left;
        display: flex;
        margin-left:18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
        /* background-color: pink */
    }
    
    .select-trail-area select{
        display: flex;
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        width:75%;
        max-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .select-team-num-area input{
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        width:75%;
        max-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .select-trail-area option{
        /*padding: 10px;*/
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }

    .select-trail-area label, .select-team-num-area label{
        margin-right: 100px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        align-items: center;
        min-width: 15%;
        text-align: left;
    }

    .select-trail-area select:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .generate-trail-instance-area{
        padding: 20px;
    }

    .generate-id-btn-area button{
        border: none;
        background: none;
        border:1px solid #6200EE;
        color:#6200EE;
        background-color: white;
        cursor: pointer;
        width: 100%;
        height: 40px;
        padding:5px;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
        border-radius: 3px;
        margin-bottom: 25px;

    }

    .start-trail-btn{        
        border: none;
        background: none;
        background-color: #6200EE;
        color: white;
        cursor: pointer;
        width: 100%;
        height: 40px;
        padding:5px;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
        border-radius: 3px;
        margin-bottom: 30px;
        margin-top: 30px
    }

    .generate-trail-instance-area h4{
        font-family: 'Gochi Hand', cursive;
        font-size: 50px;
    }

    .start-trail-btn-area button:hover{
        background-color: #6200EE;
        color: white
    }

    .generate-id-btn-area button:hover{
        border:1px solid #6200EE;
        color:#6200EE;
        box-shadow: 0 0 2px #645cdd;
    }
</style>
