import QRFormatter, { DetectDataId } from '../formatter'
import * as mocks from './mocks'

describe('formatter', () => {
  test('標準', () => {
    const result = new QRFormatter({
      data: mocks.data01,
      isEncoded: true,
    }).format()

    expect(Array.isArray(result)).toBeTruthy()

    if (Array.isArray(result)) {
      const data = Object.fromEntries(result[0])

      expect(data).toEqual(mocks.result01)
    }
  })

  test('GS制御文字のみ', () => {
    const result = new QRFormatter({
      data: mocks.data02,
      isGSOnly: true,
      isEncoded: true,
    }).format()

    expect(Array.isArray(result)).toBeTruthy()

    if (Array.isArray(result)) {
      const data = Object.fromEntries(result[0])

      expect(data).toEqual(mocks.result01)
    }
  })

  test('多品一葉', () => {
    const result = new QRFormatter({
      data: mocks.data03,
      isEncoded: true,
    }).format()

    expect(result.length).toBe(2)
  })

  test('固有項目', () => {
    const zIds = {
      A: 'ABC',
      B: 'BCD',
      C: 'CDE',
      D: 'DEF',
      E: 'EFG',
    }

    const zFormatter = (str: string) => {
      const ids = str.split(';').map((item) => {
        const [id, info] =
          Object.entries(zIds).find(([id]) => item.startsWith(id)) ?? []

        if (!id || !info) return

        const data = decodeURIComponent(item.substr(id.length))

        return {
          id,
          data,
        }
      })

      return ids.filter(
        (item): item is DetectDataId<keyof typeof zIds> => !!item
      )
    }

    const result = new QRFormatter<typeof zIds>(
      {
        data: mocks.data01,
        isEncoded: true,
        Z: zIds,
      },
      zFormatter
    ).format()

    expect(Array.isArray(result)).toBeTruthy()

    if (Array.isArray(result)) {
      const data = Object.fromEntries(result[0])

      expect(data).toEqual(mocks.result02)
    }
  })

  test('カスタム拡張子', () => {
    type customIds = 'W' | '1Z'
    const customIds: customIds[] = ['W', '1Z']

    const result = new QRFormatter<{}, customIds>({
      data: mocks.data04,
      isEncoded: true,
      dataIdentifiers: customIds,
    }).format()

    expect(Array.isArray(result)).toBeTruthy()

    if (Array.isArray(result)) {
      const data = Object.fromEntries(result[0])

      expect(data).toEqual(mocks.result03)
    }
  })

  test('フォーマット不可', () => {
    const result = new QRFormatter({ data: 'ABC' }).format()

    expect(result).toBe('ABC')
  })
})

describe('detectLedgerSheet', () => {
  test('default', () => {
    const type = QRFormatter.detectLedgerSheet('201ABCDE')

    expect(type).toEqual({
      a: { id: '20', label: 'かんばん' },
      b: { id: '1', label: '量産部品' },
      c: { id: 'ABCDE' },
    })
  })
})
