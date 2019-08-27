import { observable, action } from 'mobx'

class StoreUser {
  @observable username = ''
  // @observable role = 'default' // default, admin
  @observable role = process.env.NODE_ENV === 'development' ? 'admin' : 'default' // 测试

  ROLE_ADMIN = 'admin'
  ROLE_DEFAULT = 'default'

  @action set (name, role) {
    this.name = name
    this.role = role
  }

  @action logout () {
    this.name = ''
    this.role = this.ROLE_DEFAULT
  }
}

export default StoreUser
