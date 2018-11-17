<template>
    <Slide>
        <router-link to="/generateInstanceID">Get Instance ID</router-link>
    </Slide>
</template>

<script>
import { Slide } from 'vue-burger-menu'
export default {
    name: SideBar,
    components: {
        Slide: 'Slide'
    }
}
</script>
