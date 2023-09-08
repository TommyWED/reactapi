import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Kmbtime from './Kmbtime';


// 路線列表數據 https://data.etabus.gov.hk/v1/transport/kmb/route/
// 巴士站列表數據 https://data.etabus.gov.hk/v1/transport/kmb/stop
// 巴士站數據 https://data.etabus.gov.hk/v1/transport/kmb/stop/{stop_id}
// 路線-巴士站 列表數據 https://data.etabus.gov.hk/v1/transport/kmb/route-stop
// 路線-巴士站數據 https://data.etabus.gov.hk/v1/transport/kmb/route-stop/{route}/{direction}/{service_type}
// 預計到達時間數據  https://data.etabus.gov.hk/v1/transport/kmb/eta/{stop_id}/{route}/{service_type}
// 預計到達時間數據(巴士站) https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/{stop_id}
// 預計到達時間數據(路線) https://data.etabus.gov.hk/v1/transport/kmb/route-eta/{route}/{service_type}


//https://data.etabus.gov.hk/v1/transport/kmb/route-stop
//https://data.etabus.gov.hk/v1/transport/kmb/stop
//https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}`


export default function Kmb() {
    const [stop,setStop] = useState([])
    const [direction, setDirection] = useState("O")
    const [searchRoute, setSearchRoute] = useState("")
    const [stopInfo,setStopInfo] = useState([])
    const [TOF,setTOF] = useState(false)
    const [stopName, setStopName] = useState([])
    const [stopobj, setStopobj] = useState({})
    const [showData, setShowData] = useState("")
    let count = 1
    useEffect(()=>{
        async function fetchStopData(){
            try {
                const response = await axios.get("https://data.etabus.gov.hk/v1/transport/kmb/route-stop")
                setStopInfo(n=> response.data)
                setTOF(n=>true)
            } catch (error) {
                console.log(error)
            }
        };
        async function fetchStopName(){
            try{
                const response = await axios.get("https://data.etabus.gov.hk/v1/transport/kmb/stop")
                setStopName(n => response.data)
            } catch (error){
                console.log(error)
            }
        }
        fetchStopData();
        fetchStopName();
    },[])

    useEffect(()=>{
        var tempobj = {}
        if (stopName && stopName.data){
            for(let i=0;i<stopName.data.length;i++){
                tempobj[stopName.data[i].stop] = stopName.data[i].name_tc
            }
        }
        setStopobj(n=> tempobj)
    },[stopName])

    // useEffect(()=>{
        
    //     try{
    //         const response = await axios.get("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}")
    //         setStop(n=> response.data)
    //     }catch (error) {
    //         console.log(error)
    //     }
    // },[showData])
    function handleSearch(){
        console.log(stopobj)
        
    }

    function handleInputChange(e){
        setSearchRoute(n=> e.target.value.toUpperCase())
        count = 0;
    }

    function handleReverse(){
        if(direction ==="O"){
            setDirection(n=> "I")
        }else{
            setDirection(n=>"O")
        }

    }

    function handleShow(e){
        setShowData(n=>e.target.dataset.stopid)
        console.log(showData)
    }

    return(
        <div className="KMBContent">
            <div className="KmbHead">
                <div className="KmbSearch">
                    <span>Route:</span><input type="text" value={searchRoute} onChange={handleInputChange}></input>
                </div>
                <div className="KmbBtn">
                    <button type="button" onClick={handleSearch}>Search</button>
                    <button type="button" onClick={handleReverse}>Reverse</button>
                </div>
            </div>
            <hr></hr>
            <hr></hr>
            <div className="KmbList">
                {TOF === true && stopInfo.data.filter((n)=> n.route === searchRoute)
                .filter((n)=> n.bound === direction)
                .map((n)=> <div className="stopList"><h3 data-stopid={n.stop} onClick={handleShow} >{count++} . {stopobj[n.stop]}</h3><br></br>
                {showData === n.stop &&<Kmbtime stop={n.stop} direction={direction} searchRoute={searchRoute}/>}</div>)}
            </div>
        </div>
    )   
}