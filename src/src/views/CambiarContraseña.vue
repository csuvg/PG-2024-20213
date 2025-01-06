<template>
    <Header/>
    <div class = "UpperSide">
      <BackBtn class ="back" ruta="/#"/>
      <FontsCat class ="headerh1" type="subtitulo1" text='Actualizar contraseña'/>
    </div>
    
    <div class = 'form-container'>

      <div class = "codigos">
          <div class = "Title">
              <FontsCat class ="headerh1" type="subtitulo2" text='Códigos de seguridad'/> 
          </div>

          <div class ="DP">
              <InputBox class= "inptCo3" type= "password" placeholder="Ingrese código personal" minWidth="340%" maxWidth="80%" margin-left="-3%" v-model="CodigoP"></InputBox>
              <InputBox class= "inptCo3" placeholder="Ingrese código recibido en el correo" minWidth="340%" maxWidth="80%" margin-left="1%" v-model="CodigoE"></InputBox>
          </div>
      </div>

      <div class= "contraseñas" v-if="enable">
          <div class = "Title">
              <FontsCat class ="headerh1" type="subtitulo2" text='Cambio de contrasña'/> 
          </div>

          <div class ="DP">
              <InputPass class= "inptCo"  placeholder="Ingrese contraseña" minWidth="340%" maxWidth="77%"  v-model="NContraseña"></InputPass>
              <InputPass class= "inptCo2"  placeholder="Ingrese nuevamente contraseña" minWidth="340%" maxWidth="77%" v-model="NContraseña2"/>
              
          </div>
          <div class = "CBTN">
              <Button buttonText="Actualizar" @click="changePassword" />
          </div>
      </div>
    </div>
    <div v-if="footer" :class="enable ? 'footer2' : 'footer'">
        <Footer/>
    </div>
</template>

<style scoped lang="scss">
.form-container {
  width: 100%;
//   max-width: 2000px; /* Ajusta según sea necesario */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //min-height: 100vh;
  margin: 0 auto;
 // height: 110vh;
 position: relative;
//  flex-grow: 1;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.footer2 {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
}


.contraseñas{
    width: 60%; 
}

.CBTN{
  display:flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 10px;
}

.UpperSide{
  display:flex;
  align-items: start;
  justify-content: start;
  margin-left: 15%;
  width: auto;
}

.Title{
  display:flex;
  align-items: start;
  justify-content: start;
  margin-left: 5.2%;
}

.headerh1{
  margin-left: 1.5%;
  margin-top: 1.9%;
}

.back{
  margin-top: 1.5%;
}

.DP{
  width:90%;
  display: grid;
  grid-template-rows:  70px;
  grid-template-columns: 3fr 3fr ;
  grid-gap: 2px;
  margin-left: 6%;
}

.codigos{
    width: 60%;
    margin-bottom: 10px;
}

.pairMenu{
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
    width: 80%;
    margin-left: 10%;
}

.inptCo {
  margin-left: 7.2%;
}

.inptCo2 {
  margin-left: 9.5%;
}

@media screen and (max-width: 600px) {
.DP{
  grid-template-rows: 3fr 3fr ; 
  grid-template-columns: 70px;

}

.inptCo{
  margin-bottom: 20%;
}
  
}

</style>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import BackBtn from '../components/BackBtn.vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import InputBox from '../components/InputBox.vue';
import FontsCat from '../components/FontsCat.vue';
import InputPass from '../components/inputPassword.vue'; 

import { userRef } from "../firebajse";
import { useStore } from 'vuex';
import { updatePassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, setDoc, Timestamp, doc, where, query, updateDoc } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import router from '@/router';
import CryptoJS from 'crypto-js'


