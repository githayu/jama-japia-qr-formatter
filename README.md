# JAMA･JAPIA QR Formatter

標準帳票ガイドラインで標準化されている QR コードのフォーマットを行います。

## Installation

```sh
# with npm
npm install jama-japia-qr-formatter

# with yarn
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

### 帳票区分

帳票区分の詳細を取得する例

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

| Property  | Type    | Default | Description                                                               |
| --------- | ------- | ------- | ------------------------------------------------------------------------- |
| data \*   | string  |         | QR コード文字列                                                           |
| isGSOnly  | boolean | false   | `true` の場合、GS 制御文字のみでフォーマットを行います。※一品一葉のみ対応 |
| isEncoded | boolean | false   | `true` の場合、`data` 文字列のエンコードを行いません。                    |

`isGSOnly` は、HID コードスキャナーなどでの使用を想定しています。  
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
