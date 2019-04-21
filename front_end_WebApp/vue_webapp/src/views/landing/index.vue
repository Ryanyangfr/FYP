//Home page for the webapplication. Guide users on how to get started on 
//Trail, mission, location, narrative creation
<template>
    <div class="Landing">
        <div class="card">
            <div class="card-title">
                <h5>Getting Started</h5>
            </div>
            <div class="create-trail-intro">
                <table>
                    <tr>
                        <td rowspan="5"><i class="ti-map-alt"></i></td>
                        <td class="trail-creation-title">Trail Creation</td>
                        <td rowspan="5"><router-link to='/addTrail'><button>Click to begin</button></router-link></td>
                    </tr>
                    <tr>
                        <td>1) Create your Locations, Narratives and Missions for the trail</td>
                    </tr>
                    <tr><td>2) Click on Setup Trail in menu</td></tr>
                    <tr><td>3) Enter details needed</td></tr>
                    <tr><td><b>To start trail, go to Start Trail in menu and generate your Trail ID to start!</b></td></tr>
                </table>
                <table>
                    <tr>
                        <td rowspan="4"><i class="ti-location-pin"></i></td>
                        <td class="location-creation-title">Location Creation</td>
                        <td rowspan="4"><router-link to='/addHotspot'><button>Click to begin</button></router-link></td>
                    </tr>
                    <tr>
                        <td>1) Click on Location Setup in menu</td>
                    </tr>
                    <tr><td>2) Enter Location Name</td></tr>
                    <tr><td>3) Select a pin-drop on the map as the desired location</td></tr>
                </table>
                <table>
                    <tr>
                        <td rowspan="3"><i class="ti-book"></i></td>
                        <td class="narrative-creation-title">Narrative Creation</td>
                        <td rowspan="3"><router-link to='/addHotspot'><button>Click to begin</button></router-link></td>
                    </tr>
                    <tr>
                        <td>1) Enter narrative name</td>
                    </tr>
                    <tr><td>2) Add a creative narrative</td></tr>
                </table>
                <table>
                    <tr>
                        <td rowspan="8"><i class="ti-flag"></i></td>
                        <td class="narrative-creation-title">Mission Creation</td>
                        <td rowspan="8"><router-link to='/addMission'><button>Click to begin</button></router-link></td>
                    </tr>
                    <tr>
                        <td>1) Select a mission type. There are a total of 7 mission types</td>
                    </tr>
                    <tr><td>2) Enter a title for your mission</td></tr>
                    <tr><td>3) For Quiz, enter your question. For each question, enter <b>four options</b> then select the answer. You can add as many questions as you like.</td></tr>
                    <tr><td>4) For Wefie and Drawing, enter your instruction for the participants.</td></tr>
                    <tr><td>5) For Drag and Drop, fill up all <b>four options</b> and answers to match.</td></tr>
                    <tr><td>6) For Anagram, add word.</td></tr>
                    <tr><td>7) For Wordsearch, enter <b>five words</b> related to the location.</td></tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "landing",
    data() {
        return{
        }
    }
}

           
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins|Gochi+Hand|Lato|Permanent+Marker");
@import '../../assets/themify-icons.css';

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

    .Landing table{
        margin: 18px;
        width: 95%
    }

    .Landing table td{
        text-align: left;
        padding: 10px 10px 10px 15px;
        font-size: 16px;
        max-width: 200px;
        
    }

    .Landing table tr:nth-child(1) {
        border-top: 1px solid #DEE2E6;
        /* background-color: pink */
    }

    .trail-creation-title, .location-creation-title, .narrative-creation-title{
        font-weight: 600;
        font-size: 19px
    }

    .Landing table button{
        background-color: #645cdd;
        display: flex;
        float: right;
        border: none;
        border-radius: 5px;
        color: white;
        padding:12px;
        margin-right: 20px;
        text-align: center;
        cursor: pointer;
        align-items: center;
    }

    .Landing table button a {
        text-decoration: none!important;
        font-size: 17px;
        color:white;
        font-family: 'Roboto Condensed', sans-serif;
    }

    .Landing table button:hover{
        background-color: #6200EE;
    }

    .Landing table i {
        font-size: 50px;
        color:#6200EE;
        margin-left: 25px
    }


</style>
