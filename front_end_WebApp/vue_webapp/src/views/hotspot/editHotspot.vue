<template>
    <div class="EditHotspot">
       <div class="card">
            <div class="card-title">
                <h5>Edit Location</h5>
            </div>
            <form @submit.prevent="hotspotOnSubmitToEdit" class="edit-hotspot-body">
                <div class="input-area">
                    <label for="edit-hotspot-input">Hotspot Name</label>
                    <input name="edit-hotspot-input" type="text" placeholder="Hotspot Name" v-model="name" required> 
                </div> 
                <!-- <div class="input-area">
                    <label for="edit-hotspot-input">Latitude</label>
                    <input name="edit-hotspot-input" type="text" placeholder="Latitude" v-model="lat" required> 
                </div> 
                <div class="input-area">
                    <label for="edit-hotspot-input">Longitude</label>
                    <input name="edit-hotspot-input" type="text" placeholder="Longitude" v-model="lng" required> 
                </div>                   -->
                <div class="choose-hotspot-area">
                    <div id="gmap-view"></div>
                    <div class="instruction-submit-area">
                        <div class="add-hotspot-instruction">
                            <h5>Select a new location on the map by adding a marker on the map. Click on the location on the map to add a new marker. Then click "Create" to save the location</h5>
                        </div>
                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/viewHotspots'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    </div>
</template>

<script>  
import axios from 'axios'
export default {
    name: "editHotspot",
    data() {
        return{
            name: "",
            lat: "",
            lng: "",
            map: undefined,
            center: {},
            currentMarker: [],
            position: ''

        }  
    },

    methods: {
        hotspotOnSubmitToEdit(){
            var postBody = {
                "hotspot_name": this.name,
                "latitude": this.map.lat,
                "longtitude": this.map.lng,
            }
            console.log("post body: ");
            console.log(postBody)

            axios.post('//127.0.0.1:3000/edit/editHotspot', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/viewHotspots' })
            })

        }
    },

    mounted() {
        if (!this.$session.exists()) {
            console.log("check")
            this.$router.push('/')
        }

        this.name = this.$store.state.selectedHotspotName;  
        this.lat = this.$store.state.selectedLat;  
        this.lng = this.$store.state.selectedLng;

        this.center["lat"] = parseFloat(this.lat);
        this.center["lng"] = parseFloat(this.lng);

        this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            center: this.center,
            scrollwheel: false,
            zoom: 18
            
        })

        var infowindow = new google.maps.InfoWindow();
        var latlng = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};

        let marker = new google.maps.Marker({
            position: latlng,
            map: this.map
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(this.map,marker);
            infowindow.setContent(marker.title)
            // console.log(marker)
        });
        
        console.log(`map: ${this.map}`)
        console.log(this.map)
        this.map.addListener('click', function(e) {
            this.position = e.latLng;
            this.lat = e.latLng.lat();
            this.lng = e.latLng.lng();

            if (marker == null) {
                marker = new google.maps.Marker({
                    position: e.latLng,
                    map: this
                }); 
            } else {   
                marker.setPosition(e.latLng); 
            }
            // marker = new google.maps.Marker({
            //     position: e.latLng,
            //     map: this
            // });
            // console.log(this.marker)
            // console.log(this.map)
            this.panTo(this.position);
        });
    }      
        
}
</script>

<style scoped>

    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto|Poppins");
    @import '../../assets/themify-icons.css';

    label{
        font-family: 'lato', sans-serif
    }

    /*card styling begins*/
    .EditHotspot .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .EditHotspot .card .card-title{
        display: flex;
        float: left;
        font-size: 20px;
        margin-bottom: 50px;
    }

    .EditHotspot .card-title h5{
        display: flex;
        float: left;
    }

    .EditHotspot form{
        min-width: inherit;
        /*background-color: blue*/
    }
    /*card styling ends*/

    .EditHotspot .input-area{
        float: left;
        display: flex;
        margin-left:18px;
        margin-bottom: 25px;
        font-family: 'Lato', sans-serif;
        position: relative;
        min-width: 98%;
        overflow: hidden;
    }

    .input-area label{
        margin-right: 100px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        transition: all 0.3s ease 0s;
        white-space: nowrap;
        float: left;
        display: flex;
        /*background-color: pink;*/
        height: inherit;
        align-items: center;
        min-width: 12%
    }

    .EditHotspot .input-area input{
        /*margin-left: 100px;*/
        height: 40px;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        min-width:75%;
        font-family: 'Roboto', sans-serif;
    }

    .EditHotspot .input-area input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .EditHotspot textarea{
        resize: none;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        min-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .EditHotspot textarea:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .edit-hotspot-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .EditHotspot .submit-btn-area{
        width: 100%;
        overflow: hidden;
        float: right;
    }

    .EditHotspot .submit-btn{
        /*display: inline;*/
        /* float:right; */
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        min-width: 18%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 20px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

     .EditHotspot .submit-btn:hover{
        background-color: #5a52c4;
     }


     .EditHotspot .cancel-btn{
        /* float:right; */
        background-color: #ACACAC;
        color: white;
        border:none;
        border-radius: 4px;
        min-width: 8%;
        min-height: 40px;
        padding:8px 10px 8px 10px;
        margin-right: 45px;
        text-align: center;
        cursor: pointer;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: white;
        margin-top: 70px;
    }

    .EditHotspot .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .EditHotspot .cancel-btn a{
        text-decoration: none!important;
        color: white
    }

    #gmap-view{
        min-width: 70%;
        height: 500px;
    }

    .choose-hotspot-area{
        display: flex;
        flex-direction: row;
    }

    .instruction-submit-area{
        margin-top: 20px
    }

    .add-hotspot-instruction{
        text-align: left;
        margin-left: 12px;
    }
</style>
