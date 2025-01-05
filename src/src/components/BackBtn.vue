<template>
    <div class="btnBack" @click="irALaRuta">
        <fa class='icons' icon="fa-solid fa-chevron-left" pull="left"/>  
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Back Btn',
  props: {
    // prop that asigns a msg
    ruta: {
      type: String,
      default: '/',
    },
  },  
  methods: {
    irALaRuta () {
      // Navegar a la ruta proporcionada utilizando Vue Router
      this.$router.push(this.ruta);
    },
  },
});
</script>

<style scoped lang="scss">
.btnBack{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 3%;
}
.icons{
    color:#666666;
    height:45px;
    width: auto;
}

//Smaller screen
@media screen and (max-width: 600px) {
  .icons {
    height:30px;
  }
}
</style>
