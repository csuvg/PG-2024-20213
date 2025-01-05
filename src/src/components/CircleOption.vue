<template>
  <form class="ConteinerForms">
    <div class="PairContainer" v-for="(pair, index) in pairsOfOptions" :key="index">
      <div class="ObjContainer" v-for="(option, subIndex) in pair" :key="subIndex">
        <input
          :id="`${subIndex + index * 2}`"
          type="radio"
          :value="`${subIndex + index * 2}`"
          v-model="isChecked" 
          @change="toggleCheckbox(isChecked)"
        />
        <label :for="`${subIndex + index * 2}`">
          <FontsCat class="fuente" :text="option" type="Text_B" :for="`${subIndex + index * 2}`" />
        </label>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.ConteinerForms {
  display: flex;
  flex-direction: column;
}

.PairContainer {
  display: flex;
  gap: 15px; /* Espacio entre cada par de opciones */
}

.ObjContainer {
  display: flex;
  align-items: center;
  gap: 5px;
}

@media screen and (min-width: 601px) {
  div.PairContainer {
    height: 30px;
  }
}

@media screen and (max-width: 600px) {
  div.PairContainer {
    height: 28px;
  }
}
</style>


<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from 'vue';
import FontsCat from '@/components/FontsCat.vue';

export default defineComponent({
  name: 'CircleOption',
  props: {
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
    initialValue: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup (props, { emit }) {
    const isChecked = ref(props.modelValue || props.initialValue || '');

    // Watch para actualizar isChecked cuando modelValue cambia
    watch(
      () => props.modelValue,
      (newValue) => {
        isChecked.value = newValue;
      }
    );

    // Emitir el cambio cuando isChecked cambia
    watch(isChecked, (newValue) => {
      emit('update:modelValue', newValue);
    });

    const toggleCheckbox = (value: string) => {
      isChecked.value = value; // Actualizar el estado
    };

    const resetChecked = () => {
      isChecked.value = '';
    };

    const pairsOfOptions = computed(() => {
      const pairs: string[][] = [];
      for (let i = 0; i < props.options.length; i += 2) {
        const pair: string[] = props.options.slice(i, i + 2);
        pairs.push(pair);
      }
      return pairs;
    });

    return {
      isChecked,
      toggleCheckbox,
      pairsOfOptions,
      resetChecked,
    };
  },
  components: {
    FontsCat,
  },
});
</script>
