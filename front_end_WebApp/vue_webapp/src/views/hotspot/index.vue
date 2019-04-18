<template>
    <div class="Hotspot">
        <div class="card">
            <div class="card-title">
                <h5>Location List</h5>
                <router-link to='/addHotspot'><button class="create-hotspot-btn"><i class="ti-plus"></i>ADD NEW</button></router-link>
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
                    <div class="delete-hotspot-content"><h6>Are you sure you want to delete "{{this.curr_hotspot_name}}"?</h6></div>
                    <div><hr></div>
                    <div class="delete-hotspot-btm">
                        <button class="cancel-delete" @click="closeDelete()">Cancel</button>
                        <button type="submit" class="delete-hotspot-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="deleteMessage.length > 0"> 
            <div class="delete-message-popup">                
                <div class="delete-message-area"><h6>{{deleteMessage}}</h6></div>
                <div class="close-delete-message">
                    <button @click="closeDeleteMessage()">Close</button>
                </div>
            </div>
        </div>

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
            

            axios.post('//amazingtrail.ml/api/delete/deleteHotspot', postBody)
            .then(response => {
                let data = response.data
                
                if (data.success === "true") {
                    this.deleteMessage = "Hotspot Successfully Deleted"
                } else {
                    this.deleteMessage = "Error Please Remove Hotspot From All Existing Trails"
                }

                if(this.showDelete){
                    this.showDelete = false;
                } else{
                    this.showDelete = true;
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
         if (!this.$session.exists()) {
            this.$router.push('/')
        }

        axios.get('//amazingtrail.ml/api/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
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

    /*delete hotspot begins*/
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
        flex: 1;
        width: 100%;
        padding:10px; 
        border-bottom: 1px solid #C6C4BC;
    }

    .delete-hotspot-popup h5{
        display: flex;
        float: left;
    }

    .close-delete-hotspot{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .delete-hotspot-popup{
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
    
    .delete-hotspot-body{
        width: 100%;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        flex: 10;
    }

    .delete-hotspot-body h6{
        display: flex;
        flex: 9;
        float: left;
        height: 100%;
        width: 100%;
        align-items: flex-start;
        font-size: 15px;
        margin-left: 20px;
        flex-direction: column;
    }

    .delete-hotspot-btm{
        margin-bottom: 0px;
        margin-top: 10px;
        border-top: 1px solid #C6C4BC;
        padding: 10px;
        position: relative;
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
    
    .delete-message-popup{
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
        text-align: center;
        padding: 10px
    }

    .delete-message-area{
        display: inline-block;
        margin: auto
    }

    .delete-message-popup button{
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
        align-content: center;
        font-family: 'Roboto', sans-serif;
        font-size: 17px;
        color: white;
        width: 70px;
    }

    .close-delete-message{
        display: inline-block
    }
</style>

