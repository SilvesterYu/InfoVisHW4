import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";

export function SymbolMap(props) {
    const {offsetX, offsetY, map, data, height, width, selectedStation, setSelectedStation} = props;
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            

        </g>
    
}