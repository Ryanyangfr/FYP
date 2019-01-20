<template>
    <div class="Hotspot">
        <div class="card">
            <div class="card-title">
                <h5>Hotspot List</h5>
                <button class="create-hotspot-btn" @click="addHotspot()"><i class="ti-plus"></i>ADD NEW</button>
            </div>
            <table>
                <tr class="hotspot-table-header">
                    <td class="hotspot-title-header">Hotspot Name</td>
                    <td>Latitude</td>
                    <td>Longtitude</td>
                    <td>Narrative</td>
                    <td colspan="2">Actions</td>
                </tr>

                <tr class = "hotspot-data" v-for="hotspot in hotspotList" :key="hotspot.label">
                    <td>{{hotspot.label}}</td>
                    <td>{{hotspot.latitude}}</td>
                    <td>{{hotspot.longtitude}}</td>
                    <td>{{hotspot.narrative}}</td>
                    <td><button @click="editHotspot(narrative.label)"><i class="ti-pencil-alt"></i></button></td>
                    <td><button @click="deleteHotspot(narrative.label)"><i class="ti-trash"></i></button></td>
                </tr>
                
            </table>
        </div>

        <!--<div class="black-blur-bg" v-if="showAdd"> 
            <div class="add-narrative-form">
                <div class="add-narrative-header">
                    <h5>New Narrative</h5>
                    <button class="close-add-narrative" @click="closeAdd()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="add-hotspot-body" @submit.prevent="onSubmitToAdd">
                    <div class="add-hotspot-input">
                        <input type="text" id="add-hotspot-title-input" v-model="curr_narrative_title" required>
                        <label for="add-narrative-title-input">Narrative Title</label>
                    </div>
                    <div class="add-narrative-input">
                        <textarea id="add-narrative-input" rows="5" cols="65" v-model="curr_narrative" required></textarea>
                        <label for="add-narrative-input">Enter Narrative</label>
                    </div>
                    <div>
                     <button type="submit" class="add-narrative-submit">Submit</button>
                    </div>
                </form>
               
            </div>-->
        </div>
        <!--<v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>
        <br>
        <form @submit.prevent="onSubmitToAdd" v-if="func == functionsAvailable[0]">
            Hotspot Name:
            <input name="hotspot" type="text" placeholder="hotspot name" v-model="hotspot">
            Latitude:
            <input name="latitude" type="text" placeholder="latitude" v-model="latitude">
            Longtitude:
            <input name="longtitude" type="text" placeholder="longtitude" v-model="longtitude">
            <v-select :options="dropDownList" v-model='narrative' placeholder='Please select a narrative title' style="width:200px;"></v-select>
            <button type="submit">submit</button>
        </form>

        <form @submit.prevent="onSubmitToEdit" v-if="func == functionsAvailable[1]">
            Hotspot Name:
             <v-select :options="hotspotList" v-model="hotspotToBeEdited" placeholder="Please select a hotspot" style="width:200px;"></v-select>
            Latitude:
            <input name="latitude" type="text" placeholder="latitude" v-model="latitude">
            Longtitude:
            <input name="longtitude" type="text" placeholder="longtitude" v-model="longtitude">
            <v-select :options="dropDownList" v-model='narrative' placeholder='Please select a narrative title' style="width:200px;"></v-select>
            <button type="submit">submit</button>
        </form>

        <form @submit.prevent="onSubmitToDelete" v-if="func == functionsAvailable[2]">
            <v-select :options="hotspotList" v-model="hotspotToBeDeleted" placeholder="Please select a hotspot" style="width:200px;"></v-select>
             <button type="submit">submit</button>
        </form>-->
        <!-- {{narrative}} -->
    </div>
</template>

<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "hotspot",
    data() {
        return{
            func: "Add",
            functionsAvailable: ["Add", "Edit", "Delete"],
            dropDownList: [],
            hotspot: null,
            hotspotList: [],
            hotspotToBeDeleted: "",
            hotspotToBeEdited: "",
            latitude: null,
            longtitude: null,
            narrative: 'narrative',
        }
    }, 
    components:{
        vSelect
    },
    methods: {
        onSubmitToAdd(){
            var postBody = {
                "hotspot_name": this.hotspot,
                "latitude": this.latitude,
                "longtitude": this.longtitude,
                "narrative_id": this.narrative.value
            }
            axios.post('http://54.255.245.23:3000/add/addHotspot', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
            this.hotspot = "";
            this.latitude = "";
            this.longtitude = "";
            this.narrative = "";
            location.reload();
        },
        onSubmitToEdit(){
            var postBody = {
                "hotspot_name": this.hotspotToBeEdited,
                "latitude": this.latitude,
                "longtitude": this.longtitude,
                "narrative_id": this.narrative.value
            }
            axios.post('http://54.255.245.23:3000/edit/editHotspot', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
            this.hotspotToBeEdited = "";
            this.latitude = "";
            this.longtitude = "";
            this.narrative = "";
            // location.reload();

        },
        onSubmitToDelete(){
            var postBody = {
                "hotspot_name": this.hotspotToBeDeleted,
            }
            axios.post('http://54.255.245.23:3000/delete/deleteHotspot', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
            this.hotspotToBeDeleted = "";
            // location.reload();
        }
    },
    mounted(){
        console.log(this.$session.exists());
         if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        axios.get('http://54.255.245.23:3000/narrative/getNarratives')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.dropDownList.push({label: data[row].narrative_title, value: data[row].narrative_id})
            }
        })

        axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.hotspotList.push({label: data[row], value: data[row]})
            }
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

    .create-hotspot-btn{
        background-color: #645cdd;;
        border: none;
        border-radius: 5px;
        color: white;
        font-size:15px;
        display: flex;
        float: right;
        padding:12px;
        margin-right: 12px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        align-items: center;
    }

    .create-hotspot-btn:hover{
        background-color: #6200EE;
    }

    .create-hotspot-btn i{
        font-size: 13px;
        margin-right: 5px;
    }

    .card table{
        margin: 18px;
        font-size: 14px;
        font-family: "Roboto", sans-serif;
       
    }

    .card table td{
        text-align: left;
    }

    
    tr:nth-child(even) {
        background-color: #f2f2f2;
        border-top: 1px solid #DEE2E6;
        border-bottom: 1px solid #DEE2E6;
    }

    .hotspot-data td{
        text-overflow: ellipsis;
        max-height: 10px;
        padding: 15px;
    }

    .hotspot-data button{
        background: none;
        border: none;
        cursor: pointer;
    }

    .hotspot-data i{
        font-size: 20px
    }

    .hotspot-table-header td{
        font-size: 15px;
        padding: 10px;
        min-height: 100px;
        font-weight: 600;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .hotspot-title-header{
        min-width: 200px;
    }

    
</style>

