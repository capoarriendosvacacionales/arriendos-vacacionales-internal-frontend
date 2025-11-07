// fuera del componente (o en un módulo aparte)
import { amenities } from './amenities'

export function getDefaultForm() {
  // base vacía para campos del formulario
  const form = {
    propertyType: '',
    address: '',
    municipality: '',
    resortTown: '',
    region: '',
    country: '',
    description: '',
    politics: '',
    price: null,
    capacity: null,
    rooms: null,
    bathrooms: null,
    parking: null,
    area: null,
    pool: '',
  }

  // Setea todas las amenities como false
  for (const a of amenities) {
    form[a.key] = false
  }
  return form
}
