// src/data/propertyFields.js

import { listProperties } from './properties'
import { listMunicipalities } from './municipalities'
import { listResortTowns } from './resort-town'
import { listRegions } from './regions'
import { listCountries } from './countries'
import { listPools } from './pool'

export const propertyFields = [
  {
    key: 'propertyType',
    label: 'Tipo de propiedad',
    type: 'select',
    options: listProperties,
  },
  { key: 'address', label: 'Dirección', type: 'text' },
  { key: 'municipality', label: 'Comuna', type: 'select', options: listMunicipalities },
  { key: 'resortTown', label: 'Ciudad', type: 'select', options: listResortTowns },
  { key: 'region', label: 'Región', type: 'select', options: listRegions },
  { key: 'country', label: 'País', type: 'select', options: listCountries },
  { key: 'description', label: 'Descripción', type: 'text' },
  { key: 'politics', label: 'Políticas de uso', type: 'text' },
  { key: 'price', label: 'Precio', type: 'number' },
  { key: 'capacity', label: 'Capacidad', type: 'number' },
  { key: 'rooms', label: 'Habitaciones', type: 'number' },
  { key: 'bathrooms', label: 'Baños', type: 'number' },
  { key: 'parking', label: 'Estacionamientos', type: 'number' },
  { key: 'area', label: 'Superficie (mts²)', type: 'number' },
  {
    key: 'pool',
    label: 'Piscina (No/Privada/Compartida)',
    type: 'select',
    options: listPools,
  },
]
