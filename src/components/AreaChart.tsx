import React, { FunctionComponent , useState } from 'react';
import Chart from 'react-apexcharts'

const AreaChart : FunctionComponent = () => {
    
    const series = [{
        data : [30 , 40 , 45 , 50 , 48]
    }]

    const options = {
        chart : {
            height : 350
        },
        plotOptions : {
            bar : {
                horizontal : true
            }
        },
        xaxis : {
            categories : ['A' , 'B' , 'C' , 'D' , 'E']
        }
    }
    
    return (
        <>
            <Chart options={options} series={series} type='area' height={200}/>
        </>
    );
};

export default AreaChart;