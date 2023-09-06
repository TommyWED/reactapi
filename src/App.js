import './App.css';
import React from "react";
import {useState} from "react"
import Kmb from './Kmb';
import Mtr from './Mtr'



function App() {
  const [KOM, setKOM] = useState("KMB")

  function handleKMB (){
    setKOM(n => "KMB")
  }

  function handleMTR (){
    setKOM(n=> "MTR")
  }
  return (
    <div className="App">
      <div className="select">
        <div className="KOM KmbR" onClick={handleKMB}>KMB</div>
        <div className="KOM MtrL" onClick={handleMTR}>MTR</div>
      </div>
      {KOM === "KMB" &&　<Kmb />}
      {KOM === "MTR" && <Mtr />}
    </div>
  );
}

export default App;
