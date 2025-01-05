<template>
  <div id="app" class="container">
    <div class="header">
      <HeaderApp />
    </div>
    <div class="main-content">
      <div class="sidebar">
        <MainMenu />
      </div>
      <div class="content">
        <Calendar />
      </div>
    </div>
    <div class="Footer">
      <FooterApp></FooterApp>
    </div>
  </div>
</template>

<script>
import Calendar from '../components/Calendario.vue';
import MainMenu from '../components/MainMenu.vue';
import HeaderApp from '@/components/HeaderApp.vue';
import FooterApp from '@/components/FooterApp.vue';

export default {
  components: {
    Calendar,
    MainMenu,
    HeaderApp, 
    FooterApp
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe al menos toda la altura de la pantalla */
  overflow: hidden;
}

.header {
  flex: 0 0 auto;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  flex: 0 0 auto;
  padding: 10px;
  overflow-y: auto; /* Scroll solo si el contenido del menú se desborda */
}

.content {
  flex: 1;
  margin-top: 1.3%;
  padding: 0px 10px;
  overflow: auto; 
  max-height: 78vh; /* Ajusta el tamaño del calendario haciendo que ocupe menos altura */
}
</style>
