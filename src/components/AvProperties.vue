<template>
  <div class="card card-add card-table">
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
      <div class="disclaimer">
        <p>
          Importante! Si no subes al menos una imagen de tu propiedad, la misma quedará
          despublicada. Sin embargo, podrás publicarla modificándola y subiendo una o más imágenes.
        </p>
      </div>
      <div v-for="field in fields" :key="field.key" class="mb-3">
        <p class="mt-2 mb-1 ml-1">{{ field.label }}</p>

        <o-input
          v-if="field.type !== 'select'"
          v-model="form[field.key]"
          :type="field.type"
          expanded
        />

        <o-select v-else v-model="form[field.key]" expanded>
          <option v-for="option in field.options" :key="option.value" :value="option.label">
            {{ option.label }}
          </option>
        </o-select>

        <p v-if="showErrorsAdd && !form[field.key]" class="error-msg">Debes completar este campo</p>
      </div>
      <table class="mt-1">
        <tbody>
          <tr v-for="item in amenities" :key="item.key">
            <td class="td-table pl-1 pt-2">{{ item.label }}</td>
            <td>
              <o-checkbox style="position: absolute; right: 0" v-model="form[item.key]" />
            </td>
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
          <o-button class="guardar" @click.prevent="uploadProperty">Guardar</o-button>
        </div>
        <p
          v-if="showErrorsAdd && Object.values(form).some((v) => v === '' || v === null)"
          class="error-msg has-text-centered"
        >
          Debes completar todos los campos obligatorios
        </p>
        <o-loading v-model:active="isLoading" :full-page="isFullPage">
          <i class="mdi mdi-reload mdi-36px" style="color: transparent"></i>
        </o-loading>
      </section>
    </div>
  </div>
  <div class="card card-table mb-6">
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
            <!-- Campos editables dinámicos -->
            <div v-for="field in editableFields" :key="field.key" class="div-label">
              <p class="mt-2 mb-1 ml-1 label">{{ field.label }}</p>

              <!-- Input normal -->
              <input
                v-if="field.type === 'text' || field.type === 'number'"
                class="input"
                :type="field.type"
                v-model="row[field.key]"
              />

              <!-- Select -->
              <o-select
                v-else-if="field.type === 'select'"
                class="input-select"
                expanded
                v-model="row[field.key]"
              >
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </o-select>
              <p
                v-if="showErrorsUpdate && (row[field.key] === '' || row[field.key] === null)"
                class="error-msg"
              >
                Debes completar este campo
              </p>
            </div>

            <!-- Checkboxes dinámicos -->
            <table class="amenities-table">
              <tbody>
                <tr v-for="amenity in amenities" :key="amenity.key">
                  <td class="td-table pt-3">{{ amenity.label }}</td>
                  <td><o-checkbox v-model="row[amenity.key]" /></td>
                </tr>
              </tbody>
            </table>
          </td>

          <!-- Sección: Eliminar fotos -->
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
                <img :src="file.signedUrl" alt="Vista previa" class="preview-img2" />
                <button @click="removeImageToDelete(row, index)" class="boton-vistaprevia2">
                  Eliminar
                </button>
              </div>
            </div>
          </section>

          <!-- Sección: Agregar fotos -->
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
                      <p><o-icon icon="upload" size="is-large" /></p>
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
                <img :src="file.url" alt="Vista previa" class="preview-img" />
                <button @click="removeImageToModify(index)" class="boton-vistaprevia">X</button>
              </div>
            </section>
          </section>

          <!-- Botones -->
          <section>
            <div class="botones">
              <o-button type="button" class="guardar" @click="saveProperty(userId, row)"
                >Guardar</o-button
              >
              <o-button class="eliminar" @click="deleteProperty(userId, row.codeProperty, owner)">
                Eliminar
              </o-button>
              <o-button
                class="despublicar"
                :style="{
                  'background-color': row.isPublicationDisabled ? '#209d12c9' : '#3f3f3fc9',
                }"
                @click="
                  publishOrUnpublishProperty(userId, row.codeProperty, !row.isPublicationDisabled)
                "
              >
                {{ row.isPublicationDisabled ? 'Publicar' : 'Despublicar' }}
              </o-button>
            </div>
            <p v-if="showErrorsUpdate && hasEmptyFields(row)" class="error-msg-button">
              Debes completar todos los campos obligatorios
            </p>
          </section>
        </template>
      </o-table>
      <o-loading v-model:active="isLoading" :full-page="isFullPage">
        <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
      </o-loading>
    </div>
  </div>
  <o-modal v-model:active="isCardModalActive" :width="330" scroll="clip">
    <div
      class="notification"
      :style="{
        'background-color': error
          ? 'hsl(348deg 88.3% 67.24%)'
          : major
            ? 'hsl(36, 100%, 50%)'
            : 'hsl(117, 81%, 34%)',
      }"
    >
      <div class="container-modal">
        <h1 class="titulo-modal">{{ tituloMensajeModal }}</h1>
        <i class="mdi mdi-close-circle-outline mdi-close" @click="closeModal()"></i>
      </div>
      <div>
        <p class="notification-detail">{{ error ? error : major ? major : ok }}</p>
      </div>
    </div>
  </o-modal>
  <o-loading v-model:active="isLoading" :full-page="isFullPage">
    <i class="mdi mdi-reload mdi-36px" style="color: transparent"></i>
  </o-loading>
