<template>
    <div class="AddHotspot">
       <div class="card">
            <div class="card-title">
                <h5>Add New Location</h5>
            </div>
            <form @submit.prevent="hotspotOnSubmitToAdd" class="add-hotspot-body">
                <div class="input-area">
                    <label for="add-hotspot-input">Location Name</label>
                    <input name="add-hotspot-input" type="text" placeholder="Hotspot Name" v-model="name" required> 
                </div> 
                <!-- <div class="input-area">
                    <label for="add-hotspot-input">Latitude</label>
                    <input name="add-hotspot-input" type="text" placeholder="Latitude" v-model="lat" required> 
                </div> 
                <div class="input-area">
                    <label for="add-hotspot-input">Longitude</label>
                    <input name="add-hotspot-input" type="text" placeholder="Longitude" v-model="lng" required> 
                </div> -->
                <div class="choose-hotspot-area">
                    <div id="gmap-view" ></div>
                    <div class="instruction-submit-area">
                        <div class="add-hotspot-instruction">
                            <h5>Select the location on the map by adding a marker on the map. Then click "Create" to save the location</h5>
                        </div>
                        <div class="submit-btn-area">
                            <button class="cancel-btn" type="button"><router-link to='/viewHotspots'>Cancel</router-link></button>
                            <button class="submit-btn" type="submit">Create</button>
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
    name: "addHotspot",
    data() {
        return{
            name: "",
            lat: "",
            lng: "",
            map: undefined,
            center: { lat: 1.2962, lng: 103.8501 },
            currentMarker: '',
            position: ''

        }  
    },

    methods: {
        hotspotOnSubmitToAdd(){
            var postBody = {
                "hotspot_name": this.name,
                "latitude": this.map.lat,
                "longtitude": this.map.lng,
            }
            console.log("post body: ");
            console.log(postBody)
            axios.post('http://13.229.115.32:3000/add/addHotspot', postBody)
            .then(response => {
                let data = response.data
                console.log(data)
                this.$router.push({ path: this.redirect || '/viewHotspots' })
            })
            
        }, 
    },
    
    mounted() {
        // console.log("map: ", google.maps)
        this.map = new google.maps.Map(document.getElementById('gmap-view'), {
            center: this.center,
            scrollwheel: false,
            zoom: 18
            
        })
        
        console.log(`map: ${this.map}`)
        console.log(this.map)
        var marker;
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
    .AddHotspot .card{
        padding: 18px;
        margin: 18px;
        border-radius: 3px;
        border: none;
        font-family: 'Roboto Condensed', sans-serif; 
    }

    .AddHotspot .card .card-title{
        display: flex;
        float: left;
        font-size: 20px;
        margin-bottom: 50px;
    }

    .AddHotspot .card-title h5{
        display: flex;
        float: left;
    }

    .AddHotspot form{
        min-width: inherit;
        /*background-color: blue*/
    }
    /*card styling ends*/

    .AddHotspot .input-area{
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

    .AddHotspot .input-area input{
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

    .AddHotspot .input-area input:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .AddHotspot textarea{
        resize: none;
        outline: none;
        border: 1px solid #CED4DA;
        border-radius: 4px;
        padding: 10px;
        font-size: 17px;
        min-width: 75%;
        font-family: 'Roboto', sans-serif;
    }

    .AddHotspot textarea:focus{
        outline: none !important;
        border:1px solid #6200EE;
        box-shadow: 0 0 2px #645cdd;
    }

    .add-hotspot-body{
        display: flex;
        flex-direction: column;
        width:100%;
    }

    .AddHotspot .submit-btn-area{
        width: 100%;
        overflow: hidden;
        /* float: right; */
    }

    .AddHotspot .submit-btn{
        /*display: inline;*/
        /* float:right; */
        background: none;
        border: none;
        background-color: #645cdd;
        border-radius: 4px;
        min-width: 8%;
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

     .AddHotspot .submit-btn:hover{
        background-color: #5a52c4;
     }


     .AddHotspot .cancel-btn{
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

    .AddHotspot .cancel-btn:hover{
        background-color: #b2a7a7
    }

    .AddHotspot .cancel-btn a{
        text-decoration: none!important;
        color: white
    }

    #gmap-view{
        min-width:70%;
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
