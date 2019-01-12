<template>
    <div>
        <v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>
        <v-select :options="missionTypes" v-model="mission" placeholder="Choose your mission" style="width:200px;"></v-select>
        <br>
        <div v-if="mission == missionTypes[0]">
            <form @submit.prevent="onSubmitToAdd" v-if="func == functionsAvailable[0]">
                Hotspot Name:
                <v-select :options="hotspotList" v-model="hotspotToBeEdited" placeholder="Please select a hotspot" style="width:200px;"></v-select>             
                <ul>
                    <li v-for="(input, index) in quiz">
                        Quiz Question:
                        <input name="question" type="text" placeholder="question" v-model="input.question">
                        Quiz Options:
                        <input name="option1" type="text" placeholder="option1" v-model="input.option1">
                        <input name="option2" type="text" placeholder="option2" v-model="input.option2">
                        <input name="option3" type="text" placeholder="option3" v-model="input.option3">
                        <input name="option4" type="text" placeholder="option4" v-model="input.option4">
                        Quiz Answer:
                        <input name="answer" type="text" placeholder="answer" v-model="input.answer">
                        <button @click="deleteRow(index)">Delete</button>
                    </li>
                </ul>
                 <button @click="addRow">Add row</button>
                 <button type="submit">submit</button>
            </form>
            <!-- {{this.quiz}} -->
            <!-- <form @submit.prevent="onSubmitToEdit" v-if="func == functionsAvailable[1]">
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
            </form> -->
        </div>
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
            mission: "",
            missionTypes: ["Quiz", "Drag-N-Drop", "Selfie", "Drawing"],
            hotspotList: [],
            quiz: []
        }
    }, 
    components:{
        vSelect
    },
    methods: {
        addRow(){
            this.quiz.push({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: ""
            })
        },
        quizOnSubmitToAdd(){
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
            location.reload();

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
            location.reload();
        }
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }
        // axios.get('http://54.255.245.23:3000/narrative/getNarratives')
        // .then(response => {
        //     let data = response.data;
        //     for(var row in data){
        //         console.log(data[row])
        //         this.dropDownList.push({label: data[row].narrative_title, value: data[row].narrative_id})
        //     }
        // })

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
