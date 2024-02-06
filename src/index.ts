import { Readable } from 'node:stream'
import { blogListUrl, infoUrl, picDownloadUrl } from './url'
import type { UserInfo } from './type'

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'Cookie': 'SUB=_2AkMSnViGf8NxqwFRmfoQxW3jaY9wwg_EieKkwaldJRMyHRl-yD9vqh1TtRB6OR12a2_mGI2M0sPzBlqCJ7WTucZP0fGm;',
}
const regex = /https:\/\/weibo\.com\/(?:u\/)?(\d+)/

export const validateUrl = (url: string) => regex.test(url)
export function getId(url: string) {
  const id = url.match(regex)?.[1]
  return id ? Number(id) : undefined
}
export function setCookie(cookie: string) {
  headers.Cookie = cookie
}
export function getInfo(url: string): Promise<UserInfo> {
  return new Promise((resolve, reject) => {
    const id = getId(url)
    if (!id)
      return reject(Error('url failed'))
    fetch(infoUrl(id), { credentials: 'include', headers }).then((res) => {
      if (res.redirected)
        return reject(Error('request failed cookie failed'))

      return res.json()
    }).then((res) => {
      return resolve(res)
    }).catch(err => reject(err))
  })
}
export function getList(url: string, page = 1, feature = 1) {
  return new Promise((resolve, reject) => {
    const id = getId(url)
    if (!id)
      return reject(Error('url failed'))
    fetch(blogListUrl(id, page, feature), { credentials: 'include', headers }).then((res) => {
      if (res.redirected)
        return reject(Error('request failed cookie failed'))

      return res.json()
    }).then((res) => {
      return resolve(res)
    }).catch(err => reject(err))
  })
}
function fetchStream(url: string) {
  const stream = new Readable({
    read: () => true,
  })
  fetch(url, { headers }).then(async (res) => {
    const contentLength = Number(res.headers.get('Content-Length')) || 0
    let receivedLength = 0
    if (!res.body)
      throw new Error('stream failed')
    const reader = res.body.getReader()
    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        stream.emit('end', { size: contentLength })
        break
      }
      receivedLength += value.length
      stream.push(value)
      stream.emit('process', { current: receivedLength, size: contentLength, process: parseFloat((receivedLength / contentLength).toFixed(2)) })
    }
  }).catch((error) => {
    stream.emit('error', error)
  })
  return stream
}
export function download(pid: string) {
  return fetchStream(picDownloadUrl(pid))
}
