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
          <h1 class="titulo mb-2 mt-3">Mis propiedades</h1>
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
          <o-table-column
            v-slot="{ row }"
            field="codeProperty"
            label="Código"
            sortable
            style="width: 200px !important"
          >
            {{ row.codeProperty }}
          </o-table-column>

          <o-table-column
            v-slot="{ row }"
            field="address"
            label="Dirección"
            sortable
            style="width: 200px !important"
          >
            {{ row.address }}
          </o-table-column>

          <o-table-column
            v-slot="{ row }"
            field="municipality"
            label="Comuna"
            sortable
            style="width: 200px !important"
          >
            {{ row.municipality }}
          </o-table-column>

          <o-table-column
            v-slot="{ row }"
            field="resortTown"
            label="Ciudad"
            sortable
            style="width: 200px !important"
          >
            {{ row.resortTown }}
          </o-table-column>

          <o-table-column
            v-slot="{ row }"
            field="region"
            label="Región"
            sortable
            style="width: 200px !important"
          >
            {{ row.region }}
          </o-table-column>

          <o-table-column
            v-slot="{ row }"
            field="country"
            label="País"
            sortable
            style="width: 200px !important"
          >
            {{ row.country }}
          </o-table-column>

          <template #detail="{ row }">
            <td class="divisor">
              <div class="div-label">
                <p class="mt-2 mb-1 ml-1 label">Descripción</p>
              </div>
              <input class="input" type="text" v-model="row.description" />
              <div class="div-label">
                <p class="mt-2 mb-1 ml-1 label">Políticas</p>
              </div>
              <input class="input" type="text" v-model="row.politics" />
              <div class="div-label">
                <p class="mt-2 mb-1 ml-1 label">Precio</p>
              </div>
              <input class="input" type="text" v-model="row.price" />
              <div class="div-label">
                <p class="mt-2 mb-1 ml-1 label">Capacidad</p>
              </div>
              <input class="input" type="number" v-model="row.capacity" />
              <div class="div-label">
                <p class="mt-2 mb-1 ml-1 label">Habitaciones</p>
              </div>
              <input class="input" type="number" v-model="row.rooms" />
              <div class="div-label">
                <p class="mt-2 mb-1 ml-1 label">Estacionamientos</p>
              </div>
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
            </td>
            <section class="borde">
              <div class="contenedor-subtitulo">
                <div class="titulo-photos">
                  <h1 class="title-photos">Eliminar fotos</h1>
                  <i
                    v-show="!openOrCloseDelImages"
                    class="mdi mdi-plus-circle mdi-36px"
                    @click="openOrCloseDeleteImages(!openOrCloseDelImages)"
                  ></i>
                  <i
                    v-show="openOrCloseDelImages"
                    class="mdi mdi-minus-circle mdi-36px"
                    @click="openOrCloseDeleteImages(!openOrCloseDelImages)"
                  ></i>
                </div>
              </div>
              <div v-show="openOrCloseDelImages" class="image-container">
                <div v-for="(file, index) in row.image" :key="index" class="preview-photos">
                  <img :src="file.signedUrl" alt="Vista previa de la imagen" class="preview-img2" />
                  <button @click="removeImageToDelete(index)" class="boton-vistaprevia2">
                    Eliminar
                  </button>
                </div>
              </div>
            </section>
            <section class="borde">
              <div class="contenedor-subtitulo">
                <div class="titulo-photos">
                  <h1 class="title-photos">Agregar fotos</h1>
                  <i
                    v-show="!openOrCloseAImages"
                    class="mdi mdi-plus-circle mdi-36px"
                    @click="openOrCloseAddImages(!openOrCloseAImages)"
                  ></i>
                  <i
                    v-show="openOrCloseAImages"
                    class="mdi mdi-minus-circle mdi-36px"
                    @click="openOrCloseAddImages(!openOrCloseAImages)"
                  ></i>
                </div>
              </div>
              <div v-show="openOrCloseAImages" class="image-container2">
                <section class="upload-photo">
                  <o-field>
                    <o-upload class="upload" multiple @change="handleFileUploadToModify">
                      <div style="text-align: center">
                        <p>
                          <o-icon icon="upload" size="is-large" />
                        </p>
                        <p>Haz click aquí para subir tus fotos</p>
                      </div>
                    </o-upload>
                  </o-field>
                </section>
              </div>
              <section v-show="openOrCloseAImages" class="previews pb-6">
                <div
                  v-for="(file, index) in previewFilesToModify"
                  :key="index"
                  class="preview-container"
                >
                  <img :src="file.url" alt="Vista previa de la imagen" class="preview-img" />
                  <button @click="removeImageToModify(index)" class="boton-vistaprevia">X</button>
                </div>
              </section>
            </section>
            <section>
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
            </section>
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
      openOrCloseDelImages: false,
      openOrCloseAImages: false, // Para agregar nuevas fotos
      previewFiles: [],
      previewFilesToDelete: [],
      previewFilesToModify: [],
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
        const body = { ...property }
        delete body.image
        const updateProfile = await api.patch(
          `${import.meta.env.VITE_BACKEND_PATCH_MODIFY_PROPERTY}`,
          body,
        )
        if (updateProfile || !updateProfile) {
          if (this.previewFilesToModify.length > 0) {
            const uploadedPhotosToModify = await this.uploadPhotosToModify(property.codeProperty)

            if (!uploadedPhotosToModify) {
              throw new Error('Fotos no cargadas!')
            }

            const imageBody = {
              userId: userId,
              codeProperty: property.codeProperty,
            }

            const updatedListImages = await api.patch(
              `${import.meta.env.VITE_BACKEND_PATCH_ADD_IMAGES}`,
              imageBody,
            )

            if (!updatedListImages) {
              throw new Error('Fotos no listadas!')
            }
            this.ok = 'Propiedad actualizada!'
          }
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
    async uploadPhotosToModify(propertyId) {
      try {
        if (this.previewFilesToModify.length === 0) {
          this.isCardModalActive = true
          this.error = 'Por favor, selecciona al menos una foto para subir.'
          this.isLoading = false
          return
        }

        // Crear FormData para enviar las imágenes y el userId al backend
        const formData = new FormData()
        this.previewFilesToModify.forEach((fileObj) => {
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
          this.price === null ||
          this.capacity === null ||
          this.rooms === null ||
          this.parking === null
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

        const updatedListImages = await api.patch(
          `${import.meta.env.VITE_BACKEND_PATCH_ADD_IMAGES}`,
          imageBody,
        )

        if (!updatedListImages) {
          throw new Error('Fotos no listadas!')
        }

        this.openOrCloseAddProperty(!this.openOrClose)

        this.previewFiles = []
        this.address = null
        this.municipality = null
        this.resortTown = null
        this.region = null
        this.country = null
        this.description = null
        this.politics = null
        this.price = null
        this.capacity = null
        this.rooms = null
        this.parking = null
        this.internet = false
        this.airConditioning = false
        this.calefaction = false
        this.whirlpool = false
        this.pool = false
        this.tinaja = false
        this.beach = false
        this.petsAllow = false
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
    openOrCloseDeleteImages(trueOrFalse) {
      this.openOrCloseDelImages = trueOrFalse
    },
    openOrCloseAddImages(trueOrFalse) {
      this.openOrCloseAImages = trueOrFalse
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
    handleFileUploadToModify(event) {
      const files = event.target.files || event.dataTransfer.files
      if (!files.length) return

      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewFilesToModify.push({ file, url: e.target.result })
        }
        reader.readAsDataURL(file)
      })
    },
    removeImage(index) {
      this.previewFiles.splice(index, 1)
    },
    removeImageToDelete(index) {
      this.previewFilesToDelete.splice(index, 1)
    },
    removeImageToModify(index) {
      this.previewFilesToModify.splice(index, 1)
    },
    closeModal() {
      this.isCardModalActive = false
      window.location.reload()
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
.title-photos {
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
.contenedor-subtitulo {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  margin-top: 10px;
  margin-bottom: 10px;
}
.borde {
  border-bottom: 1px solid rgb(221, 221, 221);
}
.titulo-photos {
  display: flex;
  align-items: center;
  column-gap: 10px;
  text-align: center;
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

.image-container {
  display: flex;
  flex-wrap: wrap; /* Permite que las imágenes se acomoden en varias filas si es necesario */
  justify-content: center; /* Centra las imágenes horizontalmente */
  row-gap: 30px; /* Espaciado entre los elementos */
  column-gap: 30px;
  margin-bottom: 35px;
}
.image-container2 {
  display: flex;
  flex-wrap: wrap; /* Permite que las imágenes se acomoden en varias filas si es necesario */
  justify-content: center; /* Centra las imágenes horizontalmente */
  row-gap: 30px; /* Espaciado entre los elementos */
  column-gap: 30px;
}
.preview-photos {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra las imágenes y botones en cada contenedor */
  justify-content: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.preview-img2 {
  width: 320px;
  height: 240px;
  object-fit: cover; /* Asegura que la imagen se recorte adecuadamente */
}
.boton-vistaprevia2 {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgb(255, 64, 0);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  width: 85px;
  height: 25px;
  font-size: 14px;
  font-weight: bolder;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}

.divisor {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

@media (min-width: 320px) and (max-width: 358px) {
  .botones {
    padding-right: 10px;
  }
  .card {
    padding: 3px;
  }
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
    column-gap: 20px;
    row-gap: 20px;
    width: 100% !important;
    padding-right: 0;
    margin-left: 0px;
    justify-content: center;
  }
  .guardar,
  .eliminar,
  .despublicar {
    font-size: 16px;
  }
  .despublicar {
    width: 120px;
  }
}

@media (min-width: 359px) and (max-width: 446px) {
  .card {
    padding: 3px;
  }
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
    column-gap: 20px;
    row-gap: 20px;
    width: 100% !important;
    padding-right: 0;
    margin-left: 0px;
    justify-content: center;
  }
  .guardar,
  .eliminar,
  .despublicar {
    font-size: 16px;
  }
  .despublicar {
    width: 120px;
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

@media screen and (min-width: 769px) {
  .div-label {
    width: 100%;
  }
  .label {
    text-align: left !important;
  }
}

/* .table-wrapper .table-inner.is-mobile tr:not(.detail):not(.is-empty):not(.table-footer) td {
    width: 342px !important;
  } */
/* .divisor {
    width: 365px !important;
  } */
</style>
