import SortControl from "./sortControl/SortControl";
import TicketsList from "./ticketsList/TicketsList";
import PropTypes from "prop-types";
import "./SearchResults.css";
import { setFilter, fetchRoutes } from "../../../redux/features/searchResultsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function SearchResults({ setIsSelectSeats, setCurrentTrip }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const { totalCount, items, limit, sort } = useSelector(
    (state) => state.searchResults
  );
  // const [sortBy, setSortBy] = useState("date");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const offset = pageNumber * limit - limit;
    dispatch(setFilter({ offset }));
    dispatch(fetchRoutes({ ...filters, offset }));
  };

  const handleLimitChange = (limit) => {
    dispatch(setFilter({ limit }));
    dispatch(fetchRoutes({ ...filters, limit }));
  };

  const handleSortChange = (e, sort) => {
    dispatch(setFilter({ sort}));
    dispatch(fetchRoutes({ ...filters, sort }));
  };

  return (
    <div className="search-results">
      <SortControl
        {...{
          limit,
          handleLimitChange,
          sort,
          handleSortChange,
          totalCount,
        }}
      />
      <TicketsList
        {...{
          setIsSelectSeats,
          setCurrentTrip,
          currentPage,
          handlePageChange,
          itemsPerPage: limit,
          totalItems: totalCount,
          items,
        }}
      />
    </div>
  );
}

SearchResults.propTypes = {
  setIsSelectSeats: PropTypes.func.isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
};
