import React, { FunctionComponent, useState , useEffect } from 'react';
import BarChart from '../components/BarChart';
import AreaChart from '../components/AreaChart';
import { IUser, StatType } from '../types/data';
import UseCurrentUser from '../hooks/UseCurrentUser';
import UseProjet from '../hooks/useProjet';

const Stats : FunctionComponent = () => {
    const [user , setUser] = useState<IUser>()
    const [series , setSeries] = useState<string[]>()
    const [valeur , setValeur] = useState<number[]>()
    const { getCurrentUser } = UseCurrentUser()
    const {getUserStat} = UseProjet()

    useEffect(()=>{
        getData()
    },[])

    function getData(){
        getCurrentUser()?.then((e:any)=>{
            setUser(e.data)
            getUserStat(e.data.id).then((ee:any)=>{
                const d = ee.data
                let series : string[] = [] , valeurs : number[] = []
                for (let i = 0; i < d.length; i++) {
                    series = [...series , d[i].nom]
                    valeurs = [...valeurs , d[i].value]
                }
                setSeries(series)
                setValeur(valeurs)
            })
        })
        .catch((err:any)=>{})
    }

    return (
        <div className='w-4/5 min-h-screen pt-20 px-10'>
            <div className="w-full pt-10">
            { series && valeur && <BarChart series={series} values={valeur}/> }  
            </div>
        </div>
    );
};

export default Stats;