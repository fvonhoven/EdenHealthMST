import { ApiResponse, create } from 'apisauce'
import { Instance, types, SnapshotOut, applySnapshot } from 'mobx-state-tree'
import Mock from '../mockData/CliniciansListMock.json'
import { sortedClinicians, filteredClinicians } from '../utils/appUtils'

export type Coordinates = string[]

const AddressModel = types.model('Address', {
  number: types.optional(types.string, ''),
  street: types.optional(types.string, ''),
  suffix: types.optional(types.string, ''),
  formatted_street: types.optional(types.string, ''),
  city: types.optional(types.string, ''),
  county: types.optional(types.string, ''),
  state: types.optional(types.string, ''),
  zip: types.optional(types.string, ''),
  country: types.optional(types.string, ''),
})

const ClinicianModel = types.model('Clinician', {
  id: types.optional(types.identifier, ''),
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  fullName: types.optional(types.string, ''),
  imageUrl: types.optional(types.string, ''),
  bio: types.optional(types.string, ''),
  email: types.optional(types.string, ''),
  phone: types.optional(types.string, ''),
  location: types.array(types.string),
  address: AddressModel,
})

export const CliniciansListModel = types
  .model('CliniciansListModel')
  .props({
    clinicians: types.optional(types.array(ClinicianModel), []),
    favorite: types.maybe(types.reference(ClinicianModel)),
    filtering: false,
    userLocationState: '',
  })
  .actions(self => ({
    setFavorite: value => {
      const sameFav = value.id === self.favorite?.id
      if (sameFav) {
        self.favorite = undefined
      } else {
        self.favorite = value
      }
    },
    setIsFiltering: value => {
      self.filtering = value
    },
    setUserLocationState: value => {
      self.userLocationState = value
    },
  }))
  .actions(self => ({
    fetchUserLocationState: async (location: Coordinates) => {
      const api = create({ baseURL: 'https://api.geocod.io/v1.7' })
      const response: ApiResponse<any> = await api.post('/reverse', {
        api_key: 'a133778d1636866d002aa3a7982a601b6da323a',
        ...location,
      })
      try {
        const { state } =
          response.data.results[0].response?.results[0]?.address_components
        self.setUserLocationState('NY')
        self.setIsFiltering(true)
      } catch {
        return { kind: 'bad-data' }
      }
    },
  }))
  .views(self => ({
    get filteredClinicians() {
      return filteredClinicians(self.clinicians.slice())
    },
    get sortedClinicians() {
      return sortedClinicians(self.clinicians.slice())
    },
  }))

export const RootStoreModel = types.model('RootStore').props({
  cliniciansStore: types.optional(CliniciansListModel, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
export type Clinician = Instance<typeof ClinicianModel>
export type CliniciansListModel = Instance<typeof CliniciansListModel>
