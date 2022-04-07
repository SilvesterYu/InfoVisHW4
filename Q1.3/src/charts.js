import React from "react";
import { scaleLinear, scaleBand, area, max, min, curveBasis, map } from "d3";

function SymmetricBarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedStation, setSelectedStation } = props;
    // --Define a scale for the x-axis -- //
    const xScale = scaleBand().range([0, width]).domain(map(data, d => d.station));

    // -- Define two scales for the y-axis -- //
    // -- upper one -- //
    const yScale1 = scaleLinear().range([height/2, 0]).domain([0, max(data, d=>d.start)]).nice();
    // -- lower one -- //
    const yScale2 = scaleLinear().range([0, height/2]).domain([0, max(data, d=>d.end)]).nice();
    
    const getColor = (pos, selectedStation, d) => {
        if (selectedStation === d.station){
            if (pos === "up") {
                return "red";
            } else if (pos === "down") {
                return "steelblue";
         }
        } else {
            if (pos === "up"){
                return "#99d594";
            } else if (pos === "down") {
                return "#fc8d59";
            }
        }
    }

    const mouseEnter = (d, event) => {
        setSelectedStation(d.station);
    }
    const mouseOut = (d, event) => {
        setSelectedStation(null);
    }
    

    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, 0)`}>
                {"Num. of ridders start from a station"}
        </text>
        {/* start your code here */}
        <line x1={0} x2={width} y1={height/2} y2={height/2} stroke="black" />
        <line y2={height/2} stroke='black'/>
        {yScale1.ticks(5).map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale1(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} >
                    {tickValue}
                </text>
                </g> )}

        {data.map(d=>{
                return (
                <rect key={d.station} x={xScale(d.station)} y={yScale1(d.start)} 
                height={height/2-yScale1(d.start)} width={xScale.bandwidth()} fill={getColor("up", selectedStation, d)} stroke={"black"}
                onMouseEnter={(event) => mouseEnter(d, event)} onMouseOut={(event)=>mouseOut(d, event)}></rect>
                )
                })}
        
        
        <g transform={`translate(${0}, ${height/2})`}>
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'15px'}} transform={`translate(${width/3}, ${height/2+10})`}>
            {"Num. of ridders end into a station"}
            </text>
            {/* start your code here */}
            <line y2={height/2} stroke='black'/>
            {yScale2.ticks(5).map(tickValue => 
                <g key={tickValue} transform={`translate(-10, ${yScale2(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'end', fontSize:'10px' }} >
                        {tickValue}
                    </text>
                    </g> )}
                {data.map(d=>{
                    return (
                    <rect key={d.station} x={xScale(d.station)} y={0} 
                    height={yScale2(d.end)} width={xScale.bandwidth()} fill={getColor("down", selectedStation, d)} stroke={"black"}
                    onMouseEnter={(event) => mouseEnter(d, event)} onMouseOut={(event)=>mouseOut(d, event)}></rect>
                    )
                    })}
            
        </g>
    </g>
}

function SymmetricAreaChart(props) {
    const { offsetX, offsetY, data, height, width } = props;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const xScale = scaleBand().range([0, width]).domain(map(data, d => d.month));
    // -- upper one -- //
    const yScale1 = scaleLinear().range([height/2, 0]).domain([0, max(data, d=>d.start)]).nice();
    // -- lower one -- //
    const yScale2 = scaleLinear().range([0, height/2]).domain([0, max(data, d=>d.end)]).nice();
    // -- define the areas -- //
    const p1 = area()
    .x(d => xScale(d.month))
    .y0(height/2)
    .y1(d => yScale1(d.start))
    .curve(curveBasis)
     (data);
     const p2 = area()
    .x(d => xScale(d.month))
    .y0(d => height - yScale1(d.end))
    .y1(height/2)
    .curve(curveBasis)
     (data);

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
    {/* upper half of the chart */}
    <line y1={0} y2={height/2} stroke='black'/>`
    {yScale1.ticks(5).map(tickValue => 
        <g key={tickValue} transform={`translate(-10, ${yScale1(tickValue)})`}>
            <line x2={10} stroke='black' />
            <text style={{ textAnchor:'end', fontSize:'10px' }} >
                {tickValue}
            </text>
            </g> 
        )}
    <path d={p1} fill={'lightgreen'} stroke={'black'} />
    <path d={p2} fill={'pink'} stroke={'black'} />
    

    {/* x-axis line */}
    {<line x1={0} y1={height/2} x2={width} y2={height/2} stroke='black'/>}

    {/* lower half of the chart */}
    <g transform={`translate(${0}, ${height/2})`}>
        <line y1={0} y2={height/2} stroke='black'/>`
        {yScale2.ticks(5).reverse().map(tickValue => 
        <g key={tickValue} transform={`translate(-10, ${yScale2(tickValue)})`}>
            <line x2={10} stroke='black' />
            <text style={{ textAnchor:'end', fontSize:'10px' }} >
                {tickValue}
            </text>
            </g> 
        )}
        {xScale.domain().map(tickValue =>
            <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
                <line y1={height/2 + 10} y2={height/2 + 20} stroke={'black'}/>
                <text x={-8} style={{textAnchor: 'start', fontSize:'10px' }} y={height/2 + 30} transform={`rotate(0, 0, ${height+3})`}>
                    {tickValue}
                </text>
            </g>
        )}
    </g>


    </g>
}

export { SymmetricAreaChart, SymmetricBarChart }

