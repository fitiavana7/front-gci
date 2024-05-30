import { message } from 'antd';
import React , { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import UseCurrentUser from '../hooks/UseCurrentUser';

const Register : FunctionComponent = () => {

    const [mail , setMail] = useState<string>('')
    const [pwd , setPwd] = useState<string>('')
    const [username , setUsername] = useState<string>('')
    const [devise , setDevise] = useState<string>('ariary')
    const [lieu , setLieu] = useState<string>('')
    const [annee , setAnnee] = useState<string>('')
    const [pwd2 , setPwd2] = useState<string>('')
    const [hasMailError , setHasMailError] = useState<boolean>(false)
    const [hasPwdError , setHasPwdError] = useState<boolean>(false)
    const [hasPwd2Error , setHasPwd2Error] = useState<boolean>(false)
    const [hasUsernameError , setHasUserameError] = useState<boolean>(false)
    const [hasLieuError , setHasLieuError] = useState<boolean>(false)
    const [hasAnneeError , setHasAnneeError] = useState<boolean>(false)
    const [isLoading ,setIsLoading] = useState<boolean>(false)

    const {register} = UseCurrentUser()
    const navigate = useNavigate()

    function handleChange(e : any) {
        let id = e.target.id , value = e.target.value
        switch (id) {
            case 'mail':
                setHasMailError(false)
                setMail(value)
                break;
            case 'devise':
                setDevise(value)
                break;
            case 'pwd' :
                setHasPwdError(false)
                setPwd(value) 
                break;
            case 'pwd2' :
                setHasPwd2Error(false)
                setPwd2(value) 
                break;
            case 'lieu':
                setHasLieuError(false)
                setLieu(value)
                break;
            case 'annee' :
                setHasAnneeError(false)
                setAnnee(value) 
                break;
            case 'username' :
                setHasUserameError(false)
                setUsername(value) 
                break;
            default:
                break;
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const mailError = mail.length < 6
        setHasMailError(mailError)
        const pwdError = pwd.length < 6 
        setHasPwdError(pwdError)
        const pwd2Error = pwd != pwd2
        setHasPwd2Error(pwd2Error)
        const usernameError = username.length < 4
        setHasUserameError(usernameError)
        const anneeError = annee.length < 4
        setHasAnneeError(anneeError)
        const lieuError = lieu.length < 4
        setHasLieuError(lieuError)
        if (!mailError && !pwdError && !pwd2Error && !usernameError && !anneeError && !lieuError) {
            setIsLoading(true)
            register({email : mail, password : pwd,username , lieu , annee , devise})
            .then((e:any)=>{
                setIsLoading(false)
                message.success('Compte crée avec succès')
                navigate('/login')
            })
            .catch((err:any)=>{
                setIsLoading(false)
                message.error("Erreur lors de l'enregistrement")
            })
        }
    }

    return (
        <div className='pt-20 flex h-screen justify-center items-center'>
            <div className='w-1/3 p-4 py-10'>
                <h5 className='text-xl text-center text-blue-500 font-bold'>S'INSCRIRE</h5>
                <form action="" onSubmit={handleSubmit} className='px-5 py-3'>
                    <div className='m-1'>
                        <p className='text-sm'>Mail : </p>
                        <input onChange={handleChange} id='mail' type="text" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='mail'/>
                        { hasMailError &&
                        <p className='text-red-500 text-xs'>mail invalide</p>
                        }
                    </div>
                    <div className='m-1'>
                        <p className='text-sm'>Username : </p>
                        <input onChange={handleChange} id='username' type="text" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='mail'/>
                        { hasMailError &&
                        <p className='text-red-500 text-xs'>username invalide</p>
                        }
                    </div>
                    <div className='m-1 flex justify-between items-center'>
                        <div className='w-2/4'>
                            <p className='text-sm'>Lieu : </p>
                            <input onChange={handleChange} id='lieu' type="text" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='Mada'/>
                            { hasMailError &&
                            <p className='text-red-500 text-xs'>lieu invalide</p>
                            }
                        </div>
                        <div className='w-1/4 mx-1'>
                            <p className='text-sm'>Devise : </p>
                            <select onChange={handleChange} id='devise' className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 '>
                                <option value="ariary">Ariary</option>    
                                <option value="euro">Euro</option>    
                                <option value="dollar">Dollar</option>    
                            </select>
                        </div>
                        <div className='w-1/4'>
                            <p className='text-sm'>Année : </p>
                            <input onChange={handleChange} id='annee' type="text" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='2020'/>
                            { hasMailError &&
                            <p className='text-red-500 text-xs'>annee invalide</p>
                            }
                        </div>
                    </div>
                    <div className='m-1'>
                        <p className='text-sm'>Mot de passe : </p>
                        <input onChange={handleChange} id='pwd' type="password" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='mot de passe'/>
                        { hasPwdError &&
                        <p className='text-red-500 text-xs'>mot de passe invalide</p>
                        }   
                    </div>
                    <div className='m-1'>
                        <p className='text-sm'>Confirmer Mot de passe : </p>
                        <input onChange={handleChange} id='pwd2' type="password" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='confirmer mot de passe'/>
                        { hasPwd2Error &&
                        <p className='text-red-500 text-xs'>mot de passe non identique</p>
                        }   
                    </div>
                    <div className='mt-4 flex w-full justify-end items-center'>
                        <Link to='/login'>
                            <span className='underline text-gray-600 mr-2'>j'ai dejà un compte</span>
                        </Link>
                        <button type='submit' className='text-white font-bold flex justify-center items-center bg-green-500 rounded-md p-2'>
                        { isLoading ? <Loader/> : 'créer' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;