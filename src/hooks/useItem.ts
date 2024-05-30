import axios from 'axios';
import { BACKEND_API } from '../data/AppData';
import { IGroup, IItem} from '../types/data';

const useItem = () => {

    return {create ,deleteById,getItemsbyGroupe , update}

    function create(data : IItem) {
        return axios.post(`${BACKEND_API}/item/create`, data);
    }

    function deleteById(item_id : number){
        return axios.delete(`${BACKEND_API}/item/delete/${item_id}`);
    }

    function update(data : IItem){
        return axios.put(`${BACKEND_API}/item/update`, data);
    }

    function getItemsbyGroupe(groupe_id : number) {
        return axios.get(`${BACKEND_API}/item/groupe/${groupe_id}`);
    }
    
};

export default useItem;