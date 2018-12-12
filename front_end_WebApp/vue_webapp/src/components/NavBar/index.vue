<template>
    <div>
        <nav>
            <router-link to="/generateInstanceID">Generate Instance ID</router-link>
            <router-link to="/leaderboard">Leaderboard</router-link>
            <router-link to='/viewSubmissions'>Submissions</router-link>
        </nav>
    </div>
</template>

<script>
export default{
    name: 'Navigation'
}
</script>

<style>
    nav {
        border-top: 1px solid #191970;
        border-bottom: 1px solid #191f70;
        margin: 0 10%;
        text-align: left;
        font-size: 150%;
    }
</style>

