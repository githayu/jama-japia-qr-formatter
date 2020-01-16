export const ledgerSheetTypes = {
  '10': {
    label: '現品票',
  },
  '20': {
    label: 'かんばん',
  },
  '21': {
    label: 'かんばん',
    description: '部品メーカー間取引用',
  },
  '30': {
    label: '納品書',
    description: '多品一葉',
  },
  '31': {
    label: '納品書',
    description: '一品一葉',
  },
  '32': {
    label: '納品書',
    description: '部品メーカー間取引用',
  },
  '40': {
    label: '受領書',
    description: '多品一葉',
  },
  '41': {
    label: '受領書',
    description: '一品一葉',
  },
  '50': {
    label: '支給書',
    description: '多品一葉',
  },
  '51': {
    label: '支給書',
    description: '一品一葉',
  },
}

export const workTypes = {
  '0': '適用業務無し',
  '1': '量産部品',
  '2': '生産試作部品',
  '3': 'KD部品',
  '4': '補修品・用品',
}

export const dataIdDetails = {
  V8: {
    key: 'ordererCode',
    label: '発注者コード',
  },
  '5L': {
    key: 'ordererOfficeCode',
    label: '発注者事業所コード',
  },
  V: {
    key: 'contractorCode',
    label: '受注者コード',
  },
  '3L': {
    key: 'contractorOfficeCode',
    label: '受注者事業所コード',
  },
  '7V': {
    key: 'parentOrdererCode',
    label: '親発注者コード',
  },
  '12D': {
    key: 'issueDate',
    label: '発行日',
  },
  P: {
    key: 'partNumber',
    label: '部品番号',
  },
  '20P': {
    key: 'partNumberId',
    label: '部品番号識別',
  },
  Q: {
    key: 'quantity',
    label: '収容数',
  },
  K: {
    key: 'issueNumber',
    label: '発行番号',
  },
  '6V': {
    key: 'supplierCode',
    label: '仕入先コード',
  },
  '11V': {
    key: 'supplierFactoryCode',
    label: '仕入先工場コード',
  },
  '20L': {
    key: 'shipmentLocationCode',
    label: '出荷場所コード',
  },
  '10K': {
    key: 'deliverySlipNumber',
    label: '納品書番号',
  },
  '2L': {
    key: 'deliveryFactoryCode',
    label: '納入先工場コード',
  },
  '1L': {
    key: 'deliveryLocation',
    label: '納入場所',
  },
  '16D': {
    key: 'deliveryOrderDate',
    label: '納入指示日',
  },
  '9D': {
    key: 'deliveryOrderTime',
    label: '納入指示時刻',
  },
  '4Q': {
    key: 'deliveryOrderQuantity',
    label: '納入指示数',
  },
  '2P': {
    key: 'productionType',
    label: '生産区分',
  },
  '9K': {
    key: 'ledgerSheetType',
    label: '帳票区分',
  },
  '17K': {
    key: 'serialNumber',
    label: '識別番号',
  },
  Z: {
    key: 'others',
    label: '固有項目',
  },
}

export const dataIds = Object.keys(dataIdDetails)
export type dataIdsType = keyof typeof dataIdDetails
