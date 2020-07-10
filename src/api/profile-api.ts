import {PhotosType, ProfileType} from "../types/types";
import {SetProfileType} from "../Redux/ProfileReducer";
import {ApiResponseType, instance} from "./api";


export const profileAPI = {
    getProfile(userId:  number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ApiResponseType<PhotosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: SetProfileType) {
        return instance.put<ApiResponseType>(`profile`, profile)
    },
};
