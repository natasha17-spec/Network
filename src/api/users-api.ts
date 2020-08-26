import {GetItemsType} from "../types/types";
import {APIResponseType, instance} from "./api";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
};