<template>
  <section>
    <o-loading v-model:active="isLoading" :full-page="isFullPage">
      <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
    </o-loading>
    <div class="card">
      <div>
        <h1 class="titulo mb-2">Calendario de arriendos</h1>
        <o-datepicker
          class="calendario"
          variant="info"
          v-model="selectedDate"
          inline
          :events="rentalEvents"
          :indicators="indicators"
          @change="onDateChange"
        />
        <div style="text-align: center">
          <o-button label="Ver todos los arriendos" class="boton" @click="showAllRentals" />
        </div>
      </div>
    </div>
    <section v-show="dateSelected" class="card card-table">
      <div style="width: 100%">
        <div class="div-title">
          <h1 class="titulo">Arriendos del {{ dateSelected }}</h1>
          <i class="mdi mdi-close-circle-outline mdi-close-table" @click="closeModal(2)"></i>
        </div>
        <o-table
          :data="isEmpty ? [] : filteredRentals"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :mobile-cards="hasMobileCards"
          :paginated="isPaginated"
          :per-page="perPage"
        >
          <o-table-column v-slot="{ row }" field="address" label="Dirección" sortable>
            {{ row.address }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="municipality" label="Comuna" sortable>
            {{ row.municipality }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="checkInDate" label="Check In" sortable>
            {{ row.checkInDate }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="checkOutDate" label="Check Out" sortable>
            {{ row.checkOutDate }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="firstName" label="Cliente" sortable>
            {{ row.firstName }} {{ row.lastName }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="email" label="Email" sortable>
            {{ row.email }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="phone" label="Fono" sortable>
            {{ row.phone }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="total" label="Total" sortable>
            {{ row.total }}
          </o-table-column>
        </o-table>
      </div>
    </section>
    <section class="card card-table" v-show="isShowAllRentals">
      <div style="width: 100%">
        <div class="div-title">
          <h1 class="titulo">Todos los arriendos</h1>
          <i class="mdi mdi-close-circle-outline mdi-close-table" @click="closeModal(3)"></i>
        </div>
        <o-table
          :data="isEmpty ? [] : rentals"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :mobile-cards="hasMobileCards"
          :paginated="isPaginated"
          :per-page="perPage"
        >
          <o-table-column v-slot="{ row }" field="address" label="Dirección" sortable>
            {{ row.address }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="municipality" label="Comuna" sortable>
            {{ row.municipality }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="checkInDate" label="Check In" sortable>
            {{ row.checkInDate }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="checkOutDate" label="Check Out" sortable>
            {{ row.checkOutDate }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="firstName" label="Cliente" sortable>
            {{ row.firstName }} {{ row.lastName }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="email" label="Email" sortable>
            {{ row.email }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="phone" label="Fono" sortable>
            {{ row.phone }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="total" label="Total" sortable>
            {{ row.total }}
          </o-table-column>
        </o-table>
      </div>
    </section>
    <o-modal v-model:active="isErrorCardModalActive" :width="330" scroll="clip">
      <div
        class="notification"
        :style="{
          'background-color': error ? 'hsl(348deg 88.3% 67.24%)' : 'hsl(117, 81%, 34%)',
        }"
      >
        <div class="container-modal">
          <h1 class="titulo-modal">{{ tituloMensajeModal }}</h1>
          <i class="mdi mdi-close-circle-outline mdi-close" @click="closeModal(1)"></i>
        </div>
        <div>
          <p class="notification-detail">{{ error ? error : ok }}</p>
        </div>
      </div>
    </o-modal>
  </section>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvCalendar',
  data() {
    return {
      ok: null,
      error: null,
      filteredRentals: null,
      matchingRentals: null,
      dateSelected: new Date().toISOString().split('T')[0],
      isShowAllRentals: false,
      isDetailCardModalActive: false,
      isErrorCardModalActive: false,
      tituloMensajeModal: null,
      isFullPage: false,
      isLoading: false,
      bars: false,
      selectedDate: new Date(), // La fecha seleccionada en el datepicker
      rentalsData: [],
      rentals: [],
      isEmpty: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: true,
      perPage: 5,
    }
  },
  async beforeMount() {
    try {
      this.isLoading = true
      const userId = localStorage.getItem('id')
      /* const getRentals = await api.get(
        `${import.meta.env.VITE_BACKEND_GET_RENTALS}?userId=${userId}`,
      ) */
      const getRentals = await api.get(import.meta.env.VITE_BACKEND_GET_RENTALS, {
        params: { userId },
      })
      this.rentals = getRentals.data
      this.rentalsData = getRentals.data.map((rental) => {
        const transformDate = (dateStr) => {
          if (!dateStr) return null
          const [year, month, day] = dateStr.split('-').map(Number)
          const formatedDate = new Date(year, month - 1, day)
          return isNaN(formatedDate.getTime()) ? null : formatedDate
        }

        return {
          ...rental,
          checkInDate: transformDate(rental.checkInDate),
          checkOutDate: transformDate(rental.checkOutDate),
        }
      })

      this.onDateChange(this.dateSelected)
      this.isLoading = false
    } catch (error) {
      this.isErrorCardModalActive = true
      this.error = error
      this.tituloMensajeModal = 'Error'
      this.isLoading = false
    }
  },
  computed: {
    rentalEvents() {
      const events = []
      this.rentalsData.forEach((rental) => {
        if (rental.checkInDate && rental.checkOutDate) {
          const start = new Date(rental.checkInDate)
          const end = new Date(rental.checkOutDate)

          if (isNaN(start) || isNaN(end)) {
            console.warn('Fecha inválida encontrada en rental:', rental)
            this.isErrorCardModalActive = true
            this.error = 'Fecha inválida encontrada en rental'
            this.tituloMensajeModal = 'Error'
            return
          }

          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const current = new Date(d.getTime()) // Crear una copia para evitar mutaciones
            let eventType = 'info' // Por defecto

            const checkIn = new Date(rental.checkInDate)
            const checkOut = new Date(rental.checkOutDate)

            if (checkIn.toDateString() === current.toDateString()) {
              eventType = 'success' // Verde para checkIn
            } else if (checkOut.toDateString() === current.toDateString()) {
              eventType = 'danger' // Rojo para checkOut
            }

            events.push({ date: current, type: eventType })
          }
        } else if (rental.checkInDate) {
          const checkIn = new Date(rental.checkInDate)
          if (!isNaN(checkIn)) {
            events.push({ date: checkIn, type: 'success' })
          }
        }
      })
      return events
    },
    indicators() {
      return 'bars'
    },
  },
  methods: {
    onDateChange(selectedDate) {
      // Convierte la fecha seleccionada a una cadena ISO (YYYY-MM-DD)
      const selected = new Date(selectedDate).toISOString().slice(0, 10)
      // Filtra rentalsData para obtener los rentals cuyo rango incluya la fecha seleccionada
      const matchingRentals = this.rentalsData.filter((rental) => {
        if (rental.checkInDate && rental.checkOutDate) {
          const checkIn = new Date(rental.checkInDate).toISOString().slice(0, 10)
          const checkOut = new Date(rental.checkOutDate).toISOString().slice(0, 10)
          return selected >= checkIn && selected <= checkOut
        }
        return false
      })

      // Filtrar los registros para mostrar solo las propiedades necesarias
      this.filteredRentals = matchingRentals.map((rental) => ({
        address: rental.address,
        municipality: rental.municipality,
        checkInDate: this.formatDate(rental.checkInDate),
        checkOutDate: this.formatDate(rental.checkOutDate),
        firstName: rental.firstName,
        lastName: rental.lastName,
        email: rental.email,
        phone: rental.phone,
        total: rental.total,
      }))
      this.dateSelected = selected
      this.isDetailCardModalActive = true
    },
    formatValue(value) {
      // Si el valor es un objeto, lo convierte a un string legible (JSON.stringify)
      if (typeof value === 'object' && value !== null) {
        // Si es una fecha, mostrar como fecha
        if (value._seconds) {
          const date = new Date(value._seconds * 1000)
          return date.toISOString()
        }
        return JSON.stringify(value, null, 2) // Convertir objeto en formato JSON
      }
      return value // Para valores simples, solo devolver el valor
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // Mes con dos dígitos
      const day = String(date.getDate()).padStart(2, '0') // Día con dos dígitos
      return `${year}-${month}-${day}`
    },
    showAllRentals() {
      this.isShowAllRentals = true
    },
    closeModal(option) {
      document.activeElement.blur()
      if (option === 1) {
        this.isErrorCardModalActive = false
      }
      if (option === 2) {
        this.isDetailCardModalActive = false
        this.dateSelected = null
      }
      if (option === 3) {
        this.isShowAllRentals = false
      }
    },
  },
  watch: {
    selectedDate(newDate) {
      this.onDateChange(newDate)
    },
  },
}
</script>

<style scoped>
.titulo {
  font-weight: 500;
  font-size: 21px;
  color: #005187;
  text-align: center;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 180px auto 0;
  padding: 30px;
  border-radius: 30px;
  max-width: calc(500px - 60px) !important;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.card-table {
  margin-top: 45px;
  margin-bottom: 40px;
}
div.datepicker .datepicker-cell.is-selected {
  background-color: #ffb300 !important;
}
.calendario {
  width: auto;
}
.div-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}
.boton {
  margin-top: 30px;
  padding: 13px;
  max-width: 250px;
  color: white;
  background-color: #ffb300;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}

.notification {
  padding: 0;
  padding-bottom: 3px;
  border-radius: 30px;
  text-align: center;
}
.notification-detail {
  color: #fff;
  flex: 1; /* Ocupa el espacio sobrante */
  text-align: center; /* O center, según prefieras */
  padding: 7px 20px 15px 20px;
}
.mdi-close {
  position: absolute;
  margin-top: 8px;
  right: 12px;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
.container-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.titulo-modal {
  font-size: 23px;
  font-weight: 500;
  color: #fff;
  padding-top: 8px;
}

.mdi-close-table {
  margin-left: auto;
  color: #ffb300;
  font-size: 28px;
  cursor: pointer;
}
.field {
  display: flex !important;
}
@media (min-width: 769px) {
  .card-table {
    max-width: calc(1000px - 60px) !important;
  }
}
</style>
