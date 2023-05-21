import "./VacationCard.css";
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface VacationCardProps{
  
}

function VacationCard(): JSX.Element {
    return (
        <div className="VacationCard">
			  <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Vacation Destination
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOnIcon /> Location: Hawaii
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <EventIcon /> Dates: August 1 - August 7
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <AttachMoneyIcon /> Price: $2000
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <AccessTimeIcon /> Duration: 7 days
        </Typography>
      </CardContent>
    </Card>
        </div>
    );
}

export default VacationCard;
