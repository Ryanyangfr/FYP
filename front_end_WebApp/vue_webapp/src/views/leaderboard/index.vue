<template>
    <div>
         <form @submit.prevent="getData">
            Enter Trail Instance ID:
            <input name="trail_instance_id" type="text" placeholder="Trail Instance ID" v-model="trail_instance_id">
            <button type="submit">Submit</button>
        </form>
        <br>
        <b-table striped hover :items="items"></b-table>
            <!-- <tr>
                <th>Team</th>
                <th>Hotspots Completed</th>
            </tr>
            <tr v-for="item in items" :key = item.team>
                <td>{{item.team}}</td>
                <td>{{item.hotspots_completed}}</td>
            </tr> -->
        <!-- </b-table> -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            items: [],
            trail_instance_id: '',
        }
    },
    methods: {
        getData() {
            const baseURI = '//54.255.245.23:3000/team/getAllTeamPoints?trail_instance_id=' + this.trail_instance_id;
            axios.get(baseURI)
            .then(response => {
                console.log(response);
                this.items = response.data;
            })
        }
    },
    mounted(){
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }
    //data received [
    //     {
    //         "team": 1,
    //         "points": 0,
    //         "hotspots_completed": 0
    //     },
    //     {
    //         "team": 2,
    //         "points": 0,
    //         "hotspots_completed": 0
    //     },
    //     {
    //         "team": 3,
    //         "points": 0,
    //         "hotspots_completed": 0
    //     }
    // ]
        const baseURI = '//54.255.245.23:3000/team/getAllTeamPoints';
        axios.get(baseURI)
        .then(response => {
            console.log(response);
            this.items = response.data;
        })
    }
}
</script>

