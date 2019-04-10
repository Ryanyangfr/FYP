<template>
    <div class="EditNarrative">
       <div class="card">
            <div class="card-title">
                <h5>Edit Narrative</h5>
            </div>
            <form @submit.prevent="narrativeOnSubmitToEdit" class="edit-narrative-body">
                <div class="input-area">
                    <label for="edit-narrative-input">Narrative Title</label>
                    <input name="edit-narrative-input" type="text" placeholder="Title" v-model="title" required> 
                </div> 
                <div class="input-area">
                    <label for="edit-trail-input">Narrative</label>
                    <textarea name="edit-trail-input" rows="8" cols="65" type="text" placeholder="Type your narrative here" v-model="narrative" required></textarea>
                </div> 
                <div class="submit-btn-area">
                    <button class="cancel-btn" type="cancel"><router-link to='/viewNarrative'>Cancel</router-link></button>
                    <button class="submit-btn" type="submit">Save</button>
                    
                </div>
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editMission",
    data() {
        return{
            narrative: "",
            title: "",
            narrativeID:""
        }  
    },

    methods: {
        narrativeOnSubmitToEdit(){
            var postBody = {
                "narrative_id": this.narrativeID,
	            "narrative": this.narrative
            }
            axios.post('//amazingtrail.ml/api/edit/editNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)

                this.$router.push({ path: this.redirect || '/viewNarrative' })
            })
        }
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        this.narrativeID = this.$store.state.selectedNarrativeID;  
        this.title = this.$store.state.selectedNarrativeTitle;  
        this.narrative = this.$store.state.selectedNarrative;  
    }   
        
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    /*card styling begins*/
    .EditNarrative .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .EditNarrative .card .card-title{
        display: flex;
        float: left;
        font-size: 20px;
        margin-bottom: 50px;
    }

    .EditNarrative .card-title h5{
        display: flex;
        float: left;
    }

    .EditNarrative form{
        min-width: inherit;
        /*background-color: blue*/
    }
    /*card styling ends*/

    .EditNarrative .input-area{
        float: left;
        display: flex;
        margin-left:18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
    }

    .input-area label{
        margin-right: 100px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        align-items: center;
        min-width: 12%
    }

    .EditNarrative .input-area input{
        /*margin-left: 100px;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .EditNarrative .input-area input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .EditNarrative textarea{
        resize: none;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        min-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .EditNarrative textarea:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-narrative-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .EditNarrative .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .EditNarrative .submit-btn{
        /*display: inline;*/
        float:right;
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 20px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

     .EditNarrative .submit-btn:hover{
        background-color: #5a52c4;
     }

    .EditNarrative .cancel-btn{
         float:right;
         background-color: #ACACAC;
         color: white;
         border:none;
         border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

    .EditNarrative .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditNarrative .cancel-btn a{
        text-decoration: none!important;
        color: white
    }

</style>
