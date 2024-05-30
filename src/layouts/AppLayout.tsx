import { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useNavigate} from "react-router";
import { Link } from "react-router-dom";
import { UserOutlined , FacebookOutlined , GithubOutlined , MailOutlined , HomeOutlined , ProjectOutlined , LogoutOutlined} from '@ant-design/icons';
import UseCurrentUser from "../hooks/UseCurrentUser";
import { message } from "antd";

const AppLayout: FunctionComponent = () => {
    
    const [isOpen , setIsOpen] = useState<Boolean>(false)
    const [username , setUsername]  = useState<string>("")
    const navigate = useNavigate()
    const {logout , getCurrentUser}= UseCurrentUser()

    useEffect(()=>{
        getCurrentUser()?.then((e:any)=>{
            setUsername(e.data.username);
        }).catch((err:any)=>{})
    },[])

    function handleLogout() {
        logout()
        message.success('vous vous êtes deconnecté!')
        navigate('/login')
    }

    return(
        <div className="w-full">
            <div className="w-full fixed top-0 left-0 px-5 h-14 bg-blue-600 z-20 text-white flex justify-between items-center">
                <Link to='home'>
                    <p className="text-2xl font-bold hover:animate-pulse">GCI</p>
                </Link>
                <div>
                    <button onClick={()=>{setIsOpen(!isOpen)}} className="bg-white w-10 cursor-pointer h-10 rounded-full flex justify-center items-center text-blue-600 px-3 font-bold"> <UserOutlined/></button>
                    {
                        isOpen && 
                        <div className="absolute right-4 top-12 mt-2 w-48 bg-white border rounded-lg shadow-lg border-gray-200">
                        <ul className="py-1">
                            <div className="flex py-4 justify-center items-center text-blue-600 font-bold"> <UserOutlined/> <span className="ml-3">{username}</span></div>
                            <Link onClick={() =>setIsOpen(false)} to='/'>
                            <li className="block px-4 py-2 text-left text-gray-800 hover:bg-blue-200">
                                <HomeOutlined/> acceuil
                            </li>  
                            </Link>
                            <Link onClick={() =>setIsOpen(false)} to='/dashboard'>
                            <li className="block px-4 py-2 text-left text-gray-800 hover:bg-blue-200">
                                <ProjectOutlined/> dashboard
                            </li>                
                            </Link>
                            <li onClick={handleLogout} className="cursor-pointer block px-4 py-2 text-left text-gray-800 hover:bg-blue-200">
                                <LogoutOutlined/> se deconnecter
                            </li>
                        </ul>
                    </div>
                    }
                   
                </div>
                
            </div>
                <Outlet />
            <div className='w-full p-5 bg-blue-600 mt-4'>
                    <div className="flex text-white justify-between items-center">
                        <h4 className="text-2xl font-bold">GCI</h4>
                        <div className="flex items-center justify-center">
                            <a href="" className='mx-2 text-2xl'>
                                <FacebookOutlined />
                            </a>
                            <a href=""  className='mx-2 text-2xl'>
                                <GithubOutlined />
                            </a>
                            <a href=""  className='mx-2 text-2xl'>
                                <MailOutlined />
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AppLayout;