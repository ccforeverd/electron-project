
export const regMutiply = /[*xX]/
export const regSize = /\d{1,2}\.?5?/
export const resBlank = / +/

export function parseImageString (string) {
  return string
    // 56读取瑕疵
    .replace('45 45 45.5', '45 46 46.5')
    // 苹果下横线瑕疵
    .replace(/(\d+)-(\d+)/g, (s, s1, s2) => `${s1} ${s2}`)
    // 阿迪读取瑕疵
    .replace('362/43', '362/3')
    .replace('402/43', '402/3')
    // 阿迪转耐克
    .replace('362/3', '36.5')
    .replace('371/3', '37')
    .replace('382/3', '38.5')
    .replace('391/3', '39')
    .replace('402/3', '40.5')
    .replace('411/3', '41')
    .replace('422/3', '42.5')
    .replace('431/3', '43')
    .replace('442/3', '44.5')
    .replace('451/3', '45')
    .replace(/^[\s\S\d -¥]*$/, s => !console.log(s) && s) // 打印当前字符串
    // 转数组处理
    .split(/\n/)
    .map(text => text.trim()) // 去掉前后空格
    .filter(text => Boolean(text)) // 去掉空白行
    // .filter(text => text.split(resBlank).length === 4) // 去掉不是4项的行
    // .map(text => !console.log(text) && text) // 打印当前数组
    .reduce((result, item, index, array) => { // 转数组
      const nextItem = (array[index + 1] || '').trim()

      // 最后一行
      if (!nextItem) {
        return result
      }

      // 以3或4开头的行, 认为是尺码
      if (item.match(/^[34]/) && nextItem.match(/^¥/)) {
        const sizes = item.split(resBlank)
        const prices = nextItem.split(resBlank)
        result = result.concat(sizes.map((size, index) => ({ size, price: prices[index] })))
      }
      // if (nextItem.match(/^¥/)) {
      //   result.push({
      //     size: item.trim(),
      //     price: nextItem
      //   })
      // }
      return result
    }, [])
    .filter(item => item.price && item.price[0] === '¥')
    .sort((item1, item2) => {
      return parseFloat(item1.size) - parseFloat(item2.size)
    })
    // .map(text => !console.log(text) && text) // 打印当前数组
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
