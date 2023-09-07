import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';


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
    const stopobj = {}
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
        // async function matchName(){
        //     try{
                
        //     } catch (error){
        //         console.log(error)
        //     }
        // }
        // matchName()
    },[])

    // useEffect(()=>{
    //     for(let i=0;i<stopName.data.length;i++){
    //         // stopobj[stopName.data[i].stop] = stopName.data[i].name_tc
    //         console.log(stopName.data[i].stop)
    //     }
    // },[stopName])


    function handleSearch(){
        
        // console.log(stopInfo.data.filter((n)=> n.route == searchRoute).filter((n)=> n.bound === direction))
        // console.log(stopName)
        // console.log(stopName.data)
        // console.log(stopobj)
        // console.log(stopName.data[0].stop)
        // console.log(stopName.data[0].name_tc)
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
        // console.log(stopInfo.data)
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
                {TOF === true && stopInfo.data.filter((n)=> n.route === searchRoute).filter((n)=> n.bound === direction).map((n)=> <p className="stopList">{count++} . {stopobj[n.stop]}</p>)}
            </div>
        </div>
    )   
}