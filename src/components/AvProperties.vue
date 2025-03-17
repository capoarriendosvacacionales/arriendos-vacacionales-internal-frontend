<template>
  <section>
    <section class="card card-add card-table">
      <div class="titulo-add">
        <h1 class="titulo">Agregar nueva propiedad</h1>
        <i
          v-show="!openOrClose"
          class="mdi mdi-plus-circle mdi-36px"
          @click="openOrCloseAddProperty(!openOrClose)"
        ></i>
        <i
          v-show="openOrClose"
          class="mdi mdi-minus-circle mdi-36px"
          @click="openOrCloseAddProperty(!openOrClose)"
        ></i>
      </div>
      <div v-show="openOrClose" class="add-property">
        <p class="mt-2 mb-1 ml-1">Dirección</p>
        <input class="input" type="text" v-model="address" />
        <p class="mt-2 mb-1 ml-1">Comuna</p>
        <input class="input" type="text" v-model="municipality" />
        <p class="mt-2 mb-1 ml-1">Ciudad</p>
        <input class="input" type="text" v-model="resortTown" />
        <p class="mt-2 mb-1 ml-1">Región</p>
        <input class="input" type="text" v-model="region" />
        <p class="mt-2 mb-1 ml-1">País</p>
        <input class="input" type="text" v-model="country" />
        <p class="mt-2 mb-1 ml-1">Descripción</p>
        <input class="input" type="text" v-model="description" />
        <p class="mt-2 mb-1 ml-1">Políticas</p>
        <input class="input" type="text" v-model="politics" />
        <p class="mt-2 mb-1 ml-1">Precio</p>
        <input class="input" type="text" v-model="price" />
        <p class="mt-2 mb-1 ml-1">Capacidad</p>
        <input class="input" type="number" v-model="capacity" />
        <p class="mt-2 mb-1 ml-1">Habitaciones</p>
        <input class="input" type="number" v-model="rooms" />
        <p class="mt-2 mb-1 ml-1">Estacionamientos</p>
        <input class="input" type="number" v-model="parking" />
        <table class="mt-1">
          <tbody>
            <tr>
              <td class="td-table pl-1 pt-2">Internet</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="internet" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Aire acondicionado</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="airConditioning" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Calefacción</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="calefaction" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Tina de hidromasaje</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="whirlpool" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Piscina</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="pool" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Tinaja</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="tinaja" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Playa</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="beach" /></td>
            </tr>
            <tr>
              <td class="td-table pl-1 pt-2">Permite mascotas</td>
              <td><o-checkbox style="position: absolute; right: 0" v-model="petsAllow" /></td>
            </tr>
          </tbody>
        </table>

        <section>
          <section class="upload-photo">
            <o-field>
              <o-upload class="upload" multiple @change="handleFileUpload">
                <div style="text-align: center">
                  <p>
                    <o-icon icon="upload" size="is-large" />
                  </p>
                  <p>Haz click aquí para subir tus fotos</p>
                </div>
              </o-upload>
            </o-field>
          </section>
          <section class="previews">
            <div v-for="(file, index) in previewFiles" :key="index" class="preview-container">
              <img :src="file.url" alt="Vista previa de la imagen" class="preview-img" />
              <button @click="removeImage(index)" class="boton-vistaprevia">X</button>
            </div>
          </section>
          <div class="div-boton">
            <o-button @click="uploadProperty()" class="guardar">Guardar</o-button>
          </div>
          <o-loading v-model:active="isLoading" :full-page="isFullPage">
            <i class="mdi mdi-reload mdi-36px" style="color: transparent"></i>
          </o-loading>
        </section>
      </div>
    </section>
    <section class="card card-table mb-6">
      <div style="width: 100%">
        <div class="div-title">
          <h1 class="titulo mb-2">Mis propiedades</h1>
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
            <input class="input" type="text" v-model="row.description" />
            <p class="mt-2 mb-1 ml-1">Políticas</p>
            <input class="input" type="text" v-model="row.politics" />
            <p class="mt-2 mb-1 ml-1">Precio</p>
            <input class="input" type="text" v-model="row.price" />
            <p class="mt-2 mb-1 ml-1">Capacidad</p>
            <input class="input" type="number" v-model="row.capacity" />
            <p class="mt-2 mb-1 ml-1">Habitaciones</p>
            <input class="input" type="number" v-model="row.rooms" />
            <p class="mt-2 mb-1 ml-1">Estacionamientos</p>
            <input class="input" type="number" v-model="row.parking" />
            <table class="amenities-table">
              <tbody>
                <tr class="">
                  <td class="td-table mt-3 pt-3">Internet</td>
                  <td><o-checkbox v-model="row.internet" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Aire acondicionado</td>
                  <td><o-checkbox v-model="row.airConditioning" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Calefacción</td>
                  <td><o-checkbox v-model="row.calefaction" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Tina de hidromasaje</td>
                  <td><o-checkbox v-model="row.whirlpool" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Piscina</td>
                  <td><o-checkbox v-model="row.pool" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Tinaja</td>
                  <td><o-checkbox v-model="row.tinaja" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Playa</td>
                  <td><o-checkbox v-model="row.beach" /></td>
                </tr>
                <tr>
                  <td class="td-table pt-3">Permite mascotas</td>
                  <td><o-checkbox v-model="row.petsAllow" /></td>
                </tr>
              </tbody>
            </table>
            <div class="botones">
              <o-button class="guardar" @click="saveProperty(userId, row)">Guardar</o-button>
              <o-button class="eliminar" @click="deleteProperty(userId, row.codeProperty, owner)"
                >Eliminar</o-button
              >
              <o-button
                class="despublicar"
                :style="{
                  'background-color': row.isPublicationDisabled ? '#209d12c9' : '#3f3f3fc9',
                }"
                @click="
                  publishOrUnpublishProperty(userId, row.codeProperty, !row.isPublicationDisabled)
                "
                >{{ row.isPublicationDisabled ? 'Publicar' : 'Despublicar' }}</o-button
              >
            </div>
          </template>
        </o-table>
        <o-loading v-model:active="isLoading" :full-page="isFullPage">
          <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
        </o-loading>
      </div>
    </section>
    <o-modal v-model:active="isCardModalActive" :width="330" scroll="clip">
      <div
        class="notification"
        :style="{ 'background-color': error ? 'hsl(348deg 88.3% 67.24%)' : 'hsl(117, 81%, 34%)' }"
      >
        <div class="container">
          <i v-show="error" class="mdi mdi-close-circle mdi-main"></i>
          <i v-show="!error" class="mdi mdi-checkbox-marked-circle mdi-main"></i>
          <p class="notification-detail">{{ error ? error : ok }}</p>
          <i class="mdi mdi-close-circle-outline mdi-close" @click="closeModal()"></i>
        </div>
      </div>
    </o-modal>
  </section>
  <o-loading v-model:active="isLoading" :full-page="isFullPage">
    <i class="mdi mdi-reload mdi-36px" style="color: transparent"></i>
  </o-loading>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvProperties',
  data() {
    return {
      ok: null,
      userId: null,
      error: null,
      isLoading: false,
      isprincipalLoading: false,
      isFullPage: false,
      isCardModalActive: false,
      isEmpty: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: true,
      showDetailIcon: true,
      showDefaultDetail: true,
      myProperties: [],
      detailedRow: null,
      perPage: 5,
      owner: null,
      openOrClose: false,
      previewFiles: [],
      address: null,
      municipality: null,
      resortTown: null,
      region: null,
      country: null,
      description: null,
      politics: null,
      price: null,
      capacity: null,
      rooms: null,
      parking: null,
      internet: false,
      airConditioning: false,
      calefaction: false,
      whirlpool: false,
      pool: false,
      tinaja: false,
      beach: false,
      petsAllow: false,
    }
  },
  async beforeMount() {
    this.owner = localStorage.getItem('user')
    await this.fetchProperties()
  },
  methods: {
    async fetchProperties() {
      try {
        this.isLoading = true
        this.userId = localStorage.getItem('id')
        const getProperties = await api.get(
          `${import.meta.env.VITE_BACKEND_GET_PROPERTIES}?userId=${this.userId}`,
        )
        this.myProperties = getProperties.data
        this.isLoading = false
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    async publishOrUnpublishProperty(userId, codeProperty, isPublicationDisabled) {
      try {
        this.isLoading = true
        const body = {
          userId: userId,
          propertyCode: codeProperty,
          isPublicationDisabled: isPublicationDisabled,
        }
        const updateProfile = await api.patch(
          `${import.meta.env.VITE_BACKEND_PATCH_PROPERTY}`,
          body,
        )
        if (updateProfile || !updateProfile) {
          this.ok = 'Propiedad actualizada!'
        }
        await this.fetchProperties()
        this.isLoading = false
        this.isCardModalActive = true
      } catch (error) {
        this.isCardModalActive = true
        this.error = `Error: ${error}`
        this.isLoading = false
      }
    },
    async saveProperty(userId, property) {
      try {
        this.isLoading = true
        property.userId = userId
        const body = {
          ...property,
        }
        const updateProfile = await api.patch(
          `${import.meta.env.VITE_BACKEND_PATCH_MODIFY_PROPERTY}`,
          body,
        )
        if (updateProfile || !updateProfile) {
          this.ok = 'Propiedad actualizada!'
        }
        await this.fetchProperties()
        this.isLoading = false
        this.isCardModalActive = true
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    async uploadPhotos(propertyId) {
      try {
        if (this.previewFiles.length === 0) {
          this.isCardModalActive = true
          this.error = 'Por favor, selecciona al menos una foto para subir.'
          this.isLoading = false
          return
        }

        // Crear FormData para enviar las imágenes y el userId al backend
        const formData = new FormData()
        this.previewFiles.forEach((fileObj) => {
          formData.append('files', fileObj.file) // Agrega cada archivo al FormData
        })
        formData.append('userId', this.userId) // Agrega el userId al FormData
        formData.append('propertyId', propertyId) // Agrega el propertyId al FormData

        await api.post(`${import.meta.env.VITE_BACKEND_POST_UPLOAD_PROPERTY}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        return true
      } catch (error) {
        return error
      }
    },
    async uploadProperty() {
      try {
        this.isLoading = true

        if (
          this.address === '' ||
          this.municipality === '' ||
          this.resortTown === '' ||
          this.region === '' ||
          this.country === '' ||
          this.description === '' ||
          this.politics === '' ||
          this.price === '' ||
          this.capacity === '' ||
          this.rooms === '' ||
          this.parking === ''
        ) {
          this.isCardModalActive = true
          this.error =
            'Los campos Dirección, Comuna, Ciudad, Región, País, Descripción, Políticas, Precio, Capacidad, Número de habitaciones y Cantidad de estacionamiento son obligatorios.'
          this.isLoading = false
          return
        }

        const userId = localStorage.getItem('id')
        const owner = localStorage.getItem('user')

        const body = {
          userId: userId,
          owner: owner,
          address: this.address,
          municipality: this.municipality,
          resortTown: this.resortTown,
          region: this.region,
          country: this.country,
          description: this.description,
          politics: this.politics,
          price: this.price,
          capacity: this.capacity,
          rooms: this.rooms,
          parking: this.parking,
          internet: this.internet,
          airConditioning: this.airConditioning,
          calefaction: this.calefaction,
          whirlpool: this.whirlpool,
          pool: this.pool,
          tinaja: this.tinaja,
          beach: this.beach,
          petsAllow: this.petsAllow,
        }
        const addProperty = await api.post(
          `${import.meta.env.VITE_BACKEND_POST_ADD_PROPERTY}`,
          body,
        )

        if (!addProperty.data) {
          throw new Error('Propiedad no creada!')
        }

        const uploadedPhotos = await this.uploadPhotos(addProperty.data)

        if (!uploadedPhotos) {
          throw new Error('Fotos no cargadas!')
        }

        const imageBody = {
          userId: userId,
          codeProperty: addProperty.data,
        }

        // TODO: Actualizar la propiedad con las URLs de las fotos en la propiedad 'image'. Falta construir método en el backend para poder recibir la llamada de búsqueda
        const updatedListImages = await api.patch(
          `${import.meta.env.VITE_BACKEND_PATCH_ADD_IMAGES}`,
          imageBody,
        )

        if (!updatedListImages) {
          throw new Error('Fotos no listadas!')
        }

        this.openOrCloseAddProperty(!this.openOrClose)
        this.isLoading = false
        this.ok = 'La propiedad fue creada!'
        this.isCardModalActive = true
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    async deleteProperty(userId, codeProperty, owner) {
      try {
        this.isLoading = true
        const body = {
          userId: userId,
          codeProperty: codeProperty,
          owner: owner,
        }
        const deleteProfile = await api.delete(
          `${import.meta.env.VITE_BACKEND_DELETE_DELETE_PROPERTY}`,
          { data: body },
        )
        if (deleteProfile) {
          this.ok = 'Propiedad eliminada!'
        }
        await this.fetchProperties()
        this.isLoading = false
        this.isCardModalActive = true
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    openOrCloseAddProperty(trueOrFalse) {
      this.openOrClose = trueOrFalse
    },
    handleFileUpload(event) {
      const files = event.target.files || event.dataTransfer.files
      if (!files.length) return

      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewFiles.push({ file, url: e.target.result })
        }
        reader.readAsDataURL(file)
      })
    },
    removeImage(index) {
      this.previewFiles.splice(index, 1)
    },
    closeModal() {
      this.isCardModalActive = false
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
  flex-grow: 1; /* Hace que el título ocupe todo el espacio posible */
}
.titulo-add {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
.asdasdasd {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mdi-plus-circle,
.mdi-minus-circle {
  color: #ffb300;
  cursor: pointer;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
  padding: 30px;
  border-radius: 30px;
  max-width: calc(500px - 60px) !important;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.card-add {
  flex-direction: column;
  margin-top: 180px;
  padding: 10px;
}
.add-property {
  padding: 20px;
}
.notification {
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
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-bottom: 8px;
}
.notification-detail {
  color: #fff;
  flex-grow: 1;
  text-align: center;
}
.mdi-close {
  float: right;
  position: relative;
  top: -18px;
  padding-right: 3px;
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
.div-boton {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.botones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 15px 0;
}
.checkbox {
  display: flex;
  justify-content: left;
  align-items: center;
}
.guardar {
  margin-top: 7px;
  margin-left: 0px;
  color: white;
  background-color: #b116febe;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.eliminar {
  color: white;
  background-color: #ff0000be;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.despublicar {
  color: white;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.upload-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.upload {
  width: 340px;
  padding: 15px;
  border-radius: 11px;
  background-color: #ffbf0049;
  cursor: pointer;
  /* box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15); */
}
.previews {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 320px;
  margin-top: 15px;
}
.preview-container {
  margin-top: 20px;
  position: relative;
  width: 320px;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.boton-vistaprevia {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgb(255, 64, 0);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 13px;
  font-weight: bolder;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}

@media (min-width: 320px) and (max-width: 413px) {
  .previews {
    margin: 0 auto;
    width: 320px;
  }
  .preview-container {
    width: 320px;
    height: 240px;
  }
  .botones {
    flex-wrap: wrap;
    justify-content: center;
  }
}
@media (min-width: 414px) and (max-width: 768px) {
  .previews {
    margin: 0 auto;
    width: 380px;
  }
  .preview-container {
    width: 380px;
    height: 285px;
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
  .previews {
    margin: 0 auto;
    width: 380px;
  }
  .preview-container {
    width: 380px;
    height: 285px;
  }
}
@media screen and (max-width: 768px) {
  .table-wrapper .table-inner.is-mobile tr:not(.detail):not(.is-empty):not(.table-footer) td {
    width: 342px !important;
  }
  /* .guardar {
  } */
}
</style>
