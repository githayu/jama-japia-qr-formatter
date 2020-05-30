# JAMA･JAPIA QR Formatter

[![Actions Status](https://github.com/githayu/jama-japia-qr-formatter/workflows/release/badge.svg)](https://github.com/githayu/jama-japia-qr-formatter/actions)
[![npm version](https://badge.fury.io/js/jama-japia-qr-formatter.svg)](https://www.npmjs.com/package/jama-japia-qr-formatter)
[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

標準帳票ガイドラインで策定されている QR コードのフォーマットを行います。

TypeScript をサポートしています。

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

const formatted = new QRFormatter({
  data: '[)>...9K201XXXXX...EOT',
}).format()

if (Array.isArray(formatted)) {
  formatted.forEach((map) => {
    console.log(map.get('9K'))

    // '201XXXXX'
  })
}
```

### 各社固有項目の取得例

各社固有項目を処理するコールバック関数の指定が行なえます。

```ts
import { QRFormatter, DetectDataId } from 'jama-japia-qr-formatter'

// 想定される値
const ZIds = ['9S', '2B'] as const
type ZIds = typeof ZIds[number]

const formatted = new QRFormatter<ZIds>({
  data: '[)>...Z2B12;...EOT',
  formatZ: (str) => {
    // 任意の変換処理
    return str.split(';').reduce<DetectDataId<ZIds>[]>((prev, item) => {
      const id = ZIds.find((id) => item.startsWith(id))

      if (!id) return prev

      const data = decodeURIComponent(item.substr(id.length))

      prev.push({ id, data })

      return prev
    }, [])
  },
}).format()

if (Array.isArray(formatted)) {
  formatted.forEach((map) => {
    console.log(map.get('2B'))

    // '12'
  })
}
```

### カスタムデータ拡張子の取得例

既定のデータ拡張子以外をフォーマットすることが行なえます。

```ts
import { QRFormatter } from 'jama-japia-qr-formatter'

// カスタムデータ拡張子
const customIds = ['1X', '1Y'] as const

const formatted = new QRFormatter({
  data: '[)>...1XYZ...EOT',
  dataIdentifiers: customIds,
}).format()

if (Array.isArray(formatted)) {
  formatted.forEach((map) => {
    console.log(map.get('1X'))

    // 'YZ'
  })
}
```

## API

### QRFormatter

```ts
new QRFormatter<Z, T>(Request, QRFormatZ)
```

#### Request

| Property        | Type            | Default | Description                                                                                                                                                                                    |
| --------------- | --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data \*         | string          |         | QR コード文字列                                                                                                                                                                                |
| isGSOnly        | boolean         | false   | `true` の場合、GS 制御文字のみでフォーマットを行います。                                                                                                                                       |
| isEncoded       | boolean         | false   | `true` の場合、`data` 文字列のエンコードを行いません。                                                                                                                                         |
| formatZ         | QRFormatZ       |         | [各社固有項目](#%e5%90%84%e7%a4%be%e5%9b%ba%e6%9c%89%e9%a0%85%e7%9b%ae%e3%81%ae%e5%8f%96%e5%be%97%e4%be%8b) のフォーマットを行う場合に設定します。                                             |
| dataIdentifiers | dataIdentifiers |         | [カスタムデータ拡張子](#%e3%82%ab%e3%82%b9%e3%82%bf%e3%83%a0%e3%83%87%e3%83%bc%e3%82%bf%e6%8b%a1%e5%bc%b5%e5%ad%90%e3%81%ae%e5%8f%96%e5%be%97%e4%be%8b) のフォーマットを行う場合に指定します。 |

`isGSOnly` は、HID コードスキャナーなどでの使用を想定しています。※一品一葉のみ対応

`isEncoded` を有効にした場合は、事前に文字列のエンコードを行ってください。

#### QRFormatZ

```ts
(z: string, map: Map<DataIds, string>): {
  id: string      // Map Key
  data: string    // Map Value
}[]
```

`z` 変数をコールバック関数で処理することで Map オブジェクトに追加されます。

`id` と `data` プロパティのオブジェクト配列を返す必要があります。

`map` 変数には通常のフォーマット済み Map オブジェクトが含まれます。

### QRFormatter.format

```ts
(): string | Map<DataIds, string>[]
```

フォーマットが行えない場合は、入力文字列をそのまま返却します。

#### DataIds

- Type: `string`
- Value: `9K`, `P`, `20P` などの定義済みデータ拡張子及び各社固有項目やカスタムデータ拡張子

### QRFormatter.detectLedgerSheet

詳細な帳票区分の取得が行えます。

```ts
(data: string): {         // データ拡張子: 9K
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
