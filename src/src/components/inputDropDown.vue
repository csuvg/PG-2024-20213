<template>
    <div class="ConteinerInput">
        <select class="inputObj" :value= "OpcionSeleccionada" @input="updateInputValue" :style="{'width':containerMaxWidth, 'min-width':containerMinWidth, 'margin-left':ml}" >
          <option disabled value="">{{ placeholder }}</option> 
          <option v-for="(opcion, index) in opciones" :key="index" :value="opcion"> {{ opcion }} </option>
        </select>
    </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap');

.inputObj{
        margin: 8px;
        display: inline-block;
        border: 1px solid #000;
        border-radius: 4px;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

//Bigger screen
@media screen and (min-width: 601px) {
  .inputObj{
    padding: 10px 15px;
  }
}

//Smaller screen
@media screen and (max-width: 600px) {
  .inputObj{
    padding: 5px 10px;
  }
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

// Export component
export default defineComponent({
  name: 'InputBox',
  props: {
    minWidth: {
      type: String,
      default: '50%',
    },
    maxWidth: {
      type: String,
      default: '80%',
    }, 
    marginLeft: {
      type: String,
      default: '0%',
    },
    placeholder: {
      type: String,
      default: 'Seleccione una opción'
    },
    opciones: {
      type: Array,
      required: true
    },

    modelValue: String,
  },

  emits: ['update:modelValue'],

  data () {
    return {
      customText: '', // local var to save msg
      tipo: this.type,
      containerMinWidth: this.minWidth,
      containerMaxWidth: this.maxWidth,
      ml: this.marginLeft
    };
  },

  setup (props, { emit }) { 
    const OpcionSeleccionada = ref(props.modelValue); 
    watch(() => props.modelValue, (newValue) => {
      OpcionSeleccionada.value = newValue;
    }); 

    function updateInputValue (event: Event) {
      OpcionSeleccionada.value = (event.target as HTMLInputElement).value;
      emit('update:modelValue', OpcionSeleccionada.value);
    }
  
    return {
      OpcionSeleccionada,
      updateInputValue,
    };
  },

  mounted () {
    window.addEventListener('resize', this.updateContainerWidth);
    this.updateContainerWidth(); // calls funtion created to get screen width
  },

  methods: {
    updateContainerWidth () {
      // method that is used to change values max&min width according to screen size
      if (window.innerWidth > 600) {
        this.containerMinWidth = 'auto';
        this.containerMaxWidth = this.maxWidth;
      } else {
        this.containerMaxWidth = '0px';
        this.containerMinWidth = this.minWidth;
      }
    },
    
  },

  beforeUnmount () {
    window.removeEventListener('resize', this.updateContainerWidth);
  },
});
</script>
