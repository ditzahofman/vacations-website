import { useEffect, useState } from "react";
import "./VacationList.css";
import vacationService from "../../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import {  Checkbox, IconButton, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RoleModel from "../../../../Models/Role-model";
import { useNavigate } from "react-router-dom";
import useVerifyLoggedIn from "../../../../Utils/UseVerifyLoggedIn";
import VacationModel from "../../../../Models/Vacation-model";
import { vacationsStore } from "../../../../Redux/VacationsState";
import Tooltip from '@mui/material/Tooltip';
import BarChartIcon from '@mui/icons-material/BarChart';
import { authStore } from "../../../../Redux/AuthState";
import Chart from "../../Admin/Chart/Chart";
import CsvFile from "../../Admin/CsvFile/CsvFile";
import SearchForm from "../../User/SearchForm/SearchForm";
import FilterButtons from "../../User/FilterButtons/FilterButtons";
import notifyService from "../../../../Services/NotifyService";




function VacationList(): JSX.Element {

  useVerifyLoggedIn();
  const user = authStore.getState().user;

  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false)
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const vacationsPerPage = 12;

  const navigate = useNavigate();

  // Fetch all vacations and handle store changes
  useEffect(() => {
    if (user && user.userId) {
      vacationService
        .getAllVacations()
        .then((v) => {
          setVacations(v);
        })
        .catch((e) => notifyService.error(e));
    }
    const unsubscribe = vacationsStore.subscribe(() => {
        setVacations([])
    });

    return () => {
      unsubscribe();
    };
  }, [user, vacations]);

    // Fetch vacations for filters
    useEffect(() => {
      if (user && user.userId) {
        vacationService
          .getAllVacations()
          .then((v) => {
            setFilteredVacations(v);
  
          })
          .catch((e) => notifyService.error(e));
      }
      const unsubscribe = vacationsStore.subscribe(() => {
        setVacations(vacations)
    });
    unsubscribe();  
    }, [user])

 // Handle the change in filters
const handleFilterChange = (filteredVacations: VacationModel[]) => {
  setFilteredVacations(filteredVacations); // Update the filtered vacations
  setCurrentPage(1); // Reset the current page to the first page

  // Check if any filter is active
  const anyFilterActive = filteredVacations.length < vacations.length;

  // Show the form if any filter is active or if there are no filtered vacations
  setShowForm(!anyFilterActive || filteredVacations.length < 0);
}

  // Toggle between list and chart view
  const handleListChart = () => {
    setShowList(!showList);
  };

  // Calculate pagination data
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);
  // Handle page change
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
              {showList === false ? (
                // Display search input and filtered vacations if showList is false
                <>
                  <div className="searchContainer">
                    {/* Input field for searching by destination */}
                    <input
                      className="searchInput"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by destination"
                    />
                  </div>
                  {searchTerm === "" ? (
                    // If search term is empty, display currentVacations
                    currentVacations.map((v) => (
                      <VacationCard key={v.vacationId} vacation={v} user={user} />
                    ))
                  ) : (
                    // If search term is entered, filter vacations based on destination and display filtered vacations
                    vacations
                      .filter((vacation) =>
                        vacation.destination.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((v) => (
                        <VacationCard key={v.vacationId} vacation={v} user={user} />
                      ))
                  )}
                </>
              ) : (
                // Display Chart component if showList is true
                <Chart />
              )}


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
                <FilterButtons vacations={vacations} onFilterChange={handleFilterChange} />
              </div>
              <div className="AllCards">
                {showForm && <SearchForm/>}

                {currentVacations?.length > 0 ? (
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
          </div>
        </>

      )}


{!showList&&
      <div className="pagination">
        <Pagination
          count={Math.ceil(filteredVacations.length / vacationsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
        />

      </div>}
    </div>
  );
}

export default VacationList;

