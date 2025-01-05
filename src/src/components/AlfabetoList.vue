// ----------- HTML PART ---------------------
<template>
  <div class="alphabet">
    <FontsCat type="Text_P" v-for="letter in alphabet" :key="letter" class="letter" :text="letter" @click="performSearch(letter)"/>
  </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">
.alphabet {
  display: flex;
  width: fit-content;
  height: 400px;
  flex-direction: column;
  overflow-y: auto; /* Desplazamiento vertical automático */
  overflow-x: hidden; 
  direction: rtl;
}

.letter {
  padding: 2px;
  margin: 2px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

// Style del scrollbar 
.alphabet::-webkit-scrollbar {
  width: 5px; /* Change size of scrollbar */
  height: auto;
}

.alphabet::-webkit-scrollbar-thumb {
  background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
  border-radius: 5px; /* Radio de borde del thumb */
}
@media screen and (min-width: 1700px) {
.alphabet{
  height: 600px;
}
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue';

export default defineComponent({
  name: 'Alphabet',
  data () {
    return {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), // Generar un array de letras del alfabeto
    };
  },
  methods: {
    performSearch (text:string) {
      this.$emit('textClicked', text); // El emits me permite enviar el parametro a otro archivo
    }
  },
  components: {
    FontsCat
  }
});
</script>
