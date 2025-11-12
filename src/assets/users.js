import { listMunicipalities } from './municipalities'
import { listResortTowns } from './resort-town'
import { listRegions } from './regions'
import { listCountries } from './countries'
import { listBanks } from './banks'
import { listAccountTypes } from './account-types'

export const userFields = [
  { key: 'password1', label: 'Escribe una contraseña:', type: 'password' },
  { key: 'password2', label: 'Repite la contraseña:', type: 'password' },
  { key: 'email', label: 'Correo electrónico:', type: 'email' },
  { key: 'phone', label: 'Fono:', type: 'email' },
  { key: 'firstName', label: 'Nombres:', type: 'text' },
  { key: 'lastName', label: 'Apellidos:', type: 'text' },
  { key: 'birthDate', label: 'Fecha de nacimiento:', type: 'date' },
  { key: 'dni', label: 'RUT/Pasaporte:', type: 'text' },
  { key: 'address', label: 'Dirección:', type: 'text' },
  { key: 'municipality', label: 'Comuna:', type: 'select', options: listMunicipalities },
  { key: 'resortTown', label: 'Ciudad:', type: 'select', options: listResortTowns },
  { key: 'region', label: 'Región:', type: 'select', options: listRegions },
  { key: 'country', label: 'País:', type: 'select', options: listCountries },
  { key: 'bank', label: 'Banco:', type: 'select', options: listBanks },
  { key: 'accountNumber', label: 'Número de cuenta:', type: 'text' },
  { key: 'accountType', label: 'Tipo de cuenta', type: 'select', options: listAccountTypes },
]
