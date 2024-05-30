import React, { FunctionComponent , useState } from 'react';
import Chart from 'react-apexcharts'

interface BChartProps{
    series : string[],
    values : number[]
}

const BarChart : FunctionComponent<BChartProps> = (props) => {
    
    const {series , values} = props

    const serie = [{
        data : values
    }]

    const options = {
        chart : {
            height : 300
        },
        plotOptions : {
            bar : {
                horizontal : true
            }
        },
        xaxis : {
            categories : series
        }
    }

    
    return (
        <>
            <Chart options={options} series={serie} type='bar' height={200}/>
        </>
    );
};

export default BarChart;