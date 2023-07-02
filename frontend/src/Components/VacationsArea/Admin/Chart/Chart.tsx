import React, { useEffect, useState } from 'react';
import VacationModel from "../../../../Models/Vacation-model";
import vacationService from "../../../../Services/VacationService";
import { FaChartBar, FaChartPie } from 'react-icons/fa';
import { Button } from '@mui/material';
import useVerifyAdmin from '../../../../Utils/UseVerifyAdmin';
import notifyService from '../../../../Services/NotifyService';


const Canvas = require("canvasjs-react-charts");
var CanvasJSChart = Canvas.CanvasJSChart;

function Chart(): JSX.Element {
useVerifyAdmin()

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [chartType, setChartType] = useState<'column' | 'pie'>('column');

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((v) => {
        setVacations(v);
      })
      .catch((err: any) => {
        notifyService.error(err);
      });
  }, []);

  const dataPoints = vacations.map((vacation) => ({
    label: vacation.destination,
    y: vacation.followerCount,
  }));

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Vacations Report",
    },
    
axisX: {
  interval: 1,
  labelMaxWidth: 100,
  labelWrap: true,
  labelAutoFit: true,
  labelFontSize: 12,
  labelAngle: -45,
  title: "Destinations",
},
    data: [
      {
        type: chartType,
        startAngle: chartType === 'pie' ? 75 : undefined,
        toolTipContent: chartType === 'pie' ? "<b>{label}</b>: {y}%" : undefined,
        showInLegend: chartType === 'pie',
        legendText: "{label}",
        indexLabelFontSize: 12,
        indexLabel: chartType === 'pie' ? "{label} - {y}%" : undefined,
        dataPoints: dataPoints,
      },
    ],
  };

  const handleChartTypeChange = () => {
    setChartType((prevType) => (prevType === 'column' ? 'pie' : 'column'));
  };

  return (
    <div className="Chart">

<div style={{ display: 'flex', alignItems: 'flex-start' }}>
  <Button className="buttonMode" style={{ backgroundColor: 'white',height:"50px" ,fontSize:"20px"}} onClick={handleChartTypeChange}>

    {chartType === 'column' ? <FaChartBar /> : <FaChartPie />}
  </Button>
</div>


       
        <CanvasJSChart options={options} />
      
    </div>
  );
}

export default Chart;
