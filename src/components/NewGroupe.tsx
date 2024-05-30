import { message } from 'antd';
import React, { FunctionComponent , useState } from 'react';
import useGroupe from '../hooks/useGroupe';
import { IProject , IGroup} from '../types/data';
import Loader from './Loader';

interface NewItemProps {
    show : ()=> void , 
    projet : IProject
}

const NewGroupe : FunctionComponent<NewItemProps> = (props) => {

    const {show , projet} = props

    const [nom , setNom] = useState<string>('')
    const [descri , setDescri] = useState<string>('')
    const [hasNomError , setHasNomError] = useState<boolean>(false)
    const {create} = useGroupe()
    const [isLoading ,setIsLoading] = useState<boolean>(false)

    function handleChange(e : any) {
        let id = e.target.id , value = e.target.value
        switch (id) {
            case 'nom':
                setHasNomError(false)
                setNom(value)
                break;
            case 'descri' :
                setDescri(value) 
                break;
            default:
                break;
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const nomError = nom.length < 4 ? true : false
        setHasNomError(nomError)

        if (!nomError) {
            const data : IGroup = {description : descri , nom , projet}
            setIsLoading(true)
            create(data).then((e:any)=>{
                show()
                setIsLoading(false)
                message.success('Groupe ajouté!')    
            }).catch((err:any)=>{
                setIsLoading(false)
                message.error('erreur lors de la requette!')    
            })
        }
      
    }

    return (
        <div onClick={show} className='bg-[#6b747b96] fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center'>
            <div onClick={(e)=> e.stopPropagation()} className='w-2/5 bg-slate-50 rounded-md p-11'>
                <h5 className='text-blue-500 font-bold'>CREER UN NOUVEAU GROUPE</h5>
                <form onSubmit={handleSubmit} action="" className='my-5'>
                    <span>Nom :</span> <br />
                    <input 
                        value={nom}
                        onChange={handleChange}
                        id='nom'
                        type="text" 
                        className='border-blue-500 border rounded-md w-full' 
                    />
                     { hasNomError &&
                        <p className='text-red-500 text-xs'>nom invalide</p>
                        }
                    <span className='mt-2'>Description :</span> <br />
                    <textarea
                        value={descri}
                        onChange={handleChange}
                        id='descri'
                        rows={2}
                        className='mb-2 border-blue-500 border rounded-md w-full' 
                    />
                    <div className='flex justify-end items-center mt-4'>
                        <button type='submit' className='text-white font-bold bg-green-500 py-1 px-2 rounded-md'>
                        { isLoading ? <Loader/> : 'CREER' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewGroupe;