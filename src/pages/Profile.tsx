import React , { FunctionComponent, useEffect, useState }from 'react';
import { UserOutlined , EuroOutlined , EnvironmentOutlined , MailOutlined} from '@ant-design/icons';
import UseCurrentUser from '../hooks/UseCurrentUser';
import { IUser } from '../types/data';

const Profile : FunctionComponent = () => {
    const { getCurrentUser } = UseCurrentUser()
    const [user , setUser] = useState<IUser>()

    useEffect(()=>{
        getCurrentUser()?.then((e:any)=>{
            setUser(e.data)
        })
        .catch((err:any)=>{})
    },[])
    return (
        <div className='w-4/5 pt-20 px-5 h-screen'>
            <div className="flex justify-center items-center">
                <span className='text-5xl'><UserOutlined/></span>
            </div>
            <div>
                <h4 className='text-red-500 font-bold text-xl'> {user?.username.toLocaleUpperCase()}</h4>
                <h4 className='font-bold'><MailOutlined/> {user?.email}</h4>
                <h4 className='font-bold'><EnvironmentOutlined/> {user?.lieu.toLocaleUpperCase()} , depuis {user?.annee}</h4>
                <h4><EuroOutlined/> Devise  : {user?.devise}</h4>
            </div>
        </div>
    );
};

export default Profile;