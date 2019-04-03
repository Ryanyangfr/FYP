<template>
    <form @submit.prevent="sendNotification">
        Notification Message
        <input name="notification" type="text" placeholder="message" v-model="message">
        <button type="submit">Send</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            message: ""
        }
    },
    methods: {
        sendNotification(){
            axios.post('//amazingtrail.ml/api/notification/sendNotification', {message: this.message})
            .then(response => {
                let data = response.data;
                if (data.success === 'true') {
                    alert('Notification successfully sent');
                } else {
                    alert('Please try again');
                }
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
