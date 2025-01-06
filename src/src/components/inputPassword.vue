<template>
<div class = 'conteiner_pe' :style="{'width':containerMaxWidth, 'min-width':containerMinWidth,}">
  <input class="inputObj" :type="passwordFieldType"  :placeholder="placeholder"  v-model="password"  @input="updateInputValue"/>
  <fa icon="fa-solid fa-eye" pull="left" @click="switchVisibility"/>
</div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap');

.container_pe{
  position: relative;
  display: flex;
  align-items: center;
}

.inputObj{
  width: 100%;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 10px;
  padding-right: 40px; /* Asegura que el texto no se solape con el ícono */
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el cálculo del ancho */
}
.svg-inline--fa.fa-pull-left{
  position: absolute;
  color: #666666;
  margin-left: 9px ;
  cursor: pointer;
  margin-top: 15px;
}


//Bigger screen
@media screen and (min-width: 601px) {
  .inputObj{
    padding: 10px 15px;
    padding-right: 75px;
  }
}

//Smaller screen
@media screen and (max-width: 600px) {
  .inputObj{
    padding: 5px 10px;
  }
}

</style>

<script>
export default {
  name: 'InputPass',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: 'Enter text'
    },
    minWidth: {
      type: String,
      default: '50%'
    },
    maxWidth: {
      type: String,
      default: '100%'
    },
    marginLeftInput: { // Nuevo margen para el input
      type: String,
      default: '0px'
    },
    marginLeftIcon: { // Nuevo margen para el icono
      type: String,
      default: '0px'
    },
  },
  data () {
    return {
      customText: '',
      password: this.modelValue,
      passwordFieldType: 'password',
      // No need to replicate props into data unless you're modifying them internally,
      // but for demonstration:
      containerMinWidth: this.minWidth,
      containerMaxWidth: this.maxWidth,
      ml: this.marginLeftInput,
      ml2: this.marginLeftIcon,
    };
  },
  watch: {
    modelValue (newVal) {
      this.password = newVal;
    },
    password (newVal) {
      this.$emit('update:modelValue', newVal);
    },
  },
  methods: {
    switchVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    updateContainerWidth () {
      if (window.innerWidth > 600) {
        this.containerMinWidth = 'auto';
        this.containerMaxWidth = this.maxWidth;
      } else {
        this.containerMaxWidth = '100px';
        this.containerMinWidth = this.minWidth;
      }
    },
  },
  mounted () {
    window.addEventListener('resize', this.updateContainerWidth);
    this.updateContainerWidth(); // Initialize widths based on current screen size
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.updateContainerWidth);
  },
};
</script>
