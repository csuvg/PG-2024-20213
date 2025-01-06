import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index'
import store from './store'
import { onAuthStateChanged } from "firebase/auth";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { auth, userRef } from './firebajse'
import { doc, getDoc } from 'firebase/firestore'

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Si el usuario está autenticado
    const userDocRef = doc(userRef, user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userRole = userDoc.data().role;
      store.commit("setUserRole", userRole); // Guarda el rol en Vuex
    }
  } else {
    // Si no hay usuario autenticado, resetea el rol
    store.commit("setUserRole", null);
  }
});
  
library.add(fas)
createApp(App).use(store).use(router).use(VueSweetalert2).component('fa', FontAwesomeIcon).mount('#app')
