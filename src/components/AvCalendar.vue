<template>
  <section>
    <div class="card">
      <p class="titulo">Calendar</p>
      <o-field>
        <o-switch v-model="bars" label="Bars" />
      </o-field>

      <o-datepicker
        class="calendario"
        variant="info"
        v-model="date"
        inline
        :events="events"
        :indicators="indicators"
      />
    </div>
  </section>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvCalendar',
  data() {
    const thisMonth = new Date().getMonth();
    return {
      bars: false,
      date: new Date(2017, thisMonth, 1),
      events: [
        { date: new Date(2017, thisMonth, 2) },
        { date: new Date(2017, thisMonth, 6) },
        { date: new Date(2017, thisMonth, 6), type: "info" },
        { date: new Date(2017, thisMonth, 8), type: "danger" },
        { date: new Date(2017, thisMonth, 10), type: "success" },
        { date: new Date(2017, thisMonth, 10), type: "link" },
        { date: new Date(2017, thisMonth, 12) },
        { date: new Date(2017, thisMonth, 12), type: "warning" },
        { date: new Date(2017, thisMonth, 16), type: "danger" },
        { date: new Date(2017, thisMonth, 20) },
        { date: new Date(2017, thisMonth, 29), type: "success" },
        { date: new Date(2017, thisMonth, 29), type: "warning" },
        { date: new Date(2017, thisMonth, 29), type: "info" },
        { date: new Date(2017, thisMonth, 29), type: "success" },
        { date: new Date(2017, thisMonth, 29), type: "warning" },
        { date: new Date(2017, thisMonth, 29), type: "info" },
      ],
    }
  },
  async beforeMount() {
    try {
      const response = await api.get(import.meta.env.VITE_BACKEND_TEST)
      console.log(response.data)
    } catch (error) {
      console.error('Error en la petición:', error)
    }
  },
  computed: {
    indicators() {
      return this.bars ? "bars" : "dots";
    },
  },
}
</script>

<style scoped>
.titulo {
  font-weight: 500;
  font-size: 23px;
  padding-bottom: 12px;
  color: #005187;
  text-align: center;
}
.card {
  margin: 180px auto 0;
  padding: 30px;
  border-radius: 30px;
  max-width: calc(500px - 60px) !important;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
div.datepicker .datepicker-cell.is-selected {
  background-color: #ffb300 !important;
}
</style>
