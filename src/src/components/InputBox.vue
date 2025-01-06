// ----------- HTML PART ---------------------
<template>
    <div class= 'ConteinerInput' >
        <input class="inputObj" :type=tipo :placeholder=customText :style="{'width':containerMaxWidth, 'min-width':containerMinWidth, 'margin-left':ml}" :value="inputValue" @input="updateInputValue"/>
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
    type: {
      type: String,
      default: 'text',
    },
    marginLeft: {
      type: String,
      default: '0%',
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
