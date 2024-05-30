import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <LoadingOutlined/> <span className='ml-2'>loading</span>
        </div>
    );
};

export default Loader;