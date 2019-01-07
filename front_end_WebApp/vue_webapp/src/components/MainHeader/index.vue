<template>
    <div>
        <div class="container-horizontal">
            <div class="logo"> 
                <a href="login"><img src="@/assets/titlelogo.png"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default{ 
    name: 'MainHeader'
}
</script>

<style>
    .container-horizontal{
        min-height: 50px;
        z-index:99;
    }

    .logo{
        min-height:50px;
        width:20%;
        background-color: #645cdd;
        display: flex;
        align-items: center;
    }

    .logo img{
        position: relative;
        width: 100%;
        height: 100%
    }


</style>

