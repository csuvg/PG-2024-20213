<template>
  <div>
    <div class="calendar-container">
      <vue-cal
        :events="events"
        @cell-click="onDateClick"
        @event-click="onEventClick"
        :time-step="15"
        :time-from ="9 * 60" 
        :time-to ="18 * 60 +30"
        :selected-date="selectedDate" 
        active-view="week"
        locale="es"
        :disable-views="['years', 'year']"
        :hide-weekdays="[7]"
        events-on-month-view="short"
        :min-date="minDate"
        
      ></vue-cal>
    </div>
      <!-- Modal para crear evento -->
    <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span @click="closeModal" class="close">&times;</span>
          <form @submit.prevent="createEvent" class="form">
            <label for="title">Título:</label>
            <input v-model="newEvent.title" id="title" type="text" class="input-field" required />
  
            <label for="start">Fecha de inicio:</label>
            <input v-model="newEvent.start" id="start" type="datetime-local"  class="input-field" required />
  
            <label for="end">Fecha de finalización:</label>
            <input v-model="newEvent.end" id="end" type="datetime-local" class="input-field" required />
  
            <button type="submit" class="submit-button">Agendar Cita</button>
          </form>
        </div>
    </div>
      <!-- div para ver o editar un evento -->
    <div v-if="showEventModal" class="modal">
        <div class="modal-content">
          <span @click="closeEventModal" class="close">&times;</span>
          <h2>{{ selectedEvent.title }}</h2>
          <!-- Campo editable para el título del evento -->
          <label for="edit-title">Título:</label>
          <input v-model="selectedEvent.title" id="edit-title" type="text" class="input-field" required />

          <!-- Campo editable para la fecha de inicio del evento -->
          <label for="edit-start">Fecha de inicio:</label>
          <input v-model="selectedEvent.start" id="edit-start" type="datetime-local" class="input-field" required />

          <!-- Campo editable para la fecha de finalización del evento -->
          <label for="edit-end">Fecha de finalización:</label>
          <input v-model="selectedEvent.end" id="edit-end" type="datetime-local" class="input-field" required />

          <div class="button-group">
            <button @click="deleteEvent" class="delete-button">Eliminar cita</button>
            <button @click="editEvent" class="edit-button">Editar cita</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import VueCal from 'vue-cal'; // Importamos la librería del calendario
