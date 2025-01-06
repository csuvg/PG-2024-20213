// ----------- HTML PART ---------------------
<template>
    <div class= 'Conteiner' :style="{'max-width': containerMaxWidth, 'min-width': containerMinWidth}">
        <FontsCat class='fonts' :text="text" type="Text_B" />
    </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">
.Conteiner{
        border: 3px solid #000;
        border-radius: 5%;
        justify-content: center;
        overflow-y: auto;
        padding: 1px 10px;
    }
.fonts{
      word-wrap: break-word;
      white-space: pre-wrap;
      text-align: justify;
}

.Conteiner::-webkit-scrollbar {
  width: 5px; /* Change size of scrollbar */
  height: auto;
}

.Conteiner::-webkit-scrollbar-thumb {
  background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
  border-radius: 5px; /* Radio de borde del thumb */
}

//Smaller screen
@media screen and (max-width: 600px) {
    div.Conteiner{
        height: 80px;
    }
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue';

// Export component
export default defineComponent({
  name: 'BoxComplete',
  props: {
    text: {
      type: String,
      default: '',
    },
    minWidth: {
      type: String,
      default: '35%',
    },
    maxWidth: {
      type: String,
      default: '20%',
    },
  },
  components: {
    FontsCat
  },
  data () {
    return {
      containerMinWidth: this.minWidth,
      containerMaxWidth: this.maxWidth,
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
        this.containerMaxWidth = '0%';
        this.containerMinWidth = this.minWidth;
      }
    },
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.updateContainerWidth);
  },
});
</script>
