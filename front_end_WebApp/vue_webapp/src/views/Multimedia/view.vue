<template>
    <div class="Submissions">
        <div v-bind:class="{ shift: this.$store.state.showSidebar }">
            <div class="fixed">
                <form class="search-bar" @submit.prevent="retrieveAllTeams">
                    <input type="text" placeholder="Enter Trail ID" v-model="trailID" required>
                    <button type="submit" class="search-btn"><i class="ti-search"></i></button> 
                </form>
                <div class="download-all-btn-area">
                    <Button class="download-all-btn" @click.prevent="downloadAll()"><i class="ti-download"></i> Download All</Button>
                </div>
                
            </div>
        </div>

        <div class="submissions-row">
            <div class= "team-container" v-for="team in teamList" :key="team.team_id">
                <button class="grp-card" @click="showSubmissions(team.team_id)">
                    <h5>Team {{team.team_id}}</h5>
                    <!-- <br> -->
                    <h6>Total: {{team.size}} Submissions</h6>
                </button>
            </div>
        </div>        
        
        <div class="grp-submission-row" v-if="showSub">
            <div class="card" v-for="(image,index) in images" :key="image">
                <!-- <div class="image-area"> -->
                <img :src="image" class="card-img-top"/> 
                <!-- </div> -->
                <div class="card-body">
                    <!-- <div class="submission-details"> -->
                        <h6 class="card-title">{{questions[index]}}</h6>
                    <!-- </div>  -->
                    <div class="acknowledge" v-if = "submissionStatuses[index] === 'no grade'">
                        <div class="approve"><button @click = "sendStatus(index, 10)"><i class="ti-check"></i></button></div>
                        <div class="disapprove"><button @click = "sendStatus(index, 0)"><i class="ti-close"></i></button></div>
                    </div>
                    <div class="submission-details" v-if = "submissionStatuses[index] === 'Approved'">
                        Approved
                    </div>
                    <div class="submission-details" v-if = "submissionStatuses[index] === 'Rejected'">
                        Rejected
                    </div> 
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
window.scrollTo(0,0);
import axios from 'axios'
export default{
    name: 'viewUploads',
    data() {
        return{
            trailID: '',
            showGrps: true,
            showSub: false,
            team: '',
            paths: [],
            images: [],
            questions: [],
            submissionIDs: [],
            submissionStatuses: [],
            teamList: [],
            currTeamID: '',
            button: {
                text: 'Click to view submissions'
            },

            //download all variables
            downloadLinks: [],
            // allPaths:[]

        }
    },

    computed:{
        currentTrailID(){
            return this.$store.state.currentTrailID;
        },

        showSidebar(){
            return this.$store.state.showSidebar;
      
        }
    },

    methods:{

        downloadAll() { 

            //get all submissionsurl
            for(var i=0; i<this.teamList.length; i++){
                axios.get('//amazingtrail.ml/api/upload/getAllSubmissionURL?team='+this.teamList[i].team_id+'&trail_instance_id='+this.trailID)
                .then(response=>{
                    let data = response.data
                    let size = Object.keys(data).length
                    // this.path = [];
                    if (size === 0) {
                        this.downloadLinks = [];
                    }
                    for(var j=0; j<size; j++){
                        if(j == 0 && this.downloadLinks.length > 0){
                            console.log('entered')
                            this.downloadLinks = []
                        }
                        let temp = data[j]
                        // console.log(temp)

                        axios.get('//amazingtrail.ml/api/upload/getSubmission?url='+temp.submissionURL, { responseType: 'blob' })
                        .then(({ data }) => {
                            let blob = new Blob([data], { type: 'image/png' })
                            let link = document.createElement('a')

                            
                            link.href = window.URL.createObjectURL(blob)
                            link.download = 'image.png'
                            link.click()
                    
                            
                        })
                    }
                });
            }        

        },

        retrieveAllTeams(){
            this.teamList = [];
            axios.get('//amazingtrail.ml/api/team/getAllTeams?trail_instance_id='+this.trailID)
            .then(response => {
                let data = response.data;
                for(var row in data){
                    console.log(data[row]);
                    let team_id = data[row].team_id;
                    axios.get('//amazingtrail.ml/api/upload/getAllSubmissionURL?team='+team_id+'&trail_instance_id='+this.trailID)
                    .then(res => {
                        let submissionsURLs = res.data;
                        let size = Object.keys(submissionsURLs).length;
                        this.teamList.push({team_id: team_id, size: size}); 
                        if(this.teamList.length === data.length){
                            this.teamList.sort(function(a,b){ return a.team_id - b.team_id });
                        }
                    });
                }
                
            });
        }, 

        // retrieveAllUrl(teamID){
        //     // console.log('//amazingtrail.ml/api/upload/getAllSubmissionURL?team='+this.team+'&trail_instance_id='+this.trail)
        //     axios.get('//amazingtrail.ml/api/upload/getAllSubmissionURL?team='+teamID+'&trail_instance_id='+this.trailID)
        //     .then(response=>{
        //         let data = response.data
        //         let size = Object.keys(data).length
        //         console.log(response.data)
        //         // this.path = [];
        //         for(var i=0; i<size; i++){
        //             console.log('path length: ' + this.paths.length)
        //             // if(i == 0 && this.paths.length != 0){
        //             //     this.paths = []
        //             //     this.images = []
        //             //     this.questions = []
        //             // }
        //             let temp = data[i]
        //             console.log(temp)
        //             this.paths.push(temp.submissionURL)
        //             this.questions.push(temp.question)
        //             this.submissionIDs.push(temp.submissionID)
        //         }
        //         console.log(this.questions)
        //         // console.log(response.data[0]['SubmissionURL'])
        //     })
        // },
        load(teamID){
            // this.paths = []
            // this.images = []
            // console.log('team: ' + teamID)
            axios.get('//amazingtrail.ml/api/upload/getAllSubmissionURL?team='+teamID+'&trail_instance_id='+this.trailID)
            .then(response=>{
                let data = response.data
                let size = Object.keys(data).length
                console.log(response.data)
                // this.path = [];
                if (size === 0) {
                    this.paths = [];
                    this.questions = [];
                    this.images = [];
                }
                for(var i=0; i<size; i++){
                    // console.log('path length: ' + this.paths.length)
                    // console.log(this.paths.length)
                    // console.log('condition: ')
                    // console.log(i === 0 && this.paths.length > 0)
                    if(i == 0 && this.paths.length > 0){
                        console.log('entered')
                        this.paths = []
                        this.questions = []
                        this.submissionIDs = []
                        this.submissionStatuses = []
                    }
                    let temp = data[i]
                    // console.log(temp)
                    this.paths.push(temp.submissionURL)
                    this.questions.push(temp.question)
                    this.submissionIDs.push(temp.submissionID)
                    this.submissionStatuses.push(temp.status)
                }

                // this.retrieveAllUrl(teamID);
                console.log('paths: ')
                console.log(this.paths)
                // this.question = [];
                let updatedQn = [];
                let updatedSubmissionIDs = [];
                let updatedSubmissionStatuses = [];
                this.images = []
                let count = 0;
                // this.downloadLinks = []
                for(var index in this.paths){
                    // console.log(this.paths[path])
                    // console.log(index);
                    let url = this.paths[index]
                    let qn = this.questions[index]
                    let id = this.submissionIDs[index]
                    let status = this.submissionStatuses[index]
                    // console.log(url)
                    this.getImage(url, updatedQn, qn, updatedSubmissionIDs, id, updatedSubmissionStatuses, status);
                        // this.paths = []
                        // this.questions = []
                        // this.images = [                    })
                }
                    // console.log(this.questions)
                // console.log(response.data[0]['SubmissionURL'])
            });
            // this.retrieveAllUrl(teamID);
            // console.log(this.paths)
            // this.question = [];
            // for(var index in this.paths){
            //     // console.log(this.paths[path])
            //     let url = this.paths[index]
            //     // let qn = this.question[index]
            //     // console.log(url)
            //     axios.get('//amazingtrail.ml/api/upload/getSubmission?url=' + url, {responseType: 'blob'})
            //     .then(response=>{
            //         // this.result = 'entered here'
            //         // this.result = response.data
            //         var reader = new FileReader();
            //             // this.images = []; 
            //         // this.images = [];
            //         reader.onload = () => {
            //             console.log(reader.result);
            //             this.images.push(reader.result);
            //             // console.log(this.images.length)
            //         }
            //         reader.readAsDataURL(response.data);
            //         // this.paths = []
            //         // this.questions = []
            //         // this.images = []
            //     })
            //     .catch(error =>{
            //         console.log(error)
            //     })
            // }
            // vm.$forceUpdate()
        },
        getImage(url, updatedQn, qn, updatedSubmissionIDs, id, updatedSubmissionStatuses, status){
            //this.downloadLinks.push('//amazingtrail.ml/api/upload/getSubmission?url='+url);
            // console.log(this.downloadLinks)
             axios.get('//amazingtrail.ml/api/upload/getSubmission?url=' + url, {responseType: 'blob'})
                .then(response=>{

                    // this.result = 'entered here'
                    // this.result = response.data
                    var reader = new FileReader();
                        // this.images = []; 
                    // this.images = [];
                    reader.onload = () => {
                        // console.log(qn)
                        // console.log(reader.result);
                        this.images.push(reader.result);
                        updatedQn.push(qn);
                        updatedSubmissionIDs.push(id)
                        updatedSubmissionStatuses.push(status)
                        if (updatedQn.length == this.questions.length) {
                            this.questions = updatedQn;
                            this.submissionIDs = updatedSubmissionIDs;
                            this.submissionStatuses = updatedSubmissionStatuses;
                        }
                        console.log('images length: ')
                        console.log(this.images.length)
                    }
                    reader.readAsDataURL(response.data);

                })
                .catch(error =>{
                    console.log(error)
                })
        },
        sendStatus(index, points){
            const postBody = {
                team: this.currTeamID,
                points: points,
                submissionID: this.submissionIDs[index]
            }
            let grade = ''
            if(points > 0) {
                grade = 'Approved'
            } else {
                grade = 'Rejected'
            }
            axios.post('//amazingtrail.ml/api/team/updateScoreSubmission', postBody)
            .then(response => {
            let data = response.data;
            console.log(response.data);
            if (data.success === 'true') {
                console.log(index)
                this.submissionStatuses[index] = grade
                this.$forceUpdate();
                console.log(this.submissionStatuses[index]);
                // alert('successfully updated');
            }
            })

        },

        showSubmissions(teamID){
            if(this.showSub && this.currTeamID == teamID){
                // this.showGrps = false;
                this.showSub = false;
            } else{
                this.currTeamID = teamID
                this.showSub = true;
            }

            this.load(teamID);

        }
    },
    mounted(){

        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        axios.get('//amazingtrail.ml/api/getCurrentTrailInstanceID')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.trailID = data[row]
            }

            axios.get('//amazingtrail.ml/api/team/getAllTeams?trail_instance_id='+this.trailID)
            .then(response => {
                let data = response.data;
                for(var row in data){
                    console.log(data[row]);
                    let team_id = data[row].team_id;
                    axios.get('//amazingtrail.ml/api/upload/getAllSubmissionURL?team='+team_id+'&trail_instance_id='+this.trailID)
                    .then(res => {
                        let submissionsURLs = res.data;
                        let size = Object.keys(submissionsURLs).length;
                        this.teamList.push({team_id: team_id, size: size}); 
                        if(this.teamList.length === data.length){
                            this.teamList.sort(function(a,b){ return a.team_id - b.team_id });
                        }
                    });

                }                
            });
        });

        

    }
}
</script>

