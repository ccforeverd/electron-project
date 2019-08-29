import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ContentEmpty from '@components/ContentEmpty'

import ViewProject from '@views/Project'

const priceFromImage = `
_ ¥5009

a

35.5
¥5809

38
¥5409

40.5
¥6589

43
¥8439

iaHR

36
¥6389

38.5
¥5049

41
¥8349

44
¥7489

36.5
¥6289

39
¥5009

42
¥8659

44.5
¥6739

 

37.5
¥6199

40
¥5849

42.5
¥8779`

const numberFromBoss = `
5.5
6
7 x 3
8
8.5 x 3
9
9.5
10
10.5 x 2
11 x 3
11.5 x 2
12`

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

  parseString = () => {
    const result = priceFromImage.split('\n')
      .filter(text => text.trim())
      .reduce((result, item, index, array) => {
        const nextItem = array[index + 1]
        if (nextItem && nextItem.match(/^¥/)) {
          result.push({
            size: item,
            price: nextItem
          })
        }
        return result
      }, [])
      .sort((item1, item2) => {
        return parseFloat(item1.size) - parseFloat(item2.size)
      })
    numberFromBoss.split('\n')
      .filter(text => text.trim())
      .reduce()
    console.log(result)
    return result
  }

  render () {
    const { isEditable } = this.props
    // TODO: content

    return {
      content: (
        !this.isEmpty
          ? <ContentEmpty isEditable={isEditable} />
          : <content>{this.parseString()}</content>
      ),
      project: <ViewProject />
    }[this.props.view.content] || ''
  }
}

export default ViewContent
