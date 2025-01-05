<template>
  <div class="ConteinerSubmenu">
    <div class="SubmenuOptions">
      <div class="option" v-for="(option, index) in menuOptions" :key="index" @click="toggleCircle(index)">
        <FontsCat class="fuente" :text="option.text" type="Text_P" />
        <div class="Circle" :class="{ 'showCircle': activeCircle === index }" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.SubmenuOptions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 35px;
}

.Circle {
  background: #dc7729d8;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: none;
  margin-top: -15px;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.showCircle {
  display: block;
}

// Big screen
@media screen and (min-width: 601px) {
  .ConteinerSubmenu {
    width: 80%;
  }

  .Circle {
    margin-top: -15px;
  }
}

// Small screen
@media screen and (max-width: 600px) {
  .ConteinerSubmenu {
    width: 100%;
  }

  .Circle {
    margin-top: -10px;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import FontsCat from './FontsCat.vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Menu3Opciones',
  props: {
    idDocumento: {
      type: String,
      required: true
    },
    VistaFicha: {
      type: String,
      required: true
    }
  },
  components: {
    FontsCat
  },
  setup (props) {
    const route = useRoute(); 
    const router = useRouter();
    const activeCircle = ref(0); // Inicialización de activeCircle con el índice de la opción activa por defecto

    const menuOptions = [
      { text: 'Ficha Medica', route: 'MostrarFichaMedica' },
      { text: 'Historial', route: 'HistorialMedico' },
      { text: 'Recetar', route: 'Medicamentos_Recetar' },
    ];

    const toggleCircle = (index: number) => {
      activeCircle.value = index;
      const targetRoute = menuOptions[index].route;
      if (route.name !== targetRoute) {
        router.push({ 
          name: targetRoute, 
          params: { idDocumento: props.idDocumento } 
        });
      }
    };

    onMounted(() => {
      // Determinar el índice de la opción activa basándonos en la ruta actual
      const currentRouteName = route.name;
      const activeIndex = menuOptions.findIndex(option => option.route === currentRouteName);
      if (activeIndex !== -1) {
        activeCircle.value = activeIndex;
      }
    });

    return {
      menuOptions,
      toggleCircle,
      activeCircle,
    };
  },
});

</script>

