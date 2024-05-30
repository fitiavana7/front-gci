import axios from 'axios';
import React from 'react';
import { BACKEND_API } from '../data/AppData';
import { ILogin, IRegister, LoginResponse } from '../types/data';

const UseCurrentUser = () => {
    let userId : string | null;
    return { getCurrentUser, protectRoute, login , logout , register }

    function getCurrentUser(){
        if (typeof localStorage !== 'undefined') {
            userId = localStorage.getItem('gci-user')            
            if(!userId) {return null}
            else{
                return axios.get(`${BACKEND_API}/user/${userId}`)
            }
        }
    }

    function protectRoute() : string | null{
        if (typeof localStorage !== 'undefined') {
            userId = localStorage.getItem('gci-user')            
            return userId
        }else{
            return null
        }
    }

    function logout() {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('gci-user')            
        }
    }

    function login(data : ILogin) : Promise<any>{    
      return axios.post(`${BACKEND_API}/user/login`,data);
    }

    function register(data : IRegister) : Promise<any>{            
        return axios.post(`${BACKEND_API}/user/create`,data);
    }

};

export default UseCurrentUser;