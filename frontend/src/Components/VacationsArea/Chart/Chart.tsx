import "./Chart.css";
import React, { useEffect, useState } from 'react';

import VacationModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
const Canvas = require("canvasjs-react-charts")
var CanvasJSChart = Canvas.CanvasJSChart;


function Chart(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
      vacationService.getAllVacations()
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
      data: [{
        type: "column",
        dataPoints: dataPoints,
      }],
    };
    return (
        <div className="Chart">
          <div>
			  <CanvasJSChart options={options} />
        </div>
        </div>
    );
}

export default Chart;
