import axios from 'axios';
import { BACKEND_API } from '../data/AppData';
import { IGroup} from '../types/data';

const useGroupe = () => {

    return {create ,deleteById,getGroupesByProject,getAll, getGroupesById,getGroupeTotal}

    function create(data : IGroup) {
        return axios.post(`${BACKEND_API}/groupe/create`, data);
    }

    function deleteById(groupe_id : number){
        return axios.delete(`${BACKEND_API}/groupe/delete/${groupe_id}`);
    }

    function getAll() {
        return axios.get(`${BACKEND_API}/groupe/all`);
    }

    function getGroupesById(groupe_id : number) {
        return axios.get(`${BACKEND_API}/groupe/${groupe_id}`);
    }

    function getGroupesByProject(projet_id : number) {
        return axios.get(`${BACKEND_API}/groupe/projet/${projet_id}`);
    }

    function getGroupeTotal(groupe_id:number) {
        return axios.get(`${BACKEND_API}/item/total/${groupe_id}`);
    }

    
};

export default useGroupe;