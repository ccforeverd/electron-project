import { observable, action } from 'mobx'

class StoreView {
  @observable page = ''

  @action gotoEntrance () {
    this.page = 'entrance'
  }

  @action gotoMain () {
    this.page = 'main'
  }
}

export default StoreView
