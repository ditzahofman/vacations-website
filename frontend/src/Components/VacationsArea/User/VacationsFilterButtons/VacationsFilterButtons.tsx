import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventAvailableIcon from '@mui/icons-material//EventAvailable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './VacationsFilterButtons.css';
import VacationModel from '../../../../Models/Vacation-model';
import { FormControlLabel } from '@mui/material';

interface VacationsFilterButtonsProps {
  vacations: VacationModel[];
  onFilterChange: (filteredVacations: VacationModel[], filterType: string) => void;
}

function VacationsFilterButtons(props: VacationsFilterButtonsProps): JSX.Element {
  const [nowChecked, setNowChecked] = useState(false);
  const [willBeChecked, setWillBeChecked] = useState(false);
  const [favoriteChecked, setFavoriteChecked] = useState(false);

  useEffect(() => {
    // Reset checked state on mount
    setNowChecked(false);
    setWillBeChecked(false);
    setFavoriteChecked(false);
  }, []);

  const handleNowChange = () => {
    const isChecked = !nowChecked;
    setNowChecked(isChecked);

    const filteredVacations = applyFilters(props.vacations, isChecked, willBeChecked, favoriteChecked);
    props.onFilterChange(filteredVacations, 'now');
  };

  const handleWillBeChange = () => {
    const isChecked = !willBeChecked;
    setWillBeChecked(isChecked);

    const filteredVacations = applyFilters(props.vacations, nowChecked, isChecked, favoriteChecked);
    props.onFilterChange(filteredVacations, 'willBe');
  };

  const handleFavoriteChange = () => {
    const isChecked = !favoriteChecked;
    setFavoriteChecked(isChecked);

    const filteredVacations = applyFilters(props.vacations, nowChecked, willBeChecked, isChecked);
    props.onFilterChange(filteredVacations, 'favorite');
  };

  const applyFilters = (vacations: VacationModel[], nowChecked: boolean, willBeChecked: boolean, favoriteChecked: boolean): VacationModel[] => {
    let filteredVacations = [...vacations];

    // Apply 'Now' filter
    if (nowChecked) {
      const today = new Date().toISOString().split('T')[0];
      filteredVacations = filteredVacations.filter((vacation) => {
        return vacation.startDate <= today && vacation.endDate >= today;
      });
    }

    // Apply 'WillBe' filter
    if (willBeChecked) {
      const today = new Date().toISOString().split('T')[0];
      filteredVacations = filteredVacations.filter((vacation) => {
        return vacation.startDate > today;
      });
    }

    // Apply 'Favorite' filter
    if (favoriteChecked) {
      filteredVacations = filteredVacations.filter((vacation) => {
        return vacation.isFollowing;
      });
    }

    return filteredVacations;
  };

  return (
    <div className="VacationsFilterButtons">
      <Tooltip title="Vacations Now">
        <Checkbox
          checked={nowChecked}
          onChange={handleNowChange}
          icon={<FlightTakeoffIcon />}
          checkedIcon={<FlightTakeoffIcon className="checkedIcon" />}
          className="filterButtons circle"
        />
      </Tooltip>

      <Tooltip title="Vacation Will Be">
        <Checkbox
          checked={willBeChecked}
          onChange={handleWillBeChange}
          icon={<EventAvailableIcon />}
          checkedIcon={<EventAvailableIcon className="checkedIcon" />}
          className="filterButtons circle"
        />
      </Tooltip>

      <Tooltip title="My Favorite Vacations">
    
        <Checkbox
          checked={favoriteChecked}
          onChange={handleFavoriteChange}
          icon={<FavoriteIcon />}
          checkedIcon={<FavoriteIcon className="checkedIcon" />}
          className="filterButtons circle"
        />
        
      </Tooltip>
    
    </div>
  );
}

export default VacationsFilterButtons;