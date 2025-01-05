// ----------- HTML PART ---------------------
<template>
    <div class= 'ConteinerInput' >
        <textarea class="inputObj" :placeholder=customText :style="{'width':containerMaxWidth, 'min-width':containerMinWidth}" :value="inputValue" @input="updateInputValue" />
    </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap');

.inputObj{
        margin: 8px;
        font-weight: 400;
        text-align: justify;
        text-align: justify;
        border-radius: 4px;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #000;
        font-family: 'Poppins', sans-serif;
    }

  .inputObj::-webkit-scrollbar {
    width: 5px; /* Change size of scrollbar */
    height: auto;
  }

  .inputObj::-webkit-scrollbar-thumb {
    background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
    border-radius: 5px; /* Radio de borde del thumb */
  }
  .inputObj::-webkit-scrollbar {
    width: 5px; /* Change size of scrollbar */
    height: auto;
  }

  .inputObj::-webkit-scrollbar-thumb {
    background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
    border-radius: 5px; /* Radio de borde del thumb */
  }
//Biger screen
@media screen and (min-width: 601px) {
  .inputObj{
    padding: 10px 15px;
    height: 200px;
    padding: 10px 15px;
    height: 200px;
  }
}

//Smaller screen
@media screen and (max-width: 600px) {
  .inputObj{
    height: 100px;
    height: 100px;
    padding: 5px 10px;
  }
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

// Export component
export default defineComponent({
  name: 'InputBoxBigger',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    minWidth: {
      type: String,
      default: '50%',
    },
    maxWidth: {
      type: String,
      default: '80%',
    },
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const inputValue = ref(props.modelValue);
    watch(() => props.modelValue, (newValue) => {
      inputValue.value = newValue;
    });
    function updateInputValue (event: Event) {
      inputValue.value = (event.target as HTMLInputElement).value;
      emit('update:modelValue', inputValue.value);
    }
    return {
      inputValue,
      updateInputValue,
    };
  },
  data () {
    return {
      customText: '', // local var to save msg
      containerMinWidth: this.minWidth,
      containerMaxWidth: this.maxWidth,
    };
  },
  mounted () {
    this.customText = this.placeholder; // assings the value of mgs to local var
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
