<template>
    <div class="Narrative">
        <div class="card">
            <div class="card-title">
                <h5>Narrative List</h5>
                <button class="create-narrative-btn" @click="addNarrative()"><i class="ti-plus"></i>ADD NEW</button>
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
                    <td><button @click="deleteNarrative(narrative.id,narrative.title)"><i class="ti-trash"></i></button></td>
                </tr>
                
            </table>
        </div>
        
        <div class="black-blur-bg" v-if="showEdit"> 
            <div class="edit-narrative-form">
                <div class="edit-narrative-header">
                    <h5>Edit Narrative</h5>
                    <button class="close-edit-narrative" @click="closeEdit()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="edit-narrative-body" @submit.prevent="onSubmitToEdit">
                    <div class="edit-narrative-input">
                        <input type="text" id="edit-narrative-title-input" required v-model="curr_narrative_title" required>
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

        <div class="black-blur-bg" v-if="showAdd"> 
            <div class="add-narrative-form">
                <div class="add-narrative-header">
                    <h5>New Narrative</h5>
                    <button class="close-add-narrative" @click="closeAdd()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="add-narrative-body" @submit.prevent="onSubmitToAdd">
                    <div class="add-narrative-input">
                        <input type="text" id="add-narrative-title-input" v-model="curr_narrative_title" required>
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
               
            </div>
        </div>

        <!--delete narrative popup -->
        <div class="black-blur-bg" v-if="showDelete"> 
            <div class="delete-narrative-popup">
                <div class="delete-narrative-header">
                    <h5>Delete</h5>
                    <button class="close-delete-narrative" @click="closeDelete()"><font-awesome-icon icon="times"/></button>
                </div>
                <hr>
                
                <form class="delete-narrative-body" @submit.prevent="onSubmitToDelete">
                    <div><h6>Are you sure you want to delete "{{this.curr_narrative_title}}"?</h6></div>
                    <div><hr></div>
                    <div class="delete-narrative-btm">
                        <button class="cancel-delete" @click="closeDelete()">Cancel</button>
                        <button type="submit" class="delete-narrative-btn">Delete</button>
                    </div>
                </form>
               
            </div>
        </div>

        <div class="black-blur-bg" v-if="deleteMessage.length > 0"> 
            <div class="delete-narrative-popup">
                <hr>
                
                <div><h6>{{deleteMessage}}</h6></div>
                <div><hr></div>
                <div class="delete-narrative-btm">
                    <button class="delete-narrative-btn" @click="closeDeleteMessage()">Close</button>
                    <!-- <button type="submit" class="delete-narrative-btn">Delete</button> -->
                </div>
               
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
            showEdit: false,
            showAdd:false,
            showDelete:false,
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
            curr_narrative_title: "",
            deleteMessage: "",
            closeMessage: false
        }
    },
    components:{
        vSelect
    },
    methods: {

        addNarrative(){
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

            this.curr_narrative = "";
            this.curr_narrative_title = "";
            this.curr_narrative_id = "";
        },

        onSubmitToAdd() {
            var postBody = {
                "narrative": this.curr_narrative,
	            "title": this.curr_narrative_title
            }
            axios.post('http://54.255.245.23:3000/add/addNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.go();
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

                this.$router.go();
            })
            if(this.showEdit){
                this.showEdit = false;
            } else{
                this.showEdit = true;
            }

        },

        editNarrative(narrative_id, narrative_title, narrative){
            if(this.showEdit){
                this.showEdit = false;
            } else{
                this.showEdit = true;
            }

            this.curr_narrative = narrative;
            this.curr_narrative_title = narrative_title;
            this.curr_narrative_id = narrative_id;

        },

        closeEdit(){
            if(this.showEdit){
                this.showEdit = false;
            } else{
                this.showEdit = true;
            }

            this.curr_narrative = "";
            this.curr_narrative_title = "";
            this.curr_narrative_id = "";
        },

        deleteNarrative(narrative_id, narrative_title){
            this.curr_narrative_id = narrative_id;
            this.curr_narrative_title = narrative_title;

            if(this.showDelete){
                this.showDelete = false;
            } else{
                this.showDelete = true;
            }
        },

        closeDelete(){
             if(this.showDelete){
                this.showDelete = false;
            } else{
                this.showDelete = true;
            }

            this.curr_narrative = "";
            this.curr_narrative_title = "";
            this.curr_narrative_id = "";
        },

        closeDeleteMessage(){
            this.showDelete = false;
            this.closeMessage = true;
            if( this.deleteMessage === "Narrative Successfully Deleted") {
                this.deleteMessage = "";
                location.reload();
            }
            this.deleteMessage = "";
        },

        onSubmitToDelete(){
            var postBody = {
                // "narrative_id": this.narrativeToBeDeleted.value,
                "narrative_id": this.curr_narrative_id
            }
            axios.post('http://54.255.245.23:3000/delete/deleteNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.success === "true") {
                    this.deleteMessage = "Narrative Successfully Deleted"
                } else {
                    this.deleteMessage = "Error Please Remove Narrative From Existing Trail"
                }
            })

            if(this.showDelete){
                this.showDelete = false;
            } else{
                this.showDelete = true;
            }
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
        z-index: 1000;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .edit-narrative-form, .add-narrative-form{
        width:40%;
        height:70%;
        background:white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        
    }

    .edit-narrative-header, .add-narrative-header, .delete-narrative-header{
        max-width: 100%;
        padding:18px;
    }

    .edit-narrative-form h5, .add-narrative-form h5, .delete-narrative-popup h5{
        display: flex;
        float: left;
    }

    .close-edit-narrative, .close-add-narrative, .close-delete-narrative{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }

    .edit-narrative-input, .add-narrative-input{
        float: left;
        display: flex;
        margin-left: 25px;
        margin-bottom: 45px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .edit-narrative-body, .add-narrative-body{
        padding-top: 25px;
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .edit-narrative-input label, .add-narrative-input label{
        top: -25px;
        position: absolute;
        font-size: 13px;
        pointer-events: none;
        transition: all 0.3s ease 0s;
    }

    .edit-narrative-input input:focus ~ label,
    .edit-narrative-input input:valid ~ label,
    .edit-narrative-input input:-webkit-autofill + label,
    .edit-narrative-input textarea:focus ~ label,
    .edit-narrative-input textarea:active ~ label,
    .edit-narrative-input textarea:-webkit-autofill + label,
    .add-narrative-input input:focus ~ label,
    .add-narrative-input input:valid ~ label,
    .add-narrative-input input:-webkit-autofill + label{
        font-size: 14px
    }

    .edit-narrative-input input, 
    .add-narrative-input input{
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

    .edit-narrative-input input:focus, 
    .add-narrative-input input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-narrative-input textarea:focus, .add-narrative-input textarea:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-narrative-input textarea, .add-narrative-input textarea{
        resize: none;
        margin-left: 5px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        width:90%;
    }

    .edit-narrative-submit, .add-narrative-submit{
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

 /*overlay for edit ends*/

    .delete-narrative-popup{
        min-width: 30%;
        min-height: 33%;
        background-color: white;
        opacity: 100%;
        z-index: 500;
        border-radius: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        overflow: hidden;
    }
    
    .delete-narrative-body{
        width:100%;
        height: 130px;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }

    .delete-narrative-body h6{
        display: flex;
        float: left;
        height: 100%;
        width: 100%;
        font-size: 15px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .delete-narrative-btm{
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

    .delete-narrative-btn{
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




