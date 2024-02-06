import { describe, expect, it } from 'vitest'
import { download, getId, getInfo, getList, validateUrl } from '../src/index'

const testUrl = 'fff https://weibo.com/u/5855610888 分'
const testPid = '006ohxSUly1hmhsxti98gj3340590x6u'
describe('test', () => {
  it('validateUrl', () => {
    expect(validateUrl(testUrl)).toEqual(true)
  })
  it('getId', () => {
    expect(getId(testUrl)).toEqual(5855610888)
  })
  it('getInfo', async () => {
    expect(await getInfo(testUrl)).toBeTypeOf('object')
  })
  it('getList', async () => {
    expect(await getList(testUrl)).toBeTypeOf('object')
  })
  it('download', async () => {
    expect(await download(testPid)).toBeTypeOf('object')
  })
})
