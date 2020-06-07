import { PostData, GetData } from './http'

export const sendMarkDown = params => PostData('/sendMarkDown', params)

export const getArticleList = (params, isLoading = true) => GetData('/getArticleList', params, isLoading)
