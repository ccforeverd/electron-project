import { observable, action } from 'mobx'

const noop = () => {}

class StoreView {
  @observable page = ''
  @observable dialog = ''
  @observable content = ''

  callbacks = {}
  dialogProps = {}

  @action gotoEntrance () {
    this.page = 'entrance'
  }

  @action gotoMain () {
    this.page = 'main'
  }

  // 展示上传浮层
  @action dialogUpload (callback = noop) {
    this.dialog = 'upload'
    this.callbacks.upload = callback
  }

  // 展示登录浮层
  @action dialogLogin (callback = noop) {
    this.dialog = 'login'
    this.callbacks.login = callback
  }

  // 展示添加浮层
  @action dialogAppend (callback = noop) {
    this.dialog = 'append'
    this.callbacks.append = callback
  }

  // 展示输入浮层
  @action dialogCustom (dialogProps) {
    this.dialog = 'custom'
    this.dialogProps = dialogProps
  }

  // 关闭浮层
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
