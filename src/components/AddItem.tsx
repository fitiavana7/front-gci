import { message } from 'antd';
import React, { FunctionComponent , useState} from 'react';
import { MesureList, PaymentList } from '../data/SelectData';
import useItem from '../hooks/useItem';
import { IGroup, IItem, SelectDataType } from '../types/data';
import Loader from './Loader';

interface AddProps{
    groupe : IGroup ,
    cancel : ()=> void,
    refresh : ()=>void
}

const AddItem : FunctionComponent<AddProps> = (props) => {

    const mesureList : SelectDataType[] = MesureList
    const payments : SelectDataType[] = PaymentList

    const {groupe , cancel , refresh} = props

    const [libelle , setLibelle] = useState<string>("")
    const [quantite , setQuantite] = useState<number>(0)
    const [mesure , setMesure] = useState<string>("kg")
    const [prix_un , setPrixUn] = useState<number>(0)
    const [payment , setPayment] = useState<string>("en espece")
    const [date , setDate] = useState<any>()
    const {create , deleteById} = useItem()
    const [isLoading ,setIsLoading] = useState<boolean>(false)
    
    function handleChange(e:any){
        const value = e.target.value
        switch (e.target.id) {
            case "libelle":
                setLibelle(value)
                break;
            case "quantite":
                setQuantite(value)
                break;
            case "mesure":
                setMesure(value)
                break;
            case "prix_un":
                setPrixUn(value)
                break;
            case "payment":
                setPayment(value)
                break;
            case "date":
                setDate(value)
                break;                    
            default:
                break;
        }
    }

    function handleSubmitAdding(e:any) {
        e.preventDefault()
        const data : IItem = {
            libelle , mesure , date , payment ,prix_un 
            , quantite , prix : prix_un * quantite,
            groupe
        }
        console.log(data);
        setIsLoading(true)        
        create(data).then((e:any)=>{
            setIsLoading(false)
            message.success("item ajouté !")
            setLibelle("")
            setMesure("kg")
            setDate("")
            setPayment("en espece")
            setPrixUn(0)
            setQuantite(0)
            cancel()
            refresh()
        }).catch((err:any)=>{
            setIsLoading(false)
            message.error("erreur lors de la requette !") 
            cancel()   
        })
    }

    return (
        <div>
            <div className='font-bold'>AJOUTER UN ITEM :</div>
                <form action="" onSubmit={handleSubmitAdding}>
                    <div className='w-full grid grid-cols-7'>
                        <div className='mr-1'>
                            <p className='text-sm'>Libellé : </p>
                            <input required value={libelle} onChange={handleChange} id="libelle" type="text" className='w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='libellé'/>
                        </div>
                        <div className='mx-1'>
                            <p className='text-sm'>Quantité :</p>
                            <input required value={quantite} onChange={handleChange} id="quantite" type="number" className='w-full border border-blue-600 rounded-md py-1 px-2' placeholder='quantité'/>
                        </div>
                        <div className='mx-1'>
                            <p className='text-sm'>Mésure :</p>
                            <select value={mesure} onChange={handleChange} id="mesure" className='w-full border border-blue-600 rounded-md py-1 px-2'>
                                {
                                    mesureList.map((e:SelectDataType,index)=>
                                        <option key={index} value={e.abr}>{e.type}</option>                                    
                                    )
                                }        
                            </select>
                        </div>
                        <div className='mx-1'>
                            <p className='text-sm'>Prix unitaire :</p>
                            <input required value={prix_un} onChange={handleChange} id="prix_un" type="number" className='w-full border border-blue-600 rounded-md py-1 px-2' placeholder='prix unitaire'/>                            
                        </div>
                        <div className='mx-1'>
                            <p className='text-sm'>Payment :</p>
                            <select value={payment} onChange={handleChange} id="payment" className='w-full border border-blue-600 rounded-md py-1 px-2'>
                                {
                                    payments.map((e:SelectDataType , index)=>
                                    <option key={index} value={e.abr}>{e.type}</option>                                    
                                    )
                                }
                            </select>
                        </div>
                        <div className='mx-1'>
                            <p  className='text-sm'>Date :</p>
                            <input required value={date} onChange={handleChange} id="date" type="date" className='w-full border border-blue-600 rounded-md py-1 px-2' placeholder='prix unitaire'/>                            
                        </div>
                        <div className='ml-1 flex items-end'>
                            <button onClick={cancel} className='text-white font-bold flex justify-center items-center mr-2 bg-red-500 rounded-md p-2'>
                                annuler
                            </button>
                            <button type='submit' className='text-white font-bold flex justify-center items-center bg-green-500 rounded-md p-2'>
                            { isLoading ? <Loader/> : 'ajouter' }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

export default AddItem;