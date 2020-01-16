// 標準
export const data01 =
  '%5B)%3E%1E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG%1E%04'

// GS対応・RS/EOT非対応
export const data02 =
  '%5B)%3E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG'

// 多品一葉
export const data03 =
  '%5B)%3E%1E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG%1E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG%1E%04'

// カスタム
export const data04 = '%5B)%3E%1E06%1DW100%1D1Z200%1E%04'

// 想定結果
export const result01 = {
  '9K': '201XXXXX',
  P: '1234567890',
  '20P': '0',
  Q: '00020',
  V: '3052',
  '3L': ' ',
  K: 'ABCDGEFG',
  '2L': '0',
  '16D': '20200101',
  '9D': '0800',
  '4Q': '001000',
  '12D': '20191231',
  '1L': 'A',
  Z: 'A10;B20;C30;D40;EFG',
}

// 各社固有項目想定結果
export const result02 = {
  '9K': '201XXXXX',
  P: '1234567890',
  '20P': '0',
  Q: '00020',
  V: '3052',
  '3L': ' ',
  K: 'ABCDGEFG',
  '2L': '0',
  '16D': '20200101',
  '9D': '0800',
  '4Q': '001000',
  '12D': '20191231',
  '1L': 'A',
  Z: 'A10;B20;C30;D40;EFG',
  A: '10',
  B: '20',
  C: '30',
  D: '40',
  E: 'FG',
}

// カスタム拡張子想定結果
export const result03 = { W: '100', '1Z': '200' }