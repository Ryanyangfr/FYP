//Generate trail ID and start trail page
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
                        <button class = "generate-id-btn" @click="showConfirmationPopup">GENERATE TRAIL ID</button>
                    </div>
                    <div v-if="generate_id">
                        <h4>TRAIL ID:</h4>
                        <h4>{{instance_id}}</h4>
                        <div class="trail-started-alert" v-if="trailStarted">
                            <div class="alert alert-success" role="alert">
                                <h5 class="alert-heading">Trail Sucessfully Started!</h5>
                                <p>Ensure that all participants have entered the trail before proceeding:) </p>
                                <hr>
                                <p class="mb-0">You may then proceed to monitor the teams at the "Live Monitoring" page</p>
                            </div>
                        </div>
                        <div class="start-trail-btn-area">
                            <button type="button" class="start-trail-btn" @click="startTrail">Start Trail</button>
                        </div>
                    </div>
                </div>
                <!--generate trail instance id area ends-->
                
            </div>
        </div>

        <!-- confirmation popup to generate trailid -->
        <div class="black-blur-bg" v-if="showConfirmation"> 
            <div class="generateID-popup">
                <div class="generateID-popup-header">
                    <h5>Confirmation</h5>
                    <button class="close-generateID-popup" @click="closeConfirmation()"><font-awesome-icon icon="times"/></button>
                </div>
                <!--<hr>-->
                <div class="generateID-popup-body">
                    <div class="generateID-popup-content"><h6>Do you wish to generate a Trail ID?</h6></div>
                    <!--<div><hr></div>-->
                    <div class="generateID-popup-btm">
                        <button type="button" class="cancel-generateID-popup" @click="closeConfirmation()">NO</button>
                        <button type="button" v-on:click="toggleGenerate()" class="confirm-generate">YES</button>
                    </div>
                </div>
               
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
            numTeams: 0,
            trailMap: {},
            trailTimeMap: {},
            showConfirmation: false,
            trailStarted: false,
            hours: 0,
            minutes: 0,
            seconds: 0
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
        },

        trailStartTime(){
            return this.$store.state.trailStartTime;
        }
    },

    methods: {
        //create a random 6 digit trail ID 
        //save the trail ID to the vuex store as the current trial ID going on
        makeID(){
            var possible = '0123456789'
            var id = ''

            for(var i=0; i<6; i++){
                id += possible.charAt(Math.floor(Math.random()* possible.length))
            }
            this.instance_id = id
            this.$store.commit('saveCurrentTrailID', this.instance_id);
        },

        //show confirmation prompt to generate a new trail ID 
        showConfirmationPopup(){
            if(this.showConfirmation){
                this.showConfirmation = false;
            } else{
                this.showConfirmation = true;
            }
        },

        //when the user confirms to generate a new trail ID 
        //generate a new trail instance
        toggleGenerate(){
            if(this.trailStarted){
                this.trailStarted = false;
            }

            this.generate_id = true
            this.makeID()

            let currentDate = new Date();

            let date = currentDate.getDate();
            let month = currentDate.getMonth(); //Be careful! January is 0 not 1
            let year = currentDate.getFullYear();

            let dateString = date + '/' +(month + 1) + '/' + year;

            let postBody = {
                trailID: this.trailMap[this.trail],
                trailInstanceID: this.instance_id,
                numTeams: this.numTeams,
                date: dateString
            }

            axios.post('//amazingtrail.ml/api/trail/initializeTrail', postBody)
            .then(response => {
                let data = response.data;
                if (data.success === "true") {
                    this.closeConfirmation();
                } else {
                    console.log("Unsuccessful Attempt to generate trail instance")
                }
            })
        },

        //close confirmation prompt to generate new trail ID without generating a new trail ID and generate a trail instance
        closeConfirmation(){
            if(this.showConfirmation){
                this.showConfirmation = false;
            } else{
                this.showConfirmations = true;
            }
        },

        //when user confirms to start the current trail 
        //save the instance start time, current trail ID and the number of teams for the current trail
        startTrail(){
            let postBody = {
                trailID: this.trailMap[this.trail],
                trailInstanceID: this.instance_id
            }
            axios.post('//amazingtrail.ml/api/trail/startTrail', postBody)
            .then(response => {
                let data = response.data;
                
                if (data.success === "true") {
                    this.trailStarted = true
                } else {
                    console.log("Unsuccessful Attempt to start trail")
                }
            })
            
            this.$store.commit('saveInstanceStartTime', new Date().getTime() + parseInt(this.trailTimeMap[this.trail])*60*1000);
            this.$store.commit('saveTrailStartTime', new Date().getTime());
            this.$store.commit('saveCurrentTrail', this.trail);
            this.$store.commit('saveCurrentNumTeams', this.numTeams);
            // this.$router.push({ path: this.redirect || '/map' })
        },

        //calculate the time for the trail for the countdown timer
        calcTime(dist){
            // Time calculations for days, hours, minutes and seconds
            this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
        },
    },
    
    mounted(){
        if (!this.$session.exists()) {
            this.$router.push('/')
        }

        //on page load, retrieves all trails created in the db 
        //displays in the dropdown menu
        axios.get('//amazingtrail.ml/api/trail/getAllTrails')
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.trailsList.push({label: data[row].title, value: data[row].trailID});
                this.trailMap[data[row].title] = data[row].trailID;
                this.trailTimeMap[data[row].title] = data[row].totalTime;
                // this.allTrailsInfoList.push({id: data[row].trailID, information: data[row]})
            }
        })

        // Get todays date and time
        let now = new Date().getTime();
        var passTime =  this.$store.state.instanceStartTime - now;
        this.calcTime(passTime);
        if (this.seconds > 0 || this.minutes >0 || this.hours >0) {
            this.instance_id = this.$store.state.currentTrailID;
            this.trail = this.$store.state.currentTrail;
            this.numTeams = this.$store.state.currentNumTeams;
            this.generate_id = true;
            this.trailStarted = true;

        }
    }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins|Gochi+Hand|Lato|Permanent+Marker");
