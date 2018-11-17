<template>
    <div>
        Input
        <input type="file" id='file' ref='file' v-on:change="onFileUpload()"/>
        <button v-on:click="onUpload()">Upload</button>
        {{this.file.name}}
    </div>
</template>

<script>
import axios from 'axios'
export default{
    name: 'uploadMultimedia',
    data() {
        return {
            file: ''
        }
    },
    methods: {
        onFileUpload(){
            console.log(this.$refs);
            this.file = this.$refs.file.files[0];
        },
        onUpload() {
            var url = '//54.255.245.23:3000/upload/uploadMultimedia'
            const fd = new FormData();
            fd.append('image', this.file)
            axios.post(url, fd, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res);
                })
                .catch(error =>{
                    console.log(error);
                })
        }
    }
}
    
</script>