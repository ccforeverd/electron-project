import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ContentEmpty from '@components/ContentEmpty'

import ViewProject from '@views/Project'

@inject('data')
@inject('view')
@observer
class ViewContent extends Component {

  get item () {
    const { current } = this.props.data
    return current[current.length - 1] || null
  }

  get isEmpty () {
    return this.item ? this.item.content.length === 0 : true
  }

  render () {
    const { isEditable } = this.props
    console.log(this.item, this.isEmpty)

    return {
      content: (
        this.isEmpty
        ? <ContentEmpty isEditable={isEditable} />
        : <content>222</content>
      ),
      project: <ViewProject />
    }[this.props.view.content] || ''
  }
}

export default ViewContent
