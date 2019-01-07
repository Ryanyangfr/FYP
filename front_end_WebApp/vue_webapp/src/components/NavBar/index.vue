<template>
    <div class="horizontal-menu">
        <nav>
            <ul>
                <li><router-link to="/generateInstanceID">Generate Instance ID</router-link></li>
                <li><router-link to="/leaderboard">Leaderboard</router-link></li>
                <li><router-link to='/viewSubmissions'>Submissions</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default{
    name: 'Navigation'
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

    .horizontal-menu nav {
        text-align: left;
        /*position: relative;*/
    }

    .horizontal-menu ul li{
        list-style-type: none;
        margin:0;
        display: inline-block;
        /*position: relative;*/
    }

    .horizontal-menu a{
        text-decoration: none!important;
        font-size: 15px;
        padding: 10px 20px;
        display: block;
        color:#536479;
        font-family: 'Roboto Condensed', sans-serif
    }

    .horizontal-menu a:hover{
        color: #007BFF;
    }

</style>

