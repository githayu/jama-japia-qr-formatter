import formatter, { detectLedgerSheet } from '../formatter'
import * as mocks from '../mocks'

describe('formatter', () => {
  test('default', () => {
    const result = formatter({
      data: mocks.standard.standard,
      isGSOnly: false,
      isEncoded: true,
    })

    expect(Array.isArray(result)).toBeTruthy()

    if (Array.isArray(result)) {
      const data = Object.fromEntries(result[0])

      expect(data).toEqual(mocks.standard.result)
    }
  })

  test('GS制御文字のみ', () => {
    const result = formatter({
      data: mocks.standard.GSOnly,
      isGSOnly: true,
      isEncoded: true,
    })

    expect(Array.isArray(result)).toBeTruthy()

    if (Array.isArray(result)) {
      const data = Object.fromEntries(result[0])

      expect(data).toEqual(mocks.standard.result)
    }
  })

  test('多品一葉', () => {
    const result = formatter({
      data: mocks.standard.multiple,
      isEncoded: true,
    })

    expect(result.length).toBe(2)
  })

  test('フォーマット不可', () => {
    const result = formatter({ data: 'ABC' })

    expect(result).toBe('ABC')
  })
})

describe('detectLedgerSheet', () => {
  test('default', () => {
    const type = detectLedgerSheet('201ABCDE')

    expect(type).toEqual({
      a: { id: '20', label: 'かんばん' },
      b: { id: '1', label: '量産部品' },
      c: { id: 'ABCDE' },
    })
  })
})
