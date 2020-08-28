import {APIResponseType, instance, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

type MeResponseType = {
    id: number,
    email: string,
    login: string
}
type loginResponseType = {
     userId: number
 }

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseType>>(`auth/me`).then(res => res.data);;
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<loginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};
