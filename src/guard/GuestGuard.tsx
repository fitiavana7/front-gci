import React, { FunctionComponent, useState ,  useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UseCurrentUser from '../hooks/UseCurrentUser';

const GuestGuard : FunctionComponent = () => {
    const { protectRoute } = UseCurrentUser()
    const navigate = useNavigate()
    const [user,setUser] = useState()
    
    useEffect(()=>{
        if (protectRoute()) {
            navigate("/")
        }   
    },[])
    
    return <Outlet/>
};

export default GuestGuard;