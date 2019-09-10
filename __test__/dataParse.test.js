import { parseImageString } from '../src/du/utils/dataParse'

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

test('parseImageString:image003', () => {
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

test('parseImageString:image006', () => {
  expect(parseImageString(
    `
    44
    44/ ¥2299
    -7-/ 4 155¥¥1¥55

    36 362/3 371/3 38
    ¥3669 ¥3909 ¥4069 ¥4199
    382/3 391/3 40 402/43
    ¥3989 ¥3699 ¥2909 ¥2729
    411/3 42 422/3 431/3
    ¥2829 ¥2889 ¥2889 ¥2979

    44 442/3 451/3 46
    ¥2759 ¥2689 ¥2599 ¥2589
    `
  )).toStrictEqual([
    { size: '36', price: '¥3669' },
    { size: '36.5', price: '¥3909' },
    { size: '37', price: '¥4069' },
    { size: '38', price: '¥4199' },
    { size: '38.5', price: '¥3989' },
    { size: '39', price: '¥3699' },
    { size: '40', price: '¥2909' },
    { size: '40.5', price: '¥2729' },
    { size: '41', price: '¥2829' },
    { size: '42', price: '¥2889' },
    { size: '42.5', price: '¥2889' },
    { size: '43', price: '¥2979' },
    { size: '44', price: '¥2759' },
    { size: '44.5', price: '¥2689' },
    { size: '45', price: '¥2599' },
    { size: '46', price: '¥2589' }
  ])
})

test('parseImageString:image007', () => {
  expect(parseImageString(
    `
    ¥3019 5
    ¥ 3 155555
    38.5 39 40 40.5
    ¥3139 ¥3019 ¥3059 ¥3399
    41 42 42.5 43
    ¥3779 ¥3869 ¥3729 ¥3699
    44 44.5 45 45.5
    ¥3609 ¥3469 ¥3269 ¥3779
    46 47.5 48
    ¥3549 ¥5389 ¥--
    `
  )).toStrictEqual([
    { size: '38.5', price: '¥3139' },
    { size: '39', price: '¥3019' },
    { size: '40', price: '¥3059' },
    { size: '40.5', price: '¥3399' },
    { size: '41', price: '¥3779' },
    { size: '42', price: '¥3869' },
    { size: '42.5', price: '¥3729' },
    { size: '43', price: '¥3699' },
    { size: '44', price: '¥3609' },
    { size: '44.5', price: '¥3469' },
    { size: '45', price: '¥3269' },
    { size: '45.5', price: '¥3779' },
    { size: '46', price: '¥3549' },
    { size: '47.5', price: '¥5389' },
    { size: '48', price: '¥--' }
  ])
})

test('parseImageString:image008', () => {
  expect(parseImageString(
    `
    54
    5.3 . ¥ 929
    - 53 15545555

    35 36 36.5 37
    ¥1179 ¥1269 ¥1549 ¥1669
    37.5 38 39 39.5
    ¥1389 ¥1959 ¥1099 ¥1159

    40 41 41.5 42
    ¥1199 ¥999 ¥949 ¥939
    42.5 43 44 44.5
    ¥1089 ¥999 ¥929 ¥--
    `
  )).toStrictEqual([
    { size: '35', price: '¥1179' },
    { size: '36', price: '¥1269' },
    { size: '36.5', price: '¥1549' },
    { size: '37', price: '¥1669' },
    { size: '37.5', price: '¥1389' },
    { size: '38', price: '¥1959' },
    { size: '39', price: '¥1099' },
    { size: '39.5', price: '¥1159' },
    { size: '40', price: '¥1199' },
    { size: '41', price: '¥999' },
    { size: '41.5', price: '¥949' },
    { size: '42', price: '¥939' },
    { size: '42.5', price: '¥1089' },
    { size: '43', price: '¥999' },
    { size: '44', price: '¥929' },
    { size: '44.5', price: '¥--' }
  ])
})

test('parseImageString:image009', () => {
  expect(parseImageString(
    `
    44
    . 4 ¥ 1829
    44 155¥¥4¥65

    35 36 362/3 371/3

    ¥-- ¥2379 ¥2379 ¥2329

    38 382/3 391/3 40
    ¥2359 ¥2249 ¥2229 ¥2079
    402/3 411/3 42 422/43
    ¥2139 ¥2249 ¥2189 ¥2119
    431/3 44 442/3 451/3
    ¥2169 ¥2019 ¥1949 ¥1949
    `
  )).toStrictEqual([
    { size: '35', price: '¥--' },
    { size: '36', price: '¥2379' },
    { size: '36.5', price: '¥2379' },
    { size: '37', price: '¥2329' },
    { size: '38', price: '¥2359' },
    { size: '38.5', price: '¥2249' },
    { size: '39', price: '¥2229' },
    { size: '40', price: '¥2079' },
    { size: '40.5', price: '¥2139' },
    { size: '41', price: '¥2249' },
    { size: '42', price: '¥2189' },
    { size: '42.5', price: '¥2119' },
    { size: '43', price: '¥2169' },
    { size: '44', price: '¥2019' },
    { size: '44.5', price: '¥1949' },
    { size: '45', price: '¥1949' }
  ])
})

test('parseImageString:image010', () => {
  expect(parseImageString(
    `
    44
    4/ ¥ 1779
    11 4 195¥¥1¥65
    382/43 391/3 40 402/43
    ¥2389 ¥2449 ¥2309 ¥2279
    411/3 42 422/43 431/3
    ¥2259 ¥2259 ¥2269 ¥2249
    44 442/43 451/3 46

    ¥2199 ¥2089 ¥2139 ¥2009
    462/3 471/3 48 48.5
    ¥1889 ¥1829 ¥1779 ¥1789
    `
  )).toStrictEqual([
    { size: '38.5', price: '¥2389' },
    { size: '39', price: '¥2449' },
    { size: '40', price: '¥2309' },
    { size: '40.5', price: '¥2279' },
    { size: '41', price: '¥2259' },
    { size: '42', price: '¥2259' },
    { size: '42.5', price: '¥2269' },
    { size: '43', price: '¥2249' },
    { size: '44', price: '¥2199' },
    { size: '44.5', price: '¥2089' },
    { size: '45', price: '¥2139' },
    { size: '46', price: '¥2009' },
    { size: '46.5', price: '¥1889' },
    { size: '47', price: '¥1829' },
    { size: '48', price: '¥1779' },
    { size: '48.5', price: '¥1789' }
  ])
})
