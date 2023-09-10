import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Mtrtime( {line, station}){
    const [timeArr, setTimeArr] = useState()
    useEffect(()=>{
        async function fetchtime(){
            try{
                const response = await axios.get(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`)
                setTimeArr(n=> response.data)
                console.log(response.data)
            } catch (error){
                console.log(error)
            }
        }
        fetchtime()
    },[line,station])
    
    // function handleCon(){
    //     console.log(timeArr)
    // }

    return (
        <div>
            {line}
            {station}
        </div>
    )
}