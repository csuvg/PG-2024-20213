<template>
  <button class="btn">
    <FontsCat class= 'fonts' type="WhiteText" :text="buttonText"></FontsCat>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FontsCat from './FontsCat.vue';
import router from "../router/index";

export default defineComponent({
  props: {
    buttonText: {
      type: String as PropType<string>,
      required: true,
    },
    viewName: {
      type: String as PropType<string>,
      // default: '',
    },
  },
  components: {
    FontsCat,
  },
});
</script>

<style scoped lang="scss">

.btn{
  border: none;
  height: 45px;
  width: 220px;
  display: flex;
  cursor: pointer;
  align-items: center;
  border-radius: 10px;
  background-color: #cb4f1e;
  opacity: 83%;
}
//cc4f1e
.fonts{
  height: auto;
  width: 220px;
  font-size: 30px;
}

button:hover {
  background-color: #CD5B2E;
}

button:active {
  background-color: #bc3b08;
}

@media screen and (max-width: 767px) {
  button {
    /* Ajustes para pantallas más pequeñas */
  }
}
</style>

