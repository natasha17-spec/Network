import axios from "axios";
import {ProfileType} from "../types/types";


const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "aee8e0dc-0edb-41fe-ae30-2037f01a0933"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },


    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object');
        return profileAPI.getProfile(userId);
    },
};


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    },
};
type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
type loginResponseType = {
    data: {email: null | string, password: string, rememberMe:boolean, captcha: null | string}
    resultCode: number
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`);
    },
    login(email: null | string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<loginResponseType>(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};
type SecurityAPIType = {
    url:string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityAPIType>(`security/get-captcha-url`);
    }
};




