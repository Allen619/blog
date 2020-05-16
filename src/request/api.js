import { PostData, GetData } from './http'
console.log(GetData)

export const getData = () => PostData('/markdown')
