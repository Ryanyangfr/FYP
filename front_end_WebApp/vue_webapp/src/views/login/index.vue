<template>
  <div class="Login">
      <div class="login-box">
        <form @submit.prevent="login_check">
          <div class="login-form-head">
            <h4>Login</h4>
            <p>SMU Engaging U</p>
          </div>
          <div class="login-form-body">
            <div class="login-form-input">
              <input type="text" id="inputUsername" v-model="user.username" required>
              <label for="inputUsername">Username</label>
            </div>
            <div class="login-form-input">
              <input type="password" id="inputPassword" v-model="user.password" required>
              <label for="inputPassword">Password</label>
            </div>
            <div class="rmb-change-passwd-area">
              <div class = "rmb-passwd-area">
                <input type="checkbox" id="login-rmb-checkbox">
                <label for="login-rmb-checkbox">Remember Me</label>
              </div>
              <div class="change-passwd-area">
                <router-link to='/passwordChange'> Change Password? </router-link>
              </div>              
            </div>
            <div class="submit-btn-area">
              <button type="submit">Login<i class="ti-arrow-right"></i></button>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

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
  computed: {
        showSidebar(){
            return this.$store.state.showSidebar;
        }
  }, 
  methods: {
    login_check() {
        const baseURI = '//amazingtrail.ml/api/user/getPassword?username=' + this.user.username
        axios.get(baseURI)
          .then(response => {
              this.user.true_pass = response.data.password;
              if(this.user.password === this.user.true_pass){
                this.$session.start()
                this.$session.set('jwt', response.data.token)
                this.$router.push({ path: this.redirect || '/landing' })
                this.$store.commit('changeSideBarState')
              } else{
                alert('Wrong Username or Password, please try again')
              }
          })
          .catch(error => {
            alert('Wrong Username or Password, please try again')
          })
      
    }

  },

  mounted(){
    this.$store.commit('resetSideBar')
        
  }  
}
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Karla|Lato|Pontano+Sans|Poppins|Staatliches");
  @import '../../assets/themify-icons.css';

  input{
    font-family: 'Poppins', sans-serif
  }

  label{
    font-family: 'lato', sans-serif
  }

  .Login{
    background-image: url('../../assets/background.jpg');
    background-size: cover;
    position: relative;
    background-position: center center;
    position: fixed;
    height: 100%;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center
  }

  .login-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;   
  }

  .login-box form {
    margin: auto;
    width: 450px;
    max-width: 100%;
    background: #fff;
    border-radius: 3px;
}

.login-form-head h4 {
  letter-spacing: 0;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 7px;
  font-family: 'Karla', sans-serif;
}

.login-form-head p {
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 0px;
    font-family: 'Lato', sans-serif;
}

.login-form-head {
  text-align: center;
  padding: 30px;
  height:120px;
  background-color:#5a52c4;
  color:#fff;
}

.login-form-body {
  padding: 50px;
}

.login-form-input {
  margin-bottom: 25px;
  position: relative;
}

.login-form-input label{
  position: absolute;
  left: 0;
  top: 0;
  color: #b3b2b2;
  pointer-events: none;
  transition: all 0.3s ease 0s;
}

.login-form-input input:focus ~ label,
.login-form-input input:valid ~ label,
.login-form-input input:-webkit-autofill + label{
    top: -20px;
    font-size: 12px;
    color: #7e74ff;
}

.login-form-input input:placeholder-shown{
    top: -20px;
    font-size: 12px;
    color: #7e74ff;
}

/*remove the autofill yellow background*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px white inset !important; 
}

.login-form-input input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-bottom: 1px solid #e6e6e6;
}

.rmb-change-passwd-area{
  display: block;
  font-size: 13px; 
  margin-top:10px;
}

.rmb-change-passwd-area a{
  text-decoration: none!important;
}

.rmb-passwd-area{
  width: 50%;
  float: left;
  text-align: left
}

.change-passwd-area{
  width:50%;
  float: right;
  padding-right: 7px;
  text-align: right;
  font-family: 'Poppins', sans-serif
}

.rmb-passwd-area input{
  margin-right: 5px; 
}

.Login .submit-btn-area{
  align-items: center;
  margin-top: 90px;
}

.Login .submit-btn-area button{
    width: 100%;
    height: 50px;
    border: none;
    background: #ede7f6;
    color: #585b5f;
    border-radius: 40px;
    text-transform: uppercase;
    letter-spacing: 0;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 0 22px rgba(0, 0, 0, 0.07);
    -webkit-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
    cursor: pointer;
}

.submit-btn-area i{
  margin-left: 15px;-webkit-transition: margin-left 0.3s ease 0s;
    transition: margin-left 0.3s ease 0s;
}

.submit-btn-area button:hover i {
    margin-left: 20px;
}

.submit-btn-area button:hover {
    background: #4527a0;
    color: #ffffff;
}

span{
  color: white
}
</style>


