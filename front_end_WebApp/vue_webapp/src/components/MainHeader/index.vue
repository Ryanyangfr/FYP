<template>
    <div>
        <div class="container-horizontal">
            <div class="logo"> 
                <a href="login"><img src="@/assets/titlelogo.png"></a>
            </div>

            <div class ="header-left-area">
                
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
        /*display: flex;
        flex-direction: row;*/
        /*position: fixed;*/
    }

    .logo{
        width:20%;
        background-color: #645cdd;
        align-items: center;
    }

    .logo img{
         max-width: 80%;
         max-height: 80%
         
    }


</style>

