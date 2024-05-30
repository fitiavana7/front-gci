import React, { FunctionComponent , useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewProject from './NewProject';
import { PlusCircleOutlined } from '@ant-design/icons';
import { IProject, IUser } from '../types/data';
import { ClearOutlined } from '@ant-design/icons';
import { message } from 'antd';
import UseProjet from '../hooks/useProjet';
import UseCurrentUser from '../hooks/UseCurrentUser';
import ProjetDiv from './ProjetDiv';

const Projects :FunctionComponent = () => {

    const [isShowingNewProject ,setIsShowingNewProject ] = useState<boolean>(false)
    const [projects , setProjects] = useState<IProject[]>([])
    const navigate = useNavigate()
    const {getProjects , deleteById } = UseProjet()
    const { getCurrentUser } = UseCurrentUser()
    const [user , setUser] = useState<IUser>()

    useEffect(()=>{
        getCurrentUser()?.then((e:any)=>{
            setUser(e.data)
        })
        .catch((err:any)=>{})
        getData()
    },[])

    function getData(){
        getProjects().then((e:any)=>{
            setProjects(e.data)
            console.log(e.data)
        })
        .catch((err:any)=>{})      
    }

    function showModal(){
        setIsShowingNewProject(!isShowingNewProject)
        getData()
    }

    function toProject(id : number = 0) {
        navigate(`/dashboard/project/${id}`)
    }

    function handleDelete(e : any ,id:number = 0) {
        e.stopPropagation()
        deleteById(id)
        .then((e:any)=>{
            message.success('projet effacé!')
            getData()
        })
        .catch((err:any)=>{
            message.error('erreur lors de la requette!')
        })
    }

    return (
        <div className='w-4/5 min-h-screen pt-20 px-3'>
            {
                isShowingNewProject && <NewProject show={showModal} />
            }
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <h4 className='font-bold text-xl'>PROJETS</h4>
                    <button onClick={showModal} className='flex p-2 ml-2 justify-center items-center bg-green-500 text-white rounded-md'>
                        <PlusCircleOutlined />
                    </button>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam tempore, odio fugit enim consequatur quam corporis deleniti mollitia commodi debitis.</p>
            </div>
            <div className='mt-4 grid grid-cols-2'>
                {
                    projects.length > 0 && projects.map((item:IProject, index)=>
                    <ProjetDiv key={index} devise={user?.devise} projet={item} handleDelete={handleDelete} toProject={toProject}/>
                    )
                }
            </div>
        </div>
    );
};

export default Projects;