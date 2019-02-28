<template>
  <div class="Livemap">
      <div class="card">
        <div class="card-title">
            <h5 v-if="this.$store.state.currentTrailID==='-'">ONGOING TRAIL: {{this.trail_instance_id}}</h5>
            <h5 v-else>ONGOING TRAIL: {{this.$store.state.currentTrailID}}</h5>
        </div>
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
            team_markers: [],
            currentPlace: null,
            socket : io('http://54.255.245.23:3000'),
            map: '',
            currentMarkersInMap: [],
            trail_instance_id: ""
            
        };
    },

    computed:{
        currentTrailID(){
            return this.$store.state.currentTrailID;
        }
    },

    method: {
        setMapOnAll(map) {
            for (var i = 0; i < this.team_markers.length; i++) {
                this.team_markers[i].setMap(map);
            }
        },
        clearMarkers() {
            setMapOnAll(null);
        },
    },

    mounted: function() {
        console.log("map: ", google.maps)
        this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            center: this.center,
            scrollwheel: false,
            zoom: 18
            
        }),

        axios.get('http://54.255.245.23:3000/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            var infowindow = new google.maps.InfoWindow();
            for(var row in data){
                console.log(data[row])
                var latlng = {lat: parseFloat(data[row].latitude), lng: parseFloat(data[row].longtitude)};
                this.hotspot_markers.push({ 
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
            let infowindow = new google.maps.InfoWindow();
            data.forEach((team) => {
                this.team_markers.push({ team:team.team_id, lat: parseFloat(team.latitude), lng: parseFloat(team.longtitude) })
            })
            console.log(this.team_markers);

            this.team_markers.forEach((marker) => {
                let team_marker = new google.maps.Marker({
                    position: {lat:marker.lat, lng:marker.lng},
                    map: this.map,
                    title: 'team ' + marker.team,
                    icon: 'http://maps.google.com/mapfiles/kml/paddle/'+marker.team+'.png'
                });

                google.maps.event.addListener(team_marker, 'click', function() {
                    infowindow.open(this.map,team_marker);
                    infowindow.setContent(team_marker.title)
                    // console.log(marker)
                });

                this.currentMarkersInMap.push(team_marker)
            })
        })

        axios.get('http://54.255.245.23:3000/getCurrentTrailInstanceID')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                this.trail_instance_id  = data[row]
            }
        })

        console.log(this.team_markers)
        this.socket.on('updateLocation', (location) => {
            console.log(location);
            let infowindow = new google.maps.InfoWindow();
            // this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            //     center: this.center,
            //     scrollwheel: false,
            //     zoom: 17
            // })
            // this.clearMarkers()

            let teamID = location.teamID;
            let long = location.long;
            let lat = location.lat;
            // let infowindow = new google.maps.InfoWindow();

            console.log('map markers:')
            console.log(this.currentMarkersInMap[teamID-1])
            //clear current marker
            this.currentMarkersInMap[teamID-1].setMap(null);

            // console.log(this.team_markers)
            this.team_markers[teamID-1] = ({team:parseInt(teamID), lat: parseFloat(lat), lng: parseFloat(long)});

            console.log(this.team_markers)
            let team_marker = new google.maps.Marker({
                position: {lat:parseFloat(lat), lng:parseFloat(long)},
                map: this.map,
                title: 'team ' + teamID,
                icon: 'http://maps.google.com/mapfiles/kml/paddle/'+teamID+'.png'
            })

            google.maps.event.addListener(team_marker, 'click', () => {
                infowindow.open(this.map,team_marker);
                infowindow.setContent(team_marker.title)
                console.log(team_marker)
            });
            this.currentMarkersInMap[teamID-1] = team_marker;
            // this.team_markers.forEach((marker) => {
            //     console.log(marker)
            //     let team_marker = new google.maps.Marker({
            //         position: {lat:marker.lat, lng:marker.lng},
            //         map: this.map,
            //         title: 'team ' + marker.team
            //     });

            //      google.maps.event.addListener(team_marker, 'click', function() {
            //         infowindow.open(this.map,team_marker);
            //         infowindow.setContent(team_marker.title)
            //         // console.log(marker)
            //     });
            // })
        })
    }    
}
</script>

<style>
    .Livemap .card{
        padding: 18px;  
        margin: 18px;      
        border-radius: 3px;
        border: none;
        font-family: 'Roboto', sans-serif; 
        background-color: white;
        
    }

    .card .card-title{
        /*display: flex;*/
        /*float: left;*/
        font-size: 20px;
        font-weight: 600
    }

    .card-title h5{
        display: flex;
        float: left;
    }

    #gmap-view{
        width:100%;
        height: 1000px;

    }

  
</style>

