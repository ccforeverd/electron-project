import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Breadcrumb } from 'antd'

@inject('data')
@observer
class MainPath extends Component {
  get list () {
    return this.props.data.current.map(item => item.title)
  }

  render () {
    return (this.list.length > 0 &&
      <Breadcrumb style={{ margin: '16px 0' }}>
        {
          this.list.map(item => (
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    )
  }
}

export default MainPath
