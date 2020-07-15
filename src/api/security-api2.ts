import {instance} from "./api";

type SecurityAPIType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityAPIType>(`security/get-captcha-url`);
    }
};