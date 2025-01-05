// ----------- HTML PART ---------------------
<template>
   <div class='ConteinerForms'>
    <div class="ObjContainer" v-for="(option, index) in options" :key="index">
        <FontsCat class="fuente" :text="option" type="Text_P" :for="`opt${index}`" />
    </div>
  </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">

.ConteinerForms {
  display: flex;
  flex-direction: row;
  padding: 0px 15px 0px 15px;
  justify-content: space-evenly;
  border-bottom: 1.5px solid #908C8C;
}

.ObjContainer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue';

export default defineComponent({
  name: 'tableHeaders',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    FontsCat
  }
});
</script>
