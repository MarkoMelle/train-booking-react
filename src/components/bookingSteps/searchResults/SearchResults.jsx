import SortControl from "./sortControl/SortControl";
import TicketsList from "./ticketsList/TicketsList";
import "./SearchResults.css";

export default function SearchResults() {
  return (
    <div className="search-results">
      <SortControl />
      <TicketsList />
    </div>
  );
}
