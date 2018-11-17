<template>
  <div class="Login">
    <img src="../../assets/Engaging_U.png">
    <h4>LOGIN</h4>
    <form @submit.prevent="login_check">
        <input name="username" type="text" placeholder="username" v-model="user.username">
        <input name="password" type="password" placeholder="password" v-model="user.password">
        <button type="submit">Login</button>
    </form>
    <br>
    <router-link :to="{ name: 'ChangePassword'}"> Change Password </router-link>
    <br>
    <span>Username: {{user.username}}</span>
    <span>Password: {{user.password}}</span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
      return {
          user: {
            username: '',
            password: '',
            isValid: false,
            true_pass: ''
          }
      }
  },
  methods: {
    login_check() {
        const baseURI = '//54.255.245.23:3000/user/getPassword?username=' + this.user.username
        axios.get(baseURI)
          .then(response => {
            console.log(response)
              this.user.true_pass = response.data.password
              if(this.user.password === this.user.true_pass){
                this.$router.push({ path: this.redirect || '/generateInstanceID' })
              } else{
                alert('Wrong Username or Password, please try again')
              }
          })
          .catch(error => {
            alert('Wrong Username or Password, please try again')
          })
      
    }
  }
}
</script>