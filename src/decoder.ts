import {
  dataIds,
  ledgerSheetTypes,
  workTypes,
  dataIdsType,
} from './identifiers'

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')

const MESSAGE_HEADER = escapeRegExp('%5B)%3E%1E')
const FORMAT_HEADER = escapeRegExp('06%1D')
const RS = escapeRegExp('%1E')
const GS = escapeRegExp('%1D')
const EOT = escapeRegExp('%04')

export interface QRDecoderProps {
  data: string
  isGSOnly?: boolean
  isEncoded?: boolean
}

/**
 * QR文字列をデコード
 */
const QRDecoder = ({ data, isGSOnly, isEncoded }: QRDecoderProps) => {
  const reqData = isEncoded ? data : encodeURIComponent(data)
  const result = isGSOnly ? decodeGroupSeparator(reqData) : decodeCore(reqData)

  return !result ? data : result
}

/**
 * 多品一葉のメッセージデータを取得する
 */
const decodeCore = (str: string) => {
  // メッセージエンベロープの探索
  const messageEnvelope = str.match(new RegExp(`${MESSAGE_HEADER}(.+)${EOT}`))

  if (!messageEnvelope) {
    return
  }

  // メッセージエンベロープの取得
  const formatEnvelopes = messageEnvelope.pop()

  if (!formatEnvelopes) {
    return
  }

  // フォーマットエンベロープの探索
  const formatEnvelope = formatEnvelopes.match(
    new RegExp(`(?<=${FORMAT_HEADER}).+?(?=${RS})`, 'g')
  )

  if (!formatEnvelope) {
    return
  }

  // フォーマットデータの取得
  return formatEnvelope.map((data) =>
    data.split(GS).reduce((map, item) => {
      const dataId = detectDataId(item)

      if (dataId) {
        const { id, ...values } = dataId

        map.set(id, values)
      }

      return map
    }, new Map<dataIdsType, detectedType>())
  )
}

/**
 * HIDコードスキャナー (GS)
 * 先頭のフォーマットエンベロープのみ取得
 */
const decodeGroupSeparator = (str: string) => {
  /**
   * フォーマットエンベロープの探索
   * [)>RS06
   */
  const formatMatch = str.match(/^%5B\)%3E06(.+)$/)

  if (!formatMatch) {
    return
  }

  // フォーマットエンベロープを取得
  const formatData = formatMatch.pop()

  if (!formatData) {
    return
  }

  return [
    formatData.split(GS).reduce((map, item) => {
      const dataId = detectDataId(item)

      if (dataId) {
        const { id, ...values } = dataId
        map.set(id, values)
      }

      return map
    }, new Map<dataIdsType, detectedType>()),
  ]
}

/**
 * 帳票区分を取得
 * @param data
 */
export const detectLedgerSheet = (
  data: string
): {
  a: { id: string; label?: string; description?: string }
  b: { id: string; label?: string }
  c: { id: string }
} => {
  const a = data.substr(0, 2) as keyof typeof ledgerSheetTypes
  const b = data.substr(2, 1) as keyof typeof workTypes
  const c = data.substr(3, 5)

  return {
    a: { id: a, ...ledgerSheetTypes[a] },
    b: { id: b, label: workTypes[b] },
    c: { id: c },
  }
}

export interface detectedType {
  key: string
  data: string
  label: string
}

interface detectDataId {
  (data: string):
    | (detectedType & {
        id: dataIdsType
      })
    | undefined
}

/**
 * データ拡張子をフォーマット
 */
const detectDataId: detectDataId = (data) => {
  const [id, info] =
    Object.entries(dataIds).find(([id]) => data.startsWith(id)) || []

  if (!id || !info) {
    return
  }

  const payload = decodeURIComponent(data.substr(id.length))

  return {
    id: id as dataIdsType,
    key: info.key,
    data: payload,
    label: info.label,
  }
}

export default QRDecoder
