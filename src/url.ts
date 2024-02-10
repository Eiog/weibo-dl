import type { CommentsParam } from './type'

export const picDownloadUrl = (id: string | number) => `https://weibo.com/ajax/common/download?pid=${id}`
export const blogListUrl = (id: string | number, page = 1, feature = 1) => `https://weibo.com/ajax/statuses/mymblog?uid=${id}&page=${page}&feature=${feature}`
export const infoUrl = (id: string | number) => `https://weibo.com/ajax/profile/info?uid=${id}`
export function commentsUrl({
  id,
  uid,
  count = 20,
  is_reload = 1,
  is_show_bulletin = 2,
  is_mix = 0,
  max_id = 0,
  fetch_level = 0,
  locale = 'zh-CN',
  flow = 0,
}: CommentsParam) {
  return `https://weibo.com/ajax/statuses/buildComments?flow=${flow}&is_reload=${is_reload}&id=${id}&is_show_bulletin=${is_show_bulletin}&is_mix=${is_mix}&max_id=${max_id}&count=${count}&uid=${uid}&fetch_level=${fetch_level}&locale=${locale}`
}
