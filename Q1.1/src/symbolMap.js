import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";

export function SymbolMap(props) {
    const {offsetX, offsetY, map, data, height, width, selectedStation, setSelectedStation} = props;

    // -- projection -- //
    const projection = geoMercator().fitSize([width, height], map);
    let path = geoPath(projection);
    // -- radius differ with the popularity -- //
    const radius = scaleLinear().range([2, 20]).domain([min(data, d=> d.popularity), max(data, d => d.popularity)]);
    const getColor = (selectedStation, station) => {
        return selectedStation && station === selectedStation ? "steelblue" : "red";
    }

    const mouseOver = (d) => {
        setSelectedStation(d);
    }
    const mouseOut = (d) => {
        setSelectedStation(null);
    }
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
       {map.features.map((feature, idx) => {
                return <path key={idx+"boundary"} className={"boundary"} d={path(feature)} />
            })}
            {data.map(d => {
                // -- projection: find location of the items -- //
                const [x, y] =  projection([d.longitude, d.latitude]);
                return <circle key={"station" + d.longitude+d.latitude} cx={x} cy={y} r={radius(d.popularity)} opacity={0.7} 
                    fill={getColor(selectedStation, d)} stroke={"black"} onMouseEnter={()=>{mouseOver(d)}} onMouseOut={mouseOut} />
            })}
        </g>
    
}