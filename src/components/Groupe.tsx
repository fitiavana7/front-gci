import React , {FunctionComponent , useEffect , useState} from 'react';
import { ClearOutlined , PlusCircleOutlined} from '@ant-design/icons';
import { message } from 'antd';
import { IGroup, IProject } from '../types/data';
import useGroupe from '../hooks/useGroupe';
import UseCurrentUser from '../hooks/UseCurrentUser';
import ItemModal from './ItemModal';

interface GroupeProps{
    projet : IProject,
    show : ()=> void,
    groupe : IGroup ,
    handleDelete : (e : any , id : number | undefined)=> void , 
}

const Groupe : FunctionComponent<GroupeProps> = (props) => {
    const {getGroupeTotal} = useGroupe()
    const [total , setTotal] = useState<number>(0)
    const [devise , setDevise] = useState<string>("")
    const {getCurrentUser} = UseCurrentUser()
    const [showItemModal , setShowItemModal] = useState<boolean>(false)
    const {projet , show} = props
    useEffect(()=>{
        getTotal()
        getCurrentUser()?.then((e:any)=>{
            setDevise(e.data.devise);
        }).catch((err:any)=>{})
    },[])

    function showModal(){
        getTotal()
        show()
    }
    function showTheGroup() {
        setShowItemModal(!showItemModal)
   }

    function getTotal(){
        if(groupe.id){
            getGroupeTotal(groupe?.id).then((e:any)=>{
                setTotal(e.data);
            }).catch((err:any)=>{
                setTotal(0);
            })
        }
    }

    const {groupe , handleDelete} = props

    return (
        <div onClick={()=> showTheGroup()} className='bg-slate-300 rounded-md p-3 cursor-pointer m-2'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-base'>{groupe.nom.toLocaleUpperCase()}</h4>
                <div className='flex text-xs justify-center items-center'>
                    <span className='py-1 px-2 bg-green-500 rounded-full text-white'>{`${total} ${devise}`}</span>
                    <button onClick={(e:any) => handleDelete(e , groupe.id) } className='py-1 px-2 bg-red-500 ml-1 rounded-full text-white'>
                        <ClearOutlined/>
                    </button>
                </div>
            </div>
            <div className='text-xs my-1 text-justify'>
                {groupe.description}
            </div>
             {
                showItemModal && projet &&
                <ItemModal devise={devise} project={projet} show={showModal} groupe={groupe}/>
            }
        </div>      
    );
};

export default Groupe;