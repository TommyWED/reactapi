import './App.css';
import React, {useState} from 'react'
import Mtrtime from './Mtrtime';


export default function Mtr() {
    const allLine = [['AEL', 'Airport Express', '機場快線'], ['TCL', 'Tung Chung Line', '東涌線'], ['TML', 'Tuen Ma Line', '屯馬線'], ['TKL', 'Tseung Kwan O Line', '將軍澳線'], ['EAL', 'East Rail Line', '東鐵線'], ['SIL', 'South Island Line', '南港島線'], ['TWL', 'Tsuen Wan Line', '荃灣線'], ['ISL', 'Island Line', '港島線']]
    const lineStationObj = ({"AEL":[['HOK',"Hong Kong", '香港'],['KOW',"Kowloon", '九龍'],['TSY', "Tsing Yi", '青衣'],['AIR', "Airport", '機場'], ['AWE', "AsiaWorld Expo", '博覽會']]
    ,"TCL":[['HOK', "Hong Kong", '香港'], ['KOW',"Kowloon", '九龍'], ['OLY', "Olympic", '奧運'], ['NAC', "Nam Cheong", '南昌'], ['LAK', "Lai King", '荔景'], ['TSY', "Tsing Yi", '青衣'], ['SUN', "Sunny Bay", '欣澳'], ['TUC', "Tung Chung", '東涌']]
    , "TML":[['WKS', 'Wu Kai Sha', '烏溪沙'], ['MOS', 'Ma On Shan',  '馬鞍山'], ['HEO', 'Heng On', '恒安'], ['TSH', 'Tai Shui Hang', '大水坑'], ['SHM', 'Shek Mun', '石門'], ['CIO', 'City One', '第一城'], ['STW', 'Sha Tin Wai', '沙田圍'], ['CKT', 'Che Kung Temple', '車公廟'], ['TAW', 'Tai Wai', '大圍'], ['HIK', 'Hin Keng', '顯徑'], ['DIH', 'Diamond Hill', '鑽石山'], ['KAT', 'Kai Tak', '啟德']	, ['SUW', 'Sung Wong Toi', '宋皇臺'], ['TKW', 'To Kwa Wan', '土瓜灣'], ['HOM', 'Ho Man Tin', '何文田'], ['HUH', 'Hung Hom', '紅磡'], ['ETS', 'East Tsim Sha Tsui', '尖東'], ['AUS', 'Austin', '柯士甸'], ['NAC', 'Nam Cheong', '南昌'], ['MEF', 'Mei Foo', '美孚'], ['TWW', 'Tsuen Wan West', '荃灣西'], ['KSR', 'Kam Sheung Road', '錦上路'], ['YUL', 'Yuen Long', '元朗'], ['LOP', 'Long Ping', '朗屏'], ['TIS', 'Tin Shui Wai', '天水圍'], ['SIH', 'Siu Hong', '兆康'], ['TUM', 'Tuen Mun', '屯門']]
    ,"TKL":[['NOP', 'North Point', '北角'], ['QUB', 'Quarry Bay', '鰂魚涌'], ['YAT', 'Yau Tong', '油塘'], ['TIK', 'Tiu Keng Leng', '調景嶺'], ['TKO', 'Tseung Kwan O', '將軍澳'], ['HAH', 'Hang Hau', '坑口'], ['POA', 'Po Lam', '寶琳'], ['LHP', 'LOHAS Park', '康城']]
    , "EAL":[['ADM', 'Admiralty', '金鐘'], ['EXC', 'Exhibition Centre', '會展'], ['HUH', 'Hung Hom', '紅磡'], ['MKK', 'Mong Kok East', '旺角東'], ['KOT', 'Kowloon Tong', '九龍塘'], ['TAW', 'Tai Wai', '大圍'], ['SHT', 'Sha Tin', '沙田'], ['FOT', 'Fo Tan', '火炭'], ['RAC', 'Racecourse', '馬場'], ['UNI', 'University', '大學'], ['TAP', 'Tai Po Market', '大埔墟'], ['TWO', 'Tai Wo', '太和'], ['FAN', 'Fanling', '粉嶺'], ['SHS', 'Sheung Shui', '上水'], ['LOW', 'Lo Wu', '羅湖'], ['LMC', 'Lok Ma Chau', '落馬洲']]
    , "SIL":[['ADM', 'Admiralty', '金鐘'], ['OCP', 'Ocean Park', '海洋公園'], ['WCH', 'Wong Chuk Hang', '黃竹坑'], ['LET', 'Lei Tung', '利東'], ['SOH', 'South Horizons', '海怡半島']]
    , "TWL":[['CEN', 'Central', '中環'], ['ADM', 'Admiralty', '金鐘'], ['TST', 'Tsim Sha Tsui', '尖沙咀'], ['JOR', 'Jordan', '佐敦'], ['YMT', 'Yau Ma Tei', '油麻地'], ['MOK', 'Mong Kok', '旺角'], ['PRE', 'Price Edward', '太子'], ['SSP', 'Sham Shui Po', '深水埗'], ['CSW', 'Cheung Sha Wan', '長沙灣'], ['LCK', 'Lai Chi Kok', '荔枝角'], ['MEF', 'Mei Foo', '美孚'], ['LAK', 'Lai King', '荔景'], ['KWF', 'Kwai Fong', '葵芳'], ['KWH', 'Kwai Hing', '葵興'], ['TWH', 'Tai Wo Hau', '大窩口'], ['TSW', 'Tsuen Wan', '荃灣']]
    , "ISL":[['KET', 'Kennedy Town', '堅尼地城'], ['HKU', 'HKU', '香港大學'], ['SYP', 'Sai Ying Pun', '西營盤'], ['SHW', 'Sheung Wan', '上環'], ['CEN', 'Central', '中環'], ['ADM', 'Admiralty', '金鐘'], ['WAC', 'Wan Chai', '灣仔'], ['CAB', 'Causeway Bay', '銅鑼灣'], ['TIH', 'Tin Hau', '天后'], ['FOH', 'Fortress Hill', '炮台山'], ['NOP', 'North Point', '北角'], ['QUB', 'Quarry Bay', '鰂魚涌'], ['TAK', 'Tai Koo', '太古'], ['SWH', 'Sai Wan Ho', '西灣河'], ['SKW', 'Shau Kei Wan', '筲箕灣'], ['HFC', 'Heng Fa Chuen', '杏花邨'], ['CHW', 'Chai Wan', '柴灣']]})
    const [line, setLine] = useState("AEL");
    // const AELLINE = {"name": "Airport Express", "sta":[["HOK","Hong Kong"], ["KOW","Kowloon"], "TSY", "AIR", "AWE"]}
    const [lang, setLang] = useState(1)
    const [station, setStation] = useState("HOK")
    const linearr = ["", 'Line', ' 線路']
    const stationarr = ["", "Station", "站"]
    //one array , one object
    function handleLine(e){
        setLine(n=> e.target.value)
        setStation(n=> lineStationObj[e.target.value][0][0])
    }

    function handleStat(e){
        setStation(n=> e.target.value)
    }

    function handleChin(){
        setLang(n=>2)
    }

    function handleEng(){
        setLang(n=>1)
    }
    return(
        <div className="MTRContent">
            <div className="MtrBtn">
                <button type="button" onClick={handleChin}>中文</button>
                <button type="button" onClick={handleEng}>English</button>
            </div>
            <div className="MtrHead">
                <div>
                    {linearr[lang]} : <select onChange={handleLine}>
                    {allLine.map((n)=> <option value={n[0]} key={n[0]}>{n[lang]}</option>)}
                    </select>
                </div>
                <div>
                    {stationarr[lang]} : <select onChange={handleStat}> 
                    {lineStationObj[line].map((n)=> <option value={n[0]} key={n[0]}>{n[lang]}</option>)}
                    </select>
                </div>
                
            </div>
            <hr></hr><hr></hr>
            <Mtrtime line={line} station={station} lang={lang} lineStationObj={lineStationObj}/>
        </div>
    )   
}