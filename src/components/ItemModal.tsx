import React, { FunctionComponent, useState , useEffect } from 'react';
import { ClearOutlined , EditOutlined, PrinterOutlined , PlusOutlined} from '@ant-design/icons';
import { IGroup, IItem, IProject } from '../types/data';
import { message } from 'antd';
import useItem from '../hooks/useItem';
import AddItem from './AddItem';
import ModifyItem from './ModifyItem';

interface ProjectModalProps {
    show : ()=> void , 
    groupe : IGroup | undefined,
    project : IProject ,
    devise : string
}

const ItemModal : FunctionComponent<ProjectModalProps> = (props) => {

    const [isAdding , setIsAdding] = useState<boolean>(false)
    const [isModifying , setIsModifying] = useState<boolean>(false)
    const [dataToModify , setdataToModify] = useState<IItem | null>()
    const [itemLists , setItemLists] = useState<IItem[]>()
    const {getItemsbyGroupe} = useItem()
    
    const {create , deleteById} = useItem()

    useEffect(()=>{
        getData()
    },[])

    function getData() {
        if (groupe?.id) {
            getItemsbyGroupe(groupe?.id).then((e:any)=>{
                setItemLists(e.data)
                console.log(e.data);
            }).catch((err:any)=>{})          
        }        
    }

    function cancelEdit(){
        setIsAdding(false)
        setIsModifying(false)
    }

    const {show , groupe , project , devise}= props

    function setModify(data : IItem) {
        setIsModifying(false)
        setdataToModify(null)
        setIsAdding(false)
        setdataToModify(data)
        setIsModifying(true)
    }

    function handleDelete(e : any ,id:number=0) {
        e.stopPropagation()
        deleteById(id).then((e:any)=>{
            message.success('projet effacé!')  
            getData()          
        }).catch((err:any)=>{
            message.error('erreur lors de la requette!')
        })
    }


    return (
        <div onClick={show} className='bg-[#6b747b96] fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center'>
            <div onClick={(e)=> e.stopPropagation()} className='w-11/12 bg-slate-50 rounded-md p-11'>
                <div className='flex text-blue-500 text-xl font-bold justify-between items-center'>
                    <h4>{project.nom.toLocaleUpperCase()}</h4>
                    <h4>{project.lieu}</h4>
                </div>
                <h5 className='mt-4 text-base font-bold'>{groupe?.nom.toLocaleUpperCase()}</h5>
                <div className='text-xs text-justify'>
                    {groupe?.description}
                </div>                
                <div className='my-5'>
                    <div className='font-bold text-center grid grid-cols-8 w-full py-1 px-3 bg-slate-300'>
                        <div>Libellé</div>
                        <div>Quantité</div>
                        <div>Mésure</div>
                        <div>Prix unitaire</div>
                        <div>Prix</div>
                        <div>Payement</div>
                        <div>Date</div>
                        <div>Action</div>
                    </div>
                    <div className='overflow-y-scroll max-h-80'>
                        {
                            itemLists && itemLists.length > 0 && itemLists.map((item : IItem)=>
                            <div key={item.id} className='grid text-right grid-cols-8 w-full py-1 px-3 bg-slate-200'>
                                <div className='text-left'>{item.libelle}</div>
                                <div>{item.quantite}</div>
                                <div>{item.mesure}</div>
                                <div>{item.prix_un} {devise}</div>
                                <div>{item.prix} {devise} </div>
                                <div>{item.payment}</div>
                                <div>{item.date}</div>
                                <div className='flex justify-end'>
                                    <button onClick={()=> setModify(item)} className='w-6 h-6 flex justify-center items-center rounded-full text-white bg-orange-500'> <EditOutlined/></button>
                                    <button onClick={(e:any) => handleDelete(e , item.id) }  className=' ml-2 w-6 h-6 flex justify-center items-center rounded-full text-white bg-red-500'> <ClearOutlined/></button>
                                </div>
                            </div>                           
                            )
                        }
                    </div>
                </div>
                {
                    !isAdding && !isModifying ?
                <div className='flex text-xs justify-end items-end'>
                    <button onClick={()=> {setIsAdding(true);setIsModifying(false)}} className='text-white font-bold flex justify-center items-center bg-blue-500 rounded-md p-2'>
                        <PlusOutlined/> <span className='ml-1'>nouveau</span>
                    </button>
                    <a href={`/print/${project.id}-${groupe?.id}`} target='_blank'>
                        <button className='text-white font-bold flex justify-center items-center bg-green-500 ml-2 rounded-md p-2'>
                            <PrinterOutlined/> <span className="ml-1">imprimer</span>
                        </button>
                    </a>
                </div> : <></>
                }
               
                {
                    isAdding && groupe && <AddItem refresh={getData} cancel={cancelEdit} groupe={groupe}/>
                }
                {
                    isModifying && groupe && dataToModify && <ModifyItem refresh={getData} cancel={cancelEdit}  groupe={groupe} item={dataToModify}/>
                }
                
            </div>
        </div>
    );
};

export default ItemModal;