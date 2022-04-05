import React from "react";
import { scaleLinear, scaleBand, area, max, curveBasis } from "d3";

function SymmetricBarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedStation, setSelectedStation } = props;
       

    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, 0)`}>
                {"Num. of ridders start from a station"}
        </text>
        {/* start your code here */}
        

        <g transform={`translate(${0}, ${height/2})`}>
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, ${height/2+10})`}>
            {"Num. of ridders end into a station"}
            </text>
            {/* start your code here */}
            
        </g>
    </g>
}

function SymmetricAreaChart(props) {
    const { offsetX, offsetY, data, height, width } = props;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${20})rotate(0)`}>
                {"Start"}
        </text>
        <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width*2/3}, ${-10})rotate(0)`}>
                {"Num. of riders over the year"}
        </text>
        <g transform={`translate(${offsetX}, ${offsetY+height/2})`}>
            <text style={{ textAnchor:'end', fontSize:'15px'}} transform={`translate(${width}, ${height/2-20})rotate(0)`}>
                {"End"}
        </text>
        </g>
        {/* start your code here */}
        
    </g>
}

export { SymmetricAreaChart, SymmetricBarChart }

