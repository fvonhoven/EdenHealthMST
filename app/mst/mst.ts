import { Instance, types, SnapshotOut } from 'mobx-state-tree'
import Mock from '../mockData/CliniciansListMock.json'

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
  id: types.optional(types.string, ''),
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
  })
  .actions(self => ({
    setClinicians: value => {
      self.clinicians.replace(value)
    },
  }))

export const RootStoreModel = types.model('RootStore').props({
  cliniciansStore: types.optional(CliniciansListModel, {}),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
export type Clinician = Instance<typeof ClinicianModel>
export type CliniciansListModel = Instance<typeof CliniciansListModel>
