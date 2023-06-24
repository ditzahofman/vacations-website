import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import { Button, Checkbox, Fab, IconButton, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RoleModel from "../../../Models/Role-model";
import { useNavigate } from "react-router-dom";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";
import GetVacationsForm from "../User/getVacationsForm/getVacationsForm";
import VacationModel from "../../../Models/Vacation-model";
import { vacationsStore } from "../../../Redux/VacationsState";
import Tooltip from '@mui/material/Tooltip';
import VacationsFilterButtons from "../User/VacationsFilterButtons/VacationsFilterButtons";
import BarChartIcon from '@mui/icons-material/BarChart';
import { authStore } from "../../../Redux/AuthState";
import NavigationIcon from '@mui/icons-material/Navigation';
import Chart from "../Admin/Chart/Chart";
import CsvFile from "../Admin/CsvFile/CsvFile";
;


function VacationList(): JSX.Element {

  useVerifyLoggedIn();
  const user = authStore.getState().user;

  const [showList, setShowList] = useState(false)
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
          setFilteredVacations(v); 
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
    setCurrentPage(1);
  };

  function handleRefreshButtonClick() {
    window.location.reload();

  }

  const handleListChart = () => {
    setShowList(!showList); // Toggle the value of showList
  };

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
        <h2>AROUND THE WORLD</h2>
          <div className="containerList">
            <div className="linksList">
              <h2>Hello {user.firstName} !</h2>
              <Tooltip title="Add Vacations">
                <IconButton className="filterButtons add" onClick={() => navigate("/add-vacation")}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <CsvFile/>

              <Tooltip title="chart">
                <Checkbox
                  checked={showList}
                  onChange={handleListChart}
                  icon={<BarChartIcon />}
                  checkedIcon={<BarChartIcon className="checkedIcon" />}
                  className="filterButtons add"
                />
              </Tooltip>
            </div>
            <div className="MyCards">
              {showList === false ? vacations?.map((v) => (
                <VacationCard key={v.vacationId} vacation={v} user={user} />
              )) :
                <Chart />
              }

            </div>

          </div>
        </>
      ) : (
        // User view
        <>
          <div className="containerList">
            <div className="linksList">
              <h3>Filters:</h3>

              <VacationsFilterButtons vacations={vacations} onFilterChange={handleFilterChange} />

            </div>
            <div className="MyCards">
              <p className="listTitle">Dreams Vacations</p>

              <GetVacationsForm onFilter={handleFilterChange} />

              {currentVacations.length > 0 ? (
                <>
                  {currentVacations.map((v) => (
                    <VacationCard key={v.vacationId} vacation={v} user={user} />
                  ))}
                  <Tooltip title="All Vacations">
                    <Button
                      variant="contained"
                      onClick={handleRefreshButtonClick}
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
                </>
              ) : (<>
                <p className="noFound">Sorry, no results have been found</p>
                <Fab variant="extended" className="back">
                  <NavigationIcon
                    sx={{ mr: 2 }}
                    onClick={handleRefreshButtonClick} />
                  <b>back</b>
                </Fab>

              </>

              )}

            </div>

          </div>

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
        </>

      )}
    </div>
  );
}

export default VacationList;

