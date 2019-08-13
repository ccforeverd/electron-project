import { observable, action } from 'mobx'

class StoreUser {
  @observable username = ''
  @observable role = 'default' // default, admin

  ROLE_ADMIN = 'admin'
  ROLE_DEFAULT = 'default'

  @action set (name, role) {
    this.name = name
    this.role = role
  }
}

export default StoreUser
