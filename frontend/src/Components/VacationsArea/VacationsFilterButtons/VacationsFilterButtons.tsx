import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './VacationsFilterButtons.css';
import VacationModel from '../../../Models/Vacation-model';
import vacationService from '../../../Services/VacationService';


interface VacationsFilterButtonsProps {
    vacations: VacationModel[];
    onFilterChange: (filteredVacations: VacationModel[]) => void;
  }
  

function VacationsFilterButtons(props: VacationsFilterButtonsProps): JSX.Element {
    

  const [allChecked, setAllChecked] = useState(false);
  const [nowChecked, setNowChecked] = useState(false);
  const [willBeChecked, setWillBeChecked] = useState(false);
  const [favoriteChecked, setFavoriteChecked] = useState(false);


   
const handleNowChange = () => {
    setNowChecked(!nowChecked);
    applyFilters(props.vacations);
  };
  
  const handleWillBeChange = () => {
    setWillBeChecked(!willBeChecked);
    applyFilters(props.vacations);
  };
  
  const handleFavoriteChange = () => {
    setFavoriteChecked(!favoriteChecked);
    applyFilters(props.vacations);
  };
  
  const applyFilters = (vacations: VacationModel[]): VacationModel[] => {
    let filteredVacations = vacations;
  
    if (!allChecked) {
      filteredVacations = filteredVacations.filter(vacation => vacation.location !== 'All');
    }
    if (!nowChecked) {
      filteredVacations = filteredVacations.filter(vacation => vacation.location !== 'Now');
    }
    if (!willBeChecked) {
      filteredVacations = filteredVacations.filter(vacation => vacation.location !== 'WillBe');
    }
    if (!favoriteChecked) {
      filteredVacations = filteredVacations.filter(vacation => vacation.location !== 'Favorite');
    }
  
    return filteredVacations;
  };

  return (
    <div className="VacationsFilterButtons">
      {/* <Tooltip title="All Vacations">
        <Checkbox
          checked={allChecked}
          onChange={handleAllChange}
          icon={<AllInclusiveIcon />}
          checkedIcon={<AllInclusiveIcon className="checkedIcon" />}
          className="filterButtons circle"
        />
      </Tooltip> */}

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
};

export default VacationsFilterButtons;







