<template>
  <section>
    <o-loading v-model:active="isLoading" :full-page="isFullPage">
      <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
    </o-loading>
    <section class="card card-table mb-6">
      <div style="width: 100%">
        <div class="div-title">
          <h1 class="titulo">Mis propiedades</h1>
          <i class="mdi mdi-close-circle-outline mdi-close-table" @click="closeModal(3)"></i>
        </div>
        <o-table
          :data="isEmpty ? [] : myProperties"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :mobile-cards="hasMobileCards"
          :paginated="isPaginated"
          :per-page="perPage"
          :custom-detail-row="!showDefaultDetail"
          :show-detail-icon="showDetailIcon"
          row-key="codeProperty"
          detailed
        >
          <o-table-column v-slot="{ row }" field="codeProperty" label="Código" sortable>
            {{ row.codeProperty }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="address" label="Dirección" sortable>
            {{ row.address }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="municipality" label="Comuna" sortable>
            {{ row.municipality }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="resortTown" label="Ciudad" sortable>
            {{ row.resortTown }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="region" label="Región" sortable>
            {{ row.region }}
          </o-table-column>

          <o-table-column v-slot="{ row }" field="country" label="País" sortable>
            {{ row.country }}
          </o-table-column>

          <template #detail="{ row }">
            <p class="mt-2 mb-1 ml-1">Descripción</p>
            <input class="input" type="text" :value="row.description" />
            <p class="mt-2 mb-1 ml-1">Políticas</p>
            <input class="input" type="text" :value="row.politics" />
            <p class="mt-2 mb-1 ml-1">Precio</p>
            <input class="input" type="text" :value="row.price" />
            <p class="mt-2 mb-1 ml-1">Capacidad</p>
            <input class="input" type="text" :value="row.capacity" />
            <p class="mt-2 mb-1 ml-1">Habitaciones</p>
            <input class="input" type="text" :value="row.rooms" />
            <p class="mt-2 mb-1 ml-1">Estacionamientos</p>
            <input class="input" type="text" :value="row.parking" />
            <table class="amenities-table">
              <tr>
                <td class="td-table mt-3 pt-3">Internet</td>
                <td><o-checkbox class="" v-model="row.internet" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Aire acondicionado</td>
                <td><o-checkbox class="" v-model="row.airConditioning" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Calefacción</td>
                <td><o-checkbox class="" v-model="row.calefaction" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Tina de hidromasaje</td>
                <td><o-checkbox class="" v-model="row.whirlpool" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Piscina</td>
                <td><o-checkbox class="" v-model="row.pool" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Tinaja</td>
                <td><o-checkbox class="" v-model="row.tinaja" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Playa</td>
                <td><o-checkbox class="" v-model="row.beach" /></td>
              </tr>
              <tr>
                <td class="td-table pt-3">Permite mascotas</td>
                <td><o-checkbox class="" v-model="row.petsAllow" /></td>
              </tr>
            </table>

            <div class="botones">
              <o-button class="guardar">Guardar</o-button>
              <o-button class="eliminar">Eliminar</o-button>
              <o-button class="despublicar">{{
                row.isPublicationDisabled ? 'Publicar' : 'Despublicar'
              }}</o-button>
            </div>
          </template>
        </o-table>
      </div>
    </section>
    <o-modal v-model:active="isErrorCardModalActive" :width="330" scroll="clip">
      <div class="notification">
        <div class="container">
          <i class="mdi mdi-close-circle mdi-main"></i>
          <p class="error-detail">{{ error }}</p>
          <i class="mdi mdi-close-circle-outline mdi-close" @click="closeModal(1)"></i>
        </div>
      </div>
    </o-modal>
  </section>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvProperties',
  data() {
    return {
      error: null,
      isLoading: false,
      isFullPage: false,
      isErrorCardModalActive: false,
      isEmpty: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: true,
      showDetailIcon: true,
      showDefaultDetail: true,
      myProperties: [],
      items: [
        {
          name: 'Monopoly',
          sold: 57,
          available: 100,
        },
        {
          name: 'Scrabble',
          sold: 23,
          available: 84,
        },
        {
          name: 'Chess',
          sold: 37,
          available: 61,
        },
        {
          name: 'Battleships',
          sold: 14,
          available: 56,
        },
      ],
      perPage: 5,
    }
  },
  async beforeMount() {
    try {
      this.isLoading = true
      const userId = localStorage.getItem('id')
      const getProperties = await api.get(
        `${import.meta.env.VITE_BACKEND_GET_PROPERTIES}?userId=${userId}`,
      )
      this.myProperties = getProperties.data
      console.log(getProperties.data)
      this.isLoading = false
    } catch (error) {
      this.isErrorCardModalActive = true
      this.error = error
      this.isLoading = false
    }
  },
}
</script>

<style scoped>
.titulo {
  font-weight: 500;
  font-size: 21px;
  color: #005187;
  text-align: center;
  flex-grow: 1; /* Hace que el título ocupe todo el espacio posible */
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
.notification {
  background-color: hsl(348deg 88.3% 67.24%);
  padding: 5px 14px 0 0;
  border-radius: 30px;
  text-align: center;
}
.mdi-main {
  margin: auto 0;
  padding-left: 25px;
  font-size: 50px;
  color: #fff;
}
.container {
  display: flex;
}
.error-detail {
  color: #fff;
  margin: 20px 15px 25px 20px;
  text-align: justify;
}
.mdi-close {
  color: #fff;
  font-size: 28px;
  cursor: pointer;
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
.div-title {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.input {
  padding-left: 10px !important;
}
.botones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
}
.checkbox {
  display: flex;
  justify-content: left;
  align-items: center;
}
.guardar {
  margin-left: 0px;
}
@media (min-width: 320px) and (max-width: 413px) {
  .botones {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 20px;
  }
}
@media (min-width: 769px) {
  .card-table {
    max-width: calc(1000px - 60px) !important;
  }
  .td-table {
    width: 400px;
  }
  .guardar {
    margin-left: 17px;
  }
  .despublicar {
    margin-right: 17px;
  }
}
@media screen and (max-width: 768px) {
  .table-wrapper .table-inner.is-mobile tr:not(.detail):not(.is-empty):not(.table-footer) td {
    width: 342px !important;
  }
  .guardar {
    margin-left: 17px;
  }
}
</style>
