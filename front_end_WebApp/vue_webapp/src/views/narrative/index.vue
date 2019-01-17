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
                    <td colspan="2">Actions</td>
                </tr>

                <tr class = "narrative-data" v-for="narrative in narrativeTableList" :key="narrative.id">
                    <td>{{narrative.title}}</td>
                    <td>{{narrative.narrative}}</td>
                    <td><button @click="editNarrative(narrative.id, narrative.title, narrative.narrative)"><i class="ti-pencil-alt"></i></button></td>
                    <td><button><i class="ti-trash"></i></button></td>
                </tr>
                
            </table>
        </div>
        
        <div class="black-blur-bg" v-if="show"> 
            <div class="edit-narrative-form">
                <div class="edit-narrative-header">
                    <h5>Edit Narrative</h5>
                    <button class="close-edit-narrative" @click="closeEdit()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="edit-narrative-body" @submit.prevent="onSubmitToEdit">
                    <div class="edit-narrative-input">
                        <input type="text" id="edit-narrative-title-input" required v-model="curr_narrative_title">
                        <label for="edit-narrative-title-input">Narrative Title</label>
                    </div>
                    <div class="edit-narrative-input">
                        <textarea id="edit-narrative-input" rows="5" cols="65" required v-model= "curr_narrative"></textarea>
                        <label for="edit-narrative-input">Enter Narrative</label>
                    </div>
                    <div>
                     <button type="submit" class="edit-narrative-submit">Submit</button>
                    </div>
                </form>
               
            </div>
        </div>

        <!--<v-select :options="functionsAvailable" v-model="func" placeholder="Add" style="width:200px;"></v-select>

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
        </form>-->

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
            show: false,
            func: "Add",
            functionsAvailable: ["Add", "Edit", "Delete"],
            title: "",
            narrative: "",
            narrativeToBeEdited: "",
            dropDownList: [],
            narrativeToBeDeleted: "",
            narrativeTableList: [],
            curr_narrative_id: "",
            curr_narrative: "",
            curr_narrative_title: ""
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
                "narrative_id": this.curr_narrative_id,
	            "narrative": this.curr_narrative
            }
            axios.post('http://54.255.245.23:3000/edit/editNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })

            if(this.show){
                this.show = false;
            } else{
                this.show = true;
            }

            location.reload();
        },

        editNarrative(narrative_id, narrative_title, narrative){
            if(this.show){
                this.show = false;
            } else{
                this.show = true;
            }

            this.curr_narrative = narrative;
            this.curr_narrative_title = narrative_title;
            this.curr_narrative_id = narrative_id;

        },

        closeEdit(){
            if(this.show){
                this.show = false;
            } else{
                this.show = true;
            }
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


    /*overlay for edit starts*/

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
    }

    .edit-narrative-form{
        width:40%;
        height:65%;
        background:white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        
    }

    .edit-narrative-header{
        max-width: 100%;
        padding:18px;
    }

    .edit-narrative-form h5{
        display: flex;
        float: left;
    }

    .close-edit-narrative{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .edit-narrative-input{
        float: left;
        display: flex;
        margin-left: 18px;
        margin-bottom: 45px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .edit-narrative-body{
        padding-top: 25px;
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .edit-narrative-input label{
        top: -25px;
        position: absolute;
        font-size: 13px;
        pointer-events: none;
        transition: all 0.3s ease 0s;
    }

    .edit-narrative-input input:focus ~ label,
    .edit-narrative-input input:valid ~ label,
    .edit-narrative-input input:-webkit-autofill + label{
        font-size: 14px
    }

    .edit-narrative-input textarea:focus ~ label,
    .edit-narrative-input textarea:valid ~ label,
    .edit-narrative-input textarea:-webkit-autofill + label{
        font-size: 14px
    }

    .edit-narrative-input input{
        margin-left: 5px;
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        width:90%
    }

    .edit-narrative-input input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-narrative-input textarea:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-narrative-input textarea{
        resize: none;
        margin-left: 5px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        width:90%;
    }

    .edit-narrative-submit{
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
        
    }

 /*overlay for edit ends*/
    
</style>




