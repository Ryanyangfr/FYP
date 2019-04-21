//shows life monitoring of all teams in current trail 
//Shows a map to monitor where all teams are located,
//real-time updated activity feed and
//a send notfication function to send notifications to all participants 
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
            socket : io('wss://amazingtrail.ml', { transports: ['websocket'] }),
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
        //set all the team's location markers on the map 
        setMapOnAll(map) {
            for (var i = 0; i < this.team_markers.length; i++) {
                this.team_markers[i].setMap(map);
            }
        },

        clearMarkers() {
            setMapOnAll(null);
        },

        //send notification to all the users 
        //if successful, shows alert to inform "Notification successfully sent"
        //if unsuccessful shows alert to inform user to try again
        sendNotification(){
            axios.post('//amazingtrail.ml/api/notification/sendNotification', {message: this.message})
            .then(response => {
                let data = response.data;
                if (data.success === 'true') {
                    alert('Notification successfully sent');
                    this.message = "";
                } else {
                    alert('Please try again');
                }
            })
        }
    },

    mounted: function() {
        //on page load, display a map with it's center being the center of smu
        this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            center: this.center,
            scrollwheel: false,
            zoom: 18
            
        }),

        //get all hotspots created and display on the map as markers
        axios.get('//amazingtrail.ml/api/hotspot/getHotspots')
        .then(response => {
            let data = response.data;
            var infowindow = new google.maps.InfoWindow();
            for(var row in data){
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
                });
            }
        });

        //get all locations of teams and display on the map as markers 
        axios.get('//amazingtrail.ml/api/team/getAllTeamsInCurrentActiveTrail')
        .then (response => {
            
            let data = response.data;
            let infowindow = new google.maps.InfoWindow();
            data.forEach((team) => {
                this.team_markers.push({ team:team.team_id, lat: parseFloat(team.latitude), lng: parseFloat(team.longtitude) })
            })

            this.team_markers.forEach((marker) => {
                // 
                let team_marker = new google.maps.Marker({
                    position: {lat:marker.lat, lng:marker.lng},
                    map: this.map,
                    title: 'team ' + marker.team,
                    icon: 'http://maps.google.com/mapfiles/kml/paddle/'+marker.team+'.png',

                });

                //show team number when team's marker is clicked
                google.maps.event.addListener(team_marker, 'click', function() {
                    infowindow.open(this.map,team_marker);
                    infowindow.setContent(team_marker.title)
                });

                this.currentMarkersInMap.push(team_marker)
            })
        })

        //get the current trail id of ongoing trail
        axios.get('//amazingtrail.ml/api/getCurrentTrailInstanceID')
        .then(response => {
            let data = response.data;
            for(var row in data){
                this.trail_instance_id  = data[row]
            }
        })

        //get live update of the teams' location via socket and display as markers
        this.socket.on('updateLocation', (location) => {
            let infowindow = new google.maps.InfoWindow();

            let teamID = location.teamID;
            let long = location.long;
            let lat = location.lat;

            //clear current marker
            this.currentMarkersInMap[teamID-1].setMap(null);

            this.team_markers[teamID-1] = ({team:parseInt(teamID), lat: parseFloat(lat), lng: parseFloat(long)});

            let team_marker = new google.maps.Marker({
                position: {lat:parseFloat(lat), lng:parseFloat(long)},
                map: this.map,
                title: 'team ' + teamID,
                icon: 'http://maps.google.com/mapfiles/kml/paddle/'+teamID+'.png',
            })

            google.maps.event.addListener(team_marker, 'click', () => {
                infowindow.open(this.map,team_marker);
                infowindow.setContent(team_marker.title)
              
            });
            this.currentMarkersInMap[teamID-1] = team_marker;
           
        })

        //get live update of team's activity feed and display
        axios.get('//amazingtrail.ml/api/team/activityFeed')
        .then(response => {
            let data = response.data;
            for(var row in data){
                let activity = "Team " + data[row].team + " completed their mission at " + data[row].hotspot
                this.activityList.push({activity: activity, timestamp: data[row].time});
            }
        })

        this.socket.on('activityFeed', (data) => {
            let activity = "Team " + data.team + " completed their mission at " + data.hotspot
            this.activityList.unshift({activity: activity, timestamp: data.time});
        })
    }    
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins|Gochi+Hand|Lato|Permanent+Marker");
@import '../../assets/themify-icons.css';

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
        width: 80px;
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
        text-align: left;
        background-color: #5a52c4;
        color: white;
    }

    .activity-feed-area{
        height: 79%;
        margin-top: 25px;
    }

    .activity-feed-area .activity-feed{
        display: flex;
        flex-direction: column;
    }

    .activity-feed-scroll {
        overflow-y: auto;
        height: 91%
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

    @media screen and (max-width: 1000px){
        #gmap-view{
            width: 100%;
            height: 900px
        }

        .livemap-content{
            flex-direction: column;
            height: auto;
        }

        .notification-activity-feed{
            width: 100%;
            margin-top: 20px
        }
        
    }

  
</style>