import 'vue-cal/dist/vuecal.css'; // Importamos los estilos del calendario
import { eventosRef } from "../firebajse"; // Importamos la referencia de los eventos
import { addDoc, getDocs, deleteDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

  
export default defineComponent({
  components: { VueCal },
  setup () {
    const events = ref<any[]>([]);
    const newEvent = ref({
      title: '',
      start: '',
      end: ''
    });
    const selectedDate = ref(new Date()); // Aquí utilizamos selectedDate
    const showModal = ref(false); 
    const intervals = ref(15);  
    const showEventModal = ref(false); // modal de evento.
    const selectedEvent = ref<any>(null); // guarda elementos seleccionados 

    // funcion para visualizar un evento 
    const onEventClick = (event: any) => {
      if (event.title === "Hora de almuerzo") {
        // Mostrar advertencia directamente si se intenta hacer clic en "Hora de almuerzo"
        Swal.fire({
          icon: 'warning',
          title: 'Este evento no se puede modificar',
          toast: true,
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        return; // Salir de la función para que no se abra el diálogo
      }
      const formatDateToLocal = (date: Date) => {
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Ajuste a la zona horaria local
        return localDate.toISOString().slice(0, 16); // `slice(0, 16)` mantiene `YYYY-MM-DDTHH:MM`
      };

      selectedEvent.value = {
        ...event,
        start: formatDateToLocal(new Date(event.start)),
        end: formatDateToLocal(new Date(event.end))
      };
      showEventModal.value = true;
    };

    // funcion para cerrar el modal de evento
    const closeEventModal = () => {
      showEventModal.value = false;
      // selectedEvent.value = null;
    };

    // funcion para agregar el evento de cerrado de 12:30 a 3 pm para todos los dias
    const addClosedEvent = () => {
      const today = new Date();
      const currentWeek = [];

      // obtener todos los dias de la semana
      for (let i = 0; i < 7; i++) { 
        const day = new Date(today);
        day.setDate(today.getDate() - today.getDay() + i); // Ajusta para obtener los dias 
        currentWeek.push(day);
      }

      // agrega el evento de cerrado de 12:30 a 3pm para cada dia de la semana 
      currentWeek.forEach((day) => {
        const start = new Date(day); // Clonamos el objeto `day`
        start.setHours(12, 30);
        const end = new Date(day); // Clonamos de nuevo para evitar modificar `start`
        end.setHours(15, 0);
        events.value.push({
          title: "Hora de almuerzo",
          start: start,
          end: end,
          description: "Hora de almuerzo",
          class: "evento-cerrado" // personalizra...
        });
      });
    };

    interface Event {
      id?: string;
      title: string;
      start: Date;
      end: Date;
    }

    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(eventosRef);
        const firebaseEvents: Event[] = []; // Creamos un array temporal para los eventos de Firebase
        snapshot.forEach((doc) => {
          const data = doc.data();
          const start = data.start instanceof Timestamp ? data.start.toDate() : new Date(data.start);
          const end = data.end instanceof Timestamp ? data.end.toDate() : new Date(data.end);
          firebaseEvents.push({
            id: doc.id,
            title: data.title,
            start: start,
            end: end
          });
        });

        // Concatenamos los eventos de Firebase con los eventos ya existentes (quemados)
        events.value = firebaseEvents.concat(events.value.filter(e => e.title === 'Hora de almuerzo'));
      } catch (error) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "error",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
      }
    };


    interface DateClickEvent {
      start: Date | null | undefined;
    }

    const onDateClick = (event: Date): void => {
      // Verificamos si `event` tiene un valor válido
      if (!event) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "error",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Error: La fecha seleccionada es indefinida",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
        return;
      }
      
      if (event.getDay() === 6 && event.getHours() >= 14) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "warning",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Horario no disponible",
          text: "No se pueden crear eventos después de las 2:00 PM los sábados.",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
        return;
      }

      // Obtener la fecha y hora en formato local
      const year = event.getFullYear();
      const month = String(event.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const day = String(event.getDate()).padStart(2, '0');
      const hours = String(event.getHours()).padStart(2, '0');
      const minutes = String(event.getMinutes()).padStart(2, '0');
      
      // Construir la cadena de fecha/hora en el formato local (YYYY-MM-DDTHH:MM)
      newEvent.value.start = `${year}-${month}-${day}T${hours}:${minutes}`;
    
      // Crear la hora de finalización sumando 15 minutos
      const end = new Date(event.getTime() + 15 * 60 * 1000);
      const endHours = String(end.getHours()).padStart(2, '0');
      const endMinutes = String(end.getMinutes()).padStart(2, '0');
    
      newEvent.value.end = `${year}-${month}-${day}T${endHours}:${endMinutes}`;
    
      // Abrir el modal para crear el evento
      showModal.value = true;
    };

    const createEvent = async () => {
      try {
        const start = Timestamp.fromDate(new Date(newEvent.value.start));
        const end = Timestamp.fromDate(new Date(newEvent.value.end));
        await addDoc(eventosRef, {
          title: newEvent.value.title,
          start: start,
          end: end
        });
        closeModal();
        fetchEvents();
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "success",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Cita creada con éxito",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
      } catch (error) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "error",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Error al crear evento",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
      }
    };

    // funcion para eliminar un evento... 
    const deleteEvent = async () => {
      try {
        if (selectedEvent.value.id) {
          const result = await Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          });

          if (result.isConfirmed) {
            await deleteDoc(doc(eventosRef, selectedEvent.value.id));
            await fetchEvents();
            closeEventModal();
            Swal.fire('Eliminado', 'El evento ha sido eliminado.', 'success');
          }
        }
      } catch (error) {
        console.error("Error al eliminar evento:", error);
        Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
      }
    };

    // funcion para editar un evento 
    const editEvent = async () => {
      try {
        if (selectedEvent.value.id) {
          const start = Timestamp.fromDate(new Date(selectedEvent.value.start));
          const end = Timestamp.fromDate(new Date(selectedEvent.value.end));

          await updateDoc(doc(eventosRef, selectedEvent.value.id), {
            title: selectedEvent.value.title,
            start: start,
            end: end
          });

          await fetchEvents();
          closeEventModal();
          Swal.fire('Actualizado', 'El evento ha sido actualizado con éxito', 'success');
        }
      } catch (error) {
        console.error("Error al guardar la edición del evento:", error);
        Swal.fire('Error', 'No se pudo editar el evento', 'error');
      }
    };

    const closeModal = () => {
      showModal.value = false;
      newEvent.value = {
        title: '',
        start: '',
        end: ''
      };
    };

    const addDays = (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const minDate = computed(() => addDays(new Date(), -10));

    onMounted(() => {
      // Eventos quemados que serán predeterminados
      addClosedEvent(); // agregar el evento de cerrado

      // Cargar eventos desde Firebase y combinar con los eventos quemados
      fetchEvents().then(() => {
        // Los eventos de Firebase se combinan con los eventos predeterminados (quemados)
        console.log("");
      });
    });
  
    return {
      events,
      newEvent,
      showModal,
      selectedDate,
      intervals,
      fetchEvents,
      onDateClick,
      createEvent,
      closeModal,
      minDate,
      showEventModal, 
      selectedEvent,
      closeEventModal,
      onEventClick,
      deleteEvent,
      editEvent

    };
  },
});
</script>
  
