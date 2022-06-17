import { getSnapshot, Instance, types } from 'mobx-state-tree'
import { Clinician, User } from './models'
import CliniciansListMock from './mockData/CliniciansListMock.json'

export const RootStore = types
  .model({
    user: User,
    clinicians: types.optional(types.array(Clinician), CliniciansListMock),
  })
  .views(self => ({
    get sortedClinicians() {
      return self.clinicians.sort((a: Clinician, b: Clinician) =>
        a.firstName > b.firstName ? 1 : -1,
      )
    },
  }))
  .actions(self => ({
    addTodo(id: string, name: string) {
      self.todos.set(id, Todo.create({ id, name }))
    },
  }))

export type RootStoreModel = Instance<typeof RootStore>

export const store: RootStoreModel = RootStore.create({
  user: {},
})

console.log(getSnapshot(store))
