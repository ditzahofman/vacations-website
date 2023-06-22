import React, { useEffect, useState } from 'react';
import VacationModel from "../../../../Models/Vacation-model";
import vacationService from "../../../../Services/VacationService";
import { FaChartBar, FaChartPie } from 'react-icons/fa';
import { Button } from '@mui/material';
const Canvas = require("canvasjs-react-charts");
var CanvasJSChart = Canvas.CanvasJSChart;

function Chart(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [chartType, setChartType] = useState<'column' | 'pie'>('column');

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((v) => {
        setVacations(v);
      })
      .catch((err: any) => {
        alert(err);
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
      text: "Vacation Follower Count",
    },
    data: [
      {
        type: chartType,
        startAngle: chartType === 'pie' ? 75 : undefined,
        toolTipContent: chartType === 'pie' ? "<b>{label}</b>: {y}%" : undefined,
        showInLegend: chartType === 'pie',
        legendText: "{label}",
        indexLabelFontSize: 16,
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
  <Button className="buttonMode" style={{ backgroundColor: 'white',height:"50px" ,fontSize:"30px"}} onClick={handleChartTypeChange}>

    {chartType === 'column' ? <FaChartBar /> : <FaChartPie />}
  </Button>
</div>


       
        <CanvasJSChart options={options} />
      
    </div>
  );
}

export default Chart;
