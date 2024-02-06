export const picDownloadUrl = (id: string | number) => `https://weibo.com/ajax/common/download?pid=${id}`
export const blogListUrl = (id: string | number, page = 1, feature = 1) => `https://weibo.com/ajax/statuses/mymblog?uid=${id}&page=${page}&feature=${feature}`
export const infoUrl = (id: string | number) => `https://weibo.com/ajax/profile/info?uid=${id}`
