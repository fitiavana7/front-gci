import React , {FunctionComponent, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useGroupe from '../hooks/useGroupe';
import useItem from '../hooks/useItem';
import UseProjet from '../hooks/useProjet';
import { IGroup, IItem, IProject } from '../types/data';
import { PrinterOutlined} from '@ant-design/icons';
import UseCurrentUser from '../hooks/UseCurrentUser';

const Print : FunctionComponent = () => {
    const ids = useParams().ids?.split("-")
    const [isLoading , setIsLoading] = useState<boolean>(true)
    const [projet , setProjet] = useState<IProject>()
    const [groupe , setGroupe] = useState<IGroup>()
    const [items , setItems] = useState<IItem[]>()

    const {getById} = UseProjet()
    const {getGroupesById} = useGroupe()
    const {getItemsbyGroupe} = useItem()
    const {getCurrentUser} = UseCurrentUser()
    const [devise , setDevise] = useState<string>("")
    const [isNotPrinting , setIsNotPrinting] = useState<boolean>(true)

    useEffect(()=>{
        // window.print()
        getData()
        getCurrentUser()?.then((e:any)=>{
            setDevise(e.data.devise);
        }).catch((err:any)=>{})
        
    },[])

    function print(){
        setIsNotPrinting(false)
        window.print()
    }

    function getData() {
        if(ids){
            const [projectId , groupeId] = ids
            getById(parseInt(ids[0])).then((e:any)=>setProjet(e.data))           
            getGroupesById(parseInt(ids[1])).then((e:any)=>{setGroupe(e.data)})
            getItemsbyGroupe(parseInt(ids[1])).then((e:any)=>setItems(e.data))
        }
    }

    return (
        <div className='w-full bg-slate-50 rounded-md p-11 min-h-screen'>
            <div className='flex justify-end items-center'>
            { isNotPrinting ?
            <button onClick={print} className='flex p-2 ml-2 justify-center items-center bg-green-500 text-white rounded-md'>
                <PrinterOutlined/>
            </button> : <></>
            }
            </div>
            <div className='flex text-blue-500 text-xl font-bold justify-between items-center'>
                <h4>{projet?.nom.toLocaleUpperCase()}</h4>
                <h4>{projet?.lieu.toLocaleUpperCase()}</h4>
            </div>
            <h5 className='text-base font-bold'>{groupe?.nom}</h5>
            <div className='my-5'>
                    <div className='font-bold text-center grid grid-cols-7 w-full py-1 px-3 bg-slate-300'>
                        <div>Libellé</div>
                        <div>Quantité</div>
                        <div>Mésure</div>
                        <div>Prix unitaire</div>
                        <div>Prix</div>
                        <div>Payement</div>
                        <div>Date</div>
                    </div>
                    <div className=''>
                        {
                            items && items.map((item : IItem , index)=>
                            <div key={index} className='grid text-right grid-cols-7 w-full py-1 px-3 bg-slate-200'>
                                <div className='text-left'>{item.libelle}</div>
                                <div>{item.quantite}</div>
                                <div>{item.mesure}</div>
                                <div>{item.prix_un} {devise}</div>
                                <div>{item.prix} {devise}</div>
                                <div>{item.payment}</div>
                                <div>{item.date}</div>
                            </div>                            
                            )
                        }
                    </div>
            </div>
            </div>
        );
};

export default Print;