@import '../../assets/themify-icons.css';

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
        padding: 5px;
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


    /* confirmation popup styling starts*/
    .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 4;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .generateID-popup{
        min-width: 30%;
        min-height: 23%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .generateID-popup-body{
        width: 100%;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        /*background-color: pink;*/
        flex: 10;
    }

    .generateID-popup-content{
        flex: 4;
        padding: 12px;
    }

    .generateID-popup-header{
        flex: 1;
        width: 100%;
        padding:10px; 
        border-bottom: 1px solid #C6C4BC;
    }

    .generateID-popup-body h6{
        display: flex;
        flex: 9;
        float: left;
        height: 100%;
        width: 100%;
        align-items: flex-start;
        font-size: 15px;
        margin-left: 20px;
        /*margin-bottom: 10px;*/
        flex-direction: column;
    }

    .generateID-popup-btm{
        margin-bottom: 0px;
        /*flex: 4;*/
        display: inline-block;
        margin-top: 10px;
        border-top: 1px solid #C6C4BC;
        padding: 10px;
    }
    
    .cancel-generateID-popup{
        background: none;
        border: 1px solid #C6C4BC;
        border-radius: 4px;
        padding:8px 15px 8px 15px;
        margin-left: 25px;
        text-align: center;
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: #2C3E50;
        width: 60px;
        margin-right: 12px;
        float: right
    }

    .confirm-generate{
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        padding:8px 15px 8px 15px;
        /* margin-right: 25px; */
        text-align: center;
        cursor: pointer;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
        width: 60px;
        float: right
    }

    .close-generateID-popup{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .generateID-popup h5{
        display: flex;
        float: left;
    }
    /* confirmation popup styling ends*/
</style>
