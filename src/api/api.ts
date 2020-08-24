import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "aee8e0dc-0edb-41fe-ae30-2037f01a0933"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export type ApiResponseType<D = {},RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}
export enum ResultCodeEnum {
    Error = 1,
    Success = 0,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}



