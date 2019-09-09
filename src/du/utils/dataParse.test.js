import { parseImageString } from './dataParse'

test('parseImageString:null', () => {
  expect(parseImageString(``)).toStrictEqual([])
})

test('parseImageString:image001', () => {
  expect(parseImageString(
    `
    ¥839
    73254 4 525     . 1 ¥¥ ¥55
    36 362/43 371/3 38
    ¥-- ¥-- ¥-- ¥--
    382/3 391/3 40 402/3
    ¥-- ¥919 ¥869 ¥839
    411/3 42 422/3 431/3
    ¥869 ¥889 ¥949 ¥979
    44 442/3 451/3 46
    ¥1049 ¥1149 ¥1199 ¥1279
    `
  )).toStrictEqual([
    { size: '36', price: '¥--' },
    { size: '36.5', price: '¥--' },
    { size: '37', price: '¥--' },
    { size: '38', price: '¥--' },
    { size: '38.5', price: '¥--' },
    { size: '39', price: '¥919' },
    { size: '40', price: '¥869' },
    { size: '40.5', price: '¥839' },
    { size: '41', price: '¥869' },
    { size: '42', price: '¥889' },
    { size: '42.5', price: '¥949' },
    { size: '43', price: '¥979' },
    { size: '44', price: '¥1049' },
    { size: '44.5', price: '¥1149' },
    { size: '45', price: '¥1199' },
    { size: '46', price: '¥1279' }
  ])
})

test('parseImageString:image002', () => {
  expect(parseImageString(
    `
    54
    4 ¥1859
    55
    4 5 5195 46655 53 55375133
    40 40.5 41 42
    ¥2549 ¥2509 ¥2569 ¥2529
    42.5 43 44 44.5
    ¥2459 ¥2369 ¥2149 ¥1929
    45 45.5 46 47.5
    ¥1819 ¥1859 ¥1859 ¥1889
    2415955315
    / ¥21 19
    5454
    `
  )).toStrictEqual([
    { size: '40', price: '¥2549' },
    { size: '40.5', price: '¥2509' },
    { size: '41', price: '¥2569' },
    { size: '42', price: '¥2529' },
    { size: '42.5', price: '¥2459' },
    { size: '43', price: '¥2369' },
    { size: '44', price: '¥2149' },
    { size: '44.5', price: '¥1929' },
    { size: '45', price: '¥1819' },
    { size: '45.5', price: '¥1859' },
    { size: '46', price: '¥1859' },
    { size: '47.5', price: '¥1889' }
  ])
})

test('parseImageString:003', () => {
  expect(parseImageString(
    `
    3 ¥ 131 9
    51.3931 155¥¥7¥65
    35.5 36 36.5 37.5
    ¥4879 ¥3399 ¥3219 ¥3149
    38 38.5 39 40
    ¥2969 ¥2819 ¥2669 ¥2629
    40.5 41 42 42.5
    ¥2509 ¥2449 ¥2419 ¥2329
    43 44 44.5 45
    ¥2139 ¥1739 ¥1539 ¥1519
    45.5 46 47 47.5
    ¥1489 5559-5363 ¥1319
    `
  )).toStrictEqual([
    { size: '35.5', price: '¥4879' },
    { size: '36', price: '¥3399' },
    { size: '36.5', price: '¥3219' },
    { size: '37.5', price: '¥3149' },
    { size: '38', price: '¥2969' },
    { size: '38.5', price: '¥2819' },
    { size: '39', price: '¥2669' },
    { size: '40', price: '¥2629' },
    { size: '40.5', price: '¥2509' },
    { size: '41', price: '¥2449' },
    { size: '42', price: '¥2419' },
    { size: '42.5', price: '¥2329' },
    { size: '43', price: '¥2139' },
    { size: '44', price: '¥1739' },
    { size: '44.5', price: '¥1539' },
    { size: '45', price: '¥1519' },
    { size: '45.5', price: '¥1489' },
    { size: '47.5', price: '¥1319' }
  ])
})

test('parseImageString:image004', () => {
  expect(parseImageString(
    `
    54
    9. ¥1449
    4.4.5 5 155555
    39 40 40.5 41
    ¥-- ¥1799 ¥1799 ¥1789
    42 42.5 43 44
    ¥1789 ¥1789 ¥1749 ¥1609
    44.5 45 45.5 46
    ¥1559 ¥1519 ¥1479 ¥1509
    47 47.5 48 48.5
    ¥1549 ¥1449 ¥-- ¥1599    
    `
  )).toStrictEqual([
    { size: '39', price: '¥--' },
    { size: '40', price: '¥1799' },
    { size: '40.5', price: '¥1799' },
    { size: '41', price: '¥1789' },
    { size: '42', price: '¥1789' },
    { size: '42.5', price: '¥1789' },
    { size: '43', price: '¥1749' },
    { size: '44', price: '¥1609' },
    { size: '44.5', price: '¥1559' },
    { size: '45', price: '¥1519' },
    { size: '45.5', price: '¥1479' },
    { size: '46', price: '¥1509' },
    { size: '47', price: '¥1549' },
    { size: '47.5', price: '¥1449' },
    { size: '48', price: '¥--' },
    { size: '48.5', price: '¥1599' }
  ])
})

test('parseImageString:image005', () => {
  expect(parseImageString(
    `
    951441539 45

    3 54 155551545

    39 40 40.5 41

    ¥-- ¥1689 ¥1679 ¥1729

    42 42.5 43 44
    ¥1739 ¥1679 ¥1699 ¥1709
    44.5 45 45 45.5
    ¥1699 ¥1639 ¥1769 ¥--
    47.5 48

    ¥1899 ¥--

    `
  )).toStrictEqual([
    { size: '39', price: '¥--' },
    { size: '40', price: '¥1689' },
    { size: '40.5', price: '¥1679' },
    { size: '41', price: '¥1729' },
    { size: '42', price: '¥1739' },
    { size: '42.5', price: '¥1679' },
    { size: '43', price: '¥1699' },
    { size: '44', price: '¥1709' },
    { size: '44.5', price: '¥1699' },
    { size: '45', price: '¥1639' },
    { size: '46', price: '¥1769' },
    { size: '46.5', price: '¥--' },
    { size: '47.5', price: '¥1899' },
    { size: '48', price: '¥--' }
  ])
})