export default defineComponent({
  name: 'NueContra',
  components: {
    Header,
    Footer,
    Button,
    BackBtn,
    FontsCat,
    InputBox,
    InputPass,
  },   
  data () {
    return {
      CodigoP: '' as string,
      CodigoE: '' as string,
      contra: '' as string,
      NContraseña: '' as string,
      NContraseña2: '' as string,
      enable: false as boolean,
      footer: true as boolean,
      idDoc: '' as string,
      nameUser: '' as string,
    }
  },
  setup () {
    const store = useStore();
    const user = computed(() => store.getters.getUser);

    return {
      user,
    };
  },
  methods: {
    async getCodes () {
      try {
        const querySnapshot = await getDocs(query(userRef, where("codPersonal", '==', this.CodigoP)));

        if (querySnapshot.empty) {
          this.PropError("Oops...", "Codigo incorrecto")
          return;
        }
        // Obtener el primer documento de la consulta
        const documentSnapshot = querySnapshot.docs[0];
        
        // Acceder al ID del documento
        this.idDoc = documentSnapshot.id;
    
        const usuario = documentSnapshot.data().toString();
        const codE = documentSnapshot.data().codEmail;
        const codP = documentSnapshot.data().codPersonal;

        if (this.CodigoP == codP && this.CodigoE == codE) {
          this.enable = true 
          this.footer = true
        } else {
          this.enable = false 
          this.footer = true
          this.PropError("Oops...", "Codigo incorrecto")
        }
      } catch (error) {
        this.PropError("Ha ocurrido un error...", "Inténtelo nuevamente")
      } 
    },

    async changePassword (id: string) {
      const auth = getAuth();
      const userAuth = auth.currentUser;

      if (this.NContraseña == this.NContraseña2) {
        if (!userAuth) {
          await this.updatePasswordInAuth(this.user, this.NContraseña);
          const docRef = doc(userRef, this.idDoc);
          await updateDoc(docRef, {
            contraseña: this.NContraseña,
            codEmail: null
          });  
          this.PropSucces()  
          this.$router.push('/');  
        }
      } else {
        this.PropNoti('Las contraseñas nos coinciden, verifica nuevamente')
      }
    },

    async updatePasswordInAuth (email:string, newPassword:string) {
      const querySnapshot = await getDocs(query(userRef, where("correo", '==', email)));
      
      if (!querySnapshot.empty) {
        const usuario = querySnapshot.docs[0].data();
        const storedPassword = usuario.contraseña;
  
        const auth = getAuth();
  
        try {
          // const en_password = this.encryptText(storedPassword)
          const userCredential = await signInWithEmailAndPassword(auth, email, storedPassword);
          const userAuth = userCredential.user;
          if (userAuth) {
            await updatePassword(userAuth, newPassword); // Cambia la contraseña
          } 
        } catch (error) {
          this.PropError("Algo salio mal", "Error al cambiar la contraseña:")
        } 
      } else {
        console.error("No se encontró ningún usuario con ese correo.");
        this.PropError("Error", "No se encontró ningún usuario con ese correo.");
        return; // Termina la ejecución si no se encuentra el usuario
      }
    },

    PropError (title1: string, text1: string) {
      const swalOptions: SweetAlertOptions = {
        position: 'center',
        icon: 'error',
        title: title1,
        text: text1,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: 'swal2-title', // Clase para el título de la alerta
        },
      };
      Swal.fire(swalOptions);
    },
    
    PropNoti (title1: string) {
      Swal.fire(title1);
    },

    PropSucces () {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "success",
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        title: "Actualización realizada con exito",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }
      Swal.fire(Toast);
    },
    
    verificarCodigos () {
      if (this.CodigoE.length === 8) {
        this.getCodes();
      }
    },

    encryptText (text:string) {
      const passphrase = 'klg0AZHyui893#%'; 
      const encryptedText = CryptoJS.AES.encrypt(text, passphrase).toString();
      return encryptedText;
    },
  },

  watch: {
    CodigoP (newVal: string) {
      this.verificarCodigos();
    },
    CodigoE (newVal: string) {
      this.verificarCodigos();
    }
  }
})
</script>
