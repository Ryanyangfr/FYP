<template>
    <div class="Narrative">
        <div class="card">
            <div class="card-title">
                <h5>Narrative List</h5>
                <button class="create-narrative-btn"><router-link to='/addNarrative'><i class="ti-plus"></i>ADD NEW</router-link></button>
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
                    <td><button @click="saveNarrative(narrative.id, narrative.title, narrative.narrative)"><router-link to='/editNarrative'><i class="ti-pencil-alt"></i></router-link></button></td>
                    <td><button @click="deleteNarrative(narrative.id,narrative.title)"><i class="ti-trash"></i></button></td>
                </tr>
                
            </table>
        </div>
        
        <!--delete narrative popup -->
        <div class="black-blur-bg" v-if="showDelete"> 
            <div class="delete-narrative-popup">
                <div class="delete-narrative-header">
                    <h5>Delete</h5>
                    <button class="close-delete-narrative" @click="closeDelete()"><font-awesome-icon icon="times"/></button>
                </div>
                <!-- <hr> -->
                
                <form class="delete-narrative-body" @submit.prevent="onSubmitToDelete">
                    <div class="delete-narrative-content"><h6>Are you sure you want to delete "{{this.curr_narrative_title}}"?</h6></div>
                    <!-- <div><hr></div> -->
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
    </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "narrative",
    data() {
        return{
            showDelete:false,
            title: "",
            narrative: "",
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

    computed:{
        selectedNarrativeID(){
            return this.$store.state.selectedNarrativeID;
        },

        selectedNarrativeTitle(){
            return this.$store.state.selectedNarrativeTitle;
        },

        selectedNarrative(){
            return this.$store.state.selectedNarrativeNarrative;
        },
    },

    methods: {

        saveNarrative(narrative_ID, narrative_title, narrative){
            this.$store.commit('saveSelectedNarrativeID', narrative_ID);
            this.$store.commit('saveSelectedNarrativeTitle', narrative_title);
            this.$store.commit('saveSelectedNarrative', narrative);
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
            axios.post('//13.228.173.165:3000/delete/deleteNarrative', postBody)
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
        axios.get('//13.228.173.165:3000/narrative/getNarratives')
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

<style scoped>

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

    .create-narrative-btn a {
        text-decoration: none!important;
        font-size: 15px;
        color:white;
        font-family: 'Roboto Condensed', sans-serif;
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
        font-size: 20px;
        color: #536479
    }

    .narrative-data a{
        font-size: 20px;
        color: #536479
    }

    .narrative-table-header td{
        font-size: 16px;
        padding: 10px;
        min-height: 100px;
        font-weight: 600;
        border-top: 1px solid #DEE2E6;
        border-bottom: 2px solid #DEE2E6;
    }

    .narrative-title-header{
        min-width: 200px;
    }

    .black-blur-bg{
        width:100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.7);
        position: fixed;
        top:0;
        z-index: 4;
        display:flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .delete-narrative-popup{
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

    .delete-narrative-popup h5{
        display: flex;
        float: left;
    }

    .close-delete-narrative{
        background: none;
        border: none;
        color: #868686;
        cursor: pointer;
        float: right;
        font-size: 18px;
    }
    
    .delete-narrative-body{
        width: 100%;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        /*background-color: pink;*/
        flex: 10;
    }

    .delete-narrative-content{
        flex: 4;
        padding: 12px;
    }

    .delete-narrative-body h6{
        display: flex;
        flex: 9;
        float: left;
        height: 100%;
        width: 100%;
        align-items: flex-start;
        font-size: 15px;
        margin-left: 20px;
        /*margin-bottom: 10px;*/
        flex-direction: column;
    }

    .delete-narrative-header{
        flex: 1;
        width: 100%;
        padding:10px; 
        border-bottom: 1px solid #C6C4BC;
    }

    .delete-narrative-btm{
        margin-bottom: 0px;
        /*flex: 4;*/
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




