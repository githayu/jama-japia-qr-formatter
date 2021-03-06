import { dataIds, ledgerSheetTypes, workTypes, DataIds } from './identifiers'

const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')

const MESSAGE_HEADER = escapeRegExp('%5B)%3E%1E')
const FORMAT_HEADER = escapeRegExp('06%1D')
const RS = escapeRegExp('%1E')
const GS = escapeRegExp('%1D')
const EOT = escapeRegExp('%04')

export type DetectDataId<T> = {
  id: DataIds | T
  data: string
}

type dataIdsKeys<T> = T | DataIds

export type QRFormatterRequest<Z, T = DataIds> = {
  data: string
  isGSOnly?: boolean
  isEncoded?: boolean
  dataIdentifiers?: Readonly<T[]>
  formatZ?: QRFormatZ<Z, T>
}

export type QRFormatZ<Z, T = DataIds> = (
  z: string,
  map: Map<dataIdsKeys<T> | Z[][number], string>
) => DetectDataId<Z[][number]>[]

class QRFormatter<Z, T = DataIds> {
  get data() {
    return this.req.isEncoded
      ? this.req.data
      : encodeURIComponent(this.req.data)
  }

  get dataIds() {
    return Array.isArray(this.req.dataIdentifiers)
      ? [...dataIds, ...this.req.dataIdentifiers]
      : dataIds
  }

  constructor(public readonly req: QRFormatterRequest<Z, T>) {}

  /**
   * QR文字列をフォーマット
   */
  format() {
    const result = this.req.isGSOnly
      ? this.formatGroupSeparator()
      : this.formatAllSeparator()

    return !result ? this.data : result
  }

  /**
   * 多品一葉のメッセージデータを取得する
   */
  formatAllSeparator() {
    // メッセージエンベロープの探索
    const messageEnvelope = this.data.match(
      new RegExp(`${MESSAGE_HEADER}(.+)${EOT}`)
    )

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
      new RegExp(`${FORMAT_HEADER}.+?${RS}`, 'g')
    )

    if (!formatEnvelope) {
      return
    }

    // フォーマットデータの取得
    const result = formatEnvelope.map((data) =>
      this.createMap(
        data
          .replace(new RegExp(`^${FORMAT_HEADER}`), '')
          .replace(new RegExp(`${RS}$`), '')
          .split(GS)
      )
    )

    return result
  }

  /**
   * GS 制御文字のみのフォーマット
   * 一品一葉のみ対応
   */
  formatGroupSeparator() {
    /**
     * フォーマットエンベロープの探索
     * [)>RS06
     */
    const formatMatch = this.data.match(/^%5B\)%3E06(.+)$/)

    if (!formatMatch) {
      return
    }

    // フォーマットエンベロープを取得
    const formatData = formatMatch.pop()

    if (!formatData) {
      return
    }

    return [this.createMap(formatData.split(GS))]
  }

  createMap(data: string[]) {
    const map = data.reduce((map, item) => {
      const dataId = this.detectDataId(item)

      if (dataId) {
        const { id, data } = dataId

        map.set(id, data)
      }

      return map
    }, new Map<dataIdsKeys<T> | Z[][number], string>())

    if (this.req.formatZ && map.has('Z')) {
      const zRes = this.req.formatZ(map.get('Z') ?? '', map)

      if (Array.isArray(zRes)) {
        zRes.forEach(({ id, data }) => map.set(id, data))
      }
    }

    return map
  }

  /**
   * データ拡張子のフォーマット
   */
  detectDataId(data: string): DetectDataId<T> | undefined {
    const id = this.dataIds.find((id): id is string =>
      typeof id === 'string' ? data.startsWith(id) : false
    )

    if (!id) {
      return
    }

    const payload = decodeURIComponent(data.substr(id.length))

    return {
      id: id as dataIdsKeys<T>,
      data: payload,
    }
  }

  /**
   * 帳票区分を取得
   */
  static detectLedgerSheet(
    data: string
  ): {
    a: { id: string; label?: string; description?: string }
    b: { id: string; label?: string }
    c: { id: string }
  } {
    const a = data.substr(0, 2) as keyof typeof ledgerSheetTypes
    const b = data.substr(2, 1) as keyof typeof workTypes
    const c = data.substr(3, 5)

    return {
      a: { id: a, ...ledgerSheetTypes[a] },
      b: { id: b, label: workTypes[b] },
      c: { id: c },
    }
  }
}

export default QRFormatter