<style lang="scss" scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Lato|Permanent+Marker");
    @import '../../assets/themify-icons.css';

    .Submissions{
        display: flex;
        flex-direction: column;
    }

    .fixed{
        display: flex;
        flex-direction: row;
        position: fixed;
        z-index:1;
        // width: 95%;
        background-color: #F2F5F7!important;
        // background-color: pink;
        margin-top: -22px;
        padding-top: 30px;
        width: 100%;
        align-items: center;
        margin-left: 10px

    }

    .download-all-btn-area{
        // margin-top: 100px;
        display: inline-block;
        height: 30px;
        margin-bottom: 35px;
        font-size:15px;
    }

    .download-all-btn{
        margin-right: 20px;
        float: right;
        background-color: #645cdd;
        border: none;
        border-radius: 5px;
        color: white;
        padding:12px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        align-items: center;
    }

    .download-all-btn i{
        margin-right: 5px
    }

    .download-all-btn:hover{
        background-color: #6200EE;
    }

    .search-bar{
        top: 130px;
        display: flex;
        flex-direction: row;
        margin: 0px 30px 25px 35px;
        height:55px;
        align-self: center;
        transition: all 0.3s ease 0s;
        // position: fixed;
        // z-index:1;
        overflow-x: hidden;
        width: 80%
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

    .submissions-row{
        display: flex;
        flex-direction: row;
        margin-right: 18px;
        margin-left: 18px;
        position: relative;
        overflow-y: auto;
        // background-color: pink;
        margin-top: 100px
    }

    .team-container{
        padding: 5px;
        /*background-color: pink;*/
        background: none;
        margin:5px;
        flex:1;
        overflow: hidden;
        height: 110px;
        
    }

    .grp-card{
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        border: 2px solid #ededed;
        font-family: 'Lato', sans-serif; 
        background-color: white;
        color: #2c3e50;
    }

    .grp-card h6{
        font-style: italic
    }

    .grp-card:hover{
        background-color: #645cdd;
        color: white;
    }

    .grp-card:active, .grp-card:focus{
        background-color: #4d44bf;
        color: white;

    }

    .grp-submission-row{
        display: flex;
        // flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        // background-color: blue;
        animation-name: grow;
        animation-duration: 0.3s;
        animation-direction: normal;
        animation-delay: 0s;
        transform-origin: top left;
        margin-left: 20px;
        margin-right: 20px;
       
    }

    @keyframes grow{
        0%{
            transform: scale(0);
            opacity: 0;
        }

        100%{
            transform: scale(1);
            opacity: 1;
        }
    }

    .grp-submission-row .container{
        // background-color: pink;
        // max-width: 400px;
        // max-width: 31.333333333%;
        // flex-basis: auto;
        height: inherit;
        justify-content: space-between;
        background-color: pink;
        // align-content: center
        flex: 0 1 calc(33.3333333333% - 1em);
    }

    .card{
        justify-content: space-between;
        flex: 0 1 calc(33.3333333333% - 1em);
        overflow: hidden;
        // min-height: inherit;
        display: flex;
        flex-direction: column;
        background-color: white;
        margin: 1rem 0.5em;
        box-sizing: border-box;
        
    }

    .card a:hover {
	    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    }


    .acknowledge{
        display: flex;
        flex-direction: row;
        justify-content: center
    }

    .card button{
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        margin-top: 10px;
        margin-bottom: 10px
    }

    .approve button:hover, .disapprove button:hover{
        font-size: 30px;
    }

    .approve button{
        color: green;
        margin-right: 30px;
    }

    .disapprove button{
        color: red;
    }

    .card .image-area{
        height: inherit;
        padding: 10px;
        // background-color: red;
        
    }

    .card img{
        max-height: auto;
        width: auto;
        border-radius: 3px;
        border: 2px solid #ededed;
        font-family: 'Lato', sans-serif; 
        background-color: white;
        color: #2c3e50;
        
    }

    .submission-details{
        padding: 10px;
        font-family: 'Lato', sans-serif;
        
    }



    // .shift{
    //     margin-left: 15%;
    //     animation-name: pushRight;
    //     animation-duration: 0.5s;
    //     animation-direction: normal;
    //     animation-delay: 0s;
    //     transition: 0.5s ease-in-out;
    // }

    @media screen and (max-width: 1125px){
        .fixed{
            flex-direction: column
        }
        .search-bar{
            width:95%
        }

        .submissions-row{
            margin-top: 150px
        }

        .download-all-btn-area{
            width: 100%;
            margin-right: 20px
        }
    }



</style>