<style>
  /* Estilo para los eventos "Cerrado" */
  .vuecal__event.evento-cerrado {
    background-color: #cccece7d;/* Color de fondo del evento */
    color: #000000; /* Color del texto, ajusta si es necesario */
    position: relative;
    overflow: hidden;
    z-index: 0;
  }
  
  /* Crear el efecto de líneas diagonales */
  .vuecal__event.evento-cerrado::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg, /* Ángulo de las líneas diagonales */
      rgba(255, 255, 255, 0.3), /* Color y opacidad de las líneas */
      rgba(255, 255, 255, 0.3) 10px, /* Espesor de las líneas */
      transparent 10px,
      transparent 20px /* Espacio entre las líneas */
    );
    pointer-events: none; /* Evitar que el overlay interfiera con la interacción */
  }
  
  .modal {
    display: block;
    position: fixed;
    z-index: 1000; /* Asegura que el modal esté siempre por encima */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex; 
    flex-direction: column;
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #888;
    width: 50%; /* Ajusta el tamaño del modal */
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .input-field {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 90%;
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #42b9abe7;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #84cfc9a6;
    color:#000000;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
  }

 .vuecal__header, .vuecal__header__day {
  position: sticky;
  top: 0;
  background-color: #f0f0f0;
  z-index: 10;
}
 .calendar-container {
  height: 600px; /* Adjust height as needed */
  overflow-y: auto;
}

.vuecal--month-view .vuecal__cell {height: 150px;}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal__cell--disabled {text-decoration: line-through;}
.vuecal__cell--before-min {color: #008b8b;}

.vuecal__event {background-color: rgba(241, 188, 136, 0.263); color: #000000; font-size: 14px;}

.vuecal__menu, .vuecal__cell-events-count {background-color: #42b9abcc; color: #fff;} /*Color del Header principal */
.vuecal__title-bar {background-color:#84cfc96c;} /*Color del banner central */
.vuecal--view-with-time, .vuecal__weekdays-headings {background-color: #ffffff;} /*Color del banner de los dias de la semana */
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(223, 222, 222, 0.272);} /*Este es el estilo para la linea gris que muestra el dia actual*/
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(1, 247, 247, 0.1);} /*Esta es el estilo para la lina que muestra en que dia estoy */

.edit-button, .delete-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  transition: background-color 0.3s;
}

.edit-button {
  background-color: #42b9abe7;
  color: white;
}

.delete-button {
  background-color: #f44336bf;
  color: white;
}

.edit-button:hover {
  color: #000000;
  background-color: #84cfc9a6;
}

.delete-button:hover {
  background-color: #f4433689;
}

.button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}
</style>
