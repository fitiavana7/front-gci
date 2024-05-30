import React, { FunctionComponent , useState , useEffect} from 'react';
import { IProject } from '../types/data';
import { ClearOutlined } from '@ant-design/icons';
import UseProjet from '../hooks/useProjet';

interface PProps{
    projet : IProject , 
    toProject : (id : number | undefined)=> void,
    handleDelete : (e:any , id:number | undefined)=> void,
    devise : String | undefined
}

const ProjetDiv : FunctionComponent<PProps> = (props) => {
    const {projet , toProject ,handleDelete , devise} = props
    const {getProjetTotal} = UseProjet()
    const [total,setTotal] = useState<number>(0)

    useEffect(()=>{
       getTotal()
    },[])

    function getTotal(){
        if (projet.id) {
            getProjetTotal(projet.id).then((e:any)=>{
                setTotal(e.data)
            }).catch((err:any)=>{})                
        }
    }

    function deleteRefresh(e:any){
        handleDelete(e, projet.id)
        getTotal()
    }
    return (
        <div onClick={()=> toProject(projet.id)} className='cursor-pointer bg-slate-300 rounded-lg p-3 m-1'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>{projet.nom.toLocaleUpperCase()}</h4>
                <div className='flex text-xs justify-center items-center'>
                    <span className='py-1 px-2 bg-green-500 rounded-full text-white'>{`${total} ${devise}`}</span>
                    <button onClick={(e:any) => deleteRefresh(e) } className='py-1 px-2 bg-red-500 ml-1 rounded-full text-white'>
                        <ClearOutlined/>
                    </button>
                </div>
            </div>
            <h5>{projet.lieu}</h5>
        </div>
    );
};

export default ProjetDiv;