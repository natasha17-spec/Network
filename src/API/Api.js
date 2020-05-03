import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers:{"API-KEY":"aee8e0dc-0edb-41fe-ae30-2037f01a0933"},
    baseURL:'https//:social-network.samuraijs.com/api/1.0/'
});


export const usersAPI= {
    getUsers(currentPage=1,pageSize=10){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response=> {
            return response.data;
        })
    },

    follow (userId) {
        return instance.post(`follow/${userId}`)
            .then(response=> {
                return response.data;
            })
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },



    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object');
        return profileAPI.getProfile(userId);
    },
};


export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/`+ userId)
    },
    getStatus (userId){
        return instance.get(`profile/status/`+ userId)
    },
    updateStatus (status){
        return instance.put(`profile/status`,{status:status} )
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile){
        return instance.put(`profile`, profile)
    },
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false,captcha=null) {
        return instance.post(`auth/login`, { email, password, rememberMe,captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};




