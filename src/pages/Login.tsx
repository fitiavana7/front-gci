import { message } from 'antd';
import React , { FunctionComponent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import UseCurrentUser from '../hooks/UseCurrentUser';

const Login : FunctionComponent = () => {

    const {login} = UseCurrentUser()

    const navigate = useNavigate()
    const [mail , setMail] = useState<string>('')
    const [pwd , setPwd] = useState<string>('')
    const [hasMailError , setHasMailError] = useState<boolean>(false)
    const [hasPwdError , setHasPwdError] = useState<boolean>(false)
    const [isLoading ,setIsLoading] = useState<boolean>(false)

    function handleChange(e : any) {
        let id = e.target.id , value = e.target.value
        switch (id) {
            case 'mail':
                setHasMailError(false)
                setMail(value)
                break;
            case 'pwd' :
                setHasPwdError(false)
                setPwd(value) 
                break;
            default:
                break;
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        const mailError = mail.length < 6 ? true : false
        setHasMailError(mailError)
        const pwdError = pwd.length < 6 ? true : false
        setHasPwdError(pwdError)

        if (!mailError && !pwdError) {
            setIsLoading(true)
            login({email : mail, password : pwd})
            .then((e:any)=>{
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("gci-user",e.data.UserId)
                }
                setIsLoading(false)
                message.success('Connection avec succès')
                navigate('/')
            })
            .catch((err:any)=>{
                setIsLoading(false)
                message.error('Identifiant ou mot de passe incorrect')
            })
        }

       
    }

    return (
        <div className='pt-20 h-screen flex justify-center items-center'>
            <div className='w-1/3 p-4 py-10'>
                <h5 className='text-xl text-center text-blue-500 font-bold'>SE CONNECTER</h5>
                <form action="" onSubmit={handleSubmit} className='px-5 py-3'>
                    <div className='m-1'>
                        <p className='text-sm'>Mail : </p>
                        <input onChange={handleChange} id='mail' value={mail} type="text" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='mail'/>
                        { hasMailError &&
                        <p className='text-red-500 text-xs'>mail invalide</p>
                        }
                    </div>
                    <div className='m-1 mt-4'>
                        <p className='text-sm'>Mot de passe : </p>
                        <input onChange={handleChange} id='pwd' value={pwd} type="password" className='bg-transparent w-full border border-blue-600 rounded-md py-1 px-2 ' placeholder='mot de passe'/>
                        { hasPwdError &&
                        <p className='text-red-500 text-xs'>mot de passe invalide</p>
                        }   
                    </div>
                    <div className='mt-4 flex w-full justify-end items-center'>
                        <Link to='/register'>
                            <span className='underline text-gray-600 mr-2'>créer un compte</span>
                        </Link>
                        <button type='submit' className='text-white font-bold flex justify-center items-center bg-green-500 rounded-md p-2'>
                            { isLoading ? <Loader/> : 'se connecter' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;