import { observable, action } from 'mobx'

const noop = () => {}

class StoreView {
  @observable page = ''
  @observable dialog = ''
  @observable content = ''

  callbacks = {}

  @action gotoEntrance () {
    this.page = 'entrance'
  }

  @action gotoMain () {
    this.page = 'main'
  }

  @action dialogUpload (callback = noop) {
    this.dialog = 'upload'
    this.callbacks.upload = callback
  }

  @action dialogLogin (callback = noop) {
    this.dialog = 'login'
    this.callbacks.login = callback
  }

  @action closeDialog () {
    this.dialog = ''
  }

  @action contentShow () {
    this.content = 'content'
  }

  @action contentProject () {
    this.content = 'project'
  }

  @action clearContent () {
    this.content = ''
  }
}

export default StoreView
