export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website:string
    youtube:string
    mainLink: string
}
export type PhotosType = {
    small?:null | string
    large:null | string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName:string
    contacts:ContactsType
    photos:PhotosType
    aboutMe: string
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type GetItemsType = {
    items:Array<UserType>
    totalCount:number
    error:string | null
}