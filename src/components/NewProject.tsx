import { message } from 'antd';
import React, { FunctionComponent, useState , useEffect} from 'react';
import UseCurrentUser from '../hooks/UseCurrentUser';
import UseProjet from '../hooks/useProjet';
import { IProject, IUser } from '../types/data';
import Loader from './Loader';

interface NewProjectProps {
    show : ()=> void
}

const NewProject : FunctionComponent<NewProjectProps> = (props) => {

    const show = props.show

    const {getCurrentUser} = UseCurrentUser()
    const [user , setUser] = useState<IUser>()
    const { create } = UseProjet()

    const [nom , setNom] = useState<string>('')
    const [lieu , setLieu] = useState<string>('')
    const [hasNomError , setHasNomError] = useState<boolean>(false)
    const [hasLieuError , setHasLieuError] = useState<boolean>(false)
    const [isLoading ,setIsLoading] = useState<boolean>(false)

    useEffect(()=>{
        getCurrentUser()?.then((e:any)=>{
            setUser(e.data)
        })
        .catch((err:any)=>{})
    },[])

    function handleChange(e : any) {
        let id = e.target.id , value = e.target.value
        switch (id) {
            case 'nom':
                setHasNomError(false)
                setNom(value)
                break;
            case 'lieu' :
                setHasLieuError(false)
                setLieu(value) 
                break;
            default:
                break;
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()

        const nomError = nom.length < 4 ? true : false
        setHasNomError(nomError)
        const lieuError = lieu.length < 4 ? true : false
        setHasLieuError(lieuError)

        if (!nomError && !lieuError) {
            const data : IProject = {
                nom , description : 'une description de projet' , lieu , user
            }            
            setIsLoading(true)
            create(data).then((e:any)=>{
                setIsLoading(false)
                message.success('projet crée !')
                show()    
            })
            .catch((err:any)=>{
                setIsLoading(false)
                message.error("erreur lors de l'ajout !")
            })
        }
    }
    return (
        <div onClick={show} className='bg-[#6b747b96] fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center'>
            <div onClick={(e)=> e.stopPropagation()} className='w-2/5 bg-slate-50 rounded-md p-11'>
                <h5 className='text-blue-500 font-bold'>CREER UN NOUVEAU PROJET</h5>
                <form onSubmit={handleSubmit} action="" className='my-5'>
                    <span>Nom du projet :</span> <br />
                    <input 
                        type="text" 
                        onChange={handleChange}
                        id='nom'
                        value={nom}
                        className='p-1 border-blue-500 border rounded-md w-full' 
                    />
                    { hasNomError &&
                        <p className='text-red-500 text-xs'>nom invalide</p>
                        }
                    <span className='mt-2'>Lieu :</span> <br />
                    <input 
                        onChange={handleChange}
                        id='lieu'
                        value={lieu}
                        type="text" 
                        className='p-1 border-blue-500 border rounded-md w-full' 
                    />
                    { hasLieuError &&
                        <p className='text-red-500 text-xs'>lieu invalide</p>
                        }
                    <div className='flex justify-end items-center mt-6'>
                        <button type='submit' className='text-white font-bold bg-green-500 py-1 px-2 rounded-md'>
                        { isLoading ? <Loader/> : 'CREER' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProject;