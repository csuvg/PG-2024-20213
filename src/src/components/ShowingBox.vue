// ----------- HTML PART ---------------------
<template>
    <div class= 'Conteiner' :style="{'max-width': containerMaxWidth, 'min-width': containerMinWidth}">
        <FontsCat  :text="text" type="Text_B" />
    </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">
.Conteiner{
        display: flex;
        align-items: center;
        height: 25px;
        border-bottom: 3px solid #000;
        border-radius: 10%;
        padding-left: 20px;
    }

//Biger screen
@media screen and (min-width: 601px) {
    .Conteiner{
        height: 40px;
    }
}

//Smaller screen
@media screen and (max-width: 600px) {
    div.Conteiner{
        height: 25px;
    }
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue';

// Export component
export default defineComponent({
  name: 'ShowingBox',
  props: {
    text: {
      type: String,
      requiered: true,
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
