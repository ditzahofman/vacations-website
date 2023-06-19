import { useEffect, useState } from "react";
import "./VacationList.css";
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import { Button, IconButton, Pagination } from "@mui/material";
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
  const user = authStore.getState().user;

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage = 6;

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
      setVacations([]);
    });

    return () => {
      unsubscribe();
    };
  }, [user, vacations]);

  const handleFilterChange = (filteredVacations: VacationModel[]) => {
    setFilteredVacations(filteredVacations);
    setCurrentPage(1); // Reset to the first page when the filters change
  };

  const GetAllVacations = async () => {
    try {
      const allVacations = await vacationService.getAllVacations();
      setFilteredVacations(allVacations);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useVerifyLoggedIn();

  // Calculate pagination data
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);

  const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
              <VacationsFilterButtons vacations={vacations} onFilterChange={handleFilterChange} />

            </div>
            <div className="MyCards">
              <p className="listTitle">Dreams Vacations</p>
              <GetVacationsForm onFilter={handleFilterChange} />
              {currentVacations.length > 0 ? (
                currentVacations.map((v) => (
                  <VacationCard key={v.vacationId} vacation={v} user={user} />

                ))

              ) : (<>
                <p className="noFound">Sorry, no results have been found</p>
                <Button className="back" onClick={GetAllVacations}>
                  <b>Back</b>
                </Button>
              </>

              )}
              <div className="pagination">
                <Pagination
                  count={Math.ceil(filteredVacations.length / vacationsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />

              </div>
            </div>


          </div>

        </>

      )}
    </div>
  );
}

export default VacationList;

