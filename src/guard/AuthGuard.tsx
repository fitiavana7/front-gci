import React, { FunctionComponent , useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UseCurrentUser from '../hooks/UseCurrentUser';

const AuthGuard : FunctionComponent= () => {
    const { protectRoute } = UseCurrentUser()
    const navigate = useNavigate()
    const [user,setUser] = useState()

    useEffect(()=>{
        if(!protectRoute()){
            navigate("/login")
        }
        
    },[])
    return <Outlet/>
};

export default AuthGuard;