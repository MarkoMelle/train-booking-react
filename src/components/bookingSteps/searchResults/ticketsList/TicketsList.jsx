import Ticket from "./ticket/Ticket";
import "./TicketsList.css";
import Pagination from "./pagination/Pagination";
import PropTypes from "prop-types";

export default function TicketsList({
  handleSeatSelection,
  currentPage,
  handlePageChange,
  itemsPerPage,
  totalItems,
  items,
}) {
  return (
    <div className="tickets-list">
      {items.map((ticket, index) => (
        <Ticket key={index} ticket={ticket} {...{ handleSeatSelection }} />
      ))}
      {totalItems / itemsPerPage > 1 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

TicketsList.propTypes = {
  handleSeatSelection: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};
