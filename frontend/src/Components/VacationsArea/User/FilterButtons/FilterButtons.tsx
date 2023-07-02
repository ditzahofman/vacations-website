import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './FilterButtons.css';
import VacationModel from '../../../../Models/Vacation-model';

interface VacationsFilterButtonsProps {
  vacations: VacationModel[];
  onFilterChange: (filteredVacations: VacationModel[]) => void;
}

function FilterButtons(props: VacationsFilterButtonsProps): JSX.Element {
  const [cutrrentChecked, setCutrrentChecked] = useState(false);
  const [futureChecked, setFutureChecked] = useState(false);
  const [favoriteChecked, setFavoriteChecked] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [cutrrentChecked, futureChecked, favoriteChecked]);

  const applyFilters = () => {
    let filteredVacations = [...props.vacations];

    // Apply 'cutrrent' filter
    if (cutrrentChecked) {
      const today = new Date().toISOString().split('T')[0];
      filteredVacations = filteredVacations.filter((vacation) => {
        return vacation.startDate <= today && vacation.endDate >= today;
      });
    }

    // Apply 'future' filter
    if (futureChecked) {
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
    setCutrrentChecked(!cutrrentChecked);
  };

  const handleWillBeChange = () => {
    setFutureChecked(!futureChecked);
  };

  const handleFavoriteChange = () => {
    setFavoriteChecked(!favoriteChecked);
  };

  return (
    <div className="VacationsFilterButtons">
      <Tooltip title="current vacations">
        <Checkbox
          checked={cutrrentChecked}
          onChange={handleNowChange}
          icon={<FlightTakeoffIcon />}
          checkedIcon={<FlightTakeoffIcon className="checkedIcon" />}
          className="filterButtons"
        />
      </Tooltip>

      <Tooltip title="future vacations">
        <Checkbox
          checked={futureChecked}
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

export default FilterButtons;
