<template>
    <div>
        <v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>
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
        </form>
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
        }
    },
    mounted(){
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
