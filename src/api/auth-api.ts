import {ApiResponseType, instance, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

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
        return instance.get<ApiResponseType<MeResponseType>>(`auth/me`);
    },
    login(email: null | string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<loginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};
