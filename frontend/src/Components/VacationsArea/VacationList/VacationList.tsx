import { useEffect, useState } from "react";
import "./VacationList.css";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import VacationdModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import { Button, Checkbox, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RoleModel from "../../../Models/Role-model";
import { useNavigate } from "react-router-dom";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";
import GetVacationsForm from "../getVacationsForm/getVacationsForm";
import VacationModel from "../../../Models/Vacation-model";
import { vacationsStore } from "../../../Redux/VacationsState";
import Tooltip from '@material-ui/core/Tooltip';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import VacationsFilterButtons from "../VacationsFilterButtons/VacationsFilterButtons";
import BarChartIcon from '@material-ui/icons/BarChart';
import { authStore } from "../../../Redux/AuthState";

function VacationList(): JSX.Element {
  const user = authStore.getState().user

  const [vacations, setVacations] = useState<VacationModel[]>([])
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[] >();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userId) {
      vacationService
        .getAllVacations()
        .then((v) => {
          setVacations(v);
          setFilteredVacations(v); // Initialize filtered vacations with all vacations
        })
        .catch((e) => alert(e));
    }
    const unsubscribe = vacationsStore.subscribe(() => {
      setVacations([])

    }
    )
    return () => {
      unsubscribe()
    }
  }, [user, vacations]);



  const handleFilterChange = (filteredVacations: VacationModel[]) => {
    setFilteredVacations(filteredVacations);
  };

  async function GetAllVacations() {
    try {
      const allVacations = await vacationService.getAllVacations();
      setFilteredVacations(allVacations);
    } catch (err: any) {
      alert(err.message);
    }
  }
  useVerifyLoggedIn();

  return (
    <div className="VacationList">
      {user?.role === RoleModel.Admin ? (
        // Admin view
        <>
          <div className="containerList">
            <div className="linksList">
              <h2>Hello {user.firstName} !</h2>
              <Tooltip title="Add Vacations">
                <IconButton className="filterButtons add" onClick={() => navigate("/add-vacation")}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Chart">
                <IconButton className="filterButtons add" onClick={() => navigate("/chart")}>
                <BarChartIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className="MyCards">
              {vacations?.map((v) => (
                <VacationCard key={v.vacationId} vacation={v} user={user} />
              ))}
            </div>
          </div>
        </>
      ) : (
        // User view
        <>

          {/* <h1>All vacations in one place 🛬</h1> */}
          <div className="containerList">
            <div className="linksList">
              <h2>Filters</h2>
              <Tooltip title="All Vacations">
                <Button
                  variant="contained"
                  startIcon={<AllInclusiveIcon />}
                  onClick={GetAllVacations}
                  style={{
                    borderRadius: '0',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                  }}
                  className="filterButtons"
                >
                  all Vacations
                </Button>
              </Tooltip>
              {/* <Button onClick={GetAllVacations} className="filterButton" variant="contained">All </Button>
              <Button className="filterButton" variant="contained" > ❤️</Button> */}


              <VacationsFilterButtons vacations={vacations} onFilterChange={handleFilterChange} />

            </div>
            <div className="MyCards">
              <p className="listTitle">Dreams Vacations</p>
              <GetVacationsForm onFilter={handleFilterChange} />
              {filteredVacations && filteredVacations.length > 0 ?
               (
                filteredVacations.map((v) => <VacationCard key={v.vacationId} vacation={v} user={user} />)

              ) : (
                <>
                  {filteredVacations && filteredVacations.length === 0 && <p className="noFound">Sory no results have been found</p>}
                  {!filteredVacations && vacations?.map((v) => <VacationCard key={v.vacationId} vacation={v} user={user} />)}
                  <Button className="back" onClick={GetAllVacations}  ><b>back</b> </Button>


                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VacationList;

