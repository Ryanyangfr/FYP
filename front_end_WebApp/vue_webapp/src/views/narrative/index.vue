<template>
    <div class="Narrative">
        <div class="card">
            <div class="card-title">
                <h5>Narrative List</h5>
                <button class="create-narrative-btn"><i class="ti-plus"></i>ADD NEW</button>
            </div>
            <table>
                <tr class="narrative-table-header">
                    <td class="narrative-title-header">Narrative Title</td>
                    <td>Narrative Description</td>
                    <td></td>
                    <td></td>
                </tr>

                <tr class = "narrative-data" v-for="narrative in narrativeTableList" :key="narrative.id">
                    <td>{{narrative.title}}</td>
                    <td>{{narrative.narrative}}</td>
                    <td><button><i class="ti-pencil-alt"></i></button></td>
                    <td><button><i class="ti-trash"></i></button></td>
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
            narrativeToBeDeleted: "",
            narrativeTableList: []
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
            // console.log(data)
            for(var row in data){
                console.log(data[row])
                this.dropDownList.push({label: data[row].narrative_title, value: data[row].narrative_id})
                this.narrativeTableList.push({title: data[row].narrative_title, id: data[row].narrative_id, narrative: data[row].narrative})
                // console.log(data[row].narrative);
            }
        })
    }
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto");
    @import '../../assets/themify-icons.css';

    .card{
        padding: 18px;
        margin: 18px;
        border-radius: 5px;
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

    .create-narrative-btn{
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

    .create-narrative-btn:hover{
        background-color: #6200EE;
    }

    .create-narrative-btn i{
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

    .narrative-data td{
        text-overflow: ellipsis;
        max-height: 10px;
        padding: 15px;
    }

    .narrative-data button{
        background: none;
        border: none;
        cursor: pointer;
    }

    .narrative-data i{
        font-size: 20px
    }

    .narrative-table-header td{
        font-size: 15px;
        padding: 10px;
        min-height: 100px;
        font-weight: 600;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .narrative-title-header{
        min-width: 200px;
       
        
    }
</style>





