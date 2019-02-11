<template>
  <div class="Livemap">
      <div class="card">
        <div id="gmap-view" >
        </div>
      </div>
  </div>
</template>



<script>
import axios from 'axios';
import io from 'socket.io-client';

export default {
    
    name: "LiveMap",
    data() {
        return {
            center: { lat: 1.2962, lng: 103.8501 },
            hotspot_markers: [],
            team_markers: {},
            currentPlace: null,
            socket : io('localhost:3000')
            
        };
    },

    mounted: function() {
        console.log("map: ", google.maps)
        this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            center: this.center,
            scrollwheel: false,
            zoom: 17
            
        })

        axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            var infowindow = new google.maps.InfoWindow();
            for(var row in data){
                console.log(data[row])
                var latlng = {lat: parseFloat(data[row].latitude), lng: parseFloat(data[row].longtitude)};
                this.markers.push({ 
                    position: latlng, 
                    title: data[row].title
                });

                let marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    title: data[row].hotspot_name
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(this.map,marker);
                    infowindow.setContent(marker.title)
                    // console.log(marker)
                });

                
            }
        });

        axios.get('http://54.255.245.23:3000/team/getAllTeamsInCurrentActiveTrail')
        .then (response => {
            let data = response.data;
            data.forEach((team) => {
                this.team_markers[team.team_id] = {lat: parseFloat(team.latitude), lng: parseFloat(team.longtitude)}
            })
            console.log(this.team_markers);
        })

        this.socket.on('locationUpdate', (data) => {
            this.team_markers[data.team] = {lat: parseFloat(data.latitude), lng: parseFloat(data.longtitude)};
        });
    }    
}
</script>

<style>
    .Livemap .card{
        padding: 18px;  
        margin: 18px;      
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
        background-color: white;
        
    }

    #gmap-view{
        width:100%;
        height: 500px;

    }

  
</style>

