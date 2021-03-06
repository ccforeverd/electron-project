
export const captions = [
  '脚长(厘米)', // 0
  'CM尺码', // 1
  '欧码', // 2
  '英码', // 3
  '美码' // 4
]

export const nikeMen = [
  // 脚长(厘米) CM尺码 欧码 英码 美码
  [21.6, 22.5, 36, 3, 3.5],
  [22, 23, 36, 3.5, 4],
  [22.4, 23.5, 36.5, 4, 4.5],
  [22.9, 23.5, 37.5, 4.5, 5],
  [23.3, 24, 38.5, 5.5, 6],
  [24.5, 25, 40, 6, 7],
  [25, 25.5, 40.5, 6.5, 7.5],
  [25.4, 26, 41, 7, 8],
  [25.8, 26.5, 42, 7.5, 8.5],
  [26.2, 27, 42.5, 8, 9],
  [26.7, 27.5, 43, 8.5, 9.5],
  [27.1, 28, 44, 9, 10],
  [27.5, 28.5, 44.5, 9.5, 10.5],
  [27.9, 29, 45, 10.5, 11],
  [28.3, 29.5, 45.5, 10.5, 11.5],
  [28.8, 30, 46, 11, 12],
  [29.2, 30.5, 46.5, 11.5, 12.5],
  [29.6, 31, 47.5, 12, 13],
  [30, 31.5, 48, 12.5, 13.5]
]

export const nikeWomen = [
  // 脚长(厘米) CM尺码 欧码 英码 美码
  [22, 22, 35.5, 2.5, 5],
  [22.4, 22.5, 36, 3, 5.5],
  [22.9, 23, 36.5, 3.5, 6],
  [23.3, 23.5, 37.5, 4, 6.5],
  [23.7, 24, 38, 4.5, 7],
  [24.1, 24.5, 38.5, 5, 7.5],
  [24.5, 25, 39, 5.5, 8],
  [25, 25.5, 40, 6, 8.5],
  [25.4, 26, 40.5, 6.5, 9],
  [25.8, 26.5, 41, 7, 9.5],
  [26.2, 27, 42, 7.5, 10],
  [26.7, 27.5, 42.5, 8, 10.5],
  [27.1, 28, 43, 8.5, 11],
  [27.5, 28.5, 44, 9, 11.5],
  [27.9, 29, 44.5, 9.5, 12]
]

export function matchSize (lib, caption, size) {
  return lib.filter(item => item[caption] === size)
}
