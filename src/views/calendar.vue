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

export default {
name: 'calendarComponent',
components: {
    NavbarCliente,
    FullCalendar,
},
data() {
    const today = new Date();
    const fiveDaysLater = new Date();
    const fiveDaysLaterFix = new Date();
    fiveDaysLater.setDate(today.getDate() + 5);
    fiveDaysLaterFix.setDate(today.getDate() + 6);

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
            title: 'Fecha actual',
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
      if (arg.date >= this.fiveDaysLater) {
        console.log('Fecha clickeada:', arg.dateStr);
        // Realiza acciones personalizadas para fechas clickeables
      }
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
    height: 100vh;
    padding-top: 120px;
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
  background-color: red; /* Color de fondo rojo para fechas no clickeables */
}
</style>