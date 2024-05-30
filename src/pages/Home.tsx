import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from '../components/Typewritter'
import { EyeOutlined} from '@ant-design/icons';

const Home  : FunctionComponent = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center pt-16'>
            <div className='text-stone-800 px-32'>
                <Typewriter text='GESTION DE CONSTRUCTION IMMOBILIER' />
                <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non officiis at vitae quo dicta molestiae. Aut reiciendis quos laborum minima totam ut, optio dolores harum, eius doloribus adipisci ratione explicabo deleniti labore eveniet odio qui placeat illo libero. Reiciendis, odio nesciunt autem tempore natus ipsum? Sit cupiditate ducimus ipsa unde repellendus eaque quibusdam optio harum minus quidem iste earum dignissimos consequuntur voluptatibus voluptatem, adipisci dolore ad odit et praesentium beatae sequi. Ducimus perferendis aut libero quasi eaque ullam consectetur assumenda inventore? Odio, labore. Quasi accusantium rem, quas perspiciatis velit exercitationem nihil expedita sed magnam ipsum veritatis in nostrum a voluptates dolorem nam necessitatibus quia tempora totam consequatur quam itaque ipsam blanditiis eius. Officia, illo repudiandae voluptatem pariatur rerum reiciendis excepturi fuga iste obcaecati dolor cumque quos cum ratione dolorum iusto qui, blanditiis, facere voluptatibus? Vero optio exercitationem ipsam cum illum.</p>
                <div className='flex justify-center items-center'>
                    <Link to='dashboard/projects'>
                    <button className='flex p-2  justify-center items-center bg-blue-500 text-white rounded-md'>
                        <span className='mr-1 mb-1'><EyeOutlined/></span> voir les projets
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;