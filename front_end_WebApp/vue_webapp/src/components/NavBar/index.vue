<template>
    <div class="horizontal-menu">
        <nav>
            Getting Started
        </nav>
    </div>
</template>

<script>
export default{
    name: 'Navigation'
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto");

    .horizontal-menu nav {
        text-align: left;
        font-size: 18px;
        padding-left: 25px;
        padding-top: 5px;
        display: flex;
        height: 65px;
        color:black;
        font-family: 'Roboto', sans-serif;
        vertical-align: middle
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

