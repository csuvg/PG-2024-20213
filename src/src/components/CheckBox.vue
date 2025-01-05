// ----------- HTML PART ---------------------
<template>
  <form class='ConteinerForms'>
    <div class="OptionContainer" v-for="(option, index) in options" :key="index">
      <input :id="`opt${index}`" type="checkbox" :value="option" v-model="selectedOptions" :checked="modelValue.includes(option)" @change="handleChange" />
      <label :for="`opt${index}`">
        <FontsCat class="fuente" :text="option" type="Text_B" :for="`opt${index}`" />
      </label>
    </div>
  </form>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">
.ConteinerForms {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.OptionContainer {
  display: flex;
  align-items: center;
}
</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue';
export default defineComponent({
  name: 'CheckBox',
  props: {
    options: {
      type: Array as () => string[],
      default: () => [],
    },
    modelValue: {
      type: Array as () => string[],
      default: () => [],
    },
    
  },
  data () {
    return {
      selectedOptions: [] as string [], // array para rastrear las opciones seleccionadas. 
    };
  },
  emits: ['update:modelValue'],
  created () {
    this.selectedOptions = this.modelValue;
  },
  methods: {
    handleChange () {
      this.$emit('update:modelValue', this.modelValue);
      this.$emit('update:modelValue', this.selectedOptions);
    },
  },
  watch: {
    modelValue (newValue: []) {
      this.selectedOptions = newValue;
    },
    selectedOptions (newSelectedOptions: string[]) {
      this.$emit('update:modelValue', newSelectedOptions); // Emit event when selectedOptions change
    },
  },
  components: {
    FontsCat,
  },
});
</script>
