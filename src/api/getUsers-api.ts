import {GetItemsType} from "../types/types";
import {ApiResponseType, instance} from "./api";
import {profileAPI} from "./profile-api";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    getProfile(userId: number) {
        console.warn('Obsolete method. Please profileAPI object');
        return profileAPI.getProfile(userId);
    },
};