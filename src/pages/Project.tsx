import React, { FunctionComponent, useState , useEffect} from 'react';
import ItemModal from '../components/ItemModal';
import { ClearOutlined , PlusCircleOutlined} from '@ant-design/icons';
import NewItem from '../components/NewGroupe';
import { IGroup, IProject, IUser } from '../types/data';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import UseProjet from '../hooks/useProjet';
import UseCurrentUser from '../hooks/UseCurrentUser';
import NewGroupe from '../components/NewGroupe';
import useGroupe from '../hooks/useGroupe';
import Groupe from '../components/Groupe';

const Project :FunctionComponent = () => {
    
    const [showItemModal , setShowItemModal ] = useState<boolean>(false)
    const [selectedItemData ,setSelectedItemData ] = useState<IGroup>()
    const [groupes , setGroupes] = useState<IGroup[]>()
    const [projet , setProjet] = useState<IProject>()
    const [addNewGroup , setAddNewGroup ] = useState<boolean>(false)
    const {getById , getProjetTotal} = UseProjet()
    const id = useParams().id
    const {getGroupesByProject , deleteById , getGroupeTotal} = useGroupe()
    const { getCurrentUser } = UseCurrentUser()
    const [user , setUser] = useState<IUser>()
    const [total , setTotal] = useState<number>(0)

    useEffect(()=>{
        getData()
        getTotal()
        getCurrentUser()?.then((e:any)=>{
            setUser(e.data)
        })
        .catch((err:any)=>{})
        
    },[])


    function getData() {
        if (id) {
            getById(parseInt(id)).then((e:any)=>{
                setProjet(e.data)
                getGroupesByProject(e.data.id).then((e:any)=>{
                    setGroupes(e.data)
                })       
            }).catch((err:any)=>{})  
        }     
    }


    function showModal() {
        setShowItemModal(!showItemModal)
        getTotal()
    }
    
    function showAdd() {
        setAddNewGroup(!addNewGroup)
        getData()
        getTotal()
    }

    function getTotal() {
        if(id){
            getProjetTotal(parseInt(id)).then((e:any)=>{
                setTotal(e.data)
            })
            .catch((err:any)=>{}) 
        }
    }

   function handleDelete(e : any ,id:number = 0) {
    e.stopPropagation()
    deleteById(id).then((e:any)=>{
        message.success('projet effacé!')
        getData()
        getTotal()
    })
    .catch((err:any)=>{
        message.error('erreur lors de la requette!')
    })
}

    return (
        <div className='w-4/5 pt-20 min-h-screen px-8'>
            {
                addNewGroup && projet &&
                <NewGroupe show={showAdd} projet={projet}/>
            }
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>{projet?.nom.toLocaleUpperCase()} </h4>
                <div className='flex items-center justify-center'>
                    <span className='py-1 px-2 bg-blue-500 rounded-full text-white'>{`${total} ${user?.devise}`}</span>
                    <button onClick={showAdd} className='flex p-2 ml-2 justify-center items-center bg-green-500 text-white rounded-md'>
                        <PlusCircleOutlined />
                    </button>
                </div>
            </div>
            <h5>{projet?.lieu}</h5> 
            <div className='w-full my-5 py-2 grid grid-cols-1'>
                {
                    groupes && projet && groupes.length > 0 && groupes.map((item: IGroup , index)=>
                        <Groupe show={showModal} projet={projet} key={index} groupe={item} handleDelete={handleDelete}/>                    
                    )
                }
            </div>       
        </div>
    );
};

export default Project;