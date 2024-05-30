import React, { FunctionComponent , useState , useEffect } from 'react';
import { UserOutlined , ProjectOutlined , BarChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UseCurrentUser from '../hooks/UseCurrentUser';
import { IUser } from '../types/data';


const Sidenav : FunctionComponent= () => {
    const { getCurrentUser } = UseCurrentUser()
    const [user , setUser] = useState<IUser>()

    useEffect(()=>{
        getCurrentUser()?.then((e:any)=>{
            setUser(e.data)
        })
        .catch((err:any)=>{})
    },[])
    return (
        <div className='w-1/5 py-4 px-2 pt-20'>
            <div className='w-full flex justify-center items-center text-red-500'>
                <UserOutlined/><h4 className='text-xl font-bold ml-2'>{user?.username.toLocaleUpperCase()}</h4>
            </div>
            <div className='w-full py-6 flex flex-col items-center justify-center'>
                <Link to='' className='w-full'>
                    <button className='w-full mt-1 p-2 pl-5 flex justify-start items-center bg-slate-300 rounded-lg'>
                        <UserOutlined/> <span className='ml-2'>profile</span>
                    </button>
                </Link>
                <Link to='projects' className='w-full'>
                    <button className='w-full mt-1 p-2  pl-5 flex justify-start items-center bg-slate-300 rounded-lg'>
                        <ProjectOutlined/> <span className='ml-2'>projects</span>
                    </button>
                </Link>
                <Link to='stats' className='w-full'>
                    <button className='w-full mt-1 p-2  pl-5 flex justify-start items-center bg-slate-300 rounded-lg'>
                        <BarChartOutlined/> <span className='ml-2'>stats</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Sidenav;