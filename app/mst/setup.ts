import { RootStore, RootStoreModel } from './mst'
import { onSnapshot } from 'mobx-state-tree'
import DATA from '../mockData/CliniciansListMock.json'
import * as storage from '../utils/storage'

export const setupRootStore = async () => {
  const ROOT_STATE_STORAGE_KEY = 'root'
  let rootStore: RootStore
  let data: typeof RootStoreModel
  const initialData = {
    cliniciansStore: { clinicians: DATA, isLoggedIn: false },
  }
  try {
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || initialData
    rootStore = RootStoreModel.create(data)
  } catch (e) {
    rootStore = RootStoreModel.create(initialData)
  }
  onSnapshot(rootStore, snapshot =>
    storage.save(ROOT_STATE_STORAGE_KEY, snapshot),
  )
  return rootStore
}
