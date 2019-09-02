
export const regMutiply = /[*xX]/
export const regSize = /\d{1,2}\.?5?/

export function parseImageString (string) {
  return string.split('\n')
    .filter(text => text.trim())
    .map(text => text.trim())
    .reduce((result, item, index, array) => {
      const nextItem = (array[index + 1] || '').trim()
      if (nextItem.match(/^¥/)) {
        result.push({
          size: item.trim(),
          price: nextItem
        })
      }
      return result
    }, [])
    .sort((item1, item2) => {
      return parseFloat(item1.size) - parseFloat(item2.size)
    })
}

export function parseNumbersString (string) {
  return string.split('\n')
    .filter(text => text.trim())
    .map(text => text.trim())
    .reduce((result, item) => {
      if (item.match(regMutiply)) {
        const array = item.split(regMutiply)
        result.push({
          size: array[0].trim(),
          number: array[1].trim()
        })
      } else if (item.match(regSize)) {
        result.push({
          size: item,
          number: '1'
        })
      }
      return result
    }, [])
}