</template>
<script>
import api from '../api/api'
import { propertyFields } from '@/assets/property-fields'
import { amenities } from '@/assets/amenities'
import { getDefaultForm } from '@/assets/get-default-form'
export default {
  name: 'AvProperties',
  data() {
    return {
      ok: null,
      userId: null,
      error: null,
      major: null,
      isLoading: false,
      isprincipalLoading: false,
      isFullPage: false,
      isCardModalActive: false,
      tituloMensajeModal: null,
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
      openOrCloseAImages: false,
      previewFiles: [],
      previewFilesToDelete: [],
      previewFilesToModify: [],
      listProperties: propertyFields.listProperties,
      form: getDefaultForm(),
      fields: propertyFields,
      editableFields: propertyFields,
      showErrorsAdd: false,
      showErrorsUpdate: {},
      amenities,
    }
  },
  async beforeMount() {
    this.owner = localStorage.getItem('user')
    await this.fetchProperties()
  },
  methods: {
    hasEmptyFields(row) {
      return Object.values(row).some((v) => v === '' || v === null)
    },
    async fetchProperties() {
      try {
        this.isLoading = true
        this.userId = localStorage.getItem('id')
        const getProperties = await api.get(
          `${import.meta.env.VITE_BACKEND_GET_PROPERTIES}?userId=${this.userId}`,
        )
        this.myProperties = getProperties.data
        this.isLoading = false
      } catch {
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
        this.tituloMensajeModal = 'Excelente'
        this.isCardModalActive = true
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.tituloMensajeModal = 'Error'
        this.isLoading = false
      }
    },
    async saveProperty(userId, property) {
      try {
        this.isLoading = true

        // Valida que ningun campo obligatorio sea null, devuelve error como texto bajo los objetos y retorna
        this.showErrorsUpdate[property.codeProperty] = true
        const hasEmpty = this.editableFields.some((f) => !property[f.key])
        if (hasEmpty) {
          this.isLoading = false
          return
        }

        property.userId = userId
        const body = { ...property }
        delete body.image
        delete body._id
        delete body.__v

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

          if (this.previewFilesToDelete.length > 0) {
            const deletedPhotosToModify = await this.deletePhotosToModify(
              userId,
              property.codeProperty,
              this.previewFilesToDelete,
            )

            if (!deletedPhotosToModify) {
              throw new Error('Fotos no cargadas!')
            }

            this.ok = 'Propiedad actualizada!'
          }
          this.ok = 'Propiedad actualizada!'
        }
        // await this.fetchProperties()
        this.isLoading = false
        this.isCardModalActive = true
        this.tituloMensajeModal = 'Excelente'
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.tituloMensajeModal = 'Error'
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
    async deletePhotosToModify(userId, codeProperty, previewFilesToDelete) {
      try {
        this.isLoading = true
        const body = {
          userId: userId,
          codeProperty: codeProperty,
          images: previewFilesToDelete,
        }
        const deleteProfile = await api.post(`${import.meta.env.VITE_BACKEND_POST_DELETE_IMAGES}`, {
          data: body,
        })
        this.isLoading = false
        this.isCardModalActive = true
        return deleteProfile
      } catch (error) {
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    async uploadProperty() {
      try {
        this.isLoading = true

        // Valida que ningun campo obligatorio sea null, devuelve error como texto bajo los objetos y retorna
        this.showErrorsAdd = true
        const hasEmpty = Object.values(this.form).some((v) => v === '' || v === null)
        if (hasEmpty) {
          this.isLoading = false
          return
        }

        const userId = localStorage.getItem('id')
        const owner = localStorage.getItem('user')

        const body = JSON.parse(
          JSON.stringify({
            ...this.form,
            userId,
            owner,
          }),
        )

        const addProperty = await api.post(
          `${import.meta.env.VITE_BACKEND_POST_ADD_PROPERTY}`,
          body,
        )

        if (!addProperty.data) {
          throw new Error('Propiedad no creada!')
        }

        let uploadedPhotos = null

        if (this.previewFiles.length > 0) {
          uploadedPhotos = await this.uploadPhotos(addProperty.data, userId)
        }

        if (!uploadedPhotos) {
          this.openOrCloseAddProperty(!this.openOrClose)
          this.isLoading = false
          this.major =
            'Fotos no cargadas. Puedes modificar tu propiedad y subirlas para terminar de publicarla.'
          this.isCardModalActive = true
          return
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

        // Limpia las variables de form
        this.form = getDefaultForm()
        this.previewFiles = []
        this.isLoading = false
        this.ok = 'La propiedad fue creada y publicada!'
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
    removeImageToDelete(row, index) {
      const deletedImage = row.image[index].fileName
      this.previewFilesToDelete.push(deletedImage)
      row.image.splice(index, 1)
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
.disclaimer {
  margin: 0 auto;
  width: 310px;
  padding: 10px;
  margin-bottom: 40px;
  text-align: justify;
  font-size: 14px;
  background-color: hsla(56, 100%, 57%, 0.452);
  border-radius: 5px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
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
  margin-top: 210px;
  padding: 10px;
}
.add-property {
  padding: 20px;
}
.notification {
  padding: 20px;
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
.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-left: 4px;
}
.error-msg-button {
  color: red;
  font-size: 0.9rem;
  text-align: center;
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
  .td-table {
    width: 400px;
  }
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
  .td-table {
    width: 400px;
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
@media (min-width: 414px) and (max-width: 768px) {
  .td-table {
    width: 400px;
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
  .error-msg-button {
    color: red;
    font-size: 0.9rem;
    text-align: left;
    margin-left: 20px;
    margin-bottom: 5px;
  }
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
