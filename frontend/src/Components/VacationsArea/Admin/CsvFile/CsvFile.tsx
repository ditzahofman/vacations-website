import "./CsvFile.css";
import React, { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import vacationService from "../../../../Services/VacationService";
import VacationdModel from "../../../../Models/Vacation-model";
import {stringify} from 'csv-stringify/browser/esm/sync';
import { IconButton, Tooltip } from "@mui/material";
import useVerifyAdmin from "../../../../Utils/UseVerifyAdmin";
import { useNavigate } from "react-router-dom";

function CsvFile(): JSX.Element  {
  useVerifyAdmin()
  const navigate=useNavigate()
    const handleExport = async () => {
      // Make an API call to get the data
   
      const data = await vacationService.getAllVacations()
      
      // Format the data into an array of objects
      const csvData = data.map(item => {
        return {
        Destination:item.destination,
         Description: item.description,
          StartDate: item.startDate,
          endDate:item.endDate,
          Followers:item.followerCount,
          Price:item.price
        };

      });
      
      // Convert the array of objects into a CSV string
      const output = stringify(csvData, { header: true });
        
      // Create a download link for the CSV file
      const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      navigate("/home")
    };
    return (
        <div className="CsvFile">
            <Tooltip title="Csv-file">
                <IconButton className="filterButtons add"onClick={handleExport}>
               <FileDownloadIcon/>
                </IconButton>
              </Tooltip>
			 {/* <button onClick={handleExport}>Export to CSV</button> */}
        </div>
    );
}

export default CsvFile;

 