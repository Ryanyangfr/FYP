<template>
    <div class="instanceGenerator">
        <h4> GENERATE YOUR INSTANCE HERE </h4>

        <button v-on:click="toggleGenerate()">Generate Trail Instance</button>

        <br>
        <br>
        <br>
        <div v-if="generate_id">
            <h4><font size="20">{{instance_id}}</font></h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import index from '../../components/NavBar/index'

export default {
    name: 'instanceGenerator',
    data () {
        return {
            instance_id: "",
            generate_id: false
        }
    },

    methods: {
        makeID(){
            var possible = '0123456789'
            var id = ''

            for(var i=0; i<6; i++){
                id += possible.charAt(Math.floor(Math.random()* possible.length))
            }
            this.instance_id = id
        },

        toggleGenerate(){
            this.generate_id = true
            this.makeID()
        }
    },
    mounted(){
        console.log(this.$session.exists());
            if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        } 
    }
}
</script>