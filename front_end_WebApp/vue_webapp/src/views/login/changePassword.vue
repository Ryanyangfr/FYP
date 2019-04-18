<template>
  <div class="passwordChange">
        <div class="card">
            <div class="card-title">
                <h5>Change Password</h5>
            </div>
            <form @submit.prevent="change_password" class="password-change-body">
                <div class="input-area">
                    <label for="username">Username</label>
                    <input name="username" type="text" placeholder="Enter Username" v-model="user.username" required> 
                </div> 
                <div class="input-area">
                    <label for="currentPassword">Current Password</label>
                    <input name="currentPassword" type="password" placeholder="Enter current password" v-model="user.currentPassword" required> 
                </div> 
                <div class="input-area">
                    <label for="password">New Password</label>
                    <input name="password" type="password" placeholder="Enter New Password" v-model="user.newPassword" required> 
                </div> 
                <div class="input-area">
                    <label for="password">Confirm New Password</label>
                    <input name="password" type="password" placeholder="Enter New Password" v-model="user.confirmNewPassword" required> 
                </div> 
                <div class="submit-btn-area">
                    <button class="submit-btn" type="submit">Save</button>
                </div>
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'passwordChange',
    data() {
        return{
            user: {
                username: "",
                currentPassword: "",
                newPassword: "",
                true_pass: ""
            }
        }
    },
    methods: {
        change_password(){
            axios.get('//amazingtrail.ml/api/user/getPassword?username=' + this.user.username)
            .then(response => {
                this.user.true_pass = response.data.password
                if(this.user.currentPassword === this.user.true_pass){
                    axios.post('//amazingtrail.ml/api/user/changeAdminPassword', {
                        username: this.user.username,
                        password: this.user.newPassword
                    })
                    .then(response => {
                        alert(response.data.status)
                        if(response.data.status === 'success'){
                            this.$router.push({ path: this.redirect || '/landing' })
                        } else{
                            alert('Incorrect username or password')
                        }
                    })
                    .catch(error => {
                        alert(error)
                    })
                }else {
                    alert('Incorrect username or password')
                }

            })
        }
    }
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';
    body{
        background-color: #F2F5F7!important;
    }

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
        display: flex;
        float: left;
        font-size: 20px;
        margin-bottom: 50px;
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    .passwordChange form{
        min-width: inherit;
    }

    .passwordChange .input-area{
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
        overflow: hidden;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        height: inherit;
        align-items: center;
        min-width: 13%
    }

    .passwordChange .input-area input{
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        width:75%;
        max-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .passwordChange .input-area input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .password-change-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .passwordChange .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .passwordChange .submit-btn{
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

     .passwordChange .submit-btn:hover{
        background-color: #5a52c4;
     }
</style>