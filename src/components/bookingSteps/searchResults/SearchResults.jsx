import SortControl from "./sortControl/SortControl";
import TicketsList from "./ticketsList/TicketsList";
import PropTypes from "prop-types";
import "./SearchResults.css";

export default function SearchResults({ setIsSelectSeats, setCurrentTrip }) {
  return (
    <div className="search-results">
      <SortControl />
      <TicketsList {...{ setIsSelectSeats, setCurrentTrip }} />
    </div>
  );
}

SearchResults.propTypes = {
  setIsSelectSeats: PropTypes.func.isRequired,
  setCurrentTrip: PropTypes.func.isRequired,
};
