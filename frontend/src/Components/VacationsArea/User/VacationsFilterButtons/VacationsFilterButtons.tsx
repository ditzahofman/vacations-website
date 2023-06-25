import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './VacationsFilterButtons.css';
import VacationModel from '../../../../Models/Vacation-model';

interface VacationsFilterButtonsProps {
  vacations: VacationModel[];
  onFilterChange: (filteredVacations: VacationModel[]) => void;
}

function VacationsFilterButtons(props: VacationsFilterButtonsProps): JSX.Element {
  const [nowChecked, setNowChecked] = useState(false);
  const [willBeChecked, setWillBeChecked] = useState(false);
  const [favoriteChecked, setFavoriteChecked] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [nowChecked, willBeChecked, favoriteChecked]);

  const applyFilters = () => {
    let filteredVacations = [...props.vacations];

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

    props.onFilterChange(filteredVacations);
  };

  const handleNowChange = () => {
    setNowChecked(!nowChecked);
  };

  const handleWillBeChange = () => {
    setWillBeChecked(!willBeChecked);
  };

  const handleFavoriteChange = () => {
    setFavoriteChecked(!favoriteChecked);
  };

  return (
    <div className="VacationsFilterButtons">
      <Tooltip title="current vacations">
        <Checkbox
          checked={nowChecked}
          onChange={handleNowChange}
          icon={<FlightTakeoffIcon />}
          checkedIcon={<FlightTakeoffIcon className="checkedIcon" />}
          className="filterButtons"
        />
      </Tooltip>

      <Tooltip title="future vacations">
        <Checkbox
          checked={willBeChecked}
          onChange={handleWillBeChange}
          icon={<EventAvailableIcon />}
          checkedIcon={<EventAvailableIcon className="checkedIcon" />}
          className="filterButtons"
        />
      </Tooltip>

      <Tooltip title="My Favorite Vacations">
        <Checkbox
          checked={favoriteChecked}
          onChange={handleFavoriteChange}
          icon={<FavoriteIcon />}
          checkedIcon={<FavoriteIcon className="checkedIcon" />}
          className="filterButtons"
        />
      </Tooltip>
    </div>
  );
}

export default VacationsFilterButtons;
