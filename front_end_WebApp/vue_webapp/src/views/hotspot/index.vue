<template>
    <div class="Hotspot">
        <div class="card">
            <div class="card-title">
                <h5>Location List</h5>
                <button class="create-hotspot-btn"><router-link to='/addHotspot'><i class="ti-plus"></i>ADD NEW</router-link></button>
            </div>
            <table>
                <tr class="hotspot-table-header">
                    <td class="hotspot-title-header">Location Name</td>
                    <td>Latitude</td>
                    <td>Longtitude</td>
                    <td colspan="2">Actions</td>
                </tr>

                <tr class = "hotspot-data" v-for="hotspot in hotspotList" :key="hotspot.hotspot_name">
                    <td>{{hotspot.hotspot_name}}</td>
                    <td>{{hotspot.latitude}}</td>
                    <td>{{hotspot.longtitude}}</td>
                    <td><button @click="saveHotspot(hotspot.hotspot_name,hotspot.latitude,hotspot.longtitude)"><router-link to='editHotspot'><i class="ti-pencil-alt"></i></router-link></button></td>
                    <td><button @click="deleteHotspot(hotspot.hotspot_name)"><i class="ti-trash"></i></button></td>
                </tr>
            </table>
        </div>
        

        <!--delete hotspot begins-->
        <div class="black-blur-bg" v-if="showDelete"> 
            <div class="delete-hotspot-popup">
                <div class="delete-hotspot-header">
                    <h5>Delete</h5>
                    <button class="close-delete-hotspot" @click="closeDelete()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="delete-hotspot-body" @submit.prevent="onSubmitToDelete">
                    <div><h6>Are you sure you want to delete "{{this.curr_hotspot_name}}"?</h6></div>
                    <div><hr></div>
                    <div class="delete-hotspot-btm">
                        <button class="cancel-delete" @click="closeDelete()">Cancel</button>
                        <button type="submit" class="delete-hotspot-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="deleteMessage.length > 0"> 
            <div class="delete-hotspot-popup">
                <hr>
                
                <div><h6>{{deleteMessage}}</h6></div>
                <div><hr></div>
                <div class="delete-hotspot-btm">
                    <button class="delete-hotspot-btn" @click="closeDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
            </div>
        </div>
        <!--delete hotspot ends-->

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
            showDelete: false,
            hotspotList: [],
            hotspotToBeDeleted: "",
            hotspotToBeEdited: "",
            curr_hotspot_name: "",
            curr_lat: "",
            curr_long: "",
            deleteMessage: "",
            closeMessage: false
        }
    }, 
    components:{
        vSelect
    },

    computed:{
        selectedHotspotName(){
            return this.$store.state.selectedHotspotName;
        },

        selectedLat(){
            return this.$store.state.selectedLat;
        },

        selectedLng(){
            return this.$store.state.selectedLng;
        },
    },

    methods: {

        saveHotspot(hotspot_name, lat, lng){
            this.$store.commit('saveSelectedHotspotName', hotspot_name);
            this.$store.commit('saveSelectedLat', lat);
            this.$store.commit('saveSelectedLng', lng);
        },

        onSubmitToDelete(){
            var postBody = {
                "hotspot_name": this.curr_hotspot_name,
            }
            console.log("post body: ");
            console.log(postBody)

            axios.post('//amazingtrail.ml/api/delete/deleteHotspot', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.deleteMessage = "Hotspot Successfully Deleted"
                } else {
                    this.deleteMessage = "Error Please Remove Hotspot From All Existing Trails"
                }
                // this.$router.go();
            })
        },

        deleteHotspot(hotspot_name){
            if(this.showDelete){
                this.showDelete = false;
            } else{
                this.showDelete = true;
            }

            this.curr_hotspot_name = hotspot_name;
        },

        closeDelete(){
            if(this.showDelete){
                this.showDelete = false;
            } else{
                this.showDelete = true;
            }

            this.curr_hotspot_name = "";
        },

        closeDeleteMessage(){
            this.showDelete = false;
            this.closeMessage = true;
            if( this.deleteMessage === "Hotspot Successfully Deleted") {
                this.deleteMessage = "";
                this.$router.go();
            }
            this.curr_hotspot_name = "";
            this.deleteMessage = "";
        },
    },
    mounted(){
        console.log(this.$session.exists());
         if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        // axios.get('//amazingtrail.ml/api/narrative/getNarratives')
        // .then(response => {
        //     let data = response.data;
        //     for(var row in data){
        //         console.log(data[row])
        //         this.dropDownList.push({label: data[row].narrative_title, value: data[row].narrative_id})
        //         this.narrative_dictionary[data[row].narrative_title] = data[row].narrative_id;
        //     }
        //     console.log("dictionary: ");
        //     console.log(this.narrative_dictionary);
        // })

        axios.get('//amazingtrail.ml/api/hotspot/getHotspots')
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
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto");
    @import '../../assets/themify-icons.css';

    body{
        background-color: #F2F5F7!important;
    }

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
        background-color: #645cdd;
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

    .create-hotspot-btn a {
        text-decoration: none!important;
        font-size: 15px;
        color:white;
        font-family: 'Roboto Condensed', sans-serif;
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
        font-size: 17px;
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
        font-size: 20px;
        color: #536479
    }

     .hotspot-data a{
        font-size: 20px;
        color: #536479
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

    .delete-hotspot-header{
        max-width: 100%;
        padding:18px;
    }

    .delete-hotspot-popup h5{
        display: flex;
        float: left;
    }

    .close-edit-hotspot, .close-add-hotspot, .close-delete-hotspot{
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

    .delete-hotspot-popup{
        min-width: 30%;
        min-height: 35%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
    }
    
    .delete-hotspot-body{
        width:100%;
        /*height: 130px;*/
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }

    .delete-hotspot-body h6{
        display: flex;
        float: left;
        height: 100%;
        width: 100%;
        font-size: 15px;
        margin-left: 25px;
        margin-right: 25px;
        margin-bottom: 10px;
    }

    .delete-hotspot-btm{
        margin-bottom: 10px;
        margin-top: 10px;
    
    }

    .cancel-delete{
        background: none;
        border: 1px solid #C6C4BC;
        border-radius: 4px;
        display: flex;
        float: left;
        padding:8px 15px 8px 15px;
        margin-left: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: #666666;
    }

    .delete-hotspot-btn{
        background: none;
        border: none;
        background-color: #F15E5E;
        border-radius: 4px;
        display: flex;
        float: right;
        padding:8px 15px 8px 15px;
        margin-right: 25px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
    }
    
</style>

