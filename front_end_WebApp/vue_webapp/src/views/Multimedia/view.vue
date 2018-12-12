<template>
    <div>
        <form @submit.prevent="load">
            Enter team:
            <input name="team" type="text" placeholder="team id" v-model="team">
            Enter trail instance id:
            <input name="trail" type="text" placeholder="trail instance id" v-model="trail">
            <button type="submit">submit</button>
        </form>
        <br>
        <li v-for="(image,index) in this.images" :key="image">
            <span font-size="20">{{questions[index]}}</span>
            <pre>
                <img :src="image" style="width:700px;height:800px;"/>
            </pre>
        </li>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name: 'viewUploads',
    data() {
        return{
            trail: '',
            team: '',
            paths: [],
            images: {},
            questions: []
        }
    }
    ,
    methods:{
        retrieveAllUrl(){
            axios.get('//54.255.245.23:3000/upload/getAllSubmissionURL?team='+this.team+'&trail_instance_id='+this.trail)
            .then(response =>{
                let data = response.data
                let size = Object.keys(data).length
                for(var i=0; i<size-1; i++){
                    console.log(this.paths.length)
                    if(i == 0 && this.paths.length != 0){
                        this.paths = []
                        this.images = []
                    }
                    let temp = data[i]
                    console.log(temp)
                    this.paths.push(temp.SubmissionURL)
                    this.questions.push(temp.question)
                }
                console.log(this.questions)
                // console.log(response.data[0]['SubmissionURL'])
            })
        },
        load(){
            // this.paths = []
            // this.images = []
            this.retrieveAllUrl();
            // console.log(this.paths)
            for(var index in this.paths){
                // console.log(this.paths[path])
                let url = this.paths[index]
                // let qn = this.question[index]
                axios.get('//54.255.245.23:3000/upload/getSubmission?url=' + url, {responseType: 'blob'})
                .then(response=>{
                    // this.result = 'entered here'
                    // this.result = response.data
                    let reader = new FileReader();
                        reader.readAsDataURL(response.data); 
                        reader.onload = () => {
                        this.images.push(reader.result);
                        }
                })
                .catch(error =>{
                    console.log(error)
                })
            }
        }
    }
}
</script>
