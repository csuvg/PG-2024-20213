<template>
  <div class="about">
    <Header />
    <div class= 'Conteinerdd'>
      <FontsCat type="subtitulo1" text='Clinica "Los angeles"'></FontsCat>
      <CircleOption :options="['Opción 1', 'Opción 2']"/><br/>
      <CircleOption :options="['Opción 1', 'Opción 2', 'Opción 3','Opcion 4']"/><br/>
      <CheckBox :options="['Opción 1', 'Opción 2','']"/>
      <InputBox placeholder="Your name..." minWidth="40%" maxWidth="20%"/>
      <InputBoxBigger placeholder="Your name..." minWidth="40%" maxWidth="20%"/>
      <ShowingBox text='Info de prueba' minWidth="50%" maxWidth="20%" /><br/>
      <ShowingBox :text="text"  minWidth="50%" maxWidth="20%" /><br/>
      <MainMenu/>
      <SubMenu3/>
      <HeaderVerticalR />
      <br/>
      <div class="Botones">
        <Button buttonText="Home" actionType="redirectToView" viewName="home"></Button>
        <Button buttonText="Agregar" actionType="saveData"></Button>
        <Button  buttonText="updateData" actionType="updateData"></Button>
        <Button buttonText="deleteData" actionType="deleteData"></Button>
        <Button buttonText="print" actionType="print"></Button>
      </div>
      <TableHeaders :options="['Opción 1', 'Opción 2']"/>
      <TableHeaders :options="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5', 'Opción 6', 'Opción 7']"/>
      <SubMenu2/>
      <AlphabetList/>
      <BoxComplete text='I walked through the door with you The air was cold But something about it felt like home somehow And I, left my scarf there at your sister house' minWidth="50%" maxWidth="20%" />  <br/>
    </div>
    <TableHeaders :options="['Opción 1', 'Opción 2']"/>
    <TableHeaders :options="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5', 'Opción 6', 'Opción 7']"/>
    </div>
    <SubMenu2/>
    <BackBtn/>
    <inwordputPass  placeholder="Your name... hola mija  "  minWidth="50%" maxWidth="70%"  margin-left="25%"/>
    <Footer/>
</template>

<style>
.Conteinerdd{
  background-color: lightblue;
}
.Botones{
  display: flex;
  flex-direction: row;
}
</style>

<script lang="ts">
import CircleOption from '../components/CircleOption.vue'; // Import
import SubMenu3 from '../components/SubMenu3.vue'; // Import
import Button from '../components/ButtonsApp.vue';
import SubMenu2 from '../components/SubMenu2.vue'
import CheckBox from '../components/CheckBox.vue';
import InputBox from '../components/InputBox.vue'; // Import
import InputBoxBigger from '../components/InputBoxBigger.vue'; // Import
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import HeaderVerticalR from '../components/HeaderVertical.vue';
import ShowingBox from '../components/ShowingBox.vue'; // Import
import MainMenu from '../components/MainMenu.vue';
import BoxComplete from '../components/BoxComplete.vue'; // Import
import TableHeaders from '../components/TableHeaders.vue';
import BackBtn from '../components/BackBtn.vue';
import AlphabetList from '../components/AlfabetoList.vue';
import FontsCat from '../components/FontsCat.vue'; 

import inwordputPass from '../components/inputPassword.vue'; 
import { defineComponent, ref } from 'vue';


export default defineComponent({
  components: {
    Header,
    Footer,
    HeaderVerticalR,
    CircleOption,
    InputBox,
    CheckBox,
    InputBoxBigger,
    MainMenu,
    BoxComplete,
    SubMenu3,
    ShowingBox,
    Button,
    TableHeaders,
    SubMenu2,
    BackBtn,
    AlphabetList,
    FontsCat,
    inwordputPass
  }, 
  setup (props) {
    const text = ref('Ola');

    return {
      text
    };
  }
});
</script>
