import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import "./styles.css";
import { SymbolMap } from "./symbolMap";
import { SymmetricBarChart } from "./charts";
import { Tooltip } from "./tooltip";



const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv';
const mapUrl = "https://gist.githubusercontent.com/hogwild/6784f0d85e8837b9926c184c65ca8ed0/raw/2040d6883cf822817e34b5bda885348ec6214572/jerseyCity_geojson.json";

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
                d.latitude = +d.latitude;
                d.longitude = +d.longitude;
                d.popularity = d.start + d.end; //derive a new attribute: popularity
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}

function CitiBike(){
    const [month, setMonth] = React.useState('4');
    const [selectedStation, setSelectedStation] = React.useState(null);

    const WIDTH = 1200;
    const HEIGHT = 800;
    const margin = { top: 20, right: 40, bottom: 160, left: 40, gap:40 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const dataAll = useData(csvUrl);
    const map = useMap(mapUrl);
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (!map || !dataAll) {
            return <pre>Loading...</pre>;
        };

    // console.log(map, dataAll);
    const changeHandler = (event) => {
        setMonth(event.target.value);
    }
    const data = dataAll.filter( d => {
        return d.month === MONTH[month];
    });
    // console.log(data);
    const selectedPoint = dataAll.filter(d => d.station===selectedStation)[0];
     //Note: stationYearData is the data of the year of a seleted station. 
     const stationYearData = dataAll.filter( d=> {
        return d.station == selectedStation;
    }); 
    
    return <div>
        <div>
            <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
            <input key="monthText" type="text" value={MONTH[month]} readOnly/>
        </div>
            <svg width={WIDTH} height={HEIGHT}>
                <g>
                <SymbolMap offsetX={margin.left} offsetY={margin.top} height={innerHeight} 
                width={(innerWidth-margin.gap)/2} data={data} map={map} selectedStation={selectedStation} 
                setSelectedStation={setSelectedStation}/>
                <SymmetricBarChart offsetX={margin.left+innerWidth/2} offsetY={margin.top} data={data} height={(innerHeight-margin.gap)/2} 
                width={(innerWidth-margin.gap)/2} selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
                </g>
                <Tooltip d={selectedPoint} stationYearData={stationYearData} left={margin.left+innerWidth/2} 
                top={margin.top+40+innerHeight/2} height={(innerHeight-margin.gap)/2} width={(innerWidth-margin.gap)/2}/>
            </svg>
        <div style={{position: "absolute", textAlign: "left", width: "240px",left:"40px", top:"40px"}}>
            <h3>Citi bike 2020</h3>
            <p>A visualization of the numbers of citi bike riders over 2020.</p>
        </div>
        
    </div>
}

ReactDOM.render(<CitiBike/ >, document.getElementById("root"));