import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import Sidenav from '../components/Sidenav';

const Dashboard : FunctionComponent = () => {
    return (
        <div className='w-full flex justify-between items-start'>
            <Sidenav />
            <Outlet/>
        </div>
    );
};

export default Dashboard;