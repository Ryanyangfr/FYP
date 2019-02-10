<template>
    <div class="livemap">
        <div class="card">
            <gmap-map :center="center" :zoom="17" class="mapview">
                <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center=m.position">
                </gmap-marker>
            </gmap-map>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LiveMap",
    data() {
        return {
            center: { lat: 1.2962, lng: 103.8501 },
            markers: [],
            hotspots_positions: [],
            currentPlace: null
        };
    },

    methods: {
    },

    mounted(){
        axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                const marker = {lat: parseFloat(data[row].latitude), lng: parseFloat(data[row].longtitude)};
                this.markers.push({ position: marker });
            }
        })

        
    }    
}
</script>

<style>
    .livemap .card{
        padding: 18px;  
        margin: 18px;      
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
        background-color: white;
        
    }

    .mapview{
        width:100%;
        height: 500px;
    }
</style>

