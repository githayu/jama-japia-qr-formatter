// 標準
const standard =
  '%5B)%3E%1E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG%1E%04'

// GS対応・RS/EOT非対応
const GSOnly =
  '%5B)%3E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG'

// 多品一葉
const multiple =
  '%5B)%3E%1E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG%1E06%1D9K201XXXXX%1DP1234567890%1D20P0%1DQ00020%1DV3052%1D3L%20%1DKABCDGEFG%1D2L0%1D16D20200101%1D9D0800%1D4Q001000%1D12D20191231%1D1LA%1DZA10%3BB20%3BC30%3BD40%3BEFG%1E%04'

// 想定結果
const result = {
  '9K': { key: 'ledgerSheetType', data: '201XXXXX', label: '帳票区分' },
  P: { key: 'partNumber', data: '1234567890', label: '部品番号' },
  '20P': { key: 'partNumberId', data: '0', label: '部品番号識別' },
  Q: { key: 'quantity', data: '00020', label: '収容数' },
  V: { key: 'contractorCode', data: '3052', label: '受注者コード' },
  '3L': {
    key: 'contractorOfficeCode',
    data: ' ',
    label: '受注者事業所コード',
  },
  K: { key: 'issueNumber', data: 'ABCDGEFG', label: '発行番号' },
  '2L': {
    key: 'deliveryFactoryCode',
    data: '0',
    label: '納入先工場コード',
  },
  '16D': {
    key: 'deliveryOrderDate',
    data: '20200101',
    label: '納入指示日',
  },
  '9D': {
    key: 'deliveryOrderTime',
    data: '0800',
    label: '納入指示時刻',
  },
  '4Q': {
    key: 'deliveryOrderQuantity',
    data: '001000',
    label: '納入指示数',
  },
  '12D': { key: 'issueDate', data: '20191231', label: '発行日' },
  '1L': { key: 'deliveryLocation', data: 'A', label: '納入場所' },
  Z: {
    key: 'others',
    data: 'A10;B20;C30;D40;EFG',
    label: '固有項目',
  },
}

export default {
  GSOnly,
  standard,
  multiple,
  result,
}
