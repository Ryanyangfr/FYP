<template>
    <div>
        <form @submit.prevent="onSubmit">
            Hotspot Name:
            <input name="hotspot" type="text" placeholder="hotspot name" v-model="hotspot">
            Latitude:
            <input name="latitude" type="text" placeholder="latitude" v-model="latitude">
            Longtitude:
            <input name="longtitude" type="text" placeholder="longtitude" v-model="longtitude">
            <v-select :options="dropDownList" v-model='narrative' placeholder='Please select a narrative title' style="width:200px;"></v-select> 
        </form>
        <!-- {{narrative}} -->
    </div>
</template>

<script>  
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    name: "hotspot",
    data() {
        return{
            dropDownList: [],
            hotspot: null,
            latitude: null,
            longtitude: null,
            narrative: 'narrative',
            
        }
    }, 
    components:{
        vSelect
    },
    methods: {
        onSubmit(){
            axios.get()
        }
    },
    mounted(){
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
