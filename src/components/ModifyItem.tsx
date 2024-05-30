import { message } from 'antd';
import React, { FunctionComponent , useState} from 'react';
import useItem from '../hooks/useItem';
import { IGroup, IItem } from '../types/data';
import Loader from './Loader';

interface AddProps{
    groupe : IGroup ,
    item : IItem ,
    cancel : ()=>void,
    refresh : ()=>void
}

const ModifyItem : FunctionComponent<AddProps> = (props) => {

    const {groupe , item , cancel , refresh} = props

    const [libelle , setLibelle] = useState<string>(item.libelle)
    const [quantite , setQuantite] = useState<number>(item.quantite)
    const [mesure , setMesure] = useState<string>(item.mesure)
    const [prix_un , setPrixUn] = useState<number>(item.prix_un)
    const [payment , setPayment] = useState<string>(item.payment)
    const [date , setDate] = useState<any>(item.date)
    const {update} = useItem()
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

    function handleSubmit(e:any) {
        e.preventDefault()
        const data : IItem = {
            libelle , mesure , date , payment ,prix_un 
            , quantite , prix : prix_un * quantite,
            groupe
        }
        setIsLoading(true)
        update(data).then((e:any)=>{
            setIsLoading(false)
            message.success("item modifié !")
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
            <div className='font-bold'>MODIFIER :</div>
                <form action="" onSubmit={handleSubmit}>
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
                                <option value="kg">Kg</option>
                                <option value="tonnes">Tonnes</option>
                                <option value="litres">Litres</option>    
                                <option value="sacs">Sacs</option>    
                                <option value="metre cube">Mètre cube</option>
                                <option value="camions">Camions</option>        
                            </select>
                        </div>
                        <div className='mx-1'>
                            <p className='text-sm'>Prix unitaire :</p>
                            <input required value={prix_un} onChange={handleChange} id="prix_un" type="number" className='w-full border border-blue-600 rounded-md py-1 px-2' placeholder='prix unitaire'/>                            
                        </div>
                        <div className='mx-1'>
                            <p className='text-sm'>Payment :</p>
                            <select value={payment} onChange={handleChange} id="payment" className='w-full border border-blue-600 rounded-md py-1 px-2'>
                                <option value="en espece">En espèce</option>
                                <option value="carte bancaire">Carte bancaire</option>
                                <option value="mobile money">Mobile money</option>    
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
                            { isLoading ? <Loader/> : 'valider' }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

export default ModifyItem;