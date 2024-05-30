import { FunctionComponent, useState } from "react";
import { Outlet} from "react-router";
import { Link } from "react-router-dom";
import { InfoCircleFilled ,  UserOutlined , FacebookOutlined , GithubOutlined , MailOutlined} from '@ant-design/icons';

const GuestLayout: FunctionComponent = () => {
    
    const [isOpen , setIsOpen] = useState<Boolean>(false)



    return(
        <div className="w-full">
            <div className="w-full fixed top-0 left-0 px-5 h-14 bg-blue-600 z-20 text-white flex justify-between items-center">
                <Link to='home'>
                    <p className="text-2xl font-bold hover:animate-pulse">GCI</p>
                </Link>
                <div className="text-xl">
                    <InfoCircleFilled />
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

export default GuestLayout;