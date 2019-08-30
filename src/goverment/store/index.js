
import StoreData from './data'
import StoreSystem from './system'
import StoreUser from './user'
import StoreView from './view'

export default {
  data: new StoreData(),
  system: new StoreSystem(),
  user: new StoreUser(),
  view: new StoreView()
}
