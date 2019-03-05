<template>
    <div class="EditeDragAndDrop">
       <div class="card">
            <div class="card-title">
                <h5>Edit Quiz</h5>
            </div>
            <!--{{quiz}}-->
            <form @submit.prevent="dragAndDropOnSubmitToEdit">
                <div>
                    <div class="view-mission-body">
                        <div class="view-mission-input">
                            <label for="add-mission-title-input">Title</label>
                            <input name="add-mission-title-input" type="text" placeholder="Title" v-model="draganddrop_title"> 
                        </div>

                          <div class="view-mission-input">
                            <label for="add-mission-title-input">Question</label>
                            <input name="question-input" type="text" placeholder="Question" v-model="draganddrop_question"> 
                        </div>

                        <div v-for="option in options" :key="option.option" class="view-options-and-answers"> 
                            <div class="view-mission-input">
                                <label>Option</label>
                                <input name="question" id="question-input" type="text" placeholder="Option" v-model="option.option">
                            </div>

                            <div class="view-mission-input">
                                <label>Answer</label>
                                <input name="question" id="question-input" type="text" placeholder="Option" v-model="option.answer">
                            </div>
                        </div>

                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/mission'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Save</button>
                        </div>  
                    </div>
                </div>

                
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editWefie",
    data() {
        return{
            draganddrop_title: "",
            draganddrop_question: "",
            draganddrop_ID: 0,
            draganddrop_missionID: 0,
            options: []
            
        }  
    },

    computed: {
        selectedDragAndDropID(){
          console.log(this.$store.state.selectedDragAndDropID)
          return this.$store.state.selectedDragAndDropID
        },

        selectedDragAndDropQuestion(){
          console.log(this.$store.state.selectedDragAndDropQuestion)
          return this.$store.state.selectedDragAndDropQuestion
        },

        selectedDragAndDropTitle(){
          console.log(this.$store.state.selectedDragAndDropTitle)
          return this.$store.state.selectedDragAndDropTitle
        },

        selectedDragAndDropMissionID(){
          console.log(this.$store.state.selectedDragAndDropMissionID)
            return this.$store.state.selectedDragAndDropMissionID
        }
    },

    methods: {
      dragAndDropOnSubmitToEdit(){
        let postBody = {
          id: this.draganddrop_ID,
          question: this.draganddrop_question,
          options: this.options,
          title: this.draganddrop_title,
          missionID: this.draganddrop_missionID
        }

        console.log(postBody);

        axios.post('//13.229.115.32:3000/edit/editDragAndDrop', postBody)
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

      this.draganddrop_title = this.$store.state.selectedDragAndDropTitle
      this.draganddrop_question = this.$store.state.selectedDragAndDropQuestion
      this.draganddrop_ID = this.$store.state.selectedDragAndDropID
      this.draganddrop_missionID = this.$store.state.selectedDragAndDropMissionID

      console.log('check values drag and drop');
      console.log(this.draganddrop_title);
      console.log(this.draganddrop_question);
      console.log(this.draganddrop_ID);
      console.log(this.draganddrop_missionID);


      axios.get('//13.229.115.32:3000/draganddrop/getDragAndDropByMission?missionID=' + this.draganddrop_missionID)
      .then(response =>{
          var data = response.data;
          console.log(data)
          this.options = data[0].options
      })
    }
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    .EditeDragAndDrop .card{
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
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .ViewQuiz div{
        min-width: inherit;
        /*background-color: blue*/
    }

   .view-mission-input label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        /*align-items: center;*/
        min-width: 11%

    }

    .add-quiz-options-body label{
        margin-right: 90px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        min-width: 11%
    }

    .view-mission-input{
        float: left;
        display: flex;
        margin-left: 30px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
    }

    .view-mission-input input{
        /*margin-left: 100px;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .view-mission-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .add-quiz-options{
        display: flex;
        flex-direction: column;
        float: left;
        width: 100%;
        /*background-color: blue;*/
    }


    .add-quiz-options-body{
        margin-left:30px;
        display: flex;
        flex-direction: row;
        /*background-color: pink;*/
    }

    .view-options-and-answers{
        border-top: 1px solid #CED4DA;
        padding-top: 25px;
        display: flex;
        flex-direction: column;
    }

    .option input{
        display: flex;
        float: left;
        margin-bottom: 25px;
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 14px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .EditeDragAndDrop .submit-btn{
        /*display: flex;*/
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
        font-size: 20px;
        color: white;
        margin-top: 50px;
    }

     .EditeDragAndDrop .submit-btn:hover{
        background-color: #5a52c4;
     }

     .EditeDragAndDrop .cancel-btn{
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

    .EditeDragAndDrop .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditeDragAndDrop .cancel-btn a{
        text-decoration: none!important;
        color: white
    }


</style>