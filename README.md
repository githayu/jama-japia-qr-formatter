# JAMA･JAPIA QR Formatter

[![Actions Status](https://github.com/githayu/jama-japia-qr-formatter/workflows/release/badge.svg)](https://github.com/githayu/jama-japia-qr-formatter/actions)
[![npm version](https://badge.fury.io/js/jama-japia-qr-formatter.svg)](https://www.npmjs.com/package/jama-japia-qr-formatter)
[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

標準帳票ガイドラインで策定されている QR コードのフォーマットを行います。

## Installation

### npm

```sh
npm install jama-japia-qr-formatter
```

### yarn

```sh
yarn add jama-japia-qr-formatter
```

## Usage

### 基本的な例

```ts
import { QRFormatter } from 'jama-japia-qr-formatter'

const formatted = QRFormatter({
  data: '[)>...EOT',
})

if (Array.isArray(formatted)) {
  formatted.forEach((map) => {
    console.log(map.get('9K'))

    // {
    //   key: 'ledgerSheetType',
    //   data: '201XXXXX',
    //   label: '帳票区分',
    // }
  })
} else {
  console.log(formatted)
}
```

### 詳細な帳票区分の取得例

```ts
import { detectLedgerSheet } from 'jama-japia-qr-formatter'

const type = detectLedgerSheet('201XXXXX')

console.log(type)

// {
//   a: {
//     id: '20',
//     label: 'かんばん',
//   },
//   b: {
//     id: '1',
//     label: '量産部品',
//   },
//   c: {
//     id: 'XXXXX',
//   }
// }
```

## API

### QRFormatter

```ts
QRFormatter(QRFormatterProps): string | Map<dataIdsType, {
  key: string     // 名
  data: string    // 値
  label: string   // 日本語ラベル
}>[]
```

#### QRFormatterProps

| Property  | Type    | Default | Description                                              |
| --------- | ------- | ------- | -------------------------------------------------------- |
| data \*   | string  |         | QR コード文字列                                          |
| isGSOnly  | boolean | false   | `true` の場合、GS 制御文字のみでフォーマットを行います。 |
| isEncoded | boolean | false   | `true` の場合、`data` 文字列のエンコードを行いません。   |

`isGSOnly` は、HID コードスキャナーなどでの使用を想定しています。※一品一葉のみ対応

`isEncoded` を有効にした場合は、事前に文字列のエンコードを行ってください。

フォーマットが行えない場合は、入力文字列をそのまま返却します。

#### dataIdsType

- Type: `string`
- Value: `9K`, `P`, `20P` などのデータ拡張子

### detectLedgerSheet

```ts
detectLedgerSheet(data: string): {
  a: {
    id: string            // 値
    label?: string        // 日本語ラベル
    description?: string  // 説明
  }
  b: {
    id: string
    label?: string
  }
  c: {
    id: string
  }
}
```

- a: 帳票区分
- b: 適用業務区分
- c: 各社自由設定域

## License

The MIT License.
