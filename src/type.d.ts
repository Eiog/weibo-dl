export type UserInfo = {
    ok:number
    data:{}
    log:boolean
}
export type BlogList = {
    data:{
        [key:string]:unknown
    }[]
    ok:number
}
export type Comments = {
    data:{
        [key:string]:unknown
    }[]
    ok:number
    filter_group:{
        [key:string]:unknown
    }[]
    max_id:number
    rootComment:[]
    total_number:number
    trendsText:string
}
export type CommentsParam = {
    id: number
    uid: number
    count?: number
    is_reload?: number
    is_show_bulletin?: number
    is_mix?: number
    max_id?: number
    fetch_level?: number
    locale?: string
    flow?: number
  }