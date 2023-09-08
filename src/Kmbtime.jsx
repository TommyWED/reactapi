import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Kmbtime( {stop, direction, searchRoute}){
    const [timeArr, setTimeArr] = useState()
    useEffect(()=>{
        async function fetchtime(){
            try{
                const response = await axios.get(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stop}`)
                setTimeArr(n=> response.data)
                
            } catch (error){
                console.log(error)
            }
        }
        fetchtime()
    },[])
    
    function handleCon(){
        console.log(timeArr)
    }

    return (
        <div>
            {(timeArr && timeArr.data) && timeArr.data.filter(n => (n.route === searchRoute) && (n.dir === direction)).map((n) => <p>{n.eta}</p>)}
        </div>
    )
}