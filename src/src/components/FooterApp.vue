//-------PARTE DEL HTML--------------------
<template>
    <div class="contentF">
        <div  class="circuloP"></div>
        <div  class="circuloM"></div>
        <h3 class="Footer">2023 © GPCG</h3>
    </div>
</template>
//--------PARTE DE STYLE--------------
<style scoped lang="scss">
.contentF{
//    background-color:#A7A6B3; color para una linea en la parte del footer, pero no mucho me convence xd
    padding: 1px;
    text-align: center;
    position: relative;
    bottom: 0;
    overflow: hidden;
}
.circuloM {
    width: 50px;
    height: 50px;
    background-color: #009FE3;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    left: 65px; /* Ajusta la posición según sea necesario */
}
.circuloP {
    width: 90px;
    height: 90px;
    background-color: #55A112;
    border-radius: 50%;
    position: absolute;
    bottom: -50px;
    left: 0px; /* Ajusta la posición según sea necesario */
}
.Footer{
    font-size: 15px;
    font-family: 'Arial', sans-serif;
    letter-spacing: 1px;
    line-height: 1.5;
    color: #333;
}
</style>
//--------PARTE DEL SCRIPT------------
<script lang="ts">
export default ({
  name: 'Footer-App'
});
</script>
