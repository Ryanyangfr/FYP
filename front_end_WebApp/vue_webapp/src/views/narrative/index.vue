<template>
    <div class="Narrative">
        <div class="card">
            <div class="card-title">
                <h5>Narrative List</h5>
            </div>
            <table>
                <tr>
                    <td>Narrative Title</td>
                    <td>Narrative Description</td>
                </tr>
            </table>
        </div>
        
        </br>

        <v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>

        <form @submit.prevent="onSubmitToAdd" v-if="func == functionsAvailable[0]">
            Narrative Title:
            <input name="title" type="text" placeholder="title" v-model="title">
            Narrative:
            <input name="narrative" type="text" placeholder="narrative" v-model="narrative">
            <button type="submit">Add</button>
        </form>

        <form @submit.prevent="onSubmitToEdit" v-if="func == functionsAvailable[1]">
            Narrative Title:
            <v-select :options="dropDownList" v-model='narrativeToBeEdited' placeholder='Please select a narrative title' style="width:200px;"></v-select>
            Narrative:
            <input name="narrative" type="text" placeholder="narrative" v-model="narrative">
            <button type="submit">Edit</button>
        </form>

        <form @submit.prevent="onSubmitToDelete" v-if="func == functionsAvailable[2]">
            <v-select :options="dropDownList" v-model="narrativeToBeDeleted" placeholder="Please select a narrative" style="width:200px;"></v-select>
             <button type="submit">Delete</button>
        </form>
        <!-- {{this.title}}
        {{this.narrative}} -->
        <!-- {{narrative}} -->
    </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "narrative",
    data() {
        return{
            func: "Add",
            functionsAvailable: ["Add", "Edit", "Delete"],
            title: "",
            narrative: "",
            narrativeToBeEdited: "",
            dropDownList: [],
            narrativeToBeDeleted: ""
        }
    },
    components:{
        vSelect
    },
    methods: {
        onSubmitToAdd() {
            var postBody = {
                "narrative": this.narrative,
	            "title": this.title
            }
            axios.post('http://54.255.245.23:3000/add/addNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
        },

        onSubmitToEdit() {
            var postBody = {
                "narrative_id": this.narrativeToBeEdited.value,
	            "narrative": this.narrative
            }
            axios.post('http://54.255.245.23:3000/edit/editNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
        },

        onSubmitToDelete(){
             var postBody = {
                "narrative_id": this.narrativeToBeDeleted.value,
            }
            axios.post('http://54.255.245.23:3000/delete/deleteNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
        }
    },
    mounted(){
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
    }
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
    .card{
        padding: 18px;
        margin: 18px;
        font-family: 'Roboto Condensed', sans-serif; 
        font-size: 20px;
        border-radius: 5px;
        border: none;
    }

    .card .card-title{
        display: flex;
        float: left;
    }

    .card table{
        margin: 18px;
        align-items: center;
        font-size: 14px;
    }
</style>





