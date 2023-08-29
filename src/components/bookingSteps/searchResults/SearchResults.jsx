import SortControl from "./sortControl/SortControl";
import TicketsList from "./ticketsList/TicketsList";
import PropTypes from "prop-types";
import "./SearchResults.css";

export default function SearchResults({ setIsSelectSeats}) {
  
  return (
    <div className="search-results">
      <SortControl />
      <TicketsList {...{ setIsSelectSeats }} />
    </div>
  );
}

SearchResults.propTypes = {
  setIsSelectSeats: PropTypes.func.isRequired,
};
