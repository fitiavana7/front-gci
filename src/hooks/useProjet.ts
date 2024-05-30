import axios from 'axios';
import React from 'react';
import { BACKEND_API } from '../data/AppData';
import { ILogin, IProject, LoginResponse } from '../types/data';

const UseProjet = () => {
    let token : string | null;

    return {create , getUserStat , getStat ,getProjects,deleteById , getAll , deleteAll , getById , getProjetTotal}

    function create(data : IProject) {
        if (typeof localStorage !== 'undefined') {
            token = localStorage.getItem('gci-user')            
        }
        return axios.post(`${BACKEND_API}/projet/create`, data);
    }

    function getById(projet_id : number){
        return axios.get(`${BACKEND_API}/projet/${projet_id}`);
    }

    function deleteById(projet_id : number){
        return axios.delete(`${BACKEND_API}/projet/delete/${projet_id}`);
    }

    function getProjetTotal(projet_id : number){
        return axios.get(`${BACKEND_API}/item/total/projet/${projet_id}`);
    }

    function getStat(projet_id : number){
        return axios.get(`${BACKEND_API}/item/stat/projet/${projet_id}`);
    }

    function getUserStat(user_id : number){
        return axios.get(`${BACKEND_API}/item/stat/user/${user_id}`);
    }

    function deleteAll(){
        return axios.delete(`${BACKEND_API}/projet/delete/all`);
    }

    function getProjects() {
        if (typeof localStorage !== 'undefined') {
            token = localStorage.getItem('gci-user')            
        }
        return axios.get(`${BACKEND_API}/projet/user/${token}`);
    }

    function getAll(){
        return axios.get(`${BACKEND_API}/projet/all`);
    }
    
};

export default UseProjet;