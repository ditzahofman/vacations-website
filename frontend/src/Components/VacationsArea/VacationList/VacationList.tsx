import { useEffect, useState } from "react";
import "./VacationList.css";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import { Button, Checkbox, IconButton, Pagination } from "@mui/material";
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
import Chart from "../Admin/Chart/Chart";
import CsvFile from "../Admin/CsvFile/CsvFile";



function VacationList(): JSX.Element {

  useVerifyLoggedIn();
  const user = authStore.getState().user;

  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false)
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage = 8;

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
      if (user.role === "Admin") {
        setVacations([]);
      }
      else {
        setVacations([])
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleFilterChange = (filteredVacations: VacationModel[]) => {
    setFilteredVacations(filteredVacations);
    setCurrentPage(1);
    
    setShowForm(!showForm);
  };

  // Toggle the value of showList
  const handleListChart = () => {
    setShowList(!showList);
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
          <div className="containerAdmin">
            <div className="linksList">
              <Tooltip title="Add Vacations">
                <IconButton className="filterButtons add" onClick={() => navigate("/add-vacation")}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <CsvFile />

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
              <h2>Managing</h2>
              {showList === false ? currentVacations ?.map((v) => (
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
            <div className="Cards">
              <p className="listTitle">AROUND THE WORLD</p>
              <div className="linksUser">
                <VacationsFilterButtons vacations={vacations} onFilterChange={handleFilterChange} />
              </div>
              {showForm && <GetVacationsForm />}

              {currentVacations.length > 0 ? (
                <>
                  <h2>***</h2>
                  {currentVacations.map((v) => (
                    <VacationCard key={v.vacationId} vacation={v} user={user} />
                  ))}
                </>
              ) : (<>
                <p className="noFound">Sorry, no results have been found</p>
              </>

              )}

            </div>

          </div>
        </>

      )}
      
      <div className="pagination">
        <Pagination
          count={Math.ceil(filteredVacations.length / vacationsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />

      </div>
    </div>
  );
}

export default VacationList;

