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

                <tr class = "hotspot-data" v-for="hotspot in hotspotList" :key="hotspot.hotspot_name">
                    <td>{{hotspot.hotspot_name}}</td>
                    <td>{{hotspot.latitude}}</td>
                    <td>{{hotspot.longtitude}}</td>
                    <td>{{hotspot.narrative}}</td>
                    <td><button @click="editHotspot(hotspot.hotspot_name,hotspot.latitude,hotspot.longtitude,hotspot.narrative)"><i class="ti-pencil-alt"></i></button></td>
                    <td><button @click="deleteHotspot(hotspot.hotspot_name,hotspot.latitude,hotspot.longtitude,hotspot.narrative)"><i class="ti-trash"></i></button></td>
                </tr>
                <!-- {{this.hotspotList}} -->
            </table>
        </div>

        <div class="black-blur-bg" v-if="showAdd"> 
            <div class="add-hotspot-form">
                <div class="add-hotspot-header">
                    <h5>New Hotspot</h5>
                    <button class="close-add-hotspot" @click="closeAdd()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="add-hotspot-body" @submit.prevent="onSubmitToAdd">
                    <div class="add-hotspot-input">
                        <input type="text" id="add-hotspot-name-input" v-model="curr_hotspot_name" required>
                        <label for="add-hotspot-name-input">Hotspot Name</label>
                    </div>
                    <div class="add-hotspot-input">
                        <input type="text" id="add-lat-input" v-model="curr_lat" required>
                        <label for="add-lat-input">Latitude</label>
                    </div>
                    <div class="add-hotspot-input">
                        <input type="text" id="add-long-input" v-model="curr_long" required>
                        <label for="add-long-input">Longitude</label>
                    </div>
                    <div class="narrative-droplist">
                        <select placeholder='Select narrative for hotspot' id="narrative-droplist-input" v-model='curr_narrative'>
                             <option v-for="narrative in dropDownList" :key="narrative.value">
                                 {{narrative.label}}
                             </option> 
                        </select>
                        <label for="narrative-droplist-input">Narrative</label>  
                    </div>
                    <div>
                        <button type="submit" class="add-hotspot-submit">Submit</button>
                    </div>
                </form>
               
            </div>
        </div>
        
        <div class="black-blur-bg" v-if="showEdit"> 
            <div class="edit-hotspot-form">
                <div class="edit-hotspot-header">
                    <h5>Edit Hotspot</h5>
                    <button class="close-edit-hotspot" @click="closeEdit()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="edit-hotspot-body" @submit.prevent="onSubmitToAdd">
                    <div class="edit-hotspot-input">
                        <input type="text" id="edit-hotspot-name-input" v-model="curr_hotspot_name" required>
                        <label for="edit-hotspot-name-input">Hotspot Name</label>
                    </div>
                    <div class="edit-hotspot-input">
                        <input type="text" id="edit-lat-input" v-model="curr_lat" required>
                        <label for="edit-lat-input">Latitude</label>
                    </div>
                    <div class="edit-hotspot-input">
                        <input type="text" id="edit-long-input" v-model="curr_long" required>
                        <label for="edit-long-input">Longitude</label>
                    </div>
                    <div class="narrative-droplist">
                        <select placeholder='Select narrative for hotspot' id="narrative-droplist-input" v-model='curr_narrative'>
                             <option v-for="narrative in dropDownList" :key="narrative.value">
                                 {{narrative.label}}
                             </option> 
                        </select>
                        <label for="narrative-droplist-input">Narrative</label>  
                    </div>
                    <div>
                        <button type="submit" class="edit-hotspot-submit">Submit</button>
                    </div>
                </form>
               
            </div>
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
            showEdit: false,
            showAdd: false,
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
            curr_hotspot_name: "",
            curr_lat: "",
            curr_long: "",
            curr_narrative:'curr_narrative',
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

        addHotspot(){
             if(this.showAdd){
                this.showAdd = false;
            } else{
                this.showAdd = true;
            }
        },

        closeAdd(){
            if(this.showAdd){
                this.showAdd = false;
            } else{
                this.showAdd = true;
            }

            this.curr_hotspot_name = "";
            this.curr_lat = "";
            this.curr_long = "";
            this.curr_narrative = "";
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

        editHotspot(hotspot_name, lat, long, narrative){
             if(this.showEdit){
                this.showEdit = false;
            } else{
                this.showEdit = true;
            }

            this.curr_hotspot_name = hotspot_name;
            this.curr_lat = lat;
            this.curr_long = long;
            this.curr_narrative = narrative;
        },

        closeEdit(){
            if(this.showEdit){
                this.showEdit = false;
            } else{
                this.showEdit = true;
            }

            this.curr_hotspot_name = "";
            this.curr_lat = "";
            this.curr_long = "";
            this.curr_narrative = "";
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
                this.hotspotList.push({hotspot_name: data[row].hotspot_name, longtitude: data[row].longtitude, latitude: data[row].latitude, narrative: data[row].narrative});
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

    /*add hotspot begins*/
     .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 2;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .add-hotspot-form, .edit-hotspot-form{
        width:50%;
        height:85%;
        background:white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        
    }

    .edit-hotspot-header, .add-hotspot-header, .delete-narrative-header{
        max-width: 100%;
        padding:18px;
    }

    .edit-hotspot-form h5, .add-hotspot-form h5, .delete-narrative-popup h5{
        display: flex;
        float: left;
    }

    .close-edit-hotspot, .close-add-hotspot, .close-delete-narrative{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .edit-hotspot-input, .add-hotspot-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 45px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .narrative-droplist{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 45px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }
    
    .narrative-droplist select{
        margin-left: 5px;
        height: 40px;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        font-size: 14px;
        width:90%;
        font-family: 'Roboto', sans-serif;
    }

    .edit-hotspot-body, .add-hotspot-body{
        padding-top: 25px;
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .narrative-droplist label{
        top: -25px;
        position: absolute;
        font-size: 13px;
        pointer-events: none;
        transition: all 0.3s ease 0s;
    }

    .edit-hotspot-input label, .add-hotspot-input label{
        top: -25px;
        position: absolute;
        font-size: 13px;
        pointer-events: none;
        transition: all 0.3s ease 0s;
    }

    .edit-hotspot-input input:focus ~ label,
    .edit-hotspot-input input:valid ~ label,
    .edit-hotspot-input input:-webkit-autofill + label,
    .add-hotspot-input input:focus ~ label,
    .add-hotspot-input input:valid ~ label,
    .add-hotspot-input input:-webkit-autofill + label,
    .narrative-droplist select:focus ~ label,
    .narrative-droplist select:-webkit-autofill + label{
        font-size: 14px
    }

    .edit-hotspot-input input, .add-hotspot-input input{
        margin-left: 5px;
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        width:90%;
        font-family: 'Roboto', sans-serif;
    }

    .edit-hotspot-input input:focus, .add-hotspot-input input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-hotspot-submit, .add-hotspot-submit{
        background-color: #6200EE;
        border: none;
        border-radius: 4px;
        color: white;
        font-size:15px;
        display: flex;
        float: right;
        padding:10px 20px 10px 20px;
        margin-right: 25px;
        margin-bottom: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: "Roboto", sans-serif
        
    }
    
</style>

