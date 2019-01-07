<template>
    <div>
        <form @submit.prevent="onSubmit">
            Narrative Title:
            <input name="title" type="text" placeholder="title" v-model="title">
            Narrative:
            <input name="narrative" type="text" placeholder="narrative" v-model="narrative">
            <button type="submit">submit</button>
        </form>
        <!-- {{this.title}}
        {{this.narrative}} -->
        <!-- {{narrative}} -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "narrative",
    data() {
        return{
            title: "",
            narrative: ""
        }
    },
    methods: {
        onSubmit() {
            var postBody = {
                "narrative": this.narrative,
	            "title": this.title
            }
            axios.post('http://54.255.245.23:3000/add/addNarrative', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
            })
        }
    }
}
</script>




