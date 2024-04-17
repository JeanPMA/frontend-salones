<template>
    <header>
      <NavbarCliente/>
    </header>
    <div class="calendar">
        <div class="body_calendar">

            <FullCalendar id="calendar" :options="calendarOptions"/>
        </div>
    </div>
    
</template>

<script>
import NavbarCliente from '@/views/navbarCliente.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { useRouter } from 'vue-router';


  const router = useRouter();
  
export default {
name: 'calendarComponent',
components: {
    NavbarCliente,
    FullCalendar,
},
data() {
    const today = new Date();
   
    const fiveDaysLaterFix = new Date();
    const daysLaterFix = new Date();
    fiveDaysLaterFix.setDate(today.getDate() + 5);
    daysLaterFix.setDate(today.getDate() + 6);

    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        validRange: {
          start: fiveDaysLaterFix,
        },
        dateClick: this.handleDateClick,
        events: [
          {
            title: 'Hoy',
            start:  today,  
            allDay: true,
            backgroundColor: 'blue',
            borderColor: 'blue',
          },
        ],
      },
    };
  },
  methods: {
    handleDateClick(arg) {
      
      const fechaSeleccionada = new Date(arg.dateStr);
      this.$router.push({ name: 'solicitud', params: { fechaPorDefecto: fechaSeleccionada.toISOString().split('T')[0] } });
      
    },
  },
  computed: {
    fiveDaysLater() {
      return this.calendarOptions.validRange.start;
    },
  },
 
};
</script>

<style>
.calendar{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.calendar h2{
  color: rgb(0, 0, 0);
}

.calendar a{
  color: rgb(0, 0, 0);
}

.body_calendar{
  display: flex;
  justify-content: center;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 2px solid black;
  padding: 20px;
}

#calendar{
  width: 100%;
}

.fc-event {
  background-color: rgb(15, 83, 230);
}

.blocked-date {
  background-color: red; 
}

.fc .fc-button .fc-icon{
  vertical-align: bottom;
}

@media  screen and (max-width: 400px) {
  .calendar{
    font-size: 4vw;
  }
}
</style>