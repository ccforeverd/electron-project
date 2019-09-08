import { parseImageString } from './dataParse'

test('parseImageString:null', () => {
  expect(parseImageString(``)).toStrictEqual([])
})

