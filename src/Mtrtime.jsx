import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Mtrtime( {line, station,lang, lineStationObj}){
    
    const [timeArr, setTimeArr] = useState()
    const LS = `${line}-${station}`
    // const destobj =({"HOK":["Hong Kong", "香港"], "AWE": ["AsiaWorld Expo", '博覽會'],"TUC": ["Tung Chung", '東涌'],"WKS": ['Wu Kai Sha', '烏溪沙'] ,
    // 'TUM': ['Tuen Mun', '屯門'], 'NOP':  ['North Point', '北角'], 'POA': ['Po Lam', '寶琳'], 'LHP': ['LOHAS Park', '康城'], 'ADM':['Admiralty', '金鐘'], 'LOW': [ 'Lo Wu', '羅湖'], 'LMC': ['Lok Ma Chau', '落馬洲'], 
    // 'SOH': ['South Horizons', '海怡半島'], 'CEN': ['Central', '中環'], 'TSW': ['Tsuen Wan', '荃灣'], 'CHW': ['Chai Wan', '柴灣'], 'KET': ['Kennedy Town', '堅尼地城'],'SHS': ['Sheung Shui', '上水'],'HUH': ['Hung Hom', '紅磡']
    // ,'TAW': ['Tai Wai', '大圍'], 'TIK': [ 'Tiu Keng Leng', '調景嶺'] })
    const [TOFUP, setTOFUP] = useState(false)
    const [TOFD, setTOFD] = useState(false)
    const destobj = {}
    const direction = ["destination","目的地"]
    const platform = ["Platform", "號月台"]
    const linearr = ["AEL", "TCL", "TML", "TKL", "EAL", "SIL", "TWL", "ISL"]
    for(let i=0; i<linearr.length;i++){
        for(let j =0; j<lineStationObj[linearr[i]].length;j++){
            destobj[lineStationObj[linearr[i]][j][0]] = [lineStationObj[linearr[i]][j][1] , lineStationObj[linearr[i]][j][2]]
        }
    }
    useEffect(()=>{
        async function fetchtime(){
            try{
                const response = await axios.get(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`)
                setTimeArr(n=> response.data)
                if(response.data.data[LS].UP){
                    setTOFUP(n=> true)
                }else{
                    setTOFUP(n=> false)
                }
                if(response.data.data[LS].DOWN){
                    setTOFD(n=> true)
                }else{
                    setTOFD(n=> false)
                }

            } catch (error){
                console.log(error)
            }
        }
        fetchtime()

    },[line,station])


    function handleCon(){
        // console.log(timeArr.data[`${line}-${station}`])
        // console.log(LS)
        // console.log(destobj)\
        console.log(timeArr?.data[LS])
    }
    
    return (
        <div className="KmbList">
            {/* <button type="button" onClick={handleCon}>console</button> */}
            {timeArr?.data[LS]?.UP && lang === 2 ? (
              <h2>
                {timeArr.data[LS].UP[0].plat}
                {platform[lang - 1]}
              </h2>
            ) : (
              <h2>
                {platform[lang - 1]}
                {timeArr?.data[LS]?.UP ? timeArr.data[LS].UP[0].plat : ''}
              </h2>
            )}
            {(timeArr && TOFUP) && timeArr?.data[LS]?.UP?.map((n) =>  <p className="MtrEta"> {direction[lang-1]} : {destobj[n.dest][lang-1]} {n.time.substring(11,19)} </p>)}
            {timeArr?.data[LS]?.DOWN && lang === 2 ? (
              <h2>
                {timeArr.data[LS].DOWN[0].plat}
                {platform[lang - 1]}
              </h2>
            ) : (
              <h2>
                {platform[lang - 1]}
                {timeArr?.data[LS]?.DOWN ? timeArr.data[LS].DOWN[0].plat : ''}
              </h2>
            )}
            {TOFD && timeArr?.data[LS]?.DOWN?.map((n) =>  <p className="MtrEta"> {direction[lang-1]} : <span>{destobj[n.dest][lang-1]}</span>  <span>{n.time.substring(11,19)}</span> </p>)}
        </div>
    )
}