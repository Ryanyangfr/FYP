<template>
  <div class="passwordChange">
    <img src="../../assets/Engaging_U.png">
    <h4>LOGIN</h4>
    <form @submit.prevent="change_password">
        <input name="username" type="text" placeholder="Enter Username" v-model="user.username">
        <input name="currentPasword" type="text" placeholder="Enter Current Password" v-model="user.currentPassword">
        <input name="password" type="password" placeholder="Enter New Password" v-model="user.newPassword">
        <button type="submit">Submit</button>
    </form>
    <br>
    <span>Username: {{user.username}}</span>
    <span>Password: {{user.newPassword}}</span>
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
                            this.$router.push({ path: this.redirect || '/login' })
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

<style>

</style>