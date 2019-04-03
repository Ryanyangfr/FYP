<template>
    <div>
        <br>
        <div class="upload-btn-wrapper">
            <input type="file" id='file' ref='file' v-on:change="onFileUpload()"/>
            <br>
            <br>
            <button class="btn">Add File Here</button>
        </div>
        <br>
        <button class="submitbtn" v-on:click="onUpload()">Upload</button>
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
            var url = '//13.228.173.165:3000/upload/uploadMultimedia'
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
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }
    }
}
    
</script>

<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.submitbtn{
    background: rgb(1, 98, 188);
    color: #fff;
    border: 1px solid #eee;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #eee;
    text-shadow:none;
    font-size: 130%;
    margin-top: 30px;
}
</style>
