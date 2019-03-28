<template>
  <div class="Livemap">
      <div class="card">
        <div class="card-title">
            <h5 v-if="this.$store.state.currentTrailID==='-'">ONGOING TRAIL: {{this.trail_instance_id}}</h5>
            <h5 v-else>ONGOING TRAIL: {{this.$store.state.currentTrailID}}</h5>
        </div>
        <div class="livemap-content">
            <div id="gmap-view"></div>
            <div class="notification-activity-feed">
                <div class="notification-area">
                    <div class="card">
                        <h6>Send notification to all teams</h6>
                        <form @submit.prevent="sendNotification">
                            <textarea type="text" rows="3"  placeholder="Type your message here" v-model="message" required></textarea>
                            <button type="submit">SEND<i class="ti-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
                <div class="activity-feed-area">
                    <div class="card">
                        <h6>Activity Feed</h6>
                    </div>
                    <div class="activity-feed-scroll">
                        <div class="activity-feed">
                            <div class="card" v-for="activity in activityList" :key="activity.timestamp">
                                <div class="activity">{{activity.activity}}</div>
                                <div class="timestamp">{{activity.timestamp}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            socket : io('//13.229.115.32:3000'),
            map: '',
            currentMarkersInMap: [],
            trail_instance_id: "",
            message: "",
            activityList: []
            
        };
    },

    computed:{
        currentTrailID(){
            return this.$store.state.currentTrailID;
        }
    },

    methods: {
        setMapOnAll(map) {
            for (var i = 0; i < this.team_markers.length; i++) {
                this.team_markers[i].setMap(map);
            }
        },

        clearMarkers() {
            setMapOnAll(null);
        },

        sendNotification(){
            axios.post('//13.229.115.32:3000/notification/sendNotification', {message: this.message})
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

    mounted: function() {
        console.log("map: ", google.maps)
        this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            center: this.center,
            scrollwheel: false,
            zoom: 18
            
        }),

        axios.get('//13.229.115.32:3000/hotspot/getHotspots')
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

        axios.get('//13.229.115.32:3000/team/getAllTeamsInCurrentActiveTrail')
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

        axios.get('//13.229.115.32:3000/getCurrentTrailInstanceID')
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

        axios.get('//13.229.115.32:3000/team/activityFeed')
        .then(response => {
            let data = response.data;
            for(var row in data){
                console.log(data[row])
                let activity = "Team " + data[row].team + " completed their mission at " + data[row].hotspot
                this.activityList.push({activity: activity, timestamp: data[row].time});
            }
        })

        this.socket.on('activityFeed', (data) => {
            console.log(data);
            let activity = "Team " + data.team + " completed their mission at " + data.hotspot
            this.activityList.unshift({activity: activity, timestamp: data.time});
        })
    }    
}
</script>

<style>
    ::-webkit-scrollbar {
        width: 8px;
        background-color: #F5F5F5;

    }

    ::-webkit-scrollbar-thumb{
        background-color: grey;
    }

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
        width:70%;
        height: 100%;
        margin-left: 10px
    }

    .livemap-content{
        display: flex;
        flex-direction: row;
        height: 1000px;
    }

    .notification-activity-feed{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 30%;
    }

    .notification-area .card{
        background-color: white;
        border: 1px solid #DEE2E6;
        color: black;
        margin-top: 0px;
        text-align: left;
        height: 100%;
        padding: 15px;
    }

    .notification-area form{
        display: flex;
        flex-direction: column
    }

    .notification-area{
        width: 100%;
        height: 21%
    }

    .notification-area textarea{
        resize: none;
        outline: none;
        border: 1px solid #DEE2E6;
        margin: 10px;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        color: #868a8e;
        font-family: 'Roboto', sans-serif;
    }

    .notification-area button{
        background-color: #5a52c4;
        font-family: 'Poppins', 'sans-serif';
        border: none;
        border-radius: 20px;
        width: 30%;
        color: white;
        height: 38px;
        font-size: 15px; 
        text-align: center;
        align-items: center;
        margin-top: 10px;
        align-self: flex-end;
        margin-right: 10px
    }

    .notification-area button:hover{
        background-color: #6200EE;
    }

    .notification-area button i{
        margin-left: 8px
    }

    .activity-feed-area .card{
        height: 7%;
        margin-top: 0px;
        margin-bottom: 5px;
        /* border: 1px solid #DEE2E6; */
        text-align: left;
        background-color: #5a52c4;
        color: white;
    }

    .activity-feed-area{
        height: 79%;
        /* background-color: pink; */
        margin-top: 25px;
        overflow: auto;
    }

    .activity-feed-area .activity-feed{
        display: flex;
        flex-direction: column;
    }

    .meow {
        overflow-y: auto;
        height: 100%
    }

    .activity-feed .card{
        background-color: white;
        border: 1px solid #DEE2E6;
        margin-top: 0px;
        margin-bottom: 0px;
        color: black;
    }

    .activity-feed .activity{
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    .activity-feed .timestamp{
        font-size: 14px;
        color: #787d81
    }

  
</style>

