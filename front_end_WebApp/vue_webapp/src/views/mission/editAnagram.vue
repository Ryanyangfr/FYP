<template>
    <div class="EditAnagram">
       <div class="card">
            <div class="card-title">
                <h5>Edit Anagram</h5>
            </div>
            <form @submit.prevent="anagramOnSubmitToEdit">
                <div class="edit-anagram-body">
                    <div class="edit-anagram-input">
                        <label for="edit-anagram-input">Word</label>
                        <input name="edit-anagram-input" type="text" placeholder="Word" v-model="anagram_word"> 
                    </div>  
                    <div class="submit-btn-area">
                        <router-link to='/mission'><button class="cancel-btn" type="button">Cancel</button></router-link>
                        <button class="submit-btn" type="submit">Save</button>
                    </div>  
                </div>
  
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editAnagram",
    data() {
        return{
            anagram_title: "",
            anagram_word: "",
            anagram_ID: 0
            
        }  
    },

    computed: {
         selectedAnagramTitle(){
            return this.$store.state.selectedAnagramTitle
        },

        selectedAnagramID(){
            return this.$store.state.selectedAnagramID
        },

        selectedAnagramWord(){
            return this.$store.state.selectedAnagramWord
        }

    }, 

    methods:{

        anagramOnSubmitToEdit() {
            var postBody = {
                "id": this.anagram_ID,
                "word": this.anagram_word,
            }

            axios.post('//amazingtrail.ml/api/edit/editAnagram', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/mission' })
            })
        }

    },

    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        this.anagram_title = this.$store.state.selectedAnagramTitle;
        this.anagram_ID = this.$store.state.selectedAnagramID;
        this.anagram_word = this.$store.state.selectedAnagramWord;
        
    }           
}
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .EditAnagram .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .card .card-title{
        font-size: 20px;
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

   .edit-anagram-input label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        height: inherit;
        min-width: 11%

    }

    .edit-anagram-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .edit-anagram-input input{
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .edit-anagram-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .submit-btn-area{
        width: 100%;
    }

    .EditAnagram .submit-btn{
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
        font-size: 17px;
        color: white;
        margin-top: 50px;
    }

     .EditAnagram .submit-btn:hover{
        background-color: #5a52c4;
     }

     .EditAnagram .cancel-btn{
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
        margin-top: 50px;
    }

    .EditAnagram .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditAnagram .cancel-btn a{
        text-decoration: none!important;
        color: white
    }


</style>
