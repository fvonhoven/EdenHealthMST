import { RootStoreModel } from './mst'

export const setupRootStore = async () => {
  const rootStore = RootStoreModel.create({})
  return rootStore
}
