import SortControl from "./sortControl/SortControl";
import TicketsList from "./ticketsList/TicketsList";
import PropTypes from "prop-types";
import "./SearchResults.css";
import {
  setFilter,
  fetchRoutes,
  setCurrentPage,
} from "../../../redux/features/searchResultsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SearchResults({ handleSeatSelection }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.searchResults);
  const { currentPage } = useSelector((state) => state.searchResults);
  const { totalCount, items, limit, sort } = useSelector(
    (state) => state.searchResults
  );

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    const offset = pageNumber * limit - limit;
    dispatch(setFilter({ offset }));
    dispatch(fetchRoutes({ ...filters, offset }));
  };

  const handleLimitChange = (limit) => {
    dispatch(setFilter({ limit }));
    dispatch(fetchRoutes({ ...filters, limit }));
  };

  const handleSortChange = (e, sort) => {
    dispatch(setFilter({ sort }));
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
          handleSeatSelection,
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
  handleSeatSelection: PropTypes.func.isRequired,
};
