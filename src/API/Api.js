import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers:{"API-KEY":"aee8e0dc-0edb-41fe-ae30-2037f01a0933"},
    baseURL:'https:social-network.samuraijs.com/api/1.0/'
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

    unfollow (userId) {
        return instance.delete(`follow/${userId}`)
            .then(response=> {
                return response.data;
            })
    },
    authMe(){

        return instance.get(`auth/me`)
            .then(response=> {
                return response.data;
            })
    },
    userId (userId) {
        return instance.get(`profile/`+ userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

};



