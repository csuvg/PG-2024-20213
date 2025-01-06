//-------PARTE DEL HTML--------------------
<template>
    <div class="contentF">
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
.Footer{
    font-size: 15px;
    font-family: 'Arial', sans-serif;
    letter-spacing: 1px;
    line-height: 1.5;
    color: #ffffff;
}
</style>
//--------PARTE DEL SCRIPT------------
<script lang="ts">
export default ({
  name: 'Footer-App'
});
</script>
